/**
 * خدمة التحليلات والإحصائيات
 * التواصل مع API للحصول على بيانات التحليلات
 */

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

const getAccessToken = (): string | null => {
  if (typeof window === 'undefined') return null;
  const storedTokens = localStorage.getItem('authTokens');
  if (storedTokens) {
    try {
      const parsed = JSON.parse(storedTokens);
      if (parsed?.accessToken) return parsed.accessToken;
    } catch {
      // ignore
    }
  }
  return localStorage.getItem('authToken');
};

export interface AnalyticsSummary {
  totalOrders: number;
  totalRevenue: number;
  avgOrderValue: number;
  totalProducts: number;
  avgProductPrice: number;
  totalStock: number;
}

export interface RevenueTrend {
  date: string;
  revenue: number;
  orders: number;
}

export interface TopProduct {
  _id: string;
  name: string;
  totalSold: number;
  revenue: number;
}

export interface PaymentDistribution {
  method: string;
  count: number;
  total: number;
}

export interface StatusDistribution {
  status: string;
  count: number;
}

export interface AnalyticsData {
  summary: AnalyticsSummary;
  trends: {
    revenue: RevenueTrend[];
  };
  topProducts: TopProduct[];
  paymentDistribution: PaymentDistribution[];
  statusDistribution: StatusDistribution[];
}

export interface DashboardOverview {
  overview: {
    orders: {
      current: number;
      previous: number;
      change: number;
    };
    revenue: {
      current: number;
      previous: number;
      change: number;
    };
    products: {
      total: number;
      active: number;
    };
  };
  recentOrders: Array<{
    orderNumber: string;
    status: string;
    pricing: {
      total: number;
    };
    createdAt: string;
  }>;
}

export interface SalesReportData {
  salesData: Array<{
    period: string;
    revenue: number;
    orders: number;
    avgOrderValue: number;
  }>;
}

/**
 * جلب بيانات التحليلات الشاملة
 */
export const fetchAnalytics = async (period: string = 'month', startDate?: string, endDate?: string): Promise<AnalyticsData> => {
  try {
    const params = new URLSearchParams();
    params.append('period', period);
    if (startDate) params.append('startDate', startDate);
    if (endDate) params.append('endDate', endDate);

    const token = getAccessToken();
    const headers: HeadersInit = {};
    
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_URL}/api/analytics?${params}`, {
      headers
    });
    
    if (!response.ok) {
      throw new Error('فشل جلب بيانات التحليلات');
    }
    
    return await response.json();
  } catch (error) {
    console.error('خطأ في جلب بيانات التحليلات:', error);
    throw error;
  }
};

/**
 * جلب نظرة عامة على لوحة التحكم
 */
export const fetchDashboardOverview = async (): Promise<DashboardOverview> => {
  try {
    const token = getAccessToken();
    const headers: HeadersInit = {};
    
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_URL}/api/analytics/dashboard`, {
      headers
    });
    
    if (!response.ok) {
      throw new Error('فشل جلب نظرة لوحة التحكم');
    }
    
    return await response.json();
  } catch (error) {
    console.error('خطأ في جلب نظرة لوحة التحكم:', error);
    throw error;
  }
};

/**
 * جلب تقرير المبيعات
 */
export const fetchSalesReport = async (
  startDate?: string, 
  endDate?: string, 
  groupBy: string = 'day'
): Promise<SalesReportData> => {
  try {
    const params = new URLSearchParams();
    if (startDate) params.append('startDate', startDate);
    if (endDate) params.append('endDate', endDate);
    params.append('groupBy', groupBy);

    const token = getAccessToken();
    const headers: HeadersInit = {};
    
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_URL}/api/analytics/sales?${params}`, {
      headers
    });
    
    if (!response.ok) {
      throw new Error('فشل جلب تقرير المبيعات');
    }
    
    return await response.json();
  } catch (error) {
    console.error('خطأ في جلب تقرير المبيعات:', error);
    throw error;
  }
};
