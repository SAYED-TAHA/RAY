'use client';

import React, { useState } from 'react';
import { 
  Settings, Globe, Bell, Shield, Database, Mail, Phone,
  Save, RefreshCw, CheckCircle, AlertCircle, XCircle,
  User, Building, DollarSign, Palette, FileText,
  ToggleRight, ToggleLeft, Upload, Download, Eye,
  CreditCard, Package, Users, Clock, Calendar
} from 'lucide-react';
import Link from 'next/link';

export default function AdminSettings() {
  const [activeTab, setActiveTab] = useState('general');
  const [saving, setSaving] = useState(false);

  const [generalSettings, setGeneralSettings] = useState({
    siteName: 'Ray Egypt',
    siteUrl: 'https://ray-egypt.com',
    adminEmail: 'admin@ray-egypt.com',
    supportPhone: '+20 123 456 7890',
    timezone: 'Africa/Cairo',
    language: 'ar',
    currency: 'EGP',
    dateFormat: 'DD/MM/YYYY',
    maintenance: false
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    orderNotifications: true,
    userNotifications: true,
    systemNotifications: true,
    marketingEmails: false,
    weeklyReports: true
  });

  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: true,
    sessionTimeout: 30,
    passwordMinLength: 8,
    requireStrongPassword: true,
    loginAttempts: 5,
    ipWhitelist: false,
    auditLog: true,
    autoBackup: true
  });

  const [paymentSettings, setPaymentSettings] = useState({
    paypalEnabled: true,
    stripeEnabled: true,
    cashOnDelivery: true,
    bankTransfer: true,
    taxRate: 14,
    shippingFee: 25,
    freeShippingThreshold: 500
  });

  const tabs = [
    { id: 'general', label: 'الإعدادات العامة', icon: Settings },
    { id: 'notifications', label: 'الإشعارات', icon: Bell },
    { id: 'security', label: 'الأمان', icon: Shield },
    { id: 'payment', label: 'المدفوعات', icon: CreditCard }
  ];

  const handleSave = async () => {
    setSaving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setSaving(false);
  };

  const renderGeneralSettings = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
        <h3 className="text-lg font-bold text-gray-900 mb-6">معلومات الموقع</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              اسم الموقع
            </label>
            <input
              type="text"
              value={generalSettings.siteName}
              onChange={(e) => setGeneralSettings({...generalSettings, siteName: e.target.value})}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              رابط الموقع
            </label>
            <input
              type="url"
              value={generalSettings.siteUrl}
              onChange={(e) => setGeneralSettings({...generalSettings, siteUrl: e.target.value})}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              البريد الإلكتروني للإدارة
            </label>
            <input
              type="email"
              value={generalSettings.adminEmail}
              onChange={(e) => setGeneralSettings({...generalSettings, adminEmail: e.target.value})}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              هاتف الدعم
            </label>
            <input
              type="tel"
              value={generalSettings.supportPhone}
              onChange={(e) => setGeneralSettings({...generalSettings, supportPhone: e.target.value})}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              المنطقة الزمنية
            </label>
            <select
              value={generalSettings.timezone}
              onChange={(e) => setGeneralSettings({...generalSettings, timezone: e.target.value})}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="Africa/Cairo">القاهرة</option>
              <option value="Asia/Riyadh">الرياض</option>
              <option value="Asia/Dubai">دبي</option>
              <option value="Europe/London">لندن</option>
              <option value="America/New_York">نيويورك</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              اللغة
            </label>
            <select
              value={generalSettings.language}
              onChange={(e) => setGeneralSettings({...generalSettings, language: e.target.value})}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="ar">العربية</option>
              <option value="en">English</option>
            </select>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
        <h3 className="text-lg font-bold text-gray-900 mb-6">إعدادات إضافية</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900">وضع الصيانة</h4>
              <p className="text-sm text-gray-600">إيقاف الموقع مؤقتاً للصيانة</p>
            </div>
            <button
              onClick={() => setGeneralSettings({...generalSettings, maintenance: !generalSettings.maintenance})}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                generalSettings.maintenance ? 'bg-orange-600' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  generalSettings.maintenance ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderNotificationSettings = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
        <h3 className="text-lg font-bold text-gray-900 mb-6">قنوات الإشعارات</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900">الإشعارات البريدية</h4>
              <p className="text-sm text-gray-600">إرسال الإشعارات عبر البريد الإلكتروني</p>
            </div>
            <button
              onClick={() => setNotificationSettings({...notificationSettings, emailNotifications: !notificationSettings.emailNotifications})}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                notificationSettings.emailNotifications ? 'bg-blue-600' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  notificationSettings.emailNotifications ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900">الرسائل النصية</h4>
              <p className="text-sm text-gray-600">إرسال الإشعارات عبر SMS</p>
            </div>
            <button
              onClick={() => setNotificationSettings({...notificationSettings, smsNotifications: !notificationSettings.smsNotifications})}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                notificationSettings.smsNotifications ? 'bg-blue-600' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  notificationSettings.smsNotifications ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900">الإشعارات الفورية</h4>
              <p className="text-sm text-gray-600">إشعارات فورية في المتصفح</p>
            </div>
            <button
              onClick={() => setNotificationSettings({...notificationSettings, pushNotifications: !notificationSettings.pushNotifications})}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                notificationSettings.pushNotifications ? 'bg-blue-600' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  notificationSettings.pushNotifications ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
        <h3 className="text-lg font-bold text-gray-900 mb-6">أنواع الإشعارات</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900">إشعارات الطلبات</h4>
              <p className="text-sm text-gray-600">عند ورود طلب جديد</p>
            </div>
            <button
              onClick={() => setNotificationSettings({...notificationSettings, orderNotifications: !notificationSettings.orderNotifications})}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                notificationSettings.orderNotifications ? 'bg-blue-600' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  notificationSettings.orderNotifications ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900">إشعارات المستخدمين</h4>
              <p className="text-sm text-gray-600">عند تسجيل مستخدم جديد</p>
            </div>
            <button
              onClick={() => setNotificationSettings({...notificationSettings, userNotifications: !notificationSettings.userNotifications})}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                notificationSettings.userNotifications ? 'bg-blue-600' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  notificationSettings.userNotifications ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSecuritySettings = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
        <h3 className="text-lg font-bold text-gray-900 mb-6">إعدادات الأمان</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              مدة الجلسة (دقائق)
            </label>
            <input
              type="number"
              value={securitySettings.sessionTimeout}
              onChange={(e) => setSecuritySettings({...securitySettings, sessionTimeout: parseInt(e.target.value)})}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              الحد الأدنى لكلمة المرور
            </label>
            <input
              type="number"
              value={securitySettings.passwordMinLength}
              onChange={(e) => setSecuritySettings({...securitySettings, passwordMinLength: parseInt(e.target.value)})}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              محاولات تسجيل الدخول
            </label>
            <input
              type="number"
              value={securitySettings.loginAttempts}
              onChange={(e) => setSecuritySettings({...securitySettings, loginAttempts: parseInt(e.target.value)})}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
        
        <div className="mt-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900">المصادقة الثنائية</h4>
              <p className="text-sm text-gray-600">تتطلب رمز تحقق إضافي</p>
            </div>
            <button
              onClick={() => setSecuritySettings({...securitySettings, twoFactorAuth: !securitySettings.twoFactorAuth})}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                securitySettings.twoFactorAuth ? 'bg-blue-600' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  securitySettings.twoFactorAuth ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900">كلمة مرور قوية</h4>
              <p className="text-sm text-gray-600">تتطلب أحرف خاصة وأرقام</p>
            </div>
            <button
              onClick={() => setSecuritySettings({...securitySettings, requireStrongPassword: !securitySettings.requireStrongPassword})}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                securitySettings.requireStrongPassword ? 'bg-blue-600' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  securitySettings.requireStrongPassword ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPaymentSettings = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
        <h3 className="text-lg font-bold text-gray-900 mb-6">طرق الدفع</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900">PayPal</h4>
              <p className="text-sm text-gray-600">الدفع عبر PayPal</p>
            </div>
            <button
              onClick={() => setPaymentSettings({...paymentSettings, paypalEnabled: !paymentSettings.paypalEnabled})}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                paymentSettings.paypalEnabled ? 'bg-blue-600' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  paymentSettings.paypalEnabled ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900">Stripe</h4>
              <p className="text-sm text-gray-600">الدفع via بطاقات الائتمان</p>
            </div>
            <button
              onClick={() => setPaymentSettings({...paymentSettings, stripeEnabled: !paymentSettings.stripeEnabled})}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                paymentSettings.stripeEnabled ? 'bg-blue-600' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  paymentSettings.stripeEnabled ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900">الدفع عند الاستلام</h4>
              <p className="text-sm text-gray-600">الدفع نقداً عند التسليم</p>
            </div>
            <button
              onClick={() => setPaymentSettings({...paymentSettings, cashOnDelivery: !paymentSettings.cashOnDelivery})}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                paymentSettings.cashOnDelivery ? 'bg-blue-600' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  paymentSettings.cashOnDelivery ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
        <h3 className="text-lg font-bold text-gray-900 mb-6">الضرائب والشحن</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              ضريبة القيمة المضافة (%)
            </label>
            <input
              type="number"
              value={paymentSettings.taxRate}
              onChange={(e) => setPaymentSettings({...paymentSettings, taxRate: parseFloat(e.target.value)})}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              رسوم الشحن (ج)
            </label>
            <input
              type="number"
              value={paymentSettings.shippingFee}
              onChange={(e) => setPaymentSettings({...paymentSettings, shippingFee: parseFloat(e.target.value)})}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              حد الشحن المجاني (ج)
            </label>
            <input
              type="number"
              value={paymentSettings.freeShippingThreshold}
              onChange={(e) => setPaymentSettings({...paymentSettings, freeShippingThreshold: parseFloat(e.target.value)})}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link href="/admin" className="p-2 hover:bg-gray-100 rounded-lg transition">
                <Settings className="w-6 h-6 text-gray-600" />
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">الإعدادات</h1>
                <p className="text-sm text-gray-600">إدارة إعدادات النظام</p>
              </div>
            </div>
            
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 transition"
            >
              {saving ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : (
                <Save className="w-4 h-4" />
              )}
              {saving ? 'جاري الحفظ...' : 'حفظ التغييرات'}
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-8 overflow-x-auto">
            {tabs.map((tab) => (
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
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'general' && renderGeneralSettings()}
        {activeTab === 'notifications' && renderNotificationSettings()}
        {activeTab === 'security' && renderSecuritySettings()}
        {activeTab === 'payment' && renderPaymentSettings()}
      </div>
    </div>
  );
}
