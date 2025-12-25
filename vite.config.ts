import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, (process as any).cwd(), '');
  return {
    plugins: [react()],
    // Setting base to './' allows assets to be loaded relatively.
    // This works perfectly with HashRouter on GitHub Pages subdirectories.
    base: './', 
    define: {
      // This ensures your code using process.env.API_KEY works in the browser
      'process.env.API_KEY': JSON.stringify(env.API_KEY)
    }
  };
});