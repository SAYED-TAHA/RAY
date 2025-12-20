'use client';

import React, { useState, useEffect } from 'react';
import { 
  Search, MapPin, Building, Clock, DollarSign, 
  Calendar, Briefcase, Filter, ChevronDown, 
  Heart, ExternalLink, Users, Star, TrendingUp
} from 'lucide-react';
import Link from 'next/link';
import { API_URL } from '@/utils/api';

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: 'full-time' | 'part-time' | 'contract' | 'internship';
  category: string;
  salary: string;
  posted: string;
  description: string;
  requirements: string[];
  benefits: string[];
  logo: string;
  rating: number;
  reviews: number;
  urgent: boolean;
  featured: boolean;
}

const categories = [
  'الكل', 'مطاعم', 'صالونات', 'أندية رياضية', 'مراكز طبية', 
  'محلات تجارية', 'شركات تقنية', 'خدمات', 'تعليم', 'عقارات'
];

const jobTypes = [
  { value: 'all', label: 'كل الأنواع' },
  { value: 'full-time', label: 'دوام كامل' },
  { value: 'part-time', label: 'دوام جزئي' },
  { value: 'contract', label: 'عقد' },
  { value: 'internship', label: 'تدريب' }
];

export default function BusinessJobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('الكل');
  const [selectedType, setSelectedType] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [savedJobs, setSavedJobs] = useState<string[]>([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`${API_URL}/api/jobs`);
        if (response.ok) {
          const data = await response.json();
          setJobs(data);
        }
      } catch (error) {
        console.error('خطأ في جلب الوظائف:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'الكل' || job.category === selectedCategory;
    const matchesType = selectedType === 'all' || job.type === selectedType;
    
    return matchesSearch && matchesCategory && matchesType;
  });

  const toggleSaveJob = (jobId: string) => {
    setSavedJobs(prev => 
      prev.includes(jobId) 
        ? prev.filter(id => id !== jobId)
        : [...prev, jobId]
    );
  };

  const getTypeLabel = (type: string) => {
    const typeMap = {
      'full-time': 'دوام كامل',
      'part-time': 'دوام جزئي',
      'contract': 'عقد',
      'internship': 'تدريب'
    };
    return typeMap[type as keyof typeof typeMap] || type;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-ray-gold rounded-lg flex items-center justify-center font-black text-slate-900">
                R
              </div>
              <span className="font-bold text-gray-900">RAY Jobs</span>
            </Link>
            
            <nav className="hidden md:flex items-center gap-6">
              <Link href="/jobs" className="text-gray-600 hover:text-gray-900 transition">
                وظائف راي
              </Link>
              <Link href="/business-jobs" className="text-ray-blue font-medium">
                وظائف الأنشطة
              </Link>
              <Link href="/post-job" className="bg-ray-blue text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">
                انشر وظيفة
              </Link>
            </nav>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-br from-ray-blue to-blue-600 text-white py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            وظائف في <span className="text-ray-gold">الأنشطة التجارية</span>
          </h1>
          <p className="text-xl mb-8 text-blue-100">
            فرص عمل متنوعة في أفضل الأنشطة التجارية والخدمية في مصر
          </p>
          
          {/* Search Bar */}
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg p-2 flex items-center gap-2">
              <Search className="w-6 h-6 text-gray-400 mr-2" />
              <input
                type="text"
                placeholder="ابحث عن وظيفة، شركة، أو كلمة مفتاحية..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1 px-4 py-3 text-gray-900 placeholder-gray-500 outline-none"
              />
              <button className="bg-ray-gold text-slate-900 px-6 py-3 rounded-lg font-bold hover:bg-yellow-400 transition">
                بحث
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border-b border-gray-200 sticky top-16 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2">
              {/* Categories */}
              <div className="flex items-center gap-2 overflow-x-auto">
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition ${
                      selectedCategory === category
                        ? 'bg-ray-blue text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-4">
              {/* Job Types */}
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ray-blue"
              >
                {jobTypes.map(type => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>

              {/* Mobile Filter Toggle */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="md:hidden flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg"
              >
                <Filter className="w-4 h-4" />
                فلاتر
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              {filteredJobs.length} وظيفة متاحة
            </h2>
            <p className="text-gray-600 mt-1">
              {selectedCategory !== 'الكل' && `${selectedCategory} • `}
              {selectedType !== 'all' && `${getTypeLabel(selectedType)} • `}
              {searchTerm && `"${searchTerm}"`}
            </p>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span>ترتيب حسب:</span>
            <select className="border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-ray-blue">
              <option>الأحدث</option>
              <option>الأكثر طلباً</option>
              <option>الراتب</option>
            </select>
          </div>
        </div>

        {/* Jobs Grid */}
        <div className="grid gap-6">
          {filteredJobs.map(job => (
            <div key={job.id} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
              <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                {/* Company Info */}
                <div className="flex-shrink-0">
                  <img
                    src={job.logo}
                    alt={job.company}
                    className="w-16 h-16 rounded-xl object-cover"
                  />
                </div>

                {/* Job Details */}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        {job.urgent && (
                          <span className="bg-red-100 text-red-700 px-2 py-1 rounded text-xs font-bold">
                            عاجل
                          </span>
                        )}
                        {job.featured && (
                          <span className="bg-ray-gold text-slate-900 px-2 py-1 rounded text-xs font-bold">
                            مميز
                          </span>
                        )}
                        <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-medium">
                          {job.category}
                        </span>
                      </div>
                      
                      <h3 className="text-xl font-bold text-gray-900 mb-1">{job.title}</h3>
                      <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                        <div className="flex items-center gap-1">
                          <Building className="w-4 h-4" />
                          {job.company}
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {job.location}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {getTypeLabel(job.type)}
                        </div>
                      </div>
                      
                      <p className="text-gray-700 mb-3 line-clamp-2">{job.description}</p>
                      
                      <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-1 text-green-600 font-medium">
                          <DollarSign className="w-4 h-4" />
                          {job.salary}
                        </div>
                        <div className="flex items-center gap-1 text-gray-500">
                          <Calendar className="w-4 h-4" />
                          {job.posted}
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-500" />
                          <span className="font-medium">{job.rating}</span>
                          <span className="text-gray-500">({job.reviews})</span>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col gap-2 lg:items-end">
                      <button
                        onClick={() => toggleSaveJob(job.id)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition ${
                          savedJobs.includes(job.id)
                            ? 'bg-ray-gold text-slate-900 border-ray-gold'
                            : 'border-gray-300 text-gray-700 hover:border-gray-400'
                        }`}
                      >
                        <Heart className={`w-4 h-4 ${savedJobs.includes(job.id) ? 'fill-current' : ''}`} />
                        {savedJobs.includes(job.id) ? 'محفوظ' : 'حفظ'}
                      </button>
                      
                      <Link
                        href={`/business-jobs/${job.id}`}
                        className="bg-ray-blue text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-600 transition text-center"
                      >
                        التقدم للوظيفة
                      </Link>
                    </div>
                  </div>

                  {/* Requirements Preview */}
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <div className="flex flex-wrap gap-2">
                      {job.requirements.slice(0, 3).map((req, idx) => (
                        <span key={idx} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                          {req}
                        </span>
                      ))}
                      {job.requirements.length > 3 && (
                        <span className="text-gray-500 text-sm">
                          +{job.requirements.length - 3} متطلبات أخرى
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredJobs.length === 0 && (
          <div className="text-center py-16">
            <Briefcase className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">لا توجد وظائف مطابقة</h3>
            <p className="text-gray-600 mb-6">
              جرب تغيير الفلاتر أو كلمات البحث
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('الكل');
                setSelectedType('all');
              }}
              className="bg-ray-blue text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition"
            >
              مسح الفلاتر
            </button>
          </div>
        )}
      </div>

      {/* Footer CTA */}
      <div className="bg-gray-900 text-white py-16 px-4 mt-16">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">
            أصحاب الأنشطة التجارية؟
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            انشر وظائفك ووصل لأفضل المواهب في مجالك
          </p>
          <Link
            href="/post-job"
            className="bg-ray-gold text-slate-900 px-8 py-4 rounded-xl font-bold hover:bg-yellow-400 transition inline-flex items-center gap-2"
          >
            <Briefcase className="w-5 h-5" />
            انشر وظيفة الآن
          </Link>
        </div>
      </div>
    </div>
  );
}
