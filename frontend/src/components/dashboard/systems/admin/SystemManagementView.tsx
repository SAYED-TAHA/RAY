"use client";

import React, { useState } from 'react';
import { 
  Database, Server, Monitor, Cloud, RefreshCw, Settings, 
  Activity, AlertCircle, CheckCircle, Wifi, HardDrive,
  Download, Upload, Power, Save, Trash2, Eye
} from 'lucide-react';

const SystemManagementView: React.FC = () => {
  const [systemStatus, setSystemStatus] = useState({
    database: 'connected',
    server: 'running',
    backup: 'completed',
    uptime: '99.9%'
  });

  const systemActions = [
    { id: 'backup', label: 'نسخ احتياطي', icon: Cloud, status: 'success' },
    { id: 'restore', label: 'استعادة نسخة', icon: Download, status: 'warning' },
    { id: 'restart', label: 'إعادة تشغيل', icon: RefreshCw, status: 'normal' },
    { id: 'maintenance', label: 'وضع الصيانة', icon: Settings, status: 'normal' },
    { id: 'logs', label: 'سجلات النظام', icon: Eye, status: 'normal' },
    { id: 'cleanup', label: 'تنظيف البيانات', icon: Trash2, status: 'danger' }
  ];

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'success': return 'text-green-600 bg-green-100';
      case 'warning': return 'text-yellow-600 bg-yellow-100';
      case 'danger': return 'text-red-600 bg-red-100';
      default: return 'text-blue-600 bg-blue-100';
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-800">إدارة النظام</h1>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-sm text-gray-600">النظام يعمل بشكل طبيعي</span>
        </div>
      </div>

      {/* System Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <Database className="w-8 h-8 text-blue-600" />
            <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full">متصل</span>
          </div>
          <h3 className="font-semibold text-gray-800">قاعدة البيانات</h3>
          <p className="text-sm text-gray-600">MySQL 8.0</p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <Server className="w-8 h-8 text-purple-600" />
            <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full">شغال</span>
          </div>
          <h3 className="font-semibold text-gray-800">الخادم</h3>
          <p className="text-sm text-gray-600">Ubuntu 22.04</p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <Cloud className="w-8 h-8 text-cyan-600" />
            <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded-full">محدث</span>
          </div>
          <h3 className="font-semibold text-gray-800">النسخ الاحتياطي</h3>
          <p className="text-sm text-gray-600">آخر نسخة: 2 ساعات</p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <Activity className="w-8 h-8 text-green-600" />
            <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full">ممتاز</span>
          </div>
          <h3 className="font-semibold text-gray-800">أداء النظام</h3>
          <p className="text-sm text-gray-600">99.9% توفر</p>
        </div>
      </div>

      {/* System Actions */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-6">إجراءات النظام</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {systemActions.map((action) => (
            <button
              key={action.id}
              className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-right"
            >
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${getStatusColor(action.status)}`}>
                <action.icon className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-800">{action.label}</h3>
                <p className="text-sm text-gray-600">تنفيذ الإجراء</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SystemManagementView;
