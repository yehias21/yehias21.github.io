import React from 'react';
import { Link } from 'react-router-dom';
import { ThemeMode } from '../types';
import { BLOG_POSTS } from '../data/content';
import { FileText, ArrowRight, Calendar, Clock } from 'lucide-react';

interface BlogProps {
  theme: ThemeMode;
}

const Blog: React.FC<BlogProps> = ({ theme }) => {
  const isMatrix = theme === ThemeMode.MATRIX;

  return (
    <div className="py-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header className="mb-10">
        <h2 className={`text-3xl font-bold mb-3 flex items-center gap-3 ${isMatrix ? 'text-slate-100' : 'text-slate-900'}`}>
          <FileText className={`w-8 h-8 ${isMatrix ? 'text-green-500' : 'text-blue-600'}`} />
          Blog
        </h2>
        <p className={`text-base ${isMatrix ? 'text-slate-400' : 'text-slate-600'}`}>
          Notes on research, ML fundamentals, and the messy industrial datasets I care about.
        </p>
      </header>

      <div className="grid gap-6">
        {BLOG_POSTS.map((post, idx) => {
          const isFeature = idx === 0;
          return (
            <Link
              key={post.id}
              to={`/blog/${post.id}`}
              className={`group relative rounded-2xl border overflow-hidden transition-all ${
                isMatrix
                  ? 'bg-slate-900/50 border-slate-800 hover:border-green-700 hover:shadow-[0_4px_30px_rgba(34,197,94,0.08)]'
                  : 'bg-white border-slate-200 hover:border-blue-300 hover:shadow-lg'
              }`}
            >
              <article className={`p-6 md:p-8 ${isFeature ? 'md:flex md:gap-8 md:items-start' : ''}`}>
                <div className={`${isFeature ? 'md:flex-1' : ''}`}>
                  <div className={`flex items-center gap-4 text-xs mb-3 ${isMatrix ? 'text-slate-500' : 'text-slate-400'}`}>
                    <span className="flex items-center gap-1.5 font-mono">
                      <Calendar className="w-3.5 h-3.5" />
                      {post.date}
                    </span>
                    <span className="flex items-center gap-1.5 font-mono">
                      <Clock className="w-3.5 h-3.5" />
                      {post.readTime}
                    </span>
                    {isFeature && (
                      <span className={`ml-auto text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full ${isMatrix ? 'bg-green-900/30 text-green-400 border border-green-800' : 'bg-blue-50 text-blue-600 border border-blue-200'}`}>
                        Latest
                      </span>
                    )}
                  </div>

                  <h3 className={`${isFeature ? 'text-2xl md:text-3xl' : 'text-xl'} font-bold mb-3 leading-tight transition-colors ${
                    isMatrix ? 'text-slate-100 group-hover:text-green-400' : 'text-slate-900 group-hover:text-blue-600'
                  }`}>
                    {post.title}
                  </h3>

                  <p className={`leading-relaxed mb-4 ${isMatrix ? 'text-slate-400' : 'text-slate-600'}`}>
                    {post.excerpt}
                  </p>

                  <div className="flex items-center justify-between flex-wrap gap-3">
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map(tag => (
                        <span
                          key={tag}
                          className={`text-xs px-2.5 py-0.5 rounded-full border ${
                            isMatrix ? 'bg-green-900/20 text-green-400 border-green-800/50' : 'bg-blue-50 text-blue-600 border-blue-200'
                          }`}
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                    <span className={`flex items-center gap-1 text-sm font-medium ${isMatrix ? 'text-green-500' : 'text-blue-600'}`}>
                      Read more <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </div>
              </article>
              {/* Accent bar */}
              <div
                className={`absolute inset-y-0 left-0 w-1 opacity-0 group-hover:opacity-100 transition-opacity ${
                  isMatrix ? 'bg-green-500' : 'bg-blue-500'
                }`}
              />
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Blog;
