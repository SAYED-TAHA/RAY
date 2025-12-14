/**
 * خدمة إدارة الاشتراكات والباقات
 * تربط بين نظام الاشتراكات والأنشطة المختلفة
 */

export interface SubscriptionPlan {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  billingCycle: 'monthly' | 'quarterly' | 'annual';
  features: string[];
  maxUsers?: number;
  maxTransactions?: number;
  storageGB?: number;
  supportLevel: 'basic' | 'standard' | 'premium';
  isActive: boolean;
}

export interface UserSubscription {
  id: string;
  userId: string;
  planId: string;
  startDate: string;
  endDate: string;
  status: 'active' | 'expiring' | 'expired' | 'frozen' | 'cancelled';
  autoRenew: boolean;
  paymentMethod?: string;
  totalSpent: number;
  renewalDate?: string;
}

export interface ActivitySubscription {
  activityType: 'restaurant' | 'retail' | 'clinic' | 'gym' | 'salon' | 'pharmacy' | 'bookings';
  requiredPlan: 'basic' | 'standard' | 'premium';
  features: {
    dashboards: string[];
    maxEmployees: number;
    maxCustomers: number;
    advancedAnalytics: boolean;
    apiAccess: boolean;
    customBranding: boolean;
  };
}

// الخطط المتاحة
export const SUBSCRIPTION_PLANS: SubscriptionPlan[] = [
  {
    id: 'plan-basic',
    name: 'الباقة الأساسية',
    description: 'مناسبة للمتاجر الصغيرة والعيادات الفردية',
    price: 99,
    currency: 'EGP',
    billingCycle: 'monthly',
    features: [
      'لوحة تحكم أساسية',
      'إدارة المنتجات والخدمات',
      'إدارة العملاء',
      'تقارير بسيطة',
      'دعم عبر البريد الإلكتروني'
    ],
    maxUsers: 1,
    maxTransactions: 1000,
    storageGB: 5,
    supportLevel: 'basic',
    isActive: true
  },
  {
    id: 'plan-standard',
    name: 'الباقة المتوسطة',
    description: 'مناسبة للمتاجر المتوسطة والعيادات الصغيرة',
    price: 299,
    currency: 'EGP',
    billingCycle: 'monthly',
    features: [
      'جميع ميزات الباقة الأساسية',
      'لوحات متقدمة',
      'إدارة الموردين',
      'تقارير متقدمة',
      'إدارة الفروع',
      'دعم عبر الهاتف والبريد الإلكتروني',
      'تحديثات شهرية'
    ],
    maxUsers: 5,
    maxTransactions: 10000,
    storageGB: 50,
    supportLevel: 'standard',
    isActive: true
  },
  {
    id: 'plan-premium',
    name: 'الباقة المتقدمة',
    description: 'مناسبة للمتاجر الكبيرة والعيادات المتخصصة',
    price: 999,
    currency: 'EGP',
    billingCycle: 'monthly',
    features: [
      'جميع ميزات الباقة المتوسطة',
      'لوحات متقدمة جداً',
      'تحليلات ذكية بالذكاء الاصطناعي',
      'إدارة متقدمة للموارد البشرية',
      'تكامل مع أنظمة خارجية',
      'دعم 24/7 مخصص',
      'تحديثات أسبوعية',
      'API كامل',
      'تخصيص كامل للعلامة التجارية'
    ],
    maxUsers: 100,
    maxTransactions: 100000,
    storageGB: 500,
    supportLevel: 'premium',
    isActive: true
  }
];

// متطلبات الاشتراك لكل نشاط
export const ACTIVITY_SUBSCRIPTION_REQUIREMENTS: Record<string, ActivitySubscription> = {
  restaurant: {
    activityType: 'restaurant',
    requiredPlan: 'standard',
    features: {
      dashboards: ['overview', 'pos', 'kitchen', 'tables', 'menu', 'delivery', 'inventory', 'reservations'],
      maxEmployees: 50,
      maxCustomers: 10000,
      advancedAnalytics: true,
      apiAccess: true,
      customBranding: true
    }
  },
  retail: {
    activityType: 'retail',
    requiredPlan: 'standard',
    features: {
      dashboards: ['overview', 'pos', 'inventory', 'suppliers', 'customers'],
      maxEmployees: 20,
      maxCustomers: 5000,
      advancedAnalytics: true,
      apiAccess: true,
      customBranding: true
    }
  },
  clinic: {
    activityType: 'clinic',
    requiredPlan: 'standard',
    features: {
      dashboards: ['overview', 'patients', 'appointments', 'prescriptions', 'lab'],
      maxEmployees: 30,
      maxCustomers: 8000,
      advancedAnalytics: true,
      apiAccess: true,
      customBranding: true
    }
  },
  gym: {
    activityType: 'gym',
    requiredPlan: 'basic',
    features: {
      dashboards: ['overview', 'members', 'subscriptions', 'classes', 'attendance'],
      maxEmployees: 15,
      maxCustomers: 3000,
      advancedAnalytics: false,
      apiAccess: false,
      customBranding: false
    }
  },
  salon: {
    activityType: 'salon',
    requiredPlan: 'basic',
    features: {
      dashboards: ['overview', 'appointments', 'services', 'staff', 'customers'],
      maxEmployees: 10,
      maxCustomers: 2000,
      advancedAnalytics: false,
      apiAccess: false,
      customBranding: false
    }
  },
  pharmacy: {
    activityType: 'pharmacy',
    requiredPlan: 'standard',
    features: {
      dashboards: ['overview', 'inventory', 'sales', 'prescriptions', 'suppliers'],
      maxEmployees: 20,
      maxCustomers: 5000,
      advancedAnalytics: true,
      apiAccess: true,
      customBranding: true
    }
  },
  bookings: {
    activityType: 'bookings',
    requiredPlan: 'basic',
    features: {
      dashboards: ['overview', 'bookings', 'calendar', 'customers', 'reports'],
      maxEmployees: 10,
      maxCustomers: 3000,
      advancedAnalytics: false,
      apiAccess: false,
      customBranding: false
    }
  }
};

/**
 * التحقق من صلاحيات الاشتراك للنشاط
 */
export const checkActivityAccess = (
  userSubscription: UserSubscription | null,
  activityType: string
): { hasAccess: boolean; reason?: string } => {
  if (!userSubscription) {
    return { hasAccess: false, reason: 'لا يوجد اشتراك نشط' };
  }

  if (userSubscription.status !== 'active') {
    return { hasAccess: false, reason: `الاشتراك ${userSubscription.status}` };
  }

  const plan = SUBSCRIPTION_PLANS.find(p => p.id === userSubscription.planId);
  if (!plan) {
    return { hasAccess: false, reason: 'الباقة غير موجودة' };
  }

  const activityReq = ACTIVITY_SUBSCRIPTION_REQUIREMENTS[activityType];
  if (!activityReq) {
    return { hasAccess: false, reason: 'النشاط غير مدعوم' };
  }

  const planLevels = { basic: 1, standard: 2, premium: 3 };
  const userLevel = planLevels[plan.supportLevel as keyof typeof planLevels] || 0;
  const requiredLevel = planLevels[activityReq.requiredPlan as keyof typeof planLevels] || 0;

  if (userLevel < requiredLevel) {
    return { hasAccess: false, reason: `يتطلب باقة ${activityReq.requiredPlan} أو أعلى` };
  }

  return { hasAccess: true };
};

/**
 * الحصول على الميزات المتاحة للاشتراك
 */
export const getAvailableFeatures = (
  userSubscription: UserSubscription | null,
  activityType: string
): string[] => {
  if (!userSubscription || userSubscription.status !== 'active') {
    return [];
  }

  const plan = SUBSCRIPTION_PLANS.find(p => p.id === userSubscription.planId);
  if (!plan) return [];

  const activityReq = ACTIVITY_SUBSCRIPTION_REQUIREMENTS[activityType];
  if (!activityReq) return [];

  return activityReq.features.dashboards;
};

/**
 * حساب أيام انتهاء الاشتراك
 */
export const getDaysUntilExpiry = (endDate: string): number => {
  const today = new Date();
  const expiry = new Date(endDate);
  const diff = expiry.getTime() - today.getTime();
  return Math.ceil(diff / (1000 * 3600 * 24));
};

/**
 * تحديد حالة الاشتراك
 */
export const getSubscriptionStatus = (endDate: string): 'active' | 'expiring' | 'expired' => {
  const daysLeft = getDaysUntilExpiry(endDate);
  if (daysLeft <= 0) return 'expired';
  if (daysLeft <= 7) return 'expiring';
  return 'active';
};
