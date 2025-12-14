
import React, { useState, useEffect } from 'react';
import { 
  Megaphone, Tag, Plus, TrendingUp, Users, BarChart3, 
  Calendar, Send, Copy, Trash2, CheckCircle, Percent, X, Save, Sparkles, Loader2, Share2, 
  ThumbsUp, MessageCircle, Wand2, RefreshCw, Hash, Globe, Eye
} from 'lucide-react';
import StatCard from '../../../common/cards/StatCard';
import { getGeminiResponse } from '@/services/geminiService';
import { useToast } from '../../../common/ToastContext';

const initialCampaigns = [
  { id: 1, title: 'عروض الجمعة البيضاء', type: 'Public Offer', status: 'active', reach: 15000, clicks: 4500, date: '2025-11-20' },
  { id: 2, title: 'خصم خاص للعملاء الجدد', type: 'Social', status: 'scheduled', reach: 5000, clicks: 0, date: '2025-12-01' },
  { id: 3, title: 'تصفية الشتاء', type: 'Email', status: 'ended', reach: 3200, clicks: 890, date: '2025-10-15' },
];

const initialCoupons = [
  { id: 1, code: 'WELCOME20', discount: '20%', usage: '15/100', status: 'active', expiry: '2025-12-31', limitPerUser: 1 },
  { id: 2, code: 'FREESHIP', discount: 'شحن مجاني', usage: '45/50', status: 'active', expiry: '2025-11-30', limitPerUser: 1 },
];

const MarketingManager: React.FC = () => {
  const { showToast } = useToast();
  const [activeTab, setActiveTab] = useState<'campaigns' | 'coupons' | 'ai_creator'>('campaigns');
  const [campaigns, setCampaigns] = useState(initialCampaigns);
  const [coupons, setCoupons] = useState(initialCoupons);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // AI Creator State
  const [adParams, setAdParams] = useState({
    goal: 'زيادة المبيعات',
    platform: 'Marketplace',
    tone: 'حماسي',
    offer: ''
  });
  const [generatedAd, setGeneratedAd] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  
  // Offer/Coupon Form State
  const [offerForm, setOfferForm] = useState({
    title: '',
    description: '',
    discountType: 'percent', // percent, fixed
    discountValue: '',
    startDate: new Date().toISOString().split('T')[0],
    endDate: '',
    isPublic: true, // Publish to marketplace
    code: '', // For coupons
    limit: '100'
  });

  const handleCreate = (e: React.FormEvent) => {
      e.preventDefault();
      
      if (activeTab === 'coupons') {
          // Logic for creating a coupon
          const newCoupon = {
              id: Date.now(),
              code: offerForm.code || 'NEWCODE',
              discount: offerForm.discountValue + (offerForm.discountType === 'percent' ? '%' : ' ج.م'),
              usage: `0/${offerForm.limit}`,
              status: 'active',
              expiry: offerForm.endDate || '2025-12-31',
              limitPerUser: 1
          };
          setCoupons([newCoupon, ...coupons]);
          showToast('تم إنشاء الكوبون بنجاح', 'success');
      } else {
          // Logic for creating a campaign/offer
          const newCamp = {
              id: Date.now(),
              title: offerForm.title,
              type: offerForm.isPublic ? 'Public Offer' : 'Private Campaign',
              status: 'active',
              reach: 0,
              clicks: 0,
              date: offerForm.startDate
          };
          setCampaigns([newCamp, ...campaigns]);
          
          if (offerForm.isPublic) {
            showToast('تم نشر العرض في الصفحة الرئيسية للمتجر بنجاح!', 'success');
          } else {
            showToast('تم حفظ الحملة', 'success');
          }
      }
      setIsModalOpen(false);
  };

  const generateAd = async () => {
    if (!adParams.offer) return;
    setIsGenerating(true);
    try {
        const prompt = `اكتب نص إعلاني جذاب لمنصة ${adParams.platform}، الهدف منه ${adParams.goal}، بأسلوب ${adParams.tone}. العرض هو: ${adParams.offer}. أضف هاشتاجات ورموز تعبيرية مناسبة. اجعل النص بالعامية المصرية المحببة.`;
        const desc = await getGeminiResponse(prompt);
        setGeneratedAd(desc);
    } catch (e) {
        console.error(e);
    } finally {
        setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 relative">
      {/* Stats Header */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard title="الحملات النشطة" value={campaigns.length.toString()} sub="حملات جارية" icon={Megaphone} color="blue" />
        <StatCard title="مشاهدات المتجر" value="12.5K" sub="من العروض العامة" icon={Globe} color="purple" />
        <StatCard title="الكوبونات المستخدمة" value="154" sub="كوبون" icon={Tag} color="green" />
        <StatCard title="معدل التحويل" value="4.2%" sub="+1.5% تحسن" icon={TrendingUp} color="orange" />
      </div>

      {/* Main Content */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden min-h-[600px] flex flex-col">
        {/* Tabs */}
        <div className="border-b border-gray-100 p-4 flex flex-col sm:flex-row justify-between items-center bg-gray-50 gap-4">
          <div className="flex gap-2 overflow-x-auto max-w-full pb-1">
            <button 
              onClick={() => setActiveTab('campaigns')}
              className={`px-4 py-2 rounded-xl text-sm font-bold transition flex items-center gap-2 whitespace-nowrap ${activeTab === 'campaigns' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-500 hover:bg-gray-200'}`}
            >
              <Megaphone className="w-4 h-4" /> العروض والحملات
            </button>
            <button 
              onClick={() => setActiveTab('coupons')}
              className={`px-4 py-2 rounded-xl text-sm font-bold transition flex items-center gap-2 whitespace-nowrap ${activeTab === 'coupons' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-500 hover:bg-gray-200'}`}
            >
              <Tag className="w-4 h-4" /> الكوبونات
            </button>
            <button 
              onClick={() => setActiveTab('ai_creator')}
              className={`px-4 py-2 rounded-xl text-sm font-bold transition flex items-center gap-2 whitespace-nowrap ${activeTab === 'ai_creator' ? 'bg-white shadow-sm text-purple-600' : 'text-gray-500 hover:bg-gray-200'}`}
            >
              <Sparkles className="w-4 h-4" /> مساعد التسويق (AI)
            </button>
          </div>
          
          {activeTab !== 'ai_creator' && (
            <button 
                onClick={() => setIsModalOpen(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-blue-700 transition flex items-center gap-2 shadow-md whitespace-nowrap"
            >
                <Plus className="w-4 h-4" />
                {activeTab === 'campaigns' ? 'إضافة عرض جديد' : 'كوبون جديد'}
            </button>
          )}
        </div>

        <div className="p-6 flex-1 overflow-y-auto">
          {activeTab === 'campaigns' && (
            <div className="space-y-4">
               <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 mb-6 flex items-start gap-3">
                  <Globe className="w-6 h-6 text-blue-600 mt-1" />
                  <div>
                     <h4 className="font-bold text-blue-900">نصيحة: العروض العامة</h4>
                     <p className="text-sm text-blue-700">العروض التي يتم تحديدها كـ "عرض عام" تظهر تلقائياً في الصفحة الرئيسية للمتجر وفي قسم العروض والخصومات لجميع المستخدمين.</p>
                  </div>
               </div>

              {campaigns.map((camp) => (
                <div key={camp.id} className="flex flex-col md:flex-row items-center gap-4 p-4 border border-gray-100 rounded-2xl hover:shadow-md transition group bg-white">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold shadow-sm
                    ${camp.type === 'Public Offer' ? 'bg-green-500' : camp.type === 'Social' ? 'bg-blue-500' : 'bg-purple-500'}`}>
                    {camp.type === 'Public Offer' ? <Globe className="w-6 h-6" /> : <Share2 className="w-6 h-6" />}
                  </div>
                  <div className="flex-1 w-full text-center md:text-right">
                    <div className="flex items-center justify-center md:justify-start gap-2">
                        <h4 className="font-bold text-gray-900">{camp.title}</h4>
                        {camp.type === 'Public Offer' && <span className="text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-bold">معروض للجميع</span>}
                    </div>
                    <div className="flex items-center justify-center md:justify-start gap-3 text-xs text-gray-500 mt-1">
                      <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {camp.date}</span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        camp.status === 'active' ? 'bg-green-100 text-green-700' : 
                        camp.status === 'scheduled' ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-600'
                      }`}>
                        {camp.status === 'active' ? 'نشط' : camp.status === 'scheduled' ? 'مجدول' : 'منتهي'}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex gap-8 w-full md:w-auto justify-center border-t md:border-t-0 pt-3 md:pt-0 border-gray-50">
                    <div className="text-center">
                      <p className="text-xs text-gray-400 font-bold mb-1">الوصول</p>
                      <p className="font-black text-gray-800">{camp.reach.toLocaleString()}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-gray-400 font-bold mb-1">النقرات / الحجز</p>
                      <p className="font-black text-gray-800">{camp.clicks}</p>
                    </div>
                  </div>

                  <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-400 hover:text-blue-600 transition">
                    <BarChart3 className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'coupons' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {coupons.map((coupon) => (
                <div key={coupon.id} className="border-2 border-dashed border-gray-200 rounded-2xl p-5 hover:border-blue-200 transition group bg-gray-50/50">
                  <div className="flex justify-between items-start mb-4">
                    <div className="bg-white p-2 rounded-lg shadow-sm">
                      <Percent className="w-6 h-6 text-blue-600" />
                    </div>
                    <button className="text-gray-400 hover:text-red-500 transition">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <div className="text-center mb-4">
                    <h3 className="text-2xl font-black text-gray-800 tracking-wider">{coupon.code}</h3>
                    <p className="text-sm font-bold text-blue-600 mt-1">{coupon.discount} خصم</p>
                    <p className="text-[10px] text-gray-400 mt-1">الحد: {coupon.limitPerUser} لكل عميل</p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>الاستخدام</span>
                      <span className="font-bold">{coupon.usage}</span>
                    </div>
                    <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full ${coupon.status === 'expired' ? 'bg-gray-400' : 'bg-blue-500'}`} 
                        style={{ width: `${(parseInt(coupon.usage.split('/')[0]) / parseInt(coupon.usage.split('/')[1])) * 100}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between items-center pt-2 mt-2 border-t border-gray-200">
                      <span className="text-[10px] text-gray-400">ينتهي: {coupon.expiry}</span>
                      <button className="text-xs font-bold flex items-center gap-1 text-gray-600 hover:text-blue-600 transition">
                        <Copy className="w-3 h-3" /> نسخ
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'ai_creator' && (
             // Existing AI Creator UI
             <div className="flex flex-col items-center justify-center h-full text-center p-8">
                 <Sparkles className="w-16 h-16 text-purple-300 mb-4" />
                 <h3 className="text-xl font-bold text-gray-700 mb-2">مساعد التسويق الذكي</h3>
                 <p className="text-gray-500 max-w-md mb-6">دع الذكاء الاصطناعي يكتب لك نصوص إعلانية جذابة لمنصات التواصل الاجتماعي.</p>
                 <div className="bg-gray-50 p-6 rounded-2xl w-full max-w-lg border border-gray-200">
                    <textarea 
                        className="w-full bg-white border border-gray-200 rounded-xl p-3 mb-4 outline-none focus:ring-2 focus:ring-purple-500/20 h-32 resize-none"
                        placeholder="اكتب تفاصيل العرض هنا... (مثال: خصم 20% على جميع الوجبات بمناسبة العيد)"
                        value={adParams.offer}
                        onChange={(e) => setAdParams({...adParams, offer: e.target.value})}
                    ></textarea>
                    <button 
                        onClick={generateAd}
                        disabled={!adParams.offer || isGenerating}
                        className="w-full bg-purple-600 text-white py-3 rounded-xl font-bold hover:bg-purple-700 transition flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                        {isGenerating ? <Loader2 className="w-5 h-5 animate-spin" /> : <Wand2 className="w-5 h-5" />}
                        توليد الإعلان
                    </button>

                    {generatedAd && (
                        <div className="mt-4 text-right bg-white p-4 rounded-xl border border-purple-100 text-sm text-gray-700 leading-relaxed animate-in fade-in">
                            {generatedAd}
                            <div className="mt-2 pt-2 border-t border-gray-100 flex justify-end">
                                <button onClick={() => navigator.clipboard.writeText(generatedAd)} className="text-xs font-bold text-purple-600 flex items-center gap-1">
                                    <Copy className="w-3 h-3" /> نسخ
                                </button>
                            </div>
                        </div>
                    )}
                 </div>
             </div>
          )}
        </div>
      </div>

      {/* Modal for Create */}
      {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-in fade-in">
              <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></div>
              <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md relative z-10 p-6 max-h-[90vh] overflow-y-auto">
                  <div className="flex justify-between items-center mb-4">
                      <h3 className="font-bold text-lg text-gray-800">{activeTab === 'coupons' ? 'إضافة كوبون جديد' : 'إضافة عرض / حملة'}</h3>
                      <button onClick={() => setIsModalOpen(false)}><X className="w-5 h-5 text-gray-500" /></button>
                  </div>
                  <form onSubmit={handleCreate} className="space-y-4">
                      
                      <div>
                        <label className="text-xs font-bold text-gray-600 mb-1 block">عنوان العرض / الكود</label>
                        <input 
                          type="text" 
                          className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 focus:border-blue-500 outline-none"
                          placeholder={activeTab === 'coupons' ? 'مثال: SALE50' : 'مثال: خصم الشتاء الكبر'}
                          value={activeTab === 'coupons' ? offerForm.code : offerForm.title}
                          onChange={e => setOfferForm({...offerForm, [activeTab === 'coupons' ? 'code' : 'title']: e.target.value})}
                          required
                        />
                      </div>

                      {activeTab !== 'coupons' && (
                        <div>
                          <label className="text-xs font-bold text-gray-600 mb-1 block">الوصف</label>
                          <textarea 
                             className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 focus:border-blue-500 outline-none h-20 resize-none"
                             placeholder="تفاصيل العرض التي ستظهر للعملاء..."
                             value={offerForm.description}
                             onChange={e => setOfferForm({...offerForm, description: e.target.value})}
                          ></textarea>
                        </div>
                      )}

                      <div className="grid grid-cols-2 gap-4">
                         <div>
                            <label className="text-xs font-bold text-gray-600 mb-1 block">قيمة الخصم</label>
                            <input 
                              type="number" 
                              className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 focus:border-blue-500 outline-none"
                              placeholder="20"
                              value={offerForm.discountValue}
                              onChange={e => setOfferForm({...offerForm, discountValue: e.target.value})}
                            />
                         </div>
                         <div>
                            <label className="text-xs font-bold text-gray-600 mb-1 block">نوع الخصم</label>
                            <select 
                              className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 focus:border-blue-500 outline-none"
                              value={offerForm.discountType}
                              onChange={e => setOfferForm({...offerForm, discountType: e.target.value})}
                            >
                               <option value="percent">نسبة مئوية (%)</option>
                               <option value="fixed">مبلغ ثابت (ج.م)</option>
                            </select>
                         </div>
                      </div>

                      {activeTab === 'campaigns' && (
                          <div className="bg-green-50 p-3 rounded-xl border border-green-200">
                              <label className="flex items-center gap-3 cursor-pointer">
                                  <input 
                                    type="checkbox" 
                                    className="w-5 h-5 accent-green-600"
                                    checked={offerForm.isPublic}
                                    onChange={e => setOfferForm({...offerForm, isPublic: e.target.checked})}
                                  />
                                  <div>
                                      <span className="font-bold text-sm text-green-800 block">نشر في المتجر (Marketplace)</span>
                                      <span className="text-xs text-green-600 block">سيظهر العرض لجميع مستخدمي راي في صفحة العروض</span>
                                  </div>
                              </label>
                          </div>
                      )}

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-xs font-bold text-gray-600 mb-1 block">تاريخ البدء</label>
                            <input type="date" className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3" value={offerForm.startDate} onChange={e => setOfferForm({...offerForm, startDate: e.target.value})} />
                        </div>
                        <div>
                            <label className="text-xs font-bold text-gray-600 mb-1 block">تاريخ الانتهاء</label>
                            <input type="date" className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3" value={offerForm.endDate} onChange={e => setOfferForm({...offerForm, endDate: e.target.value})} />
                        </div>
                      </div>
                      
                      <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition flex items-center justify-center gap-2 shadow-lg">
                          <Save className="w-4 h-4" /> {activeTab === 'coupons' ? 'حفظ الكوبون' : 'نشر العرض'}
                      </button>
                  </form>
              </div>
          </div>
      )}
    </div>
  );
};

export default MarketingManager;
