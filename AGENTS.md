# AGENT.md — Milestone Pediatrics Website

> Context file for AI agents working on milestonepediatrics.ai.
> Load this at the start of any session involving this project.

---

## What This Project Is

Milestone Pediatrics is a solo, insurance-based general pediatric practice opening in North Spring, Houston TX approximately September 2026. The website (milestonepediatrics.ai) is the pre-launch online presence — capturing waitlist signups, establishing credibility, and communicating the practice's identity before doors open.

- Domain: milestonepediatrics.ai (Namecheap)
- Hosting: Vercel
- Repo: github.com/ali999774/milestonepediatrics.ai
- GitHub Project Board: github.com/users/ali999774/projects/4
- Email: hello@milestonepediatrics.ai
- Physician: Dr. Ali Naqvi — board-certified General Pediatrician, academic faculty at McGovern Medical School / UTHealth Houston, affiliated with Memorial Hermann. Clinical focus: ADHD, autism spectrum disorder, newborn care, asthma. Conducts ECHO Autism evaluations for underserved communities.

---

## Tech Stack

| Layer        | Technology                               |
|--------------|------------------------------------------|
| UI Framework | React + TypeScript                       |
| Styling      | Tailwind CSS                             |
| Build        | Vite                                     |
| Backend      | Supabase (waitlist form → DB)            |
| Hosting      | Vercel                                   |
| IDE          | Google Antigravity (primary agentic IDE) |

---

## Build Phase Status

| Phase              | Agent                      | Status        |
|--------------------|----------------------------|---------------|
| A — Strategy       | Sophia Chen                | ✅ Complete    |
| B — Design         | Marco Rivera               | ✅ Complete    |
| C — Scaffold       | Jordan Park Act 1          | ✅ Complete    |
| D — Parallel Build | Priya, Tyler, Rachel, Nina | ✅ Complete    |
| E — Integration    | Jordan Park Act 2          | ⬜ Not started |
| F — QA             | Dev Kumar                  | ✅ Complete    |
| G — Deploy         | Elena Bosch                | 🟡 Queued      |
| H — Retrospective  | —                          | ⬜ Not started |

Site is live at milestonepediatrics.ai. All 6 pages load. Nav + footer present. Doctor photo on About. Insurance list populated. Waitlist form on Contact page.

---

## Agent Team (Agentic Build Studio)

| Agent        | Role                          | Phase   | Model                                   |
|--------------|-------------------------------|---------|------------------------------------------|
| Sophia Chen  | Project Manager               | A       | Gemini Flash                             |
| Marco Rivera | Brand & UX Designer           | B       | Gemini 3.1 Pro High                      |
| Jordan Park  | Frontend Lead (Act 1 + Act 2) | C + E   | Gemini 3.1 Pro Medium / Claude Opus 4.6  |
| Priya Nair   | Frontend Dev — Home + About   | D       | Claude Sonnet 4.6                        |
| Tyler Morris | Frontend Dev — Utility Pages  | D       | Claude Sonnet 4.6                        |
| Rachel Lin   | Backend Developer             | D       | Claude Opus 4.6                          |
| Nina Walsh   | SEO Specialist                | D       | Gemini Flash Lite                        |
| Dev Kumar    | QA Engineer                   | F       | Claude Sonnet 4.6                        |
| Elena Bosch  | DevOps Engineer               | G       | TBD                                      |

---

## Open Items Before Public Promotion

### Infrastructure
- [ ] Reactivate Supabase project (`jsbauumbjsolndjqkayt`) — paused, not urgent until go-live
- [ ] Test waitlist form end-to-end after Supabase reactivation
- [ ] Verify head tags in page source: meta description, JSON-LD schema, font preconnect
- [ ] Fix sitemap.xml — not accessible at /sitemap.xml
- [ ] Fix robots.txt — not accessible
- [ ] Contact page map placeholder — leave until address confirmed

### Lighthouse Issues (fix before final sign-off)
- [ ] favicon.ico 404 — add to /public
- [ ] Color contrast — 19 elements fail 4.5:1; darken primary #0e8c72 → #0a7560 for text contexts
- [ ] aria-hidden mobile nav — add tabindex="-1" to focusable children when nav is closed
- [ ] Footer heading order — change <h4> column heads to <h3>

### Lighthouse scores (as of March 18, 2026)
- Performance: 93 | Accessibility: ✅ Fixed | Best Practices: ✅ Fixed | SEO: 100

---

## Key Decisions (locked — do not revisit without reason)

- Domain staying on .ai — milestonepediatrics.com listed at $8K/year aftermarket, not worth it. .ai is coherent with brand identity.
- Two-step waitlist form: Step 1 (3 fields) → Step 2 (optional detail)
- Warm off-white surface — not pure #FFFFFF
- No social links until accounts are active
- No specific insurance plans until Dr. Ali confirms payer contracts
- Vaccine FAQ: confident, evidence-based, marked placeholder
- Contact map: no real embed until address confirmed
- Three CTA instances on Home: hero, mid-page, bottom banner
- Google Stitch runs before Marco Rivera brief → exports DESIGN.md via MCP
- Antigravity Pro ($20/mo) is primary build IDE

---

## Agent Rules for This Project

### PHI Policy
Hard no on all clinical/patient data. The website has zero PHI. Contact forms and waitlist submissions are parent-facing administrative data only. Cloud agents (Charlie, Jordan, Priya, etc.) may work freely.

Exception — future Grok Voice Agent feature: If/when a voice agent is added for parent-facing triage or intake, confirm xAI BAA status before any build work. Voice conversations about children's symptoms = PHI. Do not build until BAA is confirmed.

### Who Works on What

| Agent                   | Role                                                             |
|-------------------------|------------------------------------------------------------------|
| **Jordan Park (Act 2)** | Phase E integration — wiring pages, routing, Supabase connection |
| **Elena Bosch**         | Phase G deploy — Vercel config, env vars, DNS                    |
| **Charlie**             | Ad hoc tasks, research, Telegram-accessible                      |
| **Claude (claude.ai)**  | Architecture decisions, copy review, strategic direction         |
| **Jules**               | Not currently assigned to this project                           |
| **Eve**                 | Not relevant — no PHI                                            |

### Coding Conventions
- TypeScript throughout
- Tailwind for all styling
- Component-level files — no monolithic page files
- Supabase RLS required on any table storing user submissions
- All environment variables in .env — never hardcoded
- Vercel handles deploy — push to main triggers production

### Copy + Tone Rules
- Audience: Houston parents of children newborn–18
- Tone: warm, confident, approachable — physician without the clinical coldness
- Credential visible but not leading — "Dr. Ali Naqvi" not "Physician MD FAAP"
- No jargon — parents don't know what "MHMD" or "ECHO" means
- ADHD/autism focus is a differentiator — mention without turning it into a specialty-only practice signal

---

## Practice Context (for copy/content agents)

| Detail               | Info                                                |
|----------------------|-----------------------------------------------------|
| Physician            | Dr. Ali Naqvi, MD                                   |
| Specialty            | General Pediatrics                                  |
| Location             | North Spring, Houston TX (address TBD)              |
| Opening              | ~September 2026                                     |
| Model                | Solo, insurance-based                               |
| Payer affiliation    | MHMD (for contracting leverage)                     |
| Hospital affiliation | Memorial Hermann                                    |
| Academic affiliation | McGovern Medical School / UTHealth Houston          |
| Clinical focus       | ADHD, ASD, newborn care, asthma                     |
| Special program      | ECHO Autism evaluations for underserved communities |
| Age range            | Newborn – 18 years                                  |

---

## Ecosystem

| Property         | URL                          | Purpose                                        |
|------------------|------------------------------|------------------------------------------------|
| Practice website | milestonepediatrics.ai       | Pre-launch presence, waitlist                  |
| App              | Morning Momentum (App Store) | ADHD morning routine tool — credibility bridge |
| Blog             | momentum-lab.ghost.io        | Pediatric content, SEO, trust building         |

The ecosystem loop: Blog establishes Dr. Ali's credibility → App shows he builds tools for these families → Practice website captures the parents who want him as their doctor.

---

## Future: Grok Voice Agent (post-launch consideration)

A voice agent embedded on the site for after-hours parent triage, new patient intake, and prescription refill routing. Spanish-language support relevant for Houston patient population.

Status: 💡 Idea only. Do not build until:
1. xAI BAA confirmed (voice conversations = PHI)
2. Practice is open and patient volume justifies it
3. Supabase backend is live and tested

---

*Last updated: May 2026*
