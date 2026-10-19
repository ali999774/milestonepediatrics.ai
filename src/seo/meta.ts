/**
 * SEO Metadata Constants
 * Single source of truth for SEO metadata across the site.
 */

export const SEO_CONFIG = {
  baseUrl: 'https://milestonepediatrics.ai',
  defaultTitle: 'Milestone Pediatrics | In Planning',
  defaultDescription: 'Milestone Pediatrics is in the planning stage and is not open or accepting patients. Updates will be posted here as plans develop.',
  ogImage: '/og-image.png',
};

export interface PageMeta {
  title: string;
  description: string;
  canonical: string;
  ogType?: 'website' | 'article';
}

export const PAGE_META: Record<string, PageMeta> = {
  home: {
    title: 'Milestone Pediatrics | In Planning',
    description: 'Milestone Pediatrics is in the planning stage and is not open or accepting patients. Updates will be posted here as plans develop.',
    canonical: 'https://milestonepediatrics.ai/',
  },
  privacy: {
    title: 'Privacy Policy | Milestone Pediatrics',
    description: 'Privacy policy for Milestone Pediatrics.',
    canonical: 'https://milestonepediatrics.ai/privacy',
  },
};
