/** @type {import('tailwindcss').Config} */
// Compiled at build time (previously loaded at runtime from the Tailwind CDN,
// which executed third-party script on every visit and blocked a strict CSP).
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx,md}'],
  theme: {
    extend: {
      colors: {
        // Dark-mode accent palette: monochrome slate (no chromatic accent).
        accent: {
          50: '#f8fafc', 100: '#f1f5f9', 200: '#e2e8f0', 300: '#cbd5e1', 400: '#94a3b8',
          500: '#64748b', 600: '#475569', 700: '#334155', 800: '#1e293b', 900: '#0f172a', 950: '#020617',
        },
        matrix: { black: '#020617', white: '#f1f5f9', grey: '#64748b' },
      },
      fontFamily: {
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', '"Liberation Mono"', '"Courier New"', 'monospace'],
        sans: ['system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', '"Helvetica Neue"', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
