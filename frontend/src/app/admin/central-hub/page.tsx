'use client';

import React, { useEffect, useMemo, useState } from 'react';
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
import { fetchGlobalStats, GlobalStats } from '../../../services/centralHubService';
import { fetchSystemHealth, SystemHealth } from '../../../services/systemService';
import { fetchAuditLogs } from '../../../services/auditService';
import { fetchAdminMessages } from '../../../services/adminMessagesService';
import { fetchAdminNotifications } from '../../../services/adminNotificationsService';
import { fetchConversions } from '../../../services/adminFinanceService';

interface RecentActivityItem {
  id: string;
  action: string;
  details: string;
  time: string;
  icon: any;
  color: string;
}

export default function AdminCentralHub() {
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [searchTerm, setSearchTerm] = useState('');

  const [globalStats, setGlobalStats] = useState<GlobalStats | null>(null);
  const [systemHealthData, setSystemHealthData] = useState<SystemHealth | null>(null);
  const [recentActivities, setRecentActivities] = useState<RecentActivityItem[]>([]);
  const [messagesCount, setMessagesCount] = useState(0);
  const [notificationsCount, setNotificationsCount] = useState(0);
  const [conversionRate, setConversionRate] = useState<string>('N/A');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);

      const [stats, health, audit, msgs, notifs, conversions] = await Promise.all([
        fetchGlobalStats(),
        fetchSystemHealth(),
        fetchAuditLogs({ limit: 5, page: 1 }),
        fetchAdminMessages(50),
        fetchAdminNotifications(50),
        fetchConversions()
      ]);

      setGlobalStats(stats);
      setSystemHealthData(health);

      setMessagesCount(Array.isArray(msgs) ? msgs.length : 0);
      setNotificationsCount(Array.isArray(notifs) ? notifs.length : 0);

      const totalVisitors = Array.isArray(conversions)
        ? conversions.reduce((sum: number, c: any) => sum + (c?.visitors || 0), 0)
        : 0;
      const totalConversions = Array.isArray(conversions)
        ? conversions.reduce((sum: number, c: any) => sum + (c?.conversions || 0), 0)
        : 0;
      setConversionRate(totalVisitors > 0 ? `${((totalConversions / totalVisitors) * 100).toFixed(2)}%` : '0.00%');

      const logs = audit?.logs || [];
      const mapped: RecentActivityItem[] = logs.map((l: any) => {
        const type = l?.type || '';
        const icon = type === 'order' ? ShoppingCart : type === 'message' ? MessageSquare : type === 'login' ? Shield : Users;
        const color = type === 'failed_login' ? 'text-red-600' : type === 'order' ? 'text-green-600' : 'text-blue-600';
        return {
          id: l?._id?.toString?.() || l?.id?.toString?.() || String(Math.random()),
          action: l?.action || l?.type || 'حدث',
          details: l?.details || l?.resource || '',
          time: l?.timestamp ? new Date(l.timestamp).toLocaleString('ar-EG') : '',
          icon,
          color
        };
      });
      setRecentActivities(mapped);
    } catch (e) {
      console.error('Failed to load central hub data:', e);
      setError('فشل تحميل بيانات المركز المركزي');
      setGlobalStats(null);
      setSystemHealthData(null);
      setRecentActivities([]);
      setMessagesCount(0);
      setNotificationsCount(0);
      setConversionRate('N/A');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const quickActions = useMemo(() => {
    return [
      { id: 'users', title: 'إدارة المستخدمين', icon: Users, href: '/admin/users', color: 'bg-blue-100 text-blue-600', count: globalStats?.totalUsers || 0 },
      { id: 'orders', title: 'الطلبات', icon: ShoppingCart, href: '/admin/orders', color: 'bg-green-100 text-green-600', count: globalStats?.totalOrders || 0 },
      { id: 'products', title: 'المنتجات', icon: Package, href: '/admin/products', color: 'bg-purple-100 text-purple-600', count: systemHealthData?.application?.products || 0 },
      { id: 'payments', title: 'المدفوعات', icon: CreditCard, href: '/admin/payments', color: 'bg-yellow-100 text-yellow-600', count: null },
      { id: 'messages', title: 'الرسائل', icon: MessageSquare, href: '/admin/messages', color: 'bg-red-100 text-red-600', count: messagesCount },
      { id: 'notifications', title: 'الإشعارات', icon: Bell, href: '/admin/notifications', color: 'bg-orange-100 text-orange-600', count: notificationsCount },
      { id: 'analytics', title: 'التحليلات', icon: BarChart3, href: '/admin/analytics', color: 'bg-indigo-100 text-indigo-600', count: null },
      { id: 'security', title: 'الأمان', icon: Shield, href: '/admin/security', color: 'bg-teal-100 text-teal-600', count: null },
      { id: 'settings', title: 'الإعدادات', icon: Settings, href: '/admin/settings', color: 'bg-gray-100 text-gray-600', count: null }
    ];
  }, [globalStats, systemHealthData, messagesCount, notificationsCount]);

  const systemHealth = useMemo(() => {
    const serverStatus = systemHealthData?.server?.status || 'unknown';
    const dbStatus = systemHealthData?.database?.status || 'unknown';
    const networkStatus = systemHealthData?.network?.status || 'unknown';
    return [
      { name: 'الخادم', status: serverStatus, value: systemHealthData?.server?.cpu !== undefined ? `${systemHealthData.server.cpu}%` : 'N/A', icon: Server, color: serverStatus === 'online' ? 'text-green-600' : 'text-red-600' },
      { name: 'قاعدة البيانات', status: dbStatus, value: systemHealthData?.database?.connections !== undefined ? String(systemHealthData.database.connections) : 'N/A', icon: Database, color: dbStatus === 'connected' ? 'text-green-600' : 'text-red-600' },
      { name: 'الشبكة', status: networkStatus, value: systemHealthData?.network?.latency || 'N/A', icon: Wifi, color: networkStatus === 'connected' ? 'text-green-600' : 'text-red-600' },
      { name: 'API', status: 'online', value: globalStats?.apiRequests ? `${Math.round(globalStats.apiRequests / 1000)}K` : 'N/A', icon: Globe, color: 'text-green-600' }
    ];
  }, [systemHealthData, globalStats]);

  const topMetrics = useMemo(() => {
    const totalOrders = globalStats?.totalOrders || 0;
    const totalRevenue = globalStats?.totalRevenue || 0;
    const avgOrder = totalOrders > 0 ? Math.round(totalRevenue / totalOrders) : 0;
    return [
      { name: 'معدل التحويل', value: conversionRate, change: '', trend: 'up', icon: Target },
      { name: 'متوسط قيمة الطلب', value: avgOrder ? `${avgOrder.toLocaleString()} ج` : 'N/A', change: '', trend: 'up', icon: DollarSign },
      { name: 'معدل الاحتفاظ', value: 'N/A', change: '', trend: 'up', icon: Users },
      { name: 'رضا العملاء', value: 'N/A', change: '', trend: 'up', icon: Star }
    ];
  }, [globalStats, conversionRate]);

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
              
              <button disabled className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg opacity-60 cursor-not-allowed">
                <Download className="w-4 h-4" />
                تصدير تقرير
              </button>

              <button onClick={loadData} className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition">
                <RefreshCw className="w-4 h-4" />
                تحديث
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 text-center text-gray-600">
            جاري تحميل بيانات المركز...
          </div>
        ) : error ? (
          <div className="bg-red-50 rounded-xl p-6 border border-red-200 text-red-700 text-center">
            {error}
          </div>
        ) : !globalStats ? (
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 text-center text-gray-600">
            لا توجد بيانات
          </div>
        ) : (
          <>
        {/* Global Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <span className="text-sm text-gray-600 font-medium">N/A</span>
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
              <span className="text-sm text-gray-600 font-medium">N/A</span>
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
              <span className="text-sm text-gray-600 font-medium">{typeof globalStats.growth === 'number' ? `${globalStats.growth}%` : 'N/A'}</span>
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
              <span className="text-sm text-gray-600 font-medium">{globalStats.systemUptime}</span>
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
                  {action.count !== null && action.count !== undefined && action.count !== 0 && (
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
                {recentActivities.length === 0 ? (
                  <div className="text-center py-8 text-gray-600">لا يوجد نشاط حديث</div>
                ) : (
                  recentActivities.map((activity) => (
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
                  ))
                )}
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
                          {system.value}
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
                      <div className="text-xs text-gray-500">{metric.change}</div>
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
                <div className="text-xs text-gray-600">N/A</div>
              </div>
              
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertCircle className="w-4 h-4 text-red-600" />
                  <span className="text-sm text-gray-600">معدل الأخطاء</span>
                </div>
                <div className="text-2xl font-bold text-gray-900">{globalStats.errorRate}</div>
                <div className="text-xs text-gray-600">N/A</div>
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
                <div className="text-2xl font-bold text-gray-900">{globalStats.apiRequests ? (globalStats.apiRequests / 1000000).toFixed(1) + 'M' : 'N/A'}</div>
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
                  <span className="text-gray-900 font-medium">N/A</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-green-500" />
                  <span className="text-gray-600">المستخدمين</span>
                  <span className="text-gray-900 font-medium">N/A</span>
                </div>
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-yellow-500" />
                  <span className="text-gray-600">المستندات</span>
                  <span className="text-gray-900 font-medium">N/A</span>
                </div>
                <div className="flex items-center gap-2">
                  <ImageIcon className="w-4 h-4 text-purple-500" />
                  <span className="text-gray-600">الصور</span>
                  <span className="text-gray-900 font-medium">N/A</span>
                </div>
              </div>
            </div>
          </div>
        </div>
          </>
        )}
      </div>
    </div>
  );
}
