/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                navy: {
                    light: '#112240',
                    base: '#0a192f',
                    dark: '#020c1b',
                },
                slate: {
                    light: '#ccd6f6',
                    base: '#8892b0',
                    dark: '#495670',
                },
                mint: {
                    base: '#64ffda',
                    tint: 'rgba(100,255,218,0.1)'
                }
            },
            fontFamily: {
                sans: ['"Inter"', 'sans-serif', 'system-ui'],
                mono: ['"SF Mono"', '"Fira Code"', '"Roboto Mono"', 'monospace'],
            },
            transitionTimingFunction: {
                'smooth': 'cubic-bezier(0.645, 0.045, 0.355, 1)',
            }
        },
    },
    plugins: [],
}
