import { getTranslations } from 'next-intl/server';
import AnimatedCounter from './AnimatedCounter';

export default async function AboutSection() {
  const tAbout = await getTranslations('about');
  // Dynamically calculate years of experience
  const foundingYear = 1999;
  const currentYear = new Date().getFullYear();
  const yearsExperience = currentYear - foundingYear;

  return (
    <section id="about" className="py-20 px-6 relative" style={{
      backgroundColor: '#FCE6CE',
      backgroundImage: 'url(/bg-2.jpg)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed'
    }}>
      <div className="absolute inset-0" style={{ backgroundColor: 'rgba(252, 230, 206, 0.85)' }}></div>
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
          }}>{tAbout('description1', { years: yearsExperience })}</p>
          <p className="text-lg" style={{
            color: '#001F3F',
            opacity: 0.85,
            lineHeight: 1.6
          }}>{tAbout('description2')}</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <div className="text-center">
            <AnimatedCounter end={150} suffix="+" duration={2500} />
            <div className="text-xl" style={{ color: '#001F3F', fontWeight: 600 }}>{tAbout('stats.destinations')}</div>
          </div>
          <div className="text-center">
            <AnimatedCounter end={10000} suffix="+" duration={3000} />
            <div className="text-xl" style={{ color: '#001F3F', fontWeight: 600 }}>{tAbout('stats.travelers')}</div>
          </div>
          <div className="text-center">
            <AnimatedCounter end={yearsExperience} suffix="+" duration={2000} />
            <div className="text-xl" style={{ color: '#001F3F', fontWeight: 600 }}>{tAbout('stats.experience')}</div>
          </div>
        </div>

        {/* Why Choose Us Section with modern glass effect */}
        <div className="py-16 px-8 rounded-3xl mb-16" style={{
          backgroundColor: 'rgba(0, 31, 63, 0.05)',
          border: '1px solid rgba(0, 31, 63, 0.1)',
          boxShadow: '0 8px 32px rgba(0, 31, 63, 0.12)'
        }}>
          <div className="text-center mb-16">
            <h3 className="text-3xl md:text-4xl font-bold mb-6" style={{
              color: '#001F3F',
              textShadow: '0 1px 2px rgba(0,0,0,0.1)'
            }}>Why Choose Us?</h3>
            <p className="text-lg" style={{
              color: '#001F3F',
              opacity: 0.8,
              lineHeight: 1.6,
              maxWidth: '600px',
              margin: '0 auto'
            }}>Trust in confidence - we have the keys to successful travel</p>
          </div>

          {/* Features with enhanced hover cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group cursor-pointer">
              <div className="p-8 rounded-2xl transition-all duration-500 ease-out transform group-hover:-translate-y-2 group-hover:scale-105" style={{
                backgroundColor: 'rgba(255, 255, 255, 0.4)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                boxShadow: '0 4px 20px rgba(0, 31, 63, 0.08)',
                transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
              }}>
                <div className="text-center">
                  <div className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 transition-all duration-500 group-hover:rotate-6 group-hover:scale-110" style={{
                    background: 'linear-gradient(135deg, #F28C28 0%, #F4A549 100%)',
                    boxShadow: '0 8px 25px rgba(242, 140, 40, 0.3)',
                    transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
                  }}>
                    <svg className="w-10 h-10 text-white transition-all duration-500 group-hover:scale-110" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-4 transition-colors duration-300 group-hover:text-orange-600" style={{ color: '#001F3F' }}>{tAbout('features.personalizedService.title')}</h3>
                  <p className="text-base leading-relaxed transition-all duration-300 group-hover:opacity-90" style={{ color: '#001F3F', opacity: 0.75 }}>{tAbout('features.personalizedService.description')}</p>
                </div>
              </div>
            </div>

            <div className="group cursor-pointer">
              <div className="p-8 rounded-2xl transition-all duration-500 ease-out transform group-hover:-translate-y-2 group-hover:scale-105" style={{
                backgroundColor: 'rgba(255, 255, 255, 0.4)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                boxShadow: '0 4px 20px rgba(0, 31, 63, 0.08)',
                transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
              }}>
                <div className="text-center">
                  <div className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 transition-all duration-500 group-hover:rotate-6 group-hover:scale-110" style={{
                    background: 'linear-gradient(135deg, #F28C28 0%, #F4A549 100%)',
                    boxShadow: '0 8px 25px rgba(242, 140, 40, 0.3)',
                    transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
                  }}>
                    <svg className="w-10 h-10 text-white transition-all duration-500 group-hover:scale-110" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm3.5 6L12 10.5 8.5 8 12 5.5 15.5 8zM12 17.5c-3.04 0-5.5-2.46-5.5-5.5s2.46-5.5 5.5-5.5 5.5 2.46 5.5 5.5-2.46 5.5-5.5 5.5z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-4 transition-colors duration-300 group-hover:text-orange-600" style={{ color: '#001F3F' }}>{tAbout('features.support.title')}</h3>
                  <p className="text-base leading-relaxed transition-all duration-300 group-hover:opacity-90" style={{ color: '#001F3F', opacity: 0.75 }}>{tAbout('features.support.description')}</p>
                </div>
              </div>
            </div>

            <div className="group cursor-pointer">
              <div className="p-8 rounded-2xl transition-all duration-500 ease-out transform group-hover:-translate-y-2 group-hover:scale-105" style={{
                backgroundColor: 'rgba(255, 255, 255, 0.4)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                boxShadow: '0 4px 20px rgba(0, 31, 63, 0.08)',
                transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
              }}>
                <div className="text-center">
                  <div className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 transition-all duration-500 group-hover:rotate-6 group-hover:scale-110" style={{
                    background: 'linear-gradient(135deg, #F28C28 0%, #F4A549 100%)',
                    boxShadow: '0 8px 25px rgba(242, 140, 40, 0.3)',
                    transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
                  }}>
                    <svg className="w-10 h-10 text-white transition-all duration-500 group-hover:scale-110" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-4 transition-colors duration-300 group-hover:text-orange-600" style={{ color: '#001F3F' }}>{tAbout('features.bestValue.title')}</h3>
                  <p className="text-base leading-relaxed transition-all duration-300 group-hover:opacity-90" style={{ color: '#001F3F', opacity: 0.75 }}>{tAbout('features.bestValue.description')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}