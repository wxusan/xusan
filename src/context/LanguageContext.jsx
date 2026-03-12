import React, { createContext, useContext, useMemo } from 'react';
import en from '../locales/en.json';
import ru from '../locales/ru.json';
import uz from '../locales/uz.json';

const locales = { en, ru, uz };

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
    const lang = useMemo(() => {
        const detected = navigator.language?.slice(0, 2).toLowerCase();
        return ['ru', 'uz'].includes(detected) ? detected : 'en';
    }, []);

    return (
        <LanguageContext.Provider value={lang}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const lang = useContext(LanguageContext);
    if (lang === null) throw new Error('useLanguage must be used inside LanguageProvider');
    return lang;
}

export function useT() {
    const lang = useLanguage();
    const translations = locales[lang];
    const fallback = locales.en;

    return function t(key) {
        const keys = key.split('.');
        let value = translations;
        let fb = fallback;
        for (const k of keys) {
            value = value?.[k];
            fb = fb?.[k];
        }
        return value ?? fb ?? key;
    };
}
