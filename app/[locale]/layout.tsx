import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from 'next/script';
import '../globals.css';
import ClientLayout from '../_components/ClientLayout';
import GoogleAnalytics from '../_components/GoogleAnalytics';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Odyssee Travel Services - Your Trusted Partner in Travel",
  description: "Creating unforgettable journeys and extraordinary experiences for travelers worldwide.",
  openGraph: {
    title: "Odyssee Travel Services - Your Trusted Partner in Travel",
    description: "Creating unforgettable journeys and extraordinary experiences for travelers worldwide.",
    url: "https://odyssetravelservices.com", // ← Mets ton vrai domaine
    siteName: "Odyssee Travel Services",
    images: [
      {
        url: "/bannerv2.png", // ton image dans /public
        width: 1200,
        height: 630,
        alt: "Odyssee Travel Services Banner",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Odyssee Travel Services - Your Trusted Partner in Travel",
    description: "Creating unforgettable journeys and extraordinary experiences for travelers worldwide.",
    images: ["/bannerv2.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
      { url: "/favicon-16x16.png", type: "image/png", sizes: "16x16" }
    ],
    apple: "/apple-touch-icon.png",
    other: [
      {
        rel: "manifest",
        url: "/site.webmanifest",
      },
    ],
  },
};

const locales = ['en', 'fr'];

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as any)) notFound();

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html lang={locale} style={{ margin: 0, padding: 0, width: '100%', height: '100%' }}>
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet"></link>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased text-beige overflow-x-hidden`}
        style={{
          margin: 0,
          padding: 0
        }}
      >
        <GoogleAnalytics />

        <ClientLayout messages={messages} locale={locale}>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}
