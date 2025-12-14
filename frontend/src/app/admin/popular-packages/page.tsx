'use client';

import React, { useState } from 'react';
import { Star, TrendingUp, Users, Award } from 'lucide-react';
import Link from 'next/link';

export default function AdminPopularPackages() {
  const packages = [
    { id: 1, name: 'الباقة المميزة', rating: 4.8, reviews: 234, subscribers: 1567, growth: 12.8, revenue: 468533 },
    { id: 2, name: 'الباقة الذهبية', rating: 4.6, reviews: 189, subscribers: 678, growth: 8.3, revenue: 405922 },
    { id: 3, name: 'الباقة الأساسية', rating: 4.3, reviews: 156, subscribers: 892, growth: 5.2, revenue: 88208 },
    { id: 4, name: 'الباقة المؤسسية', rating: 4.9, reviews: 98, subscribers: 189, growth: 15.6, revenue: 188811 }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link href="/admin" className="p-2 hover:bg-gray-100 rounded-lg transition">
                <Award className="w-6 h-6 text-gray-600" />
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">الباقات الأكثر شهرة</h1>
                <p className="text-sm text-gray-600">الباقات المفضلة والأعلى تقييماً</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {packages.map((pkg, index) => (
            <div key={pkg.id} className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl font-bold text-gray-900">#{index + 1}</span>
                    <h3 className="text-lg font-bold text-gray-900">{pkg.name}</h3>
                  </div>
                  <div className="flex items-center gap-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-4 h-4 ${i < Math.floor(pkg.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
                    ))}
                    <span className="text-sm text-gray-600">({pkg.reviews} تقييم)</span>
                  </div>
                </div>
                <span className="px-3 py-1 bg-yellow-100 text-yellow-800 text-xs font-semibold rounded-full">
                  ⭐ {pkg.rating}
                </span>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <Users className="w-4 h-4 text-blue-600" />
                    <p className="text-xs text-gray-600">المشتركون</p>
                  </div>
                  <p className="text-lg font-bold text-blue-600">{pkg.subscribers.toLocaleString()}</p>
                </div>
                
                <div className="p-3 bg-green-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <TrendingUp className="w-4 h-4 text-green-600" />
                    <p className="text-xs text-gray-600">النمو</p>
                  </div>
                  <p className="text-lg font-bold text-green-600">+{pkg.growth}%</p>
                </div>
                
                <div className="p-3 bg-purple-50 rounded-lg">
                  <p className="text-xs text-gray-600 mb-1">الإيرادات</p>
                  <p className="text-lg font-bold text-purple-600">{(pkg.revenue/1000).toFixed(0)}K</p>
                </div>
                
                <div className="p-3 bg-orange-50 rounded-lg">
                  <p className="text-xs text-gray-600 mb-1">متوسط الإيرادة</p>
                  <p className="text-lg font-bold text-orange-600">{(pkg.revenue/pkg.subscribers).toFixed(0)} ج.م</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
