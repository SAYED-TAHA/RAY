import mongoose from 'mongoose';

const conversationSchema = new mongoose.Schema({
  participants: [{
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    role: {
      type: String,
      enum: ['customer', 'merchant', 'admin'],
      required: true
    },
    joinedAt: {
      type: Date,
      default: Date.now
    },
    lastSeen: {
      type: Date,
      default: Date.now
    },
    isTyping: {
      type: Boolean,
      default: false
    }
  }],
  type: {
    type: String,
    enum: ['customer-service', 'merchant-customer', 'support', 'group'],
    default: 'customer-service'
  },
  subject: {
    type: String,
    trim: true,
    maxlength: 200
  },
  status: {
    type: String,
    enum: ['active', 'resolved', 'closed', 'archived'],
    default: 'active'
  },
  priority: {
    type: String,
    enum: ['low', 'normal', 'high', 'urgent'],
    default: 'normal'
  },
  tags: [String],
  metadata: {
    orderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Order' },
    merchantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Merchant' },
    issueType: { type: String },
    category: { type: String }
  },
  lastMessage: {
    content: { type: String },
    senderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    timestamp: { type: Date, default: Date.now },
    type: { type: String, enum: ['text', 'image', 'file', 'system'] }
  },
  unreadCount: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Indexes
conversationSchema.index({ 'participants.userId': 1 });
conversationSchema.index({ status: 1 });
conversationSchema.index({ type: 1 });
conversationSchema.index({ priority: 1 });
conversationSchema.index({ updatedAt: -1 });

// Virtual fields
conversationSchema.virtual('isActive').get(function() {
  return this.status === 'active';
});

const Conversation = mongoose.model('Conversation', conversationSchema);
export default Conversation;
