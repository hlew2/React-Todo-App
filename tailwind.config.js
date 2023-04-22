/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      backgroundColor: {
        blue1: 'rgb(158, 235, 255)',
        grey1: 'rgb(241, 241, 241)',
        red1: 'rgb(247, 47, 47)',
      },
      boxShadow: {
        custom1: '12px 12px 10px 0px rgba(0,0,0,0.65)',
      },
    },
    screens: {
      xxs: '510px',
      xs: '610px',
      md: '810px',
    },
  },
  plugins: [require('autoprefixer')],
};
