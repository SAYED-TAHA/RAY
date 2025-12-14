/**
 * مدير الفصول والدروس
 * إدارة فصول التدريب والدروس
 */

import React, { useState } from 'react';
import {
  Dumbbell, Search, Plus, Edit, Trash2, Users, Clock,
  Calendar, MapPin, Star, AlertCircle, CheckCircle
} from 'lucide-react';

interface GymClass {
  id: string;
  name: string;
  instructor: string;
  schedule: string;
  time: string;
  duration: number;
  capacity: number;
  enrolled: number;
  level: 'beginner' | 'intermediate' | 'advanced';
  rating: number;
  status: 'active' | 'inactive' | 'full';
}

const initialClasses: GymClass[] = [
  {
    id: 'cls-001',
    name: 'اليوجا الصباحية',
    instructor: 'أحمد محمد',
    schedule: 'يومياً',
    time: '06:00 - 07:00',
    duration: 60,
    capacity: 20,
    enrolled: 18,
    level: 'beginner',
    rating: 4.8,
    status: 'active'
  },
  {
    id: 'cls-002',
    name: 'تدريب القوة',
    instructor: 'فاطمة علي',
    schedule: 'السبت والأربعاء',
    time: '18:00 - 19:30',
    duration: 90,
    capacity: 15,
    enrolled: 15,
    level: 'intermediate',
    rating: 4.9,
    status: 'full'
  },
  {
    id: 'cls-003',
    name: 'الرقص الحديث',
    instructor: 'محمود حسن',
    schedule: 'الثلاثاء والخميس',
    time: '19:00 - 20:00',
    duration: 60,
    capacity: 25,
    enrolled: 20,
    level: 'beginner',
    rating: 4.7,
    status: 'active'
  }
];

const ClassesManager: React.FC = () => {
  const [classes, setClasses] = useState<GymClass[]>(initialClasses);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterLevel, setFilterLevel] = useState<'all' | 'beginner' | 'intermediate' | 'advanced'>('all');

  const filteredClasses = classes.filter(cls => {
    const matchesSearch = cls.name.includes(searchTerm) || cls.instructor.includes(searchTerm);
    const matchesLevel = filterLevel === 'all' || cls.level === filterLevel;
    return matchesSearch && matchesLevel;
  });

  const getLevelLabel = (level: string) => {
    switch (level) {
      case 'beginner': return 'مبتدئ';
      case 'intermediate': return 'متوسط';
      case 'advanced': return 'متقدم';
      default: return level;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'full': return 'bg-red-100 text-red-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="h-full flex flex-col space-y-6 animate-in fade-in slide-in-from-bottom-2">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <Dumbbell className="w-6 h-6 text-blue-600" />
            إدارة الفصول
          </h2>
          <p className="text-sm text-gray-500">إدارة فصول التدريب والدروس</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
          <Plus className="w-5 h-5" />
          فصل جديد
        </button>
      </div>

      {/* Controls */}
      <div className="flex gap-4 flex-wrap">
        <div className="flex-1 min-w-64 relative">
          <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="ابحث عن فصل..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <select
          value={filterLevel}
          onChange={(e) => setFilterLevel(e.target.value as any)}
          className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">جميع المستويات</option>
          <option value="beginner">مبتدئ</option>
          <option value="intermediate">متوسط</option>
          <option value="advanced">متقدم</option>
        </select>
      </div>

      {/* Classes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredClasses.map(cls => (
          <div key={cls.id} className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-lg transition">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-bold text-gray-800">{cls.name}</h3>
                <p className="text-xs text-gray-500">{cls.instructor}</p>
              </div>
              <span className={`text-xs font-semibold px-2 py-1 rounded-full ${getStatusColor(cls.status)}`}>
                {cls.status === 'active' ? 'نشط' : cls.status === 'full' ? 'ممتلئ' : 'غير نشط'}
              </span>
            </div>

            <div className="space-y-2 text-sm mb-3">
              <div className="flex items-center gap-2 text-gray-600">
                <Clock className="w-4 h-4" />
                {cls.time}
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Users className="w-4 h-4" />
                {cls.enrolled}/{cls.capacity}
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Star className="w-4 h-4 text-yellow-500" />
                {cls.rating}
              </div>
            </div>

            <div className="flex gap-2">
              <button className="flex-1 px-3 py-2 bg-blue-50 text-blue-600 rounded text-sm font-semibold hover:bg-blue-100">
                <Edit className="w-4 h-4 inline mr-1" />
                تعديل
              </button>
              <button className="flex-1 px-3 py-2 bg-red-50 text-red-600 rounded text-sm font-semibold hover:bg-red-100">
                <Trash2 className="w-4 h-4 inline mr-1" />
                حذف
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClassesManager;
