"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { 
  Gavel, Users, DollarSign, CheckCircle, Shield, 
  ArrowLeft, Calendar, FileText, Clock
} from 'lucide-react';

export default function LawSystemPage() {
  const router = useRouter();

  const features = [
    {
      icon: FileText,
      title: "إدارة القضايا",
      description: "ملفات القضايا، الوثائق، المراحل، المتابعة"
    },
    {
      icon: Users,
      title: "إدارة الموكلين",
      description: "ملفات الموكلين، البيانات، الاتصالات"
    },
    {
      icon: Calendar,
      title: "جدولة الجلسات",
      description: "مواعيد الجلسات، التذكيرات، المتابعة"
    },
    {
      icon: Clock,
      title: "تتبع الساعات",
      description: "ساعات العمل، الفواتير، التقارير"
    },
    {
      icon: DollarSign,
      title: "إدارة الفواتير",
      description: "فواتير الخدمات، الدفعات، الحسابات"
    },
    {
      icon: Shield,
      title: "التقارير",
      description: "تقارير القضايا، الإيرادات، الأداء"
    }
  ];

  const benefits = [
    "زيادة الموكلين بنسبة 40%",
    "توفير الوقت بنسبة 60%",
    "تنظيم أفضل بنسبة 85%",
    "رضا الموكلين 96%"
  ];

  const pricing = [
    {
      plan: "أساسي",
      price: "399 ج",
      features: ["حتى 20 قضية", "محامي واحد", "تقارير أساسية", "دعم عبر البريد"]
    },
    {
      plan: "احترافي",
      price: "799 ج",
      features: ["قضايا غير محدودة", "5 محامين", "تقارير متقدمة", "دعم 24/7"]
    },
    {
      plan: "مؤسسي",
      price: "1299 ج",
      features: ["فروع متعددة", "محامين غير محدودين", "تخصيص كامل", "مدير حساب"]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
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
              onClick={() => router.push('/dashboard?type=law')}
              className="bg-slate-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-slate-700 transition"
            >
              ابدأ الآن
            </button>
          </div>
        </div>
      </header>

      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="w-20 h-20 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-8">
            <Gavel className="w-10 h-10 text-slate-600" />
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            نظام مكاتب <span className="text-slate-600">المحاماة</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            نظام متكامل لإدارة مكاتب المحاماة. من القضايا إلى الموكلين، كل ما تحتاجه لتشغيل مكتبك بكفاءة.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => router.push('/dashboard?type=law')}
              className="bg-slate-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-slate-700 transition"
            >
              جرب مجاناً لمدة 14 يوم
            </button>
            <button className="bg-white text-slate-600 border-2 border-slate-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-slate-50 transition">
              مشاهدة عرض توضيحي
            </button>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">مميزات النظام</h2>
            <p className="text-xl text-gray-600">كل ما تحتاجه لإدارة مكتبك بكفاءة</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-gray-50 rounded-2xl p-8 hover:shadow-lg transition">
                <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center mb-6">
                  <feature.icon className="w-6 h-6 text-slate-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">نتائج حقيقية</h2>
            <p className="text-xl text-gray-600">نتائج ملموسة من مكاتب تستخدم نظامنا</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-slate-600 mb-2">{benefit}</div>
                <p className="text-gray-600">تحسن ملحوظ</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">الأسعار</h2>
            <p className="text-xl text-gray-600">اختر الخطة المناسبة لمكتبك</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricing.map((plan, index) => (
              <div key={index} className={`rounded-2xl p-8 ${index === 1 ? 'bg-slate-600 text-white ring-4 ring-slate-200' : 'bg-gray-50'}`}>
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
                <button className={`w-full py-3 rounded-lg font-bold transition ${index === 1 ? 'bg-white text-slate-600 hover:bg-gray-100' : 'bg-slate-600 text-white hover:bg-slate-700'}`}>
                  اختر الخطة
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-slate-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">هل أنت مستعد لتحويل مكتبك؟</h2>
          <p className="text-xl text-slate-100 mb-8">
            انضم إلى أكثر من 80 مكتب محاماة يستخدم نظامنا لتنظيم أفضل وخدمة أفضل
          </p>
          <button 
            onClick={() => router.push('/dashboard?type=law')}
            className="bg-white text-slate-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition"
          >
            ابدأ التجربة المجانية
          </button>
        </div>
      </section>
    </div>
  );
}
