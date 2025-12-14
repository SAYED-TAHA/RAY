'use client';

import React, { createContext, useContext, ReactNode } from 'react';
import useCart, { CartItem } from '@/hooks/useCart';

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, 'qty'>) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, qty: number) => void;
  clearCart: () => void;
  getCartCount: () => number;
  getCartTotal: () => number;
  isInCart: (id: number) => boolean;
  getItemQuantity: (id: number) => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCartContext = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCartContext must be used within a CartProvider');
  }
  return context;
};

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

export default CartContext;
