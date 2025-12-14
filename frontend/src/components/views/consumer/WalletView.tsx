
import React from 'react';
import { Wallet, Plus, ArrowUpRight, ArrowDownLeft, Calendar, CreditCard } from 'lucide-react';

const WalletView: React.FC = () => {
  const transactions = [
    { id: 1, type: 'payment', title: 'دفع طلب #ORD-9921', amount: -280, date: 'اليوم، 2:30 م', status: 'success' },
    { id: 2, type: 'deposit', title: 'شحن رصيد', amount: 500, date: '20 نوفمبر، 10:00 ص', status: 'success' },
    { id: 3, type: 'payment', title: 'دفع طلب #ORD-7750', amount: -1250, date: '18 نوفمبر، 05:00 م', status: 'success' },
    { id: 4, type: 'refund', title: 'استرداد مبلغ (مرتجع)', amount: 150, date: '15 نوفمبر، 01:00 م', status: 'success' },
  ];

  return (
    <div className="space-y-6 animate-in fade-in">
      <h3 className="text-2xl font-bold text-ray-black mb-4 flex items-center gap-2">
        <Wallet className="w-6 h-6 text-ray-blue" />
        المحفظة
      </h3>

      {/* Balance Card */}
      <div className="bg-gradient-to-br from-ray-blue to-blue-900 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
        <div className="relative z-10">
          <p className="text-blue-200 font-bold text-sm mb-1">الرصيد الحالي</p>
          <h2 className="text-4xl font-black mb-6">450.00 <span className="text-lg font-medium text-blue-300">ج.م</span></h2>
          
          <div className="flex gap-3">
            <button className="bg-ray-gold text-ray-black px-6 py-3 rounded-xl font-bold text-sm hover:bg-yellow-400 transition flex items-center gap-2 shadow-lg">
              <Plus className="w-4 h-4" />
              شحن الرصيد
            </button>
            <button className="bg-white/10 border border-white/20 text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-white/20 transition flex items-center gap-2">
              <CreditCard className="w-4 h-4" />
              إدارة البطاقات
            </button>
          </div>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100 bg-gray-50">
          <h4 className="font-bold text-gray-800">آخر المعاملات</h4>
        </div>
        <div className="divide-y divide-gray-50">
          {transactions.map((trx) => (
            <div key={trx.id} className="p-4 flex items-center justify-between hover:bg-gray-50 transition">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  trx.amount > 0 ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600'
                }`}>
                  {trx.amount > 0 ? <ArrowDownLeft className="w-5 h-5" /> : <ArrowUpRight className="w-5 h-5" />}
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-sm">{trx.title}</p>
                  <p className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                    <Calendar className="w-3 h-3" /> {trx.date}
                  </p>
                </div>
              </div>
              <span className={`font-bold ${trx.amount > 0 ? 'text-green-600' : 'text-gray-900'}`}>
                {trx.amount > 0 ? '+' : ''}{trx.amount} ج.م
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WalletView;
