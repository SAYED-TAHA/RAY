import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
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
  orderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order'
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
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
    maxlength: 1000
  },
  images: [String],
  categories: {
    quality: { type: Number, min: 1, max: 5 },
    service: { type: Number, min: 1, max: 5 },
    value: { type: Number, min: 1, max: 5 },
    cleanliness: { type: Number, min: 1, max: 5 },
    punctuality: { type: Number, min: 1, max: 5 },
    communication: { type: Number, min: 1, max: 5 }
  },
  helpful: {
    count: { type: Number, default: 0 },
    users: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }]
  },
  response: {
    content: { type: String },
    respondedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    respondedAt: { type: Date }
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected', 'hidden'],
    default: 'approved'
  },
  verified: {
    type: Boolean,
    default: false
  },
  metadata: {
    source: { type: String, enum: ['web', 'mobile', 'email'], default: 'web' },
    ipAddress: { type: String },
    userAgent: { type: String }
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes for performance
reviewSchema.index({ customerId: 1 });
reviewSchema.index({ merchantId: 1 });
reviewSchema.index({ orderId: 1 });
reviewSchema.index({ rating: 1 });
reviewSchema.index({ status: 1 });
reviewSchema.index({ createdAt: -1 });
reviewSchema.index({ verified: 1 });

// Virtual fields
reviewSchema.virtual('isVerified').get(function() {
  return this.verified && this.orderId;
});

reviewSchema.virtual('hasResponse').get(function() {
  return !!this.response.content;
});

// Static methods
reviewSchema.statics.findByMerchant = function(merchantId) {
  return this.find({ merchantId, status: 'approved' }).sort({ createdAt: -1 });
};

reviewSchema.statics.findByCustomer = function(customerId) {
  return this.find({ customerId }).sort({ createdAt: -1 });
};

reviewSchema.statics.getAverageRating = function(merchantId) {
  return this.aggregate([
    { $match: { merchantId, status: 'approved' } },
    { $group: { _id: '$merchantId', avgRating: { $avg: '$rating' }, totalReviews: { $sum: 1 } } }
  ]);
};

reviewSchema.statics.getRatingDistribution = function(merchantId) {
  return this.aggregate([
    { $match: { merchantId, status: 'approved' } },
    { $group: { _id: '$rating', count: { $sum: 1 } } },
    { $sort: { _id: 1 } }
  ]);
};

const Review = mongoose.model('Review', reviewSchema);

export default Review;
