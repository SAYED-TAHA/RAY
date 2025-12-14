import React from 'react';
import { useRouter } from 'next/navigation';
import { User, ChevronLeft, Bell, ShieldCheck, Settings, Calendar, Briefcase, Package, CreditCard, MapPin, Star } from 'lucide-react';

interface ProfileViewProps {
  onNavigate?: (view: string) => void;
}

const ProfileView: React.FC<ProfileViewProps> = ({ onNavigate }) => {
  const router = useRouter();
  
  const handleNavigation = (section: string) => {
    if (onNavigate) {
      onNavigate(section);
    } else {
      // Navigate to specific pages based on section
      switch (section) {
        case 'orders':
          router.push('/profile/orders');
          break;
        case 'bookings':
          router.push('/profile/bookings');
          break;
        case 'job-applications':
          router.push('/profile/job-applications');
          break;
        case 'reviews':
          router.push('/profile/reviews');
          break;
        case 'account-info':
          router.push('/profile/account-info');
          break;
        case 'addresses':
          router.push('/profile/addresses');
          break;
        case 'payment-methods':
          router.push('/profile/payment-methods');
          break;
        case 'notifications':
          router.push('/profile/notifications');
          break;
        case 'privacy':
          router.push('/profile/privacy');
          break;
        case 'language':
          router.push('/profile/language');
          break;
        case 'security':
          router.push('/profile/security');
          break;
        case 'help':
          router.push('/help');
          break;
        default:
          console.log(`Navigate to: ${section}`);
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-gray-900 mb-8">الملف الشخصي</h2>
      
      <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center">
            <User className="w-10 h-10 text-blue-600" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900">أحمد محمد</h3>
            <p className="text-gray-500">ahmed@example.com</p>
          </div>
        </div>
        
        <div className="space-y-4">
          <button 
            onClick={() => handleNavigation('account-info')}
            className="w-full text-right p-4 bg-gray-50 rounded-lg flex items-center justify-between hover:bg-gray-100 transition"
          >
            <div className="flex items-center gap-3">
              <User className="w-5 h-5 text-gray-600" />
              <span>معلومات الحساب</span>
            </div>
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button 
            onClick={() => handleNavigation('addresses')}
            className="w-full text-right p-4 bg-gray-50 rounded-lg flex items-center justify-between hover:bg-gray-100 transition"
          >
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-gray-600" />
              <span>العناوين</span>
            </div>
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button 
            onClick={() => handleNavigation('payment-methods')}
            className="w-full text-right p-4 bg-gray-50 rounded-lg flex items-center justify-between hover:bg-gray-100 transition"
          >
            <div className="flex items-center gap-3">
              <CreditCard className="w-5 h-5 text-gray-600" />
              <span>طرق الدفع</span>
            </div>
            <ChevronLeft className="w-5 h-5" />
          </button>
          
          {/* Orders, Bookings and Jobs Section */}
          <div className="pt-4 border-t border-gray-200">
            <h4 className="font-bold text-gray-900 mb-3">الطلبات والنشاط</h4>
            <div className="space-y-3">
              <button 
                onClick={() => handleNavigation('orders')}
                className="w-full text-right p-4 bg-orange-50 rounded-lg flex items-center justify-between hover:bg-orange-100 transition"
              >
                <div className="flex items-center gap-3">
                  <Package className="w-5 h-5 text-orange-600" />
                  <span className="font-medium">طلباتي</span>
                </div>
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button 
                onClick={() => handleNavigation('bookings')}
                className="w-full text-right p-4 bg-blue-50 rounded-lg flex items-center justify-between hover:bg-blue-100 transition"
              >
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-blue-600" />
                  <span className="font-medium">حجوزاتي</span>
                </div>
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button 
                onClick={() => handleNavigation('job-applications')}
                className="w-full text-right p-4 bg-green-50 rounded-lg flex items-center justify-between hover:bg-green-100 transition"
              >
                <div className="flex items-center gap-3">
                  <Briefcase className="w-5 h-5 text-green-600" />
                  <span className="font-medium">طلبات التوظيف</span>
                </div>
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button 
                onClick={() => handleNavigation('reviews')}
                className="w-full text-right p-4 bg-purple-50 rounded-lg flex items-center justify-between hover:bg-purple-100 transition"
              >
                <div className="flex items-center gap-3">
                  <Star className="w-5 h-5 text-purple-600" />
                  <span className="font-medium">تقييماتي</span>
                </div>
                <ChevronLeft className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <h3 className="font-bold text-gray-900 mb-4">الإعدادات</h3>
        <div className="space-y-4">
          <button 
            onClick={() => handleNavigation('notifications')}
            className="w-full text-right p-4 bg-gray-50 rounded-lg flex items-center justify-between hover:bg-gray-100 transition"
          >
            <div className="flex items-center gap-3">
              <Bell className="w-5 h-5 text-gray-600" />
              <span>الإشعارات</span>
            </div>
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button 
            onClick={() => handleNavigation('privacy')}
            className="w-full text-right p-4 bg-gray-50 rounded-lg flex items-center justify-between hover:bg-gray-100 transition"
          >
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-gray-600" />
              <span>الخصوصية</span>
            </div>
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button 
            onClick={() => handleNavigation('language')}
            className="w-full text-right p-4 bg-gray-50 rounded-lg flex items-center justify-between hover:bg-gray-100 transition"
          >
            <div className="flex items-center gap-3">
              <Settings className="w-5 h-5 text-gray-600" />
              <span>اللغة</span>
            </div>
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button 
            onClick={() => handleNavigation('security')}
            className="w-full text-right p-4 bg-gray-50 rounded-lg flex items-center justify-between hover:bg-gray-100 transition"
          >
            <div className="flex items-center gap-3">
              <User className="w-5 h-5 text-gray-600" />
              <span>الأمان</span>
            </div>
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button 
            onClick={() => handleNavigation('help')}
            className="w-full text-right p-4 bg-gray-50 rounded-lg flex items-center justify-between hover:bg-gray-100 transition"
          >
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-gray-600" />
              <span>المساعدة والدعم</span>
            </div>
            <ChevronLeft className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileView;
