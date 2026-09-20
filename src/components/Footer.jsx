import { Github, Instagram, MessageCircle } from 'lucide-react';
import { useT } from '../context/LanguageContext';

export default function Footer() {
    const t = useT();
    return (
        <footer className="p-[15px] flex flex-col items-center justify-center text-center bg-navy-base z-10 relative">
            <div className="flex md:hidden items-center justify-center gap-6 mb-4 mt-10">
                <a href="https://www.instagram.com/ozbeteo/" target="_blank" rel="noopener noreferrer" className="text-slate-base hover:text-mint-base transition-colors p-2" aria-label="Instagram @ozbeteo">
                    <Instagram size={20} />
                </a>
                <a href="https://github.com/wxusan" target="_blank" rel="noopener noreferrer" className="text-slate-base hover:text-mint-base transition-colors p-2" aria-label="GitHub">
                    <Github size={20} />
                </a>
                <a href="tg://user?id=8188038518" className="text-slate-base hover:text-mint-base transition-colors p-2" aria-label="Telegram">
                    <MessageCircle size={20} />
                </a>
            </div>

            <a href="https://github.com/wxusan" target="_blank" rel="noopener noreferrer" className="font-mono text-xs text-slate-base tracking-widest hover:text-mint-base transition-colors p-3 block">
                <div>{t('footer.credit')}</div>
            </a>
        </footer>
    );
}
