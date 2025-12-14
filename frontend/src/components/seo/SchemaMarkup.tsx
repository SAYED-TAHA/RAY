'use client';

interface SchemaProps {
  type: string;
  data: Record<string, any>;
}

const SchemaMarkup: React.FC<SchemaProps> = ({ type, data }) => {
  const generateSchema = () => {
    switch (type) {
      case 'organization':
        return {
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: data.name || 'RAY Egypt',
          url: data.url || 'https://ray-egypt.com',
          logo: data.logo || '/images/logo.png',
          description: data.description || 'Multi-service business platform',
          address: {
            '@type': 'PostalAddress',
            streetAddress: data.streetAddress || '123 Main St',
            addressLocality: data.city || 'Cairo',
            addressRegion: data.region || 'Cairo',
            postalCode: data.postalCode || '12345',
            addressCountry: data.country || 'EG'
          },
          contactPoint: {
            '@type': 'ContactPoint',
            telephone: data.phone || '+20-123-456-7890',
            contactType: 'customer service',
            availableLanguage: ['Arabic', 'English']
          },
          sameAs: data.socialLinks || [
            'https://facebook.com/rayegypt',
            'https://twitter.com/rayegypt',
            'https://instagram.com/rayegypt'
          ]
        };

      case 'website':
        return {
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: data.name || 'RAY Egypt',
          url: data.url || 'https://ray-egypt.com',
          description: data.description || 'Multi-service business platform',
          potentialAction: {
            '@type': 'SearchAction',
            target: `${data.url || 'https://ray-egypt.com'}/search?q={search_term_string}`,
            'query-input': 'required name=search_term_string'
          }
        };

      case 'localbusiness':
        return {
          '@context': 'https://schema.org',
          '@type': 'LocalBusiness',
          name: data.name,
          image: data.image,
          telephone: data.phone,
          address: {
            '@type': 'PostalAddress',
            streetAddress: data.streetAddress,
            addressLocality: data.city,
            addressRegion: data.region,
            postalCode: data.postalCode,
            addressCountry: data.country
          },
          geo: {
            '@type': 'GeoCoordinates',
            latitude: data.latitude,
            longitude: data.longitude
          },
          openingHours: data.openingHours,
          priceRange: data.priceRange || '$$',
          servesCuisine: data.cuisine,
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: data.rating,
            reviewCount: data.reviewCount
          }
        };

      case 'product':
        return {
          '@context': 'https://schema.org',
          '@type': 'Product',
          name: data.name,
          image: data.images,
          description: data.description,
          brand: {
            '@type': 'Brand',
            name: data.brand
          },
          offers: {
            '@type': 'Offer',
            price: data.price,
            priceCurrency: data.currency || 'EGP',
            availability: data.availability || 'InStock',
            seller: {
              '@type': 'Organization',
              name: data.seller
            }
          },
          aggregateRating: data.rating ? {
            '@type': 'AggregateRating',
            ratingValue: data.rating,
            reviewCount: data.reviewCount
          } : undefined
        };

      case 'breadcrumb':
        return {
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: data.items?.map((item: any, index: number) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: item.name,
            item: item.url
          }))
        };

      default:
        return data;
    }
  };

  const schema = generateSchema();

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema)
      }}
    />
  );
};

export default SchemaMarkup;
