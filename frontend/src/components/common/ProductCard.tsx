'use client';

import React, { useState, Suspense } from 'react';
import { Heart, Star, ShoppingCart } from 'lucide-react';
import AddToCartButton from './AddToCartButton';
import Link from 'next/link';
import OptimizedImage from './OptimizedImage';
import { imageSizes, imageQuality, placeholderImages } from '@/utils/imageOptimizer';
import { ProductCardSkeleton } from './LoadingSkeleton';

interface Product {
  id: number;
  name: string;
  price: number;
  shop: string;
  image?: string;
  description?: string;
  category?: string;
  size?: string;
  color?: string;
  merchantId?: string;
  productId?: string;
  rating?: number;
  reviews?: number;
  discount?: number;
  originalPrice?: number;
}

interface ProductCardProps {
  product: Product;
  className?: string;
  showAddToCart?: boolean;
  showFavorite?: boolean;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'minimal' | 'detailed';
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  className = '',
  showAddToCart = true,
  showFavorite = true,
  size = 'md',
  variant = 'default'
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const renderStars = (rating: number = 0) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-3 h-3 ${
              star <= rating
                ? 'text-yellow-400 fill-yellow-400'
                : 'text-gray-300'
            }`}
          />
        ))}
        <span className="text-xs text-gray-500 mr-1">({product.reviews || 0})</span>
      </div>
    );
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'max-w-xs';
      case 'lg':
        return 'max-w-md';
      default:
        return 'max-w-sm';
    }
  };

  const renderMinimalVariant = () => (
    <div className={`bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow ${getSizeClasses()} ${className}`}>
      <div className="flex gap-3 p-3">
        <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
          <img
            src={product.image || '/api/placeholder/64/64'}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-sm text-gray-900 truncate">{product.name}</h3>
          <p className="text-xs text-gray-500">{product.shop}</p>
          <div className="flex items-center justify-between mt-1">
            <div>
              {product.discount && product.originalPrice && (
                <span className="text-xs text-gray-400 line-through ml-1">
                  {product.originalPrice} ج.م
                </span>
              )}
              <span className="text-sm font-bold text-blue-600">
                {product.price} ج.م
              </span>
            </div>
            {showAddToCart && (
              <AddToCartButton
                product={product}
                size="sm"
                variant="outline"
                showIcon={false}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );

  const renderDefaultVariant = () => (
    <div className={`bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 ${getSizeClasses()} ${className}`}>
      {/* Product Image */}
      <div className="relative" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
        <div className="aspect-square bg-gray-100 rounded-t-xl overflow-hidden">
          <OptimizedImage
            src={product.image || placeholderImages.product}
            alt={product.name}
            width={300}
            height={300}
            sizes={imageSizes.product.small}
            quality={imageQuality.medium}
            className={`transition-transform duration-300 ${isHovered ? 'scale-105' : ''}`}
          />
        </div>
        
        {/* Discount Badge */}
        {product.discount && (
          <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full font-bold">
            -{product.discount}%
          </div>
        )}
        
        {/* Favorite Button */}
        {showFavorite && (
          <button className="absolute top-2 left-2 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors">
            <Heart className="w-4 h-4 text-gray-400 hover:text-red-500 transition-colors" />
          </button>
        )}
      </div>

      {/* Product Info */}
      <div className="p-4">
        <div className="mb-2">
          <h3 className="font-semibold text-gray-900 text-sm mb-1 line-clamp-2">
            {product.name}
          </h3>
          <p className="text-xs text-gray-500">{product.shop}</p>
        </div>

        {/* Rating */}
        {product.rating && (
          <div className="mb-2">
            {renderStars(product.rating)}
          </div>
        )}

        {/* Price and Add to Cart */}
        <div className="flex items-center justify-between">
          <div>
            {product.discount && product.originalPrice && (
              <span className="text-xs text-gray-400 line-through block">
                {product.originalPrice} ج.م
              </span>
            )}
            <span className="text-lg font-bold text-blue-600">
              {product.price} ج.م
            </span>
          </div>
          
          {showAddToCart && (
            <AddToCartButton
              product={product}
              size="sm"
              className="flex-shrink-0"
            />
          )}
        </div>
      </div>
    </div>
  );

  const renderDetailedVariant = () => (
    <div className={`bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 ${getSizeClasses()} ${className}`}>
      <Link href={`/product/${product.id}`}>
        <div className="relative">
          <div className="aspect-square bg-gray-100 rounded-t-xl overflow-hidden">
            <img
              src={product.image || '/api/placeholder/300/300'}
              alt={product.name}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
          
          {product.discount && (
            <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full font-bold">
              -{product.discount}%
            </div>
          )}
          
          {showFavorite && (
            <button className="absolute top-2 left-2 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors">
              <Heart className="w-4 h-4 text-gray-400 hover:text-red-500 transition-colors" />
            </button>
          )}
        </div>
      </Link>

      <div className="p-4">
        <Link href={`/product/${product.id}`}>
          <h3 className="font-semibold text-gray-900 mb-1 hover:text-blue-600 transition-colors">
            {product.name}
          </h3>
        </Link>
        
        <p className="text-xs text-gray-500 mb-2">{product.shop}</p>
        
        {product.description && (
          <p className="text-xs text-gray-600 mb-2 line-clamp-2">
            {product.description}
          </p>
        )}

        {product.rating && (
          <div className="mb-2">
            {renderStars(product.rating)}
          </div>
        )}

        <div className="flex items-center justify-between">
          <div>
            {product.discount && product.originalPrice && (
              <span className="text-xs text-gray-400 line-through block">
                {product.originalPrice} ج.م
              </span>
            )}
            <span className="text-lg font-bold text-blue-600">
              {product.price} ج.م
            </span>
          </div>
          
          {showAddToCart && (
            <AddToCartButton
              product={product}
              size="sm"
              className="flex-shrink-0"
            />
          )}
        </div>
      </div>
    </div>
  );

  switch (variant) {
    case 'minimal':
      return renderMinimalVariant();
    case 'detailed':
      return renderDetailedVariant();
    default:
      return renderDefaultVariant();
  }
};

export default ProductCard;
