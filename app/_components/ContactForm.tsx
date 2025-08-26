'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { trackEvent } from './GoogleAnalytics';
import { buildApiUrl } from '../lib/api';

interface FormData {
  name: string;
  familyName: string;
  Email: string;
  phone: string;
  message: string;
}

interface ContactFormProps {
  onSubmit?: (data: FormData) => Promise<void>;
}

export default function ContactForm({ onSubmit }: ContactFormProps = {}) {
  const tContact = useTranslations('contact');
  const [formData, setFormData] = useState<FormData>({
    name: '',
    familyName: '',
    Email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Track form submission start
    trackEvent('form_submit_start', 'contact', 'contact_form');

    try {
      // Simulate API call or call custom onSubmit handler
      if (onSubmit) {
        await onSubmit(formData);
      } else {
        // Default behavior: submit to your backend API
        console.log('Submitting to API:', formData);
        const url = buildApiUrl('/contacts');

        // Prepare data with timestamp and email routing for backend
        const backendData = {
          ...formData,
          messageSentAt: new Date().toISOString(),
        };

        console.log('Backend data:', backendData);
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(backendData),
        });

        console.log('API response:', await response.json());

        if (!response.ok) {
          throw new Error(`API request failed: ${response.status}`);
        }

        console.log('API response:', response);
      }

      setSubmitStatus('success');

      // Track successful form submission
      trackEvent('form_submit_success', 'contact', 'contact_form');

      // Reset form after successful submission
      setTimeout(() => {
        setFormData({
          name: '',
          familyName: '',
          Email: '',
          phone: '',
          message: ''
        });
        setSubmitStatus('idle');
      }, 3000); // Increased timeout to match newsletter form behavior

    } catch (error) {
      setSubmitStatus('error');

      // Track form submission error
      trackEvent('form_submit_error', 'contact', 'contact_form');
      console.error('Form submission error:', error);

      // Reset error status after some time
      setTimeout(() => {
        setSubmitStatus('idle');
      }, 3000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getButtonStyles = () => {
    let baseStyles = "w-full py-4 rounded-2xl font-semibold text-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-orange/50 focus:ring-offset-2 focus:ring-offset-transparent disabled:cursor-not-allowed transform";

    switch (submitStatus) {
      case 'success':
        return `${baseStyles} bg-green-500 text-white scale-105 shadow-lg shadow-green-500/25`;
      case 'error':
        return `${baseStyles} bg-red-500 text-white scale-95`;
      default:
        if (isSubmitting) {
          return `${baseStyles} bg-orange/70 text-white cursor-wait scale-95`;
        }
        return `${baseStyles} bg-orange text-white hover:bg-orange/90 hover:scale-105 active:scale-95 shadow-lg shadow-orange/25`;
    }
  };

  const getButtonContent = () => {
    if (isSubmitting) {
      return (
        <div className="flex items-center justify-center space-x-2">
          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          <span>{tContact('form.sending') || 'Sending...'}</span>
        </div>
      );
    }

    if (submitStatus === 'success') {
      return (
        <div className="flex items-center justify-center space-x-2">
          <span className="text-xl">✓</span>
          <span>{tContact('form.sent') || 'Message Sent!'}</span>
        </div>
      );
    }

    if (submitStatus === 'error') {
      return (
        <div className="flex items-center justify-center space-x-2">
          <span className="text-xl">⚠</span>
          <span>{tContact('form.error') || 'Try Again'}</span>
        </div>
      );
    }

    return tContact('form.sendMessage');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <label className="block mb-3" style={{ color: '#FCE6CE' }}>{tContact('form.firstName')}</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full px-4 py-3 rounded-2xl border transition-all duration-300 focus:outline-none"
            style={{
              backgroundColor: 'rgba(252, 230, 206, 0.1)',
              borderColor: 'rgba(242, 140, 40, 0.3)',
              color: '#FCE6CE'
            }}
            onFocus={(e) => {
              e.target.style.backgroundColor = 'white';
              e.target.style.color = '#001F3F';
              e.target.style.borderColor = '#F28C28';
            }}
            onBlur={(e) => {
              e.target.style.backgroundColor = 'rgba(252, 230, 206, 0.1)';
              e.target.style.color = '#FCE6CE';
              e.target.style.borderColor = 'rgba(242, 140, 40, 0.3)';
            }}
            placeholder="John"
            required
          />
        </div>
        <div>
          <label className="block mb-3" style={{ color: '#FCE6CE' }}>{tContact('form.lastName')}</label>
          <input
            type="text"
            name="familyName"
            value={formData.familyName}
            onChange={handleInputChange}
            className="w-full px-4 py-3 rounded-2xl border transition-all duration-300 focus:outline-none"
            style={{
              backgroundColor: 'rgba(252, 230, 206, 0.1)',
              borderColor: 'rgba(242, 140, 40, 0.3)',
              color: '#FCE6CE'
            }}
            onFocus={(e) => {
              e.target.style.backgroundColor = 'white';
              e.target.style.color = '#001F3F';
              e.target.style.borderColor = '#F28C28';
            }}
            onBlur={(e) => {
              e.target.style.backgroundColor = 'rgba(252, 230, 206, 0.1)';
              e.target.style.color = '#FCE6CE';
              e.target.style.borderColor = 'rgba(242, 140, 40, 0.3)';
            }}
            placeholder="Doe"
            required
          />
        </div>
      </div>

      <div>
        <label className="block mb-3" style={{ color: '#FCE6CE' }}>{tContact('form.email')}</label>
        <input
          type="email"
          name="Email"
          value={formData.Email}
          onChange={handleInputChange}
          className="w-full px-4 py-3 rounded-2xl border transition-all duration-300 focus:outline-none"
          style={{
            backgroundColor: 'rgba(252, 230, 206, 0.1)',
            borderColor: 'rgba(242, 140, 40, 0.3)',
            color: '#FCE6CE'
          }}
          onFocus={(e) => {
            e.target.style.backgroundColor = 'white';
            e.target.style.color = '#001F3F';
            e.target.style.borderColor = '#F28C28';
          }}
          onBlur={(e) => {
            e.target.style.backgroundColor = 'rgba(252, 230, 206, 0.1)';
            e.target.style.color = '#FCE6CE';
            e.target.style.borderColor = 'rgba(242, 140, 40, 0.3)';
          }}
          placeholder="john@example.com"
          required
        />
      </div>

      <div>
        <label className="block mb-3" style={{ color: '#FCE6CE' }}>{tContact('form.phone')}</label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleInputChange}
          className="w-full px-4 py-3 rounded-2xl border transition-all duration-300 focus:outline-none"
          style={{
            backgroundColor: 'rgba(252, 230, 206, 0.1)',
            borderColor: 'rgba(242, 140, 40, 0.3)',
            color: '#FCE6CE'
          }}
          onFocus={(e) => {
            e.target.style.backgroundColor = 'white';
            e.target.style.color = '#001F3F';
            e.target.style.borderColor = '#F28C28';
          }}
          onBlur={(e) => {
            e.target.style.backgroundColor = 'rgba(252, 230, 206, 0.1)';
            e.target.style.color = '#FCE6CE';
            e.target.style.borderColor = 'rgba(242, 140, 40, 0.3)';
          }}
          placeholder="+1 (555) 000-0000"
        />
      </div>

      <div>
        <label className="block mb-3" style={{ color: '#FCE6CE' }}>{tContact('form.message')}</label>
        <textarea
          rows={5}
          name="message"
          value={formData.message}
          onChange={handleInputChange}
          className="w-full px-4 py-3 rounded-2xl border resize-none transition-all duration-300 focus:outline-none"
          style={{
            backgroundColor: 'rgba(252, 230, 206, 0.1)',
            borderColor: 'rgba(242, 140, 40, 0.3)',
            color: '#FCE6CE'
          }}
          onFocus={(e) => {
            e.target.style.backgroundColor = 'white';
            e.target.style.color = '#001F3F';
            e.target.style.borderColor = '#F28C28';
          }}
          onBlur={(e) => {
            e.target.style.backgroundColor = 'rgba(252, 230, 206, 0.1)';
            e.target.style.color = '#FCE6CE';
            e.target.style.borderColor = 'rgba(242, 140, 40, 0.3)';
          }}
          placeholder={tContact('form.messagePlaceholder')}
          required
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className={getButtonStyles()}
        style={{
          backgroundColor: submitStatus === 'success' ? '#10B981' :
            submitStatus === 'error' ? '#EF4444' :
              isSubmitting ? 'rgba(242, 140, 40, 0.7)' : '#F28C28'
        }}
      >
        {getButtonContent()}
      </button>
    </form>
  );
}