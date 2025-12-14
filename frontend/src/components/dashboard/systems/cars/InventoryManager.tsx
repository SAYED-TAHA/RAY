/**
 * مدير مخزون السيارات
 * إدارة مخزون السيارات والمركبات
 */

import React, { useState } from 'react';
import {
  Car, Search, Plus, Edit, Trash2, DollarSign, Gauge,
  Calendar, MapPin, Filter, Eye, TrendingUp, AlertCircle
} from 'lucide-react';

interface Vehicle {
  id: string;
  make: string;
  model: string;
  year: number;
  color: string;
  price: number;
  mileage: number;
  fuelType: 'petrol' | 'diesel' | 'hybrid' | 'electric';
  transmission: 'manual' | 'automatic';
  status: 'available' | 'sold' | 'reserved' | 'maintenance';
  location: string;
  description: string;
  images: number;
  views: number;
  listingDate: string;
  seller: string;
}

const initialVehicles: Vehicle[] = [
  {
    id: 'car-001',
    make: 'Toyota',
    model: 'Camry',
    year: 2023,
    color: 'أسود',
    price: 850000,
    mileage: 15000,
    fuelType: 'petrol',
    transmission: 'automatic',
    status: 'available',
    location: 'القاهرة',
    description: 'سيارة حديثة بحالة ممتازة',
    images: 8,
    views: 450,
    listingDate: '2024-11-20',
    seller: 'أحمد محمد'
  },
  {
    id: 'car-002',
    make: 'BMW',
    model: '320i',
    year: 2022,
    color: 'أبيض',
    price: 1200000,
    mileage: 25000,
    fuelType: 'petrol',
    transmission: 'automatic',
    status: 'available',
    location: 'الجيزة',
    description: 'سيارة فاخرة بمواصفات عالية',
    images: 12,
    views: 890,
    listingDate: '2024-11-15',
    seller: 'فاطمة علي'
  },
  {
    id: 'car-003',
    make: 'Hyundai',
    model: 'Elantra',
    year: 2021,
    color: 'فضي',
    price: 650000,
    mileage: 45000,
    fuelType: 'petrol',
    transmission: 'manual',
    status: 'sold',
    location: 'الإسكندرية',
    description: 'سيارة اقتصادية وموثوقة',
    images: 6,
    views: 320,
    listingDate: '2024-10-25',
    seller: 'محمود حسن'
  },
  {
    id: 'car-004',
    make: 'Mercedes',
    model: 'C-Class',
    year: 2024,
    color: 'أحمر',
    price: 1800000,
    mileage: 5000,
    fuelType: 'petrol',
    transmission: 'automatic',
    status: 'reserved',
    location: 'القاهرة',
    description: 'سيارة جديدة فاخرة جداً',
    images: 15,
    views: 1200,
    listingDate: '2024-11-22',
    seller: 'سارة أحمد'
  }
];

const InventoryManager: React.FC = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>(initialVehicles);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'available' | 'sold' | 'reserved' | 'maintenance'>('all');
  const [filterFuel, setFilterFuel] = useState<'all' | 'petrol' | 'diesel' | 'hybrid' | 'electric'>('all');
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);

  const filteredVehicles = vehicles.filter(vehicle => {
    const matchesSearch = vehicle.make.includes(searchTerm) || vehicle.model.includes(searchTerm) || vehicle.location.includes(searchTerm);
    const matchesStatus = filterStatus === 'all' || vehicle.status === filterStatus;
    const matchesFuel = filterFuel === 'all' || vehicle.fuelType === filterFuel;
    return matchesSearch && matchesStatus && matchesFuel;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'bg-green-100 text-green-800';
      case 'sold': return 'bg-blue-100 text-blue-800';
      case 'reserved': return 'bg-yellow-100 text-yellow-800';
      case 'maintenance': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'available': return 'متاح';
      case 'sold': return 'مباع';
      case 'reserved': return 'محجوز';
      case 'maintenance': return 'صيانة';
      default: return status;
    }
  };

  const getFuelLabel = (fuel: string) => {
    switch (fuel) {
      case 'petrol': return 'بنزين';
      case 'diesel': return 'ديزل';
      case 'hybrid': return 'هجين';
      case 'electric': return 'كهربائي';
      default: return fuel;
    }
  };

  const stats = {
    total: vehicles.length,
    available: vehicles.filter(v => v.status === 'available').length,
    sold: vehicles.filter(v => v.status === 'sold').length,
    reserved: vehicles.filter(v => v.status === 'reserved').length,
    totalValue: vehicles.filter(v => v.status === 'available').reduce((sum, v) => sum + v.price, 0)
  };

  return (
    <div className="h-full flex flex-col space-y-6 animate-in fade-in slide-in-from-bottom-2">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <Car className="w-6 h-6 text-blue-600" />
            مخزون السيارات
          </h2>
          <p className="text-sm text-gray-500">إدارة مخزون السيارات والمركبات</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
          <Plus className="w-5 h-5" />
          سيارة جديدة
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="bg-white p-4 rounded-xl border border-gray-200">
          <p className="text-sm text-gray-600 mb-1">إجمالي السيارات</p>
          <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
        </div>
        <div className="bg-green-50 p-4 rounded-xl border border-green-200">
          <p className="text-sm text-green-700 mb-1">متاح</p>
          <p className="text-2xl font-bold text-green-900">{stats.available}</p>
        </div>
        <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
          <p className="text-sm text-blue-700 mb-1">مباع</p>
          <p className="text-2xl font-bold text-blue-900">{stats.sold}</p>
        </div>
        <div className="bg-yellow-50 p-4 rounded-xl border border-yellow-200">
          <p className="text-sm text-yellow-700 mb-1">محجوز</p>
          <p className="text-2xl font-bold text-yellow-900">{stats.reserved}</p>
        </div>
        <div className="bg-purple-50 p-4 rounded-xl border border-purple-200">
          <p className="text-sm text-purple-700 mb-1">قيمة المخزون</p>
          <p className="text-2xl font-bold text-purple-900">{(stats.totalValue / 1000000).toFixed(1)}M</p>
        </div>
      </div>

      {/* Controls */}
      <div className="flex gap-4 flex-wrap">
        {/* Search */}
        <div className="flex-1 min-w-64 relative">
          <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="ابحث عن سيارة..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Status Filter */}
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value as any)}
          className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">جميع الحالات</option>
          <option value="available">متاح</option>
          <option value="sold">مباع</option>
          <option value="reserved">محجوز</option>
          <option value="maintenance">صيانة</option>
        </select>

        {/* Fuel Filter */}
        <select
          value={filterFuel}
          onChange={(e) => setFilterFuel(e.target.value as any)}
          className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">جميع أنواع الوقود</option>
          <option value="petrol">بنزين</option>
          <option value="diesel">ديزل</option>
          <option value="hybrid">هجين</option>
          <option value="electric">كهربائي</option>
        </select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Vehicles Grid */}
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredVehicles.map(vehicle => (
            <button
              key={vehicle.id}
              onClick={() => setSelectedVehicle(vehicle)}
              className={`p-4 rounded-xl border-2 transition text-left overflow-hidden ${
                selectedVehicle?.id === vehicle.id
                  ? 'border-blue-600 bg-blue-50'
                  : 'border-gray-200 hover:border-blue-300'
              }`}
            >
              {/* Image Placeholder */}
              <div className="w-full h-40 bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg mb-3 flex items-center justify-center">
                <Car className="w-12 h-12 text-gray-400" />
              </div>

              <h4 className="font-semibold text-gray-800 mb-1">{vehicle.make} {vehicle.model}</h4>
              <div className="flex items-center gap-1 text-xs text-gray-600 mb-2">
                <Calendar className="w-3 h-3" />
                {vehicle.year}
              </div>

              <div className="grid grid-cols-2 gap-2 mb-3 text-xs">
                <div className="flex items-center gap-1 text-gray-600">
                  <DollarSign className="w-3 h-3" />
                  {(vehicle.price / 1000).toFixed(0)}K
                </div>
                <div className="flex items-center gap-1 text-gray-600">
                  <Gauge className="w-3 h-3" />
                  {vehicle.mileage}km
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className={`text-xs font-semibold px-2 py-1 rounded-full ${getStatusColor(vehicle.status)}`}>
                  {getStatusLabel(vehicle.status)}
                </span>
                <div className="flex items-center gap-2 text-xs text-gray-600">
                  <Eye className="w-3 h-3" />
                  {vehicle.views}
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Vehicle Details */}
        {selectedVehicle && (
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden flex flex-col">
            <div className="p-4 border-b border-gray-200">
              <h3 className="font-bold text-gray-800 mb-1">{selectedVehicle.make} {selectedVehicle.model}</h3>
              <p className="text-xs text-gray-500">{selectedVehicle.year}</p>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {/* Price & Mileage */}
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <p className="text-gray-600 mb-1">السعر</p>
                  <p className="font-bold text-gray-900">{(selectedVehicle.price / 1000).toFixed(0)}K ج</p>
                </div>
                <div>
                  <p className="text-gray-600 mb-1">المسافة</p>
                  <p className="font-bold text-gray-900">{selectedVehicle.mileage}km</p>
                </div>
              </div>

              {/* Details */}
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">اللون:</span>
                  <span className="font-semibold text-gray-800">{selectedVehicle.color}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">نوع الوقود:</span>
                  <span className="font-semibold text-gray-800">{getFuelLabel(selectedVehicle.fuelType)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">الناقل:</span>
                  <span className="font-semibold text-gray-800">{selectedVehicle.transmission === 'automatic' ? 'أوتوماتيكي' : 'يدوي'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">الموقع:</span>
                  <span className="font-semibold text-gray-800">{selectedVehicle.location}</span>
                </div>
              </div>

              {/* Description */}
              <div>
                <h4 className="font-semibold text-gray-800 mb-1 text-sm">الوصف</h4>
                <p className="text-xs text-gray-600">{selectedVehicle.description}</p>
              </div>

              {/* Seller */}
              <div>
                <p className="text-xs text-gray-600 mb-1">البائع</p>
                <p className="font-semibold text-gray-800 text-sm">{selectedVehicle.seller}</p>
              </div>

              {/* Stats */}
              <div className="flex gap-4 text-xs">
                <div className="flex items-center gap-1">
                  <Eye className="w-3 h-3 text-gray-600" />
                  <span>{selectedVehicle.views} مشاهدة</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-gray-600" />
                  <span>{selectedVehicle.listingDate}</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="p-4 border-t border-gray-200 space-y-2">
              <button className="w-full px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm font-semibold flex items-center justify-center gap-2">
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

export default InventoryManager;
