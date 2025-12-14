'use client';

import React, { useState } from 'react';
import { 
  Briefcase, Search, Filter, Download, Eye, Edit, Trash2,
  Plus, MapPin, DollarSign, Clock, Calendar, Building,
  Users, TrendingUp, CheckCircle, XCircle, AlertCircle,
  FileText, Award, Target, Zap
} from 'lucide-react';
import Link from 'next/link';

interface Job {
  id: string;
  title: string;
  department: string;
  location: string;
  type: 'full-time' | 'part-time' | 'contract' | 'internship';
  level: 'junior' | 'mid' | 'senior' | 'lead' | 'manager';
  salary: {
    min: number;
    max: number;
    currency: string;
  };
  status: 'active' | 'closed' | 'draft' | 'archived';
  applicants: number;
  views: number;
  postedDate: string;
  closingDate: string;
  description: string;
  requirements: string[];
  benefits: string[];
  company: string;
  remote: boolean;
  urgent: boolean;
}

export default function AdminJobs() {
  const [jobs] = useState<Job[]>([
    {
      id: '1',
      title: 'مطور واجهات أمامية senior',
      department: 'التقنية',
      location: 'القاهرة، مصر',
      type: 'full-time',
      level: 'senior',
      salary: { min: 15000, max: 25000, currency: 'ج.م' },
      status: 'active',
      applicants: 45,
      views: 1234,
      postedDate: '2024-12-01',
      closingDate: '2024-12-31',
      description: 'نبحث عن مطور واجهات أمامية محترف...',
      requirements: ['React', 'TypeScript', '5+ years experience'],
      benefits: ['تأمين صحي', 'إجازات سنوية', 'مكافآت'],
      company: 'راي للتقنية',
      remote: true,
      urgent: false
    },
    {
      id: '2',
      title: 'مدير تسويق',
      department: 'التسويق',
      location: 'الرياض، السعودية',
      type: 'full-time',
      level: 'manager',
      salary: { min: 20000, max: 35000, currency: 'ج.م' },
      status: 'active',
      applicants: 23,
      views: 890,
      postedDate: '2024-12-02',
      closingDate: '2024-12-25',
      description: 'مدير تسويق لقيادة الفريق التسويقي...',
      requirements: ['10+ years experience', 'Marketing degree'],
      benefits: ['تأمين صحي', 'سيارة شركة', 'مكافآت أداء'],
      company: 'راي للتسويق',
      remote: false,
      urgent: true
    },
    {
      id: '3',
      title: 'مصمم جرافيك',
      department: 'التصميم',
      location: 'دبي، الإمارات',
      type: 'part-time',
      level: 'mid',
      salary: { min: 8000, max: 12000, currency: 'ج.م' },
      status: 'closed',
      applicants: 67,
      views: 2345,
      postedDate: '2024-11-15',
      closingDate: '2024-12-01',
      description: 'مصمم جرافيك مشاريع...',
      requirements: ['Adobe Creative Suite', '3+ years experience'],
      benefits: ['مرونة الوقت', 'عمل من المنزل'],
      company: 'راي للتصميم',
      remote: true,
      urgent: false
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedType, setSelectedType] = useState('all');

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = selectedDepartment === 'all' || job.department === selectedDepartment;
    const matchesStatus = selectedStatus === 'all' || job.status === selectedStatus;
    const matchesType = selectedType === 'all' || job.type === selectedType;
    
    return matchesSearch && matchesDepartment && matchesStatus && matchesType;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-bold';
      case 'closed':
        return 'bg-red-100 text-red-700 px-2 py-1 rounded-full text-xs font-bold';
      case 'draft':
        return 'bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full text-xs font-bold';
      case 'archived':
        return 'bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs font-bold';
      default:
        return 'bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs font-bold';
    }
  };

  const getTypeBadge = (type: string) => {
    switch (type) {
      case 'full-time':
        return 'bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-bold';
      case 'part-time':
        return 'bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-xs font-bold';
      case 'contract':
        return 'bg-orange-100 text-orange-700 px-2 py-1 rounded-full text-xs font-bold';
      case 'internship':
        return 'bg-pink-100 text-pink-700 px-2 py-1 rounded-full text-xs font-bold';
      default:
        return 'bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs font-bold';
    }
  };

  const getLevelBadge = (level: string) => {
    switch (level) {
      case 'junior':
        return 'bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-bold';
      case 'mid':
        return 'bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-bold';
      case 'senior':
        return 'bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-xs font-bold';
      case 'lead':
        return 'bg-orange-100 text-orange-700 px-2 py-1 rounded-full text-xs font-bold';
      case 'manager':
        return 'bg-red-100 text-red-700 px-2 py-1 rounded-full text-xs font-bold';
      default:
        return 'bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs font-bold';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'active': return 'نشطة';
      case 'closed': return 'مغلقة';
      case 'draft': return 'مسودة';
      case 'archived': return 'مؤرشفة';
      default: return status;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'full-time': return 'دوام كامل';
      case 'part-time': return 'دوام جزئي';
      case 'contract': return 'عقد';
      case 'internship': return 'تدريب';
      default: return type;
    }
  };

  const getLevelLabel = (level: string) => {
    switch (level) {
      case 'junior': return 'مبتدئ';
      case 'mid': return 'متوسط';
      case 'senior': return 'خبير';
      case 'lead': return 'قائد فريق';
      case 'manager': return 'مدير';
      default: return level;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/admin" className="text-gray-600 hover:text-gray-900 transition">
                ← لوحة التحكم
              </Link>
              <h1 className="text-2xl font-bold text-gray-900">الوظائف</h1>
              <span className="bg-ray-blue text-white px-3 py-1 rounded-full text-sm font-bold">
                {filteredJobs.length}
              </span>
            </div>
            
            <div className="flex items-center gap-4">
              <button className="bg-ray-blue text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition flex items-center gap-2">
                <Plus className="w-4 h-4" />
                إضافة وظيفة
              </button>
              <button className="border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50 transition flex items-center gap-2">
                <Download className="w-4 h-4" />
                تصدير
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 p-6">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-green-100 rounded-lg">
              <Briefcase className="w-6 h-6 text-green-600" />
            </div>
            <span className="text-2xl font-bold text-gray-900">
              {jobs.filter(j => j.status === 'active').length}
            </span>
          </div>
          <h3 className="text-sm text-gray-600">وظائف نشطة</h3>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <span className="text-2xl font-bold text-gray-900">
              {jobs.reduce((sum, j) => sum + j.applicants, 0)}
            </span>
          </div>
          <h3 className="text-sm text-gray-600">إجمالي المتقدمين</h3>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Eye className="w-6 h-6 text-purple-600" />
            </div>
            <span className="text-2xl font-bold text-gray-900">
              {jobs.reduce((sum, j) => sum + j.views, 0).toLocaleString()}
            </span>
          </div>
          <h3 className="text-sm text-gray-600">إجمالي المشاهدات</h3>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-red-100 rounded-lg">
              <AlertCircle className="w-6 h-6 text-red-600" />
            </div>
            <span className="text-2xl font-bold text-gray-900">
              {jobs.filter(j => j.urgent).length}
            </span>
          </div>
          <h3 className="text-sm text-gray-600">وظائف عاجلة</h3>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border-b border-gray-200">
        <div className="px-6 py-4">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="بحث بالعنوان، الشركة، أو الموقع..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ray-blue"
              />
            </div>
            
            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ray-blue"
            >
              <option value="all">كل الأقسام</option>
              <option value="التقنية">التقنية</option>
              <option value="التسويق">التسويق</option>
              <option value="التصميم">التصميم</option>
              <option value="المالية">المالية</option>
            </select>
            
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ray-blue"
            >
              <option value="all">كل الحالات</option>
              <option value="active">نشطة</option>
              <option value="closed">مغلقة</option>
              <option value="draft">مسودة</option>
              <option value="archived">مؤرشفة</option>
            </select>
            
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ray-blue"
            >
              <option value="all">كل الأنواع</option>
              <option value="full-time">دوام كامل</option>
              <option value="part-time">دوام جزئي</option>
              <option value="contract">عقد</option>
              <option value="internship">تدريب</option>
            </select>
            
            <button className="border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50 transition flex items-center gap-2">
              <Filter className="w-4 h-4" />
              فلاتر متقدمة
            </button>
          </div>
        </div>
      </div>

      {/* Jobs Table */}
      <div className="p-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    الوظيفة
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    النوع
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    المستوى
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    الراتب
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    المتقدمون
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    الحالة
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    تاريخ الإغلاق
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    إجراءات
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredJobs.map((job) => (
                  <tr key={job.id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="p-2 bg-gray-100 rounded-lg ml-3">
                          <Briefcase className="w-4 h-4 text-gray-600" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <div className="text-sm font-medium text-gray-900">{job.title}</div>
                            {job.urgent && (
                              <span className="bg-red-100 text-red-700 px-2 py-1 rounded-full text-xs font-bold">
                                عاجلة
                              </span>
                            )}
                            {job.remote && (
                              <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-bold">
                                عن بعد
                              </span>
                            )}
                          </div>
                          <div className="text-sm text-gray-500">{job.company}</div>
                          <div className="flex items-center gap-2 text-xs text-gray-400">
                            <MapPin className="w-3 h-3" />
                            {job.location}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={getTypeBadge(job.type)}>
                        {getTypeLabel(job.type)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={getLevelBadge(job.level)}>
                        {getLevelLabel(job.level)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {job.salary.min.toLocaleString()} - {job.salary.max.toLocaleString()} {job.salary.currency}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-gray-400" />
                        {job.applicants}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={getStatusBadge(job.status)}>
                        {getStatusLabel(job.status)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {job.closingDate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center gap-2">
                        <button className="text-ray-blue hover:text-blue-600 transition">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="text-gray-600 hover:text-gray-900 transition">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="text-red-600 hover:text-red-700 transition">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
