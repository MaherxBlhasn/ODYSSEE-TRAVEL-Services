'use client';

import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { Icon, LatLngBounds } from 'leaflet';
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

// Import your existing icons and data
const archaeologicalIcon = new Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const agencyIcon = new Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

function FitBounds({ sites, agencyLocation }: { sites: any[], agencyLocation: any }) {
  const map = useMap();
  
  useEffect(() => {
    const allCoordinates = [
      ...sites.map(site => site.coordinates),
      agencyLocation.coordinates
    ];
    
    const bounds = new LatLngBounds(allCoordinates as [number, number][]);
    map.fitBounds(bounds, { padding: [20, 20] });
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

  return (
    <div className="w-full">
      <div className="rounded-2xl overflow-hidden shadow-2xl bg-white">
        <MapContainer
          center={[35.0, 9.0]}
          zoom={6}
          style={{ height: '600px', width: '100%' }}
          className="z-10"
          minZoom={5}
          maxBounds={[
            [29.5, 7.0],
            [38.0, 12.0]
          ]}
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
              icon={archaeologicalIcon}
            >
              <Popup maxWidth={300} className="custom-popup">
                <div className="p-2">
                  <h3 className="font-bold text-lg text-gray-800 mb-2">
                    {site.name[currentLang]}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">
                    {site.description[currentLang]}
                  </p>
                  <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                    site.type === 'unesco' 
                      ? 'bg-red-100 text-red-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {site.type === 'unesco' ? tMap('unesco') : tMap('historic')}
                  </span>
                </div>
              </Popup>
            </Marker>
          ))}
          
          <Marker 
            position={agencyLocation.coordinates as [number, number]} 
            icon={agencyIcon}
          >
            <Popup maxWidth={300}>
              <div className="p-2">
                <h3 className="font-bold text-lg text-green-800 mb-2">
                  {agencyLocation.name[currentLang]}
                </h3>
                <p className="text-sm text-gray-600">
                  {agencyLocation.description[currentLang]}
                </p>
                <div className="mt-3">
                  <span className="inline-block px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-800">
                    {tMap('agency')}
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
