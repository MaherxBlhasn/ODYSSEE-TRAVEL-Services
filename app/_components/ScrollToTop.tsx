'use client';

import { useEffect } from 'react';

export default function ScrollToTop() {
  useEffect(() => {
    // Scroll to top when component mounts (page loads)
    window.scrollTo(0, 0);
  }, []);

  return null; // This component doesn't render anything
}
