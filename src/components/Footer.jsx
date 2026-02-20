import React from 'react';
import { Github, Linkedin, MessageCircle } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="p-[15px] flex flex-col items-center justify-center text-center bg-navy-base z-10 relative">
            <div className="flex md:hidden items-center justify-center gap-6 mb-4 mt-10">
                <a href="https://github.com/wxusan" target="_blank" rel="noopener noreferrer" className="text-slate-base hover:text-mint-base transition-colors p-2" aria-label="GitHub">
                    <Github size={20} />
                </a>
                <a href="https://www.linkedin.com/in/xusan-ibragimov-902a72246/" target="_blank" rel="noopener noreferrer" className="text-slate-base hover:text-mint-base transition-colors p-2" aria-label="LinkedIn">
                    <Linkedin size={20} />
                </a>
                <a href="https://t.me/wxusan" target="_blank" rel="noopener noreferrer" className="text-slate-base hover:text-mint-base transition-colors p-2" aria-label="Telegram">
                    <MessageCircle size={20} />
                </a>
            </div>

            <a href="https://github.com/wxusan" target="_blank" rel="noopener noreferrer" className="font-mono text-xs text-slate-base tracking-widest hover:text-mint-base transition-colors p-3 block">
                <div>Designed & Built by Xusan Ibragimov</div>
            </a>
        </footer>
    );
}
