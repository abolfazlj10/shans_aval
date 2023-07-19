/** @type {import('tailwindcss').Config} */
// https://colorhunt.co/palette/525fe1f86f03ffa41bfff6f4
const colors = require('tailwindcss/colors')
module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    container:{
      center:true
    },
    fontFamily:{
      'vazir':'vazir',
      'vazirBold':'vazirBold'
    },
    colors:{
      'brand':'#525FE1',
      'brd':'#D0D0D0',
      ...colors,
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}