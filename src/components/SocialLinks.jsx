import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, MessageCircle } from 'lucide-react';

export default function SocialLinks() {
    return (
        <div className="hidden md:block w-10 fixed bottom-0 left-auto right-auto z-40 text-slate-light md:left-10 w-10">
            <motion.ul
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5, duration: 0.5 }}
                className="flex flex-col items-center m-0 p-0 list-none font-mono"
            >
                <li className="last-of-type:mb-5">
                    <a href="https://github.com/wxusan" target="_blank" rel="noopener noreferrer" className="p-2.5 inline-block hover:text-mint-base hover:-translate-y-1 transition-all duration-300">
                        <Github size={20} className="stroke-[1.5]" />
                    </a>
                </li>
                <li className="last-of-type:mb-5">
                    <a href="https://www.linkedin.com/in/xusan-ibragimov-902a72246/" target="_blank" rel="noopener noreferrer" className="p-2.5 inline-block hover:text-mint-base hover:-translate-y-1 transition-all duration-300">
                        <Linkedin size={20} className="stroke-[1.5]" />
                    </a>
                </li>
                <li className="last-of-type:mb-5">
                    <a href="https://t.me/wxusan" target="_blank" rel="noopener noreferrer" className="p-2.5 inline-block hover:text-mint-base hover:-translate-y-1 transition-all duration-300">
                        <MessageCircle size={20} className="stroke-[1.5]" />
                    </a>
                </li>
                <li className="w-[1px] h-[90px] m-auto bg-slate-base mt-2"></li>
            </motion.ul>
        </div>
    );
}
