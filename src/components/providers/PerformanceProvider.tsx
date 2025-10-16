'use client';

import { useEffect } from 'react';

// Performance monitoring and web vitals
export function PerformanceProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Only run in production
    if (process.env.NODE_ENV !== 'production') return;

    // Dynamic import to avoid affecting bundle size in development
    import('web-vitals').then(({ onCLS, onINP, onFCP, onLCP, onTTFB }) => {
      function sendToAnalytics(metric: { name: string; value: number; id: string }) {
        // Replace with your analytics service
        console.log('Web Vital:', metric);
        
        // Example: Send to Google Analytics
        // gtag('event', metric.name, {
        //   value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
        //   event_label: metric.id,
        //   non_interaction: true,
        // });
      }

      onCLS(sendToAnalytics);
      onINP(sendToAnalytics);
      onFCP(sendToAnalytics);
      onLCP(sendToAnalytics);
      onTTFB(sendToAnalytics);
    }).catch(() => {
      // Silently fail if web-vitals is not available
    });
  }, []);

  return <>{children}</>;
}
