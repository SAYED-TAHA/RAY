import Order from '../../../models/Order.js';

// Security: Add audit logging
const logActivity = (action, userId, orderId = null, details = {}) => {
  console.log(`[AUDIT] Order ${action} by user ${userId} for order ${orderId || 'N/A'}:`, details);
};

// Get all orders with pagination and filtering
export const getOrders = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = Math.min(parseInt(req.query.limit) || 20, 100);
    const skip = (page - 1) * limit;

    // Build filter
    const filter = {};
    
    if (req.query.status) {
      filter.status = req.query.status;
    }
    
    if (req.query.paymentStatus) {
      filter.paymentStatus = req.query.paymentStatus;
    }
    
    if (req.query.paymentMethod) {
      filter.paymentMethod = req.query.paymentMethod;
    }

    // Date range filter
    if (req.query.startDate || req.query.endDate) {
      filter.createdAt = {};
      if (req.query.startDate) {
        filter.createdAt.$gte = new Date(req.query.startDate);
      }
      if (req.query.endDate) {
        filter.createdAt.$lte = new Date(req.query.endDate);
      }
    }

    // Search by customer name or email
    if (req.query.search) {
      filter.$or = [
        { customerName: { $regex: req.query.search, $options: 'i' } },
        { customerEmail: { $regex: req.query.search, $options: 'i' } },
        { customerPhone: { $regex: req.query.search, $options: 'i' } },
        { trackingNumber: { $regex: req.query.search, $options: 'i' } }
      ];
    }

    // Sort options
    const sort = {};
    const sortBy = req.query.sortBy || 'createdAt';
    const sortOrder = req.query.sortOrder === 'asc' ? 1 : -1;
    sort[sortBy] = sortOrder;

    const [orders, total] = await Promise.all([
      Order.find(filter)
        .select('-__v')
        .sort(sort)
        .skip(skip)
        .limit(limit),
      Order.countDocuments(filter)
    ]);

    res.status(200).json({
      orders,
      pagination: {
        current: page,
        pages: Math.ceil(total / limit),
        total,
        limit
      }
    });
  } catch (error) {
    console.error('Get orders error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get order by ID
export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json(order);
  } catch (error) {
    console.error('Get order error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Create new order
export const createOrder = async (req, res) => {
  try {
    const orderData = {
      ...req.body,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const order = new Order(orderData);
    await order.save();

    logActivity('created', req.user?.id || 'anonymous', order._id, orderData);

    res.status(201).json(order);
  } catch (error) {
    console.error('Create order error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Update order
export const updateOrder = async (req, res) => {
  try {
    const updates = {
      ...req.body,
      updatedAt: new Date()
    };

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true, runValidators: true }
    );

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    logActivity('updated', req.user?.id || 'anonymous', order._id, updates);

    res.status(200).json(order);
  } catch (error) {
    console.error('Update order error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Update order status
export const updateOrderStatus = async (req, res) => {
  try {
    const { status, paymentStatus } = req.body;
    
    const order = await Order.findById(req.params.id);
    
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    if (status) order.status = status;
    if (paymentStatus) order.paymentStatus = paymentStatus;
    
    // Auto-update tracking info for shipped orders
    if (status === 'shipped' && !order.trackingNumber) {
      order.trackingNumber = `TRK${Date.now()}${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
    }
    
    order.updatedAt = new Date();
    await order.save();

    logActivity('status_updated', req.user?.id || 'anonymous', order._id, { status, paymentStatus });

    res.status(200).json(order);
  } catch (error) {
    console.error('Update order status error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Delete order
export const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    logActivity('deleted', req.user?.id || 'anonymous', order._id, order);

    res.status(200).json({ message: 'Order deleted successfully' });
  } catch (error) {
    console.error('Delete order error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get order statistics
export const getOrderStats = async (req, res) => {
  try {
    const stats = await Order.aggregate([
      {
        $group: {
          _id: null,
          totalOrders: { $sum: 1 },
          totalRevenue: { $sum: '$total' },
          pendingOrders: {
            $sum: { $cond: [{ $eq: ['$status', 'pending'] }, 1, 0] }
          },
          processingOrders: {
            $sum: { $cond: [{ $eq: ['$status', 'processing'] }, 1, 0] }
          },
          shippedOrders: {
            $sum: { $cond: [{ $eq: ['$status', 'shipped'] }, 1, 0] }
          },
          deliveredOrders: {
            $sum: { $cond: [{ $eq: ['$status', 'delivered'] }, 1, 0] }
          },
          cancelledOrders: {
            $sum: { $cond: [{ $eq: ['$status', 'cancelled'] }, 1, 0] }
          },
          paidOrders: {
            $sum: { $cond: [{ $eq: ['$paymentStatus', 'paid'] }, 1, 0] }
          }
        }
      }
    ]);

    const result = stats[0] || {
      totalOrders: 0,
      totalRevenue: 0,
      pendingOrders: 0,
      processingOrders: 0,
      shippedOrders: 0,
      deliveredOrders: 0,
      cancelledOrders: 0,
      paidOrders: 0
    };

    res.status(200).json(result);
  } catch (error) {
    console.error('Get order stats error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
