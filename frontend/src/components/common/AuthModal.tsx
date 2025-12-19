
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { X, Mail, Lock, User, ArrowRight } from 'lucide-react';
import { useAuth } from '@/context/useAuth';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'login' | 'signup';
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, initialMode = 'login' }) => {
  const router = useRouter();
  const { loginWithGoogle } = useAuth();
  const [mode, setMode] = useState<'login' | 'signup'>(initialMode);
  const [isLoading, setIsLoading] = useState(false);
  const [adminClicks, setAdminClicks] = useState(0);
  const [showAdminLogin, setShowAdminLogin] = useState(false);

  if (!isOpen) return null;

  const handleAdminLogoClick = () => {
    setAdminClicks(prev => prev + 1);
    if (adminClicks >= 4) {
      setShowAdminLogin(true);
      setAdminClicks(0);
    }
  };

  const handleAdminLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const username = formData.get('admin-username');
    const password = formData.get('admin-password');
    
    if (username === 'ادمن' && password === '1234') {
      // Set admin mode and redirect to new admin dashboard
      localStorage.setItem('userType', 'admin');
      onClose();
      router.push('/admin');
    } else {
      alert('بيانات الدخول غير صحيحة');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      onClose();
      router.push('/dashboard');
    }, 1500);
  };

  const handleGoogleLogin = () => {
    loginWithGoogle();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl relative z-10 animate-in zoom-in-95 duration-200">
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 left-4 p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition text-gray-500"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex flex-col h-full">
          {/* Header Section */}
          <div className="px-8 pt-8 pb-6 text-center bg-gradient-to-b from-blue-50/50 to-white">
            <div 
              onClick={handleAdminLogoClick}
              className="w-12 h-12 bg-gradient-to-br from-ray-gold to-yellow-600 rounded-xl flex items-center justify-center shadow-lg text-ray-blue font-black text-2xl mx-auto mb-4 cursor-pointer hover:scale-105 transition-transform"
            >
              R
            </div>
            <h2 className="text-2xl font-black text-ray-blue mb-1">
              {mode === 'login' ? 'أهلاً بعودتك' : 'إنشاء حساب جديد'}
            </h2>
            <p className="text-gray-500 text-sm">
              {mode === 'login' ? 'سجل الدخول لمتابعة طلباتك وأعمالك' : 'انضم إلينا وابدأ رحلة النجاح'}
            </p>
          </div>

          
          {/* Admin Login Form */}
          {showAdminLogin && (
            <form onSubmit={handleAdminLogin} className="px-8 pb-8 space-y-4 border-t border-gray-200 pt-6">
              <h3 className="text-lg font-bold text-center text-gray-800 mb-4">دخول المشرف</h3>
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-700 mr-1">اسم المستخدم</label>
                <input 
                  type="text" 
                  name="admin-username"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2.5 px-4 focus:outline-none focus:border-ray-gold focus:ring-1 focus:ring-ray-gold transition"
                  placeholder="ادمن"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-700 mr-1">كلمة المرور</label>
                <input 
                  type="password" 
                  name="admin-password"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2.5 px-4 focus:outline-none focus:border-ray-gold focus:ring-1 focus:ring-ray-gold transition"
                  placeholder="1234"
                />
              </div>
              <button 
                type="submit" 
                className="w-full bg-red-600 text-white py-3 rounded-xl font-bold hover:bg-red-700 transition"
              >
                دخول المشرف
              </button>
            </form>
          )}

          {/* Regular Form */}
          {!showAdminLogin && (
            <form onSubmit={handleSubmit} className="px-8 pb-8 space-y-4">
            {mode === 'signup' && (
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-700 mr-1">الاسم بالكامل</label>
                <div className="relative">
                  <User className="absolute right-3 top-3 w-5 h-5 text-gray-400" />
                  <input 
                    type="text" 
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2.5 pr-10 pl-4 focus:outline-none focus:border-ray-gold focus:ring-1 focus:ring-ray-gold transition"
                    placeholder="الاسم ثلاثي"
                  />
                </div>
              </div>
            )}

            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-700 mr-1">البريد الإلكتروني أو الهاتف</label>
              <div className="relative">
                <Mail className="absolute right-3 top-3 w-5 h-5 text-gray-400" />
                <input 
                  type="text" 
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2.5 pr-10 pl-4 focus:outline-none focus:border-ray-gold focus:ring-1 focus:ring-ray-gold transition"
                  placeholder="email@example.com"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-700 mr-1">كلمة المرور</label>
              <div className="relative">
                <Lock className="absolute right-3 top-3 w-5 h-5 text-gray-400" />
                <input 
                  type="password" 
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2.5 pr-10 pl-4 focus:outline-none focus:border-ray-gold focus:ring-1 focus:ring-ray-gold transition"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {mode === 'login' && (
              <div className="flex justify-end">
                <button 
                  type="button" 
                  onClick={() => router.push('/auth/forgot-password')}
                  className="text-xs font-bold text-ray-blue hover:underline"
                >
                  نسيت كلمة المرور؟
                </button>
              </div>
            )}

            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full bg-ray-black text-white py-3.5 rounded-xl font-bold text-lg shadow-lg hover:bg-ray-gold hover:text-ray-black transition-all flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {isLoading ? (
                <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
              ) : (
                <>
                  {mode === 'login' ? 'تسجيل الدخول' : 'إنشاء الحساب'}
                  <ArrowRight className="w-5 h-5 rtl:rotate-180" />
                </>
              )}
            </button>

            <div className="relative py-2">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-100"></div></div>
              <div className="relative flex justify-center"><span className="bg-white px-2 text-xs text-gray-400">أو</span></div>
            </div>

            <button 
              type="button" 
              onClick={handleGoogleLogin}
              className="w-full bg-white border border-gray-200 text-gray-700 py-3 rounded-xl font-bold text-sm hover:bg-gray-50 transition flex items-center justify-center gap-2"
            >
              <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5 h-5" alt="Google" />
              المتابعة باستخدام Google
            </button>

            <div className="text-center mt-4 text-sm font-medium text-gray-600">
              {mode === 'login' ? 'ليس لديك حساب؟' : 'لديك حساب بالفعل؟'}
              <button 
                type="button"
                onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
                className="text-ray-blue font-bold hover:underline mx-1"
              >
                {mode === 'login' ? 'أنشئ حساب جديد' : 'سجل دخولك'}
              </button>
            </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
