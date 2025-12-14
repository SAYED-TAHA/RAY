import mongoose from 'mongoose';

const storefrontConfigSchema = new mongoose.Schema(
  {
    merchantId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    // الألوان الأساسية
    primaryColor: {
      type: String,
      default: '#FF6B6B',
    },
    secondaryColor: {
      type: String,
      default: '#4ECDC4',
    },
    accentColor: {
      type: String,
      default: '#FFE66D',
    },
    backgroundColor: {
      type: String,
      default: '#FFFFFF',
    },
    textColor: {
      type: String,
      default: '#333333',
    },
    // ألوان Header و Footer
    headerColor: {
      type: String,
      default: '#FFFFFF',
    },
    headerTextColor: {
      type: String,
      default: '#333333',
    },
    footerColor: {
      type: String,
      default: '#1F2937',
    },
    footerTextColor: {
      type: String,
      default: '#FFFFFF',
    },
    // البنر
    bannerType: {
      type: String,
      enum: ['image', 'video'],
      default: 'image',
    },
    bannerImage: {
      type: String,
      default: 'https://via.placeholder.com/1200x400',
    },
    bannerVideo: {
      type: String,
      default: '',
    },
    bannerHeight: {
      type: Number,
      default: 400,
      min: 200,
      max: 600,
    },
    // الأزرار - Header
    showHeaderPhone: { type: Boolean, default: true },
    showHeaderWhatsapp: { type: Boolean, default: true },
    showHeaderEmail: { type: Boolean, default: false },
    showHeaderSearch: { type: Boolean, default: true },
    showHeaderCart: { type: Boolean, default: true },
    // الأزرار - Footer
    showFooterPhone: { type: Boolean, default: true },
    showFooterWhatsapp: { type: Boolean, default: true },
    showFooterEmail: { type: Boolean, default: true },
    showFooterAddress: { type: Boolean, default: true },
    showFooterSocial: { type: Boolean, default: true },
    // الأزرار - Contact
    showContactPhone: { type: Boolean, default: true },
    showContactWhatsapp: { type: Boolean, default: true },
    showContactEmail: { type: Boolean, default: true },
    // العناصر الأخرى
    showHero: { type: Boolean, default: true },
    showGallery: { type: Boolean, default: true },
    showMenu: { type: Boolean, default: true },
    showProducts: { type: Boolean, default: true },
    showReviews: { type: Boolean, default: true },
    showBookings: { type: Boolean, default: true },
    showMap: { type: Boolean, default: true },
    // معلومات إضافية
    storeName: {
      type: String,
      default: 'متجري',
    },
    storeDescription: {
      type: String,
      default: 'متجر إلكتروني احترافي يقدم أفضل الخدمات والمنتجات',
    },
    storePhone: {
      type: String,
      default: '+20 123 456 7890',
    },
    storeEmail: {
      type: String,
      default: 'info@store.com',
    },
    storeAddress: {
      type: String,
      default: 'القاهرة، مصر',
    },
    // الصور
    logoUrl: {
      type: String,
      default: '',
    },
    galleryImages: [{
      type: String,
    }],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('StorefrontConfig', storefrontConfigSchema);
