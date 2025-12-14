"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Users, Search, Filter, Star, MapPin, Phone, Mail, 
  ChevronRight, Building2, Package, Truck, Clock
} from 'lucide-react';

export default function SuppliersPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'جميع الفئات' },
    { id: 'electronics', name: 'إلكترونيات' },
    { id: 'food', name: 'مواد غذائية' },
    { id: 'clothing', name: 'ملابس' },
    { id: 'medical', name: 'مستلزمات طبية' },
    { id: 'construction', name: 'مواد بناء' },
    { id: 'furniture', name: 'أثاث' },
    { id: 'cosmetics', name: 'مستحضرات تجميل' },
    { id: 'cleaning', name: 'مواد تنظيف' },
    { id: 'other', name: 'أخرى' }
  ];

  const suppliers = [
    {
      id: 1,
      name: 'شركة النور للمواد الغذائية',
      category: 'food',
      rating: 4.8,
      location: 'القاهرة',
      phone: '01012345678',
      email: 'info@alnour-food.com',
      description: 'توريد جميع أنواع المواد الغذائية للفنادق والمطاعم',
      products: ['مواد غذائية', 'مخبوزات', 'مشروبات'],
      delivery: '24 ساعة',
      verified: true
    },
    {
      id: 2,
      name: 'مصر للإلكترونيات',
      category: 'electronics',
      rating: 4.6,
      location: 'الجيزة',
      phone: '01234567890',
      email: 'sales@egypt-electronics.com',
      description: 'توريد الأجهزة الإلكترونية والمعدات التقنية',
      products: ['هواتف', 'كمبيوتر', 'ملحقات'],
      delivery: '48 ساعة',
      verified: true
    },
    {
      id: 3,
      name: 'الملابس الجاهزة',
      category: 'clothing',
      rating: 4.5,
      location: 'الإسكندرية',
      phone: '01123456789',
      email: 'info@ready-clothing.com',
      description: 'توريد الملابس الجاهزة للمحلات التجارية',
      products: ['رجالي', 'نسائي', 'أطفال'],
      delivery: '72 ساعة',
      verified: false
    },
    {
      id: 4,
      name: 'المستلزمات الطبية',
      category: 'medical',
      rating: 4.9,
      location: 'القاهرة',
      phone: '01098765432',
      email: 'medical@supplies.com',
      description: 'توريد جميع المستلزمات الطبية للعيادات والمستشفيات',
      products: ['معدات طبية', 'أدوات جراحية', 'مستلزمات وقائية'],
      delivery: '12 ساعة',
      verified: true
    },
    {
      id: 5,
      name: 'مواد البناء المتقدمة',
      category: 'construction',
      rating: 4.4,
      location: 'العاشر من رمضان',
      phone: '01234567891',
      email: 'info@building-materials.com',
      description: 'توريد مواد البناء للمقاولات والمشاريع',
      products: ['أسمنت', 'حديد', 'طوب'],
      delivery: '48 ساعة',
      verified: true
    },
    {
      id: 6,
      name: 'الأثاث الحديث',
      category: 'furniture',
      rating: 4.7,
      location: 'الدقي',
      phone: '01012345679',
      email: 'furniture@modern.com',
      description: 'توريد الأثاث للمكاتب والمنازل',
      products: ['مكاتب', 'كراسي', 'طاولات'],
      delivery: '72 ساعة',
      verified: false
    }
  ];

  const filteredSuppliers = suppliers.filter(supplier => {
    const matchesSearch = supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         supplier.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || supplier.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleContactSupplier = (supplier: typeof suppliers[0]) => {
    router.push(`/suppliers/${supplier.id}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <button 
                onClick={() => router.push('/systems')}
                className="text-gray-600 hover:text-gray-900 transition"
              >
                ← العودة
              </button>
              <div className="flex items-center gap-2">
                <Users className="w-6 h-6 text-blue-600" />
                <h1 className="text-xl font-bold text-gray-900">الموردين</h1>
              </div>
            </div>
            <button
              onClick={() => router.push('/suppliers/register')}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-blue-700 transition"
            >
              سجل كمورد
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">منصة الموردين الموثوقين</h2>
            <p className="text-blue-100 text-lg mb-8">
              تواصل مع أفضل الموردين في مصر. أكثر من 500 مورد موثوق في مختلف المجالات
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute right-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="ابحث عن مورد أو منتج..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pr-10 pl-4 py-3 rounded-lg text-gray-900 placeholder-gray-500"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Filter */}
      <section className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-2 overflow-x-auto">
            <Filter className="w-5 h-5 text-gray-600" />
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-lg font-bold transition whitespace-nowrap ${
                  selectedCategory === category.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Suppliers Grid */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSuppliers.map(supplier => (
              <div key={supplier.id} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition p-6">
                {/* Header */}
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Building2 className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900">{supplier.name}</h3>
                      {supplier.verified && (
                        <span className="inline-flex items-center gap-1 text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                          <Star className="w-3 h-3" />
                          موثوق
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="text-left">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500" />
                      <span className="font-bold text-gray-900">{supplier.rating}</span>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-600 text-sm mb-4">{supplier.description}</p>

                {/* Products */}
                <div className="mb-4">
                  <p className="text-sm font-bold text-gray-700 mb-2">المنتجات:</p>
                  <div className="flex flex-wrap gap-1">
                    {supplier.products.map((product, index) => (
                      <span key={index} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                        {product}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Info */}
                <div className="space-y-2 text-sm text-gray-600 mb-4">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span>{supplier.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Truck className="w-4 h-4" />
                    <span>توصيل خلال {supplier.delivery}</span>
                  </div>
                </div>

                {/* Contact Button */}
                <button
                  onClick={() => handleContactSupplier(supplier)}
                  className="w-full bg-blue-600 text-white py-2 rounded-lg font-bold hover:bg-blue-700 transition flex items-center justify-center gap-2"
                >
                  تواصل مع المورد
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          {filteredSuppliers.length === 0 && (
            <div className="text-center py-12">
              <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">لم يتم العثور على موردين</h3>
              <p className="text-gray-600">حاول تغيير معايير البحث أو الفئة</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-50 py-12">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            هل أنت مورد؟ انضم لمنصتنا
          </h2>
          <p className="text-gray-600 mb-6">
            انضم إلى أكثر من 500 مورد ووصل إلى آلاف التجار في جميع أنحاء مصر
          </p>
          <button
            onClick={() => router.push('/suppliers/register')}
            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-700 transition"
          >
            سجل كمورد الآن
          </button>
        </div>
      </section>
    </div>
  );
}
