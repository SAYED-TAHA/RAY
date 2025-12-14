'use client';

import { useEffect } from 'react';

interface PerformanceMetrics {
  fcp: number; // First Contentful Paint
  lcp: number; // Largest Contentful Paint
  fid: number; // First Input Delay
  cls: number; // Cumulative Layout Shift
  ttfb: number; // Time to First Byte
}

const PerformanceMonitor = () => {
  useEffect(() => {
    if (typeof window === 'undefined' || !('performance' in window)) return;

    const measurePerformance = () => {
      const metrics: Partial<PerformanceMetrics> = {};

      // First Contentful Paint
      const fcpEntry = performance.getEntriesByName('first-contentful-paint')[0] as PerformanceEntry;
      if (fcpEntry) {
        metrics.fcp = Math.round(fcpEntry.startTime);
      }

      // Largest Contentful Paint
      if ('PerformanceObserver' in window) {
        const lcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1];
          metrics.lcp = Math.round(lastEntry.startTime);
        });
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

        // First Input Delay
        const fidObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          entries.forEach((entry: any) => {
            if (entry.name === 'first-input') {
              metrics.fid = Math.round(entry.processingStart - entry.startTime);
            }
          });
        });
        fidObserver.observe({ entryTypes: ['first-input'] });

        // Cumulative Layout Shift
        let clsValue = 0;
        const clsObserver = new PerformanceObserver((list) => {
          list.getEntries().forEach((entry: any) => {
            if (!entry.hadRecentInput) {
              clsValue += entry.value;
              metrics.cls = Math.round(clsValue * 1000) / 1000;
            }
          });
        });
        clsObserver.observe({ entryTypes: ['layout-shift'] });
      }

      // Time to First Byte
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      if (navigation) {
        metrics.ttfb = Math.round(navigation.responseStart - navigation.requestStart);
      }

      // Send metrics to analytics (optional)
      setTimeout(() => {
        if (Object.keys(metrics).length > 0) {
          console.log('Performance Metrics:', metrics);
          // Send to your analytics service
          // sendToAnalytics(metrics);
        }
      }, 3000);
    };

    // Measure after page load
    if (document.readyState === 'complete') {
      setTimeout(measurePerformance, 0);
    } else {
      window.addEventListener('load', measurePerformance);
      return () => window.removeEventListener('load', measurePerformance);
    }
  }, []);

  return null;
};

export default PerformanceMonitor;
