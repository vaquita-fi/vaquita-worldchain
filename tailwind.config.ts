import { nextui } from '@nextui-org/theme';
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'primary-100': '#FF9B00',
        'primary-200': '#FFA109',
        'primary-300': '#FEF0C7',
        'accent-100': '#F5F5F5',
        'accent-200': '#929292',
        'accent-300': '#667085',
        'text-100': '#F5F5F5',
        'text-200': '#E0E0E0',
        //bg-100: faeed6 // light version
        'bg-100': '#1D1F21',
        'bg-200': '#2C2E30',
        'bg-300': '#444648',
        'success-green': '#01BC8D',
        'warning-yellow': '#FFD032',
        'error-red': '#FF3B30',
      },
    },
    fontFamily: {
      clash: [ 'ClashDisplay', 'sans-serif' ],
    },
    boxShadow: {
      'top-custom': '0 -4px 6px -2px rgba(245, 245, 245, 0.1)',
      'bottom-custom': '0 4px 6px 2px rgba(245, 245, 245, 0.1)',
    },
  },
  darkMode: 'class',
  plugins: [ require('daisyui'), nextui() ],
};

export default config;
