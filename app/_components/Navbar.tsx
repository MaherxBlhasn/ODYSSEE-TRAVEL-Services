'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import LanguageSwitcher from './LanguageSwitcher';

const Navbar = () => {
  const t = useTranslations('navbar');
  const tCompany = useTranslations('company');
  const locale = useLocale();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
     <nav className="fixed top-0 left-0 right-0 z-50 bg-navy/95 backdrop-blur-md border-b border-orange/20">
          <div className="container mx-auto px-6">
            <div className="flex items-center justify-between h-20">
              {/* Logo */}
              <Link href={`/${locale}`} className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-full overflow-hidden shadow-lg">
                  <Image
                    src="/LOGO.png"
                    alt="Odyssee Travel Services Logo"
                    width={48}
                    height={48}
                    className="w-full h-full object-cover"
                    priority
                    unoptimized
                  />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-beige">{tCompany('name')}</h1>
                  <p className="text-sm text-orange">{tCompany('tagline')}</p>
                </div>
              </Link>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center space-x-8">
                <Link href={`/${locale}#home`} className="nav-link text-beige hover:text-orange transition-colors">
                  {t('home')}
                </Link>
                <Link href={`/${locale}#offers`} className="nav-link text-beige hover:text-orange transition-colors">
                  {t('offers')}
                </Link>
                <Link href={`/${locale}#map`} className="nav-link text-beige hover:text-orange transition-colors">
                  {t('map')}
                </Link>
                <Link href={`/${locale}#about`} className="nav-link text-beige hover:text-orange transition-colors">
                  {t('about')}
                </Link>
                <Link href={`/${locale}#contact`} className="nav-link text-beige hover:text-orange transition-colors">
                  {t('contact')}
                </Link>
                <LanguageSwitcher />
              </div>

              {/* Mobile Menu Button */}
              <div className="md:hidden flex items-center space-x-4">
                <LanguageSwitcher />
                <button 
                  onClick={toggleMobileMenu}
                  className="text-beige hover:text-orange transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                  </svg>
                </button>
              </div>
            </div>

            {/* Mobile Menu */}
            <div className={`md:hidden pb-4 ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
              <div className="flex flex-col space-y-4">
                <Link href={`/${locale}#home`} className="text-beige hover:text-orange transition-colors" onClick={() => setIsMobileMenuOpen(false)}>
                  {t('home')}
                </Link>
                <Link href={`/${locale}#offers`} className="text-beige hover:text-orange transition-colors" onClick={() => setIsMobileMenuOpen(false)}>
                  {t('offers')}
                </Link>
                <Link href={`/${locale}#map`} className="text-beige hover:text-orange transition-colors" onClick={() => setIsMobileMenuOpen(false)}>
                  {t('map')}
                </Link>
                <Link href={`/${locale}#about`} className="text-beige hover:text-orange transition-colors" onClick={() => setIsMobileMenuOpen(false)}>
                  {t('about')}
                </Link>
                <Link href={`/${locale}#contact`} className="text-beige hover:text-orange transition-colors" onClick={() => setIsMobileMenuOpen(false)}>
                  {t('contact')}
                </Link>
              </div>
            </div>
          </div>
        </nav>
  );
};

export default Navbar;