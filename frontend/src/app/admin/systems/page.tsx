'use client';

import React from 'react';
import { LayoutGrid, Plus, Store, ChefHat, Car, Home, Stethoscope, Dumbbell, Wrench, Shirt, Droplets, Scissors, Pill, HardHat, Truck, Utensils, HeartPulse, Baby, Gavel, Briefcase, Sun } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const systems = [
  { id: 'restaurant', name: 'مطاعم', icon: ChefHat, description: 'إدارة المطاعم والمقاهي', color: 'bg-orange-100 text-orange-600' },
  { id: 'retail', name: 'تجزئة', icon: Store, description: 'محلات سوبر ماركت ومتاجر', color: 'bg-blue-100 text-blue-600' },
  { id: 'realestate', name: 'عقارات', icon: Home, description: 'إدارة الوحدات السكنية والتجارية', color: 'bg-green-100 text-green-600' },
  { id: 'cars', name: 'سيارات', icon: Car, description: 'عرض وبيع السيارات', color: 'bg-red-100 text-red-600' },
  { id: 'clinic', name: 'عيادات', icon: Stethoscope, description: 'إدارة العيادات الطبية', color: 'bg-teal-100 text-teal-600' },
  { id: 'gym', name: 'نوادي رياضية', icon: Dumbbell, description: 'إدارة الأندية الرياضية', color: 'bg-yellow-100 text-yellow-600' },
  { id: 'services', name: 'خدمات', icon: Wrench, description: 'شركات الصيانة والخدمات', color: 'bg-blue-100 text-blue-600' },
  { id: 'clothing', name: 'ملابس', icon: Shirt, description: 'محلات الملابس والأزياء', color: 'bg-purple-100 text-purple-600' },
  { id: 'laundry', name: 'مغاسل', icon: Droplets, description: 'مغاسل وخدمات غسيل', color: 'bg-cyan-100 text-cyan-600' },
  { id: 'salon', name: 'صالونات', icon: Scissors, description: 'صالونات تجميل وتصفيف شعر', color: 'bg-pink-100 text-pink-600' },
  { id: 'pharmacy', name: 'صيدليات', icon: Pill, description: 'إدارة الصيدليات', color: 'bg-emerald-100 text-emerald-600' },
  { id: 'contracting', name: 'مقاولات', icon: HardHat, description: 'شركات المقاولات والبناء', color: 'bg-orange-100 text-orange-600' },
  { id: 'carwash', name: 'غسيل سيارات', icon: Truck, description: 'مراكز غسيل السيارات', color: 'bg-cyan-100 text-cyan-600' },
  { id: 'bookings', name: 'حجوزات', icon: HeartPulse, description: 'إدارة أنظمة الحجوزات', color: 'bg-rose-100 text-rose-600' },
  { id: 'nursery', name: 'حضانات', icon: Baby, description: 'إدارة الحضانات ورياض الأطفال', color: 'bg-pink-100 text-pink-600' },
  { id: 'law', name: 'محاماة', icon: Gavel, description: 'مكاتب المحاماة والاستشارات القانونية', color: 'bg-slate-100 text-slate-600' },
  { id: 'consulting', name: 'استشارات', icon: Briefcase, description: 'شركات الاستشارات الإدارية', color: 'bg-blue-100 text-blue-600' },
  { id: 'resort', name: 'منتجعات', icon: Sun, description: 'إدارة المنتعات والفنادق', color: 'bg-amber-100 text-amber-600' },
];

export default function SystemsPage() {
  const router = useRouter();

  const handleSystemClick = (systemId: string) => {
    router.push(`/dashboard?type=${systemId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link href="/admin" className="p-2 hover:bg-gray-100 rounded-lg transition">
                <LayoutGrid className="w-6 h-6 text-gray-600" />
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">الأنظمة</h1>
                <p className="text-sm text-gray-600">إدارة الأنظمة والقطاعات</p>
              </div>
            </div>
            <button disabled className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg opacity-60 cursor-not-allowed">
              <Plus className="w-4 h-4" />
              نظام جديد
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {systems.map((system) => {
            const IconComponent = system.icon;
            return (
              <div
                key={system.id}
                onClick={() => handleSystemClick(system.id)}
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer hover:border-blue-300"
              >
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${system.color}`}>
                  <IconComponent className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{system.name}</h3>
                <p className="text-sm text-gray-600">{system.description}</p>
                <div className="mt-4 text-blue-600 text-sm font-medium hover:text-blue-700">
                  ادخل إلى اللوحة →
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
