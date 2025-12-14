'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import { fastCart, cartEvents } from '@/utils/performance';

interface CartIconProps {
  className?: string;
  showCount?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const CartIcon: React.FC<CartIconProps> = ({ 
  className = '', 
  showCount = true, 
  size = 'md' 
}) => {
  const [cartCount, setCartCount] = useState(0);

  const updateCount = useCallback(() => {
    const count = fastCart.count();
    setCartCount(count);
  }, []);

  useEffect(() => {
    updateCount();
    
    // Subscribe to cart events
    const unsubscribe = cartEvents.subscribe(updateCount);
    
    return () => {
      unsubscribe();
    };
  }, [updateCount]);

  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'w-5 h-5';
      case 'lg':
        return 'w-8 h-8';
      default:
        return 'w-6 h-6';
    }
  };

  return (
    <Link href="/cart" className={`relative ${className}`}>
      <ShoppingCart className={`${getSizeClasses()} text-gray-600 hover:text-blue-600 transition-colors`} />
      {showCount && cartCount > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
          {cartCount > 99 ? '99+' : cartCount}
        </span>
      )}
    </Link>
  );
};

export default CartIcon;
