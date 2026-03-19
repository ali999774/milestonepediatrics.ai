import { Helmet } from 'react-helmet-async';
import { SectionWrapper } from '../components/ui/SectionWrapper';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { WaitlistForm } from '../components/WaitlistForm';
import { PAGE_META, SEO_CONFIG } from '../seo/meta';
import { Mail, MapPin, Clock } from 'lucide-react';

// ─── Contact Page ────────────────────────────────────────────────────────────

export default function Contact() {
  const meta = PAGE_META.contact;
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
          <div className="flex justify-center mb-4">
            <Badge variant="success" className="text-sm px-4 py-1.5 font-semibold">
              Now Accepting Waitlist Applications
            </Badge>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-neutral-800 mb-4">
            Join the Milestone family.
          </h1>
          <p className="text-neutral-600 text-lg max-w-xl mx-auto">
            Fill out the short form below to reserve your child's spot. No
            commitment, no fee — we'll reach out as we get closer to opening day.
          </p>
        </div>
      </SectionWrapper>

      {/* ── Form + Info Grid ───────────────────────────────────────────────── */}
      <SectionWrapper background="soft">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
            {/* Form column — takes 3/5 */}
            <div className="lg:col-span-3">
              <Card className="p-6 md:p-8">
                <WaitlistForm />
              </Card>
            </div>

            {/* Info column — takes 2/5 */}
            <div className="lg:col-span-2 flex flex-col gap-6">
              {/* Practice Info Card */}
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-neutral-800 mb-4">
                  Practice Information
                </h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" aria-hidden="true" />
                    <div>
                      <p className="font-medium text-neutral-800">Location</p>
                      {/* PLACEHOLDER: Dr. Ali — Update with confirmed address */}
                      <p className="text-neutral-600 text-sm">
                        Houston, TX — exact address coming soon
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" aria-hidden="true" />
                    <div>
                      <p className="font-medium text-neutral-800">Email</p>
                      <a
                        href="mailto:hello@milestonepediatrics.ai"
                        className="text-primary text-sm hover:underline"
                      >
                        hello@milestonepediatrics.ai
                      </a>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" aria-hidden="true" />
                    <div>
                      <p className="font-medium text-neutral-800">Hours</p>
                      {/* PLACEHOLDER: Dr. Ali — Update with confirmed hours */}
                      <p className="text-neutral-600 text-sm">
                        Mon – Fri · Hours TBD
                      </p>
                    </div>
                  </li>
                </ul>
              </Card>

              {/* Map placeholder — no real embed per brief */}
              <Card className="p-6 flex flex-col items-center justify-center text-center min-h-[200px] bg-neutral-100">
                <MapPin className="w-8 h-8 text-neutral-300 mb-2" aria-hidden="true" />
                <p className="text-neutral-400 text-sm font-medium">
                  Map will appear here once our address is confirmed.
                </p>
              </Card>
            </div>
          </div>
        </div>
      </SectionWrapper>
    </>
  );
}
