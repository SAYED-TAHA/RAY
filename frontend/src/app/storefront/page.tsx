'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft, Save, RotateCcw, Copy, Check, AlertCircle,
  Palette, Layout, Video, Eye, Monitor, Tablet, Smartphone,
  ChevronDown, ChevronUp, ExternalLink, Loader
} from 'lucide-react';
import { saveStorefrontConfig, resetStorefrontConfig } from '@/services/storefrontService';
import ImageUploader from '@/components/storefront/ImageUploader';

interface StorefrontConfig {
  // الألوان الأساسية
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  backgroundColor: string;
  textColor: string;

  // ألوان Header و Footer
  headerColor: string;
  headerTextColor: string;
  footerColor: string;
  footerTextColor: string;

  // البنر
  bannerType: 'image' | 'video';
  bannerImage: string;
  bannerVideo: string;
  bannerHeight: number;

  // الأزرار - Header
  showHeaderPhone: boolean;
  showHeaderWhatsapp: boolean;
  showHeaderEmail: boolean;
  showHeaderSearch: boolean;
  showHeaderCart: boolean;

  // الأزرار - Footer
  showFooterPhone: boolean;
  showFooterWhatsapp: boolean;
  showFooterEmail: boolean;
  showFooterAddress: boolean;
  showFooterSocial: boolean;

  // الأزرار - Contact
  showContactPhone: boolean;
  showContactWhatsapp: boolean;
  showContactEmail: boolean;

  // العناصر الأخرى
  showHero: boolean;
  showGallery: boolean;
  showMenu: boolean;
  showProducts: boolean;
  showReviews: boolean;
  showBookings: boolean;
  showMap: boolean;

  // الصور
  galleryImages?: string[];
}

const defaultConfig: StorefrontConfig = {
  primaryColor: '#FF6B6B',
  secondaryColor: '#4ECDC4',
  accentColor: '#FFE66D',
  backgroundColor: '#FFFFFF',
  textColor: '#333333',
  headerColor: '#FFFFFF',
  headerTextColor: '#333333',
  footerColor: '#1F2937',
  footerTextColor: '#FFFFFF',
  bannerType: 'image',
  bannerImage: 'https://via.placeholder.com/1200x400',
  bannerVideo: '',
  bannerHeight: 400,
  showHeaderPhone: true,
  showHeaderWhatsapp: true,
  showHeaderEmail: false,
  showHeaderSearch: true,
  showHeaderCart: true,
  showFooterPhone: true,
  showFooterWhatsapp: true,
  showFooterEmail: true,
  showFooterAddress: true,
  showFooterSocial: true,
  showContactPhone: true,
  showContactWhatsapp: true,
  showContactEmail: true,
  showHero: true,
  showGallery: true,
  showMenu: true,
  showProducts: true,
  showReviews: true,
  showBookings: true,
  showMap: true,
  galleryImages: [],
};

export default function StorefrontPage() {
  const router = useRouter();
  const [config, setConfig] = useState<StorefrontConfig>(defaultConfig);
  const [activeTab, setActiveTab] = useState<'colors' | 'buttons' | 'banner' | 'elements' | 'media'>('colors');
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [merchantId] = useState('default');
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    headerButtons: true,
    footerButtons: true,
    contactButtons: true,
  });

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleSave = async () => {
    setLoading(true);
    setError(null);
    try {
      await saveStorefrontConfig(merchantId, config);
      localStorage.setItem(`storefront-${merchantId}`, JSON.stringify(config));
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err) {
      setError('فشل حفظ الإعدادات');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = async () => {
    if (confirm('هل أنت متأكد من رغبتك في إعادة تعيين جميع الإعدادات؟')) {
      setLoading(true);
      setError(null);
      try {
        const resetConfig = await resetStorefrontConfig(merchantId);
        setConfig(resetConfig as StorefrontConfig);
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3000);
      } catch (err) {
        setError('فشل إعادة تعيين الإعدادات');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  // Preview Component
  const PreviewFrame = () => {
    const deviceClasses = {
      desktop: 'w-full h-[800px]',
      tablet: 'w-[768px] h-[1024px] mx-auto',
      mobile: 'w-[375px] h-[667px] mx-auto',
    };

    return (
      <div className={`${deviceClasses[previewDevice]} bg-white rounded-2xl shadow-2xl border-8 border-gray-900 overflow-hidden flex flex-col`}>
        {/* Header */}
        <div style={{ backgroundColor: config.headerColor, color: config.headerTextColor }} className="p-4 border-b flex items-center justify-between">
          <h3 className="font-bold">متجري</h3>
          <div className="flex gap-2">
            {config.showHeaderPhone && <span className="text-xs">📞</span>}
            {config.showHeaderWhatsapp && <span className="text-xs">💬</span>}
            {config.showHeaderSearch && <span className="text-xs">🔍</span>}
            {config.showHeaderCart && <span className="text-xs">🛒</span>}
          </div>
        </div>

        {/* Banner */}
        {config.showHero && (
          <div style={{ height: `${config.bannerHeight}px`, backgroundColor: config.primaryColor }} className="w-full flex items-center justify-center text-white font-bold">
            {config.bannerType === 'image' ? '🖼️ صورة البنر' : '🎬 فيديو البنر'}
          </div>
        )}

        {/* Content */}
        <div className="flex-1 p-4 space-y-4 overflow-y-auto" style={{ backgroundColor: config.backgroundColor, color: config.textColor }}>
          {config.showMenu && <div className="p-3 bg-gray-100 rounded">📋 القائمة</div>}
          {config.showProducts && <div className="p-3 bg-gray-100 rounded">🛍️ المنتجات</div>}
          {config.showGallery && <div className="p-3 bg-gray-100 rounded">📸 المعرض</div>}
          {config.showReviews && <div className="p-3 bg-gray-100 rounded">⭐ التقييمات</div>}
          {config.showBookings && <div className="p-3 bg-gray-100 rounded">📅 الحجوزات</div>}
          {config.showMap && <div className="p-3 bg-gray-100 rounded">🗺️ الخريطة</div>}
        </div>

        {/* Footer */}
        <div style={{ backgroundColor: config.footerColor, color: config.footerTextColor }} className="p-4 border-t flex items-center justify-between">
          <span className="text-xs">© 2025</span>
          <div className="flex gap-2">
            {config.showFooterPhone && <span className="text-xs">📞</span>}
            {config.showFooterWhatsapp && <span className="text-xs">💬</span>}
            {config.showFooterEmail && <span className="text-xs">✉️</span>}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/dashboard" className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition">
              <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">🎨 المتجر الإلكتروني</h1>
              <p className="text-xs text-gray-500 dark:text-gray-400">تخصيص صفحة عرض نشاطك</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => {
                handleSave();
                setTimeout(() => router.push('/storefront/default'), 500);
              }}
              disabled={loading}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition disabled:opacity-50"
            >
              {loading ? <Loader className="w-4 h-4 animate-spin" /> : <ExternalLink className="w-4 h-4" />}
              معاينة
            </button>
            <button
              onClick={handleReset}
              disabled={loading}
              className="flex items-center gap-2 px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition disabled:opacity-50"
            >
              {loading ? <Loader className="w-4 h-4 animate-spin" /> : <RotateCcw className="w-4 h-4" />}
              إعادة تعيين
            </button>
            <button
              onClick={handleSave}
              disabled={loading}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50"
            >
              {loading ? <Loader className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              {saveSuccess ? 'تم الحفظ!' : 'حفظ'}
            </button>
          </div>
          {error && (
            <div className="flex items-center gap-2 px-4 py-2 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-lg">
              <AlertCircle className="w-4 h-4" />
              {error}
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Controls */}
          <div className="lg:col-span-1 space-y-4 max-h-[calc(100vh-200px)] overflow-y-auto">
            {/* Tabs */}
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-2 flex flex-col gap-1">
              {[
                { id: 'colors', label: '🎨 الألوان', icon: Palette },
                { id: 'buttons', label: '⚡ الأزرار', icon: Layout },
                { id: 'banner', label: '🎬 البنر', icon: Video },
                { id: 'elements', label: '👁️ العناصر', icon: Eye },
                { id: 'media', label: '📸 الوسائط', icon: Eye },
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`w-full px-3 py-2 rounded-lg font-semibold text-sm transition text-left ${
                    activeTab === tab.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Colors Tab */}
            {activeTab === 'colors' && (
              <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 space-y-4">
                <h3 className="font-bold text-gray-900 dark:text-white">🎨 الألوان</h3>
                
                {[
                  { key: 'primaryColor', label: 'اللون الأساسي' },
                  { key: 'secondaryColor', label: 'اللون الثانوي' },
                  { key: 'accentColor', label: 'لون التأكيد' },
                  { key: 'backgroundColor', label: 'لون الخلفية' },
                  { key: 'textColor', label: 'لون النص' },
                  { key: 'headerColor', label: 'لون Header' },
                  { key: 'headerTextColor', label: 'لون نص Header' },
                  { key: 'footerColor', label: 'لون Footer' },
                  { key: 'footerTextColor', label: 'لون نص Footer' },
                ].map(color => (
                  <div key={color.key} className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">{color.label}</label>
                    <div className="flex gap-2">
                      <input
                        type="color"
                        value={(config as any)[color.key]}
                        onChange={e => setConfig({ ...config, [color.key]: e.target.value })}
                        className="w-12 h-10 rounded-lg cursor-pointer"
                      />
                      <input
                        type="text"
                        value={(config as any)[color.key]}
                        onChange={e => setConfig({ ...config, [color.key]: e.target.value })}
                        className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                      />
                      <button
                        onClick={() => copyToClipboard((config as any)[color.key])}
                        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition"
                      >
                        <Copy className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Buttons Tab */}
            {activeTab === 'buttons' && (
              <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 space-y-4">
                <h3 className="font-bold text-gray-900 dark:text-white">⚡ الأزرار</h3>

                {/* Header Buttons */}
                <div className="space-y-2">
                  <button
                    onClick={() => toggleSection('headerButtons')}
                    className="w-full flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/50 transition"
                  >
                    <span className="font-semibold text-blue-600 dark:text-blue-400">أزرار Header</span>
                    {expandedSections.headerButtons ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                  {expandedSections.headerButtons && (
                    <div className="mt-3 space-y-2 pl-4 border-l-2 border-blue-200 dark:border-blue-800">
                      {[
                        { key: 'showHeaderPhone', label: '📞 زر الاتصال' },
                        { key: 'showHeaderWhatsapp', label: '💬 زر واتساب' },
                        { key: 'showHeaderEmail', label: '✉️ زر البريد' },
                        { key: 'showHeaderSearch', label: '🔍 زر البحث' },
                        { key: 'showHeaderCart', label: '🛒 زر السلة' },
                      ].map(btn => (
                        <label key={btn.key} className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={(config as any)[btn.key]}
                            onChange={e => setConfig({ ...config, [btn.key]: e.target.checked })}
                            className="w-4 h-4 accent-blue-600 rounded"
                          />
                          <span className="text-sm text-gray-700 dark:text-gray-300">{btn.label}</span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>

                {/* Footer Buttons */}
                <div className="space-y-2">
                  <button
                    onClick={() => toggleSection('footerButtons')}
                    className="w-full flex items-center justify-between p-3 bg-purple-50 dark:bg-purple-900/30 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/50 transition"
                  >
                    <span className="font-semibold text-purple-600 dark:text-purple-400">أزرار Footer</span>
                    {expandedSections.footerButtons ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                  {expandedSections.footerButtons && (
                    <div className="mt-3 space-y-2 pl-4 border-l-2 border-purple-200 dark:border-purple-800">
                      {[
                        { key: 'showFooterPhone', label: '📞 زر الاتصال' },
                        { key: 'showFooterWhatsapp', label: '💬 زر واتساب' },
                        { key: 'showFooterEmail', label: '✉️ زر البريد' },
                        { key: 'showFooterAddress', label: '📍 العنوان' },
                        { key: 'showFooterSocial', label: '🌐 وسائل التواصل' },
                      ].map(btn => (
                        <label key={btn.key} className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={(config as any)[btn.key]}
                            onChange={e => setConfig({ ...config, [btn.key]: e.target.checked })}
                            className="w-4 h-4 accent-purple-600 rounded"
                          />
                          <span className="text-sm text-gray-700 dark:text-gray-300">{btn.label}</span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>

                {/* Contact Buttons */}
                <div className="space-y-2">
                  <button
                    onClick={() => toggleSection('contactButtons')}
                    className="w-full flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/30 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/50 transition"
                  >
                    <span className="font-semibold text-green-600 dark:text-green-400">أزرار التواصل</span>
                    {expandedSections.contactButtons ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                  {expandedSections.contactButtons && (
                    <div className="mt-3 space-y-2 pl-4 border-l-2 border-green-200 dark:border-green-800">
                      {[
                        { key: 'showContactPhone', label: '📞 زر الاتصال' },
                        { key: 'showContactWhatsapp', label: '💬 زر واتساب' },
                        { key: 'showContactEmail', label: '✉️ زر البريد' },
                      ].map(btn => (
                        <label key={btn.key} className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={(config as any)[btn.key]}
                            onChange={e => setConfig({ ...config, [btn.key]: e.target.checked })}
                            className="w-4 h-4 accent-green-600 rounded"
                          />
                          <span className="text-sm text-gray-700 dark:text-gray-300">{btn.label}</span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Banner Tab */}
            {activeTab === 'banner' && (
              <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 space-y-4">
                <h3 className="font-bold text-gray-900 dark:text-white">🎬 إعدادات البنر</h3>
                
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">نوع البنر</label>
                  <div className="flex gap-2">
                    {[
                      { value: 'image', label: '🖼️ صورة' },
                      { value: 'video', label: '🎬 فيديو' },
                    ].map(type => (
                      <button
                        key={type.value}
                        onClick={() => setConfig({ ...config, bannerType: type.value as any })}
                        className={`flex-1 px-3 py-2 rounded-lg font-semibold text-sm transition ${
                          config.bannerType === type.value
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                        }`}
                      >
                        {type.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">ارتفاع البنر</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="range"
                      min="200"
                      max="600"
                      value={config.bannerHeight}
                      onChange={e => setConfig({ ...config, bannerHeight: parseInt(e.target.value) })}
                      className="flex-1"
                    />
                    <span className="text-sm font-semibold text-gray-700 dark:text-gray-300 w-12">{config.bannerHeight}px</span>
                  </div>
                </div>

                {config.bannerType === 'image' && (
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">رابط الصورة</label>
                    <input
                      type="text"
                      value={config.bannerImage}
                      onChange={e => setConfig({ ...config, bannerImage: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                      placeholder="https://..."
                    />
                  </div>
                )}

                {config.bannerType === 'video' && (
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">رابط الفيديو</label>
                    <input
                      type="text"
                      value={config.bannerVideo}
                      onChange={e => setConfig({ ...config, bannerVideo: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                      placeholder="https://youtube.com/..."
                    />
                  </div>
                )}
              </div>
            )}

            {/* Elements Tab */}
            {activeTab === 'elements' && (
              <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 space-y-3">
                <h3 className="font-bold text-gray-900 dark:text-white">👁️ العناصر المرئية</h3>
                {[
                  { key: 'showHero', label: '🖼️ صورة الغلاف' },
                  { key: 'showGallery', label: '📸 المعرض' },
                  { key: 'showMenu', label: '📋 القائمة' },
                  { key: 'showProducts', label: '🛍️ المنتجات' },
                  { key: 'showReviews', label: '⭐ التقييمات' },
                  { key: 'showBookings', label: '📅 الحجوزات' },
                  { key: 'showMap', label: '🗺️ الخريطة' },
                ].map(elem => (
                  <label key={elem.key} className="flex items-center gap-2 cursor-pointer p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition">
                    <input
                      type="checkbox"
                      checked={(config as any)[elem.key]}
                      onChange={e => setConfig({ ...config, [elem.key]: e.target.checked })}
                      className="w-4 h-4 accent-blue-600 rounded"
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-300">{elem.label}</span>
                  </label>
                ))}
              </div>
            )}

            {/* Media Tab */}
            {activeTab === 'media' && (
              <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 space-y-6">
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-4">🖼️ صورة البنر</h3>
                  <ImageUploader
                    merchantId={merchantId}
                    type="banner"
                    currentImage={config.bannerImage}
                    onSuccess={(url) => {
                      setConfig({ ...config, bannerImage: url as string });
                      setSaveSuccess(true);
                      setTimeout(() => setSaveSuccess(false), 2000);
                    }}
                    onError={(err) => setError(err)}
                  />
                </div>

                <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                  <h3 className="font-bold text-gray-900 dark:text-white mb-4">📸 معرض الصور</h3>
                  <ImageUploader
                    merchantId={merchantId}
                    type="gallery"
                    currentGallery={config.galleryImages}
                    onSuccess={(urls) => {
                      setConfig({ ...config, galleryImages: urls as string[] });
                      setSaveSuccess(true);
                      setTimeout(() => setSaveSuccess(false), 2000);
                    }}
                    onError={(err) => setError(err)}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Preview */}
          <div className="lg:col-span-2 space-y-4">
            {/* Device Selector */}
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4">
              <h3 className="font-bold text-gray-900 dark:text-white mb-3">📱 معاينة الأجهزة</h3>
              <div className="flex gap-2 flex-wrap">
                {[
                  { id: 'desktop', label: '🖥️ سطح المكتب', icon: Monitor },
                  { id: 'tablet', label: '📱 التابلت', icon: Tablet },
                  { id: 'mobile', label: '📲 الهاتف', icon: Smartphone },
                ].map(device => (
                  <button
                    key={device.id}
                    onClick={() => setPreviewDevice(device.id as any)}
                    className={`flex-1 min-w-[120px] px-4 py-2 rounded-lg font-semibold text-sm transition ${
                      previewDevice === device.id
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    {device.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Preview Frame */}
            <div className="bg-gray-100 dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-4 sm:p-8 flex items-center justify-center min-h-[600px] overflow-auto">
              <PreviewFrame />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
