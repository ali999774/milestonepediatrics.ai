-- ============================================================
-- Migration 005: Revoke Supabase's stock auto-grants on our functions
-- Milestone Pediatrics — milestonepediatrics.ai
--
-- Supabase ships project-level DEFAULT PRIVILEGES that auto-grant
-- EXECUTE on new functions to anon, authenticated, AND service_role at
-- creation time. Migration 003 granted anon and revoked PUBLIC, but the
-- explicit `authenticated` auto-grant survived (it is not PUBLIC), and
-- migration 004 ran too late to affect functions 003 had already created
-- (ALTER DEFAULT PRIVILEGES only applies to objects created afterward).
--
-- This migration retracts those unintended grants so the live ACL matches
-- the stated posture: the two intake RPCs are EXECUTE-able by anon ONLY;
-- the trigger function is not API-callable at all.
-- ============================================================

-- Two intake RPCs: strip authenticated + service_role, keep anon.
revoke execute on function public.submit_waitlist(text, text, text)
  from authenticated, service_role;
revoke execute on function public.update_waitlist_details(uuid, date, text, text, text)
  from authenticated, service_role;

-- Trigger function: not meant to be API-callable by anyone. Strip all
-- API roles + PUBLIC; it runs only in trigger context as table owner.
revoke execute on function public.set_updated_at()
  from public, anon, authenticated, service_role;
