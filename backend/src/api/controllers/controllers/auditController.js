import AuditLog from '../../../models/AuditLog.js';
import AppSettings from '../../../models/AppSettings.js';

export const getAuditLogs = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = Math.min(parseInt(req.query.limit) || 50, 200);
    const skip = (page - 1) * limit;
    const type = req.query.type || 'all';

    const filter = {};
    if (type !== 'all') filter.type = type;

    const [logs, total] = await Promise.all([
      AuditLog.find(filter).skip(skip).limit(limit).sort({ timestamp: -1 }),
      AuditLog.countDocuments(filter)
    ]);

    res.status(200).json({
      logs,
      pagination: { current: page, pages: Math.ceil(total / limit), total, limit }
    });
  } catch (error) {
    console.error('Get audit logs error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getSecurityEvents = async (req, res) => {
  try {
    const limit = Math.min(parseInt(req.query.limit) || 50, 200);

    const logs = await AuditLog.find({
      type: { $in: ['login', 'logout', 'failed_login', 'password_change', 'permission_change'] }
    })
      .sort({ timestamp: -1 })
      .limit(limit);

    const events = logs.map((l) => ({
      id: l._id.toString(),
      type: l.type,
      user: l.user || 'مجهول',
      ip: l.ip || '',
      status: l.status || 'success',
      timestamp: (l.timestamp || l.createdAt || new Date()).toISOString()
    }));

    res.status(200).json({ events });
  } catch (error) {
    console.error('Get security events error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getSecuritySettings = async (req, res) => {
  try {
    const doc = await AppSettings.findOne({});
    const settings = doc?.security || {
      twoFactorAuth: false,
      sessionTimeout: 30,
      passwordPolicy: 'strong',
      passwordMinLength: 8,
      requireStrongPassword: true,
      loginAttempts: 5,
      ipWhitelist: false,
      auditLog: true,
      autoBackup: true,
      encryptionEnabled: true,
      sslEnabled: true
    };

    res.status(200).json(settings);
  } catch (error) {
    console.error('Get security settings error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const updateSecuritySettings = async (req, res) => {
  try {
    const settings = await AppSettings.findOneAndUpdate(
      {},
      { $set: { security: req.body } },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );
    res.status(200).json({ message: 'Settings updated successfully', settings: settings.security });
  } catch (error) {
    console.error('Update security settings error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
