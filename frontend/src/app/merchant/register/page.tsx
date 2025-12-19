"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useMerchant } from '@/context/useMerchant';
import { 
  Store, Mail, Lock, User, Phone, MapPin, Building2, 
  ChevronRight, Eye, EyeOff
} from 'lucide-react';

export default function MerchantRegisterPage() {
  const router = useRouter();
  const { register } = useMerchant();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    businessName: '',
    ownerName: '',
    email: '',
    phone: '',
    city: '',
    businessType: '',
    password: '',
    confirmPassword: ''
  });

  const businessTypes = [
    { id: 'clinic', name: 'عيادة / مستشفى' },
    { id: 'pharmacy', name: 'صيدلية' },
    { id: 'gym', name: 'نادي رياضي' },
    { id: 'salon', name: 'صالون تجميل' },
    { id: 'nursery', name: 'حضانة' },
    { id: 'restaurant', name: 'مطعم' },
    { id: 'retail', name: 'متجر تجزئة' },
    { id: 'supermarket', name: 'سوبر ماركت' },
    { id: 'clothing', name: 'محل ملابس' },
    { id: 'carwash', name: 'مغسلة سيارات' },
    { id: 'services', name: 'خدمات تنظيف' },
    { id: 'laundry', name: 'مغسلة' },
    { id: 'law', name: 'مكتب محاماة' },
    { id: 'consulting', name: 'شركة استشارية' },
    { id: 'realestate', name: 'مكتب عقارات' },
    { id: 'cars', name: 'معرض سيارات' },
    { id: 'resort', name: 'شاليه / منتجع' }
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('كلمات المرور غير متطابقة');
      return;
    }
    if (!formData.businessType) {
      alert('يرجى اختيار نوع النشاط');
      return;
    }

    setIsLoading(true);
    try {
      // تسجيل البيانات في Context
      register({
        businessName: formData.businessName,
        ownerName: formData.ownerName,
        email: formData.email,
        phone: formData.phone,
        city: formData.city,
        businessType: formData.businessType
      });

      // الانتقال لصفحة النشاط المختار
      router.push(`/dashboard/${formData.businessType}`);
    } catch (error) {
      console.error('خطأ في التسجيل:', error);
      alert('حدث خطأ في التسجيل، يرجى المحاولة مرة أخرى');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-blue-800">
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="w-full max-w-2xl">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Store className="w-8 h-8 text-white" />
              <h1 className="text-3xl font-bold text-white">RAY Systems</h1>
            </div>
            <p className="text-blue-100 text-lg">تسجيل نشاط تجاري جديد</p>
          </div>

          {/* Form Card */}
          <div className="bg-white rounded-2xl shadow-2xl p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Business Info */}
              <div className="border-b pb-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">معلومات النشاط</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      اسم النشاط التجاري
                    </label>
                    <input
                      type="text"
                      name="businessName"
                      value={formData.businessName}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="مثال: عيادة الدكتور أحمد"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      نوع النشاط
                    </label>
                    <select
                      name="businessType"
                      value={formData.businessType}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    >
                      <option value="">اختر نوع النشاط</option>
                      {businessTypes.map(type => (
                        <option key={type.id} value={type.id}>
                          {type.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      المدينة
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="مثال: القاهرة"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Owner Info */}
              <div className="border-b pb-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">بيانات المالك</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      اسم المالك
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        name="ownerName"
                        value={formData.ownerName}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="أحمد محمد"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      رقم الهاتف
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="01012345678"
                        required
                      />
                    </div>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      البريد الإلكتروني
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="your@email.com"
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Password */}
              <div className="border-b pb-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">كلمة المرور</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      كلمة المرور
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="••••••••"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      تأكيد كلمة المرور
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                      <input
                        type={showPassword ? "text" : "password"}
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="••••••••"
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold text-lg hover:bg-blue-700 transition flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'جاري التسجيل...' : 'إنشاء حساب التاجر'}
                {!isLoading && <ChevronRight className="w-5 h-5" />}
              </button>

              {/* Login Link */}
              <div className="text-center">
                <p className="text-gray-600">
                  هل لديك حساب بالفعل؟{' '}
                  <button
                    type="button"
                    onClick={() => router.push('/merchant/login')}
                    className="text-blue-600 font-bold hover:text-blue-700"
                  >
                    دخول
                  </button>
                </p>
              </div>
            </form>
          </div>

          {/* Footer */}
          <div className="text-center mt-8 text-blue-100">
            <p className="text-sm">© 2025 RAY Systems. جميع الحقوق محفوظة</p>
          </div>
        </div>
      </div>
    </div>
  );
}
