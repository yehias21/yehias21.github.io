import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ArrowLeft, Download } from 'lucide-react';
import { ThemeMode } from '../types';
import { CV_PDF } from '../data/content';
import storyMd from '../data/research-story.md?raw';
import '../styles/markdown.css';

interface ResearchStoryProps {
  theme: ThemeMode;
}

interface Chapter {
  id: string;
  year: string;
  title: string;
  body: string;
}

// The story lives in src/data/research-story.md (shared with the README).
// Each "### YEAR. Title" heading becomes one chapter on a timeline; text
// before the first chapter is the intro, and everything from the first
// "## " heading onward is rendered as a closing section.
function parseStory(md: string) {
  const tailAt = md.search(/^## /m);
  const main = tailAt === -1 ? md : md.slice(0, tailAt);
  const tail = tailAt === -1 ? '' : md.slice(tailAt);

  const parts = main.split(/^### /m);
  const intro = parts[0].trim();
  const chapters: Chapter[] = parts.slice(1).map((chunk, i) => {
    const nl = chunk.indexOf('\n');
    const heading = (nl === -1 ? chunk : chunk.slice(0, nl)).trim();
    const body = nl === -1 ? '' : chunk.slice(nl + 1).trim();
    const m = heading.match(/^([\d–-]+)\.\s*(.*)$/);
    return {
      id: `chapter-${i + 1}`,
      year: m ? m[1] : '',
      title: m ? m[2] : heading,
      body,
    };
  });
  return { intro, chapters, tail };
}

const ResearchStory: React.FC<ResearchStoryProps> = ({ theme }) => {
  const isDark = theme === ThemeMode.MATRIX;
  const { intro, chapters, tail } = useMemo(() => parseStory(storyMd), []);
  const [active, setActive] = useState(chapters[0]?.id);

  useEffect(() => {
    const els = chapters
      .map(c => document.getElementById(c.id))
      .filter((el): el is HTMLElement => !!el);
    const obs = new IntersectionObserver(
      entries => {
        const visible = entries.filter(e => e.isIntersecting);
        if (visible.length) setActive(visible[0].target.id);
      },
      { rootMargin: '-20% 0px -70% 0px' }
    );
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, [chapters]);

  const proseClass = `prose ${isDark ? 'prose-invert' : ''}`;

  return (
    <div className={`blog-article blog-sheet blog-page mt-6 mb-12 ${isDark ? 'theme-dark' : ''}`}>
      <article className="pt-6">
        <header className="text-center">
          <div className="flex items-center justify-between">
            <Link to="/home" className="blog-meta inline-flex items-center gap-1.5 hover:underline underline-offset-4">
              <ArrowLeft className="w-3.5 h-3.5" /> Home
            </Link>
            <span className="blog-meta">The artist's notebook</span>
          </div>
          <h1 className="blog-title text-[1.85rem] sm:text-[2.05rem] max-w-[46rem] mx-auto mt-5">My research story</h1>
          {intro && <p className="blog-serif blog-muted text-[1.05rem] max-w-[34rem] mx-auto mt-4">{intro}</p>}
        </header>

        <div className="blog-grid mt-10 xl:mt-14">
          <aside className="hidden xl:block">
            <nav className="sticky top-24" aria-label="Years">
              <ul>
                {chapters.map(c => (
                  <li key={c.id} className="border-t blog-rule">
                    <a
                      href={`#${c.id}`}
                      className={`flex gap-3 py-2.5 text-[0.8125rem] leading-snug transition-colors ${active === c.id ? 'blog-ink font-medium' : 'blog-muted hover:text-[var(--blog-ink)]'}`}
                    >
                      <span className="blog-mono blog-faint w-16 shrink-0 text-[0.75rem] pt-px">{c.year}</span>
                      <span>{c.title}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>

          <div className="min-w-0">
            <ol className="story-timeline">
              {chapters.map(c => (
                <li key={c.id} id={c.id} className="story-chapter scroll-mt-28">
                  <span className="story-dot" aria-hidden="true" />
                  <p className="story-year">{c.year}</p>
                  <h2 className="story-title">{c.title}</h2>
                  <div className={proseClass}>
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>{c.body}</ReactMarkdown>
                  </div>
                </li>
              ))}
            </ol>

            {tail && (
              <section className={`${proseClass} story-tail border-t blog-rule mt-6 pt-2`}>
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{tail}</ReactMarkdown>
              </section>
            )}

            <div className="flex flex-wrap gap-3 mt-10 pt-6 border-t blog-rule">
              <Link to="/home" className="g-btn">
                <ArrowLeft className="w-4 h-4" /> Back home
              </Link>
              <a href={CV_PDF} target="_blank" rel="noreferrer" className="g-btn g-btn-solid">
                <Download className="w-4 h-4" /> Download CV (PDF)
              </a>
            </div>
          </div>

          <aside className="hidden xl:block" />
        </div>
      </article>
    </div>
  );
};

export default ResearchStory;
