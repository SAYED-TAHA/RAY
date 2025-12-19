"use client";

import { createContext } from 'react';
import type { CartItem } from '@/hooks/useCart';

export interface CartContextType {
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

export const CartContext = createContext<CartContextType | undefined>(undefined);
