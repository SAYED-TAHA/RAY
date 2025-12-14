
import React, { useState } from 'react';
import { 
  HardHat, Activity, DollarSign, Package, Plus, Truck, 
  Warehouse, FileText, Users, Settings2, AlertTriangle, 
  CheckCircle, Clock
} from 'lucide-react';
import ActionButton from '../../../common/buttons/ActionButton';
import StatCard from '../../../common/cards/StatCard';
import DashboardCustomizer from '../../DashboardCustomizer';

interface ContractingOverviewProps {
  setActiveTab: (tab: string) => void;
}

const ContractingOverview: React.FC<ContractingOverviewProps> = ({ setActiveTab }) => {
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);

  const defaultStats = [
    { id: 'stat_projects', title: "مشاريع نشطة", value: "5", sub: "2 تسليم قريب", icon: HardHat, color: "orange" as const },
    { id: 'stat_progress', title: "نسبة الإنجاز", value: "68%", sub: "متوسط عام", icon: Activity, color: "blue" as const },
    { id: 'stat_billing', title: "مستخلصات", value: "2.4M", sub: "تحت التحصيل", icon: DollarSign, color: "green" as const },
    { id: 'stat_stock', title: "مواد بالموقع", value: "450k", sub: "مواسير وأسمنت", icon: Package, color: "purple" as const },
  ];

  const defaultActions = [
    { id: 'act_project', label: "مشروع جديد", icon: Plus, color: "bg-orange-600 text-white", onClick: () => setActiveTab('projects') },
    { id: 'act_supply', label: "طلب توريد", icon: Truck, color: "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-700 hover:border-orange-500", onClick: () => setActiveTab('suppliers') },
    { id: 'act_stock', label: "صرف خامات", icon: Warehouse, color: "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-700 hover:border-orange-500", onClick: () => setActiveTab('warehouse') },
    { id: 'act_invoice', label: "إضافة مستخلص", icon: FileText, color: "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-700 hover:border-orange-500", onClick: () => setActiveTab('finance') },
    { id: 'act_labor', label: "تسجيل عمالة", icon: Users, color: "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-700 hover:border-orange-500", onClick: () => setActiveTab('labor') },
    { id: 'act_tender', label: "مناقصة جديدة", icon: FileText, color: "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-700 hover:border-orange-500", onClick: () => setActiveTab('tenders') },
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
      
      <div className="flex justify-end mb-2">
        <button 
          onClick={() => setIsCustomizerOpen(true)}
          className="flex items-center gap-2 text-xs font-bold text-gray-500 dark:text-gray-400 hover:text-orange-600 bg-white dark:bg-gray-800 px-4 py-2 rounded-full shadow-sm border border-gray-200 dark:border-gray-700 hover:border-orange-500 transition-all active:scale-95"
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
         {/* Project Updates */}
         <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 hover:shadow-md transition-all">
            <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-lg text-gray-800 dark:text-white">آخر تحديثات المشاريع</h3>
                <button 
                  onClick={() => setActiveTab('projects')}
                  className="text-sm text-orange-600 font-bold hover:underline hover:text-orange-700 transition-colors"
                >
                  عرض الجدول
                </button>
            </div>
            <div className="space-y-4">
               <ProjectStatusRow name="أبراج العاصمة" stage="التشطيبات" progress={75} status="active" />
               <ProjectStatusRow name="فيلا د. خالد" stage="تأسيس السباكة" progress={40} status="active" />
               <ProjectStatusRow name="مول الشروق" stage="الخرسانات" progress={15} status="delayed" />
            </div>
         </div>

         {/* Material Alerts */}
         <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 hover:shadow-md transition-all">
            <h3 className="font-bold text-lg text-gray-800 dark:text-white mb-4 flex items-center gap-2">
               <AlertTriangle className="w-5 h-5 text-red-500" />
               نواقص المخزن والمواقع
            </h3>
            <div className="space-y-4">
               <div className="flex gap-3 items-center p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700/50 transition">
                  <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center text-gray-400 dark:text-gray-300">
                    <Package className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                     <h4 className="font-bold text-sm text-gray-800 dark:text-white">مواسير 4 بوصة</h4>
                     <p className="text-xs text-red-500 font-bold">موقع 1: نفذت الكمية</p>
                  </div>
                  <button 
                    onClick={() => setActiveTab('suppliers')}
                    className="text-xs bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 px-3 py-1.5 rounded-lg font-bold hover:bg-orange-100 dark:hover:bg-orange-900/40 transition"
                  >
                    طلب توريد
                  </button>
               </div>
               <div className="flex gap-3 items-center p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700/50 transition">
                  <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center text-gray-400 dark:text-gray-300">
                    <Package className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                     <h4 className="font-bold text-sm text-gray-800 dark:text-white">أسمنت مقاوم</h4>
                     <p className="text-xs text-yellow-600 dark:text-yellow-500 font-bold">المخزن الرئيسي: منخفض</p>
                  </div>
                  <button 
                    onClick={() => setActiveTab('warehouse')}
                    className="text-xs bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 px-3 py-1.5 rounded-lg font-bold hover:bg-orange-100 dark:hover:bg-orange-900/40 transition"
                  >
                    نقل
                  </button>
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

const ProjectStatusRow = ({ name, stage, progress, status }: any) => (
    <div className="flex items-center gap-4 p-3 bg-gray-50 dark:bg-gray-700/30 rounded-xl border border-gray-100 dark:border-gray-700 hover:border-orange-200 dark:hover:border-orange-800 transition">
       <div className={`w-2 h-12 rounded-full ${status === 'delayed' ? 'bg-red-500' : 'bg-green-500'}`}></div>
       <div className="flex-1">
          <div className="flex justify-between mb-1">
             <h4 className="font-bold text-sm text-gray-900 dark:text-white">{name}</h4>
             <span className={`text-xs font-bold ${status === 'delayed' ? 'text-red-500' : 'text-green-600'}`}>
                {status === 'delayed' ? 'متأخر' : 'جاري العمل'}
             </span>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">{stage}</p>
          <div className="w-full bg-gray-200 dark:bg-gray-600 h-1.5 rounded-full overflow-hidden">
             <div className={`h-full rounded-full ${status === 'delayed' ? 'bg-red-500' : 'bg-green-500'}`} style={{width: `${progress}%`}}></div>
          </div>
       </div>
       <span className="font-bold text-sm text-gray-700 dark:text-gray-300">{progress}%</span>
    </div>
);

export default ContractingOverview;
