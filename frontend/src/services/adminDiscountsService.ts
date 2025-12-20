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

export interface AdminDiscount {
  id: string;
  code: string;
  type: 'percentage' | 'fixed';
  value: number;
  usage: number;
  maxUse: number;
  status: 'active' | 'expired' | 'disabled';
  expiry: string | null;
}

const authHeaders = (): HeadersInit => {
  const token = getAccessToken();
  const headers: HeadersInit = { 'Content-Type': 'application/json' };
  if (token) headers['Authorization'] = `Bearer ${token}`;
  return headers;
};

export const fetchAdminDiscounts = async (limit = 200): Promise<AdminDiscount[]> => {
  const response = await fetch(`${API_URL}/api/admin/discounts?limit=${limit}`, {
    headers: authHeaders()
  });
  if (!response.ok) throw new Error('Failed to fetch discounts');
  return await response.json();
};

export const createAdminDiscount = async (payload: {
  code: string;
  type: 'percentage' | 'fixed';
  value: number;
  maxUse?: number;
  status?: 'active' | 'expired' | 'disabled';
  expiryDate?: string | null;
}): Promise<any> => {
  const response = await fetch(`${API_URL}/api/admin/discounts`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify(payload)
  });
  if (!response.ok) throw new Error('Failed to create discount');
  return await response.json();
};

export const updateAdminDiscount = async (id: string, payload: any): Promise<any> => {
  const response = await fetch(`${API_URL}/api/admin/discounts/${id}`, {
    method: 'PUT',
    headers: authHeaders(),
    body: JSON.stringify(payload)
  });
  if (!response.ok) throw new Error('Failed to update discount');
  return await response.json();
};

export const deleteAdminDiscount = async (id: string): Promise<void> => {
  const response = await fetch(`${API_URL}/api/admin/discounts/${id}`, {
    method: 'DELETE',
    headers: authHeaders()
  });
  if (!response.ok) throw new Error('Failed to delete discount');
};
