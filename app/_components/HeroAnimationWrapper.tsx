'use client';

import { useEffect } from 'react';
import useHeroAnimations from '../_hooks/useHeroAnimations';

interface HeroAnimationWrapperProps {
  children: React.ReactNode;
}

export default function HeroAnimationWrapper({ children }: HeroAnimationWrapperProps) {
  // This hook will handle all hero animations including language changes
  useHeroAnimations();
  
  return <>{children}</>;
}
