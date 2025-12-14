'use client';

import React, { useState } from 'react';
import {
  Store, Utensils, Home, Car, Stethoscope, Dumbbell,
  Wrench, Shirt, ShoppingBag, Scissors, Pill, Briefcase,
  Baby, Gavel, Users, Sun, ArrowLeft, Search, Filter,
  LayoutGrid, ChevronRight, CheckCircle, AlertCircle,
  Calendar, Package, Shirt as ShirtIcon, Truck
} from 'lucide-react';
import Link from 'next/link';

interface System {
  id: string;
  title: string;
  icon: any;
  desc: string;
  color: string;
  href: string;
  category: string;
  status: 'ready' | 'pending';
}

export default function SystemsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const systems: System[] = [
    // قطاع التجارة والمطاعم - معمولة بالفعل ✅
    { id: 'restaurant', title: 'نظام إدارة المطاعم', icon: Utensils, desc: 'حجوزات، كاشير، ومطبخ', color: 'bg-orange-100 text-orange-600', href: '/dashboard/restaurant', category: 'commerce', status: 'ready' },
    { id: 'retail', title: 'نظام إدارة التجزئة', icon: Store, desc: 'مبيعات ومخزون', color: 'bg-blue-100 text-blue-600', href: '/dashboard/retail', category: 'commerce', status: 'ready' },
    { id: 'clothing', title: 'نظام محلات الملابس', icon: Shirt, desc: 'مقاسات وألوان وعرض', color: 'bg-pink-100 text-pink-600', href: '/dashboard/clothing', category: 'commerce', status: 'ready' },
    { id: 'supermarket', title: 'نظام السوبر ماركت', icon: ShoppingBag, desc: 'باركود سريع وإدارة مخزون', color: 'bg-green-100 text-green-600', href: '/dashboard/supermarket', category: 'commerce', status: 'ready' },

    // قطاع الصحة واللياقة - معمولة بالفعل ✅
    { id: 'clinic', title: 'نظام المجمعات الطبية', icon: Stethoscope, desc: 'حجوزات وملفات مرضى وتقارير', color: 'bg-teal-100 text-teal-600', href: '/dashboard/clinic', category: 'health', status: 'ready' },
    { id: 'pharmacy', title: 'نظام الصيدليات', icon: Pill, desc: 'أدوية ونواقص واستشارات', color: 'bg-emerald-100 text-emerald-600', href: '/dashboard/pharmacy', category: 'health', status: 'ready' },
    { id: 'gym', title: 'نظام الأندية الرياضية', icon: Dumbbell, desc: 'اشتراكات ودخول وبرامج تدريب', color: 'bg-yellow-100 text-yellow-600', href: '/dashboard/gym', category: 'health', status: 'ready' },
    { id: 'salon', title: 'نظام صوالين التجميل', icon: Scissors, desc: 'مواعيد وخدمات وموظفين', color: 'bg-purple-100 text-purple-600', href: '/dashboard/salon', category: 'health', status: 'ready' },

    // قطاع الخدمات والتشغيل - معمولة بالفعل ✅
    { id: 'nursery', title: 'نظام إدارة الحضانات', icon: Baby, desc: 'متابعة الأطفال والرسوم', color: 'bg-rose-100 text-rose-600', href: '/dashboard/nursery', category: 'services', status: 'ready' },
    { id: 'carwash', title: 'نظام مغاسل السيارات', icon: Car, desc: 'حجوزات وخدمات وإدارة', color: 'bg-cyan-100 text-cyan-600', href: '/dashboard/carwash', category: 'services', status: 'ready' },
    { id: 'cleaning', title: 'نظام خدمات التنظيف', icon: Wrench, desc: 'أوامر شغل وفنيين وتقارير', color: 'bg-indigo-100 text-indigo-600', href: '/dashboard/cleaning', category: 'services', status: 'ready' },
    { id: 'laundry', title: 'نظام إدارة المغاسل', icon: ShirtIcon, desc: 'استلام وتسليم وتتبع', color: 'bg-sky-100 text-sky-600', href: '/dashboard/laundry', category: 'services', status: 'ready' },

    // قطاع الأعمال والأصول - معمولة بالفعل ✅
    { id: 'realestate', title: 'نظام إدارة العقارات', icon: Home, desc: 'بيع وإيجار وعملاء', color: 'bg-green-100 text-green-700', href: '/dashboard/realestate', category: 'business', status: 'ready' },
    { id: 'contracting', title: 'نظام المقاولات', icon: Wrench, desc: 'مشاريع وعقود وفريق عمل', color: 'bg-slate-100 text-slate-600', href: '/dashboard/contracting', category: 'business', status: 'ready' },
    { id: 'cars', title: 'نظام إدارة السيارات', icon: Car, desc: 'أسطول وصيانة واختبارات', color: 'bg-blue-100 text-blue-800', href: '/dashboard/cars', category: 'business', status: 'ready' },
    { id: 'services', title: 'نظام الخدمات العامة', icon: Users, desc: 'إدارة الخدمات والعملاء', color: 'bg-amber-100 text-amber-600', href: '/dashboard/services', category: 'business', status: 'ready' },

    // أنظمة إضافية - لوحة التحكم ✅
    { id: 'bookings', title: 'لوحة الحجوزات المركزية', icon: Calendar, desc: 'إدارة جميع الحجوزات والتقارير', color: 'bg-indigo-100 text-indigo-600', href: '/dashboard/bookings', category: 'admin', status: 'ready' },
    
    // قطاع التجارة والمطاعم - الموردين ✅
    { id: 'supplier', title: 'لوحة الموردين', icon: Truck, desc: 'إدارة الموردين والمنتجات والمخزون', color: 'bg-orange-100 text-orange-700', href: '/supplier/dashboard', category: 'commerce', status: 'ready' },
  ];

  const categories = [
    { id: 'all', label: 'جميع الأنظمة', count: 17 },
    { id: 'commerce', label: 'التجارة والمطاعم', count: 5 },
    { id: 'health', label: 'الصحة واللياقة', count: 4 },
    { id: 'services', label: 'الخدمات والتشغيل', count: 4 },
    { id: 'business', label: 'الأعمال والأصول', count: 4 },
    { id: 'admin', label: 'لوحة التحكم', count: 1 },
  ];

  const filteredSystems = systems.filter(sys => {
    const matchesSearch = sys.title.includes(searchTerm) || sys.desc.includes(searchTerm);
    const matchesCategory = selectedCategory === 'all' || sys.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <Link href="/admin" className="p-2 hover:bg-gray-100 rounded-lg transition">
                <ArrowLeft className="w-6 h-6 text-gray-600" />
              </Link>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">جميع الأنظمة</h1>
                <p className="text-sm text-gray-600 mt-1">17 نظام متخصص + 44+ مكون متقدم</p>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-full">
              <LayoutGrid className="w-5 h-5 text-blue-600" />
              <span className="font-bold text-blue-600">{filteredSystems.length} نظام</span>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute right-4 top-3.5 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="ابحث عن نظام..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pr-12 pl-4 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Category Filter */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="w-5 h-5 text-gray-600" />
            <h2 className="text-lg font-bold text-gray-900">تصفية حسب القطاع</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`p-4 rounded-xl border-2 transition-all duration-200 font-bold text-center ${
                  selectedCategory === cat.id
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-200 bg-white text-gray-700 hover:border-blue-300'
                }`}
              >
                <div className="text-sm">{cat.label}</div>
                <div className="text-xs text-gray-500 mt-1">{cat.count} نظام</div>
              </button>
            ))}
          </div>
        </div>

        {/* Systems Grid */}
        {filteredSystems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredSystems.map((system) => (
              <Link
                key={system.id}
                href={system.href}
                className="group bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-xl hover:border-blue-300 transition-all duration-300 overflow-hidden"
              >
                <div className="p-6">
                  {/* Header with Status */}
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${system.color} group-hover:scale-110 transition-transform duration-300`}>
                      <system.icon className="w-7 h-7 text-white" />
                    </div>
                    {system.status === 'ready' ? (
                      <div className="flex items-center gap-1 bg-green-50 px-2 py-1 rounded-lg">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <span className="text-xs font-bold text-green-600">جاهز</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-lg">
                        <AlertCircle className="w-4 h-4 text-yellow-600" />
                        <span className="text-xs font-bold text-yellow-600">قريباً</span>
                      </div>
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="font-bold text-lg text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {system.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-gray-600 mb-4">{system.desc}</p>

                  {/* CTA */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <span className="text-sm font-bold text-blue-600">الدخول</span>
                    <ChevronRight className="w-4 h-4 text-blue-600 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Search className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">لم نجد نتائج</h3>
            <p className="text-gray-600">حاول البحث عن نظام آخر أو اختر قطاع مختلف</p>
          </div>
        )}
      </div>

      {/* Completed Dashboards Section */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-2">
          <CheckCircle className="w-8 h-8 text-green-600" />
          اللوحات والملفات المنجزة
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Clothing System */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Shirt className="w-5 h-5 text-pink-600" />
              نظام الملابس
            </h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>✅ ClothingDashboard.tsx</li>
              <li>✅ ClothingOverview.tsx</li>
              <li>✅ OnlineStore.tsx</li>
              <li>✅ ClothingAnalytics.tsx</li>
              <li>✅ GalleryManager.tsx</li>
              <li>✅ SizingChart.tsx</li>
            </ul>
          </div>

          {/* Bookings System */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-indigo-600" />
              نظام الحجوزات
            </h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>✅ BookingsDashboard.tsx</li>
              <li>✅ BookingsOverview.tsx</li>
              <li>✅ BookingsCalendar.tsx</li>
              <li>✅ BookingsList.tsx</li>
              <li>✅ BookingForm.tsx</li>
              <li>✅ BookingAnalytics.tsx</li>
            </ul>
          </div>

          {/* Pharmacy System */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Pill className="w-5 h-5 text-emerald-600" />
              نظام الصيدليات
            </h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>✅ PharmacyDashboard.tsx</li>
              <li>✅ PharmacyOverview.tsx</li>
              <li>✅ PrescriptionsManager.tsx</li>
              <li>✅ PharmacyInventory.tsx</li>
              <li>✅ ConsultationsManager.tsx</li>
              <li>✅ DrugInteractions.tsx</li>
              <li>✅ PharmacyPOS.tsx</li>
            </ul>
          </div>

          {/* Salon System */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Scissors className="w-5 h-5 text-purple-600" />
              نظام الصالونات
            </h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>✅ SalonDashboard.tsx</li>
              <li>✅ SalonOverview.tsx</li>
              <li>✅ ServicesManager.tsx</li>
              <li>✅ AppointmentsManager.tsx</li>
              <li>✅ StaffManager.tsx</li>
              <li>✅ SalonInventory.tsx</li>
            </ul>
          </div>

          {/* Clinic System */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Stethoscope className="w-5 h-5 text-teal-600" />
              نظام العيادات
            </h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>✅ ClinicDashboard.tsx</li>
              <li>✅ ClinicOverview.tsx</li>
              <li>✅ AppointmentsManager.tsx</li>
              <li>✅ MedicalRecords.tsx</li>
              <li>✅ PatientsDirectory.tsx</li>
            </ul>
          </div>

          {/* Gym System */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Dumbbell className="w-5 h-5 text-yellow-600" />
              نظام الأندية الرياضية
            </h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>✅ GymDashboard.tsx</li>
              <li>✅ GymOverview.tsx</li>
              <li>✅ MembersView.tsx</li>
              <li>✅ ClassesManager.tsx</li>
              <li>✅ TrainingPrograms.tsx</li>
            </ul>
          </div>

          {/* Nursery System */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Baby className="w-5 h-5 text-rose-600" />
              نظام الحضانات
            </h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>✅ NurseryOverview.tsx</li>
              <li>✅ ChildrenManager.tsx</li>
            </ul>
          </div>

          {/* Real Estate System */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Home className="w-5 h-5 text-green-700" />
              نظام العقارات
            </h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>✅ RealEstateOverview.tsx</li>
              <li>✅ PropertiesManager.tsx</li>
              <li>✅ LeadsManager.tsx</li>
            </ul>
          </div>

          {/* Cars System */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Car className="w-5 h-5 text-blue-800" />
              نظام السيارات
            </h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>✅ CarsOverview.tsx</li>
              <li>✅ InventoryManager.tsx</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="mt-16 bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-8 text-white">
        <h2 className="text-2xl font-bold mb-8">إحصائيات النظام</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          <div>
            <div className="text-3xl font-black mb-2">17</div>
            <p className="text-blue-100">نظام متخصص</p>
          </div>
          <div>
            <div className="text-3xl font-black mb-2">44+</div>
            <p className="text-blue-100">مكون متقدم</p>
          </div>
          <div>
            <div className="text-3xl font-black mb-2">5</div>
            <p className="text-blue-100">قطاعات رئيسية</p>
          </div>
          <div>
            <div className="text-3xl font-black mb-2">100%</div>
            <p className="text-blue-100">جاهز للاستخدام</p>
          </div>
          <div>
            <div className="text-3xl font-black mb-2">∞</div>
            <p className="text-blue-100">قابل للتوسع</p>
          </div>
        </div>
      </div>
    </div>
  );
}
