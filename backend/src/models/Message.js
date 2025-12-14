import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
  conversationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Conversation',
    required: true
  },
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  recipientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  content: {
    type: String,
    required: true,
    trim: true,
    maxlength: 1000
  },
  type: {
    type: String,
    enum: ['text', 'image', 'file', 'location', 'system'],
    default: 'text'
  },
  attachments: [{
    type: { type: String, enum: ['image', 'file', 'video', 'audio'] },
    url: { type: String, required: true },
    name: { type: String },
    size: { type: Number }
  }],
  status: {
    type: String,
    enum: ['sent', 'delivered', 'read'],
    default: 'sent'
  },
  readAt: { type: Date },
  metadata: {
    edited: { type: Boolean, default: false },
    editedAt: { type: Date },
    deleted: { type: Boolean, default: false },
    deletedAt: { type: Date },
    ipAddress: { type: String },
    device: { type: String }
  }
}, {
  timestamps: true
});

// Indexes
messageSchema.index({ conversationId: 1, createdAt: 1 });
messageSchema.index({ senderId: 1 });
messageSchema.index({ recipientId: 1 });
messageSchema.index({ status: 1 });

const Message = mongoose.model('Message', messageSchema);
export default Message;
