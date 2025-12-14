import AuditLog from '../../../models/AuditLog.js';

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

    // Mock security events (in production, fetch from actual audit log)
    const events = [
      {
        id: '1',
        type: 'login',
        user: 'أحمد محمد',
        ip: '192.168.1.1',
        status: 'success',
        timestamp: new Date(Date.now() - 3600000).toISOString()
      },
      {
        id: '2',
        type: 'failed_login',
        user: 'مجهول',
        ip: '192.168.1.100',
        status: 'failed',
        timestamp: new Date(Date.now() - 1800000).toISOString()
      },
      {
        id: '3',
        type: 'password_change',
        user: 'سارة أحمد',
        ip: '192.168.1.2',
        status: 'success',
        timestamp: new Date(Date.now() - 900000).toISOString()
      }
    ];

    res.status(200).json({ events: events.slice(0, limit) });
  } catch (error) {
    console.error('Get security events error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getSecuritySettings = async (req, res) => {
  try {
    const settings = {
      twoFactorAuth: true,
      sessionTimeout: 30,
      passwordPolicy: 'strong',
      loginAttempts: 5,
      ipWhitelist: false,
      auditLog: true,
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
    // In production, save to database
    const settings = req.body;
    res.status(200).json({ message: 'Settings updated successfully', settings });
  } catch (error) {
    console.error('Update security settings error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
