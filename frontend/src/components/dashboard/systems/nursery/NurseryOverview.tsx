/**
 * نظرة عامة على الحضانة
 * إحصائيات وإدارة الحضانة
 */

import React, { useState } from 'react';
import {
  Baby, Users, Calendar, DollarSign, Heart, AlertCircle,
  Plus, Settings2, TrendingUp, Clock, Activity, Smile
} from 'lucide-react';
import ActionButton from '../../../common/buttons/ActionButton';
import StatCard from '../../../common/cards/StatCard';
import DashboardCustomizer from '../../DashboardCustomizer';

interface NurseryOverviewProps {
  setActiveTab: (tab: string) => void;
}

const NurseryOverview: React.FC<NurseryOverviewProps> = ({ setActiveTab }) => {
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);

  const defaultStats = [
    { id: 'stat_children', title: "الأطفال الحاليين", value: "24", sub: "طفل", icon: Baby, color: "blue" as const },
    { id: 'stat_staff', title: "الموظفين", value: "8", sub: "معلمين وموظفين", icon: Users, color: "green" as const },
    { id: 'stat_revenue', title: "الإيرادات الشهرية", value: "45,000 ج", sub: "هذا الشهر", icon: DollarSign, color: "purple" as const },
    { id: 'stat_attendance', title: "معدل الحضور", value: "92%", sub: "هذا الأسبوع", icon: Activity, color: "orange" as const },
  ];

  const defaultActions = [
    { id: 'act_enroll', label: "تسجيل طفل", icon: Plus, color: "bg-blue-600 text-white", onClick: () => setActiveTab('children') },
    { id: 'act_schedule', label: "الجدول الزمني", icon: Calendar, color: "bg-white text-gray-700 border border-gray-200 hover:border-blue-600", onClick: () => setActiveTab('schedule') },
    { id: 'act_staff', label: "إدارة الموظفين", icon: Users, color: "bg-white text-gray-700 border border-gray-200 hover:border-blue-600", onClick: () => setActiveTab('staff') },
    { id: 'act_activities', label: "الأنشطة", icon: Activity, color: "bg-white text-gray-700 border border-gray-200 hover:border-blue-600", onClick: () => setActiveTab('activities') },
    { id: 'act_meals', label: "الوجبات", icon: Heart, color: "bg-white text-gray-700 border border-gray-200 hover:border-blue-600", onClick: () => setActiveTab('meals') },
    { id: 'act_reports', label: "التقارير", icon: TrendingUp, color: "bg-white text-gray-700 border border-gray-200 hover:border-blue-600", onClick: () => setActiveTab('reports') },
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

      {/* Today's Schedule */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Activities */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h3 className="font-bold text-lg text-gray-800 mb-4 flex items-center gap-2">
            <Activity className="w-5 h-5 text-blue-600" />
            أنشطة اليوم
          </h3>
          <div className="space-y-3">
            <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
              <p className="font-semibold text-sm text-gray-800">الرياضة الصباحية</p>
              <p className="text-xs text-gray-600">9:00 - 9:30 صباحاً</p>
            </div>
            <div className="p-3 bg-green-50 rounded-lg border border-green-200">
              <p className="font-semibold text-sm text-gray-800">وقت الوجبة</p>
              <p className="text-xs text-gray-600">12:00 - 1:00 ظهراً</p>
            </div>
            <div className="p-3 bg-purple-50 rounded-lg border border-purple-200">
              <p className="font-semibold text-sm text-gray-800">القراءة والحكايات</p>
              <p className="text-xs text-gray-600">2:00 - 2:45 مساءً</p>
            </div>
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h3 className="font-bold text-lg text-gray-800 mb-4 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-purple-600" />
            الأحداث القادمة
          </h3>
          <div className="space-y-3">
            <div className="p-3 bg-pink-50 rounded-lg border border-pink-200">
              <p className="font-semibold text-sm text-gray-800">حفلة عيد الميلاد</p>
              <p className="text-xs text-gray-600">غداً - 3:00 مساءً</p>
            </div>
            <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
              <p className="font-semibold text-sm text-gray-800">رحلة حديقة الحيوان</p>
              <p className="text-xs text-gray-600">الأحد - 10:00 صباحاً</p>
            </div>
            <div className="p-3 bg-indigo-50 rounded-lg border border-indigo-200">
              <p className="font-semibold text-sm text-gray-800">اجتماع أولياء الأمور</p>
              <p className="text-xs text-gray-600">الأربعاء - 4:00 مساءً</p>
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

export default NurseryOverview;
