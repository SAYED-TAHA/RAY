'use client';

import { useState } from 'react';
import { Monitor, Smartphone, Eye, EyeOff } from 'lucide-react';

interface PreviewPanelProps {
  customization: {
    colors: {
      primary: string;
      secondary: string;
      accent: string;
      background: string;
      text: string;
    };
    elements: {
      showHero: boolean;
      showGallery: boolean;
      showReviews: boolean;
      showMenu?: boolean;
      showProducts?: boolean;
      showBookings: boolean;
      showContact: boolean;
      showMap: boolean;
    };
    buttons: {
      primaryText: string;
      primaryColor: string;
      secondaryText: string;
      secondaryColor: string;
      showWhatsApp: boolean;
      showPhone: boolean;
      showEmail: boolean;
    };
  };
  merchantName?: string;
  merchantType?: string;
}

export default function PreviewPanel({
  customization,
  merchantName = 'اسم النشاط',
  merchantType = 'restaurant'
}: PreviewPanelProps) {
  const [viewMode, setViewMode] = useState<'desktop' | 'mobile'>('desktop');
  const [showPreview, setShowPreview] = useState(true);

  const { colors, elements, buttons } = customization;

  const previewContent = (
    <div
      style={{
        backgroundColor: colors.background,
        color: colors.text
      }}
      className="min-h-screen"
    >
      {/* Hero Section */}
      {elements.showHero && (
        <div
          style={{
            backgroundImage: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            height: '300px'
          }}
          className="relative overflow-hidden"
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white">
              <h1 className="text-4xl font-bold mb-2">{merchantName}</h1>
              <p className="text-lg opacity-90">مرحباً بك في متجرنا</p>
            </div>
          </div>
        </div>
      )}

      {/* Content Section */}
      <div className="max-w-4xl mx-auto p-6 space-y-8">
        {/* Gallery */}
        {elements.showGallery && (
          <section>
            <h2 className="text-2xl font-bold mb-4">المعرض</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  style={{ backgroundColor: colors.accent }}
                  className="h-40 rounded-lg flex items-center justify-center opacity-70"
                >
                  <span className="text-white">صورة {i}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Menu/Products */}
        {(elements.showMenu || elements.showProducts) && (
          <section>
            <h2 className="text-2xl font-bold mb-4">
              {merchantType === 'restaurant' ? 'القائمة' : 'المنتجات'}
            </h2>
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="p-4 rounded-lg border-2"
                  style={{ borderColor: colors.primary }}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-bold">
                        {merchantType === 'restaurant' ? `الطبق ${i}` : `المنتج ${i}`}
                      </h3>
                      <p className="text-sm opacity-70">وصف المنتج</p>
                    </div>
                    <span style={{ color: colors.primary }} className="font-bold">
                      100 ج.م
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Reviews */}
        {elements.showReviews && (
          <section>
            <h2 className="text-2xl font-bold mb-4">التقييمات</h2>
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="p-4 rounded-lg"
                  style={{ backgroundColor: colors.accent, opacity: 0.2 }}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-bold">العميل {i}</h4>
                    <span>⭐⭐⭐⭐⭐</span>
                  </div>
                  <p className="text-sm">تقييم رائع جداً للخدمة والجودة</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Booking */}
        {elements.showBookings && (
          <section>
            <h2 className="text-2xl font-bold mb-4">احجز الآن</h2>
            <div className="p-6 rounded-lg border-2" style={{ borderColor: colors.primary }}>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="اسمك"
                  className="w-full px-4 py-2 rounded-lg border"
                  style={{ borderColor: colors.primary }}
                />
                <input
                  type="email"
                  placeholder="بريدك الإلكتروني"
                  className="w-full px-4 py-2 rounded-lg border"
                  style={{ borderColor: colors.primary }}
                />
                <button
                  style={{ backgroundColor: colors.primary }}
                  className="w-full px-6 py-3 rounded-lg text-white font-bold hover:opacity-90 transition"
                >
                  {buttons.primaryText}
                </button>
              </div>
            </div>
          </section>
        )}

        {/* Contact */}
        {elements.showContact && (
          <section>
            <h2 className="text-2xl font-bold mb-4">تواصل معنا</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {buttons.showPhone && (
                <div className="p-4 rounded-lg text-center" style={{ backgroundColor: colors.accent, opacity: 0.2 }}>
                  <p className="text-2xl mb-2">☎️</p>
                  <p className="font-semibold">الهاتف</p>
                  <p className="text-sm">+20 123 456 7890</p>
                </div>
              )}
              {buttons.showEmail && (
                <div className="p-4 rounded-lg text-center" style={{ backgroundColor: colors.accent, opacity: 0.2 }}>
                  <p className="text-2xl mb-2">📧</p>
                  <p className="font-semibold">البريد</p>
                  <p className="text-sm">info@example.com</p>
                </div>
              )}
              {buttons.showWhatsApp && (
                <div className="p-4 rounded-lg text-center" style={{ backgroundColor: colors.accent, opacity: 0.2 }}>
                  <p className="text-2xl mb-2">💬</p>
                  <p className="font-semibold">واتس آب</p>
                  <p className="text-sm">+20 123 456 7890</p>
                </div>
              )}
            </div>
          </section>
        )}

        {/* Map */}
        {elements.showMap && (
          <section>
            <h2 className="text-2xl font-bold mb-4">موقعنا</h2>
            <div
              style={{ backgroundColor: colors.accent }}
              className="w-full h-64 rounded-lg flex items-center justify-center opacity-50"
            >
              <span className="text-white">الخريطة</span>
            </div>
          </section>
        )}

        {/* Action Buttons */}
        <section className="flex gap-3 flex-wrap">
          <button
            style={{ backgroundColor: colors.primary }}
            className="px-6 py-3 rounded-lg text-white font-bold hover:opacity-90 transition"
          >
            {buttons.primaryText}
          </button>
          <button
            style={{ backgroundColor: colors.secondary }}
            className="px-6 py-3 rounded-lg text-white font-bold hover:opacity-90 transition"
          >
            {buttons.secondaryText}
          </button>
        </section>
      </div>
    </div>
  );

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Eye className="w-6 h-6" />
          <h2 className="text-2xl font-bold">معاينة الصفحة</h2>
        </div>
        <button
          onClick={() => setShowPreview(!showPreview)}
          className="p-2 rounded-lg hover:bg-blue-800 transition"
          title={showPreview ? 'إخفاء المعاينة' : 'إظهار المعاينة'}
        >
          {showPreview ? (
            <Eye className="w-5 h-5" />
          ) : (
            <EyeOff className="w-5 h-5" />
          )}
        </button>
      </div>

      {showPreview && (
        <>
          {/* View Mode Selector */}
          <div className="flex gap-3 p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700">
            <button
              onClick={() => setViewMode('desktop')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${
                viewMode === 'desktop'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600'
              }`}
            >
              <Monitor className="w-4 h-4" />
              سطح المكتب
            </button>
            <button
              onClick={() => setViewMode('mobile')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${
                viewMode === 'mobile'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600'
              }`}
            >
              <Smartphone className="w-4 h-4" />
              الهاتف
            </button>
          </div>

          {/* Preview Container */}
          <div className="overflow-auto bg-gray-100 dark:bg-gray-900">
            <div
              className={`mx-auto transition-all ${
                viewMode === 'mobile'
                  ? 'w-96 border-x-8 border-gray-800 rounded-2xl overflow-hidden'
                  : 'w-full'
              }`}
            >
              {previewContent}
            </div>
          </div>
        </>
      )}

      {/* Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700">
        <div className="text-center">
          <p className="text-2xl font-bold text-blue-600">
            {Object.values(elements).filter(Boolean).length}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">عناصر مفعلة</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-green-600">
            {Object.values(buttons).filter(v => typeof v === 'boolean' && v).length}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">قنوات تواصل</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-purple-600">5</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">ألوان مخصصة</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-orange-600">100%</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">جاهزية الصفحة</p>
        </div>
      </div>
    </div>
  );
}
