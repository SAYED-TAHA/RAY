'use client';

import React, { useEffect, useState } from 'react';
import { Percent, Plus, Edit, Trash2, Copy, Check } from 'lucide-react';
import Link from 'next/link';
import { createAdminDiscount, deleteAdminDiscount, fetchAdminDiscounts, updateAdminDiscount, type AdminDiscount } from '../../../services/adminDiscountsService';

export default function AdminDiscounts() {
  const [discounts, setDiscounts] = useState<AdminDiscount[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const load = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchAdminDiscounts(200);
      setDiscounts(Array.isArray(data) ? data : []);
    } catch (e: any) {
      console.error('Failed to load discounts:', e);
      setError(e?.message || 'فشل تحميل الخصومات');
      setDiscounts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleCopy = async (code: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedCode(code);
      setTimeout(() => setCopiedCode(null), 1500);
    } catch (e) {
      console.error('Copy failed:', e);
    }
  };

  const handleCreate = async () => {
    const code = window.prompt('كود الخصم (مثال: SAVE10):');
    if (!code) return;
    const typeInput = window.prompt('النوع: percentage أو fixed', 'percentage');
    const type = (typeInput === 'fixed' ? 'fixed' : 'percentage') as 'percentage' | 'fixed';
    const valueStr = window.prompt(type === 'percentage' ? 'قيمة الخصم (%)' : 'قيمة الخصم (ج.م)');
    const value = valueStr ? Number(valueStr) : NaN;
    if (!Number.isFinite(value)) {
      alert('قيمة الخصم غير صحيحة');
      return;
    }
    const maxUseStr = window.prompt('الحد الأقصى للاستخدام (اختياري، اتركه فارغ = 0):', '0');
    const maxUse = maxUseStr ? Number(maxUseStr) : 0;
    const expiryDate = window.prompt('تاريخ الانتهاء (YYYY-MM-DD) اختياري:', '');

    try {
      setSaving(true);
      setError(null);
      await createAdminDiscount({
        code,
        type,
        value,
        maxUse: Number.isFinite(maxUse) ? maxUse : 0,
        expiryDate: expiryDate ? expiryDate : null
      });
      await load();
    } catch (e: any) {
      console.error('Create discount failed:', e);
      setError(e?.message || 'فشل إنشاء الخصم');
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = async (discount: AdminDiscount) => {
    const code = window.prompt('كود الخصم:', discount.code);
    if (!code) return;
    const typeInput = window.prompt('النوع: percentage أو fixed', discount.type);
    const type = (typeInput === 'fixed' ? 'fixed' : 'percentage') as 'percentage' | 'fixed';
    const valueStr = window.prompt(type === 'percentage' ? 'قيمة الخصم (%)' : 'قيمة الخصم (ج.م)', String(discount.value));
    const value = valueStr ? Number(valueStr) : NaN;
    if (!Number.isFinite(value)) {
      alert('قيمة الخصم غير صحيحة');
      return;
    }
    const maxUseStr = window.prompt('الحد الأقصى للاستخدام:', String(discount.maxUse ?? 0));
    const maxUse = maxUseStr ? Number(maxUseStr) : 0;
    const statusInput = window.prompt('الحالة: active / expired / disabled', discount.status);
    const status = (statusInput === 'disabled' ? 'disabled' : statusInput === 'expired' ? 'expired' : 'active') as any;
    const expiryDate = window.prompt('تاريخ الانتهاء (YYYY-MM-DD) اختياري:', discount.expiry || '');

    try {
      setSaving(true);
      setError(null);
      await updateAdminDiscount(discount.id, {
        code,
        type,
        value,
        maxUse: Number.isFinite(maxUse) ? maxUse : 0,
        status,
        expiryDate: expiryDate ? expiryDate : null
      });
      await load();
    } catch (e: any) {
      console.error('Update discount failed:', e);
      setError(e?.message || 'فشل تعديل الخصم');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (discount: AdminDiscount) => {
    if (!window.confirm('هل أنت متأكد من حذف هذا الخصم؟')) return;
    try {
      setSaving(true);
      setError(null);
      await deleteAdminDiscount(discount.id);
      await load();
    } catch (e: any) {
      console.error('Delete discount failed:', e);
      setError(e?.message || 'فشل حذف الخصم');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center gap-4">
                <Link href="/admin" className="p-2 hover:bg-gray-100 rounded-lg transition">
                  <Percent className="w-6 h-6 text-gray-600" />
                </Link>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">الخصومات</h1>
                  <p className="text-sm text-gray-600">إدارة أكواد وخصومات الترويج</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 text-center text-gray-600">
            جاري تحميل الخصومات...
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center gap-4">
                <Link href="/admin" className="p-2 hover:bg-gray-100 rounded-lg transition">
                  <Percent className="w-6 h-6 text-gray-600" />
                </Link>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">الخصومات</h1>
                  <p className="text-sm text-gray-600">إدارة أكواد وخصومات الترويج</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-red-50 rounded-xl p-6 border border-red-200 text-red-700 text-center">
            {error}
            <button onClick={load} className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
              إعادة المحاولة
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link href="/admin" className="p-2 hover:bg-gray-100 rounded-lg transition">
                <Percent className="w-6 h-6 text-gray-600" />
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">الخصومات</h1>
                <p className="text-sm text-gray-600">إدارة أكواد وخصومات الترويج</p>
              </div>
            </div>
            <button
              onClick={handleCreate}
              disabled={saving}
              className={`flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition ${saving ? 'opacity-60' : ''}`}
            >
              <Plus className="w-4 h-4" />
              خصم جديد
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-4">
          {discounts.length === 0 ? (
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 text-center text-gray-600">
              لا توجد خصومات
            </div>
          ) : (
            discounts.map((discount) => (
            <div key={discount.id} className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-purple-100 rounded-lg">
                    <Percent className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{discount.code}</h3>
                    <p className="text-sm text-gray-600">
                      {discount.type === 'percentage' ? `خصم ${discount.value}%` : `خصم ${discount.value} ج.م`}
                    </p>
                  </div>
                </div>
                <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                  discount.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                }`}>
                  {discount.status === 'active' ? 'نشط' : 'منتهي'}
                </span>
              </div>
              
              <div className="grid grid-cols-4 gap-4 mb-4">
                <div>
                  <p className="text-xs text-gray-600">الاستخدام</p>
                  <p className="font-medium text-gray-900">{discount.usage}/{discount.maxUse}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600">النسبة</p>
                  <p className="font-medium text-gray-900">
                    {discount.maxUse > 0 ? ((discount.usage / discount.maxUse) * 100).toFixed(0) : '0'}%
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-600">الصلاحية</p>
                  <p className="font-medium text-gray-900">{discount.expiry || '—'}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleCopy(discount.code)}
                    className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                  >
                    {copiedCode === discount.code ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </button>
                  <button
                    onClick={() => handleEdit(discount)}
                    disabled={saving}
                    className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition ${saving ? 'opacity-60' : ''}`}
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(discount)}
                    disabled={saving}
                    className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition ${saving ? 'opacity-60' : ''}`}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
