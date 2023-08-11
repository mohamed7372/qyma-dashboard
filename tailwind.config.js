/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          100: '#1a1a1a',
          200: '#584632',
          300: '#f19c33',
          400: '#f0eecd',
        },
        secondary: {
          100: '#FEF8EC',
          200: '#FDF1DB',
        },
      },
      fontFamily: {
        body: ['Nunito'],
      },
      backgroundImage: {
        'image-not-found': 'url("./assets/img/image_not_found.jpeg")',
      },
      height: {
        big: '56rem',
        large: '36rem',
        medium: '30rem',
        small: '28rem',
      },
      spacing: {
        space1: '9.5rem',
        space2: '13rem',
      },
      keyframes: {
        slideDown: {
          '0%': {
            transform: 'translateY(-4.1rem)',
            opacity: '0',
          },
          '100%': {
            transform: 'translateY(0)',
            opacity: '1',
          },
        },
      },
      animation: {
        slideDown: 'slideDown 400ms ease-in-out',
      },
    },
  },
  plugins: [],
};
