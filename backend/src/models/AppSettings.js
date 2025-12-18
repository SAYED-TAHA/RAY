import mongoose from 'mongoose';

const appSettingsSchema = new mongoose.Schema({
  general: {
    siteName: { type: String, default: 'Ray' },
    siteUrl: { type: String, default: '' },
    adminEmail: { type: String, default: '' },
    supportPhone: { type: String, default: '' },
    timezone: { type: String, default: 'Africa/Cairo' },
    language: { type: String, default: 'ar' },
    currency: { type: String, default: 'EGP' },
    dateFormat: { type: String, default: 'DD/MM/YYYY' },
    maintenance: { type: Boolean, default: false }
  },
  advanced: {
    siteDescription: { type: String, default: '' },
    debugMode: { type: Boolean, default: false },
    cacheEnabled: { type: Boolean, default: true },
    apiEnabled: { type: Boolean, default: true },
    analyticsEnabled: { type: Boolean, default: true },
    backupFrequency: { type: String, default: 'daily' },
    maxUploadSize: { type: Number, default: 50 }
  },
  ui: {
    branding: {
      logoUrl: { type: String, default: '/logo.png' },
      faviconUrl: { type: String, default: '/favicon.ico' }
    },
    theme: { type: String, default: 'light' },
    layout: { type: String, default: 'default' },
    colors: {
      primaryColor: { type: String, default: '#3B82F6' },
      secondaryColor: { type: String, default: '#10B981' },
      accentColor: { type: String, default: '#F59E0B' }
    },
    palette: {
      primary: { type: String, default: '#3B82F6' },
      secondary: { type: String, default: '#10B981' },
      accent: { type: String, default: '#F59E0B' },
      danger: { type: String, default: '#EF4444' },
      warning: { type: String, default: '#F97316' },
      success: { type: String, default: '#22C55E' },
      info: { type: String, default: '#06B6D4' },
      light: { type: String, default: '#F3F4F6' },
      dark: { type: String, default: '#1F2937' }
    },
    visibility: {
      headerVisible: { type: Boolean, default: true },
      footerVisible: { type: Boolean, default: true },
      sidebarVisible: { type: Boolean, default: true }
    },
    header: {
      visible: { type: Boolean, default: true },
      sticky: { type: Boolean, default: true },
      transparent: { type: Boolean, default: false },
      backgroundColor: { type: String, default: '#ffffff' },
      textColor: { type: String, default: '#000000' },
      logoSize: { type: String, default: 'medium' },
      menuPosition: { type: String, default: 'right' },
      searchEnabled: { type: Boolean, default: true },
      cartEnabled: { type: Boolean, default: true },
      userMenuEnabled: { type: Boolean, default: true },
      notificationsEnabled: { type: Boolean, default: true },
      height: { type: String, default: 'normal' }
    },
    footer: {
      visible: { type: Boolean, default: true },
      backgroundColor: { type: String, default: '#1f2937' },
      textColor: { type: String, default: '#ffffff' },
      columns: { type: Number, default: 4 },
      showSocial: { type: Boolean, default: true },
      showNewsletter: { type: Boolean, default: true },
      showPaymentMethods: { type: Boolean, default: true },
      showCopyright: { type: Boolean, default: true },
      copyrightText: { type: String, default: '© 2025 راي للتقنية. جميع الحقوق محفوظة.' }
    },
    typography: {
      headingFont: { type: String, default: 'Cairo' },
      bodyFont: { type: String, default: 'Tajawal' },
      fontSize: { type: Number, default: 16 },
      lineHeight: { type: Number, default: 1.6 },
      letterSpacing: { type: Number, default: 0 }
    },
    sidebar: {
      visible: { type: Boolean, default: true },
      position: { type: String, default: 'right' },
      width: { type: String, default: 'normal' },
      backgroundColor: { type: String, default: '#ffffff' },
      textColor: { type: String, default: '#000000' },
      collapsible: { type: Boolean, default: true },
      defaultCollapsed: { type: Boolean, default: false },
      showIcons: { type: Boolean, default: true },
      showLabels: { type: Boolean, default: true },
      animatedTransitions: { type: Boolean, default: true }
    },
    responsive: {
      mobileOptimized: { type: Boolean, default: true },
      tabletOptimized: { type: Boolean, default: true },
      desktopOptimized: { type: Boolean, default: true },
      mobileBreakpoint: { type: Number, default: 640 },
      tabletBreakpoint: { type: Number, default: 1024 },
      desktopBreakpoint: { type: Number, default: 1280 }
    },
    buttons: { type: [mongoose.Schema.Types.Mixed], default: [] },
    links: { type: [mongoose.Schema.Types.Mixed], default: [] },
    menus: { type: [mongoose.Schema.Types.Mixed], default: [] }
  },
  notifications: {
    emailNotifications: { type: Boolean, default: true },
    smsNotifications: { type: Boolean, default: false },
    pushNotifications: { type: Boolean, default: true },
    orderNotifications: { type: Boolean, default: true },
    userNotifications: { type: Boolean, default: true },
    systemNotifications: { type: Boolean, default: true },
    marketingEmails: { type: Boolean, default: false },
    weeklyReports: { type: Boolean, default: true }
  },
  security: {
    twoFactorAuth: { type: Boolean, default: false },
    sessionTimeout: { type: Number, default: 30 },
    passwordPolicy: { type: String, default: 'strong' },
    passwordMinLength: { type: Number, default: 8 },
    requireStrongPassword: { type: Boolean, default: true },
    loginAttempts: { type: Number, default: 5 },
    ipWhitelist: { type: Boolean, default: false },
    auditLog: { type: Boolean, default: true },
    autoBackup: { type: Boolean, default: true },
    encryptionEnabled: { type: Boolean, default: true },
    sslEnabled: { type: Boolean, default: true }
  },
  payment: {
    paypalEnabled: { type: Boolean, default: false },
    stripeEnabled: { type: Boolean, default: false },
    cashOnDelivery: { type: Boolean, default: true },
    bankTransfer: { type: Boolean, default: true },
    taxRate: { type: Number, default: 0 },
    shippingFee: { type: Number, default: 0 },
    freeShippingThreshold: { type: Number, default: 0 }
  }
}, {
  timestamps: true
});

appSettingsSchema.set('toJSON', {
  transform: function(doc, ret) {
    ret.id = ret._id.toString();
    delete ret._id;
    delete ret.__v;
    return ret;
  }
});

export default mongoose.model('AppSettings', appSettingsSchema);
