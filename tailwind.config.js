/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx}',
        './src/components/**/*.{js,ts,jsx,tsx}',
        './src/features/**/*.{js,ts,jsx,tsx}',
        './src/app/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        fontFamily: {
            sans: ['Inter', 'Arial', 'sans-serif'],
        },
        extend: {
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic':
                    'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
            },
            colors: {
                ytred: '#FF0000',
                ytwhite: '#FFFFFF',
                ytblack: '#282828',
            },
            screens: {
                xs: '460px',
                sm: '600px',
                xl: '1200px',
            },
        },
    },
    future: {
        hoverOnlyWhenSupported: true,
    },
    plugins: [],
};
