/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        'v-blue': '#0066CC',
        'v-gray': '#C0C0C0',
        'v-green': '#007A4D'
      }
    }
  },
  plugins: [],
}
