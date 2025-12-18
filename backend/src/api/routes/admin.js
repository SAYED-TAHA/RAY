import express from 'express';
import Order from '../../models/Order.js';
import Notification from '../../models/Notification.js';
import Message from '../../models/Message.js';
import AppSettings from '../../models/AppSettings.js';
import DiscountCode from '../../models/DiscountCode.js';
import Subscription from '../../models/Subscription.js';
import { authenticateToken, requireAdmin } from '../../middleware/auth.js';

const router = express.Router();

// بيانات الإدمن (يمكن استبدالها بـ MongoDB لاحقاً)

const getOrCreateSettings = async () => {
  const existing = await AppSettings.findOne({});
  if (existing) return existing;
  return AppSettings.create({});
};

const isPlainObject = (value) => {
  return Object.prototype.toString.call(value) === '[object Object]';
};

const flattenSet = (target, prefix, obj) => {
  if (!isPlainObject(obj)) return;
  Object.keys(obj).forEach((key) => {
    const value = obj[key];
    if (value === undefined) return;
    const path = prefix ? `${prefix}.${key}` : key;
    if (isPlainObject(value)) {
      flattenSet(target, path, value);
    } else {
      target[path] = value;
    }
  });
};

const monthLabelAr = (yearMonth) => {
  const [year, month] = yearMonth.split('-');
  const m = parseInt(month, 10);
  const names = ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'];
  const name = names[m - 1] || yearMonth;
  return `${name} ${year}`;
};

router.use(authenticateToken, requireAdmin);

// التحليل المالي
router.get('/financial-analysis', (req, res) => {
  (async () => {
    try {
      const revenueAgg = await Order.aggregate([
        { $match: { 'payment.status': 'paid' } },
        { $group: { _id: null, revenue: { $sum: '$pricing.total' } } }
      ]);

      const revenue = revenueAgg[0]?.revenue || 0;
      const expenses = 0;
      const profit = revenue - expenses;

      const monthlyAgg = await Order.aggregate([
        { $match: { 'payment.status': 'paid' } },
        {
          $group: {
            _id: { $dateToString: { format: '%Y-%m', date: '$createdAt' } },
            revenue: { $sum: '$pricing.total' }
          }
        },
        { $sort: { _id: 1 } },
        { $limit: 24 }
      ]);

      const monthlyData = monthlyAgg.map((m) => ({
        month: monthLabelAr(m._id),
        revenue: m.revenue,
        expenses: 0,
        profit: m.revenue
      }));

      res.json({
        analysis: {
          revenue,
          expenses,
          profit,
          marginPercentage: revenue > 0 ? Math.round((profit / revenue) * 1000) / 10 : 0,
          growthRate: 0,
          roi: 0
        },
        monthlyData
      });
    } catch (error) {
      console.error('Financial analysis error:', error);
      res.status(500).json({ error: 'خطأ في جلب البيانات المالية' });
    }
  })();
});

// الرسائل
router.get('/messages', (req, res) => {
  (async () => {
    try {
      const limit = Math.min(parseInt(req.query.limit) || 100, 500);
      const messages = await Message.find({})
        .sort({ createdAt: -1 })
        .limit(limit);
      const mapped = messages.map((m) => ({
        id: m._id.toString(),
        sender: m.senderId?.toString?.() || 'مستخدم',
        email: '',
        phone: '',
        subject: 'رسالة',
        message: m.content,
        date: (m.createdAt || new Date()).toISOString(),
        status: m.status === 'read' ? 'read' : 'unread',
        priority: 'low',
        category: 'inquiry',
        attachments: Array.isArray(m.attachments) ? m.attachments.length : 0
      }));
      res.json(mapped);
    } catch (error) {
      console.error('Admin messages error:', error);
      res.status(500).json({ error: 'خطأ في جلب الرسائل' });
    }
  })();
});

// المصروفات
router.get('/expenses', (req, res) => {
  try {
    res.json([]);
  } catch (error) {
    res.status(500).json({ error: 'خطأ في جلب بيانات المصروفات' });
  }
});

// التحويلات
router.get('/conversions', (req, res) => {
  try {
    res.json([]);
  } catch (error) {
    res.status(500).json({ error: 'خطأ في جلب بيانات التحويلات' });
  }
});

// الإيرادات
router.get('/revenue', (req, res) => {
  (async () => {
    try {
      const revenueAgg = await Order.aggregate([
        { $match: { 'payment.status': 'paid' } },
        {
          $group: {
            _id: '$type',
            amount: { $sum: '$pricing.total' }
          }
        }
      ]);

      const total = revenueAgg.reduce((sum, r) => sum + (r.amount || 0), 0);
      const labelMap = {
        product: 'طلبات منتجات',
        service: 'خدمات',
        booking: 'حجوزات',
        delivery: 'توصيل',
        pickup: 'استلام'
      };

      const result = revenueAgg.map((r) => ({
        source: labelMap[r._id] || String(r._id || 'other'),
        amount: r.amount || 0,
        percentage: total > 0 ? Math.round(((r.amount || 0) / total) * 100) : 0,
        trend: 0
      }));

      res.json(result);
    } catch (error) {
      console.error('Revenue error:', error);
      res.status(500).json({ error: 'خطأ في جلب بيانات الإيرادات' });
    }
  })();
});

// الأرباح
router.get('/profit', (req, res) => {
  (async () => {
    try {
      const monthlyAgg = await Order.aggregate([
        { $match: { 'payment.status': 'paid' } },
        {
          $group: {
            _id: { $dateToString: { format: '%Y-%m', date: '$createdAt' } },
            revenue: { $sum: '$pricing.total' }
          }
        },
        { $sort: { _id: 1 } },
        { $limit: 24 }
      ]);

      const rows = monthlyAgg.map((m) => {
        const revenue = m.revenue || 0;
        const expenses = 0;
        const profit = revenue - expenses;
        const margin = revenue > 0 ? Math.round((profit / revenue) * 100) : 0;
        return {
          month: monthLabelAr(m._id),
          revenue,
          expenses,
          profit,
          margin
        };
      });

      res.json(rows);
    } catch (error) {
      console.error('Profit error:', error);
      res.status(500).json({ error: 'خطأ في جلب بيانات الأرباح' });
    }
  })();
});

// الإشعارات
router.get('/notifications', (req, res) => {
  (async () => {
    try {
      const limit = Math.min(parseInt(req.query.limit) || 100, 500);
      const notifications = await Notification.find({})
        .sort({ createdAt: -1 })
        .limit(limit);
      const mapped = notifications.map((n) => ({
        id: n._id.toString(),
        title: n.title,
        message: n.content,
        type: n.type,
        priority: n.priority,
        status: n.status,
        recipients: n.recipientId?.toString?.() || 'unknown',
        sentAt: n.sentAt ? n.sentAt.toISOString() : (n.createdAt || null),
        scheduledAt: n.scheduledAt ? n.scheduledAt.toISOString() : null,
        readBy: n.status === 'read' ? 1 : 0,
        totalRecipients: 1,
        deliveryRate: ['sent', 'delivered', 'read'].includes(n.status) ? 100 : 0,
        createdBy: n.senderId?.toString?.() || 'System'
      }));
      res.json(mapped);
    } catch (error) {
      console.error('Admin notifications error:', error);
      res.status(500).json({ error: 'خطأ في جلب الإشعارات' });
    }
  })();
});

router.get('/discounts', (req, res) => {
  (async () => {
    try {
      const limit = Math.min(parseInt(req.query.limit) || 100, 500);
      const discounts = await DiscountCode.find({}).sort({ createdAt: -1 }).limit(limit);
      const mapped = discounts.map((d) => ({
        id: d.id || d._id.toString(),
        code: d.code,
        type: d.type,
        value: d.value,
        usage: d.usageCount || 0,
        maxUse: d.maxUse || 0,
        status: d.status,
        expiry: d.expiryDate ? d.expiryDate.toISOString().split('T')[0] : null
      }));
      res.json(mapped);
    } catch (error) {
      console.error('Admin discounts error:', error);
      res.status(500).json({ error: 'خطأ في جلب الخصومات' });
    }
  })();
});

router.post('/discounts', (req, res) => {
  (async () => {
    try {
      const { code, type, value, maxUse, status, expiryDate } = req.body || {};
      if (!code || !type || typeof value !== 'number') {
        return res.status(400).json({ error: 'بيانات غير مكتملة' });
      }

      const created = await DiscountCode.create({
        code: String(code).trim().toUpperCase(),
        type,
        value,
        maxUse: typeof maxUse === 'number' ? maxUse : 0,
        status: status || 'active',
        expiryDate: expiryDate ? new Date(expiryDate) : null
      });

      res.status(201).json(created);
    } catch (error) {
      console.error('Create discount error:', error);
      res.status(500).json({ error: 'خطأ في إنشاء الخصم' });
    }
  })();
});

router.put('/discounts/:id', (req, res) => {
  (async () => {
    try {
      const update = {};
      if (req.body.code) update.code = String(req.body.code).trim().toUpperCase();
      if (req.body.type) update.type = req.body.type;
      if (typeof req.body.value === 'number') update.value = req.body.value;
      if (typeof req.body.maxUse === 'number') update.maxUse = req.body.maxUse;
      if (req.body.status) update.status = req.body.status;
      if (req.body.expiryDate !== undefined) update.expiryDate = req.body.expiryDate ? new Date(req.body.expiryDate) : null;

      const updated = await DiscountCode.findByIdAndUpdate(req.params.id, { $set: update }, { new: true });
      if (!updated) return res.status(404).json({ error: 'الخصم غير موجود' });
      res.json(updated);
    } catch (error) {
      console.error('Update discount error:', error);
      res.status(500).json({ error: 'خطأ في تحديث الخصم' });
    }
  })();
});

router.delete('/discounts/:id', (req, res) => {
  (async () => {
    try {
      const deleted = await DiscountCode.findByIdAndDelete(req.params.id);
      if (!deleted) return res.status(404).json({ error: 'الخصم غير موجود' });
      res.json({ success: true });
    } catch (error) {
      console.error('Delete discount error:', error);
      res.status(500).json({ error: 'خطأ في حذف الخصم' });
    }
  })();
});

// إعدادات لوحة الإدارة
router.get('/settings', (req, res) => {
  (async () => {
    try {
      const settings = await getOrCreateSettings();
      res.json(settings);
    } catch (error) {
      console.error('Get admin settings error:', error);
      res.status(500).json({ error: 'خطأ في جلب الإعدادات' });
    }
  })();
});

router.put('/settings', (req, res) => {
  (async () => {
    try {
      const update = {};
      if (req.body.general) flattenSet(update, 'general', req.body.general);
      if (req.body.advanced) flattenSet(update, 'advanced', req.body.advanced);
      if (req.body.ui) flattenSet(update, 'ui', req.body.ui);
      if (req.body.notifications) flattenSet(update, 'notifications', req.body.notifications);
      if (req.body.security) flattenSet(update, 'security', req.body.security);
      if (req.body.payment) flattenSet(update, 'payment', req.body.payment);

      const settings = await AppSettings.findOneAndUpdate(
        {},
        { $set: update },
        { new: true, upsert: true, setDefaultsOnInsert: true }
      );

      res.json(settings);
    } catch (error) {
      console.error('Update admin settings error:', error);
      res.status(500).json({ error: 'خطأ في حفظ الإعدادات' });
    }
  })();
});

router.get('/subscriptions', authenticateToken, requireAdmin, (req, res) => {
  (async () => {
    try {
      const limit = Math.min(parseInt(req.query.limit) || 200, 500);
      const subs = await Subscription.find({})
        .populate('userId', 'name email')
        .sort({ createdAt: -1 })
        .limit(limit);

      const planLabel = {
        free: 'مجاني',
        basic: 'أساسي',
        premium: 'مميز',
        enterprise: 'مؤسسي'
      };

      const mapped = subs.map((s) => {
        const user = s.userId;
        const userName = user?.name || user?.email || (s.userId?.toString?.() || 'مستخدم');
        const userId = user?._id?.toString?.() || s.userId?.toString?.() || null;
        const start = s.createdAt ? new Date(s.createdAt).toISOString().split('T')[0] : null;
        const end = s.billing?.nextBillingDate ? new Date(s.billing.nextBillingDate).toISOString().split('T')[0] : null;
        return {
          id: s._id.toString(),
          userId,
          user: userName,
          plan: s.plan,
          package: planLabel[s.plan] || s.plan,
          status: s.status,
          startDate: start,
          endDate: end,
          amount: s.billing?.amount || 0,
          currency: s.billing?.currency || 'EGP',
          autoRenew: Boolean(s.billing?.nextBillingDate) && s.status === 'active'
        };
      });

      res.json(mapped);
    } catch (error) {
      console.error('Admin subscriptions error:', error);
      res.status(500).json({ error: 'خطأ في جلب الاشتراكات' });
    }
  })();
});

export default router;
