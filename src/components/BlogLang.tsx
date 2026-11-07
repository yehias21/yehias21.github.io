// English / French switch for the blog.
//
// The language comes from ?lang=fr in the URL (shareable links) and falls back
// to the reader's last choice, kept in localStorage. Posts without a French
// version simply stay in English.
import React, { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { BlogPost } from '../types';

export type BlogLang = 'en' | 'fr';

const KEY = 'blogLang';
const EVENT = 'bloglangchange';

const readStored = (): BlogLang | null => {
  try {
    const v = localStorage.getItem(KEY);
    return v === 'fr' || v === 'en' ? v : null;
  } catch {
    return null;
  }
};

export const useBlogLang = (): [BlogLang, (l: BlogLang) => void] => {
  const [params, setParams] = useSearchParams();
  const fromUrl = params.get('lang');
  const urlLang: BlogLang | null = fromUrl === 'fr' || fromUrl === 'en' ? fromUrl : null;
  const [stored, setStored] = useState<BlogLang | null>(() =>
    typeof window === 'undefined' ? null : readStored(),
  );

  useEffect(() => {
    const sync = () => setStored(readStored());
    window.addEventListener(EVENT, sync);
    window.addEventListener('storage', sync);
    return () => {
      window.removeEventListener(EVENT, sync);
      window.removeEventListener('storage', sync);
    };
  }, []);

  const lang: BlogLang = urlLang ?? stored ?? 'en';

  const setLang = useCallback(
    (l: BlogLang) => {
      try { localStorage.setItem(KEY, l); } catch { /* private mode: URL still carries it */ }
      setStored(l);
      window.dispatchEvent(new Event(EVENT));
      const next = new URLSearchParams(params);
      if (l === 'fr') next.set('lang', 'fr');
      else next.delete('lang');
      setParams(next, { replace: true, preventScrollReset: true });
    },
    [params, setParams],
  );

  return [lang, setLang];
};

// Interface strings used around the posts.
export const UI = {
  en: {
    published: 'Published', updated: 'Updated', readingTime: 'Reading time', topics: 'Topics',
    cite: 'Cite this post', blog: 'Blog', backToTop: 'Back to top', sections: 'Sections',
    morePosts: 'More posts', posts: 'Posts', ideas: 'Ideas', business: 'Business',
    noPosts: 'No posts yet.', notFound: 'Blog post not found', backToBlog: 'Back to Blog',
    postsSub: 'Research topics and some scattered midnight ideas.', language: 'Language',
    noTranslation: '',
    thoughts: 'Thoughts', thought: 'Thought', opinion: 'Opinion',
    thoughtsSub: 'Scattered thoughts and opinions, jotted down as they come.',
    noThoughts: 'Nothing jotted down yet.',
    creditLead: 'Design inspired by', creditBlog: 'the Anthropic blog',
  },
  fr: {
    published: 'Publié', updated: 'Mis à jour', readingTime: 'Temps de lecture', topics: 'Sujets',
    cite: 'Citer cet article', blog: 'Blog', backToTop: 'Haut de page', sections: 'Sections',
    morePosts: 'Autres articles', posts: 'Articles', ideas: 'Idées', business: 'Business',
    noPosts: 'Pas encore d’articles.', notFound: 'Article introuvable', backToBlog: 'Retour au blog',
    postsSub: 'Des sujets de recherche et quelques idées nées tard dans la nuit.', language: 'Langue',
    thoughts: 'Pensées', thought: 'Pensée', opinion: 'Opinion',
    thoughtsSub: 'Pensées éparses et opinions, notées au fil de l’eau.',
    noThoughts: 'Rien de noté pour l’instant.',
    creditLead: 'Design inspiré par', creditBlog: 'le blog d’Anthropic',
    noTranslation: 'La version française de cet article arrive bientôt. En attendant, voici la version anglaise.',
  },
} as const;

// "Jun 3, 2026" -> "3 juin 2026"
const MONTHS: Record<string, string> = {
  jan: 'janvier', feb: 'février', mar: 'mars', apr: 'avril', may: 'mai', jun: 'juin',
  jul: 'juillet', aug: 'août', sep: 'septembre', oct: 'octobre', nov: 'novembre', dec: 'décembre',
};
export const formatDate = (date: string, lang: BlogLang): string => {
  if (lang === 'en') return date;
  const m = /^([A-Za-z]{3})[a-z]*\.?\s+(\d{1,2}),\s*(\d{4})$/.exec(date.trim());
  if (!m) return date;
  const month = MONTHS[m[1].toLowerCase()];
  return month ? `${m[2] === '1' ? '1er' : m[2]} ${month} ${m[3]}` : date;
};

// "16 min read" -> "16 min de lecture", "In progress" -> "En cours"
export const formatReadTime = (rt: string, lang: BlogLang): string => {
  if (lang === 'en') return rt;
  const m = /(\d+)\s*min/.exec(rt);
  if (m) return `${m[1]} min de lecture`;
  if (/in progress/i.test(rt)) return 'En cours';
  return rt;
};

// The post as it should be shown in the chosen language.
export const localize = (post: BlogPost, lang: BlogLang) => {
  const fr = lang === 'fr' ? post.fr : undefined;
  return {
    ...post,
    title: fr?.title ?? post.title,
    excerpt: fr?.excerpt ?? post.excerpt,
    content: fr?.content ?? post.content,
    tags: fr?.tags ?? post.tags,
    date: formatDate(post.date, fr ? 'fr' : 'en'),
    updated: post.updated ? formatDate(post.updated, fr ? 'fr' : 'en') : undefined,
    readTime: formatReadTime(post.readTime, fr ? 'fr' : 'en'),
    lang: (fr ? 'fr' : 'en') as BlogLang,
  };
};

export const LangSwitch: React.FC<{ lang: BlogLang; onChange: (l: BlogLang) => void; className?: string }> = ({
  lang, onChange, className = '',
}) => (
  <div role="group" aria-label={UI[lang].language} className={`blog-langswitch ${className}`}>
    {(['en', 'fr'] as BlogLang[]).map(l => (
      <button
        key={l}
        type="button"
        lang={l}
        aria-pressed={lang === l}
        onClick={() => onChange(l)}
        title={l === 'en' ? 'Read in English' : 'Lire en français'}
      >
        {l.toUpperCase()}
      </button>
    ))}
  </div>
);
