
import React from 'react';

interface StatusBadgeProps {
  status: string;
  label?: string; // Optional override
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status, label }) => {
  const styles: Record<string, string> = {
    // Generic & System
    active: 'bg-green-100 text-green-800',
    pending: 'bg-yellow-100 text-yellow-800',
    completed: 'bg-blue-100 text-blue-800',
    cancelled: 'bg-red-100 text-red-800',
    
    // Order / Restaurant
    preparing: 'bg-orange-100 text-orange-800',
    ready: 'bg-green-100 text-green-800',
    delivering: 'bg-blue-50 text-blue-600',
    
    // Real Estate
    scheduled: 'bg-purple-100 text-purple-800',
    sold: 'bg-green-100 text-green-800',
    rented: 'bg-blue-100 text-blue-800',
    
    // Clinic
    waiting: 'bg-yellow-100 text-yellow-800',
    in_progress: 'bg-blue-100 text-blue-800',
    current: 'bg-green-100 text-green-700', // Active patient
    
    // Car
    available: 'bg-green-100 text-green-800',
    reserved: 'bg-orange-100 text-orange-800',
    maintenance: 'bg-red-50 text-red-600',
    
    // Gym
    expiring: 'bg-red-100 text-red-800',
    expired: 'bg-gray-200 text-gray-600',
    frozen: 'bg-blue-100 text-blue-700',
    
    // Retail
    paid: 'bg-green-100 text-green-800',
    credit: 'bg-indigo-100 text-indigo-800',
    
    // Appointments (Salon/Services)
    confirmed: 'bg-purple-100 text-purple-800',
    urgent: 'bg-red-100 text-red-600 animate-pulse',
    
    // Laundry
    processing: 'bg-teal-100 text-teal-800',
  };
  
  const labels: Record<string, string> = {
    active: 'نشط',
    pending: 'قيد الانتظار',
    completed: 'مكتمل',
    cancelled: 'ملغي',
    preparing: 'جاري التحضير',
    ready: 'جاهز',
    delivering: 'جاري التوصيل',
    scheduled: 'مجدول',
    sold: 'تم البيع',
    rented: 'تم الإيجار',
    waiting: 'في الانتظار',
    in_progress: 'جاري العمل',
    current: 'في الكشف',
    available: 'متاح',
    reserved: 'محجوز',
    maintenance: 'في الصيانة',
    expiring: 'ينتهي قريباً',
    expired: 'منتهي',
    frozen: 'مجمد',
    paid: 'مدفوع',
    credit: 'آجل',
    confirmed: 'مؤكد',
    urgent: 'مستعجل',
    processing: 'جاري التشغيل'
  };

  const statusKey = status?.toLowerCase();

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap inline-flex items-center justify-center ${styles[statusKey] || 'bg-gray-100 text-gray-600'}`}>
      {label || labels[statusKey] || status}
    </span>
  );
};

export default StatusBadge;
