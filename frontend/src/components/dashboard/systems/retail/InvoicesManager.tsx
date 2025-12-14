/**
 * مدير الفواتير
 * إدارة الفواتير والدفع
 */

import React, { useState } from 'react';
import {
  FileText, Search, Plus, Download, Eye, Trash2, Filter,
  DollarSign, Calendar, User, CheckCircle, AlertCircle, Printer
} from 'lucide-react';

interface Invoice {
  id: string;
  invoiceNumber: string;
  customerName: string;
  customerEmail: string;
  date: string;
  dueDate: string;
  amount: number;
  tax: number;
  total: number;
  status: 'paid' | 'pending' | 'overdue' | 'cancelled';
  items: number;
  paymentMethod?: string;
  notes?: string;
}

const initialInvoices: Invoice[] = [
  {
    id: 'inv-001',
    invoiceNumber: 'INV-2024-001',
    customerName: 'أحمد محمد',
    customerEmail: 'ahmed@example.com',
    date: '2024-11-25',
    dueDate: '2024-12-10',
    amount: 5000,
    tax: 500,
    total: 5500,
    status: 'paid',
    items: 3,
    paymentMethod: 'بطاقة ائتمان',
    notes: 'شكراً على شرائك'
  },
  {
    id: 'inv-002',
    invoiceNumber: 'INV-2024-002',
    customerName: 'فاطمة علي',
    customerEmail: 'fatima@example.com',
    date: '2024-11-24',
    dueDate: '2024-12-09',
    amount: 3200,
    tax: 320,
    total: 3520,
    status: 'pending',
    items: 2,
    notes: 'الدفع المتوقع قريباً'
  },
  {
    id: 'inv-003',
    invoiceNumber: 'INV-2024-003',
    customerName: 'محمود حسن',
    customerEmail: 'mahmoud@example.com',
    date: '2024-11-20',
    dueDate: '2024-12-05',
    amount: 7500,
    tax: 750,
    total: 8250,
    status: 'overdue',
    items: 5,
    notes: 'تأخر في الدفع'
  },
  {
    id: 'inv-004',
    invoiceNumber: 'INV-2024-004',
    customerName: 'سارة أحمد',
    customerEmail: 'sarah@example.com',
    date: '2024-11-22',
    dueDate: '2024-12-07',
    amount: 2800,
    tax: 280,
    total: 3080,
    status: 'paid',
    items: 2,
    paymentMethod: 'تحويل بنكي',
    notes: 'دفع كامل'
  }
];

const InvoicesManager: React.FC = () => {
  const [invoices, setInvoices] = useState<Invoice[]>(initialInvoices);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'paid' | 'pending' | 'overdue' | 'cancelled'>('all');
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);

  const filteredInvoices = invoices.filter(invoice => {
    const matchesSearch = invoice.invoiceNumber.includes(searchTerm) || invoice.customerName.includes(searchTerm);
    const matchesStatus = filterStatus === 'all' || invoice.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'overdue': return 'bg-red-100 text-red-800';
      case 'cancelled': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'paid': return 'مدفوعة';
      case 'pending': return 'معلقة';
      case 'overdue': return 'متأخرة';
      case 'cancelled': return 'ملغاة';
      default: return status;
    }
  };

  const stats = {
    total: invoices.length,
    paid: invoices.filter(i => i.status === 'paid').length,
    pending: invoices.filter(i => i.status === 'pending').length,
    overdue: invoices.filter(i => i.status === 'overdue').length,
    totalAmount: invoices.filter(i => i.status === 'paid').reduce((sum, i) => sum + i.total, 0)
  };

  return (
    <div className="h-full flex flex-col space-y-6 animate-in fade-in slide-in-from-bottom-2">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <FileText className="w-6 h-6 text-blue-600" />
            إدارة الفواتير
          </h2>
          <p className="text-sm text-gray-500">إدارة الفواتير والدفع</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
          <Plus className="w-5 h-5" />
          فاتورة جديدة
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="bg-white p-4 rounded-xl border border-gray-200">
          <p className="text-sm text-gray-600 mb-1">إجمالي الفواتير</p>
          <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
        </div>
        <div className="bg-green-50 p-4 rounded-xl border border-green-200">
          <p className="text-sm text-green-700 mb-1">مدفوعة</p>
          <p className="text-2xl font-bold text-green-900">{stats.paid}</p>
        </div>
        <div className="bg-yellow-50 p-4 rounded-xl border border-yellow-200">
          <p className="text-sm text-yellow-700 mb-1">معلقة</p>
          <p className="text-2xl font-bold text-yellow-900">{stats.pending}</p>
        </div>
        <div className="bg-red-50 p-4 rounded-xl border border-red-200">
          <p className="text-sm text-red-700 mb-1">متأخرة</p>
          <p className="text-2xl font-bold text-red-900">{stats.overdue}</p>
        </div>
        <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
          <p className="text-sm text-blue-700 mb-1">المبلغ المدفوع</p>
          <p className="text-2xl font-bold text-blue-900">{(stats.totalAmount / 1000).toFixed(0)}K</p>
        </div>
      </div>

      {/* Controls */}
      <div className="flex gap-4 flex-wrap">
        {/* Search */}
        <div className="flex-1 min-w-64 relative">
          <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="ابحث عن فاتورة..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Status Filter */}
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value as any)}
          className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">جميع الحالات</option>
          <option value="paid">مدفوعة</option>
          <option value="pending">معلقة</option>
          <option value="overdue">متأخرة</option>
          <option value="cancelled">ملغاة</option>
        </select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Invoices List */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 overflow-hidden flex flex-col">
          <div className="overflow-y-auto flex-1">
            {filteredInvoices.map(invoice => (
              <button
                key={invoice.id}
                onClick={() => setSelectedInvoice(invoice)}
                className={`w-full text-right p-4 border-b border-gray-100 hover:bg-gray-50 transition ${
                  selectedInvoice?.id === invoice.id ? 'bg-blue-50' : ''
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-800">{invoice.invoiceNumber}</h4>
                    <p className="text-xs text-gray-500">{invoice.customerName}</p>
                  </div>
                  <span className={`text-xs font-semibold px-2 py-1 rounded-full ${getStatusColor(invoice.status)}`}>
                    {getStatusLabel(invoice.status)}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-xs text-gray-600">
                  <span className="flex items-center gap-1">
                    <DollarSign className="w-3 h-3" />
                    {(invoice.total / 1000).toFixed(1)}K
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {invoice.date}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Invoice Details */}
        {selectedInvoice && (
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden flex flex-col">
            <div className="p-4 border-b border-gray-200">
              <h3 className="font-bold text-gray-800 mb-1">{selectedInvoice.invoiceNumber}</h3>
              <span className={`text-xs font-semibold px-2 py-1 rounded-full ${getStatusColor(selectedInvoice.status)}`}>
                {getStatusLabel(selectedInvoice.status)}
              </span>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {/* Customer */}
              <div>
                <h4 className="font-semibold text-gray-800 mb-2 text-sm">العميل</h4>
                <div className="space-y-1 text-xs">
                  <p className="font-semibold text-gray-800">{selectedInvoice.customerName}</p>
                  <p className="text-gray-600">{selectedInvoice.customerEmail}</p>
                </div>
              </div>

              {/* Dates */}
              <div>
                <h4 className="font-semibold text-gray-800 mb-2 text-sm">التواريخ</h4>
                <div className="space-y-1 text-xs">
                  <div className="flex justify-between">
                    <span className="text-gray-600">تاريخ الفاتورة:</span>
                    <span className="font-semibold text-gray-800">{selectedInvoice.date}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">تاريخ الاستحقاق:</span>
                    <span className="font-semibold text-gray-800">{selectedInvoice.dueDate}</span>
                  </div>
                </div>
              </div>

              {/* Amount */}
              <div>
                <h4 className="font-semibold text-gray-800 mb-2 text-sm">المبلغ</h4>
                <div className="space-y-1 text-xs">
                  <div className="flex justify-between">
                    <span className="text-gray-600">المبلغ:</span>
                    <span className="font-semibold text-gray-800">{selectedInvoice.amount} ج</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">الضريبة:</span>
                    <span className="font-semibold text-gray-800">{selectedInvoice.tax} ج</span>
                  </div>
                  <div className="flex justify-between border-t border-gray-200 pt-1 mt-1">
                    <span className="text-gray-600 font-semibold">الإجمالي:</span>
                    <span className="font-bold text-gray-900">{selectedInvoice.total} ج</span>
                  </div>
                </div>
              </div>

              {/* Notes */}
              {selectedInvoice.notes && (
                <div>
                  <h4 className="font-semibold text-gray-800 mb-1 text-sm">ملاحظات</h4>
                  <p className="text-xs text-gray-600">{selectedInvoice.notes}</p>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="p-4 border-t border-gray-200 space-y-2">
              <button className="w-full px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm font-semibold flex items-center justify-center gap-2">
                <Printer className="w-4 h-4" />
                طباعة
              </button>
              <button className="w-full px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition text-sm font-semibold flex items-center justify-center gap-2">
                <Download className="w-4 h-4" />
                تحميل PDF
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InvoicesManager;
