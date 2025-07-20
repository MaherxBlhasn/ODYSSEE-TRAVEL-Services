# Google Analytics Production Guide

## 🚀 **Production Setup**

### **Environment Variables for Production:**
```bash
NEXT_PUBLIC_GA_TRACKING_ID=G-2H1KZ0DHN7
NODE_ENV=production
NEXT_PUBLIC_GA_DEBUG=false
NEXT_PUBLIC_GA_FORCE_ENABLE=false
NEXT_PUBLIC_SHOW_GA_TEST_PANEL=false
```

### **Deployment Checklist:**
- ✅ Set environment variables in your hosting platform
- ✅ Verify GA tracking ID is correct
- ✅ Test in production environment
- ✅ Check Real-time reports show data

## 📊 **What Gets Tracked Automatically**

### **Page Views:**
- Every page visit and navigation
- Single Page Application (SPA) route changes
- Referrer information
- Page titles and URLs

### **User Interactions:**
- **Button Clicks**: All button interactions with button text
- **External Links**: Clicks to external websites
- **Form Submissions**: Contact form success/error events
- **Scroll Depth**: 25%, 50%, 75%, 90% scroll milestones
- **Time on Page**: How long users spend on each page
- **Section Views**: When users view different sections (50% visibility)

### **Engagement Metrics:**
- Session duration
- Bounce rate
- Pages per session
- User flow through your site

## 🎯 **Key Metrics to Monitor**

### **1. Traffic & Acquisition**
- **Users**: Total unique visitors
- **Sessions**: Number of visits
- **Page Views**: Total pages viewed
- **Traffic Sources**: Where users come from
  - Direct traffic
  - Search engines
  - Social media
  - Referral sites

### **2. User Behavior**
- **Most Popular Pages**: Which pages get the most visits
- **Bounce Rate**: % of single-page sessions
- **Average Session Duration**: How long users stay
- **Scroll Depth**: How far users scroll on pages

### **3. Conversions**
- **Contact Form Submissions**: Form completion rate
- **Button Clicks**: Which CTAs perform best
- **External Link Clicks**: Interest in external resources
- **Section Engagement**: Which sections users view most

## 📱 **Google Analytics Dashboard Setup**

### **Essential Reports to Check:**

1. **Real-time Reports** (`Reports > Real-time`)
   - Live user activity
   - Current page views
   - Traffic sources

2. **Acquisition Reports** (`Reports > Acquisition`)
   - Traffic sources overview
   - User acquisition
   - Traffic acquisition

3. **Engagement Reports** (`Reports > Engagement`)
   - Page views and screens
   - Events
   - Conversions

4. **Custom Events** (`Reports > Engagement > Events`)
   - `scroll_depth` - User scroll behavior
   - `button_click` - Button interaction rates
   - `form_submit_success` - Contact form conversions
   - `external_link_click` - Outbound link interest
   - `section_view` - Content engagement

### **Setting Up Custom Conversions:**
1. Go to `Admin > Events > Create Event`
2. Create conversions for:
   - Contact form submissions
   - Newsletter signups
   - External link clicks
   - Deep scroll engagement (90%+)

## 🔍 **How to Analyze Your Data**

### **Daily Monitoring (5 minutes):**
- Check Real-time reports for current activity
- Monitor traffic spikes or drops
- Check for any error events

### **Weekly Analysis (30 minutes):**
- Review traffic sources and trends
- Analyze most popular pages
- Check conversion rates
- Monitor user engagement metrics

### **Monthly Deep Dive (2 hours):**
- Compare month-over-month growth
- Analyze user flow and behavior
- Identify top-performing content
- Plan improvements based on data

## 📈 **Understanding Key Events**

### **Page Views:**
```javascript
// Automatically tracked on each page/route change
gtag('config', 'GA_TRACKING_ID', {
  page_path: '/about',
  page_title: 'About Us - Odyssee Travel'
});
```

### **Scroll Depth:**
```javascript
// Tracked at 25%, 50%, 75%, 90% scroll points
gtag('event', 'scroll_depth', {
  event_category: 'engagement',
  event_label: '75_percent',
  value: 75
});
```

### **Button Clicks:**
```javascript
// All button interactions
gtag('event', 'button_click', {
  event_category: 'interaction',
  event_label: 'Get Started Now'
});
```

### **Form Submissions:**
```javascript
// Contact form completions
gtag('event', 'form_submit_success', {
  event_category: 'contact',
  event_label: 'contact_form'
});
```

## 🎨 **Custom Dashboard Creation**

### **Travel Website Specific Metrics:**
1. **Contact Form Performance**
   - Form views vs submissions
   - Form completion rate
   - Error rate analysis

2. **Service Page Engagement**
   - Time spent on service pages
   - Scroll depth on service descriptions
   - Click-through to contact forms

3. **Geographic Analysis**
   - Visitor locations
   - Popular destinations interest
   - Regional traffic patterns

4. **Device & Technology**
   - Mobile vs desktop usage
   - Browser performance
   - Page load times

## 🚨 **Alerts & Monitoring**

### **Set Up Intelligence Alerts:**
1. Traffic spike detection (>50% increase)
2. Traffic drop alerts (>30% decrease)
3. Conversion rate changes
4. Site speed issues

### **Weekly Report Automation:**
1. Go to `Reports > Library`
2. Create custom reports for:
   - Traffic summary
   - Conversion overview
   - Top content performance

## 🛡️ **Privacy Compliance**

### **Current Settings:**
- ✅ IP Anonymization enabled
- ✅ Google Signals disabled
- ✅ Ad personalization disabled
- ✅ Secure cookie transmission

### **GDPR/CCPA Compliance:**
- Consider cookie consent banners
- Provide opt-out mechanisms
- Document data collection practices
- Regular privacy policy updates

## 📞 **Troubleshooting Production Issues**

### **Common Problems:**

1. **No Data Showing:**
   - Verify tracking ID is correct
   - Check environment variables
   - Confirm scripts are loading (Network tab)

2. **Incorrect Event Tracking:**
   - Verify custom events are firing
   - Check event parameters
   - Test in different browsers

3. **Missing Page Views:**
   - Check SPA routing configuration
   - Verify manual page view tracking
   - Test navigation between pages

### **Testing in Production:**
1. Use GA Real-time reports
2. Test all user interactions
3. Verify mobile responsiveness
4. Check cross-browser compatibility

## 📊 **Success Metrics for Travel Website**

### **Key Performance Indicators (KPIs):**
- **Traffic Growth**: Month-over-month increase
- **Engagement Rate**: Time on site + pages per session
- **Contact Form Conversion**: % of visitors who submit forms
- **Service Page Performance**: Views and engagement on offer pages
- **Mobile Usage**: Mobile traffic percentage and behavior

### **Benchmarks to Aim For:**
- Contact form conversion rate: 2-5%
- Average session duration: 2-4 minutes
- Bounce rate: 40-60%
- Pages per session: 2-4 pages
- Mobile traffic: 50-70%

This comprehensive tracking will give you deep insights into how users interact with your travel website! 🎉
