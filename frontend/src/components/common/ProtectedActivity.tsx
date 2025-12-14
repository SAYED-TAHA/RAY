/**
 * مكون محمي للأنشطة
 * يتحقق من صلاحيات الاشتراك قبل عرض النشاط
 */

import React from 'react';
import { AlertCircle, Lock, CreditCard } from 'lucide-react';
import { useSubscription } from '../../context/SubscriptionContext';
import { checkActivityAccess } from '../../services/subscriptionService';

interface ProtectedActivityProps {
  activityType: string;
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export const ProtectedActivity: React.FC<ProtectedActivityProps> = ({
  activityType,
  children,
  fallback
}) => {
  const { userSubscription, currentPlan } = useSubscription();
  const accessCheck = checkActivityAccess(userSubscription, activityType);

  if (!accessCheck.hasAccess) {
    return (
      fallback || (
        <div className="flex flex-col items-center justify-center h-full bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8">
          <div className="text-center max-w-md">
            <div className="flex justify-center mb-4">
              <div className="p-4 bg-red-100 rounded-full">
                <Lock className="w-8 h-8 text-red-600" />
              </div>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              هذا النشاط غير متاح
            </h3>
            <p className="text-gray-600 mb-6">
              {accessCheck.reason || 'لا توجد صلاحيات كافية للوصول إلى هذا النشاط'}
            </p>
            <div className="bg-white rounded-xl p-4 mb-6 border border-gray-200">
              <p className="text-sm text-gray-700 mb-2">
                <strong>الباقة الحالية:</strong> {currentPlan?.name || 'بدون اشتراك'}
              </p>
              <p className="text-sm text-gray-600">
                {currentPlan?.description}
              </p>
            </div>
            <button className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition font-semibold">
              <CreditCard className="w-5 h-5" />
              ترقية الباقة
            </button>
          </div>
        </div>
      )
    );
  }

  return <>{children}</>;
};

export default ProtectedActivity;
