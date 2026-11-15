import { Helmet } from 'react-helmet-async';
import { SectionWrapper } from '../components/ui/SectionWrapper';
import { Accordion, type AccordionItem } from '../components/Accordion';
import { PAGE_META, SEO_CONFIG } from '../seo/meta';

// ─── FAQ Data ────────────────────────────────────────────────────────────────
// Informational only. No recruitment, booking or contact calls to action.

const topQuestions: AccordionItem[] = [
  {
    id: 'faq-open',
    question: 'Is the practice open or accepting patients?',
    answer:
      'No. Milestone Pediatrics is not yet open and is not accepting patients. Appointments and registration are not available.',
  },
  {
    id: 'faq-opening',
    question: 'When will the practice open?',
    // TODO(Ali): update once a firmer opening timeline can be shared.
    answer:
      'The practice is planned to open in 2027. A more specific date has not been set.',
  },
  {
    id: 'faq-location',
    question: 'Where will the practice be located?',
    // TODO(Ali): add more detail only when you are ready to share it.
    answer:
      'Milestone Pediatrics is planned for Spring, TX (north Houston). The office has not been finalized.',
  },
  {
    id: 'faq-insurance',
    question: 'Will the practice take insurance?',
    // TODO(Ali): replace with the plan list once payer contracts are confirmed.
    answer:
      'Yes. Milestone Pediatrics will be an insurance-based practice. The list of accepted plans will be posted on this site before opening.',
  },
];

const additionalQuestions: AccordionItem[] = [
  {
    id: 'faq-who',
    question: 'Who is the physician?',
    answer:
      'Dr. Ali Naqvi is a board-certified pediatrician with more than 10 years in practice. He is ECHO Autism trained, and his clinical focus includes newborn care, ADHD, and autism spectrum disorder.',
  },
  {
    id: 'faq-ages',
    question: 'What ages will the practice see?',
    // TODO(Ali): confirm the upper age limit (earlier copy said 21, project notes said 18).
    answer:
      'The practice is planned as a general pediatric practice caring for children from newborns through adolescence.',
  },
  {
    id: 'faq-adhd-autism',
    question: 'Will the practice evaluate for ADHD and autism?',
    answer:
      'Yes. ADHD and autism spectrum disorder evaluations are a planned focus of the practice. See the Services page for details.',
  },
  {
    id: 'faq-vaccines',
    question: 'What is the approach to vaccinations?',
    // TODO(Ali): confirm this aligns with your exact vaccine philosophy.
    answer:
      'The practice will follow the evidence-based immunization schedule recommended by the American Academy of Pediatrics (AAP) and the CDC.',
  },
  {
    id: 'faq-telehealth',
    question: 'Will telehealth be offered?',
    // TODO(Ali): confirm telehealth plans.
    answer:
      'Telehealth for select visit types is under consideration. Details will be shared closer to opening.',
  },
  {
    id: 'faq-hours',
    question: 'What will the office hours be?',
    // TODO(Ali): add hours once finalized.
    answer: 'Office hours have not been finalized and will be posted before opening.',
  },
  {
    id: 'faq-after-hours',
    question: 'What about care after hours?',
    // TODO(Ali): add the after-hours plan once decided.
    answer:
      'After-hours arrangements have not been finalized. For emergencies, always call 911 or go to the nearest emergency room.',
  },
];

const allQuestions = [...topQuestions, ...additionalQuestions];

// ─── FAQ Page ────────────────────────────────────────────────────────────────

export default function FAQ() {
  const meta = PAGE_META.faq;
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
      <SectionWrapper background="white">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-3">
            FAQ
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-neutral-800 mb-4">
            Questions parents ask most.
          </h1>
          <p className="text-neutral-600 text-lg max-w-xl mx-auto">
            Milestone Pediatrics is planned to open in 2027 and is not yet accepting patients.
          </p>
        </div>
      </SectionWrapper>

      {/* ── Accordion ──────────────────────────────────────────────────────── */}
      <SectionWrapper background="soft">
        <div className="max-w-3xl mx-auto">
          <Accordion items={allQuestions} defaultOpenIndex={0} />
        </div>
      </SectionWrapper>
    </>
  );
}
