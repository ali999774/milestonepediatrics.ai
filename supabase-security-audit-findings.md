# Supabase Security Audit — milestone-pediatrics — 2026-07-12

Audited with the `supabase-security-audit` skill.

> **Introspection caveat.** The live project `jsbauumbjsolndjqkayt` (milestone-pediatrics)
> is paused and has been for more than 90 days, so the Supabase MCP cannot restore it or
> run live SQL against it. This audit is therefore run against the **schema as declared**
> in `supabase/migrations/` (the source of truth for what deploys) plus the client bundle
> and git history. Assertions that require reading *live* grants, default privileges, and
> the platform advisors (C1, C3, H1, H2, H4) are marked **UNVERIFIED** with the presumed
> result; re-run them against the live DB after restore. Everything else is conclusive
> from the migration DDL.

## Summary

| Severity | FAIL | Notes |
|----------|------|-------|
| CRITICAL | 3 | anon can tamper with every row; table holds PHI but is labelled "No PHI"; intake is not INSERT-only |
| HIGH | 3 | authenticated reads all PHI; anon grants not minimized (unverified); default privileges not hardened (unverified) |
| MEDIUM | 1 | trigger function search_path not pinned |
| PASS | 8 | key handling, RLS enabled, no user_metadata trust, no views/buckets/matviews, anon cannot SELECT |

**Verdict: FAIL — do not un-pause and point traffic at this schema as-is.** The database
stores pediatric patient-identifiable data (child name, DOB, insurance) while telling every
reader it stores none, and its RLS lets any anonymous visitor overwrite every family's
record using the public anon key. Two migrations fix it; both are ready below.

## Inventory

- **Exposed schemas:** presumed default (`public`, `graphql_public`) — live config unverified.
- **Tables:** `public.waitlist` (1).
- **Functions:** `public.set_updated_at()` — trigger function, SECURITY INVOKER (the default).
- **Views / matviews:** none.
- **Storage buckets:** none.
- **Edge functions:** `notify-on-submission` directory exists but is **empty** — no deployed code.
- **PHI classification:** `public.waitlist` is **patient-identifiable health data.** It links a
  child's name, date of birth, and insurance to a pediatric clinic's prospective-patient list.
  Per the data-classification standard, that is PHI regardless of the absence of a diagnosis.
  The table's own comment — *"No PHI"* — is **incorrect** and is itself finding I1.

## Findings

### G1 — PASS — CRITICAL
Service-role key appears nowhere client-reachable. Only `VITE_SUPABASE_ANON_KEY` is used
(`src/lib/supabase.ts:43`). No `service_role` / `sb_secret_` string in source, `dist/`, or the
decoded JWTs in the bundle.

### G2 — PASS — HIGH
`.env` and `.env.*` are gitignored (`.gitignore:5-7`), only `.env.example` is tracked and it
holds placeholders. `git log -S service_role --all` and `-S sb_secret` return nothing — no key
ever committed.

### G3 — N/A — MEDIUM
No server-side code deployed (`notify-on-submission` is empty). Re-check when the edge function
is written: it must read the service-role key from a secret, never a literal.

### A1 — PASS — CRITICAL
`alter table public.waitlist enable row level security;` is present (`001_waitlist.sql:43`).

### A2 — PASS — INFO
RLS is on and the table has 3 policies (not a silent default-deny).

### B1 / I4 — **FAIL — CRITICAL**
Policy `anon_update_waitlist_by_id` is `FOR UPDATE TO anon USING (true) WITH CHECK (true)`
(`001_waitlist.sql:54-59`). Any visitor holding the public anon key can update **every row in
the table** — not just their own. They cannot read (no anon SELECT policy), but they can blind-
overwrite or corrupt every family's `parent_name`, `child_name`, `child_dob`, `insurance`, etc.
`USING (true)` on an anon UPDATE is a tautology masquerading as a policy.
- **Failure scenario:** attacker runs `supabase.from('waitlist').update({child_name:'x'}).neq('id','0')`
  with the anon key from the shipped bundle → every record rewritten. No auth, no row ownership check.
- **Root cause:** the client uses `upsert(..., {onConflict:'parent_email'})` for Step 1 and
  `update().eq('id', …)` for Step 2 (`src/api/waitlist.ts:70, 116`). Upsert/update from the
  browser *requires* an open anon UPDATE policy — the design forces this hole.
- **Fix:** Migration 003 below — move the merge server-side into a `SECURITY DEFINER` RPC and
  make the table INSERT-only for anon (the I4 correct pattern).

### B2 / I2 — FAIL — HIGH
Policy `auth_select_waitlist` is `FOR SELECT TO authenticated USING (true)` (`001_waitlist.sql:62-66`).
Every authenticated user can read every family's PHI. Today that's tolerable *only because the
`authenticated` role is a single staff login* — but it is latent: the moment any patient-facing
auth (a family portal, a "check my status" login) is added, every logged-in parent can read every
other family's child's name, DOB, and insurance. There is no row-ownership binding.
- **Fix:** keep API reads closed and read via the dashboard as `postgres` (Migration 003 drops the
  policy); or, if programmatic admin read is needed, gate it behind an `app_metadata` role claim,
  not blanket `authenticated`.

### B3 — PASS (degenerate) — HIGH
The UPDATE policy does have a `WITH CHECK`, but it's `true` — subsumed by the B1 failure. Fixed by
Migration 003.

### B4 — PASS — CRITICAL
No policy references `user_metadata`. Nothing attacker-controlled is trusted.

### B5 — N/A — MEDIUM
No RESTRICTIVE policies.

### C1 — **UNVERIFIED (presumed FAIL) — HIGH**
Live grants can't be read while paused. The migrations never `REVOKE` anything, and Supabase's
default grants `anon` broad CRUD on `public` tables. RLS currently blocks anon SELECT/DELETE
(no policy), so the leak is contained to the UPDATE hole — but grants are not minimized to the
INSERT the intake form actually needs. Migration 003 revokes the excess.

### C2 — PASS (note) — HIGH
`set_updated_at()` is a trigger function; it is not a meaningful RPC endpoint. No other functions
are exposed. Low concern; Migration 003 still revokes PUBLIC EXECUTE for hygiene.

### C3 — **UNVERIFIED (presumed FAIL) — HIGH**
`ALTER DEFAULT PRIVILEGES` posture can't be read live. The migrations don't set it, so a *future*
table added to `public` may auto-grant anon CRUD before anyone writes a policy — this is exactly
how tables-added-later leak. Migration 004 hardens it.

### C4 — N/A — LOW
`waitlist.id` is `uuid default gen_random_uuid()`, no serial sequence to grant.

### D1 / D2 — PASS — CRITICAL
No `SECURITY DEFINER` functions exist today. **This changes once Migration 003 is applied** — the
new `submit_waitlist` RPC is SECURITY DEFINER and its `search_path` is pinned to `''` in the
template (D1 satisfied by construction). Re-assert D1 after applying it.

### E1 / E2 — N/A — CRITICAL/HIGH
No views or materialized views.

### F1 / F2 / F3 — N/A — HIGH
No storage buckets.

### H1 / H2 — UNVERIFIED — HIGH/MEDIUM
Exposed-schema list and extension placement need the live config. `pgcrypto` is created without a
target schema (`001_waitlist.sql:8`); on Supabase it normally resolves to the pre-installed copy in
`extensions`, but confirm it didn't land in `public` on restore.

### H3 — N/A — MEDIUM
No table added to the `supabase_realtime` publication in the migrations.

### H4 — UNVERIFIED — INFO
`get_advisors(type: security)` can't run while paused. Run it immediately after restore and
reconcile against these findings.

### I1 — **FAIL — CRITICAL**
PHI inventory (contradicting the table comment):
`public.waitlist` → `parent_name`, `parent_email`, `phone`, `child_name`, `child_dob`,
`insurance`, `referral_source`. Child name + DOB + insurer tied to a pediatric practice is PHI.

### I3 — PASS — CRITICAL
No anon SELECT policy exists, so anon cannot read PHI through the API. (This is the one thing the
current schema gets right.)

### I5 — PASS — HIGH
No views, matviews, public buckets, or realtime publications, so PHI has no secondary read path.

### I6 — PASS — MEDIUM
Client logs only `error.message`, never field values (`src/api/waitlist.ts:75, 119`); user-facing
errors are generic ("Something went wrong"). No PHI in logs.

### I7 — INFO
Consult the data-classification standard before the next PHI ingress — reference, don't copy:
https://github.com/ali999774/ali-agent-standards/blob/main/backend-standards/data-classification.md

### set_updated_at search_path — FAIL — MEDIUM
`set_updated_at()` (`002_indexes_and_triggers.sql:26-34`) does not pin `search_path`. As a
SECURITY INVOKER trigger it's low-risk, but best practice (and consistency with the definer
function you're about to add) is `set search_path = ''` with schema-qualified names. Included in
Migration 003.

## PHI access statements (I2)

- **`public.waitlist`** — *Via the REST API:* anon **cannot read** (no SELECT policy); anon can
  currently **write/overwrite any row** (the CRITICAL bug). Any `authenticated` user can **read all
  rows** (blanket `USING(true)`). *Intended access:* staff read via the Supabase dashboard as
  `postgres`. After remediation: anon can **only INSERT via the `submit_waitlist` RPC**, no API read
  or update path exists, and staff continue to read via the dashboard.

## Hand-off — remediation SQL (apply safest-first)

Mechanical to apply and re-verify. Apply as versioned migrations via
`apply_migration`, then re-run the **entire** checklist (grant changes shift other assertions).

**Migration 003 — close the intake holes (fixes B1, B2, B3, I4, C2, and the search_path note):**

```sql
-- 003_lock_down_waitlist.sql

-- 1. Replace the client upsert/update path with a server-side definer RPC.
create or replace function public.submit_waitlist(
  p_parent_name text, p_parent_email text, p_child_name text
) returns uuid
language plpgsql security definer set search_path = '' as $$
declare v_id uuid;
begin
  if p_parent_email !~ '^[^\s@]+@[^\s@]+\.[^\s@]+$' then
    raise exception 'invalid email';
  end if;
  if length(trim(coalesce(p_parent_name,''))) = 0
     or length(trim(coalesce(p_child_name,''))) = 0 then
    raise exception 'name required';
  end if;

  insert into public.waitlist (parent_name, parent_email, child_name, step_completed)
  values (left(trim(p_parent_name),500), lower(trim(p_parent_email)),
          left(trim(p_child_name),500), 1)
  on conflict (parent_email) do update
    set parent_name = excluded.parent_name,
        child_name  = excluded.child_name,
        updated_at  = now()
  returning id into v_id;
  return v_id;
end $$;

revoke execute on function public.submit_waitlist(text,text,text) from public;
grant  execute on function public.submit_waitlist(text,text,text) to anon;

-- (Optional) a second definer RPC for Step 2, keyed by the returned uuid as a
-- capability token — acceptable for low-stakes intake. Mirror the pattern above.

-- 2. Remove the open anon UPDATE and the blanket authenticated SELECT.
drop policy if exists "anon_update_waitlist_by_id" on public.waitlist;
drop policy if exists "auth_select_waitlist"       on public.waitlist;
-- Keep "anon_insert_waitlist" ONLY if you still want raw INSERT; if you move Step 1
-- entirely to the RPC, drop it too and revoke INSERT (step 3).

-- 3. Minimize the anon table surface (the RPC does the writing now).
revoke select, update, delete on table public.waitlist from anon;
-- if fully RPC-driven, also: revoke insert on table public.waitlist from anon;

-- 4. Pin the trigger function search_path.
alter function public.set_updated_at() set search_path = '';
```

Client change to match: replace `.from('waitlist').upsert(...)` in
`src/api/waitlist.ts` with `supabase.rpc('submit_waitlist', {...})`.

**Migration 004 — harden default privileges (fixes C3, protects future tables):**

```sql
-- 004_harden_default_privileges.sql  — run as the migration/owner role (postgres)
alter default privileges in schema public revoke all     on tables    from anon;
alter default privileges in schema public revoke all     on sequences from anon;
alter default privileges in schema public revoke execute on functions from anon, public;
```

**Post-restore verification (cannot run now):** `get_advisors(security)`; confirm exposed-schema
list; confirm `pgcrypto` is in `extensions` not `public`; then re-run every assertion above and
confirm D1 passes for the new `submit_waitlist` function.

## Operational note (outside the checklist, needs a decision)

The project has been paused **>90 days** and the API refuses to restore it
(`BadRequestException: Project has been paused for more than 90 days and cannot be restored`).
Two consequences:

1. **The live site's waitlist form is currently broken** — submissions from
   milestonepediatrics.ai go to a dead endpoint (the client swallows this as
   "Something went wrong").
2. **Any real signups already in that database are at risk.** Check the Supabase
   dashboard for a backup download or restore-from-backup option for
   `jsbauumbjsolndjqkayt`; if families actually signed up, that's patient data and
   should be exported before Supabase reclaims it. If the table was empty/test-only,
   the simplest path is a fresh project created from these migrations **after**
   applying 003/004.
