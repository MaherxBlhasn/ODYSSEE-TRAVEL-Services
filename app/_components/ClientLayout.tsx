'use client';

import {NextIntlClientProvider} from 'next-intl';
import Navbar from './Navbar';
import Footer from './Footer';
import SmoothScroll from './SmoothScroll';
import ScrollAnimations from './ScrollAnimations';

interface ClientLayoutProps {
  children: React.ReactNode;
  messages: any;
  locale: string;
}

export default function ClientLayout({ children, messages, locale }: ClientLayoutProps) {
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
    </NextIntlClientProvider>
  );
}
