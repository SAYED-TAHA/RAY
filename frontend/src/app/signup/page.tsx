"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Mail, Lock, User, Phone, ArrowRight, ArrowLeft, Store } from 'lucide-react';
import { useAuth } from '@/context/useAuth';

const SignupPage = () => {
  const router = useRouter();
  const { register } = useAuth();
  const [type, setType] = useState<'user' | 'merchant'>('user');
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    businessName: '',
    businessType: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const userData = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: type
      };
      
      await register(userData);
      
      if (type === 'merchant') {
        router.push('/admin');
      } else {
        router.push('/profile');
      }
    } catch (error) {
      console.error('Signup error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row font-sans dir-rtl min-h-[calc(100vh-80px)]">
      {/* Visual Side */}
      <div className="hidden md:flex md:w-1/2 bg-gray-900 relative overflow-hidden items-center justify-center p-12 text-white rounded-3xl my-4 mr-4">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="relative z-10 max-w-md text-center md:text-right">
           <div className="w-16 h-16 bg-ray-gold rounded-2xl flex items-center justify-center text-ray-black font-black text-3xl mb-8 shadow-lg">R</div>
           <h1 className="text-4xl font-black mb-6 leading-tight">انضم لعائلة راي</h1>
           <p className="text-gray-400 text-lg leading-relaxed">
             سواء كنت تبحث عن أفضل الخدمات والمنتجات، أو تريد إدارة نشاطك التجاري باحترافية، راي هو مكانك المناسب.
           </p>
        </div>
        {/* Decorative Circles */}
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-ray-blue/20 rounded-full blur-3xl"></div>
      </div>

      {/* Form Side */}
      <div className="flex-1 flex flex-col justify-center p-6 sm:p-12 md:p-16 bg-white dark:bg-gray-900">
        <div className="w-full max-w-md mx-auto">
           <a href="/" className="flex items-center gap-2 text-gray-500 hover:text-ray-blue mb-8 transition">
              <ArrowRight className="w-4 h-4" />
              العودة للرئيسية
           </a>

           <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-6">إنشاء حساب جديد</h2>
           
           {/* Type Toggle */}
           <div className="bg-gray-100 dark:bg-gray-800 p-1.5 rounded-xl flex mb-8">
              <button 
                onClick={() => setType('user')}
                className={`flex-1 py-3 rounded-lg text-sm font-bold transition-all flex items-center justify-center gap-2 ${
                  type === 'user' 
                    ? 'bg-white dark:bg-gray-700 text-ray-black dark:text-white shadow-sm' 
                    : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
              >
                <User className="w-4 h-4" />
                حساب عميل
              </button>
              <button 
                onClick={() => setType('merchant')}
                className={`flex-1 py-3 rounded-lg text-sm font-bold transition-all flex items-center justify-center gap-2 ${
                  type === 'merchant' 
                    ? 'bg-white dark:bg-gray-700 text-ray-blue dark:text-ray-gold shadow-sm' 
                    : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
              >
                <Store className="w-4 h-4" />
                حساب تاجر
              </button>
           </div>

           <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-1">
                 <label className="text-sm font-bold text-gray-700 dark:text-gray-300">الاسم بالكامل</label>
                 <div className="relative">
                    <User className="absolute right-4 top-3.5 w-5 h-5 text-gray-400" />
                    <input 
                      type="text" 
                      required
                      value={formData.name}
                      onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                      className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl py-3 pr-12 pl-4 focus:outline-none focus:border-ray-blue dark:focus:border-ray-gold transition dark:text-white"
                      placeholder="الاسم ثلاثي"
                    />
                 </div>
              </div>

              <div className="space-y-1">
                 <label className="text-sm font-bold text-gray-700 dark:text-gray-300">البريد الإلكتروني</label>
                 <div className="relative">
                    <Mail className="absolute right-4 top-3.5 w-5 h-5 text-gray-400" />
                    <input 
                      type="email" 
                      required
                      value={formData.email}
                      onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                      className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl py-3 pr-12 pl-4 focus:outline-none focus:border-ray-blue dark:focus:border-ray-gold transition dark:text-white"
                      placeholder="name@example.com"
                    />
                 </div>
              </div>

              <div className="space-y-1">
                 <label className="text-sm font-bold text-gray-700 dark:text-gray-300">رقم الهاتف</label>
                 <div className="relative">
                    <Phone className="absolute right-4 top-3.5 w-5 h-5 text-gray-400" />
                    <input 
                      type="tel" 
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                      className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl py-3 pr-12 pl-4 focus:outline-none focus:border-ray-blue dark:focus:border-ray-gold transition dark:text-white text-right dir-ltr"
                      placeholder="01xxxxxxxxx"
                    />
                 </div>
              </div>

              <div className="space-y-1">
                 <label className="text-sm font-bold text-gray-700 dark:text-gray-300">كلمة المرور</label>
                 <div className="relative">
                    <Lock className="absolute right-4 top-3.5 w-5 h-5 text-gray-400" />
                    <input 
                      type="password" 
                      required
                      value={formData.password}
                      onChange={(e) => setFormData((prev) => ({ ...prev, password: e.target.value }))}
                      className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl py-3 pr-12 pl-4 focus:outline-none focus:border-ray-blue dark:focus:border-ray-gold transition dark:text-white"
                      placeholder="••••••••"
                    />
                 </div>
              </div>

              <button 
                type="submit" 
                disabled={isLoading}
                className={`w-full text-white py-4 rounded-xl font-bold text-lg transition shadow-lg flex items-center justify-center gap-2 disabled:opacity-70
                   ${type === 'merchant' ? 'bg-ray-blue hover:bg-blue-800' : 'bg-ray-black dark:bg-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200'}
                `}
              >
                 {isLoading ? 'جاري التسجيل...' : (type === 'merchant' ? 'ابدأ رحلة التجارة' : 'إنشاء حساب')}
                 {!isLoading && <ArrowLeft className="w-5 h-5" />}
              </button>

              <p className="text-center text-gray-600 dark:text-gray-400 mt-6">
                 لديك حساب بالفعل؟ 
                 <a href="/login" className="text-ray-blue dark:text-ray-gold font-bold hover:underline mx-1">سجل دخولك</a>
              </p>
           </form>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;
