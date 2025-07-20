# Google Analytics Implementation Guide

## Overview
This project now includes a comprehensive Google Analytics implementation using Next.js best practices.

## Features
- ✅ Proper Next.js Script component usage
- ✅ Automatic page view tracking on route changes
- ✅ Custom event tracking capabilities
- ✅ Environment-specific configuration
- ✅ TypeScript support
- ✅ Privacy-compliant settings
- ✅ Form submission tracking example

## Files Structure
```
app/
├── lib/
│   └── analytics.ts          # GA configuration and settings
├── _components/
│   └── GoogleAnalytics.tsx   # Main GA component
├── _hooks/
│   └── useGoogleAnalytics.ts # Hook for tracking page views
└── [locale]/
    └── layout.tsx            # Root layout with GA integration
```

## Configuration

### 1. Environment Variables
Create a `.env.local` file (not committed to git):
```env
NEXT_PUBLIC_GA_TRACKING_ID=G-2H1KZ0DHN7
NODE_ENV=production
NEXT_PUBLIC_GA_DEBUG=false
```

### 2. Analytics Settings
The configuration in `app/lib/analytics.ts` includes:
- Privacy-compliant settings (anonymize_ip, no ad personalization)
- Environment detection (only loads in production)
- Custom tracking parameters

## Usage

### Automatic Tracking
- **Page Views**: Automatically tracked on route changes
- **Initial Load**: Tracked when the app loads

### Manual Event Tracking
```typescript
import { trackEvent, trackConversion } from '../_components/GoogleAnalytics';

// Track custom events
trackEvent('button_click', 'navigation', 'hero_cta');

// Track form submissions
trackEvent('form_submit_success', 'contact', 'contact_form');

// Track conversions
trackConversion('AW-XXXXXXXXX/XXXXXXXXX', 100, 'USD');
```

## Implementation Details

### 1. Script Loading Strategy
- Uses `next/script` with `afterInteractive` strategy
- Ensures proper loading order and performance
- Only loads in production environment

### 2. Page View Tracking
- Uses `usePathname` hook to detect route changes
- Automatically sends page views with proper metadata
- Includes page title and location

### 3. Privacy Compliance
- IP anonymization enabled
- Google Signals disabled
- Ad personalization disabled
- SameSite cookie settings

## Testing

### Development Environment
In development, Google Analytics is disabled to avoid polluting production data.

### Production Testing
1. Deploy to production
2. Check browser developer tools > Network tab for GA requests
3. Verify `gtag` calls in browser console
4. Use Google Analytics Real-Time reports

### Debug Mode
Set `NEXT_PUBLIC_GA_DEBUG=true` to enable debug logging:
```javascript
gtag('config', 'GA_TRACKING_ID', {
  debug_mode: true
});
```

## Event Tracking Examples

### Contact Form Events
Already implemented in `ContactForm.tsx`:
- `form_submit_start` - When user starts submitting
- `form_submit_success` - Successful submission
- `form_submit_error` - Submission error

### Additional Events You Can Add
```typescript
// Newsletter signup
trackEvent('newsletter_signup', 'engagement', 'footer_form');

// External link clicks
trackEvent('external_link_click', 'outbound', 'social_media');

// File downloads
trackEvent('file_download', 'engagement', 'brochure_pdf');

// Scroll depth
trackEvent('scroll_depth', 'engagement', '75_percent');
```

## Best Practices

### 1. Event Naming Convention
- Use underscores for multi-word events
- Keep names descriptive but concise
- Use consistent categories

### 2. Data Privacy
- Always inform users about analytics
- Provide opt-out mechanisms if required
- Follow GDPR/CCPA guidelines

### 3. Performance
- Scripts load after page interaction
- No blocking of critical rendering path
- Minimal impact on Core Web Vitals

## Troubleshooting

### Common Issues
1. **Events not showing**: Check if `NODE_ENV=production`
2. **Script not loading**: Verify tracking ID
3. **Console errors**: Check TypeScript declarations

### Debugging Steps
1. Check browser Network tab for GA requests
2. Verify `window.gtag` function exists
3. Use GA Real-Time reports
4. Check browser console for errors

## Google Analytics 4 Reports

### Recommended Reports to Monitor
1. **Real-time**: Live user activity
2. **Acquisition**: Traffic sources
3. **Engagement**: Page views, events
4. **Conversions**: Form submissions, goals

### Custom Events Dashboard
Create custom reports for:
- Form submission rates
- Button click tracking
- User engagement metrics
- Page performance data

## Migration Notes
If migrating from Universal Analytics (GA3):
- Update tracking ID format (GA_TRACKING_ID → G-XXXXXXXXX)
- Review event naming conventions
- Update custom dimensions/metrics
- Test all tracking implementations

## Security Considerations
- Tracking ID is public (safe to expose)
- No sensitive data in tracking calls
- HTTPS-only cookie transmission
- SameSite cookie protection

## Next Steps
1. Set up Google Analytics 4 property
2. Configure conversion goals
3. Set up custom audiences
4. Implement enhanced ecommerce (if applicable)
5. Connect to Google Ads (if running campaigns)
