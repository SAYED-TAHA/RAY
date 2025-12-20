/**
 * Context لإدارة الاشتراكات والباقات
 * يوفر معلومات الاشتراك للتطبيق بالكامل
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserSubscription, SubscriptionPlan, SUBSCRIPTION_PLANS, checkActivityAccess, getAvailableFeatures } from '../services/subscriptionService';
import { API_URL } from '@/utils/api';

interface SubscriptionContextType {
  userSubscription: UserSubscription | null;
  currentPlan: SubscriptionPlan | null;
  isLoading: boolean;
  hasActivityAccess: (activityType: string) => boolean;
  getActivityFeatures: (activityType: string) => string[];
  updateSubscription: (subscription: UserSubscription) => void;
  renewSubscription: (planId: string) => Promise<void>;
  cancelSubscription: () => Promise<void>;
}

const SubscriptionContext = createContext<SubscriptionContextType | undefined>(undefined);

export const SubscriptionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userSubscription, setUserSubscription] = useState<UserSubscription | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadSubscription = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`${API_URL}/api/subscriptions/current`);
        if (response.ok) {
          const data = await response.json();
          setUserSubscription(data);
        }
      } catch (error) {
        console.error('خطأ في جلب بيانات الاشتراك:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadSubscription();
  }, []);

  const currentPlan = userSubscription 
    ? SUBSCRIPTION_PLANS.find(p => p.id === userSubscription.planId) || null
    : null;

  const hasActivityAccess = (activityType: string): boolean => {
    const result = checkActivityAccess(userSubscription, activityType);
    return result.hasAccess;
  };

  const getActivityFeatures = (activityType: string): string[] => {
    return getAvailableFeatures(userSubscription, activityType);
  };

  const updateSubscription = (subscription: UserSubscription) => {
    setUserSubscription(subscription);
  };

  const renewSubscription = async (planId: string) => {
    try {
      // في الواقع، سيتم إرسال طلب تجديد إلى الخادم
      // const response = await fetch('/api/subscriptions/renew', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ planId })
      // });
      // const data = await response.json();
      // setUserSubscription(data);

      // للآن، نحدث البيانات التجريبية
      if (userSubscription) {
        const newEndDate = new Date();
        newEndDate.setMonth(newEndDate.getMonth() + 1);
        setUserSubscription({
          ...userSubscription,
          planId,
          endDate: newEndDate.toISOString().split('T')[0],
          status: 'active'
        });
      }
    } catch (error) {
      console.error('خطأ في تجديد الاشتراك:', error);
      throw error;
    }
  };

  const cancelSubscription = async () => {
    try {
      // في الواقع، سيتم إرسال طلب إلغاء إلى الخادم
      // const response = await fetch('/api/subscriptions/cancel', {
      //   method: 'POST'
      // });
      // const data = await response.json();
      // setUserSubscription(data);

      // للآن، نحدث البيانات التجريبية
      if (userSubscription) {
        setUserSubscription({
          ...userSubscription,
          status: 'cancelled'
        });
      }
    } catch (error) {
      console.error('خطأ في إلغاء الاشتراك:', error);
      throw error;
    }
  };

  const value: SubscriptionContextType = {
    userSubscription,
    currentPlan,
    isLoading,
    hasActivityAccess,
    getActivityFeatures,
    updateSubscription,
    renewSubscription,
    cancelSubscription
  };

  return (
    <SubscriptionContext.Provider value={value}>
      {children}
    </SubscriptionContext.Provider>
  );
};

export const useSubscription = () => {
  const context = useContext(SubscriptionContext);
  if (!context) {
    throw new Error('useSubscription يجب أن يكون داخل SubscriptionProvider');
  }
  return context;
};
