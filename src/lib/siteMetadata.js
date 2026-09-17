export const SITE_URL = 'https://www.xusan.io';
export const LANGUAGES = ['en', 'ru', 'uz'];
export const languagePath = lang => lang === 'en' ? '/' : `/${lang}/`;
export const languageFromPath = path => /^\/(ru|uz)(\/|$)/.exec(path)?.[1] || 'en';
const escapeHtml = text => String(text).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));

export function siteMetadata(lang, dictionary) {
    const text = dictionary.seo;
    return {
        title: text.title,
        canonical: SITE_URL + languagePath(lang),
        meta: {
            description: text.description,
            'og:type': 'website', 'og:site_name': 'Xusan Ibragimov',
            'og:title': text.title, 'og:description': text.description,
            'og:url': SITE_URL + languagePath(lang),
            'og:locale': { en: 'en_US', ru: 'ru_RU', uz: 'uz_UZ' }[lang],
            'og:image': `${SITE_URL}/og/${lang}.png`,
            'og:image:width': '1200', 'og:image:height': '630',
            'og:image:type': 'image/png', 'og:image:alt': text.image_alt,
            'twitter:card': 'summary_large_image', 'twitter:title': text.title,
            'twitter:description': text.description, 'twitter:image': `${SITE_URL}/og/${lang}.png`,
            'twitter:image:alt': text.image_alt,
        },
        schema: {
            '@context': 'https://schema.org', '@type': 'ProfilePage',
            url: SITE_URL + languagePath(lang), inLanguage: lang,
            mainEntity: {
                '@type': 'Person', name: 'Xusan Ibragimov', url: SITE_URL,
                jobTitle: text.job, image: `${SITE_URL}/portrait.jpg`,
                homeLocation: { '@type': 'Place', name: text.location },
                sameAs: ['https://github.com/wxusan', 'https://www.instagram.com/ozbeteo/', 'https://t.me/wxusan'],
            },
        },
    };
}

export function renderMetadata(lang, dictionary) {
    const data = siteMetadata(lang, dictionary);
    return [
        `<title>${escapeHtml(data.title)}</title>`,
        `<link rel="canonical" href="${data.canonical}">`,
        ...Object.entries(data.meta).map(([key, value]) => `<meta ${key.startsWith('og:') ? 'property' : 'name'}="${key}" content="${escapeHtml(value)}">`),
        ...LANGUAGES.map(code => `<link rel="alternate" hreflang="${code}" href="${SITE_URL + languagePath(code)}">`),
        `<link rel="alternate" hreflang="x-default" href="${SITE_URL}/">`,
        `<script id="profile-schema" type="application/ld+json">${JSON.stringify(data.schema).replace(/</g, '\\u003c')}</script>`,
    ].join('\n');
}

export function updateDocumentMetadata(lang, dictionary) {
    const data = siteMetadata(lang, dictionary);
    document.documentElement.lang = lang;
    document.title = data.title;
    for (const [key, value] of Object.entries(data.meta)) {
        const attr = key.startsWith('og:') ? 'property' : 'name';
        let element = document.head.querySelector(`meta[${attr}="${key}"]`);
        if (!element) { element = document.createElement('meta'); element.setAttribute(attr, key); document.head.append(element); }
        element.content = value;
    }
    const canonical = document.head.querySelector('link[rel="canonical"]');
    if (canonical) canonical.href = data.canonical;
    const schema = document.getElementById('profile-schema');
    if (schema) schema.textContent = JSON.stringify(data.schema);
}
