import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, (process as any).cwd(), '');
  return {
    plugins: [react()],
    // Absolute base so bundled assets resolve correctly on nested clean-URL
    // routes (e.g. /blog/:id) under BrowserRouter. Safe because this is a
    // root-domain GitHub Pages site (yehias21.github.io).
    base: '/',
    define: {
      // This ensures your code using process.env.API_KEY works in the browser
      'process.env.API_KEY': JSON.stringify(env.API_KEY)
    }
  };
});