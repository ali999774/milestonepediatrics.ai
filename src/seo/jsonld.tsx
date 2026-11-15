import { Helmet } from 'react-helmet-async';
import { SEO_CONFIG } from './meta';

/**
 * Site-wide structured data: WebSite + Organization only.
 * Deliberately no Person, address, phone, opening hours or MedicalClinic.
 * Rendered on the home page; the entity is declared once for the whole site.
 */
export const SITE_JSON_LD = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': `${SEO_CONFIG.baseUrl}/#website`,
      name: 'Milestone Pediatrics',
      url: SEO_CONFIG.baseUrl,
    },
    {
      '@type': 'Organization',
      '@id': `${SEO_CONFIG.baseUrl}/#organization`,
      name: 'Milestone Pediatrics',
      url: SEO_CONFIG.baseUrl,
      logo: `${SEO_CONFIG.baseUrl}/logo.png`,
      areaServed: 'Spring, TX',
    },
  ],
};

export function SiteJsonLd() {
  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(SITE_JSON_LD)}</script>
    </Helmet>
  );
}
