"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Users, Phone, Mail, MapPin, Star, Building2, Package, 
  Truck, Clock, Send, ArrowLeft, CheckCircle, MessageSquare,
  ShoppingCart, BarChart3, TrendingUp, DollarSign, Search,
  Bell, Settings, Plus, Edit, Trash2, CreditCard, Receipt,
  UserCheck, Wifi, Bluetooth, Smartphone, Store, Box,
  ArrowUp, ArrowDown, Filter, MoreVertical, Eye, Printer,
  AlertTriangle, FileText, Download, Upload, RefreshCw,
  Zap, Target, Award, Activity, PieChart, Calendar,
  Headphones, HelpCircle, LogOut, User, ChevronDown, X, Shield, Play
} from 'lucide-react';

export default function SupplierDashboardPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  
  // POS State
  interface CartItem {
    id: number;
    name: string;
    price: string;
    stock: string;
    orders: number;
    status: string;
    quantity: number;
  }
  
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [customerName, setCustomerName] = useState('');
  
  // Additional States
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isMobilePOS, setIsMobilePOS] = useState(false);
  const [connectedDevices, setConnectedDevices] = useState([]);
  const [showInventoryModal, setShowInventoryModal] = useState(false);
  const [showAnalyticsModal, setShowAnalyticsModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [selectedTimeRange, setSelectedTimeRange] = useState('month');
  const [showQuickActions, setShowQuickActions] = useState(false);
  const [activeSettingsTab, setActiveSettingsTab] = useState('profile');

  const products = [
    { id: 1, name: 'دقيق القمح', price: '25 ج/كجم', stock: '500 كجم', orders: 45, status: 'active' },
    { id: 2, name: 'سكر', price: '18 ج/كجم', stock: '1000 كجم', orders: 38, status: 'active' },
    { id: 3, name: 'زيوت طعام', price: '45 ج/لتر', stock: '200 لتر', orders: 28, status: 'active' },
    { id: 4, name: 'أرز', price: '22 ج/كجم', stock: '300 كجم', orders: 22, status: 'low-stock' },
    { id: 5, name: 'مكرونة', price: '15 ج/كجم', stock: '50 كجم', orders: 18, status: 'low-stock' },
    { id: 6, name: 'معلبات', price: '8 ج/علبة', stock: '2000 علبة', orders: 5, status: 'active' }
  ];

  // بيانات وهمية للمورد
  const supplierData = {
    name: 'شركة النور للمواد الغذائية',
    rating: 4.8,
    totalOrders: 156,
    totalRevenue: '45,230 ج',
    activeProducts: 12,
    pendingOrders: 8,
    messages: 3
  };

  // State for editable products
  const [editableProducts, setEditableProducts] = useState(products.map(p => ({
    ...p,
    stockValue: parseInt(p.stock.replace(' كجم', '').replace(' لتر', '').replace(' علبة', ''))
  })));

  // Functions for inventory management
  const updateProductStock = (productId: number, change: number) => {
    setEditableProducts(prev => prev.map(product => {
      if (product.id === productId) {
        const newStockValue = Math.max(0, product.stockValue + change);
        const unit = product.stock.includes('كجم') ? 'كجم' : 
                     product.stock.includes('لتر') ? 'لتر' : 'علبة';
        return {
          ...product,
          stockValue: newStockValue,
          stock: `${newStockValue} ${unit}`
        };
      }
      return product;
    }));
  };

  // Order type definition
  interface Order {
    id: number;
    customer: string;
    product?: string;
    quantity: string;
    total: string;
    status: 'pending' | 'confirmed' | 'delivered';
    date: string;
    products?: any;
    contactInfo?: {
      phone: string;
      email: string;
    };
    notes?: string;
    supplier?: string;
  }

  // Load orders from localStorage (from customer orders)
  const [orders, setOrders] = useState<Order[]>(() => {
    if (typeof window !== 'undefined') {
      const savedOrders = localStorage.getItem('supplierOrders');
      if (savedOrders) {
        return JSON.parse(savedOrders);
      }
    }
    // Default orders
    return [
      { id: 1, customer: 'مطعم الأصالة', product: 'دقيق القمح', quantity: '50 كجم', total: '1250 ج', status: 'pending', date: '2025-12-05' },
      { id: 2, customer: 'فندق النيل', product: 'زيوت طعام', quantity: '20 لتر', total: '900 ج', status: 'confirmed', date: '2025-12-05' },
      { id: 3, customer: 'مخبز الحياة', product: 'سكر', quantity: '100 كجم', total: '1800 ج', status: 'delivered', date: '2025-12-04' },
      { id: 4, customer: 'مطعم الشام', product: 'أرز', quantity: '25 كجم', total: '550 ج', status: 'pending', date: '2025-12-05' },
      { id: 5, customer: 'كافتيريا الزهور', product: 'مكرونة', quantity: '30 كجم', total: '450 ج', status: 'confirmed', date: '2025-12-04' }
    ];
  });

  const messages = [
    { id: 1, sender: 'مطعم الأصالة', subject: 'استفسار عن الأسعار', message: 'هل يوجد خصم على الكميات الكبيرة؟', time: '2 ساعة', unread: true },
    { id: 2, sender: 'فندق النيل', subject: 'طلب عاجل', message: 'نحتاج 100 كجم دقيق خلال 24 ساعة', time: '4 ساعات', unread: true },
    { id: 3, sender: 'مخبز الحياة', subject: 'شكر وتقدير', message: 'جودة المنتجات ممتازة، شكراً لكم', time: 'يوم واحد', unread: false }
  ];

  const stats = [
    { label: 'إجمالي الطلبات', value: supplierData.totalOrders, icon: ShoppingCart, color: 'bg-blue-600', change: '+12%', trend: 'up' },
    { label: 'إجمالي الإيرادات', value: supplierData.totalRevenue, icon: DollarSign, color: 'bg-green-600', change: '+8%', trend: 'up' },
    { label: 'المنتجات النشطة', value: supplierData.activeProducts, icon: Package, color: 'bg-purple-600', change: '+2', trend: 'up' },
    { label: 'الطلبات المعلقة', value: supplierData.pendingOrders, icon: Clock, color: 'bg-orange-600', change: '-3', trend: 'down' }
  ];

  const analyticsData = [
    { month: 'يناير', revenue: 12000, orders: 45, customers: 32 },
    { month: 'فبراير', revenue: 15000, orders: 52, customers: 38 },
    { month: 'مارس', revenue: 13500, orders: 48, customers: 35 },
    { month: 'أبريل', revenue: 18000, orders: 65, customers: 42 },
    { month: 'مايو', revenue: 22000, orders: 78, customers: 51 },
    { month: 'يونيو', revenue: 25000, orders: 89, customers: 58 }
  ];

  const quickActions = [
    { icon: Plus, label: 'إضافة منتج جديد', action: () => setShowAddProductModal(true), color: 'bg-blue-600' },
    { icon: Truck, label: 'تتبع الطلبات', action: () => setActiveTab('orders'), color: 'bg-green-600' },
    { icon: BarChart3, label: 'عرض التحليلات', action: () => setShowAnalyticsModal(true), color: 'bg-purple-600' },
    { icon: MessageSquare, label: 'الرسائل غير المقروءة', action: () => setActiveTab('messages'), color: 'bg-orange-600' },
    { icon: FileText, label: 'إنشاء تقرير', action: () => setShowAnalyticsModal(true), color: 'bg-indigo-600' },
    { icon: Settings, label: 'الإعدادات', action: () => setShowSettingsModal(true), color: 'bg-gray-600' }
  ];

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Stats Cards with Trends */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl shadow-lg p-4 lg:p-6 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-10 h-10 lg:w-12 lg:h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                <stat.icon className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
              </div>
              <div className="flex items-center gap-1">
                {stat.trend === 'up' ? (
                  <ArrowUp className="w-3 h-3 text-green-500" />
                ) : (
                  <ArrowDown className="w-3 h-3 text-red-500" />
                )}
                <span className={`text-xs font-bold ${stat.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                  {stat.change}
                </span>
              </div>
            </div>
            <h3 className="text-xl lg:text-2xl font-bold text-gray-900">{stat.value}</h3>
            <p className="text-gray-600 text-xs lg:text-sm">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Performance Chart */}
      <div className="bg-white rounded-xl shadow-lg p-4 lg:p-6">
        <div className="flex justify-between items-center mb-4 lg:mb-6">
          <h3 className="text-lg lg:text-xl font-bold text-gray-900">نظرة عامة على الأداء</h3>
          <select 
            value={selectedTimeRange}
            onChange={(e) => setSelectedTimeRange(e.target.value)}
            className="text-sm border rounded-lg px-3 py-1"
          >
            <option value="week">آخر أسبوع</option>
            <option value="month">آخر شهر</option>
            <option value="year">آخر عام</option>
          </select>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">25,000 ج</div>
            <p className="text-sm text-gray-600">إيرادات هذا الشهر</p>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">89</div>
            <p className="text-sm text-gray-600">عدد الطلبات</p>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">58</div>
            <p className="text-sm text-gray-600">عملاء جدد</p>
          </div>
        </div>
        
        <div className="h-40 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg flex items-end justify-around p-4">
          {analyticsData.slice(-6).map((data, index) => (
            <div key={index} className="flex flex-col items-center gap-1">
              <div 
                className="w-8 bg-blue-500 rounded-t"
                style={{ height: `${(data.revenue / 25000) * 120}px` }}
              />
              <span className="text-xs text-gray-600">{data.month.slice(0, 3)}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-xl shadow-lg p-4 lg:p-6">
        <div className="flex justify-between items-center mb-4 lg:mb-6">
          <h3 className="text-lg lg:text-xl font-bold text-gray-900">الطلبات الأخيرة</h3>
          <button 
            onClick={() => setActiveTab('orders')}
            className="text-blue-600 hover:text-blue-700 font-bold text-sm"
          >
            عرض الكل
          </button>
        </div>
        
        {/* Mobile View - Cards */}
        <div className="lg:hidden space-y-3">
          {orders.slice(0, 5).map((order: Order) => (
            <div key={order.id} className="border rounded-lg p-3">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-bold text-gray-900">{order.customer}</h4>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                  order.status === 'confirmed' ? 'bg-blue-100 text-blue-800' :
                  'bg-orange-100 text-orange-800'
                }`}>
                  {order.status === 'delivered' ? 'تم التسليم' :
                   order.status === 'confirmed' ? 'مؤكد' : 'معلق'}
                </span>
              </div>
              <div className="text-sm text-gray-600">
                <p>{order.product || 'منتجات متعددة'}</p>
                <p>{order.quantity} - {order.total}</p>
              </div>
            </div>
          ))}
        </div>
        
        {/* Desktop View - Table */}
        <div className="hidden lg:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-right pb-3 text-sm font-bold text-gray-700">العميل</th>
                <th className="text-right pb-3 text-sm font-bold text-gray-700">المنتج</th>
                <th className="text-right pb-3 text-sm font-bold text-gray-700">الكمية</th>
                <th className="text-right pb-3 text-sm font-bold text-gray-700">الإجمالي</th>
                <th className="text-right pb-3 text-sm font-bold text-gray-700">الحالة</th>
              </tr>
            </thead>
            <tbody>
              {orders.slice(0, 5).map((order: Order) => (
                <tr key={order.id} className="border-b hover:bg-gray-50">
                  <td className="py-3 text-sm">{order.customer}</td>
                  <td className="py-3 text-sm">{order.product || 'منتجات متعددة'}</td>
                  <td className="py-3 text-sm">{order.quantity}</td>
                  <td className="py-3 text-sm font-bold">{order.total}</td>
                  <td className="py-3">
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                      order.status === 'confirmed' ? 'bg-blue-100 text-blue-800' :
                      'bg-orange-100 text-orange-800'
                    }`}>
                      {order.status === 'delivered' ? 'تم التسليم' :
                       order.status === 'confirmed' ? 'مؤكد' : 'معلق'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Enhanced Quick Actions */}
      <div className="bg-white rounded-xl shadow-lg p-4 lg:p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg lg:text-xl font-bold text-gray-900">إجراءات سريعة</h3>
          <button 
            onClick={() => setShowQuickActions(!showQuickActions)}
            className="text-gray-500 hover:text-gray-700"
          >
            <ChevronDown className={`w-5 h-5 transition-transform ${showQuickActions ? 'rotate-180' : ''}`} />
          </button>
        </div>
        
        <div className={`grid grid-cols-2 lg:grid-cols-3 gap-3 ${showQuickActions ? '' : 'max-h-32 overflow-hidden'}`}>
          {quickActions.map((action, index) => (
            <button 
              key={index}
              onClick={action.action}
              className={`${action.color} text-white p-3 lg:p-4 rounded-lg hover:shadow-lg transition-all hover:scale-105`}
            >
              <action.icon className="w-5 h-5 lg:w-6 lg:h-6 mb-2 mx-auto" />
              <h4 className="font-bold text-xs lg:text-sm">{action.label}</h4>
            </button>
          ))}
        </div>
      </div>

      {/* Activity Feed */}
      <div className="bg-white rounded-xl shadow-lg p-4 lg:p-6">
        <h3 className="text-lg lg:text-xl font-bold text-gray-900 mb-4">آخر النشاطات</h3>
        <div className="space-y-3">
          <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
              <ShoppingCart className="w-4 h-4 text-white" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-bold text-gray-900">طلب جديد من مطعم الأصالة</p>
              <p className="text-xs text-gray-600">منذ 5 دقائق</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
            <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
              <CheckCircle className="w-4 h-4 text-white" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-bold text-gray-900">تم تسليم طلب فندق النيل</p>
              <p className="text-xs text-gray-600">منذ 15 دقيقة</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
            <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
              <MessageSquare className="w-4 h-4 text-white" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-bold text-gray-900">رسالة جديدة من مخبز الحياة</p>
              <p className="text-xs text-gray-600">منذ 30 دقيقة</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderProducts = () => (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h3 className="text-xl font-bold text-gray-900">المنتجات</h3>
          <p className="text-sm text-gray-600">إدارة وعرض جميع منتجاتك</p>
        </div>
        <div className="flex gap-2 w-full lg:w-auto">
          <button 
            onClick={() => setShowInventoryModal(true)}
            className="bg-purple-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-purple-700 transition flex items-center gap-2"
          >
            <Box className="w-4 h-4" />
            المخزون
          </button>
          <button 
            onClick={() => setShowAddProductModal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-blue-700 transition flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            إضافة منتج
          </button>
        </div>
      </div>

      {/* Product Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">إجمالي المنتجات</p>
              <p className="text-2xl font-bold text-gray-900">{products.length}</p>
            </div>
            <Package className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">منتجات نشطة</p>
              <p className="text-2xl font-bold text-green-600">{products.filter(p => p.status === 'active').length}</p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">مخزون منخفض</p>
              <p className="text-2xl font-bold text-orange-600">{products.filter(p => p.status === 'low-stock').length}</p>
            </div>
            <AlertTriangle className="w-8 h-8 text-orange-600" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">إجمالي الطلبات</p>
              <p className="text-2xl font-bold text-purple-600">{products.reduce((sum, p) => sum + p.orders, 0)}</p>
            </div>
            <ShoppingCart className="w-8 h-8 text-purple-600" />
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-xl shadow-lg p-4">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <input
                type="text"
                placeholder="بحث في المنتجات..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg"
              />
              <Search className="absolute right-3 top-2.5 w-4 h-4 text-gray-400" />
            </div>
          </div>
          <div className="flex gap-2">
            <select className="border border-gray-300 rounded-lg px-4 py-2">
              <option>جميع الفئات</option>
              <option>مواد غذائية</option>
              <option>مشروبات</option>
              <option>معلبات</option>
            </select>
            <select className="border border-gray-300 rounded-lg px-4 py-2">
              <option>جميع الحالات</option>
              <option>نشط</option>
              <option>مخزون منخفض</option>
            </select>
            <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 flex items-center gap-2">
              <Filter className="w-4 h-4" />
              فلترة
            </button>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map(product => (
          <div key={product.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition">
            <div className="h-48 bg-gradient-to-r from-blue-100 to-purple-100 flex items-center justify-center">
              <Package className="w-16 h-16 text-blue-600" />
            </div>
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-bold text-gray-900">{product.name}</h4>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  product.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {product.status === 'active' ? 'نشط' : 'مخزون منخفض'}
                </span>
              </div>
              
              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">السعر:</span>
                  <span className="font-bold text-blue-600">{product.price}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">المخزون:</span>
                  <span className={`font-bold ${
                    parseInt(product.stock) < 100 ? 'text-red-600' : 'text-gray-700'
                  }`}>
                    {product.stock}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">الطلبات:</span>
                  <span className="font-bold text-purple-600">{product.orders} طلب</span>
                </div>
              </div>
              
              <div className="flex gap-2">
                <button className="flex-1 bg-blue-600 text-white py-2 rounded-lg text-sm font-bold hover:bg-blue-700 flex items-center justify-center gap-1">
                  <Eye className="w-3 h-3" />
                  عرض
                </button>
                <button className="flex-1 bg-green-600 text-white py-2 rounded-lg text-sm font-bold hover:bg-green-700 flex items-center justify-center gap-1">
                  <Edit className="w-3 h-3" />
                  تعديل
                </button>
                <button className="bg-red-600 text-white px-3 py-2 rounded-lg text-sm font-bold hover:bg-red-700">
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bulk Actions */}
      <div className="bg-white rounded-xl shadow-lg p-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="rounded" />
              <span className="text-sm">تحديد الكل</span>
            </label>
            <span className="text-sm text-gray-600">0 منتج محدد</span>
          </div>
          <div className="flex gap-2">
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-blue-700 flex items-center gap-2">
              <Edit className="w-4 h-4" />
              تعديل مجمع
            </button>
            <button className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-green-700 flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              تفعيل مجمع
            </button>
            <button className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-red-700 flex items-center gap-2">
              <Trash2 className="w-4 h-4" />
              حذف مجمع
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderOrders = () => (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h3 className="text-xl font-bold text-gray-900">الطلبات</h3>
        <div className="flex gap-2 w-full sm:w-auto">
          <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm w-full sm:w-auto">
            <option>جميع الحالات</option>
            <option>معلق</option>
            <option>مؤكد</option>
            <option>تم التسليم</option>
          </select>
        </div>
      </div>

      {/* Mobile View - List */}
      <div className="lg:hidden space-y-4">
        {orders.map((order: Order) => (
          <div key={order.id} className="bg-white rounded-xl shadow-lg p-4">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h4 className="font-bold text-gray-900">{order.customer}</h4>
                <p className="text-sm text-gray-600">{order.date}</p>
              </div>
              <span className={`text-xs px-2 py-1 rounded-full ${
                order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                order.status === 'confirmed' ? 'bg-blue-100 text-blue-800' :
                'bg-orange-100 text-orange-800'
              }`}>
                {order.status === 'delivered' ? 'تم التسليم' :
                 order.status === 'confirmed' ? 'مؤكد' : 'معلق'}
              </span>
            </div>
            
            <div className="space-y-2 mb-4">
              {order.product && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">المنتج:</span>
                  <span className="font-medium">{order.product}</span>
                </div>
              )}
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">الكمية:</span>
                <span className="font-medium">{order.quantity}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">الإجمالي:</span>
                <span className="font-bold text-lg">{order.total}</span>
              </div>
            </div>
            
            <div className="flex gap-2 flex-col sm:flex-row">
              {order.status === 'pending' && (
                <>
                  <button className="flex-1 bg-green-600 text-white py-2 rounded-lg text-sm font-bold hover:bg-green-700">
                    تأكيد
                  </button>
                  <button className="flex-1 bg-red-600 text-white py-2 rounded-lg text-sm font-bold hover:bg-red-700">
                    رفض
                  </button>
                </>
              )}
              {order.status === 'confirmed' && (
                <button className="flex-1 bg-blue-600 text-white py-2 rounded-lg text-sm font-bold hover:bg-blue-700">
                  تحديث التوصيل
                </button>
              )}
              <button className="px-3 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50">
                تفاصيل
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop View - Grid */}
      <div className="hidden lg:grid lg:grid-cols-3 gap-6">
        {orders.map((order: Order) => (
          <div key={order.id} className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h4 className="font-bold text-gray-900">{order.customer}</h4>
                <p className="text-sm text-gray-600">{order.date}</p>
              </div>
              <span className={`text-xs px-2 py-1 rounded-full ${
                order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                order.status === 'confirmed' ? 'bg-blue-100 text-blue-800' :
                'bg-orange-100 text-orange-800'
              }`}>
                {order.status === 'delivered' ? 'تم التسليم' :
                 order.status === 'confirmed' ? 'مؤكد' : 'معلق'}
              </span>
            </div>
            
            <div className="space-y-2 mb-4">
              {order.product && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">المنتج:</span>
                  <span className="font-medium">{order.product}</span>
                </div>
              )}
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">الكمية:</span>
                <span className="font-medium">{order.quantity}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">الإجمالي:</span>
                <span className="font-bold text-lg">{order.total}</span>
              </div>
            </div>
            
            <div className="flex gap-2">
              {order.status === 'pending' && (
                <>
                  <button className="flex-1 bg-green-600 text-white py-2 rounded-lg text-sm font-bold hover:bg-green-700">
                    تأكيد
                  </button>
                  <button className="flex-1 bg-red-600 text-white py-2 rounded-lg text-sm font-bold hover:bg-red-700">
                    رفض
                  </button>
                </>
              )}
              {order.status === 'confirmed' && (
                <button className="flex-1 bg-blue-600 text-white py-2 rounded-lg text-sm font-bold hover:bg-blue-700">
                  تحديث التوصيل
                </button>
              )}
              <button className="px-3 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50">
                تفاصيل
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderMessages = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold text-gray-900">الرسائل</h3>
        <div className="flex items-center gap-2">
          <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
            {messages.filter(m => m.unread).length} غير مقروءة
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {messages.map(message => (
          <div key={message.id} className={`bg-white rounded-xl shadow-lg p-6 border-2 ${
            message.unread ? 'border-blue-500' : 'border-transparent'
          }`}>
            <div className="flex justify-between items-start mb-4">
              <div>
                <h4 className="font-bold text-gray-900">{message.sender}</h4>
                <p className="text-sm text-gray-600">{message.time}</p>
              </div>
              {message.unread && (
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              )}
            </div>
            
            <h5 className="font-bold text-gray-800 mb-2">{message.subject}</h5>
            <p className="text-gray-600 text-sm mb-4">{message.message}</p>
            
            <div className="flex gap-2">
              <button className="flex-1 bg-blue-600 text-white py-2 rounded-lg text-sm font-bold hover:bg-blue-700">
                رد
              </button>
              <button className="px-3 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50">
                أرشفة
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderPOS = () => {
    const addToCart = (product: typeof products[0]) => {
      const existingItem = cartItems.find(item => item.id === product.id);
      if (existingItem) {
        setCartItems(cartItems.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ));
      } else {
        setCartItems([...cartItems, { ...product, quantity: 1 }]);
      }
      updateCartTotal();
    };

    const removeFromCart = (productId: number) => {
      setCartItems(cartItems.filter(item => item.id !== productId));
      updateCartTotal();
    };

    const updateQuantity = (productId: number, quantity: number) => {
      if (quantity <= 0) {
        removeFromCart(productId);
      } else {
        setCartItems(cartItems.map(item => 
          item.id === productId 
            ? { ...item, quantity }
            : item
        ));
        updateCartTotal();
      }
    };

    const updateCartTotal = () => {
      const total = cartItems.reduce((sum, item) => {
        const price = parseInt(item.price.replace(' ج/كجم', '').replace(' ج/لتر', '').replace(' ج/علبة', ''));
        return sum + (price * item.quantity);
      }, 0);
      setCartTotal(total);
    };

    const processPayment = () => {
      alert(`تمت معالجة الدفع بنجاح! المبلغ: ${cartTotal} ج`);
      setCartItems([]);
      setCartTotal(0);
      setCustomerName('');
    };

    return (
      <div className="space-y-6">
        {/* Mobile View - Single Column */}
        <div className="lg:hidden space-y-6">
          {/* Cart First on Mobile */}
          <div className="bg-white rounded-xl shadow-lg p-4">
            <h3 className="text-lg font-bold text-gray-900 mb-4">السلة</h3>
            
            <div className="mb-4">
              <input
                type="text"
                placeholder="اسم العميل"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg"
              />
            </div>

            <div className="space-y-3 mb-6 max-h-48 overflow-y-auto">
              {cartItems.map(item => (
                <div key={item.id} className="flex justify-between items-center border-b pb-3">
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm">{item.name}</h4>
                    <p className="text-xs text-gray-600">{item.price} × {item.quantity}</p>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
              {cartItems.length === 0 && (
                <p className="text-gray-500 text-center py-4">السلة فارغة</p>
              )}
            </div>

            <div className="border-t pt-4">
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setPaymentMethod('cash')}
                  className={`p-3 rounded-lg border-2 transition ${
                    paymentMethod === 'cash' 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-300'
                  }`}
                >
                  <DollarSign className="w-5 h-5 mx-auto mb-1" />
                  <span className="text-xs">نقداً</span>
                </button>
                <button
                  onClick={() => setPaymentMethod('card')}
                  className={`p-3 rounded-lg border-2 transition ${
                    paymentMethod === 'card' 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-300'
                  }`}
                >
                  <CreditCard className="w-5 h-5 mx-auto mb-1" />
                  <span className="text-xs">بطاقة</span>
                </button>
              </div>
            </div>

            {/* Total */}
            <div className="border-t pt-4 mb-6">
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg font-bold">الإجمالي:</span>
                <span className="text-2xl font-bold text-blue-600">{cartTotal} ج</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2">
              <button
                onClick={processPayment}
                className="w-full bg-green-600 text-white py-3 rounded-lg font-bold hover:bg-green-700 transition flex items-center justify-center gap-2"
              >
                <CreditCard className="w-5 h-5" />
                إتمام الدفع
              </button>
              <button className="w-full bg-gray-200 text-gray-700 py-3 rounded-lg font-bold hover:bg-gray-300 transition flex items-center justify-center gap-2">
                <Receipt className="w-5 h-5" />
                طباعة فاتورة
              </button>
            </div>
          </div>

          {/* Products */}
          <div className="bg-white rounded-xl shadow-lg p-4">
            <h3 className="text-lg font-bold text-gray-900 mb-4">المنتجات</h3>
            <div className="grid grid-cols-2 gap-3">
              {products.map(product => (
                <button
                  key={product.id}
                  onClick={() => addToCart(product)}
                  className="border rounded-lg p-3 hover:bg-blue-50 transition text-right"
                >
                  <h4 className="font-bold text-gray-900 text-sm">{product.name}</h4>
                  <p className="text-xs text-gray-600">{product.price}</p>
                  <p className="text-xs text-gray-500">المخزون: {product.stock}</p>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Desktop View - Two Columns */}
        <div className="hidden lg:grid lg:grid-cols-3 gap-6">
          {/* Products */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6">المنتجات</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {products.map(product => (
                  <button
                    key={product.id}
                    onClick={() => addToCart(product)}
                    className="border rounded-lg p-4 hover:bg-blue-50 transition text-right"
                  >
                    <h4 className="font-bold text-gray-900">{product.name}</h4>
                    <p className="text-sm text-gray-600">{product.price}</p>
                    <p className="text-xs text-gray-500">المخزون: {product.stock}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Cart */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6">السلة</h3>
              
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="اسم العميل"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                />
              </div>

              <div className="space-y-3 mb-6 max-h-64 overflow-y-auto">
                {cartItems.map(item => (
                  <div key={item.id} className="flex justify-between items-center border-b pb-3">
                    <div>
                      <h4 className="font-bold text-gray-900">{item.name}</h4>
                      <p className="text-sm text-gray-600">{item.price} × {item.quantity}</p>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                {cartItems.length === 0 && (
                  <p className="text-gray-500 text-center py-4">السلة فارغة</p>
                )}
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-bold">الإجمالي:</span>
                  <span className="text-2xl font-bold text-blue-600">{cartTotal} ج</span>
                </div>

                <div className="space-y-3">
                  <select
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                  >
                    <option value="cash">نقداً</option>
                    <option value="card">بطاقة</option>
                    <option value="transfer">تحويل بنكي</option>
                  </select>

                  <button
                    onClick={processPayment}
                    disabled={cartItems.length === 0}
                    className="w-full bg-green-600 text-white py-3 rounded-lg font-bold hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
                  >
                    معالجة الدفع
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderAnalytics = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold text-gray-900">التحليلات والتقارير</h3>
        <div className="flex gap-2">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-blue-700 flex items-center gap-2">
            <Download className="w-4 h-4" />
            تصدير تقرير
          </button>
          <button className="bg-purple-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-purple-700 flex items-center gap-2">
            <FileText className="w-4 h-4" />
            إنشاء تقرير مخصص
          </button>
        </div>
      </div>
      
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl p-6">
          <div className="flex items-center justify-between mb-2">
            <TrendingUp className="w-8 h-8" />
            <span className="text-2xl font-bold">+23%</span>
          </div>
          <h4 className="text-lg font-bold">معدل النمو</h4>
          <p className="text-sm opacity-90">مقارنة بالشهر الماضي</p>
        </div>
        
        <div className="bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl p-6">
          <div className="flex items-center justify-between mb-2">
            <DollarSign className="w-8 h-8" />
            <span className="text-2xl font-bold">285ج</span>
          </div>
          <h4 className="text-lg font-bold">متوسط قيمة الطلب</h4>
          <p className="text-sm opacity-90">زيادة بنسبة 12%</p>
        </div>
        
        <div className="bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-xl p-6">
          <div className="flex items-center justify-between mb-2">
            <Users className="w-8 h-8" />
            <span className="text-2xl font-bold">89%</span>
          </div>
          <h4 className="text-lg font-bold">رضا العملاء</h4>
          <p className="text-sm opacity-90">بناء على 156 تقييم</p>
        </div>
        
        <div className="bg-gradient-to-r from-orange-600 to-orange-700 text-white rounded-xl p-6">
          <div className="flex items-center justify-between mb-2">
            <Target className="w-8 h-8" />
            <span className="text-2xl font-bold">94%</span>
          </div>
          <h4 className="text-lg font-bold">تحقيق الأهداف</h4>
          <p className="text-sm opacity-90">هدف الشهر تحقق</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h4 className="font-bold text-gray-900">إيرادات 6 أشهر</h4>
            <select className="text-sm border rounded-lg px-3 py-1">
              <option>إيرادات</option>
              <option>طلبات</option>
              <option>عملاء</option>
            </select>
          </div>
          <div className="h-64 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg flex items-end justify-around p-4">
            {analyticsData.map((data, index) => (
              <div key={index} className="flex flex-col items-center gap-2">
                <div 
                  className="w-10 bg-gradient-to-t from-blue-600 to-purple-600 rounded-t"
                  style={{ height: `${(data.revenue / 25000) * 200}px` }}
                />
                <span className="text-xs text-gray-600 font-bold">{data.month.slice(0, 3)}</span>
                <span className="text-xs text-gray-500">{data.revenue.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>
        
        {/* Top Products */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h4 className="font-bold text-gray-900 mb-4">أكثر المنتجات مبيعاً</h4>
          <div className="space-y-3">
            {products.slice(0, 5).map((product, index) => (
              <div key={product.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                    index === 0 ? 'bg-yellow-500 text-white' :
                    index === 1 ? 'bg-gray-400 text-white' :
                    index === 2 ? 'bg-orange-600 text-white' :
                    'bg-blue-100 text-blue-600'
                  }`}>
                    {index + 1}
                  </div>
                  <div>
                    <span className="font-medium text-gray-900">{product.name}</span>
                    <p className="text-xs text-gray-500">{product.price}</p>
                  </div>
                </div>
                <div className="text-left">
                  <p className="font-bold text-gray-900">{product.orders} طلب</p>
                  <p className="text-xs text-gray-500">هذا الشهر</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Customer Analytics */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h4 className="font-bold text-gray-900 mb-4">تحليل العملاء</h4>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">العملاء الجدد</span>
              <span className="font-bold text-green-600">+23</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">العملاء العائدون</span>
              <span className="font-bold text-blue-600">67%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">متوسط الطلبات/العميل</span>
              <span className="font-bold text-purple-600">4.2</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">قيمة العميل مدى الحياة</span>
              <span className="font-bold text-orange-600">1,250ج</span>
            </div>
          </div>
        </div>
        
        {/* Performance Indicators */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h4 className="font-bold text-gray-900 mb-4">مؤشرات الأداء</h4>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm text-gray-600">معدل التحويل</span>
                <span className="text-sm font-bold">78%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-600 h-2 rounded-full" style={{ width: '78%' }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm text-gray-600">رضا العملاء</span>
                <span className="text-sm font-bold">89%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: '89%' }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm text-gray-600">كفاءة التسليم</span>
                <span className="text-sm font-bold">94%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-purple-600 h-2 rounded-full" style={{ width: '94%' }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm text-gray-600">جودة المنتجات</span>
                <span className="text-sm font-bold">96%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-orange-600 h-2 rounded-full" style={{ width: '96%' }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Mobile Header */}
          <div className="lg:hidden">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => router.push('/suppliers')}
                  className="text-gray-600 hover:text-gray-900 transition"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <div>
                  <h1 className="text-lg font-bold text-gray-900 truncate">{supplierData.name}</h1>
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3 text-yellow-500" />
                    <span className="text-xs text-gray-600">{supplierData.rating}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setShowNotifications(true)}
                  className="relative p-2 text-gray-600 hover:text-gray-900"
                >
                  <Bell className="w-4 h-4" />
                  {supplierData.messages > 0 && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                      {supplierData.messages}
                    </span>
                  )}
                </button>
                
                <button 
                  onClick={() => setShowSettingsModal(true)}
                  className="p-2 text-gray-600 hover:text-gray-900"
                >
                  <Settings className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            {/* Mobile Search Bar */}
            <div className="pb-3">
              <div className="relative">
                <input
                  type="text"
                  placeholder="بحث..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm"
                />
                <Search className="absolute right-3 top-2.5 w-4 h-4 text-gray-400" />
              </div>
            </div>
          </div>
          
          {/* Desktop Header */}
          <div className="hidden lg:flex justify-between items-center h-16">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => router.push('/suppliers')}
                className="text-gray-600 hover:text-gray-900 transition"
              >
                ← العودة
              </button>
              <div>
                <h1 className="text-xl font-bold text-gray-900">{supplierData.name}</h1>
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-yellow-500" />
                  <span className="text-sm text-gray-600">{supplierData.rating}</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="بحث..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm"
                />
                <Search className="absolute right-3 top-2.5 w-4 h-4 text-gray-400" />
              </div>
              
              <button 
                onClick={() => setShowNotifications(true)}
                className="relative p-2 text-gray-600 hover:text-gray-900"
              >
                <Bell className="w-5 h-5" />
                {supplierData.messages > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    {supplierData.messages}
                  </span>
                )}
              </button>
              
              <div className="relative">
                <button 
                  onClick={() => setShowProfileModal(!showProfileModal)}
                  className="flex items-center gap-2 p-2 text-gray-600 hover:text-gray-900"
                >
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-white" />
                  </div>
                  <ChevronDown className={`w-4 h-4 transition-transform ${showProfileModal ? 'rotate-180' : ''}`} />
                </button>
                
                {showProfileModal && (
                  <div className="absolute left-0 top-full mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                    <div className="p-4 border-b">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                          <User className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="font-bold text-gray-900">مدير النظام</p>
                          <p className="text-sm text-gray-600">admin@supplier.com</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="py-2">
                      <button 
                        onClick={() => {
                          setActiveSettingsTab('profile');
                          setShowSettingsModal(true);
                        }}
                        className="w-full text-right px-4 py-2 hover:bg-gray-50 flex items-center gap-3"
                      >
                        <User className="w-4 h-4" />
                        <span className="text-sm">الملف الشخصي</span>
                      </button>
                      <button 
                        onClick={() => setShowSettingsModal(true)}
                        className="w-full text-right px-4 py-2 hover:bg-gray-50 flex items-center gap-3"
                      >
                        <Settings className="w-4 h-4" />
                        <span className="text-sm">الإعدادات</span>
                      </button>
                      <button 
                        onClick={() => setShowHelpModal(true)}
                        className="w-full text-right px-4 py-2 hover:bg-gray-50 flex items-center gap-3"
                      >
                        <HelpCircle className="w-4 h-4" />
                        <span className="text-sm">المساعدة</span>
                      </button>
                      <hr className="my-2" />
                      <button 
                        onClick={() => {
                          if (confirm('هل أنت متأكد من تسجيل الخروج؟')) {
                            router.push('/login');
                          }
                        }}
                        className="w-full text-right px-4 py-2 hover:bg-gray-50 flex items-center gap-3 text-red-600"
                      >
                        <LogOut className="w-4 h-4" />
                        <span className="text-sm">تسجيل الخروج</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Mobile Dropdown */}
          <div className="lg:hidden">
            <select
              value={activeTab}
              onChange={(e) => setActiveTab(e.target.value)}
              className="w-full py-3 px-4 border border-gray-300 rounded-lg text-gray-900 font-medium"
            >
              <option value="overview">نظرة عامة</option>
              <option value="products">المنتجات</option>
              <option value="orders">الطلبات</option>
              <option value="pos">نقطة البيع</option>
              <option value="messages">الرسائل</option>
              <option value="analytics">التحليلات</option>
            </select>
          </div>
          
          {/* Desktop Tabs */}
          <div className="hidden lg:flex gap-8 overflow-x-auto">
            {[
              { id: 'overview', label: 'نظرة عامة', icon: BarChart3 },
              { id: 'products', label: 'المنتجات', icon: Package },
              { id: 'orders', label: 'الطلبات', icon: ShoppingCart },
              { id: 'pos', label: 'نقطة البيع', icon: CreditCard },
              { id: 'messages', label: 'الرسائل', icon: MessageSquare },
              { id: 'analytics', label: 'التحليلات', icon: TrendingUp }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 py-4 border-b-2 transition whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span className="font-medium">{tab.label}</span>
                {tab.id === 'messages' && supplierData.messages > 0 && (
                  <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                    {supplierData.messages}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'overview' && renderOverview()}
        {activeTab === 'products' && renderProducts()}
        {activeTab === 'orders' && renderOrders()}
        {activeTab === 'pos' && renderPOS()}
        {activeTab === 'messages' && renderMessages()}
        {activeTab === 'analytics' && renderAnalytics()}
      </main>

      {/* Enhanced Add Product Modal */}
      {showAddProductModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900">إضافة منتج جديد</h3>
              <button 
                onClick={() => setShowAddProductModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Basic Information */}
              <div className="space-y-4">
                <h4 className="font-bold text-gray-900">المعلومات الأساسية</h4>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">اسم المنتج *</label>
                  <input 
                    type="text" 
                    placeholder="أدخل اسم المنتج"
                    className="w-full border rounded-lg px-4 py-2"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">الفئة *</label>
                  <select className="w-full border rounded-lg px-4 py-2">
                    <option>اختر الفئة</option>
                    <option>مواد غذائية</option>
                    <option>مشروبات</option>
                    <option>معلبات</option>
                    <option>منتجات الألبان</option>
                    <option>توابل وبهارات</option>
                    <option>أخرى</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">وصف المنتج</label>
                  <textarea 
                    rows={4}
                    placeholder="أدخل وصفاً تفصيلياً للمنتج"
                    className="w-full border rounded-lg px-4 py-2"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">المكونات</label>
                  <textarea 
                    rows={3}
                    placeholder="أدخل المكونات الرئيسية"
                    className="w-full border rounded-lg px-4 py-2"
                  />
                </div>
              </div>
              
              {/* Pricing and Inventory */}
              <div className="space-y-4">
                <h4 className="font-bold text-gray-900">التسعير والمخزون</h4>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">سعر الوحدة *</label>
                    <input 
                      type="number" 
                      placeholder="0.00"
                      className="w-full border rounded-lg px-4 py-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">العملة</label>
                    <select className="w-full border rounded-lg px-4 py-2">
                      <option>جنيه مصري</option>
                      <option>دولار أمريكي</option>
                      <option>يورو</option>
                    </select>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">الكمية المتاحة *</label>
                    <input 
                      type="number" 
                      placeholder="0"
                      className="w-full border rounded-lg px-4 py-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">وحدة القياس</label>
                    <select className="w-full border rounded-lg px-4 py-2">
                      <option>كجم</option>
                      <option>لتر</option>
                      <option>علبة</option>
                      <option>قطعة</option>
                      <option>طن</option>
                    </select>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">الحد الأدنى للطلب</label>
                    <input 
                      type="number" 
                      placeholder="1"
                      className="w-full border rounded-lg px-4 py-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">الحد الأقصى للطلب</label>
                    <input 
                      type="number" 
                      placeholder="1000"
                      className="w-full border rounded-lg px-4 py-2"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">حالة المنتج</label>
                  <select className="w-full border rounded-lg px-4 py-2">
                    <option>نشط</option>
                    <option>غير نشط</option>
                    <option>مؤقت</option>
                  </select>
                </div>
              </div>
            </div>
            
            {/* Product Images */}
            <div className="mt-6 space-y-4">
              <h4 className="font-bold text-gray-900">صور المنتج</h4>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">إضافة صورة</p>
                </div>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">إضافة صورة</p>
                </div>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">إضافة صورة</p>
                </div>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">إضافة صورة</p>
                </div>
              </div>
            </div>
            
            {/* Additional Settings */}
            <div className="mt-6 space-y-4">
              <h4 className="font-bold text-gray-900">إعدادات إضافية</h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h5 className="font-medium text-gray-900">عرض في الصفحة العامة</h5>
                    <p className="text-sm text-gray-600">إظهار المنتج للعملاء</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" defaultChecked className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h5 className="font-medium text-gray-900">تنبيه المخزون المنخفض</h5>
                    <p className="text-sm text-gray-600">إشعار عند انخفاض المخزون</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" defaultChecked className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">الكلمات المفتاحية</label>
                <input 
                  type="text" 
                  placeholder="كلمات مفتاحية للبحث (افصل بينها بفاصلة)"
                  className="w-full border rounded-lg px-4 py-2"
                />
              </div>
            </div>
            
            <div className="flex gap-3 mt-6 pt-6 border-t">
              <button className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700">
                حفظ المنتج
              </button>
              <button className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg font-bold hover:bg-gray-300">
                حفظ كمسودة
              </button>
              <button 
                onClick={() => setShowAddProductModal(false)}
                className="bg-red-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-red-700"
              >
                إلغاء
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Inventory Modal */}
      {showInventoryModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold text-gray-900 mb-4">إدارة المخزون</h3>
            <div className="space-y-4">
              {editableProducts.map(product => (
                <div key={product.id} className="flex items-center justify-between border rounded-lg p-4">
                  <div>
                    <h4 className="font-bold">{product.name}</h4>
                    <p className="text-sm text-gray-600">المخزون الحالي: {product.stock}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => updateProductStock(product.id, -10)}
                      className="w-8 h-8 bg-red-100 text-red-600 rounded-full hover:bg-red-200 transition"
                    >
                      -
                    </button>
                    <span className="w-16 text-center font-bold">{product.stock}</span>
                    <button 
                      onClick={() => updateProductStock(product.id, 10)}
                      className="w-8 h-8 bg-green-100 text-green-600 rounded-full hover:bg-green-200 transition"
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <button 
              onClick={() => setShowInventoryModal(false)}
              className="w-full bg-gray-200 text-gray-700 py-2 rounded-lg font-bold mt-6"
            >
              إغلاق
            </button>
          </div>
        </div>
      )}

      {/* Settings Modal */}
      {showSettingsModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900">إعدادات المورد</h3>
              <button 
                onClick={() => setShowSettingsModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Sidebar Navigation */}
              <div className="lg:col-span-1">
                <nav className="space-y-2">
                  {[
                    { id: 'profile', label: 'الملف الشخصي', icon: User },
                    { id: 'public', label: 'الصفحة العامة', icon: Eye },
                    { id: 'products', label: 'إدارة المنتجات', icon: Package },
                    { id: 'notifications', label: 'الإشعارات', icon: Bell },
                    { id: 'devices', label: 'الأجهزة', icon: Smartphone },
                    { id: 'security', label: 'الأمان', icon: Shield },
                    { id: 'billing', label: 'الفواتير', icon: CreditCard }
                  ].map(item => (
                    <button
                      key={item.id}
                      className={`w-full text-right px-4 py-3 rounded-lg flex items-center gap-3 transition ${
                        activeSettingsTab === item.id
                          ? 'bg-blue-50 text-blue-600 border-r-4 border-blue-600'
                          : 'hover:bg-gray-50 text-gray-700'
                      }`}
                      onClick={() => setActiveSettingsTab(item.id)}
                    >
                      <item.icon className="w-5 h-5" />
                      <span className="font-medium">{item.label}</span>
                    </button>
                  ))}
                </nav>
              </div>
              
              {/* Content Area */}
              <div className="lg:col-span-2">
                {activeSettingsTab === 'profile' && (
                  <div className="space-y-6">
                    <h4 className="text-lg font-bold text-gray-900">الملف الشخصي</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">اسم الشركة</label>
                        <input 
                          type="text" 
                          defaultValue={supplierData.name}
                          className="w-full border rounded-lg px-4 py-2"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">البريد الإلكتروني</label>
                        <input 
                          type="email" 
                          defaultValue="supplier@company.com"
                          className="w-full border rounded-lg px-4 py-2"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">رقم الهاتف</label>
                        <input 
                          type="tel" 
                          defaultValue="+20 123 456 7890"
                          className="w-full border rounded-lg px-4 py-2"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">العنوان</label>
                        <input 
                          type="text" 
                          defaultValue="القاهرة، مصر"
                          className="w-full border rounded-lg px-4 py-2"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">وصف الشركة</label>
                      <textarea 
                        rows={4}
                        defaultValue="شركة رائدة في توريد المواد الغذائية للفنادق والمطاعم والمؤسسات"
                        className="w-full border rounded-lg px-4 py-2"
                      />
                    </div>
                  </div>
                )}
                
                {activeSettingsTab === 'public' && (
                  <div className="space-y-6">
                    <h4 className="text-lg font-bold text-gray-900">إعدادات الصفحة العامة</h4>
                    
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h5 className="font-bold text-blue-900">معاينة الصفحة العامة</h5>
                        <button 
                          onClick={() => window.open('/suppliers/nour-foods', '_blank')}
                          className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-blue-700 flex items-center gap-2"
                        >
                          <Eye className="w-4 h-4" />
                          معاينة
                        </button>
                      </div>
                      <p className="text-blue-700 text-sm">رابط صفحتك: /suppliers/nour-foods</p>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h5 className="font-medium text-gray-900">تفعيل الصفحة العامة</h5>
                          <p className="text-sm text-gray-600">اجعل صفحتك متاحة للعملاء</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" defaultChecked className="sr-only peer" />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                      

                      <div className="flex items-center justify-between">
                        <div>
                          <h5 className="font-medium text-gray-900">عرض الأسعار</h5>
                          <p className="text-sm text-gray-600">إظهار الأسعار للعملاء</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" defaultChecked className="sr-only peer" />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                      

                      <div className="flex items-center justify-between">
                        <div>
                          <h5 className="font-medium text-gray-900">التواصل المباشر</h5>
                          <p className="text-sm text-gray-600">السماح للعملاء بالتواصل المباشر</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" defaultChecked className="sr-only peer" />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                      

                      <div className="flex items-center justify-between">
                        <div>
                          <h5 className="font-medium text-gray-900">عرض التقييمات</h5>
                          <p className="text-sm text-gray-600">إظهار تقييمات العملاء</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" defaultChecked className="sr-only peer" />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">شعار الشركة</label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                        <Upload className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                        <p className="text-gray-600">اسحب وأفلت الصورة هنا أو</p>
                        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-blue-700 mt-2">
                          اختر ملف
                        </button>
                      </div>
                    </div>
                  </div>
                )}
                
                {activeSettingsTab === 'products' && (
                  <div className="space-y-6">
                    <h4 className="text-lg font-bold text-gray-900">إدارة المنتجات</h4>
                    
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                      <h5 className="font-bold text-yellow-900 mb-2">نصائح لتحسين المنتجات</h5>
                      <ul className="text-yellow-800 text-sm space-y-1">
                        <li>• أضف صوراً عالية الجودة للمنتجات</li>
                        <li>• اكتب أوصافاً تفصيلية ومفيدة</li>
                        <li>• حدد الأسعار التنافسية</li>
                        <li>• حدد الكميات المتاحة بدقة</li>
                      </ul>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h5 className="font-medium text-gray-900">المنتجات تلقائياً نشطة</h5>
                          <p className="text-sm text-gray-600">تفعيل المنتجات الجديدة تلقائياً</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" defaultChecked className="sr-only peer" />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                      

                      <div className="flex items-center justify-between">
                        <div>
                          <h5 className="font-medium text-gray-900">تنبيه المخزون المنخفض</h5>
                          <p className="text-sm text-gray-600">إشعارات عند انخفاض المخزون</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" defaultChecked className="sr-only peer" />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">حدود المخزون المنخفض</label>
                      <input 
                        type="number" 
                        defaultValue="100"
                        className="w-full border rounded-lg px-4 py-2"
                        placeholder="الكمية التي تعتبر مخزون منخفض"
                      />
                    </div>
                  </div>
                )}
                
                {activeSettingsTab === 'notifications' && (
                  <div className="space-y-6">
                    <h4 className="text-lg font-bold text-gray-900">الإشعارات</h4>
                    
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h5 className="font-medium text-gray-900">الطلبات الجديدة</h5>
                          <p className="text-sm text-gray-600">إشعارات عند وصول طلبات جديدة</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" defaultChecked className="sr-only peer" />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                      

                      <div className="flex items-center justify-between">
                        <div>
                          <h5 className="font-medium text-gray-900">الرسائل الجديدة</h5>
                          <p className="text-sm text-gray-600">إشعارات عند استلام رسائل جديدة</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" defaultChecked className="sr-only peer" />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                      

                      <div className="flex items-center justify-between">
                        <div>
                          <h5 className="font-medium text-gray-900">المخزون المنخفض</h5>
                          <p className="text-sm text-gray-600">تنبيهات عند انخفاض المخزون</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" defaultChecked className="sr-only peer" />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                      

                      <div className="flex items-center justify-between">
                        <div>
                          <h5 className="font-medium text-gray-900">النشرة البريدية</h5>
                          <p className="text-sm text-gray-600">تلقي تحديثات وعروض خاصة</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                    </div>
                  </div>
                )}
                
                {activeSettingsTab === 'devices' && (
                  <div className="space-y-6">
                    <h4 className="text-lg font-bold text-gray-900">الأجهزة المتصلة</h4>
                    
                    <div className="space-y-3">
                      <div className="flex items-center justify-between border rounded-lg p-4">
                        <div className="flex items-center gap-3">
                          <Printer className="w-5 h-5 text-blue-600" />
                          <div>
                            <p className="font-medium">طابعة الطرود</p>
                            <p className="text-sm text-gray-600">HP LaserJet Pro</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                          <span className="text-sm text-green-600">متصل</span>
                        </div>
                      </div>
                      

                      <div className="flex items-center justify-between border rounded-lg p-4">
                        <div className="flex items-center gap-3">
                          <Smartphone className="w-5 h-5 text-purple-600" />
                          <div>
                            <p className="font-medium">جوال المندوب</p>
                            <p className="text-sm text-gray-600">iPhone 12 Pro</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                          <span className="text-sm text-green-600">متصل</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="border-t pt-4">
                      <h5 className="font-medium text-gray-900 mb-3">وضع المندوب</h5>
                      <button 
                        onClick={() => setIsMobilePOS(!isMobilePOS)}
                        className={`w-full py-3 rounded-lg font-bold transition ${
                          isMobilePOS 
                            ? 'bg-green-600 text-white' 
                            : 'bg-gray-200 text-gray-700'
                        }`}
                      >
                        {isMobilePOS ? 'إيقاف وضع المندوب' : 'تفعيل وضع المندوب'}
                      </button>
                      <p className="text-sm text-gray-600 mt-2">
                        {isMobilePOS 
                          ? 'الجوال يعمل كجهاز نقطة بيع متنقل' 
                          : 'تفعيل للسماح بالعمل من خارج المكتب'
                        }
                      </p>
                    </div>
                  </div>
                )}
                
                {activeSettingsTab === 'security' && (
                  <div className="space-y-6">
                    <h4 className="text-lg font-bold text-gray-900">الأمان والخصوصية</h4>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">تغيير كلمة المرور</label>
                        <input 
                          type="password" 
                          placeholder="كلمة المرور الحالية"
                          className="w-full border rounded-lg px-4 py-2 mb-2"
                        />
                        <input 
                          type="password" 
                          placeholder="كلمة المرور الجديدة"
                          className="w-full border rounded-lg px-4 py-2 mb-2"
                        />
                        <input 
                          type="password" 
                          placeholder="تأكيد كلمة المرور الجديدة"
                          className="w-full border rounded-lg px-4 py-2"
                        />
                      </div>
                      

                      <div className="flex items-center justify-between">
                        <div>
                          <h5 className="font-medium text-gray-900">التحقق بخطوتين</h5>
                          <p className="text-sm text-gray-600">إضافة طبقة أمان إضافية</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                      

                      <div className="flex items-center justify-between">
                        <div>
                          <h5 className="font-medium text-gray-900">تسجيل الدخول التلقائي</h5>
                          <p className="text-sm text-gray-600">تذكر الجلسة على هذا الجهاز</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" defaultChecked className="sr-only peer" />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                    </div>
                  </div>
                )}
                
                {activeSettingsTab === 'billing' && (
                  <div className="space-y-6">
                    <h4 className="text-lg font-bold text-gray-900">الفواتير والدفع</h4>
                    
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <h5 className="font-bold text-green-900">حسابك الحالي</h5>
                      <p className="text-green-800">خطة احترافية - 99 ج/شهر</p>
                      <p className="text-green-600 text-sm">التجديد: 1 يناير 2026</p>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">طريقة الدفع</label>
                        <select className="w-full border rounded-lg px-4 py-2">
                          <option>بطاقة ائتمان</option>
                          <option>تحويل بنكي</option>
                          <option>محفظة إلكترونية</option>
                        </select>
                      </div>
                      

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">الفواتير</label>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between border rounded-lg p-3">
                            <div>
                              <p className="font-medium">ديسمبر 2025</p>
                              <p className="text-sm text-gray-600">99 ج</p>
                            </div>
                            <button className="text-blue-600 hover:text-blue-700 text-sm font-bold">
                              تحميل
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex gap-3 mt-6 pt-6 border-t">
              <button className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700">
                حفظ التغييرات
              </button>
              <button 
                onClick={() => setShowSettingsModal(false)}
                className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg font-bold hover:bg-gray-300"
              >
                إلغاء
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Help Modal */}
      {showHelpModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900">مركز المساعدة</h3>
              <button 
                onClick={() => setShowHelpModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="space-y-6">
              {/* Quick Help */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-bold text-blue-900 mb-2">مساعدة سريعة</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <button className="bg-white p-3 rounded-lg text-right hover:shadow-md transition">
                    <h5 className="font-medium text-gray-900">كيفية إضافة منتج جديد؟</h5>
                    <p className="text-sm text-gray-600">خطوات إضافة منتجاتك</p>
                  </button>
                  <button className="bg-white p-3 rounded-lg text-right hover:shadow-md transition">
                    <h5 className="font-medium text-gray-900">إدارة الطلبات</h5>
                    <p className="text-sm text-gray-600">تتبع وتأكيد الطلبات</p>
                  </button>
                  <button className="bg-white p-3 rounded-lg text-right hover:shadow-md transition">
                    <h5 className="font-medium text-gray-900">إعدادات الحساب</h5>
                    <p className="text-sm text-gray-600">تخصيص إعداداتك</p>
                  </button>
                  <button className="bg-white p-3 rounded-lg text-right hover:shadow-md transition">
                    <h5 className="font-medium text-gray-900">الفواتير والدفع</h5>
                    <p className="text-sm text-gray-600">إدارة الاشتراكات</p>
                  </button>
                </div>
              </div>
              
              {/* Contact Support */}
              <div>
                <h4 className="font-bold text-gray-900 mb-3">تواصل مع الدعم الفني</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white border rounded-lg p-4 text-center hover:shadow-md transition">
                    <Phone className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                    <h5 className="font-medium text-gray-900">هاتف</h5>
                    <p className="text-sm text-gray-600">+20 123 456 789</p>
                    <p className="text-xs text-gray-500">9:00 - 5:00</p>
                  </div>
                  <div className="bg-white border rounded-lg p-4 text-center hover:shadow-md transition">
                    <Mail className="w-8 h-8 text-green-600 mx-auto mb-2" />
                    <h5 className="font-medium text-gray-900">بريد إلكتروني</h5>
                    <p className="text-sm text-gray-600">support@ray-egypt.com</p>
                    <p className="text-xs text-gray-500">رد خلال 24 ساعة</p>
                  </div>
                  <div className="bg-white border rounded-lg p-4 text-center hover:shadow-md transition">
                    <MessageSquare className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                    <h5 className="font-medium text-gray-900">دردشة مباشرة</h5>
                    <p className="text-sm text-gray-600">متاح الآن</p>
                    <p className="text-xs text-gray-500">استجابة فورية</p>
                  </div>
                </div>
              </div>
              
              {/* FAQ */}
              <div>
                <h4 className="font-bold text-gray-900 mb-3">الأسئلة الشائعة</h4>
                <div className="space-y-3">
                  <details className="bg-white border rounded-lg p-4">
                    <summary className="font-medium text-gray-900 cursor-pointer">كيف يمكنني تغيير سعر منتج؟</summary>
                    <p className="text-sm text-gray-600 mt-2">اذهب إلى قسم المنتجات، اختر المنتج المطلوب، ثم اضغط على زر تعديل لتغيير السعر.</p>
                  </details>
                  <details className="bg-white border rounded-lg p-4">
                    <summary className="font-medium text-gray-900 cursor-pointer">ما هي طريقة الدفع المتاحة؟</summary>
                    <p className="text-sm text-gray-600 mt-2">نقبل الدفع عبر البطاقات الائتمانية، التحويل البنكي، والمحافظ الإلكترونية.</p>
                  </details>
                  <details className="bg-white border rounded-lg p-4">
                    <summary className="font-medium text-gray-900 cursor-pointer">كيف أعمل نسخ احتياطي لبياناتي؟</summary>
                    <p className="text-sm text-gray-600 mt-2">يمكنك تصدير بياناتك من قسم الإعدادات {'>'} الفواتير {'>'} تنزيل النسخ الاحتياطي.</p>
                  </details>
                </div>
              </div>
              
              {/* Resources */}
              <div>
                <h4 className="font-bold text-gray-900 mb-3">موارد تعليمية</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <a href="#" className="flex items-center gap-3 p-3 bg-white border rounded-lg hover:shadow-md transition">
                    <FileText className="w-5 h-5 text-blue-600" />
                    <div className="text-right">
                      <h5 className="font-medium text-gray-900">دليل المستخدم</h5>
                      <p className="text-sm text-gray-600">PDF - 2.5 MB</p>
                    </div>
                  </a>
                  <a href="#" className="flex items-center gap-3 p-3 bg-white border rounded-lg hover:shadow-md transition">
                    <Play className="w-5 h-5 text-red-600" />
                    <div className="text-right">
                      <h5 className="font-medium text-gray-900">فيديوهات تعليمية</h5>
                      <p className="text-sm text-gray-600">15 فيديو</p>
                    </div>
                  </a>
                </div>
              </div>
            </div>
            
            <div className="flex gap-3 mt-6 pt-6 border-t">
              <button className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700">
                إرسال تذكرة دعم
              </button>
              <button 
                onClick={() => setShowHelpModal(false)}
                className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg font-bold hover:bg-gray-300"
              >
                إغلاق
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Notifications Panel */}
      {showNotifications && (
        <div className="fixed top-16 left-4 w-80 bg-white rounded-xl shadow-lg z-50 max-h-96 overflow-y-auto">
          <div className="p-4 border-b">
            <h3 className="font-bold text-gray-900">الإشعارات</h3>
          </div>
          <div className="p-4 space-y-3">
            <div className="bg-blue-50 p-3 rounded-lg">
              <h4 className="font-bold text-blue-900">طلب جديد</h4>
              <p className="text-sm text-blue-700">مطعم الأصالة طلب 50 كجم دقيق</p>
              <span className="text-xs text-blue-600">منذ 5 دقائق</span>
            </div>
            <div className="bg-green-50 p-3 rounded-lg">
              <h4 className="font-bold text-green-900">تم التسليم</h4>
              <p className="text-sm text-green-700">فندق النيل تم تسليم الطلب</p>
              <span className="text-xs text-green-600">منذ ساعة</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
