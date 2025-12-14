import React from 'react';

interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'circular' | 'rectangular' | 'rounded';
  width?: string | number;
  height?: string | number;
  lines?: number;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  className = '',
  variant = 'text',
  width,
  height,
  lines = 1
}) => {
  const getVariantClasses = () => {
    switch (variant) {
      case 'circular':
        return 'rounded-full';
      case 'rectangular':
        return 'rounded-none';
      case 'rounded':
        return 'rounded-lg';
      default:
        return 'rounded';
    }
  };

  const style = {
    width: width || (variant === 'text' ? '100%' : '40px'),
    height: height || (variant === 'text' ? '1rem' : '40px'),
  };

  if (variant === 'text' && lines > 1) {
    return (
      <div className={`space-y-2 ${className}`}>
        {Array.from({ length: lines }).map((_, index) => (
          <div
            key={index}
            className={`animate-pulse bg-gray-200 rounded ${getVariantClasses()}`}
            style={{
              width: index === lines - 1 ? '70%' : '100%',
              height: height || '1rem',
            }}
          />
        ))}
      </div>
    );
  }

  return (
    <div
      className={`animate-pulse bg-gray-200 ${getVariantClasses()} ${className}`}
      style={style}
    />
  );
};

// Product Card Skeleton
export const ProductCardSkeleton: React.FC = () => (
  <div className="bg-white rounded-xl shadow-sm overflow-hidden">
    {/* Image Skeleton */}
    <div className="aspect-square bg-gray-200 animate-pulse" />
    
    {/* Content Skeleton */}
    <div className="p-4 space-y-3">
      {/* Title */}
      <Skeleton variant="text" height="1.25rem" />
      
      {/* Shop Name */}
      <Skeleton variant="text" width="60%" height="0.875rem" />
      
      {/* Rating */}
      <div className="flex items-center gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} variant="text" width="0.75rem" height="0.75rem" />
        ))}
        <Skeleton variant="text" width="2rem" height="0.75rem" />
      </div>
      
      {/* Price */}
      <div className="flex items-center justify-between">
        <Skeleton variant="text" width="4rem" height="1.5rem" />
        <Skeleton variant="rectangular" width="6rem" height="2.5rem" />
      </div>
    </div>
  </div>
);

// Cart Item Skeleton
export const CartItemSkeleton: React.FC = () => (
  <div className="flex items-center gap-4 py-4 border-b">
    {/* Product Image */}
    <Skeleton variant="rounded" width="80px" height="80px" />
    
    {/* Product Info */}
    <div className="flex-1 space-y-2">
      <Skeleton variant="text" height="1.125rem" />
      <Skeleton variant="text" width="40%" height="0.875rem" />
      <Skeleton variant="text" width="3rem" height="1.25rem" />
    </div>
    
    {/* Quantity Controls */}
    <div className="flex items-center gap-2">
      <Skeleton variant="rounded" width="2rem" height="2rem" />
      <Skeleton variant="text" width="1rem" height="1rem" />
      <Skeleton variant="rounded" width="2rem" height="2rem" />
    </div>
    
    {/* Actions */}
    <div className="flex items-center gap-2">
      <Skeleton variant="circular" width="2rem" height="2rem" />
      <Skeleton variant="circular" width="2rem" height="2rem" />
    </div>
  </div>
);

// Page Loading Skeleton
export const PageSkeleton: React.FC = () => (
  <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
    {/* Header */}
    <div className="flex items-center justify-between">
      <Skeleton variant="text" width="12rem" height="2rem" />
      <Skeleton variant="rectangular" width="8rem" height="2.5rem" />
    </div>
    
    {/* Product Grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: 8 }).map((_, index) => (
        <ProductCardSkeleton key={index} />
      ))}
    </div>
  </div>
);

// Cart Page Skeleton
export const CartPageSkeleton: React.FC = () => (
  <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
    {/* Header */}
    <div className="flex items-center justify-between">
      <Skeleton variant="text" width="10rem" height="2rem" />
      <Skeleton variant="text" width="6rem" height="1rem" />
    </div>
    
    {/* Cart Items */}
    <div className="bg-white rounded-2xl p-6 shadow-sm space-y-4">
      {Array.from({ length: 3 }).map((_, index) => (
        <CartItemSkeleton key={index} />
      ))}
    </div>
    
    {/* Cart Summary */}
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      <div className="space-y-3 mb-6">
        <div className="flex justify-between">
          <Skeleton variant="text" width="6rem" height="1rem" />
          <Skeleton variant="text" width="4rem" height="1rem" />
        </div>
        <div className="flex justify-between">
          <Skeleton variant="text" width="6rem" height="1rem" />
          <Skeleton variant="text" width="3rem" height="1rem" />
        </div>
        <div className="flex justify-between pt-3 border-t">
          <Skeleton variant="text" width="4rem" height="1.25rem" />
          <Skeleton variant="text" width="5rem" height="1.25rem" />
        </div>
      </div>
      
      <div className="space-y-3">
        <Skeleton variant="rectangular" height="3rem" />
        <Skeleton variant="rectangular" height="3rem" />
      </div>
    </div>
  </div>
);

export default Skeleton;
