'use client';

import React, { useState } from 'react';
import { ArrowLeft, Globe, Check } from 'lucide-react';
import Link from 'next/link';

interface Language {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
}

const languages: Language[] = [
  { code: 'ar', name: 'Arabic', nativeName: 'العربية', flag: '🇸🇦' },
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸' },
  { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷' },
  { code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸' },
  { code: 'de', name: 'German', nativeName: 'Deutsch', flag: '🇩🇪' },
  { code: 'it', name: 'Italian', nativeName: 'Italiano', flag: '🇮🇹' },
  { code: 'zh', name: 'Chinese', nativeName: '中文', flag: '🇨🇳' },
  { code: 'ja', name: 'Japanese', nativeName: '日本語', flag: '🇯🇵' },
  { code: 'ru', name: 'Russian', nativeName: 'Русский', flag: '🇷🇺' },
  { code: 'pt', name: 'Portuguese', nativeName: 'Português', flag: '🇵🇹' }
];

export default function LanguagePage() {
  const [selectedLanguage, setSelectedLanguage] = useState('ar');

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
            
            <h1 className="text-xl font-bold text-gray-900">اللغة</h1>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Current Language */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <Globe className="w-6 h-6 text-gray-600" />
            <h2 className="text-lg font-bold text-gray-900">اللغة الحالية</h2>
          </div>
          
          <div className="flex items-center justify-between p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-center gap-3">
              <span className="text-2xl">🇸🇦</span>
              <div>
                <h3 className="font-bold text-gray-900">العربية</h3>
                <p className="text-sm text-gray-600">Arabic</p>
              </div>
            </div>
            <Check className="w-5 h-5 text-blue-600" />
          </div>
        </div>

        {/* Available Languages */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-6">اللغات المتاحة</h2>
          
          <div className="space-y-2">
            {languages.map((language) => (
              <button
                key={language.code}
                onClick={() => setSelectedLanguage(language.code)}
                className={`w-full text-right p-4 rounded-lg border transition-all flex items-center justify-between ${
                  selectedLanguage === language.code
                    ? 'bg-blue-50 border-blue-200'
                    : 'bg-white border-gray-200 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{language.flag}</span>
                  <div>
                    <h3 className="font-medium text-gray-900">{language.nativeName}</h3>
                    <p className="text-sm text-gray-600">{language.name}</p>
                  </div>
                </div>
                
                {selectedLanguage === language.code && (
                  <Check className="w-5 h-5 text-blue-600" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Language Settings */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-6">إعدادات اللغة</h2>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-gray-900">الترجمة التلقائية</h3>
                <p className="text-sm text-gray-600">ترجمة المحتوى تلقائياً للغتك</p>
              </div>
              <button className="w-12 h-6 bg-ray-blue rounded-full">
                <div className="w-5 h-5 bg-white rounded-full translate-x-6" />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-gray-900">تاريخ وتوقيت محلي</h3>
                <p className="text-sm text-gray-600">استخدام تنسيق التاريخ والوقت المحلي</p>
              </div>
              <button className="w-12 h-6 bg-ray-blue rounded-full">
                <div className="w-5 h-5 bg-white rounded-full translate-x-6" />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-gray-900">العملة</h3>
                <p className="text-sm text-gray-600">عرض الأسعار بالعملة المحلية</p>
              </div>
              <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ray-blue">
                <option value="EGP">جنيه مصري (EGP)</option>
                <option value="USD">دولار أمريكي (USD)</option>
                <option value="EUR">يورو (EUR)</option>
                <option value="SAR">ريال سعودي (SAR)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button className="px-6 py-3 bg-ray-blue text-white rounded-lg hover:bg-blue-600 transition">
            حفظ إعدادات اللغة
          </button>
        </div>

        {/* Note */}
        <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <Globe className="w-5 h-5 text-yellow-600 mt-0.5" />
            <div>
              <h4 className="font-bold text-yellow-900 mb-1">ملاحظة</h4>
              <p className="text-yellow-700 text-sm">
                سيتم تطبيق تغييرات اللغة عند تسجيل الدخول مرة أخرى. قد تحتاج إلى إعادة تحميل الصفحة لرؤية جميع التغييرات.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
