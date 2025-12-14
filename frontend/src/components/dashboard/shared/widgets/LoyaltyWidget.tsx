
import React from 'react';
import { Gift, Star, Trophy, Check } from 'lucide-react';

interface LoyaltyWidgetProps {
  type: 'points' | 'stamps';
  title?: string;
  current: number;
  total: number;
  reward: string;
  color?: string;
}

const LoyaltyWidget: React.FC<LoyaltyWidgetProps> = ({ 
  type = 'stamps', 
  title = 'برنامج الولاء', 
  current, 
  total, 
  reward,
  color = 'bg-blue-600'
}) => {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 relative overflow-hidden">
      <div className={`absolute top-0 left-0 w-1.5 h-full ${color}`}></div>
      <div className="flex justify-between items-start mb-4">
         <div>
            <h3 className="font-bold text-gray-800 flex items-center gap-2">
               <Trophy className={`w-5 h-5 ${color.replace('bg-', 'text-')}`} />
               {title}
            </h3>
            <p className="text-xs text-gray-500 mt-1">اجمع {total} لتحصل على {reward}</p>
         </div>
         <div className={`px-3 py-1 rounded-full text-xs font-bold text-white ${color}`}>
            {current}/{total}
         </div>
      </div>

      {type === 'stamps' ? (
         <div className="flex justify-between gap-2 mt-4">
            {Array.from({ length: total }).map((_, i) => (
               <div 
                 key={i} 
                 className={`flex-1 aspect-square rounded-full flex items-center justify-center border-2 transition-all
                   ${i < current 
                     ? `${color} border-transparent text-white shadow-sm` 
                     : 'bg-gray-50 border-gray-200 text-gray-300'}
                 `}
               >
                  {i < current ? <Check className="w-4 h-4" /> : <Star className="w-4 h-4" />}
               </div>
            ))}
         </div>
      ) : (
         <div className="mt-4">
            <div className="w-full bg-gray-100 h-3 rounded-full overflow-hidden">
               <div 
                 className={`h-full rounded-full transition-all duration-1000 ${color}`} 
                 style={{ width: `${(current / total) * 100}%` }}
               ></div>
            </div>
            <div className="flex justify-between text-xs font-bold text-gray-500 mt-2">
               <span>0</span>
               <span>{total} نقطة</span>
            </div>
         </div>
      )}

      {current >= total && (
         <div className="mt-4 p-3 bg-yellow-50 border border-yellow-100 rounded-xl flex items-center gap-3 animate-pulse">
            <Gift className="w-5 h-5 text-yellow-600" />
            <span className="text-xs font-bold text-yellow-700">لديك مكافأة جاهزة للاستخدام!</span>
         </div>
      )}
    </div>
  );
};

export default LoyaltyWidget;
