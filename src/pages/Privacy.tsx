import { Helmet } from 'react-helmet-async';
import { SectionWrapper } from '../components/ui/SectionWrapper';
import { PAGE_META, SEO_CONFIG } from '../seo/meta';


export default function Privacy() {
  const meta = PAGE_META.privacy;
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
    <SectionWrapper className="py-24 max-w-3xl mx-auto text-center">
      <h1 className="text-3xl lg:text-5xl font-semibold mb-6 text-neutral-800">Privacy Policy</h1>
      <p className="text-lg text-neutral-600 mb-8 leading-relaxed">
        This page is coming soon. For questions about how we handle your data, email <a href="mailto:hello@milestonepediatrics.ai" className="text-primary hover:underline font-medium">hello@milestonepediatrics.ai</a>
      </p>
    </SectionWrapper>
    </>
  );
}
