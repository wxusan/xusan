import React from 'react';
import { motion } from 'framer-motion';

export default function Hero() {
    const one = <h1 className="text-mint-base font-mono mb-6 text-sm md:text-base font-normal tracking-wide">Hi, my name is</h1>;
    const two = <h2 className="text-slate-light font-sans font-bold text-5xl sm:text-6xl md:text-7xl lg:text-[80px] leading-[1.1] mb-2">Xusan Ibragimov.</h2>;
    const three = <h3 className="text-slate-base font-sans font-bold text-4xl sm:text-5xl md:text-6xl lg:text-[70px] leading-[1.1] mb-6">I build systems for the web.</h3>;
    const four = (
        <p className="text-slate-base font-sans text-lg md:text-xl max-w-xl leading-relaxed mb-12">
            From idea to production, end to end. I design the experience, engineer the system, and integrate AI where it creates real value. Currently focused on building accessible, human-centered products at the intersection of UI/UX, frontend architecture, and applied AI.
        </p>
    );
    const five = (
        <div className="flex gap-4">
            <a href="#projects" className="btn-outline">
                Check out my work!
            </a>
        </div>
    );

    const items = [one, two, three, four, five];

    return (
        <section id="home" className="min-h-screen flex flex-col justify-center items-start pt-20 pb-0">
            <div className="container mx-auto px-6 sm:px-12 md:px-24 max-w-5xl">
                {items.map((item, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 * i + 0.8, duration: 0.5, ease: 'easeOut' }}
                    >
                        {item}
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
