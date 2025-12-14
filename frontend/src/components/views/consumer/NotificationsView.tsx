
import React from 'react';
import { Bell, Package, Star, AlertCircle } from 'lucide-react';

const NotificationsView: React.FC = () => {
  const notifications = [
    { id: 1, type: 'order', title: 'تم استلام طلبك بنجاح', desc: 'جاري تحضير طلبك من مطعم النور. الوقت المتوقع 30 دقيقة.', time: 'منذ 5 دقائق', unread: true },
    { id: 2, type: 'promo', title: 'خصم 50% على الكاجوال!', desc: 'استخدم كود RAY50 واحصل على خصم فوري على جميع الملابس.', time: 'منذ ساعتين', unread: true },
    { id: 3, type: 'system', title: 'تحديث سياسة الخصوصية', desc: 'قمنا بتحديث سياسة الخصوصية وشروط الاستخدام.', time: 'أمس', unread: false },
    { id: 4, type: 'order', title: 'تم توصيل الطلب #8810', desc: 'نتمنى أن تكون تجربتك معنا مميزة. قيم تجربتك الآن.', time: 'أمس', unread: false },
  ];

  const getIcon = (type: string) => {
    switch(type) {
      case 'order': return <Package className="w-6 h-6 text-ray-blue" />;
      case 'promo': return <Star className="w-6 h-6 text-ray-gold" />;
      case 'system': return <AlertCircle className="w-6 h-6 text-gray-600" />;
      default: return <Bell className="w-6 h-6 text-gray-600" />;
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 animate-in fade-in slide-in-from-bottom-4">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-black text-ray-black flex items-center gap-2">
          <Bell className="w-8 h-8 text-ray-blue" />
          الإشعارات
        </h2>
        <button className="text-sm font-bold text-ray-blue hover:underline">تحديد الكل كمقروء</button>
      </div>

      <div className="space-y-4">
        {notifications.map((notif) => (
          <div key={notif.id} className={`flex gap-4 p-5 rounded-2xl border transition-all cursor-pointer hover:shadow-md ${notif.unread ? 'bg-blue-50/50 border-blue-100' : 'bg-white border-gray-100'}`}>
            <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${notif.unread ? 'bg-white shadow-sm' : 'bg-gray-100'}`}>
              {getIcon(notif.type)}
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start mb-1">
                <h4 className={`text-lg ${notif.unread ? 'font-black text-ray-black' : 'font-bold text-gray-700'}`}>{notif.title}</h4>
                <span className="text-xs font-bold text-gray-400">{notif.time}</span>
              </div>
              <p className="text-gray-600 leading-relaxed font-medium">{notif.desc}</p>
            </div>
            {notif.unread && <div className="w-3 h-3 bg-ray-blue rounded-full mt-2"></div>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationsView;
