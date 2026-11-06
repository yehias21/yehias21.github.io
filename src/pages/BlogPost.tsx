import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ThemeMode } from '../types';
import { BLOG_POSTS } from '../data/content';
import { ArrowLeft, ArrowUp, ChevronDown, ChevronUp } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';
import '../styles/markdown.css';

interface BlogPostProps {
  theme: ThemeMode;
}

// Slugify heading text → stable id for anchors and TOC.
const slugify = (s: string): string =>
  s
    .toLowerCase()
    .replace(/[`*_~]/g, '')
    .replace(/&/g, 'and')
    .replace(/[^\p{Letter}\p{Number}\s-]/gu, '')
    .trim()
    .replace(/\s+/g, '-')
    .slice(0, 80);

// Extract ## / ### headings from the raw markdown (skip code blocks).
const parseHeadings = (md: string): { id: string; text: string; level: number }[] => {
  const lines = md.split('\n');
  const headings: { id: string; text: string; level: number }[] = [];
  let inFence = false;
  const seen = new Map<string, number>();
  for (const line of lines) {
    if (/^```/.test(line)) {
      inFence = !inFence;
      continue;
    }
    if (inFence) continue;
    const m = /^(#{2,3})\s+(.+?)\s*$/.exec(line);
    if (!m) continue;
    const level = m[1].length;
    const text = m[2].replace(/[*_`]/g, '');
    let id = slugify(text);
    const count = seen.get(id) ?? 0;
    seen.set(id, count + 1);
    if (count > 0) id = `${id}-${count}`;
    headings.push({ id, text, level });
  }
  return headings;
};

// Remove the first top-level heading from markdown so we can render it as a proper hero title.
const stripLeadingH1 = (md: string): string => md.replace(/^\s*#\s+[^\n]+\n?/, '');

const SITE_ORIGIN = 'https://yehias21.github.io';
const CITE_AUTHOR = 'Shaaban, Yahia Salaheldin';

// Pull the 4-digit year out of a human dateline like "Jun 3, 2026".
const yearOf = (date: string): string => (date.match(/\b(\d{4})\b/)?.[1] ?? '');

// Build the BibTeX key: first author surname + year + first title word.
const bibKey = (title: string, year: string): string =>
  `shaaban${year}${(title.toLowerCase().match(/[a-z0-9]+/g) ?? ['post'])[0]}`;

const BlogPost: React.FC<BlogPostProps> = ({ theme }) => {
  const { id } = useParams<{ id: string }>();
  const isMatrix = theme === ThemeMode.MATRIX;

  const post = BLOG_POSTS.find(p => p.id === id);
  const bodyMd = useMemo(() => (post ? stripLeadingH1(post.content) : ''), [post]);
  const headings = useMemo(() => (post ? parseHeadings(bodyMd) : []), [post, bodyMd]);

  // Reading progress + active TOC item
  const [progress, setProgress] = useState(0);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [showTop, setShowTop] = useState(false);
  const [tocOpen, setTocOpen] = useState(false);
  const articleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const total = doc.scrollHeight - doc.clientHeight;
      const p = total > 0 ? Math.min(1, Math.max(0, doc.scrollTop / total)) : 0;
      setProgress(p);
      setShowTop(doc.scrollTop > 600);

      // Scroll-spy: first heading whose top is just above viewport fold.
      const fold = 140;
      let current: string | null = null;
      for (const h of headings) {
        const el = document.getElementById(h.id);
        if (!el) continue;
        const top = el.getBoundingClientRect().top;
        if (top - fold <= 0) current = h.id;
        else break;
      }
      setActiveId(current ?? (headings[0]?.id ?? null));
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [headings]);

  // Attach deterministic ids to rendered headings so TOC links and scroll-spy agree.
  // Reset on every render so counts don't drift when state updates re-render the page.
  const counters: Record<string, number> = {};
  const extractText = (nodes: any): string => {
    return React.Children.toArray(nodes).map((c: any): string => {
      if (typeof c === 'string' || typeof c === 'number') return String(c);
      if (c?.props?.children) return extractText(c.props.children);
      return '';
    }).join('');
  };
  const headingRenderer =
    (level: 2 | 3) =>
    ({ children }: any) => {
      const text = extractText(children);
      const base = slugify(text);
      const n = counters[base] ?? 0;
      counters[base] = n + 1;
      const id = n === 0 ? base : `${base}-${n}`;
      const Tag = (`h${level}` as any) as keyof React.JSX.IntrinsicElements;
      return <Tag id={id} className="scroll-mt-32">{children}</Tag>;
    };

  if (!post) {
    return (
      <div className="py-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="text-center">
          <h2 className={`text-2xl font-bold mb-4 ${isMatrix ? 'text-slate-100' : 'text-slate-900'}`}>Blog post not found</h2>
          <Link
            to="/blog"
            className={`inline-flex items-center gap-2 ${isMatrix ? 'text-accent-500 hover:text-accent-400' : 'text-[#0085a1] hover:text-[#006d82]'}`}
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  const activeIdx = Math.max(0, headings.findIndex(h => h.id === activeId));
  const topLevel = headings.filter(h => h.level === 2);
  // Number top-level sections 01, 02, ... the way the section bar shows them.
  const sectionNumber = (id: string) => {
    let n = 0;
    for (const h of headings) {
      if (h.level === 2) n++;
      if (h.id === id) return n;
    }
    return n;
  };
  const current = headings[activeIdx];
  const currentTop = current
    ? (current.level === 2 ? current : [...headings.slice(0, activeIdx + 1)].reverse().find(h => h.level === 2) ?? current)
    : undefined;

  // Headings may already carry their own number ("3. Predict"); the bar adds one.
  const plain = (t: string) => t.replace(/^\s*\d+[.)]\s+/, '');

  const scrollToId = (hid: string) => {
    const el = document.getElementById(hid);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 128;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
    setTocOpen(false);
  };

  const year = yearOf(post.date);
  const url = `${SITE_ORIGIN}/blog/${post.id}`;
  const bib =
`@article{${bibKey(post.title, year)},
  title   = "${post.title}",
  author  = "${CITE_AUTHOR}",
  journal = "yehias21.github.io",
  year    = "${year}",
  url     = "${url}"
}`;

  return (
    <div className={`blog-article blog-sheet mt-10 ${isMatrix ? 'theme-dark' : ''}`}>
      {/* Section bar: sticky under the navbar, shows where you are and opens
          the full list of sections. Replaces the sidebar table of contents. */}
      {topLevel.length > 1 && (
        <div className="blog-sectionbar fixed left-0 right-0 top-16 z-30">
          <div className="relative">
            <button
              type="button"
              onClick={() => setTocOpen(o => !o)}
              aria-expanded={tocOpen}
              className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-11 flex items-center gap-4 text-left"
            >
              <span className="num w-6 shrink-0">{String(currentTop ? sectionNumber(currentTop.id) : 1).padStart(2, '0')}</span>
              <span className="blog-ink text-sm truncate flex-1">{plain(currentTop?.text ?? topLevel[0].text)}</span>
              {tocOpen ? <ChevronUp className="w-4 h-4 blog-muted shrink-0" /> : <ChevronDown className="w-4 h-4 blog-muted shrink-0" />}
            </button>
            <div
              className="absolute left-0 right-0 bottom-0 h-px origin-left"
              style={{ transform: `scaleX(${progress})`, background: 'var(--blog-ink)' }}
              aria-hidden="true"
            />
            {tocOpen && (
              <nav className="blog-sectionbar-menu absolute left-0 right-0 top-full max-h-[70vh] overflow-y-auto">
                <ul className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
                  {topLevel.map(h => {
                    const isActive = currentTop?.id === h.id;
                    return (
                      <li key={h.id}>
                        <a
                          href={`#${h.id}`}
                          onClick={(e) => { e.preventDefault(); scrollToId(h.id); }}
                          className="flex items-center gap-4 rounded-md px-2 -mx-2 py-2 text-sm"
                        >
                          <span className="num blog-mono blog-faint w-6 shrink-0 text-[0.8rem]">{String(sectionNumber(h.id)).padStart(2, '0')}</span>
                          <span className={isActive ? 'blog-ink font-semibold' : 'blog-muted'}>{plain(h.text)}</span>
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </nav>
            )}
          </div>
        </div>
      )}

      <article ref={articleRef} className={topLevel.length > 1 ? 'pt-14' : 'pt-6'}>
        <header className="text-center">
          <Link to="/blog" className="blog-meta inline-flex items-center gap-1.5 text-sm hover:underline underline-offset-4">
            <ArrowLeft className="w-3.5 h-3.5" /> Blog
          </Link>
          <h1 className="blog-title text-[2.6rem] sm:text-[3.4rem] md:text-[4rem] max-w-3xl mx-auto mt-6">
            {post.title}
          </h1>
          <p className="blog-meta mt-6">
            Published {post.date}
            {post.updated && <> · Updated {post.updated}</>}
            {' · '}{post.readTime}
          </p>
        </header>

        {post.cover && (
          <figure className="blog-hero mt-12 max-w-5xl mx-auto" style={{ background: post.coverTint ?? 'var(--blog-panel)' }}>
            <img src={post.cover} alt="" />
          </figure>
        )}

        <div className="blog-column mt-14">
          {post.excerpt && (
            <p className="blog-serif text-[1.3rem] sm:text-[1.4rem] leading-snug blog-ink mb-10">
              {post.excerpt}
            </p>
          )}

          <div className={`prose ${isMatrix ? 'prose-invert' : ''}`}>
            <ReactMarkdown
              remarkPlugins={[remarkGfm, remarkMath]}
              rehypePlugins={[rehypeKatex]}
              components={{
                h2: headingRenderer(2),
                h3: headingRenderer(3),
                // The image's alt text doubles as its caption.
                img: ({ src, alt }: any) => (
                  <>
                    <img src={src as string} alt={(alt as string) ?? ''} loading="lazy" />
                    {alt ? <span className="prose-caption">{alt}</span> : null}
                  </>
                ),
              }}
            >
              {bodyMd}
            </ReactMarkdown>
          </div>

          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-14">
              {post.tags.map(tag => (
                <span key={tag} className="blog-panel blog-muted text-xs rounded-full px-3 py-1">
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Auto-generated citation footer. */}
          <section data-allow-copy className="blog-citation mt-10 pt-8 border-t blog-rule">
            <h2 className="blog-meta mb-3">Citation</h2>
            <p className="blog-serif text-[0.98rem] leading-relaxed blog-muted mb-4">
              Shaaban, Yahia Salaheldin. ({post.date}). {post.title}.{' '}
              <span className="italic">yehias21.github.io</span>.{' '}
              <a href={url} className="underline underline-offset-2 break-all">{url}</a>
            </p>
            <pre className="blog-panel blog-ink text-xs rounded-lg p-4 overflow-x-auto">{bib}</pre>
          </section>
        </div>
      </article>

      {showTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Back to top"
          className="fixed bottom-6 right-6 z-40 p-3 rounded-full blog-panel blog-ink border blog-rule shadow-sm hover:shadow transition-shadow"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};

export default BlogPost;
