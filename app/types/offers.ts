// Types for offers data structure based on your backend response
export interface Offer {
  id: string;
  title: string;
  shortDescription: string;
  bigDescription: string;
  destination: string;
  duration: number;
  stars: number;
  mainImage?: string;
  mainImageUrl?: string;
  mainImageFullUrl?: string;
  images?: string[];
  imageUrls?: string[];
  available: boolean;
  createdAt: string;
  updatedAt?: string;
  currentLanguage?: string;
  translations?: {
    en: {
      title: string;
      shortDescription: string;
      bigDescription: string;
      destination: string;
    };
    fr: {
      title: string;
      shortDescription: string;
      bigDescription: string;
      destination: string;
    };
  };
  imageComparison?: {
    hasMainImage: boolean;
    hasGalleryImages: boolean;
    totalImages: number;
    mainImageType: string;
    galleryCount: number;
    mainImageFullUrl?: string;
    galleryImagesFullUrls?: string[];
  };
}

// For compatibility with component
export interface ProcessedOffer {
  id: string;
  title: string;
  description: string;
  stars: string;
  image: string;
  category?: string;
  duration?: string;
  location?: string;
  featured?: boolean;
  translations?: {
    en: {
      title: string;
      shortDescription: string;
      bigDescription: string;
      destination: string;
    };
    fr: {
      title: string;
      shortDescription: string;
      bigDescription: string;
      destination: string;
    };
  };
  bigDescription?: string;
  shortDescription?: string;
  destination?: string;
  images?: string[];
  currentLanguage?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface OffersResponse {
  success: boolean;
  data: Offer[];
  message?: string;
  metadata?: {
    language: string;
    totalOffers: number;
    includesTranslations: boolean;
  };
}
