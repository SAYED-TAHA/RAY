
import React, { useState, useEffect } from 'react';
import { 
  Phone, MessageSquare, ShoppingBag, ChevronRight, Info, MapPin, Clock,
  Facebook, Instagram, Twitter, Linkedin, Mail, MapPin as MapPinIcon, Award, TrendingUp,
  Loader, AlertCircle
} from 'lucide-react';
import axios from 'axios';
import MerchantHero from '../merchant/MerchantHero';
import MerchantOrdering from '../merchant/MerchantOrdering';
import MerchantCart from '../merchant/MerchantCart';
import MerchantBooking from '../merchant/MerchantBooking';
import MerchantShowcase from '../merchant/MerchantShowcase';
import MerchantReviews from '../merchant/MerchantReviews';
import MerchantGalleryManager from '../merchant/MerchantGalleryManager';
import MerchantOffers from '../merchant/MerchantOffers';
import MerchantDiscountProducts from '../merchant/MerchantDiscountProducts';
import RestaurantMenu from '../merchant/RestaurantMenu';
import TableBooking from '../merchant/TableBooking';
import ProductDetailView from './ProductDetailView'; // استخدام الملف الجديد بدون Context

interface MerchantData {
  id: string;
  name: string;
  category: string;
  cover?: string;
  gallery?: string[];
  staff?: any[];
  services?: any[];
  menuItems?: any[];
  [key: string]: any;
}

interface MerchantProps {
  merchant: any;
  onBack: () => void;
}

const MerchantPublicView: React.FC<MerchantProps> = ({ merchant, onBack }) => {
  // Determine Mode
  const isBooking = ['clinic', 'beauty', 'health', 'gym', 'salon', 'services'].includes(merchant.category);
  const isShowcase = ['realestate', 'cars'].includes(merchant.category);
  const isOrdering = ['shopping'].includes(merchant.category) || !merchant.category;
  const isRestaurant = ['food', 'restaurant', 'cafe'].includes(merchant.category);

  // Set default tab based on mode
  const [activeTab, setActiveTab] = useState(isBooking ? 'main' : isShowcase ? 'showcase' : isRestaurant ? 'menu' : 'menu');
  
  const [isFavorite, setIsFavorite] = useState(false);
  const [showShareToast, setShowShareToast] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  // Ordering State
  const [cart, setCart] = useState<{id: number, name: string, price: number, qty: number, image: string}[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isOrderProcessing, setIsOrderProcessing] = useState(false);
  const [isOrderSuccess, setIsOrderSuccess] = useState(false);
  
  // Gallery State
  const [galleryImages, setGalleryImages] = useState<string[]>([]);
  const [staffList, setStaffList] = useState<any[]>([]);
  const [servicesList, setServicesList] = useState<any[]>([]);
  const [menuItems, setMenuItems] = useState<any[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loadingData, setLoadingData] = useState(true);
  const [dataError, setDataError] = useState<string | null>(null);
  
  // Mock owner check - في الواقع ستأتي من auth context
  const isOwner = false;

  // Fetch merchant data (staff, services, menu items, gallery)
  useEffect(() => {
    const fetchMerchantData = async () => {
      try {
        setLoadingData(true);
        setDataError(null);
        
        // Fetch merchant details
        const merchantResponse = await axios.get<MerchantData>(`/api/merchants/${merchant.id}`);
        const merchantData = merchantResponse.data as MerchantData;
        
        // Set gallery images
        setGalleryImages(merchantData.gallery || [
          merchant.cover || "https://images.unsplash.com/photo-1556740758-90de374c12ad?w=1200&q=80",
          "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&q=80",
          "https://images.unsplash.com/photo-1559329007-406870008023?w=1200&q=80"
        ]);
        
        // Set staff list if available
        if (merchantData.staff) {
          setStaffList(merchantData.staff);
        }
        
        // Set services if available
        if (merchantData.services) {
          setServicesList(merchantData.services);
        }
        
        // Set menu items if available
        if (merchantData.menuItems) {
          setMenuItems(merchantData.menuItems);
          const categorySet = new Set(merchantData.menuItems.map((item: any) => item.category));
          const uniqueCategories = ['الكل', ...Array.from(categorySet)];
          setCategories(uniqueCategories);
        } else {
          // Fallback categories
          setCategories(isRestaurant ? ['الكل', 'مشويات', 'مقبلات', 'أطباق رئيسية', 'سلطات'] : ['الكل', 'ملابس', 'أحذية', 'إكسسوارات', 'عروض']);
        }
      } catch (err) {
        console.error('Error fetching merchant data:', err);
        setDataError('فشل في تحميل بيانات المتجر');
        // Set default empty arrays
        setStaffList([]);
        setServicesList([]);
        setMenuItems([]);
        setCategories(isRestaurant ? ['الكل', 'مشويات', 'مقبلات', 'أطباق رئيسية', 'سلطات'] : ['الكل', 'ملابس', 'أحذية', 'إكسسوارات', 'عروض']);
      } finally {
        setLoadingData(false);
      }
    };

    if (merchant?.id) {
      fetchMerchantData();
    }
  }, [merchant?.id, isRestaurant]);

  const handleShare = () => {
    setShowShareToast(true);
    setTimeout(() => setShowShareToast(false), 2000);
  };

  // Cart Logic
  const addToCart = (item: any) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id);
      if(existing) return prev.map(i => i.id === item.id ? {...i, qty: i.qty + 1} : i);
      return [...prev, { id: item.id, name: item.name, price: item.price, qty: 1, image: item.img }];
    });
    // On mobile, we might want to auto-open or show a toast. For now, the floating button appears.
  };

  const updateCartQty = (id: number, delta: number) => {
    setCart(prev => prev.map(i => {
      if(i.id === id) return {...i, qty: Math.max(0, i.qty + delta)};
      return i;
    }).filter(i => i.qty > 0));
  };

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

  const handleCheckout = () => {
    setIsOrderProcessing(true);
    setTimeout(() => {
      setIsOrderProcessing(false);
      setIsOrderSuccess(true);
      setCart([]);
    }, 2000);
  };

  const handleCall = () => {
    window.location.href = "tel:19999";
  };

  const handleWhatsApp = () => {
    // In a real app, this would be the merchant's number
    window.open("https://wa.me/201000000000", "_blank");
  };

  // Generate Tabs based on type
  const getTabs = () => {
    const baseTabs = [{ id: 'reviews', label: 'التقييمات' }, { id: 'about', label: 'المعلومات' }];
    
    if (isBooking) {
      return [{ id: 'main', label: 'الحجز' }, ...baseTabs];
    }
    if (isShowcase) {
      const tabs = [{ id: 'showcase', label: merchant.category === 'realestate' ? 'الوحدات' : 'السيارات' }];
      
      // Add gallery tab only for real estate
      if (merchant.category === 'realestate') {
        tabs.push({ id: 'gallery', label: 'المعرض' });
      }
      
      return [...tabs, ...baseTabs];
    }
    
    const tabs = [{ id: 'menu', label: isRestaurant ? 'المنيو' : 'المنتجات' }];
    
    // Add booking tab for restaurants
    if (isRestaurant) {
      tabs.push({ id: 'booking', label: 'حجز طاولات' });
    }
    
    // Add gallery tab for all users
    tabs.push({ id: 'gallery', label: 'معرض الصور' });
    
    // Add offers tab only for non-restaurants
    if (!isRestaurant) {
      tabs.push({ id: 'offers', label: 'العروض' });
    }
    
    return [...tabs, ...baseTabs];
  };

  const tabs = getTabs();

  // إذا تم اختيار منتج، اعرض صفحة التفاصيل
  if (selectedProduct) {
    return (
      <ProductDetailView
        product={selectedProduct}
        onBack={() => setSelectedProduct(null)}
        onAddToCart={(item) => {
          addToCart(item);
          setSelectedProduct(null);
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20 animate-in fade-in duration-300">
      
      <MerchantHero 
        merchant={merchant} 
        onBack={onBack}
        isFavorite={isFavorite}
        toggleFavorite={() => setIsFavorite(!isFavorite)}
        handleShare={handleShare}
        showShareToast={showShareToast}
      />

      {/* Tabs Navigation */}
      <div className="sticky top-16 z-30 bg-white border-b border-gray-200 shadow-sm">
        <div className="flex max-w-4xl mx-auto overflow-x-auto no-scrollbar px-4">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 min-w-[80px] py-4 text-sm font-bold border-b-2 transition-colors whitespace-nowrap
                ${activeTab === tab.id ? 'border-ray-blue text-ray-blue' : 'border-transparent text-gray-500 hover:text-gray-800'}
              `}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content Area */}
      <div className="max-w-4xl mx-auto px-4 pt-6">
        {activeTab === 'main' && isBooking && (
           <MerchantBooking staffList={staffList} servicesList={servicesList} />
        )}
        
        {activeTab === 'showcase' && isShowcase && (
           <MerchantShowcase galleryImages={galleryImages} merchantType={merchant.category} merchantId={merchant.id} />
        )}
        
        {activeTab === 'menu' && isOrdering && (
           <MerchantOrdering categories={categories} menuItems={menuItems} addToCart={addToCart} onProductClick={setSelectedProduct} />
        )}

        {activeTab === 'menu' && isRestaurant && (
           <RestaurantMenu 
             categories={categories} 
             menuItems={menuItems} 
             addToCart={addToCart} 
             onProductClick={setSelectedProduct} 
           />
        )}

        {activeTab === 'booking' && isRestaurant && (
           <TableBooking 
             merchantId={merchant.id} 
             merchantName={merchant.name} 
           />
        )}

        {activeTab === 'gallery' && (
           <MerchantGalleryManager 
             images={galleryImages} 
             onImagesChange={setGalleryImages}
             isOwner={isOwner}
           />
        )}

        {activeTab === 'offers' && (
           <MerchantDiscountProducts merchantId={merchant.id} />
        )}

        {activeTab === 'reviews' && <MerchantReviews merchantId={merchant.id} />}

        {activeTab === 'about' && (
          <div className="space-y-6 animate-in fade-in">
            <div className="bg-white p-6 rounded-2xl border border-gray-100">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2"><Info className="w-5 h-5 text-gray-400" /> عن {merchant.name}</h3>
              <p className="text-gray-600 leading-relaxed text-sm">
                نحن نسعى دائماً لتقديم أفضل تجربة لعملائنا من خلال جودة لا تضاهى وخدمة متميزة. تأسسنا عام 2015 وهدفنا الأول هو رضاكم.
              </p>
              
              <div className="mt-6 space-y-3">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="font-bold text-sm text-gray-900">العنوان</p>
                    <p className="text-xs text-gray-500">شارع 9، المعادي، القاهرة</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="font-bold text-sm text-gray-900">ساعات العمل</p>
                    <p className="text-xs text-gray-500">يومياً من 10:00 ص - 12:00 ص</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer Actions */}
      {isShowcase ? (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 flex gap-3 z-40 shadow-lg md:static md:shadow-none md:border-0 md:bg-transparent md:p-0 md:mt-8 max-w-4xl mx-auto">
          <button onClick={handleCall} className="flex-1 bg-green-600 text-white py-3 rounded-xl font-bold shadow-lg hover:bg-green-700 flex items-center justify-center gap-2 transition active:scale-95">
            <Phone className="w-5 h-5" /> اتصال
          </button>
          <button onClick={handleWhatsApp} className="flex-1 bg-gray-100 text-gray-800 py-3 rounded-xl font-bold hover:bg-gray-200 flex items-center justify-center gap-2 transition active:scale-95">
            <MessageSquare className="w-5 h-5" /> واتساب
          </button>
        </div>
      ) : isOrdering && cart.length > 0 && (
        <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-auto md:w-[600px] md:left-1/2 md:-translate-x-1/2 mx-auto z-50 animate-in slide-in-from-bottom-4 fade-in">
          <button 
            onClick={() => setIsCartOpen(true)}
            className="w-full bg-ray-black text-white p-4 rounded-2xl shadow-2xl flex justify-between items-center hover:bg-gray-900 transition transform hover:-translate-y-1 border border-gray-700 group"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white text-ray-black rounded-xl flex items-center justify-center font-black border border-gray-200 relative group-hover:scale-110 transition">
                {cart.reduce((a, b) => a + b.qty, 0)}
                <span className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white text-[10px] rounded-full flex items-center justify-center border-2 border-ray-black">!</span>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-400 font-bold mb-0.5">المجموع</p>
                <p className="font-bold text-xl leading-none text-white">{cartTotal} <span className="text-sm text-ray-gold">ج.م</span></p>
              </div>
            </div>
            <div className="flex items-center gap-2 font-bold text-ray-black bg-ray-gold px-6 py-3 rounded-xl hover:bg-yellow-400 transition">
              عرض السلة <ChevronRight className="w-5 h-5 rtl:rotate-180" />
            </div>
          </button>
        </div>
      )}

      <MerchantCart 
        cart={cart}
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        updateCartQty={updateCartQty}
        isOrderProcessing={isOrderProcessing}
        isOrderSuccess={isOrderSuccess}
        onCheckout={handleCheckout}
        onCloseSuccess={() => { setIsOrderSuccess(false); setIsCartOpen(false); }}
      />

      {/* Professional Footer */}
      <footer className="bg-gradient-to-b from-gray-900 to-black dark:from-gray-950 dark:to-black text-gray-300 mt-16 border-t border-gray-800">
        <div className="max-w-4xl mx-auto px-4 py-12">
          {/* Top Section */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            {/* Brand */}
            <div className="md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-ray-gold to-yellow-500 rounded-lg flex items-center justify-center font-bold text-gray-900">
                  {merchant.name?.charAt(0) || 'R'}
                </div>
                <div>
                  <h3 className="font-bold text-white text-sm">{merchant.name}</h3>
                  <p className="text-xs text-gray-500">{merchant.type}</p>
                </div>
              </div>
              <p className="text-sm text-gray-400 mb-4">{merchant.location || 'القاهرة'}</p>
              <div className="flex gap-3">
                <a href="#" className="p-2 bg-gray-800 hover:bg-ray-gold hover:text-gray-900 rounded-lg transition">
                  <Facebook className="w-4 h-4" />
                </a>
                <a href="#" className="p-2 bg-gray-800 hover:bg-ray-gold hover:text-gray-900 rounded-lg transition">
                  <Instagram className="w-4 h-4" />
                </a>
                <a href="#" className="p-2 bg-gray-800 hover:bg-ray-gold hover:text-gray-900 rounded-lg transition">
                  <Twitter className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-bold text-white mb-4 text-sm">روابط سريعة</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <button 
                    onClick={() => setActiveTab('menu')}
                    className="text-gray-400 hover:text-ray-gold transition"
                  >
                    {isRestaurant ? 'المنيو' : isShowcase ? 'المعرض' : isBooking ? 'المعرض' : 'المنتجات'}
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setActiveTab('reviews')}
                    className="text-gray-400 hover:text-ray-gold transition"
                  >
                    التقييمات
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setActiveTab('about')}
                    className="text-gray-400 hover:text-ray-gold transition"
                  >
                    المعلومات
                  </button>
                </li>
                {isRestaurant && (
                  <li>
                    <button 
                      onClick={() => setActiveTab('booking')}
                      className="text-gray-400 hover:text-ray-gold transition"
                    >
                      حجز طاولات
                    </button>
                  </li>
                )}
                {isShowcase && merchant.category === 'realestate' && (
                  <li>
                    <button 
                      onClick={() => setActiveTab('gallery')}
                      className="text-gray-400 hover:text-ray-gold transition"
                    >
                      المعرض
                    </button>
                  </li>
                )}
                <li>
                  <button 
                    onClick={handleCall}
                    className="text-gray-400 hover:text-ray-gold transition"
                  >
                    اتصل بنا
                  </button>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="font-bold text-white mb-4 text-sm">تواصل معنا</h4>
              <ul className="space-y-3 text-sm">
                <li className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-ray-gold" />
                  <a href="tel:19999" className="text-gray-400 hover:text-ray-gold transition">19999</a>
                </li>
                <li className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-ray-gold" />
                  <a href="https://wa.me/201000000000" className="text-gray-400 hover:text-ray-gold transition">واتس آب</a>
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-ray-gold" />
                  <a href="mailto:info@example.com" className="text-gray-400 hover:text-ray-gold transition">البريد</a>
                </li>
              </ul>
            </div>

            {/* Stats */}
            <div>
              <h4 className="font-bold text-white mb-4 text-sm">الإحصائيات</h4>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-yellow-500" />
                  <span className="text-gray-400 text-sm">{merchant.rating} ⭐ تقييم</span>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-green-500" />
                  <span className="text-gray-400 text-sm">{merchant.reviews} تقييم</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPinIcon className="w-4 h-4 text-blue-500" />
                  <span className="text-gray-400 text-sm">2.5 كم بعيد</span>
                </div>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-800 my-8"></div>

          {/* Bottom Section */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-500">© 2025 {merchant.name}. جميع الحقوق محفوظة.</p>
            <div className="flex gap-6 text-sm">
              <a href="#" className="text-gray-500 hover:text-ray-gold transition">سياسة الخصوصية</a>
              <a href="#" className="text-gray-500 hover:text-ray-gold transition">شروط الاستخدام</a>
              <a href="#" className="text-gray-500 hover:text-ray-gold transition">الشروط والأحكام</a>
            </div>
          </div>

          {/* Powered By */}
          <div className="text-center mt-8 pt-8 border-t border-gray-800">
            <p className="text-xs text-gray-600">مدعوم بواسطة <span className="text-ray-gold font-bold">RAY Platform</span></p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MerchantPublicView;
