import mongoose from 'mongoose';

const offerSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  shop: { type: String, required: true, trim: true },
  image: { type: String, required: true },
  price: { type: String, required: true },
  oldPrice: { type: String },
  rating: { type: Number, default: 0 },
  tag: { type: String },
  category: { type: String },
  merchantId: { type: String },
  featured: { type: Boolean, default: false }
}, {
  timestamps: true
});

offerSchema.set('toJSON', {
  transform: function(doc, ret) {
    ret.id = ret._id.toString();
    delete ret._id;
    delete ret.__v;
    return ret;
  }
});

export default mongoose.model('Offer', offerSchema);
