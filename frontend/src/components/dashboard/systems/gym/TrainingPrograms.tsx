/**
 * برامج التدريب
 * إدارة برامج التدريب والتمارين
 */

import React, { useState } from 'react';
import {
  Dumbbell, Search, Plus, Edit, Trash2, Users, Clock,
  Target, Star, AlertCircle, CheckCircle, Eye
} from 'lucide-react';

interface TrainingProgram {
  id: string;
  name: string;
  description: string;
  duration: number;
  level: 'beginner' | 'intermediate' | 'advanced';
  members: number;
  rating: number;
  status: 'active' | 'inactive';
  instructor: string;
  price: number;
}

const initialPrograms: TrainingProgram[] = [
  {
    id: 'prog-001',
    name: 'برنامج بناء العضلات',
    description: 'برنامج شامل لبناء العضلات والقوة',
    duration: 12,
    level: 'intermediate',
    members: 45,
    rating: 4.9,
    status: 'active',
    instructor: 'أحمد محمد',
    price: 500
  },
  {
    id: 'prog-002',
    name: 'برنامج فقدان الوزن',
    description: 'برنامج متخصص لفقدان الوزن والتنحيف',
    duration: 8,
    level: 'beginner',
    members: 62,
    rating: 4.8,
    status: 'active',
    instructor: 'فاطمة علي',
    price: 400
  },
  {
    id: 'prog-003',
    name: 'برنامج اللياقة البدنية',
    description: 'برنامج شامل لتحسين اللياقة البدنية',
    duration: 6,
    level: 'beginner',
    members: 38,
    rating: 4.7,
    status: 'active',
    instructor: 'محمود حسن',
    price: 300
  }
];

const TrainingPrograms: React.FC = () => {
  const [programs, setPrograms] = useState<TrainingProgram[]>(initialPrograms);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterLevel, setFilterLevel] = useState<'all' | 'beginner' | 'intermediate' | 'advanced'>('all');

  const filteredPrograms = programs.filter(prog => {
    const matchesSearch = prog.name.includes(searchTerm) || prog.instructor.includes(searchTerm);
    const matchesLevel = filterLevel === 'all' || prog.level === filterLevel;
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

  const stats = {
    total: programs.length,
    active: programs.filter(p => p.status === 'active').length,
    totalMembers: programs.reduce((sum, p) => sum + p.members, 0),
    avgRating: (programs.reduce((sum, p) => sum + p.rating, 0) / programs.length).toFixed(1)
  };

  return (
    <div className="h-full flex flex-col space-y-6 animate-in fade-in slide-in-from-bottom-2">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <Target className="w-6 h-6 text-purple-600" />
            برامج التدريب
          </h2>
          <p className="text-sm text-gray-500">إدارة برامج التدريب والتمارين</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition">
          <Plus className="w-5 h-5" />
          برنامج جديد
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-gray-200">
          <p className="text-sm text-gray-600 mb-1">إجمالي البرامج</p>
          <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
        </div>
        <div className="bg-green-50 p-4 rounded-xl border border-green-200">
          <p className="text-sm text-green-700 mb-1">برامج نشطة</p>
          <p className="text-2xl font-bold text-green-900">{stats.active}</p>
        </div>
        <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
          <p className="text-sm text-blue-700 mb-1">إجمالي الأعضاء</p>
          <p className="text-2xl font-bold text-blue-900">{stats.totalMembers}</p>
        </div>
        <div className="bg-purple-50 p-4 rounded-xl border border-purple-200">
          <p className="text-sm text-purple-700 mb-1">متوسط التقييم</p>
          <p className="text-2xl font-bold text-purple-900">{stats.avgRating}</p>
        </div>
      </div>

      {/* Controls */}
      <div className="flex gap-4 flex-wrap">
        <div className="flex-1 min-w-64 relative">
          <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="ابحث عن برنامج..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500"
          />
        </div>
        <select
          value={filterLevel}
          onChange={(e) => setFilterLevel(e.target.value as any)}
          className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500"
        >
          <option value="all">جميع المستويات</option>
          <option value="beginner">مبتدئ</option>
          <option value="intermediate">متوسط</option>
          <option value="advanced">متقدم</option>
        </select>
      </div>

      {/* Programs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredPrograms.map(prog => (
          <div key={prog.id} className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-lg transition">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-bold text-gray-800">{prog.name}</h3>
                <p className="text-xs text-gray-500">{prog.instructor}</p>
              </div>
              <span className="text-xs font-semibold px-2 py-1 rounded-full bg-green-100 text-green-800">
                {prog.status === 'active' ? 'نشط' : 'غير نشط'}
              </span>
            </div>

            <p className="text-xs text-gray-600 mb-3 line-clamp-2">{prog.description}</p>

            <div className="space-y-2 text-sm mb-3">
              <div className="flex items-center gap-2 text-gray-600">
                <Clock className="w-4 h-4" />
                {prog.duration} أسبوع
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Users className="w-4 h-4" />
                {prog.members} عضو
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Star className="w-4 h-4 text-yellow-500" />
                {prog.rating}
              </div>
            </div>

            <div className="flex gap-2">
              <button className="flex-1 px-3 py-2 bg-purple-50 text-purple-600 rounded text-sm font-semibold hover:bg-purple-100">
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

export default TrainingPrograms;
