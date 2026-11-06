import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import { createHash } from 'node:crypto';

// Content Security Policy, injected into the built index.html only (the dev
// server needs inline HMR scripts). GitHub Pages cannot set response headers,
// so this <meta> tag is the policy. Inline scripts are allowed by hash, which
// is recomputed on every build, so editing the SPA redirect script stays safe.
// (frame-ancestors cannot be set from a <meta> tag; GitHub Pages limitation.)
const cspPlugin = (): Plugin => ({
  name: 'inject-csp',
  apply: 'build',
  transformIndexHtml: {
    order: 'post',
    handler(html) {
      const hashes: string[] = [];
      for (const m of html.matchAll(/<script(?![^>]*\bsrc=)([^>]*)>([\s\S]*?)<\/script>/g)) {
        if (/application\/ld\+json/.test(m[1])) continue; // data, never executed
        hashes.push(`'sha256-${createHash('sha256').update(m[2]).digest('base64')}'`);
      }
      const policy = [
        "default-src 'self'",
        `script-src 'self' ${hashes.join(' ')}`.trim(),
        // React `style={{…}}` props and KaTeX need inline styles.
        "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
        "font-src 'self' https://fonts.gstatic.com data:",
        "img-src 'self' data: blob:",
        "connect-src 'self'",
        "media-src 'self'",
        "object-src 'none'",
        "base-uri 'self'",
        "form-action 'self'",
        "upgrade-insecure-requests",
      ].join('; ');
      return html.replace(
        /(<meta charset="UTF-8" \/>)/,
        `$1\n    <meta http-equiv="Content-Security-Policy" content="${policy}">`
      );
    },
  },
});

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), cspPlugin()],
  // Absolute base so bundled assets resolve correctly on nested clean-URL
  // routes (e.g. /blog/:id) under BrowserRouter. Safe because this is a
  // root-domain GitHub Pages site (yehias21.github.io).
  base: '/',
  // NOTE: no `define` for secrets. There is intentionally no client-side API
  // key; inlining one via `define` would ship it in the public bundle.
});
