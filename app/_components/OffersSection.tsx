import { Suspense } from 'react';
import { OffersLoading } from './OffersLoading';
import { OffersContent } from './OffersContent';


export default async function OffersSection({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  return (
    <Suspense fallback={<OffersLoading locale={locale} />}>
      <OffersContent locale={locale} />
    </Suspense>
  );
}