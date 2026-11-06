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

  // Section list shared by the desktop sidebar and the mobile section bar.
  const SectionList: React.FC<{ compact?: boolean }> = ({ compact }) => (
    <ul className={compact ? 'py-3' : ''}>
      {topLevel.map(h => {
        const isActive = currentTop?.id === h.id;
        return (
          <li key={h.id} className={compact ? '' : 'border-t blog-rule'}>
            <a
              href={`#${h.id}`}
              onClick={(e) => { e.preventDefault(); scrollToId(h.id); }}
              className={`flex gap-3 py-2.5 text-[0.8125rem] leading-snug transition-colors ${isActive ? 'blog-ink' : 'blog-muted hover:text-[var(--blog-ink)]'}`}
            >
              <span className="blog-mono blog-faint w-5 shrink-0 text-[0.75rem] pt-px">{String(sectionNumber(h.id)).padStart(2, '0')}</span>
              <span className={isActive ? 'font-medium' : ''}>{plain(h.text)}</span>
            </a>
          </li>
        );
      })}
    </ul>
  );

  const metaRows: [string, React.ReactNode][] = [
    ['Published', post.date],
    ...(post.updated ? [['Updated', post.updated] as [string, React.ReactNode]] : []),
    ['Reading time', post.readTime.replace(' read', '')],
    ['Topics', <span className="flex flex-col gap-1">{post.tags.map(t => <span key={t}>{t}</span>)}</span>],
  ];

  return (
    <div className={`blog-article blog-sheet blog-page mt-6 ${isMatrix ? 'theme-dark' : ''}`}>
      {/* Mobile and tablet: section bar under the navbar */}
      {topLevel.length > 1 && (
        <div className="blog-sectionbar xl:hidden fixed left-0 right-0 top-16 z-30">
          <div className="relative">
            <button
              type="button"
              onClick={() => setTocOpen(o => !o)}
              aria-expanded={tocOpen}
              className="w-full px-4 sm:px-6 h-11 flex items-center gap-4 text-left"
            >
              <span className="num w-6 shrink-0">{String(currentTop ? sectionNumber(currentTop.id) : 1).padStart(2, '0')}</span>
              <span className="blog-ink text-sm truncate flex-1">{plain(currentTop?.text ?? topLevel[0].text)}</span>
              {tocOpen ? <ChevronUp className="w-4 h-4 blog-muted shrink-0" /> : <ChevronDown className="w-4 h-4 blog-muted shrink-0" />}
            </button>
            <div className="absolute left-0 right-0 bottom-0 h-px origin-left" style={{ transform: `scaleX(${progress})`, background: 'var(--blog-ink)' }} aria-hidden="true" />
            {tocOpen && (
              <nav className="blog-sectionbar-menu absolute left-0 right-0 top-full max-h-[70vh] overflow-y-auto px-4 sm:px-6">
                <SectionList compact />
              </nav>
            )}
          </div>
        </div>
      )}

      <article ref={articleRef} className="pt-16 xl:pt-6">
        <header className="text-center">
          <Link to="/blog" className="blog-meta inline-flex items-center gap-1.5 hover:underline underline-offset-4">
            <ArrowLeft className="w-3.5 h-3.5" /> Blog
          </Link>
          <h1 className="blog-title text-[1.85rem] sm:text-[2.05rem] max-w-[46rem] mx-auto mt-5">{post.title}</h1>
        </header>

        {/* Below xl: the metadata sits in a row under the title */}
        <dl className="xl:hidden grid grid-cols-1 sm:grid-cols-3 gap-x-6 mt-12 text-[0.8125rem]">
          {metaRows.filter(([k]) => k !== 'Updated').map(([k, v]) => (
            <div key={k} className="border-t blog-rule pt-3 pb-4 grid grid-cols-[7rem_1fr] sm:block">
              <dt className="blog-ink sm:mb-2">{k}</dt>
              <dd className="blog-muted">{v}</dd>
            </div>
          ))}
        </dl>

        {/* Three columns on wide screens: sections, text, details */}
        <div className="blog-grid mt-10 xl:mt-14">
          <aside className="hidden xl:block">
            {topLevel.length > 1 && (
              <nav className="sticky top-24" aria-label="Sections">
                <SectionList />
              </nav>
            )}
          </aside>

          <div className="min-w-0">
            <div className={`prose ${isMatrix ? 'prose-invert' : ''}`}>
              <ReactMarkdown
                remarkPlugins={[remarkGfm, remarkMath]}
                rehypePlugins={[rehypeKatex]}
                components={{
                  h2: headingRenderer(2),
                  h3: headingRenderer(3),
                  img: ({ src, alt }: any) => (
                    <span className="prose-figure">
                      <img src={src as string} alt={(alt as string) ?? ''} loading="lazy" />
                      {alt ? <span className="prose-caption">{alt}</span> : null}
                    </span>
                  ),
                }}
              >
                {bodyMd}
              </ReactMarkdown>
            </div>

            <section data-allow-copy className="blog-citation mt-16 pt-6 border-t blog-rule">
              <h2 className="text-[0.8125rem] blog-ink mb-3">Cite this post</h2>
              <p className="blog-serif text-[0.95rem] leading-relaxed blog-muted mb-4">
                Shaaban, Yahia Salaheldin. ({post.date}). {post.title}.{' '}
                <span className="italic">yehias21.github.io</span>.{' '}
                <a href={url} className="underline underline-offset-2 break-all">{url}</a>
              </p>
              <pre className="blog-panel blog-ink text-xs rounded-lg p-4 overflow-x-auto">{bib}</pre>
            </section>
          </div>

          <aside className="hidden xl:block">
            <dl className="sticky top-24 text-[0.8125rem]">
              {metaRows.map(([k, v]) => (
                <div key={k} className="border-t blog-rule py-3 grid grid-cols-[6.5rem_1fr] gap-2">
                  <dt className="blog-ink">{k}</dt>
                  <dd className="blog-muted">{v}</dd>
                </div>
              ))}
            </dl>
          </aside>
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
