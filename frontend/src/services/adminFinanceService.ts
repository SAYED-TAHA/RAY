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

export interface FinancialAnalysisData {
  analysis: {
    revenue: number;
    expenses: number;
    profit: number;
    marginPercentage: number;
    growthRate: number;
    roi: number;
  };
  monthlyData: Array<{
    month: string;
    revenue: number;
    expenses: number;
    profit: number;
  }>;
}

export interface RevenueSource {
  source: string;
  amount: number;
  percentage: number;
  trend: number;
}

export interface ProfitRow {
  month: string;
  revenue: number;
  expenses: number;
  profit: number;
  margin: number;
}

export interface ExpenseCategory {
  category: string;
  amount: number;
  percentage: number;
  trend: number;
}

export interface ConversionData {
  source: string;
  visitors: number;
  conversions: number;
  rate: number;
  trend: 'up' | 'down';
}

const authHeaders = (): HeadersInit => {
  const token = getAccessToken();
  const headers: HeadersInit = {};
  if (token) headers['Authorization'] = `Bearer ${token}`;
  return headers;
};

export const fetchFinancialAnalysis = async (): Promise<FinancialAnalysisData> => {
  const response = await fetch(`${API_URL}/api/admin/financial-analysis`, { headers: authHeaders() });
  if (!response.ok) throw new Error('Failed to fetch financial analysis');
  return await response.json();
};

export const fetchRevenue = async (period = 'month'): Promise<RevenueSource[]> => {
  const response = await fetch(`${API_URL}/api/admin/revenue?period=${encodeURIComponent(period)}`, { headers: authHeaders() });
  if (!response.ok) throw new Error('Failed to fetch revenue');
  return await response.json();
};

export const fetchProfit = async (): Promise<ProfitRow[]> => {
  const response = await fetch(`${API_URL}/api/admin/profit`, { headers: authHeaders() });
  if (!response.ok) throw new Error('Failed to fetch profit');
  return await response.json();
};

export const fetchExpenses = async (): Promise<ExpenseCategory[]> => {
  const response = await fetch(`${API_URL}/api/admin/expenses`, { headers: authHeaders() });
  if (!response.ok) throw new Error('Failed to fetch expenses');
  return await response.json();
};

export const fetchConversions = async (): Promise<ConversionData[]> => {
  const response = await fetch(`${API_URL}/api/admin/conversions`, { headers: authHeaders() });
  if (!response.ok) throw new Error('Failed to fetch conversions');
  return await response.json();
};
