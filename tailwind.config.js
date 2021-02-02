/* eslint-disable @typescript-eslint/no-var-requires */
const pluginForm = require('@tailwindcss/forms')

/* eslint-disable-next-line no-undef */
module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [pluginForm],
};
