'use client';

import { useEffect } from 'react';
import { GA_TRACKING_ID, GA_ENABLED, GA_DEBUG } from '../lib/analytics';

export default function AnalyticsDebug() {
  useEffect(() => {
    // Only log in development mode
    if (process.env.NODE_ENV === 'development') {
      console.group('🔍 Google Analytics Debug Info');
      console.log('📊 Tracking ID:', GA_TRACKING_ID);
      console.log('✅ Enabled:', GA_ENABLED ? 'Yes' : 'No');
      console.log('🐛 Debug Mode:', GA_DEBUG ? 'Yes' : 'No');
      console.log('🌍 Environment:', process.env.NODE_ENV);
      console.log('🔧 gtag available:', typeof window !== 'undefined' && !!window.gtag ? 'Yes' : 'No');
      console.groupEnd();
    }
  }, []);

  // Return null - no visible component
  return null;
}
