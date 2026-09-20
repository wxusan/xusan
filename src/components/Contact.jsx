import { MessageCircle } from 'lucide-react';
import { useT } from '../context/LanguageContext';
export default function Contact() {
    const t = useT();
    return <section id="contact" className="contact-section" aria-labelledby="contact-title">
        <p className="contact-eyebrow"><span aria-hidden="true">03. </span>{t('contact.eyebrow')}</p>
        <h2 id="contact-title">{t('contact.heading')}</h2>
        <p className="contact-body">{t('contact.body')}</p>
        <div className="contact-actions">
            <a href="https://t.me/+8188038518" className="btn-outline" id="contact-btn" target="_blank" rel="noopener noreferrer"><MessageCircle size={17} aria-hidden="true" />{t('contact.telegram')}</a>
        </div>
        <p className="contact-note">{t('contact.note')}</p>
    </section>;
}
