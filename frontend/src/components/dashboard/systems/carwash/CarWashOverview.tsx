
import React, { useState, useEffect } from 'react';
import { 
  Truck, MapPin, Droplets, Battery, Calendar, Users, 
  Settings2, AlertTriangle, CheckCircle, Navigation, Fuel, Gauge, Plus, Layers
} from 'lucide-react';
import ActionButton from '../../../common/buttons/ActionButton';
import StatCard from '../../../common/cards/StatCard';
import DashboardCustomizer from '../../DashboardCustomizer';

interface CarWashOverviewProps {
  setActiveTab: (tab: string) => void;
}

const CarWashOverview: React.FC<CarWashOverviewProps> = ({ setActiveTab }) => {
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);

  // Fleet Data
  const fleet = [
    { id: 'V01', driver: 'كابتن أحمد', status: 'active', location: 'التجمع الخامس', fuel: 75, water: 60, battery: 90, jobs: 4 },
    { id: 'V02', driver: 'كابتن سامح', status: 'busy', location: 'المعادي', fuel: 40, water: 20, battery: 85, jobs: 2 },
    { id: 'V03', driver: 'كابتن هيثم', status: 'maintenance', location: 'الورشة', fuel: 10, water: 0, battery: 0, jobs: 0 },
  ];

  const defaultStats = [
    { id: 'stat_fleet', title: "الأسطول النشط", value: "5/6", sub: "سيارات", icon: Truck, color: "blue" as const },
    { id: 'stat_water', title: "مخزون المياه", value: "450L", sub: "الإجمالي", icon: Droplets, color: "cyan" as const },
    { id: 'stat_jobs', title: "طلبات اليوم", value: "24", sub: "8 جاري التنفيذ", icon: Calendar, color: "green" as const },
    { id: 'stat_rev', title: "الإيرادات", value: "6,200", sub: "جنيه", icon: Gauge, color: "yellow" as const },
  ];

  const defaultActions = [
    { id: 'act_book', label: "حجز جديد", icon: Plus, color: "bg-cyan-600 text-white", onClick: () => setActiveTab('schedule') },
    { id: 'act_dispatch', label: "توجيه وحدة", icon: Navigation, color: "bg-white text-gray-700 border border-gray-200 hover:border-cyan-500", onClick: () => setActiveTab('fleet') },
    { id: 'act_stock', label: "جرد المواد", icon: Layers, color: "bg-white text-gray-700 border border-gray-200 hover:border-cyan-500", onClick: () => setActiveTab('inventory') },
    { id: 'act_client', label: "عميل جديد", icon: Users, color: "bg-white text-gray-700 border border-gray-200 hover:border-cyan-500", onClick: () => setActiveTab('customers') },
  ];

  const [visibleIds, setVisibleIds] = useState<string[]>([
    ...defaultStats.map(s => s.id),
    ...defaultActions.map(a => a.id)
  ]);

  // Load saved config
  useEffect(() => {
    const savedConfig = localStorage.getItem('ray_dashboard_config_carwash');
    if (savedConfig) {
      try {
        setVisibleIds(JSON.parse(savedConfig));
      } catch (e) {
        console.error('Error parsing dashboard config', e);
      }
    }
  }, []);

  const handleToggle = (id: string) => {
    setVisibleIds(prev => {
      const newState = prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id];
      localStorage.setItem('ray_dashboard_config_carwash', JSON.stringify(newState));
      return newState;
    });
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
          className="flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-cyan-600 bg-white px-3 py-1.5 rounded-full shadow-sm border border-gray-100 hover:border-cyan-500 transition"
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
         {/* Fleet Status */}
         <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-lg text-gray-800 flex items-center gap-2">
                    <Truck className="w-5 h-5 text-cyan-600" />
                    حالة الوحدات المتنقلة (Vans)
                </h3>
                <button 
                  onClick={() => setActiveTab('fleet')}
                  className="text-sm text-cyan-600 font-bold hover:bg-cyan-50 px-3 py-1 rounded transition"
                >
                  عرض الخريطة
                </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {fleet.map(van => (
                   <div key={van.id} className="p-4 border border-gray-100 rounded-xl hover:shadow-md transition group">
                      <div className="flex justify-between items-start mb-3">
                         <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white ${van.status === 'active' ? 'bg-green-500' : van.status === 'busy' ? 'bg-orange-500' : 'bg-red-500'}`}>
                               {van.id}
                            </div>
                            <div>
                               <h4 className="font-bold text-sm text-gray-900">{van.driver}</h4>
                               <p className="text-xs text-gray-500 flex items-center gap-1">
                                  <MapPin className="w-3 h-3" /> {van.location}
                               </p>
                            </div>
                         </div>
                         <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${van.status === 'active' ? 'bg-green-100 text-green-700' : van.status === 'busy' ? 'bg-orange-100 text-orange-700' : 'bg-red-100 text-red-700'}`}>
                            {van.status === 'active' ? 'متاح' : van.status === 'busy' ? 'في مهمة' : 'صيانة'}
                         </span>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-2 text-center text-xs">
                         <div className="bg-gray-50 p-2 rounded-lg">
                            <Fuel className="w-3 h-3 mx-auto text-gray-400 mb-1" />
                            <span className="font-bold">{van.fuel}%</span>
                         </div>
                         <div className="bg-gray-50 p-2 rounded-lg">
                            <Droplets className={`w-3 h-3 mx-auto mb-1 ${van.water < 30 ? 'text-red-500 animate-pulse' : 'text-blue-400'}`} />
                            <span className="font-bold">{van.water}%</span>
                         </div>
                         <div className="bg-gray-50 p-2 rounded-lg">
                            <CheckCircle className="w-3 h-3 mx-auto text-green-500 mb-1" />
                            <span className="font-bold">{van.jobs} مهام</span>
                         </div>
                      </div>
                   </div>
                ))}
            </div>
         </div>

         {/* Active Jobs */}
         <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h3 className="font-bold text-lg text-gray-800 mb-4">الطلبات الحالية</h3>
            <div className="space-y-4">
               <div className="flex gap-3 items-start pb-4 border-b border-gray-50">
                  <div className="w-2 h-2 mt-2 rounded-full bg-orange-500 animate-pulse"></div>
                  <div>
                     <h4 className="font-bold text-sm">غسيل كيماوي كامل</h4>
                     <p className="text-xs text-gray-500">أحمد محمد • Kia Sportage</p>
                     <p className="text-[10px] text-gray-400 mt-1">التجمع الخامس (جاري التنفيذ)</p>
                  </div>
               </div>
               <div className="flex gap-3 items-start pb-4 border-b border-gray-50">
                  <div className="w-2 h-2 mt-2 rounded-full bg-green-500"></div>
                  <div>
                     <h4 className="font-bold text-sm">غسيل وتشميع</h4>
                     <p className="text-xs text-gray-500">سارة علي • Toyota Corolla</p>
                     <p className="text-[10px] text-gray-400 mt-1">المعادي (في الطريق)</p>
                  </div>
               </div>
               <button className="w-full py-2 text-sm text-cyan-600 font-bold bg-cyan-50 rounded-lg hover:bg-cyan-100 transition">
                  عرض كل الطلبات
               </button>
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

export default CarWashOverview;
