import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Card } from '../components/ui/Card';
import { SectionWrapper } from '../components/ui/SectionWrapper';
import { PAGE_META, SEO_CONFIG } from '../seo/meta';

// ─── Mobile Sticky CTA Bar ────────────────────────────────────────────────────
const STICKY_DISMISSED_KEY = 'mp_sticky_cta_dismissed';

function MobileStickyCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const dismissed = localStorage.getItem(STICKY_DISMISSED_KEY);
    if (!dismissed) {
      // Small delay so it doesn't flash immediately on paint
      const timer = setTimeout(() => setVisible(true), 800);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleDismiss = () => {
    localStorage.setItem(STICKY_DISMISSED_KEY, '1');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      id="mobile-sticky-cta"
      className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-primary text-white flex items-center justify-between px-4 transition-transform duration-300"
      style={{ height: '52px' }}
      role="banner"
      aria-label="Waitlist application notice"
    >
      <span className="text-sm font-medium truncate mr-3">
        Accepting waitlist applications now
      </span>
      <div className="flex items-center gap-2 flex-shrink-0">
        <Link to="/contact">
          <Button
            variant="secondary"
            size="sm"
            className="!bg-white !text-primary hover:!bg-primary-light border-0 font-semibold"
          >
            Apply
          </Button>
        </Link>
        <button
          onClick={handleDismiss}
          aria-label="Dismiss notification"
          className="ml-1 p-1 rounded-full hover:bg-white/20 transition-colors"
        >
          {/* X icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-4 h-4"
            aria-hidden="true"
          >
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
}

// ─── Approach Cards Data ──────────────────────────────────────────────────────
const approachItems = [
  {
    id: 'approach-relationship',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7 text-primary" aria-hidden="true">
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
      </svg>
    ),
    title: 'Relationship-First Care',
    // PLACEHOLDER: Dr. Ali — 1-2 sentences describing your relationship-first philosophy: how you prioritize knowing each family, building trust over time, and treating the child as a whole person
    body: 'Every child is more than a chart. A practice built on genuine relationships means families are known by name, not appointment number.',
  },
  {
    id: 'approach-evidence',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7 text-primary" aria-hidden="true">
        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: 'Evidence-Based Practice',
    // PLACEHOLDER: Dr. Ali — 1-2 sentences on your commitment to evidence-based medicine: staying current with AAP guidelines, research, and bringing the best available science to clinical decisions
    body: 'Grounded in the latest pediatric research and AAP guidelines, every recommendation is thoughtful, current, and tailored.',
  },
  {
    id: 'approach-accessible',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7 text-primary" aria-hidden="true">
        <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ),
    title: 'Accessible & Responsive',
    // PLACEHOLDER: Dr. Ali — 1-2 sentences about access and communication: same-day appointments, portal messaging, after-hours guidance, or whatever distinguishes your availability model
    body: 'Families deserve timely answers. Seamless portal communication and responsive scheduling mean fewer worries between visits.',
  },
];

// ─── Testimonials Data ────────────────────────────────────────────────────────
const testimonials = [
  {
    id: 'testimonial-1',
    // PLACEHOLDER: Dr. Ali — Replace with a real patient family testimonial (first name + suburb only, no last names). Quote should be 2-3 sentences about their experience with your care.
    quote: 'The level of care and attention my daughter received was extraordinary. Every question was answered with patience and warmth — we finally found a pediatrician who listens.',
    author: 'Parent, Houston Heights',
  },
  {
    id: 'testimonial-2',
    // PLACEHOLDER: Dr. Ali — Replace with a real patient family testimonial (first name + suburb only, no last names). Different parent, different concern (e.g., teen care, newborn, chronic condition).
    quote: 'Joining the waitlist was effortless. From our very first appointment we felt like part of the practice family, not just another intake form.',
    author: 'New Patient Parent, Midtown Houston',
  },
  {
    id: 'testimonial-3',
    // PLACEHOLDER: Dr. Ali — Third testimonial. Consider highlighting a specific milestone visit, a developmental screening, or a health concern that was handled exceptionally well.
    quote: 'Our toddler used to dread checkups at his old practice. Now he actually asks when his next appointment is — that tells you everything.',
    author: 'Parent, Sugar Land',
  },
];

// ─── Home Page ─────────────────────────────────────────────────────────────────
export default function Home() {
  const meta = PAGE_META.home;
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
      {/* ── HERO SECTION ── CTA #1 ──────────────────────────────────────────── */}
      <SectionWrapper
        background="white"
        id="hero"
        className="!py-16 md:!py-28 relative overflow-hidden"
      >
        {/* Decorative background gradient blob */}
        <div
          aria-hidden="true"
          className="absolute -top-24 -right-24 w-[480px] h-[480px] rounded-full opacity-[0.07] pointer-events-none"
          style={{ background: 'radial-gradient(circle, #0E8C72 0%, transparent 70%)' }}
        />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          {/* Trust badge — must be above the fold, first element in hero */}
          <div className="flex justify-center mb-6">
            <Badge variant="success" className="text-sm px-4 py-1.5 font-semibold tracking-wide">
              ✦ Now Accepting Waitlist Applications
            </Badge>
          </div>

          {/* H1 headline */}
          {/* PLACEHOLDER: Dr. Ali — Replace this headline with your core value proposition (max 10 words). Something that speaks directly to Houston parents about what makes your practice different. Avoid generic phrases like "quality care." */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-neutral-800 leading-tight tracking-tight mb-6">
            Pediatric care that begins with{' '}
            <span className="text-primary">knowing your child.</span>
          </h1>

          {/* Subheading */}
          {/* PLACEHOLDER: Dr. Ali — 1–2 sentence subheadline expanding on the H1. Mention Houston, TX at least once for local SEO. Speak to the feeling parents want: confidence, accessibility, genuine partnership. */}
          <p className="text-lg md:text-xl text-neutral-600 max-w-2xl mx-auto mb-4 leading-relaxed">
            A modern pediatric practice in Houston, TX — built around the belief that the best medicine starts with the best relationship between doctor, child, and family.
          </p>

          {/* Insurance trust signal — above the fold on desktop */}
          <div className="flex justify-center mb-10">
            <Badge variant="neutral" className="text-xs px-3 py-1">
              <Badge variant="success" className="mr-2 text-xs">✓</Badge>
              {/* PLACEHOLDER: Dr. Ali — List 2–3 insurance carriers you already know you'll accept, or confirm "Most Major Plans Accepted" is accurate */}
              Most major insurance plans accepted
            </Badge>
          </div>

          {/* CTA #1 — Hero */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/contact" id="hero-cta-primary">
              <Button variant="primary" size="lg" className="min-w-[200px] shadow-md">
                Join the Waitlist
              </Button>
            </Link>
            <Link to="/about" id="hero-cta-secondary">
              <Button variant="secondary" size="lg" className="min-w-[200px]">
                Meet Your Doctor →
              </Button>
            </Link>
          </div>

          {/* Subtle reassurance text */}
          <p className="mt-5 text-sm text-neutral-500">
            No commitment required. We'll reach out to confirm your spot.
          </p>
        </div>
      </SectionWrapper>

      {/* ── APPROACH SECTION ─────────────────────────────────────────────────── */}
      <SectionWrapper background="soft" id="approach">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 md:mb-16">
            {/* PLACEHOLDER: Dr. Ali — Short kicker label above the section heading (e.g., "Our Philosophy" or your practice tagline) */}
            <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-3">
              Our Philosophy
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-800 mb-4">
              {/* PLACEHOLDER: Dr. Ali — 5–7 word section headline for your care approach (e.g., "Medicine that puts your family first") */}
              The way pediatrics should feel.
            </h2>
            <p className="text-neutral-600 max-w-xl mx-auto text-base md:text-lg">
              {/* PLACEHOLDER: Dr. Ali — 1–2 supporting sentences for this section. What does your approach look like in practice? */}
              Every visit is an opportunity to understand a child a little better and support a family a little more.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {approachItems.map((item) => (
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

      {/* ── TRUST / INSURANCE STRIP ──────────────────────────────────────────── */}
      <SectionWrapper background="primary-light" id="trust-signals" className="!py-10 md:!py-12">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-10">
            <div className="flex-1 text-center md:text-left">
              <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-2">Insurance &amp; Access</p>
              <h2 className="text-2xl md:text-3xl font-bold text-neutral-800 mb-1">
                {/* PLACEHOLDER: Dr. Ali — Confirm insurance stance: "Most major plans accepted" or provide specific carriers */}
                Most major plans accepted.
              </h2>
              <p className="text-neutral-600">
                {/* PLACEHOLDER: Dr. Ali — 1 sentence on your billing/insurance philosophy or the intake process */}
                Straightforward billing, no hidden surprises — because your focus should stay on your child.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 justify-center md:justify-end">
              <Badge variant="success" className="text-sm px-4 py-2 font-medium">Most Major Plans Accepted</Badge>
              {/* PLACEHOLDER: Dr. Ali — Add individual carrier badges here once confirmed (e.g., <Badge variant="neutral">BlueCross BlueShield</Badge>) */}
              <Badge variant="neutral" className="text-sm px-4 py-2">BCBS</Badge>
              <Badge variant="neutral" className="text-sm px-4 py-2">Aetna</Badge>
              <Badge variant="neutral" className="text-sm px-4 py-2">UnitedHealthcare</Badge>
              <Badge variant="neutral" className="text-sm px-4 py-2">Cigna</Badge>
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* ── MID-PAGE CTA ── CTA #2 ──────────────────────────────────────────── */}
      <SectionWrapper background="white" id="mid-cta">
        <div className="max-w-3xl mx-auto text-center">
          <Badge variant="accent" className="mb-5 text-sm px-4 py-1.5">
            Limited Spots Available
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-800 mb-4">
            {/* PLACEHOLDER: Dr. Ali — Mid-page CTA heading. Should feel different from hero — more specific, e.g. "Secure your child's spot before we open our doors." */}
            Secure your family's spot before we open.
          </h2>
          <p className="text-neutral-600 text-lg mb-8 max-w-xl mx-auto">
            {/* PLACEHOLDER: Dr. Ali — 1–2 sentences reinforcing urgency without pressure. Mention the waitlist timeline or opening date if known. */}
            Our practice is accepting a limited number of founding families. Join the waitlist today and be among the first to receive care at Milestone Pediatrics.
          </p>
          <Link to="/contact" id="mid-page-cta">
            <Button variant="primary" size="lg" className="shadow-md min-w-[220px]">
              Reserve My Child's Spot
            </Button>
          </Link>
          <p className="mt-4 text-sm text-neutral-500">Takes less than 2 minutes.</p>
        </div>
      </SectionWrapper>

      {/* ── TESTIMONIALS ─────────────────────────────────────────────────────── */}
      <SectionWrapper background="soft" id="testimonials">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-3">
              Families We've Cared For
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-800">
              {/* PLACEHOLDER: Dr. Ali — Testimonial section heading. Should feel warm and real, not corporate. */}
              What Houston families are saying.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <Card key={t.id} id={t.id} className="p-7 flex flex-col justify-between gap-6">
                {/* Decorative quote mark */}
                <div>
                  <svg
                    aria-hidden="true"
                    className="w-8 h-8 text-primary/20 mb-3"
                    fill="currentColor"
                    viewBox="0 0 32 32"
                  >
                    <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                  </svg>
                  <p className="text-neutral-700 text-base leading-relaxed italic">{t.quote}</p>
                </div>
                <p className="text-sm font-semibold text-primary">{t.author}</p>
              </Card>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* ── BOTTOM BANNER CTA ── CTA #3 ──────────────────────────────────────── */}
      <SectionWrapper background="primary" id="bottom-cta" className="!py-16 md:!py-24">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {/* PLACEHOLDER: Dr. Ali — Bottom banner CTA headline. This is the last chance to convert — make it decisive and reassuring. E.g., "Your child deserves a doctor who knows their name." */}
            The practice your family has been looking for.
          </h2>
          <p className="text-white/80 text-lg mb-10 max-w-xl mx-auto">
            {/* PLACEHOLDER: Dr. Ali — 1 concise sentence reinforcing the CTA, referencing Houston, TX and/or your opening timeline */}
            Now forming our founding patient family in Houston, TX. Applications are reviewed in the order received.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/contact" id="bottom-banner-cta">
              <Button
                variant="secondary"
                size="lg"
                className="!bg-white !text-primary hover:!bg-primary-light border-0 font-bold min-w-[220px] shadow-lg"
              >
                Join the Waitlist Today
              </Button>
            </Link>
            <Link to="/about" id="bottom-banner-learn-more">
              <Button
                variant="ghost"
                size="lg"
                className="!text-white hover:!bg-white/10 min-w-[200px]"
              >
                Learn About Our Practice →
              </Button>
            </Link>
          </div>
        </div>
      </SectionWrapper>

      {/* Mobile bottom sticky CTA — lives outside SectionWrappers, fixed to viewport */}
      <MobileStickyCTA />
    </>
  );
}
