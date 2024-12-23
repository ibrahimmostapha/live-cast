/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode:'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    minWidth: {
      '0':'0px',
      'full':'100%',
      'min':'min-content',
      'max':'max-content',
      'fit':'fit-content',
      '40': '10rem',
    },
    minHeight: {
      '0':'0px',
      'full':'100%',
      'min':'min-content',
      'max':'max-content',
      'fit':'fit-content',
      'screen':'100vh',
      '40': '10rem',
      '80':'80vh'
    }
  },
  plugins: [],
}
