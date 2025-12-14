"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { 
  Dumbbell, Calendar, Users, DollarSign, CheckCircle, Shield, Zap, 
  TrendingUp, ArrowLeft, Star, Clock, Heart
} from 'lucide-react';

export default function GymSystemPage() {
  const router = useRouter();

  const features = [
    {
      icon: Calendar,
      title: "إدارة الحجوزات",
      description: "حجوزات الأعضاء، الجدول الأسبوعي، حجز التدريب"
    },
    {
      icon: Users,
      title: "إدارة الأعضاء",
      description: "ملفات الأعضاء، الاشتراكات، الباقات، الحضور"
    },
    {
      icon: Dumbbell,
      title: "إدارة التدريب",
      description: "المدربون، برامج التدريب، تتبع التقدم"
    },
    {
      icon: Clock,
      title: "جدولة الفصول",
      description: "جدول الفصول، السعة، الإلغاء والتعويض"
    },
    {
      icon: DollarSign,
      title: "إدارة المدفوعات",
      description: "الاشتراكات، الباقات، الدفعات، التقارير"
    },
    {
      icon: Heart,
      title: "اللياقة والتقدم",
      description: "تتبع التقدم، الأهداف، القياسات، الإنجازات"
    }
  ];

  const benefits = [
    "زيادة الأعضاء بنسبة 42%",
    "تقليل حالات عدم الحضور بنسبة 68%",
    "توفير الوقت بنسبة 55%",
    "رضا الأعضاء 95%"
  ];

  const pricing = [
    {
      plan: "أساسي",
      price: "299 ج",
      features: ["حتى 100 عضو", "مدرب واحد", "تقارير أساسية", "دعم عبر البريد"]
    },
    {
      plan: "احترافي",
      price: "599 ج",
      features: ["أعضاء غير محدودين", "10 مدربين", "تقارير متقدمة", "دعم على مدار الساعة"]
    },
    {
      plan: "مؤسسي",
      price: "999 ج",
      features: ["فروع متعددة", "مدربين غير محدودين", "تخصيص كامل", "مدير حساب مخصص"]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-white">
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
            <button 
              onClick={() => router.push('/dashboard?type=gym')}
              className="bg-red-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-red-700 transition"
            >
              ابدأ الآن
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="w-20 h-20 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-8">
            <Dumbbell className="w-10 h-10 text-red-600" />
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            نظام إدارة <span className="text-red-600">الأندية الرياضية</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            نظام متكامل لإدارة الأندية الرياضية والجيم. من إدارة الأعضاء إلى جدولة الفصول، 
            كل ما تحتاجه لتشغيل ناديك بكفاءة عالية.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => router.push('/dashboard?type=gym')}
              className="bg-red-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-red-700 transition"
            >
              جرب مجاناً لمدة 14 يوم
            </button>
            <button className="bg-white text-red-600 border-2 border-red-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-red-50 transition">
              مشاهدة عرض توضيحي
            </button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">مميزات النظام</h2>
            <p className="text-xl text-gray-600">كل ما تحتاجه لإدارة ناديك الرياضي بكفاءة</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-gray-50 rounded-2xl p-8 hover:shadow-lg transition">
                <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mb-6">
                  <feature.icon className="w-6 h-6 text-red-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 px-4 bg-red-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">نتائج حقيقية</h2>
            <p className="text-xl text-gray-600">نتائج ملموسة من أندية رياضية تستخدم نظامنا</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-red-600 mb-2">{benefit}</div>
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
            <p className="text-xl text-gray-600">اختر الخطة المناسبة لناديك</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricing.map((plan, index) => (
              <div key={index} className={`rounded-2xl p-8 ${index === 1 ? 'bg-red-600 text-white ring-4 ring-red-200' : 'bg-gray-50'}`}>
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
                <button className={`w-full py-3 rounded-lg font-bold transition ${index === 1 ? 'bg-white text-red-600 hover:bg-gray-100' : 'bg-red-600 text-white hover:bg-red-700'}`}>
                  اختر الخطة
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 bg-red-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">هل أنت مستعد لتحويل ناديك الرياضي؟</h2>
          <p className="text-xl text-red-100 mb-8">
            انضم إلى أكثر من 150 نادياً رياضياً يستخدم نظامنا لزيادة الأعضاء وتحسين الخدمة
          </p>
          <button 
            onClick={() => router.push('/dashboard?type=gym')}
            className="bg-white text-red-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition"
          >
            ابدأ التجربة المجانية
          </button>
        </div>
      </section>
    </div>
  );
}
