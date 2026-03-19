import { supabase } from '@/lib/supabase'
import type { WaitlistStep1Insert, WaitlistStep2Update } from '@/lib/supabase'

// -------------------------------------------------------
// Shared result type — never throws
// -------------------------------------------------------

export type WaitlistResult<T = undefined> =
  | { success: true; data: T }
  | { success: false; error: string }

// -------------------------------------------------------
// Validation helpers (kept simple — no PHI stored)
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
// Step 1 — Upsert on parent_email
// Duplicate emails UPDATE the existing row, never error.
// Returns the record UUID for Step 2.
// -------------------------------------------------------

export async function submitWaitlistStep1(
  fields: WaitlistStep1Insert
): Promise<WaitlistResult<{ id: string }>> {
  const validationError = validateStep1(fields)
  if (validationError) {
    return { success: false, error: validationError }
  }

  const payload = {
    parent_name: sanitize(fields.parent_name),
    parent_email: fields.parent_email.trim().toLowerCase(),
    child_name: sanitize(fields.child_name),
    step_completed: 1 as const,
  }

  const { data, error } = await supabase
    .from('waitlist')
    .upsert(payload, { onConflict: 'parent_email' })
    .select('id')
    .single()

  if (error) {
    console.error('[waitlist] step1 error:', error.message)
    return {
      success: false,
      error: 'Something went wrong. Please try again in a moment.',
    }
  }

  return { success: true, data: { id: data.id } }
}

// -------------------------------------------------------
// Step 2 — Update by UUID, set step_completed = 2
// All fields optional (user can "Skip" step 2).
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

  const payload: WaitlistStep2Update = {
    step_completed: 2,
    ...(fields.child_dob != null && { child_dob: fields.child_dob }),
    ...(fields.phone != null && { phone: sanitize(fields.phone) }),
    ...(fields.insurance != null && { insurance: sanitize(fields.insurance) }),
    ...(fields.referral_source != null && {
      referral_source: sanitize(fields.referral_source),
    }),
  }

  const { error } = await supabase
    .from('waitlist')
    .update(payload)
    .eq('id', id)

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
