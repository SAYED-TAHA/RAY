
import React from 'react';
import { ArrowRight, PlayCircle, CheckCircle, Store, ArrowLeft } from 'lucide-react';

interface SystemLandingProps {
  system: any;
  onMerchantClick: (type: string) => void;
}

const SystemLanding: React.FC<SystemLandingProps> = ({ system, onMerchantClick }) => {
  return (
    <div className="animate-in fade-in duration-500">
      {/* Hero */}
      <section className={`relative text-white py-20 overflow-hidden bg-gradient-to-br ${system.color}`}>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1 space-y-6 text-center md:text-right">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-bold mb-2">
                <system.icon className="w-5 h-5 text-ray-gold" />
                <span>نظام متخصص ومجاني</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-black leading-tight mb-4">
                {system.title}
              </h1>
              <p className="text-xl text-gray-100 leading-relaxed font-medium max-w-2xl">
                {system.description}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-6 justify-center md:justify-start">
                <button 
                  onClick={() => onMerchantClick(system.id)}
                  className="bg-ray-gold text-ray-black px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl hover:scale-105 transition flex items-center justify-center gap-2"
                >
                  ابدأ الآن مجاناً
                  <ArrowRight className="w-5 h-5" />
                </button>
                <button className="bg-white/10 border border-white/30 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/20 transition flex items-center justify-center gap-2">
                  شاهد فيديو توضيحي
                  <PlayCircle className="w-5 h-5" />
                </button>
              </div>
              <p className="text-sm text-white/70 mt-4">🚀 بدون باقات، بدون رسوم خفية، تفعيل فوري.</p>
            </div>
            <div className="flex-1 relative">
              <div className="absolute inset-0 bg-ray-gold/20 blur-[100px] rounded-full"></div>
              <img 
                src={system.image} 
                alt={system.title} 
                className="relative rounded-3xl shadow-2xl border-8 border-white/10 transform rotate-2 hover:rotate-0 transition duration-500 object-cover h-96 w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-black text-gray-900 mb-4">ليه تختار نظام راي لـ {system.title}؟</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">صممنا النظام ده خصيصاً عشان يحل مشاكلك اليومية ويوفر وقتك وفلوسك.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {system.features.map((feature: any, idx: number) => (
              <div key={idx} className={`p-8 rounded-3xl border border-gray-100 hover:border-transparent hover:shadow-2xl transition duration-300 group flex flex-col ${system.bg}`}>
                <div className={`w-14 h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center mb-6 group-hover:scale-110 transition ${system.accent}`}>
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed text-sm flex-1">
                  {feature.desc}
                </p>
                
                <button className={`mt-6 flex items-center gap-2 text-sm font-bold transition-colors hover:underline ${system.accent}`}>
                  اعرف المزيد
                  <ArrowLeft className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-gray-50">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
               <div>
                  <h2 className="text-3xl font-black text-gray-900 mb-6">فوائد النظام لعملك 📈</h2>
                  <div className="space-y-6">
                    {system.benefits ? system.benefits.map((item: any, i: number) => (
                      <div key={i} className="flex gap-4">
                         <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 text-white font-bold shadow-lg ${system.accent.replace('text-', 'bg-')}`}>
                           {i+1}
                         </div>
                         <div>
                           <h4 className="font-bold text-lg text-gray-900">{item.title}</h4>
                           <p className="text-gray-600 text-sm">{item.desc}</p>
                         </div>
                      </div>
                    )) : (
                      // Fallback to generic benefits if specific ones are missing
                      [
                        { title: 'يعمل أوفلاين', text: 'النت قطع؟ ولا يهمك، النظام شغال ومبيوقفش لحظة.' },
                        { title: 'تقارير من أي مكان', text: 'تابع مبيعاتك وأرباحك من موبايلك وأنت في البيت.' },
                        { title: 'دعم فني مصري 24/7', text: 'فريق كامل جاهز يساعدك في أي وقت.' },
                        { title: 'تحديثات مستمرة مجانية', text: 'كل يوم مميزات جديدة بتنزل من غير ما تدفع مليم.' }
                      ].map((item, i) => (
                        <div key={i} className="flex gap-4">
                           <div className="w-12 h-12 rounded-full bg-ray-gold/20 flex items-center justify-center shrink-0 text-ray-blue font-bold">
                             {i+1}
                           </div>
                           <div>
                             <h4 className="font-bold text-lg text-gray-900">{item.title}</h4>
                             <p className="text-gray-600 text-sm">{item.text}</p>
                           </div>
                        </div>
                      ))
                    )}
                  </div>
               </div>
               <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 text-center relative overflow-hidden">
                  <div className={`absolute top-0 left-0 w-full h-2 bg-gradient-to-r ${system.color}`}></div>
                  <div className={`w-20 h-20 rounded-2xl flex items-center justify-center text-white mx-auto mb-6 shadow-lg transform -rotate-6 bg-gradient-to-br ${system.color}`}>
                    <Store className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">جاهز تبدأ رحلة النجاح؟</h3>
                  <p className="text-gray-500 mb-8">سجل حسابك دلوقتي في أقل من دقيقة واستلم سيستم كامل لـ {system.title} جاهز للشغل.</p>
                  <button 
                    onClick={() => onMerchantClick(system.id)}
                    className="w-full bg-ray-gold text-ray-black py-4 rounded-xl font-bold text-lg shadow-lg hover:scale-105 transition mb-4"
                  >
                    ابدأ الآن مجاناً
                  </button>
                  <p className="text-xs text-gray-400">تطبق الشروط والأحكام</p>
               </div>
            </div>
         </div>
      </section>
    </div>
  );
};

export default SystemLanding;
