/**
 * SEO Metadata Constants
 * Single source of truth for SEO metadata across the site.
 */

export const SEO_CONFIG = {
  baseUrl: 'https://www.mymilestonepediatrics.com',
  defaultTitle: 'Milestone Pediatrics | Pediatrician in Spring, TX (Opening 2027)',
  defaultDescription: 'Milestone Pediatrics is a pediatric practice in Spring, TX (north Houston), planned to open in 2027. It is not yet open and is not accepting patients.',
  ogImage: '/og-image.png',
};

export interface PageMeta {
  title: string;
  description: string;
  canonical: string;
  ogType?: 'website' | 'article';
}

const HOME_DESCRIPTION =
  'Milestone Pediatrics is a pediatric practice in Spring, TX (north Houston), planned to open in 2027. It is not yet open and is not accepting patients.';

export const PAGE_META: Record<string, PageMeta> = {
  home: {
    title: 'Milestone Pediatrics | Pediatrician in Spring, TX (Opening 2027)',
    description: HOME_DESCRIPTION,
    canonical: 'https://www.mymilestonepediatrics.com/',
  },
  about: {
    title: 'About the practice | Milestone Pediatrics, Spring, TX',
    description:
      'Learn about Milestone Pediatrics, a practice led by a board-certified pediatrician with more than 10 years in practice, ECHO Autism trained, planning to open Milestone Pediatrics in Spring, TX in 2027. Not yet open or accepting patients.',
    canonical: 'https://www.mymilestonepediatrics.com/about',
  },
  services: {
    title: 'Planned Services | Milestone Pediatrics, Spring, TX',
    description:
      'Pediatric services Milestone Pediatrics will offer when it opens in Spring, TX in 2027, including ADHD and autism evaluations. Not yet open or accepting patients.',
    canonical: 'https://www.mymilestonepediatrics.com/services',
  },
  faq: {
    title: 'FAQ | Milestone Pediatrics, Spring, TX',
    description:
      'Answers about Milestone Pediatrics, a pediatric practice planned to open in Spring, TX in 2027. Not yet open or accepting patients.',
    canonical: 'https://www.mymilestonepediatrics.com/faq',
  },
  privacy: {
    title: 'Privacy Policy | Milestone Pediatrics',
    description: 'Privacy policy for Milestone Pediatrics.',
    canonical: 'https://www.mymilestonepediatrics.com/privacy',
  },
};
