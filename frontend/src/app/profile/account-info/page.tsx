'use client';

import React, { useState } from 'react';
import { ArrowLeft, User, Mail, Phone, Camera, Save } from 'lucide-react';
import Link from 'next/link';

export default function AccountInfoPage() {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: 'أحمد',
    lastName: 'محمد',
    email: 'ahmed@example.com',
    phone: '+20 1234567890',
    bio: 'مهتم بالتجارة الإلكترونية والتسوق عبر الإنترنت'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    // Handle save logic here
    console.log('Saving account info:', formData);
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/profile" className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition">
              <ArrowLeft className="w-5 h-5" />
              العودة للملف الشخصي
            </Link>
            
            <h1 className="text-xl font-bold text-gray-900">معلومات الحساب</h1>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
          {/* Profile Header */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center gap-6">
              {/* Avatar */}
              <div className="relative">
                <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center">
                  <User className="w-12 h-12 text-blue-600" />
                </div>
                <button className="absolute bottom-0 right-0 bg-ray-blue text-white p-2 rounded-full hover:bg-blue-600 transition">
                  <Camera className="w-4 h-4" />
                </button>
              </div>

              {/* Basic Info */}
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-900">
                  {formData.firstName} {formData.lastName}
                </h2>
                <p className="text-gray-600">{formData.email}</p>
              </div>

              {/* Edit Button */}
              <button
                onClick={() => setIsEditing(!isEditing)}
                className={`px-6 py-2 rounded-lg font-medium transition ${
                  isEditing 
                    ? 'bg-gray-200 text-gray-700 hover:bg-gray-300' 
                    : 'bg-ray-blue text-white hover:bg-blue-600'
                }`}
              >
                {isEditing ? 'إلغاء' : 'تعديل'}
              </button>
            </div>
          </div>

          {/* Form */}
          <div className="p-6 space-y-6">
            {/* Name Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  الاسم الأول
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-ray-blue ${
                    isEditing 
                      ? 'border-gray-300 bg-white' 
                      : 'border-gray-200 bg-gray-50 text-gray-600'
                  }`}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  اسم العائلة
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-ray-blue ${
                    isEditing 
                      ? 'border-gray-300 bg-white' 
                      : 'border-gray-200 bg-gray-50 text-gray-600'
                  }`}
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                البريد الإلكتروني
              </label>
              <div className="relative">
                <Mail className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className={`w-full pr-10 pl-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-ray-blue ${
                    isEditing 
                      ? 'border-gray-300 bg-white' 
                      : 'border-gray-200 bg-gray-50 text-gray-600'
                  }`}
                />
              </div>
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                رقم الهاتف
              </label>
              <div className="relative">
                <Phone className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className={`w-full pr-10 pl-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-ray-blue ${
                    isEditing 
                      ? 'border-gray-300 bg-white' 
                      : 'border-gray-200 bg-gray-50 text-gray-600'
                  }`}
                />
              </div>
            </div>

            {/* Bio */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                نبذة شخصية
              </label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                disabled={!isEditing}
                rows={4}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-ray-blue resize-none ${
                  isEditing 
                    ? 'border-gray-300 bg-white' 
                    : 'border-gray-200 bg-gray-50 text-gray-600'
                }`}
              />
            </div>

            {/* Save Button */}
            {isEditing && (
              <div className="flex justify-end gap-4 pt-4 border-t border-gray-200">
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
                >
                  إلغاء
                </button>
                <button
                  onClick={handleSave}
                  className="px-6 py-2 bg-ray-blue text-white rounded-lg hover:bg-blue-600 transition flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  حفظ التغييرات
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Account Statistics */}
        <div className="mt-6 bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <h3 className="font-bold text-gray-900 mb-4">إحصائيات الحساب</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-gray-900">12</div>
              <div className="text-sm text-gray-600">طلب</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-gray-900">8</div>
              <div className="text-sm text-gray-600">حجز</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-gray-900">3</div>
              <div className="text-sm text-gray-600">تقييم</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-gray-900">5</div>
              <div className="text-sm text-gray-600">طلب توظيف</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
