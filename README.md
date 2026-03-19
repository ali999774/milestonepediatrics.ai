# Milestone Pediatrics Website

The official website for **Milestone Pediatrics** — a relationship-first pediatric practice opening in Houston, TX.

**Domain:** [milestonepediatrics.ai](https://milestonepediatrics.ai)

## Tech Stack

- **Framework:** React 18 + TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS with custom design tokens
- **Routing:** React Router v6
- **Backend:** Supabase (waitlist form persistence)
- **Hosting:** Vercel

## Local Development

### Prerequisites

- Node.js 18+
- npm

### Setup

```bash
# Install dependencies
npm install

# Create environment file
cp .env.example .env
```

Edit `.env` with your Supabase credentials:

```
VITE_SUPABASE_URL=https://<project-ref>.supabase.co
VITE_SUPABASE_ANON_KEY=<anon-public-key>
```

### Running

```bash
# Development server
npm run dev

# Type check
npx tsc --noEmit

# Production build
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
src/
├── api/            # Supabase API functions (waitlist submission)
├── components/
│   ├── ui/         # Design system components (Button, Card, Badge, etc.)
│   ├── Accordion.tsx
│   └── WaitlistForm.tsx
├── layouts/        # RootLayout (Nav + Outlet + Footer)
├── lib/            # Supabase client & TypeScript interfaces
├── pages/          # Route pages (Home, About, Services, FAQ, Contact, Privacy, NotFound)
├── router/         # React Router configuration
├── seo/            # SEO metadata & structured data
└── styles/         # CSS custom properties & Tailwind base
```

## Deployment

Hosted on **Vercel** with automatic deployments on push to `main`.

Environment variables (`VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`) must be configured in the Vercel project settings.

DNS is managed via Namecheap.

## Database

The waitlist form stores submissions in a Supabase `public.waitlist` table. Migrations are in `supabase/migrations/`. See [HANDOFF-rachel.md](HANDOFF-rachel.md) for the full schema and RLS policy documentation.

## Operational Guidance

See [RUNBOOK.md](RUNBOOK.md) for production monitoring, incident response, and operational procedures (authored by Elena Bosch in Phase G).

## Team

| Name | Role | Pages / Scope |
|------|------|---------------|
| Sophia Chen | Project Manager | Spec, tickets, project plan |
| Marco Rivera | Brand & UX Designer | Design system, tokens, component specs |
| Jordan Park | Frontend Lead | Scaffold (Act 1), integration & polish (Act 2) |
| Priya Nair | Frontend Dev | Home, About |
| Tyler Morris | Frontend Dev | Services, FAQ, Contact, Accordion, WaitlistForm |
| Rachel Lin | Backend Dev | Supabase schema, API functions, migrations |
| Nina Walsh | SEO & Content | Meta tags, sitemap, robots.txt, structured data |
| Dev Kumar | QA Engineer | Testing & validation (Phase F) |
| Elena Bosch | DevOps | Deployment, CI/CD, runbook (Phase G) |
