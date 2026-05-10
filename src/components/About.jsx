import React from 'react';
import { motion } from 'framer-motion';
import { useT } from '../context/LanguageContext';

export default function About() {
    const t = useT();
    const skills = [
        'JavaScript (ES6+)', 'TypeScript', 'React', 'Next.js',
        'Node.js', 'UI/UX Design', 'Machine Learning', 'Deep Learning',
    ];

    return (
        <section id="about" className="py-24 relative max-w-[900px] mx-auto min-h-screen flex items-center">
            <div className="container mx-auto px-6 sm:px-12">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true, margin: "-100px" }}
                >
                    <h2 className="section-heading">{t('about.heading')}</h2>

                    <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
                        {/* Bio Content Text */}
                        <div className="w-full lg:w-3/5 text-slate-base font-sans text-lg leading-relaxed space-y-4">
                            <p>{t('about.bio1')}</p>
                            <p>
                                {t('about.bio2_pre')}
                                <span className="text-mint-base"> {t('about.bio2_highlight')}</span>
                                {t('about.bio2_post')}
                            </p>
                            <p>{t('about.bio3')}</p>

                            <p className="pt-2">{t('about.tech_intro')}</p>

                            <ul className="grid grid-cols-2 gap-x-2 gap-y-2 mt-4 font-mono text-sm text-slate-base">
                                {skills.map((skill, index) => (
                                    <li key={index} className="relative pl-6 before:content-['▹'] before:absolute before:left-0 before:text-mint-base before:text-lg before:leading-none">
                                        {skill}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Image/Avatar Area */}
                        <div className="w-full lg:w-2/5 max-w-[300px] mx-auto lg:mx-0 mt-8 lg:mt-0 relative group">
                            <div className="relative w-full aspect-square rounded-sm">
                                {/* Border Frame */}
                                <div className="absolute inset-0 border-2 border-mint-base rounded-sm translate-x-5 translate-y-5 transition-transform duration-300 ease-smooth group-hover:translate-x-3 group-hover:translate-y-3 z-0"></div>

                                {/* Image Container */}
                                <div className="absolute inset-0 bg-mint-base rounded-sm z-10 transition-all duration-300 ease-smooth group-hover:bg-transparent overflow-hidden">
                                    <img
                                        src="/portrait.jpg"
                                        alt="Xusan Portrait"
                                        className="w-full h-full object-cover mix-blend-multiply filter grayscale contrast-100 transition-all duration-500 group-hover:mix-blend-normal group-hover:filter-none object-top"
                                    />
                                    {/* Overlay to enforce the color tint initially */}
                                    <div className="absolute inset-0 bg-navy-base opacity-20 mix-blend-screen transition-opacity duration-300 group-hover:opacity-0"></div>
                                </div>
                            </div>
                        </div>

                    </div>
                </motion.div>
            </div>
        </section>
    );
}
