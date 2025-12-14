// Image optimization utilities

export const imageSizes = {
  product: {
    small: '(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw',
    medium: '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw',
    large: '(max-width: 768px) 100vw, 50vw'
  },
  hero: {
    default: '100vw'
  },
  thumbnail: {
    default: '80px'
  },
  avatar: {
    default: '40px'
  }
};

export const imageQuality = {
  low: 50,
  medium: 75,
  high: 85,
  ultra: 95
};

export const placeholderImages = {
  product: '/api/placeholder/300/300',
  hero: '/api/placeholder/1920/600',
  thumbnail: '/api/placeholder/80/80',
  avatar: '/api/placeholder/40/40',
  fallback: '/api/placeholder/fallback'
};

export const optimizeImageSrc = (src: string, width?: number, height?: number, quality?: number): string => {
  if (!src) return placeholderImages.fallback;
  
  // If it's already a local API placeholder, return as is
  if (src.includes('/api/placeholder/')) return src;
  
  // For external images, we could use a service like Cloudinary or Imgix
  // For now, return the original src
  return src;
};

export const getResponsiveSizes = (type: keyof typeof imageSizes, variant: string = 'default'): string => {
  return imageSizes[type]?.[variant as keyof typeof imageSizes[keyof typeof imageSizes]] || imageSizes.product.small;
};
