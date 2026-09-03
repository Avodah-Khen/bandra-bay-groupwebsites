import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#111318',
        porcelain: '#f7f5f1',
        gold: '#a9822f',
        deep: '#0b1f2a',
      },
      fontFamily: {
        display: ['Georgia', 'ui-serif', 'serif'],
      },
      letterSpacing: {
        wide2: '0.08em',
      },
    },
  },
  plugins: [],
};

export default config;
