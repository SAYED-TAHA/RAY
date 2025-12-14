"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { useMerchant } from '@/context/MerchantContext';
import { 
  LogOut, Store, Mail, Phone, MapPin, Building2, 
  ArrowRight, BarChart3, Settings
} from 'lucide-react';

export default function MerchantDashboardPage() {
  const router = useRouter();
  const { merchant, logout } = useMerchant();

  if (!merchant) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center">
        <div className="text-center text-white">
          <h1 className="text-3xl font-bold mb-4">يرجى تسجيل الدخول أولاً</h1>
          <button
            onClick={() => router.push('/merchant/login')}
            className="bg-white text-blue-600 px-6 py-3 rounded-lg font-bold hover:bg-gray-100 transition"
          >
            الذهاب لصفحة الدخول
          </button>
        </div>
      </div>
    );
  }

  const handleLogout = () => {
    logout();
    router.push('/merchant/login');
  };

  const handleGoToDashboard = () => {
    router.push(`/dashboard/${merchant.businessType}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center gap-3">
              <Store className="w-8 h-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">RAY Systems</h1>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-red-600 hover:text-red-700 font-bold transition"
            >
              <LogOut className="w-5 h-5" />
              تسجيل الخروج
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Welcome Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            مرحباً بك، {merchant.ownerName}! 👋
          </h2>
          <p className="text-gray-600 text-lg">
            نشاطك التجاري: <span className="font-bold text-blue-600">{merchant.businessName}</span>
          </p>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* Business Type Card */}
          <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-gray-600 text-sm font-bold mb-1">نوع النشاط</p>
                <p className="text-2xl font-bold text-gray-900">{merchant.businessType}</p>
              </div>
              <Building2 className="w-8 h-8 text-blue-600" />
            </div>
          </div>

          {/* Email Card */}
          <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-gray-600 text-sm font-bold mb-1">البريد الإلكتروني</p>
                <p className="text-lg font-bold text-gray-900 truncate">{merchant.email}</p>
              </div>
              <Mail className="w-8 h-8 text-green-600" />
            </div>
          </div>

          {/* Phone Card */}
          <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-gray-600 text-sm font-bold mb-1">رقم الهاتف</p>
                <p className="text-lg font-bold text-gray-900">{merchant.phone || 'لم يتم إدخاله'}</p>
              </div>
              <Phone className="w-8 h-8 text-orange-600" />
            </div>
          </div>

          {/* City Card */}
          <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-gray-600 text-sm font-bold mb-1">المدينة</p>
                <p className="text-lg font-bold text-gray-900">{merchant.city}</p>
              </div>
              <MapPin className="w-8 h-8 text-red-600" />
            </div>
          </div>

          {/* Owner Name Card */}
          <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-gray-600 text-sm font-bold mb-1">اسم المالك</p>
                <p className="text-lg font-bold text-gray-900">{merchant.ownerName}</p>
              </div>
              <Building2 className="w-8 h-8 text-purple-600" />
            </div>
          </div>

          {/* Merchant ID Card */}
          <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-gray-600 text-sm font-bold mb-1">معرف التاجر</p>
                <p className="text-lg font-bold text-gray-900 truncate">{merchant.id}</p>
              </div>
              <Store className="w-8 h-8 text-blue-600" />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Go to Dashboard Button */}
          <button
            onClick={handleGoToDashboard}
            className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 rounded-2xl font-bold text-lg hover:shadow-lg transition flex items-center justify-center gap-3"
          >
            <BarChart3 className="w-6 h-6" />
            الذهاب إلى لوحة التحكم
            <ArrowRight className="w-6 h-6" />
          </button>

          {/* Settings Button */}
          <button
            onClick={() => router.push('/merchant/settings')}
            className="bg-gradient-to-r from-gray-600 to-gray-700 text-white py-4 rounded-2xl font-bold text-lg hover:shadow-lg transition flex items-center justify-center gap-3"
          >
            <Settings className="w-6 h-6" />
            الإعدادات
            <ArrowRight className="w-6 h-6" />
          </button>
        </div>

        {/* Info Box */}
        <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-6 mt-8">
          <h3 className="text-lg font-bold text-blue-900 mb-2">💡 نصيحة</h3>
          <p className="text-blue-800">
            يمكنك الآن الوصول إلى لوحة التحكم الخاصة بـ <span className="font-bold">{merchant.businessType}</span> والبدء في إدارة نشاطك التجاري!
          </p>
        </div>
      </main>
    </div>
  );
}
