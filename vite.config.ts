import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Absolute base so bundled assets resolve correctly on nested clean-URL
  // routes (e.g. /blog/:id) under BrowserRouter. Safe because this is a
  // root-domain GitHub Pages site (yehias21.github.io).
  base: '/',
  // NOTE: no `define` for secrets. There is intentionally no client-side API
  // key — inlining one via `define` would ship it in the public bundle.
});