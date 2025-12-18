'use client';

import React, { useEffect, useState } from 'react';
import { 
  Settings, Server, Database, Wifi, Globe, Shield,
  Download, Upload, RefreshCw, CheckCircle, AlertCircle,
  XCircle, Clock, HardDrive, Cpu, MemoryStick,
  Monitor, Zap, Activity, FileText, Save, RotateCcw
} from 'lucide-react';
import Link from 'next/link';
import { fetchSystemHealth, fetchSystemLogs, SystemHealth } from '../../../services/systemService';

interface SystemLogItem {
  id: string;
  level: string;
  message: string;
  timestamp: string;
}

export default function AdminSystem() {
  const [systemInfo, setSystemInfo] = useState<SystemHealth | null>(null);
  const [logs, setLogs] = useState<SystemLogItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      const [health, logsRes] = await Promise.all([
        fetchSystemHealth(),
        fetchSystemLogs(undefined, 50)
      ]);
      setSystemInfo(health);
      setLogs((logsRes?.logs || []) as SystemLogItem[]);
    } catch (e) {
      console.error('Failed to load system info:', e);
      setError('فشل تحميل بيانات النظام');
      setSystemInfo(null);
      setLogs([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

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
              <button onClick={loadData} className="bg-ray-blue text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition flex items-center gap-2">
                <RefreshCw className="w-4 h-4" />
                تحديث النظام
              </button>
              <button disabled className="border border-gray-300 px-4 py-2 rounded-lg opacity-60 cursor-not-allowed transition flex items-center gap-2">
                <Download className="w-4 h-4" />
                نسخة احتياطية
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6">
        {loading ? (
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 text-center text-gray-600">
            جاري تحميل بيانات النظام...
          </div>
        ) : error ? (
          <div className="bg-red-50 rounded-xl p-6 border border-red-200 text-red-700 text-center">
            {error}
          </div>
        ) : !systemInfo ? (
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 text-center text-gray-600">
            لا توجد بيانات
          </div>
        ) : (
          <>
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
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${systemInfo.server.cpu}%` }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">الذاكرة</span>
                      <span className="text-gray-900">{systemInfo.server.memory}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-yellow-600 h-2 rounded-full" style={{ width: `${systemInfo.server.memory}%` }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">التخزين</span>
                      <span className="text-gray-900">{systemInfo.server.storage}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-red-600 h-2 rounded-full" style={{ width: `${systemInfo.server.storage}%` }}></div>
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
          </>
        )}
      </div>
    </div>
  );
}
