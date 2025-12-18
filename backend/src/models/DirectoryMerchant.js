import mongoose from 'mongoose';

const directoryMerchantSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  name: { type: String, required: true, trim: true },
  category: { type: String, required: true, trim: true },
  type: { type: String, required: true, trim: true },
  rating: { type: Number, default: 0 },
  reviews: { type: Number, default: 0 },
  location: { type: String, default: '' },
  image: { type: String, default: '' },
  cover: { type: String, default: '' },
  phone: { type: String, default: '' },
  whatsapp: { type: String, default: '' },
  email: { type: String, default: '' },
  status: { type: String, default: 'open' },
  time: { type: String },
  delivery: { type: Number },
  gallery: { type: [String], default: [] },
  staff: { type: [mongoose.Schema.Types.Mixed], default: [] },
  services: { type: [mongoose.Schema.Types.Mixed], default: [] },
  menuItems: { type: [mongoose.Schema.Types.Mixed], default: [] },
  inventory: { type: [mongoose.Schema.Types.Mixed], default: [] },
  offers: { type: [mongoose.Schema.Types.Mixed], default: [] },
  discounts: { type: [mongoose.Schema.Types.Mixed], default: [] },
  tables: { type: [mongoose.Schema.Types.Mixed], default: [] }
}, {
  timestamps: true
});

directoryMerchantSchema.set('toJSON', {
  transform: function(doc, ret) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
    return ret;
  }
});

export default mongoose.model('DirectoryMerchant', directoryMerchantSchema);
