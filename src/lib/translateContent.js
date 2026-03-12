async function translateText(text, targetLang) {
    try {
        const res = await fetch('/api/translate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text, targetLang }),
        });
        const data = await res.json();
        return data.translatedText ?? null;
    } catch {
        return null;
    }
}

export async function translateContent(projects, lang) {
    if (lang === 'en' || !projects.length) return projects;

    const cacheKey = `translate_v2_${lang}_${projects.map(p => p.id).join('_')}`;

    try {
        const cached = sessionStorage.getItem(cacheKey);
        if (cached) return JSON.parse(cached);
    } catch {
        // sessionStorage unavailable — continue without cache
    }

    const translated = await Promise.all(
        projects.map(async (project) => {
            const description = await translateText(project.description, lang);
            return {
                ...project,
                description: description ?? project.description,
            };
        })
    );

    try {
        sessionStorage.setItem(cacheKey, JSON.stringify(translated));
    } catch {
        // sessionStorage full or unavailable — skip caching
    }

    return translated;
}
