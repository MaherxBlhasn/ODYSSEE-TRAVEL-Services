import type { Offer, ProcessedOffer } from '../types/offers';

/**
 * Language utility functions for handling multilingual offer data
 */

// Type for supported languages
export type SupportedLanguage = 'en' | 'fr';

// Type for translation fields
export type TranslationField = 'title' | 'shortDescription' | 'bigDescription' | 'destination';

/**
 * Gets localized text from offer translations
 * @param offer - The offer object with translations
 * @param lang - Language code ('en' or 'fr')
 * @param field - Field to get (title, shortDescription, bigDescription, destination)
 * @returns Localized text or fallback to current field
 */
export function getLocalizedText(
  offer: Offer | ProcessedOffer, 
  lang: SupportedLanguage, 
  field: TranslationField
): string {
  if (offer.translations && offer.translations[lang] && offer.translations[lang][field]) {
    return offer.translations[lang][field];
  }
  // Fallback to current language field
  const currentValue = (offer as any)[field];
  return currentValue || '';
}

/**
 * Gets complete offer data in specified language
 * @param offer - The offer object
 * @param lang - Language code ('en' or 'fr')
 * @returns Offer with localized fields
 */
export function getOfferInLanguage(offer: Offer | ProcessedOffer, lang: SupportedLanguage): any {
  if (!offer.translations) {
    return offer;
  }
  
  const translation = offer.translations[lang];
  if (!translation) {
    return offer;
  }

  return {
    ...offer,
    title: translation.title,
    shortDescription: translation.shortDescription,
    bigDescription: translation.bigDescription,
    destination: translation.destination,
    currentLanguage: lang
  };
}

/**
 * Gets all available languages for an offer
 * @param offer - The offer object
 * @returns Array of available language codes
 */
export function getAvailableLanguages(offer: Offer | ProcessedOffer): SupportedLanguage[] {
  if (!offer.translations) {
    return [];
  }
  
  return Object.keys(offer.translations).filter(lang => 
    lang === 'en' || lang === 'fr'
  ) as SupportedLanguage[];
}

/**
 * Checks if offer has translations for a specific language
 * @param offer - The offer object
 * @param lang - Language code to check
 * @returns Boolean indicating if translations exist
 */
export function hasTranslation(offer: Offer | ProcessedOffer, lang: SupportedLanguage): boolean {
  return !!(offer.translations && offer.translations[lang]);
}

/**
 * Gets the best available language for an offer based on preference
 * @param offer - The offer object
 * @param preferredLang - Preferred language
 * @param fallbackLang - Fallback language (default: 'en')
 * @returns Best available language code
 */
export function getBestLanguage(
  offer: Offer | ProcessedOffer, 
  preferredLang: SupportedLanguage, 
  fallbackLang: SupportedLanguage = 'en'
): SupportedLanguage {
  if (hasTranslation(offer, preferredLang)) {
    return preferredLang;
  }
  
  if (hasTranslation(offer, fallbackLang)) {
    return fallbackLang;
  }
  
  const availableLanguages = getAvailableLanguages(offer);
  return availableLanguages.length > 0 ? availableLanguages[0] : 'en';
}

/**
 * Process multiple offers to include localized data for a specific language
 * @param offers - Array of offers
 * @param lang - Language code
 * @returns Array of offers with localized fields
 */
export function localizeOffers(offers: (Offer | ProcessedOffer)[], lang: SupportedLanguage): any[] {
  return offers.map(offer => ({
    ...offer,
    ...getOfferInLanguage(offer, lang)
  }));
}

/**
 * Search offers by text in specific language
 * @param offers - Array of offers to search
 * @param searchText - Text to search for
 * @param lang - Language to search in
 * @param fields - Fields to search in (default: all text fields)
 * @returns Filtered offers matching search criteria
 */
export function searchOffersInLanguage(
  offers: (Offer | ProcessedOffer)[], 
  searchText: string, 
  lang: SupportedLanguage,
  fields: TranslationField[] = ['title', 'shortDescription', 'bigDescription', 'destination']
): (Offer | ProcessedOffer)[] {
  const searchLower = searchText.toLowerCase();
  
  return offers.filter(offer => {
    return fields.some(field => {
      const text = getLocalizedText(offer, lang, field);
      return text.toLowerCase().includes(searchLower);
    });
  });
}

/**
 * Get language-aware image data with proper URLs
 * @param offer - The offer object
 * @returns Object with main image and gallery images
 */
export function getOfferImages(offer: Offer | ProcessedOffer): {
  mainImage: string | null;
  galleryImages: string[];
  allImages: string[];
} {
  // Handle different possible image field names from backend
  const offerAny = offer as any;
  const mainImage = offerAny.mainImageFullUrl || offerAny.mainImage || offerAny.mainImageUrl || offerAny.image || null;
  
  let galleryImages: string[] = [];
  if (offerAny.images) {
    galleryImages = offerAny.images;
  } else if (offerAny.imageUrls) {
    galleryImages = offerAny.imageUrls;
  } else if (offerAny.imageComparison?.galleryImagesFullUrls) {
    galleryImages = offerAny.imageComparison.galleryImagesFullUrls;
  }
  
  const allImages = [
    ...(mainImage ? [mainImage] : []),
    ...galleryImages
  ];
  
  return {
    mainImage,
    galleryImages,
    allImages
  };
}

/**
 * Format offer duration for display
 * @param duration - Duration in days (number)
 * @param lang - Language for formatting
 * @returns Formatted duration string
 */
export function formatDuration(duration: number, lang: SupportedLanguage): string {
  if (lang === 'fr') {
    return duration === 1 ? '1 jour' : `${duration} jours`;
  }
  return duration === 1 ? '1 day' : `${duration} days`;
}

/**
 * Format star rating for display
 * @param stars - Number of stars
 * @param showIcon - Whether to show star icon
 * @returns Formatted stars string
 */
export function formatStars(stars: number, showIcon: boolean = true): string {
  const starIcon = showIcon ? ' ⭐' : '';
  return `${stars}${starIcon}`;
}

// Export all utility functions as a single object for easier importing
export const OfferLanguageUtils = {
  getLocalizedText,
  getOfferInLanguage,
  getAvailableLanguages,
  hasTranslation,
  getBestLanguage,
  localizeOffers,
  searchOffersInLanguage,
  getOfferImages,
  formatDuration,
  formatStars
};
