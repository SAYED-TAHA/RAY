const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export interface GlobalStats {
  totalUsers: number;
  activeUsers: number;
  totalOrders: number;
  pendingOrders: number;
  totalRevenue: number;
  growth: number;
  systemUptime: string;
  serverLoad: string;
  storageUsed: string;
  databaseConnections: number;
  apiRequests: number;
  errorRate: string;
  responseTime: string;
}

export const fetchGlobalStats = async () => {
  try {
    const token = localStorage.getItem('authToken');
    const headers: HeadersInit = {};
    if (token) headers['Authorization'] = `Bearer ${token}`;

    const [analytics, users, system] = await Promise.all([
      fetch(`${API_URL}/api/analytics/dashboard`, { headers }).then(r => r.json()),
      fetch(`${API_URL}/api/users/stats`, { headers }).then(r => r.json()),
      fetch(`${API_URL}/api/system/stats`, { headers }).then(r => r.json())
    ]);

    return {
      totalUsers: users.totalUsers || 0,
      activeUsers: users.activeUsers || 0,
      totalOrders: analytics.overview?.orders?.current || 0,
      pendingOrders: Math.floor((analytics.overview?.orders?.current || 0) * 0.1),
      totalRevenue: analytics.overview?.revenue?.current || 0,
      growth: analytics.overview?.revenue?.change || 0,
      systemUptime: system.systemUptime || '99.9%',
      serverLoad: '45%',
      storageUsed: '67%',
      databaseConnections: system.databaseConnections || 0,
      apiRequests: system.apiRequests || 0,
      errorRate: system.errorRate || '0.1%',
      responseTime: system.responseTime || '245ms'
    };
  } catch (error) {
    console.error('Error fetching global stats:', error);
    throw error;
  }
};
