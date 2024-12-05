/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
      colors: {
        primary: '#101010',
        secondary: '#56A46E',
        background: '#FFFFFF',
      }
    },
  },
  plugins: [],
}

