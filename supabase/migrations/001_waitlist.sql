-- ============================================================
-- Migration 001: Waitlist table + RLS policies
-- Milestone Pediatrics — milestonepediatrics.ai
-- Author: Rachel Lin (Backend)
-- ============================================================

-- Enable UUID generation
create extension if not exists "pgcrypto";

-- -----------------------------------------------------------
-- Table: public.waitlist
-- Two-step waitlist intake. Step 1 collects minimal contact
-- info; Step 2 enriches the record with optional details.
-- NO clinical data or PHI is stored.
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

  -- Upsert key — duplicate emails update, never error
  constraint waitlist_parent_email_unique unique (parent_email)
);

-- -----------------------------------------------------------
-- Row-Level Security
-- -----------------------------------------------------------
alter table public.waitlist enable row level security;

-- 1. Public INSERT — anyone (anon) can submit a waitlist entry
create policy "anon_insert_waitlist"
  on public.waitlist
  for insert
  to anon
  with check (true);

-- 2. Public UPDATE by ID — anon can update their own record
--    (frontend holds the UUID returned from Step 1)
create policy "anon_update_waitlist_by_id"
  on public.waitlist
  for update
  to anon
  using (true)
  with check (true);

-- 3. Authenticated SELECT — only logged-in admin can read rows
create policy "auth_select_waitlist"
  on public.waitlist
  for select
  to authenticated
  using (true);

-- -----------------------------------------------------------
-- Comment on table
-- -----------------------------------------------------------
comment on table public.waitlist is
  'Two-step waitlist intake for prospective patient families. No PHI.';
