import { useState, useEffect } from 'react';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  qty: number;
  shop: string;
  image?: string;
  description?: string;
  category?: string;
  size?: string;
  color?: string;
  merchantId?: string;
  productId?: string;
}

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

const useCart = (): CartContextType => {
  const [cart, setCart] = useState<CartItem[]>([]);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('ray-cart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('ray-cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item: Omit<CartItem, 'qty'>) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(cartItem => cartItem.id === item.id);
      
      if (existingItem) {
        // Update quantity if item already exists
        return prevCart.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, qty: cartItem.qty + 1 }
            : cartItem
        );
      } else {
        // Add new item with quantity 1
        return [...prevCart, { ...item, qty: 1 }];
      }
    });
  };

  const removeFromCart = (id: number) => {
    setCart(prevCart => prevCart.filter(item => item.id !== id));
  };

  const updateQuantity = (id: number, qty: number) => {
    if (qty < 1) return;
    
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === id ? { ...item, qty } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const getCartCount = () => {
    return cart.reduce((total, item) => total + item.qty, 0);
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.qty), 0);
  };

  const isInCart = (id: number) => {
    return cart.some(item => item.id === id);
  };

  const getItemQuantity = (id: number) => {
    const item = cart.find(item => item.id === id);
    return item ? item.qty : 0;
  };

  return {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartCount,
    getCartTotal,
    isInCart,
    getItemQuantity
  };
};

export default useCart;
