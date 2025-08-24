import { getTranslations } from 'next-intl/server';
import ContactForm from './ContactForm';

interface ContactItemProps {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}

const ContactItem = ({ icon, title, children }: ContactItemProps) => (
  <div className="flex items-start space-x-3 sm:space-x-4 group">
    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3" style={{
      backgroundColor: '#F28C28',
      boxShadow: '0 4px 12px rgba(242, 140, 40, 0.3)'
    }}>
      {icon}
    </div>
    <div className="flex-1 min-w-0">
      <h4 className="text-base sm:text-lg font-semibold break-words mb-1 transition-colors duration-300 group-hover:text-orange-200" style={{ color: '#FCE6CE' }}>
        {title}
      </h4>
      <div className="text-sm sm:text-base transition-colors duration-300" style={{ color: '#FCE6CE', opacity: 0.8 }}>
        {children}
      </div>
    </div>
  </div>
);

const LocationIcon = () => (
  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white drop-shadow-sm" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
  </svg>
);

const PhoneIcon = () => (
  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white drop-shadow-sm" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
  </svg>
);

const EmailIcon = () => (
  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white drop-shadow-sm" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
  </svg>
);

export default async function ContactSection() {
  const tContact = await getTranslations('contact');

  // Get addresses and phones as arrays
  const addresses = tContact.raw('info.address.value');
  const phones = tContact.raw('info.phone.value');

  return (
    <section id="contact" className="section-padding relative overflow-hidden" style={{
      background: 'linear-gradient(135deg, #001F3F 0%, #003366 100%)'
    }}>
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-orange-300 blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-48 h-48 rounded-full bg-blue-300 blur-3xl"></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 rounded-full bg-yellow-300 blur-2xl"></div>
      </div>

      <div className="container mx-auto px-6 relative">
        <div className="text-center mb-16 fade-in" suppressHydrationWarning>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-orange-200 via-yellow-100 to-orange-300 bg-clip-text text-transparent drop-shadow-lg">
            {tContact('title')}
          </h2>
          <p className="text-xl max-w-2xl mx-auto leading-relaxed" style={{
            color: '#FCE6CE',
            opacity: 0.9
          }}>
            {tContact('subtitle')}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <div className="fade-in order-2 lg:order-1" suppressHydrationWarning>
            <ContactForm />
          </div>

          <div className="fade-in order-1 lg:order-2" suppressHydrationWarning>
            <div className="rounded-2xl p-6 sm:p-8 border-2 border-orange/20 backdrop-blur-sm relative overflow-hidden transition-all duration-500 hover:border-orange/30 hover:shadow-2xl" style={{
              backgroundColor: 'rgba(252, 230, 206, 0.08)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
            }}>
              {/* Subtle gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-orange/5 to-transparent rounded-2xl"></div>

              <div className="relative z-10">
                <h3 className="text-2xl sm:text-3xl font-bold mb-8 text-center lg:text-left bg-gradient-to-r from-orange-200 via-yellow-100 to-orange-300 bg-clip-text text-transparent drop-shadow-sm">
                  {tContact('info.title')}
                </h3>

                <div className="space-y-6 sm:space-y-8">
                  {/* Address Section */}
                  <ContactItem
                    icon={<LocationIcon />}
                    title={tContact('info.address.title')}
                  >
                    {Array.isArray(addresses) ? (
                      <div className="space-y-1">
                        {addresses.map((addr: string, index: number) => (
                          <p key={index} className="break-words leading-relaxed">
                            {addr}
                          </p>
                        ))}
                      </div>
                    ) : (
                      <p className="break-words leading-relaxed">{addresses}</p>
                    )}
                  </ContactItem>

                  {/* Phone Section */}
                  <ContactItem
                    icon={<PhoneIcon />}
                    title={tContact('info.phone.title')}
                  >
                    {Array.isArray(phones) ? (
                      <div className="space-y-1">
                        {phones.map((phone: string, index: number) => (
                          <a
                            key={index}
                            href={`tel:${phone.replace(/\s+/g, '')}`}
                            className="block break-words leading-relaxed hover:text-orange-200 transition-colors duration-300 cursor-pointer"
                          >
                            {phone}
                          </a>
                        ))}
                      </div>
                    ) : (
                      <a
                        href={`tel:${phones.replace(/\s+/g, '')}`}
                        className="block break-words leading-relaxed hover:text-orange-200 transition-colors duration-300 cursor-pointer"
                      >
                        {phones}
                      </a>
                    )}
                  </ContactItem>

                  {/* Email Section */}
                  <ContactItem
                    icon={<EmailIcon />}
                    title={tContact('info.email.title')}
                  >
                    <a
                      href={`mailto:${tContact('info.email.value')}`}
                      className="break-all leading-relaxed hover:text-orange-200 transition-colors duration-300 cursor-pointer"
                    >
                      {tContact('info.email.value')}
                    </a>
                  </ContactItem>
                </div>

                {/* Social Media Section */}
                <div className="mt-8 sm:mt-10 pt-6 sm:pt-8 border-t border-orange/20">
                  <div className="flex items-center gap-4 flex-wrap justify-center lg:justify-start">
                    <h4 className="text-lg sm:text-xl font-semibold bg-gradient-to-r from-orange-200 via-yellow-100 to-orange-300 bg-clip-text text-transparent drop-shadow-sm">
                      {tContact('info.followUs')}
                    </h4>

                    <a
                      href="https://www.facebook.com/profile.php?id=100063762986406"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center transition-all duration-500 flex-shrink-0 hover:scale-110 hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-blue-300 overflow-hidden"
                      style={{
                        background: 'linear-gradient(145deg, #1877F2, #42A5F5, #1565C0)',
                        boxShadow: '0 8px 32px rgba(24, 119, 242, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
                      }}
                    >
                      {/* Animated shine effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 transition-opacity duration-700 transform -skew-x-12 group-hover:animate-pulse"></div>

                      {/* Facebook Icon */}
                      <svg
                        className="w-6 h-6 sm:w-7 sm:h-7 text-white relative z-10 drop-shadow-sm group-hover:drop-shadow-lg transition-all duration-300 group-hover:scale-110"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                      </svg>

                      {/* Glow effect */}
                      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 to-blue-600 opacity-0 group-hover:opacity-40 blur-xl transition-all duration-500"></div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}