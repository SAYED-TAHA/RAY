'use client';

import React, { useState } from 'react';
import { Layout, Plus, Search } from 'lucide-react';
import Link from 'next/link';

export default function AdminPages() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link href="/admin" className="p-2 hover:bg-gray-100 rounded-lg transition">
                <Layout className="w-6 h-6 text-gray-600" />
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">الصفحات</h1>
                <p className="text-sm text-gray-600">إدارة صفحات الموقع</p>
              </div>
            </div>
            <button disabled className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg opacity-60">
              <Plus className="w-4 h-4" />
              صفحة جديدة
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute right-3 top-3 w-5 h-5 text-gray-400" />
              <input type="text" placeholder="بحث عن صفحات..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pr-10 pl-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
            </div>
            <select value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)} className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option value="all">جميع الصفحات</option>
              <option value="visible">مرئية</option>
              <option value="hidden">مخفية</option>
            </select>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-10 border border-gray-200 text-center">
          <p className="text-gray-900 font-medium mb-2">لا توجد صفحات</p>
          <p className="text-sm text-gray-600">سيتم عرض صفحات الموقع هنا عند تفعيل نظام إدارة محتوى وربطه بقاعدة البيانات.</p>
        </div>
      </div>
    </div>
  );
}
