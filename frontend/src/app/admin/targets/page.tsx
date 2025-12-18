'use client';

import React from 'react';
import { Target, Plus } from 'lucide-react';
import Link from 'next/link';

export default function AdminTargets() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link href="/admin" className="p-2 hover:bg-gray-100 rounded-lg transition">
                <Target className="w-6 h-6 text-gray-600" />
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">الأهداف</h1>
                <p className="text-sm text-gray-600">تتبع أهداف الشركة والمشاريع</p>
              </div>
            </div>
            <button disabled className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg opacity-60">
              <Plus className="w-4 h-4" />
              هدف جديد
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-sm p-10 border border-gray-200 text-center">
          <p className="text-gray-900 font-medium mb-2">لا توجد أهداف</p>
          <p className="text-sm text-gray-600">سيتم عرض الأهداف هنا عند تفعيل نظام الأهداف وربطه بقاعدة البيانات.</p>
        </div>
      </div>
    </div>
  );
}
