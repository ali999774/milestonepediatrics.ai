# Tyler's Handoff

**From:** Tyler Morris (Frontend Dev)
**To:** Jordan Park (Integration), Rachel Lin (Backend)
**Project:** Milestone Pediatrics — Phase D

---

## Files Delivered

| File | Type | Notes |
|------|------|-------|
| `src/pages/Services.tsx` | Page | Insurance section BEFORE services grid; cards use "name + parent-language subtext" pattern |
| `src/pages/FAQ.tsx` | Page | 12 questions total; top 4 are high-conversion; Accordion opens first item by default |
| `src/pages/Contact.tsx` | Page | Two-step waitlist form; no social links; no real map embed |
| `src/components/Accordion.tsx` | Component | Animated, one-open-at-a-time, configurable `defaultOpenIndex` |
| `src/components/WaitlistForm.tsx` | Component | Two-step form with validation, loading, success states; placeholder submit handler |

---

## TypeScript Interfaces — Waitlist Form

These interfaces are exported from `src/components/WaitlistForm.tsx`. Jordan and Rachel should import them directly when wiring the Supabase submission.

```typescript
/** Step 1 — required fields (3 total) */
export interface WaitlistStep1Data {
  parentName: string;
  email: string;
  phone: string;
}

/** Step 2 — optional enrichment fields */
export interface WaitlistStep2Data {
  childAge: string;
  concerns: string;
  referralSource: string;
}
```

### Submission Payload Shape

The placeholder submit handler in `WaitlistForm.tsx` produces this shape:

```typescript
{
  ...WaitlistStep1Data,
  ...WaitlistStep2Data, // omitted if user clicks "Skip — I'm done"
  submittedAt: string;  // ISO 8601 timestamp
}
```

Rachel: the Supabase `waitlist` table should have columns for all six fields plus `submittedAt`. Step 2 fields are nullable since the user may skip.

Jordan: the placeholder handler is at the `handleFinalSubmit` function in `WaitlistForm.tsx`. Replace the `console.log` and `setTimeout` with the real Supabase call from Rachel's hook.

---

## Accordion Component API

```typescript
import { Accordion, type AccordionItem } from '../components/Accordion';

interface AccordionItem {
  id: string;
  question: string;
  answer: string;
}

interface AccordionProps {
  items: AccordionItem[];
  defaultOpenIndex?: number; // defaults to 0
}
```

---

## Placeholder Content Tags

All placeholder copy is marked with `{/* PLACEHOLDER: Dr. Ali — ... */}` comments. Search for `PLACEHOLDER` to find them.

---

## What I Did NOT Touch

- `src/components/ui/*` — Marco's design system (untouched)
- `src/lib/*` — Supabase client (untouched)
- `src/api/*` — does not exist yet (Rachel's domain)
- `src/pages/Home.tsx` — Priya's page
- `src/pages/About.tsx` — Priya's page

— Tyler
