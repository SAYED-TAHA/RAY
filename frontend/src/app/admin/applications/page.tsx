'use client';

import React from 'react';
import { FileCheck, Download } from 'lucide-react';
import Link from 'next/link';

export default function AdminApplications() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link href="/admin" className="p-2 hover:bg-gray-100 rounded-lg transition">
                <FileCheck className="w-6 h-6 text-gray-600" />
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">الطلبات</h1>
                <p className="text-sm text-gray-600">مراجعة الطلبات</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <button disabled className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg opacity-60 cursor-not-allowed">
                <Download className="w-4 h-4" />
                تصدير
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
          <FileCheck className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">لا توجد طلبات توظيف</h3>
          <p className="text-sm text-gray-600">سيتم عرض طلبات التوظيف هنا عند توفر Backend لإدارة طلبات التقديم.</p>
        </div>
      </div>
    </div>
  );
}
