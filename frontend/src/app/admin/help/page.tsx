'use client';

import React, { useEffect, useState } from 'react';
import { HelpCircle, Search, Plus, FileText, CheckCircle, Clock } from 'lucide-react';
import Link from 'next/link';
import { fetchAdminFaqs, fetchAdminSupportTickets, type AdminFAQ, type AdminSupportTicket } from '../../../services/adminHelpService';

export default function AdminHelp() {
  const [searchTerm, setSearchTerm] = useState('');

  const [faqs, setFaqs] = useState<AdminFAQ[]>([]);
  const [supportTickets, setSupportTickets] = useState<AdminSupportTicket[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = async () => {
    try {
      setLoading(true);
      setError(null);
      const [faqsRes, ticketsRes] = await Promise.all([
        fetchAdminFaqs({ limit: 200 }),
        fetchAdminSupportTickets({ limit: 200 })
      ]);
      setFaqs(faqsRes || []);
      setSupportTickets(ticketsRes || []);
    } catch (e) {
      console.error('Failed to load help data:', e);
      setFaqs([]);
      setSupportTickets([]);
      setError('فشل تحميل بيانات المساعدة');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const filteredFaqs = faqs.filter((faq) => {
    if (!searchTerm) return true;
    const q = searchTerm.toLowerCase();
    return (
      String(faq.question || '').toLowerCase().includes(q) ||
      String(faq.answer || '').toLowerCase().includes(q)
    );
  });

  const filteredTickets = supportTickets.filter((ticket) => {
    if (!searchTerm) return true;
    const q = searchTerm.toLowerCase();
    return (
      String(ticket.title || '').toLowerCase().includes(q) ||
      String(ticket.description || '').toLowerCase().includes(q)
    );
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link href="/admin" className="p-2 hover:bg-gray-100 rounded-lg transition">
                <HelpCircle className="w-6 h-6 text-gray-600" />
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">المساعدة والدعم</h1>
                <p className="text-sm text-gray-600">إدارة الأسئلة الشائعة وتذاكر الدعم</p>
              </div>
            </div>
            <button disabled className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg opacity-60">
              <Plus className="w-4 h-4" />
              سؤال جديد
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 text-center text-gray-600">
            جاري تحميل بيانات المساعدة...
          </div>
        ) : error ? (
          <div className="bg-red-50 rounded-xl p-6 border border-red-200 text-red-700 text-center">
            {error}
            <div className="mt-4">
              <button onClick={load} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                إعادة المحاولة
              </button>
            </div>
          </div>
        ) : (
          <>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">إجمالي الأسئلة</p>
                <p className="text-2xl font-bold text-gray-900">{faqs.length}</p>
              </div>
              <FileText className="w-8 h-8 text-blue-600" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">تذاكر مفتوحة</p>
                <p className="text-2xl font-bold text-orange-600">{supportTickets.filter(t => t.status === 'open').length}</p>
              </div>
              <Clock className="w-8 h-8 text-orange-600" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">مغلقة</p>
                <p className="text-2xl font-bold text-green-600">{supportTickets.filter(t => t.status === 'closed').length}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">الأسئلة الشائعة</h2>
            <div className="relative mb-4">
              <Search className="absolute right-3 top-3 w-5 h-5 text-gray-400" />
              <input type="text" placeholder="بحث..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pr-10 pl-4 py-2 border border-gray-300 rounded-lg" />
            </div>
            {filteredFaqs.length === 0 ? (
              <div className="p-8 text-center text-gray-600 bg-gray-50 rounded-lg border border-gray-200">
                لا توجد أسئلة شائعة حالياً. سيتم تفعيل إدارة الأسئلة الشائعة عند ربط نظام المساعدة بقاعدة البيانات.
              </div>
            ) : (
              <div className="space-y-3">
                {filteredFaqs.map((faq: any) => (
                  <div key={faq.id} className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition">
                    <h3 className="font-medium text-gray-900">{faq.question}</h3>
                    <p className="text-xs text-gray-600 mt-1">{faq.views} مشاهدة • {faq.helpful} مفيد</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">تذاكر الدعم</h2>
            {filteredTickets.length === 0 ? (
              <div className="p-8 text-center text-gray-600 bg-gray-50 rounded-lg border border-gray-200">
                لا توجد تذاكر دعم حالياً. سيتم إظهار التذاكر عند ربط نظام الدعم.
              </div>
            ) : (
              <div className="space-y-3">
                {filteredTickets.map((ticket: any) => (
                  <div key={ticket.id} className="p-3 bg-gray-50 rounded-lg flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-gray-900">{ticket.title}</h3>
                      <p className="text-xs text-gray-600">{ticket.id} • {ticket.replies} ردود</p>
                    </div>
                    <span className={`px-2 py-1 text-xs rounded-full ${ticket.status === 'open' ? 'bg-orange-100 text-orange-800' : 'bg-green-100 text-green-800'}`}>
                      {ticket.status === 'open' ? 'مفتوح' : 'مغلق'}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
          </>
        )}
      </div>
    </div>
  );
}
