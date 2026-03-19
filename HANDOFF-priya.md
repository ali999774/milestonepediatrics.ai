# Priya's Handoff

**To:** Jordan Park (Integration), Dr. Ali (Content Review)
**From:** Priya Nair
**Pages:** `src/pages/Home.tsx`, `src/pages/About.tsx`

---

## What Was Built

### Home.tsx
- **Hero section** with "Now Accepting Waitlist Applications" Badge (above the fold), headline, subheadline, insurance trust badge, and CTA #1 (Join the Waitlist + Meet Your Doctor)
- **Approach section** with 3-column Card grid (Relationship-First, Evidence-Based, Accessible & Responsive)
- **Trust/Insurance strip** with insurance carrier badges (BCBS, Aetna, UnitedHealthcare, Cigna)
- **Mid-page CTA** (#2) with "Reserve My Child's Spot" — distinct framing from hero
- **Testimonials section** with 3-column Card grid (3 placeholder testimonials)
- **Bottom banner CTA** (#3) on `bg-primary` with white text and inverted CTA button
- **Mobile sticky CTA bar** — fixed bottom, 52px height, dismissable via localStorage key `mp_sticky_cta_dismissed`

### About.tsx
- **Hero section** with physician headshot placeholder (200px circle, scales to 240px on desktop), credentials strip (4 Badge components), name/bio, and waitlist CTA
- **Philosophy section** with 3-column Card grid (Listening First, Partnering with Parents, Growing Together)
- **Why Milestone section** with 3 paragraphs on practice name/model/experience
- **Closing CTA** on `bg-primary` with waitlist + services links

---

## Design Decisions for Jordan to Review

1. **Headshot placeholder size**: Used `w-[200px] h-[200px]` minimum, scaling to `w-[240px] h-[240px]` on `md:`. The 200px minimum is per Marco's spec. The 240px desktop size felt more proportional next to the bio text — adjust if needed.

2. **Credentials strip placement**: Positioned above the H1 on About (not below it). This follows Marco's directive that "visual weight of credentials MUST overpower the bio text" — parents scan for qualifications first.

3. **About hero layout**: Side-by-side on desktop (headshot left, bio right), stacked centered on mobile. The `md:items-start` aligns the headshot to the top of the bio text block.

4. **About CTA section**: Added a closing CTA matching the Home bottom banner pattern for consistency. Links to Contact (primary) and Services (secondary).

5. **Home inline styles**: Two inline styles remain — the sticky CTA height (`52px`) and the decorative gradient blob. Both are intentional: the height needs to be exact for the 48-56px spec, and the radial gradient can't be expressed in Tailwind alone.

---

## What Needs Content from Dr. Ali

Both pages are populated with placeholder copy. Every placeholder is marked with:

```
// PLACEHOLDER: Dr. Ali — [specific instruction]
```

(in JS object data) or

```
{/* PLACEHOLDER: Dr. Ali — [specific instruction] */}
```

(in JSX). Search for `PLACEHOLDER: Dr. Ali` to find all 34 instances across both files.

Key content needed:
- **Home**: Headline, subheadline, approach card descriptions, testimonials (3 real ones), insurance carriers, CTA copy
- **About**: Full name, bio paragraphs, credentials list, philosophy descriptions, practice name story

---

## What I Did NOT Touch

- `src/components/ui/*` — used as-is
- `src/lib/*` — not needed
- `src/api/*` — not needed
- All other page files (Services, FAQ, Contact, Privacy, NotFound)
- Nav, Footer, router config

---

## Verification

- TypeScript: `npx tsc --noEmit` passes with zero errors
- "Welcome" does not appear on either page
- All internal navigation uses `<Link>` from React Router
- Three distinct CTA positions on Home confirmed
- Credentials strip and headshot placeholder are above the fold on About

— Priya
