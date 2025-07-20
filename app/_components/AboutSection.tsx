import { getTranslations } from 'next-intl/server';

export default async function AboutSection() {
  const tAbout = await getTranslations('about');

  return (
    <section id="about" className="py-20 px-6 relative" style={{
      backgroundColor: '#FCE6CE',
      backgroundImage: 'url(/bg-2.jpg)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed'
    }}>
      <div className="absolute inset-0" style={{backgroundColor: 'rgba(252, 230, 206, 0.85)'}}></div>
      <div className="container mx-auto relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{
            color: '#001F3F', 
            textShadow: '0 1px 2px rgba(0,0,0,0.1)'
          }}>{tAbout('title')}</h2>
          <p className="text-lg mb-6" style={{
            color: '#001F3F', 
            opacity: 0.85, 
            lineHeight: 1.6
          }}>{tAbout('description1')}</p>
          <p className="text-lg" style={{
            color: '#001F3F', 
            opacity: 0.85, 
            lineHeight: 1.6
          }}>{tAbout('description2')}</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="text-center">
            <div className="text-5xl font-bold mb-2" style={{ color: '#F28C28' }}>150+</div>
            <div className="text-xl" style={{color: '#001F3F', fontWeight: 600}}>{tAbout('stats.destinations')}</div>
          </div>
          <div className="text-center">
            <div className="text-5xl font-bold mb-2" style={{ color: '#F28C28' }}>10,000+</div>
            <div className="text-xl" style={{color: '#001F3F', fontWeight: 600}}>{tAbout('stats.travelers')}</div>
          </div>
          <div className="text-center">
            <div className="text-5xl font-bold mb-2" style={{ color: '#F28C28' }}>15+</div>
            <div className="text-xl" style={{color: '#001F3F', fontWeight: 600}}>{tAbout('stats.experience')}</div>
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-6 bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300 hover:scale-105">
            <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{
              backgroundColor: 'rgba(242, 140, 40, 0.2)',
              border: '2px solid rgba(242, 140, 40, 0.3)'
            }}>
              <span className="text-2xl">👤</span>
            </div>
            <h3 className="text-xl font-bold mb-3" style={{color: '#001F3F'}}>{tAbout('features.personalizedService.title')}</h3>
            <p style={{color: '#001F3F', opacity: 0.8, lineHeight: 1.5}}>{tAbout('features.personalizedService.description')}</p>
          </div>

          <div className="text-center p-6 bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300 hover:scale-105">
            <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{
              backgroundColor: 'rgba(242, 140, 40, 0.2)',
              border: '2px solid rgba(242, 140, 40, 0.3)'
            }}>
              <span className="text-2xl">🕐</span>
            </div>
            <h3 className="text-xl font-bold mb-3" style={{color: '#001F3F'}}>{tAbout('features.support.title')}</h3>
            <p style={{color: '#001F3F', opacity: 0.8, lineHeight: 1.5}}>{tAbout('features.support.description')}</p>
          </div>

          <div className="text-center p-6 bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300 hover:scale-105">
            <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{
              backgroundColor: 'rgba(242, 140, 40, 0.2)',
              border: '2px solid rgba(242, 140, 40, 0.3)'
            }}>
              <span className="text-2xl">💎</span>
            </div>
            <h3 className="text-xl font-bold mb-3" style={{color: '#001F3F'}}>{tAbout('features.bestValue.title')}</h3>
            <p style={{color: '#001F3F', opacity: 0.8, lineHeight: 1.5}}>{tAbout('features.bestValue.description')}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
