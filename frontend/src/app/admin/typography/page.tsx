'use client';

import React, { useState } from 'react';
import { Type, Save } from 'lucide-react';
import Link from 'next/link';

export default function AdminTypography() {
  const [fonts, setFonts] = useState({
    headingFont: 'Cairo',
    bodyFont: 'Tajawal',
    fontSize: 16,
    lineHeight: 1.6,
    letterSpacing: 0
  });

  const fontOptions = ['Cairo', 'Tajawal', 'Almarai', 'Droid Arabic Kufi', 'Droid Arabic Naskh', 'Lato', 'Roboto'];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link href="/admin" className="p-2 hover:bg-gray-100 rounded-lg transition">
                <Type className="w-6 h-6 text-gray-600" />
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">الخطوط والطباعة</h1>
                <p className="text-sm text-gray-600">تخصيص الخطوط والطباعة</p>
              </div>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
              <Save className="w-4 h-4" />
              حفظ
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-200">
            <h2 className="text-lg font-bold text-gray-900 mb-6">الخطوط</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">خط العناوين</label>
                <select value={fonts.headingFont} onChange={(e) => setFonts({...fonts, headingFont: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  {fontOptions.map(font => (
                    <option key={font} value={font}>{font}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">خط النص</label>
                <select value={fonts.bodyFont} onChange={(e) => setFonts({...fonts, bodyFont: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  {fontOptions.map(font => (
                    <option key={font} value={font}>{font}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-200">
            <h2 className="text-lg font-bold text-gray-900 mb-6">حجم وتباعد النص</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">حجم الخط الأساسي (px)</label>
                <input type="number" value={fonts.fontSize} onChange={(e) => setFonts({...fonts, fontSize: parseInt(e.target.value)})} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">ارتفاع السطر</label>
                <input type="number" step="0.1" value={fonts.lineHeight} onChange={(e) => setFonts({...fonts, lineHeight: parseFloat(e.target.value)})} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">تباعد الأحرف</label>
                <input type="number" step="0.1" value={fonts.letterSpacing} onChange={(e) => setFonts({...fonts, letterSpacing: parseFloat(e.target.value)})} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-200">
            <h2 className="text-lg font-bold text-gray-900 mb-6">معاينة</h2>
            <div className="space-y-4" style={{fontFamily: fonts.bodyFont, fontSize: `${fonts.fontSize}px`, lineHeight: fonts.lineHeight, letterSpacing: `${fonts.letterSpacing}px`}}>
              <h1 style={{fontFamily: fonts.headingFont}} className="text-3xl font-bold">هذا عنوان رئيسي</h1>
              <p>هذا نص عادي لمعاينة الخط والحجم والتباعد. يمكنك تغيير الإعدادات أعلاه لرؤية التغييرات هنا.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
