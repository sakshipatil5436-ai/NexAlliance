/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        theme: {
          bg: '#FBF9F3',
          card: '#FFFFFF',
          dark: '#0F0F11',
          gold: '#F5B800',
          yellow: '#F9C726',
          'gold-light': '#FFF8E7',
          'gold-glow': 'rgba(249, 199, 38, 0.2)',
          'text-sub': '#555555',
          border: '#EBE5D8'
        }
      },
      fontFamily: {
        heading: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'glow': '0 0 40px rgba(249, 199, 38, 0.25)',
        'card-glow': '0 15px 35px -5px rgba(245, 184, 0, 0.12)',
        'soft': '0 20px 40px -15px rgba(0, 0, 0, 0.05)'
      }
    },
  },
  plugins: [],
}
plugins: [],
}
