'use client';

import React, { useState } from 'react';
import { 
  FileCheck, Search, Filter, Download, Eye, Edit, Trash2,
  CheckCircle, XCircle, Clock, AlertCircle, Calendar,
  User, Mail, Phone, MapPin, Briefcase, DollarSign,
  Star, TrendingUp, Users, Building, GraduationCap,
  Award, Target, RefreshCw, Plus, ChevronDown, MoreVertical
} from 'lucide-react';
import Link from 'next/link';

interface Application {
  id: string;
  name: string;
  email: string;
  phone: string;
  position: string;
  department: string;
  experience: string;
  education: string;
  location: string;
  salary: string;
  status: string;
  date: string;
  rating: number;
  skills: string[];
  resume: string;
  coverLetter: string | null;
}

export default function AdminApplications() {
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedPosition, setSelectedPosition] = useState('all');

  const applications = [
    {
      id: 'APP001',
      name: 'أحمد محمد',
      email: 'ahmed@email.com',
      phone: '+20 123 456 7890',
      position: 'مطور Frontend',
      department: 'التقنية',
      experience: '3 سنوات',
      education: 'بكالوريوس علوم الحاسب',
      location: 'القاهرة',
      salary: '15000-20000',
      status: 'pending',
      date: '2025-12-05',
      rating: 4.5,
      skills: ['React', 'TypeScript', 'Tailwind CSS'],
      resume: 'resume_ahmed.pdf',
      coverLetter: 'cover_ahmed.pdf'
    },
    {
      id: 'APP002',
      name: 'سارة أحمد',
      email: 'sara@email.com',
      phone: '+20 987 654 3210',
      position: 'مصممة UI/UX',
      department: 'التصميم',
      experience: '2 سنوات',
      education: 'دبلوم تصميم جرافيك',
      location: 'الإسكندرية',
      salary: '12000-15000',
      status: 'reviewing',
      date: '2025-12-04',
      rating: 4.8,
      skills: ['Figma', 'Adobe XD', 'Sketch'],
      resume: 'resume_sara.pdf',
      coverLetter: 'cover_sara.pdf'
    },
    {
      id: 'APP003',
      name: 'محمد علي',
      email: 'mohammed@email.com',
      phone: '+20 555 123 4567',
      position: 'مطور Backend',
      department: 'التقنية',
      experience: '5 سنوات',
      education: 'ماجستير علوم الحاسب',
      location: 'الرياض',
      salary: '20000-25000',
      status: 'accepted',
      date: '2025-12-03',
      rating: 4.9,
      skills: ['Node.js', 'MongoDB', 'Docker'],
      resume: 'resume_mohammed.pdf',
      coverLetter: 'cover_mohammed.pdf'
    },
    {
      id: 'APP004',
      name: 'فاطمة حسن',
      email: 'fatima@email.com',
      phone: '+20 777 987 6543',
      position: 'مساعدة تسويق',
      department: 'التسويق',
      experience: '1 سنة',
      education: 'بكالوريوس إدارة أعمال',
      location: 'دبي',
      salary: '8000-10000',
      status: 'rejected',
      date: '2025-12-02',
      rating: 3.2,
      skills: ['Social Media', 'Content Writing', 'SEO'],
      resume: 'resume_fatima.pdf',
      coverLetter: null
    }
  ];

  const positions = [
    { id: 'all', label: 'جميع الوظائف', count: applications.length },
    { id: 'frontend', label: 'مطور Frontend', count: 1 },
    { id: 'backend', label: 'مطور Backend', count: 1 },
    { id: 'uiux', label: 'مصمم UI/UX', count: 1 },
    { id: 'marketing', label: 'مساعدة تسويق', count: 1 }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'reviewing':
        return 'bg-blue-100 text-blue-800';
      case 'accepted':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      case 'interview':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending':
        return 'معلق';
      case 'reviewing':
        return 'قيد المراجعة';
      case 'accepted':
        return 'مقبول';
      case 'rejected':
        return 'مرفوض';
      case 'interview':
        return 'مقابلة';
      default:
        return status;
    }
  };

  const filteredApplications = applications.filter(app => {
    const matchesSearch = app.name.includes(searchTerm) || 
                         app.email.includes(searchTerm) || 
                         app.position.includes(searchTerm);
    const matchesStatus = selectedStatus === 'all' || app.status === selectedStatus;
    const matchesPosition = selectedPosition === 'all' || app.position.toLowerCase().includes(selectedPosition);
    return matchesSearch && matchesStatus && matchesPosition;
  });

  const stats = {
    total: applications.length,
    pending: applications.filter(a => a.status === 'pending').length,
    reviewing: applications.filter(a => a.status === 'reviewing').length,
    accepted: applications.filter(a => a.status === 'accepted').length,
    rejected: applications.filter(a => a.status === 'rejected').length
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link href="/admin" className="p-2 hover:bg-gray-100 rounded-lg transition">
                <FileCheck className="w-6 h-6 text-gray-600" />
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">الطلبات</h1>
                <p className="text-sm text-gray-600">مراجعة الطلبات</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                <Download className="w-4 h-4" />
                تصدير
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">الإجمالي</p>
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              </div>
              <Users className="w-8 h-8 text-blue-600" />
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">معلق</p>
                <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
              </div>
              <Clock className="w-8 h-8 text-yellow-600" />
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">قيد المراجعة</p>
                <p className="text-2xl font-bold text-blue-600">{stats.reviewing}</p>
              </div>
              <AlertCircle className="w-8 h-8 text-blue-600" />
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">مقبول</p>
                <p className="text-2xl font-bold text-green-600">{stats.accepted}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">مرفوض</p>
                <p className="text-2xl font-bold text-red-600">{stats.rejected}</p>
              </div>
              <XCircle className="w-8 h-8 text-red-600" />
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute right-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="بحث عن طلبات..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pr-10 pl-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div className="flex gap-3">
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">جميع الحالات</option>
                <option value="pending">معلق</option>
                <option value="reviewing">قيد المراجعة</option>
                <option value="interview">مقابلة</option>
                <option value="accepted">مقبول</option>
                <option value="rejected">مرفوض</option>
              </select>
              
              <select
                value={selectedPosition}
                onChange={(e) => setSelectedPosition(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {positions.map(pos => (
                  <option key={pos.id} value={pos.id}>
                    {pos.label} ({pos.count})
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Applications Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Applications List */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="divide-y divide-gray-200">
                {filteredApplications.map((application) => (
                  <div
                    key={application.id}
                    onClick={() => setSelectedApplication(application)}
                    className={`p-6 cursor-pointer hover:bg-gray-50 transition ${
                      selectedApplication?.id === application.id ? 'bg-blue-50 border-l-4 border-blue-500' : ''
                    }`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                          <User className="w-6 h-6 text-gray-600" />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">{application.name}</h3>
                          <p className="text-sm text-gray-600">{application.email}</p>
                          <p className="text-xs text-gray-500">{application.phone}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(application.status)}`}>
                          {getStatusText(application.status)}
                        </span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mb-3">
                      <div>
                        <p className="text-xs text-gray-500">الوظيفة</p>
                        <p className="text-sm font-medium text-gray-900">{application.position}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">الخبرة</p>
                        <p className="text-sm font-medium text-gray-900">{application.experience}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">الموقع</p>
                        <p className="text-sm font-medium text-gray-900">{application.location}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">الراتب</p>
                        <p className="text-sm font-medium text-gray-900">{application.salary} ج</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className="text-sm text-gray-900">{application.rating}</span>
                      </div>
                      <span className="text-xs text-gray-500">{application.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Application Detail */}
          <div className="lg:col-span-1">
            {selectedApplication ? (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                        <User className="w-6 h-6 text-gray-600" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">{selectedApplication.name}</h3>
                        <p className="text-sm text-gray-600">{selectedApplication.position}</p>
                      </div>
                    </div>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(selectedApplication.status)}`}>
                      {getStatusText(selectedApplication.status)}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-1 mb-4">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="text-sm text-gray-900">{selectedApplication.rating}</span>
                    <span className="text-xs text-gray-500">تقييم</span>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium text-gray-900 mb-1">معلومات الاتصال</h4>
                      <div className="space-y-1">
                        <p className="text-sm text-gray-600">{selectedApplication.email}</p>
                        <p className="text-sm text-gray-600">{selectedApplication.phone}</p>
                        <p className="text-sm text-gray-600 flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {selectedApplication.location}
                        </p>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium text-gray-900 mb-1">الخبرة والتعليم</h4>
                      <div className="space-y-1">
                        <p className="text-sm text-gray-600">الخبرة: {selectedApplication.experience}</p>
                        <p className="text-sm text-gray-600">التعليم: {selectedApplication.education}</p>
                        <p className="text-sm text-gray-600">الراتب المتوقع: {selectedApplication.salary} ج</p>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium text-gray-900 mb-2">المهارات</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedApplication.skills.map((skill: string, index: number) => (
                          <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium text-gray-900 mb-2">المستندات</h4>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                          <span className="text-sm text-gray-700">السيرة الذاتية</span>
                          <button className="text-blue-600 hover:text-blue-900">
                            <Eye className="w-4 h-4" />
                          </button>
                        </div>
                        {selectedApplication.coverLetter && (
                          <div className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                            <span className="text-sm text-gray-700">رسالة تعريفية</span>
                            <button className="text-blue-600 hover:text-blue-900">
                              <Eye className="w-4 h-4" />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {/* Actions */}
                  <div className="mt-6 space-y-2">
                    <div className="grid grid-cols-2 gap-2">
                      <button className="flex items-center justify-center gap-2 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
                        <CheckCircle className="w-4 h-4" />
                        قبول
                      </button>
                      <button className="flex items-center justify-center gap-2 px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition">
                        <XCircle className="w-4 h-4" />
                        رفض
                      </button>
                    </div>
                    <button className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                      <Calendar className="w-4 h-4" />
                      جدولة مقابلة
                    </button>
                    <button className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition">
                      <Mail className="w-4 h-4" />
                      إرسال رسالة
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
                <FileCheck className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">اختر طلب للعرض</h3>
                <p className="text-sm text-gray-600">اختر طلباً من القائمة لعرض التفاصيل</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
