/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
    safelist: [
        {
            pattern: /animate-.+/,
        },
    ],
    theme: {
        extend: {
            dropShadow: {
                glow: ['0 0px 20px rgba(0,255, 0, 0.35)', '0 0px 65px rgba(0, 255,0, 0.2)'],
                'glow-white': ['0 0px 20px rgba(255,255, 255, 0.35)', '0 0px 65px rgba(255, 255,255, 0.2)'],
            },
            animation: {
                shake: 'shake 0.82s cubic-bezier(.36,.07,.19,.97) both infinite',
            },
            keyframes: {
                shake: {
                    '10%, 90%': {
                        transform: 'translate3d(-1px, 0, 0)',
                    },
                    '20%, 80%': {
                        transform: 'translate3d(2px, 0, 0)',
                    },
                    '30%, 50%, 70%': {
                        transform: 'translate3d(-4px, 0, 0)',
                    },
                    '40%, 60%': {
                        transform: 'translate3d(4px, 0, 0)',
                    },
                },
            },
        },
    },
    plugins: [],
};
