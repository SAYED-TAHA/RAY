
import React, { useState } from 'react';
import { Heart, ShoppingBag, CalendarClock, Star, Cuboid, Image as ImageIcon, Eye } from 'lucide-react';
import { useMarketplace } from '@/context/MarketplaceContext';
import ReservationModal from '../modals/ReservationModal';

interface ProductCardProps {
  product: any;
  compact?: boolean;
  onClick?: (id: string) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, compact = false, onClick }) => {
  const { addToCart, toggleFavorite, isFavorite } = useMarketplace();
  const [viewMode, setViewMode] = useState<'image' | '3d'>('image');
  const [isReserveModalOpen, setIsReserveModalOpen] = useState(false);

  const isFav = isFavorite(product.id);

  const handleReserve = (deposit: number, date: string) => {
    addToCart({ ...product, name: `حجز: ${product.name} (${date})` }, true, deposit);
    setIsReserveModalOpen(false);
  };

  const handleClick = () => {
    if (onClick) {
      onClick(product.id);
    } else {
      // Fallback for non-router environments
      window.location.href = `/product/${product.id}`;
    }
  };

  return (
    <>
      <div className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden relative h-full">
        
        {/* Image / 3D Area */}
        <div className="relative aspect-[4/3] bg-gray-50 overflow-hidden">
          {/* 3D Toggle Button */}
          {product.model3d && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setViewMode(prev => prev === 'image' ? '3d' : 'image');
              }}
              className={`absolute top-3 left-3 z-20 p-2 rounded-lg backdrop-blur-md shadow-sm transition flex items-center gap-1 text-xs font-bold
                ${viewMode === '3d' ? 'bg-ray-blue text-white' : 'bg-white/80 text-gray-700 hover:bg-white'}
              `}
            >
              {viewMode === '3d' ? <ImageIcon className="w-4 h-4" /> : <Cuboid className="w-4 h-4" />}
              {viewMode === '3d' ? 'صور' : '3D'}
            </button>
          )}

          {/* Favorite Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleFavorite(product);
            }}
            className={`absolute top-3 right-3 z-20 p-2 rounded-full backdrop-blur-md shadow-sm transition 
              ${isFav ? 'bg-red-50 text-red-500' : 'bg-white/80 text-gray-400 hover:text-red-500 hover:bg-white'}
            `}
          >
            <Heart className={`w-5 h-5 ${isFav ? 'fill-current' : ''}`} />
          </button>

          {/* Discount Badge */}
          {product.discount && (
             <div className="absolute bottom-3 right-3 z-20 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-lg shadow-md">
                {product.discount}
             </div>
          )}

          {/* Content */}
          <div onClick={handleClick} className="w-full h-full cursor-pointer">
            {viewMode === '3d' && product.model3d ? (
                // @ts-ignore
                <model-viewer
                    src={product.model3d}
                    alt={product.name}
                    auto-rotate
                    camera-controls
                    ar
                    shadow-intensity="1"
                    style={{ width: '100%', height: '100%' }}
                />
            ) : (
                <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                    loading="lazy" 
                />
            )}
          </div>
        </div>

        {/* Info Area */}
        <div className="p-4 flex-1 flex flex-col">
          <div className="flex justify-between items-start mb-2">
             <div className="flex flex-col">
                <h3 
                    onClick={handleClick}
                    className="font-bold text-gray-900 text-base line-clamp-1 cursor-pointer hover:text-ray-blue transition"
                >
                    {product.name}
                </h3>
                <p className="text-xs text-gray-500">{product.shop || product.merchant}</p>
             </div>
             <div className="flex items-center gap-1 bg-yellow-50 px-1.5 py-0.5 rounded text-yellow-700 text-xs font-bold">
                <Star className="w-3 h-3 fill-current" />
                {product.rating || 4.5}
             </div>
          </div>

          {/* Price */}
          <div className="mt-auto pt-3 border-t border-gray-50 flex items-center justify-between">
             <div className="flex flex-col">
                <span className="text-lg font-black text-ray-blue">{product.price} <span className="text-xs font-normal text-gray-500">ج.م</span></span>
                {product.oldPrice && <span className="text-xs text-gray-400 line-through">{product.oldPrice} ج.م</span>}
             </div>
             
             {/* Action Buttons */}
             <div className="flex gap-2">
                <button 
                    onClick={() => setIsReserveModalOpen(true)}
                    className="p-2.5 rounded-xl bg-purple-50 text-purple-600 hover:bg-purple-600 hover:text-white transition shadow-sm"
                    title="حجز (عربون)"
                >
                    <CalendarClock className="w-5 h-5" />
                </button>
                <button 
                    onClick={() => addToCart(product)}
                    className="p-2.5 rounded-xl bg-ray-black text-white hover:bg-ray-gold hover:text-ray-black transition shadow-md active:scale-95"
                    title="إضافة للسلة"
                >
                    <ShoppingBag className="w-5 h-5" />
                </button>
             </div>
          </div>
        </div>

        {/* Quick View Overlay (Desktop) */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none hidden lg:flex items-center justify-center">
             <button onClick={handleClick} className="bg-white text-gray-900 px-4 py-2 rounded-full font-bold text-sm shadow-lg pointer-events-auto transform translate-y-4 group-hover:translate-y-0 transition duration-300 flex items-center gap-2">
                <Eye className="w-4 h-4" /> التفاصيل
             </button>
        </div>
      </div>

      <ReservationModal 
        isOpen={isReserveModalOpen}
        onClose={() => setIsReserveModalOpen(false)}
        product={product}
        onConfirm={handleReserve}
      />
    </>
  );
};

export default ProductCard;
