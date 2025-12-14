
"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Mail, Lock, ArrowRight, ArrowLeft } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

const LoginPage = () => {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await login(email, password);
      router.push('/profile');
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row font-sans dir-rtl min-h-[calc(100vh-80px)]">
      {/* Visual Side */}
      <div className="hidden md:flex md:w-1/2 bg-ray-blue relative overflow-hidden items-center justify-center p-12 text-white rounded-3xl my-4 mr-4">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="relative z-10 max-w-md text-center md:text-right">
           <div className="w-16 h-16 bg-ray-gold rounded-2xl flex items-center justify-center text-ray-black font-black text-3xl mb-8 shadow-lg">R</div>
           <h1 className="text-4xl font-black mb-6 leading-tight">مرحباً بك مجدداً في راي</h1>
           <p className="text-blue-100 text-lg leading-relaxed">
             المنصة الشاملة التي تجمع كل احتياجاتك في مكان واحد. سجل دخولك لمتابعة طلباتك، وإدارة حسابك، واستكشاف العروض الجديدة.
           </p>
        </div>
        {/* Decorative Circles */}
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl"></div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-ray-gold/10 rounded-full blur-3xl"></div>
      </div>

      {/* Form Side */}
      <div className="flex-1 flex flex-col justify-center p-6 sm:p-12 md:p-16 bg-white dark:bg-gray-900">
        <div className="w-full max-w-md mx-auto">
           <a href="/" className="flex items-center gap-2 text-gray-500 hover:text-ray-blue mb-8 transition">
              <ArrowRight className="w-4 h-4" />
              العودة للرئيسية
           </a>

           <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-2">تسجيل الدخول</h2>
           <p className="text-gray-500 dark:text-gray-400 mb-8">أدخل بيانات حسابك للمتابعة</p>

           <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-1">
                 <label className="text-sm font-bold text-gray-700 dark:text-gray-300">البريد الإلكتروني</label>
                 <div className="relative">
                    <Mail className="absolute right-4 top-3.5 w-5 h-5 text-gray-400" />
                    <input 
                      type="email" 
                      required
                      className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl py-3 pr-12 pl-4 focus:outline-none focus:border-ray-blue dark:focus:border-ray-gold transition dark:text-white"
                      placeholder="name@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                 </div>
              </div>

              <div className="space-y-1">
                 <div className="flex justify-between">
                    <label className="text-sm font-bold text-gray-700 dark:text-gray-300">كلمة المرور</label>
                    <a href="#" className="text-xs font-bold text-ray-blue dark:text-ray-gold hover:underline">نسيت كلمة المرور؟</a>
                 </div>
                 <div className="relative">
                    <Lock className="absolute right-4 top-3.5 w-5 h-5 text-gray-400" />
                    <input 
                      type="password" 
                      required
                      className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl py-3 pr-12 pl-4 focus:outline-none focus:border-ray-blue dark:focus:border-ray-gold transition dark:text-white"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                 </div>
              </div>

              <button 
                type="submit" 
                disabled={isLoading}
                className="w-full bg-ray-black dark:bg-white text-white dark:text-ray-black py-4 rounded-xl font-bold text-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition shadow-lg flex items-center justify-center gap-2 disabled:opacity-70"
              >
                 {isLoading ? 'جاري الدخول...' : 'تسجيل الدخول'}
                 {!isLoading && <ArrowLeft className="w-5 h-5" />}
              </button>

              <div className="relative py-4">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-100 dark:border-gray-800"></div></div>
                <div className="relative flex justify-center"><span className="bg-white dark:bg-gray-900 px-4 text-sm text-gray-400">أو</span></div>
              </div>

              <button type="button" className="w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 py-3 rounded-xl font-bold flex items-center justify-center gap-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                 <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5 h-5" alt="Google" />
                 الدخول باستخدام Google
              </button>

              <p className="text-center text-gray-600 dark:text-gray-400 mt-6">
                 ليس لديك حساب؟ 
                 <a href="/signup" className="text-ray-blue dark:text-ray-gold font-bold hover:underline mx-1">أنشئ حساب جديد</a>
              </p>
           </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
