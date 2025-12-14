'use client';

import React from 'react';
import AddToCartButton from '@/components/common/AddToCartButton';
import ProductCard from '@/components/common/ProductCard';
import CartIcon from '@/components/common/CartIcon';

// Example products that can be used throughout the app
export const exampleProducts = [
  {
    id: 1,
    name: 'تيشيرت قطن عالي الجودة',
    price: 120,
    shop: 'محمل أزياء',
    image: '/api/placeholder/300/300',
    description: 'تيشيرت قطن مريح ومناسب لكل الفصول',
    category: 'ملابس',
    size: 'L',
    color: 'أبيض',
    merchantId: 'merchant-1',
    productId: 'prod-1',
    rating: 4.5,
    reviews: 128,
    discount: 20,
    originalPrice: 150
  },
  {
    id: 2,
    name: 'جينز أزرق كلاسيكي',
    price: 280,
    shop: 'محمل أزياء',
    image: '/api/placeholder/300/300',
    description: 'جينز أزرق مقاس منتظم، مناسبة لكل المناسبات',
    category: 'ملابس',
    size: '32',
    color: 'أزرق',
    merchantId: 'merchant-1',
    productId: 'prod-2',
    rating: 4.3,
    reviews: 89
  },
  {
    id: 3,
    name: 'حذاء رياضي خفيف',
    price: 450,
    shop: 'متجر الأحذية',
    image: '/api/placeholder/300/300',
    description: 'حذاء رياضي خفيف ومريح، مثالي للتمارين',
    category: 'أحذية',
    size: '42',
    color: 'أسود',
    merchantId: 'merchant-2',
    productId: 'prod-3',
    rating: 4.7,
    reviews: 234
  }
];

// Example usage in any component
export const CartUsageExample: React.FC = () => {
  return (
    <div className="p-6 space-y-8">
      <h2 className="text-2xl font-bold mb-4">أمثلة استخدام السلة</h2>
      
      {/* Cart Icon in Header */}
      <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
        <h3 className="font-semibold">أيقونة السلة:</h3>
        <CartIcon showCount={true} size="md" />
      </div>
      
      {/* Add to Cart Button */}
      <div className="space-y-4">
        <h3 className="font-semibold">زر إضافة للسلة:</h3>
        <div className="flex gap-4">
          {exampleProducts.map(product => (
            <AddToCartButton
              key={product.id}
              product={product}
              size="md"
              variant="primary"
            />
          ))}
        </div>
      </div>
      
      {/* Product Cards */}
      <div className="space-y-4">
        <h3 className="font-semibold">بطاقات المنتجات:</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {exampleProducts.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              variant="default"
              showAddToCart={true}
              showFavorite={true}
            />
          ))}
        </div>
      </div>
      
      {/* Minimal Product Cards */}
      <div className="space-y-4">
        <h3 className="font-semibold">بطاقات منتجات بسيطة:</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {exampleProducts.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              variant="minimal"
              size="sm"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

// How to use in pages:
/*
1. Import the components:
   import AddToCartButton from '@/components/common/AddToCartButton';
   import ProductCard from '@/components/common/ProductCard';
   import CartIcon from '@/components/common/CartIcon';

2. Use AddToCartButton for any product:
   <AddToCartButton product={productData} />

3. Use ProductCard for complete product display:
   <ProductCard product={productData} variant="default" />

4. Use CartIcon in navigation:
   <CartIcon showCount={true} size="md" />

5. The cart data is automatically synced across all components
   and persisted in localStorage.
*/

export default CartUsageExample;
