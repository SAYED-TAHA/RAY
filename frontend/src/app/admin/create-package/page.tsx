'use client';

import React, { useState } from 'react';
import { Gift, Save, X } from 'lucide-react';
import Link from 'next/link';

export default function AdminCreatePackage() {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    currency: 'ج.م',
    features: [''],
    duration: 'monthly',
    status: 'active'
  });

  const handleAddFeature = () => {
    setFormData({...formData, features: [...formData.features, '']});
  };

  const handleRemoveFeature = (index: number) => {
    setFormData({...formData, features: formData.features.filter((_, i) => i !== index)});
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link href="/admin/packages" className="p-2 hover:bg-gray-100 rounded-lg transition">
                <Gift className="w-6 h-6 text-gray-600" />
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">إنشاء باقة جديدة</h1>
                <p className="text-sm text-gray-600">أضف باقة اشتراك جديدة</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-200">
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">اسم الباقة</label>
              <input type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} placeholder="مثال: الباقة المميزة" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">الوصف</label>
              <textarea value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} placeholder="وصف الباقة والمميزات" rows={4} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">السعر</label>
                <input type="number" value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})} placeholder="0" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">المدة</label>
                <select value={formData.duration} onChange={(e) => setFormData({...formData, duration: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option value="monthly">شهري</option>
                  <option value="quarterly">ربع سنوي</option>
                  <option value="yearly">سنوي</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">المميزات</label>
              <div className="space-y-3">
                {formData.features.map((feature, index) => (
                  <div key={index} className="flex gap-2">
                    <input type="text" value={feature} onChange={(e) => {
                      const newFeatures = [...formData.features];
                      newFeatures[index] = e.target.value;
                      setFormData({...formData, features: newFeatures});
                    }} placeholder="أضف مميزة" className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                    {formData.features.length > 1 && (
                      <button type="button" onClick={() => handleRemoveFeature(index)} className="px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition">
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
              <button type="button" onClick={handleAddFeature} className="mt-3 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition">
                + أضف مميزة
              </button>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">الحالة</label>
              <select value={formData.status} onChange={(e) => setFormData({...formData, status: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option value="active">نشط</option>
                <option value="inactive">غير نشط</option>
              </select>
            </div>

            <div className="flex gap-3 pt-6">
              <button disabled type="submit" className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg opacity-60 cursor-not-allowed">
                <Save className="w-4 h-4" />
                إنشاء الباقة
              </button>
              <Link href="/admin/packages" className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition">
                إلغاء
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
