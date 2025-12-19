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

export interface AdminFAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
  status: 'published' | 'draft' | 'archived';
  views: number;
  helpful: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface AdminSupportTicket {
  id: string;
  title: string;
  description?: string;
  status: 'open' | 'pending' | 'closed';
  priority: 'low' | 'medium' | 'high';
  replies: number;
  createdAt?: string;
  updatedAt?: string;
}

export const fetchAdminFaqs = async (params: {
  limit?: number;
  search?: string;
  category?: string;
  status?: string;
} = {}): Promise<AdminFAQ[]> => {
  const token = getAccessToken();
  const headers: HeadersInit = {};
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const qs = new URLSearchParams();
  if (params.limit) qs.set('limit', String(params.limit));
  if (params.search) qs.set('search', params.search);
  if (params.category) qs.set('category', params.category);
  if (params.status) qs.set('status', params.status);

  const response = await fetch(`${API_URL}/api/admin/help/faqs?${qs.toString()}`, { headers });
  if (!response.ok) throw new Error('Failed to fetch admin FAQs');
  return await response.json();
};

export const fetchAdminSupportTickets = async (params: {
  limit?: number;
  search?: string;
  status?: string;
} = {}): Promise<AdminSupportTicket[]> => {
  const token = getAccessToken();
  const headers: HeadersInit = {};
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const qs = new URLSearchParams();
  if (params.limit) qs.set('limit', String(params.limit));
  if (params.search) qs.set('search', params.search);
  if (params.status) qs.set('status', params.status);

  const response = await fetch(`${API_URL}/api/admin/help/tickets?${qs.toString()}`, { headers });
  if (!response.ok) throw new Error('Failed to fetch admin support tickets');
  return await response.json();
};
