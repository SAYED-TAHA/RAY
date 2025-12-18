import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  company: { type: String, required: true, trim: true },
  location: { type: String, required: true, trim: true },
  type: {
    type: String,
    enum: ['full-time', 'part-time', 'contract', 'internship'],
    required: true
  },
  category: { type: String, required: true, trim: true },
  salary: { type: String, required: true, trim: true },
  posted: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  requirements: { type: [String], default: [] },
  benefits: { type: [String], default: [] },
  responsibilities: { type: [String], default: [] },
  logo: { type: String, default: '' },
  rating: { type: Number, default: 0 },
  reviews: { type: Number, default: 0 },
  urgent: { type: Boolean, default: false },
  featured: { type: Boolean, default: false },
  contactInfo: {
    phone: { type: String, default: '' },
    email: { type: String, default: '' },
    website: { type: String }
  },
  companyInfo: {
    size: { type: String, default: '' },
    founded: { type: String, default: '' },
    industry: { type: String, default: '' }
  }
}, {
  timestamps: true
});

jobSchema.set('toJSON', {
  transform: function(doc, ret) {
    ret.id = ret._id.toString();
    delete ret._id;
    delete ret.__v;
    return ret;
  }
});

export default mongoose.model('Job', jobSchema);
