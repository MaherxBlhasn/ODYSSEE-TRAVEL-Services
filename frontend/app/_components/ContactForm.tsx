'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
}

interface ContactFormProps {
  onSubmit?: (data: FormData) => void;
}

export default function ContactForm({ onSubmit }: ContactFormProps) {
  const tContact = useTranslations('contact');
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
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

    try {
      // Simulate API call or call custom onSubmit handler
      if (onSubmit) {
        await onSubmit(formData);
      } else {
        // Default behavior: simulate form submission
        await new Promise(resolve => setTimeout(resolve, 1000));
      }

      setSubmitStatus('success');
      
      // Reset form after successful submission
      setTimeout(() => {
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          message: ''
        });
        setSubmitStatus('idle');
      }, 2000);
      
    } catch (error) {
      setSubmitStatus('error');
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getButtonText = () => {
    if (isSubmitting) return tContact('form.sending') || 'Sending...';
    if (submitStatus === 'success') return tContact('form.sent') || 'Message Sent!';
    if (submitStatus === 'error') return tContact('form.error') || 'Error - Try Again';
    return tContact('form.sendMessage');
  };

  const getButtonClass = () => {
    let baseClass = "w-full py-4 rounded-2xl font-semibold text-lg transition-all duration-300";
    
    if (submitStatus === 'success') {
      return `${baseClass} bg-green-500 text-white`;
    }
    if (submitStatus === 'error') {
      return `${baseClass} bg-red-500 text-white`;
    }
    return `${baseClass} btn-primary text-white`;
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <label className="block text-beige mb-3">{tContact('form.firstName')}</label>
          <input 
            type="text" 
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            className="w-full px-4 py-3 rounded-2xl bg-beige/10 border border-orange/20 text-beige placeholder-beige/60 focus:border-orange focus:outline-none focus:bg-white focus:text-navy transition-all duration-300" 
            placeholder="John"
            required
          />
        </div>
        <div>
          <label className="block text-beige mb-3">{tContact('form.lastName')}</label>
          <input 
            type="text" 
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            className="w-full px-4 py-3 rounded-2xl bg-beige/10 border border-orange/20 text-beige placeholder-beige/60 focus:border-orange focus:outline-none focus:bg-white focus:text-navy transition-all duration-300" 
            placeholder="Doe"
            required
          />
        </div>
      </div>
      
      <div>
        <label className="block text-beige mb-3">{tContact('form.email')}</label>
        <input 
          type="email" 
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          className="w-full px-4 py-3 rounded-2xl bg-beige/10 border border-orange/20 text-beige placeholder-beige/60 focus:border-orange focus:outline-none focus:bg-white focus:text-navy transition-all duration-300" 
          placeholder="john@example.com"
          required
        />
      </div>

      <div>
        <label className="block text-beige mb-3">{tContact('form.phone')}</label>
        <input 
          type="tel" 
          name="phone"
          value={formData.phone}
          onChange={handleInputChange}
          className="w-full px-4 py-3 rounded-2xl bg-beige/10 border border-orange/20 text-beige placeholder-beige/60 focus:border-orange focus:outline-none focus:bg-white focus:text-navy transition-all duration-300" 
          placeholder="+1 (555) 000-0000"
        />
      </div>

      <div>
        <label className="block text-beige mb-3">{tContact('form.message')}</label>
        <textarea 
          rows={5} 
          name="message"
          value={formData.message}
          onChange={handleInputChange}
          className="w-full px-4 py-3 rounded-2xl bg-beige/10 border border-orange/20 text-beige placeholder-beige/60 focus:border-orange focus:outline-none focus:bg-white focus:text-navy resize-none transition-all duration-300" 
          placeholder={tContact('form.messagePlaceholder')}
          required
        />
      </div>

      <button 
        type="submit" 
        disabled={isSubmitting}
        className={getButtonClass()}
      >
        {getButtonText()}
      </button>
    </form>
  );
}
