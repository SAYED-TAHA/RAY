/**
 * نموذج الدفع
 * يسمح للمستخدم بإدخال بيانات الدفع ومعالجة المعاملات
 */

import React, { useState } from 'react';
import { CreditCard, Lock, AlertCircle, CheckCircle, Loader } from 'lucide-react';
import { validateCardData } from '../../services/paymentService';

interface PaymentFormProps {
  amount: number;
  currency?: string;
  onSubmit: (paymentData: any) => Promise<void>;
  isLoading?: boolean;
}

export const PaymentForm: React.FC<PaymentFormProps> = ({
  amount,
  currency = 'EGP',
  onSubmit,
  isLoading = false
}) => {
  const [formData, setFormData] = useState({
    cardNumber: '',
    cardHolder: '',
    expiryDate: '',
    cvv: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let formattedValue = value;

    // تنسيق رقم البطاقة
    if (name === 'cardNumber') {
      formattedValue = value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
    }

    // تنسيق تاريخ الانتهاء
    if (name === 'expiryDate') {
      formattedValue = value.replace(/\D/g, '');
      if (formattedValue.length >= 2) {
        formattedValue = formattedValue.slice(0, 2) + '/' + formattedValue.slice(2, 4);
      }
    }

    // تنسيق CVV
    if (name === 'cvv') {
      formattedValue = value.replace(/\D/g, '').slice(0, 4);
    }

    setFormData(prev => ({
      ...prev,
      [name]: formattedValue
    }));

    // مسح الخطأ عند التعديل
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    // التحقق من البيانات
    const validation = validateCardData(
      formData.cardNumber,
      formData.expiryDate,
      formData.cvv
    );

    if (!validation.valid) {
      const newErrors: Record<string, string> = {};
      validation.errors.forEach(error => {
        if (error.includes('البطاقة')) newErrors.cardNumber = error;
        if (error.includes('تاريخ')) newErrors.expiryDate = error;
        if (error.includes('رمز')) newErrors.cvv = error;
      });
      setErrors(newErrors);
      return;
    }

    // التحقق من اسم حامل البطاقة
    if (!formData.cardHolder.trim()) {
      setErrors(prev => ({
        ...prev,
        cardHolder: 'اسم حامل البطاقة مطلوب'
      }));
      return;
    }

    try {
      setIsSubmitting(true);
      await onSubmit(formData);
      setSuccess(true);
      setTimeout(() => {
        setFormData({
          cardNumber: '',
          cardHolder: '',
          expiryDate: '',
          cvv: ''
        });
        setSuccess(false);
      }, 2000);
    } catch (error) {
      setErrors(prev => ({
        ...prev,
        submit: 'فشل معالجة الدفع. يرجى المحاولة لاحقاً.'
      }));
    } finally {
      setIsSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="p-4 bg-green-100 rounded-full mb-4">
          <CheckCircle className="w-8 h-8 text-green-600" />
        </div>
        <h3 className="text-xl font-bold text-gray-800 mb-2">تم الدفع بنجاح!</h3>
        <p className="text-gray-600">تم معالجة عملية الدفع بنجاح</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Amount Display */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
        <p className="text-sm text-gray-600 mb-2">المبلغ المستحق</p>
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-bold text-gray-900">{amount}</span>
          <span className="text-lg text-gray-600">{currency}</span>
        </div>
      </div>

      {/* Card Number */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          رقم البطاقة
        </label>
        <div className="relative">
          <CreditCard className="absolute right-3 top-3 w-5 h-5 text-gray-400" />
          <input
            type="text"
            name="cardNumber"
            placeholder="1234 5678 9012 3456"
            value={formData.cardNumber}
            onChange={handleInputChange}
            maxLength={19}
            className={`w-full pr-10 pl-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition ${
              errors.cardNumber
                ? 'border-red-300 focus:ring-red-200'
                : 'border-gray-300 focus:ring-blue-200'
            }`}
            disabled={isSubmitting || isLoading}
          />
        </div>
        {errors.cardNumber && (
          <p className="text-sm text-red-600 mt-1 flex items-center gap-1">
            <AlertCircle className="w-4 h-4" />
            {errors.cardNumber}
          </p>
        )}
      </div>

      {/* Card Holder */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          اسم حامل البطاقة
        </label>
        <input
          type="text"
          name="cardHolder"
          placeholder="أحمد محمد"
          value={formData.cardHolder}
          onChange={handleInputChange}
          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition ${
            errors.cardHolder
              ? 'border-red-300 focus:ring-red-200'
              : 'border-gray-300 focus:ring-blue-200'
          }`}
          disabled={isSubmitting || isLoading}
        />
        {errors.cardHolder && (
          <p className="text-sm text-red-600 mt-1 flex items-center gap-1">
            <AlertCircle className="w-4 h-4" />
            {errors.cardHolder}
          </p>
        )}
      </div>

      {/* Expiry Date and CVV */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            تاريخ الانتهاء
          </label>
          <input
            type="text"
            name="expiryDate"
            placeholder="MM/YY"
            value={formData.expiryDate}
            onChange={handleInputChange}
            maxLength={5}
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition ${
              errors.expiryDate
                ? 'border-red-300 focus:ring-red-200'
                : 'border-gray-300 focus:ring-blue-200'
            }`}
            disabled={isSubmitting || isLoading}
          />
          {errors.expiryDate && (
            <p className="text-sm text-red-600 mt-1 flex items-center gap-1">
              <AlertCircle className="w-4 h-4" />
              {errors.expiryDate}
            </p>
          )}
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            رمز الأمان (CVV)
          </label>
          <input
            type="text"
            name="cvv"
            placeholder="123"
            value={formData.cvv}
            onChange={handleInputChange}
            maxLength={4}
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition ${
              errors.cvv
                ? 'border-red-300 focus:ring-red-200'
                : 'border-gray-300 focus:ring-blue-200'
            }`}
            disabled={isSubmitting || isLoading}
          />
          {errors.cvv && (
            <p className="text-sm text-red-600 mt-1 flex items-center gap-1">
              <AlertCircle className="w-4 h-4" />
              {errors.cvv}
            </p>
          )}
        </div>
      </div>

      {/* General Error */}
      {errors.submit && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-700">
          <AlertCircle className="w-5 h-5" />
          {errors.submit}
        </div>
      )}

      {/* Security Notice */}
      <div className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
        <Lock className="w-4 h-4" />
        بيانات البطاقة محمية بتشفير SSL 256-bit
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting || isLoading}
        className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {isSubmitting || isLoading ? (
          <>
            <Loader className="w-5 h-5 animate-spin" />
            جاري معالجة الدفع...
          </>
        ) : (
          <>
            <Lock className="w-5 h-5" />
            إتمام الدفع
          </>
        )}
      </button>
    </form>
  );
};

export default PaymentForm;
