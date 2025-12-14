"use client";

import React from 'react';
import { cn } from '@/lib/utils';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'outlined' | 'elevated' | 'glass';
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  hover?: boolean;
  children: React.ReactNode;
}

const Card: React.FC<CardProps> = ({
  variant = 'default',
  padding = 'md',
  rounded = 'lg',
  hover = false,
  children,
  className,
  ...props
}) => {
  const baseClasses = 'relative overflow-hidden transition-all duration-200';
  
  const variantClasses = {
    default: 'bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800',
    outlined: 'bg-transparent border-2 border-gray-300 dark:border-gray-700',
    elevated: 'bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-lg',
    glass: 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border border-gray-200/50 dark:border-gray-800/50',
  };
  
  const paddingClasses = {
    none: '',
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6',
    xl: 'p-8',
  };
  
  const roundedClasses = {
    none: 'rounded-none',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    xl: 'rounded-xl',
    '2xl': 'rounded-2xl',
  };
  
  const hoverClasses = hover ? 'hover:shadow-md hover:-translate-y-1 cursor-pointer' : '';
  
  const classes = cn(
    baseClasses,
    variantClasses[variant],
    paddingClasses[padding],
    roundedClasses[rounded],
    hoverClasses,
    className
  );
  
  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
};

export const CardHeader: React.FC<{ className?: string; children: React.ReactNode }> = ({
  className,
  children
}) => (
  <div className={cn('flex flex-col space-y-1.5 pb-4', className)}>
    {children}
  </div>
);

export const CardTitle: React.FC<{ className?: string; children: React.ReactNode }> = ({
  className,
  children
}) => (
  <h3 className={cn('text-lg font-semibold leading-none tracking-tight', className)}>
    {children}
  </h3>
);

export const CardDescription: React.FC<{ className?: string; children: React.ReactNode }> = ({
  className,
  children
}) => (
  <p className={cn('text-sm text-gray-600 dark:text-gray-400', className)}>
    {children}
  </p>
);

export const CardContent: React.FC<{ className?: string; children: React.ReactNode }> = ({
  className,
  children
}) => (
  <div className={cn('pt-0', className)}>
    {children}
  </div>
);

export const CardFooter: React.FC<{ className?: string; children: React.ReactNode }> = ({
  className,
  children
}) => (
  <div className={cn('flex items-center pt-4', className)}>
    {children}
  </div>
);

export default Card;
