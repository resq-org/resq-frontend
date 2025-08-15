// tailwind.config.ts
import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        pretendard: ['var(--font-pretendard)', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
