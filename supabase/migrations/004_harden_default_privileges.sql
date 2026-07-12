-- ============================================================
-- Migration 004: Harden default privileges for future objects
-- Milestone Pediatrics — milestonepediatrics.ai
--
-- Postgres has no "RLS on by default", and Supabase's stock default
-- privileges auto-grant broad access to anon on new objects in public.
-- This migration revokes those future grants so a table added in a LATER
-- migration cannot ship world-writable before anyone writes a policy
-- (audit finding C3). Applies to objects created by the role that runs
-- this statement (the migration/owner role, postgres); it does not touch
-- existing objects — those are handled in migration 003.
-- ============================================================
alter default privileges in schema public revoke all     on tables    from anon;
alter default privileges in schema public revoke all     on sequences from anon;
alter default privileges in schema public revoke execute on functions from anon, public;
