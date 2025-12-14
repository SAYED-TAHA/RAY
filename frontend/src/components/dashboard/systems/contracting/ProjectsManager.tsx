
import React, { useState } from 'react';
import { 
  HardHat, MapPin, Calendar, DollarSign, MoreHorizontal, 
  CheckCircle, Clock, AlertTriangle, Users, ArrowRight, 
  LayoutGrid, List, Plus
} from 'lucide-react';

interface Project {
  id: string;
  name: string;
  client: string;
  location: string;
  budget: number;
  spent: number;
  startDate: string;
  deadline: string;
  status: 'active' | 'completed' | 'delayed' | 'planning';
  progress: number;
  team: number;
}

const initialProjects: Project[] = [
  { id: 'PRJ-101', name: 'تشطيب أبراج العاصمة', client: 'هيئة المجتمعات', location: 'العاصمة الإدارية', budget: 5000000, spent: 3200000, startDate: '2024-01-15', deadline: '2025-12-30', status: 'active', progress: 65, team: 45 },
  { id: 'PRJ-102', name: 'تأسيس فيلا د. خالد', client: 'د. خالد علي', location: 'الشيخ زايد', budget: 1200000, spent: 450000, startDate: '2025-02-01', deadline: '2025-08-15', status: 'active', progress: 40, team: 12 },
  { id: 'PRJ-103', name: 'صيانة مول الشروق', client: 'مجموعة الفطيم', location: 'مدينة الشروق', budget: 850000, spent: 120000, startDate: '2025-05-10', deadline: '2025-09-01', status: 'delayed', progress: 15, team: 8 },
  { id: 'PRJ-104', name: 'مجمع مدارس النيل', client: 'وزارة التعليم', location: 'أكتوبر', budget: 15000000, spent: 0, startDate: '2025-09-01', deadline: '2026-09-01', status: 'planning', progress: 0, team: 0 },
  { id: 'PRJ-105', name: 'ترميم قصر البارون', client: 'وزارة الآثار', location: 'مصر الجديدة', budget: 3000000, spent: 2950000, startDate: '2024-06-01', deadline: '2025-01-01', status: 'completed', progress: 100, team: 25 },
];

const ProjectsManager: React.FC = () => {
  const [projects, setProjects] = useState(initialProjects);
  const [filter, setFilter] = useState('all');
  const [viewMode, setViewMode] = useState<'list' | 'kanban'>('list');

  const filteredProjects = projects.filter(p => filter === 'all' || p.status === filter);

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'active': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'completed': return 'bg-green-100 text-green-700 border-green-200';
      case 'delayed': return 'bg-red-100 text-red-700 border-red-200';
      case 'planning': return 'bg-gray-100 text-gray-700 border-gray-200';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusLabel = (status: string) => {
    switch(status) {
      case 'active': return 'جاري العمل';
      case 'completed': return 'مكتمل';
      case 'delayed': return 'متأخر';
      case 'planning': return 'تخطيط';
      default: return status;
    }
  };

  const columns = [
    { id: 'planning', label: 'تخطيط', icon: Clock, color: 'text-gray-600 bg-gray-50' },
    { id: 'active', label: 'جاري التنفيذ', icon: HardHat, color: 'text-blue-600 bg-blue-50' },
    { id: 'delayed', label: 'متوقف / متأخر', icon: AlertTriangle, color: 'text-red-600 bg-red-50' },
    { id: 'completed', label: 'تم التسليم', icon: CheckCircle, color: 'text-green-600 bg-green-50' },
  ];

  return (
    <div className="flex flex-col h-full space-y-6 animate-in fade-in slide-in-from-bottom-2">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
            <HardHat className="w-6 h-6 text-orange-600" />
            إدارة المشاريع
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">متابعة سير العمل والميزانيات</p>
        </div>
        
        <div className="flex items-center gap-3">
           {/* View Toggle */}
           <div className="flex bg-gray-100 dark:bg-gray-700 p-1 rounded-xl">
              <button 
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition ${viewMode === 'list' ? 'bg-white dark:bg-gray-600 shadow-sm text-gray-800 dark:text-white' : 'text-gray-500 dark:text-gray-400'}`}
                title="قائمة"
              >
                 <List className="w-5 h-5" />
              </button>
              <button 
                onClick={() => setViewMode('kanban')}
                className={`p-2 rounded-lg transition ${viewMode === 'kanban' ? 'bg-white dark:bg-gray-600 shadow-sm text-gray-800 dark:text-white' : 'text-gray-500 dark:text-gray-400'}`}
                title="كانبان"
              >
                 <LayoutGrid className="w-5 h-5" />
              </button>
           </div>

           <button className="bg-orange-600 text-white px-4 py-2 rounded-xl font-bold shadow-md flex items-center gap-2 hover:bg-orange-700 transition">
              <Plus className="w-4 h-4" />
              مشروع جديد
           </button>
        </div>
      </div>

      {/* Filters (List View Only) */}
      {viewMode === 'list' && (
         <div className="flex gap-2 overflow-x-auto pb-1">
            {['all', 'active', 'planning', 'delayed', 'completed'].map(f => (
               <button 
               key={f}
               onClick={() => setFilter(f)}
               className={`px-6 py-2 rounded-xl text-sm font-bold transition whitespace-nowrap border
                  ${filter === f 
                     ? 'bg-orange-600 text-white border-orange-600 shadow-md' 
                     : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:bg-gray-50'}
               `}
               >
               {f === 'all' ? 'الكل' : getStatusLabel(f)}
               </button>
            ))}
         </div>
      )}

      {/* Content */}
      {viewMode === 'list' ? (
         <div className="grid grid-cols-1 gap-4">
            {filteredProjects.map(project => (
               <ProjectCard key={project.id} project={project} getStatusColor={getStatusColor} getStatusLabel={getStatusLabel} />
            ))}
         </div>
      ) : (
         <div className="flex-1 overflow-x-auto pb-4">
            <div className="flex gap-4 min-w-[1200px] h-full">
               {columns.map(col => (
                  <div key={col.id} className="flex-1 flex flex-col bg-gray-50 dark:bg-gray-900/30 rounded-2xl border border-gray-200 dark:border-gray-700 h-full max-h-[calc(100vh-250px)]">
                     <div className={`p-4 border-b border-gray-200 dark:border-gray-700 rounded-t-2xl flex items-center gap-2 ${col.color}`}>
                        <col.icon className="w-5 h-5" />
                        <h3 className="font-bold">{col.label}</h3>
                        <span className="mr-auto bg-white/50 px-2 py-0.5 rounded text-xs font-bold">
                           {projects.filter(p => p.status === col.id).length}
                        </span>
                     </div>
                     <div className="p-3 space-y-3 overflow-y-auto">
                        {projects.filter(p => p.status === col.id).map(project => (
                           <div key={project.id} className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 cursor-pointer hover:shadow-md transition group">
                              <h4 className="font-bold text-gray-900 dark:text-white mb-1">{project.name}</h4>
                              <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1 mb-3">
                                 <MapPin className="w-3 h-3" /> {project.location}
                              </p>
                              
                              <div className="space-y-2">
                                 <div className="flex justify-between text-xs">
                                    <span className="text-gray-500">الإنجاز</span>
                                    <span className="font-bold text-gray-700 dark:text-gray-300">{project.progress}%</span>
                                 </div>
                                 <div className="w-full bg-gray-100 dark:bg-gray-700 h-1.5 rounded-full overflow-hidden">
                                    <div 
                                       className={`h-full rounded-full ${project.status === 'delayed' ? 'bg-red-500' : 'bg-green-500'}`} 
                                       style={{width: `${project.progress}%`}}
                                    ></div>
                                 </div>
                              </div>
                              
                              <div className="flex justify-between items-center mt-3 pt-3 border-t border-gray-50 dark:border-gray-700">
                                 <span className="text-xs font-bold text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                                    {project.deadline}
                                 </span>
                                 <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-orange-600 transition rtl:rotate-180" />
                              </div>
                           </div>
                        ))}
                     </div>
                  </div>
               ))}
            </div>
         </div>
      )}
    </div>
  );
};

const ProjectCard = ({ project, getStatusColor, getStatusLabel }: any) => (
   <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-6 shadow-sm hover:shadow-md transition group">
      <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-4">
         <div>
            <div className="flex items-center gap-3 mb-1">
               <h3 className="text-lg font-bold text-gray-900 dark:text-white">{project.name}</h3>
               <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(project.status)}`}>
                  {getStatusLabel(project.status)}
               </span>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-2">
               <MapPin className="w-4 h-4" /> {project.location} • العميل: {project.client}
            </p>
         </div>
         
         <div className="flex gap-2">
            <button className="p-2 bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition">
               <MoreHorizontal className="w-5 h-5" />
            </button>
            <button className="px-4 py-2 bg-orange-50 dark:bg-orange-900/20 text-orange-700 dark:text-orange-400 rounded-lg font-bold text-sm hover:bg-orange-100 dark:hover:bg-orange-900/40 transition flex items-center gap-2">
               التفاصيل <ArrowRight className="w-4 h-4 rtl:rotate-180" />
            </button>
         </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-4 border-t border-b border-gray-50 dark:border-gray-700">
         <div>
            <p className="text-xs text-gray-500 dark:text-gray-400 font-bold mb-1">الميزانية</p>
            <p className="text-lg font-black text-gray-800 dark:text-white flex items-center gap-1">
               {project.budget.toLocaleString()} <span className="text-xs font-normal text-gray-400">ج.م</span>
            </p>
         </div>
         <div>
            <p className="text-xs text-gray-500 dark:text-gray-400 font-bold mb-1">المصروفات</p>
            <p className={`text-lg font-black flex items-center gap-1 ${project.spent > project.budget ? 'text-red-500' : 'text-green-600'}`}>
               {project.spent.toLocaleString()} <span className="text-xs font-normal text-gray-400">ج.م</span>
            </p>
         </div>
         <div>
            <p className="text-xs text-gray-500 dark:text-gray-400 font-bold mb-1">فريق العمل</p>
            <div className="flex items-center gap-2">
               <Users className="w-4 h-4 text-blue-500" />
               <span className="font-bold text-gray-800 dark:text-white">{project.team} فرد</span>
            </div>
         </div>
         <div>
            <p className="text-xs text-gray-500 dark:text-gray-400 font-bold mb-1">تاريخ التسليم</p>
            <div className="flex items-center gap-2">
               <Calendar className="w-4 h-4 text-orange-500" />
               <span className="font-bold text-gray-800 dark:text-white">{project.deadline}</span>
            </div>
         </div>
      </div>

      <div className="mt-4">
         <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-bold text-gray-600 dark:text-gray-300">نسبة الإنجاز</span>
            <span className="text-xs font-bold text-orange-600 dark:text-orange-400">{project.progress}%</span>
         </div>
         <div className="w-full bg-gray-100 dark:bg-gray-700 h-2.5 rounded-full overflow-hidden">
            <div 
              className={`h-full rounded-full ${
                 project.status === 'delayed' ? 'bg-red-500' : 
                 project.progress === 100 ? 'bg-green-500' : 'bg-orange-500'
              }`} 
              style={{width: `${project.progress}%`}}
            ></div>
         </div>
      </div>
   </div>
);

export default ProjectsManager;
