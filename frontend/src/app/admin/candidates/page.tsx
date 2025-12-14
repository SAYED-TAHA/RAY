'use client';

import React, { useState } from 'react';
import { 
  UserCheck, Search, Filter, Download, Eye, Edit, Trash2,
  CheckCircle, XCircle, Clock, AlertCircle, Calendar,
  User, Mail, Phone, MapPin, Briefcase, DollarSign,
  Star, TrendingUp, Users, Building, GraduationCap,
  Award, Target, RefreshCw, Plus, ChevronDown, MoreVertical,
  MessageSquare, Video, FileText, Shield
} from 'lucide-react';
import Link from 'next/link';

export default function AdminCandidates() {
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedStage, setSelectedStage] = useState('all');

  const candidates = [
    {
      id: 'CAN001',
      name: 'أحمد محمد السيد',
      email: 'ahmed.mohamed@email.com',
      phone: '+20 123 456 7890',
      position: 'Senior Frontend Developer',
      department: 'التقنية',
      experience: '5 سنوات',
      education: 'بكالوريوس هندسة البرمجيات',
      location: 'القاهرة، مصر',
      expectedSalary: '25000',
      currentSalary: '18000',
      status: 'interview',
      stage: 'technical_interview',
      date: '2025-12-05',
      rating: 4.8,
      skills: ['React', 'TypeScript', 'Next.js', 'Node.js', 'MongoDB']
    },
    {
      id: 'CAN002',
      name: 'سارة أحمد عبدالله',
      email: 'sara.ahmed@email.com',
      phone: '+20 987 654 3210',
      position: 'UI/UX Designer',
      department: 'التصميم',
      experience: '3 سنوات',
      education: 'ماجستير تصميم جرافيك',
      location: 'الإسكندرية، مصر',
      expectedSalary: '18000',
      currentSalary: '12000',
      status: 'reviewing',
      stage: 'portfolio_review',
      date: '2025-12-04',
      rating: 4.6,
      skills: ['Figma', 'Adobe XD', 'Sketch', 'Prototyping']
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'interview':
        return 'bg-purple-100 text-purple-800';
      case 'reviewing':
        return 'bg-blue-100 text-blue-800';
      case 'accepted':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'interview':
        return 'مقابلة';
      case 'reviewing':
        return 'قيد المراجعة';
      case 'accepted':
        return 'مقبول';
      case 'rejected':
        return 'مرفوض';
      default:
        return status;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link href="/admin" className="p-2 hover:bg-gray-100 rounded-lg transition">
                <UserCheck className="w-6 h-6 text-gray-600" />
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">المتقدمون</h1>
                <p className="text-sm text-gray-600">إدارة المتقدمين للوظائف</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                <Plus className="w-4 h-4" />
                إضافة متقدم
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 mb-6">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute right-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="بحث عن متقدمين..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pr-10 pl-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Candidates Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {candidates.map((candidate) => (
            <div key={candidate.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-gray-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{candidate.name}</h3>
                    <p className="text-sm text-gray-600">{candidate.position}</p>
                  </div>
                </div>
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(candidate.status)}`}>
                  {getStatusText(candidate.status)}
                </span>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-xs text-gray-500">البريد الإلكتروني</p>
                  <p className="text-sm text-gray-900">{candidate.email}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">الهاتف</p>
                  <p className="text-sm text-gray-900">{candidate.phone}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">الخبرة</p>
                  <p className="text-sm text-gray-900">{candidate.experience}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">الراتب المتوقع</p>
                  <p className="text-sm text-gray-900">{candidate.expectedSalary} ج</p>
                </div>
              </div>
              
              <div className="mb-4">
                <p className="text-xs text-gray-500 mb-2">المهارات</p>
                <div className="flex flex-wrap gap-2">
                  {candidate.skills.map((skill, index) => (
                    <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <span className="text-sm text-gray-900">{candidate.rating}</span>
                </div>
                <div className="flex items-center gap-2">
                  <button className="p-2 hover:bg-gray-100 rounded-lg transition">
                    <Eye className="w-4 h-4 text-gray-600" />
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded-lg transition">
                    <MessageSquare className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
