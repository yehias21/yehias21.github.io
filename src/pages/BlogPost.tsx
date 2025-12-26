import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ThemeMode } from '../types';
import { BLOG_POSTS } from '../data/content';
import { FileText, ArrowLeft, Calendar, Clock } from 'lucide-react';

interface BlogPostProps {
  theme: ThemeMode;
}

const BlogPost: React.FC<BlogPostProps> = ({ theme }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isMatrix = theme === ThemeMode.MATRIX;

  const post = BLOG_POSTS.find(p => p.id === id);

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

  return (
    <div className="py-12 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-3xl mx-auto">
      <button
        onClick={() => navigate('/blog')}
        className={`flex items-center gap-2 mb-8 transition-colors ${isMatrix ? 'text-green-500 hover:text-green-400' : 'text-blue-600 hover:text-blue-500'}`}
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Blog
      </button>

      <article>
        <div className="mb-8">
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

          <h1 className={`text-4xl font-bold mb-4 ${isMatrix ? 'text-white' : 'text-slate-900'}`}>
            {post.title}
          </h1>

          <div className="flex gap-2 mb-6">
            {post.tags.map(tag => (
              <span
                key={tag}
                className={`text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full ${isMatrix ? 'bg-green-900/20 text-green-400 border border-green-800/50' : 'bg-blue-50 text-blue-600 border border-blue-200'}`}
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        <div className={`prose prose-lg max-w-none ${isMatrix ? 'prose-invert' : ''}`}>
          <p className={`text-lg leading-relaxed mb-6 ${isMatrix ? 'text-slate-300' : 'text-slate-700'}`}>
            {post.excerpt}
          </p>

          <div className={`p-6 rounded-lg border ${isMatrix ? 'bg-slate-900/50 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
            <p className={`italic ${isMatrix ? 'text-slate-400' : 'text-slate-600'}`}>
              Full blog content coming soon. This post is currently under development.
            </p>
          </div>

          {/* Placeholder for full content */}
          {post.content && post.content !== "..." && (
            <div className={`mt-8 ${isMatrix ? 'text-slate-300' : 'text-slate-700'}`}>
              <p>{post.content}</p>
            </div>
          )}
        </div>
      </article>
    </div>
  );
};

export default BlogPost;
