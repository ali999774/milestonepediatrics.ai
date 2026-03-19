import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { SectionWrapper } from '../components/ui/SectionWrapper';
import { Button } from '../components/ui/Button';
import { Accordion, type AccordionItem } from '../components/Accordion';
import { PAGE_META, SEO_CONFIG, FAQ_SCHEMA } from '../seo/meta';

// ─── FAQ Data ────────────────────────────────────────────────────────────────
// Top 4 questions are highest-converting — written with extra care.

const topQuestions: AccordionItem[] = [
  {
    id: 'faq-accepting',
    question: 'Are you currently accepting new patients?',
    answer:
      'Yes! Milestone Pediatrics is now accepting waitlist applications for founding families. We are building our patient panel ahead of our opening in Houston, TX. Joining the waitlist is free, takes less than two minutes, and does not commit you to anything — we simply want to make sure we can welcome your family on day one.',
  },
  {
    id: 'faq-insurance',
    question: 'What insurance plans do you accept?',
    answer:
      'We plan to accept most major insurance plans, including BlueCross BlueShield, Aetna, UnitedHealthcare, and Cigna. Our team will verify your specific coverage before your first visit so there are no surprises. If your plan is not listed, please reach out — we are actively adding carriers and may be able to accommodate you.',
  },
  {
    id: 'faq-waitlist',
    question: 'How do I join the waitlist, and what happens next?',
    answer:
      'Simply visit our Contact page and fill out the short two-step form (only 3 required fields). Once submitted, you will receive a confirmation email. As we approach our opening date, we will reach out in the order applications were received to schedule your child\'s first visit. There is no fee and no obligation.',
  },
  {
    id: 'faq-opening',
    question: 'When will the practice open?',
    // PLACEHOLDER: Dr. Ali — Update with the confirmed opening date or season once known
    answer:
      'We are planning to open in approximately six months in Houston, TX. The exact date will be shared with waitlisted families first. Joining the waitlist is the best way to receive the earliest updates and secure a spot for your child.',
  },
];

const additionalQuestions: AccordionItem[] = [
  {
    id: 'faq-ages',
    question: 'What ages do you see?',
    answer:
      'We provide care for children from birth through age 21, including newborns, toddlers, school-age children, and adolescents. Whether your baby is days old or your teen needs a sports physical, we are here for every stage.',
  },
  {
    id: 'faq-first-visit',
    question: "What should I bring to my child's first visit?",
    answer:
      "Please bring your insurance card, a photo ID, your child's immunization records (if available), and any prior medical records you'd like us to review. If you are transferring from another pediatrician, we can help coordinate the records transfer — just let us know when you schedule.",
  },
  {
    id: 'faq-sick-visits',
    question: 'Do you offer same-day sick visits?',
    answer:
      'Yes. We reserve appointment slots each day specifically for sick visits so that your child can be seen promptly when they are not feeling well. Call or message us through the patient portal and we will do our best to get you in the same day.',
  },
  {
    id: 'faq-vaccines',
    question: 'What is your approach to vaccinations?',
    // PLACEHOLDER: Dr. Ali — Confirm this aligns with your exact vaccine philosophy
    answer:
      'We follow the evidence-based immunization schedule recommended by the American Academy of Pediatrics (AAP) and the CDC. Vaccines are one of the most effective tools we have to protect children, and we are happy to take the time to discuss any questions or concerns you may have at every visit.',
  },
  {
    id: 'faq-telehealth',
    question: 'Do you offer telehealth visits?',
    answer:
      'We plan to offer telehealth appointments for select visit types, such as follow-ups, behavioral health check-ins, and minor concerns that do not require a physical exam. Details will be shared closer to our opening date.',
  },
  {
    id: 'faq-hours',
    question: 'What will your office hours be?',
    // PLACEHOLDER: Dr. Ali — Update with confirmed hours once finalized
    answer:
      'Our planned hours are Monday through Friday, with extended early-morning or evening availability on select days. Exact hours will be announced before we open. Waitlisted families will be the first to know.',
  },
  {
    id: 'faq-after-hours',
    question: 'How can I reach the office after hours?',
    answer:
      'For urgent concerns outside of office hours, families will have access to an after-hours nurse advice line. For true emergencies, always call 911 or go to your nearest emergency room. Details on after-hours support will be provided at your first visit.',
  },
  {
    id: 'faq-location',
    question: 'Where will the practice be located?',
    // PLACEHOLDER: Dr. Ali — Update with the confirmed neighborhood / address once known
    answer:
      'Milestone Pediatrics will be located in Houston, TX. The exact neighborhood and address will be shared with waitlisted families as soon as the location is finalized. We are committed to a location that is convenient and accessible for Houston-area families.',
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
        <script type="application/ld+json">{JSON.stringify(FAQ_SCHEMA)}</script>
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
            If you don't see your question below, join the waitlist and we'll be
            happy to help personally.
          </p>
        </div>
      </SectionWrapper>

      {/* ── Accordion ──────────────────────────────────────────────────────── */}
      <SectionWrapper background="soft">
        <div className="max-w-3xl mx-auto">
          <Accordion items={allQuestions} defaultOpenIndex={0} />
        </div>
      </SectionWrapper>

      {/* ── Bottom CTA ─────────────────────────────────────────────────────── */}
      <SectionWrapper background="white">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-neutral-800 mb-4">
            Still have questions?
          </h2>
          <p className="text-neutral-600 mb-8">
            We'd love to hear from you. Join the waitlist and our team will
            reach out to answer anything on your mind.
          </p>
          <Link to="/contact">
            <Button variant="primary" size="lg" className="min-w-[200px]">
              Get in Touch
            </Button>
          </Link>
        </div>
      </SectionWrapper>
    </>
  );
}
