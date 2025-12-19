"use client";

import { createContext } from 'react';

export interface User {
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

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresIn: string;
  tokenType: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  role?: 'user' | 'merchant';
}

export interface AuthContextType {
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

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
