import Order from '../../../models/Order.js';
import Product from '../../../models/Product.js';
import User from '../../../models/User.js';
import os from 'os';
import AuditLog from '../../../models/AuditLog.js';

export const getSystemHealth = async (req, res) => {
  try {
    const now = new Date();
    const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    // Get system metrics
    const [orderCount, productCount, userCount, todayOrders] = await Promise.all([
      Order.countDocuments(),
      Product.countDocuments(),
      User.countDocuments(),
      Order.countDocuments({ createdAt: { $gte: startOfDay } })
    ]);

    const totalMem = os.totalmem();
    const freeMem = os.freemem();
    const usedMem = totalMem - freeMem;
    const memoryPercent = totalMem > 0 ? Math.round((usedMem / totalMem) * 100) : 0;

    const load = os.loadavg?.()[0] ?? 0;
    const cores = os.cpus()?.length || 1;
    const cpuApprox = Math.min(100, Math.max(0, Math.round((load / cores) * 100)));

    const systemInfo = {
      server: {
        status: 'online',
        uptime: Math.floor(process.uptime() / 3600) + ' hours',
        cpu: cpuApprox,
        memory: memoryPercent,
        storage: 0
      },
      database: {
        status: 'connected',
        size: 'N/A',
        connections: 0,
        queries: orderCount + productCount + userCount
      },
      network: {
        status: 'connected',
        bandwidth: 'N/A',
        latency: 'N/A'
      },
      application: {
        orders: orderCount,
        products: productCount,
        users: userCount,
        todayOrders: todayOrders
      }
    };

    res.status(200).json(systemInfo);
  } catch (error) {
    console.error('Get system health error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getSystemLogs = async (req, res) => {
  try {
    const limit = Math.min(parseInt(req.query.limit) || 50, 200);
    const level = req.query.level || 'all';

    const auditLogs = await AuditLog.find({}).sort({ timestamp: -1 }).limit(limit);
    const mapped = auditLogs.map((l) => ({
      id: l._id.toString(),
      level: l.status === 'failed' ? 'error' : 'info',
      message: l.details || l.action || l.type,
      timestamp: (l.timestamp || l.createdAt || new Date()).toISOString()
    }));

    const filtered = level === 'all' ? mapped : mapped.filter(log => log.level === level);

    res.status(200).json({ logs: filtered, total: filtered.length });
  } catch (error) {
    console.error('Get system logs error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getSystemStats = async (req, res) => {
  try {
    const now = new Date();
    const lastMonth = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

    const [totalOrders, totalRevenue, totalUsers, activeUsers] = await Promise.all([
      Order.countDocuments(),
      Order.aggregate([{ $group: { _id: null, total: { $sum: '$pricing.total' } } }]),
      User.countDocuments(),
      User.countDocuments({ isActive: true })
    ]);

    const [apiRequests, failedRequests] = await Promise.all([
      AuditLog.countDocuments({ timestamp: { $gte: lastMonth } }),
      AuditLog.countDocuments({ timestamp: { $gte: lastMonth }, status: 'failed' })
    ]);

    const errorRate = apiRequests > 0 ? ((failedRequests / apiRequests) * 100).toFixed(2) + '%' : '0%';

    const stats = {
      orders: totalOrders,
      revenue: totalRevenue[0]?.total || 0,
      users: totalUsers,
      activeUsers: activeUsers,
      systemUptime: '99.9%',
      apiRequests,
      errorRate,
      responseTime: 'N/A'
    };

    res.status(200).json(stats);
  } catch (error) {
    console.error('Get system stats error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
