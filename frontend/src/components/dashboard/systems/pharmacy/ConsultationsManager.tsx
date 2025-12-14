/**
 * مدير الاستشارات الصيدلانية
 * إدارة استشارات الصيادلة
 */

import React, { useState } from 'react';
import {
  MessageSquare, Search, Plus, Edit, Trash2, User, Phone,
  Calendar, Clock, CheckCircle, AlertCircle, Eye
} from 'lucide-react';

interface Consultation {
  id: string;
  customerName: string;
  customerPhone: string;
  pharmacistName: string;
  date: string;
  time: string;
  topic: string;
  status: 'completed' | 'pending' | 'scheduled';
  notes: string;
  duration: number;
}

const initialConsultations: Consultation[] = [
  {
    id: 'cons-001',
    customerName: 'أحمد محمد',
    customerPhone: '+201001234567',
    pharmacistName: 'أ. فاطمة',
    date: '2024-12-06',
    time: '10:00',
    topic: 'استشارة عن الأدوية',
    status: 'completed',
    notes: 'استشارة عن التفاعلات الدوائية',
    duration: 15
  },
  {
    id: 'cons-002',
    customerName: 'فاطمة علي',
    customerPhone: '+201101234567',
    pharmacistName: 'أ. محمود',
    date: '2024-12-06',
    time: '14:00',
    topic: 'استشارة صحية',
    status: 'pending',
    notes: 'استشارة عن الأعراض الجانبية',
    duration: 20
  }
];

const ConsultationsManager: React.FC = () => {
  const [consultations, setConsultations] = useState<Consultation[]>(initialConsultations);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'completed' | 'pending' | 'scheduled'>('all');

  const filteredConsultations = consultations.filter(cons => {
    const matchesSearch = cons.customerName.includes(searchTerm) || cons.topic.includes(searchTerm);
    const matchesStatus = filterStatus === 'all' || cons.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'completed': return 'مكتملة';
      case 'pending': return 'معلقة';
      case 'scheduled': return 'مجدولة';
      default: return status;
    }
  };

  return (
    <div className="h-full flex flex-col space-y-6 animate-in fade-in slide-in-from-bottom-2">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <MessageSquare className="w-6 h-6 text-green-600" />
            إدارة الاستشارات
          </h2>
          <p className="text-sm text-gray-500">إدارة استشارات الصيادلة</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
          <Plus className="w-5 h-5" />
          استشارة جديدة
        </button>
      </div>

      {/* Controls */}
      <div className="flex gap-4 flex-wrap">
        <div className="flex-1 min-w-64 relative">
          <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="ابحث عن استشارة..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500"
          />
        </div>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value as any)}
          className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500"
        >
          <option value="all">جميع الحالات</option>
          <option value="completed">مكتملة</option>
          <option value="pending">معلقة</option>
          <option value="scheduled">مجدولة</option>
        </select>
      </div>

      {/* Consultations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredConsultations.map(cons => (
          <div key={cons.id} className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-lg transition">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-bold text-gray-800">{cons.customerName}</h3>
                <p className="text-xs text-gray-500">{cons.topic}</p>
              </div>
              <span className={`text-xs font-semibold px-2 py-1 rounded-full ${getStatusColor(cons.status)}`}>
                {getStatusLabel(cons.status)}
              </span>
            </div>

            <div className="space-y-2 text-sm mb-3">
              <div className="flex items-center gap-2 text-gray-600">
                <User className="w-4 h-4" />
                {cons.pharmacistName}
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Calendar className="w-4 h-4" />
                {cons.date}
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Clock className="w-4 h-4" />
                {cons.time}
              </div>
            </div>

            <p className="text-xs text-gray-600 mb-3 line-clamp-2">{cons.notes}</p>

            <div className="flex gap-2">
              <button className="flex-1 px-3 py-2 bg-green-50 text-green-600 rounded text-sm font-semibold hover:bg-green-100">
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

export default ConsultationsManager;
