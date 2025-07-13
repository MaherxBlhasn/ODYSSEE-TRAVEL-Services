import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  // A list of all locales that are supported
  locales: ['en', 'fr'],

  // Used when no locale matches
  defaultLocale: 'en',
  localeDetection: true,
});

export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/((?!api|_next/static|_next/image|favicon.ico|bg.jpg|LOGO.png).*)']
};
