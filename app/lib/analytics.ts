// Google Analytics configuration
export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_TRACKING_ID || 'G-2H1KZ0DHN7';

// Enable Google Analytics in production OR when force enabled OR in debug mode
export const GA_ENABLED = 
  process.env.NODE_ENV === 'production' || 
  process.env.NEXT_PUBLIC_GA_FORCE_ENABLE === 'true' ||
  process.env.NEXT_PUBLIC_GA_DEBUG === 'true';

// Debug mode for development
export const GA_DEBUG = process.env.NEXT_PUBLIC_GA_DEBUG === 'true';

// Google Analytics configuration options
export const GA_CONFIG = {
  // Enhanced measurement settings
  send_page_view: false, // We'll manually send page views
  cookie_flags: 'SameSite=None;Secure',
  
  // Debug mode for development
  debug_mode: GA_DEBUG,
  
  // Custom parameters
  custom_map: {
    custom_parameter_1: 'page_type',
  },
  
  // Privacy settings
  anonymize_ip: true,
  allow_google_signals: false,
  allow_ad_personalization_signals: false,
};
