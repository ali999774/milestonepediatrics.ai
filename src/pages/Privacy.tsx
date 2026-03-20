import { Helmet } from 'react-helmet-async';
import { SectionWrapper } from '../components/ui/SectionWrapper';
import { PAGE_META, SEO_CONFIG } from '../seo/meta';


export default function Privacy() {
  const meta = PAGE_META.privacy;
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
    <SectionWrapper className="py-24 max-w-4xl mx-auto">
      <div className="mb-12 border-b border-neutral-200 pb-8">
        <h1 className="text-3xl lg:text-5xl font-bold text-neutral-800 mb-6">Privacy Policy</h1>
        <div className="text-neutral-600 space-y-1">
          <p className="font-bold text-lg">Milestone Pediatrics</p>
          <p>milestonepediatrics.ai | Houston, TX</p>
          <p>Last updated: March 2026</p>
        </div>
      </div>

      <div className="space-y-10">
        <section>
          <h2 className="text-2xl font-bold text-neutral-800 mb-4">What this policy covers</h2>
          <p className="text-neutral-600 leading-relaxed">
            This Privacy Policy describes how Milestone Pediatrics collects, uses, and 
            protects information you provide through our website. This website is used 
            to collect waitlist registrations from families interested in becoming 
            patients before our practice opens. This website does not provide medical 
            care, establish a patient-provider relationship, or collect Protected Health 
            Information (PHI) as defined by HIPAA.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-neutral-800 mb-4">What information we collect</h2>
          <p className="text-neutral-600 leading-relaxed mb-4">
            When you join our waitlist, we collect:
          </p>
          <ul className="list-disc pl-6 text-neutral-600 space-y-2">
            <li>Parent or guardian name</li>
            <li>Email address</li>
            <li>Child's age range</li>
          </ul>
          <p className="text-neutral-600 leading-relaxed mt-4 mb-4">
            Optionally, you may also provide:
          </p>
          <ul className="list-disc pl-6 text-neutral-600 space-y-2">
            <li>Child's name and date of birth</li>
            <li>Parent or guardian phone number</li>
            <li>Insurance provider</li>
            <li>Questions or notes</li>
          </ul>
          <p className="text-neutral-600 leading-relaxed mt-4 italic">
            All optional fields are clearly labeled as optional.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-neutral-800 mb-4">How we use your information</h2>
          <p className="text-neutral-600 leading-relaxed mb-4">
            We use the information you provide solely to:
          </p>
          <ul className="list-disc pl-6 text-neutral-600 space-y-2">
            <li>Confirm your waitlist registration</li>
            <li>Contact you before Milestone Pediatrics opens to arrange your first appointment</li>
            <li>Understand the needs of our incoming patient families</li>
          </ul>
          <p className="text-neutral-600 leading-relaxed mt-4 font-medium">
            We will never sell your information. We will never share it with third 
            parties for marketing purposes.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-neutral-800 mb-4">How your information is stored</h2>
          <p className="text-neutral-600 leading-relaxed">
            Your information is stored securely in Supabase, a cloud database platform 
            hosted on servers in the United States. Access is restricted to authorized 
            practice personnel only.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-neutral-800 mb-4">Children's information</h2>
          <p className="text-neutral-600 leading-relaxed">
            Some families voluntarily provide their child's name and date of birth. 
            This information is stored securely, used only to prepare for your child's 
            first visit, never shared with third parties, and deletable upon request. 
            All registrations are completed by a parent or guardian on behalf of 
            their child.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-neutral-800 mb-4">Your rights</h2>
          <p className="text-neutral-600 leading-relaxed">
            You have the right to access, correct, or delete your registration at any 
            time. To do so, email <a href="mailto:hello@milestonepediatrics.ai" className="text-primary hover:underline font-medium">hello@milestonepediatrics.ai</a> with the subject line 
            "Data Request." We will respond within 5 business days.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-neutral-800 mb-4">Cookies and tracking</h2>
          <p className="text-neutral-600 leading-relaxed">
            This website uses Vercel Analytics, which is cookieless — no tracking 
            cookies, no user fingerprinting, no advertising networks. No cookie consent 
            banner is required.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-neutral-800 mb-4">Third-party services</h2>
          <ul className="list-disc pl-6 text-neutral-600 space-y-2">
            <li>Vercel — website hosting (<a href="https://vercel.com/privacy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium">vercel.com/privacy</a>)</li>
            <li>Supabase — database (<a href="https://supabase.com/privacy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium">supabase.com/privacy</a>)</li>
          </ul>
        </section>

        <section className="pt-8 border-t border-neutral-200">
          <h2 className="text-2xl font-bold text-neutral-800 mb-4">Contact</h2>
          <p className="text-neutral-600 leading-relaxed">
            <a href="mailto:hello@milestonepediatrics.ai" className="text-primary hover:underline font-medium">hello@milestonepediatrics.ai</a><br />
            Milestone Pediatrics, Houston, TX
          </p>
        </section>
      </div>
    </SectionWrapper>
    </>
  );
}
