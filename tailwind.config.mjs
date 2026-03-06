/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        base: '#f5f6f8',
        card: '#ffffff',
        elevated: '#f0f1f4',
        border: '#e0e3e8',
        'border-hover': '#c5cad3',
        accent: '#f38020',
        'accent-glow': 'rgba(243, 128, 32, 0.1)',
        'text-primary': '#1a1e2c',
        'text-secondary': '#5a6377',
        'text-muted': '#929bb0',
      },
      fontFamily: {
        display: ['Bricolage Grotesque', 'PingFang SC', 'Microsoft YaHei', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      borderRadius: {
        DEFAULT: '8px',
        lg: '12px',
      },
    },
  },
  plugins: [],
}
