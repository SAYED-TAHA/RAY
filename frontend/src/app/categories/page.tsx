
"use client";

import React from 'react';
import { allCategories } from '@/components/data';
import EmptyState from '@/components/common/EmptyState';
import { LayoutGrid } from 'lucide-react';

const CategoriesPage = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-in fade-in duration-500">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-black text-ray-black dark:text-white mb-4">جميع الأقسام</h1>
        <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
            استكشف جميع الفئات والأنشطة المتاحة على منصة راي.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {allCategories.map((cat) => (
        <div key={cat.id} className="bg-white dark:bg-gray-800 rounded-3xl p-6 border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-lg transition-all group">
            <div className="flex items-center gap-4 mb-6">
                <div className={`w-16 h-16 ${cat.color} dark:bg-opacity-20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition duration-300`}>
                    <cat.icon className="w-8 h-8" />
                </div>
                <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-ray-blue dark:group-hover:text-ray-gold transition">{cat.name}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{cat.sub.length} تخصصات</p>
                </div>
            </div>
            
            <div className="space-y-2">
                {cat.sub.map((sub) => (
                    <button 
                        key={sub.id} 
                        onClick={() => {/* Navigate to search */}}
                        className="block w-full text-right px-4 py-2 rounded-xl text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-ray-blue dark:hover:text-ray-gold transition"
                    >
                        {sub.name}
                    </button>
                ))}
            </div>
        </div>
        ))}
      </div>

      {allCategories.length === 0 && (
        <EmptyState 
            icon={LayoutGrid}
            title="لا توجد أقسام"
            description="لم يتم العثور على أي أقسام في الوقت الحالي."
        />
      )}
    </div>
  );
}

export default CategoriesPage;
