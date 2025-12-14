import Order from '../../../models/Order.js';
import Product from '../../../models/Product.js';

// Get comprehensive analytics data
export const getAnalytics = async (req, res) => {
  try {
    const { period = 'month', startDate, endDate } = req.query;
    
    // Calculate date range
    const now = new Date();
    let dateFilter = {};
    
    if (startDate && endDate) {
      dateFilter = {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      };
    } else {
      const periodMap = {
        'day': new Date(now.getTime() - 24 * 60 * 60 * 1000),
        'week': new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000),
        'month': new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000),
        'year': new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000)
      };
      dateFilter = { $gte: periodMap[period] || periodMap['month'] };
    }

    // Get order statistics
    const orderStats = await Order.aggregate([
      { $match: { createdAt: dateFilter } },
      {
        $group: {
          _id: null,
          totalOrders: { $sum: 1 },
          totalRevenue: { $sum: '$pricing.total' },
          avgOrderValue: { $avg: '$pricing.total' },
          ordersByStatus: {
            $push: {
              status: '$status',
              paymentStatus: '$payment.status'
            }
          }
        }
      }
    ]);

    // Get product statistics
    const productStats = await Product.aggregate([
      { $match: { createdAt: dateFilter } },
      {
        $group: {
          _id: null,
          totalProducts: { $sum: 1 },
          avgPrice: { $avg: '$price' },
          totalStock: { $sum: '$stock' }
        }
      }
    ]);

    // Get daily revenue trend
    const revenueTrend = await Order.aggregate([
      { $match: { createdAt: dateFilter, 'payment.status': 'paid' } },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
          revenue: { $sum: '$pricing.total' },
          orders: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    // Get top products by sales
    const topProducts = await Order.aggregate([
      { $match: { createdAt: dateFilter } },
      { $unwind: '$items' },
      {
        $group: {
          _id: '$items.itemId',
          name: { $first: '$items.name' },
          totalSold: { $sum: '$items.quantity' },
          revenue: { $sum: '$items.subtotal' }
        }
      },
      { $sort: { totalSold: -1 } },
      { $limit: 10 }
    ]);

    // Get payment method distribution
    const paymentDistribution = await Order.aggregate([
      { $match: { createdAt: dateFilter } },
      {
        $group: {
          _id: '$payment.method',
          count: { $sum: 1 },
          total: { $sum: '$pricing.total' }
        }
      }
    ]);

    // Get order status distribution
    const statusDistribution = await Order.aggregate([
      { $match: { createdAt: dateFilter } },
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);

    const stats = orderStats[0] || {
      totalOrders: 0,
      totalRevenue: 0,
      avgOrderValue: 0
    };

    const productData = productStats[0] || {
      totalProducts: 0,
      avgPrice: 0,
      totalStock: 0
    };

    res.status(200).json({
      summary: {
        totalOrders: stats.totalOrders,
        totalRevenue: stats.totalRevenue,
        avgOrderValue: Math.round(stats.avgOrderValue * 100) / 100,
        totalProducts: productData.totalProducts,
        avgProductPrice: Math.round(productData.avgPrice * 100) / 100,
        totalStock: productData.totalStock
      },
      trends: {
        revenue: revenueTrend.map(item => ({
          date: item._id,
          revenue: item.revenue,
          orders: item.orders
        }))
      },
      topProducts,
      paymentDistribution: paymentDistribution.map(item => ({
        method: item._id,
        count: item.count,
        total: item.total
      })),
      statusDistribution: statusDistribution.map(item => ({
        status: item._id,
        count: item.count
      }))
    });
  } catch (error) {
    console.error('Get analytics error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get dashboard overview
export const getDashboardOverview = async (req, res) => {
  try {
    const now = new Date();
    const lastMonth = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    const previousMonth = new Date(now.getTime() - 60 * 24 * 60 * 60 * 1000);

    // Current month stats
    const currentStats = await Order.aggregate([
      { $match: { createdAt: { $gte: lastMonth } } },
      {
        $group: {
          _id: null,
          orders: { $sum: 1 },
          revenue: { $sum: '$pricing.total' }
        }
      }
    ]);

    // Previous month stats for comparison
    const previousStats = await Order.aggregate([
      { $match: { createdAt: { $gte: previousMonth, $lt: lastMonth } } },
      {
        $group: {
          _id: null,
          orders: { $sum: 1 },
          revenue: { $sum: '$pricing.total' }
        }
      }
    ]);

    // Product counts
    const productCount = await Product.countDocuments();
    const activeProducts = await Product.countDocuments({ status: 'active' });

    // Recent orders
    const recentOrders = await Order.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select('orderNumber status pricing.total createdAt');

    const current = currentStats[0] || { orders: 0, revenue: 0 };
    const previous = previousStats[0] || { orders: 0, revenue: 0 };

    // Calculate percentage changes
    const orderChange = previous.orders > 0 ? 
      ((current.orders - previous.orders) / previous.orders * 100) : 0;
    const revenueChange = previous.revenue > 0 ? 
      ((current.revenue - previous.revenue) / previous.revenue * 100) : 0;

    res.status(200).json({
      overview: {
        orders: {
          current: current.orders,
          previous: previous.orders,
          change: Math.round(orderChange * 10) / 10
        },
        revenue: {
          current: current.revenue,
          previous: previous.revenue,
          change: Math.round(revenueChange * 10) / 10
        },
        products: {
          total: productCount,
          active: activeProducts
        }
      },
      recentOrders
    });
  } catch (error) {
    console.error('Get dashboard overview error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get sales report
export const getSalesReport = async (req, res) => {
  try {
    const { startDate, endDate, groupBy = 'day' } = req.query;
    
    const dateFilter = {};
    if (startDate && endDate) {
      dateFilter.createdAt = {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      };
    }

    const groupFormat = {
      'hour': '%Y-%m-%d %H:00',
      'day': '%Y-%m-%d',
      'week': '%Y-%U',
      'month': '%Y-%m'
    };

    const salesData = await Order.aggregate([
      { $match: dateFilter },
      {
        $group: {
          _id: { $dateToString: { format: groupFormat[groupBy] || '%Y-%m-%d', date: '$createdAt' } },
          revenue: { $sum: '$pricing.total' },
          orders: { $sum: 1 },
          avgOrderValue: { $avg: '$pricing.total' }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    res.status(200).json({
      salesData: salesData.map(item => ({
        period: item._id,
        revenue: item.revenue,
        orders: item.orders,
        avgOrderValue: Math.round(item.avgOrderValue * 100) / 100
      }))
    });
  } catch (error) {
    console.error('Get sales report error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
