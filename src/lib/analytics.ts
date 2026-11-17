// Google Analytics 4 (gtag.js) for the public marketing site.
// This is the only place GA is loaded and the only place the ID lives.
//
// - Loaded once per page load, async, from main.tsx (browser only; never during prerender).
// - Never loads in a native Capacitor shell, in dev, or on routes that are (or could become)
//   forms, intake, login or portal pages.
// - Sends no custom events and no user identifiers. Route changes inside the SPA are counted
//   by GA4 enhanced measurement (history changes), so no manual page_view is sent here.

const GA_MEASUREMENT_ID = 'G-G2XMBQFFCN';

// Path prefixes that must never be tagged. /contact used to host the waitlist form and now
// redirects to "/"; the rest are reserved so a future form/portal route is excluded by default.
const EXCLUDED_PATH_PREFIXES = ['/contact', '/waitlist', '/intake', '/forms', '/portal', '/login'];

type GtagWindow = Window & { dataLayer?: unknown[]; Capacitor?: unknown };

export function initAnalytics(): void {
  if (!import.meta.env.PROD || typeof window === 'undefined') return;
  const w = window as GtagWindow;
  if (w.Capacitor) return;
  if (EXCLUDED_PATH_PREFIXES.some((p) => w.location.pathname === p || w.location.pathname.startsWith(`${p}/`))) return;
  if (document.getElementById('ga4-gtag')) return;

  w.dataLayer = w.dataLayer || [];
  // gtag.js requires the real `arguments` object, not a rest array.
  function gtag(..._args: unknown[]) {
    // eslint-disable-next-line prefer-rest-params
    w.dataLayer!.push(arguments);
  }
  gtag('js', new Date());
  gtag('config', GA_MEASUREMENT_ID);

  const script = document.createElement('script');
  script.id = 'ga4-gtag';
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script);
}
