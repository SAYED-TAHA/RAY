
import React from 'react';
import { Users, TrendingUp, ShieldCheck, Globe } from 'lucide-react';

const AboutView: React.FC = () => {
  return (
    <div className="animate-in fade-in duration-500 pb-20">
      {/* Hero */}
      <section className="relative bg-ray-blue text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <div className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-3xl flex items-center justify-center mx-auto mb-8 transform rotate-3 shadow-xl border border-white/20">
            <span className="text-4xl font-black text-ray-gold">R</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black mb-6">نوّر طريق نجاحك</h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto leading-relaxed">
            راي هي المنصة الرقمية الشاملة الأولى في مصر التي تهدف لتمكين التجار وتسهيل حياة العملاء من خلال تكنولوجيا متطورة وسهلة الاستخدام.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="max-w-7xl mx-auto px-4 -mt-10 relative z-20">
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
          {[
            { label: 'تاجر ونشاط', value: '+10,000', icon: Users, color: 'text-blue-600' },
            { label: 'طلب شهرياً', value: '+500K', icon: TrendingUp, color: 'text-green-600' },
            { label: 'نسبة رضاء', value: '98%', icon: ShieldCheck, color: 'text-orange-500' },
            { label: 'محافظة', value: '27', icon: Globe, color: 'text-purple-600' },
          ].map((stat, idx) => (
            <div key={idx} className="space-y-2">
              <stat.icon className={`w-8 h-8 mx-auto ${stat.color}`} />
              <h3 className="text-3xl font-black text-gray-900">{stat.value}</h3>
              <p className="text-gray-500 font-bold text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-black text-ray-black mb-6 flex items-center gap-3">
              <span className="w-2 h-8 bg-ray-gold rounded-full"></span>
              رؤيتنا ورسالتنا
            </h2>
            <div className="space-y-6">
              <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100">
                <h3 className="font-bold text-xl text-ray-blue mb-2">الرؤية</h3>
                <p className="text-gray-700 leading-relaxed">
                  أن نصبح الشريك الرقمي الأول لكل مشروع تجاري في الشرق الأوسط، ونخلق بيئة اقتصادية رقمية متكاملة تربط الجميع ببعضهم البعض.
                </p>
              </div>
              <div className="bg-orange-50 p-6 rounded-2xl border border-orange-100">
                <h3 className="font-bold text-xl text-orange-600 mb-2">الرسالة</h3>
                <p className="text-gray-700 leading-relaxed">
                  نحن نؤمن بأن التكنولوجيا حق للجميع، لذلك نعمل على توفير أدوات إدارة وتسويق احترافية بشكل مجاني ومبسط لتسهيل النمو والنجاح.
                </p>
              </div>
            </div>
          </div>
          <div className="relative h-[400px] rounded-3xl overflow-hidden shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800" 
              alt="Team working" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ray-black/80 to-transparent flex items-end p-8">
              <p className="text-white font-bold text-lg">فريق عمل شغوف يعمل على مدار الساعة لخدمتك</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutView;
