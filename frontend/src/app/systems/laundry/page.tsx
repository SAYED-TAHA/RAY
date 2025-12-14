"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { 
  Briefcase, Package, Users, DollarSign, CheckCircle, Shield, 
  ArrowLeft, Clock, Truck
} from 'lucide-react';

export default function LaundrySystemPage() {
  const router = useRouter();

  const features = [
    {
      icon: Package,
      title: "استلام وتسليم",
      description: "استلام البضائع، التسليم، التتبع، الإشعارات"
    },
    {
      icon: Users,
      title: "إدارة العملاء",
      description: "ملفات العملاء، البطاقات، السجل"
    },
    {
      icon: Clock,
      title: "تتبع الطلبات",
      description: "حالة الطلب، الوقت المتوقع، التنبيهات"
    },
    {
      icon: Truck,
      title: "إدارة التوصيل",
      description: "جدولة التوصيل، المسارات، الفنيين"
    },
    {
      icon: DollarSign,
      title: "إدارة المدفوعات",
      description: "الفواتير، الدفعات، الأسعار"
    },
    {
      icon: Shield,
      title: "التقارير",
      description: "مبيعات، أداء، رضا العملاء"
    }
  ];

  const benefits = [
    "زيادة الطلبات بنسبة 35%",
    "تسريع الخدمة بنسبة 50%",
    "تقليل الأخطاء بنسبة 75%",
    "رضا العملاء 93%"
  ];

  const pricing = [
    {
      plan: "أساسي",
      price: "199 ج",
      features: ["حتى 100 طلب شهرياً", "عميل واحد", "تقارير أساسية", "دعم عبر البريد"]
    },
    {
      plan: "احترافي",
      price: "399 ج",
      features: ["طلبات غير محدودة", "5 عملاء", "تقارير متقدمة", "دعم 24/7"]
    },
    {
      plan: "مؤسسي",
      price: "699 ج",
      features: ["فروع متعددة", "عملاء غير محدودين", "تخصيص كامل", "مدير حساب"]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white">
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
              onClick={() => router.push('/dashboard?type=laundry')}
              className="bg-sky-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-sky-700 transition"
            >
              ابدأ الآن
            </button>
          </div>
        </div>
      </header>

      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="w-20 h-20 bg-sky-100 rounded-2xl flex items-center justify-center mx-auto mb-8">
            <Briefcase className="w-10 h-10 text-sky-600" />
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            نظام إدارة <span className="text-sky-600">المغاسل</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            نظام متكامل لإدارة المغاسل. من استلام البضائع إلى التسليم، كل ما تحتاجه لتشغيل مغسلتك بكفاءة.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => router.push('/dashboard?type=laundry')}
              className="bg-sky-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-sky-700 transition"
            >
              جرب مجاناً لمدة 14 يوم
            </button>
            <button className="bg-white text-sky-600 border-2 border-sky-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-sky-50 transition">
              مشاهدة عرض توضيحي
            </button>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">مميزات النظام</h2>
            <p className="text-xl text-gray-600">كل ما تحتاجه لإدارة مغسلتك بكفاءة</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-gray-50 rounded-2xl p-8 hover:shadow-lg transition">
                <div className="w-12 h-12 bg-sky-100 rounded-xl flex items-center justify-center mb-6">
                  <feature.icon className="w-6 h-6 text-sky-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-sky-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">نتائج حقيقية</h2>
            <p className="text-xl text-gray-600">نتائج ملموسة من مغاسل تستخدم نظامنا</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-sky-600 mb-2">{benefit}</div>
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
            <p className="text-xl text-gray-600">اختر الخطة المناسبة لمغسلتك</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricing.map((plan, index) => (
              <div key={index} className={`rounded-2xl p-8 ${index === 1 ? 'bg-sky-600 text-white ring-4 ring-sky-200' : 'bg-gray-50'}`}>
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
                <button className={`w-full py-3 rounded-lg font-bold transition ${index === 1 ? 'bg-white text-sky-600 hover:bg-gray-100' : 'bg-sky-600 text-white hover:bg-sky-700'}`}>
                  اختر الخطة
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-sky-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">هل أنت مستعد لتحويل مغسلتك؟</h2>
          <p className="text-xl text-sky-100 mb-8">
            انضم إلى أكثر من 100 مغسلة تستخدم نظامنا لزيادة الطلبات وتحسين الخدمة
          </p>
          <button 
            onClick={() => router.push('/dashboard?type=laundry')}
            className="bg-white text-sky-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition"
          >
            ابدأ التجربة المجانية
          </button>
        </div>
      </section>
    </div>
  );
}
