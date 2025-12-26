import React from 'react';
import { Link } from 'react-router-dom';
import { ThemeMode } from '../types';
import { BLOG_POSTS } from '../data/content';
import { FileText, ArrowRight } from 'lucide-react';

interface BlogProps {
  theme: ThemeMode;
}

const Blog: React.FC<BlogProps> = ({ theme }) => {
  const isMatrix = theme === ThemeMode.MATRIX;

  return (
    <div className="py-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h2 className={`text-3xl font-bold mb-8 flex items-center gap-3 ${isMatrix ? 'text-white' : 'text-slate-900'}`}>
        <FileText className={`w-8 h-8 ${isMatrix ? 'text-green-500' : 'text-blue-600'}`} />
        Blog
      </h2>
      <div className="grid gap-8">
        {BLOG_POSTS.map((post) => (
          <article key={post.id} className={`flex flex-col md:flex-row gap-6 md:gap-12 items-start group p-6 rounded-xl border transition-all ${isMatrix ? 'bg-slate-900/50 border-slate-800 hover:border-green-800' : 'bg-white border-slate-200 hover:border-blue-300 hover:shadow-md'}`}>
            <div className="md:w-32 shrink-0 pt-1">
              <span className={`text-sm font-mono block ${isMatrix ? 'text-slate-500' : 'text-slate-400'}`}>{post.date}</span>
              <span className={`text-xs block ${isMatrix ? 'text-slate-600' : 'text-slate-400'}`}>{post.readTime}</span>
            </div>
            <div className="flex-1">
              <h3 className={`text-xl font-bold mb-2 transition-colors ${isMatrix ? 'text-slate-100 group-hover:text-green-400' : 'text-slate-900 group-hover:text-blue-600'}`}>
                {post.title}
              </h3>
              <p className={`leading-relaxed mb-3 ${isMatrix ? 'text-slate-400' : 'text-slate-600'}`}>
                {post.excerpt}
              </p>
              <div className="flex items-center justify-between">
                <div className="flex gap-2">
                  {post.tags.map(tag => (
                    <span key={tag} className={`text-xs font-semibold uppercase tracking-wider ${isMatrix ? 'text-green-600' : 'text-blue-600'}`}>#{tag}</span>
                  ))}
                </div>
                <Link
                  to={`/blog/${post.id}`}
                  className={`flex items-center gap-1 text-sm font-medium transition-colors ${isMatrix ? 'text-green-500 hover:text-green-400' : 'text-blue-600 hover:text-blue-500'}`}
                >
                  Read more <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default Blog;
