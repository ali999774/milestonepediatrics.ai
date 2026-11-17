# STATE — Milestone Pediatrics Website
Last updated: 2026-11-17 (Claude Sonnet 5.5 via Claude Code)

## Purpose
Informational, pre-opening site at www.mymilestonepediatrics.com. No patient recruitment:
no waitlist, booking, forms, email or phone on routed pages. Planned to open 2027 (no month).

## Current
- Routed: /, /about, /services, /faq, /privacy. /contact redirects to / (vercel.json, 308). Unknown URLs get the NotFound page with a 404 status.
- Physician is unnamed on routed pages, meta and built output (Ali's call; held back until a later date).
- Copy rules: location "Spring, TX (north Houston)"; no employer/UTHealth/McGovern; no named insurers.
- Branch feat/prerender (PR open against main, not merged): every public page is prerendered to static HTML.
- Analytics: GA4 (src/lib/analytics.ts, called from main.tsx; ID lives only there). Production builds only; skips /contact, /waitlist, /intake, /forms, /portal, /login and any Capacitor shell. No custom events. Privacy page discloses it. PR on branch chore/ga4 (not merged).

## How the build works (prerender)
`npm run build` = `tsc && vite build && vite build --ssr src/entry-server.tsx --outDir dist-ssr && node scripts/prerender.mjs`
1. `vite build` writes the client bundle and dist/index.html (an empty #root template with hashed asset tags).
2. `vite build --ssr` bundles src/entry-server.tsx to dist-ssr/entry-server.js (exports `render(path)`).
3. scripts/prerender.mjs renders each path (react-router createStaticHandler/StaticRouterProvider + HelmetProvider context),
   injects the Helmet tags before </head> and the markup into #root, and writes dist/index.html, dist/<page>/index.html and dist/404.html.
   It fails the build if a page lacks exactly one <title>/meta description/canonical or an <h1>, or if the sitemap misses a page. Then it deletes dist-ssr.
- Browser: src/main.tsx hydrates with hydrateRoot (falls back to createRoot when #root is empty, i.e. `vite dev`). Router is built from `routes` in src/router/index.tsx.
- Head tags come only from Helmet (src/seo/meta.ts + each page). index.html holds charset, viewport, icons, fonts only. JSON-LD (WebSite + Organization) is src/seo/jsonld.tsx, rendered on Home.
- vercel.json: cleanUrls + trailingSlash false, no catch-all rewrite, so each page serves its own file and unknown paths get dist/404.html (404 status).
- `vite preview` does NOT apply vercel.json (it serves the SPA fallback, so /about shows the home file and /nope returns 200). Test routing with a static server that reads vercel.json (e.g. `npx serve@14 dist -c ../vercel.json`) or a Vercel preview.

## Add a new page to the prerender list
1. Add the page component and its route in src/router/index.tsx (children of RootLayout).
2. Add its entry to PAGE_META in src/seo/meta.ts and a <Helmet> using it in the page (copy another page).
3. Add its path to `PAGES` in scripts/prerender.mjs.
4. Add a <url> (loc, lastmod) to public/sitemap.xml (the build fails if it is missing).
5. Add a link in Nav/Footer if wanted; run `npm run build` and check dist/<page>/index.html.

## Open
- Vercel routing (cleanUrls + dir/index.html, 404.html status) not yet confirmed on a real Vercel deployment; check the PR preview (behind Vercel login) before merging.
- Accordion (FAQ) is height-animated via JS: without JS the open item is clipped (maxHeight 0) although its text is in the HTML. Same as before; not changed.
- TODO(Ali) comments in About, Services, FAQ, meta: credentials, headshot/ABP badge, services detail, ages, hours, after-hours, telehealth, plan list.
- `npm run lint` fails: eslint not in devDependencies and no config (needs a new dependency).
- Contact.tsx (unrouted) still contains waitlist copy, WaitlistForm and the .ai email; Privacy.tsx mentions waitlist history. Out of scope.
- /contact redirect is permanent (308); earlier permanent /about etc. redirects may be cached in browsers.
