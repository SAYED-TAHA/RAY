'use client';

import React, { useState } from 'react';
import { 
  Globe, Users, ShoppingCart, Package, TrendingUp, DollarSign,
  Activity, Shield, Settings, BarChart3, PieChart, Clock,
  AlertCircle, CheckCircle, XCircle, Eye, Download, RefreshCw,
  Server, Database, Wifi, Mail, Phone, MapPin, Building,
  Calendar, Filter, Search, ArrowUpRight, ArrowDownRight,
  Zap, Target, Award, Star, Heart, MessageSquare, FileText,
  Video, Briefcase, GraduationCap, CreditCard, Truck,
  Bell, Bookmark, HelpCircle, LogOut, Settings2, Image as ImageIcon
} from 'lucide-react';
import Link from 'next/link';

export default function AdminCentralHub() {
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [searchTerm, setSearchTerm] = useState('');

  const globalStats = {
    totalUsers: 15234,
    activeUsers: 8456,
    totalOrders: 45678,
    pendingOrders: 234,
    totalRevenue: 2456789,
    growth: 23.7,
    systemUptime: '99.9%',
    serverLoad: '45%',
    storageUsed: '67%',
    databaseConnections: 127,
    apiRequests: 1234567,
    errorRate: '0.1%',
    responseTime: '245ms'
  };

  const quickActions = [
    { id: 'users', title: 'إدارة المستخدمين', icon: Users, href: '/admin/users', color: 'bg-blue-100 text-blue-600', count: 15234 },
    { id: 'orders', title: 'الطلبات', icon: ShoppingCart, href: '/admin/orders', color: 'bg-green-100 text-green-600', count: 45678 },
    { id: 'products', title: 'المنتجات', icon: Package, href: '/admin/products', color: 'bg-purple-100 text-purple-600', count: 8923 },
    { id: 'payments', title: 'المدفوعات', icon: CreditCard, href: '/admin/payments', color: 'bg-yellow-100 text-yellow-600', count: 34567 },
    { id: 'messages', title: 'الرسائل', icon: MessageSquare, href: '/admin/messages', color: 'bg-red-100 text-red-600', count: 234 },
    { id: 'analytics', title: 'التحليلات', icon: BarChart3, href: '/admin/analytics', color: 'bg-indigo-100 text-indigo-600', count: null },
    { id: 'security', title: 'الأمان', icon: Shield, href: '/admin/security', color: 'bg-teal-100 text-teal-600', count: null },
    { id: 'settings', title: 'الإعدادات', icon: Settings, href: '/admin/settings', color: 'bg-gray-100 text-gray-600', count: null }
  ];

  const recentActivities = [
    { id: 1, type: 'user', action: 'مستخدم جديد', details: 'أحمد محمد سجل حساب جديد', time: '2 دقائق مضت', icon: Users, color: 'text-blue-600' },
    { id: 2, type: 'order', action: 'طلب جديد', details: 'طلب #12345 بقيمة 1,250 ج', time: '5 دقائق مضت', icon: ShoppingCart, color: 'text-green-600' },
    { id: 3, type: 'payment', action: 'دفع مكتمل', details: 'دفع ناجح لطلب #12344', time: '10 دقائق مضت', icon: CreditCard, color: 'text-yellow-600' },
    { id: 4, type: 'system', action: 'تحديث النظام', details: 'تم تحديث النظام إلى الإصدار 2.1.0', time: '15 دقيقة مضت', icon: RefreshCw, color: 'text-purple-600' },
    { id: 5, type: 'message', action: 'رسالة جديدة', details: 'رسالة من سارة أحمد', time: '20 دقيقة مضت', icon: MessageSquare, color: 'text-red-600' }
  ];

  const systemHealth = [
    { name: 'الخادم', status: 'online', load: '45%', icon: Server, color: 'text-green-600' },
    { name: 'قاعدة البيانات', status: 'online', connections: 127, icon: Database, color: 'text-green-600' },
    { name: 'الشبكة', status: 'online', bandwidth: '1.2 Gbps', icon: Wifi, color: 'text-green-600' },
    { name: 'API', status: 'online', requests: '1.2M/day', icon: Globe, color: 'text-green-600' }
  ];

  const topMetrics = [
    { name: 'معدل التحويل', value: '68.5%', change: '+2.3%', trend: 'up', icon: Target },
    { name: 'متوسط قيمة الطلب', value: '456 ج', change: '+12.5%', trend: 'up', icon: DollarSign },
    { name: 'معدل الاحتفاظ', value: '85.2%', change: '+1.8%', trend: 'up', icon: Users },
    { name: 'رضا العملاء', value: '4.8/5', change: '+0.3', trend: 'up', icon: Star }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link href="/admin" className="p-2 hover:bg-gray-100 rounded-lg transition">
                <Globe className="w-6 h-6 text-gray-600" />
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">المركز المركزي</h1>
                <p className="text-sm text-gray-600">نظرة شاملة على النظام</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="today">اليوم</option>
                <option value="week">هذا الأسبوع</option>
                <option value="month">هذا الشهر</option>
                <option value="year">هذا العام</option>
              </select>
              
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                <Download className="w-4 h-4" />
                تصدير تقرير
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Global Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <span className="text-sm text-green-600 font-medium">+12.5%</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">{globalStats.totalUsers.toLocaleString()}</h3>
            <p className="text-sm text-gray-600">إجمالي المستخدمين</p>
            <div className="mt-2 text-xs text-gray-500">{globalStats.activeUsers.toLocaleString()} نشط الآن</div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-green-100 rounded-lg">
                <ShoppingCart className="w-6 h-6 text-green-600" />
              </div>
              <span className="text-sm text-green-600 font-medium">+8.3%</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">{globalStats.totalOrders.toLocaleString()}</h3>
            <p className="text-sm text-gray-600">إجمالي الطلبات</p>
            <div className="mt-2 text-xs text-orange-600">{globalStats.pendingOrders} في الانتظار</div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <DollarSign className="w-6 h-6 text-yellow-600" />
              </div>
              <span className="text-sm text-green-600 font-medium">+{globalStats.growth}%</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">{globalStats.totalRevenue.toLocaleString()} ج</h3>
            <p className="text-sm text-gray-600">إجمالي الإيرادات</p>
            <div className="mt-2 text-xs text-gray-500">هذا الشهر</div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Activity className="w-6 h-6 text-purple-600" />
              </div>
              <span className="text-sm text-green-600 font-medium">{globalStats.systemUptime}</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">{globalStats.serverLoad}</h3>
            <p className="text-sm text-gray-600">حمل الخادم</p>
            <div className="mt-2 text-xs text-gray-500">متوسط 24 ساعة</div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 mb-8">
          <h3 className="text-lg font-bold text-gray-900 mb-6">إجراءات سريعة</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {quickActions.map((action) => (
              <Link
                key={action.id}
                href={action.href}
                className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition group"
              >
                <div className={`p-2 ${action.color} rounded-lg group-hover:scale-110 transition-transform`}>
                  <action.icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">{action.title}</h4>
                  {action.count && (
                    <p className="text-xs text-gray-600">{action.count.toLocaleString()}</p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Recent Activities */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-gray-900">النشاط الأخير</h3>
                <button className="text-sm text-blue-600 hover:text-blue-900">عرض الكل</button>
              </div>
              
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className={`p-2 bg-white rounded-lg ${activity.color}`}>
                      <activity.icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{activity.action}</h4>
                      <p className="text-sm text-gray-600">{activity.details}</p>
                      <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* System Health */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
              <h3 className="text-lg font-bold text-gray-900 mb-6">صحة النظام</h3>
              <div className="space-y-4">
                {systemHealth.map((system, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <system.icon className={`w-5 h-5 ${system.color}`} />
                      <div>
                        <h4 className="font-medium text-gray-900">{system.name}</h4>
                        <p className="text-xs text-gray-600">
                          {system.load || system.connections || system.bandwidth || system.requests}
                        </p>
                      </div>
                    </div>
                    <div className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      system.status === 'online' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {system.status === 'online' ? 'نشط' : 'غير نشط'}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Metrics */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
              <h3 className="text-lg font-bold text-gray-900 mb-6">أهم المؤشرات</h3>
              <div className="space-y-4">
                {topMetrics.map((metric, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <metric.icon className="w-4 h-4 text-gray-600" />
                      <span className="text-sm text-gray-600">{metric.name}</span>
                    </div>
                    <div className="text-right">
                      <div className="font-medium text-gray-900">{metric.value}</div>
                      <div className={`text-xs ${metric.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                        {metric.change}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Performance Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <h3 className="text-lg font-bold text-gray-900 mb-6">نظرة عامة على الأداء</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="w-4 h-4 text-yellow-600" />
                  <span className="text-sm text-gray-600">وقت الاستجابة</span>
                </div>
                <div className="text-2xl font-bold text-gray-900">{globalStats.responseTime}</div>
                <div className="text-xs text-green-600">أسرع بـ 15%</div>
              </div>
              
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertCircle className="w-4 h-4 text-red-600" />
                  <span className="text-sm text-gray-600">معدل الأخطاء</span>
                </div>
                <div className="text-2xl font-bold text-gray-900">{globalStats.errorRate}</div>
                <div className="text-xs text-green-600">أقل بـ 0.05%</div>
              </div>
              
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Database className="w-4 h-4 text-blue-600" />
                  <span className="text-sm text-gray-600">اتصالات قاعدة البيانات</span>
                </div>
                <div className="text-2xl font-bold text-gray-900">{globalStats.databaseConnections}</div>
                <div className="text-xs text-gray-600">نشط حالياً</div>
              </div>
              
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Globe className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-gray-600">طلبات API</span>
                </div>
                <div className="text-2xl font-bold text-gray-900">{(globalStats.apiRequests / 1000000).toFixed(1)}M</div>
                <div className="text-xs text-gray-600">يومياً</div>
              </div>
            </div>
          </div>

          {/* Storage Overview */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <h3 className="text-lg font-bold text-gray-900 mb-6">نظرة عامة على التخزين</h3>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">المستخدم</span>
                  <span className="text-sm font-medium text-gray-900">{globalStats.storageUsed}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: globalStats.storageUsed }}
                  ></div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Package className="w-4 h-4 text-blue-500" />
                  <span className="text-gray-600">المنتجات</span>
                  <span className="text-gray-900 font-medium">23.4 GB</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-green-500" />
                  <span className="text-gray-600">المستخدمين</span>
                  <span className="text-gray-900 font-medium">12.1 GB</span>
                </div>
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-yellow-500" />
                  <span className="text-gray-600">المستندات</span>
                  <span className="text-gray-900 font-medium">8.7 GB</span>
                </div>
                <div className="flex items-center gap-2">
                  <ImageIcon className="w-4 h-4 text-purple-500" />
                  <span className="text-gray-600">الصور</span>
                  <span className="text-gray-900 font-medium">15.8 GB</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
