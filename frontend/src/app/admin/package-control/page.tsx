'use client';

import React, { useState } from 'react';
import { Settings2, Star, Eye, EyeOff, Edit, Trash2 } from 'lucide-react';
import Link from 'next/link';

export default function AdminPackageControl() {
  const [packages, setPackages] = useState([
    { id: 1, name: 'الباقة الأساسية', visible: true, featured: false, order: 1 },
    { id: 2, name: 'الباقة المميزة', visible: true, featured: true, order: 2 },
    { id: 3, name: 'الباقة الذهبية', visible: true, featured: false, order: 3 },
    { id: 4, name: 'الباقة المؤسسية', visible: false, featured: false, order: 4 }
  ]);

  const toggleVisibility = (id: number) => {
    setPackages(packages.map(pkg => pkg.id === id ? {...pkg, visible: !pkg.visible} : pkg));
  };

  const toggleFeatured = (id: number) => {
    setPackages(packages.map(pkg => pkg.id === id ? {...pkg, featured: !pkg.featured} : pkg));
  };

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
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">الترتيب</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">اسم الباقة</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">الرؤية</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">مميزة</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">الإجراءات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {packages.map(pkg => (
                  <tr key={pkg.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input type="number" value={pkg.order} className="w-16 px-2 py-1 border border-gray-300 rounded" />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{pkg.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button onClick={() => toggleVisibility(pkg.id)} className={`p-2 rounded-lg transition ${pkg.visible ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'}`}>
                        {pkg.visible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                      </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button onClick={() => toggleFeatured(pkg.id)} className={`p-2 rounded-lg transition ${pkg.featured ? 'bg-yellow-100 text-yellow-600' : 'bg-gray-100 text-gray-600'}`}>
                        <Star className="w-4 h-4" />
                      </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex gap-2">
                        <button className="text-blue-600 hover:text-blue-900"><Edit className="w-4 h-4" /></button>
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
