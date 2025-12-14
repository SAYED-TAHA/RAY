
import React, { useState } from 'react';
import { ArrowRight, Share2, Heart, ShieldCheck, Star, Clock, MapPin, Zap, TrendingUp, Award, Camera, Plus, X, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';

interface MerchantHeroProps {
  merchant: any;
  onBack: () => void;
  isFavorite: boolean;
  toggleFavorite: () => void;
  handleShare: () => void;
  showShareToast: boolean;
  customConfig?: any;
}

const MerchantHero: React.FC<MerchantHeroProps> = ({ 
  merchant, onBack, isFavorite, toggleFavorite, handleShare, showShareToast, customConfig
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  
  const heroImage = customConfig?.coverImage || merchant.cover || "https://images.unsplash.com/photo-1556740758-90de374c12ad?w=1200&q=80";
  const logoImage = customConfig?.logo || merchant.image;
  const name = customConfig?.name || merchant.name;
  
  // Mock gallery images - في الواقع ستأتي من قاعدة البيانات
  const galleryImages = [
    heroImage,
    "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&q=80",
    "https://images.unsplash.com/photo-1559329007-406870008023?w=1200&q=80",
    "https://images.unsplash.com/photo-1519167758481-a83e182b4aaf?w=1200&q=80",
    "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=1200&q=80"
  ];
  
  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length);
  };
  
  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };
  
  const openGallery = (index: number) => {
    setCurrentImageIndex(index);
    setIsGalleryOpen(true);
  };
  
  const closeGallery = () => {
    setIsGalleryOpen(false);
  };
  
  const colorMap: Record<string, string> = {
    blue: 'text-blue-600',
    green: 'text-green-600',
    red: 'text-red-600',
    orange: 'text-orange-600',
    purple: 'text-purple-600',
    black: 'text-gray-900',
  };
  const accentColor = customConfig ? colorMap[customConfig.primaryColor] : 'text-blue-600';

  return (
    <>
      {/* Sticky Header */}
      <div className="sticky top-0 z-40 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 shadow-sm px-4 h-16 flex items-center justify-between transition-all">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400 transition">
            <ArrowRight className="w-5 h-5" />
          </button>
          <h1 className="font-bold text-gray-800 dark:text-white text-lg truncate max-w-[200px]">{name}</h1>
        </div>
        <div className="flex gap-2">
          <button onClick={handleShare} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400 transition relative">
            <Share2 className="w-5 h-5" />
            {showShareToast && <div className="absolute top-full right-0 mt-2 bg-black dark:bg-white text-white dark:text-black text-xs py-1 px-2 rounded whitespace-nowrap animate-pulse">تم النسخ</div>}
          </button>
          <button onClick={toggleFavorite} className={`p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition ${isFavorite ? 'text-red-500' : 'text-gray-600 dark:text-gray-400'}`}>
            <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
          </button>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative bg-white dark:bg-gray-900 pb-8">
        {/* Cover Image with Gallery */}
        <div className="h-56 md:h-72 w-full bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-800 dark:to-gray-900 overflow-hidden relative group">
          <Image 
            src={galleryImages[currentImageIndex]} 
            alt="Cover"
            fill
            className="object-cover opacity-95 group-hover:opacity-100 transition duration-500"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
          
          {/* Gallery Controls */}
          <div className="absolute inset-0 flex items-center justify-between px-4 opacity-0 group-hover:opacity-100 transition duration-300">
            <button 
              onClick={prevImage}
              className="bg-black/50 backdrop-blur-sm text-white p-2 rounded-full hover:bg-black/70 transition"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
            <button 
              onClick={nextImage}
              className="bg-black/50 backdrop-blur-sm text-white p-2 rounded-full hover:bg-black/70 transition"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          </div>
          
          {/* Gallery Indicator */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
            {galleryImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-2 h-2 rounded-full transition duration-300 ${
                  index === currentImageIndex ? 'bg-white w-8' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
          
          {/* Gallery Button */}
          <button 
            onClick={() => openGallery(currentImageIndex)}
            className="absolute top-4 left-4 bg-black/50 backdrop-blur-sm text-white p-2 rounded-full hover:bg-black/70 transition flex items-center gap-2"
          >
            <Camera className="w-4 h-4" />
            <span className="text-xs font-bold">معرض الصور</span>
          </button>
          
          {/* Premium Badge */}
          <div className="absolute top-4 right-4 bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg">
            <Award className="w-3 h-3" />
            موثق ومميز
          </div>
        </div>
        
        {/* Content */}
        <div className="px-4 max-w-4xl mx-auto relative -mt-24 flex flex-col items-center text-center mb-6">
          {/* Logo */}
          <div className="w-32 h-32 bg-white dark:bg-gray-800 rounded-3xl p-2 shadow-2xl mb-4 hover:shadow-3xl transition duration-500 relative z-10 border-4 border-white dark:border-gray-700">
            <div className="relative w-full h-full overflow-hidden rounded-2xl">
              <Image 
                src={logoImage} 
                alt={name}
                fill 
                className="object-cover"
              />
            </div>
          </div>
          
          {/* Title with Badge */}
          <div className="flex items-center gap-2 mb-2 justify-center flex-wrap">
            <h1 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white">{name}</h1>
            <div className="bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 p-1.5 rounded-full" title="موثق">
              <ShieldCheck className="w-5 h-5" />
            </div>
          </div>
          
          {/* Category & Location */}
          <p className="text-gray-600 dark:text-gray-400 text-sm max-w-md mb-5 font-medium">{merchant.type || 'نشاط تجاري'} • {merchant.location || 'القاهرة'}</p>
          
          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-3 w-full max-w-md mb-6">
            {/* Rating */}
            <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900/30 dark:to-yellow-800/30 px-4 py-3 rounded-2xl border border-yellow-200 dark:border-yellow-700 shadow-sm hover:shadow-md transition">
              <div className="flex items-center gap-1.5 justify-center mb-1">
                <Star className="w-4 h-4 text-yellow-500 fill-current" />
                <span className="font-bold text-gray-900 dark:text-white text-lg">{merchant.rating}</span>
              </div>
              <span className="text-gray-600 dark:text-gray-400 text-xs">({merchant.reviews} تقييم)</span>
            </div>
            
            {/* Status */}
            <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/30 px-4 py-3 rounded-2xl border border-green-200 dark:border-green-700 shadow-sm hover:shadow-md transition">
              <div className="flex items-center gap-1.5 justify-center mb-1">
                <Zap className="w-4 h-4 text-green-600 fill-current" />
                <span className="font-bold text-green-700 dark:text-green-400 text-sm">مفتوح</span>
              </div>
              <span className="text-gray-600 dark:text-gray-400 text-xs">الآن</span>
            </div>
            
            {/* Distance */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 px-4 py-3 rounded-2xl border border-blue-200 dark:border-blue-700 shadow-sm hover:shadow-md transition">
              <div className="flex items-center gap-1.5 justify-center mb-1">
                <MapPin className="w-4 h-4 text-blue-600" />
                <span className="font-bold text-gray-900 dark:text-white text-lg">2.5</span>
              </div>
              <span className="text-gray-600 dark:text-gray-400 text-xs">كم</span>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
              <TrendingUp className="w-4 h-4 text-green-600" />
              <span>الأكثر طلباً</span>
            </div>
            <div className="w-px h-4 bg-gray-300 dark:bg-gray-700"></div>
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
              <Clock className="w-4 h-4 text-orange-600" />
              <span>توصيل سريع</span>
            </div>
          </div>
        </div>
        
        {/* Image Gallery Modal */}
        {isGalleryOpen && (
          <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="relative max-w-6xl w-full">
              {/* Close Button */}
              <button 
                onClick={closeGallery}
                className="absolute top-4 right-4 z-10 bg-white/10 backdrop-blur-sm text-white p-2 rounded-full hover:bg-white/20 transition"
              >
                <X className="w-6 h-6" />
              </button>
              
              {/* Main Image */}
              <div className="relative aspect-video rounded-2xl overflow-hidden">
                <Image 
                  src={galleryImages[currentImageIndex]}
                  alt={`Gallery image ${currentImageIndex + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
              
              {/* Navigation */}
              <div className="absolute inset-0 flex items-center justify-between px-4">
                <button 
                  onClick={prevImage}
                  className="bg-white/10 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/20 transition"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
                <button 
                  onClick={nextImage}
                  className="bg-white/10 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/20 transition"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
              </div>
              
              {/* Thumbnails */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 bg-black/50 backdrop-blur-sm p-2 rounded-full">
                {galleryImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`relative w-16 h-16 rounded-lg overflow-hidden transition duration-300 ${
                      index === currentImageIndex ? 'ring-2 ring-white' : 'opacity-70 hover:opacity-100'
                    }`}
                  >
                    <Image 
                      src={image}
                      alt={`Thumbnail ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
              
              {/* Image Counter */}
              <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm">
                {currentImageIndex + 1} / {galleryImages.length}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default MerchantHero;
