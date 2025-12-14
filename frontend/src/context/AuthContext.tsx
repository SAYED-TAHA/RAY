"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'merchant' | 'admin';
  avatar?: string;
  isEmailVerified: boolean;
  preferences?: {
    language: 'ar' | 'en';
    theme: 'light' | 'dark';
  };
  subscription?: {
    plan: 'free' | 'basic' | 'premium' | 'enterprise';
    status: 'active' | 'inactive';
  };
  businessInfo?: {
    businessName?: string;
    businessType?: string;
    phone?: string;
  };
}

interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresIn: string;
  tokenType: string;
}

interface AuthContextType {
  user: User | null;
  tokens: AuthTokens | null;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: RegisterData) => Promise<void>;
  loginWithGoogle: () => void;
  logout: () => void;
  refreshToken: () => Promise<void>;
  updateProfile: (data: Partial<User>) => Promise<void>;
  loading: boolean;
  isAuthenticated: boolean;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
  role?: 'user' | 'merchant';
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Configure axios defaults
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
axios.defaults.baseURL = API_URL;

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [tokens, setTokens] = useState<AuthTokens | null>(null);
  const [loading, setLoading] = useState(true);

  // Set up axios interceptor for token refresh
  useEffect(() => {
    const requestInterceptor = axios.interceptors.request.use(
      (config) => {
        const token = tokens?.accessToken;
        if (token && config.headers) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseInterceptor = axios.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error.response?.status === 401 && tokens?.refreshToken) {
          try {
            const newTokens = await refreshTokens();
            setTokens(newTokens);
            if (error.config?.headers) {
              error.config.headers.Authorization = `Bearer ${newTokens.accessToken}`;
            }
            return axios.request(error.config);
          } catch (refreshError) {
            logout();
            return Promise.reject(refreshError);
          }
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axios.interceptors.request.eject(requestInterceptor);
      axios.interceptors.response.eject(responseInterceptor);
    };
  }, [tokens]);

  useEffect(() => {
    // Check for stored tokens on mount
    const storedTokens = localStorage.getItem('authTokens');
    const storedUser = localStorage.getItem('authUser');
    
    if (storedTokens && storedUser) {
      try {
        setTokens(JSON.parse(storedTokens));
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Error parsing stored auth data:', error);
        localStorage.removeItem('authTokens');
        localStorage.removeItem('authUser');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const response = await axios.post('/api/auth/login', { email, password });
      const responseData = response.data as any;
      const { data } = responseData;
      
      setUser(data.user);
      setTokens(data.tokens);
      
      localStorage.setItem('authUser', JSON.stringify(data.user));
      localStorage.setItem('authTokens', JSON.stringify(data.tokens));
    } catch (error: any) {
      const message = error.response?.data?.message || 'Login failed';
      throw new Error(message);
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData: RegisterData) => {
    setLoading(true);
    try {
      const response = await axios.post('/api/auth/register', userData);
      const responseData = response.data as any;
      const { data } = responseData;
      
      setUser(data.user);
      setTokens(data.tokens);
      
      localStorage.setItem('authUser', JSON.stringify(data.user));
      localStorage.setItem('authTokens', JSON.stringify(data.tokens));
    } catch (error: any) {
      const message = error.response?.data?.message || 'Registration failed';
      throw new Error(message);
    } finally {
      setLoading(false);
    }
  };

  const loginWithGoogle = () => {
    window.location.href = `${API_URL}/api/auth/google`;
  };

  const logout = () => {
    setUser(null);
    setTokens(null);
    localStorage.removeItem('authUser');
    localStorage.removeItem('authTokens');
    
    // Clear axios default header
    delete axios.defaults.headers.common.Authorization;
  };

  const refreshTokens = async () => {
    if (!tokens?.refreshToken) {
      throw new Error('No refresh token available');
    }
    
    const response = await axios.post('/api/auth/refresh', {
      refreshToken: tokens.refreshToken
    });
    
    const responseData = response.data as any;
    return responseData.data.tokens;
  };

  const refreshToken = async () => {
    try {
      const newTokens = await refreshTokens();
      setTokens(newTokens);
      localStorage.setItem('authTokens', JSON.stringify(newTokens));
    } catch (error) {
      logout();
      throw error;
    }
  };

  const updateProfile = async (data: Partial<User>) => {
    try {
      const response = await axios.put('/api/auth/profile', data);
      const responseData = response.data as any;
      const updatedUser = responseData.data.user;
      
      setUser(updatedUser);
      localStorage.setItem('authUser', JSON.stringify(updatedUser));
    } catch (error: any) {
      const message = error.response?.data?.message || 'Profile update failed';
      throw new Error(message);
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      tokens, 
      login, 
      register, 
      loginWithGoogle,
      logout, 
      refreshToken, 
      updateProfile,
      loading, 
      isAuthenticated: !!user 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Helper function to refresh tokens
const refreshTokens = async () => {
  const refreshToken = localStorage.getItem('authTokens') 
    ? JSON.parse(localStorage.getItem('authTokens')!).refreshToken 
    : null;
    
  if (!refreshToken) {
    throw new Error('No refresh token available');
  }
  
  const response = await axios.post('/api/auth/refresh', {
    refreshToken
  });
  
  const responseData = response.data as any;
  return responseData.data.tokens;
};
