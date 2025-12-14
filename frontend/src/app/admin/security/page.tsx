'use client';

import React, { useState } from 'react';
import { 
  Shield, Lock, Key, Eye, EyeOff, CheckCircle, AlertCircle,
  User, Mail, Phone, MapPin, Clock, Ban, ShieldCheck,
  Activity, Users, FileText, Settings, RefreshCw
} from 'lucide-react';
import Link from 'next/link';

export default function AdminSecurity() {
  const [securitySettings] = useState({
    twoFactorAuth: true,
    sessionTimeout: 30,
    passwordPolicy: 'strong',
    loginAttempts: 5,
    ipWhitelist: false,
    auditLog: true
  });

  const [securityEvents] = useState([
    {
      id: '1',
      type: 'login',
      user: 'أحمد محمد',
      ip: '192.168.1.1',
      status: 'success',
      timestamp: '2024-12-05 10:30:00'
    },
    {
      id: '2',
      type: 'failed_login',
      user: 'مجهول',
      ip: '192.168.1.100',
      status: 'failed',
      timestamp: '2024-12-05 10:25:00'
    },
    {
      id: '3',
      type: 'password_change',
      user: 'سارة أحمد',
      ip: '192.168.1.2',
      status: 'success',
      timestamp: '2024-12-05 09:15:00'
    }
  ]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/admin" className="text-gray-600 hover:text-gray-900 transition">
                ← لوحة التحكم
              </Link>
              <h1 className="text-2xl font-bold text-gray-900">الأمان</h1>
            </div>
            <div className="flex items-center gap-4">
              <button className="bg-ray-blue text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition flex items-center gap-2">
                <RefreshCw className="w-4 h-4" />
                تحديث الأمان
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Security Settings */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 mb-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">إعدادات الأمان</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <Shield className="w-5 h-5 text-blue-600" />
                <div>
                  <h4 className="font-medium text-gray-900">المصادقة الثنائية</h4>
                  <p className="text-sm text-gray-600">تأكيد الهوية بخطوتين</p>
                </div>
              </div>
              <div className={`w-12 h-6 rounded-full transition-colors ${
                securitySettings.twoFactorAuth ? 'bg-green-500' : 'bg-gray-300'
              }`}>
                <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                  securitySettings.twoFactorAuth ? 'translate-x-6' : 'translate-x-0.5'
                }`}></div>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-blue-600" />
                <div>
                  <h4 className="font-medium text-gray-900">انتهاء الجلسة</h4>
                  <p className="text-sm text-gray-600">{securitySettings.sessionTimeout} دقيقة</p>
                </div>
              </div>
              <button className="text-ray-blue hover:text-blue-600 transition">
                <Settings className="w-5 h-5" />
              </button>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <Lock className="w-5 h-5 text-blue-600" />
                <div>
                  <h4 className="font-medium text-gray-900">سياسة كلمة المرور</h4>
                  <p className="text-sm text-gray-600">قوية</p>
                </div>
              </div>
              <button className="text-ray-blue hover:text-blue-600 transition">
                <Settings className="w-5 h-5" />
              </button>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <Activity className="w-5 h-5 text-blue-600" />
                <div>
                  <h4 className="font-medium text-gray-900">سجل المراجعة</h4>
                  <p className="text-sm text-gray-600">تسجيل جميع الأنشطة</p>
                </div>
              </div>
              <div className={`w-12 h-6 rounded-full transition-colors ${
                securitySettings.auditLog ? 'bg-green-500' : 'bg-gray-300'
              }`}>
                <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                  securitySettings.auditLog ? 'translate-x-6' : 'translate-x-0.5'
                }`}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Security Events */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <h3 className="text-lg font-bold text-gray-900 mb-4">أحداث الأمان</h3>
          <div className="space-y-2">
            {securityEvents.map((event) => (
              <div key={event.id} className="flex items-center gap-3 p-3 rounded-lg bg-gray-50">
                <div className={`w-2 h-2 rounded-full ${
                  event.status === 'success' ? 'bg-green-500' : 'bg-red-500'
                }`}></div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-gray-900">
                    {event.type === 'login' && 'تسجيل دخول'}
                    {event.type === 'failed_login' && 'محاولة دخول فاشلة'}
                    {event.type === 'password_change' && 'تغيير كلمة المرور'}
                  </div>
                  <div className="text-xs text-gray-500">
                    {event.user} • {event.ip} • {event.timestamp}
                  </div>
                </div>
                <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                  event.status === 'success' 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-red-100 text-red-700'
                }`}>
                  {event.status === 'success' ? 'نجح' : 'فشل'}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
