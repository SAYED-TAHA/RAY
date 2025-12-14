'use client';

import React, { useState } from 'react';
import { Menu, Plus, Edit, Trash2, Eye } from 'lucide-react';
import Link from 'next/link';

export default function AdminMenus() {
  const menus = [
    { id: 1, name: 'القائمة الرئيسية', location: 'header', items: 8, status: 'active' },
    { id: 2, name: 'قائمة التذييل', location: 'footer', items: 12, status: 'active' },
    { id: 3, name: 'القائمة الجانبية', location: 'sidebar', items: 15, status: 'active' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link href="/admin" className="p-2 hover:bg-gray-100 rounded-lg transition">
                <Menu className="w-6 h-6 text-gray-600" />
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">القوائم</h1>
                <p className="text-sm text-gray-600">إدارة قوائم الموقع</p>
              </div>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
              <Plus className="w-4 h-4" />
              قائمة جديدة
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-4">
          {menus.map(menu => (
            <div key={menu.id} className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">{menu.name}</h3>
                  <p className="text-sm text-gray-600">{menu.items} عنصر - {menu.location}</p>
                </div>
                <div className="flex gap-2">
                  <button className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                    <Eye className="w-4 h-4" />
                    معاينة
                  </button>
                  <button className="flex items-center gap-2 px-3 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition">
                    <Edit className="w-4 h-4" />
                    تعديل
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
