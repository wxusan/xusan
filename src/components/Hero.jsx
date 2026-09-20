import { useEffect, useState } from 'react';
import { ArrowUpRight, MessageCircle } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { useT } from '../context/LanguageContext';
import ParticlePortrait from './ParticlePortrait';
import './hero.css';

function TypedTagline({ text, reducedMotion }) {
    const [length, setLength] = useState(text.length);
    useEffect(() => {
        if (reducedMotion) return;
        setLength(0);
        let interval;
        let index = 0;
        const delay = window.setTimeout(() => {
            interval = window.setInterval(() => {
                index += 1;
                setLength(index);
                if (index >= text.length) window.clearInterval(interval);
            }, 38);
        }, 550);
        return () => {
            window.clearTimeout(delay);
            window.clearInterval(interval);
        };
    }, [text, reducedMotion]);
    return (
        <p className="hero-tagline">
            <span className="sr-only">{text}</span>
            {/* Reserve the final line breaks while the visible text types in. */}
            <span className="hero-tagline-measure" aria-hidden="true">{text}<span className="hero-cursor" /></span>
            <span className="hero-tagline-typed" aria-hidden="true">
                {reducedMotion ? text : text.slice(0, length)}
                <span className="hero-cursor" />
            </span>
        </p>
    );
}

export default function Hero() {
    const t = useT();
    const reducedMotion = useReducedMotion();
    const tagline = t('hero.tagline');

    return (
        <section id="home" className="hero-section" aria-labelledby="hero-title">
            <div className="hero-layout">
                <ParticlePortrait />
                <motion.div
                    className="hero-copy"
                    initial={false}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.65, delay: 0.15 }}
                >
                    <p className="hero-greeting">{t('hero.greeting')}</p>
                    <h1 id="hero-title" className="hero-name"><span>Xusan</span> Ibragimov.</h1>
                    <TypedTagline key={tagline} text={tagline} reducedMotion={reducedMotion} />
                    <p className="hero-description">{t('hero.description')}</p>
                    <div className="hero-actions">
                        <a href="#contact" className="btn-outline hero-cta">{t('hero.cta')}</a>
                        <a href="#projects" className="text-link">{t('hero.work')}<ArrowUpRight size={16} aria-hidden="true" /></a>
                    </div>
                    <a href="tg://user?id=8188038518" className="hero-telegram text-link"><MessageCircle size={16} aria-hidden="true" />{t('hero.telegram')}</a>
                </motion.div>
            </div>
        </section>
    );
}
