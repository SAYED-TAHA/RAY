import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({
  paymentId: {
    type: String,
    required: true,
    unique: true
  },
  orderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order',
    required: true
  },
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  merchantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Merchant',
    required: true
  },
  type: {
    type: String,
    enum: ['order', 'subscription', 'deposit', 'refund', 'penalty'],
    required: true
  },
  method: {
    type: String,
    enum: [
      'cash', 'card', 'wallet', 'bank-transfer', 'online-payment',
      'fawry', 'paypal', 'stripe', 'apple-pay', 'google-pay'
    ],
    required: true
  },
  amount: {
    gross: { type: Number, required: true },
    net: { type: Number, required: true },
    fee: { type: Number, default: 0 },
    tax: { type: Number, default: 0 },
    discount: { type: Number, default: 0 },
    currency: { type: String, default: 'EGP' }
  },
  status: {
    type: String,
    enum: ['pending', 'processing', 'completed', 'failed', 'cancelled', 'refunded'],
    default: 'pending'
  },
  gateway: {
    provider: { type: String }, // stripe, paypal, fawry, etc.
    transactionId: { type: String },
    authorizationCode: { type: String },
    captureId: { type: String },
    refundId: { type: String },
    metadata: mongoose.Schema.Types.Mixed
  },
  card: {
    last4: { type: String },
    brand: { type: String },
    expMonth: { type: Number },
    expYear: { type: Number },
    fingerprint: { type: String },
    country: { type: String }
  },
  bank: {
    accountNumber: { type: String },
    bankName: { type: String },
    routingNumber: { type: String },
    swiftCode: { type: String }
  },
  schedule: {
    isRecurring: { type: Boolean, default: false },
    frequency: { type: String, enum: ['daily', 'weekly', 'monthly', 'yearly'] },
    interval: { type: Number },
    startDate: { type: Date },
    endDate: { type: Date },
    nextPayment: { type: Date },
    remainingPayments: { type: Number }
  },
  refund: {
    amount: { type: Number },
    reason: { type: String },
    status: { type: String, enum: ['pending', 'approved', 'rejected', 'processed'] },
    processedAt: { type: Date },
    refundId: { type: String }
  },
  timeline: [{
    status: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
    amount: { type: Number },
    note: { type: String },
    gateway: { type: String }
  }],
  metadata: {
    source: { type: String, enum: ['web', 'mobile', 'api', 'admin'], default: 'web' },
    ipAddress: { type: String },
    userAgent: { type: String },
    promoCode: { type: String },
    referralCode: { type: String }
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes for performance
paymentSchema.index({ paymentId: 1 });
paymentSchema.index({ orderId: 1 });
paymentSchema.index({ customerId: 1 });
paymentSchema.index({ merchantId: 1 });
paymentSchema.index({ status: 1 });
paymentSchema.index({ type: 1 });
paymentSchema.index({ method: 1 });
paymentSchema.index({ createdAt: -1 });
paymentSchema.index({ 'schedule.nextPayment': 1 });

// Virtual fields
paymentSchema.virtual('isCompleted').get(function() {
  return this.status === 'completed';
});

paymentSchema.virtual('isFailed').get(function() {
  return this.status === 'failed';
});

paymentSchema.virtual('isRefunded').get(function() {
  return this.status === 'refunded' || this.refund.status === 'processed';
});

// Pre-save middleware for payment ID generation
paymentSchema.pre('save', async function(next) {
  if (!this.paymentId) {
    const count = await this.constructor.countDocuments();
    this.paymentId = `PAY${Date.now()}${String(count + 1).padStart(4, '0')}`;
  }
  next();
});

// Static methods
paymentSchema.statics.findByOrder = function(orderId) {
  return this.find({ orderId }).sort({ createdAt: -1 });
};

paymentSchema.statics.findByCustomer = function(customerId) {
  return this.find({ customerId }).sort({ createdAt: -1 });
};

paymentSchema.statics.findByMerchant = function(merchantId) {
  return this.find({ merchantId }).sort({ createdAt: -1 });
};

paymentSchema.statics.findPending = function() {
  return this.find({ status: 'pending' }).sort({ createdAt: 1 });
};

paymentSchema.statics.findRecurring = function() {
  return this.find({ 
    'schedule.isRecurring': true,
    'schedule.nextPayment': { $lte: new Date() }
  });
};

paymentSchema.statics.getRevenueStats = function(merchantId, startDate, endDate) {
  return this.aggregate([
    {
      $match: {
        merchantId,
        status: 'completed',
        createdAt: { $gte: startDate, $lte: endDate }
      }
    },
    {
      $group: {
        _id: null,
        totalRevenue: { $sum: '$amount.net' },
        totalGross: { $sum: '$amount.gross' },
        totalFees: { $sum: '$amount.fee' },
        transactionCount: { $sum: 1 },
        avgTransaction: { $avg: '$amount.net' }
      }
    }
  ]);
};

const Payment = mongoose.model('Payment', paymentSchema);

export default Payment;
