import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema({
  recipientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  type: {
    type: String,
    enum: [
      'order', 'booking', 'payment', 'review', 'message',
      'system', 'promotion', 'reminder', 'alert', 'update'
    ],
    required: true
  },
  category: {
    type: String,
    enum: ['info', 'success', 'warning', 'error', 'promotion'],
    required: true
  },
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  content: {
    type: String,
    required: true,
    trim: true,
    maxlength: 500
  },
  data: {
    orderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Order' },
    merchantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Merchant' },
    reviewId: { type: mongoose.Schema.Types.ObjectId, ref: 'Review' },
    bookingId: { type: mongoose.Schema.Types.ObjectId, ref: 'Booking' },
    link: { type: String },
    actionUrl: { type: String },
    actionText: { type: String },
    metadata: mongoose.Schema.Types.Mixed
  },
  channels: {
    inApp: { type: Boolean, default: true },
    email: { type: Boolean, default: false },
    sms: { type: Boolean, default: false },
    push: { type: Boolean, default: false }
  },
  status: {
    type: String,
    enum: ['pending', 'sent', 'delivered', 'read', 'failed'],
    default: 'pending'
  },
  priority: {
    type: String,
    enum: ['low', 'normal', 'high', 'urgent'],
    default: 'normal'
  },
  scheduledAt: { type: Date },
  sentAt: { type: Date },
  readAt: { type: Date },
  expiresAt: { type: Date },
  retryCount: { type: Number, default: 0 },
  maxRetries: { type: Number, default: 3 }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes for performance
notificationSchema.index({ recipientId: 1 });
notificationSchema.index({ senderId: 1 });
notificationSchema.index({ type: 1 });
notificationSchema.index({ category: 1 });
notificationSchema.index({ status: 1 });
notificationSchema.index({ createdAt: -1 });
notificationSchema.index({ scheduledAt: 1 });
notificationSchema.index({ expiresAt: 1 });

// Virtual fields
notificationSchema.virtual('isRead').get(function() {
  return this.status === 'read';
});

notificationSchema.virtual('isExpired').get(function() {
  return this.expiresAt && this.expiresAt < new Date();
});

// Static methods
notificationSchema.statics.findByRecipient = function(recipientId, limit = 50) {
  return this.find({ recipientId })
    .sort({ createdAt: -1 })
    .limit(limit);
};

notificationSchema.statics.findUnread = function(recipientId) {
  return this.find({ 
    recipientId, 
    status: { $in: ['pending', 'sent', 'delivered'] }
  }).sort({ createdAt: -1 });
};

notificationSchema.statics.markAsRead = function(notificationId, recipientId) {
  return this.updateOne(
    { _id: notificationId, recipientId },
    { status: 'read', readAt: new Date() }
  );
};

notificationSchema.statics.markAllAsRead = function(recipientId) {
  return this.updateMany(
    { recipientId, status: { $in: ['pending', 'sent', 'delivered'] } },
    { status: 'read', readAt: new Date() }
  );
};

notificationSchema.statics.findScheduled = function() {
  return this.find({
    status: 'pending',
    scheduledAt: { $lte: new Date() }
  });
};

const Notification = mongoose.model('Notification', notificationSchema);

export default Notification;
