/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2563eb', // blue-600
          light: '#eff6ff',   // blue-50
          dark: '#1e40af',    // blue-800
          accent: '#2563eb',  // blue-600 for buttons and highlights
        },
        background: '#eff6ff',
        surface: '#ffffff',
        accent: '#2563eb',
      },
    },
  },
  plugins: [],
  darkMode: 'class',
}
