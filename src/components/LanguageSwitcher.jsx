import { useLocale, useT } from '../context/LanguageContext';
import { LANGUAGES, languagePath } from '../lib/siteMetadata';
const names = { en: 'English', ru: 'Русский', uz: "O'zbekcha" };
export default function LanguageSwitcher() {
    const { language, setLanguage } = useLocale();
    const t = useT();
    return <div className="language-switcher" role="group" aria-label={t('navbar.language')}>
        {LANGUAGES.map(code => <a key={code} href={languagePath(code)} lang={code} hrefLang={code}
            aria-label={names[code]} aria-current={language === code ? 'page' : undefined}
            onClick={event => { if (!event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey && event.button === 0) { event.preventDefault(); setLanguage(code); } }}>
            {code.toUpperCase()}
        </a>)}
    </div>;
}
