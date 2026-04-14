import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ThemeMode } from '../types';
import { BLOG_POSTS } from '../data/content';
import { FileText, ArrowLeft, Calendar, Clock, ArrowUp, List } from 'lucide-react';
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

const BlogPost: React.FC<BlogPostProps> = ({ theme }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isMatrix = theme === ThemeMode.MATRIX;

  const post = BLOG_POSTS.find(p => p.id === id);
  const bodyMd = useMemo(() => (post ? stripLeadingH1(post.content) : ''), [post]);
  const headings = useMemo(() => (post ? parseHeadings(bodyMd) : []), [post, bodyMd]);

  // Reading progress + active TOC item
  const [progress, setProgress] = useState(0);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [showTop, setShowTop] = useState(false);
  const articleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const total = doc.scrollHeight - doc.clientHeight;
      const p = total > 0 ? Math.min(1, Math.max(0, doc.scrollTop / total)) : 0;
      setProgress(p);
      setShowTop(doc.scrollTop > 600);

      // Scroll-spy: first heading whose top is just above viewport fold.
      const fold = 120;
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
  const counters = useRef<Record<string, number>>({});
  useEffect(() => {
    counters.current = {};
  }, [bodyMd]);

  const headingRenderer =
    (level: 2 | 3) =>
    ({ children }: any) => {
      const text = React.Children.toArray(children)
        .map((c: any) => (typeof c === 'string' ? c : c?.props?.children ?? ''))
        .join('');
      const base = slugify(text);
      const n = counters.current[base] ?? 0;
      counters.current[base] = n + 1;
      const id = n === 0 ? base : `${base}-${n}`;
      const Tag = (`h${level}` as any) as keyof JSX.IntrinsicElements;
      return <Tag id={id} className="scroll-mt-24">{children}</Tag>;
    };

  if (!post) {
    return (
      <div className="py-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="text-center">
          <h2 className={`text-2xl font-bold mb-4 ${isMatrix ? 'text-white' : 'text-slate-900'}`}>Blog post not found</h2>
          <Link
            to="/blog"
            className={`inline-flex items-center gap-2 ${isMatrix ? 'text-green-500 hover:text-green-400' : 'text-blue-600 hover:text-blue-500'}`}
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  const progressColor = isMatrix ? '#22c55e' : '#2563eb';

  return (
    <div className="py-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Reading progress bar fixed at top */}
      <div
        className="fixed top-0 left-0 right-0 z-50 pointer-events-none"
        aria-hidden="true"
      >
        <div
          className="h-[3px] origin-left transition-[transform] duration-100"
          style={{ transform: `scaleX(${progress})`, background: progressColor }}
        />
      </div>

      <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_14rem] lg:gap-10">
        {/* Article */}
        <div className="max-w-3xl mx-auto lg:mx-0 w-full">
          <button
            onClick={() => navigate('/blog')}
            className={`flex items-center gap-2 mb-6 transition-colors ${isMatrix ? 'text-green-500 hover:text-green-400' : 'text-blue-600 hover:text-blue-500'}`}
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </button>

          <article ref={articleRef}>
            <header className="mb-10">
              <div className={`flex items-center gap-4 text-sm mb-4 ${isMatrix ? 'text-slate-400' : 'text-slate-500'}`}>
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {post.date}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {post.readTime}
                </span>
              </div>

              <h1 className={`text-4xl md:text-5xl font-extrabold leading-tight tracking-tight mb-5 ${isMatrix ? 'text-white' : 'text-slate-900'}`}>
                {post.title}
              </h1>

              {post.excerpt && (
                <p className={`text-lg leading-relaxed ${isMatrix ? 'text-slate-300' : 'text-slate-600'}`}>
                  {post.excerpt}
                </p>
              )}

              <div className="flex flex-wrap gap-2 mt-5">
                {post.tags.map(tag => (
                  <span
                    key={tag}
                    className={`text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full ${isMatrix ? 'bg-green-900/20 text-green-400 border border-green-800/50' : 'bg-blue-50 text-blue-600 border border-blue-200'}`}
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </header>

            <div className={`prose prose-lg max-w-none ${isMatrix ? 'prose-invert prose-slate' : 'prose-slate'}`}>
              <ReactMarkdown
                remarkPlugins={[remarkGfm, remarkMath]}
                rehypePlugins={[rehypeKatex]}
                components={{
                  h2: headingRenderer(2),
                  h3: headingRenderer(3),
                }}
              >
                {bodyMd}
              </ReactMarkdown>
            </div>
          </article>
        </div>

        {/* TOC sidebar (desktop only) */}
        {headings.length > 2 && (
          <aside className="hidden lg:block">
            <div className="sticky top-24">
              <div className={`flex items-center gap-2 text-xs font-semibold uppercase tracking-wider mb-3 ${isMatrix ? 'text-slate-500' : 'text-slate-400'}`}>
                <List className="w-4 h-4" />
                On this page
              </div>
              <nav className={`border-l pl-4 space-y-2 text-sm ${isMatrix ? 'border-slate-800' : 'border-slate-200'}`}>
                {headings.map(h => {
                  const isActive = activeId === h.id;
                  return (
                    <a
                      key={h.id}
                      href={`#${h.id}`}
                      onClick={(e) => {
                        e.preventDefault();
                        const el = document.getElementById(h.id);
                        if (el) {
                          const y = el.getBoundingClientRect().top + window.scrollY - 96;
                          window.scrollTo({ top: y, behavior: 'smooth' });
                        }
                      }}
                      className={`block leading-snug transition-colors ${h.level === 3 ? 'pl-3' : ''} ${
                        isActive
                          ? isMatrix
                            ? 'text-green-400 font-medium'
                            : 'text-blue-600 font-medium'
                          : isMatrix
                            ? 'text-slate-400 hover:text-slate-200'
                            : 'text-slate-500 hover:text-slate-800'
                      }`}
                    >
                      {h.text}
                    </a>
                  );
                })}
              </nav>
            </div>
          </aside>
        )}
      </div>

      {/* Back-to-top floating button */}
      {showTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Back to top"
          className={`fixed bottom-6 right-6 z-40 p-3 rounded-full shadow-lg transition-all ${isMatrix ? 'bg-green-700 hover:bg-green-600 text-black' : 'bg-blue-600 hover:bg-blue-700 text-white'}`}
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}
    </div>
  );
};

export default BlogPost;
