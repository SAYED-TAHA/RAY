
import React, { useState } from 'react';
import { 
  Car, Key, UserCheck, DollarSign, Plus, Calculator, 
  FileText, Wrench, Printer, Settings2
} from 'lucide-react';
import ActionButton from '../../../common/buttons/ActionButton';
import StatCard from '../../../common/cards/StatCard';
import StatusBadge from '../../../common/StatusBadge';
import DashboardCustomizer from '../../DashboardCustomizer';

interface CarsOverviewProps {
  setActiveTab: (tab: string) => void;
}

const CarsOverview: React.FC<CarsOverviewProps> = ({ setActiveTab }) => {
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);

  const defaultStats = [
    { id: 'stat_sales', title: "سيارات مباعة", value: "12", sub: "+2 هذا الشهر", icon: Car, color: "red" as const },
    { id: 'stat_inventory', title: "متاح في المعرض", value: "58", sub: "سيارة", icon: Key, color: "blue" as const },
    { id: 'stat_drives', title: "طلبات تجربة", value: "6", sub: "اليوم", icon: UserCheck, color: "yellow" as const },
    { id: 'stat_finance', title: "أقساط مستحقة", value: "150k", sub: "خلال 7 أيام", icon: DollarSign, color: "green" as const },
  ];

  const defaultActions = [
    { id: 'act_add_car', label: "إضافة سيارة", icon: Plus, color: "bg-red-700 text-white", onClick: () => setActiveTab('inventory') },
    { id: 'act_test_drive', label: "حجز تجربة", icon: Key, color: "bg-white text-gray-700 border border-gray-200 hover:border-red-600", onClick: () => setActiveTab('test_drives') },
    { id: 'act_calc', label: "حاسبة أقساط", icon: Calculator, color: "bg-white text-gray-700 border border-gray-200 hover:border-red-600", onClick: () => setActiveTab('installments') },
    { id: 'act_contract', label: "عقد بيع", icon: FileText, color: "bg-white text-gray-700 border border-gray-200 hover:border-red-600", onClick: () => setActiveTab('sales') },
    { id: 'act_service', label: "أمر صيانة", icon: Wrench, color: "bg-white text-gray-700 border border-gray-200 hover:border-red-600", onClick: () => setActiveTab('maintenance') },
    { id: 'act_report', label: "تقرير المخزون", icon: Printer, color: "bg-white text-gray-700 border border-gray-200 hover:border-red-600", onClick: () => setActiveTab('inventory') },
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
          className="flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-red-600 bg-white px-3 py-1.5 rounded-full shadow-sm border border-gray-100 hover:border-red-600 transition"
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
         {/* Service Center Status */}
         <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-lg text-gray-800 flex items-center gap-2">
                    <Wrench className="w-5 h-5 text-gray-500" />
                    حالة مركز الصيانة
                </h3>
                <div className="flex gap-2">
                   <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded font-bold">مفتوح الآن</span>
                   <button 
                     onClick={() => setActiveTab('maintenance')} 
                     className="text-xs font-bold text-red-600 hover:bg-red-50 px-2 py-1 rounded transition"
                   >
                     عرض الكل
                   </button>
                </div>
            </div>
            <div className="space-y-4">
                <ServiceRow car="Kia Sportage" plate="أ ب ج 123" service="صيانة 10,000 كم" status="in_progress" time="10:30 ص" />
                <ServiceRow car="Toyota Corolla" plate="س ص ع 987" service="تغيير زيت" status="waiting" time="11:00 ص" />
                <ServiceRow car="Mercedes C180" plate="م م م 111" service="سمكرة ودهان" status="completed" time="أمس" />
            </div>
         </div>

         {/* Upcoming Test Drives */}
         <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex justify-between items-center mb-4">
               <h3 className="font-bold text-lg text-gray-800">تجارب القيادة اليوم</h3>
               <button 
                 onClick={() => setActiveTab('test_drives')} 
                 className="text-xs font-bold text-red-600 hover:bg-red-50 px-2 py-1 rounded transition"
               >
                 عرض الجدول
               </button>
            </div>
            <div className="space-y-4">
               <div className="flex items-start gap-3 pb-4 border-b border-gray-50">
                  <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center text-red-600 font-bold text-xs">
                     12:30
                  </div>
                  <div>
                     <h4 className="font-bold text-sm">أحمد خالد</h4>
                     <p className="text-xs text-gray-500">Hyundai Tucson 2025</p>
                  </div>
                  <button className="mr-auto text-xs bg-green-50 text-green-600 px-2 py-1 rounded font-bold">تأكيد</button>
               </div>
               <div className="flex items-start gap-3 pb-4 border-b border-gray-50">
                  <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center text-gray-600 font-bold text-xs">
                     02:00
                  </div>
                  <div>
                     <h4 className="font-bold text-sm">د. محمد سامي</h4>
                     <p className="text-xs text-gray-500">BMW 320i</p>
                  </div>
                  <button className="mr-auto text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded font-bold">بدء</button>
               </div>
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

const ServiceRow = ({ car, plate, service, status, time }: any) => (
    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-100">
        <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center border border-gray-200">
                <Wrench className="w-5 h-5 text-gray-400" />
            </div>
            <div>
                <h4 className="font-bold text-sm text-gray-800">{car}</h4>
                <p className="text-xs text-gray-500">{plate} • {service}</p>
            </div>
        </div>
        <div className="text-left">
            <StatusBadge status={status} />
            <p className="text-[10px] text-gray-400 mt-1">{time}</p>
        </div>
    </div>
);

export default CarsOverview;
