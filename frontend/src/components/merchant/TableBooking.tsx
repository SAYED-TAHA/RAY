import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Users, MapPin, Check, Phone, Mail, Loader, AlertCircle } from 'lucide-react';
import axios from 'axios';

interface Table {
  id: number;
  number: string;
  capacity: number;
  type: 'indoor' | 'outdoor' | 'vip';
  available: boolean;
  minPrice?: number;
}

interface BookingForm {
  date: string;
  time: string;
  guests: number;
  tableId: number | null;
  name: string;
  phone: string;
  email: string;
  specialRequests: string;
}

interface TableBookingProps {
  merchantId: string;
  merchantName: string;
}

const TableBooking: React.FC<TableBookingProps> = ({ merchantId, merchantName }) => {
  const [selectedTable, setSelectedTable] = useState<Table | null>(null);
  const [tables, setTables] = useState<Table[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [bookingForm, setBookingForm] = useState<BookingForm>({
    date: '',
    time: '',
    guests: 2,
    tableId: null,
    name: '',
    phone: '',
    email: '',
    specialRequests: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    const fetchTables = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get<Table[]>(`/api/merchants/${merchantId}/tables`);
        setTables(response.data);
      } catch (err) {
        console.error('Error fetching tables:', err);
        setError('فشل في تحميل الطاولات');
        setTables([]);
      } finally {
        setLoading(false);
      }
    };

    if (merchantId) {
      fetchTables();
    }
  }, [merchantId]);

  const timeSlots = [
    '12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM',
    '6:00 PM', '6:30 PM', '7:00 PM', '7:30 PM', '8:00 PM', '8:30 PM', '9:00 PM', '9:30 PM'
  ];

  const getTableTypeColor = (type: string) => {
    switch (type) {
      case 'indoor': return 'bg-blue-100 text-blue-700';
      case 'outdoor': return 'bg-green-100 text-green-700';
      case 'vip': return 'bg-purple-100 text-purple-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getTableTypeText = (type: string) => {
    switch (type) {
      case 'indoor': return 'داخل';
      case 'outdoor': return 'خارج';
      case 'vip': return 'VIP';
      default: return type;
    }
  };

  const handleTableSelect = (table: Table) => {
    if (!table.available) return;
    
    setSelectedTable(table);
    setBookingForm(prev => ({ ...prev, tableId: table.id }));
  };

  const handleSubmitBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setIsSuccess(false);
        setBookingForm({
          date: '',
          time: '',
          guests: 2,
          tableId: null,
          name: '',
          phone: '',
          email: '',
          specialRequests: ''
        });
        setSelectedTable(null);
      }, 3000);
    }, 2000);
  };

  if (isSuccess) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Check className="w-8 h-8 text-green-600" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">تم حجز الطاولة بنجاح!</h3>
        <p className="text-gray-600 mb-4">
          طاولة {selectedTable?.number} محجوزة في {bookingForm.date} الساعة {bookingForm.time}
        </p>
        <p className="text-sm text-gray-500">
          سيتم إرسال تأكيد الحجز عبر الواتساب والبريد الإلكتروني
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Calendar className="w-6 h-6 text-ray-gold" />
        <h2 className="text-2xl font-bold text-gray-900">حجز طاولات</h2>
      </div>

      <form onSubmit={handleSubmitBooking} className="space-y-6">
        {/* Date and Time Selection */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              <Calendar className="w-4 h-4 inline ml-2" />
              التاريخ
            </label>
            <input
              type="date"
              required
              value={bookingForm.date}
              onChange={(e) => setBookingForm(prev => ({ ...prev, date: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ray-blue focus:border-transparent"
              min={new Date().toISOString().split('T')[0]}
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              <Clock className="w-4 h-4 inline ml-2" />
              الوقت
            </label>
            <select
              required
              value={bookingForm.time}
              onChange={(e) => setBookingForm(prev => ({ ...prev, time: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ray-blue focus:border-transparent"
            >
              <option value="">اختر الوقت</option>
              {timeSlots.map(slot => (
                <option key={slot} value={slot}>{slot}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Number of Guests */}
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">
            <Users className="w-4 h-4 inline ml-2" />
            عدد الأشخاص
          </label>
          <select
            required
            value={bookingForm.guests}
            onChange={(e) => setBookingForm(prev => ({ ...prev, guests: parseInt(e.target.value) }))}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ray-blue focus:border-transparent"
          >
            <option value={1}>شخص واحد</option>
            <option value={2}>شخصين</option>
            <option value={3}>3 أشخاص</option>
            <option value={4}>4 أشخاص</option>
            <option value={5}>5 أشخاص</option>
            <option value={6}>6 أشخاص</option>
            <option value={7}>7 أشخاص</option>
            <option value={8}>8 أشخاص</option>
            <option value={9}>9 أشخاص</option>
            <option value={10}>10 أشخاص أو أكثر</option>
          </select>
        </div>

        {/* Table Selection */}
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">
            <MapPin className="w-4 h-4 inline ml-2" />
            اختر الطاولة
          </label>
          
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <Loader className="w-8 h-8 text-blue-500 animate-spin" />
              <span className="mr-2">جاري تحميل الطاولات...</span>
            </div>
          ) : error ? (
            <div className="bg-red-50 p-4 rounded-lg text-red-700 flex items-center justify-center gap-2">
              <AlertCircle className="w-5 h-5" />
              <span>{error}</span>
            </div>
          ) : tables.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">لا توجد طاولات متاحة حالياً</p>
            </div>
          ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {tables.map((table) => (
              <button
                key={table.id}
                type="button"
                onClick={() => handleTableSelect(table)}
                disabled={!table.available || table.capacity < bookingForm.guests}
                className={`p-3 rounded-lg border-2 transition-all ${
                  !table.available || table.capacity < bookingForm.guests
                    ? 'bg-gray-100 border-gray-200 opacity-50 cursor-not-allowed'
                    : selectedTable?.id === table.id
                    ? 'bg-ray-blue text-white border-ray-blue'
                    : 'bg-white border-gray-300 hover:border-ray-blue cursor-pointer'
                }`}
              >
                <div className="text-center">
                  <div className="font-bold text-lg">{table.number}</div>
                  <div className="text-xs opacity-75">{table.capacity} أشخاص</div>
                  <div className={`text-xs px-2 py-1 rounded-full inline-block mt-1 ${
                    selectedTable?.id === table.id ? 'bg-white/20 text-white' : getTableTypeColor(table.type)
                  }`}>
                    {getTableTypeText(table.type)}
                  </div>
                  {table.minPrice && (
                    <div className="text-xs mt-1">حد أدنى {table.minPrice} ج</div>
                  )}
                </div>
              </button>
            ))}
          </div>
          )}
        </div>

        {/* Contact Information */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              الاسم الكامل
            </label>
            <input
              type="text"
              required
              value={bookingForm.name}
              onChange={(e) => setBookingForm(prev => ({ ...prev, name: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ray-blue focus:border-transparent"
              placeholder="أدخل اسمك الكامل"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              <Phone className="w-4 h-4 inline ml-2" />
              رقم الهاتف
            </label>
            <input
              type="tel"
              required
              value={bookingForm.phone}
              onChange={(e) => setBookingForm(prev => ({ ...prev, phone: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ray-blue focus:border-transparent"
              placeholder="01xxxxxxxxx"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">
            <Mail className="w-4 h-4 inline ml-2" />
            البريد الإلكتروني (اختياري)
          </label>
          <input
            type="email"
            value={bookingForm.email}
            onChange={(e) => setBookingForm(prev => ({ ...prev, email: e.target.value }))}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ray-blue focus:border-transparent"
            placeholder="example@email.com"
          />
        </div>

        {/* Special Requests */}
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">
            طلبات خاصة (اختياري)
          </label>
          <textarea
            value={bookingForm.specialRequests}
            onChange={(e) => setBookingForm(prev => ({ ...prev, specialRequests: e.target.value }))}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ray-blue focus:border-transparent"
            rows={3}
            placeholder="أي طلبات خاصة للحجز..."
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting || !selectedTable}
          className="w-full bg-ray-gold text-ray-black py-3 rounded-lg font-bold hover:bg-ray-gold/90 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'جاري الحجز...' : 'تأكيد الحجز'}
        </button>
      </form>
    </div>
  );
};

export default TableBooking;
