import { motion } from 'framer-motion';
import { Github, Instagram, MessageCircle } from 'lucide-react';

export default function SocialLinks() {
    return (
        <>
        <div className="social-rail hidden md:block w-10 fixed bottom-0 left-10 z-40 text-slate-light">
            <motion.ul
                initial={false}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5, duration: 0.5 }}
                className="flex flex-col items-center m-0 p-0 list-none font-mono"
            >
                <li className="last-of-type:mb-5">
                    <a href="https://www.instagram.com/ozbeteo/" aria-label="Instagram @ozbeteo" target="_blank" rel="noopener noreferrer" className="p-2.5 inline-block hover:text-mint-base hover:-translate-y-1 transition-all duration-300">
                        <Instagram size={20} className="stroke-[1.5]" />
                    </a>
                </li>
                <li className="last-of-type:mb-5">
                    <a href="https://github.com/wxusan" aria-label="GitHub" target="_blank" rel="noopener noreferrer" className="p-2.5 inline-block hover:text-mint-base hover:-translate-y-1 transition-all duration-300">
                        <Github size={20} className="stroke-[1.5]" />
                    </a>
                </li>
                <li className="last-of-type:mb-5">
                    <a href="tg://user?id=8188038518" aria-label="Telegram" className="p-2.5 inline-block hover:text-mint-base hover:-translate-y-1 transition-all duration-300">
                        <MessageCircle size={20} className="stroke-[1.5]" />
                    </a>
                </li>
                <li className="w-[1px] h-[90px] m-auto bg-slate-base mt-2"></li>
            </motion.ul>
        </div>
        <div className="instagram-rail hidden md:block w-10 fixed bottom-0 right-10 z-40 text-slate-light">
            <div className="flex flex-col items-center">
                <a href="https://www.instagram.com/ozbeteo/" target="_blank" rel="noopener noreferrer" aria-label="Instagram @ozbeteo"
                    className="my-5 mx-auto p-2.5 font-mono text-xs tracking-widest hover:text-mint-base hover:-translate-y-1 transition-all duration-300"
                    style={{ writingMode: 'vertical-rl' }}>instagram</a>
                <div className="w-px h-[90px] bg-slate-base" aria-hidden="true" />
            </div>
        </div>
        </>
    );
}
