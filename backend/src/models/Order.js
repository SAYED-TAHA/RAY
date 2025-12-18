import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  orderNumber: {
    type: String,
    required: true,
    unique: true
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
    enum: ['product', 'service', 'booking', 'delivery', 'pickup'],
    required: true
  },
  status: {
    type: String,
    enum: [
      'pending', 'confirmed', 'preparing', 'ready', 
      'on-the-way', 'delivered', 'completed', 'cancelled', 'refunded'
    ],
    default: 'pending'
  },
  items: [{
    type: {
      type: String,
      enum: ['product', 'service'],
      required: true
    },
    itemId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    },
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true, default: 1 },
    variations: {
      size: { type: String },
      color: { type: String },
      customOptions: [String]
    },
    subtotal: { type: Number, required: true }
  }],
  pricing: {
    subtotal: { type: Number, required: true },
    tax: { type: Number, default: 0 },
    deliveryFee: { type: Number, default: 0 },
    serviceFee: { type: Number, default: 0 },
    discount: { type: Number, default: 0 },
    total: { type: Number, required: true }
  },
  payment: {
    method: {
      type: String,
      enum: ['cash', 'card', 'wallet', 'bank-transfer', 'online-payment'],
      required: true
    },
    status: {
      type: String,
      enum: ['pending', 'paid', 'failed', 'refunded'],
      default: 'pending'
    },
    transactionId: { type: String },
    paidAt: { type: Date },
    refundAmount: { type: Number },
    refundReason: { type: String }
  },
  delivery: {
    type: {
      type: String,
      enum: ['pickup', 'delivery', 'on-site'],
      required: true
    },
    address: {
      street: { type: String },
      city: { type: String },
      state: { type: String },
      zipCode: { type: String },
      coordinates: {
        lat: { type: Number },
        lng: { type: Number }
      }
    },
    scheduledTime: { type: Date },
    estimatedTime: { type: Date },
    actualTime: { type: Date },
    trackingNumber: { type: String },
    deliveryNotes: { type: String }
  },
  booking: {
    date: { type: Date, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    duration: { type: Number }, // in minutes
    staffId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Staff'
    },
    notes: { type: String },
    reminders: [{
      type: { type: String, enum: ['email', 'sms', 'push'] },
      time: { type: Number }, // minutes before appointment
      sent: { type: Boolean, default: false }
    }]
  },
  timeline: [{
    status: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
    note: { type: String },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  }],
  notes: {
    customerNotes: { type: String },
    merchantNotes: { type: String },
    internalNotes: { type: String }
  },
  ratings: {
    customerRating: { type: Number, min: 1, max: 5 },
    merchantRating: { type: Number, min: 1, max: 5 },
    review: { type: String },
    reviewedAt: { type: Date }
  },
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
orderSchema.index({ customerId: 1 });
orderSchema.index({ merchantId: 1 });
orderSchema.index({ status: 1 });
orderSchema.index({ type: 1 });
orderSchema.index({ createdAt: -1 });
orderSchema.index({ 'payment.status': 1 });
orderSchema.index({ 'delivery.scheduledTime': 1 });
orderSchema.index({ 'booking.date': 1 });

// Virtual fields
orderSchema.virtual('isPaid').get(function() {
  return this.payment.status === 'paid';
});

orderSchema.virtual('isCompleted').get(function() {
  return ['completed', 'delivered'].includes(this.status);
});

orderSchema.virtual('isCancelled').get(function() {
  return this.status === 'cancelled';
});

// Pre-save middleware for order number generation
orderSchema.pre('save', async function(next) {
  if (!this.orderNumber) {
    const count = await this.constructor.countDocuments();
    this.orderNumber = `ORD${Date.now()}${String(count + 1).padStart(4, '0')}`;
  }
  next();
});

// Static methods
orderSchema.statics.findByCustomer = function(customerId) {
  return this.find({ customerId }).sort({ createdAt: -1 });
};

orderSchema.statics.findByMerchant = function(merchantId) {
  return this.find({ merchantId }).sort({ createdAt: -1 });
};

orderSchema.statics.findPending = function() {
  return this.find({ status: 'pending' }).sort({ createdAt: 1 });
};

orderSchema.statics.findTodayBookings = function() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  
  return this.find({
    type: 'booking',
    'booking.date': { $gte: today, $lt: tomorrow }
  }).sort({ 'booking.startTime': 1 });
};

const Order = mongoose.model('Order', orderSchema);

export default Order;
