import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { readFileSync } from 'node:fs';
import { renderMetadata, languageFromPath } from './src/lib/siteMetadata.js';

export default defineConfig({
  plugins: [react(), {
    name: 'localized-metadata',
    transformIndexHtml(html, context) {
      const lang = languageFromPath(context.path || '/');
      const dictionary = JSON.parse(readFileSync(new URL(`./src/locales/${lang}.json`, import.meta.url), 'utf8'));
      return html.replace('lang="en"', `lang="${lang}"`).replace(/<!--site-head:start-->[\s\S]*?<!--site-head:end-->/,
        `<!--site-head:start-->\n${renderMetadata(lang, dictionary)}\n<!--site-head:end-->`);
    },
  }],
  server: { host: '127.0.0.1' },
});
