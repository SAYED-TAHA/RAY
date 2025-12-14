"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { 
  Calendar, Stethoscope, Dumbbell, Scissors, Baby, ArrowLeft, 
  Clock, Users, CheckCircle, DollarSign, Star, TrendingUp
} from 'lucide-react';

export default function BookingsSystemPage() {
  const router = useRouter();

  const activities = [
    {
      id: 'clinic',
      title: 'العيادات والمستشفيات',
      icon: Stethoscope,
      desc: 'حجوزات المرضى، الملفات الطبية، الجدولة',
      color: 'bg-blue-100 text-blue-600',
      stats: '300+ عيادة تستخدم النظام'
    },
    {
      id: 'gym',
      title: 'الأندية الرياضية',
      icon: Dumbbell,
      desc: 'اشتراكات الأعضاء، جدول الفصول، الحضور',
      color: 'bg-red-100 text-red-600',
      stats: '150+ نادٍ يستخدم النظام'
    },
    {
      id: 'salon',
      title: 'صوالين التجميل',
      icon: Scissors,
      desc: 'حجوزات الخدمات، الفنيون، الولاء',
      color: 'bg-purple-100 text-purple-600',
      stats: '300+ صالون يستخدم النظام'
    },
    {
      id: 'nursery',
      title: 'الحضانات',
      icon: Baby,
      desc: 'متابعة الأطفال، الحضور، التواصل',
      color: 'bg-rose-100 text-rose-600',
      stats: '100+ حضانة تستخدم النظام'
    }
  ];

  const features = [
    {
      icon: Calendar,
      title: "إدارة الحجوزات",
      description: "حجوزات ذكية، تذكيرات تلقائية، إلغاء وإعادة جدولة"
    },
    {
      icon: Clock,
      title: "جدولة مرنة",
      description: "جدول عمل متعدد، تخصيص المواعيد، إدارة السعة"
    },
    {
      icon: Users,
      title: "إدارة العملاء",
      description: "ملفات العملاء، التاريخ، الخدمات المفضلة"
    },
    {
      icon: DollarSign,
      title: "إدارة المدفوعات",
      description: "الفواتير، الدفعات، الباقات، الخصومات"
    },
    {
      icon: CheckCircle,
      title: "التقارير والتحليل",
      description: "تقارير الحجوزات، الإيرادات، أداء الموظفين"
    },
    {
      icon: Star,
      title: "التقييمات والولاء",
      description: "تقييمات الخدمة، برنامج الولاء، المكافآت"
    }
  ];

  const benefits = [
    "زيادة الحجوزات بنسبة 45%",
    "تقليل حالات عدم الحضور بنسبة 70%",
    "توفير الوقت بنسبة 60%",
    "رضا العملاء 96%"
  ];

  const pricing = [
    {
      plan: "أساسي",
      price: "299 ج",
      features: ["حتى 100 حجز شهرياً", "نشاط واحد", "تقارير أساسية", "دعم عبر البريد"]
    },
    {
      plan: "احترافي",
      price: "599 ج",
      features: ["حجوزات غير محدودة", "4 أنشطة", "تقارير متقدمة", "دعم على مدار الساعة"]
    },
    {
      plan: "مؤسسي",
      price: "999 ج",
      features: ["حجوزات غير محدودة", "أنشطة غير محدودة", "تخصيص كامل", "مدير حساب مخصص"]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <button 
              onClick={() => router.push('/systems')}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition"
            >
              <ArrowLeft className="w-5 h-5" />
              العودة للأنظمة
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="w-20 h-20 bg-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-8">
            <Calendar className="w-10 h-10 text-indigo-600" />
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            نظام إدارة <span className="text-indigo-600">الحجوزات</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            نظام متكامل لإدارة الحجوزات للأنشطة المختلفة. من العيادات إلى الصالات الرياضية، 
            كل ما تحتاجه لإدارة حجوزاتك بكفاءة عالية.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-indigo-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-indigo-700 transition">
              جرب مجاناً لمدة 14 يوم
            </button>
            <button className="bg-white text-indigo-600 border-2 border-indigo-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-indigo-50 transition">
              مشاهدة عرض توضيحي
            </button>
          </div>
        </div>
      </section>

      {/* Activities Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">اختر نشاطك</h2>
            <p className="text-xl text-gray-600">نظام متخصص لكل نوع من الأنشطة</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {activities.map((activity) => (
              <div 
                key={activity.id}
                className="group cursor-pointer"
                onClick={() => router.push(`/dashboard/${activity.id}`)}
              >
                <div className="bg-white p-8 rounded-3xl border border-gray-200 shadow-lg hover:shadow-2xl hover:border-indigo-500/50 hover:-translate-y-3 transition-all duration-500 h-full relative overflow-hidden">
                  {/* Background Pattern */}
                  <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${activity.color.split(' ')[0]} opacity-5 rounded-full -mr-16 -mt-16 transition-transform group-hover:scale-150 duration-700`}></div>
                  
                  {/* Icon */}
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 ${activity.color} shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300`}>
                    <activity.icon className="w-8 h-8 text-white" />
                  </div>
                  
                  {/* Content */}
                  <h4 className="font-black text-xl text-gray-900 mb-3 group-hover:text-indigo-600 transition-colors">
                    {activity.title}
                  </h4>
                  <p className="text-gray-600 mb-4 flex-1 leading-relaxed">{activity.desc}</p>
                  
                  {/* Stats */}
                  <div className="text-sm text-gray-500 mb-4">{activity.stats}</div>
                  
                  {/* Arrow */}
                  <div className="flex items-center gap-2 text-indigo-600 font-bold group-hover:gap-3 transition-all">
                    ابدأ الآن
                    <ArrowLeft className="w-4 h-4 rotate-180" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4 bg-indigo-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">مميزات النظام</h2>
            <p className="text-xl text-gray-600">كل ما تحتاجه لإدارة الحجوزات بكفاءة</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 hover:shadow-lg transition">
                <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mb-6">
                  <feature.icon className="w-6 h-6 text-indigo-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 px-4 bg-indigo-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">نتائج حقيقية</h2>
            <p className="text-xl text-gray-600">نتائج ملموسة من أنشطة تستخدم نظامنا</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-indigo-600 mb-2">{benefit}</div>
                <p className="text-gray-600">تحسن ملحوظ</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">الأسعار</h2>
            <p className="text-xl text-gray-600">اختر الخطة المناسبة لنشاطك</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricing.map((plan, index) => (
              <div key={index} className={`rounded-2xl p-8 ${index === 1 ? 'bg-indigo-600 text-white ring-4 ring-indigo-200' : 'bg-gray-50'}`}>
                <h3 className="text-2xl font-bold mb-2">{plan.plan}</h3>
                <div className="text-4xl font-bold mb-6">{plan.price}<span className="text-lg font-normal">/شهر</span></div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <button className={`w-full py-3 rounded-lg font-bold transition ${index === 1 ? 'bg-white text-indigo-600 hover:bg-gray-100' : 'bg-indigo-600 text-white hover:bg-indigo-700'}`}>
                  اختر الخطة
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 bg-indigo-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">هل أنت مستعد لتحويل إدارة الحجوزات؟</h2>
          <p className="text-xl text-indigo-100 mb-8">
            انضم إلى أكثر من 850 نشاطاً يستخدم نظامنا لزيادة الحجوزات وتحسين الخدمة
          </p>
          <button className="bg-white text-indigo-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition">
            ابدأ التجربة المجانية
          </button>
        </div>
      </section>
    </div>
  );
}
