import mongoose from 'mongoose';

const contentItemSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true, maxlength: 300 },
    type: {
      type: String,
      enum: ['article', 'image', 'video', 'audio', 'document'],
      required: true
    },
    category: { type: String, default: 'general', trim: true, maxlength: 100 },
    status: { type: String, enum: ['published', 'draft', 'archived'], default: 'draft' },
    views: { type: Number, default: 0 },
    size: { type: String, default: null },
    duration: { type: String, default: null },
    author: { type: String, default: 'System', trim: true, maxlength: 120 },
    metadata: { type: mongoose.Schema.Types.Mixed }
  },
  {
    timestamps: true
  }
);

contentItemSchema.set('toJSON', {
  transform: function (doc, ret) {
    ret.id = ret._id.toString();
    delete ret._id;
    delete ret.__v;
    return ret;
  }
});

export default mongoose.model('ContentItem', contentItemSchema);
