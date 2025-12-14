'use client';

import React, { useState } from 'react';
import { LinkIcon, Plus, Edit, Trash2, Copy, ExternalLink } from 'lucide-react';
import Link from 'next/link';

export default function AdminLinks() {
  const links = [
    { id: 1, title: 'الرئيسية', url: '/', category: 'main', status: 'active', clicks: 1234 },
    { id: 2, title: 'المنتجات', url: '/products', category: 'main', status: 'active', clicks: 567 },
    { id: 3, title: 'الخدمات', url: '/services', category: 'main', status: 'active', clicks: 345 },
    { id: 4, title: 'من نحن', url: '/about', category: 'info', status: 'active', clicks: 234 },
    { id: 5, title: 'اتصل بنا', url: '/contact', category: 'info', status: 'active', clicks: 456 },
    { id: 6, title: 'سياسة الخصوصية', url: '/privacy', category: 'legal', status: 'active', clicks: 123 },
    { id: 7, title: 'الشروط والأحكام', url: '/terms', category: 'legal', status: 'active', clicks: 89 },
    { id: 8, title: 'المدونة', url: '/blog', category: 'content', status: 'active', clicks: 678 },
    { id: 9, title: 'الأسئلة الشائعة', url: '/faq', category: 'support', status: 'active', clicks: 234 },
    { id: 10, title: 'الدعم', url: '/support', category: 'support', status: 'active', clicks: 345 },
    { id: 11, title: 'تحميل التطبيق', url: '/download', category: 'app', status: 'active', clicks: 567 },
    { id: 12, title: 'الشراكات', url: '/partnerships', category: 'business', status: 'inactive', clicks: 0 }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link href="/admin" className="p-2 hover:bg-gray-100 rounded-lg transition">
                <LinkIcon className="w-6 h-6 text-gray-600" />
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">الروابط</h1>
                <p className="text-sm text-gray-600">إدارة روابط الموقع</p>
              </div>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
              <Plus className="w-4 h-4" />
              رابط جديد
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">العنوان</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">الرابط</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">الفئة</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">الحالة</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">النقرات</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">الإجراءات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {links.map(link => (
                  <tr key={link.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{link.title}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-600 text-sm">{link.url}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded-full">
                        {link.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        link.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {link.status === 'active' ? 'نشط' : 'غير نشط'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-900">{link.clicks}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex gap-2">
                        <button className="text-blue-600 hover:text-blue-900"><Copy className="w-4 h-4" /></button>
                        <button className="text-green-600 hover:text-green-900"><ExternalLink className="w-4 h-4" /></button>
                        <button className="text-gray-600 hover:text-gray-900"><Edit className="w-4 h-4" /></button>
                        <button className="text-red-600 hover:text-red-900"><Trash2 className="w-4 h-4" /></button>
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
