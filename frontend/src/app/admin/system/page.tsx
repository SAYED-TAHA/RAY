'use client';

import React, { useState } from 'react';
import { 
  Settings, Server, Database, Wifi, Globe, Shield,
  Download, Upload, RefreshCw, CheckCircle, AlertCircle,
  XCircle, Clock, HardDrive, Cpu, MemoryStick,
  Monitor, Zap, Activity, FileText, Save, RotateCcw
} from 'lucide-react';
import Link from 'next/link';

export default function AdminSystem() {
  const [systemInfo] = useState({
    server: {
      status: 'online',
      uptime: '15 days 8 hours',
      cpu: 45,
      memory: 67,
      storage: 78
    },
    database: {
      status: 'connected',
      size: '2.4 GB',
      connections: 12,
      queries: 1234567
    },
    network: {
      status: 'connected',
      bandwidth: '1.2 Gbps',
      latency: '12ms'
    }
  });

  const [logs] = useState([
    {
      id: '1',
      level: 'info',
      message: 'تم تحديث النظام بنجاح',
      timestamp: '2024-12-05 10:30:00'
    },
    {
      id: '2',
      level: 'warning',
      message: 'استخدام الذاكرة مرتفع',
      timestamp: '2024-12-05 09:15:00'
    },
    {
      id: '3',
      level: 'error',
      message: 'فشل الاتصال بقاعدة البيانات',
      timestamp: '2024-12-05 08:45:00'
    }
  ]);

  const getLevelBadge = (level: string) => {
    switch (level) {
      case 'info':
        return 'bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-bold';
      case 'warning':
        return 'bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full text-xs font-bold';
      case 'error':
        return 'bg-red-100 text-red-700 px-2 py-1 rounded-full text-xs font-bold';
      default:
        return 'bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs font-bold';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/admin" className="text-gray-600 hover:text-gray-900 transition">
                ← لوحة التحكم
              </Link>
              <h1 className="text-2xl font-bold text-gray-900">النظام</h1>
            </div>
            <div className="flex items-center gap-4">
              <button className="bg-ray-blue text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition flex items-center gap-2">
                <RefreshCw className="w-4 h-4" />
                تحديث النظام
              </button>
              <button className="border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50 transition flex items-center gap-2">
                <Download className="w-4 h-4" />
                نسخة احتياطية
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* System Status */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Server className="w-5 h-5 text-gray-600" />
                <h3 className="font-bold text-gray-900">الخادم</h3>
              </div>
              <CheckCircle className="w-5 h-5 text-green-500" />
            </div>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">المعالج</span>
                  <span className="text-gray-900">{systemInfo.server.cpu}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{width: `${systemInfo.server.cpu}%`}}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">الذاكرة</span>
                  <span className="text-gray-900">{systemInfo.server.memory}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-yellow-600 h-2 rounded-full" style={{width: `${systemInfo.server.memory}%`}}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">التخزين</span>
                  <span className="text-gray-900">{systemInfo.server.storage}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-red-600 h-2 rounded-full" style={{width: `${systemInfo.server.storage}%`}}></div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Database className="w-5 h-5 text-gray-600" />
                <h3 className="font-bold text-gray-900">قاعدة البيانات</h3>
              </div>
              <CheckCircle className="w-5 h-5 text-green-500" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">الحالة</span>
                <span className="text-green-600 font-medium">متصلة</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">الحجم</span>
                <span className="text-gray-900">{systemInfo.database.size}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">الاستعلامات</span>
                <span className="text-gray-900">{systemInfo.database.queries.toLocaleString()}</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Wifi className="w-5 h-5 text-gray-600" />
                <h3 className="font-bold text-gray-900">الشبكة</h3>
              </div>
              <CheckCircle className="w-5 h-5 text-green-500" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">الحالة</span>
                <span className="text-green-600 font-medium">متصلة</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">النطاق الترددي</span>
                <span className="text-gray-900">{systemInfo.network.bandwidth}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">زمن الاستجابة</span>
                <span className="text-gray-900">{systemInfo.network.latency}</span>
              </div>
            </div>
          </div>
        </div>

        {/* System Logs */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <h3 className="text-lg font-bold text-gray-900 mb-4">سجل النظام</h3>
          <div className="space-y-2">
            {logs.map((log) => (
              <div key={log.id} className="flex items-center gap-3 p-3 rounded-lg bg-gray-50">
                <span className={getLevelBadge(log.level)}>
                  {log.level === 'info' && 'معلومات'}
                  {log.level === 'warning' && 'تحذير'}
                  {log.level === 'error' && 'خطأ'}
                </span>
                <span className="text-sm text-gray-900">{log.message}</span>
                <span className="text-xs text-gray-500 mr-auto">{log.timestamp}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
