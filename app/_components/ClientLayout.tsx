'use client';

import {NextIntlClientProvider} from 'next-intl';
import Navbar from './Navbar';
import Footer from './Footer';
import SmoothScroll from './SmoothScroll';
import ScrollAnimations from './ScrollAnimations';
import useGoogleAnalytics from '../_hooks/useGoogleAnalytics';
import useAdvancedTracking from '../_hooks/useAdvancedTracking';
import AnalyticsDebug from './AnalyticsDebug';
import GATestPanel from './GATestPanel';

interface ClientLayoutProps {
  children: React.ReactNode;
  messages: any;
  locale: string;
}

export default function ClientLayout({ children, messages, locale }: ClientLayoutProps) {
  // Track page views for Google Analytics
  useGoogleAnalytics();
  
  // Track advanced user interactions
  useAdvancedTracking();

  return (
    <NextIntlClientProvider 
      messages={messages} 
      locale={locale}
      timeZone="UTC"
      now={new Date()}
    >
      <Navbar />
      {children}
      <Footer />
      
      {/* Global interactive components */}
      <SmoothScroll />
      <ScrollAnimations />
      
      {/* Analytics Debug Panel (development only) */}
      <AnalyticsDebug />
      
      {/* GA Test Panel (development only) */}
      <GATestPanel />
    </NextIntlClientProvider>
  );
}
