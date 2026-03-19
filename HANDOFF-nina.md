# Nina's SEO & Content Handoff

**To:** Jordan & Dr. Ali  
**From:** Nina Walsh — SEO & Content Specialist  
**Project:** Milestone Pediatrics (`milestonepediatrics.ai`)

The SEO foundation for Phase D is now complete. I have initialized the core metadata, local SEO signals, and structural schema.

---

## 1. Files Delivered
- **`index.html`**: Updated with primary meta tags (Home defaults), Google Fonts preconnect, and global JSON-LD schemas (Physician, MedicalOrganization, WebSite).
- **`src/seo/meta.ts`**: Contains the full metadata dictionary for all 6 pages + the specific FAQ schema.
- **`public/sitemap.xml`**: Indexed all 6 routes including `/privacy`.
- **`public/robots.txt`**: Standard robots file with sitemap pointer.

---

## 2. Readability & Content Audit
- **Findings:** The current copy in `Home.tsx` is strong and approachable.
- **Flag:** "Evidence-Based Practice" is used. While technically accurate and trusts-building, I recommend keeping the supporting text warm (as it is currently) to avoid feeling overly clinical.
- **Houston Targeting:** All page descriptions and key headings now explicitly mention "Houston" to anchor our local SEO prominence.
- **Jargon Check:** No aggressive medical jargon detected. "Relationship-first" is our primary differentiator.

---

## 3. SEO Requirements for Jordan (Integration Phase)
Since I did not touch the React page files per instructions, Jordan needs to wire the values in `src/seo/meta.ts` to the routes:
1. **Dynamic Titles/Meta:** Use the `PAGE_META` object in `meta.ts` to update the document title and description on route change.
2. **Canonical Tags:** Ensure every page renders an absolute canonical link. handled `/contact` and `/contact/` by pointing both to `https://milestonepediatrics.ai/contact` (explicitly defined in `meta.ts`).
3. **FAQ Schema:** The `FAQ_SCHEMA` from `meta.ts` **MUST** be injected into the `<head>` specifically when the `/faq` route is active.

---

## 4. Local SEO & NAP Consistency (Note for Dr. Ali)
**NAP (Name, Address, Phone)** consistency is the #1 factor for local search ranking. 
- **Business Name:** Use "Milestone Pediatrics" consistently.
- **Address:** Once the specific suite/neighborhood is confirmed, we must update `index.html` and `meta.ts` immediately. 
- **Google Business Profile (GBP):** Please create/claim your GBP at [business.google.com](https://business.google.com) as soon as the address is finalized. Use the categories **"Pediatrician"** and **"Medical Clinic."**

---

## 5. Design Asset Request (Note for Marco)
- **OG Image:** We require a branded Open Graph card.
- **Specs:** 1200 × 630px.
- **Content:** Should feature the Milestone logo, the "Relationship-First Pediatrics" tagline, and "Houston, TX."
- **Export:** Save as `public/og-image.jpg`.

---

**SEO Status: READY FOR INTEGRATION**  
— Nina
