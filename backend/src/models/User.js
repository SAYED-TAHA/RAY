import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: function() {
      return !this.googleId; // Password not required if Google auth
    }
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  avatar: {
    type: String,
    default: ''
  },
  role: {
    type: String,
    enum: ['user', 'merchant', 'admin'],
    default: 'user'
  },
  googleId: {
    type: String,
    unique: true,
    sparse: true
  },
  isEmailVerified: {
    type: Boolean,
    default: false
  },
  lastLogin: {
    type: Date,
    default: Date.now
  },
  isActive: {
    type: Boolean,
    default: true
  },
  preferences: {
    language: {
      type: String,
      enum: ['ar', 'en'],
      default: 'ar'
    },
    theme: {
      type: String,
      enum: ['light', 'dark'],
      default: 'light'
    },
    notifications: {
      email: { type: Boolean, default: true },
      push: { type: Boolean, default: true },
      sms: { type: Boolean, default: false }
    }
  },
  businessInfo: {
    businessName: String,
    businessType: String,
    businessCategory: String,
    phone: String,
    address: String,
    website: String,
    description: String,
    logo: String,
    socialMedia: {
      facebook: String,
      twitter: String,
      instagram: String,
      linkedin: String
    }
  },
  subscription: {
    plan: {
      type: String,
      enum: ['free', 'basic', 'premium', 'enterprise'],
      default: 'free'
    },
    status: {
      type: String,
      enum: ['active', 'inactive', 'cancelled', 'expired'],
      default: 'active'
    },
    startDate: Date,
    endDate: Date,
    features: [String]
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes for performance
userSchema.index({ email: 1 });
userSchema.index({ googleId: 1 });
userSchema.index({ 'businessInfo.businessType': 1 });
userSchema.index({ role: 1 });

// Virtual fields
userSchema.virtual('fullName').get(function() {
  return this.name;
});

userSchema.virtual('isMerchant').get(function() {
  return this.role === 'merchant';
});

userSchema.virtual('isPremium').get(function() {
  return ['premium', 'enterprise'].includes(this.subscription.plan);
});

// Pre-save middleware for password hashing
userSchema.pre('save', async function(next) {
  if (!this.isModified('password') || !this.password) return next();
  
  try {
    const bcrypt = await import('bcryptjs');
    const salt = await bcrypt.default.genSalt(12);
    this.password = await bcrypt.default.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Methods
userSchema.methods.comparePassword = async function(candidatePassword) {
  if (!this.password) return false;
  try {
    const bcrypt = await import('bcryptjs');
    return await bcrypt.default.compare(candidatePassword, this.password);
  } catch (error) {
    return false;
  }
};

userSchema.methods.getPublicProfile = function() {
  return {
    id: this._id,
    email: this.email,
    name: this.name,
    avatar: this.avatar,
    role: this.role,
    isEmailVerified: this.isEmailVerified,
    preferences: this.preferences,
    businessInfo: this.businessInfo,
    subscription: this.subscription,
    createdAt: this.createdAt,
    lastLogin: this.lastLogin
  };
};

userSchema.methods.updateLastLogin = function() {
  this.lastLogin = new Date();
  return this.save({ validateBeforeSave: false });
};

// Static methods
userSchema.statics.findByEmail = function(email) {
  return this.findOne({ email: email.toLowerCase() });
};

userSchema.statics.findByGoogleId = function(googleId) {
  return this.findOne({ googleId });
};

userSchema.statics.createGoogleUser = function(profile) {
  return this.create({
    email: profile.email,
    name: profile.name,
    avatar: profile.picture,
    googleId: profile.id,
    isEmailVerified: true,
    role: 'user'
  });
};

const User = mongoose.model('User', userSchema);

export default User;
