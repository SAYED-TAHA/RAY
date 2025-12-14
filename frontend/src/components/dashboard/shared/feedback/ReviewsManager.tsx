
import React, { useState } from 'react';
import { Star, MessageSquare, ThumbsUp, Filter, Search, Reply, User, MoreVertical, CheckCircle } from 'lucide-react';

const reviewsData = [
  { id: 1, user: 'أحمد محمد', rating: 5, date: '2025-11-20', comment: 'تجربة ممتازة، المنتج مطابق للمواصفات والتوصيل سريع جداً.', reply: '', status: 'published', avatar: 'A' },
  { id: 2, user: 'سارة علي', rating: 4, date: '2025-11-19', comment: 'الجودة جيدة ولكن السعر مرتفع قليلاً مقارنة بالسوق.', reply: 'شكراً لملاحظتك يا سارة، نسعى دائماً لتقديم أفضل قيمة لعملائنا.', status: 'replied', avatar: 'S' },
  { id: 3, user: 'كريم حسن', rating: 2, date: '2025-11-18', comment: 'التغليف كان سيئاً والمنتج وصل مخدوش للأسف.', reply: '', status: 'pending', avatar: 'K' },
];

const ReviewsManager: React.FC = () => {
  const [reviews, setReviews] = useState(reviewsData);
  const [replyText, setReplyText] = useState('');
  const [activeReplyId, setActiveReplyId] = useState<number | null>(null);
  const [filter, setFilter] = useState('all');

  const filteredReviews = reviews.filter(r => filter === 'all' || r.status === filter);

  const handleReplySubmit = (id: number) => {
    if (!replyText.trim()) return;
    setReviews(prev => prev.map(r => r.id === id ? { ...r, reply: replyText, status: 'replied' } : r));
    setActiveReplyId(null);
    setReplyText('');
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
      {/* Stats Header */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center justify-center text-center">
           <h3 className="text-gray-500 font-bold mb-2 text-sm">متوسط التقييم</h3>
           <div className="flex items-center justify-center gap-2 mb-1">
              <span className="text-5xl font-black text-gray-900">4.5</span>
              <Star className="w-8 h-8 text-yellow-400 fill-current" />
           </div>
           <p className="text-xs text-gray-400 font-medium">من أصل 150 تقييم</p>
        </div>
        
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-center">
           <h3 className="text-gray-500 font-bold mb-4 text-sm">توزيع التقييمات</h3>
           <div className="space-y-2">
              {[5, 4, 3, 2, 1].map(star => (
                <div key={star} className="flex items-center gap-2 text-xs">
                  <span className="w-3 font-bold">{star}</span>
                  <Star className="w-3 h-3 text-yellow-400 fill-current" />
                  <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                     <div className="bg-yellow-400 h-full rounded-full" style={{width: `${star * 20}%`}}></div>
                  </div>
                </div>
              ))}
           </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center justify-center text-center">
           <h3 className="text-gray-500 font-bold mb-2 text-sm">معدل الرد</h3>
           <div className="flex items-center justify-center gap-2 mb-1">
              <span className="text-5xl font-black text-blue-600">92%</span>
           </div>
           <p className="text-xs text-gray-400 font-medium">ممتاز، استمر في التفاعل!</p>
        </div>
      </div>

      {/* Reviews List */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
         <div className="p-5 border-b border-gray-100 flex justify-between items-center bg-gray-50">
            <h2 className="font-bold text-gray-800 text-lg">آراء العملاء</h2>
            <div className="flex gap-2">
               <select 
                 className="bg-white border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-blue-500 cursor-pointer font-bold text-gray-600"
                 value={filter}
                 onChange={(e) => setFilter(e.target.value)}
               >
                  <option value="all">الكل</option>
                  <option value="published">منشور</option>
                  <option value="pending">بانتظار الرد</option>
               </select>
            </div>
         </div>

         <div className="divide-y divide-gray-50">
            {filteredReviews.map(review => (
               <div key={review.id} className="p-6 hover:bg-gray-50 transition">
                  <div className="flex justify-between items-start mb-4">
                     <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center font-bold text-gray-600 text-lg border border-gray-200">
                           {review.avatar}
                        </div>
                        <div>
                           <h4 className="font-bold text-gray-900">{review.user}</h4>
                           <div className="flex items-center gap-2 mt-1">
                             <div className="flex text-yellow-400"><Star className="w-3 h-3 fill-current" /></div>
                             <span className="text-xs text-gray-400 font-medium">{review.date}</span>
                           </div>
                        </div>
                     </div>
                     <div className="bg-yellow-50 px-3 py-1 rounded-lg border border-yellow-100 text-yellow-700 text-sm font-bold flex items-center gap-1">
                        {review.rating}.0 <Star className="w-3 h-3 fill-current" />
                     </div>
                  </div>

                  <p className="text-gray-600 text-sm leading-relaxed mb-4 pl-4 border-r-2 border-gray-100">
                     {review.comment}
                  </p>

                  <div className="pl-4">
                     {review.reply ? (
                        <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 flex gap-3 mt-4">
                           <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-blue-600 shrink-0 shadow-sm">
                              <Reply className="w-4 h-4" />
                           </div>
                           <div>
                              <p className="text-xs font-bold text-blue-800 mb-1">ردك:</p>
                              <p className="text-sm text-blue-700">{review.reply}</p>
                           </div>
                        </div>
                     ) : (
                        activeReplyId === review.id ? (
                           <div className="mt-4 space-y-3 animate-in fade-in">
                              <textarea 
                                className="w-full bg-white border border-gray-300 rounded-xl p-3 text-sm focus:border-blue-500 outline-none focus:ring-2 focus:ring-blue-100 transition resize-none"
                                rows={3}
                                placeholder="اكتب ردك هنا..."
                                value={replyText}
                                onChange={(e) => setReplyText(e.target.value)}
                                autoFocus
                              ></textarea>
                              <div className="flex justify-end gap-2">
                                 <button 
                                   onClick={() => setActiveReplyId(null)} 
                                   className="px-4 py-2 text-gray-500 text-sm font-bold hover:bg-gray-100 rounded-lg transition"
                                 >
                                    إلغاء
                                 </button>
                                 <button 
                                   onClick={() => handleReplySubmit(review.id)} 
                                   className="px-6 py-2 bg-blue-600 text-white text-sm font-bold rounded-lg hover:bg-blue-700 transition shadow-sm flex items-center gap-2"
                                 >
                                    <Reply className="w-4 h-4" /> إرسال الرد
                                 </button>
                              </div>
                           </div>
                        ) : (
                           <button 
                             onClick={() => setActiveReplyId(review.id)}
                             className="text-sm font-bold text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-lg transition flex items-center gap-2 w-fit mt-2"
                           >
                              <Reply className="w-4 h-4" />
                              الرد على العميل
                           </button>
                        )
                     )}
                  </div>
               </div>
            ))}
         </div>
      </div>
    </div>
  );
};

export default ReviewsManager;
