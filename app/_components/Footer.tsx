'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import NewsletterForm from './NewsletterForm';

const Footer = () => {
  const t = useTranslations('footer');
  const tNavbar = useTranslations('navbar');
  const tCompany = useTranslations('company');
  const locale = useLocale();

  return (
    <footer className="py-6 sm:py-8 border-t border-orange/30" style={{
      background: 'linear-gradient(135deg, #001F3F 0%, #003366 100%)'
    }}>
        <div className="flex justify-center px-4 sm:px-6 lg:px-8 xl:px-12">
            <div className="w-full max-w-6xl">
                <div className="hidden sm:grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                <div className="col-span-2 lg:col-span-1 text-center lg:text-left mb-8 lg:mb-0">
                    <Link href={`/${locale}`} className="flex items-center justify-center lg:justify-start space-x-2 mb-4 sm:mb-6">
                        <div className="overflow-hidden shadow-lg rounded-md">
                            <Image
                                src="/Footer_logo.png"
                                alt="Odyssee Travel Services Logo"
                                width={0}
                                height={0}
                                sizes="100vw"
                                className="w-auto h-auto object-contain"
                                priority
                                unoptimized
                            />
                        </div>
                    </Link>
                    <p className="leading-relaxed text-sm max-w-xs sm:max-w-sm mx-auto lg:mx-0" style={{ 
                      color: '#FCE6CE', 
                      opacity: 0.9 
                    }}>
                        {tCompany('description')}
                    </p>
                </div>
                
                <div className="col-span-1 text-center lg:text-left mb-8 lg:mb-0">
                    <h4 className="text-base sm:text-lg font-semibold mb-4 sm:mb-6 border-b border-orange/20 pb-2 sm:pb-3 inline-block" style={{ color: '#FCE6CE' }}>{t('quickLinks')}</h4>
                    <ul className="space-y-2 sm:space-y-3">
                        <li><Link href={`/${locale}#home`} className="hover:text-orange transition-colors flex items-center justify-center lg:justify-start space-x-2 text-sm" style={{ color: 'rgba(252, 230, 206, 0.9)' }}><span>→</span><span>{tNavbar('home')}</span></Link></li>
                        <li><Link href={`/${locale}#offers`} className="hover:text-orange transition-colors flex items-center justify-center lg:justify-start space-x-2 text-sm" style={{ color: 'rgba(252, 230, 206, 0.9)' }}><span>→</span><span>{tNavbar('offers')}</span></Link></li>
                        <li><Link href={`/${locale}#about`} className="hover:text-orange transition-colors flex items-center justify-center lg:justify-start space-x-2 text-sm" style={{ color: 'rgba(252, 230, 206, 0.9)' }}><span>→</span><span>{tNavbar('about')}</span></Link></li>
                        <li><Link href={`/${locale}#contact`} className="hover:text-orange transition-colors flex items-center justify-center lg:justify-start space-x-2 text-sm" style={{ color: 'rgba(252, 230, 206, 0.9)' }}><span>→</span><span>{tNavbar('contact')}</span></Link></li>
                    </ul>
                </div>
                
                <div className="col-span-1 text-center lg:text-left mb-8 lg:mb-0">
                    <h4 className="text-base sm:text-lg font-semibent mb-4 sm:mb-6 border-b border-orange/20 pb-2 sm:pb-3 inline-block" style={{ color: '#FCE6CE' }}>{t('services')}</h4>
                    <ul className="space-y-2 sm:space-y-3">
                        <li><span className="hover:text-orange transition-colors flex items-center justify-center lg:justify-start space-x-2 text-sm" style={{ color: 'rgba(252, 230, 206, 0.9)' }}><span>✈️</span><span>{t('flightBooking')}</span></span></li>
                        <li><span className="hover:text-orange transition-colors flex items-center justify-center lg:justify-start space-x-2 text-sm" style={{ color: 'rgba(252, 230, 206, 0.9)' }}><span>🏨</span><span>{t('hotelReservations')}</span></span></li>
                        <li><span className="hover:text-orange transition-colors flex items-center justify-center lg:justify-start space-x-2 text-sm" style={{ color: 'rgba(252, 230, 206, 0.9)' }}><span>🗺️</span><span>{t('tourPackages')}</span></span></li>
                        <li><span className="hover:text-orange transition-colors flex items-center justify-center lg:justify-start space-x-2 text-sm" style={{ color: 'rgba(252, 230, 206, 0.9)' }}><span>🛡️</span><span>{t('travelInsurance')}</span></span></li>
                    </ul>
                </div>
                
                <div className="col-span-2 lg:col-span-1 text-center lg:text-left">
                    <h4 className="text-base sm:text-lg font-semibold mb-4 sm:mb-6 border-b border-orange/20 pb-2 sm:pb-3 inline-block" style={{ color: '#FCE6CE' }}>{t('newsletter')}</h4>
                    <p className="mb-4 sm:mb-6 leading-relaxed text-sm max-w-xs sm:max-w-sm mx-auto lg:mx-0" style={{ 
                      color: '#FCE6CE', 
                      opacity: 0.9 
                    }}>{t('newsletterText')}</p>
                    <div className="w-full max-w-sm mx-auto lg:mx-0">
                        <NewsletterForm />
                    </div>
                </div>
                </div>

                {/* Newsletter for mobile - only visible on small screens */}
                <div className="sm:hidden text-center">
                    <h4 className="text-lg font-semibold mb-4 border-b border-orange/20 pb-3 inline-block" style={{ color: '#FCE6CE' }}>{t('newsletter')}</h4>
                    <p className="mb-6 leading-relaxed text-sm max-w-xs mx-auto" style={{ 
                      color: '#FCE6CE', 
                      opacity: 0.9 
                    }}>{t('newsletterText')}</p>
                    <div className="w-full max-w-sm mx-auto">
                        <NewsletterForm />
                    </div>
                </div>
            
                <div className="border-t border-orange/30 mt-8 sm:mt-10 lg:mt-12 pt-6 sm:pt-8 text-center">
                    <div className="rounded-xl py-4 sm:py-6 px-4 sm:px-6 lg:px-8 border border-orange/20 shadow-lg backdrop-blur-sm max-w-xs sm:max-w-2xl lg:max-w-4xl mx-auto" style={{
                      background: 'rgba(0, 31, 63, 0.3)'
                    }}>
                        <p className="text-xs sm:text-sm font-medium tracking-wide" style={{ 
                          color: '#FCE6CE', 
                          opacity: 0.95 
                        }}>{t('copyright')}</p>
                    </div>
                </div>
            </div>
        </div>
    </footer>
  );
};

export default Footer;