
import React, { useState } from 'react';
import ProductGrid, { ClothingItem } from './ProductGrid';
import ShoppingCart, { CartItem } from './ShoppingCart';
import CheckoutModal from './CheckoutModal';

const ClothingShopView: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const addToCart = (item: ClothingItem, size: string, color: string) => {
    const uniqueId = `${item.id}-${size}-${color}`;
    
    setCart(prev => {
      const existing = prev.find(p => p.uniqueId === uniqueId);
      if (existing) {
        return prev.map(p => p.uniqueId === uniqueId ? { ...p, qty: p.qty + 1 } : p);
      }
      return [...prev, { product: item, size, color, qty: 1, uniqueId }];
    });
  };

  const updateQty = (uniqueId: string, delta: number) => {
    setCart(prev => prev.map(p => {
      if (p.uniqueId === uniqueId) {
        return { ...p, qty: Math.max(0, p.qty + delta) };
      }
      return p;
    }).filter(p => p.qty > 0));
  };

  const removeFromCart = (uniqueId: string) => {
    setCart(prev => prev.filter(p => p.uniqueId !== uniqueId));
  };

  const handleCheckoutComplete = () => {
    setCart([]);
    setIsCheckoutOpen(false);
  };

  const total = cart.reduce((sum, item) => sum + (item.product.price * item.qty), 0) * 1.14;

  return (
    <div className="flex flex-col lg:flex-row h-[calc(100vh-140px)] gap-6 animate-in fade-in">
      {/* Main Product Area */}
      <div className="flex-1 h-full overflow-hidden">
        <ProductGrid addToCart={addToCart} />
      </div>

      {/* Side Cart */}
      <div className="w-full lg:w-[400px] h-full">
        <ShoppingCart 
          cart={cart} 
          updateQty={updateQty} 
          removeFromCart={removeFromCart} 
          onCheckout={() => setIsCheckoutOpen(true)} 
        />
      </div>

      <CheckoutModal 
        isOpen={isCheckoutOpen} 
        onClose={() => setIsCheckoutOpen(false)} 
        total={total}
        onComplete={handleCheckoutComplete}
      />
    </div>
  );
};

export default ClothingShopView;
