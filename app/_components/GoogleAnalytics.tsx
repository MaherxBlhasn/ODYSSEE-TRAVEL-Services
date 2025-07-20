'use client';

import Script from 'next/script';
import { GA_TRACKING_ID, GA_ENABLED, GA_CONFIG } from '../lib/analytics';

export default function GoogleAnalytics() {
  // Debug logging only in development
  if (process.env.NODE_ENV === 'development') {
    console.log('🔍 GoogleAnalytics component render check:');
    console.log('- GA_ENABLED:', GA_ENABLED);
    console.log('- GA_TRACKING_ID:', GA_TRACKING_ID);
    console.log('- NODE_ENV:', process.env.NODE_ENV);
  }

  // Only render when enabled
  if (!GA_ENABLED) {
    if (process.env.NODE_ENV === 'development') {
      console.log('❌ GA not enabled, component returning null');
    }
    return null;
  }

  if (process.env.NODE_ENV === 'development') {
    console.log('✅ GA enabled, rendering scripts');
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
        strategy="afterInteractive"
        onLoad={() => {
          if (process.env.NODE_ENV === 'development') {
            console.log('✅ GA script loaded successfully');
          }
        }}
        onError={(e) => {
          if (process.env.NODE_ENV === 'development') {
            console.error('❌ GA script failed to load:', e);
          }
        }}
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          ${process.env.NODE_ENV === 'development' ? "console.log('🔧 Initializing gtag...');" : ''}
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_TRACKING_ID}', ${JSON.stringify(GA_CONFIG)});
          ${process.env.NODE_ENV === 'development' ? "console.log('✅ gtag initialized');" : ''}
        `}
      </Script>
    </>
  );
}

// Helper function to track page views (for client-side navigation)
export const trackPageView = (url: string) => {
  if (typeof window !== 'undefined' && window.gtag && GA_ENABLED) {
    window.gtag('config', GA_TRACKING_ID, {
      page_path: url,
      page_title: document.title,
      page_location: window.location.href,
    });
  }
};

// Helper function to track custom events
export const trackEvent = (action: string, category: string, label?: string, value?: number) => {
  if (typeof window !== 'undefined' && window.gtag && GA_ENABLED) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// Helper function to track conversions
export const trackConversion = (conversionId: string, value?: number, currency: string = 'USD') => {
  if (typeof window !== 'undefined' && window.gtag && GA_ENABLED) {
    window.gtag('event', 'conversion', {
      send_to: conversionId,
      value: value,
      currency: currency,
    });
  }
};

// Declare gtag for TypeScript
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}
