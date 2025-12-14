'use client';

import React, { useState, useEffect, useRef } from 'react';

interface ProgressiveLoadingProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  delay?: number;
  threshold?: number;
}

export const ProgressiveLoading: React.FC<ProgressiveLoadingProps> = ({
  children,
  fallback,
  delay = 200,
  threshold = 0.1
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [showFallback, setShowFallback] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Delay showing to prevent flickering
          const timer = setTimeout(() => {
            setIsVisible(true);
          }, delay);
          
          // Show fallback after delay if not loaded
          const fallbackTimer = setTimeout(() => {
            if (!isVisible) {
              setShowFallback(true);
            }
          }, delay + 1000);
          
          return () => {
            clearTimeout(timer);
            clearTimeout(fallbackTimer);
          };
        }
      },
      { threshold }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [delay, threshold, isVisible]);

  return (
    <div ref={elementRef} className="w-full h-full">
      {isVisible ? children : (showFallback && fallback)}
    </div>
  );
};

// Staggered loading for multiple items
export const StaggeredLoading: React.FC<{
  children: React.ReactNode[];
  itemDelay?: number;
  fallback?: React.ReactNode;
}> = ({ children, itemDelay = 100, fallback }) => {
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set());

  useEffect(() => {
    children.forEach((_, index) => {
      const timer = setTimeout(() => {
        setVisibleItems(prev => new Set(prev).add(index));
      }, index * itemDelay);
      
      return () => clearTimeout(timer);
    });
  }, [children, itemDelay]);

  return (
    <>
      {children.map((child, index) => (
        <div
          key={index}
          className={`transition-opacity duration-300 ${
            visibleItems.has(index) ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {visibleItems.has(index) ? child : (fallback)}
        </div>
      ))}
    </>
  );
};

export default ProgressiveLoading;
