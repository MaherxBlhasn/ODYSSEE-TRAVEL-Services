import { buildApiUrl } from './api';
import { OffersResponse, Offer, ProcessedOffer } from '../types/offers';

export async function fetchOffers(): Promise<OffersResponse> {
  try {
    const response = await fetch(buildApiUrl('/offers?includeTranslations=true'), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    let rawData = await response.json();
    
    // The backend returns { offers: [...], metadata: {...} }
    let offers: Offer[] = [];
    
    if (rawData && Array.isArray(rawData.offers)) {
      offers = rawData.offers;
    } else if (Array.isArray(rawData)) {
      offers = rawData;
    } else if (rawData.data && Array.isArray(rawData.data)) {
      offers = rawData.data;
    }

    const data: OffersResponse = {
      success: true,
      data: offers,
      message: 'Offers fetched successfully',
      metadata: rawData.metadata || undefined
    };
    
    return data;
  } catch (error) {
    console.error('Error fetching offers:', error);
    return {
      success: false,
      data: [],
      message: 'Failed to fetch offers'
    };
  }
}// Helper function to convert backend offer to component format
export function processOfferData(offer: Offer): ProcessedOffer {
  return {
    id: offer.id,
    title: offer.title,
    description: offer.shortDescription || offer.bigDescription,
    stars: `${offer.stars} ⭐`,
    image: offer.mainImage || offer.mainImageUrl || '',
    duration: `${offer.duration} days`,
    location: offer.destination,
    featured: offer.available,
    translations: offer.translations,
    bigDescription: offer.bigDescription,
    shortDescription: offer.shortDescription,
    destination: offer.destination,
    images: offer.images,
    currentLanguage: offer.currentLanguage,
    createdAt: offer.createdAt,
    updatedAt: offer.updatedAt
  };
}

// Fetch single offer by ID with all translations
export async function fetchOfferById(id: string): Promise<{ success: boolean; data?: Offer; message?: string }> {
  try {
    const response = await fetch(buildApiUrl(`/offers/${id}`), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const offerData = await response.json();
    
    return {
      success: true,
      data: offerData,
      message: 'Offer fetched successfully'
    };
  } catch (error) {
    console.error('Error fetching offer by ID:', error);
    return {
      success: false,
      message: 'Failed to fetch offer'
    };
  }
}
