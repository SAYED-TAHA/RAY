import mongoose from 'mongoose';

const merchantSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  businessType: {
    type: String,
    enum: [
      'restaurant', 'retail', 'pharmacy', 'clinic', 'gym', 
      'salon', 'real-estate', 'cars', 'bookings', 'laundry',
      'car-wash', 'clothing', 'contracting', 'nursery',
      'consulting', 'law', 'resort', 'supplier', 'supermarket'
    ],
    required: true
  },
  businessInfo: {
    name: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    website: { type: String },
    logo: { type: String },
    coverImage: { type: String },
    address: {
      street: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      zipCode: { type: String, required: true },
      country: { type: String, required: true },
      coordinates: {
        lat: { type: Number },
        lng: { type: Number }
      }
    },
    socialMedia: {
      facebook: { type: String },
      twitter: { type: String },
      instagram: { type: String },
      linkedin: { type: String },
      youtube: { type: String }
    },
    workingHours: {
      monday: { open: String, close: String, closed: { type: Boolean, default: false } },
      tuesday: { open: String, close: String, closed: { type: Boolean, default: false } },
      wednesday: { open: String, close: String, closed: { type: Boolean, default: false } },
      thursday: { open: String, close: String, closed: { type: Boolean, default: false } },
      friday: { open: String, close: String, closed: { type: Boolean, default: false } },
      saturday: { open: String, close: String, closed: { type: Boolean, default: false } },
      sunday: { open: String, close: String, closed: { type: Boolean, default: false } }
    }
  },
  services: [{
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    duration: { type: Number }, // in minutes
    category: { type: String },
    image: { type: String },
    isActive: { type: Boolean, default: true }
  }],
  products: [{
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String },
    images: [String],
    inventory: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true }
  }],
  staff: [{
    name: { type: String, required: true },
    role: { type: String, required: true },
    email: { type: String },
    phone: { type: String },
    image: { type: String },
    bio: { type: String },
    isActive: { type: Boolean, default: true }
  }],
  gallery: [{
    url: { type: String, required: true },
    caption: { type: String },
    category: { type: String },
    isFeatured: { type: Boolean, default: false }
  }],
  settings: {
    acceptOnlineOrders: { type: Boolean, default: true },
    acceptAppointments: { type: Boolean, default: true },
    autoConfirmOrders: { type: Boolean, default: false },
    enableReviews: { type: Boolean, default: true },
    enableRatings: { type: Boolean, default: true },
    currency: { type: String, default: 'EGP' },
    taxRate: { type: Number, default: 0 },
    deliveryFee: { type: Number, default: 0 }
  },
  statistics: {
    totalOrders: { type: Number, default: 0 },
    totalRevenue: { type: Number, default: 0 },
    averageRating: { type: Number, default: 0 },
    totalReviews: { type: Number, default: 0 },
    activeCustomers: { type: Number, default: 0 }
  },
  verification: {
    isVerified: { type: Boolean, default: false },
    verificationDate: { type: Date },
    verificationDocuments: [String],
    businessLicense: { type: String },
    taxId: { type: String }
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'suspended', 'pending'],
    default: 'pending'
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes for performance
merchantSchema.index({ userId: 1 });
merchantSchema.index({ businessType: 1 });
merchantSchema.index({ 'businessInfo.address.city': 1 });
merchantSchema.index({ 'businessInfo.address.coordinates': '2dsphere' });
merchantSchema.index({ status: 1 });
merchantSchema.index({ 'verification.isVerified': 1 });

// Virtual fields
merchantSchema.virtual('rating').get(function() {
  return this.statistics.averageRating;
});

merchantSchema.virtual('isActive').get(function() {
  return this.status === 'active';
});

// Static methods
merchantSchema.statics.findByType = function(businessType) {
  return this.find({ businessType, status: 'active' });
};

merchantSchema.statics.findByCity = function(city) {
  return this.find({ 'businessInfo.address.city': city, status: 'active' });
};

merchantSchema.statics.findNearby = function(coordinates, maxDistance = 10000) {
  return this.find({
    'businessInfo.address.coordinates': {
      $near: {
        $geometry: {
          type: 'Point',
          coordinates: coordinates
        },
        $maxDistance: maxDistance
      }
    },
    status: 'active'
  });
};

const Merchant = mongoose.model('Merchant', merchantSchema);

export default Merchant;
