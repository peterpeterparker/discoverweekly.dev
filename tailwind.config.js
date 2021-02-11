module.exports = {
  purge: ['./pages/**/*.js', './components/**/*.js'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        dark: '#191919',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
