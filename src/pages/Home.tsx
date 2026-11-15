import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { PAGE_META, SEO_CONFIG } from '../seo/meta';

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
        <meta name="twitter:title" content={meta.title} />
        <meta name="twitter:description" content={meta.description} />
        <meta name="twitter:image" content={`${SEO_CONFIG.baseUrl}${SEO_CONFIG.ogImage}`} />
      </Helmet>

      <div className="relative overflow-hidden py-16 sm:py-24 md:py-32 px-4 sm:px-6 lg:px-8">
        {/* Subtle decorative background gradient matching brand identity */}
        <div
          aria-hidden="true"
          className="absolute -top-32 left-1/2 -translate-x-1/2 w-[520px] h-[520px] rounded-full opacity-[0.06] pointer-events-none"
          style={{ background: 'radial-gradient(circle, #0a7560 0%, transparent 70%)' }}
        />

        <div className="max-w-2xl mx-auto text-center relative z-10">
          {/* Brand Mark Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 rounded-2xl bg-primary-light flex items-center justify-center text-primary shadow-sm">
              <svg
                width="36"
                height="36"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-primary"
                aria-hidden="true"
              >
                <path
                  d="M10 26 L13.5 8 L18.5 8 L22 26 Z"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinejoin="round"
                />
                <circle cx="16" cy="15" r="2.8" fill="currentColor" />
              </svg>
            </div>
          </div>

          {/* Heading */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-neutral-800 dark:text-neutral-100 tracking-tight mb-3">
            Milestone Pediatrics
          </h1>

          {/* Subtitle / Status Badge */}
          <div className="inline-flex items-center px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold bg-primary-light text-primary tracking-wide mb-8">
            Planned to open in 2027
          </div>

          {/* Content Card */}
          <div className="bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm rounded-card border border-neutral-200/80 dark:border-neutral-700/80 shadow-card p-6 sm:p-10 text-left sm:text-center space-y-4">
            <p
              role="note"
              className="text-base sm:text-lg font-semibold text-neutral-800 dark:text-neutral-100 leading-relaxed"
            >
              Milestone Pediatrics is not yet open and is not accepting patients.
            </p>
            <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Dr. Ali Naqvi, a board-certified pediatrician, is planning a general pediatric practice in
              Spring, TX (north Houston). Appointments and registration are not
              available. The pages below describe what the practice is planning.
            </p>
            <nav aria-label="About the planned practice" className="flex flex-wrap justify-center gap-x-6 gap-y-2 pt-2 text-sm sm:text-base font-medium">
              <Link to="/about" className="text-primary underline-offset-4 hover:underline">About Dr. Naqvi</Link>
              <Link to="/services" className="text-primary underline-offset-4 hover:underline">Planned services</Link>
              <Link to="/faq" className="text-primary underline-offset-4 hover:underline">FAQ</Link>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
}
