'use client';

import React, { useEffect, useState } from 'react';
import { 
  Briefcase, Search, Filter, Download, Eye, Edit, Trash2,
  Plus, MapPin, DollarSign, Clock, Calendar, Building,
  Users, TrendingUp, CheckCircle, XCircle, AlertCircle,
  FileText, Award, Target, Zap
} from 'lucide-react';
import Link from 'next/link';
import { createJob, fetchJobs } from '../../../services/jobsService';

interface Job {
  id: string;
  title: string;
  department: string;
  location: string;
  type: 'full-time' | 'part-time' | 'contract' | 'internship';
  salary: {
    min: number;
    max: number;
    currency: string;
  };
  postedDate: string;
  description: string;
  requirements: string[];
  benefits: string[];
  company: string;
  urgent: boolean;
}

export default function AdminJobs() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [creating, setCreating] = useState(false);

  const loadJobs = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchJobs();
      
      // Map backend Job model to frontend interface
      const mapped: Job[] = data.map((job: any) => {
        // Parse salary string like "15000-20000" or "15000"
        let salaryMin = 0;
        let salaryMax = 0;
        const salaryStr = job.salary || '';
        const salaryParts = salaryStr.split('-');
        if (salaryParts.length === 2) {
          salaryMin = parseInt(salaryParts[0].trim()) || 0;
          salaryMax = parseInt(salaryParts[1].trim()) || 0;
        } else if (salaryParts.length === 1) {
          salaryMin = parseInt(salaryParts[0].trim()) || 0;
          salaryMax = salaryMin;
        }

        return {
          id: job.id || job._id,
          title: job.title,
          department: job.category || 'عام',
          location: job.location,
          type: job.type,
          salary: {
            min: salaryMin,
            max: salaryMax,
            currency: 'ج.م'
          },
          postedDate: job.posted || new Date().toISOString().split('T')[0],
          description: job.description,
          requirements: job.requirements || [],
          benefits: job.benefits || [],
          company: job.company,
          urgent: job.urgent || false
        };
      });
      
      setJobs(mapped);
    } catch (e: any) {
      console.error('Failed to load jobs:', e);
      setError(e?.message || 'فشل تحميل الوظائف');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadJobs();
  }, []);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [selectedType, setSelectedType] = useState('all');

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = selectedDepartment === 'all' || job.department === selectedDepartment;
    const matchesType = selectedType === 'all' || job.type === selectedType;
    
    return matchesSearch && matchesDepartment && matchesType;
  });

  const handleCreateJob = async () => {
    const title = window.prompt('عنوان الوظيفة:');
    if (!title) return;
    const company = window.prompt('اسم الشركة:');
    if (!company) return;
    const location = window.prompt('الموقع:');
    if (!location) return;
    const typeInput = window.prompt('النوع: full-time / part-time / contract / internship', 'full-time');
    const type = (typeInput === 'part-time' || typeInput === 'contract' || typeInput === 'internship' ? typeInput : 'full-time') as any;
    const category = window.prompt('القسم/الفئة:', 'عام') || 'عام';
    const salary = window.prompt('الراتب (مثال 15000-20000 أو 15000):', '');
    const posted = new Date().toISOString().split('T')[0];
    const description = window.prompt('وصف الوظيفة:', '') || '';
    const urgent = window.confirm('هل الوظيفة عاجلة؟');

    try {
      setCreating(true);
      setError(null);
      await createJob({
        title,
        company,
        location,
        type,
        category,
        salary: salary || '0',
        posted,
        description,
        urgent
      });
      await loadJobs();
    } catch (e: any) {
      console.error('Failed to create job:', e);
      setError(e?.message || 'فشل إضافة الوظيفة');
    } finally {
      setCreating(false);
    }
  };

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

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white border-b border-gray-200">
          <div className="px-6 py-4">
            <h1 className="text-2xl font-bold text-gray-900">الوظائف</h1>
          </div>
        </div>
        <div className="p-6">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 text-center text-gray-600">
            جاري تحميل الوظائف...
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white border-b border-gray-200">
          <div className="px-6 py-4">
            <h1 className="text-2xl font-bold text-gray-900">الوظائف</h1>
          </div>
        </div>
        <div className="p-6">
          <div className="bg-red-50 rounded-xl p-6 border border-red-200 text-red-700 text-center">
            {error}
            <button onClick={loadJobs} className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
              إعادة المحاولة
            </button>
          </div>
        </div>
      </div>
    );
  }

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
              <button onClick={handleCreateJob} disabled={creating} className="bg-ray-blue text-white px-4 py-2 rounded-lg hover:bg-blue-600 disabled:opacity-60 disabled:cursor-not-allowed transition flex items-center gap-2">
                <Plus className="w-4 h-4" />
                إضافة وظيفة
              </button>
              <button disabled className="border border-gray-300 px-4 py-2 rounded-lg opacity-60 cursor-not-allowed transition flex items-center gap-2">
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
              {jobs.length}
            </span>
          </div>
          <h3 className="text-sm text-gray-600">إجمالي الوظائف</h3>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <span className="text-2xl font-bold text-gray-900">
              N/A
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
              N/A
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
            
            <select disabled value="all" className="px-4 py-2 border border-gray-300 rounded-lg opacity-60 cursor-not-allowed">
              <option value="all">كل الحالات</option>
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
            
            <button disabled className="border border-gray-300 px-4 py-2 rounded-lg opacity-60 cursor-not-allowed transition flex items-center gap-2">
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
                {filteredJobs.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-12 text-center text-gray-600">
                      لا توجد وظائف متاحة حالياً
                    </td>
                  </tr>
                ) : (
                  filteredJobs.map((job) => (
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
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {job.salary.min.toLocaleString()} - {job.salary.max.toLocaleString()} {job.salary.currency}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-gray-400" />
                        N/A
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={getStatusBadge('')}>
                        N/A
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      N/A
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center gap-2">
                        <button disabled className="text-ray-blue opacity-60 cursor-not-allowed transition">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button disabled className="text-gray-600 opacity-60 cursor-not-allowed transition">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button disabled className="text-red-600 opacity-60 cursor-not-allowed transition">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
