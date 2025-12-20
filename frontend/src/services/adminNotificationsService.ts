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

export interface AdminNotification {
  id: string;
  title: string;
  message: string;
  type: string;
  priority: string;
  status: string;
  recipients: string;
  sentAt: string | null;
  scheduledAt: string | null;
  readBy: number;
  totalRecipients: number;
  deliveryRate: number;
  createdBy: string;
}

export const fetchAdminNotifications = async (limit = 100): Promise<AdminNotification[]> => {
  const token = getAccessToken();
  const headers: HeadersInit = {};
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const response = await fetch(`${API_URL}/api/admin/notifications?limit=${limit}`, { headers });
  if (!response.ok) throw new Error('Failed to fetch admin notifications');
  return await response.json();
};
