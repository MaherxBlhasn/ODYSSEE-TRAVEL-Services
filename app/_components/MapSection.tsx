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
        /* Popup Responsive Styles */
        .leaflet-popup-content-wrapper {
          padding: 0 !important;
          border-radius: 8px !important;
          overflow: hidden;
          box-shadow: 0 8px 20px -5px rgba(0, 0, 0, 0.15) !important;
        }
        
        .leaflet-popup-content {
          margin: 0 !important;
          min-width: 240px;
        }
        
        .leaflet-popup-close-button {
          width: 28px !important;
          height: 28px !important;
          font-size: 18px !important;
          padding: 3px !important;
          color: #4B5563 !important;
          margin: 4px !important;
          background: rgba(255,255,255,0.9) !important;
          border-radius: 50% !important;
        }
        
        .leaflet-popup-tip {
          box-shadow: none !important;
        }

        /* Mobile Icon Labels */
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

        /* Mobile optimizations */
        @media (max-width: 640px) {
          .leaflet-popup-content {
            min-width: 200px !important;
            font-size: 14px;
          }
          
          .site-label {
            font-size: 10px;
            bottom: -20px;
            padding: 2px 4px;
            max-width: 80px;
          }
          
          .leaflet-popup-close-button {
            width: 24px !important;
            height: 24px !important;
            font-size: 16px !important;
          }

          /* Make map controls more touch-friendly */
          .leaflet-control-zoom a {
            width: 35px !important;
            height: 35px !important;
            line-height: 35px !important;
            font-size: 16px !important;
          }

          .leaflet-control-attribution {
            font-size: 10px !important;
            background: rgba(255, 255, 255, 0.8) !important;
          }
        }

        /* Very small screens */
        @media (max-width: 480px) {
          .leaflet-popup-content {
            min-width: 180px !important;
          }
          
          .site-label {
            font-size: 9px;
            max-width: 70px;
          }
        }

        /* Tablet optimizations */
        @media (min-width: 641px) and (max-width: 1024px) {
          .leaflet-popup-content {
            min-width: 260px;
          }
          
          .site-label {
            font-size: 12px;
            bottom: -26px;
            padding: 3px 7px;
            max-width: 110px;
          }
        }

        /* Desktop */
        @media (min-width: 1025px) {
          .leaflet-popup-content {
            min-width: 280px;
          }
          
          .site-label {
            font-size: 14px;
            bottom: -28px;
            padding: 4px 8px;
            max-width: 120px;
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