'use client';

import React from 'react';
import { Settings2 } from 'lucide-react';
import Link from 'next/link';

export default function AdminPackageControl() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link href="/admin" className="p-2 hover:bg-gray-100 rounded-lg transition">
                <Settings2 className="w-6 h-6 text-gray-600" />
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">التحكم في الباقات</h1>
                <p className="text-sm text-gray-600">إدارة وتحكم شامل في الباقات</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-10 text-center">
          <p className="text-gray-900 font-medium mb-2">لا توجد إعدادات للباقات</p>
          <p className="text-sm text-gray-600">سيتم تفعيل التحكم في الباقات عند توفر Backend لإدارة ترتيب/ظهور الباقات.</p>
        </div>
      </div>
    </div>
  );
}
