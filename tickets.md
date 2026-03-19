# Milestone Pediatrics - Project Tickets

This document serves as the master task reference for the milestonepediatrics.ai website build.

---

## [TICKET-01] Project Strategy & Roadmapping
- **Assignee:** Sophia Chen (Project Manager)
- **Phase:** Phase A — Strategy
- **Dependency:** None (Start of Project)
- **Key Tasks:**
    1. Read and synthesize Dr. Ali's Project Brief.
    2. Define build sequencing and dependencies.
    3. Generate individual tickets for all 9 team members.
    4. Initialize `STATUS.md` for project tracking.
- **Definition of Done:** `tickets.md` and `STATUS.md` live in the repository root and approved by Dr. Ali.
- **Handoff Output:** [tickets.md](./tickets.md) (Master Task List)

---

## [TICKET-02] Design Foundation & Shared Library
- **Assignee:** Marco Rivera (Brand & UX Designer)
- **Phase:** Phase B — Design Foundation
- **Dependency:** Approved Strategy (Phase A)
- **Key Tasks:**
    1. Define Tailwind CSS theme (colors: soft teals, warm whites, sage/navy; typography: clean sans-serif).
    2. Create shared UI component library (Buttons, Inputs, Cards, Hero containers).
    3. Implement "Glassmorphism" and subtle micro-animations for the premium feel.
    4. Ensure design system meets WCAG AA accessibility standards.
- **Definition of Done:** `tailwind.config.js` updated and `src/components/common` populated with reusable components.
- **Handoff Output:** Theme configuration and shared UI component folder.

---

## [TICKET-03] Project Scaffold & Core Routing
- **Assignee:** Jordan Park (Frontend Lead)
- **Phase:** Phase C — Scaffold
- **Dependency:** Design Tokens/Components (Phase B)
- **Key Tasks:**
    1. Initialize React + Vite + TypeScript project.
    2. Configure React Router v6 with all routes (Home, About, Services, FAQ, Contact, Privacy, 404).
    3. Apply Marco’s design tokens to the global layout.
    4. Set up standard folder structure for developers.
- **Definition of Done:** Project compiles locally with working navigation between empty page shells.
- **Handoff Output:** Clean project scaffold ready for feature development.

---

## [TICKET-04] Home & About Pages
- **Assignee:** Priya Nair (Frontend Dev)
- **Phase:** Phase D — Parallel Build
- **Dependency:** Project Scaffold (Phase C)
- **Key Tasks:**
    1. Build the Home page Hero with "Coming Soon" prominence.
    2. Implement "About" page highlighting Dr. Ali's vision and practice philosophy.
    3. Ensure mobile responsiveness (375px min).
    4. Use Marco’s shared components for consistency.
- **Definition of Done:** Home and About pages visually complete and fully responsive.
- **Handoff Output:** Completed `Home.tsx` and `About.tsx` components.

---

## [TICKET-05] Services, FAQ & Contact Pages
- **Assignee:** Tyler Morris (Frontend Dev)
- **Phase:** Phase D — Parallel Build
- **Dependency:** Project Scaffold (Phase C)
- **Key Tasks:**
    1. Build "Services" page (General Pediatrics focus).
    2. Implement searchable "FAQ" accordion.
    3. Build "Contact" page with the two-step waitlist form UI.
    4. Stub out "Privacy Policy" route.
- **Definition of Done:** Services, FAQ, and Contact pages visually complete with working form UI (offline).
- **Handoff Output:** Completed `Services.tsx`, `FAQ.tsx`, and `Contact.tsx` components.

---

## [TICKET-06] Supabase Schema & Form Logic
- **Assignee:** Rachel Lin (Backend Dev)
- **Phase:** Phase D — Parallel Build
- **Dependency:** Project Scaffold (Phase C)
- **Key Tasks:**
    1. Set up Supabase project and `waitlist` table schema.
    2. Create API client/hooks for form submission.
    3. Implement server-side validation for the waitlist form (2-step flow).
    4. Ensure NO clinical data/PHI is stored.
- **Definition of Done:** Waitlist table created in Supabase with successful API test submissions.
- **Handoff Output:** `supabaseClient.ts` and form submission hooks.

---

## [TICKET-07] SEO Meta & Content Optimization
- **Assignee:** Nina Walsh (SEO & Content)
- **Phase:** Phase D — Parallel Build
- **Dependency:** Project Scaffold (Phase C)
- **Key Tasks:**
    1. Implement SEO meta tags for all pages (titles, descriptions, OG tags).
    2. Generate `sitemap.xml` and `robots.txt`.
    3. Add JSON-LD schema markup for Local Business (Pediatrician).
    4. Audit content for Houston, TX local SEO relevance.
- **Definition of Done:** Metadata visible in source code and SEO audit passing.
- **Handoff Output:** SEO configurations and meta-data within page components.

---

## [TICKET-08] Quality Assurance & Accessibility
- **Assignee:** Dev Kumar (QA Engineer)
- **Phase:** Phase F — QA
- **Dependency:** Completed Integration (Phase E)
- **Key Tasks:**
    1. Perform cross-browser testing (Chrome, Safari, Mobile).
    2. Run accessibility audits (Lighthouse/Axe) to ensure WCAG AA.
    3. Verify two-step form flow and Supabase integration.
    4. Load testing to ensure <2s mobile target.
- **Definition of Done:** `qa-report.md` generated with zero P0/P1 bugs.
- **Handoff Output:** Finished QA Report.

---

## [TICKET-09] Deployment & DevOps
- **Assignee:** Elena Bosch (DevOps)
- **Phase:** Phase G — Deploy
- **Dependency:** QA Sign-off (Phase F)
- **Key Tasks:**
    1. Configure Vercel production deployment.
    2. Point Namecheap DNS to Vercel.
    3. Set up CI/CD pipeline for future updates.
    4. Generate `RUNBOOK.md` for practice maintenance.
- **Definition of Done:** Website live at `milestonepediatrics.ai` with working SSL and forms.
- **Handoff Output:** [RUNBOOK.md](./RUNBOOK.md) and live site confirmation.
