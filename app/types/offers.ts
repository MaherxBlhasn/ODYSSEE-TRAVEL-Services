// Types for offers data structure based on your backend response
export interface Offer {
  id: string;
  title: string;
  shortDescription: string;
  bigDescription: string;
  destination: string;
  duration: number;
  stars: number;
  mainImageUrl: string;
  imageUrls: string[];
  available: boolean;
  createdAt: string;
  imageComparison?: {
    hasMainImage: boolean;
    hasGalleryImages: boolean;
    totalImages: number;
    mainImageType: string;
    galleryCount: number;
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
}

export interface OffersResponse {
  success: boolean;
  data: Offer[];
  message?: string;
}
