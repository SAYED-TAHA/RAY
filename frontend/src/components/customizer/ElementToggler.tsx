'use client';

import { useState } from 'react';
import { Eye, EyeOff, Settings2 } from 'lucide-react';

interface ElementTogglerProps {
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
  onChange: (elements: any) => void;
  merchantType?: 'restaurant' | 'store' | 'clinic' | 'salon' | 'nursery';
}

export default function ElementToggler({
  elements,
  onChange,
  merchantType = 'restaurant'
}: ElementTogglerProps) {
  const elementLabels = {
    showHero: {
      label: 'الصورة الرئيسية',
      description: 'صورة غلاف النشاط',
      icon: '🖼️'
    },
    showGallery: {
      label: 'المعرض',
      description: 'عرض صور النشاط',
      icon: '🎨'
    },
    showReviews: {
      label: 'التقييمات والتعليقات',
      description: 'آراء العملاء',
      icon: '⭐'
    },
    showMenu: {
      label: 'القائمة',
      description: 'قائمة الطعام والأسعار',
      icon: '🍽️'
    },
    showProducts: {
      label: 'المنتجات',
      description: 'عرض المنتجات والأسعار',
      icon: '📦'
    },
    showBookings: {
      label: 'الحجوزات',
      description: 'نموذج الحجز والتواصل',
      icon: '📅'
    },
    showContact: {
      label: 'معلومات التواصل',
      description: 'الهاتف والبريد والعنوان',
      icon: '📞'
    },
    showMap: {
      label: 'الخريطة',
      description: 'موقع النشاط على الخريطة',
      icon: '🗺️'
    }
  };

  const handleToggle = (key: string) => {
    const newElements = { ...elements, [key]: !elements[key as keyof typeof elements] };
    onChange(newElements);
  };

  // تحديد العناصر المتاحة حسب نوع النشاط
  const getAvailableElements = () => {
    const baseElements = ['showHero', 'showGallery', 'showReviews', 'showBookings', 'showContact', 'showMap'];
    
    if (merchantType === 'restaurant') {
      return [...baseElements, 'showMenu'];
    } else if (merchantType === 'store') {
      return [...baseElements, 'showProducts'];
    }
    return baseElements;
  };

  const availableElements = getAvailableElements();
  const visibleCount = Object.values(elements).filter(Boolean).length;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <Settings2 className="w-6 h-6 text-blue-600" />
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          إدارة العناصر
        </h2>
      </div>

      {/* إحصائيات سريعة */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-blue-50 dark:bg-blue-900/30 rounded-lg p-4 text-center">
          <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            {visibleCount}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            عناصر مفعلة
          </p>
        </div>
        <div className="bg-gray-50 dark:bg-gray-700/30 rounded-lg p-4 text-center">
          <p className="text-2xl font-bold text-gray-600 dark:text-gray-400">
            {availableElements.length}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            إجمالي العناصر
          </p>
        </div>
        <div className="bg-green-50 dark:bg-green-900/30 rounded-lg p-4 text-center">
          <p className="text-2xl font-bold text-green-600 dark:text-green-400">
            {Math.round((visibleCount / availableElements.length) * 100)}%
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            نسبة التفعيل
          </p>
        </div>
      </div>

      {/* قائمة العناصر */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
          العناصر المتاحة
        </h3>
        <div className="space-y-2">
          {availableElements.map((key) => {
            const isEnabled = elements[key as keyof typeof elements];
            const label = elementLabels[key as keyof typeof elementLabels];

            return (
              <button
                key={key}
                onClick={() => handleToggle(key)}
                className={`w-full p-4 rounded-lg border-2 transition flex items-center justify-between ${
                  isEnabled
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30'
                    : 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/30 opacity-60'
                }`}
              >
                <div className="flex items-center gap-4 text-right flex-1">
                  <span className="text-2xl">{label.icon}</span>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {label.label}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {label.description}
                    </p>
                  </div>
                </div>
                <div className={`p-2 rounded-lg ${isEnabled ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-600'}`}>
                  {isEnabled ? (
                    <Eye className="w-5 h-5" />
                  ) : (
                    <EyeOff className="w-5 h-5" />
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* نصائح */}
      <div className="bg-yellow-50 dark:bg-yellow-900/30 rounded-lg p-4 border border-yellow-200 dark:border-yellow-800">
        <h4 className="font-semibold text-yellow-900 dark:text-yellow-200 mb-2">
          💡 نصيحة
        </h4>
        <p className="text-sm text-yellow-800 dark:text-yellow-300">
          يمكنك إظهار أو إخفاء أي عنصر حسب احتياجاتك. كلما زادت العناصر المفعلة، كلما كانت صفحتك أكثر اكتمالاً.
        </p>
      </div>

      {/* زر الإعادة */}
      <div className="flex gap-3 pt-6 border-t border-gray-200 dark:border-gray-700">
        <button
          onClick={() => {
            const defaultElements = {
              showHero: true,
              showGallery: true,
              showReviews: true,
              showMenu: true,
              showProducts: true,
              showBookings: true,
              showContact: true,
              showMap: true
            };
            onChange(defaultElements);
          }}
          className="flex-1 px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition"
        >
          إعادة تعيين
        </button>
        <button
          onClick={() => {
            const allDisabled = Object.keys(elements).reduce((acc, key) => {
              acc[key] = false;
              return acc;
            }, {} as any);
            onChange(allDisabled);
          }}
          className="flex-1 px-4 py-2 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg font-semibold hover:bg-red-200 dark:hover:bg-red-900/50 transition"
        >
          إخفاء الكل
        </button>
        <button
          onClick={() => {
            const allEnabled = Object.keys(elements).reduce((acc, key) => {
              acc[key] = true;
              return acc;
            }, {} as any);
            onChange(allEnabled);
          }}
          className="flex-1 px-4 py-2 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-lg font-semibold hover:bg-green-200 dark:hover:bg-green-900/50 transition"
        >
          إظهار الكل
        </button>
      </div>
    </div>
  );
}
