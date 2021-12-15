module.exports = {
  content: ['./*/src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      padding: {
        full: '100%',
      },
      width: {
        '1/2-gap': 'calc((100%-0.5rem)*0.5)',
      },
    },
  },
  plugins: [],
};
