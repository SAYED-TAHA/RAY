
import React, { useState } from 'react';
import { 
  Award, Gift, Users, TrendingUp, Settings, Plus, Edit, Trash2, Star, 
  Crown, Trophy, Zap 
} from 'lucide-react';
import StatCard from '../../../common/cards/StatCard';

const initialTiers = [
  { id: 1, name: 'برونزي', minPoints: 0, color: 'bg-orange-700', benefits: ['نقطة لكل جنيه'] },
  { id: 2, name: 'فضي', minPoints: 1000, color: 'bg-gray-400', benefits: ['1.2 نقطة لكل جنيه', 'شحن مجاني'] },
  { id: 3, name: 'ذهبي', minPoints: 5000, color: 'bg-yellow-500', benefits: ['1.5 نقطة لكل جنيه', 'هدايا حصرية', 'أولوية التجهيز'] },
];

const LoyaltyManager: React.FC = () => {
  const [earnRate, setEarnRate] = useState(1); // 1 Point per EGP
  const [redeemRate, setRedeemRate] = useState(100); // 100 Points = 1 EGP
  const [tiers, setTiers] = useState(initialTiers);

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard title="أعضاء البرنامج" value="1,250" sub="عميل نشط" icon={Users} color="blue" />
        <StatCard title="النقاط الموزعة" value="85K" sub="هذا الشهر" icon={Star} color="yellow" />
        <StatCard title="النقاط المستبدلة" value="32K" sub="مكافآت" icon={Gift} color="green" />
        <StatCard title="معدل الولاء" value="65%" sub="تكرار الشراء" icon={TrendingUp} color="purple" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Settings Panel */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h3 className="font-bold text-lg text-gray-800 mb-6 flex items-center gap-2">
            <Settings className="w-5 h-5 text-gray-500" />
            إعدادات النقاط
          </h3>

          <div className="space-y-6">
            <div className="bg-blue-50 p-5 rounded-2xl border border-blue-100 flex flex-col md:flex-row items-center gap-6">
               <div className="bg-white p-3 rounded-full shadow-sm text-blue-600">
                 <Zap className="w-6 h-6" />
               </div>
               <div className="flex-1 text-center md:text-right">
                 <h4 className="font-bold text-gray-800 mb-1">معدل كسب النقاط</h4>
                 <p className="text-sm text-gray-500">كم نقطة يحصل عليها العميل مقابل كل جنيه ينفقه؟</p>
               </div>
               <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-xl border border-gray-200">
                 <input 
                   type="number" 
                   value={earnRate} 
                   onChange={(e) => setEarnRate(Number(e.target.value))}
                   className="w-12 text-center font-black text-lg outline-none"
                 />
                 <span className="text-xs font-bold text-gray-500">نقطة / 1 جنيه</span>
               </div>
            </div>

            <div className="bg-green-50 p-5 rounded-2xl border border-green-100 flex flex-col md:flex-row items-center gap-6">
               <div className="bg-white p-3 rounded-full shadow-sm text-green-600">
                 <Gift className="w-6 h-6" />
               </div>
               <div className="flex-1 text-center md:text-right">
                 <h4 className="font-bold text-gray-800 mb-1">معدل الاستبدال</h4>
                 <p className="text-sm text-gray-500">كم نقطة تساوي 1 جنيه خصم؟</p>
               </div>
               <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-xl border border-gray-200">
                 <input 
                   type="number" 
                   value={redeemRate} 
                   onChange={(e) => setRedeemRate(Number(e.target.value))}
                   className="w-16 text-center font-black text-lg outline-none"
                 />
                 <span className="text-xs font-bold text-gray-500">نقطة = 1 جنيه</span>
               </div>
            </div>
          </div>

          <h3 className="font-bold text-lg text-gray-800 mt-8 mb-4 flex items-center gap-2">
            <Crown className="w-5 h-5 text-yellow-500" />
            مستويات العملاء (Tiers)
          </h3>
          
          <div className="space-y-4">
            {tiers.map((tier) => (
              <div key={tier.id} className="flex items-center gap-4 p-4 border border-gray-100 rounded-xl hover:shadow-md transition">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white shadow-sm ${tier.color}`}>
                  <Trophy className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between mb-1">
                    <h4 className="font-bold text-gray-900">{tier.name}</h4>
                    <span className="text-xs font-bold text-gray-500">أكثر من {tier.minPoints} نقطة</span>
                  </div>
                  <div className="flex gap-2">
                    {tier.benefits.map((benefit, idx) => (
                      <span key={idx} className="text-[10px] bg-gray-100 px-2 py-0.5 rounded text-gray-600">{benefit}</span>
                    ))}
                  </div>
                </div>
                <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-gray-50 rounded-lg transition">
                  <Edit className="w-4 h-4" />
                </button>
              </div>
            ))}
            <button className="w-full py-3 border-2 border-dashed border-gray-200 rounded-xl text-gray-500 font-bold hover:border-blue-400 hover:text-blue-600 hover:bg-blue-50 transition flex items-center justify-center gap-2">
              <Plus className="w-4 h-4" /> إضافة مستوى جديد
            </button>
          </div>
        </div>

        {/* Leaderboard */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h3 className="font-bold text-lg text-gray-800 mb-6 flex items-center gap-2">
            <Award className="w-5 h-5 text-purple-600" />
            أفضل العملاء
          </h3>
          
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition">
                <div className="font-black text-gray-300 w-6 text-center">{i}</div>
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center font-bold text-gray-600">
                  {String.fromCharCode(64 + i)}
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-sm text-gray-800">عميل مميز {i}</h4>
                  <p className="text-xs text-gray-500">12 طلب • 4,500 نقطة</p>
                </div>
                {i === 1 && <Trophy className="w-5 h-5 text-yellow-500" />}
              </div>
            ))}
          </div>
          
          <button className="w-full mt-6 py-2 bg-gray-50 text-gray-600 rounded-lg text-sm font-bold hover:bg-gray-100 transition">
            عرض الكل
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoyaltyManager;
