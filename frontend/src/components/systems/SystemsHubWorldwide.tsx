import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useThemeContext } from '@/context/ThemeContext';
import { 
  Store, Utensils, Home, Car, Stethoscope, Dumbbell, 
  Wrench, Shirt, ShoppingBag, Scissors, Pill, Briefcase, 
  ArrowLeft, CheckCircle, ShieldCheck, HardHat, ArrowRight, Menu, X, LayoutGrid,
  Baby, Gavel, Users, Umbrella, Sun, Zap, TrendingUp, BarChart3, Clock, Lock, Cloud,
  Phone, Mail, MapPin, Star, Shield, Award, ChevronRight, Calendar, Package, Globe,
  Building2, CreditCard, Smartphone, Truck, PackageOpen, Users2, Trophy, Target, Rocket,
  Moon
} from 'lucide-react';

interface SystemsHubWorldwideProps {
  onSystemSelect: (systemId: string) => void;
  onBackToMarketplace: () => void;
}

const SystemsHubWorldwide: React.FC<SystemsHubWorldwideProps> = ({ onSystemSelect, onBackToMarketplace }) => {
  const router = useRouter();
  const { theme, language, toggleTheme, toggleLanguage } = useThemeContext();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  const handleGoToMerchant = () => {
    window.location.href = '/merchant/supermarket-khair-zaman';
  };

  const managementSystems = [
    {
      id: 'bookings',
      title: language === 'ar' ? 'إدارة الحجوزات المركزية' : 'Central Booking Management',
      subtitle: language === 'ar' ? 'لجميع الأنشطة التي تحتاج حجز' : 'For all booking-required activities',
      icon: Calendar,
      color: 'bg-indigo-500',
      description: language === 'ar' ? 'نظام متكامل لإدارة الحجوزات لكل الأنشطة التجارية' : 'Integrated booking management system for all business activities',
      activities: language === 'ar' ? ['عيادات', 'صالونات', 'جيم', 'فنادق', 'مطاعم', 'حضانات', 'ورش', 'استشارات'] : ['Clinics', 'Salons', 'Gyms', 'Hotels', 'Restaurants', 'Nurseries', 'Workshops', 'Consulting'],
      features: language === 'ar' ? ['حجز فوري', 'تذكيرات آلية', 'دفعات إلكترونية', 'تقارير مفصلة'] : ['Instant Booking', 'Automatic Reminders', 'Electronic Payments', 'Detailed Reports'],
      href: '/dashboard/bookings'
    },
    {
      id: 'retail',
      title: 'إدارة المحلات التجارية',
      subtitle: 'مبيعات ومخزون ونقاط بيع',
      icon: Store,
      color: 'bg-blue-500',
      description: 'نظام شامل لإدارة المتاجر والسلاسل التجارية',
      activities: ['محلات ملابس', 'إلكترونيات', 'أثاث', 'هدايا', 'أدوات منزلية', 'مكتبات', 'صيدليات'],
      features: ['نقاط بيع متعددة', 'مخزون ذكي', 'باركود', 'عملاء', 'مبيعات'],
      href: '/dashboard/retail'
    },
    {
      id: 'restaurants',
      title: 'إدارة المطاعم والمقاهي',
      subtitle: 'كاشير، مطبخ، وتوصيل',
      icon: Utensils,
      color: 'bg-orange-500',
      description: 'نظام متكامل لإدارة المطاعم والخدمات الغذائية',
      activities: ['مطاعم', 'مقاهي', 'مخابز', 'حلويات', 'وجبات سريعة', 'توصيل'],
      features: ['POS متطور', 'مطبخ رقمي', 'توصيل', 'طلبات أونلاين', 'قوائم طعام'],
      href: '/dashboard/restaurant'
    },
    {
      id: 'health',
      title: 'إدارة المرافق الصحية',
      subtitle: 'عيادات، مستشفيات، وصيدليات',
      icon: Stethoscope,
      color: 'bg-teal-500',
      description: 'نظام متخصص للقطاع الصحي والطبي',
      activities: ['عيادات', 'مستشفيات', 'صيدليات', 'معامل', 'مراكز أشعة', 'علاج طبيعي'],
      features: ['سجلات طبية', 'مواعيد', 'وصفات', 'فواتير', 'تأمين'],
      href: '/dashboard/clinic'
    },
    {
      id: 'fitness',
      title: 'إدارة الأندية الرياضية',
      subtitle: 'اشتراكات وعضويات',
      icon: Dumbbell,
      color: 'bg-yellow-500',
      description: 'نظام متكامل لإدارة الأندية الرياضية والمراكز الرياضية',
      activities: ['جيم', 'نوادي رياضية', 'حمامات سباحة', 'استديوهات يوغا', 'فنون قتالية'],
      features: ['عضويات', 'دخول', 'مدربين', 'برامج', 'تتبع'],
      href: '/dashboard/gym'
    },
    {
      id: 'beauty',
      title: 'إدارة الصالونات والتجميل',
      subtitle: 'مواعيد وخدمات جمالية',
      icon: Scissors,
      color: 'bg-purple-500',
      description: 'نظام متخصص لإدارة صالونات التجميل ومراكز التجميل',
      activities: ['صالونات نسائية', 'صالونات رجالية', 'مراكز تجميل', 'سبا', 'تجميل أظافر'],
      features: ['مواعيد', 'خدمات', 'عاملين', 'عروض', 'ولاء'],
      href: '/dashboard/salon'
    },
    {
      id: 'education',
      title: 'إدارة المرافق التعليمية',
      subtitle: 'مدارس، جامعات، ومراكز تدريب',
      icon: Building2,
      color: 'bg-green-500',
      description: 'نظام متكامل لإدارة المؤسسات التعليمية',
      activities: ['مدارس', 'جامعات', 'معاهد', 'مراكز تدريب', 'حضانات', 'روضات'],
      features: ['طلاب', 'كورسات', 'معلمين', 'رسوم', 'شهادات'],
      href: '/dashboard/education'
    },
    {
      id: 'services',
      title: 'إدارة الخدمات العامة',
      subtitle: 'تنظيف، صيانة، وخدمات',
      icon: Wrench,
      color: 'bg-cyan-500',
      description: 'نظام متخصص لإدارة شركات الخدمات',
      activities: ['تنظيف', 'صيانة', 'نقل أثاث', 'تكييف', 'كهرباء', 'سباكة'],
      features: ['فنيين', 'أوامر عمل', 'جدولة', 'تقارير', 'فواتير'],
      href: '/dashboard/services'
    },
    {
      id: 'logistics',
      title: 'إدارة الخدمات اللوجستية',
      subtitle: 'شحن وتوصيل ومستودعات',
      icon: Truck,
      color: 'bg-red-500',
      description: 'نظام متكامل لإدارة الشحن والخدمات اللوجستية',
      activities: ['شحن', 'توصيل', 'مستودعات', 'توزيع', 'لوجستيات'],
      features: ['شحنات', 'سائقين', 'مسارات', 'تتبع', 'توزيع'],
      href: '/dashboard/logistics'
    },
    {
      id: 'subscription',
      title: 'إدارة الاشتراكات',
      subtitle: 'باقات واشتراكات دورية',
      icon: CreditCard,
      color: 'bg-pink-500',
      description: 'نظام متخصص لإدارة الاشتراكات والباقات',
      activities: ['صحف', 'مجلات', 'منصات', 'خدمات', 'برمجيات'],
      features: ['باقات', 'تجديد', 'إلغاء', 'خصومات', 'تقارير'],
      href: '/dashboard/subscription'
    }
  ];

  const worldwideStats = [
    { number: '50,000+', label: 'عميل عالمي', icon: Globe },
    { number: '120+', label: 'دولة', icon: Building2 },
    { number: '25+', label: 'نظام متخصص', icon: Package },
    { number: '99.9%', label: 'توفر الخدمة', icon: ShieldCheck },
    { number: '500M+', label: 'معاملة سنوية', icon: CreditCard },
    { number: '24/7', label: 'دعم عالمي', icon: Phone }
  ];

  const packages = [
    {
      name: 'Basic',
      price: '299',
      currency: 'ج.م',
      period: '/شهرياً',
      features: ['حتى 5 مستخدمين', '100GB تخزين', 'دعم بريد إلكتروني', 'تحديثات تلقائية'],
      color: 'bg-gray-100',
      buttonColor: 'bg-gray-600'
    },
    {
      name: 'Professional',
      price: '599',
      currency: 'ج.م',
      period: '/شهرياً',
      features: ['حتى 20 مستخدم', '500GB تخزين', 'دعم 24/7', 'تحليلات متقدمة', 'API متقدم'],
      color: 'bg-blue-50',
      buttonColor: 'bg-blue-600',
      popular: true
    },
    {
      name: 'Enterprise',
      price: 'مخصص',
      currency: '',
      period: '',
      features: ['مستخدمون غير محدودين', 'تخزين غير محدود', 'دعم مخصص', 'تخصيص كامل', 'خادم خاص'],
      color: 'bg-purple-50',
      buttonColor: 'bg-purple-600'
    }
  ];

  return (
    <div className={`min-h-screen bg-gradient-to-br ${theme === 'dark' ? 'from-slate-900 via-blue-900 to-slate-900' : 'from-slate-50 via-blue-50 to-slate-50'} font-sans ${language === 'ar' ? 'dir-rtl' : 'dir-ltr'}`}>
      
      {/* --- WORLDWIDE HEADER --- */}
      <header className={`${theme === 'dark' ? 'bg-slate-800/95 border-slate-700' : 'bg-white/95 border-slate-200'} backdrop-blur-lg border-b sticky top-0 z-50 shadow-sm`}>
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-20">
               {/* Logo Area */}
               <div className="flex items-center gap-3 cursor-pointer" onClick={onBackToMarketplace}>
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center font-black text-white text-xl shadow-lg hover:scale-105 transition">
                    <Globe className="w-6 h-6" />
                  </div>
                  <div>
                     <h1 className={`text-2xl font-bold tracking-wide ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>RAY <span className="text-blue-600">Worldwide</span></h1>
                     <p className={`text-[10px] uppercase tracking-widest font-semibold ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>Global Business Solutions</p>
                  </div>
               </div>

               {/* Desktop Nav */}
               <div className="hidden md:flex items-center gap-6">
                  <button onClick={onBackToMarketplace} className={`text-sm font-medium ${theme === 'dark' ? 'text-slate-300 hover:text-white' : 'text-slate-600 hover:text-slate-900'} transition flex items-center gap-2`}>
                    <LayoutGrid className="w-4 h-4" />
                    {language === 'ar' ? 'العودة للمتجر' : 'Back to Store'}
                  </button>
                  <div className={`h-6 w-px ${theme === 'dark' ? 'bg-slate-600' : 'bg-slate-300'}`}></div>
                  <button 
                    onClick={handleGoToMerchant}
                    className={`text-sm font-bold ${theme === 'dark' ? 'text-white hover:text-blue-400' : 'text-slate-900 hover:text-blue-600'} transition`}
                  >
                    {language === 'ar' ? 'عرض مثال' : 'View Demo'}
                  </button>
                  <button 
                    onClick={() => router.push('/merchant/login')}
                    className={`text-sm font-bold ${theme === 'dark' ? 'text-white hover:text-blue-400' : 'text-slate-900 hover:text-blue-600'} transition`}
                  >
                    {language === 'ar' ? 'تسجيل الدخول' : 'Login'}
                  </button>
                  <button 
                     onClick={() => router.push('/merchant/register')}
                     className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2.5 rounded-xl font-bold text-sm hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2"
                  >
                     {language === 'ar' ? 'سجّل نشاطك الآن' : 'Register Your Business'} <ArrowLeft className="w-4 h-4" />
                  </button>
                  
                  {/* Theme Toggle */}
                  <button 
                    onClick={toggleTheme}
                    className={`p-2.5 rounded-xl ${theme === 'dark' ? 'bg-slate-700 text-yellow-400' : 'bg-slate-100 text-slate-600'} hover:scale-110 transition-all duration-300`}
                    title={language === 'ar' ? 'تبديل الوضع الليلي' : 'Toggle Dark Mode'}
                  >
                    <Moon className="w-5 h-5" />
                  </button>
               </div>

               {/* Mobile Menu Toggle */}
               <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className={`md:hidden ${theme === 'dark' ? 'text-white' : 'text-slate-900'} p-2 ${theme === 'dark' ? 'hover:bg-slate-700' : 'hover:bg-slate-100'} rounded-lg`}>
                  {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
               </button>
            </div>
         </div>

         {/* Mobile Menu */}
         {mobileMenuOpen && (
            <div className={`md:hidden ${theme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} border-t p-4 absolute w-full left-0 shadow-2xl`}>
               <div className="flex flex-col gap-4">
                  <button onClick={onBackToMarketplace} className={`text-right ${theme === 'dark' ? 'text-slate-300 hover:text-white' : 'text-slate-600 hover:text-slate-900'} py-2 ${theme === 'dark' ? 'border-b border-slate-700' : 'border-b border-slate-200'}`}>{language === 'ar' ? 'العودة للمتجر' : 'Back to Store'}</button>
                  <button onClick={() => router.push('/merchant/login')} className={`text-right font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'} py-2`}>{language === 'ar' ? 'تسجيل الدخول' : 'Login'}</button>
                  <button onClick={() => router.push('/merchant/register')} className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-bold text-center">{language === 'ar' ? 'سجّل نشاطك الآن' : 'Register Your Business'}</button>
                  
                  {/* Mobile Theme Toggle */}
                  <button 
                    onClick={toggleTheme}
                    className={`p-2 rounded-lg ${theme === 'dark' ? 'bg-slate-700 text-yellow-400' : 'bg-slate-100 text-slate-600'} hover:scale-110 transition-all duration-300 mx-auto`}
                    title={language === 'ar' ? 'تبديل الوضع الليلي' : 'Toggle Dark Mode'}
                  >
                    <Moon className="w-5 h-5" />
                  </button>
               </div>
            </div>
         )}
      </header>

      {/* --- HERO SECTION --- */}
      <div className={`bg-gradient-to-br ${theme === 'dark' ? 'from-slate-900 via-blue-900 to-purple-900' : 'from-blue-600 via-purple-600 to-blue-700'} text-white py-24 md:py-32 px-4 relative overflow-hidden`}>
        {/* Animated Background */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-white/10 rounded-full blur-2xl animate-pulse delay-500"></div>

        <div className="max-w-6xl mx-auto text-center relative z-10">
          {/* Trust Badges */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur px-4 py-2 rounded-full border border-white/20">
              <Globe className="w-4 h-4 text-blue-400" />
              <span className="text-sm font-medium">Global Platform</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur px-4 py-2 rounded-full border border-white/20">
              <ShieldCheck className="w-4 h-4 text-green-400" />
              <span className="text-sm font-medium">Enterprise Security</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur px-4 py-2 rounded-full border border-white/20">
              <Zap className="w-4 h-4 text-yellow-400" />
              <span className="text-sm font-medium">Lightning Fast</span>
            </div>
          </div>

          <h1 className="text-5xl md:text-8xl font-black mb-8 leading-tight">
            <span className="block mb-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
              RAY
            </span>
            <span className="block text-3xl md:text-5xl mt-2 text-white">Worldwide Solutions</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-12 leading-relaxed font-light">
            منصة عالمية متخصصة في إدارة الأعمال. 
            <span className="text-blue-400 font-bold"> أكثر من 50,000 شركة</span> في 120 دولة تثق بنا
          </p>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-12">
            {worldwideStats.map((stat, idx) => (
              <div key={idx} className="text-center group">
                <div className="flex justify-center mb-2">
                  <stat.icon className="w-8 h-8 text-blue-400 group-hover:scale-110 transition-transform" />
                </div>
                <div className="text-2xl md:text-3xl font-black text-white mb-1">{stat.number}</div>
                <p className="text-xs text-white/70">{stat.label}</p>
              </div>
            ))}
          </div>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
             <button 
                onClick={() => {
                   const element = document.getElementById('management-systems');
                   element?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-10 py-5 rounded-2xl font-black text-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-2xl hover:shadow-3xl hover:-translate-y-1 w-full sm:w-auto active:scale-95 flex items-center justify-center gap-3"
             >
                <span>استكشف الأنظمة</span>
                <Rocket className="w-6 h-6" />
             </button>
             <button className="bg-white/10 backdrop-blur border border-white/20 text-white px-10 py-5 rounded-2xl font-bold text-lg hover:bg-white/20 transition-all duration-300 w-full sm:w-auto flex items-center justify-center gap-3">
                <span>جولة تفاعلية</span>
                <Smartphone className="w-6 h-6" />
             </button>
          </div>
        </div>
      </div>

      {/* --- MANAGEMENT SYSTEMS --- */}
      <div id="management-systems" className={`${theme === 'dark' ? 'bg-slate-900' : 'bg-white'} py-24 px-4`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <div className={`inline-flex items-center gap-2 ${theme === 'dark' ? 'bg-blue-900/30 text-blue-400' : 'bg-blue-50 text-blue-600'} px-4 py-2 rounded-full font-bold text-sm mb-6`}>
              <PackageOpen className="w-4 h-4" />
              {language === 'ar' ? '10 أنظمة إدارة متخصصة' : '10 Specialized Management Systems'}
            </div>
            <h2 className={`text-4xl md:text-5xl font-black ${theme === 'dark' ? 'text-white' : 'text-slate-900'} mb-6`}>
              {language === 'ar' ? 'أنظمة إدارة' : 'Management'} <span className="text-blue-600">{language === 'ar' ? 'متكاملة' : 'Systems'}</span>
            </h2>
            <p className={`text-xl ${theme === 'dark' ? 'text-slate-300' : 'text-slate-600'} max-w-3xl mx-auto`}>{language === 'ar' ? 'حلول متخصصة لكل نشاط تجاري، مع إمكانية اختيار الأنشطة الفرعية المناسبة لك' : 'Specialized solutions for every business activity, with the ability to choose the right sub-activities for you'}</p>
          </div>

          {/* Category Filter */}
          <div className="flex justify-center mb-12">
            <div className={`inline-flex ${theme === 'dark' ? 'bg-slate-800' : 'bg-slate-100'} rounded-xl p-1`}>
              <button 
                onClick={() => setSelectedCategory('all')}
                className={`px-6 py-3 rounded-lg font-medium transition ${selectedCategory === 'all' ? `${theme === 'dark' ? 'bg-slate-700 text-blue-400' : 'bg-white text-blue-600'} shadow-sm` : `${theme === 'dark' ? 'text-slate-300 hover:text-white' : 'text-slate-600 hover:text-slate-900'}`}`}
              >
                {language === 'ar' ? 'جميع الأنظمة' : 'All Systems'}
              </button>
              <button 
                onClick={() => setSelectedCategory('booking')}
                className={`px-6 py-3 rounded-lg font-medium transition ${selectedCategory === 'booking' ? `${theme === 'dark' ? 'bg-slate-700 text-blue-400' : 'bg-white text-blue-600'} shadow-sm` : `${theme === 'dark' ? 'text-slate-300 hover:text-white' : 'text-slate-600 hover:text-slate-900'}`}`}
              >
                {language === 'ar' ? 'الحجوزات' : 'Bookings'}
              </button>
              <button 
                onClick={() => setSelectedCategory('retail')}
                className={`px-6 py-3 rounded-lg font-medium transition ${selectedCategory === 'retail' ? `${theme === 'dark' ? 'bg-slate-700 text-blue-400' : 'bg-white text-blue-600'} shadow-sm` : `${theme === 'dark' ? 'text-slate-300 hover:text-white' : 'text-slate-600 hover:text-slate-900'}`}`}
              >
                {language === 'ar' ? 'التجارة' : 'Retail'}
              </button>
              <button 
                onClick={() => setSelectedCategory('services')}
                className={`px-6 py-3 rounded-lg font-medium transition ${selectedCategory === 'services' ? `${theme === 'dark' ? 'bg-slate-700 text-blue-400' : 'bg-white text-blue-600'} shadow-sm` : `${theme === 'dark' ? 'text-slate-300 hover:text-white' : 'text-slate-600 hover:text-slate-900'}`}`}
              >
                {language === 'ar' ? 'الخدمات' : 'Services'}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {managementSystems
              .filter(system => selectedCategory === 'all' || 
                (selectedCategory === 'booking' && system.id === 'bookings') ||
                (selectedCategory === 'retail' && ['retail', 'restaurants'].includes(system.id)) ||
                (selectedCategory === 'services' && ['health', 'fitness', 'beauty', 'education', 'services', 'logistics', 'subscription'].includes(system.id))
              )
              .map((system) => (
              <div 
                key={system.id}
                className="group cursor-pointer"
                onClick={() => onSystemSelect(system.id)}
              >
                <div className={`${theme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} p-8 rounded-3xl border shadow-lg hover:shadow-2xl hover:border-blue-500 hover:-translate-y-2 transition-all duration-500 h-full relative overflow-hidden`}>
                  {/* Background Pattern */}
                  <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${system.color} opacity-5 rounded-full -mr-16 -mt-16 transition-transform group-hover:scale-150 duration-700`}></div>
                  
                  {/* Icon */}
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 ${system.color} shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300`}>
                    <system.icon className="w-8 h-8 text-white" />
                  </div>
                  
                  {/* Content */}
                  <h3 className={`font-black text-xl ${theme === 'dark' ? 'text-white group-hover:text-blue-400' : 'text-slate-900 group-hover:text-blue-600'} transition-colors mb-2`}>
                    {system.title}
                  </h3>
                  <p className={`${theme === 'dark' ? 'text-slate-300' : 'text-slate-600'} mb-4 text-sm`}>{system.subtitle}</p>
                  <p className={`${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'} mb-6 flex-1 leading-relaxed text-sm`}>{system.description}</p>
                  
                  {/* Activities */}
                  <div className="mb-6">
                    <p className={`text-xs font-bold ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'} mb-2`}>{language === 'ar' ? 'الأنشطة المدعومة:' : 'Supported Activities:'}</p>
                    <div className="flex flex-wrap gap-1">
                      {system.activities.slice(0, 4).map((activity, i) => (
                        <span key={i} className={`text-xs ${theme === 'dark' ? 'bg-slate-700 text-slate-300' : 'bg-slate-100 text-slate-600'} px-2 py-1 rounded-full`}>
                          {activity}
                        </span>
                      ))}
                      {system.activities.length > 4 && (
                        <span className={`text-xs ${theme === 'dark' ? 'bg-blue-900/30 text-blue-400' : 'bg-blue-100 text-blue-600'} px-2 py-1 rounded-full`}>
                          +{system.activities.length - 4}
                        </span>
                      )}
                    </div>
                  </div>
                  
                  {/* Features */}
                  <div className="space-y-1 mb-6">
                    {system.features.slice(0, 3).map((feature, i) => (
                      <div key={i} className={`flex items-center gap-2 text-xs ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
                        <CheckCircle className="w-3 h-3 text-green-500" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  {/* CTA */}
                  <div className={`pt-4 ${theme === 'dark' ? 'border-t border-slate-700' : 'border-t border-slate-100'} w-full`}>
                    <div className={`flex items-center justify-between text-sm font-bold ${theme === 'dark' ? 'text-blue-400 group-hover:text-blue-300' : 'text-blue-600 group-hover:text-blue-700'} transition-colors`}>
                      <span>{language === 'ar' ? 'اختر الأنشطة' : 'Choose Activities'}</span>
                      <ArrowLeft className="w-5 h-5 transform group-hover:-translate-x-2 transition-transform" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* --- PACKAGES SECTION --- */}
      <div className={`bg-gradient-to-br ${theme === 'dark' ? 'from-slate-800 to-slate-900' : 'from-slate-50 to-blue-50'} py-24 px-4`}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <div className={`inline-flex items-center gap-2 ${theme === 'dark' ? 'bg-blue-900/30 text-blue-400' : 'bg-blue-50 text-blue-600'} px-4 py-2 rounded-full font-bold text-sm mb-6`}>
              <CreditCard className="w-4 h-4" />
              {language === 'ar' ? 'باقات مرنة لكل حجم' : 'Flexible Plans for Every Size'}
            </div>
            <h2 className={`text-4xl md:text-5xl font-black ${theme === 'dark' ? 'text-white' : 'text-slate-900'} mb-6`}>
              {language === 'ar' ? 'اختر الباقة المناسبة' : 'Choose the Right Plan'} <span className="text-blue-600">{language === 'ar' ? 'لنشاطك' : 'for Your Business'}</span>
            </h2>
            <p className={`text-xl ${theme === 'dark' ? 'text-slate-300' : 'text-slate-600'} max-w-3xl mx-auto`}>{language === 'ar' ? 'أسعار تنافسية وميزات متقدمة تنمو مع عملك' : 'Competitive prices and advanced features that grow with your business'}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {packages.map((pkg, idx) => (
              <div key={idx} className={`relative ${pkg.popular ? 'scale-105' : ''}`}>
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-bold">
                    الأكثر شيوعاً
                  </div>
                )}
                <div className={`${pkg.color} p-8 rounded-3xl border ${pkg.popular ? 'border-blue-500' : 'border-slate-200'} shadow-lg hover:shadow-xl transition-all duration-300 h-full`}>
                  <h3 className="text-2xl font-black text-slate-900 mb-2">{pkg.name}</h3>
                  <div className="flex items-baseline mb-6">
                    <span className="text-4xl font-black text-slate-900">{pkg.price}</span>
                    <span className="text-slate-600 ml-1">{pkg.currency}</span>
                    <span className="text-slate-500 mr-2">{pkg.period}</span>
                  </div>
                  
                  <ul className="space-y-3 mb-8">
                    {pkg.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-3 text-slate-700">
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <button 
                    onClick={() => onSystemSelect('general')}
                    className={`w-full ${pkg.buttonColor} text-white py-4 rounded-xl font-bold hover:opacity-90 transition-opacity`}
                  >
                    {pkg.name === 'Enterprise' ? 'تواصل معنا' : 'ابدأ الآن'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* --- FEATURES SECTION --- */}
      <div className={`${theme === 'dark' ? 'bg-slate-800' : 'bg-white'} py-20 px-4`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className={`text-4xl font-black ${theme === 'dark' ? 'text-white' : 'text-slate-900'} mb-4`}>{language === 'ar' ? 'لماذا تختار راي عالمياً؟' : 'Why Choose Ray Worldwide?'}</h2>
            <p className={`text-lg ${theme === 'dark' ? 'text-slate-300' : 'text-slate-600'} max-w-2xl mx-auto`}>{language === 'ar' ? 'منصة عالمية توفر كل ما تحتاجه لإدارة عملك بكفاءة واحترافية' : 'A global platform that provides everything you need to manage your business efficiently and professionally'}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: Globe, title: language === 'ar' ? 'عالمية بالكامل' : 'Fully Global', desc: language === 'ar' ? 'متوفر في 120 دولة بدعم 24/7 بلغات متعددة' : 'Available in 120 countries with 24/7 support in multiple languages' },
              { icon: Cloud, title: language === 'ar' ? 'سحابية 100%' : '100% Cloud', desc: language === 'ar' ? 'لا تحتاج لتثبيت، استخدمها من أي مكان في العالم' : 'No installation needed, use it from anywhere in the world' },
              { icon: Lock, title: language === 'ar' ? 'آمنة تماماً' : 'Completely Secure', desc: language === 'ar' ? 'تشفير عسكري وحماية بيانات من الدرجة الأولى' : 'Military-grade encryption and first-class data protection' },
              { icon: TrendingUp, title: language === 'ar' ? 'تحليلات متقدمة' : 'Advanced Analytics', desc: language === 'ar' ? 'تقارير شاملة وإحصائيات مفصلة لعملك' : 'Comprehensive reports and detailed statistics for your business' },
              { icon: Smartphone, title: language === 'ar' ? 'تطبيقات موبايل' : 'Mobile Apps', desc: language === 'ar' ? 'تطبيقات أصلية لـ iOS و Android' : 'Native apps for iOS and Android' },
              { icon: Trophy, title: language === 'ar' ? 'جوائز عالمية' : 'Global Awards', desc: language === 'ar' ? 'حائز على جوائز أفضل منصة إدارة 2024' : 'Winner of Best Management Platform 2024' }
            ].map((feature, idx) => (
              <div key={idx} className={`bg-gradient-to-br ${theme === 'dark' ? 'from-slate-700 to-slate-600 border-slate-600' : 'from-slate-50 to-blue-50 border-slate-200'} p-8 rounded-2xl border hover:border-blue-500 hover:shadow-xl transition-all duration-300 group`}>
                <div className={`w-14 h-14 ${theme === 'dark' ? 'bg-blue-900/30' : 'bg-blue-500/20'} rounded-xl flex items-center justify-center mb-6 group-hover:${theme === 'dark' ? 'bg-blue-900/50' : 'bg-blue-500/30'} transition`}>
                  <feature.icon className={`w-7 h-7 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`} />
                </div>
                <h3 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'} mb-3`}>{feature.title}</h3>
                <p className={`${theme === 'dark' ? 'text-slate-300' : 'text-slate-600'} leading-relaxed`}>{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* --- CTA SECTION --- */}
      <div className={`bg-gradient-to-r ${theme === 'dark' ? 'from-blue-800 to-purple-800' : 'from-blue-600 to-purple-600'} py-20 px-4`}>
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6">{language === 'ar' ? 'انضم لـ 50,000+ شركة عالمية' : 'Join 50,000+ Global Companies'}</h2>
          <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">{language === 'ar' ? 'ابدأ رحلتك مع راي اليوم واحصل على نسخة تجريبية مجانية لمدة 30 يوم' : 'Start your journey with Ray today and get a free 30-day trial'}</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button 
              onClick={() => onSystemSelect('general')}
              className={`${theme === 'dark' ? 'bg-slate-800 text-white hover:bg-slate-700' : 'bg-white text-blue-600 hover:bg-slate-100'} px-12 py-5 rounded-2xl font-black text-xl transition-all duration-300 shadow-2xl hover:shadow-3xl hover:-translate-y-1 active:scale-95 inline-flex items-center gap-3`}
            >
              <span>{language === 'ar' ? 'ابدأ الآن مجاناً' : 'Start Free Now'}</span>
              <Rocket className="w-6 h-6" />
            </button>
            <button className="bg-white/10 backdrop-blur border border-white/20 text-white px-12 py-5 rounded-2xl font-bold text-xl hover:bg-white/20 transition-all duration-300 inline-flex items-center gap-3">
              <span>{language === 'ar' ? 'تواصل مع المبيعات' : 'Contact Sales'}</span>
              <Phone className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* --- FOOTER --- */}
      <footer className={`${theme === 'dark' ? 'bg-slate-950' : 'bg-slate-900'} text-white py-16 px-4`}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-12">
            <div>
              <h3 className="text-xl font-bold mb-4">RAY Worldwide</h3>
              <p className="text-slate-400 text-sm">منصة عالمية متخصصة في إدارة الأعمال لكل القطاعات</p>
            </div>
            <div>
              <h4 className="font-bold mb-4">الأنظمة</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                {managementSystems.slice(0, 6).map(system => (
                  <li key={system.id}>
                    <button onClick={() => onSystemSelect(system.id)} className="hover:text-white transition-colors">
                      {system.title}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">الدعم والمساعدة</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><a href="#" className="hover:text-white transition-colors">مركز المساعدة</a></li>
                <li><a href="#" className="hover:text-white transition-colors">الدعم الفني 24/7</a></li>
                <li><a href="#" className="hover:text-white transition-colors">فيديوهات تعليمية</a></li>
                <li><a href="#" className="hover:text-white transition-colors">المدونة التقنية</a></li>
                <li><a href="#" className="hover:text-white transition-colors">واجهة برمجة التطبيقات</a></li>
                <li><a href="#" className="hover:text-white transition-colors">حالة الخدمة</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">أعمال راي</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><a href="/suppliers" className="hover:text-white transition-colors">الموردين</a></li>
                <li><a href="/jobs" className="hover:text-white transition-colors">وظائف راي</a></li>
                <li><a href="/business-jobs" className="hover:text-white transition-colors">وظائف الأنشطة</a></li>
                <li><a href="#" className="hover:text-white transition-colors">الشراكات التجارية</a></li>
                <li><a href="#" className="hover:text-white transition-colors">الفرص الاستثمارية</a></li>
                <li><a href="#" className="hover:text-white transition-colors">برنامج المطورين</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">تواصل معنا</h4>
              <div className="space-y-2 text-sm text-slate-400">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  <span>+20 2 123456789</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  <span>worldwide@ray.app</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>القاهرة، مصر</span>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-8 text-center text-sm text-slate-500">
            © 2025 Ray Platform Worldwide. جميع الحقوق محفوظة.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SystemsHubWorldwide;
