import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  locales: ['en', 'fr'],
  defaultLocale: 'en',
  localeDetection: true,
});

export const config = {
  matcher: [
    // Match everything except API, Next.js static files, sitemap, webmanifest, favicon, images, etc.
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap|site\\.webmanifest|.*\\.(?:png|jpg|jpeg|gif|svg|webp|ico)).*)',
  ],
};
