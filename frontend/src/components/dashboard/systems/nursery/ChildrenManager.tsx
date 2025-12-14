/**
 * مدير الأطفال في الحضانة
 * إدارة بيانات الأطفال والوالدين
 */

import React, { useState } from 'react';
import {
  Users, Search, Plus, Edit, Trash2, Phone, Mail,
  Calendar, Heart, AlertCircle, FileText, Download, Eye
} from 'lucide-react';

interface Child {
  id: string;
  name: string;
  dateOfBirth: string;
  age: number;
  parentName: string;
  parentPhone: string;
  parentEmail: string;
  enrollmentDate: string;
  class: string;
  status: 'active' | 'inactive' | 'graduated';
  allergies?: string[];
  medicalNotes?: string;
  emergencyContact: string;
  photo?: string;
}

const initialChildren: Child[] = [
  {
    id: 'ch-001',
    name: 'أحمد علي',
    dateOfBirth: '2022-05-15',
    age: 2,
    parentName: 'علي محمد',
    parentPhone: '+201001234567',
    parentEmail: 'ali@example.com',
    enrollmentDate: '2024-01-10',
    class: 'الفئة الأولى',
    status: 'active',
    allergies: ['الحليب'],
    medicalNotes: 'حساسية من الحليب',
    emergencyContact: '+201101234567'
  },
  {
    id: 'ch-002',
    name: 'فاطمة محمود',
    dateOfBirth: '2022-08-20',
    age: 2,
    parentName: 'محمود حسن',
    parentPhone: '+201101234567',
    parentEmail: 'mahmoud@example.com',
    enrollmentDate: '2024-02-15',
    class: 'الفئة الأولى',
    status: 'active',
    emergencyContact: '+201201234567'
  },
  {
    id: 'ch-003',
    name: 'محمد سارة',
    dateOfBirth: '2021-03-10',
    age: 3,
    parentName: 'سارة أحمد',
    parentPhone: '+201201234567',
    parentEmail: 'sarah@example.com',
    enrollmentDate: '2023-09-01',
    class: 'الفئة الثانية',
    status: 'active',
    emergencyContact: '+201301234567'
  },
  {
    id: 'ch-004',
    name: 'ليلى عمرو',
    dateOfBirth: '2020-11-25',
    age: 4,
    parentName: 'عمرو علي',
    parentPhone: '+201301234567',
    parentEmail: 'amr@example.com',
    enrollmentDate: '2023-01-15',
    class: 'الفئة الثالثة',
    status: 'active',
    emergencyContact: '+201401234567'
  }
];

const ChildrenManager: React.FC = () => {
  const [children, setChildren] = useState<Child[]>(initialChildren);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterClass, setFilterClass] = useState<string>('all');
  const [selectedChild, setSelectedChild] = useState<Child | null>(null);

  const filteredChildren = children.filter(child => {
    const matchesSearch = child.name.includes(searchTerm) || child.parentName.includes(searchTerm);
    const matchesClass = filterClass === 'all' || child.class === filterClass;
    return matchesSearch && matchesClass;
  });

  const classes = Array.from(new Set(children.map(c => c.class)));

  const calculateAge = (birthDate: string) => {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };

  return (
    <div className="h-full flex flex-col space-y-6 animate-in fade-in slide-in-from-bottom-2">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <Users className="w-6 h-6 text-blue-600" />
            إدارة الأطفال
          </h2>
          <p className="text-sm text-gray-500">إدارة بيانات الأطفال والوالدين</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
          <Plus className="w-5 h-5" />
          طفل جديد
        </button>
      </div>

      {/* Controls */}
      <div className="flex gap-4 flex-wrap">
        {/* Search */}
        <div className="flex-1 min-w-64 relative">
          <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="ابحث عن الطفل أو الوالد..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Class Filter */}
        <select
          value={filterClass}
          onChange={(e) => setFilterClass(e.target.value)}
          className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">جميع الفئات</option>
          {classes.map(cls => (
            <option key={cls} value={cls}>{cls}</option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Children List */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 overflow-hidden flex flex-col">
          <div className="overflow-y-auto flex-1">
            {filteredChildren.map(child => (
              <button
                key={child.id}
                onClick={() => setSelectedChild(child)}
                className={`w-full text-right p-4 border-b border-gray-100 hover:bg-gray-50 transition ${
                  selectedChild?.id === child.id ? 'bg-blue-50' : ''
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-800">{child.name}</h4>
                    <p className="text-xs text-gray-500">{child.class}</p>
                  </div>
                  <span className="text-xs font-semibold px-2 py-1 bg-blue-100 text-blue-700 rounded-full">
                    {calculateAge(child.dateOfBirth)} سنة
                  </span>
                </div>
                <div className="flex items-center gap-4 text-xs text-gray-600">
                  <span className="flex items-center gap-1">
                    <Users className="w-3 h-3" />
                    {child.parentName}
                  </span>
                  <span className="flex items-center gap-1">
                    <Phone className="w-3 h-3" />
                    {child.parentPhone}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Child Details */}
        {selectedChild && (
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden flex flex-col">
            <div className="p-4 border-b border-gray-200">
              <h3 className="font-bold text-gray-800 mb-1">{selectedChild.name}</h3>
              <p className="text-xs text-gray-500">{selectedChild.class}</p>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {/* Child Info */}
              <div>
                <h4 className="font-semibold text-gray-800 mb-2 text-sm">بيانات الطفل</h4>
                <div className="space-y-1 text-xs">
                  <div className="flex justify-between">
                    <span className="text-gray-600">تاريخ الميلاد:</span>
                    <span className="font-semibold text-gray-800">{selectedChild.dateOfBirth}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">العمر:</span>
                    <span className="font-semibold text-gray-800">{calculateAge(selectedChild.dateOfBirth)} سنة</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">تاريخ التسجيل:</span>
                    <span className="font-semibold text-gray-800">{selectedChild.enrollmentDate}</span>
                  </div>
                </div>
              </div>

              {/* Parent Info */}
              <div>
                <h4 className="font-semibold text-gray-800 mb-2 text-sm">بيانات الوالد</h4>
                <div className="space-y-1 text-xs">
                  <p className="font-semibold text-gray-800">{selectedChild.parentName}</p>
                  <div className="flex items-center gap-1 text-gray-600">
                    <Phone className="w-3 h-3" />
                    {selectedChild.parentPhone}
                  </div>
                  <div className="flex items-center gap-1 text-gray-600">
                    <Mail className="w-3 h-3" />
                    {selectedChild.parentEmail}
                  </div>
                </div>
              </div>

              {/* Medical Info */}
              {(selectedChild.allergies || selectedChild.medicalNotes) && (
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2 text-sm flex items-center gap-1">
                    <AlertCircle className="w-4 h-4 text-red-600" />
                    معلومات طبية
                  </h4>
                  {selectedChild.allergies && (
                    <div className="mb-2">
                      <p className="text-xs text-gray-600 mb-1">الحساسيات:</p>
                      <div className="flex flex-wrap gap-1">
                        {selectedChild.allergies.map(allergy => (
                          <span key={allergy} className="px-2 py-1 bg-red-100 text-red-700 rounded text-xs font-semibold">
                            {allergy}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  {selectedChild.medicalNotes && (
                    <p className="text-xs text-gray-600">{selectedChild.medicalNotes}</p>
                  )}
                </div>
              )}

              {/* Emergency Contact */}
              <div>
                <h4 className="font-semibold text-gray-800 mb-2 text-sm">جهة الاتصال الطارئة</h4>
                <div className="flex items-center gap-1 text-xs text-gray-600">
                  <Phone className="w-3 h-3" />
                  {selectedChild.emergencyContact}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="p-4 border-t border-gray-200 space-y-2">
              <button className="w-full px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm font-semibold flex items-center justify-center gap-2">
                <Edit className="w-4 h-4" />
                تعديل
              </button>
              <button className="w-full px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition text-sm font-semibold flex items-center justify-center gap-2">
                <Download className="w-4 h-4" />
                تقرير
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChildrenManager;
