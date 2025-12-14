/**
 * خدمة الدفع والمعاملات المالية
 * تدير جميع عمليات الدفع والفواتير والمحافظ
 */

export interface PaymentMethod {
  id: string;
  type: 'credit_card' | 'debit_card' | 'mobile_wallet' | 'bank_transfer';
  name: string;
  isDefault: boolean;
  lastFourDigits?: string;
  expiryDate?: string;
  provider?: string; // Visa, MasterCard, Fawry, etc.
}

export interface Transaction {
  id: string;
  userId: string;
  activityId?: string;
  type: 'payment' | 'refund' | 'subscription' | 'purchase';
  amount: number;
  currency: string;
  status: 'pending' | 'completed' | 'failed' | 'cancelled';
  paymentMethod: PaymentMethod;
  description: string;
  reference?: string;
  createdAt: string;
  completedAt?: string;
  failureReason?: string;
}

export interface Invoice {
  id: string;
  userId: string;
  activityId?: string;
  invoiceNumber: string;
  amount: number;
  currency: string;
  status: 'draft' | 'sent' | 'paid' | 'overdue' | 'cancelled';
  items: InvoiceItem[];
  subtotal: number;
  tax: number;
  total: number;
  dueDate: string;
  issuedDate: string;
  paidDate?: string;
  notes?: string;
}

export interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface Wallet {
  id: string;
  userId: string;
  balance: number;
  currency: string;
  lastUpdated: string;
  transactions: Transaction[];
}

export interface PaymentPlan {
  id: string;
  name: string;
  description: string;
  amount: number;
  currency: string;
  billingCycle: 'monthly' | 'quarterly' | 'annual';
  trialDays?: number;
  features: string[];
}

// طرق الدفع المدعومة
export const SUPPORTED_PAYMENT_METHODS = [
  {
    id: 'credit_card',
    name: 'بطاقة ائتمان',
    icon: '💳',
    providers: ['Visa', 'MasterCard', 'American Express']
  },
  {
    id: 'debit_card',
    name: 'بطاقة خصم',
    icon: '🏧',
    providers: ['Visa Debit', 'MasterCard Debit']
  },
  {
    id: 'mobile_wallet',
    name: 'محفظة رقمية',
    icon: '📱',
    providers: ['Fawry', 'Vodafone Cash', 'Orange Money', 'Etisalat Cash']
  },
  {
    id: 'bank_transfer',
    name: 'تحويل بنكي',
    icon: '🏦',
    providers: ['البنك الأهلي', 'بنك مصر', 'بنك القاهرة']
  }
];

// رسوم المعاملات
export const TRANSACTION_FEES: Record<string, number> = {
  credit_card: 0.03, // 3%
  debit_card: 0.02, // 2%
  mobile_wallet: 0.01, // 1%
  bank_transfer: 0.005 // 0.5%
};

/**
 * حساب رسوم المعاملة
 */
export const calculateTransactionFee = (
  amount: number,
  paymentMethodType: string
): number => {
  const feePercentage = TRANSACTION_FEES[paymentMethodType] || 0;
  return Math.round(amount * feePercentage * 100) / 100;
};

/**
 * حساب الإجمالي مع الرسوم
 */
export const calculateTotalWithFees = (
  amount: number,
  paymentMethodType: string
): { subtotal: number; fee: number; total: number } => {
  const fee = calculateTransactionFee(amount, paymentMethodType);
  return {
    subtotal: amount,
    fee,
    total: amount + fee
  };
};

/**
 * التحقق من صحة بيانات البطاقة
 */
export const validateCardData = (
  cardNumber: string,
  expiryDate: string,
  cvv: string
): { valid: boolean; errors: string[] } => {
  const errors: string[] = [];

  // التحقق من رقم البطاقة (Luhn Algorithm)
  const cardRegex = /^\d{13,19}$/;
  if (!cardRegex.test(cardNumber.replace(/\s/g, ''))) {
    errors.push('رقم البطاقة غير صحيح');
  }

  // التحقق من تاريخ الانتهاء
  const expiryRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
  if (!expiryRegex.test(expiryDate)) {
    errors.push('تاريخ الانتهاء غير صحيح (MM/YY)');
  } else {
    const [month, year] = expiryDate.split('/');
    const expiry = new Date(2000 + parseInt(year), parseInt(month) - 1);
    if (expiry < new Date()) {
      errors.push('البطاقة منتهية الصلاحية');
    }
  }

  // التحقق من CVV
  const cvvRegex = /^\d{3,4}$/;
  if (!cvvRegex.test(cvv)) {
    errors.push('رمز الأمان غير صحيح');
  }

  return { valid: errors.length === 0, errors };
};

/**
 * إنشاء فاتورة جديدة
 */
export const createInvoice = (
  userId: string,
  items: InvoiceItem[],
  activityId?: string
): Invoice => {
  const subtotal = items.reduce((sum, item) => sum + item.total, 0);
  const tax = Math.round(subtotal * 0.14 * 100) / 100; // 14% VAT
  const total = subtotal + tax;

  const dueDate = new Date();
  dueDate.setDate(dueDate.getDate() + 30); // 30 days payment term

  return {
    id: `inv-${Date.now()}`,
    userId,
    activityId,
    invoiceNumber: `INV-${Date.now().toString().slice(-6)}`,
    amount: total,
    currency: 'EGP',
    status: 'draft',
    items,
    subtotal,
    tax,
    total,
    dueDate: dueDate.toISOString().split('T')[0],
    issuedDate: new Date().toISOString().split('T')[0]
  };
};

/**
 * معالجة دفع الاشتراك
 */
export const processSubscriptionPayment = async (
  userId: string,
  planId: string,
  paymentMethod: PaymentMethod,
  amount: number
): Promise<{ success: boolean; transactionId?: string; error?: string }> => {
  try {
    // في الواقع، سيتم إرسال الطلب إلى خادم الدفع
    // const response = await fetch('/api/payments/process', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({
    //     userId,
    //     planId,
    //     paymentMethod,
    //     amount
    //   })
    // });

    // محاكاة معالجة الدفع
    const transaction: Transaction = {
      id: `txn-${Date.now()}`,
      userId,
      type: 'subscription',
      amount,
      currency: 'EGP',
      status: 'completed',
      paymentMethod,
      description: `دفع اشتراك الخطة ${planId}`,
      reference: `REF-${Date.now().toString().slice(-6)}`,
      createdAt: new Date().toISOString(),
      completedAt: new Date().toISOString()
    };

    return {
      success: true,
      transactionId: transaction.id
    };
  } catch (error) {
    return {
      success: false,
      error: 'فشل معالجة الدفع. يرجى المحاولة لاحقاً.'
    };
  }
};

/**
 * معالجة دفع الفاتورة
 */
export const processInvoicePayment = async (
  invoiceId: string,
  paymentMethod: PaymentMethod,
  amount: number
): Promise<{ success: boolean; transactionId?: string; error?: string }> => {
  try {
    // في الواقع، سيتم إرسال الطلب إلى خادم الدفع
    const transaction: Transaction = {
      id: `txn-${Date.now()}`,
      userId: '',
      type: 'payment',
      amount,
      currency: 'EGP',
      status: 'completed',
      paymentMethod,
      description: `دفع الفاتورة ${invoiceId}`,
      reference: `REF-${Date.now().toString().slice(-6)}`,
      createdAt: new Date().toISOString(),
      completedAt: new Date().toISOString()
    };

    return {
      success: true,
      transactionId: transaction.id
    };
  } catch (error) {
    return {
      success: false,
      error: 'فشل معالجة الدفع. يرجى المحاولة لاحقاً.'
    };
  }
};

/**
 * حساب رصيد المحفظة
 */
export const calculateWalletBalance = (transactions: Transaction[]): number => {
  return transactions.reduce((balance, txn) => {
    if (txn.status === 'completed') {
      if (txn.type === 'payment' || txn.type === 'subscription') {
        return balance - txn.amount;
      } else if (txn.type === 'refund') {
        return balance + txn.amount;
      }
    }
    return balance;
  }, 0);
};

/**
 * الحصول على حالة الدفع
 */
export const getPaymentStatusLabel = (status: string): string => {
  const labels: Record<string, string> = {
    pending: 'قيد الانتظار',
    completed: 'مكتمل',
    failed: 'فشل',
    cancelled: 'ملغى'
  };
  return labels[status] || status;
};

/**
 * الحصول على لون حالة الدفع
 */
export const getPaymentStatusColor = (status: string): string => {
  const colors: Record<string, string> = {
    pending: 'bg-yellow-100 text-yellow-800',
    completed: 'bg-green-100 text-green-800',
    failed: 'bg-red-100 text-red-800',
    cancelled: 'bg-gray-100 text-gray-800'
  };
  return colors[status] || 'bg-gray-100 text-gray-800';
};
