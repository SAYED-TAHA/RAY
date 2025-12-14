'use client';

import React from 'react';
import { Home, Command, Users, ShoppingCart, Package, BarChart3, DollarSign, FileText, Briefcase, Shield, Server, Settings, Bell, MessageSquare, UserCheck, FileCheck, HelpCircle, Target, TrendingUp, GraduationCap, Wallet, CreditCard, TrendingDown, Crown, Palette, Layout } from 'lucide-react';
import Link from 'next/link';

export default function AdminDashboard() {
  const menuItems = [
    { icon: Home, label: 'الرئيسية', id: 'dashboard', href: '/admin' },
    { icon: Command, label: 'جميع الأنظمة', id: 'systems', href: '/admin/systems' },
    { icon: Users, label: 'المستخدمين', id: 'users', href: '/admin/users' },
    { icon: ShoppingCart, label: 'الطلبات', id: 'orders', href: '/admin/orders' },
    { icon: Package, label: 'المنتجات', id: 'products', href: '/admin/products' },
    { icon: BarChart3, label: 'التحليلات', id: 'analytics', href: '/admin/analytics' },
    { icon: DollarSign, label: 'المالية', id: 'payments', href: '/admin/payments' },
    { icon: FileText, label: 'المحتوى', id: 'content', href: '/admin/content' },
    { icon: Briefcase, label: 'الوظائف', id: 'jobs', href: '/admin/jobs' },
    { icon: Shield, label: 'الأمان', id: 'security', href: '/admin/security' },
    { icon: Server, label: 'النظام', id: 'system', href: '/admin/system' },
    { icon: Settings, label: 'الإعدادات', id: 'settings', href: '/admin/settings' },
    { icon: Bell, label: 'الإشعارات', id: 'notifications', href: '/admin/notifications' },
    { icon: MessageSquare, label: 'الرسائل', id: 'messages', href: '/admin/messages' },
    { icon: UserCheck, label: 'المتقدمون', id: 'candidates', href: '/admin/candidates' },
    { icon: FileCheck, label: 'الطلبات', id: 'applications', href: '/admin/applications' },
    { icon: HelpCircle, label: 'المساعدة', id: 'help', href: '/admin/help' },
    { icon: Target, label: 'الأهداف', id: 'targets', href: '/admin/targets' },
    { icon: TrendingUp, label: 'الأداء', id: 'performance', href: '/admin/performance' },
    { icon: GraduationCap, label: 'التدريب', id: 'training', href: '/admin/training' },
    { icon: Wallet, label: 'الإيرادات', id: 'revenue', href: '/admin/revenue' },
    { icon: CreditCard, label: 'المصروفات', id: 'expenses', href: '/admin/expenses' },
    { icon: TrendingDown, label: 'الأرباح', id: 'profit', href: '/admin/profit' },
    { icon: Crown, label: 'الباقات', id: 'packages', href: '/admin/packages' },
    { icon: Palette, label: 'المظهر', id: 'appearance', href: '/admin/appearance' },
    { icon: Layout, label: 'الصفحات', id: 'pages', href: '/admin/pages' },
  ];

  return (
    <div className="text-center py-12">
      <h1 className="text-4xl font-bold mb-4">لوحة التحكم الرئيسية</h1>
      <p className="text-slate-400 mb-8">مرحباً بك في لوحة التحكم - 26 صفحة متاحة</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
        {menuItems.slice(0, 12).map((item) => (
          <Link key={item.id} href={item.href} className="bg-slate-800 hover:bg-slate-700 rounded-lg p-4 transition text-left">
            <item.icon className="w-8 h-8 text-cyan-400 mb-2" />
            <h3 className="font-bold text-sm">{item.label}</h3>
          </Link>
        ))}
      </div>
    </div>
  );
}
