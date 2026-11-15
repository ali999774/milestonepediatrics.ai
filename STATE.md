# STATE — Milestone Pediatrics Website
Last updated: 2026-11-15 (Claude Sonnet 5.5 via Antigravity)

## Purpose
Informational, pre-opening site at www.mymilestonepediatrics.com. No patient recruitment:
no waitlist, booking, forms, email or phone on routed pages. Planned to open 2027 (no month).

## Current
- Routed: /, /about, /services, /faq, /privacy. /contact redirects to /.
- PR #2 (feat/reopen-info-pages) retargeted to main and merged. Physician is unnamed on routed pages and meta; /about H1 is "About the practice". Name held back until a later date (Ali's call).
- Copy rules: location "Spring, TX (north Houston)"; no employer/UTHealth/McGovern; no named insurers.

## Open
- TODO(Ali) comments in About, Services, FAQ, meta: credentials, headshot/ABP badge, services detail, ages, hours, after-hours, telehealth, plan list.
- `npm run lint` fails: eslint not in devDependencies and no config (unverified fix needs new dependency).
- Contact.tsx (unrouted) still contains waitlist copy, WaitlistForm and the .ai email; Privacy.tsx mentions waitlist history. Out of scope.
- vercel.json /contact redirect is permanent (308); earlier permanent /about etc. redirects may be cached in browsers.
- Prerendering is the next task.
