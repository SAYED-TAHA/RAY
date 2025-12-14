'use client';

import { useState, useEffect } from 'react';
import { Save, RotateCcw, Eye, Settings } from 'lucide-react';
import ColorPicker from '@/components/customizer/ColorPicker';
import ElementToggler from '@/components/customizer/ElementToggler';
import ButtonCustomizer from '@/components/customizer/ButtonCustomizer';
import MediaUploader from '@/components/customizer/MediaUploader';
import PreviewPanel from '@/components/customizer/PreviewPanel';

interface MerchantDashboardProps {
  params: {
    id: string;
  };
}

const defaultCustomization = {
  colors: {
    primary: '#FF6B6B',
    secondary: '#4ECDC4',
    accent: '#FFE66D',
    background: '#FFFFFF',
    text: '#333333'
  },
  elements: {
    showHero: true,
    showGallery: true,
    showReviews: true,
    showMenu: true,
    showProducts: true,
    showBookings: true,
    showContact: true,
    showMap: true
  },
  buttons: {
    primaryText: 'احجز الآن',
    primaryColor: '#FF6B6B',
    secondaryText: 'اعرف أكثر',
    secondaryColor: '#4ECDC4',
    showWhatsApp: true,
    showPhone: true,
    showEmail: true
  },
  media: {
    heroImage: undefined,
    logo: undefined,
    gallery: []
  }
};

export default function MerchantDashboard({ params }: MerchantDashboardProps) {
  const [activeTab, setActiveTab] = useState<'colors' | 'elements' | 'buttons' | 'media' | 'preview'>('colors');
  const [customization, setCustomization] = useState(defaultCustomization);
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [merchantData, setMerchantData] = useState({
    name: 'اسم النشاط',
    type: 'restaurant'
  });

  // تحميل البيانات من API
  useEffect(() => {
    // محاكاة جلب البيانات من API
    const fetchMerchantData = async () => {
      // const response = await fetch(`/api/merchants/${params.id}`);
      // const data = await response.json();
      // setMerchantData(data);
      // setCustomization(data.customization || defaultCustomization);
    };

    fetchMerchantData();
  }, [params.id]);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // حفظ البيانات في API
      // const response = await fetch(`/api/merchants/${params.id}/customization`, {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(customization)
      // });

      // محاكاة حفظ البيانات
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (error) {
      console.error('Error saving customization:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleReset = () => {
    if (confirm('هل أنت متأكد من رغبتك في إعادة تعيين جميع الإعدادات؟')) {
      setCustomization(defaultCustomization);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-6">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
              لوحة تحكم {merchantData.name}
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              تحكم كامل في مظهر وتخطيط صفحة نشاطك
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleReset}
              className="flex items-center gap-2 px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition"
            >
              <RotateCcw className="w-5 h-5" />
              إعادة تعيين
            </button>
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50"
            >
              <Save className="w-5 h-5" />
              {isSaving ? 'جاري الحفظ...' : 'حفظ التغييرات'}
            </button>
          </div>
        </div>

        {/* Success Message */}
        {saved && (
          <div className="bg-green-100 dark:bg-green-900/30 border border-green-500 text-green-700 dark:text-green-400 px-6 py-4 rounded-lg flex items-center gap-3">
            <span>✓</span>
            <span>تم حفظ التغييرات بنجاح!</span>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sidebar - Tabs */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden sticky top-6">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <Settings className="w-5 h-5" />
                الإعدادات
              </h2>
            </div>
            <nav className="space-y-2 p-4">
              {[
                { id: 'colors', label: '🎨 الألوان', icon: '🎨' },
                { id: 'elements', label: '👁️ العناصر', icon: '👁️' },
                { id: 'buttons', label: '⚡ الأزرار', icon: '⚡' },
                { id: 'media', label: '📸 الوسائط', icon: '📸' },
                { id: 'preview', label: '👀 المعاينة', icon: '👀' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`w-full text-right px-4 py-3 rounded-lg transition font-semibold ${
                    activeTab === tab.id
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="lg:col-span-2 space-y-6">
          {/* Colors Tab */}
          {activeTab === 'colors' && (
            <ColorPicker
              colors={customization.colors}
              onChange={(colors) => setCustomization({ ...customization, colors })}
              onPreview={(colors) => setCustomization({ ...customization, colors })}
            />
          )}

          {/* Elements Tab */}
          {activeTab === 'elements' && (
            <ElementToggler
              elements={customization.elements}
              onChange={(elements) => setCustomization({ ...customization, elements })}
              merchantType={merchantData.type as any}
            />
          )}

          {/* Buttons Tab */}
          {activeTab === 'buttons' && (
            <ButtonCustomizer
              buttons={customization.buttons}
              onChange={(buttons) => setCustomization({ ...customization, buttons })}
              onPreview={(buttons) => setCustomization({ ...customization, buttons })}
            />
          )}

          {/* Media Tab */}
          {activeTab === 'media' && (
            <MediaUploader
              media={customization.media}
              onChange={(media) => setCustomization({ ...customization, media })}
              onPreview={(media) => setCustomization({ ...customization, media })}
            />
          )}

          {/* Preview Tab */}
          {activeTab === 'preview' && (
            <PreviewPanel
              customization={customization}
              merchantName={merchantData.name}
              merchantType={merchantData.type}
            />
          )}
        </div>
      </div>

      {/* Floating Preview Button */}
      {activeTab !== 'preview' && (
        <button
          onClick={() => setActiveTab('preview')}
          className="fixed bottom-8 right-8 flex items-center gap-2 px-6 py-4 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition font-semibold"
        >
          <Eye className="w-5 h-5" />
          معاينة
        </button>
      )}
    </div>
  );
}
