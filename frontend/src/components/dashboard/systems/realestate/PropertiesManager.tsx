/**
 * مدير العقارات
 * إدارة العقارات والوحدات السكنية
 */

import React, { useState } from 'react';
import {
  Home, Search, Plus, Edit, Trash2, MapPin, DollarSign,
  Bed, Bath, Ruler, Eye, Filter, Download, Star, Heart
} from 'lucide-react';

interface Property {
  id: string;
  title: string;
  type: 'apartment' | 'villa' | 'townhouse' | 'land' | 'commercial';
  location: string;
  price: number;
  area: number;
  bedrooms: number;
  bathrooms: number;
  status: 'available' | 'sold' | 'rented' | 'pending';
  description: string;
  images: number;
  views: number;
  likes: number;
  agent: string;
  listingDate: string;
}

const initialProperties: Property[] = [
  {
    id: 'prop-001',
    title: 'شقة فاخرة بالمعادي',
    type: 'apartment',
    location: 'المعادي، القاهرة',
    price: 2500000,
    area: 200,
    bedrooms: 3,
    bathrooms: 2,
    status: 'available',
    description: 'شقة حديثة بإطلالة رائعة',
    images: 8,
    views: 1250,
    likes: 145,
    agent: 'أحمد محمد',
    listingDate: '2024-11-15'
  },
  {
    id: 'prop-002',
    title: 'فيلا فاخرة بالشيخ زايد',
    type: 'villa',
    location: 'الشيخ زايد، الجيزة',
    price: 8500000,
    area: 500,
    bedrooms: 5,
    bathrooms: 4,
    status: 'available',
    description: 'فيلا حديثة بحديقة واسعة',
    images: 12,
    views: 2100,
    likes: 320,
    agent: 'فاطمة علي',
    listingDate: '2024-11-10'
  },
  {
    id: 'prop-003',
    title: 'شقة بالتجمع الخامس',
    type: 'apartment',
    location: 'التجمع الخامس، القاهرة',
    price: 3200000,
    area: 250,
    bedrooms: 4,
    bathrooms: 3,
    status: 'sold',
    description: 'شقة فاخرة بموقع استراتيجي',
    images: 10,
    views: 1680,
    likes: 210,
    agent: 'محمود حسن',
    listingDate: '2024-10-20'
  },
  {
    id: 'prop-004',
    title: 'أرض بالعاصمة الإدارية',
    type: 'land',
    location: 'العاصمة الإدارية',
    price: 1500000,
    area: 1000,
    bedrooms: 0,
    bathrooms: 0,
    status: 'available',
    description: 'أرض سكنية بموقع ممتاز',
    images: 5,
    views: 890,
    likes: 98,
    agent: 'سارة أحمد',
    listingDate: '2024-11-01'
  }
];

const typeLabels: Record<string, string> = {
  apartment: 'شقة',
  villa: 'فيلا',
  townhouse: 'تاون هاوس',
  land: 'أرض',
  commercial: 'تجاري'
};

const PropertiesManager: React.FC = () => {
  const [properties, setProperties] = useState<Property[]>(initialProperties);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'apartment' | 'villa' | 'townhouse' | 'land' | 'commercial'>('all');
  const [filterStatus, setFilterStatus] = useState<'all' | 'available' | 'sold' | 'rented' | 'pending'>('all');
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);

  const filteredProperties = properties.filter(prop => {
    const matchesSearch = prop.title.includes(searchTerm) || prop.location.includes(searchTerm);
    const matchesType = filterType === 'all' || prop.type === filterType;
    const matchesStatus = filterStatus === 'all' || prop.status === filterStatus;
    return matchesSearch && matchesType && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'bg-green-100 text-green-800';
      case 'sold': return 'bg-blue-100 text-blue-800';
      case 'rented': return 'bg-purple-100 text-purple-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'available': return 'متاح';
      case 'sold': return 'مباع';
      case 'rented': return 'مؤجر';
      case 'pending': return 'معلق';
      default: return status;
    }
  };

  return (
    <div className="h-full flex flex-col space-y-6 animate-in fade-in slide-in-from-bottom-2">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <Home className="w-6 h-6 text-green-600" />
            إدارة العقارات
          </h2>
          <p className="text-sm text-gray-500">إدارة العقارات والوحدات السكنية</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
          <Plus className="w-5 h-5" />
          عقار جديد
        </button>
      </div>

      {/* Controls */}
      <div className="flex gap-4 flex-wrap">
        {/* Search */}
        <div className="flex-1 min-w-64 relative">
          <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="ابحث عن عقار..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* Type Filter */}
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value as any)}
          className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500"
        >
          <option value="all">جميع الأنواع</option>
          <option value="apartment">شقة</option>
          <option value="villa">فيلا</option>
          <option value="townhouse">تاون هاوس</option>
          <option value="land">أرض</option>
          <option value="commercial">تجاري</option>
        </select>

        {/* Status Filter */}
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value as any)}
          className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500"
        >
          <option value="all">جميع الحالات</option>
          <option value="available">متاح</option>
          <option value="sold">مباع</option>
          <option value="rented">مؤجر</option>
          <option value="pending">معلق</option>
        </select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Properties Grid */}
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredProperties.map(property => (
            <button
              key={property.id}
              onClick={() => setSelectedProperty(property)}
              className={`p-4 rounded-xl border-2 transition text-left overflow-hidden ${
                selectedProperty?.id === property.id
                  ? 'border-green-600 bg-green-50'
                  : 'border-gray-200 hover:border-green-300'
              }`}
            >
              {/* Image Placeholder */}
              <div className="w-full h-40 bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg mb-3 flex items-center justify-center">
                <Home className="w-12 h-12 text-gray-400" />
              </div>

              <h4 className="font-semibold text-gray-800 mb-1 line-clamp-1">{property.title}</h4>
              <div className="flex items-center gap-1 text-xs text-gray-600 mb-2">
                <MapPin className="w-3 h-3" />
                {property.location}
              </div>

              <div className="grid grid-cols-2 gap-2 mb-3 text-xs">
                <div className="flex items-center gap-1 text-gray-600">
                  <DollarSign className="w-3 h-3" />
                  {(property.price / 1000000).toFixed(1)}M
                </div>
                <div className="flex items-center gap-1 text-gray-600">
                  <Ruler className="w-3 h-3" />
                  {property.area} م²
                </div>
                {property.bedrooms > 0 && (
                  <div className="flex items-center gap-1 text-gray-600">
                    <Bed className="w-3 h-3" />
                    {property.bedrooms}
                  </div>
                )}
                {property.bathrooms > 0 && (
                  <div className="flex items-center gap-1 text-gray-600">
                    <Bath className="w-3 h-3" />
                    {property.bathrooms}
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between">
                <span className={`text-xs font-semibold px-2 py-1 rounded-full ${getStatusColor(property.status)}`}>
                  {getStatusLabel(property.status)}
                </span>
                <div className="flex items-center gap-2 text-xs text-gray-600">
                  <Eye className="w-3 h-3" />
                  {property.views}
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Property Details */}
        {selectedProperty && (
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden flex flex-col">
            <div className="p-4 border-b border-gray-200">
              <h3 className="font-bold text-gray-800 mb-1">{selectedProperty.title}</h3>
              <p className="text-xs text-gray-500 flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                {selectedProperty.location}
              </p>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {/* Price & Area */}
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <p className="text-gray-600 mb-1">السعر</p>
                  <p className="font-bold text-gray-900">{(selectedProperty.price / 1000000).toFixed(1)}M ج</p>
                </div>
                <div>
                  <p className="text-gray-600 mb-1">المساحة</p>
                  <p className="font-bold text-gray-900">{selectedProperty.area} م²</p>
                </div>
              </div>

              {/* Rooms */}
              {(selectedProperty.bedrooms > 0 || selectedProperty.bathrooms > 0) && (
                <div className="grid grid-cols-2 gap-2 text-sm">
                  {selectedProperty.bedrooms > 0 && (
                    <div>
                      <p className="text-gray-600 mb-1 flex items-center gap-1">
                        <Bed className="w-4 h-4" />
                        غرف النوم
                      </p>
                      <p className="font-bold text-gray-900">{selectedProperty.bedrooms}</p>
                    </div>
                  )}
                  {selectedProperty.bathrooms > 0 && (
                    <div>
                      <p className="text-gray-600 mb-1 flex items-center gap-1">
                        <Bath className="w-4 h-4" />
                        الحمامات
                      </p>
                      <p className="font-bold text-gray-900">{selectedProperty.bathrooms}</p>
                    </div>
                  )}
                </div>
              )}

              {/* Description */}
              <div>
                <h4 className="font-semibold text-gray-800 mb-1 text-sm">الوصف</h4>
                <p className="text-xs text-gray-600">{selectedProperty.description}</p>
              </div>

              {/* Agent */}
              <div>
                <p className="text-xs text-gray-600 mb-1">الوكيل</p>
                <p className="font-semibold text-gray-800 text-sm">{selectedProperty.agent}</p>
              </div>

              {/* Stats */}
              <div className="flex gap-4 text-xs">
                <div className="flex items-center gap-1">
                  <Eye className="w-3 h-3 text-gray-600" />
                  <span>{selectedProperty.views} مشاهدة</span>
                </div>
                <div className="flex items-center gap-1">
                  <Heart className="w-3 h-3 text-red-600" />
                  <span>{selectedProperty.likes} إعجاب</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="p-4 border-t border-gray-200 space-y-2">
              <button className="w-full px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition text-sm font-semibold flex items-center justify-center gap-2">
                <Edit className="w-4 h-4" />
                تعديل
              </button>
              <button className="w-full px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition text-sm font-semibold flex items-center justify-center gap-2">
                <Download className="w-4 h-4" />
                تقرير
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertiesManager;
