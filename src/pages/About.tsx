import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Card } from '../components/ui/Card';
import { SectionWrapper } from '../components/ui/SectionWrapper';
import { PAGE_META, SEO_CONFIG } from '../seo/meta';

// ─── Credentials Data ────────────────────────────────────────────────────────
const credentials = [
  // PLACEHOLDER: Dr. Ali — Replace with your actual credentials (medical school, residency, board certifications, fellowships, etc.)
  { id: 'cred-md', label: 'Doctor of Medicine (MD)', variant: 'neutral' as const },
  { id: 'cred-board', label: 'Board-Certified Pediatrician', variant: 'success' as const },
  { id: 'cred-aap', label: 'AAP Fellow (FAAP)', variant: 'neutral' as const },
  { id: 'cred-residency', label: 'Pediatric Residency — Texas Medical Center', variant: 'neutral' as const },
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
    // PLACEHOLDER: Dr. Ali — 1-2 sentences about how you listen to families and children, taking time to understand concerns before recommending a plan
    body: 'Great care starts with understanding. Every visit begins by hearing what matters most to you and your child.',
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
    // PLACEHOLDER: Dr. Ali — 1-2 sentences about treating parents as partners in the care process, not passive recipients
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
    // PLACEHOLDER: Dr. Ali — 1-2 sentences about longitudinal care, following children from newborn through adolescence, celebrating milestones
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
      <SectionWrapper
        background="white"
        id="about-hero"
        className="!py-16 md:!py-24"
      >
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-10 md:gap-16">

            {/* Headshot placeholder — 200px minimum */}
            <div className="flex-shrink-0">
              <div
                className="w-[200px] h-[200px] md:w-[240px] md:h-[240px] rounded-full bg-neutral-200 flex items-center justify-center"
                role="img"
                aria-label="Physician headshot — photo coming soon"
              >
                {/* PLACEHOLDER: Dr. Ali — Replace this div with an <img> tag once your professional headshot is ready */}
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1} strokeLinecap="round" strokeLinejoin="round" className="w-16 h-16 text-neutral-400" aria-hidden="true">
                  <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </div>
            </div>

            {/* Bio + Credentials */}
            <div className="flex-1 text-center md:text-left">
              {/* Credentials strip — visible without scrolling */}
              <div className="flex flex-wrap gap-2 justify-center md:justify-start mb-6">
                {credentials.map((cred) => (
                  <Badge key={cred.id} variant={cred.variant} className="text-sm px-3 py-1.5 font-medium">
                    {cred.label}
                  </Badge>
                ))}
              </div>

              {/* PLACEHOLDER: Dr. Ali — Replace "Dr. Ali" with your full professional name (e.g., "Dr. Firstname Lastname, MD, FAAP") */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-neutral-800 leading-tight tracking-tight mb-4">
                Meet{' '}
                <span className="text-primary">Dr. Ali</span>
              </h1>

              {/* PLACEHOLDER: Dr. Ali — 2-3 sentences introducing yourself to Houston families. Include your specialty focus, what drew you to pediatrics, and why you're opening a solo practice. Avoid generic language. */}
              <p className="text-lg text-neutral-600 leading-relaxed mb-4">
                A board-certified pediatrician building a modern, relationship-driven practice in Houston, TX. With training rooted in the Texas Medical Center and a deep commitment to evidence-based care, Dr. Ali is creating a practice where every family is known — not just seen.
              </p>

              {/* PLACEHOLDER: Dr. Ali — 1-2 additional sentences about your personal connection to Houston, your family, or what you do outside the clinic to humanize your bio */}
              <p className="text-base text-neutral-500 leading-relaxed mb-8">
                Outside the clinic, you'll find Dr. Ali exploring Houston's parks, staying current on the latest pediatric research, and advocating for children's health in the community.
              </p>

              <Link to="/contact">
                <Button variant="primary" size="lg" className="shadow-md min-w-[200px]">
                  Join the Waitlist
                </Button>
              </Link>
            </div>
          </div>
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
              {/* PLACEHOLDER: Dr. Ali — 5-7 word section heading that captures your care philosophy */}
              Care shaped by connection, guided by science.
            </h2>
            <p className="text-neutral-600 max-w-xl mx-auto text-base md:text-lg">
              {/* PLACEHOLDER: Dr. Ali — 1-2 sentences expanding on why your philosophy matters to families */}
              Milestone Pediatrics was founded on the belief that the best clinical outcomes grow from genuine, lasting relationships between doctor, child, and family.
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
            {/* PLACEHOLDER: Dr. Ali — Section heading about why you chose "Milestone" as the practice name or what it represents */}
            Every milestone matters.
          </h2>
          {/* PLACEHOLDER: Dr. Ali — 2-3 paragraphs about: (1) why you named the practice "Milestone," (2) what makes your solo practice model different from large group practices, (3) what families can expect from the patient experience */}
          <div className="space-y-5 text-neutral-600 text-lg leading-relaxed text-left">
            <p>
              The name says it all. In pediatrics, milestones aren't just clinical checkpoints — they're the moments families remember. A first smile. A first step. A teenager gaining confidence. This practice exists to be there for all of them.
            </p>
            <p>
              In a solo practice, continuity isn't aspirational — it's the default. Every visit is with the same physician who knows your child's history, personality, and the context behind each concern. No handoffs. No repeating your story.
            </p>
            <p>
              Milestone Pediatrics combines the intimacy of a neighborhood practice with modern tools and evidence-based standards that Houston families deserve.
            </p>
          </div>
        </div>
      </SectionWrapper>

      {/* ── CLOSING CTA ────────────────────────────────────────────────────── */}
      <SectionWrapper background="primary" id="about-cta" className="!py-16 md:!py-24">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {/* PLACEHOLDER: Dr. Ali — CTA heading for the About page. Personal and inviting, e.g., "Ready to find your child's pediatrician?" */}
            Ready to find your child's pediatrician?
          </h2>
          <p className="text-white/80 text-lg mb-10 max-w-xl mx-auto">
            {/* PLACEHOLDER: Dr. Ali — 1 sentence reinforcing the CTA. Mention Houston and/or your opening timeline. */}
            Milestone Pediatrics is now forming its founding patient family in Houston, TX. Spots are limited — join the waitlist today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/contact" id="about-cta-primary">
              <Button
                variant="secondary"
                size="lg"
                className="!bg-white !text-primary hover:!bg-primary-light border-0 font-bold min-w-[220px] shadow-lg"
              >
                Join the Waitlist
              </Button>
            </Link>
            <Link to="/services" id="about-cta-services">
              <Button
                variant="ghost"
                size="lg"
                className="!text-white hover:!bg-white/10 min-w-[200px]"
              >
                View Our Services →
              </Button>
            </Link>
          </div>
        </div>
      </SectionWrapper>
    </>
  );
}
