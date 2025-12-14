'use client';

import React, { useState } from 'react';
import { Calendar, Video, Clock, User, MapPin, Phone, Plus, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import Link from 'next/link';

export default function AdminInterviews() {
  const interviews = [
    { id: 1, candidate: 'أحمد محمد', position: 'مطور Frontend', date: '2025-12-06', time: '10:00', type: 'video', status: 'scheduled', interviewer: 'محمد علي' },
    { id: 2, candidate: 'سارة أحمد', position: 'مصممة UI/UX', date: '2025-12-07', time: '14:00', type: 'in-person', status: 'scheduled', interviewer: 'فاطمة حسن' },
    { id: 3, candidate: 'محمد علي', position: 'مطور Backend', date: '2025-12-05', time: '11:00', type: 'video', status: 'completed', interviewer: 'أحمد محمد' },
    { id: 4, candidate: 'فاطمة حسن', position: 'مساعدة تسويق', date: '2025-12-08', time: '09:00', type: 'phone', status: 'pending', interviewer: 'سارة أحمد' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link href="/admin" className="p-2 hover:bg-gray-100 rounded-lg transition">
                <Calendar className="w-6 h-6 text-gray-600" />
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">المقابلات</h1>
                <p className="text-sm text-gray-600">جدولة وإدارة المقابلات</p>
              </div>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
              <Plus className="w-4 h-4" />
              مقابلة جديدة
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-4">
          {interviews.map(interview => (
            <div key={interview.id} className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">{interview.candidate}</h3>
                  <p className="text-sm text-gray-600">{interview.position}</p>
                </div>
                <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                  interview.status === 'scheduled' ? 'bg-blue-100 text-blue-800' :
                  interview.status === 'completed' ? 'bg-green-100 text-green-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {interview.status === 'scheduled' ? 'مجدولة' : interview.status === 'completed' ? 'مكتملة' : 'معلقة'}
                </span>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-gray-600" />
                  <div>
                    <p className="text-xs text-gray-600">التاريخ</p>
                    <p className="text-sm font-medium text-gray-900">{interview.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-gray-600" />
                  <div>
                    <p className="text-xs text-gray-600">الوقت</p>
                    <p className="text-sm font-medium text-gray-900">{interview.time}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Video className="w-4 h-4 text-gray-600" />
                  <div>
                    <p className="text-xs text-gray-600">النوع</p>
                    <p className="text-sm font-medium text-gray-900">{interview.type === 'video' ? 'فيديو' : interview.type === 'in-person' ? 'حضوري' : 'هاتفي'}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-gray-600" />
                  <div>
                    <p className="text-xs text-gray-600">المحاور</p>
                    <p className="text-sm font-medium text-gray-900">{interview.interviewer}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
