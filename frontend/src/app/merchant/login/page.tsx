"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useMerchant } from '@/context/useMerchant';
import { 
  Store, Mail, Lock, Eye, EyeOff, ChevronRight, ArrowRight
} from 'lucide-react';

export default function MerchantLoginPage() {
  const router = useRouter();
  const { login, merchant } = useMerchant();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [rememberMe, setRememberMe] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      // محاولة الدخول
      const success = login(formData.email, formData.password);
      if (success) {
        // الانتقال لصفحة النشاط المختار أو لوحة التحكم
        router.push('/merchant/dashboard');
      } else {
        alert('بيانات الدخول غير صحيحة');
      }
    } catch (error) {
      console.error('خطأ في الدخول:', error);
      alert('حدث خطأ في الدخول، يرجى المحاولة مرة أخرى');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-blue-800">
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Store className="w-8 h-8 text-white" />
              <h1 className="text-3xl font-bold text-white">RAY Systems</h1>
            </div>
            <p className="text-blue-100 text-lg">دخول التاجر</p>
          </div>

          {/* Form Card */}
          <div className="bg-white rounded-2xl shadow-2xl p-8 mb-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email */}
              <div>
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
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="your@email.com"
                    required
                  />
                </div>
              </div>

              {/* Password */}
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
                    className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded border-gray-300"
                  />
                  <span className="text-sm text-gray-600">تذكرني</span>
                </label>
                <button
                  type="button"
                  onClick={() => router.push('/merchant/forgot-password')}
                  className="text-sm text-blue-600 hover:text-blue-700 font-bold"
                >
                  هل نسيت كلمة المرور؟
                </button>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold text-lg hover:bg-blue-700 transition flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'جاري الدخول...' : 'دخول'}
                {!isLoading && <ChevronRight className="w-5 h-5" />}
              </button>
            </form>
          </div>

          {/* Register Link */}
          <div className="bg-white/10 backdrop-blur rounded-2xl p-6 text-center">
            <p className="text-blue-100 mb-4">ليس لديك حساب؟</p>
            <button
              onClick={() => router.push('/merchant/register')}
              className="w-full bg-white text-blue-600 py-3 rounded-lg font-bold hover:bg-blue-50 transition flex items-center justify-center gap-2"
            >
              إنشاء حساب تاجر جديد
              <ArrowRight className="w-5 h-5" />
            </button>
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
