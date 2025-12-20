
import React, { useState } from 'react';
import { Star, MessageSquare, ThumbsUp, Send } from 'lucide-react';
import { API_URL } from '@/utils/api';

interface Review {
  id: number;
  name: string;
  rating: number;
  date: string;
  text: string;
}

interface MerchantReviewsProps {
  merchantId?: string;
}

const MerchantReviews: React.FC<MerchantReviewsProps> = ({ merchantId }) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  React.useEffect(() => {
    const fetchReviews = async () => {
      try {
        setIsLoading(true);
        const endpoint = merchantId 
          ? `${API_URL}/api/reviews?merchantId=${merchantId}`
          : `${API_URL}/api/reviews`;
        const response = await fetch(endpoint);
        if (response.ok) {
          const data = await response.json();
          setReviews(data);
        }
      } catch (error) {
        console.error('خطأ في جلب التقييمات:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchReviews();
  }, [merchantId]);
  const [newReview, setNewReview] = useState('');
  const [newRating, setNewRating] = useState(0);
  const [hoveredStar, setHoveredStar] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReview.trim() || newRating === 0) return;
    
    setIsSubmitting(true);
    // Simulate API
    setTimeout(() => {
      const review: Review = {
        id: Date.now(),
        name: 'مستخدم راي', // Should come from auth context
        rating: newRating,
        date: 'الآن',
        text: newReview
      };
      setReviews([review, ...reviews]);
      setNewReview('');
      setNewRating(0);
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <div className="space-y-6 animate-in fade-in">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-gray-900 flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-ray-blue" />
          التقييمات والآراء ({reviews.length})
        </h3>
        <button className="text-sm text-blue-600 font-bold hover:underline">عرض الكل</button>
      </div>

      {/* Add Review Form */}
      <div className="bg-gray-50 p-4 rounded-2xl border border-gray-200 mb-6">
        <h4 className="text-sm font-bold text-gray-700 mb-3">أضف تقييمك</h4>
        <div className="flex items-center gap-1 mb-3">
           {[1, 2, 3, 4, 5].map(star => (
             <button
               key={star}
               type="button"
               onClick={() => setNewRating(star)}
               onMouseEnter={() => setHoveredStar(star)}
               onMouseLeave={() => setHoveredStar(0)}
               className="transition-transform hover:scale-110"
             >
               <Star className={`w-6 h-6 ${star <= (hoveredStar || newRating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
             </button>
           ))}
        </div>
        <form onSubmit={handleSubmitReview} className="relative">
           <textarea 
             className="w-full bg-white border border-gray-200 rounded-xl p-3 text-sm focus:outline-none focus:border-ray-blue resize-none pr-12"
             rows={2}
             placeholder="اكتب رأيك هنا..."
             value={newReview}
             onChange={(e) => setNewReview(e.target.value)}
           ></textarea>
           <button 
             type="submit" 
             disabled={isSubmitting || !newReview.trim() || newRating === 0}
             className="absolute bottom-3 left-3 p-2 bg-ray-blue text-white rounded-full hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
           >
             <Send className="w-4 h-4 rtl:rotate-180" />
           </button>
        </form>
      </div>

      <div className="space-y-4">
        {reviews.map((review) => (
          <div key={review.id} className="p-5 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition">
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center font-bold text-gray-500 text-sm border border-gray-200">
                  {review.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-sm text-gray-900">{review.name}</h4>
                  <div className="flex text-yellow-400 text-xs mt-0.5">
                    {Array(5).fill(0).map((_, i) => <Star key={i} className={`w-3 h-3 ${i < review.rating ? 'fill-current' : 'text-gray-300'}`} />)}
                  </div>
                </div>
              </div>
              <span className="text-[10px] text-gray-400 bg-gray-50 px-2 py-1 rounded-full">{review.date}</span>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">{review.text}</p>
            
            <div className="flex items-center gap-4 mt-3 pt-3 border-t border-gray-50">
               <button className="flex items-center gap-1 text-xs text-gray-400 hover:text-blue-600 transition">
                  <ThumbsUp className="w-3 h-3" /> مفيد
               </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MerchantReviews;
