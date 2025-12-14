import React, { useState } from 'react';
import {
  ArrowRight, Heart, Share2, ShoppingCart, Star, Check,
  Truck, Shield, RotateCcw, MessageCircle, ThumbsUp, User, Calendar, Phone
} from 'lucide-react';
import Image from 'next/image';

interface ProductDetailViewProps {
  product?: any;
  onBack: () => void;
  onAddToCart?: (item: any) => void;
}

const ProductDetailView: React.FC<ProductDetailViewProps> = ({
  product = {
    id: 1,
    name: 'تيشيرت قطن أبيض',
    price: 120,
    originalPrice: 180,
    rating: 4.8,
    reviews: 245,
    category: 'ملابس',
    desc: 'تيشيرت قطن 100% مريح وناعم',
    img: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600',
  },
  onBack,
  onAddToCart
}) => {
  const [selectedColor, setSelectedColor] = useState('white');
  const [selectedSize, setSelectedSize] = useState('M');
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showShareToast, setShowShareToast] = useState(false);
  const [showReservation, setShowReservation] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [reservationDate, setReservationDate] = useState('');

  const colors = [
    { name: 'أبيض', value: 'white', hex: '#FFFFFF' },
    { name: 'أسود', value: 'black', hex: '#000000' },
    { name: 'أزرق', value: 'blue', hex: '#3B82F6' },
    { name: 'رمادي', value: 'gray', hex: '#9CA3AF' },
    { name: 'أحمر', value: 'red', hex: '#EF4444' },
  ];

  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

  const reviews = [
    {
      id: 1,
      author: 'أحمد محمد',
      rating: 5,
      date: '2025-12-01',
      title: 'منتج ممتاز جداً',
      content: 'الجودة عالية جداً والقماش ناعم ومريح. التوصيل كان سريع والتغليف احترافي.',
      helpful: 124,
      avatar: 'https://ui-avatars.com/api/?name=Ahmed+Mohamed&background=0D8ABC&color=fff'
    },
    {
      id: 2,
      author: 'فاطمة علي',
      rating: 4,
      date: '2025-11-28',
      title: 'جيد وسعر معقول',
      content: 'المنتج جيد جداً والسعر مناسب. لكن كان أتوقع اللون يكون أفتح شوية.',
      helpful: 89,
      avatar: 'https://ui-avatars.com/api/?name=Fatima+Ali&background=F472B6&color=fff'
    },
    {
      id: 3,
      author: 'محمود حسن',
      rating: 5,
      date: '2025-11-25',
      title: 'أفضل من المتوقع',
      content: 'جودة ممتازة وراحة عالية جداً. سأشتري منهم مرة أخرى بكل تأكيد.',
      helpful: 156,
      avatar: 'https://ui-avatars.com/api/?name=Mahmoud+Hassan&background=10B981&color=fff'
    },
    {
      id: 4,
      author: 'سارة محمود',
      rating: 4,
      date: '2025-11-20',
      title: 'منتج رائع',
      content: 'التيشيرت جميل جداً والألوان زاهية. الحجم مناسب تماماً.',
      helpful: 67,
      avatar: 'https://ui-avatars.com/api/?name=Sarah+Mahmoud&background=EC4899&color=fff'
    },
    {
      id: 5,
      author: 'علي كريم',
      rating: 5,
      date: '2025-11-18',
      title: 'توصية قوية',
      content: 'أنا راضي جداً عن الشراء. الجودة والسعر والخدمة كل شيء ممتاز.',
      helpful: 203,
      avatar: 'https://ui-avatars.com/api/?name=Ali+Karim&background=F59E0B&color=fff'
    },
  ];

  const handleShare = () => {
    setShowShareToast(true);
    setTimeout(() => setShowShareToast(false), 2000);
  };

  const handleAddToCart = () => {
    if (onAddToCart) {
      onAddToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        qty: quantity,
        img: product.img,
        color: selectedColor,
        size: selectedSize,
      });
    }
  };

  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-4 h-16 flex items-center justify-between">
        <button onClick={onBack} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400">
          <ArrowRight className="w-5 h-5" />
        </button>
        <h1 className="font-bold text-gray-800 dark:text-white text-lg truncate flex-1 mx-4">{product.name}</h1>
        <div className="flex gap-2">
          <button onClick={handleShare} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400 relative">
            <Share2 className="w-5 h-5" />
            {showShareToast && <div className="absolute top-full right-0 mt-2 bg-black dark:bg-white text-white dark:text-black text-xs py-1 px-2 rounded whitespace-nowrap">تم النسخ</div>}
          </button>
          <button onClick={() => setIsFavorite(!isFavorite)} className={`p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition ${isFavorite ? 'text-red-500' : 'text-gray-600 dark:text-gray-400'}`}>
            <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="relative bg-gray-100 dark:bg-gray-800 rounded-2xl overflow-hidden h-96 md:h-[500px]">
              <Image
                src={product.img}
                alt={product.name}
                fill
                className="object-cover"
              />
              {discount > 0 && (
                <div className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-full font-bold text-sm shadow-lg">
                  -{discount}%
                </div>
              )}
            </div>
            <div className="grid grid-cols-4 gap-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-gray-100 dark:bg-gray-800 rounded-xl overflow-hidden h-24 cursor-pointer hover:ring-2 hover:ring-ray-blue transition">
                  <Image
                    src={product.img}
                    alt={`صورة ${i}`}
                    width={100}
                    height={100}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Rating */}
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                    />
                  ))}
                </div>
                <span className="font-bold text-gray-900 dark:text-white">{product.rating}</span>
                <span className="text-gray-500 dark:text-gray-400">({product.reviews} تقييم)</span>
              </div>
            </div>

            {/* Price */}
            <div className="space-y-2">
              <div className="flex items-baseline gap-3">
                <span className="text-4xl font-black text-gray-900 dark:text-white">{product.price}</span>
                {product.originalPrice && (
                  <span className="text-xl text-gray-400 line-through">{product.originalPrice}</span>
                )}
                <span className="text-sm font-bold text-gray-500">ج.م</span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">السعر شامل الضريبة والتوصيل</p>
            </div>

            {/* Colors */}
            <div>
              <h3 className="font-bold text-gray-900 dark:text-white mb-3">الألوان المتاحة</h3>
              <div className="flex gap-3 flex-wrap">
                {colors.map((color) => (
                  <button
                    key={color.value}
                    onClick={() => setSelectedColor(color.value)}
                    className={`p-3 rounded-xl border-2 transition ${
                      selectedColor === color.value
                        ? 'border-ray-blue bg-blue-50 dark:bg-blue-900/30'
                        : 'border-gray-200 dark:border-gray-700 hover:border-ray-blue'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className="w-6 h-6 rounded-full border-2 border-gray-300"
                        style={{ backgroundColor: color.hex }}
                      ></div>
                      <span className="text-sm font-bold text-gray-900 dark:text-white">{color.name}</span>
                      {selectedColor === color.value && <Check className="w-4 h-4 text-ray-blue" />}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Sizes */}
            <div>
              <h3 className="font-bold text-gray-900 dark:text-white mb-3">الحجم</h3>
              <div className="flex gap-2 flex-wrap">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-12 h-12 rounded-lg border-2 font-bold transition ${
                      selectedSize === size
                        ? 'border-ray-blue bg-ray-blue text-white'
                        : 'border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white hover:border-ray-blue'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Reservation Option */}
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-xl p-4 border border-amber-200 dark:border-amber-800">
              <div className="flex items-center gap-2 mb-3">
                <Calendar className="w-5 h-5 text-amber-600" />
                <h3 className="font-bold text-gray-900 dark:text-white">حجز المنتج</h3>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">احجز المنتج الآن وخذه من المحل خلال 24 ساعة</p>
              <button
                onClick={() => setShowReservation(!showReservation)}
                className="w-full bg-amber-600 hover:bg-amber-700 text-white py-2 rounded-lg font-bold transition"
              >
                {showReservation ? 'إلغاء الحجز' : 'احجز الآن'}
              </button>

              {showReservation && (
                <div className="mt-4 space-y-3 pt-4 border-t border-amber-200 dark:border-amber-800">
                  <div>
                    <label className="text-sm font-bold text-gray-900 dark:text-white block mb-2">رقم الهاتف</label>
                    <div className="flex items-center gap-2 bg-white dark:bg-gray-800 rounded-lg px-3 py-2 border border-gray-200 dark:border-gray-700">
                      <Phone className="w-4 h-4 text-gray-400" />
                      <input
                        type="tel"
                        placeholder="01xxxxxxxxx"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        className="flex-1 bg-transparent outline-none text-gray-900 dark:text-white placeholder-gray-400"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-bold text-gray-900 dark:text-white block mb-2">تاريخ الاستلام</label>
                    <input
                      type="date"
                      value={reservationDate}
                      onChange={(e) => setReservationDate(e.target.value)}
                      className="w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 text-gray-900 dark:text-white"
                    />
                  </div>
                  <button
                    onClick={() => {
                      if (phoneNumber && reservationDate) {
                        alert(`تم حجز المنتج! سيتم استلامه في ${reservationDate}`);
                        setShowReservation(false);
                      } else {
                        alert('الرجاء ملء جميع البيانات');
                      }
                    }}
                    className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-bold transition"
                  >
                    تأكيد الحجز
                  </button>
                </div>
              )}
            </div>

            {/* Quantity */}
            <div>
              <h3 className="font-bold text-gray-900 dark:text-white mb-3">الكمية</h3>
              <div className="flex items-center gap-4 bg-gray-100 dark:bg-gray-800 w-fit rounded-xl p-2">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition font-bold"
                >
                  −
                </button>
                <span className="w-8 text-center font-bold text-gray-900 dark:text-white">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition font-bold"
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart */}
            <button
              onClick={handleAddToCart}
              className="w-full bg-ray-blue hover:bg-blue-700 text-white py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition shadow-lg active:scale-95"
            >
              <ShoppingCart className="w-6 h-6" />
              أضف إلى السلة
            </button>

            {/* Features */}
            <div className="space-y-3 pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-3 text-sm">
                <Truck className="w-5 h-5 text-green-600" />
                <span className="text-gray-700 dark:text-gray-300">توصيل مجاني للطلبات فوق 200 ج.م</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Shield className="w-5 h-5 text-blue-600" />
                <span className="text-gray-700 dark:text-gray-300">ضمان 100% على جودة المنتج</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <RotateCcw className="w-5 h-5 text-orange-600" />
                <span className="text-gray-700 dark:text-gray-300">استرجاع مجاني خلال 14 يوم</span>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="border-t border-gray-200 dark:border-gray-800 pt-12">
          <div className="mb-8">
            <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-6">آراء العملاء</h2>
            
            {/* Reviews Stats */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl p-6 mb-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-4xl font-black text-ray-blue mb-2">{product.rating}</div>
                  <div className="flex justify-center gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">من {product.reviews} تقييم</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-black text-green-600 mb-2">98%</div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">يوصي به العملاء</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-black text-blue-600 mb-2">4.8</div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">متوسط الرضا</p>
                </div>
              </div>
            </div>
          </div>

          {/* Individual Reviews */}
          <div className="space-y-4">
            {reviews.map((review) => (
              <div key={review.id} className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-md transition">
                <div className="flex items-start gap-4 mb-4">
                  <img
                    src={review.avatar}
                    alt={review.author}
                    className="w-12 h-12 rounded-full"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-bold text-gray-900 dark:text-white">{review.author}</h4>
                      <span className="text-xs text-gray-500 dark:text-gray-400">{review.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                <h5 className="font-bold text-gray-900 dark:text-white mb-2">{review.title}</h5>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">{review.content}</p>

                <div className="flex items-center gap-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                  <button className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-ray-blue transition">
                    <ThumbsUp className="w-4 h-4" />
                    مفيد ({review.helpful})
                  </button>
                  <button className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-ray-blue transition">
                    <MessageCircle className="w-4 h-4" />
                    رد
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Load More Reviews */}
          <div className="text-center mt-8">
            <button className="px-8 py-3 border-2 border-ray-blue text-ray-blue font-bold rounded-xl hover:bg-blue-50 dark:hover:bg-blue-900/20 transition">
              عرض المزيد من الآراء
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailView;
