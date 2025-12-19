"use client";

import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/context/useAuth';
import { Loader2, CheckCircle, AlertCircle } from 'lucide-react';

export default function AuthCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, tokens } = useAuth();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('جاري معالجة المصادقة...');

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // Get tokens and user from URL params
        const tokensParam = searchParams.get('tokens');
        const userParam = searchParams.get('user');
        
        if (!tokensParam || !userParam) {
          setStatus('error');
          setMessage('فشلت المصادقة - بيانات غير مكتملة');
          setTimeout(() => router.push('/auth/login'), 3000);
          return;
        }

        // Parse and validate tokens
        let parsedTokens, parsedUser;
        try {
          parsedTokens = JSON.parse(decodeURIComponent(tokensParam));
          parsedUser = JSON.parse(decodeURIComponent(userParam));
        } catch (parseError) {
          setStatus('error');
          setMessage('فشلت المصادقة - بيانات غير صالحة');
          setTimeout(() => router.push('/auth/login'), 3000);
          return;
        }

        // Store in localStorage
        localStorage.setItem('authTokens', JSON.stringify(parsedTokens));
        localStorage.setItem('authUser', JSON.stringify(parsedUser));

        setStatus('success');
        setMessage('تم تسجيل الدخول بنجاح!');
        
        // Redirect to dashboard after success
        setTimeout(() => {
          router.push('/dashboard');
        }, 1500);

      } catch (error) {
        console.error('Auth callback error:', error);
        setStatus('error');
        setMessage('حدث خطأ أثناء المصادقة');
        setTimeout(() => router.push('/auth/login'), 3000);
      }
    };

    handleCallback();
  }, [searchParams, router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
          {/* Status Icon */}
          <div className="flex justify-center mb-6">
            {status === 'loading' && (
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
              </div>
            )}
            {status === 'success' && (
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
            )}
            {status === 'error' && (
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                <AlertCircle className="w-8 h-8 text-red-600" />
              </div>
            )}
          </div>

          {/* Status Message */}
          <h1 className={`text-2xl font-bold mb-3 ${
            status === 'success' ? 'text-green-600' : 
            status === 'error' ? 'text-red-600' : 
            'text-gray-900'
          }`}>
            {status === 'loading' && 'جاري المصادقة...'}
            {status === 'success' && 'نجحت المصادقة!'}
            {status === 'error' && 'فشلت المصادقة'}
          </h1>

          <p className="text-gray-600 mb-6">
            {message}
          </p>

          {/* Additional Info */}
          {status === 'loading' && (
            <div className="space-y-2 text-sm text-gray-500">
              <p>يتم التحقق من بياناتك...</p>
              <p>سيتم توجيهك تلقائياً</p>
            </div>
          )}

          {status === 'success' && (
            <div className="space-y-2 text-sm text-green-600">
              <p>مرحباً بك في RAY Egypt!</p>
              <p>سيتم توجيهك إلى لوحة التحكم</p>
            </div>
          )}

          {status === 'error' && (
            <div className="space-y-2 text-sm text-red-600">
              <p>يرجى المحاولة مرة أخرى</p>
              <p>سيتم توجيهك إلى صفحة تسجيل الدخول</p>
            </div>
          )}

          {/* Manual Redirect Button (for error case) */}
          {status === 'error' && (
            <button
              onClick={() => router.push('/auth/login')}
              className="mt-6 w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition"
            >
              العودة لتسجيل الدخول
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
