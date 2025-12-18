'use client';

import React, { useState, useEffect } from 'react';
import { 
  Bell, Search, Download, Eye, Edit, Trash2,
  Send, Calendar,
  RefreshCw, Plus,
  FileText, Loader
} from 'lucide-react';
import Link from 'next/link';
import { fetchAdminNotifications, AdminNotification } from '../../../services/adminNotificationsService';

export default function AdminNotifications() {

  const [notifications, setNotifications] = useState<AdminNotification[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await fetchAdminNotifications(200);
        setNotifications(data);
      } catch (e) {
        console.error('خطأ في جلب الإشعارات:', e);
        setNotifications([]);
        setError('فشل تحميل الإشعارات');
      } finally {
        setIsLoading(false);
      }
    };

    load();
  }, []);

  const handleRefresh = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await fetchAdminNotifications(200);
      setNotifications(data);
    } catch (e) {
      console.error('خطأ في تحديث الإشعارات:', e);
      setError('فشل تحديث الإشعارات');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center h-64">
            <div className="flex items-center gap-3">
              <Loader className="w-6 h-6 animate-spin text-blue-600" />
              <span className="text-gray-600">جاري تحميل الإشعارات...</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-red-50 rounded-xl p-6 border border-red-200 text-red-700 text-center">
            {error}
            <div className="mt-4">
              <button onClick={handleRefresh} className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                <RefreshCw className="w-4 h-4" />
                إعادة المحاولة
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const filteredNotifications = notifications.filter((notification: AdminNotification) => {
    const matchesSearch = notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         notification.message.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'all' || notification.type === selectedType;
    const matchesStatus = selectedStatus === 'all' || notification.status === selectedStatus;
    return matchesSearch && matchesType && matchesStatus;
  });

  const types = [
    { id: 'all', label: 'جميع الأنواع', count: notifications.length },
    { id: 'system', label: 'نظام', count: notifications.filter((n: AdminNotification) => n.type === 'system').length },
    { id: 'promotion', label: 'ترويج', count: notifications.filter((n: AdminNotification) => n.type === 'promotion').length },
    { id: 'maintenance', label: 'صيانة', count: notifications.filter((n: AdminNotification) => n.type === 'maintenance').length }
  ];

  const statuses = [
    { id: 'all', label: 'جميع الحالات', count: notifications.length },
    { id: 'sent', label: 'تم الإرسال', count: notifications.filter((n: AdminNotification) => n.status === 'sent').length },
    { id: 'scheduled', label: 'مجدول', count: notifications.filter((n: AdminNotification) => n.status === 'scheduled').length },
    { id: 'draft', label: 'مسودة', count: notifications.filter((n: AdminNotification) => n.status === 'draft').length }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'sent':
        return 'bg-green-100 text-green-800';
      case 'scheduled':
        return 'bg-blue-100 text-blue-800';
      case 'draft':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeBadge = (type: string) => {
    switch (type) {
      case 'system':
        return 'bg-purple-100 text-purple-800';
      case 'promotion':
        return 'bg-pink-100 text-pink-800';
      case 'maintenance':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const stats = {
    total: notifications.length,
    sent: notifications.filter((n: AdminNotification) => n.status === 'sent').length,
    scheduled: notifications.filter((n: AdminNotification) => n.status === 'scheduled').length,
    draft: notifications.filter((n: AdminNotification) => n.status === 'draft').length
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link href="/admin" className="p-2 hover:bg-gray-100 rounded-lg transition">
                <Bell className="w-6 h-6 text-gray-600" />
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">الإشعارات</h1>
                <p className="text-sm text-gray-600">إدارة الإشعارات والتنبيهات</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <button onClick={handleRefresh} className="flex items-center gap-2 px-3 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition">
                <RefreshCw className="w-4 h-4" />
                تحديث
              </button>
              <button disabled className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg opacity-60 cursor-not-allowed">
                <Plus className="w-4 h-4" />
                إشعار جديد
              </button>
              <button disabled className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg opacity-60 cursor-not-allowed">
                <Download className="w-4 h-4" />
                تصدير
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">الإجمالي</p>
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              </div>
              <Bell className="w-8 h-8 text-blue-600" />
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">تم الإرسال</p>
                <p className="text-2xl font-bold text-green-600">{stats.sent}</p>
              </div>
              <Send className="w-8 h-8 text-green-600" />
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">مجدول</p>
                <p className="text-2xl font-bold text-blue-600">{stats.scheduled}</p>
              </div>
              <Calendar className="w-8 h-8 text-blue-600" />
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">مسودة</p>
                <p className="text-2xl font-bold text-gray-600">{stats.draft}</p>
              </div>
              <FileText className="w-8 h-8 text-gray-600" />
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="البحث في الإشعارات..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pr-10 pl-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {types.map(type => (
                <option key={type.id} value={type.id}>
                  {type.label} ({type.count})
                </option>
              ))}
            </select>
            
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {statuses.map(status => (
                <option key={status.id} value={status.id}>
                  {status.label} ({status.count})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Notifications List */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">قائمة الإشعارات</h2>
            
            {filteredNotifications.length === 0 ? (
              <div className="text-center py-12">
                <Bell className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">لا توجد إشعارات مطابقة للبحث</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredNotifications.map((notification: AdminNotification) => (
                  <div key={notification.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-semibold text-gray-900">{notification.title}</h3>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeBadge(notification.type)}`}>
                            {notification.type}
                          </span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityBadge(notification.priority)}`}>
                            {notification.priority}
                          </span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(notification.status)}`}>
                            {notification.status}
                          </span>
                        </div>
                        
                        <p className="text-gray-600 mb-3">{notification.message}</p>
                        
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span>المرسلين: {notification.totalRecipients}</span>
                          <span>تم القراءة: {notification.readBy}</span>
                          <span>معدل التوصيل: {notification.deliveryRate}%</span>
                          {notification.sentAt && <span>أرسلت: {notification.sentAt}</span>}
                          {notification.scheduledAt && <span>مجدولة: {notification.scheduledAt}</span>}
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <button disabled className="p-2 rounded-lg opacity-60 cursor-not-allowed">
                          <Eye className="w-4 h-4 text-gray-600" />
                        </button>
                        <button disabled className="p-2 rounded-lg opacity-60 cursor-not-allowed">
                          <Edit className="w-4 h-4 text-gray-600" />
                        </button>
                        <button disabled className="p-2 rounded-lg opacity-60 cursor-not-allowed">
                          <Trash2 className="w-4 h-4 text-red-600" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}