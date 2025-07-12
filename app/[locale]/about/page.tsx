import { getTranslations } from 'next-intl/server';

export default async function AboutPage() {
  const t = await getTranslations('navbar');
  
  return (
    <div className="min-h-screen pt-20 px-6">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-beige mb-8">{t('about')}</h1>
        <p className="text-beige/80">This is the about page.</p>
      </div>
    </div>
  );
}
