'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

export default function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const t = useTranslations('newsletter');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) return;

    setStatus('sending');

    // Simulate API call - replace with actual newsletter subscription logic
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setStatus('sent');
      setEmail('');
      
      // Reset status after 2 seconds
      setTimeout(() => {
        setStatus('idle');
      }, 2000);
    } catch (error) {
      setStatus('error');
      
      // Reset status after 3 seconds
      setTimeout(() => {
        setStatus('idle');
      }, 3000);
    }
  };

  const getButtonText = () => {
    switch (status) {
      case 'sending': return t('sending');
      case 'sent': return t('subscribed');
      case 'error': return t('error');
      default: return t('subscribe');
    }
  };

  const getButtonStyles = () => {
    const baseStyles = "px-6 py-2 rounded-r-full font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-orange/50";
    
    switch (status) {
      case 'sending': 
        return `${baseStyles} bg-orange/70 text-white cursor-not-allowed`;
      case 'sent': 
        return `${baseStyles} bg-green-500 text-white`;
      case 'error': 
        return `${baseStyles} bg-red-500 text-white`;
      default: 
        return `${baseStyles} bg-orange text-white hover:bg-orange/80`;
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex" role="form" aria-label={t('title')}>
      <input 
        type="email" 
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={status === 'sending'}
        className="flex-1 px-4 py-2 rounded-l-full bg-beige/10 border border-orange/20 text-beige focus:border-orange focus:outline-none focus:ring-2 focus:ring-orange/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200" 
        placeholder={t('placeholder')}
        required
        aria-label={t('emailLabel')}
      />
      <button 
        type="submit"
        disabled={status === 'sending' || !email}
        className={getButtonStyles()}
        aria-label={getButtonText()}
      >
        {getButtonText()}
      </button>
    </form>
  );
}
