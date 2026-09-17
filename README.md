# Xusan.io

A static portfolio in English, Russian, and Uzbek, built with React, Vite, and Tailwind CSS. The navy/mint design includes an interactive dot portrait, three featured projects, Telegram inquiries, and social links.

## Development

```sh
npm ci
npm run dev
```

## Build and preview

```sh
npm run build
npm run preview
```

Upload `dist/` to any static host. The build renders complete HTML at `/`, `/ru/`, and `/uz/`, then adds client-side interactions. Direct localized URLs, project content, contact links, and search metadata work without JavaScript. The build also generates `sitemap.xml` and `robots.txt`.

No backend, database, API keys, environment variables, CMS, or translation service is required. Fonts, portraits, project screenshots, and social images are hosted with the site. Language changes use the local dictionaries and remember the visitor's choice when browser storage is available.

## Content

- `src/locales/en.json`, `ru.json`, `uz.json`: all visible copy, image descriptions, and localized metadata. Keep the same keys in each file.
- `src/data-projects.js`: featured project names, links, and local screenshots.
- `public/projects/`: project screenshots.
- `public/hero-helmet.jpg`: source for the interactive dot portrait.
- `public/portrait-dots.png`: static portrait used before the animation initializes and when JavaScript is disabled.
- `public/og/en.png`, `ru.png`, `uz.png`: localized social preview images (1200 × 630).
- `src/lib/siteMetadata.js`: canonical production URL and metadata generation.

The portrait respects reduced motion, can be paused, and idles when it has settled or leaves the viewport. Navigation includes a keyboard-accessible mobile menu, skip link, and visible EN / RU / UZ links.

After changing content, rebuild to update all three HTML pages. If positioning or branding changes, update the corresponding social preview images as well. Incoming inquiries open Telegram; this website does not submit or store messages.
