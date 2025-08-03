'use client';

import { useState, useEffect } from 'react';
import { trackEvent } from './GoogleAnalytics';
import { GA_TRACKING_ID, GA_ENABLED, GA_DEBUG } from '../lib/analytics';

export default function GATestPanel() {
  const [gaStatus, setGaStatus] = useState({
    scriptLoaded: false,
    gtagAvailable: false,
    dataLayerExists: false
  });

  useEffect(() => {
    // Check GA status periodically
    const checkGAStatus = () => {
      setGaStatus({
        scriptLoaded: !!document.querySelector('script[src*="googletagmanager.com"]'),
        gtagAvailable: typeof window.gtag === 'function',
        dataLayerExists: Array.isArray(window.dataLayer)
      });
    };

    checkGAStatus();
    const interval = setInterval(checkGAStatus, 1000);
    
    return () => clearInterval(interval);
  }, []);

  // Only show in development AND when enabled via env variable
  if (process.env.NODE_ENV !== 'development' || process.env.NEXT_PUBLIC_SHOW_GA_TEST_PANEL !== 'true') {
    return null;
  }

  const testEvents = [
    {
      name: 'Button Click',
      action: () => trackEvent('test_button_click', 'testing', 'ga_test_panel')
    },
    {
      name: 'Form Interaction',
      action: () => trackEvent('test_form_interaction', 'testing', 'ga_test_panel')
    },
    {
      name: 'Custom Event',
      action: () => trackEvent('custom_test_event', 'engagement', 'user_testing', 100)
    },
    {
      name: 'Navigation Test',
      action: () => trackEvent('test_navigation', 'navigation', 'internal_link')
    },
    {
      name: 'Debug Info',
      action: () => {
        // console.group('🔍 GA Debug Information');
        // console.log('GA_ENABLED:', GA_ENABLED);
        // console.log('GA_DEBUG:', GA_DEBUG);
        // console.log('GA_TRACKING_ID:', GA_TRACKING_ID);
        // console.log('Script loaded:', gaStatus.scriptLoaded);
        // console.log('gtag available:', gaStatus.gtagAvailable);
        // console.log('dataLayer exists:', gaStatus.dataLayerExists);
        // console.log('dataLayer content:', window.dataLayer);
        // console.log('All GA scripts:', Array.from(document.querySelectorAll('script[src*="google"]')));
        console.groupEnd();
      }
    }
  ];

  return (
    <div style={{
      position: 'fixed',
      top: '10px',
      right: '10px',
      backgroundColor: 'rgba(40, 40, 40, 0.95)',
      color: 'white',
      padding: '15px',
      borderRadius: '8px',
      fontSize: '12px',
      zIndex: 9999,
      fontFamily: 'monospace',
      border: '1px solid #666',
      minWidth: '250px'
    }}>
      <div style={{ fontWeight: 'bold', marginBottom: '10px', color: '#4CAF50' }}>
        🧪 GA Test Panel
      </div>
      
      {/* Status indicators */}
      <div style={{ marginBottom: '10px', fontSize: '10px' }}>
        <div>📊 Enabled: {GA_ENABLED ? '✅' : '❌'}</div>
        <div>📋 Script: {gaStatus.scriptLoaded ? '✅' : '❌'}</div>
        <div>🔧 gtag: {gaStatus.gtagAvailable ? '✅' : '❌'}</div>
        <div>📦 dataLayer: {gaStatus.dataLayerExists ? '✅' : '❌'}</div>
      </div>
      
      {testEvents.map((test, index) => (
        <button
          key={index}
          onClick={() => {
            test.action();
            console.log(`🎯 Fired event: ${test.name}`);
          }}
          style={{
            display: 'block',
            width: '100%',
            margin: '4px 0',
            padding: '6px 8px',
            backgroundColor: '#007ACC',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '11px'
          }}
          onMouseOver={(e) => (e.target as HTMLButtonElement).style.backgroundColor = '#005A9E'}
          onMouseOut={(e) => (e.target as HTMLButtonElement).style.backgroundColor = '#007ACC'}
        >
          {test.name}
        </button>
      ))}
      
      <div style={{ 
        marginTop: '10px', 
        padding: '8px', 
        backgroundColor: 'rgba(0,0,0,0.3)', 
        borderRadius: '4px',
        fontSize: '10px'
      }}>
        💡 Check browser console and Network tab after clicking buttons
      </div>
    </div>
  );
}
