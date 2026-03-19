import { createClient } from '@supabase/supabase-js'

// -------------------------------------------------------
// Database type definitions
// -------------------------------------------------------

/** Row shape exactly matching the `public.waitlist` table. */
export interface WaitlistRow {
  id: string               // uuid
  parent_name: string
  parent_email: string
  child_name: string
  child_dob: string | null // ISO date string
  phone: string | null
  insurance: string | null
  referral_source: string | null
  step_completed: 1 | 2
  created_at: string       // ISO timestamptz
  updated_at: string       // ISO timestamptz
}

/** Fields sent for Step 1 insert / upsert. */
export interface WaitlistStep1Insert {
  parent_name: string
  parent_email: string
  child_name: string
}

/** Fields sent for Step 2 update. */
export interface WaitlistStep2Update {
  child_dob?: string | null
  phone?: string | null
  insurance?: string | null
  referral_source?: string | null
  step_completed: 2
}

// -------------------------------------------------------
// Supabase client — anon key only, safe for frontend
// -------------------------------------------------------

const rawUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined
const rawKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined

// Validate that the URL is a real HTTP(S) endpoint, not a placeholder string.
function isValidHttpUrl(url: string | undefined): url is string {
  if (!url) return false
  try {
    const parsed = new URL(url)
    return parsed.protocol === 'http:' || parsed.protocol === 'https:'
  } catch {
    return false
  }
}

const supabaseUrl = isValidHttpUrl(rawUrl) ? rawUrl : 'https://placeholder.supabase.co'
const supabaseAnonKey = rawKey && rawKey !== 'your-anon-key' ? rawKey : 'placeholder'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
