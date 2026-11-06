import { PROFILE, BLOG_POSTS } from './content';

const SITE = 'https://yehias21.github.io';
const NAME = PROFILE.name;
const DEFAULT_DESC =
  'Machine Learning Engineer at 9YardsX and MBZUAI M.Sc. graduate working on time-series foundation models, multimodal learning, and dynamical systems.';

export interface PageMeta { path: string; title: string; description: string; url: string; lastmod?: string; }

const toIsoDate = (human: string): string | undefined => {
  const d = new Date(human);
  return isNaN(d.getTime()) ? undefined : d.toISOString().slice(0, 10);
};

export const pages = (): PageMeta[] => {
  const base: [string, string, string][] = [
    ['/home', `${NAME} | ML Researcher`, DEFAULT_DESC],
    ['/about', `About | ${NAME}`, 'Education, experience, awards, and academic service of Yahia Salaheldin Shaaban.'],
    ['/publications', `Publications | ${NAME}`, 'Papers on time-series foundation models, dynamical systems, routing benchmarks, and watermarking.'],
    ['/projects', `Projects | ${NAME}`, 'Research and engineering projects: HyperKKL, IndusTSLM, SVRPBench, watermark analysis, and more.'],
    ['/blog', `Blog | ${NAME}`, 'Long form notes on research, ML fundamentals, and industrial datasets.'],
    ['/travel', `Travel | ${NAME}`, 'Places I have visited for conferences, summer schools, and life.'],
    ['/gallery', `Gallery | ${NAME}`, 'Photos with researchers and academics I have met.'],
    ['/contact', `Contact | ${NAME}`, 'Book a call or write to Yahia Salaheldin Shaaban.'],
  ];
  const list: PageMeta[] = base.map(([path, title, description]) => ({ path, title, description, url: `${SITE}${path}/` }));
  for (const post of BLOG_POSTS) {
    list.push({
      path: `/blog/${post.id}`,
      title: `${post.title} | ${NAME}`,
      description: post.excerpt,
      url: `${SITE}/blog/${post.id}/`,
      lastmod: toIsoDate(post.updated ?? post.date),
    });
  }
  return list;
};

// Title for a path, used to keep document.title right during client navigation.
export const titleFor = (pathname: string): string | undefined => {
  const clean = pathname.replace(/\/+$/, '') || '/home';
  return pages().find(p => p.path === clean)?.title;
};
