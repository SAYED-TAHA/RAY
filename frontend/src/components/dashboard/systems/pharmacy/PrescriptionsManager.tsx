/**
 * مدير الوصفات الطبية
 * إدارة وتتبع الوصفات الطبية
 */

import React, { useState } from 'react';
import {
  FileText, Search, Plus, Edit, Trash2, Download, Eye,
  Filter, Clock, CheckCircle, AlertCircle, User, Pill,
  Calendar, MoreVertical, Copy, Send
} from 'lucide-react';

interface Prescription {
  id: string;
  patientName: string;
  patientId: string;
  doctorName: string;
  date: string;
  expiryDate: string;
  status: 'active' | 'expired' | 'filled' | 'pending';
  medicines: {
    name: string;
    dosage: string;
    frequency: string;
    duration: string;
    quantity: number;
  }[];
  notes?: string;
  refills: number;
}

const initialPrescriptions: Prescription[] = [
  {
    id: 'rx-001',
    patientName: 'أحمد محمد',
    patientId: 'P-001',
    doctorName: 'د. علي حسن',
    date: '2024-11-20',
    expiryDate: '2025-02-20',
    status: 'active',
    medicines: [
      { name: 'أموكسيسيلين', dosage: '500mg', frequency: 'ثلاث مرات يومياً', duration: '7 أيام', quantity: 21 },
      { name: 'باراسيتامول', dosage: '500mg', frequency: 'عند الحاجة', duration: 'حسب الحاجة', quantity: 10 }
    ],
    refills: 2
  },
  {
    id: 'rx-002',
    patientName: 'فاطمة علي',
    patientId: 'P-002',
    doctorName: 'د. سارة محمود',
    date: '2024-11-15',
    expiryDate: '2025-02-15',
    status: 'filled',
    medicines: [
      { name: 'أسبرين', dosage: '100mg', frequency: 'مرة واحدة يومياً', duration: '30 يوم', quantity: 30 }
    ],
    refills: 0
  },
  {
    id: 'rx-003',
    patientName: 'محمود حسن',
    patientId: 'P-003',
    doctorName: 'د. علي حسن',
    date: '2024-10-20',
    expiryDate: '2025-01-20',
    status: 'expired',
    medicines: [
      { name: 'ميتفورمين', dosage: '500mg', frequency: 'مرتين يومياً', duration: '30 يوم', quantity: 60 }
    ],
    refills: 1
  },
  {
    id: 'rx-004',
    patientName: 'سارة أحمد',
    patientId: 'P-004',
    doctorName: 'د. سارة محمود',
    date: '2024-11-25',
    expiryDate: '2025-02-25',
    status: 'pending',
    medicines: [
      { name: 'أموكسيسيلين', dosage: '250mg', frequency: 'مرتين يومياً', duration: '5 أيام', quantity: 10 },
      { name: 'فيتامين C', dosage: '500mg', frequency: 'مرة واحدة يومياً', duration: '30 يوم', quantity: 30 }
    ],
    refills: 3
  }
];

const PrescriptionsManager: React.FC = () => {
  const [prescriptions, setPrescriptions] = useState<Prescription[]>(initialPrescriptions);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'expired' | 'filled' | 'pending'>('all');
  const [selectedPrescription, setSelectedPrescription] = useState<Prescription | null>(null);

  const filteredPrescriptions = prescriptions.filter(rx => {
    const matchesSearch = rx.patientName.includes(searchTerm) || rx.id.includes(searchTerm);
    const matchesStatus = filterStatus === 'all' || rx.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'filled': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'expired': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'active': return 'نشطة';
      case 'filled': return 'مملوءة';
      case 'pending': return 'معلقة';
      case 'expired': return 'منتهية';
      default: return status;
    }
  };

  return (
    <div className="h-full flex flex-col space-y-6 animate-in fade-in slide-in-from-bottom-2">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <FileText className="w-6 h-6 text-green-600" />
            إدارة الوصفات الطبية
          </h2>
          <p className="text-sm text-gray-500">إدارة وتتبع الوصفات الطبية</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
          <Plus className="w-5 h-5" />
          وصفة جديدة
        </button>
      </div>

      {/* Controls */}
      <div className="flex gap-4 flex-wrap">
        {/* Search */}
        <div className="flex-1 min-w-64 relative">
          <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="ابحث عن المريض أو الوصفة..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* Filter */}
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value as any)}
          className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500"
        >
          <option value="all">الكل</option>
          <option value="active">نشطة</option>
          <option value="pending">معلقة</option>
          <option value="filled">مملوءة</option>
          <option value="expired">منتهية</option>
        </select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Prescriptions List */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 overflow-hidden flex flex-col">
          <div className="overflow-y-auto flex-1">
            {filteredPrescriptions.map(rx => (
              <button
                key={rx.id}
                onClick={() => setSelectedPrescription(rx)}
                className={`w-full text-right p-4 border-b border-gray-100 hover:bg-gray-50 transition ${
                  selectedPrescription?.id === rx.id ? 'bg-green-50' : ''
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-800">{rx.patientName}</h4>
                    <p className="text-xs text-gray-500">{rx.id}</p>
                  </div>
                  <span className={`text-xs font-semibold px-2 py-1 rounded-full ${getStatusColor(rx.status)}`}>
                    {getStatusLabel(rx.status)}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-xs text-gray-600">
                  <span className="flex items-center gap-1">
                    <User className="w-3 h-3" />
                    {rx.doctorName}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {rx.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Pill className="w-3 h-3" />
                    {rx.medicines.length} أدوية
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Prescription Details */}
        {selectedPrescription && (
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden flex flex-col">
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-bold text-gray-800">{selectedPrescription.patientName}</h3>
                  <p className="text-xs text-gray-500">{selectedPrescription.patientId}</p>
                </div>
                <span className={`text-xs font-semibold px-2 py-1 rounded-full ${getStatusColor(selectedPrescription.status)}`}>
                  {getStatusLabel(selectedPrescription.status)}
                </span>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {/* Info */}
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">الطبيب:</span>
                  <span className="font-semibold text-gray-800">{selectedPrescription.doctorName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">التاريخ:</span>
                  <span className="font-semibold text-gray-800">{selectedPrescription.date}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">الانتهاء:</span>
                  <span className="font-semibold text-gray-800">{selectedPrescription.expiryDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">التكرارات المتبقية:</span>
                  <span className="font-semibold text-gray-800">{selectedPrescription.refills}</span>
                </div>
              </div>

              {/* Medicines */}
              <div>
                <h4 className="font-semibold text-gray-800 mb-2 text-sm">الأدوية</h4>
                <div className="space-y-2">
                  {selectedPrescription.medicines.map((med, idx) => (
                    <div key={idx} className="p-2 bg-gray-50 rounded-lg text-xs">
                      <p className="font-semibold text-gray-800">{med.name}</p>
                      <p className="text-gray-600">{med.dosage}</p>
                      <p className="text-gray-500">{med.frequency} لمدة {med.duration}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Notes */}
              {selectedPrescription.notes && (
                <div>
                  <h4 className="font-semibold text-gray-800 mb-1 text-sm">ملاحظات</h4>
                  <p className="text-xs text-gray-600">{selectedPrescription.notes}</p>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="p-4 border-t border-gray-200 space-y-2">
              <button className="w-full px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition text-sm font-semibold flex items-center justify-center gap-2">
                <Send className="w-4 h-4" />
                إرسال للصيدلية
              </button>
              <button className="w-full px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition text-sm font-semibold flex items-center justify-center gap-2">
                <Download className="w-4 h-4" />
                تحميل PDF
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PrescriptionsManager;
