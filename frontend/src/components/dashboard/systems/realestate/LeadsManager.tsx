/**
 * مدير العملاء المحتملين (Leads)
 * إدارة وتتبع العملاء المحتملين
 */

import React, { useState } from 'react';
import {
  Users, Search, Plus, Edit, Trash2, Phone, Mail,
  Calendar, MapPin, DollarSign, TrendingUp, Filter, Eye
} from 'lucide-react';

interface Lead {
  id: string;
  name: string;
  phone: string;
  email: string;
  propertyType: string;
  budget: number;
  location: string;
  status: 'new' | 'contacted' | 'interested' | 'negotiating' | 'lost';
  source: string;
  createdDate: string;
  lastContact?: string;
  notes?: string;
  agent: string;
}

const initialLeads: Lead[] = [
  {
    id: 'lead-001',
    name: 'أحمد محمد',
    phone: '+201001234567',
    email: 'ahmed@example.com',
    propertyType: 'شقة',
    budget: 2500000,
    location: 'المعادي',
    status: 'interested',
    source: 'موقع الويب',
    createdDate: '2024-11-20',
    lastContact: '2024-11-25',
    notes: 'مهتم بشقة 3 غرف بالمعادي',
    agent: 'أحمد محمد'
  },
  {
    id: 'lead-002',
    name: 'فاطمة علي',
    phone: '+201101234567',
    email: 'fatima@example.com',
    propertyType: 'فيلا',
    budget: 5000000,
    location: 'الشيخ زايد',
    status: 'new',
    source: 'إعلان',
    createdDate: '2024-11-25',
    notes: 'باحثة عن فيلا بحديقة',
    agent: 'فاطمة علي'
  },
  {
    id: 'lead-003',
    name: 'محمود حسن',
    phone: '+201201234567',
    email: 'mahmoud@example.com',
    propertyType: 'أرض',
    budget: 1500000,
    location: 'العاصمة الإدارية',
    status: 'negotiating',
    source: 'توصية',
    createdDate: '2024-11-10',
    lastContact: '2024-11-24',
    notes: 'يفاوض على أرض بالعاصمة',
    agent: 'محمود حسن'
  },
  {
    id: 'lead-004',
    name: 'سارة أحمد',
    phone: '+201301234567',
    email: 'sarah@example.com',
    propertyType: 'شقة',
    budget: 3000000,
    location: 'التجمع الخامس',
    status: 'contacted',
    source: 'موقع الويب',
    createdDate: '2024-11-22',
    lastContact: '2024-11-23',
    notes: 'تبحث عن شقة فاخرة',
    agent: 'سارة أحمد'
  }
];

const LeadsManager: React.FC = () => {
  const [leads, setLeads] = useState<Lead[]>(initialLeads);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'new' | 'contacted' | 'interested' | 'negotiating' | 'lost'>('all');
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  const filteredLeads = leads.filter(lead => {
    const matchesSearch = lead.name.includes(searchTerm) || lead.phone.includes(searchTerm) || lead.email.includes(searchTerm);
    const matchesStatus = filterStatus === 'all' || lead.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-800';
      case 'contacted': return 'bg-yellow-100 text-yellow-800';
      case 'interested': return 'bg-green-100 text-green-800';
      case 'negotiating': return 'bg-purple-100 text-purple-800';
      case 'lost': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'new': return 'جديد';
      case 'contacted': return 'تم الاتصال';
      case 'interested': return 'مهتم';
      case 'negotiating': return 'يفاوض';
      case 'lost': return 'فقد';
      default: return status;
    }
  };

  const stats = {
    total: leads.length,
    new: leads.filter(l => l.status === 'new').length,
    interested: leads.filter(l => l.status === 'interested').length,
    negotiating: leads.filter(l => l.status === 'negotiating').length
  };

  return (
    <div className="h-full flex flex-col space-y-6 animate-in fade-in slide-in-from-bottom-2">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <Users className="w-6 h-6 text-green-600" />
            إدارة العملاء المحتملين
          </h2>
          <p className="text-sm text-gray-500">إدارة وتتبع العملاء المحتملين</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
          <Plus className="w-5 h-5" />
          عميل جديد
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-gray-200">
          <p className="text-sm text-gray-600 mb-1">إجمالي العملاء</p>
          <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
        </div>
        <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
          <p className="text-sm text-blue-700 mb-1">جديد</p>
          <p className="text-2xl font-bold text-blue-900">{stats.new}</p>
        </div>
        <div className="bg-green-50 p-4 rounded-xl border border-green-200">
          <p className="text-sm text-green-700 mb-1">مهتم</p>
          <p className="text-2xl font-bold text-green-900">{stats.interested}</p>
        </div>
        <div className="bg-purple-50 p-4 rounded-xl border border-purple-200">
          <p className="text-sm text-purple-700 mb-1">يفاوض</p>
          <p className="text-2xl font-bold text-purple-900">{stats.negotiating}</p>
        </div>
      </div>

      {/* Controls */}
      <div className="flex gap-4 flex-wrap">
        {/* Search */}
        <div className="flex-1 min-w-64 relative">
          <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="ابحث عن العميل..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* Status Filter */}
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value as any)}
          className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500"
        >
          <option value="all">جميع الحالات</option>
          <option value="new">جديد</option>
          <option value="contacted">تم الاتصال</option>
          <option value="interested">مهتم</option>
          <option value="negotiating">يفاوض</option>
          <option value="lost">فقد</option>
        </select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Leads List */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 overflow-hidden flex flex-col">
          <div className="overflow-y-auto flex-1">
            {filteredLeads.map(lead => (
              <button
                key={lead.id}
                onClick={() => setSelectedLead(lead)}
                className={`w-full text-right p-4 border-b border-gray-100 hover:bg-gray-50 transition ${
                  selectedLead?.id === lead.id ? 'bg-green-50' : ''
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-800">{lead.name}</h4>
                    <p className="text-xs text-gray-500">{lead.propertyType}</p>
                  </div>
                  <span className={`text-xs font-semibold px-2 py-1 rounded-full ${getStatusColor(lead.status)}`}>
                    {getStatusLabel(lead.status)}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-xs text-gray-600">
                  <span className="flex items-center gap-1">
                    <Phone className="w-3 h-3" />
                    {lead.phone}
                  </span>
                  <span className="flex items-center gap-1">
                    <DollarSign className="w-3 h-3" />
                    {(lead.budget / 1000000).toFixed(1)}M
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {lead.createdDate}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Lead Details */}
        {selectedLead && (
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden flex flex-col">
            <div className="p-4 border-b border-gray-200">
              <h3 className="font-bold text-gray-800 mb-1">{selectedLead.name}</h3>
              <span className={`text-xs font-semibold px-2 py-1 rounded-full ${getStatusColor(selectedLead.status)}`}>
                {getStatusLabel(selectedLead.status)}
              </span>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {/* Contact Info */}
              <div>
                <h4 className="font-semibold text-gray-800 mb-2 text-sm">معلومات الاتصال</h4>
                <div className="space-y-1 text-xs">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Phone className="w-3 h-3" />
                    {selectedLead.phone}
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Mail className="w-3 h-3" />
                    {selectedLead.email}
                  </div>
                </div>
              </div>

              {/* Property Preferences */}
              <div>
                <h4 className="font-semibold text-gray-800 mb-2 text-sm">تفضيلات العقار</h4>
                <div className="space-y-1 text-xs">
                  <div className="flex justify-between">
                    <span className="text-gray-600">النوع:</span>
                    <span className="font-semibold text-gray-800">{selectedLead.propertyType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">الميزانية:</span>
                    <span className="font-semibold text-gray-800">{(selectedLead.budget / 1000000).toFixed(1)}M ج</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">الموقع:</span>
                    <span className="font-semibold text-gray-800">{selectedLead.location}</span>
                  </div>
                </div>
              </div>

              {/* Lead Info */}
              <div>
                <h4 className="font-semibold text-gray-800 mb-2 text-sm">معلومات الـ Lead</h4>
                <div className="space-y-1 text-xs">
                  <div className="flex justify-between">
                    <span className="text-gray-600">المصدر:</span>
                    <span className="font-semibold text-gray-800">{selectedLead.source}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">الوكيل:</span>
                    <span className="font-semibold text-gray-800">{selectedLead.agent}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">تاريخ الإنشاء:</span>
                    <span className="font-semibold text-gray-800">{selectedLead.createdDate}</span>
                  </div>
                </div>
              </div>

              {/* Notes */}
              {selectedLead.notes && (
                <div>
                  <h4 className="font-semibold text-gray-800 mb-1 text-sm">ملاحظات</h4>
                  <p className="text-xs text-gray-600">{selectedLead.notes}</p>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="p-4 border-t border-gray-200 space-y-2">
              <button className="w-full px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition text-sm font-semibold flex items-center justify-center gap-2">
                <Phone className="w-4 h-4" />
                اتصل الآن
              </button>
              <button className="w-full px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition text-sm font-semibold flex items-center justify-center gap-2">
                <Edit className="w-4 h-4" />
                تعديل
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LeadsManager;
