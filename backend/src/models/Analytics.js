import mongoose from 'mongoose';

const analyticsSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['user', 'merchant', 'order', 'revenue', 'traffic', 'engagement'],
    required: true
  },
  entityId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  period: {
    type: String,
    enum: ['hourly', 'daily', 'weekly', 'monthly', 'yearly'],
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  metrics: {
    count: { type: Number, default: 0 },
    total: { type: Number, default: 0 },
    average: { type: Number, default: 0 },
    min: { type: Number, default: 0 },
    max: { type: Number, default: 0 }
  },
  breakdown: {
    byCategory: mongoose.Schema.Types.Mixed,
    byStatus: mongoose.Schema.Types.Mixed,
    bySource: mongoose.Schema.Types.Mixed,
    byDevice: mongoose.Schema.Types.Mixed,
    byLocation: mongoose.Schema.Types.Mixed
  },
  growth: {
    previousPeriod: { type: Number, default: 0 },
    growthRate: { type: Number, default: 0 },
    trend: { type: String, enum: ['up', 'down', 'stable'] }
  }
}, {
  timestamps: true
});

// Indexes
analyticsSchema.index({ type: 1, entityId: 1, period: 1, date: -1 });
analyticsSchema.index({ date: -1 });
analyticsSchema.index({ type: 1, period: 1 });

const Analytics = mongoose.model('Analytics', analyticsSchema);
export default Analytics;
