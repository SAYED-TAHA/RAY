'use client';

import React, { useState } from 'react';
import { Menu, Search, Bell, User, Home, Command, Users, ShoppingCart, Package, BarChart3, DollarSign, FileText, Briefcase, Shield, Server, Settings, MessageSquare, UserCheck, FileCheck, HelpCircle, Target, TrendingUp, GraduationCap, Wallet, CreditCard, TrendingDown, Crown, Palette, Layout, Eye } from 'lucide-react';
import Link from 'next/link';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const menuSections = [
    {
      title: 'الرئيسية',
      items: [
        { icon: Home, label: 'لوحة التحكم', id: 'dashboard', href: '/admin' },
        { icon: Command, label: 'المركز المركزي', id: 'central-hub', href: '/admin/central-hub' },
      ]
    },
    {
      title: 'إدارة المستخدمين',
      items: [
        { icon: Users, label: 'المستخدمين', id: 'users', href: '/admin/users' },
        { icon: UserCheck, label: 'المتقدمون', id: 'candidates', href: '/admin/candidates' },
      ]
    },
    {
      title: 'إدارة الطلبات والمبيعات',
      items: [
        { icon: ShoppingCart, label: 'الطلبات', id: 'orders', href: '/admin/orders' },
        { icon: FileCheck, label: 'طلبات التقديم', id: 'applications', href: '/admin/applications' },
        { icon: DollarSign, label: 'الفواتير', id: 'invoices', href: '/admin/invoices' },
      ]
    },
    {
      title: 'إدارة المنتجات والباقات',
      items: [
        { icon: Package, label: 'المنتجات', id: 'products', href: '/admin/products' },
        { icon: Crown, label: 'الباقات', id: 'packages', href: '/admin/packages' },
        { icon: DollarSign, label: 'إنشاء باقة', id: 'create-package', href: '/admin/create-package' },
        { icon: BarChart3, label: 'إيرادات الباقات', id: 'package-revenue', href: '/admin/package-revenue' },
        { icon: Target, label: 'الباقات الشهيرة', id: 'popular-packages', href: '/admin/popular-packages' },
      ]
    },
    {
      title: 'التحليلات والمالية',
      items: [
        { icon: BarChart3, label: 'التحليلات', id: 'analytics', href: '/admin/analytics' },
        { icon: DollarSign, label: 'المدفوعات', id: 'payments', href: '/admin/payments' },
        { icon: Wallet, label: 'الإيرادات', id: 'revenue', href: '/admin/revenue' },
        { icon: CreditCard, label: 'المصروفات', id: 'expenses', href: '/admin/expenses' },
        { icon: TrendingDown, label: 'الأرباح', id: 'profit', href: '/admin/profit' },
        { icon: BarChart3, label: 'التحليل المالي', id: 'financial-analysis', href: '/admin/financial-analysis' },
        { icon: Target, label: 'التحويلات', id: 'conversions', href: '/admin/conversions' },
        { icon: DollarSign, label: 'الخصومات', id: 'discounts', href: '/admin/discounts' },
        { icon: DollarSign, label: 'البنوك', id: 'banking', href: '/admin/banking' },
      ]
    },
    {
      title: 'إدارة الوظائف والتوظيف',
      items: [
        { icon: Briefcase, label: 'الوظائف', id: 'jobs', href: '/admin/jobs' },
        { icon: Briefcase, label: 'وظائف الأنشطة', id: 'business-jobs', href: '/admin/business-jobs' },
        { icon: Briefcase, label: 'وظائف راي', id: 'ray-jobs', href: '/admin/ray-jobs' },
        { icon: Target, label: 'التوظيف', id: 'hiring', href: '/admin/hiring' },
        { icon: MessageSquare, label: 'المقابلات', id: 'interviews', href: '/admin/interviews' },
      ]
    },
    {
      title: 'المحتوى والاتصالات',
      items: [
        { icon: FileText, label: 'المحتوى', id: 'content', href: '/admin/content' },
        { icon: MessageSquare, label: 'الرسائل', id: 'messages', href: '/admin/messages' },
        { icon: Bell, label: 'الإشعارات', id: 'notifications', href: '/admin/notifications' },
        { icon: HelpCircle, label: 'المساعدة', id: 'help', href: '/admin/help' },
      ]
    },
    {
      title: 'الأداء والتطوير',
      items: [
        { icon: TrendingUp, label: 'الأداء', id: 'performance', href: '/admin/performance' },
        { icon: Target, label: 'الأهداف', id: 'targets', href: '/admin/targets' },
        { icon: GraduationCap, label: 'التدريب', id: 'training', href: '/admin/training' },
      ]
    },
    {
      title: 'تخصيص الواجهة والتصميم',
      items: [
        { icon: Palette, label: 'المظهر', id: 'appearance', href: '/admin/appearance' },
        { icon: Palette, label: 'الألوان', id: 'colors', href: '/admin/colors' },
        { icon: Layout, label: 'التخطيط', id: 'layout', href: '/admin/layout' },
        { icon: FileText, label: 'الأزرار', id: 'buttons', href: '/admin/buttons' },
        { icon: FileText, label: 'الصور', id: 'images', href: '/admin/images' },
        { icon: FileText, label: 'الروابط', id: 'links', href: '/admin/links' },
        { icon: FileText, label: 'القوائم', id: 'menus', href: '/admin/menus' },
        { icon: FileText, label: 'الرأس', id: 'header', href: '/admin/header' },
        { icon: FileText, label: 'التذييل', id: 'footer', href: '/admin/footer' },
        { icon: FileText, label: 'الشريط الجانبي', id: 'sidebar', href: '/admin/sidebar' },
        { icon: FileText, label: 'الاستجابة', id: 'responsive', href: '/admin/responsive' },
        { icon: Layout, label: 'الصفحات', id: 'pages', href: '/admin/pages' },
        { icon: FileText, label: 'الصفحات الرئيسية', id: 'main-pages', href: '/admin/main-pages' },
      ]
    },
    {
      title: 'معلومات التطبيق',
      items: [
        { icon: FileText, label: 'اسم التطبيق', id: 'app-name', href: '/admin/app-name' },
        { icon: FileText, label: 'شعار التطبيق', id: 'app-logo', href: '/admin/app-logo' },
      ]
    },
    {
      title: 'الأمان والإعدادات',
      items: [
        { icon: Shield, label: 'الأمان', id: 'security', href: '/admin/security' },
        { icon: Server, label: 'التحكم الكامل', id: 'full-control', href: '/admin/full-control' },
        { icon: Eye, label: 'معاينة', id: 'preview', href: '/admin/preview' },
        { icon: Settings, label: 'الإعدادات', id: 'settings', href: '/admin/settings' },
      ]
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      {/* Sidebar */}
      <aside className={`fixed left-0 top-0 h-screen bg-gradient-to-b from-slate-900 to-slate-950 border-r border-slate-800 transition-all duration-300 z-50 ${sidebarOpen ? 'w-64' : 'w-20'}`}>
        <div className="p-6 flex items-center justify-between border-b border-slate-800">
          {sidebarOpen && <h1 className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">RAY</h1>}
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 hover:bg-slate-800 rounded-lg transition">
            <Menu className="w-5 h-5" />
          </button>
        </div>
        
        <nav className="p-4 space-y-2 overflow-y-auto h-[calc(100vh-80px)]">
          {menuSections.map((section) => (
            <div key={section.title} className="mb-4">
              {sidebarOpen && <h3 className="text-xs font-semibold text-slate-400 uppercase px-4 mb-2">{section.title}</h3>}
              {section.items.map((item: any) => (
                <Link key={item.id} href={item.href} className="w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors hover:bg-slate-800 text-slate-300 hover:text-white">
                  <item.icon className="w-5 h-5 flex-shrink-0" />
                  {sidebarOpen && <span className="text-sm font-medium">{item.label}</span>}
                </Link>
              ))}
            </div>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className={`transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-20'}`}>
        {/* Header */}
        <header className="bg-slate-900 border-b border-slate-800 sticky top-0 z-40">
          <div className="flex items-center justify-between p-6">
            <div className="flex items-center gap-4 flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input type="text" placeholder="البحث..." className="pl-10 pr-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-sm text-white placeholder-slate-400 focus:outline-none focus:border-cyan-500" />
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button className="p-2 hover:bg-slate-800 rounded-lg transition relative">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <button className="p-2 hover:bg-slate-800 rounded-lg transition">
                <User className="w-5 h-5" />
              </button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
