/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      screens :{
        'xs' : {'min':'400px','max':'639px'}
      }
    },
  },
  plugins: [],
}