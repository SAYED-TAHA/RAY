
import React, { useState } from 'react';
import { 
  Calendar, Users, Clock, CheckCircle, DollarSign, AlertCircle,
  Phone, MapPin, Settings2, User, MessageSquare, Zap
} from 'lucide-react';
import ActionButton from '../../../common/buttons/ActionButton';
import StatCard from '../../../common/cards/StatCard';
import DashboardCustomizer from '../../DashboardCustomizer';

interface BookingsOverviewProps {
  setActiveTab: (tab: string) => void;
  businessType: string;
}

const BookingsOverview: React.FC<BookingsOverviewProps> = ({ setActiveTab, businessType }) => {
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);

  const defaultStats = [
    { id: 'stat_today', title: "حجوزات اليوم", value: "18", sub: "حجز مؤكد", icon: Calendar, color: "blue" as const },
    { id: 'stat_pending', title: "حجوزات معلقة", value: "5", sub: "بانتظار التأكيد", icon: Clock, color: "orange" as const },
    { id: 'stat_completed', title: "مكتملة", value: "42", sub: "هذا الأسبوع", icon: CheckCircle, color: "green" as const },
    { id: 'stat_revenue', title: "الإيرادات", value: "12,500 ج", sub: "من الحجوزات", icon: DollarSign, color: "teal" as const },
  ];

  const defaultActions = [
    { id: 'act_new', label: "حجز جديد", icon: Calendar, color: "bg-blue-600 text-white", onClick: () => setActiveTab('overview') },
    { id: 'act_today', label: "حجوزات اليوم", icon: Clock, color: "bg-white text-gray-700 border border-gray-200 hover:border-blue-600", onClick: () => setActiveTab('overview') },
    { id: 'act_pending', label: "المعلقة", icon: AlertCircle, color: "bg-white text-gray-700 border border-gray-200 hover:border-blue-600", onClick: () => setActiveTab('overview') },
    { id: 'act_clients', label: "العملاء", icon: Users, color: "bg-white text-gray-700 border border-gray-200 hover:border-blue-600", onClick: () => setActiveTab('customers') },
    { id: 'act_messages', label: "الرسائل", icon: MessageSquare, color: "bg-white text-gray-700 border border-gray-200 hover:border-blue-600", onClick: () => setActiveTab('messages') },
    { id: 'act_reports', label: "التقارير", icon: Zap, color: "bg-white text-gray-700 border border-gray-200 hover:border-blue-600", onClick: () => setActiveTab('reports') },
  ];

  const [visibleIds, setVisibleIds] = useState<string[]>([
    ...defaultStats.map(s => s.id),
    ...defaultActions.map(a => a.id)
  ]);

  const handleToggle = (id: string) => {
    setVisibleIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const customizerItems = [
    ...defaultStats.map(s => ({ id: s.id, label: s.title, category: 'stats' as const })),
    ...defaultActions.map(a => ({ id: a.id, label: a.label, category: 'actions' as const }))
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500 relative">
      
      <div className="flex justify-end mb-[-10px]">
        <button 
          onClick={() => setIsCustomizerOpen(true)}
          className="flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-blue-600 bg-white px-3 py-1.5 rounded-full shadow-sm border border-gray-100 hover:border-blue-600 transition"
        >
          <Settings2 className="w-3 h-3" />
          تخصيص
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
         {defaultStats.filter(s => visibleIds.includes(s.id)).map(stat => (
           <StatCard 
             key={stat.id}
             title={stat.title} 
             value={stat.value} 
             sub={stat.sub} 
             icon={stat.icon} 
             color={stat.color} 
           />
         ))}
      </div>

      {/* Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {defaultActions.filter(a => visibleIds.includes(a.id)).map(action => (
          <ActionButton 
            key={action.id}
            icon={action.icon} 
            label={action.label} 
            color={action.color} 
            onClick={action.onClick} 
          />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         {/* Today's Bookings */}
         <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-lg text-gray-800 flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-blue-500" />
                    حجوزات اليوم
                </h3>
                <span className="text-xs bg-blue-50 text-blue-800 px-2 py-1 rounded font-bold">18 حجز</span>
            </div>
            <div className="space-y-3">
                <BookingRow 
                  time="10:00 ص" 
                  client="أحمد محمد" 
                  service="كشف عام" 
                  status="confirmed"
                  phone="01012345678"
                />
                <BookingRow 
                  time="10:30 ص" 
                  client="سارة علي" 
                  service="استشارة أسنان" 
                  status="pending"
                  phone="01098765432"
                />
                <BookingRow 
                  time="11:00 ص" 
                  client="محمود حسن" 
                  service="كشف متابعة" 
                  status="completed"
                  phone="01055555555"
                />
            </div>
         </div>

         {/* Quick Stats */}
         <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h3 className="font-bold text-lg text-gray-800 mb-4">ملخص الأداء</h3>
            <div className="space-y-4">
               <StatRow label="معدل الحضور" value="94%" color="text-green-600" />
               <StatRow label="الحجوزات الملغاة" value="2" color="text-red-600" />
               <StatRow label="متوسط التقييم" value="4.7" color="text-yellow-600" />
               <StatRow label="رضا العملاء" value="96%" color="text-blue-600" />
            </div>
         </div>
      </div>

      <DashboardCustomizer 
        isOpen={isCustomizerOpen}
        onClose={() => setIsCustomizerOpen(false)}
        items={customizerItems}
        visibleIds={visibleIds}
        onToggle={handleToggle}
      />
    </div>
  );
};

const BookingRow = ({ time, client, service, status, phone }: any) => {
  const statusColors = {
    confirmed: { bg: 'bg-green-50', border: 'border-green-100', text: 'text-green-700', label: 'مؤكد' },
    pending: { bg: 'bg-yellow-50', border: 'border-yellow-100', text: 'text-yellow-700', label: 'معلق' },
    completed: { bg: 'bg-blue-50', border: 'border-blue-100', text: 'text-blue-700', label: 'مكتمل' },
  };
  
  const colors = statusColors[status as keyof typeof statusColors];

  return (
    <div className={`flex items-center justify-between p-3 ${colors.bg} rounded-xl border ${colors.border}`}>
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-blue-600 shadow-sm">
          <User className="w-5 h-5" />
        </div>
        <div>
          <h4 className="font-bold text-sm text-gray-800">{time} - {client}</h4>
          <p className={`text-xs ${colors.text}`}>{service}</p>
        </div>
      </div>
      <button 
        className={`text-xs font-bold ${colors.text} border ${colors.border} px-3 py-1 rounded bg-white hover:${colors.bg} transition`}
      >
        {colors.label}
      </button>
    </div>
  );
};

const StatRow = ({ label, value, color }: any) => (
  <div className="flex justify-between items-center border-b border-gray-50 pb-2 last:border-0 last:pb-0">
    <span className="text-sm font-medium text-gray-700">{label}</span>
    <span className={`text-sm font-bold ${color}`}>{value}</span>
  </div>
);

export default BookingsOverview;
