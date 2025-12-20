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

export interface SystemHealth {
  server: {
    status: string;
    uptime: string;
    cpu: number;
    memory: number;
    storage: number;
  };
  database: {
    status: string;
    size: string;
    connections: number;
    queries: number;
  };
  network: {
    status: string;
    bandwidth: string;
    latency: string;
  };
  application: {
    orders: number;
    products: number;
    users: number;
    todayOrders: number;
  };
}

export interface SystemStats {
  orders: number;
  revenue: number;
  users: number;
  activeUsers: number;
  systemUptime: string;
  apiRequests: number;
  errorRate: string;
  responseTime: string;
}

export const fetchSystemHealth = async () => {
  try {
    const token = getAccessToken();
    const headers: HeadersInit = {};
    if (token) headers['Authorization'] = `Bearer ${token}`;

    const response = await fetch(`${API_URL}/api/system/health`, { headers });
    if (!response.ok) throw new Error('Failed to fetch system health');
    return await response.json();
  } catch (error) {
    console.error('Error fetching system health:', error);
    throw error;
  }
};

export const fetchSystemLogs = async (level?: string, limit?: number) => {
  try {
    const params = new URLSearchParams();
    if (level) params.append('level', level);
    if (limit) params.append('limit', limit.toString());

    const token = getAccessToken();
    const headers: HeadersInit = {};
    if (token) headers['Authorization'] = `Bearer ${token}`;

    const response = await fetch(`${API_URL}/api/system/logs?${params}`, { headers });
    if (!response.ok) throw new Error('Failed to fetch system logs');
    return await response.json();
  } catch (error) {
    console.error('Error fetching system logs:', error);
    throw error;
  }
};

export const fetchSystemStats = async () => {
  try {
    const token = getAccessToken();
    const headers: HeadersInit = {};
    if (token) headers['Authorization'] = `Bearer ${token}`;

    const response = await fetch(`${API_URL}/api/system/stats`, { headers });
    if (!response.ok) throw new Error('Failed to fetch system stats');
    return await response.json();
  } catch (error) {
    console.error('Error fetching system stats:', error);
    throw error;
  }
};
