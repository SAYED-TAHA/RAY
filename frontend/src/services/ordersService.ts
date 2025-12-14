/**
 * خدمة إدارة الطلبات
 * التواصل مع API للحصول على الطلبات والتعامل معها
 */

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export interface Order {
  _id: string;
  orderNumber: string;
  customerId: string;
  merchantId: string;
  type: 'product' | 'service' | 'booking' | 'delivery' | 'pickup';
  status: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'on-the-way' | 'delivered' | 'completed' | 'cancelled' | 'refunded';
  items: Array<{
    type: string;
    itemId: string;
    name: string;
    description?: string;
    price: number;
    quantity: number;
    variations?: {
      size?: string;
      color?: string;
      customOptions?: string[];
    };
    subtotal: number;
  }>;
  pricing: {
    subtotal: number;
    tax: number;
    deliveryFee: number;
    serviceFee: number;
    discount: number;
    total: number;
  };
  payment: {
    method: 'cash' | 'card' | 'wallet' | 'bank-transfer' | 'online-payment';
    status: 'pending' | 'paid' | 'failed' | 'refunded';
    transactionId?: string;
    paidAt?: string;
    refundAmount?: number;
    refundReason?: string;
  };
  delivery: {
    type: 'pickup' | 'delivery' | 'on-site';
    address?: {
      street?: string;
      city?: string;
      state?: string;
      zipCode?: string;
      coordinates?: {
        lat?: number;
        lng?: number;
      };
    };
    scheduledTime?: string;
    estimatedTime?: string;
    actualTime?: string;
    trackingNumber?: string;
    deliveryNotes?: string;
  };
  booking?: {
    date: string;
    startTime: string;
    endTime: string;
    duration?: number;
    staffId?: string;
    notes?: string;
  };
  timeline: Array<{
    status: string;
    timestamp: string;
    note?: string;
    updatedBy?: string;
  }>;
  ratings?: {
    customerRating?: number;
    merchantRating?: number;
    review?: string;
    reviewedAt?: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface OrderStats {
  totalOrders: number;
  totalRevenue: number;
  pendingOrders: number;
  processingOrders: number;
  shippedOrders: number;
  deliveredOrders: number;
  cancelledOrders: number;
  paidOrders: number;
}

export interface OrderFilters {
  status?: string;
  paymentStatus?: string;
  paymentMethod?: string;
  startDate?: string;
  endDate?: string;
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  page?: number;
  limit?: number;
}

/**
 * جلب جميع الطلبات مع الفلترة والترقيم
 */
export const fetchOrders = async (filters: OrderFilters = {}): Promise<{
  orders: Order[];
  pagination: {
    current: number;
    pages: number;
    total: number;
    limit: number;
  };
}> => {
  try {
    const params = new URLSearchParams();
    
    // إضافة معلمات الفلترة
    if (filters.status) params.append('status', filters.status);
    if (filters.paymentStatus) params.append('paymentStatus', filters.paymentStatus);
    if (filters.paymentMethod) params.append('paymentMethod', filters.paymentMethod);
    if (filters.startDate) params.append('startDate', filters.startDate);
    if (filters.endDate) params.append('endDate', filters.endDate);
    if (filters.search) params.append('search', filters.search);
    if (filters.sortBy) params.append('sortBy', filters.sortBy);
    if (filters.sortOrder) params.append('sortOrder', filters.sortOrder);
    if (filters.page) params.append('page', filters.page.toString());
    if (filters.limit) params.append('limit', filters.limit.toString());

    const token = localStorage.getItem('authToken');
    const headers: HeadersInit = {};
    
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_URL}/api/orders?${params}`, {
      headers
    });
    
    if (!response.ok) {
      throw new Error('فشل جلب الطلبات');
    }
    
    return await response.json();
  } catch (error) {
    console.error('خطأ في جلب الطلبات:', error);
    throw error;
  }
};

/**
 * جلب طلب محدد بالمعرف
 */
export const fetchOrderById = async (id: string): Promise<Order | null> => {
  try {
    const token = localStorage.getItem('authToken');
    const headers: HeadersInit = {};
    
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_URL}/api/orders/${id}`, {
      headers
    });
    
    if (!response.ok) {
      throw new Error('فشل جلب بيانات الطلب');
    }
    
    return await response.json();
  } catch (error) {
    console.error('خطأ في جلب الطلب:', error);
    return null;
  }
};

/**
 * إنشاء طلب جديد
 */
export const createOrder = async (orderData: Omit<Order, '_id' | 'createdAt' | 'updatedAt'>): Promise<Order> => {
  try {
    const token = localStorage.getItem('authToken');
    const headers: HeadersInit = { 
      'Content-Type': 'application/json' 
    };
    
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_URL}/api/orders`, {
      method: 'POST',
      headers,
      body: JSON.stringify(orderData)
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'فشل إنشاء الطلب');
    }
    
    return await response.json();
  } catch (error) {
    console.error('خطأ في إنشاء الطلب:', error);
    throw error;
  }
};

/**
 * تحديث طلب
 */
export const updateOrder = async (id: string, orderData: Partial<Order>): Promise<Order> => {
  try {
    const token = localStorage.getItem('authToken');
    const headers: HeadersInit = { 
      'Content-Type': 'application/json' 
    };
    
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_URL}/api/orders/${id}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify(orderData)
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'فشل تحديث الطلب');
    }
    
    return await response.json();
  } catch (error) {
    console.error('خطأ في تحديث الطلب:', error);
    throw error;
  }
};

/**
 * تحديث حالة الطلب
 */
export const updateOrderStatus = async (id: string, status: string, paymentStatus?: string): Promise<Order> => {
  try {
    const token = localStorage.getItem('authToken');
    const headers: HeadersInit = { 
      'Content-Type': 'application/json' 
    };
    
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const body: any = { status };
    if (paymentStatus) {
      body.paymentStatus = paymentStatus;
    }

    const response = await fetch(`${API_URL}/api/orders/${id}/status`, {
      method: 'PATCH',
      headers,
      body: JSON.stringify(body)
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'فشل تحديث حالة الطلب');
    }
    
    return await response.json();
  } catch (error) {
    console.error('خطأ في تحديث حالة الطلب:', error);
    throw error;
  }
};

/**
 * حذف طلب
 */
export const deleteOrder = async (id: string): Promise<boolean> => {
  try {
    const token = localStorage.getItem('authToken');
    const headers: HeadersInit = {};
    
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_URL}/api/orders/${id}`, {
      method: 'DELETE',
      headers
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'فشل حذف الطلب');
    }
    
    return true;
  } catch (error) {
    console.error('خطأ في حذف الطلب:', error);
    throw error;
  }
};

/**
 * جلب إحصائيات الطلبات
 */
export const fetchOrderStats = async (): Promise<OrderStats> => {
  try {
    const token = localStorage.getItem('authToken');
    const headers: HeadersInit = {};
    
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_URL}/api/orders/stats`, {
      headers
    });
    
    if (!response.ok) {
      throw new Error('فشل جلب إحصائيات الطلبات');
    }
    
    return await response.json();
  } catch (error) {
    console.error('خطأ في جلب إحصائيات الطلبات:', error);
    throw error;
  }
};
