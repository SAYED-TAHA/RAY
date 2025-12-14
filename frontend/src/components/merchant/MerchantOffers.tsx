import React, { useState, useEffect } from 'react';
import { Tag, Clock, Percent, Star, Plus, Edit2, Trash2, Calendar, Loader, AlertCircle } from 'lucide-react';
import axios from 'axios';

interface Offer {
  id: number;
  title: string;
  description: string;
  discount: string;
  validUntil: string;
  type: 'percentage' | 'fixed' | 'buy1get1';
  status: 'active' | 'expired' | 'scheduled';
  minOrder?: number;
  maxDiscount?: number;
  applicableItems?: string[];
}

interface MerchantOffersProps {
  merchantId: string;
  isOwner?: boolean;
}

const MerchantOffers: React.FC<MerchantOffersProps> = ({ merchantId, isOwner = false }) => {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAddingOffer, setIsAddingOffer] = useState(false);
  const [editingOffer, setEditingOffer] = useState<Offer | null>(null);

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get<Offer[]>(`/api/merchants/${merchantId}/offers`);
        setOffers(response.data);
      } catch (err) {
        console.error('Error fetching offers:', err);
        setError('فشل في تحميل العروض');
        setOffers([]);
      } finally {
        setLoading(false);
      }
    };

    if (merchantId) {
      fetchOffers();
    }
  }, [merchantId]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-700';
      case 'expired': return 'bg-red-100 text-red-700';
      case 'scheduled': return 'bg-blue-100 text-blue-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'نشط';
      case 'expired': return 'منتهي';
      case 'scheduled': return 'مجدول';
      default: return status;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'percentage': return <Percent className="w-4 h-4" />;
      case 'fixed': return <Tag className="w-4 h-4" />;
      case 'buy1get1': return <Plus className="w-4 h-4" />;
      default: return <Tag className="w-4 h-4" />;
    }
  };

  const handleDeleteOffer = async (offerId: number) => {
    try {
      await axios.delete(`/api/merchants/${merchantId}/offers/${offerId}`);
      setOffers(offers.filter(offer => offer.id !== offerId));
    } catch (err) {
      console.error('Error deleting offer:', err);
    }
  };

  const handleAddOffer = async () => {
    // This would open a form in a real implementation
    // For now, we just close the modal
    setIsAddingOffer(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Tag className="w-6 h-6 text-ray-gold" />
          <h2 className="text-2xl font-bold text-gray-900">العروض والتخفيضات</h2>
        </div>
        
        {isOwner && (
          <button
            onClick={() => setIsAddingOffer(true)}
            className="flex items-center gap-2 bg-ray-gold text-ray-black px-4 py-2 rounded-lg font-bold hover:bg-ray-gold/90 transition"
          >
            <Plus className="w-4 h-4" />
            إضافة عرض
          </button>
        )}
      </div>

      {/* Loading State */}
      {loading ? (
        <div className="flex justify-center items-center py-20">
          <Loader className="w-8 h-8 text-blue-500 animate-spin" />
          <span className="mr-2">جاري تحميل العروض...</span>
        </div>
      ) : error ? (
        <div className="bg-red-50 p-4 rounded-lg text-red-700 flex items-center justify-center gap-2">
          <AlertCircle className="w-5 h-5" />
          <span>{error}</span>
        </div>
      ) : (
      <>
      {/* Offers Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {offers.map((offer) => (
          <div key={offer.id} className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-lg transition">
            {/* Header */}
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-ray-gold/10 rounded-lg">
                  {getTypeIcon(offer.type)}
                </div>
                <div>
                  <span className={`inline-block px-2 py-1 rounded-full text-xs font-bold ${getStatusColor(offer.status)}`}>
                    {getStatusText(offer.status)}
                  </span>
                </div>
              </div>
              
              {isOwner && (
                <div className="flex gap-1">
                  <button className="p-1 hover:bg-gray-100 rounded transition">
                    <Edit2 className="w-3 h-3 text-gray-500" />
                  </button>
                  <button 
                    onClick={() => handleDeleteOffer(offer.id)}
                    className="p-1 hover:bg-red-50 rounded transition"
                  >
                    <Trash2 className="w-3 h-3 text-red-500" />
                  </button>
                </div>
              )}
            </div>

            {/* Content */}
            <h3 className="font-bold text-gray-900 mb-2">{offer.title}</h3>
            <p className="text-sm text-gray-600 mb-3">{offer.description}</p>

            {/* Discount Badge */}
            <div className="bg-gradient-to-r from-ray-gold to-yellow-400 text-ray-black px-3 py-1 rounded-lg text-center font-bold mb-3">
              {offer.discount}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between text-xs text-gray-500">
              <div className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                <span>ينتهي: {offer.validUntil}</span>
              </div>
              {offer.minOrder && (
                <span>أقل طلب: {offer.minOrder} جنيه</span>
              )}
            </div>

            {/* Action Button */}
            {!isOwner && offer.status === 'active' && (
              <button className="w-full mt-3 bg-ray-blue text-white py-2 rounded-lg font-bold hover:bg-ray-blue/90 transition">
                استخدم العرض
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Empty State */}
      {offers.length === 0 && (
        <div className="text-center py-12">
          <Tag className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-bold text-gray-900 mb-2">لا توجد عروض حالياً</h3>
          <p className="text-gray-500 mb-4">
            {isOwner ? 'ابدأ بإضافة عروض جذابة لجذب المزيد من العملاء' : 'تحقق لاحقاً للحصول على أفضل العروض'}
          </p>
          {isOwner && (
            <button
              onClick={() => setIsAddingOffer(true)}
              className="bg-ray-gold text-ray-black px-6 py-2 rounded-lg font-bold hover:bg-ray-gold/90 transition"
            >
              إضافة أول عرض
            </button>
          )}
        </div>
      )}
      </>
      )}

      {/* Add Offer Modal (placeholder) */}
      {isAddingOffer && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl p-6 max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">إضافة عرض جديد</h3>
            <p className="text-gray-600 mb-4">هذه واجهة مؤقتة - سيتم استبدالها بفورم كامل</p>
            <div className="flex gap-2">
              <button
                onClick={handleAddOffer}
                className="flex-1 bg-ray-gold text-ray-black py-2 rounded-lg font-bold"
              >
                إضافة
              </button>
              <button
                onClick={() => setIsAddingOffer(false)}
                className="flex-1 bg-gray-200 text-gray-800 py-2 rounded-lg font-bold"
              >
                إلغاء
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MerchantOffers;
