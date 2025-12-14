'use client';

import React, { useState } from 'react';
import { ArrowLeft, Shield, Eye, EyeOff, Lock, Key, Smartphone, AlertTriangle } from 'lucide-react';
import Link from 'next/link';

export default function SecurityPage() {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);

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
            
            <h1 className="text-xl font-bold text-gray-900">الأمان</h1>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Change Password */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 mb-6">
          <div className="flex items-center gap-3 mb-6">
            <Lock className="w-6 h-6 text-gray-600" />
            <h2 className="text-lg font-bold text-gray-900">تغيير كلمة المرور</h2>
          </div>
          
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                كلمة المرور الحالية
              </label>
              <div className="relative">
                <input
                  type={showCurrentPassword ? "text" : "password"}
                  className="w-full pr-10 pl-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ray-blue"
                  placeholder="أدخل كلمة المرور الحالية"
                />
                <button
                  type="button"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800"
                >
                  {showCurrentPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                كلمة المرور الجديدة
              </label>
              <div className="relative">
                <input
                  type={showNewPassword ? "text" : "password"}
                  className="w-full pr-10 pl-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ray-blue"
                  placeholder="أدخل كلمة المرور الجديدة"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800"
                >
                  {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              <div className="mt-2 text-sm text-gray-600">
                يجب أن تحتوي على 8 أحرف على الأقل، حرف كبير، حرف صغير، ورقم
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                تأكيد كلمة المرور الجديدة
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  className="w-full pr-10 pl-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ray-blue"
                  placeholder="أعد إدخال كلمة المرور الجديدة"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full px-6 py-3 bg-ray-blue text-white rounded-lg hover:bg-blue-600 transition"
            >
              تحديث كلمة المرور
            </button>
          </form>
        </div>

        {/* Two-Factor Authentication */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 mb-6">
          <div className="flex items-center gap-3 mb-6">
            <Smartphone className="w-6 h-6 text-gray-600" />
            <h2 className="text-lg font-bold text-gray-900">المصادقة الثنائية</h2>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div>
                <h3 className="font-medium text-gray-900">تطبيق المصادقة</h3>
                <p className="text-sm text-gray-600">استخدم تطبيق مثل Google Authenticator لتأمين حسابك</p>
              </div>
              <button
                onClick={() => setTwoFactorEnabled(!twoFactorEnabled)}
                className={`w-12 h-6 rounded-full transition-colors ${
                  twoFactorEnabled ? 'bg-ray-blue' : 'bg-gray-300'
                }`}
              >
                <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                  twoFactorEnabled ? 'translate-x-6' : 'translate-x-0.5'
                }`} />
              </button>
            </div>

            {twoFactorEnabled && (
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-blue-900 mb-2">إعداد المصادقة الثنائية</h4>
                    <ol className="text-blue-700 text-sm space-y-1 list-decimal list-inside">
                      <li>حمّل تطبيق Google Authenticator</li>
                      <li>امسح رمز QR التالي</li>
                      <li>أدخل الرمز المكون من 6 أرقام</li>
                    </ol>
                    <div className="mt-4 p-4 bg-white rounded-lg text-center">
                      <div className="w-32 h-32 bg-gray-200 mx-auto mb-2 flex items-center justify-center">
                        <Smartphone className="w-8 h-8 text-gray-400" />
                      </div>
                      <p className="text-sm text-gray-600">رمز QR للمصادقة الثنائية</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Active Sessions */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 mb-6">
          <div className="flex items-center gap-3 mb-6">
            <Key className="w-6 h-6 text-gray-600" />
            <h2 className="text-lg font-bold text-gray-900">الجلسات النشطة</h2>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <Smartphone className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Chrome - Windows</h3>
                  <p className="text-sm text-gray-600">القاهرة، مصر • الجلسة الحالية</p>
                </div>
              </div>
              <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-medium">
                نشط
              </span>
            </div>

            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                  <Smartphone className="w-5 h-5 text-gray-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Safari - iPhone</h3>
                  <p className="text-sm text-gray-600">القاهرة، مصر • منذ 2 ساعة</p>
                </div>
              </div>
              <button className="text-red-600 hover:text-red-700 text-sm font-medium">
                تسجيل الخروج
              </button>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-gray-200">
            <button className="text-red-600 hover:text-red-700 font-medium">
              تسجيل الخروج من جميع الأجهزة
            </button>
          </div>
        </div>

        {/* Security Tips */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <Shield className="w-5 h-5 text-yellow-600 mt-0.5" />
            <div>
              <h4 className="font-bold text-yellow-900 mb-1">نصائح أمنية</h4>
              <ul className="text-yellow-700 text-sm space-y-1">
                <li>• استخدم كلمة مرور قوية وفريدة</li>
                <li>• لا تشارك معلومات حسابك مع أي شخص</li>
                <li>• قم بتسجيل الخروج من الأجهزة العامة</li>
                <li>• فعل المصادقة الثنائية لحماية إضافية</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
