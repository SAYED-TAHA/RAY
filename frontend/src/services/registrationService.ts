/**
 * خدمة التسجيل والتوجيه
 * تربط بين نظام التسجيل والأنشطة والاشتراكات
 */

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'customer' | 'merchant' | 'admin';
  activities: UserActivity[];
  createdAt: string;
  updatedAt: string;
}

export interface UserActivity {
  id: string;
  activityType: 'restaurant' | 'retail' | 'clinic' | 'gym' | 'salon' | 'pharmacy' | 'bookings';
  name: string;
  description?: string;
  status: 'active' | 'inactive' | 'pending';
  subscriptionId?: string;
  createdAt: string;
  role: 'owner' | 'manager' | 'staff';
}

export interface RegistrationStep {
  step: number;
  title: string;
  description: string;
  fields: string[];
  completed: boolean;
}

// خطوات التسجيل
export const REGISTRATION_STEPS: RegistrationStep[] = [
  {
    step: 1,
    title: 'البيانات الشخصية',
    description: 'أدخل بيانات حسابك الأساسية',
    fields: ['name', 'email', 'phone', 'password'],
    completed: false
  },
  {
    step: 2,
    title: 'نوع النشاط',
    description: 'اختر نوع النشاط الذي تريد إدارته',
    fields: ['activityType'],
    completed: false
  },
  {
    step: 3,
    title: 'بيانات النشاط',
    description: 'أدخل معلومات نشاطك التجاري',
    fields: ['activityName', 'activityDescription', 'location', 'phone'],
    completed: false
  },
  {
    step: 4,
    title: 'اختيار الباقة',
    description: 'اختر الباقة المناسبة لنشاطك',
    fields: ['planId'],
    completed: false
  },
  {
    step: 5,
    title: 'بيانات الدفع',
    description: 'أدخل بيانات الدفع لتفعيل الاشتراك',
    fields: ['paymentMethod', 'cardNumber', 'expiryDate', 'cvv'],
    completed: false
  }
];

// مسارات التوجيه حسب نوع النشاط
export const ACTIVITY_ROUTES: Record<string, string> = {
  restaurant: '/dashboard/restaurant',
  retail: '/dashboard/retail',
  clinic: '/dashboard/clinic',
  gym: '/dashboard/gym',
  salon: '/dashboard/salon',
  pharmacy: '/dashboard/pharmacy',
  bookings: '/dashboard/bookings'
};

// الصفحات الرئيسية حسب دور المستخدم
export const ROLE_ROUTES: Record<string, string> = {
  customer: '/customer/dashboard',
  merchant: '/merchant/dashboard',
  admin: '/admin/dashboard'
};

// الصفحات المتاحة حسب الدور
export const ROLE_PERMISSIONS: Record<string, string[]> = {
  customer: [
    '/customer/dashboard',
    '/customer/orders',
    '/customer/profile',
    '/customer/support'
  ],
  merchant: [
    '/merchant/dashboard',
    '/dashboard/restaurant',
    '/dashboard/retail',
    '/dashboard/clinic',
    '/dashboard/gym',
    '/dashboard/salon',
    '/dashboard/pharmacy',
    '/dashboard/bookings',
    '/merchant/activities',
    '/merchant/subscriptions',
    '/merchant/settings'
  ],
  admin: [
    '/admin',
    '/admin/users',
    '/admin/activities',
    '/admin/subscriptions',
    '/admin/payments',
    '/admin/analytics',
    '/admin/settings'
  ]
};

/**
 * الحصول على المسار الافتراضي بناءً على الدور
 */
export const getDefaultRoute = (role: string): string => {
  return ROLE_ROUTES[role] || '/';
};

/**
 * التحقق من صلاحية الوصول إلى صفحة معينة
 */
export const hasPageAccess = (role: string, page: string): boolean => {
  const permissions = ROLE_PERMISSIONS[role] || [];
  return permissions.includes(page);
};

/**
 * الحصول على المسار الأول للنشاط
 */
export const getActivityRoute = (activityType: string): string => {
  return ACTIVITY_ROUTES[activityType] || '/dashboard';
};

/**
 * بناء مسار التوجيه بناءً على البيانات
 */
export const buildNavigationPath = (
  role: string,
  activityType?: string,
  activityId?: string
): string => {
  if (role === 'customer') {
    return '/customer/dashboard';
  }

  if (role === 'admin') {
    return '/admin';
  }

  if (role === 'merchant' && activityType) {
    const basePath = ACTIVITY_ROUTES[activityType];
    return activityId ? `${basePath}?id=${activityId}` : basePath;
  }

  return '/merchant/dashboard';
};

/**
 * التحقق من اكتمال بيانات التسجيل
 */
export const validateRegistrationData = (
  data: any,
  step: number
): { valid: boolean; errors: string[] } => {
  const errors: string[] = [];
  const stepData = REGISTRATION_STEPS[step - 1];

  if (!stepData) {
    return { valid: false, errors: ['خطوة غير صحيحة'] };
  }

  // التحقق من الحقول المطلوبة
  for (const field of stepData.fields) {
    if (!data[field]) {
      errors.push(`${field} مطلوب`);
    }
  }

  // التحقق من صحة البريد الإلكتروني
  if (step === 1 && data.email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      errors.push('البريد الإلكتروني غير صحيح');
    }
  }

  // التحقق من طول كلمة المرور
  if (step === 1 && data.password) {
    if (data.password.length < 8) {
      errors.push('كلمة المرور يجب أن تكون 8 أحرف على الأقل');
    }
  }

  // التحقق من رقم الهاتف
  if (data.phone) {
    const phoneRegex = /^(\+20|0)[0-9]{9,10}$/;
    if (!phoneRegex.test(data.phone)) {
      errors.push('رقم الهاتف غير صحيح');
    }
  }

  return { valid: errors.length === 0, errors };
};

/**
 * إنشاء ملف تعريف المستخدم الجديد
 */
export const createUserProfile = (
  registrationData: any
): UserProfile => {
  return {
    id: `user-${Date.now()}`,
    name: registrationData.name,
    email: registrationData.email,
    phone: registrationData.phone,
    role: registrationData.role || 'merchant',
    activities: [
      {
        id: `activity-${Date.now()}`,
        activityType: registrationData.activityType,
        name: registrationData.activityName,
        description: registrationData.activityDescription,
        status: 'pending',
        subscriptionId: registrationData.subscriptionId,
        createdAt: new Date().toISOString(),
        role: 'owner'
      }
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
};

/**
 * إضافة نشاط جديد للمستخدم
 */
export const addActivityToUser = (
  userProfile: UserProfile,
  activityData: any
): UserProfile => {
  const newActivity: UserActivity = {
    id: `activity-${Date.now()}`,
    activityType: activityData.activityType,
    name: activityData.name,
    description: activityData.description,
    status: 'pending',
    subscriptionId: activityData.subscriptionId,
    createdAt: new Date().toISOString(),
    role: 'owner'
  };

  return {
    ...userProfile,
    activities: [...userProfile.activities, newActivity],
    updatedAt: new Date().toISOString()
  };
};
