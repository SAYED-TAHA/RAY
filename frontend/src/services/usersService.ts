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

export interface User {
  _id: string;
  name: string;
  email: string;
  phone: string;
  role: 'admin' | 'merchant' | 'customer';
  status: 'active' | 'inactive' | 'suspended';
  joinDate: string;
  lastLogin: string;
  orders?: number;
  spent?: number;
  location?: string;
  avatar?: string;
  rating?: number;
  verified: boolean;
}

export interface UserStats {
  totalUsers: number;
  activeUsers: number;
  adminUsers: number;
  merchantUsers: number;
  customerUsers: number;
  verifiedUsers: number;
}

export const fetchUsers = async (filters: any = {}) => {
  try {
    const params = new URLSearchParams();
    if (filters.role) params.append('role', filters.role);
    if (filters.status) params.append('status', filters.status);
    if (filters.search) params.append('search', filters.search);
    if (filters.page) params.append('page', filters.page);
    if (filters.limit) params.append('limit', filters.limit);

    const token = getAccessToken();
    const headers: HeadersInit = {};
    if (token) headers['Authorization'] = `Bearer ${token}`;

    const response = await fetch(`${API_URL}/api/users?${params}`, { headers });
    if (!response.ok) throw new Error('Failed to fetch users');
    return await response.json();
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

export const fetchUserStats = async () => {
  try {
    const token = getAccessToken();
    const headers: HeadersInit = {};
    if (token) headers['Authorization'] = `Bearer ${token}`;

    const response = await fetch(`${API_URL}/api/users/stats`, { headers });
    if (!response.ok) throw new Error('Failed to fetch user stats');
    return await response.json();
  } catch (error) {
    console.error('Error fetching user stats:', error);
    throw error;
  }
};

export const updateUser = async (id: string, data: Partial<User>) => {
  try {
    const token = getAccessToken();
    const headers: HeadersInit = { 'Content-Type': 'application/json' };
    if (token) headers['Authorization'] = `Bearer ${token}`;

    const response = await fetch(`${API_URL}/api/users/${id}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify(data)
    });
    if (!response.ok) throw new Error('Failed to update user');
    return await response.json();
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};

export const deleteUser = async (id: string) => {
  try {
    const token = getAccessToken();
    const headers: HeadersInit = {};
    if (token) headers['Authorization'] = `Bearer ${token}`;

    const response = await fetch(`${API_URL}/api/users/${id}`, {
      method: 'DELETE',
      headers
    });
    if (!response.ok) throw new Error('Failed to delete user');
    return await response.json();
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
};
