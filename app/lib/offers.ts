import { buildApiUrl } from './api';
import { OffersResponse, Offer, ProcessedOffer } from '../types/offers';

export async function fetchOffers(): Promise<OffersResponse> {
  try {
    const response = await fetch(buildApiUrl('/offers'), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
      // Add cache revalidation for better performance
      // next: { revalidate: 300 }, //Revalidate every 5 minutes
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const rawData = await response.json();

    // Check if the response is an array of offers or a single offer
    let offers: Offer[] = [];
    
    if (Array.isArray(rawData)) {
      offers = rawData;
    } else if (rawData && typeof rawData === 'object') {
      // If it's a single offer object, wrap it in an array
      offers = [rawData];
    } else if (rawData.data && Array.isArray(rawData.data)) {
      // If it has a data property with array
      offers = rawData.data;
    }

    const data: OffersResponse = {
      success: true,
      data: offers,
      message: 'Offers fetched successfully'
    };
    
    console.log('Processed offers data:', data);
    return data;
  } catch (error) {
    console.error('Error fetching offers:', error);
    // Return empty array on error to prevent UI breaks
    return {
      success: false,
      data: [],
      message: 'Failed to fetch offers'
    };
  }
}

// Helper function to convert backend offer to component format
export function processOfferData(offer: Offer): ProcessedOffer {
  return {
    id: offer.id,
    title: offer.title,
    description: offer.shortDescription || offer.bigDescription,
    stars: `${offer.stars} ⭐`, // Just number and stars
    image: offer.mainImageUrl,
    duration: `${offer.duration} days`,
    location: offer.destination,
    featured: offer.available
  };
}
