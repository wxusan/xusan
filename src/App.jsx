import { MotionConfig } from 'framer-motion';
import { LanguageProvider, useT } from './context/LanguageContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Contact from './components/Contact';
import SocialLinks from './components/SocialLinks';
import Footer from './components/Footer';

function Page() {
    const t = useT();
    return <div className="relative min-h-screen bg-navy-base font-sans selection:bg-mint-tint selection:text-slate-light">
        <a href="#main-content" className="skip-link">{t('navbar.skip')}</a>
        <Navbar />
        <SocialLinks />
        <main id="main-content" tabIndex={-1} className="relative z-10 px-6 sm:px-12 md:px-24" style={{ counterReset: 'section' }}>
            <Hero />
            <About />
            <Projects />
            <Contact />
        </main>
        <Footer />
    </div>;
}

export default function App({ initialLanguage = 'en' }) {
    return <LanguageProvider initialLanguage={initialLanguage}><MotionConfig reducedMotion="user"><Page /></MotionConfig></LanguageProvider>;
}
