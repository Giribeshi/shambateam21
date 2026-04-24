/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'agrimind-green': '#2d5016',
        'agrimind-light': '#4a7c28',
        'agrimind-accent': '#8bc34a',
        'agrimind-bg': '#f1f8e9',
        'agrimind-earth': '#8d6e63',
        'agrimind-sky': '#81d4fa',
        'agrimind-sun': '#ffb74d',
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-slow': 'bounce 2s infinite',
      }
    },
  },
  plugins: [],
}
