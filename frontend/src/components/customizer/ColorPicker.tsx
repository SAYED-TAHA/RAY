'use client';

import { useState } from 'react';
import { Palette, Copy, Check } from 'lucide-react';

interface ColorPickerProps {
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    text: string;
  };
  onChange: (colors: any) => void;
  onPreview?: (colors: any) => void;
}

export default function ColorPicker({ colors, onChange, onPreview }: ColorPickerProps) {
  const [copied, setCopied] = useState<string | null>(null);
  const [expandedColor, setExpandedColor] = useState<string | null>(null);

  const colorLabels = {
    primary: 'اللون الأساسي',
    secondary: 'اللون الثانوي',
    accent: 'لون التركيز',
    background: 'لون الخلفية',
    text: 'لون النص'
  };

  const handleColorChange = (key: string, value: string) => {
    const newColors = { ...colors, [key]: value };
    onChange(newColors);
    onPreview?.(newColors);
  };

  const copyToClipboard = (color: string, key: string) => {
    navigator.clipboard.writeText(color);
    setCopied(key);
    setTimeout(() => setCopied(null), 2000);
  };

  const presetPalettes = [
    {
      name: 'أحمر ذهبي',
      colors: {
        primary: '#FF6B6B',
        secondary: '#FFD93D',
        accent: '#6BCB77',
        background: '#FFFFFF',
        text: '#2D3436'
      }
    },
    {
      name: 'أزرق بحري',
      colors: {
        primary: '#0066CC',
        secondary: '#00A8E8',
        accent: '#00D9FF',
        background: '#F0F8FF',
        text: '#001F3F'
      }
    },
    {
      name: 'أخضر طبيعي',
      colors: {
        primary: '#2ECC71',
        secondary: '#27AE60',
        accent: '#F39C12',
        background: '#ECFDF5',
        text: '#1B4332'
      }
    },
    {
      name: 'بنفسجي فاخر',
      colors: {
        primary: '#9B59B6',
        secondary: '#8E44AD',
        accent: '#F1C40F',
        background: '#F5F3FF',
        text: '#4A235A'
      }
    }
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <Palette className="w-6 h-6 text-blue-600" />
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          تخصيص الألوان
        </h2>
      </div>

      {/* القوالب المسبقة */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
          قوالب جاهزة
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {presetPalettes.map((palette) => (
            <button
              key={palette.name}
              onClick={() => {
                onChange(palette.colors);
                onPreview?.(palette.colors);
              }}
              className="p-4 rounded-lg border-2 border-gray-200 dark:border-gray-700 hover:border-blue-500 transition text-right"
            >
              <p className="font-semibold text-gray-900 dark:text-white mb-2">
                {palette.name}
              </p>
              <div className="flex gap-2">
                {Object.values(palette.colors).map((color, idx) => (
                  <div
                    key={idx}
                    className="w-6 h-6 rounded-full border border-gray-300"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* منتقي الألوان المخصص */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
          تخصيص يدوي
        </h3>
        {Object.entries(colors).map(([key, value]) => (
          <div key={key} className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              {colorLabels[key as keyof typeof colorLabels]}
            </label>
            <div className="flex gap-3 items-center">
              <div className="relative">
                <input
                  type="color"
                  value={value}
                  onChange={(e) => handleColorChange(key, e.target.value)}
                  className="w-16 h-16 rounded-lg cursor-pointer border-2 border-gray-300 dark:border-gray-600"
                />
              </div>
              <div className="flex-1">
                <input
                  type="text"
                  value={value}
                  onChange={(e) => handleColorChange(key, e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white font-mono text-sm"
                  placeholder="#000000"
                />
              </div>
              <button
                onClick={() => copyToClipboard(value, key)}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                title="نسخ اللون"
              >
                {copied === key ? (
                  <Check className="w-5 h-5 text-green-600" />
                ) : (
                  <Copy className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                )}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* معاينة الألوان */}
      <div className="space-y-3 pt-6 border-t border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
          معاينة
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {Object.entries(colors).map(([key, value]) => (
            <div key={key} className="space-y-2">
              <div
                className="w-full h-24 rounded-lg border-2 border-gray-200 dark:border-gray-700 shadow-md"
                style={{ backgroundColor: value }}
              />
              <p className="text-xs text-gray-600 dark:text-gray-400 text-center font-mono">
                {value}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* معاينة الأزرار */}
      <div className="space-y-3 pt-6 border-t border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
          معاينة الأزرار
        </h3>
        <div className="flex gap-3 flex-wrap">
          <button
            style={{
              backgroundColor: colors.primary,
              color: colors.text
            }}
            className="px-6 py-2 rounded-lg font-semibold transition hover:opacity-90"
          >
            زر أساسي
          </button>
          <button
            style={{
              backgroundColor: colors.secondary,
              color: colors.text
            }}
            className="px-6 py-2 rounded-lg font-semibold transition hover:opacity-90"
          >
            زر ثانوي
          </button>
          <button
            style={{
              backgroundColor: colors.accent,
              color: colors.text
            }}
            className="px-6 py-2 rounded-lg font-semibold transition hover:opacity-90"
          >
            زر تركيز
          </button>
        </div>
      </div>
    </div>
  );
}
