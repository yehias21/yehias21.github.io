import React from 'react';
import { Link } from 'react-router-dom';
import { ThemeMode } from '../types';
import { BLOG_POSTS } from '../data/content';

interface BlogProps {
  theme: ThemeMode;
}

const Blog: React.FC<BlogProps> = ({ theme }) => {
  const isMatrix = theme === ThemeMode.MATRIX;

  return (
    <div className={`blog-article py-12 animate-in fade-in slide-in-from-bottom-4 duration-500 ${isMatrix ? 'theme-dark' : ''}`}>
      <header className={`mb-10 pb-8 border-b ${isMatrix ? 'border-slate-800' : 'border-[#e3e3e3]'}`}>
        <h1 className={`text-[2rem] md:text-[2.4rem] font-bold leading-tight mb-2 ${isMatrix ? 'text-slate-100' : 'text-[#2b2b2b]'}`}>
          Blog
        </h1>
        <p className={`blog-meta text-base ${isMatrix ? 'text-slate-400' : 'text-[#808080]'}`}>
          Notes on research, ML fundamentals, and the messy industrial datasets I care about.
        </p>
      </header>

      {/* Clean Blog "post-preview" list — title, subtitle, italic dateline,
          divided by a quiet rule. No cards. */}
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
    </div>
  );
};

export default Blog;
