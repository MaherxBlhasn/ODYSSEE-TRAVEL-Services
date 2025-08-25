'use client';

import { useTranslations } from 'next-intl';
import dynamic from 'next/dynamic';
import '../styles/map.css';
import { headOfficeLocation, agencyLocation, archaeologicalSites } from '../lib/mapInfos';

const TunisiaMapClient = dynamic(
  () => import('./ClientMap').then((mod) => mod.TunisiaMapClient),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-[400px] sm:h-[500px] lg:h-[600px] bg-gray-100 rounded-xl sm:rounded-2xl flex items-center justify-center">
        <div className="text-gray-500 text-sm sm:text-base">Loading map...</div>
      </div>
    )
  }
);

interface TunisiaMapProps {
  tMap: any;
  locale: string;
}

function TunisiaMap({ tMap, locale }: TunisiaMapProps) {
  return (
    <div className="w-full">
      <div className="rounded-xl sm:rounded-2xl overflow-hidden shadow-lg sm:shadow-2xl bg-white">
        <TunisiaMapClient
          tMap={tMap}
          locale={locale}
          archaeologicalSites={archaeologicalSites}
          agencyLocation={agencyLocation}
          headOfficeLocation={headOfficeLocation}
        />
      </div>
    </div>
  );
}

export default function MapSection() {
  const tMap = useTranslations('map');
  const locale = tMap('locale');

  return (
    <section id="map" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6" style={{
      background: 'linear-gradient(135deg, #001F3F 0%, #003366 100%)'
    }}>
      <style jsx global>{`
        /* Responsive Popup Base Styles */
        .leaflet-popup-content-wrapper {
          padding: 0 !important;
          border-radius: 8px !important;
          overflow: hidden;
          box-shadow: 0 8px 20px -5px rgba(0, 0, 0, 0.15) !important;
          position: relative !important;
        }
        
        .leaflet-popup-content {
          margin: 0 !important;
          font-size: 14px;
          position: relative !important;
        }
        
        .leaflet-popup-close-button {
          width: 24px !important;
          height: 24px !important;
          font-size: 14px !important;
          padding: 0 !important;
          color: #374151 !important;
          background: rgba(255, 255, 255, 0.95) !important;
          border-radius: 50% !important;
          border: 1px solid rgba(0, 0, 0, 0.1) !important;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1) !important;
          right: 6px !important;
          top: 6px !important;
          margin: 0 !important;
          z-index: 1001 !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          line-height: 1 !important;
          text-decoration: none !important;
          font-weight: bold !important;
        }
        
        .leaflet-popup-close-button:hover {
          background: rgba(239, 68, 68, 0.9) !important;
          color: white !important;
          transform: scale(1.1) !important;
        }
        
        .leaflet-popup-tip {
          box-shadow: none !important;
        }

        /* Icon Labels - Mobile Responsive */
        .site-label {
          position: absolute;
          bottom: -24px;
          left: 50%;
          transform: translateX(-50%);
          white-space: nowrap;
          font-family: 'Inter', system-ui, -apple-system, sans-serif;
          font-size: 11px;
          font-weight: 600;
          color: #1F2937;
          background: rgba(255, 255, 255, 0.9);
          padding: 3px 6px;
          border-radius: 4px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
          transition: opacity 0.3s ease-in-out;
          max-width: 100px;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        /* Mobile Screens - Extra Small (320px - 479px) */
        @media (max-width: 479px) {
          .leaflet-popup-content-wrapper {
            max-width: 200px !important;
          }
          
          .leaflet-popup-content {
            min-width: 180px !important;
            font-size: 12px;
          }

          .popup-content {
            padding: 8px !important;
          }
          
          /* Hide descriptions on very small screens */
          .popup-description {
            display: none !important;
          }
          
          .site-label {
            font-size: 9px;
            bottom: -18px;
            padding: 2px 4px;
            max-width: 60px;
          }
          
          .leaflet-popup-close-button {
            width: 20px !important;
            height: 20px !important;
            font-size: 12px !important;
            right: 4px !important;
            top: 4px !important;
          }

          .popup-content {
            padding-right: 26px !important;
            min-height: 50px !important;
          }
          
          .popup-content h3 {
            margin-right: 6px !important;
            font-size: 14px !important;
          }

          .leaflet-control-zoom a {
            width: 32px !important;
            height: 32px !important;
            line-height: 32px !important;
            font-size: 14px !important;
          }
        }

        /* Mobile Screens - Small (480px - 639px) */
        @media (min-width: 480px) and (max-width: 639px) {
          .leaflet-popup-content-wrapper {
            max-width: 220px !important;
          }
          
          .leaflet-popup-content {
            min-width: 200px !important;
            font-size: 13px;
          }

          .popup-content {
            padding: 10px !important;
          }
          
          /* Show short descriptions only */
          .popup-description {
            display: block !important;
            max-height: 2.6em;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
          }
          
          .site-label {
            font-size: 10px;
            bottom: -20px;
            padding: 2px 5px;
            max-width: 75px;
          }
          
          .leaflet-popup-close-button {
            width: 22px !important;
            height: 22px !important;
            font-size: 13px !important;
            right: 5px !important;
            top: 5px !important;
          }

          .popup-content {
            padding-right: 30px !important;
            min-height: 55px !important;
          }
          
          .popup-content h3 {
            margin-right: 8px !important;
          }

          .leaflet-control-zoom a {
            width: 34px !important;
            height: 34px !important;
            line-height: 34px !important;
            font-size: 15px !important;
          }
        }

        /* Tablet - Small (640px - 767px) */
        @media (min-width: 640px) and (max-width: 767px) {
          .leaflet-popup-content-wrapper {
            max-width: 260px !important;
          }
          
          .leaflet-popup-content {
            min-width: 240px !important;
            font-size: 14px;
          }

          .popup-description {
            display: block !important;
          }
          
          .site-label {
            font-size: 11px;
            bottom: -22px;
            padding: 3px 6px;
            max-width: 90px;
          }
        }

        /* Tablet - Medium (768px - 1023px) */
        @media (min-width: 768px) and (max-width: 1023px) {
          .leaflet-popup-content-wrapper {
            max-width: 300px !important;
          }
          
          .leaflet-popup-content {
            min-width: 260px;
            font-size: 14px;
          }

          .popup-description {
            display: block !important;
          }
          
          .site-label {
            font-size: 12px;
            bottom: -24px;
            padding: 3px 7px;
            max-width: 110px;
          }
        }

        /* Desktop - Small (1024px - 1279px) */
        @media (min-width: 1024px) and (max-width: 1279px) {
          .leaflet-popup-content-wrapper {
            max-width: 320px !important;
          }
          
          .leaflet-popup-content {
            min-width: 280px;
            font-size: 14px;
          }

          .popup-description {
            display: block !important;
          }
          
          .site-label {
            font-size: 13px;
            bottom: -26px;
            padding: 4px 8px;
            max-width: 120px;
          }
        }

        /* Desktop - Large (1280px+) */
        @media (min-width: 1280px) {
          .leaflet-popup-content-wrapper {
            max-width: 350px !important;
          }
          
          .leaflet-popup-content {
            min-width: 300px;
            font-size: 14px;
          }

          .popup-description {
            display: block !important;
          }
          
          .site-label {
            font-size: 14px;
            bottom: -28px;
            padding: 4px 8px;
            max-width: 130px;
          }
        }

        /* General Mobile Touch Optimizations */
        @media (max-width: 767px) {
          .leaflet-control-attribution {
            font-size: 10px !important;
            background: rgba(255, 255, 255, 0.8) !important;
            padding: 2px 4px !important;
          }

          /* Better touch targets for mobile */
          .leaflet-popup-close-button {
            touch-action: manipulation;
          }

          /* Prevent zoom on double tap for popup content */
          .leaflet-popup-content {
            touch-action: pan-x pan-y;
          }
        }

        /* Popup Content Responsive Classes */
        .popup-content {
          padding-right: 32px !important; /* Space for close button */
          min-height: 60px !important;
        }
        
        .popup-content h3 {
          line-height: 1.3 !important;
          margin-bottom: 6px !important;
          margin-right: 8px !important; /* Extra space from close button */
          word-wrap: break-word !important;
          overflow-wrap: break-word !important;
        }

        .popup-content .flex {
          align-items: flex-start !important;
          margin-right: 4px !important;
        }

        /* Badge/Tag responsiveness */
        @media (max-width: 479px) {
          .popup-content span[class*="inline-block"] {
            font-size: 10px !important;
            padding: 2px 6px !important;
          }
        }

        @media (min-width: 480px) and (max-width: 639px) {
          .popup-content span[class*="inline-block"] {
            font-size: 11px !important;
            padding: 3px 8px !important;
          }
        }
      `}</style>

      <div className="container mx-auto text-center max-w-7xl">
        {/* Responsive Headings */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 px-2" style={{
          color: '#FCE6CE',
          textShadow: '0 2px 4px rgba(0,0,0,0.3)'
        }}>
          {tMap('title')}
        </h2>

        <p className="text-base sm:text-lg lg:text-xl mb-8 sm:mb-10 lg:mb-12 max-w-3xl mx-auto px-4" style={{
          color: '#FCE6CE',
          opacity: 0.8,
          lineHeight: '1.6'
        }}>
          {tMap('subtitle')}
        </p>

        {/* Responsive Map Container */}
        <div className="rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 backdrop-blur-sm border border-orange/20" style={{
          backgroundColor: 'rgba(252, 230, 206, 0.1)'
        }}>
          <TunisiaMap tMap={tMap} locale={locale} />
        </div>

        {/* Mobile Helper Text */}
        <div className="mt-4 sm:mt-6 block sm:hidden">
          <p className="text-xs text-orange-200/80 px-4">
            👆 Tap "Show" to interact with the map • Pinch to zoom • Tap markers for details
          </p>
        </div>
      </div>
    </section>
  );
}