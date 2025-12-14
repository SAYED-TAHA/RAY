import mongoose from 'mongoose';

const auditLogSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['login', 'logout', 'create', 'update', 'delete', 'failed_login', 'password_change', 'permission_change'],
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  user: String,
  action: String,
  resource: String,
  resourceId: mongoose.Schema.Types.ObjectId,
  changes: mongoose.Schema.Types.Mixed,
  ip: String,
  userAgent: String,
  status: {
    type: String,
    enum: ['success', 'failed'],
    default: 'success'
  },
  details: String,
  timestamp: {
    type: Date,
    default: Date.now,
    index: true
  }
}, { timestamps: true });

// Index for efficient querying
auditLogSchema.index({ userId: 1, timestamp: -1 });
auditLogSchema.index({ type: 1, timestamp: -1 });
auditLogSchema.index({ timestamp: -1 });

export default mongoose.model('AuditLog', auditLogSchema);
