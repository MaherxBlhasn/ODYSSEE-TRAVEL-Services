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

// Make sure this matches your actual domain
const SITE_URL = "https://odysseetravelservices.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Odyssee Travel Services - Your Trusted Partner in Travel",
    template: "%s | Odyssee Travel Services"
  },
  description: "With over 26 years of experience in the travel industry, Odyssee Travel is a travel agency founded in 1998, with its headquarters located on Ennakhil. Creating unforgettable journeys and extraordinary experiences for travelers worldwide.",
  keywords: [
    "Odyssee Travel Services",
    "travel agency",
    "travel services",
    "vacation planning",
    "tour packages",
    "travel booking",
    "Ennakhil travel agency",
    "trusted travel partner",
    "26 years experience travel",
    "founded 1998 travel agency"
  ],
  authors: [{ name: "Odyssee Travel Services" }],
  creator: "Odyssee Travel Services",
  publisher: "Odyssee Travel Services",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: "Odyssee Travel Services - Your Trusted Partner in Travel",
    description: "With over 26 years of experience in the travel industry, Odyssee Travel is a travel agency founded in 1998. Creating unforgettable journeys and extraordinary experiences for travelers worldwide.",
    url: SITE_URL,
    siteName: "Odyssee Travel Services",
    images: [
      {
        url: "/bannerv2.png",
        width: 1200,
        height: 630,
        alt: "Odyssee Travel Services - Trusted Travel Agency since 1998",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Odyssee Travel Services - Your Trusted Partner in Travel",
    description: "With over 26 years of experience in the travel industry, Odyssee Travel is a travel agency founded in 1998. Creating unforgettable journeys and extraordinary experiences.",
    images: ["/bannerv2.png"],
    creator: "@odysseetravel", // Add your Twitter handle if you have one
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
  alternates: {
    canonical: SITE_URL,
    languages: {
      'en': `${SITE_URL}/en`,
      'fr': `${SITE_URL}/fr`,
    },
  },
  verification: {
    google: 'your-google-verification-code', // Add your Google Search Console verification
    // yandex: 'your-yandex-verification-code',
    // bing: 'your-bing-verification-code',
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

  // Providing all messages to the client side
  const messages = await getMessages();

  // Structured Data for Local Business
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    "name": "Odyssee Travel Services",
    "description": "With over 26 years of experience in the travel industry, Odyssee Travel is a travel agency founded in 1998, with its headquarters located on Ennakhil.",
    "url": SITE_URL,
    "logo": `${SITE_URL}/bannerv2.png`,
    "foundingDate": "1998",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Ennakhil", // Add more specific address details
      // "addressLocality": "City",
      // "addressRegion": "State/Region",
      // "postalCode": "PostalCode",
      // "addressCountry": "Country"
    },
    "sameAs": [
      // Add your social media profiles
      // "https://facebook.com/odysseetravelservices",
      // "https://instagram.com/odysseetravelservices",
      // "https://linkedin.com/company/odysseetravelservices"
    ],
    "serviceType": [
      "Travel Planning",
      "Vacation Packages",
      "Tour Services",
      "Travel Booking"
    ],
    "areaServed": "Worldwide"
  };

  return (
    <html lang={locale} style={{ margin: 0, padding: 0, width: '100%', height: '100%' }}>
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#your-brand-color" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />

        {/* Structured Data */}
        <Script
          id="structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />

        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
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