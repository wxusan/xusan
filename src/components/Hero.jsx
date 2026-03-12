import React from 'react';
import { motion } from 'framer-motion';
import { useT } from '../context/LanguageContext';

export default function Hero() {
    const t = useT();
    const one = <h1 className="text-mint-base font-mono mb-6 text-sm md:text-base font-normal tracking-wide">{t('hero.greeting')}</h1>;
    const two = <h2 className="text-slate-light font-sans font-bold text-5xl sm:text-6xl md:text-7xl lg:text-[80px] leading-[1.1] mb-2">Xusan Ibragimov.</h2>;
    const three = <h3 className="text-slate-base font-sans font-bold text-4xl sm:text-5xl md:text-6xl lg:text-[70px] leading-[1.1] mb-6">{t('hero.tagline')}</h3>;
    const four = (
        <p className="text-slate-base font-sans text-lg md:text-xl max-w-xl leading-relaxed mb-12">
          {t('hero.description')}
        </p>
    );
    const five = (
        <div className="flex gap-4">
            <a href="#projects" className="btn-outline">
                {t('hero.cta')}
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
