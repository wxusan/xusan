// This outline traces the helmet and hoodie in the supplied 640 × 640 photo. The original stays
// intact; only samples within the silhouette become particles.
const SILHOUETTE = 'M 81 640 C 99 626 110 611 84 599 L 86 573 C 113 529 137 458 158 408 C 179 365 214 339 273 318 L 293 305 C 275 273 264 232 264 190 C 262 145 275 89 310 52 C 342 19 380 5 414 5 C 468 2 516 29 541 74 C 560 108 564 163 550 211 C 543 239 529 266 516 284 L 567 295 C 589 300 596 311 590 331 L 581 365 C 596 405 609 450 617 497 L 637 640 Z';
const SOURCE_SIZE = 640;
const DOT_SPACING = 6;
const MINT = '100, 255, 218';

function samplePortrait(image) {
    const sampler = document.createElement('canvas');
    sampler.width = sampler.height = SOURCE_SIZE;
    const context = sampler.getContext('2d', { willReadFrequently: true });
    if (!context) throw new Error('Canvas unavailable');
    context.clip(new Path2D(SILHOUETTE));
    context.drawImage(image, 0, 0, SOURCE_SIZE, SOURCE_SIZE);
    const pixels = context.getImageData(0, 0, SOURCE_SIZE, SOURCE_SIZE).data;
    const samples = [];
    for (let y = 0; y < SOURCE_SIZE; y += DOT_SPACING) {
        for (let x = 0; x < SOURCE_SIZE; x += DOT_SPACING) {
            const offset = (y * SOURCE_SIZE + x) * 4;
            if (pixels[offset + 3] < 160) continue;
            const luminance = (pixels[offset] * 0.2126 + pixels[offset + 1] * 0.7152 + pixels[offset + 2] * 0.0722) / 255;
            const fade = Math.min(1, (SOURCE_SIZE - y) / 52);
            const seed = Math.sin(x * 127.1 + y * 311.7) * 43758.5453;
            const random = seed - Math.floor(seed);
            samples.push({
                // Center the subject, which sits to the right in the original photo.
                u: (x - 40) / SOURCE_SIZE, v: y / SOURCE_SIZE,
                radius: 0.5 + Math.pow(luminance, 0.85) * 1.1,
                alpha: Math.min(0.95, 0.36 + luminance * 0.7) * fade,
                seed: random, phase: random * Math.PI * 2,
                x: 0, y: 0, vx: 0, vy: 0, homeX: 0, homeY: 0,
            });
        }
    }
    return samples;
}

export function createParticlePortrait(canvas, image, initiallyPaused = false) {
    const context = canvas.getContext('2d');
    if (!context) throw new Error('Canvas unavailable');
    const dots = samplePortrait(image);
    let size = 0, frame = 0, previousTime = 0, elapsed = 0;
    let paused = initiallyPaused, visible = true, destroyed = false, state = '';
    const pointer = { x: -1000, y: -1000, active: false };

    const setState = value => {
        if (state === value) return;
        state = value;
        canvas.dataset.state = value;
    };

    function draw() {
        context.clearRect(0, 0, size, size);
        const scale = size / 400;
        for (const dot of dots) {
            const arrival = paused ? 1 : Math.min(1, Math.max(0, (elapsed - dot.seed * 0.3) / 1.1));
            context.fillStyle = `rgba(${MINT},${dot.alpha * arrival})`;
            context.beginPath();
            context.arc(dot.x, dot.y, dot.radius * scale, 0, Math.PI * 2);
            context.fill();
        }
    }

    function snapHome() {
        for (const dot of dots) {
            dot.x = dot.homeX; dot.y = dot.homeY; dot.vx = dot.vy = 0;
        }
    }

    function cancel() {
        window.cancelAnimationFrame(frame);
        frame = 0; previousTime = 0;
    }

    function wake() {
        if (!destroyed && !paused && visible && !document.hidden && !frame) frame = window.requestAnimationFrame(tick);
    }

    function tick(now) {
        frame = 0;
        if (destroyed || paused || !visible || document.hidden) return;
        const delta = previousTime ? Math.min((now - previousTime) / 16.667, 2) : 1;
        previousTime = now;
        elapsed += delta / 60;
        const radius = size * 0.2;
        const spring = 0.022 + Math.min(elapsed / 1.8, 1) * 0.045;
        const damping = Math.pow(0.79, delta);
        let unsettled = false;
        for (const dot of dots) {
            if (pointer.active) {
                const dx = dot.x - pointer.x, dy = dot.y - pointer.y;
                const distance = Math.hypot(dx, dy);
                if (distance < radius) {
                    const angle = distance > 0.01 ? Math.atan2(dy, dx) : dot.phase;
                    const force = Math.pow(1 - distance / radius, 2) * 4.6 * delta;
                    dot.vx += Math.cos(angle) * force;
                    dot.vy += Math.sin(angle) * force;
                }
            }
            const floatX = pointer.active ? Math.sin(elapsed * 1.5 + dot.phase) * 0.7 : 0;
            const floatY = pointer.active ? Math.cos(elapsed * 1.2 + dot.phase) * 0.7 : 0;
            dot.vx = (dot.vx + (dot.homeX + floatX - dot.x) * spring * delta) * damping;
            dot.vy = (dot.vy + (dot.homeY + floatY - dot.y) * spring * delta) * damping;
            dot.x += dot.vx * delta; dot.y += dot.vy * delta;
            if (Math.abs(dot.homeX - dot.x) + Math.abs(dot.homeY - dot.y) + Math.abs(dot.vx) + Math.abs(dot.vy) > 0.04) unsettled = true;
        }
        setState(pointer.active ? 'interactive' : elapsed < 2 ? 'assembling' : 'settling');
        draw();
        if (pointer.active || unsettled || elapsed < 2) wake();
        else {
            snapHome(); draw(); setState('settled'); previousTime = 0;
        }
    }

    function resize() {
        const nextSize = canvas.getBoundingClientRect().width;
        if (!nextSize || nextSize === size) return;
        const firstLayout = size === 0;
        size = nextSize;
        const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
        canvas.width = Math.round(size * pixelRatio);
        canvas.height = Math.round(size * pixelRatio);
        context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
        for (const dot of dots) {
            dot.homeX = size * (0.06 + dot.u * 0.88);
            dot.homeY = size * (0.03 + dot.v * 0.88);
            dot.x = dot.homeX + (firstLayout && !paused ? Math.cos(dot.phase) * size * (0.22 + dot.seed * 0.6) : 0);
            dot.y = dot.homeY + (firstLayout && !paused ? Math.sin(dot.phase) * size * (0.22 + dot.seed * 0.6) : 0);
            dot.vx = dot.vy = 0;
        }
        draw(); wake();
    }

    function movePointer(event) {
        if (paused || (event.pointerType === 'touch' && !event.buttons)) return;
        const bounds = canvas.getBoundingClientRect();
        pointer.x = event.clientX - bounds.left;
        pointer.y = event.clientY - bounds.top;
        pointer.active = true;
        wake();
    }

    function releasePointer() { pointer.active = false; wake(); }
    function onVisibilityChange() { if (document.hidden) cancel(); else wake(); }

    canvas.addEventListener('pointermove', movePointer, { passive: true });
    canvas.addEventListener('pointerdown', movePointer, { passive: true });
    canvas.addEventListener('pointerleave', releasePointer);
    canvas.addEventListener('pointerup', releasePointer);
    canvas.addEventListener('pointercancel', releasePointer);
    document.addEventListener('visibilitychange', onVisibilityChange);
    const sizeObserver = new ResizeObserver(resize);
    sizeObserver.observe(canvas);
    const visibilityObserver = new IntersectionObserver(entries => {
        visible = entries[0].isIntersecting;
        if (visible) wake();
        else { pointer.active = false; cancel(); }
    }, { rootMargin: '40px' });
    visibilityObserver.observe(canvas);
    resize();
    if (paused) setState('paused');

    return {
        setPaused(value) {
            paused = value;
            pointer.active = false;
            if (paused) {
                cancel(); snapHome(); elapsed = Math.max(elapsed, 2); draw(); setState('paused');
            } else wake();
        },
        destroy() {
            destroyed = true;
            cancel(); sizeObserver.disconnect(); visibilityObserver.disconnect();
            canvas.removeEventListener('pointermove', movePointer);
            canvas.removeEventListener('pointerdown', movePointer);
            canvas.removeEventListener('pointerleave', releasePointer);
            canvas.removeEventListener('pointerup', releasePointer);
            canvas.removeEventListener('pointercancel', releasePointer);
            document.removeEventListener('visibilitychange', onVisibilityChange);
        },
    };
}
