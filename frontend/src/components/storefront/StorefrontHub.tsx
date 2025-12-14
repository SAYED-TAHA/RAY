import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useThemeContext } from '@/context/ThemeContext';
import { 
  Store, ShoppingCart, Globe, Smartphone, Palette, Settings, 
  TrendingUp, Users, Package, CreditCard, Star, ArrowRight,
  Plus, Eye, Edit, Trash2, Copy, ExternalLink, BarChart3,
  Layout, Image, FileText, Shield, Zap, Target, Award
} from 'lucide-react';

const StorefrontHub: React.FC = () => {
  const router = useRouter();
  const { theme, language } = useThemeContext();
  const [activeTab, setActiveTab] = useState('overview');

  const stores = [
    {
      id: 1,
      name: language === 'ar' ? 'متجر الأزياء' : 'Fashion Store',
      category: language === 'ar' ? 'أزياء' : 'Fashion',
      status: 'active',
      products: 245,
      orders: 1234,
      revenue: 45678,
      visitors: 8901,
      theme: 'modern',
      domain: 'fashion-store.example.com',
      created: '2024-01-15'
    },
    {
      id: 2,
      name: language === 'ar' ? 'إلكترونيات تك' : 'Tech Electronics',
      category: language === 'ar' ? 'إلكترونيات' : 'Electronics',
      status: 'active',
      products: 189,
      orders: 892,
      revenue: 34567,
      visitors: 5678,
      theme: 'bold',
      domain: 'tech-store.example.com',
      created: '2024-02-20'
    },
    {
      id: 3,
      name: language === 'ar' ? 'المنزل الجميل' : 'Beautiful Home',
      category: language === 'ar' ? 'منزل' : 'Home',
      status: 'draft',
      products: 67,
      orders: 0,
      revenue: 0,
      visitors: 123,
      theme: 'elegant',
      domain: 'home-store.example.com',
      created: '2024-03-10'
    }
  ];

  const templates = [
    {
      id: 'fashion',
      name: language === 'ar' ? 'أزياء' : 'Fashion',
      description: language === 'ar' ? 'قالب مثالي لمتاجر الأزياء والموضة' : 'Perfect template for fashion and clothing stores',
      icon: Package,
      color: 'bg-pink-500',
      preview: '/api/placeholder/300/200',
      features: [language === 'ar' ? 'معرض الصور' : 'Gallery', language === 'ar' ? 'حجم المقاسات' : 'Size Guide', language === 'ar' ? 'الألوان' : 'Colors']
    },
    {
      id: 'electronics',
      name: language === 'ar' ? 'إلكترونيات' : 'Electronics',
      description: language === 'ar' ? 'متخصص في المنتجات الإلكترونية والتقنية' : 'Specialized in electronics and tech products',
      icon: Smartphone,
      color: 'bg-blue-500',
      preview: '/api/placeholder/300/200',
      features: [language === 'ar' ? 'مقارنة المنتجات' : 'Product Comparison', language === 'ar' ? 'المواصفات' : 'Specifications', language === 'ar' ? 'المراجعات' : 'Reviews']
    },
    {
      id: 'food',
      name: language === 'ar' ? 'طعام' : 'Food',
      description: language === 'ar' ? 'للمطاعم والمقاهي ومنتجات الغذاء' : 'For restaurants, cafes and food products',
      icon: Package,
      color: 'bg-green-500',
      preview: '/api/placeholder/300/200',
      features: [language === 'ar' ? 'القائمة' : 'Menu', language === 'ar' ? 'الحجز' : 'Reservation', language === 'ar' ? 'التوصيل' : 'Delivery']
    }
  ];

  const tabs = [
    { id: 'overview', label: language === 'ar' ? 'نظرة عامة' : 'Overview', icon: BarChart3 },
    { id: 'stores', label: language === 'ar' ? 'متاجري' : 'My Stores', icon: Store },
    { id: 'templates', label: language === 'ar' ? 'القوالب' : 'Templates', icon: Layout },
    { id: 'analytics', label: language === 'ar' ? 'التحليلات' : 'Analytics', icon: TrendingUp }
  ];

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} p-6 rounded-lg shadow-lg`}>
          <div className="flex items-center justify-between mb-4">
            <Store className={`w-8 h-8 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`} />
            <span className="text-2xl font-bold">{stores.length}</span>
          </div>
          <h3 className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
            {language === 'ar' ? 'إجمالي المتاجر' : 'Total Stores'}
          </h3>
        </div>

        <div className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} p-6 rounded-lg shadow-lg`}>
          <div className="flex items-center justify-between mb-4">
            <Package className={`w-8 h-8 ${theme === 'dark' ? 'text-green-400' : 'text-green-600'}`} />
            <span className="text-2xl font-bold">
              {stores.reduce((sum, store) => sum + store.products, 0)}
            </span>
          </div>
          <h3 className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
            {language === 'ar' ? 'إجمالي المنتجات' : 'Total Products'}
          </h3>
        </div>

        <div className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} p-6 rounded-lg shadow-lg`}>
          <div className="flex items-center justify-between mb-4">
            <ShoppingCart className={`w-8 h-8 ${theme === 'dark' ? 'text-purple-400' : 'text-purple-600'}`} />
            <span className="text-2xl font-bold">
              {stores.reduce((sum, store) => sum + store.orders, 0)}
            </span>
          </div>
          <h3 className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
            {language === 'ar' ? 'إجمالي الطلبات' : 'Total Orders'}
          </h3>
        </div>

        <div className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} p-6 rounded-lg shadow-lg`}>
          <div className="flex items-center justify-between mb-4">
            <TrendingUp className={`w-8 h-8 ${theme === 'dark' ? 'text-yellow-400' : 'text-yellow-600'}`} />
            <span className="text-2xl font-bold">
              ${stores.reduce((sum, store) => sum + store.revenue, 0).toLocaleString()}
            </span>
          </div>
          <h3 className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
            {language === 'ar' ? 'إجمالي الإيرادات' : 'Total Revenue'}
          </h3>
        </div>
      </div>

      {/* Recent Activity */}
      <div className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg p-6`}>
        <h3 className={`text-lg font-semibold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
          {language === 'ar' ? 'النشاط الأخير' : 'Recent Activity'}
        </h3>
        <div className="space-y-4">
          {stores.slice(0, 3).map((store) => (
            <div key={store.id} className={`flex items-center justify-between p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`}>
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-lg ${store.status === 'active' ? 'bg-green-100' : 'bg-gray-100'} flex items-center justify-center`}>
                  <Store className={`w-5 h-5 ${store.status === 'active' ? 'text-green-600' : 'text-gray-600'}`} />
                </div>
                <div>
                  <h4 className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{store.name}</h4>
                  <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    {store.orders} {language === 'ar' ? 'طلب' : 'orders'} • ${store.revenue.toLocaleString()} {language === 'ar' ? 'إيرادات' : 'revenue'}
                  </p>
                </div>
              </div>
              <button
                onClick={() => router.push(`/merchant/store/${store.id}`)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  theme === 'dark' 
                    ? 'bg-gray-600 text-white hover:bg-gray-500'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {language === 'ar' ? 'عرض' : 'View'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderStores = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className={`text-xl font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
          {language === 'ar' ? 'متاجري' : 'My Stores'}
        </h2>
        <button
          onClick={() => router.push('/merchant/store-setup')}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Plus className="w-4 h-4" />
          {language === 'ar' ? 'متجر جديد' : 'New Store'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stores.map((store) => (
          <div key={store.id} className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg overflow-hidden`}>
            {/* Store Header */}
            <div className={`h-32 bg-gradient-to-r ${store.status === 'active' ? 'from-green-500 to-blue-500' : 'from-gray-500 to-gray-600'}`}></div>
            
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className={`font-semibold text-lg ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  {store.name}
                </h3>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  store.status === 'active' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {store.status === 'active' ? (language === 'ar' ? 'نشط' : 'Active') : (language === 'ar' ? 'مسودة' : 'Draft')}
                </span>
              </div>

              <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} mb-4`}>
                {store.category} • {store.domain}
              </p>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{store.products}</p>
                  <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    {language === 'ar' ? 'منتج' : 'Products'}
                  </p>
                </div>
                <div>
                  <p className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{store.orders}</p>
                  <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    {language === 'ar' ? 'طلبات' : 'Orders'}
                  </p>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => router.push(`/merchant/store/${store.id}`)}
                  className="flex-1 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
                >
                  {language === 'ar' ? 'إدارة' : 'Manage'}
                </button>
                <button
                  onClick={() => window.open(`https://${store.domain}`, '_blank')}
                  className={`px-3 py-2 rounded-lg border text-sm ${
                    theme === 'dark' 
                      ? 'border-gray-700 text-gray-300 hover:bg-gray-700'
                      : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Eye className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderTemplates = () => (
    <div className="space-y-6">
      <div>
        <h2 className={`text-xl font-semibold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
          {language === 'ar' ? 'اختر قالب متجرك' : 'Choose Your Store Template'}
        </h2>
        <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
          {language === 'ar' ? 'قوالب جاهزة مصممة خصيصاً لنوع عملك' : 'Ready-made templates specially designed for your business type'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map((template) => (
          <div key={template.id} className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg overflow-hidden group`}>
            <div className="relative h-48 bg-gray-100">
              <img
                src={template.preview}
                alt={template.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <button
                  onClick={() => router.push(`/merchant/store-setup?template=${template.id}`)}
                  className="px-4 py-2 bg-white text-gray-900 rounded-lg font-medium"
                >
                  {language === 'ar' ? 'اختر هذا القالب' : 'Choose Template'}
                </button>
              </div>
            </div>

            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-10 h-10 ${template.color} rounded-lg flex items-center justify-center`}>
                  <template.icon className="w-5 h-5 text-white" />
                </div>
                <h3 className={`font-semibold text-lg ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  {template.name}
                </h3>
              </div>

              <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} mb-4`}>
                {template.description}
              </p>

              <div className="space-y-2">
                {template.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                    <span className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderAnalytics = () => (
    <div className="space-y-6">
      <h2 className={`text-xl font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
        {language === 'ar' ? 'التحليلات والأداء' : 'Analytics & Performance'}
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg p-6`}>
          <h3 className={`text-lg font-semibold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            {language === 'ar' ? 'أداء المتاجر' : 'Store Performance'}
          </h3>
          <div className="space-y-4">
            {stores.map((store) => (
              <div key={store.id} className="flex items-center justify-between">
                <div>
                  <p className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{store.name}</p>
                  <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    {store.visitors} {language === 'ar' ? 'زائر' : 'visitors'}
                  </p>
                </div>
                <div className="text-right">
                  <p className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    ${store.revenue.toLocaleString()}
                  </p>
                  <p className={`text-sm text-green-600`}>+12%</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg p-6`}>
          <h3 className={`text-lg font-semibold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            {language === 'ar' ? 'المنتجات الأكثر مبيعاً' : 'Top Products'}
          </h3>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((item) => (
              <div key={item} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'}`}></div>
                  <div>
                    <p className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                      {language === 'ar' ? 'منتج' : 'Product'} {item}
                    </p>
                    <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                      {Math.floor(Math.random() * 100) + 20} {language === 'ar' ? 'مبيعات' : 'sales'}
                    </p>
                  </div>
                </div>
                <p className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  ${(Math.floor(Math.random() * 500) + 50).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Header */}
      <header className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-b`}>
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <Store className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  {language === 'ar' ? 'مركز المتاجر' : 'Storefront Hub'}
                </h1>
                <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  {language === 'ar' ? 'إدارة متاجرك الإلكترونية' : 'Manage your online stores'}
                </p>
              </div>
            </div>

            <button
              onClick={() => router.push('/merchant/store-setup')}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <Plus className="w-4 h-4" />
              {language === 'ar' ? 'متجر جديد' : 'New Store'}
            </button>
          </div>
        </div>
      </header>

      {/* Tabs */}
      <div className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-b`}>
        <div className="max-w-7xl mx-auto px-4">
          <nav className="flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 py-4 border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-600 text-blue-600'
                    : `border-transparent ${theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {activeTab === 'overview' && renderOverview()}
        {activeTab === 'stores' && renderStores()}
        {activeTab === 'templates' && renderTemplates()}
        {activeTab === 'analytics' && renderAnalytics()}
      </div>
    </div>
  );
};

export default StorefrontHub;
