import colors from './src/styles/colors.json'

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors,
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        GroteskRegular: ['GroteskRegular', 'sans-serif'],
        GroteskBold: ['GroteskBold', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
