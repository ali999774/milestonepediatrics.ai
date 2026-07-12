-- ============================================================
-- Migration 001: Waitlist table + RLS
-- Milestone Pediatrics — milestonepediatrics.ai
--
-- Security posture set by audit 2026-07-12 (supabase-security-audit):
-- the table is closed to the REST API. All writes go through the
-- SECURITY DEFINER RPCs in migration 003; staff read via the Supabase
-- dashboard as the postgres role. There is deliberately no anon UPDATE
-- policy and no blanket authenticated SELECT — both leaked PHI.
-- ============================================================

-- gen_random_uuid() is in the Postgres 17 core. pgcrypto is pinned to
-- the dedicated `extensions` schema (never `public`) for any other
-- crypto helpers, per audit finding H2.
create extension if not exists "pgcrypto" with schema extensions;

-- -----------------------------------------------------------
-- Table: public.waitlist
-- Two-step waitlist intake for prospective patient families.
--
-- CONTAINS PHI. child_name, child_dob, and insurance tie an
-- identifiable child to a pediatric practice; treat every row as
-- patient-identifiable health information. (An earlier version of this
-- migration wrongly labelled the table "No PHI" — that false claim was
-- itself the liability and has been removed.)
-- -----------------------------------------------------------
create table if not exists public.waitlist (
  id              uuid primary key default gen_random_uuid(),

  -- Step 1 fields (required)
  parent_name     text        not null,
  parent_email    text        not null,
  child_name      text        not null,

  -- Step 2 fields (optional enrichment)
  child_dob       date,
  phone           text,
  insurance       text,
  referral_source text,

  -- Tracking
  step_completed  smallint    not null default 1
                    check (step_completed in (1, 2)),
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now(),

  -- Merge key — the submit RPC upserts on this
  constraint waitlist_parent_email_unique unique (parent_email)
);

-- -----------------------------------------------------------
-- Row-Level Security
-- Enabled with NO policies for anon or authenticated: both API roles
-- get zero row access (default deny). The intake RPCs (migration 003)
-- run SECURITY DEFINER and bypass RLS; the postgres/dashboard role
-- bypasses RLS for staff review. This is the correct closed posture for
-- a PHI table with no in-app read surface.
-- -----------------------------------------------------------
alter table public.waitlist enable row level security;

-- -----------------------------------------------------------
-- Comment on table
-- -----------------------------------------------------------
comment on table public.waitlist is
  'Two-step waitlist intake for prospective patient families. CONTAINS PHI '
  '(child name, DOB, insurance). REST API access is closed: writes go through '
  'the submit_waitlist / update_waitlist_details SECURITY DEFINER RPCs; reads '
  'happen only via the Supabase dashboard as postgres.';
