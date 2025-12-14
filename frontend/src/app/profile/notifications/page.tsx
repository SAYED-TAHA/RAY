'use client';

import React, { useState } from 'react';
import { ArrowLeft, Bell, Mail, Smartphone, Check, X } from 'lucide-react';
import Link from 'next/link';

interface NotificationSettings {
  email: {
    orders: boolean;
    bookings: boolean;
    jobApplications: boolean;
    promotions: boolean;
    newsletters: boolean;
  };
  push: {
    orders: boolean;
    bookings: boolean;
    jobApplications: boolean;
    promotions: boolean;
  };
  sms: {
    orders: boolean;
    bookings: boolean;
    jobApplications: boolean;
  };
}

export default function NotificationsPage() {
  const [settings, setSettings] = useState<NotificationSettings>({
    email: {
      orders: true,
      bookings: true,
      jobApplications: true,
      promotions: false,
      newsletters: false
    },
    push: {
      orders: true,
      bookings: true,
      jobApplications: true,
      promotions: true
    },
    sms: {
      orders: true,
      bookings: false,
      jobApplications: false
    }
  });

  const handleToggle = (category: keyof NotificationSettings, type: string) => {
    setSettings(prev => {
      const categorySettings = prev[category];
      return {
        ...prev,
        [category]: {
          ...categorySettings,
          [type]: !categorySettings[type as keyof typeof categorySettings]
        }
      };
    });
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
            
            <h1 className="text-xl font-bold text-gray-900">الإشعارات</h1>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Email Notifications */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 mb-6">
          <div className="flex items-center gap-3 mb-6">
            <Mail className="w-6 h-6 text-gray-600" />
            <h2 className="text-lg font-bold text-gray-900">الإشعارات البريدية</h2>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-gray-900">الطلبات</h3>
                <p className="text-sm text-gray-600">إشعارات عن حالة الطلبات والتوصيل</p>
              </div>
              <button
                onClick={() => handleToggle('email', 'orders')}
                className={`w-12 h-6 rounded-full transition-colors ${
                  settings.email.orders ? 'bg-ray-blue' : 'bg-gray-300'
                }`}
              >
                <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                  settings.email.orders ? 'translate-x-6' : 'translate-x-0.5'
                }`} />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-gray-900">الحجوزات</h3>
                <p className="text-sm text-gray-600">تأكيدات وتذكيرات الحجوزات</p>
              </div>
              <button
                onClick={() => handleToggle('email', 'bookings')}
                className={`w-12 h-6 rounded-full transition-colors ${
                  settings.email.bookings ? 'bg-ray-blue' : 'bg-gray-300'
                }`}
              >
                <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                  settings.email.bookings ? 'translate-x-6' : 'translate-x-0.5'
                }`} />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-gray-900">طلبات التوظيف</h3>
                <p className="text-sm text-gray-600">تحديثات عن حالة طلبات التوظيف</p>
              </div>
              <button
                onClick={() => handleToggle('email', 'jobApplications')}
                className={`w-12 h-6 rounded-full transition-colors ${
                  settings.email.jobApplications ? 'bg-ray-blue' : 'bg-gray-300'
                }`}
              >
                <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                  settings.email.jobApplications ? 'translate-x-6' : 'translate-x-0.5'
                }`} />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-gray-900">العروض والتخفيضات</h3>
                <p className="text-sm text-gray-600">عروض خاصة وخصومات حصرية</p>
              </div>
              <button
                onClick={() => handleToggle('email', 'promotions')}
                className={`w-12 h-6 rounded-full transition-colors ${
                  settings.email.promotions ? 'bg-ray-blue' : 'bg-gray-300'
                }`}
              >
                <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                  settings.email.promotions ? 'translate-x-6' : 'translate-x-0.5'
                }`} />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-gray-900">النشرة البريدية</h3>
                <p className="text-sm text-gray-600">أخبار وتحديثات عن راي</p>
              </div>
              <button
                onClick={() => handleToggle('email', 'newsletters')}
                className={`w-12 h-6 rounded-full transition-colors ${
                  settings.email.newsletters ? 'bg-ray-blue' : 'bg-gray-300'
                }`}
              >
                <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                  settings.email.newsletters ? 'translate-x-6' : 'translate-x-0.5'
                }`} />
              </button>
            </div>
          </div>
        </div>

        {/* Push Notifications */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 mb-6">
          <div className="flex items-center gap-3 mb-6">
            <Smartphone className="w-6 h-6 text-gray-600" />
            <h2 className="text-lg font-bold text-gray-900">الإشعارات الفورية</h2>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-gray-900">الطلبات</h3>
                <p className="text-sm text-gray-600">إشعارات فورية عن حالة الطلبات</p>
              </div>
              <button
                onClick={() => handleToggle('push', 'orders')}
                className={`w-12 h-6 rounded-full transition-colors ${
                  settings.push.orders ? 'bg-ray-blue' : 'bg-gray-300'
                }`}
              >
                <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                  settings.push.orders ? 'translate-x-6' : 'translate-x-0.5'
                }`} />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-gray-900">الحجوزات</h3>
                <p className="text-sm text-gray-600">تذكيرات الحجوزات الفورية</p>
              </div>
              <button
                onClick={() => handleToggle('push', 'bookings')}
                className={`w-12 h-6 rounded-full transition-colors ${
                  settings.push.bookings ? 'bg-ray-blue' : 'bg-gray-300'
                }`}
              >
                <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                  settings.push.bookings ? 'translate-x-6' : 'translate-x-0.5'
                }`} />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-gray-900">طلبات التوظيف</h3>
                <p className="text-sm text-gray-600">إشعارات فورية عن طلبات التوظيف</p>
              </div>
              <button
                onClick={() => handleToggle('push', 'jobApplications')}
                className={`w-12 h-6 rounded-full transition-colors ${
                  settings.push.jobApplications ? 'bg-ray-blue' : 'bg-gray-300'
                }`}
              >
                <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                  settings.push.jobApplications ? 'translate-x-6' : 'translate-x-0.5'
                }`} />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-gray-900">العروض والتخفيضات</h3>
                <p className="text-sm text-gray-600">عروض خاصة فورية</p>
              </div>
              <button
                onClick={() => handleToggle('push', 'promotions')}
                className={`w-12 h-6 rounded-full transition-colors ${
                  settings.push.promotions ? 'bg-ray-blue' : 'bg-gray-300'
                }`}
              >
                <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                  settings.push.promotions ? 'translate-x-6' : 'translate-x-0.5'
                }`} />
              </button>
            </div>
          </div>
        </div>

        {/* SMS Notifications */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 mb-6">
          <div className="flex items-center gap-3 mb-6">
            <Smartphone className="w-6 h-6 text-gray-600" />
            <h2 className="text-lg font-bold text-gray-900">الرسائل النصية</h2>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-gray-900">الطلبات</h3>
                <p className="text-sm text-gray-600">رسائل نصية عن حالة الطلبات</p>
              </div>
              <button
                onClick={() => handleToggle('sms', 'orders')}
                className={`w-12 h-6 rounded-full transition-colors ${
                  settings.sms.orders ? 'bg-ray-blue' : 'bg-gray-300'
                }`}
              >
                <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                  settings.sms.orders ? 'translate-x-6' : 'translate-x-0.5'
                }`} />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-gray-900">الحجوزات</h3>
                <p className="text-sm text-gray-600">تأكيدات الحجوزات بالرسائل النصية</p>
              </div>
              <button
                onClick={() => handleToggle('sms', 'bookings')}
                className={`w-12 h-6 rounded-full transition-colors ${
                  settings.sms.bookings ? 'bg-ray-blue' : 'bg-gray-300'
                }`}
              >
                <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                  settings.sms.bookings ? 'translate-x-6' : 'translate-x-0.5'
                }`} />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-gray-900">طلبات التوظيف</h3>
                <p className="text-sm text-gray-600">تحديثات هامة عن طلبات التوظيف</p>
              </div>
              <button
                onClick={() => handleToggle('sms', 'jobApplications')}
                className={`w-12 h-6 rounded-full transition-colors ${
                  settings.sms.jobApplications ? 'bg-ray-blue' : 'bg-gray-300'
                }`}
              >
                <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                  settings.sms.jobApplications ? 'translate-x-6' : 'translate-x-0.5'
                }`} />
              </button>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button className="px-6 py-3 bg-ray-blue text-white rounded-lg hover:bg-blue-600 transition">
            حفظ الإعدادات
          </button>
        </div>
      </div>
    </div>
  );
}
