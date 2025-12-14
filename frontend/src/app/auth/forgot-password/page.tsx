"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Mail, ArrowLeft, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      setError('البريد الإلكتروني مطلوب');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('البريد الإلكتروني غير صحيح');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setIsSubmitted(true);
    } catch (error) {
      setError('حدث خطأ. يرجى المحاولة مرة أخرى');
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            
            <h1 className="text-2xl font-bold text-gray-900 mb-3">
              تم إرسال البريد!
            </h1>
            
            <p className="text-gray-600 mb-6">
              لقد أرسلنا رابط إعادة تعيين كلمة المرور إلى بريدك الإلكتروني
              <br />
              <span className="font-medium text-gray-800">{email}</span>
            </p>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <p className="text-sm text-blue-800">
                <strong>ملاحظة:</strong> قد يستغرق وصول البريد بضع دقائق.
                لا تنسَ التحقق من مجلد الرسائل غير المرغوب فيها.
              </p>
            </div>

            <div className="space-y-3">
              <button
                onClick={() => router.push('/auth/login')}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition"
              >
                العودة لتسجيل الدخول
              </button>
              
              <button
                onClick={() => {
                  setIsSubmitted(false);
                  setEmail('');
                }}
                className="w-full bg-gray-200 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-300 transition"
              >
                إعادة الإرسال
              </button>
            </div>

            <p className="text-center text-gray-600 mt-6">
              لم تستلم البريد؟{' '}
              <button
                onClick={() => router.push('/auth/contact-support')}
                className="text-blue-600 hover:text-blue-700 font-medium transition"
              >
                تواصل مع الدعم
              </button>
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Back Button */}
        <Link
          href="/auth/login"
          className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6 transition"
        >
          <ArrowLeft className="w-4 h-4 ml-2" />
          العودة لتسجيل الدخول
        </Link>

        {/* Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Icon */}
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Mail className="w-8 h-8 text-blue-600" />
          </div>

          <h1 className="text-2xl font-bold text-gray-900 mb-3 text-center">
            نسيت كلمة المرور؟
          </h1>
          
          <p className="text-gray-600 text-center mb-8">
            أدخل بريدك الإلكتروني وسنرسل لك رابطاً لإعادة تعيين كلمة المرور
          </p>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
              <span className="text-red-700 text-sm">{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                البريد الإلكتروني
              </label>
              <div className="relative">
                <Mail className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (error) setError('');
                  }}
                  className={`w-full pr-10 pl-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition ${
                    error ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="example@email.com"
                  dir="rtl"
                />
              </div>
              {error && error.includes('البريد الإلكتروني') && (
                <p className="mt-1 text-sm text-red-600">{error}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  جاري الإرسال...
                </>
              ) : (
                'إرسال رابط إعادة التعيين'
              )}
            </button>
          </form>

          {/* Help Section */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="text-center space-y-2">
              <p className="text-sm text-gray-600">
                هل تواجه مشكلة؟
              </p>
              <div className="flex flex-col sm:flex-row gap-2 justify-center">
                <Link
                  href="/auth/contact-support"
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium transition"
                >
                  تواصل مع الدعم
                </Link>
                <span className="text-sm text-gray-400">•</span>
                <Link
                  href="/auth/login"
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium transition"
                >
                  العودة لتسجيل الدخول
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
