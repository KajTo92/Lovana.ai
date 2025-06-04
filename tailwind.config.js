/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#FF6B6B',
          50: '#FFFFFF',
          100: '#FFFFFF',
          200: '#FFE3E3',
          300: '#FFB6B6',
          400: '#FF9090',
          500: '#FF6B6B',
          600: '#FF3838',
          700: '#FF0505',
          800: '#D10000',
          900: '#9E0000',
        },
        secondary: {
          DEFAULT: '#A685E2',
          50: '#FFFFFF',
          100: '#F5F1FC',
          200: '#DFD4F5',
          300: '#C8B7ED',
          400: '#B79EE7',
          500: '#A685E2',
          600: '#885FD8',
          700: '#6B3ACF',
          800: '#562DAB',
          900: '#422283',
        },
        accent: {
          DEFAULT: '#FFE66D',
          50: '#FFFFFF',
          100: '#FFFFFF',
          200: '#FFFAD1',
          300: '#FFF4A4',
          400: '#FFED88',
          500: '#FFE66D',
          600: '#FFDD37',
          700: '#FFD400',
          800: '#CCAA00',
          900: '#958000',
        },
        card: '#FFEDE6',
        background: '#FFF8F0',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'profile': '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
      },
    },
  },
  plugins: [],
};