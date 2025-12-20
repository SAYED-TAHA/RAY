'use client';

import React, { useState, useEffect } from 'react';
import { ArrowLeft, MapPin, Plus, Edit, Trash2, Home, Building, Briefcase, Loader } from 'lucide-react';
import Link from 'next/link';
import { API_URL } from '@/utils/api';

interface Address {
  id: string;
  type: 'home' | 'work' | 'other';
  title: string;
  street: string;
  building: string;
  floor: string;
  apartment: string;
  city: string;
  governorate: string;
  postalCode: string;
  isDefault: boolean;
}

const getIcon = (type: string) => {
  switch (type) {
    case 'home': return <Home className="w-5 h-5" />;
    case 'work': return <Briefcase className="w-5 h-5" />;
    default: return <Building className="w-5 h-5" />;
  }
};

const getTypeLabel = (type: string) => {
  switch (type) {
    case 'home': return 'المنزل';
    case 'work': return 'العمل';
    default: return 'أخرى';
  }
};

export default function AddressesPage() {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`${API_URL}/api/profile/addresses`);
        if (response.ok) {
          const data = await response.json();
          setAddresses(data);
        }
      } catch (error) {
        console.error('خطأ في جلب العناوين:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAddresses();
  }, []);

  const handleDelete = (id: string) => {
    setAddresses(prev => prev.filter(addr => addr.id !== id));
  };

  const handleSetDefault = (id: string) => {
    setAddresses(prev => prev.map(addr => ({
      ...addr,
      isDefault: addr.id === id
    })));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/profile" className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition">
              <ArrowLeft className="w-5 h-5" />
              العودة للملف الشخصي
            </Link>
            
            <h1 className="text-xl font-bold text-gray-900">العناوين</h1>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Add Address Button */}
        <div className="mb-6">
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="w-full md:w-auto px-6 py-3 bg-ray-blue text-white rounded-lg hover:bg-blue-600 transition flex items-center justify-center gap-2"
          >
            <Plus className="w-5 h-5" />
            إضافة عنوان جديد
          </button>
        </div>

        {/* Add Address Form */}
        {showAddForm && (
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 mb-6">
            <h3 className="font-bold text-gray-900 mb-4">إضافة عنوان جديد</h3>
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    نوع العنوان
                  </label>
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ray-blue">
                    <option value="home">المنزل</option>
                    <option value="work">العمل</option>
                    <option value="other">أخرى</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    العنوان (مثال: المنزل، العمل)
                  </label>
                  <input
                    type="text"
                    placeholder="مثال: المنزل"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ray-blue"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    الشارع
                  </label>
                  <input
                    type="text"
                    placeholder="اسم الشارع"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ray-blue"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    رقم المبنى
                  </label>
                  <input
                    type="text"
                    placeholder="رقم المبنى"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ray-blue"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    الدور
                  </label>
                  <input
                    type="text"
                    placeholder="رقم الدور"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ray-blue"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    رقم الشقة
                  </label>
                  <input
                    type="text"
                    placeholder="رقم الشقة"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ray-blue"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    الرمز البريدي
                  </label>
                  <input
                    type="text"
                    placeholder="الرمز البريدي"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ray-blue"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    المدينة
                  </label>
                  <input
                    type="text"
                    placeholder="المدينة"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ray-blue"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    المحافظة
                  </label>
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ray-blue">
                    <option value="cairo">القاهرة</option>
                    <option value="giza">الجيزة</option>
                    <option value="alexandria">الإسكندرية</option>
                    <option value="other">أخرى</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-ray-blue text-white rounded-lg hover:bg-blue-600 transition"
                >
                  حفظ العنوان
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Addresses List */}
        {addresses.length === 0 ? (
          <div className="text-center py-16">
            <MapPin className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">لا توجد عناوين</h3>
            <p className="text-gray-600 mb-6">
              أضف عنوانك الأول لتسهيل عملية التوصيل
            </p>
            <button
              onClick={() => setShowAddForm(true)}
              className="bg-ray-blue text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition"
            >
              إضافة عنوان جديد
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {addresses.map(address => (
              <div key={address.id} className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    {/* Icon */}
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
                      {getIcon(address.type)}
                    </div>

                    {/* Address Details */}
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-bold text-gray-900">{address.title}</h3>
                        <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                          {getTypeLabel(address.type)}
                        </span>
                        {address.isDefault && (
                          <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-medium">
                            افتراضي
                          </span>
                        )}
                      </div>
                      
                      <div className="text-gray-600 space-y-1">
                        <p>{address.street}, مبنى {address.building}</p>
                        <p>الدور {address.floor}, شقة {address.apartment}</p>
                        <p>{address.city}, {address.governorate}</p>
                        <p>الرمز البريدي: {address.postalCode}</p>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <button className="p-2 text-gray-600 hover:text-blue-600 transition">
                      <Edit className="w-4 h-4" />
                    </button>
                    {!address.isDefault && (
                      <button
                        onClick={() => handleSetDefault(address.id)}
                        className="p-2 text-gray-600 hover:text-green-600 transition"
                      >
                        <Home className="w-4 h-4" />
                      </button>
                    )}
                    {addresses.length > 1 && (
                      <button
                        onClick={() => handleDelete(address.id)}
                        className="p-2 text-gray-600 hover:text-red-600 transition"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
