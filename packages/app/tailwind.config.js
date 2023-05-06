/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx}',
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    spacing: {
      // 0 ~ 400px
      ...Object.fromEntries(
        new Array(401)
          .fill(0)
          .map((_, i) => i)
          .map((num) => [num, `${num}px`])
      ),
    },
    maxWidth: {
      480: '480px',
    },
    fontFamily: {
      sans: ['--font-serif', 'sans-serif'],
    },
  },
  plugins: [],
};
