
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { Activity, TrendingUp, AlertCircle, CheckCircle } from 'lucide-react';

interface BusinessHealthWidgetProps {
  score?: number;
}

const BusinessHealthWidget: React.FC<BusinessHealthWidgetProps> = ({ score = 85 }) => {
  const data = [
    { name: 'Score', value: score },
    { name: 'Remaining', value: 100 - score },
  ];

  const getColor = (val: number) => {
    if (val >= 80) return '#10B981'; // Green
    if (val >= 60) return '#F59E0B'; // Yellow
    return '#EF4444'; // Red
  };

  const color = getColor(score);

  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 h-full flex flex-col">
      <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
        <Activity className="w-5 h-5 text-ray-blue" />
        صحة النشاط التجاري
      </h3>

      <div className="flex-1 flex flex-col items-center justify-center relative">
        <div className="w-48 h-48 relative">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                startAngle={180}
                endAngle={0}
                paddingAngle={0}
                dataKey="value"
                stroke="none"
              >
                <Cell fill={color} />
                <Cell fill="#F3F4F6" />
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1 text-center">
             <span className="block text-4xl font-black text-gray-900">{score}</span>
             <span className="text-xs text-gray-400 font-bold">من 100</span>
          </div>
        </div>
        
        <p className="text-center text-sm font-medium text-gray-600 -mt-8 px-4">
          {score >= 80 ? 'أداء ممتاز! استمر في الحفاظ على هذا المستوى.' : 
           score >= 60 ? 'أداء جيد، ولكن هناك مجال للتحسين في المبيعات.' : 
           'يحتاج النشاط إلى انتباه فوري لتحسين الأداء.'}
        </p>
      </div>

      <div className="mt-6 space-y-3 border-t border-gray-50 pt-4">
         <div className="flex justify-between items-center text-sm">
            <span className="flex items-center gap-2 text-gray-600"><CheckCircle className="w-4 h-4 text-green-500" /> المبيعات</span>
            <span className="font-bold text-green-600">ممتاز</span>
         </div>
         <div className="flex justify-between items-center text-sm">
            <span className="flex items-center gap-2 text-gray-600"><TrendingUp className="w-4 h-4 text-yellow-500" /> النمو</span>
            <span className="font-bold text-yellow-600">جيد</span>
         </div>
         <div className="flex justify-between items-center text-sm">
            <span className="flex items-center gap-2 text-gray-600"><AlertCircle className="w-4 h-4 text-blue-500" /> رضاء العملاء</span>
            <span className="font-bold text-blue-600">98%</span>
         </div>
      </div>
    </div>
  );
};

export default BusinessHealthWidget;
