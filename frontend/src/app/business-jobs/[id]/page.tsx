'use client';

import React, { useEffect, useState } from 'react';
import { 
  ArrowLeft, MapPin, Clock, DollarSign, Calendar, 
  Building, Users, Briefcase, Heart, ExternalLink,
  Phone, Mail, Send, CheckCircle, AlertCircle, Star
} from 'lucide-react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
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
  responsibilities: string[];
  logo: string;
  rating: number;
  reviews: number;
  urgent: boolean;
  featured: boolean;
  contactInfo: {
    phone: string;
    email: string;
    website?: string;
  };
  companyInfo: {
    size: string;
    founded: string;
    industry: string;
  };
}

export default function JobDetailPage() {
  const router = useRouter();
  const params = useParams();
  const jobId = Array.isArray(params.id) ? params.id[0] : params.id;
  
  const [job, setJob] = useState<Job | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaved, setIsSaved] = useState(false);
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [applicationData, setApplicationData] = useState({
    name: '',
    email: '',
    phone: '',
    experience: '',
    coverLetter: '',
    cvFile: null as File | null
  });

  useEffect(() => {
    const fetchJob = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`${API_URL}/api/jobs/${jobId}`);
        if (response.ok) {
          const data = await response.json();
          setJob(data);
        }
      } catch (error) {
        console.error('خطأ في جلب الوظيفة:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (jobId) {
      fetchJob();
    }
  }, [jobId]);

  const handleApply = () => {
    setShowApplicationForm(true);
  };

  const handleSubmitApplication = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle application submission
    console.log('Application submitted:', applicationData);
    // Show success message and redirect
    alert('تم إرسال طلبك بنجاح! سنتواصل معك قريباً.');
    router.push('/business-jobs');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setApplicationData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setApplicationData(prev => ({
        ...prev,
        cvFile: file
      }));
    }
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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-600">جاري تحميل الوظيفة...</div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <Link href="/business-jobs" className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition">
                <ArrowLeft className="w-5 h-5" />
                العودة للوظائف
              </Link>
            </div>
          </div>
        </div>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-white rounded-xl border border-gray-200 p-6 text-center text-gray-700">
            الوظيفة غير موجودة
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/business-jobs" className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition">
              <ArrowLeft className="w-5 h-5" />
              العودة للوظائف
            </Link>
            
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsSaved(!isSaved)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition ${
                  isSaved
                    ? 'bg-ray-gold text-slate-900 border-ray-gold'
                    : 'border-gray-300 text-gray-700 hover:border-gray-400'
                }`}
              >
                <Heart className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
                {isSaved ? 'محفوظ' : 'حفظ الوظيفة'}
              </button>
              
              <button
                onClick={handleApply}
                className="bg-ray-blue text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-600 transition"
              >
                التقدم للوظيفة
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Application Form Modal */}
      {showApplicationForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">التقدم لوظيفة {job.title}</h2>
              <p className="text-gray-600 mt-1">في {job.company}</p>
            </div>
            
            <form onSubmit={handleSubmitApplication} className="p-6 space-y-6">
              {/* Personal Information */}
              <div>
                <h3 className="font-bold text-gray-900 mb-4">المعلومات الشخصية</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      الاسم الكامل *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={applicationData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ray-blue"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      البريد الإلكتروني *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={applicationData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ray-blue"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      رقم الهاتف *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={applicationData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ray-blue"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      سنوات الخبرة *
                    </label>
                    <select
                      name="experience"
                      value={applicationData.experience}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ray-blue"
                    >
                      <option value="">اختر...</option>
                      <option value="0-1">أقل من سنة</option>
                      <option value="1-3">1-3 سنوات</option>
                      <option value="3-5">3-5 سنوات</option>
                      <option value="5+">أكثر من 5 سنوات</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Cover Letter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  رسالة تعريفية
                </label>
                <textarea
                  name="coverLetter"
                  value={applicationData.coverLetter}
                  onChange={handleInputChange}
                  rows={4}
                  placeholder="اخبرنا لماذا أنت مناسب لهذه الوظيفة..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ray-blue"
                />
              </div>

              {/* CV Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  السيرة الذاتية (CV) *
                </label>
                <input
                  type="file"
                  name="cvFile"
                  onChange={handleFileChange}
                  accept=".pdf,.doc,.docx"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ray-blue"
                />
                <p className="text-sm text-gray-500 mt-1">
                  صيغ مقبولة: PDF, DOC, DOCX (الحد الأقصى: 5MB)
                </p>
              </div>

              {/* Form Actions */}
              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setShowApplicationForm(false)}
                  className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-ray-blue text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-600 transition flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  إرسال الطلب
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Job Details */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Job Header */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-start gap-4 mb-6">
                <img
                  src={job.logo}
                  alt={job.company}
                  className="w-20 h-20 rounded-xl object-cover"
                />
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    {job.urgent && (
                      <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-bold">
                        عاجل
                      </span>
                    )}
                    {job.featured && (
                      <span className="bg-ray-gold text-slate-900 px-3 py-1 rounded-full text-sm font-bold">
                        مميز
                      </span>
                    )}
                    <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                      {job.category}
                    </span>
                  </div>
                  
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{job.title}</h1>
                  <div className="flex items-center gap-4 text-gray-600 mb-4">
                    <div className="flex items-center gap-1">
                      <Building className="w-5 h-5" />
                      <span className="font-medium">{job.company}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-5 h-5 text-yellow-500" />
                      <span className="font-medium">{job.rating}</span>
                      <span>({job.reviews} تقييم)</span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div className="flex items-center gap-2 text-gray-600">
                      <MapPin className="w-4 h-4" />
                      {job.location}
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Clock className="w-4 h-4" />
                      {getTypeLabel(job.type)}
                    </div>
                    <div className="flex items-center gap-2 text-green-600 font-medium">
                      <DollarSign className="w-4 h-4" />
                      {job.salary}
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Calendar className="w-4 h-4" />
                    {job.posted}
                  </div>
                  
                  <div className="flex gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
                      <ExternalLink className="w-4 h-4" />
                      مشاركة
                    </button>
                    <button
                      onClick={handleApply}
                      className="bg-ray-blue text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-600 transition"
                    >
                      التقدم للوظيفة
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Job Description */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">وصف الوظيفة</h2>
              <p className="text-gray-700 leading-relaxed">
                {job.description}
              </p>
            </div>

            {/* Responsibilities */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">المهام والمسؤوليات</h2>
              <ul className="space-y-3">
                {job.responsibilities.map((responsibility, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{responsibility}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Requirements */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">المتطلبات</h2>
              <ul className="space-y-3">
                {job.requirements.map((requirement, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{requirement}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Benefits */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">المميزات وال benefits</h2>
              <ul className="space-y-3">
                {job.benefits.map((benefit, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-ray-gold mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Company Info */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="font-bold text-gray-900 mb-4">معلومات الشركة</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-500">حجم الشركة</p>
                  <p className="font-medium">{job.companyInfo.size}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">تأسست</p>
                  <p className="font-medium">{job.companyInfo.founded}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">الصناعة</p>
                  <p className="font-medium">{job.companyInfo.industry}</p>
                </div>
              </div>
            </div>

            {/* Contact Info */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="font-bold text-gray-900 mb-4">معلومات التواصل</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-gray-400" />
                  <a href={`tel:${job.contactInfo.phone}`} className="text-blue-600 hover:underline">
                    {job.contactInfo.phone}
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-gray-400" />
                  <a href={`mailto:${job.contactInfo.email}`} className="text-blue-600 hover:underline">
                    {job.contactInfo.email}
                  </a>
                </div>
                {job.contactInfo.website && (
                  <div className="flex items-center gap-3">
                    <ExternalLink className="w-5 h-5 text-gray-400" />
                    <a href={`https://${job.contactInfo.website}`} className="text-blue-600 hover:underline">
                      {job.contactInfo.website}
                    </a>
                  </div>
                )}
              </div>
            </div>

            {/* Quick Apply */}
            <div className="bg-gradient-to-br from-ray-blue to-blue-600 text-white rounded-xl p-6">
              <h3 className="font-bold mb-2">مهتم بالوظيفة؟</h3>
              <p className="text-blue-100 mb-4 text-sm">
                قدم بطلبك الآن وانضم لفريق العمل
              </p>
              <button
                onClick={handleApply}
                className="w-full bg-white text-ray-blue px-6 py-3 rounded-lg font-bold hover:bg-gray-50 transition"
              >
                التقدم للوظيفة
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
