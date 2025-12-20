/**
 * Context لإدارة الدفع والمعاملات المالية
 * يوفر معلومات الدفع والمحفظة والفواتير
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  PaymentMethod,
  Transaction,
  Invoice,
  Wallet,
  processSubscriptionPayment,
  processInvoicePayment,
  calculateWalletBalance
} from '../services/paymentService';
import { API_URL } from '@/utils/api';

interface PaymentContextType {
  paymentMethods: PaymentMethod[];
  wallet: Wallet | null;
  transactions: Transaction[];
  invoices: Invoice[];
  isLoading: boolean;
  addPaymentMethod: (method: PaymentMethod) => void;
  removePaymentMethod: (methodId: string) => void;
  setDefaultPaymentMethod: (methodId: string) => void;
  processSubscriptionPayment: (planId: string, methodId: string, amount: number) => Promise<boolean>;
  processInvoicePayment: (invoiceId: string, methodId: string, amount: number) => Promise<boolean>;
  getTransactionHistory: (limit?: number) => Transaction[];
  getPendingInvoices: () => Invoice[];
}

const PaymentContext = createContext<PaymentContextType | undefined>(undefined);

export const PaymentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [wallet, setWallet] = useState<Wallet | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadPaymentData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`${API_URL}/api/payments/data`);
        if (response.ok) {
          const data = await response.json();
          setPaymentMethods(data.paymentMethods || []);
          setWallet(data.wallet || null);
          setTransactions(data.transactions || []);
          setInvoices(data.invoices || []);
        }
      } catch (error) {
        console.error('خطأ في جلب بيانات الدفع:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadPaymentData();
  }, []);

  const addPaymentMethod = (method: PaymentMethod) => {
    setPaymentMethods([...paymentMethods, method]);
  };

  const removePaymentMethod = (methodId: string) => {
    setPaymentMethods(paymentMethods.filter(m => m.id !== methodId));
  };

  const setDefaultPaymentMethod = (methodId: string) => {
    setPaymentMethods(
      paymentMethods.map(m => ({
        ...m,
        isDefault: m.id === methodId
      }))
    );
  };

  const processSubscriptionPaymentHandler = async (
    planId: string,
    methodId: string,
    amount: number
  ): Promise<boolean> => {
    try {
      const method = paymentMethods.find(m => m.id === methodId);
      if (!method) throw new Error('طريقة الدفع غير موجودة');

      const result = await processSubscriptionPayment('user-001', planId, method, amount);
      
      if (result.success && result.transactionId) {
        const newTransaction: Transaction = {
          id: result.transactionId,
          userId: 'user-001',
          type: 'subscription',
          amount,
          currency: 'EGP',
          status: 'completed',
          paymentMethod: method,
          description: `دفع اشتراك الخطة ${planId}`,
          createdAt: new Date().toISOString(),
          completedAt: new Date().toISOString()
        };
        
        setTransactions([newTransaction, ...transactions]);
        
        if (wallet) {
          setWallet({
            ...wallet,
            balance: calculateWalletBalance([newTransaction, ...transactions]),
            lastUpdated: new Date().toISOString()
          });
        }
        
        return true;
      }
      return false;
    } catch (error) {
      console.error('خطأ في معالجة الدفع:', error);
      return false;
    }
  };

  const processInvoicePaymentHandler = async (
    invoiceId: string,
    methodId: string,
    amount: number
  ): Promise<boolean> => {
    try {
      const method = paymentMethods.find(m => m.id === methodId);
      if (!method) throw new Error('طريقة الدفع غير موجودة');

      const result = await processInvoicePayment(invoiceId, method, amount);
      
      if (result.success && result.transactionId) {
        const newTransaction: Transaction = {
          id: result.transactionId,
          userId: 'user-001',
          type: 'payment',
          amount,
          currency: 'EGP',
          status: 'completed',
          paymentMethod: method,
          description: `دفع الفاتورة ${invoiceId}`,
          createdAt: new Date().toISOString(),
          completedAt: new Date().toISOString()
        };
        
        setTransactions([newTransaction, ...transactions]);
        
        // تحديث حالة الفاتورة
        setInvoices(
          invoices.map(inv =>
            inv.id === invoiceId
              ? { ...inv, status: 'paid', paidDate: new Date().toISOString().split('T')[0] }
              : inv
          )
        );
        
        if (wallet) {
          setWallet({
            ...wallet,
            balance: calculateWalletBalance([newTransaction, ...transactions]),
            lastUpdated: new Date().toISOString()
          });
        }
        
        return true;
      }
      return false;
    } catch (error) {
      console.error('خطأ في معالجة الدفع:', error);
      return false;
    }
  };

  const getTransactionHistory = (limit: number = 10): Transaction[] => {
    return transactions.slice(0, limit);
  };

  const getPendingInvoices = (): Invoice[] => {
    return invoices.filter(inv => inv.status === 'sent' || inv.status === 'overdue');
  };

  const value: PaymentContextType = {
    paymentMethods,
    wallet,
    transactions,
    invoices,
    isLoading,
    addPaymentMethod,
    removePaymentMethod,
    setDefaultPaymentMethod,
    processSubscriptionPayment: processSubscriptionPaymentHandler,
    processInvoicePayment: processInvoicePaymentHandler,
    getTransactionHistory,
    getPendingInvoices
  };

  return (
    <PaymentContext.Provider value={value}>
      {children}
    </PaymentContext.Provider>
  );
};

export const usePayment = () => {
  const context = useContext(PaymentContext);
  if (!context) {
    throw new Error('usePayment يجب أن يكون داخل PaymentProvider');
  }
  return context;
};
