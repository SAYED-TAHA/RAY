'use client';

import { useState } from 'react';
import { Copy, Check, RotateCcw, Zap } from 'lucide-react';

interface ButtonCustomizerProps {
  buttons: {
    primaryText: string;
    primaryColor: string;
    secondaryText: string;
    secondaryColor: string;
    showWhatsApp: boolean;
    showPhone: boolean;
    showEmail: boolean;
  };
  onChange: (buttons: any) => void;
  onPreview?: (buttons: any) => void;
}

export default function ButtonCustomizer({
  buttons,
  onChange,
  onPreview
}: ButtonCustomizerProps) {
  const [copied, setCopied] = useState<string | null>(null);

  const handleChange = (key: string, value: any) => {
    const newButtons = { ...buttons, [key]: value };
    onChange(newButtons);
    onPreview?.(newButtons);
  };

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(null), 2000);
  };

  const presetButtons = [
    {
      name: 'احجز الآن',
      primaryText: 'احجز الآن',
      secondaryText: 'اعرف أكثر'
    },
    {
      name: 'اطلب الآن',
      primaryText: 'اطلب الآن',
      secondaryText: 'شاهد القائمة'
    },
    {
      name: 'تسوق الآن',
      primaryText: 'تسوق الآن',
      secondaryText: 'استعرض المنتجات'
    },
    {
      name: 'احصل على الخدمة',
      primaryText: 'احصل على الخدمة',
      secondaryText: 'اتصل بنا'
    }
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <Zap className="w-6 h-6 text-blue-600" />
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          تخصيص الأزرار
        </h2>
      </div>

      {/* القوالب المسبقة */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
          نصوص جاهزة
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {presetButtons.map((preset) => (
            <button
              key={preset.name}
              onClick={() => {
                handleChange('primaryText', preset.primaryText);
                handleChange('secondaryText', preset.secondaryText);
              }}
              className="p-4 rounded-lg border-2 border-gray-200 dark:border-gray-700 hover:border-blue-500 transition text-right"
            >
              <p className="font-semibold text-gray-900 dark:text-white mb-2">
                {preset.name}
              </p>
              <div className="space-y-1 text-sm">
                <p className="text-gray-600 dark:text-gray-400">
                  أساسي: {preset.primaryText}
                </p>
                <p className="text-gray-600 dark:text-gray-400">
                  ثانوي: {preset.secondaryText}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* الأزرار الأساسية */}
      <div className="space-y-4 pt-6 border-t border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
          الأزرار الرئيسية
        </h3>

        {/* الزر الأساسي */}
        <div className="space-y-3">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            نص الزر الأساسي
          </label>
          <div className="flex gap-3">
            <input
              type="text"
              value={buttons.primaryText}
              onChange={(e) => handleChange('primaryText', e.target.value)}
              className="flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              placeholder="مثال: احجز الآن"
            />
            <button
              onClick={() => copyToClipboard(buttons.primaryText, 'primaryText')}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition"
            >
              {copied === 'primaryText' ? (
                <Check className="w-5 h-5 text-green-600" />
              ) : (
                <Copy className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              )}
            </button>
          </div>

          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            لون الزر الأساسي
          </label>
          <div className="flex gap-3 items-center">
            <input
              type="color"
              value={buttons.primaryColor}
              onChange={(e) => handleChange('primaryColor', e.target.value)}
              className="w-16 h-10 rounded-lg cursor-pointer border-2 border-gray-300 dark:border-gray-600"
            />
            <input
              type="text"
              value={buttons.primaryColor}
              onChange={(e) => handleChange('primaryColor', e.target.value)}
              className="flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white font-mono text-sm"
            />
          </div>
        </div>

        {/* الزر الثانوي */}
        <div className="space-y-3 pt-4 border-t border-gray-200 dark:border-gray-700">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            نص الزر الثانوي
          </label>
          <div className="flex gap-3">
            <input
              type="text"
              value={buttons.secondaryText}
              onChange={(e) => handleChange('secondaryText', e.target.value)}
              className="flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              placeholder="مثال: اعرف أكثر"
            />
            <button
              onClick={() => copyToClipboard(buttons.secondaryText, 'secondaryText')}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition"
            >
              {copied === 'secondaryText' ? (
                <Check className="w-5 h-5 text-green-600" />
              ) : (
                <Copy className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              )}
            </button>
          </div>

          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            لون الزر الثانوي
          </label>
          <div className="flex gap-3 items-center">
            <input
              type="color"
              value={buttons.secondaryColor}
              onChange={(e) => handleChange('secondaryColor', e.target.value)}
              className="w-16 h-10 rounded-lg cursor-pointer border-2 border-gray-300 dark:border-gray-600"
            />
            <input
              type="text"
              value={buttons.secondaryColor}
              onChange={(e) => handleChange('secondaryColor', e.target.value)}
              className="flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white font-mono text-sm"
            />
          </div>
        </div>
      </div>

      {/* أزرار التواصل */}
      <div className="space-y-4 pt-6 border-t border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
          أزرار التواصل
        </h3>

        <div className="space-y-3">
          {[
            { key: 'showWhatsApp', label: 'واتس آب', icon: '💬' },
            { key: 'showPhone', label: 'الهاتف', icon: '☎️' },
            { key: 'showEmail', label: 'البريد الإلكتروني', icon: '📧' }
          ].map((item) => (
            <button
              key={item.key}
              onClick={() => handleChange(item.key, !buttons[item.key as keyof typeof buttons])}
              className={`w-full p-4 rounded-lg border-2 transition flex items-center justify-between ${
                buttons[item.key as keyof typeof buttons]
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30'
                  : 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/30 opacity-60'
              }`}
            >
              <div className="flex items-center gap-3 text-right flex-1">
                <span className="text-2xl">{item.icon}</span>
                <p className="font-semibold text-gray-900 dark:text-white">
                  {item.label}
                </p>
              </div>
              <div className={`w-6 h-6 rounded-full border-2 ${
                buttons[item.key as keyof typeof buttons]
                  ? 'bg-blue-600 border-blue-600'
                  : 'border-gray-300'
              }`} />
            </button>
          ))}
        </div>
      </div>

      {/* معاينة الأزرار */}
      <div className="space-y-4 pt-6 border-t border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
          معاينة
        </h3>
        <div className="space-y-3">
          <button
            style={{ backgroundColor: buttons.primaryColor }}
            className="w-full px-6 py-3 rounded-lg font-semibold text-white transition hover:opacity-90"
          >
            {buttons.primaryText}
          </button>
          <button
            style={{ backgroundColor: buttons.secondaryColor }}
            className="w-full px-6 py-3 rounded-lg font-semibold text-white transition hover:opacity-90"
          >
            {buttons.secondaryText}
          </button>
          <div className="flex gap-3 pt-3">
            {buttons.showWhatsApp && (
              <button className="flex-1 px-4 py-2 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition">
                💬 واتس
              </button>
            )}
            {buttons.showPhone && (
              <button className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition">
                ☎️ اتصل
              </button>
            )}
            {buttons.showEmail && (
              <button className="flex-1 px-4 py-2 bg-orange-500 text-white rounded-lg font-semibold hover:bg-orange-600 transition">
                📧 بريد
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
