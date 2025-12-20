// API Configuration
export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000',
  TIMEOUT: 10000, // 10 seconds
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000, // 1 second
};

const getStoredAccessToken = (): string | null => {
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

  return localStorage.getItem('authToken') || localStorage.getItem('token') || localStorage.getItem('accessToken');
};

// Common API headers
export const getHeaders = (contentType = 'application/json') => {
  const headers: Record<string, string> = {
    'Content-Type': contentType,
  };

  // Add auth token if available
  if (typeof window !== 'undefined') {
    const token = getStoredAccessToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
  }

  return headers;
};

// Generic API request wrapper with error handling
export const apiRequest = async (
  endpoint: string,
  options: RequestInit = {}
): Promise<Response> => {
  const url = `${API_CONFIG.BASE_URL}${endpoint}`;
  const headers = getHeaders();

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), API_CONFIG.TIMEOUT);

  try {
    const response = await fetch(url, {
      ...options,
      headers: { ...headers, ...options.headers },
      signal: controller.signal,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP ${response.status}: ${response.statusText}`);
    }

    return response;
  } catch (error) {
    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        throw new Error('Request timeout');
      }
      throw error;
    }
    throw new Error('Unknown error occurred');
  } finally {
    clearTimeout(timeoutId);
  }
};

// HTTP method helpers
export const api = {
  get: (endpoint: string, options?: RequestInit) =>
    apiRequest(endpoint, { method: 'GET', ...options }),
  
  post: (endpoint: string, data?: any, options?: RequestInit) =>
    apiRequest(endpoint, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
      ...options,
    }),
  
  put: (endpoint: string, data?: any, options?: RequestInit) =>
    apiRequest(endpoint, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
      ...options,
    }),
  
  patch: (endpoint: string, data?: any, options?: RequestInit) =>
    apiRequest(endpoint, {
      method: 'PATCH',
      body: data ? JSON.stringify(data) : undefined,
      ...options,
    }),
  
  delete: (endpoint: string, options?: RequestInit) =>
    apiRequest(endpoint, { method: 'DELETE', ...options }),
};

// Export for backward compatibility
export const API_URL = API_CONFIG.BASE_URL;
