/**
 * نموذج الحجز
 * نموذج إنشاء وتعديل الحجوزات
 */

import React, { useState } from 'react';
import {
  FileText, User, Phone, Mail, Calendar, Clock,
  MapPin, Users, DollarSign, Save, X, AlertCircle
} from 'lucide-react';

interface BookingFormData {
  clientName: string;
  clientPhone: string;
  clientEmail: string;
  date: string;
  time: string;
  duration: number;
  service: string;
  location: string;
  guests: number;
  notes: string;
}

const BookingForm: React.FC = () => {
  const [formData, setFormData] = useState<BookingFormData>({
    clientName: '',
    clientPhone: '',
    clientEmail: '',
    date: '',
    time: '',
    duration: 60,
    service: '',
    location: '',
    guests: 1,
    notes: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'duration' || name === 'guests' ? parseInt(value) : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Validation logic here
    console.log('Form submitted:', formData);
  };

  return (
    <div className="h-full flex flex-col space-y-6 animate-in fade-in slide-in-from-bottom-2">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <FileText className="w-6 h-6 text-blue-600" />
          نموذج الحجز
        </h2>
        <p className="text-sm text-gray-500">إنشاء وتعديل الحجوزات</p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-gray-200 p-6 space-y-6">
        {/* Client Info */}
        <div>
          <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
            <User className="w-5 h-5" />
            معلومات العميل
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">الاسم</label>
              <input
                type="text"
                name="clientName"
                value={formData.clientName}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="أدخل اسم العميل"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">الهاتف</label>
              <input
                type="tel"
                name="clientPhone"
                value={formData.clientPhone}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="+201001234567"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">البريد الإلكتروني</label>
              <input
                type="email"
                name="clientEmail"
                value={formData.clientEmail}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="example@email.com"
              />
            </div>
          </div>
        </div>

        {/* Booking Details */}
        <div>
          <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            تفاصيل الحجز
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">التاريخ</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">الوقت</label>
              <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">المدة (دقيقة)</label>
              <select
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="30">30 دقيقة</option>
                <option value="45">45 دقيقة</option>
                <option value="60">60 دقيقة</option>
                <option value="90">90 دقيقة</option>
                <option value="120">120 دقيقة</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">الخدمة</label>
              <input
                type="text"
                name="service"
                value={formData.service}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="اختر الخدمة"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">الموقع</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="اختر الموقع"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">عدد الأشخاص</label>
              <input
                type="number"
                name="guests"
                value={formData.guests}
                onChange={handleChange}
                min="1"
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Notes */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">ملاحظات</label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            rows={4}
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="أضف أي ملاحظات إضافية..."
          />
        </div>

        {/* Actions */}
        <div className="flex gap-4 pt-4 border-t border-gray-200">
          <button
            type="submit"
            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold flex items-center justify-center gap-2"
          >
            <Save className="w-5 h-5" />
            حفظ الحجز
          </button>
          <button
            type="button"
            className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition font-semibold flex items-center justify-center gap-2"
          >
            <X className="w-5 h-5" />
            إلغاء
          </button>
        </div>
      </form>
    </div>
  );
};

export default BookingForm;
