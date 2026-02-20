import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Contact from './components/Contact';
import SocialLinks from './components/SocialLinks';
import EmailLink from './components/EmailLink';
import Footer from './components/Footer';

function App() {
    return (
        <div className="relative min-h-screen bg-navy-base font-sans selection:bg-mint-tint selection:text-slate-light">
            <Navbar />
            <SocialLinks />
            <EmailLink />

            <main className="relative z-10 px-6 sm:px-12 md:px-24" style={{ counterReset: "section" }}>
                <Hero />
                <About />
                <Projects />
                <Contact />
            </main>

            <Footer />
        </div>
    );
}

export default App;
