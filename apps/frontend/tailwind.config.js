const { createGlobPatternsForDependencies } = require('@nrwl/react/tailwind');
const { join } = require('path');

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    join(
      __dirname,
      '{src,pages,components,layouts}/**/*!(*.stories|*.spec).{ts,tsx,html}'
    ),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Noto Sans KR', 'sans-serif'],
      },
      gridTemplateColumns: {
        'footer': '1fr auto auto'
      },
      gridTemplateRows: {
        'auth-layout': '1fr auto',
        'default-layout': '1fr auto 1fr',
      }
    },
  },
  plugins: [
    // require('@tailwindcss/forms'),
  ],
};
