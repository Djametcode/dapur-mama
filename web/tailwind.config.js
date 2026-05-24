/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#E07A2F',
        'primary-dark': '#C96A24',
        'primary-light': '#F09850',
        secondary: '#2D6A4F',
        'secondary-dark': '#1B4332',
        'secondary-light': '#40916C',
        warm: '#FFF8F0',
        'warm-dark': '#F5EDE0',
        'text-main': '#333333',
        'text-light': '#666666',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Playfair Display', 'Georgia', 'serif'],
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
      },
      boxShadow: {
        'warm': '0 4px 20px rgba(224, 122, 47, 0.15)',
        'card': '0 2px 12px rgba(0,0,0,0.06)',
        'card-hover': '0 8px 30px rgba(0,0,0,0.12)',
      },
    },
  },
  plugins: [],
}
