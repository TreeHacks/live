import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        theme: {
          '100': 'var(--theme-100)',
          '200': 'var(--theme-200)',
          '300': 'var(--theme-300)',
          '400': 'var(--theme-400)',
        },
        brand: {
          '100': 'var(--brand-100)',
          '200': 'var(--brand-200)',
          '300': 'var(--brand-300)',
          '400': 'var(--brand-400)',
        },
      },
    },
  },
  plugins: [],
};
export default config;
