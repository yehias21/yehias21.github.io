// The Blog page's Thoughts tab: short dated notes and opinions, newest first.
import React, { useMemo } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';
import '../styles/markdown.css';
import { ThemeMode } from '../types';
import { THOUGHTS } from '../data/content';
import { BlogLang, formatDate, UI } from './BlogLang';

const MONTH = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

// "2026-11-07" -> "Nov 7, 2026" (or the French form)
const showDate = (iso: string, lang: BlogLang) => {
  const [y, m, d] = iso.split('-').map(Number);
  if (!y || !m || !d) return iso;
  return formatDate(`${MONTH[m - 1]} ${d}, ${y}`, lang);
};

const ThoughtStream: React.FC<{ theme: ThemeMode; lang: BlogLang }> = ({ theme, lang }) => {
  const isMatrix = theme === ThemeMode.MATRIX;
  const t = UI[lang];
  const thoughts = useMemo(() => [...THOUGHTS].sort((a, b) => (a.date < b.date ? 1 : -1)), []);

  if (thoughts.length === 0) {
    return <p className="blog-serif blog-muted italic">{t.noThoughts}</p>;
  }

  return (
    <ol className="max-w-3xl">
      {thoughts.map(th => {
        const fr = lang === 'fr' && th.textFr;
        return (
          <li key={th.id} id={th.id} lang={fr ? 'fr' : 'en'} className="blog-thought border-t blog-rule py-8 grid sm:grid-cols-[9rem_1fr] gap-x-8 gap-y-2">
            <div className="blog-meta text-sm">
              <a href={`#${th.id}`} className="hover:underline underline-offset-4">{showDate(th.date, lang)}</a>
              {th.kind && <span className="block blog-faint mt-1">{th.kind === 'opinion' ? t.opinion : t.thought}</span>}
            </div>
            <div className="min-w-0">
              <div className={`prose blog-thought-body ${isMatrix ? 'prose-invert' : ''}`}>
                <ReactMarkdown remarkPlugins={[remarkGfm, remarkMath]} rehypePlugins={[rehypeKatex]}>
                  {fr || th.text}
                </ReactMarkdown>
              </div>
              {th.tags && th.tags.length > 0 && (
                <p className="blog-mono blog-faint text-xs mt-3">{th.tags.map(x => `#${x}`).join('  ')}</p>
              )}
            </div>
          </li>
        );
      })}
    </ol>
  );
};

export default ThoughtStream;
