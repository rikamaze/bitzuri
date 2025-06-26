"use client";

import { useEffect } from 'react';

// Web Vitals metrics
interface WebVitalsMetric {
  id: string;
  name: string;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  delta: number;
  entries: PerformanceEntry[];
}

// Function to report Web Vitals
const reportWebVitals = (metric: WebVitalsMetric) => {
  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.log(`Web Vital: ${metric.name}`, metric);
  }
  
  // In production, you would send this to your analytics service
  // Example: sendToAnalytics(metric);
};

// Hook to measure and report component render time
export function useRenderPerformance(componentName: string) {
  useEffect(() => {
    const startTime = performance.now();
    
    return () => {
      const endTime = performance.now();
      const renderTime = endTime - startTime;
      
      if (process.env.NODE_ENV === 'development') {
        console.log(`Render time for ${componentName}: ${renderTime.toFixed(2)}ms`);
      }
      
      // You could also send this to your analytics in production
    };
  }, [componentName]);
}

// Function to measure execution time of any function
export function measurePerformance<T extends (...args: any[]) => any>(
  fn: T,
  name: string
): (...args: Parameters<T>) => ReturnType<T> {
  return (...args: Parameters<T>): ReturnType<T> => {
    const start = performance.now();
    const result = fn(...args);
    const end = performance.now();
    
    if (process.env.NODE_ENV === 'development') {
      console.log(`${name} execution time: ${(end - start).toFixed(2)}ms`);
    }
    
    return result;
  };
}

// Hook to initialize web vitals reporting
export function useWebVitals() {
  useEffect(() => {
    // Only import in the browser
    if (typeof window !== 'undefined') {
      import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
        getCLS(reportWebVitals);
        getFID(reportWebVitals);
        getFCP(reportWebVitals);
        getLCP(reportWebVitals);
        getTTFB(reportWebVitals);
      });
    }
  }, []);
}