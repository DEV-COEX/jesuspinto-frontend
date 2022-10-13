module.exports = {
  mode: 'jit',
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    screens: {
      supersm: '300px',

      sm: '576px',

      md: '768px',

      lg: '992px',

      xl: '1400px',
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
    './node_modules/flowbite/**/*.js',
  ],
  plugins: [require('@tailwindcss/line-clamp'), require('flowbite/plugin')],
};
