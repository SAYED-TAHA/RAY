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

export interface AdminMessage {
  id: string;
  sender: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  date: string;
  status: string;
  priority: string;
  category: string;
  attachments: number;
}

export const fetchAdminMessages = async (limit = 100): Promise<AdminMessage[]> => {
  const token = getAccessToken();
  const headers: HeadersInit = {};
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const response = await fetch(`${API_URL}/api/admin/messages?limit=${limit}`, { headers });
  if (!response.ok) throw new Error('Failed to fetch admin messages');
  return await response.json();
};
