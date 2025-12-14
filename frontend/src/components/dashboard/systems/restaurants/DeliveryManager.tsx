
import React, { useState } from 'react';
import { 
  MapPin, Truck, Phone, Clock, CheckCircle, Bike, 
  User, Navigation, Search, Filter
} from 'lucide-react';
import StatusBadge from '../../../common/StatusBadge';

interface DeliveryOrder {
  id: string;
  customer: string;
  address: string;
  items: string;
  total: number;
  status: 'pending' | 'assigned' | 'picked_up' | 'delivered';
  driver?: string;
  time: string;
}

const initialOrders: DeliveryOrder[] = [
  { id: '#ORD-1055', customer: 'أحمد محمد', address: 'شارع 9، المعادي', items: '2 بيتزا', total: 250, status: 'assigned', driver: 'كابتن علي', time: '12:30 م' },
  { id: '#ORD-1058', customer: 'منى زكي', address: 'التجمع الخامس', items: 'وجبة عائلية', total: 450, status: 'pending', time: '12:45 م' },
  { id: '#ORD-1060', customer: 'كريم حسن', address: 'مدينة نصر', items: 'سوشي بوكس', total: 600, status: 'picked_up', driver: 'كابتن سامي', time: '01:00 م' },
];

const drivers = [
  { id: 1, name: 'كابتن علي', status: 'busy', location: 'المعادي', orders: 1 },
  { id: 2, name: 'كابتن سامي', status: 'busy', location: 'الطريق الدائري', orders: 1 },
  { id: 3, name: 'كابتن هيثم', status: 'available', location: 'أمام المطعم', orders: 0 },
  { id: 4, name: 'كابتن رامي', status: 'available', location: 'أمام المطعم', orders: 0 },
];

const DeliveryManager: React.FC = () => {
  const [orders, setOrders] = useState(initialOrders);

  const assignDriver = (orderId: string, driverName: string) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: 'assigned', driver: driverName } : o));
  };

  return (
    <div className="flex flex-col h-full space-y-6 animate-in fade-in slide-in-from-bottom-2">
      {/* Header */}
      <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <Truck className="w-6 h-6 text-orange-600" />
            إدارة التوصيل
          </h2>
          <p className="text-sm text-gray-500">تتبع الطلبات وتعيين الطيارين</p>
        </div>
        <div className="flex items-center gap-3">
           <span className="bg-green-100 text-green-700 px-3 py-1 rounded-lg text-sm font-bold">2 طيارين متاحين</span>
           <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-lg text-sm font-bold">3 طلبات نشطة</span>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 h-[calc(100vh-200px)]">
         {/* Active Orders List */}
         <div className="w-full lg:w-96 bg-white rounded-2xl border border-gray-100 shadow-sm flex flex-col overflow-hidden">
            <div className="p-4 border-b border-gray-100 bg-gray-50">
               <h3 className="font-bold text-gray-700 mb-3">الطلبات الجارية</h3>
               <div className="relative">
                  <Search className="absolute right-3 top-2.5 w-4 h-4 text-gray-400" />
                  <input type="text" placeholder="بحث برقم الطلب..." className="w-full bg-white border border-gray-200 rounded-xl py-2 pr-10 pl-4 text-sm focus:outline-none focus:border-orange-500" />
               </div>
            </div>
            <div className="flex-1 overflow-y-auto p-3 space-y-3">
               {orders.map(order => (
                  <div key={order.id} className="p-4 border border-gray-100 rounded-xl hover:shadow-md transition bg-white">
                     <div className="flex justify-between items-start mb-2">
                        <span className="font-bold text-gray-900">{order.id}</span>
                        <StatusBadge status={order.status} />
                     </div>
                     <div className="space-y-1 mb-3">
                        <p className="text-sm text-gray-600 flex items-center gap-2"><User className="w-3 h-3" /> {order.customer}</p>
                        <p className="text-sm text-gray-600 flex items-center gap-2"><MapPin className="w-3 h-3" /> {order.address}</p>
                        <p className="text-sm text-gray-600 flex items-center gap-2"><Clock className="w-3 h-3" /> {order.time}</p>
                     </div>
                     
                     {order.driver ? (
                        <div className="flex items-center gap-2 bg-gray-50 p-2 rounded-lg text-xs font-bold text-gray-700">
                           <Bike className="w-3 h-3" />
                           {order.driver}
                        </div>
                     ) : (
                        <div className="mt-3 pt-3 border-t border-gray-50">
                           <p className="text-xs font-bold text-gray-400 mb-2">تعيين طيار:</p>
                           <div className="flex flex-wrap gap-2">
                              {drivers.filter(d => d.status === 'available').map(driver => (
                                 <button 
                                   key={driver.id}
                                   onClick={() => assignDriver(order.id, driver.name)}
                                   className="px-2 py-1 bg-orange-50 text-orange-700 text-xs rounded border border-orange-100 hover:bg-orange-100"
                                 >
                                    {driver.name}
                                 </button>
                              ))}
                           </div>
                        </div>
                     )}
                  </div>
               ))}
            </div>
         </div>

         {/* Map Area */}
         <div className="flex-1 bg-white rounded-2xl border border-gray-100 shadow-sm flex flex-col overflow-hidden relative">
            {/* Map Placeholder */}
            <div className="absolute inset-0 bg-blue-50">
               <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20"></div>
               <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="text-center opacity-20">
                     <Navigation className="w-24 h-24 mx-auto mb-4 text-gray-400" />
                     <h3 className="text-3xl font-black text-gray-400">Live Tracking Map</h3>
                  </div>
               </div>
               
               {/* Simulated Pins */}
               <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="relative">
                     <div className="w-12 h-12 bg-white rounded-full shadow-xl flex items-center justify-center z-10 relative border-2 border-orange-500">
                        <Truck className="w-6 h-6 text-orange-600" />
                     </div>
                     <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-white px-3 py-1 rounded-lg shadow text-xs font-bold whitespace-nowrap">
                        المطعم
                     </div>
                  </div>
               </div>

               <div className="absolute top-1/3 left-1/3">
                  <div className="relative group cursor-pointer">
                     <div className="w-8 h-8 bg-blue-600 rounded-full shadow-lg flex items-center justify-center z-10 relative border-2 border-white animate-bounce">
                        <Bike className="w-4 h-4 text-white" />
                     </div>
                     <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-black/80 text-white px-2 py-1 rounded text-[10px] whitespace-nowrap">
                        كابتن علي
                     </div>
                  </div>
               </div>
            </div>

            {/* Drivers List Overlay (Bottom) */}
            <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur rounded-xl p-4 shadow-lg border border-gray-100 max-h-48 overflow-y-auto">
               <h4 className="text-xs font-bold text-gray-500 mb-3 uppercase">الطيارين</h4>
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                  {drivers.map(driver => (
                     <div key={driver.id} className="flex items-center gap-3 bg-white p-2 rounded-lg border border-gray-100 shadow-sm">
                        <div className={`w-2 h-2 rounded-full ${driver.status === 'available' ? 'bg-green-500' : 'bg-orange-500'}`}></div>
                        <div className="flex-1">
                           <p className="text-xs font-bold text-gray-800">{driver.name}</p>
                           <p className="text-[10px] text-gray-500">{driver.location}</p>
                        </div>
                        <span className="text-[10px] font-bold bg-gray-100 px-1.5 rounded">{driver.orders}</span>
                     </div>
                  ))}
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};

export default DeliveryManager;
