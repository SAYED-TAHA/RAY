"use client";

import React from 'react';
import AddToCartButton from '@/components/common/AddToCartButton';
import CartIcon from '@/components/common/CartIcon';
import ProductCard from '@/components/common/ProductCard';

const testProducts = [
  {
    id: 1,
    name: 'تيشيرت قطن',
    price: 120,
    shop: 'محمل أزياء',
    image: '/api/placeholder/300/300',
    description: 'تيشيرت قطن عالي الجودة',
    category: 'ملابس'
  },
  {
    id: 2,
    name: 'جينز أزرق',
    price: 280,
    shop: 'محمل أزياء',
    image: '/api/placeholder/300/300',
    description: 'جينز أزرق كلاسيكي',
    category: 'ملابس'
  }
];

export default function TestCartPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
        <h1 className="text-3xl font-bold mb-8">اختبار السلة</h1>
        
        <div className="mb-8">
          <h2 className="text-xl mb-4">أيقونة السلة:</h2>
          <CartIcon showCount={true} size="md" />
        </div>
        
        <div className="mb-8">
          <h2 className="text-xl mb-4">أزرار إضافة للسلة:</h2>
          <div className="flex gap-4">
            {testProducts.map(product => (
              <AddToCartButton key={product.id} product={product} />
            ))}
          </div>
        </div>
        
        <div className="mb-8">
          <h2 className="text-xl mb-4">بطاقات المنتجات:</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {testProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
        
        <div className="mt-8 p-4 bg-blue-50 rounded-lg">
          <p className="text-blue-800">
            اذهب إلى صفحة <a href="/cart" className="underline">السلة</a> لرؤية المنتجات المضافة
          </p>
        </div>
      </div>
  );
}
