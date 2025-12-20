'use client';

import React, { useState, useEffect } from 'react';
import { ArrowLeft, CreditCard, Plus, Edit, Trash2, Shield, Check, Loader } from 'lucide-react';
import Link from 'next/link';
import { API_URL } from '@/utils/api';

interface PaymentMethod {
  id: string;
  type: 'card' | 'bank' | 'wallet';
  title: string;
  last4?: string;
  bankName?: string;
  expiryDate?: string;
  isDefault: boolean;
}

const getIcon = (type: string) => {
  switch (type) {
    case 'card': return <CreditCard className="w-5 h-5" />;
    case 'bank': return <Shield className="w-5 h-5" />;
    case 'wallet': return <Shield className="w-5 h-5" />;
    default: return <CreditCard className="w-5 h-5" />;
  }
};

export default function PaymentMethodsPage() {
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    const fetchPaymentMethods = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`${API_URL}/api/profile/payment-methods`);
        if (response.ok) {
          const data = await response.json();
          setPaymentMethods(data);
        }
      } catch (error) {
        console.error('خطأ في جلب طرق الدفع:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPaymentMethods();
  }, []);

  const handleDelete = (id: string) => {
    setPaymentMethods(prev => prev.filter(method => method.id !== id));
  };

  const handleSetDefault = (id: string) => {
    setPaymentMethods(prev => prev.map(method => ({
      ...method,
      isDefault: method.id === id
    })));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/profile" className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition">
              <ArrowLeft className="w-5 h-5" />
              العودة للملف الشخصي
            </Link>
            
            <h1 className="text-xl font-bold text-gray-900">طرق الدفع</h1>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Add Payment Method Button */}
        <div className="mb-6">
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="w-full md:w-auto px-6 py-3 bg-ray-blue text-white rounded-lg hover:bg-blue-600 transition flex items-center justify-center gap-2"
          >
            <Plus className="w-5 h-5" />
            إضافة طريقة دفع جديدة
          </button>
        </div>

        {/* Add Payment Method Form */}
        {showAddForm && (
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 mb-6">
            <h3 className="font-bold text-gray-900 mb-4">إضافة طريقة دفع جديدة</h3>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  نوع طريقة الدفع
                </label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ray-blue">
                  <option value="card">بطاقة ائتمان/خصم مباشر</option>
                  <option value="bank">حساب بنكي</option>
                  <option value="wallet">محفظة إلكترونية</option>
                </select>
              </div>

              {/* Card Fields */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    اسم حامل البطاقة
                  </label>
                  <input
                    type="text"
                    placeholder="الاسم كما يظهر على البطاقة"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ray-blue"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    رقم البطاقة
                  </label>
                  <input
                    type="text"
                    placeholder="0000 0000 0000 0000"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ray-blue"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      تاريخ الانتهاء
                    </label>
                    <input
                      type="text"
                      placeholder="MM/YY"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ray-blue"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      CVV
                    </label>
                    <input
                      type="text"
                      placeholder="123"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ray-blue"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-ray-blue text-white rounded-lg hover:bg-blue-600 transition"
                >
                  حفظ طريقة الدفع
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Payment Methods List */}
        {paymentMethods.length === 0 ? (
          <div className="text-center py-16">
            <CreditCard className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">لا توجد طرق دفع</h3>
            <p className="text-gray-600 mb-6">
              أضف طريقة دفع لتسهيل عملية الشراء
            </p>
            <button
              onClick={() => setShowAddForm(true)}
              className="bg-ray-blue text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition"
            >
              إضافة طريقة دفع
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {paymentMethods.map(method => (
              <div key={method.id} className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    {/* Icon */}
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
                      {getIcon(method.type)}
                    </div>

                    {/* Method Details */}
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="font-bold text-gray-900">{method.title}</h3>
                        {method.isDefault && (
                          <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-medium flex items-center gap-1">
                            <Check className="w-3 h-3" />
                            افتراضي
                          </span>
                        )}
                      </div>
                      
                      <div className="text-gray-600 text-sm">
                        {method.type === 'card' && method.last4 && (
                          <p>**** **** **** {method.last4}</p>
                        )}
                        {method.type === 'card' && method.expiryDate && (
                          <p>تنتهي في {method.expiryDate}</p>
                        )}
                        {method.type === 'bank' && method.bankName && (
                          <p>{method.bankName}</p>
                        )}
                        {method.type === 'wallet' && (
                          <p>محفظة إلكترونية</p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <button className="p-2 text-gray-600 hover:text-blue-600 transition">
                      <Edit className="w-4 h-4" />
                    </button>
                    {!method.isDefault && (
                      <button
                        onClick={() => handleSetDefault(method.id)}
                        className="p-2 text-gray-600 hover:text-green-600 transition"
                      >
                        <Check className="w-4 h-4" />
                      </button>
                    )}
                    {paymentMethods.length > 1 && (
                      <button
                        onClick={() => handleDelete(method.id)}
                        className="p-2 text-gray-600 hover:text-red-600 transition"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Security Notice */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <Shield className="w-5 h-5 text-blue-600 mt-0.5" />
            <div>
              <h4 className="font-bold text-blue-900 mb-1">أمان معلوماتك</h4>
              <p className="text-blue-700 text-sm">
                جميع معلومات الدفع مشفرة وآمنة. لا نحتفظ ببيانات بطاقتك على خوادمنا.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
