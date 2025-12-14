'use client';

import React, { useState, useCallback } from 'react';
import { ShoppingCart, Plus, Check } from 'lucide-react';
import { fastCart, cartEvents } from '@/utils/performance';

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
}

interface AddToCartButtonProps {
  product: Product;
  className?: string;
  showIcon?: boolean;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'secondary' | 'outline';
}

const AddToCartButton: React.FC<AddToCartButtonProps> = ({
  product,
  className = '',
  showIcon = true,
  size = 'md',
  variant = 'primary'
}) => {
  const [isAdded, setIsAdded] = useState(false);
  
  const handleAddToCart = useCallback(() => {
    try {
      // Fast cart operation
      fastCart.add(product);
      
      // Emit cart update event
      cartEvents.emit();
      
      // Show feedback
      setIsAdded(true);
      setTimeout(() => setIsAdded(false), 1000);
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  }, [product]);

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
    ${className}
  `;

  if (isAdded) {
    return (
      <button className={`${baseClasses} bg-green-600 hover:bg-green-700`}>
        <Check className="w-4 h-4" />
        <span>تمت الإضافة!</span>
      </button>
    );
  }

  return (
    <button
      onClick={handleAddToCart}
      className={baseClasses}
    >
      {showIcon && <ShoppingCart className="w-4 h-4" />}
      <span>أضف للسلة</span>
    </button>
  );
};

export default AddToCartButton;
