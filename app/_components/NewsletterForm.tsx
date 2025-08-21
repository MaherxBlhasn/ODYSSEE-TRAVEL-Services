'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { buildApiUrl } from '../lib/api';

export default function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const t = useTranslations('newsletter');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) return;

    setStatus('sending');
    setErrorMessage(null);

    try {
      console.log('Subscribing email:', email);
      const url = buildApiUrl('/newspaper');
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || data.message || `API request failed: ${response.status}`);
      }

      console.log('Newsletter API response:', data);
      setStatus('sent');
      setEmail('');
      setShowModal(true);

      setTimeout(() => {
        setStatus('idle');
        setShowModal(false);
      }, 4000);
    } catch (error: any) {
      console.error('Newsletter subscription error:', error);
      setStatus('error');
      setErrorMessage(error.message || t('error'));

      setTimeout(() => {
        setErrorMessage(null);
        setStatus('idle');
      }, 5000);
    }
  };

  const getInputStyles = () => {
    let styles = "w-full px-4 py-3 text-base rounded-xl border-2 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-orange/30 disabled:opacity-50 disabled:cursor-not-allowed placeholder-opacity-70";

    if (status === 'error') {
      styles += " border-red-400 bg-red-50/10 text-red-100 placeholder-red-200";
    } else if (status === 'sent') {
      styles += " border-green-400 bg-green-50/10 text-green-100";
    } else {
      styles += " border-orange/30 hover:border-orange/50 focus:border-orange text-orange-50";
    }

    return styles;
  };

  const getButtonStyles = () => {
    let baseStyles = "w-full mt-3 px-6 py-3 rounded-xl font-semibold text-base transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-orange/50 focus:ring-offset-2 focus:ring-offset-transparent disabled:cursor-not-allowed transform";

    switch (status) {
      case 'sending':
        return `${baseStyles} bg-orange/70 text-white cursor-wait scale-95`;
      case 'sent':
        return `${baseStyles} bg-green-500 text-white scale-105 shadow-lg shadow-green-500/25`;
      case 'error':
        return `${baseStyles} bg-red-500 text-white scale-95`;
      default:
        return `${baseStyles} bg-orange text-white hover:bg-orange/90 hover:scale-105 active:scale-95 shadow-lg shadow-orange/25`;
    }
  };

  const getButtonContent = () => {
    switch (status) {
      case 'sending':
        return (
          <div className="flex items-center justify-center space-x-2">
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            <span>{t('sending')}</span>
          </div>
        );
      case 'sent':
        return (
          <div className="flex items-center justify-center space-x-2">
            <span className="text-xl">✓</span>
            <span>{t('subscribed')}</span>
          </div>
        );
      case 'error':
        return (
          <div className="flex items-center justify-center space-x-2">
            <span className="text-xl">⚠</span>
            <span>Try Again</span>
          </div>
        );
      default:
        return (
          <div className="flex items-center justify-center space-x-2">
            <span>{t('subscribe')}</span>
            <span className="text-xl transition-transform duration-300 group-hover:translate-x-1">✨</span>
          </div>
        );
    }
  };

  return (
    <>
      {/* Newsletter Form */}
      <div className="w-full max-w-sm mx-auto relative">
        <form onSubmit={handleSubmit} className="space-y-3" role="form" aria-label={t('title')}>
          <div className="relative">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={status === 'sending'}
              className={getInputStyles()}
              style={{
                backgroundColor: 'rgba(252, 230, 206, 0.1)',
                backdropFilter: 'blur(10px)'
              }}
              placeholder={t('placeholder')}
              required
              aria-label={t('emailLabel')}
            />
            {status === 'sent' && (
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-400">
                <span className="text-xl animate-bounce">✓</span>
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={status === 'sending' || !email}
            className={`${getButtonStyles()} group`}
            style={{
              backgroundColor: status === 'sending' ? 'rgba(242, 140, 40, 0.7)' :
                status === 'sent' ? '#10B981' :
                  status === 'error' ? '#EF4444' : '#F28C28'
            }}
            aria-label={status === 'idle' ? t('subscribe') : status}
          >
            {getButtonContent()}
          </button>
        </form>

        {/* Error Message */}
        {errorMessage && (
          <div className="mt-3 p-3 rounded-lg bg-red-500/10 border border-red-500/20 backdrop-blur-sm animate-slideIn">
            <div className="flex items-center space-x-2 text-red-400 text-sm">
              <span className="text-lg">⚠️</span>
              <span>{errorMessage}</span>
            </div>
          </div>
        )}
      </div>

      {/* Success Modal */}
      {showModal && status === 'sent' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fadeIn">
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 max-w-md w-full mx-4 shadow-2xl border border-green-500/20 animate-scaleIn">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-green-500/20 rounded-full flex items-center justify-center">
                <span className="text-3xl text-green-400 animate-bounce">🎉</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Welcome Aboard!</h3>
              <p className="text-slate-300 mb-4">
                Thank you for subscribing! You'll receive the best travel deals and tips directly in your inbox.
              </p>
              <div className="flex items-center justify-center space-x-2 text-green-400 text-sm">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                <span>Subscription confirmed</span>
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="mt-4 px-4 py-2 text-sm text-slate-400 hover:text-white transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideIn {
          from { 
            opacity: 0;
            transform: translateY(-10px);
          }
          to { 
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes scaleIn {
          from { 
            opacity: 0;
            transform: scale(0.9);
          }
          to { 
            opacity: 1;
            transform: scale(1);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        
        .animate-slideIn {
          animation: slideIn 0.3s ease-out;
        }
        
        .animate-scaleIn {
          animation: scaleIn 0.3s ease-out;
        }
      `}</style>
    </>
  );
}