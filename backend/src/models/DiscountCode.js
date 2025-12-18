import mongoose from 'mongoose';

const discountCodeSchema = new mongoose.Schema({
  code: { type: String, required: true, trim: true, unique: true },
  type: { type: String, enum: ['percentage', 'fixed'], required: true },
  value: { type: Number, required: true },
  usageCount: { type: Number, default: 0 },
  maxUse: { type: Number, default: 0 },
  status: { type: String, enum: ['active', 'expired', 'disabled'], default: 'active' },
  expiryDate: { type: Date, default: null }
}, {
  timestamps: true
});

discountCodeSchema.set('toJSON', {
  transform: function (doc, ret) {
    ret.id = ret._id.toString();
    delete ret._id;
    delete ret.__v;
    return ret;
  }
});

export default mongoose.model('DiscountCode', discountCodeSchema);
