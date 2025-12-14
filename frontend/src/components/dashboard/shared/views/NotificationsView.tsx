
import React from 'react';
import { Bell, ShoppingBag, AlertTriangle, CheckCircle, Clock, Settings, ArrowLeft } from 'lucide-react';

const notifications = [
  { id: 1, type: 'order', title: 'طلب جديد #1058', desc: 'تم استلام طلب جديد بقيمة 450 ج من العميل أحمد محمد.', time: 'منذ دقيقتين', read: false, action: 'عرض الطلب' },
  { id: 2, type: 'stock', title: 'تنبيه مخزون', desc: 'منتج "برجر كلاسيك" يوشك على النفاذ (متبقي 3 قطع فقط).', time: 'منذ 15 دقيقة', read: false, action: 'إعادة الطلب' },
  { id: 3, type: 'system', title: 'تحديث النظام', desc: 'تم تحديث النظام إلى النسخة 2.5.0 بنجاح. استمتع بالمميزات الجديدة.', time: 'منذ ساعة', read: true },
  { id: 4, type: 'order', title: 'تم توصيل الطلب #1050', desc: 'أكد العميل استلام الطلب بنجاح وتم إضافة الرصيد للخزينة.', time: 'منذ ساعتين', read: true, action: 'عرض الفاتورة' },
  { id: 5, type: 'shift', title: 'إغلاق وردية', desc: 'قام الكاشير "أحمد" بإغلاق الوردية الصباحية بعجز -50 ج.', time: 'أمس 04:00 م', read: true, action: 'مراجعة التقرير' },
];

const NotificationsView: React.FC = () => {
  const getIcon = (type: string) => {
    switch(type) {
      case 'order': return <ShoppingBag className="w-5 h-5 text-blue-600" />;
      case 'stock': return <AlertTriangle className="w-5 h-5 text-orange-600" />;
      case 'system': return <Settings className="w-5 h-5 text-gray-600" />;
      case 'shift': return <Clock className="w-5 h-5 text-purple-600" />;
      default: return <Bell className="w-5 h-5 text-gray-600" />;
    }
  };

  const getBgColor = (type: string) => {
    switch(type) {
      case 'order': return 'bg-blue-50 border-blue-100';
      case 'stock': return 'bg-orange-50 border-orange-100';
      case 'system': return 'bg-gray-50 border-gray-100';
      case 'shift': return 'bg-purple-50 border-purple-100';
      default: return 'bg-gray-50 border-gray-100';
    }
  };

  return (
    <div className="max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-2">
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
          <div>
            <h2 className="text-xl font-bold text-gray-800">مركز الإشعارات</h2>
            <p className="text-sm text-gray-500">آخر التحديثات والتنبيهات الهامة</p>
          </div>
          <button className="text-sm font-bold text-blue-600 hover:underline">تحديد الكل كمقروء</button>
        </div>

        <div className="divide-y divide-gray-50">
          {notifications.map((notif) => (
            <div 
              key={notif.id} 
              className={`p-5 flex gap-4 hover:bg-gray-50 transition group relative ${!notif.read ? 'bg-blue-50/20' : ''}`}
            >
              {!notif.read && <div className="absolute top-5 right-2 w-2 h-2 bg-blue-500 rounded-full"></div>}
              
              <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 border ${getBgColor(notif.type)}`}>
                {getIcon(notif.type)}
              </div>
              
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <h4 className={`text-sm mb-1 ${notif.read ? 'font-bold text-gray-700' : 'font-black text-gray-900'}`}>
                    {notif.title}
                  </h4>
                  <span className="text-xs text-gray-400">{notif.time}</span>
                </div>
                <p className="text-sm text-gray-500 leading-relaxed mb-3">{notif.desc}</p>
                
                {notif.action && (
                   <button className="text-xs font-bold bg-white border border-gray-200 px-3 py-1.5 rounded-lg hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 transition flex items-center gap-1 shadow-sm">
                      {notif.action}
                      <ArrowLeft className="w-3 h-3" />
                   </button>
                )}
              </div>
            </div>
          ))}
        </div>
        
        <div className="p-4 text-center border-t border-gray-100">
            <button className="text-sm font-bold text-gray-500 hover:text-gray-800">عرض الإشعارات القديمة</button>
        </div>
      </div>
    </div>
  );
};

export default NotificationsView;
