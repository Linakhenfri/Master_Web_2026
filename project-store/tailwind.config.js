/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#cd6dab',
        secondary: '#ede9c0',
        accent: '#FBBF24',
        background: '#fff7ed',
        textDark: '#1f2937',
      },
    },
  },
  plugins: [],
};