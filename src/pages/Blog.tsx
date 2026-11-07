import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ThemeMode } from '../types';
import { BLOG_POSTS, IDEAS } from '../data/content';
import IdeaGarden from '../components/IdeaGarden';
import '../styles/markdown.css';
import { Room } from '../components/GalleryUI';
import { useBlogLang, localize, LangSwitch, UI } from '../components/BlogLang';

interface BlogProps {
  theme: ThemeMode;
}

type Tab = 'posts' | 'ideas' | 'business';

const Blog: React.FC<BlogProps> = ({ theme }) => {
  const isMatrix = theme === ThemeMode.MATRIX;
  const [tab, setTab] = useState<Tab>('posts');
  const [lang, setLang] = useBlogLang();
  const t = UI[lang];
  const posts = BLOG_POSTS.map(p => localize(p, lang));
  const postLink = (id: string) => `/blog/${id}${lang === 'fr' ? '?lang=fr' : ''}`;

  const researchCount = IDEAS.filter(i => i.category === 'research').length;
  const businessCount = IDEAS.filter(i => i.category === 'business').length;

  const tabs: { key: Tab; label: string; count: number }[] = [
    { key: 'posts',    label: t.posts,    count: BLOG_POSTS.length },
    { key: 'ideas',    label: t.ideas,    count: researchCount },
    { key: 'business', label: t.business, count: businessCount },
  ];

  const subtitle =
    tab === 'posts'
      ? t.postsSub
      : tab === 'ideas'
        ? 'An idea garden: dated, half formed research directions I want to explore.'
        : 'Business and product concepts, each dated, authored, and protected.';

  const [featured, ...rest] = posts;

  const Hero: React.FC<{ post: typeof posts[number]; className?: string }> = ({ post, className = '' }) => (
    <div className={`blog-hero ${className}`} style={{ background: post.coverTint ?? 'var(--blog-panel)' }}>
      {post.cover
        ? <img src={post.cover} alt="" loading="lazy" />
        : <span className="blog-title text-2xl px-8 text-center">{post.title}</span>}
    </div>
  );

  return (
    <div className={`blog-article blog-sheet mt-10 ${isMatrix ? 'theme-dark' : ''}`}>
      <Room as="h1" label={lang === 'fr' && tab === 'posts' ? 'La salle de lecture' : 'The reading room'} title="Blog" sub={subtitle} />

      {/* Tabs: Posts · Ideas · Business */}
      <div className="flex items-end gap-6 mt-2 border-b blog-rule">
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
        {tab === 'posts' && <LangSwitch lang={lang} onChange={setLang} className="ml-auto mb-2" />}
      </div>

      {tab === 'posts' ? (
        BLOG_POSTS.length === 0 ? (
          <p className="blog-muted mt-10">{t.noPosts}</p>
        ) : (
          <div className="mt-6">
            <p className="blog-serif blog-muted italic text-[0.95rem] mb-10">{t.authorship}</p>
            {/* Featured: the newest post, large. */}
            <Link to={postLink(featured.id)} lang={featured.lang} className="blog-card group grid md:grid-cols-2 gap-6 md:gap-10 items-center">
              <Hero post={featured} />
              <div>
                <p className="blog-meta text-sm">{featured.date} · {featured.readTime}</p>
                <h2 className="blog-title blog-card-title text-[2.1rem] sm:text-[2.6rem] mt-3">{featured.title}</h2>
                <p className="blog-serif blog-muted text-[1.1rem] leading-relaxed mt-4">{featured.excerpt}</p>
              </div>
            </Link>

            {rest.length > 0 && (
              <>
                <h3 className="blog-meta mt-20 mb-6 pb-3 border-b blog-rule">{t.morePosts}</h3>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
                  {rest.map(post => (
                    <Link key={post.id} to={postLink(post.id)} lang={post.lang} className="blog-card group block">
                      <Hero post={post} />
                      <p className="blog-meta text-sm mt-4">{post.date} · {post.readTime}</p>
                      <h2 className="blog-title blog-card-title text-[1.6rem] mt-2">{post.title}</h2>
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
