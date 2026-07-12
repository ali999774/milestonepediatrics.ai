-- ============================================================
-- Migration 003: Server-side intake RPCs; close the table to the API
-- Milestone Pediatrics — milestonepediatrics.ai
--
-- Replaces the old client-side upsert/update design (which required an
-- open anon UPDATE policy — audit finding CRITICAL, anyone could rewrite
-- every family's row). Intake now runs through SECURITY DEFINER RPCs
-- with a pinned, empty search_path; anon holds only EXECUTE on these two
-- functions and no direct table access at all.
-- ============================================================

-- -----------------------------------------------------------
-- Step 1 — create or merge a waitlist record by parent_email.
-- Returns the row id, which the client passes to step 2.
-- -----------------------------------------------------------
create or replace function public.submit_waitlist(
  p_parent_name  text,
  p_parent_email text,
  p_child_name   text
) returns uuid
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_id uuid;
begin
  -- Validate at the trust boundary; never rely on the client.
  if p_parent_email is null
     or p_parent_email !~ '^[^\s@]+@[^\s@]+\.[^\s@]+$' then
    raise exception 'invalid email';
  end if;
  if length(trim(coalesce(p_parent_name, ''))) = 0
     or length(trim(coalesce(p_child_name, ''))) = 0 then
    raise exception 'name required';
  end if;

  insert into public.waitlist (parent_name, parent_email, child_name, step_completed)
  values (left(trim(p_parent_name), 500),
          lower(trim(p_parent_email)),
          left(trim(p_child_name), 500),
          1)
  on conflict (parent_email) do update
    set parent_name = excluded.parent_name,
        child_name  = excluded.child_name,
        updated_at  = now()
  returning id into v_id;

  return v_id;
end;
$$;

-- -----------------------------------------------------------
-- Step 2 — enrich a record by its id and mark it step-complete.
-- The uuid returned from step 1 acts as an unguessable capability
-- token; acceptable for low-stakes intake. All fields optional, so a
-- "skip step 2" call (every field null) simply marks the row done.
-- -----------------------------------------------------------
create or replace function public.update_waitlist_details(
  p_id              uuid,
  p_child_dob       date default null,
  p_phone           text default null,
  p_insurance       text default null,
  p_referral_source text default null
) returns void
language plpgsql
security definer
set search_path = ''
as $$
begin
  if p_id is null then
    raise exception 'missing record id';
  end if;

  update public.waitlist
     set child_dob       = coalesce(p_child_dob, child_dob),
         phone           = coalesce(left(trim(p_phone), 500), phone),
         insurance       = coalesce(left(trim(p_insurance), 500), insurance),
         referral_source = coalesce(left(trim(p_referral_source), 500), referral_source),
         step_completed  = 2
   where id = p_id;

  if not found then
    raise exception 'record not found';
  end if;
end;
$$;

-- -----------------------------------------------------------
-- Grants: EXECUTE to anon only (never PUBLIC) for both RPCs.
-- -----------------------------------------------------------
revoke execute on function public.submit_waitlist(text, text, text) from public;
grant  execute on function public.submit_waitlist(text, text, text) to anon;

revoke execute on function public.update_waitlist_details(uuid, date, text, text, text) from public;
grant  execute on function public.update_waitlist_details(uuid, date, text, text, text) to anon;

-- -----------------------------------------------------------
-- Close the table itself to the API roles. The RPCs bypass RLS via
-- SECURITY DEFINER, so anon and authenticated need no direct table
-- privilege. This is defense in depth beneath the (policy-less) RLS.
-- -----------------------------------------------------------
revoke all on table public.waitlist from anon;
revoke all on table public.waitlist from authenticated;
