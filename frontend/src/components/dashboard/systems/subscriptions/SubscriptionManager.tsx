
import React, { useState } from 'react';
import { 
  Users, CheckCircle, AlertCircle, XCircle, RotateCcw, 
  PauseCircle, Search, Plus, Calendar, CreditCard 
} from 'lucide-react';
import SubscriptionForm from './SubscriptionForm';

interface Subscription {
  id: string;
  name: string;
  plan: string;
  startDate: string;
  endDate: string;
  status: 'active' | 'expiring' | 'expired' | 'frozen';
  price: number;
  phone: string;
}

const initialSubs: Subscription[] = [
  { id: 'SUB-101', name: 'أحمد محمد', plan: 'باقة سنوية VIP', startDate: '2025-01-01', endDate: '2026-01-01', status: 'active', price: 5000, phone: '010xxxxxxx' },
  { id: 'SUB-102', name: 'سارة علي', plan: 'باقة شهرية', startDate: '2025-11-01', endDate: '2025-12-01', status: 'expiring', price: 600, phone: '012xxxxxxx' },
  { id: 'SUB-103', name: 'كريم حسن', plan: 'باقة 3 شهور', startDate: '2025-08-01', endDate: '2025-11-01', status: 'expired', price: 1500, phone: '011xxxxxxx' },
  { id: 'SUB-104', name: 'منى زكي', plan: 'باقة سنوية', startDate: '2025-03-01', endDate: '2026-03-01', status: 'frozen', price: 4000, phone: '015xxxxxxx' },
];

const SubscriptionManager: React.FC = () => {
  const [subs, setSubs] = useState(initialSubs);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingSub, setEditingSub] = useState<any>(null);

  const filteredSubs = subs.filter(s => 
    (filter === 'all' || s.status === filter) &&
    (s.name.includes(searchTerm) || s.id.includes(searchTerm))
  );

  const handleAdd = () => {
    setEditingSub(null);
    setIsFormOpen(true);
  };

  const handleEdit = (sub: any) => {
    setEditingSub(sub);
    setIsFormOpen(true);
  };

  const handleSave = (data: any) => {
    if (editingSub) {
      setSubs(prev => prev.map(s => s.id === editingSub.id ? { ...s, ...data } : s));
    } else {
      const newSub = {
        id: `SUB-${Date.now()}`,
        ...data
      };
      setSubs([...subs, newSub]);
    }
    setIsFormOpen(false);
  };

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'active': return <span className="bg-green-100 text-green-700 px-2 py-1 rounded-lg text-xs font-bold flex items-center gap-1"><CheckCircle className="w-3 h-3" /> نشط</span>;
      case 'expiring': return <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded-lg text-xs font-bold flex items-center gap-1 animate-pulse"><AlertCircle className="w-3 h-3" /> ينتهي قريباً</span>;
      case 'expired': return <span className="bg-red-100 text-red-700 px-2 py-1 rounded-lg text-xs font-bold flex items-center gap-1"><XCircle className="w-3 h-3" /> منتهي</span>;
      case 'frozen': return <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-lg text-xs font-bold flex items-center gap-1"><PauseCircle className="w-3 h-3" /> مجمد</span>;
      default: return null;
    }
  };

  return (
    <div className="flex flex-col h-full space-y-6 animate-in fade-in slide-in-from-bottom-2">
      {/* Header */}
      <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <CreditCard className="w-6 h-6 text-indigo-600" />
            إدارة الاشتراكات والعضويات
          </h2>
          <p className="text-sm text-gray-500">متابعة وتجديد اشتراكات العملاء</p>
        </div>
        
        <div className="flex gap-3 w-full md:w-auto">
           <div className="relative flex-1 md:w-64">
              <Search className="absolute right-3 top-2.5 w-4 h-4 text-gray-400" />
              <input 
                type="text" 
                placeholder="بحث باسم المشترك..." 
                className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2 pr-10 pl-4 text-sm focus:outline-none focus:border-indigo-500"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
           </div>
           <button 
             onClick={handleAdd}
             className="bg-indigo-600 text-white px-4 py-2 rounded-xl font-bold shadow-md flex items-center gap-2 hover:bg-indigo-700 transition whitespace-nowrap"
           >
              <Plus className="w-4 h-4" />
              اشتراك جديد
           </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {['all', 'active', 'expiring', 'expired', 'frozen'].map(status => (
          <button 
            key={status}
            onClick={() => setFilter(status)}
            className={`px-6 py-2 rounded-xl text-sm font-bold capitalize transition whitespace-nowrap
              ${filter === status ? 'bg-indigo-600 text-white shadow-md' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'}
            `}
          >
            {status === 'all' ? 'الكل' : status}
          </button>
        ))}
      </div>

      {/* List */}
      <div className="flex-1 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-right">
            <thead className="bg-gray-50 text-gray-500 text-xs font-bold border-b border-gray-100">
              <tr>
                <th className="p-4">المشترك</th>
                <th className="p-4">الباقة</th>
                <th className="p-4">تاريخ البدء</th>
                <th className="p-4">تاريخ الانتهاء</th>
                <th className="p-4">الحالة</th>
                <th className="p-4 text-center">إجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredSubs.map(sub => (
                <tr key={sub.id} className="hover:bg-indigo-50/10 transition cursor-pointer" onClick={() => handleEdit(sub)}>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-indigo-50 rounded-full flex items-center justify-center text-indigo-600 font-bold">
                        {sub.name.charAt(0)}
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-gray-900">{sub.name}</h4>
                        <p className="text-xs text-gray-500 dir-ltr text-right">{sub.phone}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="text-sm font-medium text-gray-700 block">{sub.plan}</span>
                    <span className="text-xs text-gray-400 font-bold">{sub.price} ج.م</span>
                  </td>
                  <td className="p-4 text-sm text-gray-600">{sub.startDate}</td>
                  <td className="p-4 text-sm font-bold text-gray-800">{sub.endDate}</td>
                  <td className="p-4">{getStatusBadge(sub.status)}</td>
                  <td className="p-4">
                    <div className="flex justify-center gap-2">
                      <button className="p-2 hover:bg-green-50 text-green-600 rounded-lg transition" title="تجديد">
                        <RotateCcw className="w-4 h-4" />
                      </button>
                      <button className="p-2 hover:bg-blue-50 text-blue-600 rounded-lg transition" title="تجميد">
                        <PauseCircle className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isFormOpen && (
        <SubscriptionForm 
          onClose={() => setIsFormOpen(false)} 
          onSave={handleSave} 
          initialData={editingSub} 
        />
      )}
    </div>
  );
};

export default SubscriptionManager;
