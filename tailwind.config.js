/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      backgroundColor: {
        transparent: 'transparent',
        current: 'currentColor',
        plavender: '#E7BBE3',
        periwinkle: '#CCD5FF',
        puce: '#C884A6'
      },
    },
  },
  plugins: [],
}

