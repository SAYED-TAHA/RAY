'use client';

import React, { useState } from 'react';
import { ArrowLeft, Shield, Eye, EyeOff, Download, Trash2 } from 'lucide-react';
import Link from 'next/link';

export default function PrivacyPage() {
  const [showProfileInfo, setShowProfileInfo] = useState(false);
  const [showOrderHistory, setShowOrderHistory] = useState(false);
  const [showLocationData, setShowLocationData] = useState(false);
  const [marketingConsent, setMarketingConsent] = useState(false);

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
            
            <h1 className="text-xl font-bold text-gray-900">الخصوصية</h1>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Privacy Overview */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="w-6 h-6 text-gray-600" />
            <h2 className="text-lg font-bold text-gray-900">إعدادات الخصوصية</h2>
          </div>
          
          <p className="text-gray-600 mb-6">
            تحكم في كيفية استخدام بياناتك ومشاركتها. نحن نحترم خصوصيتك ونلتزم بحماية معلوماتك الشخصية.
          </p>

          <div className="space-y-4">
            {/* Profile Visibility */}
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className="font-medium text-gray-900">معلومات الملف الشخصي</h3>
                  <p className="text-sm text-gray-600">التحكم في رؤية معلوماتك الشخصية</p>
                </div>
                <button
                  onClick={() => setShowProfileInfo(!showProfileInfo)}
                  className="p-2 text-gray-600 hover:text-blue-600 transition"
                >
                  {showProfileInfo ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              
              {showProfileInfo && (
                <div className="space-y-3 pt-3 border-t border-gray-100">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">الاسم والبريد الإلكتروني</span>
                    <select className="text-sm border border-gray-300 rounded px-2 py-1">
                      <option>خاص</option>
                      <option>عام</option>
                    </select>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">رقم الهاتف</span>
                    <select className="text-sm border border-gray-300 rounded px-2 py-1">
                      <option>خاص</option>
                      <option>الأصدقاء</option>
                      <option>عام</option>
                    </select>
                  </div>
                </div>
              )}
            </div>

            {/* Order History */}
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className="font-medium text-gray-900">سجل الطلبات</h3>
                  <p className="text-sm text-gray-600">التحكم في سجل طلباتك وحجوزاتك</p>
                </div>
                <button
                  onClick={() => setShowOrderHistory(!showOrderHistory)}
                  className="p-2 text-gray-600 hover:text-blue-600 transition"
                >
                  {showOrderHistory ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              
              {showOrderHistory && (
                <div className="space-y-3 pt-3 border-t border-gray-100">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">إظهار سجل الطلبات</span>
                    <button className="w-12 h-6 bg-ray-blue rounded-full">
                      <div className="w-5 h-5 bg-white rounded-full translate-x-6" />
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">إظهار سجل الحجوزات</span>
                    <button className="w-12 h-6 bg-ray-blue rounded-full">
                      <div className="w-5 h-5 bg-white rounded-full translate-x-6" />
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Location Data */}
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className="font-medium text-gray-900">بيانات الموقع</h3>
                  <p className="text-sm text-gray-600">استخدام بيانات موقعك الحالي</p>
                </div>
                <button
                  onClick={() => setShowLocationData(!showLocationData)}
                  className="p-2 text-gray-600 hover:text-blue-600 transition"
                >
                  {showLocationData ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              
              {showLocationData && (
                <div className="space-y-3 pt-3 border-t border-gray-100">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">خدمات الموقع القريب</span>
                    <button className="w-12 h-6 bg-gray-300 rounded-full">
                      <div className="w-5 h-5 bg-white rounded-full translate-x-0.5" />
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">توصيات مخصصة</span>
                    <button className="w-12 h-6 bg-ray-blue rounded-full">
                      <div className="w-5 h-5 bg-white rounded-full translate-x-6" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Data Management */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">إدارة البيانات</h2>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div>
                <h3 className="font-medium text-gray-900">تحميل بياناتي</h3>
                <p className="text-sm text-gray-600">احصل على نسخة من جميع بياناتك</p>
              </div>
              <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
                <Download className="w-4 h-4" />
                تحميل
              </button>
            </div>

            <div className="flex items-center justify-between p-4 border border-red-200 rounded-lg bg-red-50">
              <div>
                <h3 className="font-medium text-red-900">حذف الحساب</h3>
                <p className="text-sm text-red-700">حذف جميع بياناتك نهائياً</p>
              </div>
              <button className="flex items-center gap-2 px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-100 transition">
                <Trash2 className="w-4 h-4" />
                حذف الحساب
              </button>
            </div>
          </div>
        </div>

        {/* Marketing Consent */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">التسويق والإعلانات</h2>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-gray-900">الموافقة على التسويق</h3>
                <p className="text-sm text-gray-600">استلام عروض وعروض ترويجية مخصصة</p>
              </div>
              <button
                onClick={() => setMarketingConsent(!marketingConsent)}
                className={`w-12 h-6 rounded-full transition-colors ${
                  marketingConsent ? 'bg-ray-blue' : 'bg-gray-300'
                }`}
              >
                <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                  marketingConsent ? 'translate-x-6' : 'translate-x-0.5'
                }`} />
              </button>
            </div>

            {marketingConsent && (
              <div className="space-y-3 pt-3 border-t border-gray-100">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">البريد الإلكتروني</span>
                  <button className="w-12 h-6 bg-ray-blue rounded-full">
                    <div className="w-5 h-5 bg-white rounded-full translate-x-6" />
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">الرسائل النصية</span>
                  <button className="w-12 h-6 bg-gray-300 rounded-full">
                    <div className="w-5 h-5 bg-white rounded-full translate-x-0.5" />
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">الإشعارات الفورية</span>
                  <button className="w-12 h-6 bg-ray-blue rounded-full">
                    <div className="w-5 h-5 bg-white rounded-full translate-x-6" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Privacy Policy */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <Shield className="w-5 h-5 text-blue-600 mt-0.5" />
            <div>
              <h4 className="font-bold text-blue-900 mb-1">سياسة الخصوصية</h4>
              <p className="text-blue-700 text-sm mb-3">
                نحن نلتزم بحماية خصوصيتك وبياناتك الشخصية. يمكنك قراءة سياسة الخصوصية الكاملة لمعرفة المزيد.
              </p>
              <Link
                href="/privacy"
                className="text-blue-600 hover:text-blue-700 text-sm font-medium"
              >
                قراءة سياسة الخصوصية الكاملة
              </Link>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end mt-6">
          <button className="px-6 py-3 bg-ray-blue text-white rounded-lg hover:bg-blue-600 transition">
            حفظ إعدادات الخصوصية
          </button>
        </div>
      </div>
    </div>
  );
}
