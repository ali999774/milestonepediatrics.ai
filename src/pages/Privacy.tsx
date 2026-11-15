import { Helmet } from 'react-helmet-async';
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
        <meta name="twitter:title" content={meta.title} />
        <meta name="twitter:description" content={meta.description} />
        <meta name="twitter:image" content={`${SEO_CONFIG.baseUrl}${SEO_CONFIG.ogImage}`} />
      </Helmet>

      <div className="py-16 sm:py-24 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 border-b border-neutral-200 dark:border-neutral-800 pb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-neutral-800 dark:text-neutral-100 mb-4">
            Privacy Policy
          </h1>
          <div className="text-sm text-neutral-600 dark:text-neutral-400 space-y-1">
            <p className="font-semibold text-neutral-800 dark:text-neutral-200">
              Milestone Pediatrics (DBA of Uptown Pediatrics PLLC)
            </p>
            <p>www.mymilestonepediatrics.com</p>
            <p>Last updated: October 2026</p>
          </div>
        </div>

        <div className="space-y-10 text-neutral-700 dark:text-neutral-300 leading-relaxed text-base">
          <section>
            <h2 className="text-xl font-bold text-neutral-900 dark:text-neutral-100 mb-3">
              Practice Status &amp; Policy Scope
            </h2>
            <p>
              Milestone Pediatrics is the DBA of Uptown Pediatrics PLLC. The practice is in the
              planning stage and is not open or accepting patients. Appointments and waitlist
              registration are not available.
            </p>
            <p className="mt-3">
              This website does not provide medical care, offer medical advice, or establish a
              physician-patient relationship. This notice explains what data this website processes
              today and how information submitted through earlier versions of the website is handled.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-neutral-900 dark:text-neutral-100 mb-3">
              Current Website Operation
            </h2>
            <p>
              The waitlist signup form has been removed from this website, and this website does not
              provide any form for submitting personal or family information.
            </p>
            <p className="mt-3">
              The website application code does not set tracking cookies, load advertising pixels, or
              include client-side analytics scripts. When you visit this page, standard HTTP request
              information (such as IP address, browser user-agent, and requested URL) may be
              processed by the hosting provider (Vercel) to deliver the site, and by Google when your
              browser loads stylesheet and font assets from Google Fonts.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-neutral-900 dark:text-neutral-100 mb-3">
              Previously Submitted Waitlist Information
            </h2>
            <p>
              Earlier versions of this website included a waitlist registration form that collected:
            </p>
            <ul className="list-disc pl-6 mt-3 space-y-1.5 text-neutral-600 dark:text-neutral-400">
              <li>Parent or guardian name</li>
              <li>Email address</li>
              <li>Child&apos;s name</li>
              <li>
                Optional details: child date of birth, telephone number, insurance carrier, and
                referral source
              </li>
            </ul>
            <p className="mt-3">
              That form was configured to transmit submissions to a cloud database service (Supabase).
              Any information previously submitted was collected solely for practice planning and
              prospective family outreach and is not sold or shared with third parties for marketing
              or advertising purposes.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-neutral-900 dark:text-neutral-100 mb-3">
              Inquiries &amp; Updates
            </h2>
            <p>
              Because Milestone Pediatrics is in the planning stage and does not yet operate a
              clinical or administrative office, active contact channels are not yet available on
              this website. Updates—including contact details for administrative or privacy
              inquiries—will be posted here as plans develop.
            </p>
          </section>

          <section className="pt-6 border-t border-neutral-200 dark:border-neutral-800">
            <h2 className="text-xl font-bold text-neutral-900 dark:text-neutral-100 mb-3">
              Entity Information
            </h2>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              Uptown Pediatrics PLLC d/b/a Milestone Pediatrics
            </p>
          </section>
        </div>
      </div>
    </>
  );
}
