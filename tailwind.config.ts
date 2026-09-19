import type { Config } from 'tailwindcss';

const config: Config = {
  theme: {
    extend: {
      colors: {
        surface: '#f8faf9',
        'surface-variant': '#e0e3e8',
        'surface-container-lowest': '#ffffff',
        'surface-container-low': '#f1f4f3',
        'surface-container': '#e9edeb',
        'surface-container-high': '#e3e8e6',
        'surface-container-highest': '#dde3e1',
        'on-surface': '#191c1b',
        'on-surface-variant': '#404946',
        'inverse-surface': '#2e3130',
        'inverse-on-surface': '#eff1ef',
        primary: '#006b5e',
        'primary-container': '#00d1b2',
        'on-primary': '#ffffff',
        'on-primary-container': '#00201b',
        'primary-fixed': '#8ff8e5',
        'on-primary-fixed': '#00201b',
        secondary: '#4b635e',
        'secondary-container': '#cde8e1',
        'on-secondary-container': '#08201b',
        'outline-variant': '#bec9c5',
      },
      boxShadow: {
        xs: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
      },
      fontFamily: {
        space: ['var(--font-space-grotesk)', 'sans-serif'],
        'body-md': ['Geist', 'sans-serif'],
        'body-lg': ['Geist', 'sans-serif'],
        'mono-custom': ['var(--font-jetbrains-mono)', 'monospace'],
      },
    },
  },
};

export default config;
