# Milestone Pediatrics - Runbook

Welcome to the operational runbook for `milestonepediatrics.ai`. This document is for Dr. Ali to manage and operate the website.

## 1. How to Deploy a Change
Because the website is connected to GitHub and Vercel, deploying a change is fully automated.
1. Make your text or code changes locally.
2. Commit your changes: `git commit -am "Update copy on home page"`
3. Push to GitHub: `git push origin main`
4. Vercel will automatically detect the push and start deploying. Your changes will be live in 1-2 minutes.

## 2. How to Update Environment Variables in Vercel
If you need to change your Supabase keys:
1. Log into your Vercel Dashboard and select `milestonepediatrics-ai`.
2. Go to **Settings > Environment Variables**.
3. Add or edit `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`.
4. Trigger a new deployment in the **Deployments** tab by clicking the 3 dots and selecting **Redeploy** so the new variables take effect.

## 3. How to Roll Back a Deploy
If a new change breaks the site, you can instantly revert it:
1. Go to the **Deployments** tab in the Vercel Dashboard.
2. Find a previous deployment that worked.
3. Click the 3 dots next to it and select **Promote to Production** (or **Assign Custom Domains** to point the main URL back to it).

## 4. How to Check Form Submissions in Supabase
1. Log into your Supabase Dashboard and select your project.
2. Go to the **Table Editor** on the left menu.
3. Select the `waitlist` table to view all submissions.

## 5. How to Update a Submission Status
The waitlist table has a `step_completed` column. However, to track status (pending -> contacted -> enrolled), you can add a `status` text column in Supabase:
1. Open the `waitlist` table in the Supabase Table Editor.
2. Click the `+` button in the headers to add a new column named `status` (type `text`, default `'pending'`).
3. Double-click the cell for a specific patient to edit it to `contacted` or `enrolled`.

## 6. How to Add a New Page
1. Create a `NewPage.tsx` file inside `src/pages/`.
2. Export the component: `export default function NewPage() { return <div>...</div> }`.
3. Open `src/router/index.tsx`.
4. Import the new page and add it to the `routes` array: `{ path: 'newpage', element: <NewPage /> }`.
5. Commit and push to deploy.

## 7. Privacy Policy Action Required
**Important:** The current Privacy Policy at `/privacy` is a placeholder. Before announcing the site publicly, you MUST update this page with a legally binding privacy policy tailored to your pediatric practice to ensure HIPAA compliance and general privacy requirements.

## 8. Rate Limiting Recommendation (Post-launch)
To prevent spam submissions to your waitlist form or DDoS attacks, it is highly recommended to consider Vercel Edge Middleware or Supabase Rate Limiting to restrict the number of requests per IP address post-launch.

## 9. Monitoring Setup
- **UptimeRobot:** Create a free account to ping `https://milestonepediatrics.ai` every 5 minutes. It will email you if the site goes down.
- **Vercel Analytics:** Enabled in your Vercel dashboard to track page views and visitor metrics securely without third-party cookies.
- **Sentry:** Consider adding Sentry for React to track frontend crashes and get alerts when users experience errors.

## 10. Security Headers Documentation (`vercel.json`)
The provided `vercel.json` adds the following security headers for your protection:
- **X-Content-Type-Options (`nosniff`):** Prevents browsers from guessing the content type, mitigating attacks that trick the browser into interpreting files as executable scripts.
- **X-Frame-Options (`DENY`):** Prevents your site from being loaded inside an iframe on another site, stopping clickjacking attacks.
- **X-XSS-Protection (`1; mode=block`):** Instructs older browsers to stop pages from loading when they detect reflected cross-site scripting (XSS) attacks.
- **Referrer-Policy (`strict-origin-when-cross-origin`):** Controls how much referrer information is sent with requests, protecting patient privacy by not leaking full URLs.
- **Permissions-Policy (`camera=(), microphone=(), geolocation=()`):** Explicitly disables access to sensitive browser APIs, reducing the attack surface since the site doesn't need them.
- **Strict-Transport-Security (`max-age=63072000; includeSubDomains; preload`):** Forces browsers to only ever connect to your site via secure HTTPS, preventing downgrade attacks.
- **Cache-Control (`public, max-age=31536000, immutable`):** Applied to `/assets/` so images and scripts are heavily cached for performance without caching the main pages containing sensitive data.

## 11. Supabase Security Verification Details
- **Row-Level Security (RLS)** is fully enabled on the `waitlist` table.
- **Policies verified:** 
  - `anon_insert_waitlist`: Public (anon) can insert new waitlist entries.
  - `anon_update_waitlist_by_id`: Public can only update a record by specific ID (requires the UUID from Step 1).
  - `auth_select_waitlist`: Authenticated users (Admin/Dr. Ali) have full read access.
- **Anon key restrictions:** Cannot read other submissions or delete rows.
- **Project setup:** Configured in the US region with daily backups enabled.

## 12. Pre-launch Checklist passed!
- [x] QA PASS received
- [x] Privacy Policy placeholder live at `/privacy`
- [x] `.env` not in git history confirmed
- [x] No service role key in any frontend file
- [x] No non-project keys in `.env`
- [x] Supabase RLS verified active
- [x] Security headers verified
- [x] HTTPS enforced, no HTTP access possible
- [x] DNS propagation complete — site resolves at milestonepediatrics.ai
- [x] SSL certificate active and valid
- [x] Vercel Analytics confirmed receiving data
- [x] Final form submission test on production (not staging)
- [x] Supabase waitlist table accessible in dashboard
- [x] RUNBOOK.md complete
- [x] Dr. Ali has Vercel and Supabase login credentials stored securely
- [x] GitHub repository secrets set

All checklist requirements are officially Confirmed & Passed.
