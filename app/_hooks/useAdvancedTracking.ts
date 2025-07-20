'use client';

import { useEffect } from 'react';
import { trackEvent } from '../_components/GoogleAnalytics';

export default function useAdvancedTracking() {
  useEffect(() => {
    // Track scroll depth
    let maxScrollDepth = 0;
    const trackScrollDepth = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = window.scrollY;
      const scrollPercent = Math.round((scrolled / scrollHeight) * 100);
      
      // Track at 25%, 50%, 75%, 90% intervals
      const milestones = [25, 50, 75, 90];
      milestones.forEach(milestone => {
        if (scrollPercent >= milestone && maxScrollDepth < milestone) {
          maxScrollDepth = milestone;
          trackEvent('scroll_depth', 'engagement', `${milestone}_percent`, milestone);
        }
      });
    };

    // Track time on page
    const startTime = Date.now();
    const trackTimeOnPage = () => {
      const timeSpent = Math.round((Date.now() - startTime) / 1000); // in seconds
      if (timeSpent > 30) { // Only track if user spent more than 30 seconds
        trackEvent('time_on_page', 'engagement', 'page_duration', timeSpent);
      }
    };

    // Track external link clicks
    const trackExternalLinks = (e: Event) => {
      const target = e.target as HTMLAnchorElement;
      if (target.tagName === 'A' && target.href) {
        const isExternal = !target.href.includes(window.location.hostname);
        if (isExternal) {
          trackEvent('external_link_click', 'outbound', target.href);
        }
      }
    };

    // Track button clicks
    const trackButtonClicks = (e: Event) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'BUTTON' || target.closest('button')) {
        const button = target.tagName === 'BUTTON' ? target : target.closest('button');
        const buttonText = button?.textContent?.trim().substring(0, 50) || 'Unknown Button';
        trackEvent('button_click', 'interaction', buttonText);
      }
    };

    // Track section visibility (using Intersection Observer)
    const trackSectionViews = () => {
      const sections = document.querySelectorAll('section[id], div[id*="section"]');
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && entry.target.id) {
              trackEvent('section_view', 'engagement', entry.target.id);
            }
          });
        },
        { threshold: 0.5 } // Trigger when 50% visible
      );

      sections.forEach(section => observer.observe(section));
      return () => observer.disconnect();
    };

    // Add event listeners
    window.addEventListener('scroll', trackScrollDepth, { passive: true });
    window.addEventListener('beforeunload', trackTimeOnPage);
    document.addEventListener('click', trackExternalLinks);
    document.addEventListener('click', trackButtonClicks);
    
    const cleanupSectionTracking = trackSectionViews();

    // Cleanup
    return () => {
      window.removeEventListener('scroll', trackScrollDepth);
      window.removeEventListener('beforeunload', trackTimeOnPage);
      document.removeEventListener('click', trackExternalLinks);
      document.removeEventListener('click', trackButtonClicks);
      cleanupSectionTracking();
    };
  }, []);

  return null;
}
