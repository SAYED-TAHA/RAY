import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useThemeContext } from '@/context/ThemeContext';
import { 
  ArrowLeft, Store, Upload, Palette, Layout, Image, FileText, 
  Globe, CreditCard, Package, Settings, Check, ChevronRight,
  Smartphone, Truck, Shield, Star, Users, TrendingUp, Shirt, Utensils, Home
} from 'lucide-react';

interface StoreSetupProps {
  templateId?: string;
}

const StoreSetup: React.FC<StoreSetupProps> = ({ templateId }) => {
  const router = useRouter();
  const { theme, language } = useThemeContext();
  const [currentStep, setCurrentStep] = useState(1);
  const [storeData, setStoreData] = useState({
    name: '',
    description: '',
    category: '',
    logo: null,
    theme: 'modern',
    colors: {
      primary: '#3b82f6',
      secondary: '#8b5cf6',
      accent: '#ec4899'
    },
    layout: 'grid',
    features: {
      wishlist: true,
      reviews: true,
      multiLanguage: false,
      multiCurrency: false,
      socialLogin: true,
      guestCheckout: true
    },
    paymentMethods: ['credit'],
    shipping: {
      freeShipping: false,
      flatRate: 0,
      expressShipping: false
    },
    socialLinks: {
      facebook: '',
      instagram: '',
      twitter: '',
      linkedin: ''
    }
  });

  const steps = [
    { id: 1, title: language === 'ar' ? 'المعلومات الأساسية' : 'Basic Info', icon: Store },
    { id: 2, title: language === 'ar' ? 'التصميم والمظهر' : 'Design & Theme', icon: Palette },
    { id: 3, title: language === 'ar' ? 'المميزات والوظائف' : 'Features', icon: Settings },
    { id: 4, title: language === 'ar' ? 'الدفع والشحن' : 'Payment & Shipping', icon: CreditCard },
    { id: 5, title: language === 'ar' ? 'الإطلاق' : 'Launch', icon: Check }
  ];

  const categories = [
    { id: 'fashion', name: language === 'ar' ? 'أزياء' : 'Fashion', icon: Shirt },
    { id: 'electronics', name: language === 'ar' ? 'إلكترونيات' : 'Electronics', icon: Smartphone },
    { id: 'food', name: language === 'ar' ? 'طعام' : 'Food & Beverage', icon: Utensils },
    { id: 'beauty', name: language === 'ar' ? 'جمال' : 'Beauty', icon: Star },
    { id: 'sports', name: language === 'ar' ? 'رياضة' : 'Sports', icon: TrendingUp },
    { id: 'books', name: language === 'ar' ? 'كتب' : 'Books', icon: FileText },
    { id: 'home', name: language === 'ar' ? 'منزل' : 'Home & Garden', icon: Home },
    { id: 'toys', name: language === 'ar' ? 'ألعاب' : 'Toys & Games', icon: Package }
  ];

  const themes = [
    { id: 'modern', name: language === 'ar' ? 'حديث' : 'Modern', preview: 'minimal' },
    { id: 'classic', name: language === 'ar' ? 'كلاسيكي' : 'Classic', preview: 'traditional' },
    { id: 'bold', name: language === 'ar' ? 'جريء' : 'Bold', preview: 'vibrant' },
    { id: 'elegant', name: language === 'ar' ? 'أنيق' : 'Elegant', preview: 'sophisticated' }
  ];

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = () => {
    // Save store data and redirect to store
    router.push('/merchant/store');
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                {language === 'ar' ? 'اسم المتجر' : 'Store Name'}
              </label>
              <input
                type="text"
                value={storeData.name}
                onChange={(e) => setStoreData({...storeData, name: e.target.value})}
                className={`w-full px-4 py-3 rounded-lg border ${theme === 'dark' ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300'}`}
                placeholder={language === 'ar' ? 'أدخل اسم متجرك' : 'Enter your store name'}
              />
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                {language === 'ar' ? 'الوصف' : 'Description'}
              </label>
              <textarea
                value={storeData.description}
                onChange={(e) => setStoreData({...storeData, description: e.target.value})}
                rows={4}
                className={`w-full px-4 py-3 rounded-lg border ${theme === 'dark' ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300'}`}
                placeholder={language === 'ar' ? 'صف متجرك' : 'Describe your store'}
              />
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                {language === 'ar' ? 'الفئة' : 'Category'}
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setStoreData({...storeData, category: category.id})}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      storeData.category === category.id
                        ? 'border-blue-500 bg-blue-50'
                        : theme === 'dark' ? 'border-gray-700 hover:border-gray-600' : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    <category.icon className="w-6 h-6 mx-auto mb-2" />
                    <span className="text-sm">{category.name}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                {language === 'ar' ? 'الشعار' : 'Logo'}
              </label>
              <div className={`border-2 border-dashed rounded-lg p-8 text-center ${theme === 'dark' ? 'border-gray-700' : 'border-gray-300'}`}>
                <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  {language === 'ar' ? 'اسحب وأفلت الشعار هنا أو' : 'Drag and drop logo here or'}
                </p>
                <button className="mt-2 text-blue-500 hover:text-blue-600 text-sm font-medium">
                  {language === 'ar' ? 'اختر ملف' : 'Choose file'}
                </button>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <label className={`block text-sm font-medium mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                {language === 'ar' ? 'اختر قالب' : 'Choose Theme'}
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {themes.map((themeOption) => (
                  <div
                    key={themeOption.id}
                    onClick={() => setStoreData({...storeData, theme: themeOption.id})}
                    className={`cursor-pointer rounded-lg border-2 p-4 transition-all ${
                      storeData.theme === themeOption.id
                        ? 'border-blue-500 bg-blue-50'
                        : theme === 'dark' ? 'border-gray-700 hover:border-gray-600' : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    <div className="h-32 bg-gray-100 rounded mb-3 flex items-center justify-center">
                      <Layout className="w-8 h-8 text-gray-400" />
                    </div>
                    <h4 className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                      {themeOption.name}
                    </h4>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <label className={`block text-sm font-medium mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                {language === 'ar' ? 'الألوان' : 'Colors'}
              </label>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="text-xs text-gray-500 mb-1 block">
                    {language === 'ar' ? 'الأساسي' : 'Primary'}
                  </label>
                  <input
                    type="color"
                    value={storeData.colors.primary}
                    onChange={(e) => setStoreData({
                      ...storeData,
                      colors: {...storeData.colors, primary: e.target.value}
                    })}
                    className="w-full h-12 rounded cursor-pointer"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-500 mb-1 block">
                    {language === 'ar' ? 'الثانوي' : 'Secondary'}
                  </label>
                  <input
                    type="color"
                    value={storeData.colors.secondary}
                    onChange={(e) => setStoreData({
                      ...storeData,
                      colors: {...storeData.colors, secondary: e.target.value}
                    })}
                    className="w-full h-12 rounded cursor-pointer"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-500 mb-1 block">
                    {language === 'ar' ? 'الإبراز' : 'Accent'}
                  </label>
                  <input
                    type="color"
                    value={storeData.colors.accent}
                    onChange={(e) => setStoreData({
                      ...storeData,
                      colors: {...storeData.colors, accent: e.target.value}
                    })}
                    className="w-full h-12 rounded cursor-pointer"
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <label className={`block text-sm font-medium mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                {language === 'ar' ? 'المميزات' : 'Features'}
              </label>
              <div className="space-y-3">
                {Object.entries(storeData.features).map(([key, value]) => (
                  <label key={key} className="flex items-center justify-between p-4 rounded-lg border">
                    <span className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>
                      {key === 'wishlist' && (language === 'ar' ? 'قائمة الرغبات' : 'Wishlist')}
                      {key === 'reviews' && (language === 'ar' ? 'التقييمات' : 'Reviews')}
                      {key === 'multiLanguage' && (language === 'ar' ? 'متعدد اللغات' : 'Multi-language')}
                      {key === 'multiCurrency' && (language === 'ar' ? 'متعدد العملات' : 'Multi-currency')}
                      {key === 'socialLogin' && (language === 'ar' ? 'تسجيل الدخول الاجتماعي' : 'Social Login')}
                      {key === 'guestCheckout' && (language === 'ar' ? 'الدفع كضيف' : 'Guest Checkout')}
                    </span>
                    <input
                      type="checkbox"
                      checked={value}
                      onChange={(e) => setStoreData({
                        ...storeData,
                        features: {...storeData.features, [key]: e.target.checked}
                      })}
                      className="w-5 h-5 text-blue-600"
                    />
                  </label>
                ))}
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div>
              <label className={`block text-sm font-medium mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                {language === 'ar' ? 'طرق الدفع' : 'Payment Methods'}
              </label>
              <div className="space-y-3">
                {['credit', 'paypal', 'apple', 'google'].map((method) => (
                  <label key={method} className="flex items-center justify-between p-4 rounded-lg border">
                    <span className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>
                      {method === 'credit' && (language === 'ar' ? 'بطاقة ائتمان' : 'Credit Card')}
                      {method === 'paypal' && 'PayPal'}
                      {method === 'apple' && 'Apple Pay'}
                      {method === 'google' && 'Google Pay'}
                    </span>
                    <input
                      type="checkbox"
                      checked={storeData.paymentMethods.includes(method)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setStoreData({
                            ...storeData,
                            paymentMethods: [...storeData.paymentMethods, method]
                          });
                        } else {
                          setStoreData({
                            ...storeData,
                            paymentMethods: storeData.paymentMethods.filter(m => m !== method)
                          });
                        }
                      }}
                      className="w-5 h-5 text-blue-600"
                    />
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className={`block text-sm font-medium mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                {language === 'ar' ? 'خيارات الشحن' : 'Shipping Options'}
              </label>
              <div className="space-y-3">
                <label className="flex items-center justify-between p-4 rounded-lg border">
                  <span className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>
                    {language === 'ar' ? 'شحن مجاني' : 'Free Shipping'}
                  </span>
                  <input
                    type="checkbox"
                    checked={storeData.shipping.freeShipping}
                    onChange={(e) => setStoreData({
                      ...storeData,
                      shipping: {...storeData.shipping, freeShipping: e.target.checked}
                    })}
                    className="w-5 h-5 text-blue-600"
                  />
                </label>
                
                <div className="p-4 rounded-lg border">
                  <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    {language === 'ar' ? 'سعر الشحن الثابت' : 'Flat Rate Shipping'}
                  </label>
                  <input
                    type="number"
                    value={storeData.shipping.flatRate}
                    onChange={(e) => setStoreData({
                      ...storeData,
                      shipping: {...storeData.shipping, flatRate: Number(e.target.value)}
                    })}
                    className={`w-full px-4 py-2 rounded-lg border ${theme === 'dark' ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300'}`}
                    placeholder="0"
                  />
                </div>

                <label className="flex items-center justify-between p-4 rounded-lg border">
                  <span className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>
                    {language === 'ar' ? 'شحن سريع' : 'Express Shipping'}
                  </span>
                  <input
                    type="checkbox"
                    checked={storeData.shipping.expressShipping}
                    onChange={(e) => setStoreData({
                      ...storeData,
                      shipping: {...storeData.shipping, expressShipping: e.target.checked}
                    })}
                    className="w-5 h-5 text-blue-600"
                  />
                </label>
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="text-center py-12">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-10 h-10 text-green-600" />
            </div>
            <h3 className={`text-2xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              {language === 'ar' ? 'متجرك جاهز!' : 'Your Store is Ready!'}
            </h3>
            <p className={`text-lg mb-8 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
              {language === 'ar' ? 'يمكنك الآن بدء إضافة المنتجات وإطلاق متجرك' : 'You can now start adding products and launch your store'}
            </p>
            
            <div className={`rounded-lg p-6 mb-8 ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'}`}>
              <h4 className={`font-medium mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                {language === 'ar' ? 'ملخص المتجر' : 'Store Summary'}
              </h4>
              <div className="space-y-2 text-left">
                <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                  <span className="font-medium">{language === 'ar' ? 'الاسم:' : 'Name:'}</span> {storeData.name}
                </p>
                <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                  <span className="font-medium">{language === 'ar' ? 'الفئة:' : 'Category:'}</span> {categories.find(c => c.id === storeData.category)?.name}
                </p>
                <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                  <span className="font-medium">{language === 'ar' ? 'القالب:' : 'Theme:'}</span> {themes.find(t => t.id === storeData.theme)?.name}
                </p>
              </div>
            </div>

            <div className="flex gap-4 justify-center">
              <button
                onClick={() => setCurrentStep(1)}
                className={`px-6 py-3 rounded-lg font-medium ${theme === 'dark' ? 'bg-gray-800 text-white hover:bg-gray-700' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
              >
                {language === 'ar' ? 'تعديل' : 'Edit'}
              </button>
              <button
                onClick={handleComplete}
                className="px-8 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700"
              >
                {language === 'ar' ? 'إطلاق المتجر' : 'Launch Store'}
              </button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Header */}
      <header className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-b`}>
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => router.push('/merchant')}
              className={`flex items-center gap-2 ${theme === 'dark' ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}
            >
              <ArrowLeft className="w-5 h-5" />
              {language === 'ar' ? 'العودة' : 'Back'}
            </button>
            
            <h1 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              {language === 'ar' ? 'إعداد المتجر' : 'Store Setup'}
            </h1>
            
            <div className="w-20"></div>
          </div>
        </div>
      </header>

      {/* Progress Steps */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  currentStep >= step.id
                    ? 'bg-blue-600 text-white'
                    : theme === 'dark' ? 'bg-gray-700 text-gray-400' : 'bg-gray-200 text-gray-500'
                }`}
              >
                {currentStep > step.id ? <Check className="w-5 h-5" /> : step.id}
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`w-full h-1 mx-4 ${
                    currentStep > step.id ? 'bg-blue-600' : theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        <div className="text-center mb-8">
          <h2 className={`text-2xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            {steps[currentStep - 1].title}
          </h2>
          <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            {language === 'ar' ? `الخطوة ${currentStep} من ${steps.length}` : `Step ${currentStep} of ${steps.length}`}
          </p>
        </div>

        {/* Step Content */}
        <div className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-lg p-8 shadow-lg`}>
          {renderStepContent()}
        </div>

        {/* Navigation */}
        {currentStep < steps.length && (
          <div className="flex justify-between mt-8">
            <button
              onClick={handlePrevious}
              disabled={currentStep === 1}
              className={`px-6 py-3 rounded-lg font-medium ${
                currentStep === 1
                  ? 'opacity-50 cursor-not-allowed'
                  : theme === 'dark' ? 'bg-gray-800 text-white hover:bg-gray-700' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {language === 'ar' ? 'السابق' : 'Previous'}
            </button>
            
            <button
              onClick={handleNext}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700"
            >
              {language === 'ar' ? 'التالي' : 'Next'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default StoreSetup;
