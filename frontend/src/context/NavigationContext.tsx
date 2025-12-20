/**
 * Context لإدارة التوجيه والملاحة
 * يوفر معلومات التوجيه والأنشطة المتاحة
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile, UserActivity, ACTIVITY_ROUTES, buildNavigationPath } from '../services/registrationService';
import { API_URL } from '@/utils/api';

interface NavigationContextType {
  userProfile: UserProfile | null;
  currentActivity: UserActivity | null;
  activities: UserActivity[];
  isLoading: boolean;
  setCurrentActivity: (activity: UserActivity) => void;
  getActivityRoute: (activityType: string) => string;
  navigateToActivity: (activity: UserActivity) => void;
  addActivity: (activity: UserActivity) => void;
  removeActivity: (activityId: string) => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export const NavigationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [currentActivity, setCurrentActivityState] = useState<UserActivity | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadUserProfile = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`${API_URL}/api/users/profile`);
        if (response.ok) {
          const data = await response.json();
          setUserProfile(data);
          if (data.activities && data.activities.length > 0) {
            setCurrentActivityState(data.activities[0]);
          }
        }
      } catch (error) {
        console.error('خطأ في جلب بيانات المستخدم:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadUserProfile();
  }, []);

  const setCurrentActivity = (activity: UserActivity) => {
    setCurrentActivityState(activity);
  };

  const getActivityRoute = (activityType: string): string => {
    return ACTIVITY_ROUTES[activityType] || '/dashboard';
  };

  const navigateToActivity = (activity: UserActivity) => {
    setCurrentActivityState(activity);
    // في الواقع، سيتم التوجيه باستخدام Next.js router
    // router.push(getActivityRoute(activity.activityType));
  };

  const addActivity = (activity: UserActivity) => {
    if (userProfile) {
      setUserProfile({
        ...userProfile,
        activities: [...userProfile.activities, activity],
        updatedAt: new Date().toISOString()
      });
    }
  };

  const removeActivity = (activityId: string) => {
    if (userProfile) {
      setUserProfile({
        ...userProfile,
        activities: userProfile.activities.filter(a => a.id !== activityId),
        updatedAt: new Date().toISOString()
      });
    }
  };

  const value: NavigationContextType = {
    userProfile,
    currentActivity,
    activities: userProfile?.activities || [],
    isLoading,
    setCurrentActivity,
    getActivityRoute,
    navigateToActivity,
    addActivity,
    removeActivity
  };

  return (
    <NavigationContext.Provider value={value}>
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigation = () => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigation يجب أن يكون داخل NavigationProvider');
  }
  return context;
};
