'use client';

import { useTranslations } from 'next-intl';
import dynamic from 'next/dynamic';
import '../styles/map.css';
import { agencyLocation, archaeologicalSites } from '../lib/mapInfos';

const TunisiaMapClient = dynamic(
  () => import('./ClientMap').then((mod) => mod.TunisiaMapClient),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-[600px] bg-gray-100 rounded-2xl flex items-center justify-center">
        <div className="text-gray-500">Loading map...</div>
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
      <div className="rounded-2xl overflow-hidden shadow-2xl bg-white">
        <TunisiaMapClient
          tMap={tMap}
          locale={locale}
          archaeologicalSites={archaeologicalSites}
          agencyLocation={agencyLocation}
        />
      </div>
    </div>
  );
}

export default function MapSection() {
  const tMap = useTranslations('map');
  const locale = tMap('locale');

  return (
    <section id="map" className="py-20 px-6" style={{
      background: 'linear-gradient(135deg, #001F3F 0%, #003366 100%)'
    }}>
      <style jsx global>{`
        .leaflet-popup-content-wrapper {
          padding: 0 !important;
          border-radius: 12px !important;
          overflow: hidden;
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1) !important;
        }
        .leaflet-popup-content {
          margin: 0 !important;
          min-width: 280px;
        }
        .leaflet-popup-close-button {
          width: 30px !important;
          height: 30px !important;
          font-size: 20px !important;
          padding: 4px !important;
          color: #4B5563 !important;
          margin: 5px !important;
        }
        .leaflet-popup-tip {
          box-shadow: none !important;
        }
        .site-label {
          position: absolute;
          bottom: -28px;
          left: 50%;
          transform: translateX(-50%);
          white-space: nowrap;
          font-family: 'Inter', system-ui, -apple-system, sans-serif;
          font-size: 14px;
          font-weight: 600;
          color: #1F2937;
          background: rgba(255, 255, 255, 0.85);
          padding: 4px 8px;
          border-radius: 6px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
          transition: opacity 0.3s ease-in-out;
        }
        @media (max-width: 768px) {
          .site-label {
            font-size: 12px;
            bottom: -24px;
            padding: 3px 6px;
          }
        }
        @media (max-width: 640px) {
          .leaflet-popup-content {
            min-width: 240px;
          }
        }
      `}</style>
      <div className="container mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{
          color: '#FCE6CE',
          textShadow: '0 2px 4px rgba(0,0,0,0.3)'
        }}>{tMap('title')}</h2>
        <p className="text-xl mb-12 max-w-3xl mx-auto" style={{
          color: '#FCE6CE',
          opacity: 0.8
        }}>{tMap('subtitle')}</p>

        <div className="rounded-2xl p-8 backdrop-blur-sm border border-orange/20" style={{
          backgroundColor: 'rgba(252, 230, 206, 0.1)'
        }}>
          <TunisiaMap tMap={tMap} locale={locale} />
        </div>
      </div>
    </section>
  );
}