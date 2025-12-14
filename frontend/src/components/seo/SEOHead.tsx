'use client';

import Head from 'next/head';
import { useRouter } from 'next/router';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: string;
  locale?: string;
  siteName?: string;
  noIndex?: boolean;
  canonical?: string;
  structuredData?: Record<string, any>;
}

const SEOHead: React.FC<SEOHeadProps> = ({
  title = 'RAY Egypt - Multi-Service Platform',
  description = 'Complete business management platform for restaurants, retail, clinics, gyms, and more. 20+ business systems in one place.',
  keywords = ['business management', 'restaurant', 'clinic', 'gym', 'retail', 'egypt', 'platform'],
  image = '/images/og-image.jpg',
  url,
  type = 'website',
  locale = 'ar_EG',
  siteName = 'RAY Egypt',
  noIndex = false,
  canonical,
  structuredData
}) => {
  const router = useRouter();
  const fullUrl = url || `https://ray-egypt.com${router.asPath}`;

  const jsonLd = structuredData ? JSON.stringify(structuredData) : null;

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords.join(', ')} />
      
      {/* Canonical URL */}
      {canonical && <link rel="canonical" href={canonical} />}
      {!canonical && <link rel="canonical" href={fullUrl} />}
      
      {/* Robots */}
      {noIndex && <meta name="robots" content="noindex, nofollow" />}
      {!noIndex && <meta name="robots" content="index, follow" />}
      
      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:type" content={type} />
      <meta property="og:locale" content={locale} />
      <meta property="og:site_name" content={siteName} />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      
      {/* Additional Meta Tags */}
      <meta name="author" content="RAY Egypt Team" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="Content-Type" content="text/html; charset=UTF-8" />
      <meta name="theme-color" content="#000000" />
      
      {/* Language and Direction */}
      <html lang={locale.startsWith('ar') ? 'ar' : 'en'} dir={locale.startsWith('ar') ? 'rtl' : 'ltr'} />
      
      {/* Structured Data */}
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLd }}
        />
      )}
      
      {/* Preconnect to external domains */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="preconnect" href="https://res.cloudinary.com" />
      <link rel="preconnect" href="https://images.unsplash.com" />
      
      {/* DNS Prefetch */}
      <link rel="dns-prefetch" href="//fonts.googleapis.com" />
      <link rel="dns-prefetch" href="//res.cloudinary.com" />
      <link rel="dns-prefetch" href="//images.unsplash.com" />
    </Head>
  );
};

export default SEOHead;
