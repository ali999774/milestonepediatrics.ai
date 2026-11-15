import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { SectionWrapper } from '../components/ui/SectionWrapper';
import { PAGE_META, SEO_CONFIG } from '../seo/meta';

// ─── Credentials Data ────────────────────────────────────────────────────────
// TODO(Ali): add medical school, residency and any other credentials you want public. None are listed until confirmed.
const credentials = [
  { id: 'cred-md', label: 'Doctor of Medicine (MD)', variant: 'neutral' as const },
  { id: 'cred-board', label: 'Board-Certified Pediatrician', variant: 'success' as const },
  { id: 'cred-echo', label: 'ECHO Autism Trained', variant: 'neutral' as const },
  { id: 'cred-years', label: '10+ Years in Practice', variant: 'neutral' as const },
];

// ─── Values / Pillars Data ───────────────────────────────────────────────────
const values = [
  {
    id: 'value-listen',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7 text-primary" aria-hidden="true">
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
      </svg>
    ),
    title: 'Listening First',
    body: 'Great care starts with understanding. The aim is for every visit to begin by hearing what matters most to you and your child.',
  },
  {
    id: 'value-partnership',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7 text-primary" aria-hidden="true">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 00-3-3.87" />
        <path d="M16 3.13a4 4 0 010 7.75" />
      </svg>
    ),
    title: 'Partnering with Parents',
    body: 'Parents know their children best. Clinical guidance paired with family insight leads to better outcomes and stronger trust.',
  },
  {
    id: 'value-growth',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7 text-primary" aria-hidden="true">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
      </svg>
    ),
    title: 'Growing Together',
    body: 'From the first newborn visit through adolescence, a consistent relationship with one physician makes all the difference.',
  },
];

// ─── About Page ──────────────────────────────────────────────────────────────
export default function About() {
  const meta = PAGE_META.about;
  return (
    <>
      <Helmet>
        <title>{meta.title}</title>
        <meta name="description" content={meta.description} />
        <link rel="canonical" href={meta.canonical} />
        <meta property="og:title" content={meta.title} />
        <meta property="og:description" content={meta.description} />
        <meta property="og:url" content={meta.canonical} />
        <meta property="og:image" content={`${SEO_CONFIG.baseUrl}${SEO_CONFIG.ogImage}`} />
      </Helmet>

      {/* ── HERO: PHYSICIAN INTRO + CREDENTIALS ────────────────────────────── */}
      {/* TODO(Ali): headshot and ABP badge were removed from the repo; re-add if you want them shown. */}
      <SectionWrapper background="white" id="about-hero" className="!py-16 md:!py-24">
        <div className="max-w-3xl mx-auto text-center">
          <div className="flex flex-wrap gap-2 justify-center mb-6">
            {credentials.map((cred) => (
              <Badge key={cred.id} variant={cred.variant} className="text-sm px-3 py-1.5 font-medium">
                {cred.label}
              </Badge>
            ))}
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-neutral-800 leading-tight tracking-tight mb-4">
            About the <span className="text-primary">practice</span>
          </h1>

          <p className="text-lg text-neutral-600 leading-relaxed mb-4">
            Milestone Pediatrics is led by a board-certified pediatrician with more than 10 years in practice,
            ECHO Autism trained. The clinical focus includes newborn care, ADHD, and autism spectrum disorder.
          </p>
          <p className="text-base text-neutral-600 leading-relaxed mb-6">
            The physician is planning this general pediatric practice in Spring, TX (north Houston),
            planned to open in 2027. The practice is not yet open and is not accepting patients.
          </p>
          <Link to="/services">
            <Button variant="primary" size="lg" className="shadow-md min-w-[200px]">
              See planned services
            </Button>
          </Link>
        </div>
      </SectionWrapper>

      {/* ── PHILOSOPHY / VALUES ────────────────────────────────────────────── */}
      <SectionWrapper background="soft" id="philosophy">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-3">
              Practice Philosophy
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-800 mb-4">
              Care shaped by connection, guided by science.
            </h2>
            <p className="text-neutral-600 max-w-xl mx-auto text-base md:text-lg">
              Milestone Pediatrics is being planned around the belief that the best clinical outcomes grow from genuine, lasting relationships between doctor, child, and family.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {values.map((item) => (
              <Card key={item.id} id={item.id} className="p-7 flex flex-col gap-4 group hover:shadow-lg transition-shadow duration-300">
                <div className="w-12 h-12 rounded-xl bg-primary-light flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                  {item.icon}
                </div>
                <h3 className="text-lg font-semibold text-neutral-800">{item.title}</h3>
                <p className="text-neutral-600 text-base leading-relaxed">{item.body}</p>
              </Card>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* ── WHY MILESTONE ──────────────────────────────────────────────────── */}
      <SectionWrapper background="white" id="why-milestone">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-3">
            Why Milestone
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-800 mb-6">
            Every milestone matters.
          </h2>
          <div className="space-y-5 text-neutral-600 text-lg leading-relaxed text-left">
            <p>
              The name says it all. In pediatrics, milestones aren't just clinical checkpoints — they're the moments families remember. A first smile. A first step. A teenager gaining confidence. The practice is being planned to be there for all of them.
            </p>
            <p>
              As a solo practice, Milestone Pediatrics is planned around continuity: families will see the same physician, who will know each child's history and the context behind each concern.
            </p>
            <p>
              The goal is a neighborhood practice that pairs personal attention with evidence-based standards.
            </p>
          </div>
        </div>
      </SectionWrapper>

      {/* ── STATUS NOTE ────────────────────────────────────────────────────── */}
      <SectionWrapper background="primary-light" id="about-status" className="!py-12 md:!py-16">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-neutral-800 mb-3">Not yet open</h2>
          <p className="text-neutral-600 mb-6">
            Milestone Pediatrics is planned to open in 2027 and is not accepting patients. This site
            shares information about the planned practice.
          </p>
          <Link to="/faq" className="text-primary font-medium underline-offset-4 hover:underline">
            Read the FAQ
          </Link>
        </div>
      </SectionWrapper>
    </>
  );
}
