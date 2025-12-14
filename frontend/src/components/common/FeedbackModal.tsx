
import React, { useState } from 'react';
import { Star, X, ThumbsUp, MessageSquare } from 'lucide-react';

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (rating: number, comment: string) => void;
}

const FeedbackModal: React.FC<FeedbackModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [hoveredStar, setHoveredStar] = useState(0);

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (rating === 0) return;
    onSubmit(rating, comment);
    setRating(0);
    setComment('');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl w-full max-w-md p-6 relative animate-in zoom-in-95 duration-200 text-center">
        <button 
          onClick={onClose} 
          className="absolute top-4 left-4 p-2 hover:bg-gray-100 rounded-full text-gray-500 transition"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <ThumbsUp className="w-8 h-8 text-yellow-600" />
        </div>
        
        <h2 className="text-2xl font-black text-gray-900 mb-2">كيف كانت تجربتك؟</h2>
        <p className="text-gray-500 text-sm mb-6">رأيك يهمنا ويساعدنا على تحسين الخدمة</p>

        <div className="flex justify-center gap-2 mb-6">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              className="transition-transform hover:scale-110 focus:outline-none"
              onMouseEnter={() => setHoveredStar(star)}
              onMouseLeave={() => setHoveredStar(0)}
              onClick={() => setRating(star)}
            >
              <Star 
                className={`w-10 h-10 transition-colors ${
                  star <= (hoveredStar || rating) 
                    ? 'fill-yellow-400 text-yellow-400' 
                    : 'text-gray-200'
                }`} 
              />
            </button>
          ))}
        </div>

        <div className="relative mb-6">
          <MessageSquare className="absolute top-3 right-3 w-5 h-5 text-gray-400" />
          <textarea
            className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 pr-10 text-sm focus:outline-none focus:border-yellow-400 transition resize-none"
            rows={3}
            placeholder="أخبرنا المزيد عن تجربتك (اختياري)..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          ></textarea>
        </div>

        <button
          onClick={handleSubmit}
          disabled={rating === 0}
          className="w-full bg-gray-900 text-white py-3 rounded-xl font-bold hover:bg-black transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          إرسال التقييم
        </button>
      </div>
    </div>
  );
};

export default FeedbackModal;
