'use client';

import React, { useState } from 'react';
import { 
  FileText, Image, Video, Music, Plus, Edit, Trash2,
  Search, Filter, Download, Eye, Calendar, Tag,
  FolderOpen, Upload, Link2, Clock, CheckCircle
} from 'lucide-react';
import Link from 'next/link';

interface ContentItem {
  id: string;
  title: string;
  type: 'article' | 'image' | 'video' | 'audio' | 'document';
  category: string;
  status: 'published' | 'draft' | 'archived';
  views: number;
  created: string;
  modified: string;
  size?: string;
  duration?: string;
  author: string;
}

export default function AdminContent() {
  const content: ContentItem[] = [];

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const filteredContent = content.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'all' || item.type === selectedType;
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesStatus = selectedStatus === 'all' || item.status === selectedStatus;
    
    return matchesSearch && matchesType && matchesCategory && matchesStatus;
  });

  const getTypeBadge = (type: string) => {
    switch (type) {
      case 'article':
        return 'bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-bold';
      case 'image':
        return 'bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-bold';
      case 'video':
        return 'bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-xs font-bold';
      case 'audio':
        return 'bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full text-xs font-bold';
      case 'document':
        return 'bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs font-bold';
      default:
        return 'bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs font-bold';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'published':
        return 'bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-bold';
      case 'draft':
        return 'bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full text-xs font-bold';
      case 'archived':
        return 'bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs font-bold';
      default:
        return 'bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs font-bold';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'article': return <FileText className="w-4 h-4" />;
      case 'image': return <Image className="w-4 h-4" />;
      case 'video': return <Video className="w-4 h-4" />;
      case 'audio': return <Music className="w-4 h-4" />;
      case 'document': return <FileText className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'article': return 'مقال';
      case 'image': return 'صورة';
      case 'video': return 'فيديو';
      case 'audio': return 'صوت';
      case 'document': return 'مستند';
      default: return type;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'published': return 'منشور';
      case 'draft': return 'مسودة';
      case 'archived': return 'مؤرشف';
      default: return status;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/admin" className="text-gray-600 hover:text-gray-900 transition">
                ← لوحة التحكم
              </Link>
              <h1 className="text-2xl font-bold text-gray-900">المحتوى</h1>
            </div>
            <div className="flex items-center gap-4">
              <button disabled className="bg-ray-blue text-white px-4 py-2 rounded-lg opacity-60 cursor-not-allowed flex items-center gap-2">
                <Plus className="w-4 h-4" />
                إضافة محتوى
              </button>
              <button disabled className="border border-gray-300 px-4 py-2 rounded-lg opacity-60 cursor-not-allowed flex items-center gap-2">
                <Upload className="w-4 h-4" />
                رفع ملفات
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white border-b border-gray-200">
        <div className="px-6 py-4">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="بحث بالعنوان أو المؤلف..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ray-blue"
              />
            </div>
            
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ray-blue"
            >
              <option value="all">كل الأنواع</option>
              <option value="article">مقال</option>
              <option value="image">صورة</option>
              <option value="video">فيديو</option>
              <option value="audio">صوت</option>
              <option value="document">مستند</option>
            </select>
            
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ray-blue"
            >
              <option value="all">كل الفئات</option>
              <option value="دليل">دليل</option>
              <option value="علامات تجارية">علامات تجارية</option>
              <option value="فيديوهات">فيديوهات</option>
              <option value="صوتيات">صوتيات</option>
              <option value="قانوني">قانوني</option>
            </select>
            
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ray-blue"
            >
              <option value="all">كل الحالات</option>
              <option value="published">منشور</option>
              <option value="draft">مسودة</option>
              <option value="archived">مؤرشف</option>
            </select>
            
            <button disabled className="border border-gray-300 px-4 py-2 rounded-lg opacity-60 cursor-not-allowed flex items-center gap-2">
              <Filter className="w-4 h-4" />
              فلاتر متقدمة
            </button>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    المحتوى
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    النوع
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    الحالة
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    المشاهدات
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    المؤلف
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    التاريخ
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    إجراءات
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredContent.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-12 text-center text-gray-600">
                      لا يوجد محتوى حالياً. سيتم تفعيل إدارة المحتوى عند ربطها بقاعدة البيانات.
                    </td>
                  </tr>
                ) : (
                  filteredContent.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50 transition">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="p-2 bg-gray-100 rounded-lg ml-3">
                            {getTypeIcon(item.type)}
                          </div>
                          <div>
                            <div className="text-sm font-medium text-gray-900">{item.title}</div>
                            <div className="text-sm text-gray-500">{item.category}</div>
                            {item.duration && (
                              <div className="text-xs text-gray-400">المدة: {item.duration}</div>
                            )}
                            {item.size && (
                              <div className="text-xs text-gray-400">الحجم: {item.size}</div>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={getTypeBadge(item.type)}>
                          {getTypeLabel(item.type)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={getStatusBadge(item.status)}>
                          {getStatusLabel(item.status)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {item.views.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {item.author}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div>
                          <div>إنشاء: {item.created}</div>
                          <div>تعديل: {item.modified}</div>
                        </div>
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
