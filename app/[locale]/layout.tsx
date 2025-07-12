import {getMessages} from 'next-intl/server';
import {notFound} from 'next/navigation';
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import '../globals.css';
import ClientLayout from '../_components/ClientLayout';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Odyssee Travel Services",
  description: "Creating unforgettable journeys and extraordinary experiences for travelers worldwide.",
};

const locales = ['en', 'fr'];

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as any)) notFound();

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <script src="https://cdnjs.cloudflare.com/ajax/libs/framer-motion/10.16.4/framer-motion.min.js"></script>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet"></link>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-navy text-beige overflow-x-hidden`}
      >
        <ClientLayout messages={messages} locale={locale}>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}
