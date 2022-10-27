/** @type {import('tailwindcss').Config} */
module.exports = {
  // content: ["./src/**/*.{js,jsx,ts,tsx}"],
  content: ["./src/**/*.{jsx,js}"],
  theme: {
    extend: {},
  },
  plugins: [
    require('tailwindcss'),
    require('autoprefixer'),
  ],
}
