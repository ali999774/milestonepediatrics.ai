-- ============================================================
-- Migration 006: Disable waitlist intake RPCs
-- Milestone Pediatrics — milestonepediatrics.ai
--
-- Objective:
-- The practice is in planning and not open or accepting patients.
-- This migration shuts down public intake endpoints while preserving
-- the `public.waitlist` table and all existing records intact for
-- authorized review.
--
-- Safety:
-- - Non-destructive: No data is deleted, no tables or functions are dropped.
-- - Reversible: Intake can be re-enabled prior to launch by re-granting EXECUTE.
-- - Scoped: Targets only the two waitlist intake RPCs in schema `public`.
-- ============================================================

-- Revoke EXECUTE from all API and public roles on both intake RPCs
revoke execute on function public.submit_waitlist(text, text, text)
  from public, anon, authenticated, service_role;

revoke execute on function public.update_waitlist_details(uuid, date, text, text, text)
  from public, anon, authenticated, service_role;

-- Document disabled status on both functions
comment on function public.submit_waitlist(text, text, text) is
  'DISABLED: Public intake is disabled while Milestone Pediatrics is in planning. All existing records in public.waitlist are preserved.';

comment on function public.update_waitlist_details(uuid, date, text, text, text) is
  'DISABLED: Public intake is disabled while Milestone Pediatrics is in planning. All existing records in public.waitlist are preserved.';

-- ============================================================
-- Read-only catalog verification query (does not read waitlist rows):
--
-- select
--   p.proname as function_name,
--   pg_get_function_identity_arguments(p.oid) as args,
--   has_function_privilege('anon', p.oid, 'EXECUTE') as anon_can_exec,
--   has_function_privilege('authenticated', p.oid, 'EXECUTE') as auth_can_exec,
--   has_function_privilege('service_role', p.oid, 'EXECUTE') as service_role_can_exec
-- from pg_proc p
-- join pg_namespace n on n.oid = p.pronamespace
-- where n.nspname = 'public'
--   and p.proname in ('submit_waitlist', 'update_waitlist_details');
--
-- Expected result: anon_can_exec = false, auth_can_exec = false, service_role_can_exec = false
-- ============================================================
