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
                <a
                    href="mailto:nasux1222@gmail.com"
                    className="my-5 mx-auto p-2.5 font-mono text-xs tracking-widest text-slate-light hover:text-mint-base hover:-translate-y-1 transition-all duration-300"
                    style={{ writingMode: 'vertical-rl' }}
                >
                    nasux1222@gmail.com
                </a>
                <div className="w-[1px] h-[90px] m-auto bg-slate-base"></div>
            </motion.div>
        </div>
    );
}
