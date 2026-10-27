/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    screens: {
      'sm': '480px',
      'md': '768px',
      'lg': '1100px',
      'xl': '1440px',
    },
    extend: {
      colors: {
        paper: 'var(--paper)',
        ink: 'var(--ink)',
        'sea-900': 'var(--sea-900)',
        'sea-700': 'var(--sea-700)',
        'sea-500': 'var(--sea-500)',
        'sea-100': 'var(--sea-100)',
        'sand-100': 'var(--sand-100)',
        'sand-300': 'var(--sand-300)',
        'sand-600': 'var(--sand-600)',
        'coral-500': 'var(--coral-500)',
        'deep-sea': 'var(--deep-sea)',
        'rule': 'var(--border-rule)',
        'muted': 'var(--text-muted)',
      },
      fontFamily: {
        serif: ['Fraunces', 'Georgia', 'serif'],
        display: ['Fraunces', 'Georgia', 'serif'],
        sans: ['"Source Sans 3"', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      borderRadius: {
        DEFAULT: '4px',
        sm: '2px',
        md: '6px', // max 6px editorial standard
        lg: '6px',
        full: '9999px',
      },
      maxWidth: {
        'content': '1200px',
        'reading': '68ch',
      },
      transitionDuration: {
        DEFAULT: '180ms',
      },
    },
  },
  plugins: [],
};
