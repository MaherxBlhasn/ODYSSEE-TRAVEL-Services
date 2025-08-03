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

  const navLinkStyle = {
    color: '#FCE6CE',
    transition: 'all 0.3s ease',
  };

  const navLinkHoverStyle = {
    color: '#F28C28',
    transform: 'scale(1.05)',
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b shadow-lg" style={{
      background: 'rgba(0, 31, 63, 0.95)',
      borderColor: 'rgba(242, 140, 40, 0.3)'
    }}>
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href={`/${locale}`} className="flex items-center space-x-3">
            <div className="overflow-hidden shadow-lg rounded-md">
              <Image
                src="/Logo_Navbar.png"
                alt="Odyssee Travel Services Logo"
                width={0}
                height={0}
                sizes="100vw"
                className="w-auto h-auto object-contain max-h-8 sm:max-h-10 md:max-h-12 lg:max-h-12 xl:max-h-14"
                priority
                unoptimized
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href={`/${locale}#home`}
              className="nav-link transition-all duration-300 hover:text-orange hover:scale-105"
              style={navLinkStyle}
            >
              {t('home')}
            </Link>
            <Link
              href={`/${locale}#offers`}
              className="nav-link transition-all duration-300 hover:text-orange hover:scale-105"
              style={navLinkStyle}
            >
              {t('offers')}
            </Link>
            <Link
              href={`/${locale}#map`}
              className="nav-link transition-all duration-300 hover:text-orange hover:scale-105"
              style={navLinkStyle}
            >
              {t('map')}
            </Link>
            <Link
              href={`/${locale}#about`}
              className="nav-link transition-all duration-300 hover:text-orange hover:scale-105"
              style={navLinkStyle}
            >
              {t('about')}
            </Link>
            <Link
              href={`/${locale}#contact`}
              className="nav-link transition-all duration-300 hover:text-orange hover:scale-105"
              style={navLinkStyle}
            >
              {t('contact')}
            </Link>
            <LanguageSwitcher />
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
            <LanguageSwitcher />
            <button
              onClick={toggleMobileMenu}
              className="transition-all duration-300 hover:text-orange hover:scale-105"
              style={navLinkStyle}
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
            <Link
              href={`/${locale}#home`}
              className="transition-all duration-300 hover:text-orange"
              style={navLinkStyle}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t('home')}
            </Link>
            <Link
              href={`/${locale}#offers`}
              className="transition-all duration-300 hover:text-orange"
              style={navLinkStyle}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t('offers')}
            </Link>
            <Link
              href={`/${locale}#map`}
              className="transition-all duration-300 hover:text-orange"
              style={navLinkStyle}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t('map')}
            </Link>
            <Link
              href={`/${locale}#about`}
              className="transition-all duration-300 hover:text-orange"
              style={navLinkStyle}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t('about')}
            </Link>
            <Link
              href={`/${locale}#contact`}
              className="transition-all duration-300 hover:text-orange"
              style={navLinkStyle}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t('contact')}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;