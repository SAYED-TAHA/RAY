'use client';

import React, { useState, useCallback } from 'react';
import { ShoppingCart, Plus, Check, AlertCircle } from 'lucide-react';
import { fastCart, cartEvents } from '@/utils/performance';
import { addToCart as addToCartAPI } from '@/services/cartService';

interface Product {
  id?: string | number;
  _id?: string | number;
  name: string;
  price: number;
  shop?: string;
  image?: string;
  description?: string;
  category?: string;
  size?: string;
  color?: string;
  merchantId?: string;
  productId?: string;
}

interface AddToCartButtonProps {
  product: Product;
  className?: string;
  showIcon?: boolean;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'secondary' | 'outline';
  quantity?: number;
}

const AddToCartButton: React.FC<AddToCartButtonProps> = ({
  product,
  className = '',
  showIcon = true,
  size = 'md',
  variant = 'primary',
  quantity = 1
}) => {
  const [isAdded, setIsAdded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const handleAddToCart = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const productId = product._id || product.id;
      if (!productId) {
        setError('معرف المنتج غير متوفر');
        return;
      }

      // Try to add to backend cart first
      const token = localStorage.getItem('authToken');
      if (token) {
        try {
          await addToCartAPI(String(productId), quantity);
          // Also update local cart for instant feedback
          fastCart.add(product);
          cartEvents.emit();
        } catch (apiError: any) {
          console.warn('Backend cart failed, using local cart:', apiError);
          // Fallback to local cart
          fastCart.add(product);
          cartEvents.emit();
        }
      } else {
        // No auth token, use local cart only
        fastCart.add(product);
        cartEvents.emit();
      }
      
      // Show feedback
      setIsAdded(true);
      setTimeout(() => setIsAdded(false), 2000);
    } catch (err: any) {
      console.error('Error adding to cart:', err);
      setError(err.message || 'فشل إضافة المنتج للسلة');
      setTimeout(() => setError(null), 3000);
    } finally {
      setIsLoading(false);
    }
  }, [product, quantity]);

  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'px-3 py-1.5 text-sm';
      case 'lg':
        return 'px-6 py-3 text-lg';
      default:
        return 'px-4 py-2';
    }
  };

  const getVariantClasses = () => {
    switch (variant) {
      case 'secondary':
        return 'bg-gray-600 text-white hover:bg-gray-700';
      case 'outline':
        return 'border-2 border-blue-600 text-blue-600 hover:bg-blue-50';
      default:
        return 'bg-blue-600 text-white hover:bg-blue-700';
    }
  };

  const baseClasses = `
    ${getSizeClasses()}
    ${getVariantClasses()}
    rounded-lg font-medium transition-all duration-200
    flex items-center justify-center gap-2
    transform hover:scale-105 active:scale-95
    disabled:opacity-50 disabled:cursor-not-allowed
    ${className}
  `;

  if (error) {
    return (
      <div className="flex flex-col gap-1">
        <button 
          onClick={handleAddToCart}
          disabled={isLoading}
          className={baseClasses}
        >
          {isLoading ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              <span>جاري الإضافة...</span>
            </>
          ) : (
            <>
              {showIcon && <ShoppingCart className="w-4 h-4" />}
              <span>أضف للسلة</span>
            </>
          )}
        </button>
        <div className="flex items-center gap-1 text-red-600 text-xs">
          <AlertCircle className="w-3 h-3" />
          <span>{error}</span>
        </div>
      </div>
    );
  }

  if (isAdded) {
    return (
      <button className={`${baseClasses} bg-green-600 hover:bg-green-700`} disabled>
        <Check className="w-4 h-4" />
        <span>تمت الإضافة!</span>
      </button>
    );
  }

  return (
    <button
      onClick={handleAddToCart}
      disabled={isLoading}
      className={baseClasses}
    >
      {isLoading ? (
        <>
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current"></div>
          <span>جاري الإضافة...</span>
        </>
      ) : (
        <>
          {showIcon && <ShoppingCart className="w-4 h-4" />}
          <span>أضف للسلة</span>
        </>
      )}
    </button>
  );
};

export default AddToCartButton;
