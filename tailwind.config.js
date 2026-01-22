/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FAFAFA', // warm paper white for the base
        secondary: '#E5DCC5', // sandy beige for secondary accents
        tertiary: '#D88C78', // light brick for tertiary highlights
        quaternary: '#CC6649', // muted terracotta for strong accents
        text: '#2D2A26', // anthracite/dark brown for readable text
      },
      fontFamily: {
        title: ['\"Playfair Display\"', 'serif'],
        body: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};