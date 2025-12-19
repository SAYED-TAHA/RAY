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

export interface AdminContentItem {
  id: string;
  title: string;
  type: 'article' | 'image' | 'video' | 'audio' | 'document';
  category: string;
  status: 'published' | 'draft' | 'archived';
  views: number;
  size?: string | null;
  duration?: string | null;
  author: string;
  createdAt?: string;
  updatedAt?: string;
}

export const fetchAdminContentItems = async (params: {
  limit?: number;
  search?: string;
  type?: string;
  category?: string;
  status?: string;
} = {}): Promise<AdminContentItem[]> => {
  const token = getAccessToken();
  const headers: HeadersInit = {};
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const qs = new URLSearchParams();
  if (params.limit) qs.set('limit', String(params.limit));
  if (params.search) qs.set('search', params.search);
  if (params.type) qs.set('type', params.type);
  if (params.category) qs.set('category', params.category);
  if (params.status) qs.set('status', params.status);

  const response = await fetch(`${API_URL}/api/admin/content?${qs.toString()}`, { headers });
  if (!response.ok) throw new Error('Failed to fetch admin content');
  return await response.json();
};
