import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { SectionWrapper } from '../components/ui/SectionWrapper';
import { Card } from '../components/ui/Card';
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
    subtext: 'Regular checkups from birth through adolescence, tracking growth, milestones, and overall health at every stage.',
  },
  {
    id: 'newborn',
    icon: Baby,
    name: 'Newborn Care',
    subtext: 'Early weight checks and feeding support during the first weeks at home with a new baby.',
  },
  {
    id: 'immunizations',
    icon: Syringe,
    name: 'Vaccinations & Immunizations',
    subtext: 'Evidence-based vaccine schedules recommended by the AAP, with time to answer questions.',
  },
  {
    id: 'sick-visits',
    icon: Thermometer,
    name: 'Sick Visits',
    // TODO(Ali): confirm whether same-day sick visits will be offered.
    subtext: 'Visits for fevers, ear infections, coughs, rashes, and other acute concerns.',
  },
  {
    id: 'developmental',
    icon: Brain,
    name: 'Developmental Screenings',
    subtext: 'Structured assessments at key ages to catch speech, motor, and social-emotional delays early.',
  },
  {
    id: 'behavioral',
    icon: Smile,
    name: 'Behavioral Health Screening',
    subtext: 'A place to discuss anxiety, mood changes, and school struggles without judgment.',
  },
  {
    id: 'adolescent',
    icon: GraduationCap,
    name: 'Adolescent Medicine',
    subtext: 'Age-appropriate care for teens, including mental health check-ins and nutrition.',
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
            Planned Services
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-neutral-800 mb-4">
            Comprehensive care, one family at a time.
          </h1>
          <p className="text-neutral-600 text-lg max-w-xl mx-auto">
            Milestone Pediatrics is planned to open in Spring, TX (north Houston) in 2027. It is not yet
            open and is not accepting patients. This is what the practice will offer.
          </p>
        </div>
      </SectionWrapper>

      {/* ── ADHD & Autism evaluations (prominent) ──────────────────────────── */}
      <SectionWrapper background="primary-light" id="evaluations" className="!py-10 md:!py-14">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-neutral-800 mb-6 text-center">
            ADHD and autism evaluations
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card id="adhd-evaluation" className="p-7 flex flex-col gap-3">
              <h3 className="text-xl font-semibold text-neutral-800">ADHD evaluation and care</h3>
              {/* TODO(Ali): confirm the exact ADHD services (evaluation, medication management, follow-up) to describe. */}
              <p className="text-neutral-600 text-base leading-relaxed">
                The practice will offer evaluation for ADHD and ongoing care for children and teens with
                ADHD, with attention to how symptoms show up at home and at school.
              </p>
            </Card>
            <Card id="autism-evaluation" className="p-7 flex flex-col gap-3">
              <h3 className="text-xl font-semibold text-neutral-800">Autism evaluation and care</h3>
              {/* TODO(Ali): confirm the exact autism services and process to describe. */}
              <p className="text-neutral-600 text-base leading-relaxed">
                The practice will offer developmental screening and autism spectrum disorder evaluation
                and care. The physician is ECHO Autism trained.
              </p>
            </Card>
          </div>
        </div>
      </SectionWrapper>

      {/* ── Insurance ──────────────────────────────────────────────────────── */}
      <SectionWrapper background="white" id="insurance" className="!py-10 md:!py-14">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-neutral-800 mb-2">Insurance</h2>
          {/* TODO(Ali): replace with the plan list once payer contracts are confirmed. */}
          <p className="text-neutral-600">
            Milestone Pediatrics will be an insurance-based practice. The list of accepted plans will be
            posted here before opening.
          </p>
        </div>
      </SectionWrapper>

      {/* ── Services Grid ──────────────────────────────────────────────────── */}
      <SectionWrapper background="soft" id="services-grid">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-neutral-800 mb-8 text-center">
            General pediatric care the practice will offer
          </h2>
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

      {/* ── Status note ────────────────────────────────────────────────────── */}
      <SectionWrapper background="white">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-neutral-800 mb-4">
            Questions about the planned practice?
          </h2>
          <p className="text-neutral-600 mb-8">
            The FAQ covers what is planned and what is still to be decided.
          </p>
          <Link to="/faq">
            <Button variant="primary" size="lg" className="min-w-[200px]">
              Read the FAQ
            </Button>
          </Link>
        </div>
      </SectionWrapper>
    </>
  );
}
