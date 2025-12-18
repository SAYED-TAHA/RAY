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

const authHeaders = (): HeadersInit => {
  const token = getAccessToken();
  const headers: HeadersInit = { 'Content-Type': 'application/json' };
  if (token) headers['Authorization'] = `Bearer ${token}`;
  return headers;
};

export interface AdminSubscription {
  id: string;
  userId?: string | null;
  user: string;
  plan?: string;
  package: string;
  status: 'active' | 'inactive' | 'cancelled' | 'expired' | 'suspended' | string;
  startDate: string | null;
  endDate: string | null;
  amount: number;
  currency: string;
  autoRenew: boolean;
}

export const fetchAdminSubscriptions = async (limit = 200): Promise<AdminSubscription[]> => {
  const response = await fetch(`${API_URL}/api/admin/subscriptions?limit=${limit}`, {
    headers: authHeaders()
  });
  if (!response.ok) throw new Error('Failed to fetch subscriptions');
  return await response.json();
};
