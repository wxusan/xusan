import React from 'react';
import { motion } from 'framer-motion';

export default function EmailLink() {
    return (
        <div className="hidden md:block w-10 fixed bottom-0 left-auto right-10 z-40 text-slate-light">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5, duration: 0.5 }}
                className="flex flex-col items-center relative"
            >
                <button
                    onClick={(e) => {
                        navigator.clipboard.writeText('nasux1222@gmail.com');
                        const el = e.currentTarget;
                        const originalText = el.innerText;
                        el.innerText = 'copied!';
                        el.style.color = '#64ffda';
                        setTimeout(() => {
                            el.innerText = originalText;
                            el.style.color = '';
                        }, 2000);
                    }}
                    className="my-5 mx-auto p-2.5 font-mono text-xs tracking-widest text-slate-light hover:text-mint-base hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                    style={{ writingMode: 'vertical-rl' }}
                    title="Copy to clipboard"
                >
                    nasux1222@gmail.com
                </button>
                <div className="w-[1px] h-[90px] m-auto bg-slate-base"></div>
            </motion.div>
        </div>
    );
}
