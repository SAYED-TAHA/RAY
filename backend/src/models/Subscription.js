import mongoose from 'mongoose';

const subscriptionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  merchantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Merchant'
  },
  plan: {
    type: String,
    enum: ['free', 'basic', 'premium', 'enterprise'],
    required: true
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'cancelled', 'expired', 'suspended'],
    default: 'active'
  },
  billing: {
    cycle: {
      type: String,
      enum: ['monthly', 'yearly', 'lifetime'],
      required: true
    },
    amount: { type: Number, required: true },
    currency: { type: String, default: 'EGP' },
    nextBillingDate: { type: Date },
    lastBillingDate: { type: Date },
    paymentMethod: {
      type: String,
      enum: ['card', 'bank-transfer', 'wallet', 'online-payment']
    }
  },
  features: [{
    name: { type: String, required: true },
    enabled: { type: Boolean, default: true },
    limits: {
      monthly: { type: Number },
      daily: { type: Number },
      total: { type: Number }
    }
  }],
  usage: {
    current: {
      orders: { type: Number, default: 0 },
      products: { type: Number, default: 0 },
      storage: { type: Number, default: 0 },
      bandwidth: { type: Number, default: 0 }
    },
    limits: {
      orders: { type: Number },
      products: { type: Number },
      storage: { type: Number },
      bandwidth: { type: Number }
    }
  },
  trial: {
    isActive: { type: Boolean, default: false },
    startDate: { type: Date },
    endDate: { type: Date },
    convertedToPaid: { type: Boolean, default: false }
  },
  discounts: [{
    code: { type: String },
    percentage: { type: Number },
    amount: { type: Number },
    validFrom: { type: Date },
    validUntil: { type: Date },
    isApplied: { type: Boolean, default: false }
  }],
  metadata: {
    source: { type: String, enum: ['web', 'mobile', 'api', 'admin'], default: 'web' },
    promoCode: { type: String },
    referralCode: { type: String },
    campaign: { type: String }
  }
}, {
  timestamps: true
});

// Indexes
subscriptionSchema.index({ userId: 1 });
subscriptionSchema.index({ merchantId: 1 });
subscriptionSchema.index({ plan: 1 });
subscriptionSchema.index({ status: 1 });
subscriptionSchema.index({ 'billing.nextBillingDate': 1 });

// Virtual fields
subscriptionSchema.virtual('isExpired').get(function() {
  return this.status === 'expired';
});

subscriptionSchema.virtual('needsBilling').get(function() {
  return this.status === 'active' && 
         this.billing.nextBillingDate && 
         this.billing.nextBillingDate <= new Date();
});

// Static methods
subscriptionSchema.statics.findByUser = function(userId) {
  return this.findOne({ userId, status: { $in: ['active', 'inactive'] } });
};

subscriptionSchema.statics.findExpiring = function(days = 7) {
  const expiryDate = new Date();
  expiryDate.setDate(expiryDate.getDate() + days);
  
  return this.find({
    status: 'active',
    'billing.nextBillingDate': { $lte: expiryDate }
  });
};

subscriptionSchema.statics.findTrialEnding = function(days = 3) {
  const endDate = new Date();
  endDate.setDate(endDate.getDate() + days);
  
  return this.find({
    'trial.isActive': true,
    'trial.endDate': { $lte: endDate },
    'trial.convertedToPaid': false
  });
};

const Subscription = mongoose.model('Subscription', subscriptionSchema);
export default Subscription;
