// Pre-render every route to its own index.html so GitHub Pages serves real
// pages (HTTP 200, full content, per-page title and description) instead of
// bouncing through 404.html. The client app then takes over in the browser.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const ssrDir = path.join(root, 'dist-ssr');

const entry = fs.readdirSync(ssrDir).find(f => /^entry-server\.(m?js)$/.test(f));
const { render, pages } = await import(pathToFileURL(path.join(ssrDir, entry)).href);
const template = fs.readFileSync(path.join(dist, 'index.html'), 'utf8');

const esc = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const fill = (html, meta, body) => html
  .replace(/<title>[^<]*<\/title>/, `<title>${esc(meta.title)}</title>`)
  .replace(/(<meta name="description" content=")[^"]*(")/, `$1${esc(meta.description)}$2`)
  .replace(/(<link rel="canonical" href=")[^"]*(")/, `$1${meta.url}$2`)
  .replace(/(<meta property="og:title" content=")[^"]*(")/, `$1${esc(meta.title)}$2`)
  .replace(/(<meta property="og:description" content=")[^"]*(")/, `$1${esc(meta.description)}$2`)
  .replace(/(<meta property="og:url" content=")[^"]*(")/, `$1${meta.url}$2`)
  .replace(/(<meta name="twitter:title" content=")[^"]*(")/, `$1${esc(meta.title)}$2`)
  .replace(/(<meta name="twitter:description" content=")[^"]*(")/, `$1${esc(meta.description)}$2`)
  .replace('<div id="root"></div>', `<div id="root">${body}</div>`);

const all = pages();
for (const meta of all) {
  const html = fill(template, meta, render(meta.path));
  const out = path.join(dist, meta.path, 'index.html');
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, html);
}
// The bare domain shows the home page directly.
const home = all.find(p => p.path === '/home');
fs.writeFileSync(path.join(dist, 'index.html'), fill(template, home, render('/home')));

// Fresh sitemap with today's date for every page (post pages use their own date).
const today = new Date().toISOString().slice(0, 10);
const urls = all.map(p => `  <url><loc>${p.url}</loc><lastmod>${p.lastmod ?? today}</lastmod></url>`).join('\n');
fs.writeFileSync(path.join(dist, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`);

fs.rmSync(ssrDir, { recursive: true, force: true });
console.log(`prerendered ${all.length + 1} pages`);
