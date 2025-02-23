/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{html, ts, js, tsx, tsx}"], // Adjust paths based on your project structure
    theme: {
        extend: {
            keyframes: {
                'fade-in': {
                    '0%': { opacity: 0 },
                    '100%': { opacity: 1 },
                },
                'fade-out': {
                    '0%': { opacity: 1 },
                    '100%': { opacity: 0 },
                },
                'fade-in-down': {
                    '0%': { opacity: 0, transform: 'translateY(-100%)'},
                    '100%': { opacity: 1, transform: 'translateY(0)' },
                },
                'fade-in-top-left': {
                    '0%': { opacity: 0, transform: 'translate(-100%, -100%)' },
                    '100%': { opacity: 1, transform: 'translate(0, 0)' },
                },
            },
            animation: {
                'fade-in': 'fade-in 1s ease-in-out 0.25s forwards',
                'fade-out': 'fade-out 1s ease-out 0.25s forwards',
                'fade-in-down': 'fade-in-down 0.6s ease-in 0.25s forwards', // Use opacity-0 with animation class to avoid blink
                'fade-in-top-left': 'fade-in-top-left 1s ease-out 0.25s forwards',
            },
        },
    },
    plugins: [],
};



