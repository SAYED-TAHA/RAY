/**
 * مكون مبدل الأنشطة
 * يسمح للمستخدم بالتبديل بين الأنشطة المختلفة
 */

import React, { useState } from 'react';
import {
  ChevronDown, Plus, Settings, Trash2,
  Store, Stethoscope, Dumbbell, Scissors, Pill, ShoppingCart, Calendar
} from 'lucide-react';
import { useNavigation } from '../../context/NavigationContext';
import { UserActivity } from '../../services/registrationService';

const ACTIVITY_ICONS: Record<string, React.ReactNode> = {
  restaurant: <Store className="w-5 h-5" />,
  retail: <ShoppingCart className="w-5 h-5" />,
  clinic: <Stethoscope className="w-5 h-5" />,
  gym: <Dumbbell className="w-5 h-5" />,
  salon: <Scissors className="w-5 h-5" />,
  pharmacy: <Pill className="w-5 h-5" />,
  bookings: <Calendar className="w-5 h-5" />
};

const ACTIVITY_COLORS: Record<string, string> = {
  restaurant: 'text-orange-600 bg-orange-50',
  retail: 'text-blue-600 bg-blue-50',
  clinic: 'text-teal-600 bg-teal-50',
  gym: 'text-yellow-600 bg-yellow-50',
  salon: 'text-pink-600 bg-pink-50',
  pharmacy: 'text-green-600 bg-green-50',
  bookings: 'text-purple-600 bg-purple-50'
};

export const ActivitySwitcher: React.FC = () => {
  const { currentActivity, activities, navigateToActivity } = useNavigation();
  const [isOpen, setIsOpen] = useState(false);

  if (!currentActivity) {
    return null;
  }

  return (
    <div className="relative">
      {/* Current Activity Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-3 px-4 py-2 rounded-lg border border-gray-200 hover:border-gray-300 transition ${ACTIVITY_COLORS[currentActivity.activityType]}`}
      >
        <div className="flex items-center gap-2">
          {ACTIVITY_ICONS[currentActivity.activityType]}
          <div className="text-left">
            <div className="text-sm font-semibold">{currentActivity.name}</div>
            <div className="text-xs opacity-75">{currentActivity.activityType}</div>
          </div>
        </div>
        <ChevronDown className={`w-4 h-4 transition ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-80 bg-white rounded-xl border border-gray-200 shadow-lg z-50">
          {/* Activities List */}
          <div className="max-h-96 overflow-y-auto">
            {activities.map(activity => (
              <div
                key={activity.id}
                className="flex items-center justify-between p-3 hover:bg-gray-50 border-b border-gray-100 last:border-b-0 cursor-pointer transition"
                onClick={() => {
                  navigateToActivity(activity);
                  setIsOpen(false);
                }}
              >
                <div className="flex items-center gap-3 flex-1">
                  <div className={`p-2 rounded-lg ${ACTIVITY_COLORS[activity.activityType]}`}>
                    {ACTIVITY_ICONS[activity.activityType]}
                  </div>
                  <div className="text-left">
                    <div className="font-semibold text-gray-800">{activity.name}</div>
                    <div className="text-xs text-gray-500">{activity.description}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {activity.status === 'active' && (
                    <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full font-semibold">
                      نشط
                    </span>
                  )}
                  {activity.status === 'pending' && (
                    <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs rounded-full font-semibold">
                      قيد الانتظار
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Divider */}
          <div className="border-t border-gray-200" />

          {/* Actions */}
          <div className="p-2 space-y-1">
            <button className="w-full flex items-center gap-2 px-3 py-2 text-left text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition">
              <Plus className="w-4 h-4" />
              إضافة نشاط جديد
            </button>
            <button className="w-full flex items-center gap-2 px-3 py-2 text-left text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition">
              <Settings className="w-4 h-4" />
              إعدادات الأنشطة
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ActivitySwitcher;
