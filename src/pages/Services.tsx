import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { SectionWrapper } from '../components/ui/SectionWrapper';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { PAGE_META, SEO_CONFIG } from '../seo/meta';
import {
  Baby,
  HeartPulse,
  Syringe,
  Thermometer,
  Brain,
  Smile,
  GraduationCap,
  Wind,
  ClipboardCheck,
} from 'lucide-react';

// ─── Services Data — "name + parent-language subtext" pattern ────────────────

const services = [
  {
    id: 'well-child',
    icon: HeartPulse,
    name: 'Well-Child Visits',
    subtext: 'Regular checkups from birth through adolescence — tracking growth, milestones, and overall health at every stage.',
  },
  {
    id: 'newborn',
    icon: Baby,
    name: 'Newborn Care',
    subtext: 'Early weight checks, feeding support, and reassurance during those first weeks at home with your baby.',
  },
  {
    id: 'immunizations',
    icon: Syringe,
    name: 'Vaccinations & Immunizations',
    subtext: 'Evidence-based vaccine schedules recommended by the AAP, with time to answer every question you have.',
  },
  {
    id: 'sick-visits',
    icon: Thermometer,
    name: 'Sick Visits',
    subtext: 'Same-day and next-day appointments for fevers, ear infections, coughs, rashes, and other acute concerns.',
  },
  {
    id: 'developmental',
    icon: Brain,
    name: 'Developmental Screenings',
    subtext: 'Structured assessments at key ages to catch speech, motor, and social-emotional delays early — when support matters most.',
  },
  {
    id: 'behavioral',
    icon: Smile,
    name: 'Behavioral Health Screening',
    subtext: 'A safe space to discuss ADHD, anxiety, mood changes, and school struggles without judgment.',
  },
  {
    id: 'adolescent',
    icon: GraduationCap,
    name: 'Adolescent Medicine',
    subtext: 'Confidential, age-appropriate care for teens — including mental health check-ins, nutrition, and reproductive health education.',
  },
  {
    id: 'asthma-allergy',
    icon: Wind,
    name: 'Asthma & Allergy Management',
    subtext: 'Ongoing plans for wheezing, seasonal allergies, eczema, and food sensitivities, adjusted as your child grows.',
  },
  {
    id: 'physicals',
    icon: ClipboardCheck,
    name: 'School & Sports Physicals',
    subtext: 'Quick, thorough exams to clear your child for the classroom, the field, or summer camp.',
  },
];

// ─── Services Page ───────────────────────────────────────────────────────────

export default function Services() {
  const meta = PAGE_META.services;
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
      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <SectionWrapper background="white" className="!pb-0 md:!pb-0">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-3">
            What We Offer
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-neutral-800 mb-4">
            Comprehensive care, one family at a time.
          </h1>
          <p className="text-neutral-600 text-lg max-w-xl mx-auto">
            {/* PLACEHOLDER: Dr. Ali — 1–2 sentences summarizing your service philosophy */}
            From your baby's first checkup through adolescence — every visit
            is unhurried, evidence-based, and tailored to your child.
          </p>
        </div>
      </SectionWrapper>

      {/* ── Insurance Section — appears BEFORE the services grid ───────────── */}
      <SectionWrapper background="primary-light" id="insurance" className="!py-10 md:!py-14">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-10">
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-2xl md:text-3xl font-bold text-neutral-800 mb-2">
                {/* PLACEHOLDER: Dr. Ali — Confirm insurance stance or list specific carriers */}
                Insurance & Billing
              </h2>
              <p className="text-neutral-600 mb-4 md:mb-0">
                We believe navigating insurance shouldn't add stress to caring
                for your child. Our team will help verify your coverage before
                your first visit.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 justify-center md:justify-end">
              <Badge variant="success" className="text-sm px-4 py-2 font-medium">
                Most Major Plans Accepted
              </Badge>
              {/* PLACEHOLDER: Dr. Ali — Replace / add real carrier names once confirmed */}
              <Badge variant="neutral" className="text-sm px-4 py-2">BCBS</Badge>
              <Badge variant="neutral" className="text-sm px-4 py-2">Aetna</Badge>
              <Badge variant="neutral" className="text-sm px-4 py-2">UnitedHealthcare</Badge>
              <Badge variant="neutral" className="text-sm px-4 py-2">Cigna</Badge>
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* ── Services Grid ──────────────────────────────────────────────────── */}
      <SectionWrapper background="soft" id="services-grid">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <Card
                  key={service.id}
                  id={service.id}
                  className="p-7 flex flex-col gap-4 group hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary-light flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                    <Icon className="w-6 h-6 text-primary" aria-hidden="true" />
                  </div>
                  <h3 className="text-lg font-semibold text-neutral-800">
                    {service.name}
                  </h3>
                  <p className="text-neutral-600 text-base leading-relaxed">
                    {service.subtext}
                  </p>
                </Card>
              );
            })}
          </div>
        </div>
      </SectionWrapper>

      {/* ── Bottom CTA ─────────────────────────────────────────────────────── */}
      <SectionWrapper background="white">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-neutral-800 mb-4">
            Questions about a specific service?
          </h2>
          <p className="text-neutral-600 mb-8">
            Join the waitlist and we'll be happy to discuss your child's needs in
            detail before your first appointment.
          </p>
          <Link to="/contact">
            <Button variant="primary" size="lg" className="min-w-[200px]">
              Join the Waitlist
            </Button>
          </Link>
        </div>
      </SectionWrapper>
    </>
  );
}
