import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FileText, FlaskConical, Briefcase } from 'lucide-react';
import { ThemeMode } from '../types';
import { BLOG_POSTS, IDEAS } from '../data/content';
import IdeaGarden from '../components/IdeaGarden';

interface BlogProps {
  theme: ThemeMode;
}

type Tab = 'posts' | 'ideas' | 'business';

const Blog: React.FC<BlogProps> = ({ theme }) => {
  const isMatrix = theme === ThemeMode.MATRIX;
  const [tab, setTab] = useState<Tab>('posts');

  const researchCount = IDEAS.filter(i => i.category === 'research').length;
  const businessCount = IDEAS.filter(i => i.category === 'business').length;

  const tabs: { key: Tab; label: string; icon: React.ReactNode; count: number }[] = [
    { key: 'posts',    label: 'Posts',    icon: <FileText className="w-4 h-4" />,     count: BLOG_POSTS.length },
    { key: 'ideas',    label: 'Ideas',    icon: <FlaskConical className="w-4 h-4" />, count: researchCount },
    { key: 'business', label: 'Business', icon: <Briefcase className="w-4 h-4" />,    count: businessCount },
  ];

  const subtitle =
    tab === 'posts'
      ? 'Notes on research, ML fundamentals, and the messy industrial datasets I care about.'
      : tab === 'ideas'
        ? 'An idea garden — dated, half-formed research directions I want to explore.'
        : 'Business and product concepts — dated, authored, and protected.';

  return (
    <div className={`blog-article py-12 animate-in fade-in slide-in-from-bottom-4 duration-500 ${isMatrix ? 'theme-dark' : ''}`}>
      <header className={`mb-6 pb-8 border-b ${isMatrix ? 'border-slate-800' : 'border-[#e3e3e3]'}`}>
        <h1 className={`text-[2rem] md:text-[2.4rem] font-bold leading-tight mb-2 ${isMatrix ? 'text-slate-100' : 'text-[#2b2b2b]'}`}>
          Blog
        </h1>
        <p className={`blog-meta text-base ${isMatrix ? 'text-slate-400' : 'text-[#808080]'}`}>
          {subtitle}
        </p>
      </header>

      {/* Tabs: Posts · Ideas · Business */}
      <div className="flex flex-wrap gap-2 mb-8">
        {tabs.map(t => {
          const active = tab === t.key;
          return (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              aria-pressed={active}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
                active
                  ? isMatrix
                    ? 'bg-accent-900/30 text-accent-300 border-accent-700/50'
                    : 'bg-[#0085a1] text-white border-[#0085a1]'
                  : isMatrix
                    ? 'bg-slate-900/40 text-slate-400 border-slate-700 hover:text-slate-200'
                    : 'bg-white/60 text-slate-600 border-slate-200 hover:text-[#0085a1]'
              }`}
            >
              {t.icon}
              {t.label}
              <span className={`text-xs ${active && !isMatrix ? 'text-white/80' : isMatrix ? 'text-slate-500' : 'text-[#808080]'}`}>
                {t.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Panel */}
      {tab === 'posts' ? (
        <div className="max-w-3xl">
          {BLOG_POSTS.map((post, idx) => (
            <article
              key={post.id}
              className={idx > 0 ? `pt-8 mt-8 border-t ${isMatrix ? 'border-slate-800' : 'border-[#ededed]'}` : ''}
            >
              <Link to={`/blog/${post.id}`} className="group block">
                <h2
                  className={`text-[1.5rem] md:text-[1.7rem] font-semibold leading-snug mb-2 transition-colors ${
                    isMatrix
                      ? 'text-slate-100 group-hover:text-[#34b6d1]'
                      : 'text-[#2b2b2b] group-hover:text-[#0085a1]'
                  }`}
                >
                  {post.title}
                </h2>
                <p className={`font-light leading-relaxed mb-3 ${isMatrix ? 'text-slate-400' : 'text-[#5a5a5a]'}`}>
                  {post.excerpt}
                </p>
              </Link>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
                <span className={`blog-meta text-sm ${isMatrix ? 'text-slate-500' : 'text-[#808080]'}`}>
                  {post.date} · {post.readTime}
                </span>
                {post.tags.length > 0 && (
                  <span className={`text-xs font-semibold uppercase tracking-wider ${isMatrix ? 'text-slate-600' : 'text-[#999999]'}`}>
                    {post.tags.map(t => `#${t}`).join('  ')}
                  </span>
                )}
              </div>
            </article>
          ))}
        </div>
      ) : (
        <IdeaGarden theme={theme} category={tab === 'ideas' ? 'research' : 'business'} />
      )}
    </div>
  );
};

export default Blog;
