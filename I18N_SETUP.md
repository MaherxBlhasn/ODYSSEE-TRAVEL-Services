# Internationalization (i18n) Setup

This Next.js application now supports English and French languages using `next-intl`.

## Features

- ✅ English and French language support
- ✅ URL-based routing (`/en/...` and `/fr/...`)
- ✅ Language switcher in navigation
- ✅ Translated navigation and footer
- ✅ Custom translation hooks
- ✅ Automatic locale detection and redirection

## File Structure

```
├── i18n/
│   └── request.ts          # i18n configuration
├── messages/
│   ├── en.json            # English translations
│   └── fr.json            # French translations
├── app/
│   ├── [locale]/          # Localized pages
│   │   ├── layout.tsx     # Locale-specific layout
│   │   ├── page.tsx       # Home page
│   │   ├── offers/        # Offers page
│   │   └── about/         # About page
│   ├── _components/
│   │   ├── Navbar.tsx     # Navigation with translations
│   │   ├── Footer.tsx     # Footer with translations
│   │   └── LanguageSwitcher.tsx # Language switcher component
│   └── _hooks/
│       └── useI18n.ts     # Custom translation hooks
├── middleware.ts          # Handles locale routing
└── next.config.ts        # Next.js config with i18n plugin
```

## Usage

### Basic Translation

```tsx
import { useTranslations } from 'next-intl';

function MyComponent() {
  const t = useTranslations('navbar');
  return <h1>{t('home')}</h1>;
}
```

### Using Custom Hooks

```tsx
import { useI18n, useNavbarTranslations } from '../_hooks/useI18n';

function MyComponent() {
  const { locale, getLocalizedPath } = useI18n();
  const t = useNavbarTranslations();
  
  return (
    <div>
      <p>Current locale: {locale}</p>
      <Link href={getLocalizedPath('/about')}>
        {t('about')}
      </Link>
    </div>
  );
}
```

### Adding New Translations

1. Add keys to both `messages/en.json` and `messages/fr.json`
2. Use the translation keys in your components

Example:
```json
// messages/en.json
{
  "common": {
    "loading": "Loading...",
    "error": "An error occurred"
  }
}

// messages/fr.json
{
  "common": {
    "loading": "Chargement...",
    "error": "Une erreur s'est produite"
  }
}
```

### Server Components

For server components, use:
```tsx
import { getTranslations } from 'next-intl/server';

async function MyServerComponent() {
  const t = await getTranslations('navbar');
  return <h1>{t('home')}</h1>;
}
```

## Available Translation Namespaces

- `navbar` - Navigation menu items
- `footer` - Footer content
- `company` - Company information
- `language` - Language names

## URL Structure

- `/` → Redirects to `/en`
- `/en` → English home page
- `/fr` → French home page
- `/en/offers` → English offers page
- `/fr/offres` → French offers page (if you want different slugs)

## Language Switcher

The language switcher is available in:
- Desktop navigation (top right)
- Mobile navigation menu

It automatically switches between locales while preserving the current page path.

## Adding New Languages

1. Add the locale to `i18n/request.ts`
2. Update the middleware in `middleware.ts`
3. Create a new translation file in `messages/`
4. Update the language switcher component

## Notes

- The middleware automatically handles locale routing
- All internal links should use the `useI18n` hook or include the locale prefix
- Static generation works for all locales
- SEO-friendly URLs with proper `lang` attributes
