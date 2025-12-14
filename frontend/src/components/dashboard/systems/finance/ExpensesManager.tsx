
import React, { useState } from 'react';
import { 
  DollarSign, Plus, Calendar, Tag, FileText, Trash2, 
  TrendingDown, PieChart, ArrowUpRight, Filter
} from 'lucide-react';
import StatCard from '../../../common/cards/StatCard';

interface Expense {
  id: number;
  title: string;
  amount: number;
  category: string;
  date: string;
  note?: string;
}

const initialExpenses: Expense[] = [
  { id: 1, title: 'إيجار المحل', amount: 15000, category: 'إيجار', date: '2025-11-01', note: 'إيجار شهر نوفمبر' },
  { id: 2, title: 'فاتورة الكهرباء', amount: 2400, category: 'مرافق', date: '2025-11-05' },
  { id: 3, title: 'خامات تغليف', amount: 3500, category: 'تشغيل', date: '2025-11-10' },
  { id: 4, title: 'صيانة تكييف', amount: 800, category: 'صيانة', date: '2025-11-15' },
  { id: 5, title: 'بوفيه وضيافة', amount: 450, category: 'نثريات', date: '2025-11-20' },
];

const categories = ['الكل', 'إيجار', 'رواتب', 'مرافق', 'خامات', 'تشغيل', 'صيانة', 'نثريات', 'تسويق'];

const ExpensesManager: React.FC = () => {
  const [expenses, setExpenses] = useState<Expense[]>(initialExpenses);
  const [filterCat, setFilterCat] = useState('الكل');
  const [isAddOpen, setIsAddOpen] = useState(false);
  
  // Form State
  const [newExpense, setNewExpense] = useState({
    title: '',
    amount: '',
    category: 'نثريات',
    date: new Date().toISOString().split('T')[0],
    note: ''
  });

  const handleAddExpense = (e: React.FormEvent) => {
    e.preventDefault();
    const expense: Expense = {
      id: Date.now(),
      title: newExpense.title,
      amount: Number(newExpense.amount),
      category: newExpense.category,
      date: newExpense.date,
      note: newExpense.note
    };
    setExpenses([expense, ...expenses]);
    setIsAddOpen(false);
    setNewExpense({ title: '', amount: '', category: 'نثريات', date: new Date().toISOString().split('T')[0], note: '' });
  };

  const handleDelete = (id: number) => {
    if (confirm('هل أنت متأكد من حذف هذا المصروف؟')) {
      setExpenses(expenses.filter(e => e.id !== id));
    }
  };

  const filteredExpenses = expenses.filter(e => filterCat === 'الكل' || e.category === filterCat);
  const totalExpenses = filteredExpenses.reduce((sum, e) => sum + e.amount, 0);

  return (
    <div className="space-y-6 animate-in fade-in">
      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-red-50 p-5 rounded-2xl border border-red-100 flex items-center gap-4">
           <div className="p-3 bg-white rounded-full text-red-600 shadow-sm"><TrendingDown className="w-6 h-6" /></div>
           <div>
              <p className="text-xs font-bold text-red-600 mb-1">إجمالي المصروفات</p>
              <h3 className="text-2xl font-black text-gray-900">{totalExpenses.toLocaleString()} ج.م</h3>
           </div>
        </div>
        <div className="bg-blue-50 p-5 rounded-2xl border border-blue-100 flex items-center gap-4">
           <div className="p-3 bg-white rounded-full text-blue-600 shadow-sm"><FileText className="w-6 h-6" /></div>
           <div>
              <p className="text-xs font-bold text-blue-600 mb-1">عدد البنود</p>
              <h3 className="text-2xl font-black text-gray-900">{filteredExpenses.length}</h3>
           </div>
        </div>
        <div className="bg-orange-50 p-5 rounded-2xl border border-orange-100 flex items-center gap-4">
           <div className="p-3 bg-white rounded-full text-orange-600 shadow-sm"><PieChart className="w-6 h-6" /></div>
           <div>
              <p className="text-xs font-bold text-orange-600 mb-1">أكبر بند</p>
              <h3 className="text-xl font-black text-gray-900 truncate max-w-[150px]">
                {filteredExpenses.length > 0 ? filteredExpenses.sort((a,b) => b.amount - a.amount)[0].category : '-'}
              </h3>
           </div>
        </div>
      </div>

      {/* Main Section */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* List Section */}
        <div className="flex-1 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">
           <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
              <h3 className="font-bold text-gray-800 flex items-center gap-2">
                 <DollarSign className="w-5 h-5 text-red-500" />
                 سجل المصروفات
              </h3>
              <div className="flex gap-2">
                 <div className="relative">
                    <Filter className="absolute right-2 top-2.5 w-3 h-3 text-gray-400" />
                    <select 
                      className="bg-white border border-gray-200 rounded-lg py-1.5 pr-7 pl-3 text-xs font-bold focus:outline-none focus:border-red-500"
                      value={filterCat}
                      onChange={(e) => setFilterCat(e.target.value)}
                    >
                       {categories.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                 </div>
                 <button 
                   onClick={() => setIsAddOpen(true)}
                   className="bg-red-600 text-white px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-red-700 flex items-center gap-1 transition shadow-sm"
                 >
                    <Plus className="w-3 h-3" /> تسجيل مصروف
                 </button>
              </div>
           </div>

           <div className="flex-1 overflow-y-auto p-2">
              <table className="w-full text-right border-separate border-spacing-y-2">
                 <thead className="text-xs text-gray-500 font-bold px-2">
                    <tr>
                       <th className="px-3 py-2">البند</th>
                       <th className="px-3 py-2">القسم</th>
                       <th className="px-3 py-2">التاريخ</th>
                       <th className="px-3 py-2">المبلغ</th>
                       <th className="px-3 py-2 w-10"></th>
                    </tr>
                 </thead>
                 <tbody>
                    {filteredExpenses.map(expense => (
                       <tr key={expense.id} className="bg-gray-50 hover:bg-red-50 transition-colors group text-sm rounded-lg">
                          <td className="px-3 py-3 rounded-r-lg">
                             <p className="font-bold text-gray-800">{expense.title}</p>
                             {expense.note && <p className="text-[10px] text-gray-500">{expense.note}</p>}
                          </td>
                          <td className="px-3 py-3">
                             <span className="bg-white border border-gray-200 text-gray-600 px-2 py-1 rounded text-xs">{expense.category}</span>
                          </td>
                          <td className="px-3 py-3 text-gray-500 text-xs">{expense.date}</td>
                          <td className="px-3 py-3 font-black text-red-600">{expense.amount.toLocaleString()} ج</td>
                          <td className="px-3 py-3 rounded-l-lg text-center">
                             <button onClick={() => handleDelete(expense.id)} className="text-gray-400 hover:text-red-500 transition opacity-0 group-hover:opacity-100">
                                <Trash2 className="w-4 h-4" />
                             </button>
                          </td>
                       </tr>
                    ))}
                 </tbody>
              </table>
           </div>
        </div>

        {/* Add Form Sidebar */}
        {isAddOpen && (
           <div className="w-full lg:w-80 bg-white rounded-2xl border border-gray-100 shadow-xl p-6 animate-in slide-in-from-left duration-300 h-fit">
              <h3 className="font-bold text-lg text-gray-800 mb-4">إضافة مصروف جديد</h3>
              <form onSubmit={handleAddExpense} className="space-y-4">
                 <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-600">عنوان المصروف</label>
                    <input 
                      type="text" 
                      required
                      placeholder="مثال: شراء أدوات مكتبية"
                      className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2.5 text-sm focus:border-red-500 outline-none"
                      value={newExpense.title}
                      onChange={e => setNewExpense({...newExpense, title: e.target.value})}
                    />
                 </div>
                 
                 <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                       <label className="text-xs font-bold text-gray-600">المبلغ</label>
                       <div className="relative">
                          <span className="absolute right-3 top-2.5 text-gray-400 text-xs font-bold">ج.م</span>
                          <input 
                            type="number" 
                            required
                            className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2.5 pr-8 text-sm focus:border-red-500 outline-none font-bold"
                            value={newExpense.amount}
                            onChange={e => setNewExpense({...newExpense, amount: e.target.value})}
                          />
                       </div>
                    </div>
                    <div className="space-y-1">
                       <label className="text-xs font-bold text-gray-600">التاريخ</label>
                       <input 
                         type="date" 
                         required
                         className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2.5 text-sm focus:border-red-500 outline-none"
                         value={newExpense.date}
                         onChange={e => setNewExpense({...newExpense, date: e.target.value})}
                       />
                    </div>
                 </div>

                 <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-600">التصنيف</label>
                    <div className="grid grid-cols-3 gap-2">
                       {categories.filter(c => c !== 'الكل').slice(0, 6).map(cat => (
                          <button
                            key={cat}
                            type="button"
                            onClick={() => setNewExpense({...newExpense, category: cat})}
                            className={`py-2 rounded-lg text-xs font-bold border transition ${newExpense.category === cat ? 'bg-red-50 border-red-200 text-red-700' : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'}`}
                          >
                             {cat}
                          </button>
                       ))}
                    </div>
                 </div>

                 <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-600">ملاحظات</label>
                    <textarea 
                      className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2.5 text-sm focus:border-red-500 outline-none h-20 resize-none"
                      value={newExpense.note}
                      onChange={e => setNewExpense({...newExpense, note: e.target.value})}
                    ></textarea>
                 </div>

                 <div className="flex gap-2 pt-2">
                    <button 
                      type="button" 
                      onClick={() => setIsAddOpen(false)}
                      className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-xl font-bold text-sm hover:bg-gray-200 transition"
                    >
                       إلغاء
                    </button>
                    <button 
                      type="submit" 
                      className="flex-1 py-3 bg-red-600 text-white rounded-xl font-bold text-sm hover:bg-red-700 transition shadow-md"
                    >
                       حفظ
                    </button>
                 </div>
              </form>
           </div>
        )}
      </div>
    </div>
  );
};

export default ExpensesManager;
