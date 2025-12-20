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

export interface AdminSettings {
  id: string;
  generalToggle?: any;
  general: {
    siteName: string;
    siteUrl: string;
    adminEmail: string;
    supportPhone: string;
    timezone: string;
    language: string;
    currency: string;
    dateFormat: string;
    maintenance: boolean;
  };
  advanced?: {
    siteDescription?: string;
    debugMode?: boolean;
    cacheEnabled?: boolean;
    apiEnabled?: boolean;
    analyticsEnabled?: boolean;
    backupFrequency?: string;
    maxUploadSize?: number;
  };
  ui?: {
    theme?: string;
    layout?: string;
    branding?: {
      logoUrl?: string;
      faviconUrl?: string;
      appDescription?: string;
    };
    colors?: {
      primaryColor?: string;
      secondaryColor?: string;
      accentColor?: string;
    };
    palette?: {
      primary?: string;
      secondary?: string;
      accent?: string;
      danger?: string;
      warning?: string;
      success?: string;
      info?: string;
      light?: string;
      dark?: string;
    };
    visibility?: {
      headerVisible?: boolean;
      footerVisible?: boolean;
      sidebarVisible?: boolean;
    };
    header?: {
      visible?: boolean;
      sticky?: boolean;
      transparent?: boolean;
      backgroundColor?: string;
      textColor?: string;
      logoSize?: string;
      menuPosition?: string;
      searchEnabled?: boolean;
      cartEnabled?: boolean;
      userMenuEnabled?: boolean;
      notificationsEnabled?: boolean;
      height?: string;
    };
    footer?: {
      visible?: boolean;
      backgroundColor?: string;
      textColor?: string;
      columns?: number;
      showSocial?: boolean;
      showNewsletter?: boolean;
      showPaymentMethods?: boolean;
      showCopyright?: boolean;
      copyrightText?: string;
    };
    typography?: {
      headingFont?: string;
      bodyFont?: string;
      fontSize?: number;
      lineHeight?: number;
      letterSpacing?: number;
    };
    sidebar?: {
      visible?: boolean;
      position?: string;
      width?: string;
      backgroundColor?: string;
      textColor?: string;
      collapsible?: boolean;
      defaultCollapsed?: boolean;
      showIcons?: boolean;
      showLabels?: boolean;
      animatedTransitions?: boolean;
    };
    responsive?: {
      mobileOptimized?: boolean;
      tabletOptimized?: boolean;
      desktopOptimized?: boolean;
      mobileBreakpoint?: number;
      tabletBreakpoint?: number;
      desktopBreakpoint?: number;
    };
    buttons?: any[];
    links?: any[];
    menus?: any[];
  };
  notifications: {
    emailNotifications: boolean;
    smsNotifications: boolean;
    pushNotifications: boolean;
    orderNotifications: boolean;
    userNotifications: boolean;
    systemNotifications: boolean;
    marketingEmails: boolean;
    weeklyReports: boolean;
  };
  security: {
    twoFactorAuth: boolean;
    sessionTimeout: number;
    passwordPolicy?: string;
    passwordMinLength: number;
    requireStrongPassword: boolean;
    loginAttempts: number;
    ipWhitelist: boolean;
    auditLog: boolean;
    autoBackup: boolean;
    encryptionEnabled?: boolean;
    sslEnabled?: boolean;
  };
  payment: {
    paypalEnabled: boolean;
    stripeEnabled: boolean;
    cashOnDelivery: boolean;
    bankTransfer: boolean;
    taxRate: number;
    shippingFee: number;
    freeShippingThreshold: number;
  };
}

export const fetchAdminSettings = async (): Promise<AdminSettings> => {
  const token = getAccessToken();
  const headers: HeadersInit = {};
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const response = await fetch(`${API_URL}/api/admin/settings`, { headers });
  if (!response.ok) throw new Error('Failed to fetch admin settings');
  return await response.json();
};

export const updateAdminSettings = async (settings: Partial<AdminSettings>): Promise<AdminSettings> => {
  const token = getAccessToken();
  const headers: HeadersInit = { 'Content-Type': 'application/json' };
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const response = await fetch(`${API_URL}/api/admin/settings`, {
    method: 'PUT',
    headers,
    body: JSON.stringify(settings)
  });

  if (!response.ok) throw new Error('Failed to update admin settings');
  return await response.json();
};
