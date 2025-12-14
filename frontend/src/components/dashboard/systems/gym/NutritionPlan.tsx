
import React, { useState } from 'react';
import { 
  Utensils, User, Target, Activity, Printer, Save, 
  ChevronDown, Plus, Trash2, Apple, Coffee, Moon, Sun, Calculator, X, Check
} from 'lucide-react';

interface Meal {
  id: number;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
}

interface MealTime {
  id: string;
  label: string;
  icon: any;
  meals: Meal[];
}

const NutritionPlan: React.FC = () => {
  const [memberName, setMemberName] = useState('');
  const [currentWeight, setCurrentWeight] = useState('');
  const [targetWeight, setTargetWeight] = useState('');
  const [dailyCalories, setDailyCalories] = useState(2500);
  const [isCalcOpen, setIsCalcOpen] = useState(false);
  
  // Calculator State
  const [calcData, setCalcData] = useState({
    gender: 'male',
    age: '',
    height: '',
    weight: '',
    activity: '1.55' // Moderate
  });
  
  const [plan, setPlan] = useState<MealTime[]>([
    { id: 'breakfast', label: 'الإفطار', icon: Sun, meals: [] },
    { id: 'lunch', label: 'الغداء', icon: Utensils, meals: [] },
    { id: 'dinner', label: 'العشاء', icon: Moon, meals: [] },
    { id: 'snack', label: 'سناكس', icon: Apple, meals: [] },
  ]);

  const addMeal = (timeId: string) => {
    const newMeal: Meal = { id: Date.now(), name: '', calories: 0, protein: 0, carbs: 0, fats: 0 };
    setPlan(plan.map(t => t.id === timeId ? { ...t, meals: [...t.meals, newMeal] } : t));
  };

  const updateMeal = (timeId: string, mealId: number, field: keyof Meal, value: string | number) => {
    setPlan(plan.map(t => {
      if (t.id !== timeId) return t;
      return {
        ...t,
        meals: t.meals.map(m => m.id === mealId ? { ...m, [field]: value } : m)
      };
    }));
  };

  const removeMeal = (timeId: string, mealId: number) => {
    setPlan(plan.map(t => t.id === timeId ? { ...t, meals: t.meals.filter(m => m.id !== mealId) } : t));
  };

  // Calculate Totals
  const totalCalories = plan.flatMap(p => p.meals).reduce((sum, m) => sum + Number(m.calories), 0);
  const totalProtein = plan.flatMap(p => p.meals).reduce((sum, m) => sum + Number(m.protein), 0);
  const totalCarbs = plan.flatMap(p => p.meals).reduce((sum, m) => sum + Number(m.carbs), 0);
  const totalFats = plan.flatMap(p => p.meals).reduce((sum, m) => sum + Number(m.fats), 0);

  const calculateTDEE = () => {
    const w = Number(calcData.weight);
    const h = Number(calcData.height);
    const a = Number(calcData.age);
    
    // Mifflin-St Jeor Equation
    let bmr = (10 * w) + (6.25 * h) - (5 * a);
    bmr += calcData.gender === 'male' ? 5 : -161;
    
    const tdee = Math.round(bmr * Number(calcData.activity));
    setDailyCalories(tdee);
    setCurrentWeight(calcData.weight);
    setIsCalcOpen(false);
  };

  return (
    <div className="flex flex-col h-full space-y-6 animate-in fade-in slide-in-from-bottom-2 relative">
      <div className="flex justify-between items-center bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
        <div>
          <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <Apple className="w-6 h-6 text-green-600" />
            تخطيط الأنظمة الغذائية
          </h2>
          <p className="text-sm text-gray-500">إعداد جدول وجبات مخصص للأعضاء</p>
        </div>
        <div className="flex gap-2">
           <button className="px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-xl font-bold text-sm hover:bg-gray-50 flex items-center gap-2">
             <Save className="w-4 h-4" />
             حفظ النظام
           </button>
           <button className="px-6 py-2 bg-yellow-500 text-black rounded-xl font-bold text-sm hover:bg-yellow-400 shadow-md flex items-center gap-2">
             <Printer className="w-4 h-4" />
             طباعة
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         {/* Sidebar: Member Info & Summary */}
         <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
               <h3 className="font-bold text-gray-800 mb-4">بيانات العضو</h3>
               <div className="space-y-4">
                  <div className="space-y-1">
                     <label className="text-xs font-bold text-gray-500">اسم العضو</label>
                     <div className="relative">
                        <User className="absolute right-3 top-2.5 w-4 h-4 text-gray-400" />
                        <input 
                          type="text" 
                          className="w-full bg-gray-50 border border-gray-200 rounded-lg py-2 pr-10 pl-4 text-sm focus:border-green-500 outline-none"
                          placeholder="اختر عضو..."
                          value={memberName}
                          onChange={e => setMemberName(e.target.value)}
                        />
                     </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                     <div className="space-y-1">
                        <label className="text-xs font-bold text-gray-500">الوزن الحالي</label>
                        <input 
                          type="number" 
                          className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2 text-sm focus:border-green-500 outline-none"
                          value={currentWeight}
                          onChange={e => setCurrentWeight(e.target.value)}
                        />
                     </div>
                     <div className="space-y-1">
                        <label className="text-xs font-bold text-gray-500">الهدف</label>
                        <input 
                          type="number" 
                          className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2 text-sm focus:border-green-500 outline-none"
                          value={targetWeight}
                          onChange={e => setTargetWeight(e.target.value)}
                        />
                     </div>
                  </div>
                  <div className="space-y-1">
                     <div className="flex justify-between">
                       <label className="text-xs font-bold text-gray-500">السعرات المستهدفة</label>
                       <button onClick={() => setIsCalcOpen(true)} className="text-[10px] text-blue-600 font-bold hover:underline flex items-center gap-1">
                         <Calculator className="w-3 h-3" /> حساب الاحتياج
                       </button>
                     </div>
                     <div className="relative">
                        <Target className="absolute right-3 top-2.5 w-4 h-4 text-gray-400" />
                        <input 
                          type="number" 
                          className="w-full bg-gray-50 border border-gray-200 rounded-lg py-2 pr-10 pl-4 text-sm focus:border-green-500 outline-none"
                          value={dailyCalories}
                          onChange={e => setDailyCalories(Number(e.target.value))}
                        />
                     </div>
                  </div>
               </div>
            </div>

            <div className="bg-gray-900 text-white rounded-2xl shadow-lg p-6">
               <h3 className="font-bold mb-4 flex items-center gap-2">
                  <Activity className="w-5 h-5 text-yellow-500" />
                  ملخص العناصر
               </h3>
               
               <div className="mb-6 text-center">
                  <div className="inline-flex items-center justify-center w-24 h-24 rounded-full border-4 border-yellow-500 mb-2">
                     <span className="text-2xl font-black">{totalCalories}</span>
                  </div>
                  <p className="text-sm text-gray-400">إجمالي السعرات</p>
                  <p className={`text-xs font-bold mt-1 ${totalCalories > dailyCalories ? 'text-red-400' : 'text-green-400'}`}>
                     {totalCalories > dailyCalories ? `+${totalCalories - dailyCalories} زائد` : `${dailyCalories - totalCalories} متبقي`}
                  </p>
               </div>

               <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                     <span className="text-gray-400">بروتين</span>
                     <span className="font-bold">{totalProtein}g</span>
                  </div>
                  <div className="w-full bg-gray-700 h-1.5 rounded-full overflow-hidden">
                     <div className="bg-blue-500 h-full" style={{width: '40%'}}></div>
                  </div>

                  <div className="flex justify-between text-sm">
                     <span className="text-gray-400">كربوهيدرات</span>
                     <span className="font-bold">{totalCarbs}g</span>
                  </div>
                  <div className="w-full bg-gray-700 h-1.5 rounded-full overflow-hidden">
                     <div className="bg-yellow-500 h-full" style={{width: '50%'}}></div>
                  </div>

                  <div className="flex justify-between text-sm">
                     <span className="text-gray-400">دهون</span>
                     <span className="font-bold">{totalFats}g</span>
                  </div>
                  <div className="w-full bg-gray-700 h-1.5 rounded-full overflow-hidden">
                     <div className="bg-red-500 h-full" style={{width: '20%'}}></div>
                  </div>
               </div>
            </div>
         </div>

         {/* Main Content: Meal Planner */}
         <div className="lg:col-span-2 space-y-6 overflow-y-auto h-[calc(100vh-200px)] pr-2 pb-10">
            {plan.map((time) => (
               <div key={time.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                  <div className="bg-gray-50 p-4 flex justify-between items-center border-b border-gray-100">
                     <h3 className="font-bold text-gray-800 flex items-center gap-2">
                        <time.icon className="w-5 h-5 text-gray-500" />
                        {time.label}
                     </h3>
                     <button 
                       onClick={() => addMeal(time.id)}
                       className="text-xs bg-white border border-gray-200 text-gray-600 px-3 py-1.5 rounded-lg font-bold hover:bg-green-50 hover:text-green-600 hover:border-green-200 transition flex items-center gap-1"
                     >
                        <Plus className="w-3 h-3" /> إضافة وجبة
                     </button>
                  </div>
                  
                  <div className="p-4 space-y-3">
                     {time.meals.length === 0 && (
                        <p className="text-center text-sm text-gray-400 py-4 italic">لا توجد وجبات مضافة</p>
                     )}
                     {time.meals.map((meal) => (
                        <div key={meal.id} className="flex flex-col sm:flex-row gap-3 items-start sm:items-center bg-gray-50/50 p-3 rounded-xl border border-gray-100 group">
                           <div className="flex-1 w-full">
                              <input 
                                type="text" 
                                placeholder="اسم الوجبة (مثال: 2 بيضة مسلوقة + توست)" 
                                className="w-full bg-transparent font-bold text-gray-800 placeholder-gray-400 outline-none"
                                value={meal.name}
                                onChange={e => updateMeal(time.id, meal.id, 'name', e.target.value)}
                              />
                           </div>
                           <div className="flex gap-2 items-center w-full sm:w-auto">
                              <div className="flex items-center gap-1 bg-white px-2 py-1 rounded border border-gray-200">
                                 <span className="text-[10px] text-gray-400">سعرات</span>
                                 <input type="number" className="w-12 text-center text-xs font-bold outline-none" placeholder="0" value={meal.calories || ''} onChange={e => updateMeal(time.id, meal.id, 'calories', Number(e.target.value))} />
                              </div>
                              <div className="flex items-center gap-1 bg-white px-2 py-1 rounded border border-gray-200">
                                 <span className="text-[10px] text-blue-400">P</span>
                                 <input type="number" className="w-8 text-center text-xs font-bold outline-none" placeholder="0" value={meal.protein || ''} onChange={e => updateMeal(time.id, meal.id, 'protein', Number(e.target.value))} />
                              </div>
                              <div className="flex items-center gap-1 bg-white px-2 py-1 rounded border border-gray-200">
                                 <span className="text-[10px] text-yellow-500">C</span>
                                 <input type="number" className="w-8 text-center text-xs font-bold outline-none" placeholder="0" value={meal.carbs || ''} onChange={e => updateMeal(time.id, meal.id, 'carbs', Number(e.target.value))} />
                              </div>
                              <div className="flex items-center gap-1 bg-white px-2 py-1 rounded border border-gray-200">
                                 <span className="text-[10px] text-red-400">F</span>
                                 <input type="number" className="w-8 text-center text-xs font-bold outline-none" placeholder="0" value={meal.fats || ''} onChange={e => updateMeal(time.id, meal.id, 'fats', Number(e.target.value))} />
                              </div>
                              <button 
                                onClick={() => removeMeal(time.id, meal.id)}
                                className="p-1.5 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded transition"
                              >
                                 <Trash2 className="w-4 h-4" />
                              </button>
                           </div>
                        </div>
                     ))}
                  </div>
               </div>
            ))}
         </div>
      </div>

      {/* Calculator Modal */}
      {isCalcOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in">
           <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95">
              <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                 <h3 className="font-bold text-gray-800 flex items-center gap-2">
                    <Calculator className="w-5 h-5 text-yellow-500" />
                    حساب احتياج السعرات (TDEE)
                 </h3>
                 <button onClick={() => setIsCalcOpen(false)} className="p-1 rounded-full hover:bg-gray-200"><X className="w-5 h-5 text-gray-500" /></button>
              </div>
              <div className="p-6 space-y-4">
                 <div className="grid grid-cols-2 gap-3">
                    <div>
                       <label className="text-xs font-bold text-gray-500 mb-1 block">النوع</label>
                       <select 
                         className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2 text-sm focus:border-yellow-500 outline-none"
                         value={calcData.gender}
                         onChange={e => setCalcData({...calcData, gender: e.target.value})}
                       >
                          <option value="male">ذكر</option>
                          <option value="female">أنثى</option>
                       </select>
                    </div>
                    <div>
                       <label className="text-xs font-bold text-gray-500 mb-1 block">العمر</label>
                       <input 
                         type="number" 
                         className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2 text-sm focus:border-yellow-500 outline-none"
                         value={calcData.age}
                         onChange={e => setCalcData({...calcData, age: e.target.value})}
                       />
                    </div>
                 </div>
                 <div className="grid grid-cols-2 gap-3">
                    <div>
                       <label className="text-xs font-bold text-gray-500 mb-1 block">الطول (سم)</label>
                       <input 
                         type="number" 
                         className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2 text-sm focus:border-yellow-500 outline-none"
                         value={calcData.height}
                         onChange={e => setCalcData({...calcData, height: e.target.value})}
                       />
                    </div>
                    <div>
                       <label className="text-xs font-bold text-gray-500 mb-1 block">الوزن (كجم)</label>
                       <input 
                         type="number" 
                         className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2 text-sm focus:border-yellow-500 outline-none"
                         value={calcData.weight}
                         onChange={e => setCalcData({...calcData, weight: e.target.value})}
                       />
                    </div>
                 </div>
                 <div>
                    <label className="text-xs font-bold text-gray-500 mb-1 block">مستوى النشاط</label>
                    <select 
                      className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2 text-sm focus:border-yellow-500 outline-none"
                      value={calcData.activity}
                      onChange={e => setCalcData({...calcData, activity: e.target.value})}
                    >
                       <option value="1.2">خامل (مكتب / لا رياضة)</option>
                       <option value="1.375">نشاط خفيف (رياضة 1-3 أيام)</option>
                       <option value="1.55">نشاط متوسط (رياضة 3-5 أيام)</option>
                       <option value="1.725">نشاط عالي (رياضة 6-7 أيام)</option>
                       <option value="1.9">نشاط عالي جداً (تمارين قاسية / عمل شاق)</option>
                    </select>
                 </div>
                 
                 <button 
                   onClick={calculateTDEE}
                   disabled={!calcData.weight || !calcData.height || !calcData.age}
                   className="w-full bg-yellow-500 text-black font-bold py-3 rounded-xl hover:bg-yellow-400 transition mt-4 flex items-center justify-center gap-2 disabled:opacity-50"
                 >
                    <Check className="w-4 h-4" />
                    حساب وتطبيق
                 </button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default NutritionPlan;
