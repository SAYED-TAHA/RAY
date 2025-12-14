
import React, { useState } from 'react';
import { Shirt, ArrowRightLeft, CheckCircle, Clock, Trash2, Printer, Tag, Wind, Waves } from 'lucide-react';

type Stage = 'received' | 'processing' | 'ironing' | 'ready' | 'delivered';

interface LaundryItem {
  id: string;
  customer: string;
  items: string;
  count: number;
  date: string;
  stage: Stage;
  urgent: boolean;
}

const initialItems: LaundryItem[] = [
  { id: 'ORD-101', customer: 'أحمد محمد', items: 'بدلة كاملة', count: 2, date: 'اليوم 10:00 ص', stage: 'received', urgent: false },
  { id: 'ORD-102', customer: 'منى زكي', items: 'فستان سهرة', count: 1, date: 'اليوم 11:30 ص', stage: 'processing', urgent: true },
  { id: 'ORD-103', customer: 'كريم محمود', items: 'قميص وبنطلون', count: 5, date: 'أمس 04:00 م', stage: 'ironing', urgent: false },
  { id: 'ORD-104', customer: 'فندق النيل', items: 'مفروشات', count: 20, date: 'أمس 09:00 ص', stage: 'ready', urgent: false },
  { id: 'ORD-105', customer: 'سارة أحمد', items: 'جاكيت شتوي', count: 1, date: 'اليوم 01:00 م', stage: 'received', urgent: true },
];

const LaundryWorkflow: React.FC<{ initialStage?: string }> = ({ initialStage }) => {
  const [items, setItems] = useState<LaundryItem[]>(initialItems);
  const [filter, setFilter] = useState<Stage | 'all'>((initialStage as Stage) || 'all');

  const moveStage = (id: string, direction: 'next' | 'prev') => {
    const stages: Stage[] = ['received', 'processing', 'ironing', 'ready', 'delivered'];
    
    setItems(prev => prev.map(item => {
      if (item.id !== id) return item;
      const currentIndex = stages.indexOf(item.stage);
      const nextIndex = direction === 'next' ? Math.min(stages.length - 1, currentIndex + 1) : Math.max(0, currentIndex - 1);
      return { ...item, stage: stages[nextIndex] };
    }));
  };

  const getFilteredItems = () => {
    if (filter === 'all') return items;
    return items.filter(item => item.stage === filter);
  };

  const getStageColor = (stage: Stage) => {
    switch(stage) {
      case 'received': return 'bg-gray-100 text-gray-600 border-gray-200';
      case 'processing': return 'bg-blue-50 text-blue-600 border-blue-200';
      case 'ironing': return 'bg-yellow-50 text-yellow-600 border-yellow-200';
      case 'ready': return 'bg-green-50 text-green-600 border-green-200';
      case 'delivered': return 'bg-purple-50 text-purple-600 border-purple-200';
    }
  };

  const getStageIcon = (stage: Stage) => {
    switch(stage) {
      case 'received': return Tag;
      case 'processing': return Waves;
      case 'ironing': return Wind;
      case 'ready': return CheckCircle;
      default: return Shirt;
    }
  };

  const getStageLabel = (stage: Stage) => {
    switch(stage) {
      case 'received': return 'استلام';
      case 'processing': return 'غسيل';
      case 'ironing': return 'كي وتجهيز';
      case 'ready': return 'جاهز';
      case 'delivered': return 'تم التسليم';
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-140px)] animate-in fade-in">
      {/* Header Controls */}
      <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm mb-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-800">إدارة أوامر التشغيل</h2>
          <p className="text-sm text-gray-500">تتبع وحرك الطلبات بين مراحل الغسيل المختلفة</p>
        </div>
        <div className="flex gap-2 p-1 bg-gray-100 rounded-xl overflow-x-auto max-w-full">
          {(['all', 'received', 'processing', 'ironing', 'ready'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-4 py-2 rounded-lg text-sm font-bold transition whitespace-nowrap
                ${filter === tab ? 'bg-white text-cyan-700 shadow-sm' : 'text-gray-500 hover:text-gray-700'}
              `}
            >
              {tab === 'all' ? 'الكل' : getStageLabel(tab)}
            </button>
          ))}
        </div>
      </div>

      {/* Orders List */}
      <div className="flex-1 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">
        <div className="p-4 border-b border-gray-100 bg-gray-50 grid grid-cols-12 text-xs font-bold text-gray-500">
          <div className="col-span-2">رقم الطلب</div>
          <div className="col-span-3">العميل / التفاصيل</div>
          <div className="col-span-2 text-center">المرحلة الحالية</div>
          <div className="col-span-2">الوقت</div>
          <div className="col-span-3 text-center">إجراءات</div>
        </div>

        <div className="overflow-y-auto flex-1 p-2 space-y-2">
          {getFilteredItems().map(item => {
            const CurrentIcon = getStageIcon(item.stage);
            return (
              <div key={item.id} className="grid grid-cols-12 items-center p-4 bg-white border border-gray-100 rounded-xl hover:shadow-md transition group">
                <div className="col-span-2">
                  <span className="font-bold text-gray-800 block">{item.id}</span>
                  {item.urgent && <span className="inline-block mt-1 px-2 py-0.5 bg-red-100 text-red-600 text-[10px] rounded font-bold animate-pulse">مستعجل</span>}
                </div>
                
                <div className="col-span-3">
                  <h4 className="font-bold text-gray-800 text-sm">{item.customer}</h4>
                  <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                    <Shirt className="w-3 h-3" /> {item.count} قطع • {item.items}
                  </p>
                </div>

                <div className="col-span-2 flex justify-center">
                  <span className={`flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-bold border ${getStageColor(item.stage)}`}>
                    <CurrentIcon className="w-3 h-3" />
                    {getStageLabel(item.stage)}
                  </span>
                </div>

                <div className="col-span-2 text-xs text-gray-500 flex items-center gap-1">
                  <Clock className="w-3 h-3" /> {item.date}
                </div>

                <div className="col-span-3 flex justify-center gap-2">
                  <button 
                    onClick={() => moveStage(item.id, 'prev')}
                    disabled={item.stage === 'received'}
                    className="p-2 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 disabled:opacity-30 transition"
                    title="إرجاع للمرحلة السابقة"
                  >
                    <ArrowRightLeft className="w-4 h-4" />
                  </button>
                  
                  {item.stage !== 'delivered' ? (
                    <button 
                      onClick={() => moveStage(item.id, 'next')}
                      className="flex-1 bg-cyan-600 text-white px-3 py-2 rounded-lg text-xs font-bold hover:bg-cyan-700 transition shadow-sm flex items-center justify-center gap-2"
                    >
                      المرحلة التالية
                      <ArrowRightLeft className="w-3 h-3 rtl:rotate-180" />
                    </button>
                  ) : (
                    <span className="flex-1 text-center text-green-600 font-bold text-xs py-2 bg-green-50 rounded-lg">مكتمل ✅</span>
                  )}

                  <button 
                    onClick={() => window.print()}
                    className="p-2 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-cyan-600 transition"
                    title="طباعة إيصال"
                  >
                    <Printer className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
          
          {getFilteredItems().length === 0 && (
            <div className="flex flex-col items-center justify-center h-40 text-gray-400">
              <Shirt className="w-12 h-12 mb-2 opacity-50" />
              <p>لا توجد طلبات في هذه المرحلة</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LaundryWorkflow;
