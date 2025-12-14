'use client';

import React, { useState, useEffect } from 'react';
import { 
  MessageSquare, Search, Filter, Download, Eye, Edit, Trash2,
  Send, Reply, Forward, Star, Clock, CheckCircle, CheckCheck,
  User, Mail, Phone, Calendar, AlertCircle, Archive,
  Plus, RefreshCw, Paperclip, Smile, Mic, Camera, Image,
  Users, Settings, Bell, X, Check, ChevronDown, MoreVertical, Loader
} from 'lucide-react';
import Link from 'next/link';

interface Message {
  id: string;
  sender: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  date: string;
  status: string;
  priority: string;
  category: string;
  attachments: number;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export default function AdminMessages() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [replyText, setReplyText] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`${API_URL}/api/admin/messages`);
        if (response.ok) {
          const data = await response.json();
          setMessages(data);
        }
      } catch (error) {
        console.error('خطأ في جلب الرسائل:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMessages();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center h-64">
            <div className="flex items-center gap-3">
              <Loader className="w-6 h-6 animate-spin text-blue-600" />
              <span className="text-gray-600">جاري تحميل الرسائل...</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const filteredMessages = messages.filter(msg => {
    const matchesSearch = msg.sender.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         msg.subject.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         msg.message.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || msg.status === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  const categories = [
    { id: 'all', label: 'جميع الرسائل', count: messages.length },
    { id: 'inquiry', label: 'استفسارات', count: messages.filter(m => m.category === 'inquiry').length },
    { id: 'complaint', label: 'شكاوى', count: messages.filter(m => m.category === 'complaint').length },
    { id: 'feedback', label: 'ملاحظات', count: messages.filter(m => m.category === 'feedback').length },
    { id: 'refund', label: 'استرداد', count: messages.filter(m => m.category === 'refund').length }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'unread':
        return 'bg-blue-100 text-blue-800';
      case 'read':
        return 'bg-gray-100 text-gray-800';
      case 'replied':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'unread':
        return 'غير مقروء';
      case 'read':
        return 'مقروء';
      case 'replied':
        return 'تم الرد';
      case 'pending':
        return 'معلق';
      default:
        return status;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityText = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'عالية';
      case 'medium':
        return 'متوسطة';
      case 'low':
        return 'منخفضة';
      default:
        return priority;
    }
  };

  const getCategoryText = (category: string) => {
    switch (category) {
      case 'inquiry':
        return 'استفسار';
      case 'complaint':
        return 'شكوى';
      case 'feedback':
        return 'ملاحظة';
      case 'refund':
        return 'استرداد';
      default:
        return category;
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
                <MessageSquare className="w-6 h-6 text-gray-600" />
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">الرسائل</h1>
                <p className="text-sm text-gray-600">التواصل مع المستخدمين</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                <Plus className="w-4 h-4" />
                رسالة جديدة
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Messages List */}
          <div className="lg:col-span-2">
            {/* Search and Filter */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 mb-6">
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute right-3 top-3 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="بحث في الرسائل..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pr-10 pl-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <select
                  value={selectedFilter}
                  onChange={(e) => setSelectedFilter(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>
                      {cat.label} ({cat.count})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Messages */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="divide-y divide-gray-200">
                {filteredMessages.map((message) => (
                  <div
                    key={message.id}
                    onClick={() => setSelectedMessage(message)}
                    className={`p-6 cursor-pointer hover:bg-gray-50 transition ${
                      selectedMessage?.id === message.id ? 'bg-blue-50 border-l-4 border-blue-500' : ''
                    }`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                          <User className="w-5 h-5 text-gray-600" />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">{message.sender}</h3>
                          <p className="text-sm text-gray-600">{message.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPriorityBadge(message.priority)}`}>
                          {getPriorityText(message.priority)}
                        </span>
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(message.status)}`}>
                          {getStatusText(message.status)}
                        </span>
                      </div>
                    </div>
                    
                    <h4 className="font-medium text-gray-900 mb-2">{message.subject}</h4>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">{message.message}</p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <span>{message.date}</span>
                        <span>{getCategoryText(message.category)}</span>
                        {message.attachments > 0 && (
                        <span className="flex items-center gap-1">
                          <Paperclip className="w-3 h-3" />
                          {message.attachments}
                        </span>
                      )}  
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Message Detail */}
          <div className="lg:col-span-1">
            {selectedMessage ? (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                        <User className="w-6 h-6 text-gray-600" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">{selectedMessage.sender}</h3>
                        <p className="text-sm text-gray-600">{selectedMessage.email}</p>
                        <p className="text-xs text-gray-500">{selectedMessage.phone}</p>
                      </div>
                    </div>
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition">
                      <MoreVertical className="w-4 h-4 text-gray-600" />
                    </button>
                  </div>
                  
                  <div className="flex items-center gap-2 mb-4">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(selectedMessage.status)}`}>
                      {getStatusText(selectedMessage.status)}
                    </span>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPriorityBadge(selectedMessage.priority)}`}>
                      {getPriorityText(selectedMessage.priority)}
                    </span>
                    <span className="text-xs text-gray-500">{selectedMessage.date}</span>
                  </div>
                  
                  <h4 className="font-bold text-gray-900 mb-2">{selectedMessage.subject}</h4>
                </div>
                
                <div className="p-6">
                  <p className="text-gray-700 mb-6">{selectedMessage.message}</p>
                  
                  {selectedMessage.attachments > 0 && (
                    <div className="mb-6">
                      <h5 className="text-sm font-medium text-gray-900 mb-2">المرفقات</h5>
                      <div className="space-y-2">
                        {[...Array(selectedMessage.attachments)].map((_, i) => (
                          <div key={i} className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                            <Paperclip className="w-4 h-4 text-gray-600" />
                            <span className="text-sm text-gray-700">مرفق {i + 1}.pdf</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* Quick Actions */}
                  <div className="flex gap-2 mb-6">
                    <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                      <Reply className="w-4 h-4" />
                      رد
                    </button>
                    <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition">
                      <Forward className="w-4 h-4" />
                      تحويل
                    </button>
                    <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition">
                      <Archive className="w-4 h-4" />
                      أرشفة
                    </button>
                  </div>
                  
                  {/* Reply Box */}
                  <div className="border-t border-gray-200 pt-4">
                    <h5 className="text-sm font-medium text-gray-900 mb-3">رد سريع</h5>
                    <div className="space-y-3">
                      <textarea
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        placeholder="اكتب ردك هنا..."
                        rows={4}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <button className="p-2 hover:bg-gray-100 rounded-lg transition">
                            <Paperclip className="w-4 h-4 text-gray-600" />
                          </button>
                          <button className="p-2 hover:bg-gray-100 rounded-lg transition">
                            <Image className="w-4 h-4 text-gray-600" />
                          </button>
                          <button className="p-2 hover:bg-gray-100 rounded-lg transition">
                            <Smile className="w-4 h-4 text-gray-600" />
                          </button>
                        </div>
                        
                        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                          <Send className="w-4 h-4" />
                          إرسال
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
                <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">اختر رسالة للعرض</h3>
                <p className="text-sm text-gray-600">اختر رسالة من القائمة لعرض التفاصيل والرد</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
