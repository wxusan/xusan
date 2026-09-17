import { build } from 'vite';
import { readFile, writeFile, mkdir, rm } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';
import path from 'node:path';
import { LANGUAGES, SITE_URL, languagePath, renderMetadata } from '../src/lib/siteMetadata.js';

const root = path.resolve(import.meta.dirname, '..');
const temporary = path.join(root, '.prerender');
try {
  await build({ root, build: { ssr: 'src/entry-server.jsx', outDir: temporary, emptyOutDir: true } });
  const { render } = await import(pathToFileURL(path.join(temporary, 'entry-server.js')).href);
  const template = await readFile(path.join(root, 'dist/index.html'), 'utf8');
  if (!template.includes('<!--app-html-->')) throw new Error('Static page placeholder is missing');
  for (const lang of LANGUAGES) {
    const dictionary = JSON.parse(await readFile(path.join(root, `src/locales/${lang}.json`), 'utf8'));
    const html = template.replace('<html lang="en"', `<html lang="${lang}"`)
      .replace(/<!--site-head:start-->[\s\S]*?<!--site-head:end-->/, `<!--site-head:start-->\n${renderMetadata(lang, dictionary)}\n<!--site-head:end-->`)
      .replace('<!--app-html-->', render(lang));
    const directory = path.join(root, 'dist', lang === 'en' ? '' : lang);
    await mkdir(directory, { recursive: true });
    await writeFile(path.join(directory, 'index.html'), html);
    console.log(`Static page: ${languagePath(lang)}`);
  }
  const alternates = LANGUAGES.map(lang => `<xhtml:link rel="alternate" hreflang="${lang}" href="${SITE_URL + languagePath(lang)}"/>`).join('');
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">${LANGUAGES.map(lang => `<url><loc>${SITE_URL + languagePath(lang)}</loc>${alternates}<xhtml:link rel="alternate" hreflang="x-default" href="${SITE_URL}/"/></url>`).join('')}</urlset>\n`;
  await writeFile(path.join(root, 'dist/sitemap.xml'), sitemap);
  await writeFile(path.join(root, 'dist/robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`);
} finally { await rm(temporary, { recursive: true, force: true }); }
