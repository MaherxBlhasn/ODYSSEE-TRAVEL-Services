'use client';

import { useTranslations, useLocale } from 'next-intl';

export function useI18n() {
  const locale = useLocale();
  const t = useTranslations();
  
  const getLocalizedPath = (path: string) => {
    // Remove leading slash if present
    const cleanPath = path.startsWith('/') ? path.slice(1) : path;
    return `/${locale}${cleanPath ? `/${cleanPath}` : ''}`;
  };
  
  return {
    locale,
    t,
    getLocalizedPath,
    isEnglish: locale === 'en',
    isFrench: locale === 'fr'
  };
}

// Specific translation hooks for common use cases
export function useNavbarTranslations() {
  return useTranslations('navbar');
}

export function useFooterTranslations() {
  return useTranslations('footer');
}

export function useCompanyTranslations() {
  return useTranslations('company');
}

export function useLanguageTranslations() {
  return useTranslations('language');
}
