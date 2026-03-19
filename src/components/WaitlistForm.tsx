import { useState } from 'react';
import { Button } from './ui/Button';
import { CheckCircle } from 'lucide-react';
import {
  submitWaitlistStep1,
  submitWaitlistStep2,
  skipWaitlistStep2,
} from '@/api/waitlist';

// ─── TypeScript Interfaces (aligned with Rachel's DB schema) ────────────────

/** Step 1 — required fields (3 total, matching WaitlistStep1Insert) */
export interface WaitlistStep1Data {
  parentName: string;
  email: string;
  childName: string;
}

/** Step 2 — optional enrichment fields (matching WaitlistStep2Update) */
export interface WaitlistStep2Data {
  phone: string;
  childDob: string;
  insurance: string;
  referralSource: string;
}

// ─── Validation helpers ──────────────────────────────────────────────────────

function validateStep1(data: WaitlistStep1Data): Partial<Record<keyof WaitlistStep1Data, string>> {
  const errors: Partial<Record<keyof WaitlistStep1Data, string>> = {};
  if (!data.parentName.trim()) errors.parentName = 'Please enter your name.';
  if (!data.email.trim()) {
    errors.email = 'Email is required.';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = 'Please enter a valid email address.';
  }
  if (!data.childName.trim()) errors.childName = "Please enter your child's name.";
  return errors;
}

// ─── Component ───────────────────────────────────────────────────────────────

export function WaitlistForm() {
  const [step, setStep] = useState<1 | 2 | 'success'>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [recordId, setRecordId] = useState<string | null>(null);
  const [apiError, setApiError] = useState<string | null>(null);

  // Step 1 state
  const [step1, setStep1] = useState<WaitlistStep1Data>({
    parentName: '',
    email: '',
    childName: '',
  });
  const [step1Errors, setStep1Errors] = useState<Partial<Record<keyof WaitlistStep1Data, string>>>({});

  // Step 2 state
  const [step2, setStep2] = useState<WaitlistStep2Data>({
    phone: '',
    childDob: '',
    insurance: '',
    referralSource: '',
  });

  // ── Step 1 Submit ──────────────────────────────────────────────────────────

  const handleStep1Submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errors = validateStep1(step1);
    setStep1Errors(errors);
    if (Object.keys(errors).length > 0) return;

    setIsSubmitting(true);
    setApiError(null);

    const result = await submitWaitlistStep1({
      parent_name: step1.parentName,
      parent_email: step1.email,
      child_name: step1.childName,
    });

    setIsSubmitting(false);

    if (result.success) {
      setRecordId(result.data.id);
      setStep(2);
    } else {
      setApiError(result.error);
    }
  };

  // ── Step 2 Submit (or Skip) ────────────────────────────────────────────────

  const handleFinalSubmit = async (skipped: boolean) => {
    if (!recordId) return;

    setIsSubmitting(true);
    setApiError(null);

    let result;

    if (skipped) {
      result = await skipWaitlistStep2(recordId);
    } else {
      result = await submitWaitlistStep2(recordId, {
        phone: step2.phone || null,
        child_dob: step2.childDob || null,
        insurance: step2.insurance || null,
        referral_source: step2.referralSource || null,
      });
    }

    setIsSubmitting(false);

    if (result.success) {
      setStep('success');
    } else {
      setApiError(result.error);
    }
  };

  // ── Render ─────────────────────────────────────────────────────────────────

  if (step === 'success') {
    return (
      <div className="text-center py-10">
        <div className="flex justify-center mb-4">
          <CheckCircle className="w-14 h-14 text-primary" aria-hidden="true" />
        </div>
        <h3 className="text-2xl font-bold text-neutral-800 mb-2">
          You're on the list!
        </h3>
        <p className="text-neutral-600 max-w-md mx-auto">
          Thank you for your interest in Milestone Pediatrics. We'll reach out
          to confirm your spot as we get closer to opening day.
        </p>
      </div>
    );
  }

  return (
    <div>
      {/* Progress indicator */}
      <div className="flex items-center gap-3 mb-8">
        <span
          className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-semibold ${
            step === 1
              ? 'bg-primary text-white'
              : 'bg-primary-light text-primary'
          }`}
        >
          1
        </span>
        <div className="h-px flex-1 bg-neutral-200" />
        <span
          className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-semibold ${
            step === 2
              ? 'bg-primary text-white'
              : 'bg-neutral-100 text-neutral-400'
          }`}
        >
          2
        </span>
      </div>

      {/* API error banner */}
      {apiError && (
        <div className="mb-6 rounded-button bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700" role="alert">
          {apiError}
        </div>
      )}

      {/* ── STEP 1 ────────────────────────────────────────────────────────────── */}
      {step === 1 && (
        <form onSubmit={handleStep1Submit} noValidate>
          <p className="text-sm text-neutral-500 mb-6">
            Step 1 of 2 — just the essentials. Takes under a minute.
          </p>

          {/* Parent / Guardian Name */}
          <div className="mb-5">
            <label
              htmlFor="parentName"
              className="block text-sm font-medium text-neutral-700 mb-1"
            >
              Parent / Guardian Name
            </label>
            <input
              id="parentName"
              type="text"
              autoComplete="name"
              value={step1.parentName}
              onChange={(e) =>
                setStep1({ ...step1, parentName: e.target.value })
              }
              className={`w-full rounded-button border px-4 py-2.5 text-base text-neutral-800 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition ${
                step1Errors.parentName
                  ? 'border-red-400 focus:ring-red-400'
                  : 'border-neutral-300'
              }`}
              placeholder="e.g. Jamie Rivera"
            />
            {step1Errors.parentName && (
              <p className="mt-1 text-sm text-red-500" role="alert">
                {step1Errors.parentName}
              </p>
            )}
          </div>

          {/* Email */}
          <div className="mb-5">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-neutral-700 mb-1"
            >
              Email Address
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              value={step1.email}
              onChange={(e) => setStep1({ ...step1, email: e.target.value })}
              className={`w-full rounded-button border px-4 py-2.5 text-base text-neutral-800 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition ${
                step1Errors.email
                  ? 'border-red-400 focus:ring-red-400'
                  : 'border-neutral-300'
              }`}
              placeholder="you@example.com"
            />
            <p className="mt-1 text-xs text-neutral-400">
              We'll only use this to contact you about your waitlist status.
            </p>
            {step1Errors.email && (
              <p className="mt-1 text-sm text-red-500" role="alert">
                {step1Errors.email}
              </p>
            )}
          </div>

          {/* Child's Name */}
          <div className="mb-8">
            <label
              htmlFor="childName"
              className="block text-sm font-medium text-neutral-700 mb-1"
            >
              Child's Name
            </label>
            <input
              id="childName"
              type="text"
              value={step1.childName}
              onChange={(e) => setStep1({ ...step1, childName: e.target.value })}
              className={`w-full rounded-button border px-4 py-2.5 text-base text-neutral-800 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition ${
                step1Errors.childName
                  ? 'border-red-400 focus:ring-red-400'
                  : 'border-neutral-300'
              }`}
              placeholder="e.g. Sofia Rivera"
            />
            {step1Errors.childName && (
              <p className="mt-1 text-sm text-red-500" role="alert">
                {step1Errors.childName}
              </p>
            )}
          </div>

          <Button type="submit" variant="primary" size="lg" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Continue'}
          </Button>
        </form>
      )}

      {/* ── STEP 2 ────────────────────────────────────────────────────────────── */}
      {step === 2 && (
        <div>
          <p className="text-sm text-neutral-500 mb-6">
            Step 2 of 2 — completely optional. Share a little more so we can
            prepare for your visit.
          </p>

          {/* Phone Number */}
          <div className="mb-5">
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-neutral-700 mb-1"
            >
              Phone Number
            </label>
            <input
              id="phone"
              type="tel"
              autoComplete="tel"
              value={step2.phone}
              onChange={(e) => setStep2({ ...step2, phone: e.target.value })}
              className="w-full rounded-button border border-neutral-300 px-4 py-2.5 text-base text-neutral-800 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
              placeholder="(555) 123-4567"
            />
          </div>

          {/* Child's Date of Birth */}
          <div className="mb-5">
            <label
              htmlFor="childDob"
              className="block text-sm font-medium text-neutral-700 mb-1"
            >
              Child's Date of Birth
            </label>
            <input
              id="childDob"
              type="date"
              value={step2.childDob}
              onChange={(e) => setStep2({ ...step2, childDob: e.target.value })}
              className="w-full rounded-button border border-neutral-300 px-4 py-2.5 text-base text-neutral-800 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
            />
            <p className="mt-1 text-xs text-neutral-400">
              Leave blank if not yet born or if you'd prefer not to share.
            </p>
          </div>

          {/* Insurance Provider */}
          <div className="mb-5">
            <label
              htmlFor="insurance"
              className="block text-sm font-medium text-neutral-700 mb-1"
            >
              Insurance Provider
            </label>
            <input
              id="insurance"
              type="text"
              value={step2.insurance}
              onChange={(e) => setStep2({ ...step2, insurance: e.target.value })}
              className="w-full rounded-button border border-neutral-300 px-4 py-2.5 text-base text-neutral-800 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
              placeholder="e.g. Blue Cross Blue Shield"
            />
          </div>

          {/* Referral Source */}
          <div className="mb-8">
            <label
              htmlFor="referralSource"
              className="block text-sm font-medium text-neutral-700 mb-1"
            >
              How Did You Hear About Us?
            </label>
            <select
              id="referralSource"
              value={step2.referralSource}
              onChange={(e) =>
                setStep2({ ...step2, referralSource: e.target.value })
              }
              className="w-full rounded-button border border-neutral-300 px-4 py-2.5 text-base text-neutral-800 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition bg-white"
            >
              <option value="">Select one (optional)</option>
              <option value="search">Online Search</option>
              <option value="referral">Friend or Family Referral</option>
              <option value="social">Social Media</option>
              <option value="doctor">Another Doctor</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="flex flex-col gap-3">
            <Button
              type="button"
              variant="primary"
              size="lg"
              className="w-full"
              disabled={isSubmitting}
              onClick={() => handleFinalSubmit(false)}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Application'}
            </Button>
            <button
              type="button"
              onClick={() => handleFinalSubmit(true)}
              disabled={isSubmitting}
              className="text-center py-2 text-base font-medium text-neutral-500 hover:text-primary transition-colors disabled:opacity-50"
            >
              Skip — I'm done
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
