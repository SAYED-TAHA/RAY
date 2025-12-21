'use client';

import React, { useState, useEffect } from 'react';
import { ArrowLeft, Briefcase, Search, Filter, Calendar, MapPin, Clock, ExternalLink, ChevronLeft, Building, AlertCircle, Loader } from 'lucide-react';
import Link from 'next/link';
import { API_URL } from '@/utils/api';

interface JobApplication {
  id: string;
  applicationNumber: string;
  jobTitle: string;
  company: string;
  location: string;
  type: string;
  salary: string;
  appliedDate: string;
  status: 'applied' | 'reviewing' | 'shortlisted' | 'rejected' | 'accepted' | 'withdrawn';
  jobId: string;
  department: string;
}

export default function JobApplicationsPage() {
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [isLoading, setIsLoading] = useState(true);

const getStatusColor = (status: string) => {
  switch (status) {
    case 'applied': return 'bg-blue-100 text-blue-700';
    case 'reviewing': return 'bg-yellow-100 text-yellow-700';
    case 'shortlisted': return 'bg-green-100 text-green-700';
    case 'rejected': return 'bg-red-100 text-red-700';
    case 'accepted': return 'bg-emerald-100 text-emerald-700';
    case 'withdrawn': return 'bg-gray-100 text-gray-700';
    default: return 'bg-gray-100 text-gray-700';
  }
};

const getStatusLabel = (status: string) => {
  switch (status) {
    case 'applied': return 'تم التقديم';
    case 'reviewing': return 'قيد المراجعة';
    case 'shortlisted': return 'مختار للمقابلة';
    case 'rejected': return 'مرفوض';
    case 'accepted': return 'مقبول';
    case 'withdrawn': return 'مسحوب';
    default: return status;
  }
};

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedApplication, setSelectedApplication] = useState<JobApplication | null>(null);
  const [isWithdrawing, setIsWithdrawing] = useState(false);
  const [withdrawReason, setWithdrawReason] = useState('');

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`${API_URL}/api/profile/job-applications`);
        if (response.ok) {
          const data = await response.json();
          setApplications(data);
        }
      } catch (error) {
        console.error('خطأ في جلب طلبات التوظيف:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchApplications();
  }, []);

  const filteredApplications = applications.filter(application => {
    const matchesSearch = application.applicationNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         application.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         application.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || application.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const handleWithdrawApplication = () => {
    setIsWithdrawing(true);
  };

  const handleConfirmWithdraw = () => {
    // Here you would normally send to backend
    console.log('Withdrawing application:', selectedApplication?.applicationNumber, 'Reason:', withdrawReason);
    
    // Update the application status to withdrawn
    if (selectedApplication) {
      const updatedApplication = { ...selectedApplication, status: 'withdrawn' as const };
      setSelectedApplication(updatedApplication);
    }
    
    setIsWithdrawing(false);
    setWithdrawReason('');
  };

  const handleCancelWithdraw = () => {
    setIsWithdrawing(false);
    setWithdrawReason('');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/profile" className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition">
              <ArrowLeft className="w-5 h-5" />
              العودة للملف الشخصي
            </Link>
            
            <h1 className="text-xl font-bold text-gray-900">طلبات التوظيف</h1>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="البحث برقم الطلب أو الوظيفة أو الشركة..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pr-10 pl-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ray-blue"
              />
            </div>

            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ray-blue"
            >
              <option value="all">جميع الحالات</option>
              <option value="applied">تم التقديم</option>
              <option value="reviewing">قيد المراجعة</option>
              <option value="shortlisted">مختار للمقابلة</option>
              <option value="accepted">مقبول</option>
              <option value="rejected">مرفوض</option>
            </select>
          </div>
        </div>
      </div>

      {/* Applications List */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {filteredApplications.length === 0 ? (
          <div className="text-center py-16">
            <Briefcase className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">لا توجد طلبات توظيف</h3>
            <p className="text-gray-600 mb-6">
              {searchTerm || statusFilter !== 'all' 
                ? 'جرب تغيير الفلاتر أو البحث' 
                : 'ابدأ بالتقديم على الوظائف المتاحة'}
            </p>
            <Link
              href="/business-jobs"
              className="bg-ray-blue text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition"
            >
              استكشف الوظائف
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredApplications.map(application => (
              <div key={application.id} className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  {/* Application Info */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-bold text-gray-900">{application.applicationNumber}</h3>
                        <p className="text-lg font-medium text-gray-800 mt-1">{application.jobTitle}</p>
                        <p className="text-sm text-gray-600">{application.company}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(application.status)}`}>
                        {getStatusLabel(application.status)}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-gray-600 mb-3">
                      <div className="flex items-center gap-2">
                        <Building className="w-4 h-4" />
                        <span>{application.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Briefcase className="w-4 h-4" />
                        <span>{application.type}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>تقدمت في: {application.appliedDate}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-gray-900">{application.salary}</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <Link
                      href={`/business-jobs/${application.jobId}`}
                      className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition flex items-center gap-2"
                    >
                      <ExternalLink className="w-4 h-4" />
                      عرض الوظيفة
                    </Link>
                    <button 
                      onClick={() => setSelectedApplication(application)}
                      className="px-4 py-2 bg-ray-blue text-white rounded-lg hover:bg-blue-600 transition"
                    >
                      تفاصيل الطلب
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Application Details Modal */}
      {selectedApplication && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">تفاصيل الطلب</h2>
                <button
                  onClick={() => setSelectedApplication(null)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition"
                >
                  <ChevronLeft className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              {/* Application Info */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg">{selectedApplication.applicationNumber}</h3>
                    <p className="text-gray-600">{selectedApplication.company}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedApplication.status)}`}>
                    {getStatusLabel(selectedApplication.status)}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">الوظيفة:</span>
                    <p className="font-medium">{selectedApplication.jobTitle}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">القسم:</span>
                    <p className="font-medium">{selectedApplication.department}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">الموقع:</span>
                    <p className="font-medium">{selectedApplication.location}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">النوع:</span>
                    <p className="font-medium">{selectedApplication.type}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">تاريخ التقديم:</span>
                    <p className="font-medium">{selectedApplication.appliedDate}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">الراتب:</span>
                    <p className="font-medium">{selectedApplication.salary}</p>
                  </div>
                </div>
              </div>

              {/* Job Description */}
              <div className="mb-6">
                <h4 className="font-bold text-gray-900 mb-4">وصف الوظيفة</h4>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                      <Briefcase className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <h5 className="font-medium">{selectedApplication.jobTitle}</h5>
                      <p className="text-sm text-gray-600">فرصة ممتازة للتطور المهني</p>
                    </div>
                  </div>
                  <div className="text-sm text-gray-600">
                    <p>• بيئة عمل محفزة وداعمة</p>
                    <p>• فرص للتدريب والتطوير</p>
                    <p>• حزمة مزايا تنافسية</p>
                    <p>• توازن بين العمل والحياة</p>
                  </div>
                </div>
              </div>

              {/* Requirements */}
              <div className="mb-6">
                <h4 className="font-bold text-gray-900 mb-4">المتطلبات</h4>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <ul className="text-sm text-gray-600 space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="text-ray-blue mt-1">•</span>
                      <span>خبرة لا تقل عن 3 سنوات في المجال</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-ray-blue mt-1">•</span>
                      <span>إجادة اللغتين العربية والإنجليزية</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-ray-blue mt-1">•</span>
                      <span>مهارات قوية في التواصل والعمل الجماعي</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-ray-blue mt-1">•</span>
                      <span>قدرة على العمل تحت الضغط</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Timeline */}
              <div>
                <h4 className="font-bold text-gray-900 mb-4">تتبع الطلب</h4>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <div>
                      <p className="font-medium">تم استلام الطلب</p>
                      <p className="text-sm text-gray-600">{selectedApplication.appliedDate}، 9:00 ص</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <div>
                      <p className="font-medium">قيد المراجعة</p>
                      <p className="text-sm text-gray-600">{selectedApplication.appliedDate}، 2:00 م</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                    <div>
                      <p className="font-medium text-gray-500">نتيجة المراجعة</p>
                      <p className="text-sm text-gray-400">خلال 5-7 أيام عمل</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-6 border-t border-gray-200">
              {isWithdrawing ? (
                <div className="space-y-4">
                  <h3 className="font-bold text-gray-900">سحب الطلب</h3>
                  
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
                      <div>
                        <h4 className="font-bold text-yellow-900 mb-1">تأكيد سحب الطلب</h4>
                        <p className="text-yellow-700 text-sm">
                          هل أنت متأكد من سحب طلبك لمنصب &quot;{selectedApplication?.jobTitle}&quot; في شركة &quot;{selectedApplication?.company}&quot;؟
                          هذا الإجراء لا يمكن التراجع عنه.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      سبب السحب (اختياري)
                    </label>
                    <textarea
                      value={withdrawReason}
                      onChange={(e) => setWithdrawReason(e.target.value)}
                      placeholder="أدخل سبب سحب الطلب..."
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ray-blue"
                    />
                  </div>
                  
                  <div className="flex gap-3">
                    <button
                      onClick={handleCancelWithdraw}
                      className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
                    >
                      إلغاء
                    </button>
                    <button
                      onClick={handleConfirmWithdraw}
                      className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                    >
                      تأكيد السحب
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex gap-3">
                  <button
                    onClick={() => setSelectedApplication(null)}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
                  >
                    إغلاق
                  </button>
                  <button 
                    onClick={handleWithdrawApplication}
                    className="flex-1 px-4 py-2 bg-ray-blue text-white rounded-lg hover:bg-blue-600 transition"
                  >
                    سحب الطلب
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
