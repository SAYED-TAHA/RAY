import { API_URL } from '@/utils/api';

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
    const token = getAccessToken();
    const headers: HeadersInit = {};
    if (token) headers['Authorization'] = `Bearer ${token}`;

    const [analytics, users, system, health, orderStats] = await Promise.all([
      fetch(`${API_URL}/api/analytics/dashboard`, { headers }).then(r => r.json()),
      fetch(`${API_URL}/api/users/stats`, { headers }).then(r => r.json()),
      fetch(`${API_URL}/api/system/stats`, { headers }).then(r => r.json()),
      fetch(`${API_URL}/api/system/health`, { headers }).then(r => r.json()),
      fetch(`${API_URL}/api/orders/stats`, { headers }).then(r => r.json())
    ]);

    const cpu = typeof health?.server?.cpu === 'number' ? health.server.cpu : null;
    const storage = typeof health?.server?.storage === 'number' ? health.server.storage : null;

    return {
      totalUsers: users.totalUsers || 0,
      activeUsers: users.activeUsers || 0,
      totalOrders: orderStats?.totalOrders || analytics.overview?.orders?.current || 0,
      pendingOrders: orderStats?.pendingOrders || 0,
      totalRevenue: analytics.overview?.revenue?.current || 0,
      growth: analytics.overview?.revenue?.change || 0,
      systemUptime: system?.systemUptime || health?.server?.uptime || 'N/A',
      serverLoad: cpu !== null ? `${cpu}%` : 'N/A',
      storageUsed: storage !== null ? `${storage}%` : 'N/A',
      databaseConnections: system.databaseConnections || 0,
      apiRequests: system.apiRequests || 0,
      errorRate: system?.errorRate || 'N/A',
      responseTime: system?.responseTime || 'N/A'
    };
  } catch (error) {
    console.error('Error fetching global stats:', error);
    throw error;
  }
};
