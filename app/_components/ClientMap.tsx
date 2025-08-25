'use client';

import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from 'react-leaflet';
import { Icon, LatLngBounds, divIcon } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

// Fix for default markers in React-Leaflet
if (typeof window !== 'undefined') {
  delete (Icon.Default.prototype as any)._getIconUrl;
  Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  });
}

function createArchaeologicalIcon(name: string, type: 'unesco' | 'historical') {
  const iconColor = type === 'unesco'
    ? 'linear-gradient(135deg, #dc2626, #b91c1c)'
    : 'linear-gradient(135deg, #d97706, #b45309)';
  const iconSize = type === 'unesco' ? 32 : 30;
  const emoji = type === 'unesco' ? '🏛️' : '⚱️';
  const fontSize = type === 'unesco' ? 16 : 14;
  const borderWidth = type === 'unesco' ? 3 : 2;
  const shadow = type === 'unesco' ? '0 4px 8px rgba(0,0,0,0.3)' : '0 3px 6px rgba(0,0,0,0.3)';

  return divIcon({
    html: `
      <style>
        .site-label {
          position: absolute;
          top: ${iconSize}px;
          left: 50%;
          transform: translateX(-50%);
          background: linear-gradient(135deg, rgba(0,0,0,0.9), rgba(0,0,0,0.8));
          color: white;
          padding: 4px 8px;
          border-radius: 8px;
          font-size: 10px;
          font-weight: 600;
          white-space: nowrap;
          box-shadow: 0 2px 6px rgba(0,0,0,0.4);
          border: 1px solid rgba(255,255,255,0.2);
          backdrop-filter: blur(8px);
          max-width: 120px;
          overflow: hidden;
          text-overflow: ellipsis;
          line-height: 1.2;
        }
        .site-label::before {
          content: '';
          position: absolute;
          top: -4px;
          left: 50%;
          transform: translateX(-50%);
          width: 0;
          height: 0;
          border-left: 4px solid transparent;
          border-right: 4px solid transparent;
          border-bottom: 4px solid rgba(0,0,0,0.9);
        }
      </style>
      <div style="
        position: relative;
        width: ${iconSize}px;
        height: ${iconSize}px;
      ">
        <div style="
          background: ${iconColor};
          width: ${iconSize}px;
          height: ${iconSize}px;
          border-radius: 50%;
          border: ${borderWidth}px solid white;
          box-shadow: ${shadow};
          display: flex;
          align-items: center;
          justify-content: center;
        ">
          <div style="
            color: white;
            font-size: ${fontSize}px;
            font-weight: bold;
            text-shadow: 1px 1px 2px rgba(0,0,0,0.5);
          ">${emoji}</div>
        </div>
        <div class="site-label">${name}</div>
      </div>
    `,
    className: '',
    iconSize: [iconSize, iconSize + 35],
    iconAnchor: [iconSize / 2, iconSize / 2],
    popupAnchor: [0, -iconSize / 2]
  });
}

function createAgencyIcon(name: string, type: 'agency' | 'head-office' = 'agency') {
  // Both agencies same size, but different colors and styling
  const isHeadOffice = type === 'head-office';
  const iconSize = 36; // Same size for both
  const fontSize = 18; // Same font size for both
  const borderWidth = 3; // Same border width

  const colors = isHeadOffice
    ? {
      gradient: 'linear-gradient(135deg, #dc2626, #b91c1c)', // Premium red gradient
      bgColor: 'rgba(220,38,38,0.95)',
      shadowColor: 'rgba(220,38,38,0.5)',
      labelClass: 'head-office-label',
      shadow: '0 4px 12px rgba(0,0,0,0.4)'
    }
    : {
      gradient: 'linear-gradient(135deg, #059669, #047857)', // Green gradient  
      bgColor: 'rgba(5,150,105,0.95)',
      shadowColor: 'rgba(5,150,105,0.4)',
      labelClass: 'agency-label',
      shadow: '0 4px 12px rgba(0,0,0,0.4)'
    };

  return divIcon({
    html: `
      <style>
        .${colors.labelClass} {
          position: absolute;
          top: ${iconSize + 8}px;
          left: 50%;
          transform: translateX(-50%);
          background: linear-gradient(135deg, ${colors.bgColor}, rgba(0,0,0,0.9));
          color: white;
          padding: 5px 10px;
          border-radius: 10px;
          font-size: 11px;
          font-weight: 700;
          white-space: nowrap;
          box-shadow: 0 4px 12px ${colors.shadowColor};
          border: 1px solid rgba(255,255,255,0.4);
          backdrop-filter: blur(12px);
          max-width: 140px;
          overflow: hidden;
          text-overflow: ellipsis;
          line-height: 1.2;
          letter-spacing: 0.5px;
          }
        }
        .${colors.labelClass}::before {
          content: '';
          position: absolute;
          top: -5px;
          left: 50%;
          transform: translateX(-50%);
          width: 0;
          height: 0;
          border-left: 5px solid transparent;
          border-right: 5px solid transparent;
          border-bottom: 5px solid ${colors.bgColor};
        }
      </style>
      <div style="
        position: relative;
        width: ${iconSize}px;
        height: ${iconSize}px;
        z-index: ${isHeadOffice ? '1000' : '100'};
      ">
        <div style="
          background: ${colors.gradient};
          width: ${iconSize}px;
          height: ${iconSize}px;
          border-radius: 8px;
          border: ${borderWidth}px solid ${isHeadOffice ? '#fbbf24' : 'white'};
          box-shadow: ${colors.shadow};
          display: flex;
          align-items: center;
          justify-content: center;
          transform: rotate(45deg);
        ">
          <div style="
            color: white;
            font-size: ${fontSize}px;
            font-weight: bold;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.6);
            transform: rotate(-45deg);
          ">🏢</div>
        </div>
        <div class="${colors.labelClass}">${name}</div>
      </div>
    `,
    className: '',
    iconSize: [iconSize, iconSize + 40],
    iconAnchor: [iconSize / 2, iconSize / 2],
    popupAnchor: [0, -iconSize / 2]
  });
}

function FitBounds({ sites, agencyLocation, headOfficeLocation }: { sites: any[], agencyLocation: any, headOfficeLocation: any }) {
  const map = useMap();

  useEffect(() => {
    const allCoordinates = [
      ...sites.map(site => site.coordinates),
      agencyLocation.coordinates,
      headOfficeLocation.coordinates
    ];

    const bounds = new LatLngBounds(allCoordinates as [number, number][]);
    map.fitBounds(bounds, {
      padding: [50, 50],
      maxZoom: 7
    });
  }, [map, sites, agencyLocation, headOfficeLocation]);

  return null;
}

function MapController({ isRevealed }: { isRevealed: boolean }) {
  const map = useMap();

  useEffect(() => {
    if (isRevealed) {
      map.scrollWheelZoom.enable();
      map.dragging.enable();
      map.touchZoom.enable();
      map.doubleClickZoom.enable();
      map.boxZoom.enable();
      map.keyboard.enable();
    } else {
      map.scrollWheelZoom.disable();
      map.dragging.disable();
      map.touchZoom.disable();
      map.doubleClickZoom.disable();
      map.boxZoom.disable();
      map.keyboard.disable();
    }
  }, [map, isRevealed]);

  return null;
}

interface TunisiaMapClientProps {
  tMap: any;
  locale: string;
  archaeologicalSites: any[];
  agencyLocation: any;
  headOfficeLocation: any;
}

export function TunisiaMapClient({ tMap, locale, archaeologicalSites, agencyLocation, headOfficeLocation }: TunisiaMapClientProps) {
  const currentLang = locale as 'en' | 'fr';
  const [isRevealed, setIsRevealed] = useState(false);

  const handleToggleReveal = () => {
    setIsRevealed(prev => !prev);
  };

  return (
    <div className="w-full relative">
      <div className="rounded-2xl overflow-hidden shadow-2xl bg-white relative">
        <MapContainer
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

          <FitBounds sites={archaeologicalSites} agencyLocation={agencyLocation} headOfficeLocation={headOfficeLocation} />
          <MapController isRevealed={isRevealed} />

          {/* HEAD OFFICE - Most Important (Rendered First for Z-Index Priority) */}
          <Marker
            position={headOfficeLocation.coordinates as [number, number]}
            icon={createAgencyIcon(headOfficeLocation.name[currentLang], 'head-office')}
            interactive={true}
            zIndexOffset={2000} // Highest priority
          >
            <Popup maxWidth={350} className="premium-popup responsive-popup">
              <div className="popup-content p-2 sm:p-4">
                <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center">
                    <span className="text-lg sm:text-xl">🏆</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-base sm:text-xl text-red-800 leading-tight">
                      {headOfficeLocation.name[currentLang]}
                    </h3>
                    <span className="text-xs text-red-600 font-semibold uppercase tracking-wider">
                      Main Headquarters
                    </span>
                  </div>
                </div>
                <p className="popup-description text-xs sm:text-sm text-gray-600 mb-2 sm:mb-4 leading-relaxed">
                  {headOfficeLocation.description[currentLang]}
                </p>
                <div className="flex items-center justify-between flex-wrap gap-1 sm:gap-2">
                  <span className="inline-block px-2 sm:px-4 py-1 sm:py-2 rounded-full text-xs font-bold bg-gradient-to-r from-red-100 to-orange-100 text-red-800 border-2 border-red-200">
                    🏆 HEAD OFFICE
                  </span>
                  <span className="text-xs text-gray-500 font-medium">
                    📍 El Menzah 5
                  </span>
                </div>
              </div>
            </Popup>
          </Marker>

          {/* BRANCH AGENCY - Secondary */}
          <Marker
            position={agencyLocation.coordinates as [number, number]}
            icon={createAgencyIcon(agencyLocation.name[currentLang], 'agency')}
            interactive={true}
            zIndexOffset={1000} // High priority but less than head office
          >
            <Popup maxWidth={320} className="responsive-popup">
              <div className="popup-content p-2 sm:p-3">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg sm:text-xl">🏢</span>
                  <h3 className="font-bold text-base sm:text-lg text-green-800">
                    {agencyLocation.name[currentLang]}
                  </h3>
                </div>
                <p className="popup-description text-xs sm:text-sm text-gray-600 mb-2 sm:mb-3 leading-relaxed">
                  {agencyLocation.description[currentLang]}
                </p>
                <div className="flex items-center gap-1 sm:gap-2">
                  <span className="inline-block px-2 sm:px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200">
                    🏢 Branch Office
                  </span>
                  <span className="text-xs text-gray-500">
                    📍 Tunis Center
                  </span>
                </div>
              </div>
            </Popup>
          </Marker>

          {/* ARCHAEOLOGICAL SITES - Lower Priority */}
          {archaeologicalSites.map((site) => (
            <Marker
              key={site.id}
              position={site.coordinates as [number, number]}
              icon={createArchaeologicalIcon(site.name[currentLang], site.type)}
              interactive={true}
              zIndexOffset={site.type === 'unesco' ? 100 : 50} // Lower than agencies
            >
              <Popup maxWidth={280} className="custom-popup responsive-popup">
                <div className="popup-content p-2 sm:p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-lg sm:text-xl">
                      {site.type === 'unesco' ? '🏛️' : '⚱️'}
                    </span>
                    <h3 className="font-bold text-sm sm:text-lg text-gray-800">
                      {site.name[currentLang]}
                    </h3>
                  </div>
                  <p className="popup-description text-xs sm:text-sm text-gray-600 mb-2 sm:mb-3 leading-relaxed">
                    {site.description[currentLang]}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className={`inline-block px-2 sm:px-3 py-1 rounded-full text-xs font-medium ${site.type === 'unesco'
                      ? 'bg-red-100 text-red-800 border border-red-200'
                      : 'bg-orange-100 text-orange-800 border border-orange-200'
                      }`}>
                      {site.type === 'unesco' ? '🏆 ' + tMap('unesco') : '📿 ' + tMap('historic')}
                    </span>
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>

        {/* Show/Hide Toggle Button */}
        <motion.button
          onClick={handleToggleReveal}
          className={`absolute top-4 right-4 z-30 flex items-center gap-2 px-4 py-2 rounded-xl shadow-lg transition-all duration-300 backdrop-blur-sm border ${isRevealed
            ? 'bg-white/90 text-gray-700 border-gray-200 hover:bg-white hover:shadow-xl'
            : 'bg-black/80 text-white border-white/20 hover:bg-black/90 hover:shadow-2xl'
            }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label={isRevealed ? 'Hide map' : 'Show map'}
        >
          <motion.div
            animate={{ rotate: isRevealed ? 0 : 180 }}
            transition={{ duration: 0.3 }}
          >
            {isRevealed ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                <line x1="1" y1="1" x2="23" y2="23" />
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            )}
          </motion.div>
          <span className="text-sm font-medium">
            {isRevealed ? 'Hide' : 'Show'}
          </span>
        </motion.button>

        {/* Overlay for hiding map */}
        <motion.div
          className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-black-600/40 via-gray-900/40 to-indigo-900/40 backdrop-blur-md z-20 flex items-center justify-center"
          initial={{ opacity: 1 }}
          animate={{ opacity: isRevealed ? 0 : 1 }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
          style={{ pointerEvents: isRevealed ? 'none' : 'auto' }}
        >
          <motion.div
            className="text-center text-white"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: isRevealed ? 0 : 1, scale: isRevealed ? 0.8 : 1 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          >
            <motion.div
              className="w-24 h-24 mx-auto mb-6 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20"
              animate={{
                scale: [1, 1.05, 1],
                boxShadow: [
                  '0 0 20px rgba(255,255,255,0.2)',
                  '0 0 30px rgba(255,255,255,0.4)',
                  '0 0 20px rgba(255,255,255,0.2)'
                ]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
            </motion.div>
            <h3 className="text-xl font-semibold mb-2">Tunisia Archaeological Sites</h3>
            <p className="text-white/80 text-sm">Click "Show" to explore the interactive map</p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}