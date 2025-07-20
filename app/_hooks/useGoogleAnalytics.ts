'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { trackPageView } from '../_components/GoogleAnalytics';
import { GA_ENABLED } from '../lib/analytics';

export default function useGoogleAnalytics() {
  const pathname = usePathname();

  useEffect(() => {
    // Only track if GA is enabled
    if (GA_ENABLED) {
      // Track page view on route change
      trackPageView(pathname);
    }
  }, [pathname]);

  return null;
}
