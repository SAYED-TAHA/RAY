'use client';

import React, { ReactNode } from 'react';
import useCart, { CartItem } from '@/hooks/useCart';

import { CartContext } from './cart-context';

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const cartData = useCart();

  return (
    <CartContext.Provider value={cartData}>
      {children}
    </CartContext.Provider>
  );
};
