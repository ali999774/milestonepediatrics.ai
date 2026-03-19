# Marco's Design Handoff

**To:** Jordan, Priya, Tyler  
**From:** Marco Rivera  
**Project:** Milestone Pediatrics

This document serves as the single source of truth for the visual design foundation, trust signaling, and layout patterns for `milestonepediatrics.ai`. If it's in this document, it's not a suggestion—it's a requirement to maintain the premium, trustworthy brand feel.

## 0. Design Token Reference (Exact Values)

| Token | CSS Variable | Hex Value | Usage |
|-------|-------------|-----------|-------|
| `primary` | `--color-primary` | `#0E8C72` | CTAs, success states, accepting patients signal |
| `primary-light` | `--color-primary-light` | `#E8F5F2` | Badge backgrounds, hover states |
| `secondary` | `--color-secondary` | `#F6F8F7` | Alternating section backgrounds |
| `accent` | `--color-accent` | `#E88C5D` | Highlights, warm CTAs |
| `surface` | `--color-surface` | `#FCFAF8` | **Default page background** (warm off-white, not pure white) |
| `neutral-800` | `--color-neutral-800` | `#292524` | Body text |
| `neutral-600` | `--color-neutral-600` | `#57534E` | Secondary/muted text |

**Font Family:** `Inter` — Load via Google Fonts in `<head>` or install via Fontsource (`@fontsource/inter`). The CSS var is `--font-sans`. The Tailwind class is `font-sans`.

```html
<!-- Google Fonts load (recommended) -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
```

## 1. Color Discipline & Tokens

**DO NOT use hardcoded hex values or arbitrary Tailwind colors (e.g., `text-blue-500`).** Use our brand tokens.
- **`primary` (Soft Teal)**: This is our highest-signal color. Reserved strictly for actions (CTAs), confirmation states, and the "Accepting Patients" trust signals. It is not a decorative color.
- **`surface` (Warm off-white)**: Default background color (`bg-surface`). Do not use pure `#FFFFFF` for the main body background; warm white is more approachable and human.
- **`secondary` (Light Sage)**: Use for alternating section backgrounds where `surface` or `white` needs contrast.
- **`No Red`**: Do not use red anywhere except strict form validation errors. Red triggers medical anxiety.
- **White Space**: Generous whitespace (`py-12` minimum, up to `py-20` on desktop). Use the `SectionWrapper` component to enforce this.

## 2. Trust Signal Patterns

A pediatric website must establish absolute trust. These are non-negotiable patterns:

### "Accepting New Patients" Signal
- **Location:** Home page hero (above the fold, immediate).
- **Component Use:** `<Badge variant="success">Now Accepting Waitlist Applications</Badge>`.
- **Why:** This is the highest-priority functional trust signal.

### Credentials Strip (About Page)
- **Location:** Near the top of the About page, visible before scrolling.
- **Format:** A compact horizontal band of credentials using the `Badge` component (variants `neutral` or `accent` or standard icons). 
- **Rule:** The visual weight of these credentials MUST overpower the bio text. Parents scan for qualifications first.

### Insurance Placeholder
- **Location:** Services page (prominently) and briefly on the Home page.
- **Format:** Do not bury this in a paragraph. Treat it as a badge/list. `<Badge variant="success">Most Major Plans Accepted</Badge>` along with space to eventually drop in real carrier visual logos.

### Physician Photo Slot (About Page)
- **Location:** Above the fold on the About page.
- **Size:** MUST be a minimum 200px × 200px area. Use a gray circle placeholder (`bg-neutral-200 rounded-full w-[200px] h-[200px]`) for development. 
- **Rule:** Do not shrink this. Parents need to clearly see the face of the person treating their child.

## 3. Conversion Layout Patterns (Home & Contact)

### Homepage CTAs (Three Positions)
The Home page requires three distinct conversion moments so parents are never searching for the next step:
1. **Hero:** Immediate, right below the headline/value prop.
2. **Mid-page:** After establishing trust (e.g., after the approach or testimonials).
3. **Bottom Banner:** A full-width `SectionWrapper` with `background="primary"`, large white text, and a white or inverted primary CTA Button.

### Mobile Sticky CTA Bar (Home Only)
- **What:** Fixed bottom bar on mobile viewports (`fixed bottom-0 w-full`).
- **Specs:** Low height (48–56px). Content: "Accepting waitlist applications" + small CTA `<Button size="sm">`.
- **Functionality:** Must be easily dismissible (X button). Coordinate with Priya on state management.

### Two-Step Form Layout (Contact Page)
- **Objective:** Feel approachable, not clinical or overwhelming.
- **Step 1:** Maximum 3 essential fields (e.g., Name, Email, Phone) + Submit Button. Visually light.
- **Step 2:** Expand to optional fields (e.g., Child's age, specific concerns). MUST include a prominent "Skip — I'm done" option.

## 4. Components Checklist

The `src/components/ui/` directory has the base ingredients:
1. `Button` (primary, secondary, ghost) - Note the `scale-[1.02]` transform. It should feel alive.
2. `Card` (soft shadow, surface background). Maximum 3 columns in grids.
3. `Badge` (success, neutral, accent).
4. `SectionWrapper` (handles consistent vertical rhythm).
5. `Nav` (sticky, desktop + mobile drawer).
6. `Footer` (structured links, calm layout).

Any questions about styling or component implementation down the road—ping me. Trust the tokens.

— Marco
