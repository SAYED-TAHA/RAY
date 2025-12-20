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

export interface SecurityEvent {
  id: string;
  type: string;
  user: string;
  ip: string;
  status: string;
  timestamp: string;
}

export interface SecuritySettings {
  twoFactorAuth: boolean;
  sessionTimeout: number;
  passwordPolicy: string;
  loginAttempts: number;
  ipWhitelist: boolean;
  auditLog: boolean;
  encryptionEnabled?: boolean;
  sslEnabled?: boolean;
}

export const fetchSecurityEvents = async (limit?: number) => {
  try {
    const params = new URLSearchParams();
    if (limit) params.append('limit', limit.toString());

    const token = getAccessToken();
    const headers: HeadersInit = {};
    if (token) headers['Authorization'] = `Bearer ${token}`;

    const response = await fetch(`${API_URL}/api/audit/security/events?${params}`, { headers });
    if (!response.ok) throw new Error('Failed to fetch security events');
    return await response.json();
  } catch (error) {
    console.error('Error fetching security events:', error);
    throw error;
  }
};

export const fetchSecuritySettings = async () => {
  try {
    const token = getAccessToken();
    const headers: HeadersInit = {};
    if (token) headers['Authorization'] = `Bearer ${token}`;

    const response = await fetch(`${API_URL}/api/audit/security/settings`, { headers });
    if (!response.ok) throw new Error('Failed to fetch security settings');
    return await response.json();
  } catch (error) {
    console.error('Error fetching security settings:', error);
    throw error;
  }
};

export const updateSecuritySettings = async (settings: Partial<SecuritySettings>) => {
  try {
    const token = getAccessToken();
    const headers: HeadersInit = { 'Content-Type': 'application/json' };
    if (token) headers['Authorization'] = `Bearer ${token}`;

    const response = await fetch(`${API_URL}/api/audit/security/settings`, {
      method: 'PUT',
      headers,
      body: JSON.stringify(settings)
    });
    if (!response.ok) throw new Error('Failed to update security settings');
    return await response.json();
  } catch (error) {
    console.error('Error updating security settings:', error);
    throw error;
  }
};

export const fetchAuditLogs = async (filters: any = {}) => {
  try {
    const params = new URLSearchParams();
    if (filters.type) params.append('type', filters.type);
    if (filters.page) params.append('page', filters.page);
    if (filters.limit) params.append('limit', filters.limit);

    const token = getAccessToken();
    const headers: HeadersInit = {};
    if (token) headers['Authorization'] = `Bearer ${token}`;

    const response = await fetch(`${API_URL}/api/audit/logs?${params}`, { headers });
    if (!response.ok) throw new Error('Failed to fetch audit logs');
    return await response.json();
  } catch (error) {
    console.error('Error fetching audit logs:', error);
    throw error;
  }
};
