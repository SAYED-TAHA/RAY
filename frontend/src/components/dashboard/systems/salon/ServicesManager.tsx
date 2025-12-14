/**
 * مدير خدمات الصالون
 * إدارة الخدمات والأسعار والعاملين
 */

import React, { useState } from 'react';
import {
  Scissors, Plus, Edit, Trash2, Search, Filter,
  Clock, DollarSign, Users, Star, TrendingUp, Settings2
} from 'lucide-react';

interface Service {
  id: string;
  name: string;
  category: 'hair' | 'nails' | 'skin' | 'makeup' | 'spa';
  description: string;
  price: number;
  duration: number;
  staff: string[];
  popularity: number;
  rating: number;
  reviews: number;
  isActive: boolean;
}

const initialServices: Service[] = [
  {
    id: 'srv-001',
    name: 'قص الشعر الرجالي',
    category: 'hair',
    description: 'قص شعر احترافي للرجال',
    price: 50,
    duration: 30,
    staff: ['أحمد', 'محمود'],
    popularity: 95,
    rating: 4.8,
    reviews: 145,
    isActive: true
  },
  {
    id: 'srv-002',
    name: 'تسريحة شعر نسائية',
    category: 'hair',
    description: 'تسريحات شعر حديثة للنساء',
    price: 150,
    duration: 60,
    staff: ['فاطمة', 'سارة', 'ليلى'],
    popularity: 98,
    rating: 4.9,
    reviews: 287,
    isActive: true
  },
  {
    id: 'srv-003',
    name: 'صبغ الشعر',
    category: 'hair',
    description: 'صبغ شعر احترافي بأفضل الألوان',
    price: 200,
    duration: 90,
    staff: ['فاطمة', 'سارة'],
    popularity: 85,
    rating: 4.7,
    reviews: 156,
    isActive: true
  },
  {
    id: 'srv-004',
    name: 'تجميل الأظافر',
    category: 'nails',
    description: 'تجميل وتلميع الأظافر',
    price: 80,
    duration: 45,
    staff: ['ليلى', 'نور'],
    popularity: 88,
    rating: 4.6,
    reviews: 98,
    isActive: true
  },
  {
    id: 'srv-005',
    name: 'ماسك الوجه',
    category: 'skin',
    description: 'ماسك تنظيف وتغذية الوجه',
    price: 120,
    duration: 60,
    staff: ['نور', 'هند'],
    popularity: 75,
    rating: 4.5,
    reviews: 67,
    isActive: true
  }
];

const categories: Record<string, string> = {
  hair: 'الشعر',
  nails: 'الأظافر',
  skin: 'العناية بالبشرة',
  makeup: 'المكياج',
  spa: 'منتجع صحي'
};

const ServicesManager: React.FC = () => {
  const [services, setServices] = useState<Service[]>(initialServices);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState<'all' | 'hair' | 'nails' | 'skin' | 'makeup' | 'spa'>('all');
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  const filteredServices = services.filter(srv => {
    const matchesSearch = srv.name.includes(searchTerm) || srv.description.includes(searchTerm);
    const matchesCategory = filterCategory === 'all' || srv.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="h-full flex flex-col space-y-6 animate-in fade-in slide-in-from-bottom-2">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <Scissors className="w-6 h-6 text-pink-600" />
            إدارة الخدمات
          </h2>
          <p className="text-sm text-gray-500">إدارة خدمات الصالون والأسعار</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition">
          <Plus className="w-5 h-5" />
          خدمة جديدة
        </button>
      </div>

      {/* Controls */}
      <div className="flex gap-4 flex-wrap">
        {/* Search */}
        <div className="flex-1 min-w-64 relative">
          <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="ابحث عن خدمة..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-500"
          />
        </div>

        {/* Category Filter */}
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value as any)}
          className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-500"
        >
          <option value="all">جميع الفئات</option>
          <option value="hair">الشعر</option>
          <option value="nails">الأظافر</option>
          <option value="skin">العناية بالبشرة</option>
          <option value="makeup">المكياج</option>
          <option value="spa">منتجع صحي</option>
        </select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Services Grid */}
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredServices.map(service => (
            <button
              key={service.id}
              onClick={() => setSelectedService(service)}
              className={`p-4 rounded-xl border-2 transition text-left ${
                selectedService?.id === service.id
                  ? 'border-pink-600 bg-pink-50'
                  : 'border-gray-200 hover:border-pink-300'
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-800">{service.name}</h4>
                  <p className="text-xs text-gray-500">{categories[service.category]}</p>
                </div>
                {service.isActive && (
                  <span className="w-2 h-2 bg-green-500 rounded-full mt-1"></span>
                )}
              </div>

              <p className="text-xs text-gray-600 mb-3">{service.description}</p>

              <div className="grid grid-cols-2 gap-2 mb-3 text-xs">
                <div className="flex items-center gap-1 text-gray-600">
                  <DollarSign className="w-3 h-3" />
                  {service.price} ج
                </div>
                <div className="flex items-center gap-1 text-gray-600">
                  <Clock className="w-3 h-3" />
                  {service.duration} دقيقة
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                  <span className="text-xs font-semibold text-gray-800">{service.rating}</span>
                  <span className="text-xs text-gray-500">({service.reviews})</span>
                </div>
                <div className="w-16 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-pink-500"
                    style={{ width: `${service.popularity}%` }}
                  />
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Service Details */}
        {selectedService && (
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden flex flex-col">
            <div className="p-4 border-b border-gray-200">
              <h3 className="font-bold text-gray-800 mb-1">{selectedService.name}</h3>
              <p className="text-xs text-gray-500">{categories[selectedService.category]}</p>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {/* Info */}
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">السعر:</span>
                  <span className="font-semibold text-gray-800">{selectedService.price} ج</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">المدة:</span>
                  <span className="font-semibold text-gray-800">{selectedService.duration} دقيقة</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">التقييم:</span>
                  <span className="font-semibold text-gray-800 flex items-center gap-1">
                    <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                    {selectedService.rating} ({selectedService.reviews} تقييم)
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">الشعبية:</span>
                  <span className="font-semibold text-gray-800">{selectedService.popularity}%</span>
                </div>
              </div>

              {/* Description */}
              <div>
                <h4 className="font-semibold text-gray-800 mb-2 text-sm">الوصف</h4>
                <p className="text-xs text-gray-600">{selectedService.description}</p>
              </div>

              {/* Staff */}
              <div>
                <h4 className="font-semibold text-gray-800 mb-2 text-sm flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  الموظفون
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedService.staff.map(person => (
                    <span key={person} className="px-2 py-1 bg-pink-100 text-pink-700 rounded-full text-xs font-semibold">
                      {person}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="p-4 border-t border-gray-200 space-y-2">
              <button className="w-full px-3 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition text-sm font-semibold flex items-center justify-center gap-2">
                <Edit className="w-4 h-4" />
                تعديل
              </button>
              <button className="w-full px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition text-sm font-semibold flex items-center justify-center gap-2">
                <Trash2 className="w-4 h-4" />
                حذف
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ServicesManager;
