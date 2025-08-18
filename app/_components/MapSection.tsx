'use client';

import { useTranslations } from 'next-intl';
import dynamic from 'next/dynamic';
import '../styles/map.css';
// Import the ClientMap component
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


// Archaeological sites data with real coordinates
const archaeologicalSites = [
  {
    id: 'carthage',
    name: { en: 'Ancient Carthage', fr: 'Carthage Antique' },
    coordinates: [36.8528, 10.3294], // Real coordinates
    description: { 
      en: 'Ancient Phoenician city-state and UNESCO World Heritage Site. Explore the remains of this once-mighty empire.',
      fr: 'Ancienne cité-état phénicienne et site du patrimoine mondial de l\'UNESCO. Explorez les vestiges de cet empire autrefois puissant.'
    },
    type: 'unesco'
  },
  {
    id: 'dougga',
    name: { en: 'Dougga', fr: 'Dougga' },
    coordinates: [36.4222, 9.2194],
    description: { 
      en: 'Best-preserved Roman small town in North Africa. Marvel at the stunning Capitol and Roman theater.',
      fr: 'Petite ville romaine la mieux préservée d\'Afrique du Nord. Admirez le magnifique Capitole et le théâtre romain.'
    },
    type: 'unesco'
  },
  {
    id: 'el-jem',
    name: { en: 'El Jem Amphitheatre', fr: 'Amphithéâtre d\'El Jem' },
    coordinates: [35.2981, 10.7061],
    description: { 
      en: 'One of the largest Roman amphitheatres in the world. Experience the grandeur of ancient gladiatorial games.',
      fr: 'L\'un des plus grands amphithéâtres romains au monde. Vivez la grandeur des anciens jeux de gladiateurs.'
    },
    type: 'unesco'
  },
  {
    id: 'kairouan',
    name: { en: 'Kairouan', fr: 'Kairouan' },
    coordinates: [35.6781, 10.0963],
    description: { 
      en: 'First capital of Islamic Tunisia and holy city. Visit the Great Mosque and explore Islamic architecture.',
      fr: 'Première capitale de la Tunisie islamique et ville sainte. Visitez la Grande Mosquée et explorez l\'architecture islamique.'
    },
    type: 'unesco'
  },
  {
    id: 'sousse',
    name: { en: 'Sousse Medina', fr: 'Médina de Sousse' },
    coordinates: [35.8256, 10.6369],
    description: { 
      en: 'Historic medina and UNESCO World Heritage Site. Wander through ancient streets and traditional markets.',
      fr: 'Médina historique et site du patrimoine mondial de l\'UNESCO. Promenez-vous dans les rues anciennes et les marchés traditionnels.'
    },
    type: 'unesco'
  },
  {
    id: 'sbeitla',
    name: { en: 'Sbeitla', fr: 'Sbeïtla' },
    coordinates: [35.2372, 9.1133],
    description: { 
      en: 'Ancient Roman city of Sufetula. Discover well-preserved temples and Byzantine churches.',
      fr: 'Ancienne ville romaine de Sufetula. Découvrez des temples bien préservés et des églises byzantines.'
    },
    type: 'historical'
  },
  {
    id: 'bulla-regia',
    name: { en: 'Bulla Regia', fr: 'Bulla Regia' },
    coordinates: [36.5561, 8.7553],
    description: { 
      en: 'Roman archaeological site with unique underground villas. Explore subterranean mosaics and architecture.',
      fr: 'Site archéologique romain avec des villas souterraines uniques. Explorez les mosaïques et l\'architecture souterraines.'
    },
    type: 'historical'
  }
];

// Agency location in Tunis
const agencyLocation = {
  name: { en: 'Odyssee travel agency', fr: 'Agence de Voyage Odyssee' },
  coordinates: [36.8065, 10.1815], // Tunis center
  description: { 
    en: 'Your trusted partner for exploring Tunisia\'s archaeological treasures. Contact us for personalized tours!',
    fr: 'Votre partenaire de confiance pour explorer les trésors archéologiques de la Tunisie. Contactez-nous pour des circuits personnalisés !'
  }
};

interface TunisiaMapProps {
  tMap: any;
  locale: string;
}

function TunisiaMap({ tMap, locale }: TunisiaMapProps) {
  return (
    <div className="w-full">
      {/* Map Container */}
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