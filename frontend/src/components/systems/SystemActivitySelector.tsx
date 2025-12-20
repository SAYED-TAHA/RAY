import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTheme } from '@/components/common/useTheme';
import { 
  ArrowLeft, CheckCircle, Star, Users, Clock, CreditCard, 
  Package, TrendingUp, Shield, Award, ChevronRight, Play,
  Building, Store, Utensils, Stethoscope, Dumbbell, Scissors,
  Baby, Car, Wrench, Home, Shirt, ShoppingBag, Pill, Briefcase,
  Camera, Smartphone, Coffee, TestTube, Heart, Moon
} from 'lucide-react';

interface SystemActivitySelectorProps {
  systemId: string;
  onBack: () => void;
}

const SystemActivitySelector: React.FC<SystemActivitySelectorProps> = ({ systemId, onBack }) => {
  const router = useRouter();
  const { theme, language, toggleTheme } = useTheme();
  const [selectedActivity, setSelectedActivity] = useState<string | null>(null);
  const [showPricing, setShowPricing] = useState(false);

  const systemsData: Record<string, any> = {
    bookings: {
      title: 'إدارة الحجوزات المركزية',
      subtitle: 'لجميع الأنشطة التي تحتاج حجز',
      icon: Clock,
      color: 'bg-indigo-500',
      description: 'نظام متكامل لإدارة الحجوزات لكل الأنشطة التجارية',
      benefits: ['زيادة الحجوزات 40%', 'تقليل الإلغاءات 60%', 'رضا العملاء 95%'],
      activities: [
        {
          id: 'clinic',
          name: 'العيادات والمستشفيات',
          description: 'حجوزات المرضى والاستشارات الطبية',
          icon: Stethoscope,
          features: ['سجلات طبية', 'تذكيرات مواعيد', 'فواتير', 'تأمين'],
          price: '599',
          popular: true
        },
        {
          id: 'salon',
          name: 'صالونات التجميل',
          description: 'مواعيد الخدمات الجمالية',
          icon: Scissors,
          features: ['خدمات متعددة', 'عاملين', 'عروض', 'ولاء'],
          price: '399'
        },
        {
          id: 'gym',
          name: 'الأندية الرياضية',
          description: 'اشتراكات ودخول الأعضاء',
          icon: Dumbbell,
          features: ['عضويات', 'دخول', 'مدربين', 'برامج'],
          price: '499'
        },
        {
          id: 'nursery',
          name: 'الحضانات ورياض الأطفال',
          description: 'إدارة الأطفال والرسوم',
          icon: Baby,
          features: ['سجلات أطفال', 'رسوم', 'تواصل مع الأهل', 'أنشطة'],
          price: '450'
        },
        {
          id: 'spa',
          name: 'السبا والاستجمام',
          description: 'خدمات الاسترخاء والعناية',
          icon: Star,
          features: ['حجوزات', 'عاملين', 'خدمات', 'باقات'],
          price: '550'
        },
        {
          id: 'consulting',
          name: 'الاستشارات المهنية',
          description: 'مواعيد الاستشاريين والخبراء',
          icon: Users,
          features: ['استشاريين', 'مواعيد', 'فواتير', 'تقارير'],
          price: '450'
        },
        {
          id: 'workshop',
          name: 'الورش والتدريب',
          description: 'حجوزات ورش العمل والتدريب',
          icon: Building,
          features: ['ورش', 'مدربين', 'مشاركين', 'شهادات'],
          price: '350'
        },
        {
          id: 'photography',
          name: 'استوديوهات التصوير',
          description: 'حجوزات جلسات التصوير',
          icon: Camera,
          features: ['جلسات', 'مصورين', 'معدات', 'معرض أعمال'],
          price: '400'
        }
      ]
    },
    retail: {
      title: 'إدارة المحلات التجارية',
      subtitle: 'مبيعات ومخزون ونقاط بيع',
      icon: Store,
      color: 'bg-blue-500',
      description: 'نظام شامل لإدارة المتاجر والسلاسل التجارية',
      benefits: ['زيادة المبيعات 35%', 'تقليل المخزون 25%', 'دقة 99.9%'],
      activities: [
        {
          id: 'clothing',
          name: 'محلات الملابس',
          description: 'مقاسات وألوان وموديلات',
          icon: Shirt,
          features: ['مقاسات', 'ألوان', 'باركود', 'عملاء', 'مبيعات'],
          price: '699',
          popular: true
        },
        {
          id: 'electronics',
          name: 'محلات الإلكترونيات',
          description: 'أجهزة وقطع غيار',
          icon: Smartphone,
          features: ['ضمان', 'صيانة', 'قطع غيار', 'فواتير'],
          price: '799'
        },
        {
          id: 'furniture',
          name: 'محلات الأثاث',
          description: 'أثاث منزلي ومكتبي',
          icon: Home,
          features: ['تصاميم', 'توصيل', 'تركيب', 'ضمان'],
          price: '599'
        },
        {
          id: 'supermarket',
          name: 'السوبر ماركت',
          description: 'مواد غذائية واستهلاكية',
          icon: ShoppingBag,
          features: ['باركود', 'صلاحيات', 'عروض', 'توصيل'],
          price: '899'
        },
        {
          id: 'books',
          name: 'المكتبات',
          description: 'كتب ومواد قرطاسية',
          icon: Package,
          features: ['كتب', 'مؤلفين', 'نشر', 'طلبات'],
          price: '450'
        }
      ]
    },
    restaurants: {
      title: 'إدارة المطاعم والمقاهي',
      subtitle: 'كاشير، مطبخ، وتوصيل',
      icon: Utensils,
      color: 'bg-orange-500',
      description: 'نظام متكامل لإدارة المطاعم والخدمات الغذائية',
      benefits: ['سرعة الطلبات 60%', 'تقليل الأخطاء 80%', 'رضا العملاء 90%'],
      activities: [
        {
          id: 'restaurant',
          name: 'المطاعم',
          description: 'وجبات رئيسية ومشروبات',
          icon: Utensils,
          features: ['قوائم طعام', 'مطبخ رقمي', 'طاولات', 'توصيل'],
          price: '799',
          popular: true
        },
        {
          id: 'cafe',
          name: 'المقاهي',
          description: 'قهوة وحلويات وخفيفة',
          icon: Coffee,
          features: ['قائمة', 'طلبات', 'ولاء', 'توصيل'],
          price: '599'
        },
        {
          id: 'fastfood',
          name: 'الوجبات السريعة',
          description: 'ساندوتشات ووجبات سريعة',
          icon: Clock,
          features: ['سرعة', 'ديليفري', 'فروع', 'تطبيق'],
          price: '699'
        }
      ]
    },
    health: {
      title: 'إدارة المرافق الصحية',
      subtitle: 'عيادات، مستشفيات، وصيدليات',
      icon: Stethoscope,
      color: 'bg-teal-500',
      description: 'نظام متخصص للقطاع الصحي والطبي',
      benefits: ['دقة 99.9%', 'سرعة 70%', 'رضا المرضى 95%'],
      activities: [
        {
          id: 'clinic',
          name: 'العيادات',
          description: 'عيادات خاصة وتخصصية',
          icon: Stethoscope,
          features: ['سجلات طبية', 'مواعيد', 'فواتير', 'تأمين'],
          price: '899',
          popular: true
        },
        {
          id: 'hospital',
          name: 'المستشفيات',
          description: 'مستشفيات خاصة وحكومية',
          icon: Building,
          features: ['أقسام', 'مرضى', 'أطباء', 'مختبرات'],
          price: '1999'
        },
        {
          id: 'pharmacy',
          name: 'الصيدليات',
          description: 'صيدليات ومستلزمات طبية',
          icon: Pill,
          features: ['أدوية', 'وصفات', 'نواقص', 'تأمين'],
          price: '699'
        },
        {
          id: 'lab',
          name: 'المعامل الطبية',
          description: 'تحاليل ومعامل تشخيصية',
          icon: TestTube,
          features: ['تحاليل', 'نتائج', 'أطباء', 'تقارير'],
          price: '799'
        },
        {
          id: 'radiology',
          name: 'مراكز الأشعة',
          description: 'أشعة وتشخيص بالصور',
          icon: Camera,
          features: ['أشعة', 'صور', 'أطباء', 'تقارير'],
          price: '899'
        },
        {
          id: 'therapy',
          name: 'العلاج الطبيعي',
          description: 'علاج طبيعي وتأهيل',
          icon: Heart,
          features: ['جلسات', 'مرضى', 'برامج', 'تتبع'],
          price: '599'
        }
      ]
    }
  };

  const currentSystem = systemsData[systemId] || systemsData.bookings;

  const handleActivitySelect = (activityId: string) => {
    setSelectedActivity(activityId);
    setShowPricing(true);
  };

  const handleSubscribe = (activityId: string, plan: string) => {
    // Navigate to registration with selected activity and plan
    router.push(`/merchant/register?system=${systemId}&activity=${activityId}&plan=${plan}`);
  };

  const handleTryDemo = (activityId: string) => {
    // Navigate to demo dashboard
    const demoPath = `/dashboard/${activityId}?demo=true`;
    router.push(demoPath);
  };

  if (showPricing && selectedActivity) {
    const activity = currentSystem.activities.find((a: any) => a.id === selectedActivity);
    
    if (!activity) {
      return <div>نشاط غير موجود</div>;
    }
    
    return (
      <div className={`min-h-screen bg-gradient-to-br ${theme === 'dark' ? 'from-slate-900 via-blue-900 to-slate-900' : 'from-slate-50 to-blue-50'} font-sans ${language === 'ar' ? 'dir-rtl' : 'dir-ltr'}`}>
        {/* Header */}
        <header className={`${theme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} border-b sticky top-0 z-50 shadow-sm`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <button onClick={() => setShowPricing(false)} className={`flex items-center gap-2 ${theme === 'dark' ? 'text-slate-300 hover:text-white' : 'text-slate-600 hover:text-slate-900'}`}>
                <ArrowLeft className="w-5 h-5" />
                {language === 'ar' ? 'العودة للأنشطة' : 'Back to Activities'}
              </button>
              <h1 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{language === 'ar' ? 'اختر الباقة المناسبة' : 'Choose the Right Plan'}</h1>
              <button 
                onClick={toggleTheme}
                className={`p-2 rounded-lg ${theme === 'dark' ? 'bg-slate-700 text-yellow-400' : 'bg-slate-100 text-slate-600'} hover:scale-110 transition-all duration-300`}
                title={language === 'ar' ? 'تبديل الوضع الليلي' : 'Toggle Dark Mode'}
              >
                <Moon className="w-5 h-5" />
              </button>
            </div>
          </div>
        </header>

        <div className="max-w-6xl mx-auto px-4 py-12">
          {/* Activity Info */}
          <div className={`${theme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-white'} rounded-2xl p-8 mb-8 shadow-lg border`}>
            <div className="flex items-center gap-4 mb-4">
              <div className={`w-16 h-16 ${currentSystem.color} rounded-xl flex items-center justify-center`}>
                <activity.icon className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{activity.name}</h2>
                <p className={theme === 'dark' ? 'text-slate-300' : 'text-slate-600'}>{activity.description}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {activity.features.map((feature: string, idx: number) => (
                <div key={idx} className={`flex items-center gap-2 text-sm ${theme === 'dark' ? 'text-slate-300' : 'text-slate-600'}`}>
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Pricing Plans */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Basic',
                price: Math.floor(parseInt(activity.price) * 0.6),
                features: [language === 'ar' ? 'مستخدم واحد' : 'One User', language === 'ar' ? '100 حجز/شهرياً' : '100 Bookings/Month', language === 'ar' ? 'دعم بريد إلكتروني' : 'Email Support', language === 'ar' ? 'تقارير أساسية' : 'Basic Reports'],
                buttonColor: 'bg-slate-600'
              },
              {
                name: 'Professional',
                price: activity.price,
                features: [language === 'ar' ? '5 مستخدمين' : '5 Users', language === 'ar' ? 'حجوزات غير محدودة' : 'Unlimited Bookings', language === 'ar' ? 'دعم 24/7' : '24/7 Support', language === 'ar' ? 'تحليلات متقدمة' : 'Advanced Analytics', language === 'ar' ? 'تطبيق موبايل' : 'Mobile App'],
                buttonColor: 'bg-blue-600',
                popular: true
              },
              {
                name: 'Enterprise',
                price: Math.floor(parseInt(activity.price) * 1.5),
                features: [language === 'ar' ? 'مستخدمون غير محدودين' : 'Unlimited Users', language === 'ar' ? 'جميع الميزات' : 'All Features', language === 'ar' ? 'دعم مخصص' : 'Dedicated Support', language === 'ar' ? 'تخصيص' : 'Customization', language === 'ar' ? 'خادم خاص' : 'Private Server'],
                buttonColor: 'bg-purple-600'
              }
            ].map((plan) => (
              <div key={plan.name} className={`${theme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-white'} rounded-2xl p-8 shadow-lg border ${plan.popular ? `ring-2 ring-blue-500 scale-105 ${theme === 'dark' ? 'border-blue-500' : ''}` : ''}`}>
                {plan.popular && (
                  <div className="bg-blue-500 text-white text-center py-2 rounded-t-xl -mt-8 -mx-8 mb-4">
                    {language === 'ar' ? 'الأكثر شيوعاً' : 'Most Popular'}
                  </div>
                )}
                <h3 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'} mb-2`}>{plan.name}</h3>
                <div className={`text-3xl font-black ${theme === 'dark' ? 'text-white' : 'text-slate-900'} mb-6`}>
                  {plan.price} <span className={`text-sm font-normal ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>{language === 'ar' ? 'ج.م/شهرياً' : 'EGP/month'}</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className={`flex items-center gap-3 ${theme === 'dark' ? 'text-slate-300' : 'text-slate-600'}`}>
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <div className="space-y-3">
                  <button 
                    onClick={() => handleSubscribe(activity.id, plan.name)}
                    className={`w-full ${plan.buttonColor} text-white py-3 rounded-xl font-bold hover:opacity-90 transition-opacity`}
                  >
                    {language === 'ar' ? 'اشترك الآن' : 'Subscribe Now'}
                  </button>
                  <button 
                    onClick={() => handleTryDemo(activity.id)}
                    className={`w-full ${theme === 'dark' ? 'bg-slate-700 text-slate-200 hover:bg-slate-600' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'} py-3 rounded-xl font-bold transition-colors flex items-center justify-center gap-2`}
                  >
                    <Play className="w-4 h-4" />
                    {language === 'ar' ? 'جرب تجريبي' : 'Try Demo'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br ${theme === 'dark' ? 'from-slate-900 via-blue-900 to-slate-900' : 'from-slate-50 to-blue-50'} font-sans ${language === 'ar' ? 'dir-rtl' : 'dir-ltr'}`}>
      {/* Header */}
      <header className={`${theme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} border-b sticky top-0 z-50 shadow-sm`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <button onClick={onBack} className={`flex items-center gap-2 ${theme === 'dark' ? 'text-slate-300 hover:text-white' : 'text-slate-600 hover:text-slate-900'}`}>
              <ArrowLeft className="w-5 h-5" />
              {language === 'ar' ? 'العودة للأنظمة' : 'Back to Systems'}
            </button>
            <h1 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{language === 'ar' ? 'اختر نشاطك التجاري' : 'Choose Your Business Activity'}</h1>
            <button 
              onClick={toggleTheme}
              className={`p-2 rounded-lg ${theme === 'dark' ? 'bg-slate-700 text-yellow-400' : 'bg-slate-100 text-slate-600'} hover:scale-110 transition-all duration-300`}
              title={language === 'ar' ? 'تبديل الوضع الليلي' : 'Toggle Dark Mode'}
            >
              <Moon className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* System Overview */}
      <div className={`${theme === 'dark' ? 'bg-gradient-to-br from-blue-800 to-purple-800' : 'bg-gradient-to-br from-blue-600 to-purple-600'} text-white py-16 px-4`}>
        <div className="max-w-6xl mx-auto text-center">
          <div className={`w-20 h-20 ${currentSystem.color} rounded-2xl flex items-center justify-center mx-auto mb-6`}>
            <currentSystem.icon className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-4xl font-black mb-4">{currentSystem.title}</h2>
          <p className="text-xl text-white/90 mb-8">{currentSystem.subtitle}</p>
          <p className="text-lg text-white/80 max-w-2xl mx-auto mb-12">{currentSystem.description}</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {currentSystem.benefits.map((benefit: string, idx: number) => (
              <div key={idx} className="bg-white/10 backdrop-blur rounded-xl p-4">
                <TrendingUp className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                <p className="font-bold">{benefit}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Activities Grid */}
      <div className={`max-w-7xl mx-auto px-4 py-16 ${theme === 'dark' ? 'bg-slate-900' : 'bg-white'}`}>
        <div className="text-center mb-12">
          <h3 className={`text-3xl font-black ${theme === 'dark' ? 'text-white' : 'text-slate-900'} mb-4`}>{language === 'ar' ? 'اختر النشاط المناسب لك' : 'Choose the Right Activity'}</h3>
          <p className={`text-lg ${theme === 'dark' ? 'text-slate-300' : 'text-slate-600'}`}>{language === 'ar' ? 'كل نظام مصمم خصيصاً لنوع معين من الأنشطة التجارية' : 'Each system is specifically designed for certain business activities'}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentSystem.activities.map((activity: any) => (
            <div 
              key={activity.id}
              className={`${theme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-white'} rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group border`}
              onClick={() => handleActivitySelect(activity.id)}
            >
              {activity.popular && (
                <div className="bg-blue-500 text-white text-center py-2 rounded-t-xl -mt-8 -mx-8 mb-4">
                  الأكثر شيوعاً
                </div>
              )}
              
              <div className="flex items-center gap-4 mb-6">
                <div className={`w-12 h-12 ${currentSystem.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                  <activity.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className={`text-xl font-bold ${theme === 'dark' ? 'text-white group-hover:text-blue-400' : 'text-slate-900 group-hover:text-blue-600'} transition-colors`}>
                    {activity.name}
                  </h4>
                  <p className={`text-slate-600 ${theme === 'dark' ? 'text-slate-300' : ''} text-sm`}>{activity.description}</p>
                </div>
              </div>

              <div className="space-y-2 mb-6">
                {activity.features.slice(0, 3).map((feature: string, idx: number) => (
                  <div key={idx} className={`flex items-center gap-2 text-sm ${theme === 'dark' ? 'text-slate-300' : 'text-slate-600'}`}>
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>{feature}</span>
                  </div>
                ))}
                {activity.features.length > 3 && (
                  <p className="text-xs text-blue-600">+{activity.features.length - 3} ميزات أخرى</p>
                )}
              </div>

              <div className={`flex items-center justify-between pt-6 ${theme === 'dark' ? 'border-t border-slate-700' : 'border-t border-slate-100'}`}>
                <div>
                  <span className={`text-2xl font-black ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{activity.price}</span>
                  <span className={`text-sm ${theme === 'dark' ? 'text-slate-300' : 'text-slate-600'} mr-1`}>{language === 'ar' ? 'ج.م/شهرياً' : 'EGP/month'}</span>
                </div>
                <ChevronRight className={`w-5 h-5 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'} group-hover:translate-x-2 transition-transform`} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Benefits Section */}
      <div className={`${theme === 'dark' ? 'bg-slate-800' : 'bg-white'} py-16 px-4`}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h3 className={`text-3xl font-black ${theme === 'dark' ? 'text-white' : 'text-slate-900'} mb-4`}>{language === 'ar' ? 'لماذا تختار راي؟' : 'Why Choose Ray?'}</h3>
            <p className={`text-lg ${theme === 'dark' ? 'text-slate-300' : 'text-slate-600'}`}>{language === 'ar' ? 'نحن نوفر أفضل حلول إدارة الأعمال في العالم' : 'We provide the best business management solutions in the world'}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: language === 'ar' ? 'آمن وموثوق' : 'Secure & Reliable',
                description: language === 'ar' ? 'تشفير عالمي وحماية بيانات من الدرجة الأولى' : 'World-class encryption and first-class data protection'
              },
              {
                icon: Clock,
                title: language === 'ar' ? 'سريع وفعال' : 'Fast & Efficient',
                description: language === 'ar' ? 'واجهة سهلة تسرع عملك بنسبة 70%' : 'Easy interface that speeds up your work by 70%'
              },
              {
                icon: Users,
                title: language === 'ar' ? 'دعم 24/7' : '24/7 Support',
                description: language === 'ar' ? 'فريق دعم متخصص متاح طوال الوقت' : 'Specialized support team available around the clock'
              }
            ].map((benefit, idx) => (
              <div key={idx} className="text-center">
                <div className={`w-16 h-16 ${theme === 'dark' ? 'bg-blue-900/30' : 'bg-blue-100'} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                  <benefit.icon className={`w-8 h-8 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`} />
                </div>
                <h4 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'} mb-2`}>{benefit.title}</h4>
                <p className={theme === 'dark' ? 'text-slate-300' : 'text-slate-600'}>{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemActivitySelector;
