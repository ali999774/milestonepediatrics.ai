import { supabase } from '@/lib/supabase'
import type { WaitlistStep1Insert, WaitlistStep2Update } from '@/lib/supabase'

// -------------------------------------------------------
// Shared result type — never throws
// -------------------------------------------------------

export type WaitlistResult<T = undefined> =
  | { success: true; data: T }
  | { success: false; error: string }

// -------------------------------------------------------
// Validation helpers.
// NOTE: this form collects PHI (child name, DOB, insurance). Writes go
// through SECURITY DEFINER RPCs, never a direct table call — the table
// is closed to the anon/authenticated API roles. These client checks are
// for UX only; the RPCs re-validate authoritatively server-side.
// -------------------------------------------------------

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PHONE_RE = /^[\d\s()+-]{7,20}$/

function sanitize(value: string): string {
  return value.trim().slice(0, 500)
}

function validateStep1(
  fields: WaitlistStep1Insert
): string | null {
  if (!fields.parent_name || sanitize(fields.parent_name).length < 1) {
    return 'Parent / guardian name is required.'
  }
  if (!fields.parent_email || !EMAIL_RE.test(fields.parent_email.trim())) {
    return 'Please enter a valid email address.'
  }
  if (!fields.child_name || sanitize(fields.child_name).length < 1) {
    return "Child's name is required."
  }
  return null
}

function validateStep2(
  fields: Omit<WaitlistStep2Update, 'step_completed'>
): string | null {
  if (fields.phone && !PHONE_RE.test(fields.phone.trim())) {
    return 'Please enter a valid phone number.'
  }
  return null
}

// -------------------------------------------------------
// Step 1 — submit_waitlist RPC (creates or merges on parent_email
// server-side). Returns the record UUID for Step 2. The table is not
// directly writable by anon; the SECURITY DEFINER function does the merge.
// -------------------------------------------------------

export async function submitWaitlistStep1(
  fields: WaitlistStep1Insert
): Promise<WaitlistResult<{ id: string }>> {
  const validationError = validateStep1(fields)
  if (validationError) {
    return { success: false, error: validationError }
  }

  const { data, error } = await supabase.rpc('submit_waitlist', {
    p_parent_name: fields.parent_name,
    p_parent_email: fields.parent_email,
    p_child_name: fields.child_name,
  })

  if (error || !data) {
    console.error('[waitlist] step1 error:', error?.message)
    return {
      success: false,
      error: 'Something went wrong. Please try again in a moment.',
    }
  }

  return { success: true, data: { id: data as string } }
}

// -------------------------------------------------------
// Step 2 — update_waitlist_details RPC (enriches by UUID, sets
// step_completed = 2 server-side). All fields optional (user can "Skip").
// The UUID from Step 1 is the capability token; the table is not directly
// updatable by anon.
// -------------------------------------------------------

export async function submitWaitlistStep2(
  id: string,
  fields: Omit<WaitlistStep2Update, 'step_completed'>
): Promise<WaitlistResult> {
  if (!id) {
    return { success: false, error: 'Missing record identifier.' }
  }

  const validationError = validateStep2(fields)
  if (validationError) {
    return { success: false, error: validationError }
  }

  const { error } = await supabase.rpc('update_waitlist_details', {
    p_id: id,
    p_child_dob: fields.child_dob ?? null,
    p_phone: fields.phone ?? null,
    p_insurance: fields.insurance ?? null,
    p_referral_source: fields.referral_source ?? null,
  })

  if (error) {
    console.error('[waitlist] step2 error:', error.message)
    return {
      success: false,
      error: 'Something went wrong. Please try again in a moment.',
    }
  }

  return { success: true, data: undefined }
}

// -------------------------------------------------------
// Skip Step 2 — marks record as step_completed = 2
// with no additional data. Convenience wrapper.
// -------------------------------------------------------

export async function skipWaitlistStep2(
  id: string
): Promise<WaitlistResult> {
  return submitWaitlistStep2(id, {})
}
