-- ============================================================
-- Migration 002: Indexes + updated_at trigger
-- Milestone Pediatrics — milestonepediatrics.ai
-- Author: Rachel Lin (Backend)
-- ============================================================

-- -----------------------------------------------------------
-- Indexes
-- -----------------------------------------------------------

-- Fast lookup by email (upsert path)
create index if not exists idx_waitlist_parent_email
  on public.waitlist (parent_email);

-- Admin dashboard: recent submissions first
create index if not exists idx_waitlist_created_at_desc
  on public.waitlist (created_at desc);

-- Filter by completion step (e.g. find step-1-only rows for follow-up)
create index if not exists idx_waitlist_step_completed
  on public.waitlist (step_completed);

-- -----------------------------------------------------------
-- Trigger: auto-update updated_at on every row change
-- -----------------------------------------------------------
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger trg_waitlist_updated_at
  before update on public.waitlist
  for each row
  execute function public.set_updated_at();
