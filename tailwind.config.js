/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      animation: {
        'fade-in': 'fadeIn 1s ease-out both',
        'bounce-slow': 'floatUpDown 3s ease-in-out infinite',
        'color-cycle': 'colorChange 6s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        floatUpDown: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        colorChange: {
          '0%': { color: '#9929EA' },
          '25%': { color: '#CC66DA' },
          '50%': { color: '#FAEB92' },
          '75%': { color: '#FFD8D8' },
          '100%': { color: '#9929EA' },
        },
      },
    },
  },
  plugins: [],
};
