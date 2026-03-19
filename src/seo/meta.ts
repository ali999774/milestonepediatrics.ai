/**
 * SEO Metadata Constants
 * Nina Walsh — SEO & Content Specialist
 * 
 * This file contains the single source of truth for SEO metadata across the site.
 * Jordan (Integration): Please use these values to populate a <title> and <meta> 
 * tag management system (like a simple useEffect in a wrapper or RootLayout).
 */

export const SEO_CONFIG = {
  baseUrl: 'https://milestonepediatrics.ai',
  defaultTitle: 'Milestone Pediatrics | Relationship-First Pediatrician in Houston, TX',
  defaultDescription: 'Experience relationship-first pediatric care in Houston, TX. Milestone Pediatrics prioritizing trust, evidence-based medicine, and child development. Join our waitlist today!',
  ogImage: '/og-image.jpg', // Macro: Needs to be 1200x630px
  twitterHandle: '@MilestonePeds', // Placeholder
};

export interface PageMeta {
  title: string;
  description: string;
  canonical: string;
  ogType?: 'website' | 'article';
}

export const PAGE_META: Record<string, PageMeta> = {
  home: {
    title: 'Milestone Pediatrics | Relationship-First Pediatrician in Houston, TX',
    description: 'Experience relationship-first pediatric care in Houston, TX. Milestone Pediatrics prioritizing trust, evidence-based medicine, and child development. Join our waitlist today!',
    canonical: 'https://milestonepediatrics.ai',
  },
  about: {
    title: 'Meet Our Doctor & Vision | Milestone Pediatrics Houston',
    description: 'Learn about the philosophy behind Milestone Pediatrics in Houston. Discover why relationship-first care and evidence-based medicine are at the heart of our practice.',
    canonical: 'https://milestonepediatrics.ai/about',
  },
  services: {
    title: 'Pediatric Services & Care Model | Milestone Pediatrics Houston',
    description: 'From newborn care to adolescent wellness, explore our comprehensive pediatric services in Houston, TX. Modern care built on deep relationships.',
    canonical: 'https://milestonepediatrics.ai/services',
  },
  faq: {
    title: 'Frequently Asked Questions | Milestone Pediatrics Houston',
    description: 'Answers to your common questions about our pediatric practice in Houston, TX. Information on vaccines, insurance, scheduling, and our relationship-first approach.',
    canonical: 'https://milestonepediatrics.ai/faq',
  },
  contact: {
    title: 'Join Our Waitlist & Contact Us | Milestone Pediatrics Houston',
    description: 'Secure your child\'s spot today. Join the waitlist for Milestone Pediatrics in Houston, TX. Reach out with questions about our upcoming practice opening.',
    canonical: 'https://milestonepediatrics.ai/contact',
  },
  privacy: {
    title: 'Privacy Policy | Milestone Pediatrics Houston',
    description: 'How Milestone Pediatrics in Houston, TX protects your family\'s information. Read our commitment to privacy and data security.',
    canonical: 'https://milestonepediatrics.ai/privacy',
  },
};

/**
 * FAQ Schema Markup
 * To be injected into the FAQ page specifically.
 */
export const FAQ_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  'mainEntity': [
    {
      '@type': 'Question',
      'name': 'Are you currently accepting new patients?',
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': 'Yes! We are currently forming our founding patient list in Houston, TX. You can join our waitlist via our contact page to secure your spot.'
      }
    },
    {
      '@type': 'Question',
      'name': 'What is relationship-first pediatric care?',
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': 'It means we prioritize knowing your child and family as people first. By building a deep foundation of trust, we can provide more personalized, effective, and evidence-based medical care.'
      }
    },
    {
      '@type': 'Question',
      'name': 'Where is Milestone Pediatrics located?',
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': 'We are located in Houston, TX. Our exact neighborhood and office address will be confirmed as we approach our opening date.'
      }
    }
  ]
};
