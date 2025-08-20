'use client';

import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import { Icon, LatLngBounds, divIcon } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect } from 'react';

// Fix for default markers in React-Leaflet
if (typeof window !== 'undefined') {
  delete (Icon.Default.prototype as any)._getIconUrl;
  Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  });
}

// Enhanced archaeological site icon with UNESCO styling
const archaeologicalIcon = divIcon({
  html: `
    <div style="
      background: linear-gradient(135deg, #dc2626, #b91c1c);
      width: 32px;
      height: 32px;
      border-radius: 50%;
      border: 3px solid white;
      box-shadow: 0 4px 8px rgba(0,0,0,0.3);
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
    ">
      <div style="
        color: white;
        font-size: 16px;
        font-weight: bold;
        text-shadow: 1px 1px 2px rgba(0,0,0,0.5);
      ">🏛️</div>
    </div>
  `,
  className: 'custom-archaeological-icon',
  iconSize: [32, 32],
  iconAnchor: [16, 16],
  popupAnchor: [0, -16]
});

// Enhanced historical site icon
const historicalIcon = divIcon({
  html: `
    <div style="
      background: linear-gradient(135deg, #d97706, #b45309);
      width: 30px;
      height: 30px;
      border-radius: 50%;
      border: 2px solid white;
      box-shadow: 0 3px 6px rgba(0,0,0,0.3);
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
    ">
      <div style="
        color: white;
        font-size: 14px;
        font-weight: bold;
        text-shadow: 1px 1px 2px rgba(0,0,0,0.5);
      ">⚱️</div>
    </div>
  `,
  className: 'custom-historical-icon',
  iconSize: [30, 30],
  iconAnchor: [15, 15],
  popupAnchor: [0, -15]
});

// Enhanced agency icon with modern styling
const agencyIcon = divIcon({
  html: `
    <div style="
      background: linear-gradient(135deg, #059669, #047857);
      width: 36px;
      height: 36px;
      border-radius: 8px;
      border: 3px solid white;
      box-shadow: 0 4px 12px rgba(0,0,0,0.4);
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      transform: rotate(45deg);
    ">
      <div style="
        color: white;
        font-size: 18px;
        font-weight: bold;
        text-shadow: 1px 1px 2px rgba(0,0,0,0.5);
        transform: rotate(-45deg);
      ">🏢</div>
    </div>
  `,
  className: 'custom-agency-icon',
  iconSize: [36, 36],
  iconAnchor: [18, 18],
  popupAnchor: [0, -18]
});

function FitBounds({ sites, agencyLocation }: { sites: any[], agencyLocation: any }) {
  const map = useMap();

  useEffect(() => {
    const allCoordinates = [
      ...sites.map(site => site.coordinates),
      agencyLocation.coordinates
    ];

    const bounds = new LatLngBounds(allCoordinates as [number, number][]);
    map.fitBounds(bounds, {
      padding: [50, 50],
      maxZoom: 7
    });
  }, [map, sites, agencyLocation]);

  return null;
}

interface TunisiaMapClientProps {
  tMap: any;
  locale: string;
  archaeologicalSites: any[];
  agencyLocation: any;
}

export function TunisiaMapClient({ tMap, locale, archaeologicalSites, agencyLocation }: TunisiaMapClientProps) {
  const currentLang = locale as 'en' | 'fr';

  // Test route between Carthage and Dougga
  const testRoute = [
    [36.8528, 10.3294], // Carthage coordinates
    [36.4222, 9.2194]   // Dougga coordinates
  ] as [number, number][];

  return (
    <div className="w-full">
      <div className="rounded-2xl overflow-hidden shadow-2xl bg-white">
        <MapContainer
          scrollWheelZoom={false}
          center={[34.5, 9.5]}
          zoom={7}
          style={{ height: '600px', width: '100%' }}
          className="z-10"
          minZoom={8}
          maxBounds={[
            [28.0, 5.0],
            [40.0, 13.0]
          ]}
          maxBoundsViscosity={0.3}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <FitBounds sites={archaeologicalSites} agencyLocation={agencyLocation} />


          {archaeologicalSites.map((site) => (
            <Marker
              key={site.id}
              position={site.coordinates as [number, number]}
              icon={site.type === 'unesco' ? archaeologicalIcon : historicalIcon}
            >
              <Popup maxWidth={320} className="custom-popup">
                <div className="p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xl">
                      {site.type === 'unesco' ? '🏛️' : '⚱️'}
                    </span>
                    <h3 className="font-bold text-lg text-gray-800">
                      {site.name[currentLang]}
                    </h3>
                  </div>
                  <p className="text-sm text-gray-600 mb-3 leading-relaxed">
                    {site.description[currentLang]}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${site.type === 'unesco'
                      ? 'bg-red-100 text-red-800 border border-red-200'
                      : 'bg-orange-100 text-orange-800 border border-orange-200'
                      }`}>
                      {site.type === 'unesco' ? '🏆 ' + tMap('unesco') : '📿 ' + tMap('historic')}
                    </span>
                    {(site.id === 'carthage' || site.id === 'dougga') && (
                      <span className="text-xs text-blue-600 font-medium">
                        🚗 Route de test
                      </span>
                    )}
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}

          <Marker
            position={agencyLocation.coordinates as [number, number]}
            icon={agencyIcon}
          >
            <Popup maxWidth={320}>
              <div className="p-3">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">
                    🏢
                  </span>
                  <h3 className="font-bold text-lg text-green-800">
                    {agencyLocation.name[currentLang]}
                  </h3>
                </div>
                <p className="text-sm text-gray-600 mb-3 leading-relaxed">
                  {agencyLocation.description[currentLang]}
                </p>
                <div className="flex items-center gap-2">
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200">
                    🏢 {tMap('agency')}
                  </span>
                  <span className="text-xs text-gray-500">
                    📍 El Menzah 5
                  </span>
                </div>
              </div>
            </Popup>
          </Marker>
        </MapContainer>
      </div>

    </div>
  );
}