import type { AnalyticsData, DashboardOverview, SalesReportData } from './analyticsService';
import type { Product as ApiProduct } from './productsService';
import type { Order, OrderFilters } from './ordersService';

type DataMode = 'local' | 'api';

const STORAGE_KEY = 'ray_local_db_v1';
const MODE_KEY = 'ray_data_mode';

type LocalDB = {
  products: ApiProduct[];
  orders: Order[];
};

const safeParse = <T>(value: string | null, fallback: T): T => {
  if (!value) return fallback;
  try {
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
};

const nowIso = () => new Date().toISOString();

const toDayKey = (iso: string) => {
  const d = new Date(iso);
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
};

const addDays = (d: Date, days: number) => {
  const next = new Date(d);
  next.setDate(next.getDate() + days);
  return next;
};

const getDB = (): LocalDB => {
  if (typeof window === 'undefined') {
    return { products: [], orders: [] };
  }

  const db = safeParse<LocalDB>(localStorage.getItem(STORAGE_KEY), { products: [], orders: [] });
  if (!db.products) db.products = [];
  if (!db.orders) db.orders = [];
  return db;
};

const setDB = (db: LocalDB) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(db));
};

export const getDataMode = (): DataMode => {
  const envMode = (process.env.NEXT_PUBLIC_DATA_MODE || '').toLowerCase();
  if (envMode === 'api' || envMode === 'local') return envMode as DataMode;

  if (typeof window === 'undefined') return 'local';
  const stored = (localStorage.getItem(MODE_KEY) || '').toLowerCase();
  if (stored === 'api' || stored === 'local') return stored as DataMode;
  return 'local';
};

export const setDataMode = (mode: DataMode) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(MODE_KEY, mode);
};

const ensureId = () => {
  return `${Date.now()}_${Math.random().toString(16).slice(2)}`;
};

const normalizeApiProduct = (p: Partial<ApiProduct> & { _id?: string }): ApiProduct => {
  const extras: any = { ...p };
  const now = nowIso();
  return {
    ...extras,
    _id: p._id || ensureId(),
    name: String(p.name ?? ''),
    price: Number(p.price ?? 0),
    barcode: p.barcode,
    sku: p.sku,
    category: p.category,
    image: p.image,
    stock: Number(p.stock ?? 0),
    minStock: Number(p.minStock ?? 0),
    status: (p.status as any) || 'active',
    dailySales: Number(p.dailySales ?? 0),
    createdAt: p.createdAt || now,
    updatedAt: now
  };
};

export const localListProducts = async (options?: {
  page?: number;
  limit?: number;
  category?: string;
  status?: string;
  minStock?: number;
}): Promise<{ products: ApiProduct[]; pagination: any }> => {
  const db = getDB();
  let products = [...db.products];

  if (options?.category) {
    products = products.filter(p => (p.category || '') === options.category);
  }
  if (options?.status) {
    products = products.filter(p => p.status === options.status);
  }
  if (options?.minStock !== undefined) {
    products = products.filter(p => (p.stock ?? 0) <= Number(options.minStock));
  }

  products.sort((a, b) => (b.updatedAt || b.createdAt || '').localeCompare(a.updatedAt || a.createdAt || ''));

  const limit = Number(options?.limit ?? 20);
  const current = Math.max(1, Number(options?.page ?? 1));
  const total = products.length;
  const pages = limit > 0 ? Math.ceil(total / limit) : 1;
  const start = (current - 1) * limit;
  const sliced = limit > 0 ? products.slice(start, start + limit) : products;

  return {
    products: sliced,
    pagination: { current, pages, total, limit }
  };
};

export const localFetchProduct = async (id: string): Promise<ApiProduct | null> => {
  const db = getDB();
  return db.products.find(p => p._id === id) || null;
};

export const localCreateProduct = async (
  product: Omit<ApiProduct, '_id' | 'createdAt' | 'updatedAt'>
): Promise<ApiProduct> => {
  const db = getDB();
  const next = normalizeApiProduct(product as any);
  db.products.unshift(next);
  setDB(db);
  return next;
};

export const localUpdateProduct = async (id: string, product: Partial<ApiProduct>): Promise<ApiProduct | null> => {
  const db = getDB();
  const idx = db.products.findIndex(p => p._id === id);
  if (idx === -1) {
    const created = normalizeApiProduct({ ...(product as any), _id: id });
    db.products.unshift(created);
    setDB(db);
    return created;
  }
  const merged = normalizeApiProduct({ ...db.products[idx], ...product, _id: id });
  db.products[idx] = merged;
  setDB(db);
  return merged;
};

export const localDeleteProduct = async (id: string): Promise<boolean> => {
  const db = getDB();
  const before = db.products.length;
  db.products = db.products.filter(p => p._id !== id);
  setDB(db);
  return db.products.length !== before;
};

const normalizeOrder = (o: Partial<Order> & { _id?: string; orderNumber?: string }): Order => {
  const now = nowIso();
  const _id = o._id || ensureId();
  const createdAt = o.createdAt || now;
  const updatedAt = now;
  const orderNumber = o.orderNumber || `#${String(Date.now()).slice(-6)}`;

  const pricingTotal = Number((o as any)?.pricing?.total ?? 0);

  return {
    _id,
    orderNumber,
    customerId: String(o.customerId ?? 'local'),
    merchantId: String(o.merchantId ?? 'local'),
    type: (o.type as any) || 'product',
    status: (o.status as any) || 'pending',
    items: Array.isArray(o.items) ? o.items.map((it: any) => ({
      type: String(it.type ?? 'product'),
      itemId: String(it.itemId ?? ''),
      name: String(it.name ?? ''),
      description: it.description,
      price: Number(it.price ?? 0),
      quantity: Number(it.quantity ?? 1),
      variations: it.variations,
      subtotal: Number(it.subtotal ?? (Number(it.price ?? 0) * Number(it.quantity ?? 1)))
    })) : [],
    pricing: {
      subtotal: Number((o as any)?.pricing?.subtotal ?? pricingTotal),
      tax: Number((o as any)?.pricing?.tax ?? 0),
      deliveryFee: Number((o as any)?.pricing?.deliveryFee ?? 0),
      serviceFee: Number((o as any)?.pricing?.serviceFee ?? 0),
      discount: Number((o as any)?.pricing?.discount ?? 0),
      total: pricingTotal
    },
    payment: {
      method: (o as any)?.payment?.method || 'cash',
      status: (o as any)?.payment?.status || 'pending',
      transactionId: (o as any)?.payment?.transactionId,
      paidAt: (o as any)?.payment?.paidAt,
      refundAmount: (o as any)?.payment?.refundAmount,
      refundReason: (o as any)?.payment?.refundReason
    },
    delivery: {
      type: (o as any)?.delivery?.type || 'pickup',
      address: (o as any)?.delivery?.address,
      scheduledTime: (o as any)?.delivery?.scheduledTime,
      estimatedTime: (o as any)?.delivery?.estimatedTime,
      actualTime: (o as any)?.delivery?.actualTime,
      trackingNumber: (o as any)?.delivery?.trackingNumber,
      deliveryNotes: (o as any)?.delivery?.deliveryNotes
    },
    booking: (o as any)?.booking,
    timeline: Array.isArray(o.timeline) ? o.timeline : [],
    ratings: (o as any)?.ratings,
    createdAt,
    updatedAt
  };
};

const matchesSearch = (o: Order, search: string) => {
  const s = search.toLowerCase();
  if ((o.orderNumber || '').toLowerCase().includes(s)) return true;
  if ((o.status || '').toLowerCase().includes(s)) return true;
  if ((o.payment?.status || '').toLowerCase().includes(s)) return true;
  if ((o.payment?.method || '').toLowerCase().includes(s)) return true;
  if (o.items?.some(i => (i.name || '').toLowerCase().includes(s))) return true;
  return false;
};

export const localListOrders = async (
  filters: OrderFilters = {}
): Promise<{ orders: Order[]; pagination: { current: number; pages: number; total: number; limit: number } }> => {
  const db = getDB();
  let orders = [...db.orders];

  if (filters.status) {
    orders = orders.filter(o => o.status === filters.status);
  }
  if (filters.paymentStatus) {
    orders = orders.filter(o => o.payment?.status === filters.paymentStatus);
  }
  if (filters.paymentMethod) {
    orders = orders.filter(o => o.payment?.method === filters.paymentMethod);
  }
  if (filters.search) {
    orders = orders.filter(o => matchesSearch(o, filters.search as string));
  }
  if (filters.startDate) {
    const start = new Date(filters.startDate).getTime();
    orders = orders.filter(o => new Date(o.createdAt).getTime() >= start);
  }
  if (filters.endDate) {
    const end = new Date(filters.endDate).getTime();
    orders = orders.filter(o => new Date(o.createdAt).getTime() <= end);
  }

  const sortBy = filters.sortBy || 'createdAt';
  const sortOrder = filters.sortOrder || 'desc';
  orders.sort((a: any, b: any) => {
    const av = a?.[sortBy] ?? a?.createdAt;
    const bv = b?.[sortBy] ?? b?.createdAt;
    const cmp = String(bv).localeCompare(String(av));
    return sortOrder === 'asc' ? -cmp : cmp;
  });

  const limit = Number(filters.limit ?? 20);
  const current = Math.max(1, Number(filters.page ?? 1));
  const total = orders.length;
  const pages = limit > 0 ? Math.ceil(total / limit) : 1;
  const startIdx = (current - 1) * limit;
  const sliced = limit > 0 ? orders.slice(startIdx, startIdx + limit) : orders;

  return {
    orders: sliced,
    pagination: { current, pages, total, limit }
  };
};

export const localFetchOrderById = async (id: string): Promise<Order | null> => {
  const db = getDB();
  return db.orders.find(o => o._id === id) || null;
};

export const localComputeOrderStats = async (): Promise<{
  totalOrders: number;
  totalRevenue: number;
  pendingOrders: number;
  processingOrders: number;
  shippedOrders: number;
  deliveredOrders: number;
  cancelledOrders: number;
  paidOrders: number;
}> => {
  const db = getDB();
  const totalOrders = db.orders.length;
  const totalRevenue = db.orders.reduce((acc, o) => acc + Number(o.pricing?.total ?? 0), 0);
  const pendingOrders = db.orders.filter(o => o.status === 'pending').length;
  const processingOrders = db.orders.filter(o => o.status === 'preparing' || o.status === 'confirmed').length;
  const shippedOrders = db.orders.filter(o => o.status === 'on-the-way').length;
  const deliveredOrders = db.orders.filter(o => o.status === 'delivered' || o.status === 'completed').length;
  const cancelledOrders = db.orders.filter(o => o.status === 'cancelled' || o.status === 'refunded').length;
  const paidOrders = db.orders.filter(o => o.payment?.status === 'paid').length;

  return {
    totalOrders,
    totalRevenue,
    pendingOrders,
    processingOrders,
    shippedOrders,
    deliveredOrders,
    cancelledOrders,
    paidOrders
  };
};

export const localCreateOrder = async (orderData: Omit<Order, '_id' | 'createdAt' | 'updatedAt'>): Promise<Order> => {
  const db = getDB();
  const next = normalizeOrder(orderData as any);
  db.orders.unshift(next);
  setDB(db);
  return next;
};

export const localUpdateOrder = async (id: string, orderData: Partial<Order>): Promise<Order> => {
  const db = getDB();
  const idx = db.orders.findIndex(o => o._id === id);
  if (idx === -1) {
    const next = normalizeOrder({ ...(orderData as any), _id: id });
    db.orders.unshift(next);
    setDB(db);
    return next;
  }
  const merged = normalizeOrder({ ...db.orders[idx], ...orderData, _id: id });
  db.orders[idx] = merged;
  setDB(db);
  return merged;
};

export const localUpdateOrderStatus = async (id: string, status: string, paymentStatus?: string): Promise<Order> => {
  const db = getDB();
  const idx = db.orders.findIndex(o => o._id === id);
  const existing = idx === -1 ? normalizeOrder({ _id: id } as any) : db.orders[idx];
  const next: Partial<Order> = { ...existing, status: status as any };
  if (paymentStatus) {
    next.payment = { ...(existing.payment as any), status: paymentStatus as any };
  }
  const merged = normalizeOrder({ ...existing, ...next, _id: id });
  if (idx === -1) {
    db.orders.unshift(merged);
  } else {
    db.orders[idx] = merged;
  }
  setDB(db);
  return merged;
};

export const localDeleteOrder = async (id: string): Promise<boolean> => {
  const db = getDB();
  const before = db.orders.length;
  db.orders = db.orders.filter(o => o._id !== id);
  setDB(db);
  return db.orders.length !== before;
};

const sumOrdersInRange = (orders: Order[], from: Date, to: Date) => {
  const start = from.getTime();
  const end = to.getTime();
  const scoped = orders.filter(o => {
    const t = new Date(o.createdAt).getTime();
    return t >= start && t <= end;
  });

  const count = scoped.length;
  const revenue = scoped.reduce((acc, o) => acc + Number(o.pricing?.total ?? 0), 0);
  return { count, revenue, orders: scoped };
};

export const localComputeDashboardOverview = async (): Promise<DashboardOverview> => {
  const db = getDB();
  const now = new Date();
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0);
  const todayEnd = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999);

  const y = addDays(todayStart, -1);
  const yesterdayStart = new Date(y.getFullYear(), y.getMonth(), y.getDate(), 0, 0, 0, 0);
  const yesterdayEnd = new Date(y.getFullYear(), y.getMonth(), y.getDate(), 23, 59, 59, 999);

  const todayAgg = sumOrdersInRange(db.orders, todayStart, todayEnd);
  const yesterdayAgg = sumOrdersInRange(db.orders, yesterdayStart, yesterdayEnd);

  const ordersChange = yesterdayAgg.count
    ? ((todayAgg.count - yesterdayAgg.count) / yesterdayAgg.count) * 100
    : todayAgg.count
      ? 100
      : 0;

  const revenueChange = yesterdayAgg.revenue
    ? ((todayAgg.revenue - yesterdayAgg.revenue) / yesterdayAgg.revenue) * 100
    : todayAgg.revenue
      ? 100
      : 0;

  const productsTotal = db.products.length;
  const productsActive = db.products.filter(p => p.status === 'active').length;

  const recentOrders = [...db.orders]
    .sort((a, b) => String(b.createdAt).localeCompare(String(a.createdAt)))
    .slice(0, 10)
    .map(o => ({
      orderNumber: o.orderNumber,
      status: o.status,
      pricing: { total: Number(o.pricing?.total ?? 0) },
      createdAt: o.createdAt
    }));

  return {
    overview: {
      orders: {
        current: todayAgg.count,
        previous: yesterdayAgg.count,
        change: Number.isFinite(ordersChange) ? ordersChange : 0
      },
      revenue: {
        current: todayAgg.revenue,
        previous: yesterdayAgg.revenue,
        change: Number.isFinite(revenueChange) ? revenueChange : 0
      },
      products: {
        total: productsTotal,
        active: productsActive
      }
    },
    recentOrders
  };
};

export const localComputeSalesReport = async (
  startDate?: string,
  endDate?: string,
  groupBy: string = 'day'
): Promise<SalesReportData> => {
  const db = getDB();

  const end = endDate ? new Date(endDate) : new Date();
  const start = startDate ? new Date(startDate) : addDays(end, -6);

  const scoped = db.orders.filter(o => {
    const t = new Date(o.createdAt).getTime();
    return t >= start.getTime() && t <= end.getTime();
  });

  const buckets = new Map<string, { revenue: number; orders: number }>();

  for (const o of scoped) {
    const key = groupBy === 'month'
      ? `${new Date(o.createdAt).getFullYear()}-${String(new Date(o.createdAt).getMonth() + 1).padStart(2, '0')}`
      : groupBy === 'week'
        ? toDayKey(o.createdAt)
        : toDayKey(o.createdAt);

    const prev = buckets.get(key) || { revenue: 0, orders: 0 };
    prev.revenue += Number(o.pricing?.total ?? 0);
    prev.orders += 1;
    buckets.set(key, prev);
  }

  const salesData = Array.from(buckets.entries())
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(([period, v]) => ({
      period,
      revenue: v.revenue,
      orders: v.orders,
      avgOrderValue: v.orders ? v.revenue / v.orders : 0
    }));

  return { salesData };
};

export const localComputeAnalytics = async (period: string = 'month', startDate?: string, endDate?: string): Promise<AnalyticsData> => {
  const db = getDB();

  const now = new Date();
  const end = endDate ? new Date(endDate) : now;

  let start: Date;
  if (startDate) {
    start = new Date(startDate);
  } else {
    if (period === 'today') {
      start = new Date(end.getFullYear(), end.getMonth(), end.getDate(), 0, 0, 0, 0);
    } else if (period === 'week') {
      start = addDays(end, -6);
    } else if (period === 'year') {
      start = new Date(end.getFullYear(), 0, 1);
    } else {
      start = new Date(end.getFullYear(), end.getMonth(), 1);
    }
  }

  const scopedOrders = db.orders.filter(o => {
    const t = new Date(o.createdAt).getTime();
    return t >= start.getTime() && t <= end.getTime();
  });

  const totalOrders = scopedOrders.length;
  const totalRevenue = scopedOrders.reduce((acc, o) => acc + Number(o.pricing?.total ?? 0), 0);
  const avgOrderValue = totalOrders ? totalRevenue / totalOrders : 0;

  const totalProducts = db.products.length;
  const avgProductPrice = totalProducts ? db.products.reduce((acc, p) => acc + Number(p.price ?? 0), 0) / totalProducts : 0;
  const totalStock = db.products.reduce((acc, p) => acc + Number(p.stock ?? 0), 0);

  const dayBuckets = new Map<string, { revenue: number; orders: number }>();
  for (const o of scopedOrders) {
    const key = toDayKey(o.createdAt);
    const prev = dayBuckets.get(key) || { revenue: 0, orders: 0 };
    prev.revenue += Number(o.pricing?.total ?? 0);
    prev.orders += 1;
    dayBuckets.set(key, prev);
  }

  const trendsRevenue = Array.from(dayBuckets.entries())
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(([date, v]) => ({ date, revenue: v.revenue, orders: v.orders }));

  return {
    summary: {
      totalOrders,
      totalRevenue,
      avgOrderValue,
      totalProducts,
      avgProductPrice,
      totalStock
    },
    trends: {
      revenue: trendsRevenue
    },
    topProducts: [],
    paymentDistribution: [],
    statusDistribution: []
  };
};
