'use client';

import React, { useState } from 'react';
import { Layout, Plus, Edit, Trash2, Eye, EyeOff, Search, Filter } from 'lucide-react';
import Link from 'next/link';

export default function AdminPages() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const pages = [
    { id: 1, title: 'الرئيسية', url: '/', visible: true, inHeader: true, inFooter: true, inSidebar: false, order: 1, createdAt: '2025-01-01', updatedAt: '2025-12-05' },
    { id: 2, title: 'المنتجات', url: '/products', visible: true, inHeader: true, inFooter: true, inSidebar: true, order: 2, createdAt: '2025-01-05', updatedAt: '2025-12-03' },
    { id: 3, title: 'الخدمات', url: '/services', visible: true, inHeader: true, inFooter: true, inSidebar: true, order: 3, createdAt: '2025-01-10', updatedAt: '2025-12-02' },
    { id: 4, title: 'من نحن', url: '/about', visible: true, inHeader: false, inFooter: true, inSidebar: false, order: 4, createdAt: '2025-01-15', updatedAt: '2025-12-01' },
    { id: 5, title: 'اتصل بنا', url: '/contact', visible: true, inHeader: false, inFooter: true, inSidebar: false, order: 5, createdAt: '2025-01-20', updatedAt: '2025-11-30' },
    { id: 6, title: 'سياسة الخصوصية', url: '/privacy', visible: true, inHeader: false, inFooter: true, inSidebar: false, order: 6, createdAt: '2025-02-01', updatedAt: '2025-11-28' }
  ];

  const filteredPages = pages.filter(page => {
    const matchesSearch = page.title.includes(searchTerm) || page.url.includes(searchTerm);
    const matchesStatus = selectedStatus === 'all' || (selectedStatus === 'visible' ? page.visible : !page.visible);
    return matchesSearch && matchesStatus;
  });

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
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
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

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الصفحة</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الرابط</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الحالة</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الموقع</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">آخر تحديث</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الإجراءات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredPages.map(page => (
                  <tr key={page.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{page.title}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-600">{page.url}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${page.visible ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                        {page.visible ? 'مرئية' : 'مخفية'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        {page.inHeader && <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">رأس</span>}
                        {page.inFooter && <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded">تذييل</span>}
                        {page.inSidebar && <span className="px-2 py-1 bg-indigo-100 text-indigo-800 text-xs rounded">شريط</span>}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {page.updatedAt}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-left">
                      <div className="flex items-center gap-2">
                        <button className="text-blue-600 hover:text-blue-900">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="text-gray-600 hover:text-gray-900">
                          {page.visible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                        </button>
                        <button className="text-red-600 hover:text-red-900">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
