import { useEffect, useRef, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { useT } from '../context/LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';

export default function Navbar() {
    const t = useT();
    const [scrolled, setScrolled] = useState(false);
    const [open, setOpen] = useState(false);
    const dialog = useRef(null);
    const toggle = useRef(null);
    const links = [{ key: 'about', href: '#about' }, { key: 'work', href: '#projects' }, { key: 'contact', href: '#contact' }];
    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 50);
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        const onResize = () => { if (window.innerWidth >= 1000) setOpen(false); };
        window.addEventListener('resize', onResize);
        return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onResize); };
    }, []);
    useEffect(() => {
        const menu = dialog.current;
        if (!open) { if (menu.open) menu.close(); return; }
        menu.showModal();
        const previous = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        return () => { document.body.style.overflow = previous; if (menu.open) menu.close(); toggle.current?.focus({ preventScroll: true }); };
    }, [open]);
    const navItems = links.map(link => <a key={link.key} href={link.href} className="nav-link" onClick={() => setOpen(false)}>{t(`navbar.${link.key}`)}</a>);
    return <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
        <div className="header-inner">
            <a href="#home" className="site-logo" aria-label={`Xusan Ibragimov — ${t('navbar.home')}`}>&lt;XI /&gt;</a>
            <div className="header-actions">
                <nav className="desktop-nav" aria-label={t('navbar.navigation')} style={{ counterReset: 'item 0' }}>{navItems}</nav>
                <LanguageSwitcher />
                <button ref={toggle} type="button" className="menu-toggle" aria-label={t(open ? 'navbar.close_menu' : 'navbar.open_menu')}
                    aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen(value => !value)}><Menu size={25} aria-hidden="true" /></button>
            </div>
        </div>
        <dialog ref={dialog} id="mobile-navigation" className="mobile-navigation" aria-labelledby="mobile-menu-label"
            onCancel={() => setOpen(false)} onClose={() => setOpen(false)} onClick={event => { if (event.target === event.currentTarget) setOpen(false); }}>
            <h2 id="mobile-menu-label" className="sr-only">{t('navbar.navigation')}</h2>
            <button className="menu-close" type="button" aria-label={t('navbar.close_menu')} onClick={() => setOpen(false)}><X size={28} aria-hidden="true" /></button>
            <nav aria-label={t('navbar.navigation')} style={{ counterReset: 'item 0' }}>{navItems}<LanguageSwitcher /></nav>
        </dialog>
    </header>;
}
