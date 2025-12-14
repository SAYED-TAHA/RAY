'use client';

import React from 'react';
import Image from 'next/image';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  fill?: boolean;
  sizes?: string;
  quality?: number;
  placeholder?: 'blur' | 'empty' | 'data:image/...;base64,...';
  fallback?: string;
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  width,
  height,
  className = '',
  priority = false,
  fill = false,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  quality = 75,
  placeholder = 'empty',
  fallback = '/api/placeholder/fallback'
}) => {
  // Use local placeholder for external images that might fail
  const imageSrc = src.includes('unsplash') ? fallback : src;

  return (
    <Image
      src={imageSrc}
      alt={alt}
      width={width}
      height={height}
      fill={fill}
      sizes={sizes}
      quality={quality}
      priority={priority}
      placeholder={placeholder}
      className={className}
      onError={(e) => {
        // Fallback to placeholder if image fails
        const target = e.target as HTMLImageElement;
        target.src = fallback;
      }}
      style={{
        objectFit: 'cover',
        objectPosition: 'center'
      }}
    />
  );
};

export default OptimizedImage;
