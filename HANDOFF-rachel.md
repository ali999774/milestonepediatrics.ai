# HANDOFF — Rachel Lin (Backend Developer)

**Ticket:** TICKET-06 — Supabase Schema & Form Logic
**Status:** Complete
**Date:** 2026-03-15

---

## Files Delivered

| File | Purpose |
|------|---------|
| `src/lib/supabase.ts` | Supabase client + all TypeScript interfaces |
| `src/api/waitlist.ts` | Three exported functions for the two-step waitlist flow |
| `supabase/migrations/001_waitlist.sql` | Table schema, constraints, RLS policies |
| `supabase/migrations/002_indexes_and_triggers.sql` | Indexes + `updated_at` trigger |

---

## Environment Variables Required

Add these to `.env` (and Vercel environment settings for production):

```
VITE_SUPABASE_URL=https://<project-ref>.supabase.co
VITE_SUPABASE_ANON_KEY=<anon-public-key>
```

Both are prefixed with `VITE_` so Vite exposes them to the browser. **No service role key is used anywhere in frontend code.**

---

## Database Schema: `public.waitlist`

| Column | Type | Default | Nullable | Notes |
|--------|------|---------|----------|-------|
| `id` | `uuid` | `gen_random_uuid()` | no | Primary key |
| `parent_name` | `text` | — | no | Step 1 |
| `parent_email` | `text` | — | no | Step 1, **UNIQUE** (upsert key) |
| `child_name` | `text` | — | no | Step 1 |
| `child_dob` | `date` | `null` | yes | Step 2 |
| `phone` | `text` | `null` | yes | Step 2 |
| `insurance` | `text` | `null` | yes | Step 2 |
| `referral_source` | `text` | `null` | yes | Step 2 |
| `step_completed` | `smallint` | `1` | no | `CHECK (step_completed IN (1, 2))` |
| `created_at` | `timestamptz` | `now()` | no | Auto-set |
| `updated_at` | `timestamptz` | `now()` | no | Auto-updated by trigger |

### Indexes

- `idx_waitlist_parent_email` — fast upsert lookup
- `idx_waitlist_created_at_desc` — admin dashboard sorting
- `idx_waitlist_step_completed` — filter by completion step

### Trigger

`trg_waitlist_updated_at` — automatically sets `updated_at = now()` on every row update.

---

## Row-Level Security (RLS)

| Policy | Role | Operation | Behavior |
|--------|------|-----------|----------|
| `anon_insert_waitlist` | `anon` | INSERT | Allow all — anyone can submit |
| `anon_update_waitlist_by_id` | `anon` | UPDATE | Allow all — frontend holds UUID from Step 1 |
| `auth_select_waitlist` | `authenticated` | SELECT | Allow all — admin reads only |

**No DELETE policy exists.** Rows cannot be deleted via the API.

---

## TypeScript Interfaces

All exported from `@/lib/supabase`:

```typescript
import type {
  WaitlistRow,
  WaitlistStep1Insert,
  WaitlistStep2Update,
} from '@/lib/supabase'
```

### `WaitlistRow`

Full row as returned by Supabase SELECT:

```typescript
interface WaitlistRow {
  id: string
  parent_name: string
  parent_email: string
  child_name: string
  child_dob: string | null
  phone: string | null
  insurance: string | null
  referral_source: string | null
  step_completed: 1 | 2
  created_at: string
  updated_at: string
}
```

### `WaitlistStep1Insert`

What the Step 1 form collects:

```typescript
interface WaitlistStep1Insert {
  parent_name: string
  parent_email: string
  child_name: string
}
```

### `WaitlistStep2Update`

What the Step 2 form sends (all fields except `step_completed` are optional):

```typescript
interface WaitlistStep2Update {
  child_dob?: string | null
  phone?: string | null
  insurance?: string | null
  referral_source?: string | null
  step_completed: 2
}
```

---

## API Functions

All exported from `@/api/waitlist`:

```typescript
import {
  submitWaitlistStep1,
  submitWaitlistStep2,
  skipWaitlistStep2,
  type WaitlistResult,
} from '@/api/waitlist'
```

### Return Type

Every function returns `Promise<WaitlistResult<T>>`. **Functions never throw.**

```typescript
type WaitlistResult<T = undefined> =
  | { success: true; data: T }
  | { success: false; error: string }
```

The `error` string is always user-friendly (safe to render in UI).

---

### `submitWaitlistStep1(fields: WaitlistStep1Insert)`

**Returns:** `Promise<WaitlistResult<{ id: string }>>`

**Behavior:**
1. Validates all three fields (name, email, child name)
2. Sanitizes input (trims, truncates to 500 chars, lowercases email)
3. **Upserts** on `parent_email` — if the email already exists, the row is updated (never errors on duplicate)
4. Returns `{ success: true, data: { id: '<uuid>' } }` on success
5. Returns `{ success: false, error: '<message>' }` on validation or DB failure

**Jordan — this is how you wire it:**

```typescript
const result = await submitWaitlistStep1({
  parent_name: formValues.parentName,
  parent_email: formValues.email,
  child_name: formValues.childName,
})

if (result.success) {
  // Store result.data.id — you need it for Step 2
  setRecordId(result.data.id)
  goToStep2()
} else {
  setErrorMessage(result.error)
}
```

---

### `submitWaitlistStep2(id: string, fields)`

**Returns:** `Promise<WaitlistResult>`

**Parameters:**
- `id` — the UUID returned from Step 1
- `fields` — object with optional keys: `child_dob`, `phone`, `insurance`, `referral_source`

**Behavior:**
1. Validates phone format if provided
2. Updates the row matching `id`, sets `step_completed = 2`
3. Only sends non-null fields to Supabase (sparse update)

**Wiring example:**

```typescript
const result = await submitWaitlistStep2(recordId, {
  child_dob: formValues.dob || null,
  phone: formValues.phone || null,
  insurance: formValues.insurance || null,
  referral_source: formValues.referralSource || null,
})

if (result.success) {
  showSuccessScreen()
} else {
  setErrorMessage(result.error)
}
```

---

### `skipWaitlistStep2(id: string)`

**Returns:** `Promise<WaitlistResult>`

Convenience wrapper — marks the record as `step_completed = 2` with no additional data. Use this for the "Skip" button on Step 2.

```typescript
await skipWaitlistStep2(recordId)
showSuccessScreen()
```

---

## Validation Rules

| Field | Rule |
|-------|------|
| `parent_name` | Required, non-empty after trim |
| `parent_email` | Required, must match `/^[^\s@]+@[^\s@]+\.[^\s@]+$/` |
| `child_name` | Required, non-empty after trim |
| `phone` | Optional, if provided must match `/^[\d\s()+-]{7,20}$/` |
| All text fields | Trimmed + truncated to 500 chars max |

---

## Upsert Behavior (Important!)

When `submitWaitlistStep1` is called with an email that already exists:
- The existing row is **updated** with the new `parent_name` and `child_name`
- `step_completed` is reset to `1`
- `updated_at` is refreshed by the trigger
- The **same UUID** is returned (stable ID)
- **No error is raised** — this is intentional

This means users can re-submit Step 1 to correct their info without creating duplicates.

---

## What Is NOT Stored

Per HIPAA-awareness requirements:
- No clinical data or symptoms
- No diagnoses or medical history
- No SSN, insurance ID numbers, or billing info
- The `insurance` field stores only the **provider name** (e.g., "Blue Cross Blue Shield"), not policy numbers

---

## Running Migrations

Apply in order against your Supabase project:

```bash
# Via Supabase CLI
supabase db push

# Or manually in Supabase SQL Editor:
# 1. Run supabase/migrations/001_waitlist.sql
# 2. Run supabase/migrations/002_indexes_and_triggers.sql
```

---

## Checklist

- [x] Three functions exported: `submitWaitlistStep1`, `submitWaitlistStep2`, `skipWaitlistStep2`
- [x] All TypeScript interfaces exported from `@/lib/supabase`
- [x] Migration SQL complete — schema, constraints, indexes, trigger
- [x] RLS: public insert, public update, authenticated-only read
- [x] No service role key in frontend — anon key only
- [x] Functions never throw — always return `{ success, data/error }`
- [x] Error messages are user-friendly (safe for UI display)
- [x] Zero TypeScript errors (`npx tsc --noEmit` passes clean)
