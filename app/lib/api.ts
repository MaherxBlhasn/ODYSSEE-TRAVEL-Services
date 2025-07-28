// Simple API configuration
export const API_CONFIG = {
  baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || 'https://your-backend-domain.com/api',
};

// Helper function to build API URLs
export const buildApiUrl = (endpoint: string): string => {
  const baseUrl = API_CONFIG.baseUrl.endsWith('/') 
    ? API_CONFIG.baseUrl.slice(0, -1) 
    : API_CONFIG.baseUrl;
  
  const path = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  
  return `${baseUrl}${path}`;
};
