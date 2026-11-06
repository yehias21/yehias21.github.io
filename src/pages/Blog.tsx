import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ThemeMode } from '../types';
import { BLOG_POSTS, IDEAS } from '../data/content';
import IdeaGarden from '../components/IdeaGarden';
import '../styles/markdown.css';

interface BlogProps {
  theme: ThemeMode;
}

type Tab = 'posts' | 'ideas' | 'business';

const Blog: React.FC<BlogProps> = ({ theme }) => {
  const isMatrix = theme === ThemeMode.MATRIX;
  const [tab, setTab] = useState<Tab>('posts');

  const researchCount = IDEAS.filter(i => i.category === 'research').length;
  const businessCount = IDEAS.filter(i => i.category === 'business').length;

  const tabs: { key: Tab; label: string; count: number }[] = [
    { key: 'posts',    label: 'Posts',    count: BLOG_POSTS.length },
    { key: 'ideas',    label: 'Ideas',    count: researchCount },
    { key: 'business', label: 'Business', count: businessCount },
  ];

  const subtitle =
    tab === 'posts'
      ? 'collects long form notes on research, ML fundamentals, and the messy industrial datasets I care about.'
      : tab === 'ideas'
        ? 'also keeps an idea garden: dated, half formed research directions I want to explore.'
        : 'also records business and product concepts, each dated, authored, and protected.';

  const [featured, ...rest] = BLOG_POSTS;

  const Hero: React.FC<{ post: typeof BLOG_POSTS[number]; className?: string }> = ({ post, className = '' }) => (
    <div className={`blog-hero ${className}`} style={{ background: post.coverTint ?? 'var(--blog-panel)' }}>
      {post.cover
        ? <img src={post.cover} alt="" loading="lazy" />
        : <span className="blog-title text-2xl px-8 text-center">{post.title}</span>}
    </div>
  );

  return (
    <div className={`blog-article pt-14 pb-12 ${isMatrix ? 'theme-dark' : ''}`}>
      {/* Intro statement: bold sans lead-in running into a serif sentence. */}
      <header className="max-w-4xl">
        <p className="text-[1.75rem] sm:text-[2.25rem] leading-[1.25] blog-muted">
          <span className="blog-title blog-ink">The Blog</span>{' '}
          <span className="blog-serif">{subtitle}</span>
        </p>
      </header>

      {/* Tabs: Posts · Ideas · Business */}
      <div className="flex gap-6 mt-14 border-b blog-rule">
        {tabs.map(t => {
          const active = tab === t.key;
          return (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              aria-pressed={active}
              className={`-mb-px pb-3 text-sm border-b-2 transition-colors ${
                active ? 'blog-ink font-semibold border-current' : 'blog-faint border-transparent hover:text-[var(--blog-ink)]'
              }`}
            >
              {t.label}
              <span className="blog-mono blog-faint text-xs ml-1.5">{t.count}</span>
            </button>
          );
        })}
      </div>

      {tab === 'posts' ? (
        BLOG_POSTS.length === 0 ? (
          <p className="blog-muted mt-10">No posts yet.</p>
        ) : (
          <div className="mt-10">
            {/* Featured: the newest post, large. */}
            <Link to={`/blog/${featured.id}`} className="blog-card group grid md:grid-cols-2 gap-6 md:gap-10 items-center">
              <Hero post={featured} />
              <div>
                <p className="blog-meta text-sm">{featured.date} · {featured.readTime}</p>
                <h2 className="blog-title blog-card-title text-[1.75rem] sm:text-[2.1rem] mt-3">{featured.title}</h2>
                <p className="blog-serif blog-muted text-[1.1rem] leading-relaxed mt-4">{featured.excerpt}</p>
              </div>
            </Link>

            {rest.length > 0 && (
              <>
                <h3 className="text-sm font-semibold blog-ink mt-20 mb-6 pb-3 border-b blog-rule">More posts</h3>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
                  {rest.map(post => (
                    <Link key={post.id} to={`/blog/${post.id}`} className="blog-card group block">
                      <Hero post={post} />
                      <p className="blog-meta text-sm mt-4">{post.date} · {post.readTime}</p>
                      <h2 className="blog-title blog-card-title text-xl mt-2">{post.title}</h2>
                      <p className="blog-serif blog-muted leading-relaxed mt-2 line-clamp-3">{post.excerpt}</p>
                    </Link>
                  ))}
                </div>
              </>
            )}
          </div>
        )
      ) : (
        <div className="mt-10">
          <IdeaGarden theme={theme} category={tab === 'ideas' ? 'research' : 'business'} />
        </div>
      )}
    </div>
  );
};

export default Blog;
