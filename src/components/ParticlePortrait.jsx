import { useEffect, useRef, useState } from 'react';
import { Pause, Play } from 'lucide-react';
import { useReducedMotion } from 'framer-motion';
import { useT } from '../context/LanguageContext';
import { createParticlePortrait } from '../lib/particlePortrait';

const PORTRAIT_SOURCE = '/hero-helmet.jpg';

export default function ParticlePortrait() {
    const canvasRef = useRef(null);
    const rendererRef = useRef(null);
    const frozenRef = useRef(false);
    const [paused, setPaused] = useState(false);
    const [status, setStatus] = useState('loading');
    const reducedMotion = useReducedMotion();
    const frozen = paused || Boolean(reducedMotion);
    const t = useT();

    useEffect(() => {
        frozenRef.current = frozen;
        rendererRef.current?.setPaused(frozen);
    }, [frozen]);

    useEffect(() => {
        let disposed = false;
        const image = new Image();
        image.decoding = 'async';
        image.onload = () => {
            if (disposed) return;
            try {
                rendererRef.current = createParticlePortrait(canvasRef.current, image, frozenRef.current);
                setStatus('ready');
            } catch {
                setStatus('failed');
            }
        };
        image.onerror = () => { if (!disposed) setStatus('failed'); };
        image.src = PORTRAIT_SOURCE;
        return () => {
            disposed = true;
            image.onload = null;
            image.onerror = null;
            rendererRef.current?.destroy();
            rendererRef.current = null;
        };
    }, []);

    return (
        <figure className="particle-portrait">
            <div className="particle-portrait-stage">
                <canvas ref={canvasRef} className="particle-portrait-canvas" role="img" aria-label={t('hero.portrait_alt')} hidden={status !== 'ready'} />
                {status === 'loading' && <img className="particle-portrait-poster" src="/portrait-dots.png" alt={t('hero.portrait_alt')} width="420" height="420" fetchPriority="high" />}
                {status === 'failed' && <img className="particle-portrait-fallback" src={PORTRAIT_SOURCE} alt="Xusan Ibragimov" width="640" height="640" />}
            </div>
            <figcaption className="particle-portrait-caption">
                {status === 'ready' && !reducedMotion && (
                    <>
                        <span className="particle-portrait-hint">
                            <span className="portrait-hint-dot" aria-hidden="true" />
                            <span className="portrait-hint-pointer">{t('hero.portrait_hint')}</span>
                            <span className="portrait-hint-touch">{t('hero.portrait_touch')}</span>
                        </span>
                        <button type="button" onClick={() => setPaused(current => !current)} className="portrait-motion-toggle"
                            aria-label={t(paused ? 'hero.portrait_resume' : 'hero.portrait_pause')}
                            title={t(paused ? 'hero.portrait_resume' : 'hero.portrait_pause')}>
                            {paused ? <Play size={13} aria-hidden="true" /> : <Pause size={13} aria-hidden="true" />}
                        </button>
                    </>
                )}
            </figcaption>
        </figure>
    );
}
