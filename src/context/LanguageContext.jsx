import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import en from '../locales/en.json';
import ru from '../locales/ru.json';
import uz from '../locales/uz.json';
import { LANGUAGES, languageFromPath, languagePath, updateDocumentMetadata } from '../lib/siteMetadata';

const locales = { en, ru, uz };
const STORAGE_KEY = 'xusan.language';
const LanguageContext = createContext(null);

export function LanguageProvider({ children, initialLanguage = 'en' }) {
    const [language, setLanguageState] = useState(initialLanguage);
    const setLanguage = useCallback(next => {
        if (!LANGUAGES.includes(next)) return;
        try { localStorage.setItem(STORAGE_KEY, next); } catch { /* Preference is optional. */ }
        const path = languagePath(next) + window.location.hash;
        if (window.location.pathname !== languagePath(next)) window.history.pushState(null, '', path);
        setLanguageState(next);
    }, []);

    useEffect(() => {
        // Explicit localized URLs take priority over a saved preference.
        if (window.location.pathname === '/') {
            let saved;
            try { saved = localStorage.getItem(STORAGE_KEY); } catch { /* Use the URL language. */ }
            if (LANGUAGES.includes(saved) && saved !== 'en') {
                window.history.replaceState(null, '', languagePath(saved) + window.location.hash);
                setLanguageState(saved);
            }
        }
        const onPopState = () => setLanguageState(languageFromPath(window.location.pathname));
        window.addEventListener('popstate', onPopState);
        return () => window.removeEventListener('popstate', onPopState);
    }, []);

    useEffect(() => { updateDocumentMetadata(language, locales[language]); }, [language]);
    const value = useMemo(() => ({ language, setLanguage }), [language, setLanguage]);
    return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLocale() {
    const value = useContext(LanguageContext);
    if (!value) throw new Error('LanguageProvider is required');
    return value;
}
export function useLanguage() { return useLocale().language; }
export function useT() {
    const { language } = useLocale();
    return key => key.split('.').reduce((value, part) => value?.[part], locales[language])
        ?? key.split('.').reduce((value, part) => value?.[part], locales.en)
        ?? key;
}
