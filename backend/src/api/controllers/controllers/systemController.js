import Order from '../../../models/Order.js';
import Product from '../../../models/Product.js';
import User from '../../../models/User.js';

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

    // Simulate server metrics (in production, use actual monitoring)
    const systemInfo = {
      server: {
        status: 'online',
        uptime: Math.floor(process.uptime() / 3600) + ' hours',
        cpu: Math.floor(Math.random() * 40) + 20,
        memory: Math.floor(Math.random() * 30) + 40,
        storage: 78
      },
      database: {
        status: 'connected',
        size: '2.4 GB',
        connections: Math.floor(Math.random() * 20) + 5,
        queries: orderCount + productCount + userCount
      },
      network: {
        status: 'connected',
        bandwidth: '1.2 Gbps',
        latency: Math.floor(Math.random() * 100) + 50 + 'ms'
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

    // In production, fetch from actual logging system
    const logs = [
      {
        id: '1',
        level: 'info',
        message: 'System started successfully',
        timestamp: new Date(Date.now() - 3600000).toISOString()
      },
      {
        id: '2',
        level: 'info',
        message: 'Database connection established',
        timestamp: new Date(Date.now() - 3000000).toISOString()
      },
      {
        id: '3',
        level: 'warning',
        message: 'High memory usage detected',
        timestamp: new Date(Date.now() - 1800000).toISOString()
      }
    ];

    const filtered = level === 'all' ? logs : logs.filter(log => log.level === level);

    res.status(200).json({
      logs: filtered.slice(0, limit),
      total: filtered.length
    });
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
      User.countDocuments({ status: 'active' })
    ]);

    const stats = {
      orders: totalOrders,
      revenue: totalRevenue[0]?.total || 0,
      users: totalUsers,
      activeUsers: activeUsers,
      systemUptime: '99.9%',
      apiRequests: Math.floor(Math.random() * 1000000) + 500000,
      errorRate: '0.1%',
      responseTime: Math.floor(Math.random() * 200) + 100 + 'ms'
    };

    res.status(200).json(stats);
  } catch (error) {
    console.error('Get system stats error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
