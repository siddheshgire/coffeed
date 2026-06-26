/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#FAF7F2',    // Primary page background
          100: '#F4EFE6',   // Card background, alternate section
          200: '#E6DEC9',   // Borders, dividers
          300: '#D7C7A3',   // Shadow / depth elements
          400: '#C7B17E',
          500: '#A48E59',
        },
        espresso: {
          50: '#F7F5F4',
          100: '#EEEAE7',
          200: '#DDD5CE',
          300: '#C1B0A4',
          400: '#A38B7C',
          500: '#866B5A',
          600: '#6C5446',
          700: '#523E33',
          800: '#3D2D24',   // Espresso brown (text)
          900: '#2C1B12',   // Deep espresso (headings)
          950: '#1C100A',   // Super dark espresso
          DEFAULT: '#2C1B12',
        },
        matcha: {
          50: '#F6F7F3',
          100: '#EAEDDE',
          200: '#D1D9BA',
          300: '#B2C092',
          400: '#8E9E6D',   // Soft matcha green accent
          500: '#728153',   // Matcha primary
          600: '#5A6740',
          700: '#434D2E',
          DEFAULT: '#728153',
        },
        goldAccent: {
          light: '#F5E6D3',
          DEFAULT: '#C89C6B', // Gold/ochre ratings & price highlights
          dark: '#B08352',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'ui-serif', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(44, 27, 18, 0.06)',
        'premium': '0 10px 30px -5px rgba(44, 27, 18, 0.08), 0 4px 12px -2px rgba(44, 27, 18, 0.03)',
        'inner-light': 'inset 0 2px 4px 0 rgba(255, 255, 255, 0.5)',
      },
      animation: {
        'float-slow': 'floatSlow 8s ease-in-out infinite',
        'float-medium': 'floatMedium 6s ease-in-out infinite',
        'float-fast': 'floatFast 4s ease-in-out infinite',
        'pulse-subtle': 'pulseSubtle 3s ease-in-out infinite',
        'spin-slow': 'spin 20s linear infinite',
      },
      keyframes: {
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-15px) rotate(5deg)' },
        },
        floatMedium: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translate(10px, -10px) rotate(-8deg)' },
        },
        floatFast: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: 1, transform: 'scale(1)' },
          '50%': { opacity: 0.95, transform: 'scale(0.98)' },
        }
      }
    },
  },
  plugins: [],
}
