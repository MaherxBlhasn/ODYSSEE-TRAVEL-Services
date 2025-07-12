import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import HeroSection from '../_components/HeroSection';
import FeaturesSection from '../_components/FeaturesSection';
import OffersSection from '../_components/OffersSection';
import MapSection from '../_components/MapSection';
import AboutSection from '../_components/AboutSection';
import ContactSection from '../_components/ContactSection';

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  return (
    <div className="min-h-screen bg-navy">
      {/* Hero Section */}
      <HeroSection params={params} />
      
      {/* Features Section */}
      <FeaturesSection />
      
      {/* Offers Section */}
      <OffersSection params={params} />
      
      {/* Map Section */}
      <MapSection />
      
      {/* About Section */}
      <AboutSection />
      
      {/* Contact Section */}
      <ContactSection />
    </div>
  );
}
