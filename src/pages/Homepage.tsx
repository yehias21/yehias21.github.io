import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ThemeMode } from '../types';
import { PROFILE, PUBLICATIONS, PROJECTS, BLOG_POSTS, EXPERIENCE } from '../data/content';
import { BookOpen, Briefcase, FileText, Calendar, Github, Linkedin, GraduationCap, MapPin, ArrowRight, Mail, FileCode, BookText } from 'lucide-react';

interface HomepageProps {
  theme: ThemeMode;
}

const Homepage: React.FC<HomepageProps> = ({ theme }) => {
  const [quoteIndex, setQuoteIndex] = useState(0);
  const isMatrix = theme === ThemeMode.MATRIX;

  // 'Q' key listener for quotes
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() === 'q') {
        setQuoteIndex((prev) => (prev + 1) % PROFILE.quotes.length);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="space-y-24 py-8">
      {/* Hero/Intro Section */}
      <section className="min-h-[80vh] flex flex-col items-center justify-center gap-10 pt-10 px-4 md:flex-row">
        {/* Left: Text Info */}
        <div className="flex-1 flex flex-col justify-center items-start z-10 order-2 md:order-1">
          {isMatrix && (
            <div className="mb-4 inline-block px-3 py-1 rounded-full text-xs font-mono bg-green-900 text-green-300">
              System: ONLINE
            </div>
          )}

          <h1 className={`text-4xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight leading-tight ${isMatrix ? 'text-white' : 'text-slate-900'}`}>
            Hello, I'm <br />
            <span className={isMatrix ? 'text-green-500 glitch-text' : 'text-blue-600'}>
              {PROFILE.name.split(' ')[0]}
            </span>
          </h1>

          <p className={`text-lg md:text-xl max-w-xl mb-8 leading-relaxed ${isMatrix ? 'text-slate-300' : 'text-slate-600'}`}>
            {PROFILE.bio}
          </p>

          {/* Quote Section (Press Q) */}
          <div className="h-24 w-full max-w-lg mb-4 relative group cursor-pointer" onClick={() => setQuoteIndex((prev) => (prev + 1) % PROFILE.quotes.length)}>
            <p className={`text-md md:text-lg font-mono border-l-4 pl-4 italic transition-all duration-500 ease-in-out ${isMatrix ? 'text-green-400 border-green-500' : 'text-slate-500 border-blue-500'}`}>
              {PROFILE.quotes[quoteIndex]}
            </p>
            <span className={`absolute -bottom-2 left-4 text-xs opacity-0 group-hover:opacity-100 transition-opacity ${isMatrix ? 'text-green-700' : 'text-slate-400'}`}>
              Press 'Q' to change
            </span>
          </div>

          {/* Social Links & Contact */}
          <div className="flex gap-4 mt-6">
            {PROFILE.socials.github && (
              <a href={PROFILE.socials.github} target="_blank" rel="noreferrer" className={`p-3 rounded-lg transition-all ${isMatrix ? 'bg-slate-800 hover:bg-green-900/50 text-slate-400 hover:text-green-400' : 'bg-slate-100 hover:bg-blue-100 text-slate-600 hover:text-blue-600'}`}>
                <Github className="w-5 h-5" />
              </a>
            )}
            {PROFILE.socials.linkedin && (
              <a href={PROFILE.socials.linkedin} target="_blank" rel="noreferrer" className={`p-3 rounded-lg transition-all ${isMatrix ? 'bg-slate-800 hover:bg-green-900/50 text-slate-400 hover:text-green-400' : 'bg-slate-100 hover:bg-blue-100 text-slate-600 hover:text-blue-600'}`}>
                <Linkedin className="w-5 h-5" />
              </a>
            )}
            {PROFILE.socials.scholar && (
              <a href={PROFILE.socials.scholar} target="_blank" rel="noreferrer" className={`p-3 rounded-lg transition-all ${isMatrix ? 'bg-slate-800 hover:bg-green-900/50 text-slate-400 hover:text-green-400' : 'bg-slate-100 hover:bg-blue-100 text-slate-600 hover:text-blue-600'}`}>
                <GraduationCap className="w-5 h-5" />
              </a>
            )}
            <a href={`mailto:${PROFILE.email}`} className={`p-3 rounded-lg transition-all ${isMatrix ? 'bg-slate-800 hover:bg-green-900/50 text-slate-400 hover:text-green-400' : 'bg-slate-100 hover:bg-blue-100 text-slate-600 hover:text-blue-600'}`}>
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Right: Profile Image - On mobile appears first (order-1), on desktop appears second */}
        <div className="flex-1 flex justify-center z-10 md:justify-end order-1 md:order-2">
          <div className="relative w-64 h-64 md:w-80 md:h-80">
            <div className={`absolute inset-0 rounded-2xl transform rotate-6 transition-colors duration-500 ${isMatrix ? 'bg-green-600' : 'bg-blue-200'}`}></div>
            <div className={`absolute inset-0 rounded-2xl transform -rotate-6 transition-colors duration-500 ${isMatrix ? 'bg-black border border-green-500' : 'bg-slate-200'}`}></div>
            <img
              src={PROFILE.image}
              alt="Profile"
              className={`absolute inset-0 w-full h-full object-cover rounded-2xl shadow-xl hover:scale-[1.02] transition-transform duration-500 z-10 border-4 ${isMatrix ? 'border-slate-800' : 'border-white'}`}
            />
          </div>
        </div>
      </section>

      {/* Publications Preview Section */}
      <section className="animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="flex justify-between items-center mb-8">
          <h2 className={`text-3xl font-bold flex items-center gap-3 ${isMatrix ? 'text-white' : 'text-slate-900'}`}>
            <BookOpen className={`w-8 h-8 ${isMatrix ? 'text-green-500' : 'text-blue-600'}`} />
            Publications
          </h2>
          <Link
            to="/publications"
            className={`flex items-center gap-2 transition-colors group ${isMatrix ? 'text-green-500 hover:text-green-400' : 'text-blue-600 hover:text-blue-500'}`}
          >
            See all <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="space-y-4">
          {PUBLICATIONS.slice(0, 3).map((pub) => {
            const [isExpanded, setIsExpanded] = useState(false);

            return (
              <div
                key={pub.id}
                className={`group p-6 rounded-xl border transition-all duration-300 cursor-pointer ${isMatrix ? 'bg-slate-900/50 border-slate-800 hover:border-green-800 hover:shadow-lg hover:shadow-green-900/10' : 'bg-white border-slate-200 hover:border-blue-300 hover:shadow-lg'}`}
                onClick={() => setIsExpanded(!isExpanded)}
              >
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className={`text-xs font-mono px-2 py-1 rounded inline-block ${isMatrix ? 'bg-slate-800 text-slate-400' : 'bg-slate-100 text-slate-500'}`}>{pub.venue} • {pub.year}</span>
                  {pub.comment && (
                    <span className={`text-xs font-semibold px-2 py-1 rounded inline-block ${isMatrix ? 'bg-green-900/30 text-green-400 border border-green-700' : 'bg-blue-100 text-blue-700 border border-blue-300'}`}>
                      {pub.comment}
                    </span>
                  )}
                </div>
                <h3 className={`text-xl font-semibold transition-colors ${isMatrix ? 'text-slate-100 group-hover:text-green-400' : 'text-slate-900 group-hover:text-blue-600'}`}>
                  {pub.title}
                </h3>
                <p className={`mt-1 text-sm ${isMatrix ? 'text-slate-400' : 'text-slate-600'}`}>
                  {pub.authors.map((author, idx) =>
                    author === "Yahia Salaheldin Shaaban" || author === "Yahia Salaheldin Shaaban*" ?
                      <span key={idx}><strong>{author}</strong>{idx < pub.authors.length - 1 ? ', ' : ''}</span> :
                      <span key={idx}>{author}{idx < pub.authors.length - 1 ? ', ' : ''}</span>
                  )}
                </p>

                {/* Abstract Dropdown */}
                {isExpanded && (
                  <div className={`mt-4 p-4 rounded-lg text-sm leading-relaxed border-l-2 animate-in slide-in-from-top-2 fade-in ${isMatrix ? 'bg-black/50 text-slate-300 border-green-500' : 'bg-slate-50 text-slate-600 border-blue-500'}`}>
                    <span className="font-bold block mb-1">Abstract:</span>
                    {pub.abstract}
                  </div>
                )}

                <div className="flex flex-wrap gap-2 mt-3">
                  {pub.tags.map(tag => (
                    <span key={tag} className={`text-xs px-2 py-0.5 rounded-full border ${isMatrix ? 'bg-green-900/20 text-green-400 border-green-800/50' : 'bg-blue-50 text-blue-600 border-blue-200'}`}>
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Paper, Code, and BibTeX Buttons */}
                <div className="flex flex-wrap gap-3 mt-4 pt-4 border-t border-opacity-50" onClick={(e) => e.stopPropagation()}>
                  {pub.pdf && pub.pdf !== "#" && (
                    <a
                      href={pub.pdf}
                      target="_blank"
                      rel="noreferrer"
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${isMatrix ? 'bg-slate-800 hover:bg-green-900/50 text-slate-300 hover:text-green-400 border border-slate-700 hover:border-green-700' : 'bg-slate-100 hover:bg-blue-100 text-slate-700 hover:text-blue-600 border border-slate-200 hover:border-blue-300'}`}
                    >
                      <FileText className="w-4 h-4" />
                      Paper
                    </a>
                  )}
                  {pub.link && pub.link !== "#" && (
                    <a
                      href={pub.link}
                      target="_blank"
                      rel="noreferrer"
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${isMatrix ? 'bg-slate-800 hover:bg-green-900/50 text-slate-300 hover:text-green-400 border border-slate-700 hover:border-green-700' : 'bg-slate-100 hover:bg-blue-100 text-slate-700 hover:text-blue-600 border border-slate-200 hover:border-blue-300'}`}
                    >
                      <FileCode className="w-4 h-4" />
                      Code
                    </a>
                  )}
                  {pub.bibtex && pub.bibtex !== "#" && (
                    <a
                      href={pub.bibtex}
                      target="_blank"
                      rel="noreferrer"
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${isMatrix ? 'bg-slate-800 hover:bg-green-900/50 text-slate-300 hover:text-green-400 border border-slate-700 hover:border-green-700' : 'bg-slate-100 hover:bg-blue-100 text-slate-700 hover:text-blue-600 border border-slate-200 hover:border-blue-300'}`}
                    >
                      <BookText className="w-4 h-4" />
                      BibTeX
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Projects Preview Section */}
      <section className="animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="flex justify-between items-center mb-8">
          <h2 className={`text-3xl font-bold flex items-center gap-3 ${isMatrix ? 'text-white' : 'text-slate-900'}`}>
            <Briefcase className={`w-8 h-8 ${isMatrix ? 'text-green-500' : 'text-blue-600'}`} />
            Projects
          </h2>
          <Link
            to="/projects"
            className={`flex items-center gap-2 transition-colors group ${isMatrix ? 'text-green-500 hover:text-green-400' : 'text-blue-600 hover:text-blue-500'}`}
          >
            See all <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PROJECTS.slice(0, 3).map((proj) => (
            <a
              key={proj.id}
              href={proj.github || proj.link || '#'}
              target={proj.github || proj.link ? "_blank" : undefined}
              rel="noreferrer"
              className={`rounded-xl overflow-hidden border hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 group flex flex-col h-full ${isMatrix ? 'bg-slate-900 border-slate-800 hover:border-green-800 hover:shadow-green-900/20' : 'bg-white border-slate-200 hover:border-blue-300'}`}
            >
              <div className="h-40 overflow-hidden bg-gray-200 relative">
                <img src={proj.image} alt={proj.title} className={`w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ${isMatrix ? 'opacity-80 group-hover:opacity-100' : ''}`} />
                <div className={`absolute inset-0 bg-gradient-to-t to-transparent ${isMatrix ? 'from-slate-900' : 'from-white/50'}`}></div>
              </div>
              <div className="p-5 flex flex-col flex-grow">
                <h3 className={`text-lg font-bold mb-2 transition-colors ${isMatrix ? 'text-white group-hover:text-green-400' : 'text-slate-900 group-hover:text-blue-600'}`}>{proj.title}</h3>
                <p className={`text-sm mb-4 line-clamp-2 flex-grow ${isMatrix ? 'text-slate-400' : 'text-slate-600'}`}>
                  {proj.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {proj.techStack.slice(0, 3).map((tech) => (
                    <span key={tech} className={`px-2 py-1 text-xs rounded-md font-mono border ${isMatrix ? 'bg-slate-800 text-slate-300 border-slate-700' : 'bg-slate-100 text-slate-600 border-slate-200'}`}>
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Experience Preview Section */}
      <section className="animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="flex justify-between items-center mb-8">
          <h2 className={`text-3xl font-bold flex items-center gap-3 ${isMatrix ? 'text-white' : 'text-slate-900'}`}>
            <Briefcase className={`w-8 h-8 ${isMatrix ? 'text-green-500' : 'text-blue-600'}`} />
            Experience
          </h2>
          <Link
            to="/about"
            className={`flex items-center gap-2 transition-colors group ${isMatrix ? 'text-green-500 hover:text-green-400' : 'text-blue-600 hover:text-blue-500'}`}
          >
            See all <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="space-y-4">
          {EXPERIENCE.slice(0, 3).map(exp => (
            <div key={exp.id} className={`relative pl-6 border-l-2 transition-colors group ${isMatrix ? 'border-slate-700 hover:border-green-600' : 'border-slate-200 hover:border-blue-500'}`}>
              <div className={`absolute -left-[9px] top-0 w-4 h-4 rounded-full border-2 ${isMatrix ? 'bg-slate-800 border-green-600' : 'bg-white border-blue-500'}`}></div>
              <h4 className={`font-bold text-lg ${isMatrix ? 'text-white' : 'text-slate-900'}`}>{exp.role}</h4>
              <div className={`flex flex-col sm:flex-row sm:justify-between text-sm mb-2 ${isMatrix ? 'text-slate-400' : 'text-slate-500'}`}>
                <span className={`font-semibold ${isMatrix ? 'text-green-400' : 'text-blue-600'}`}>{exp.company}</span>
                <div className="flex items-center gap-2">
                  <span className="flex items-center gap-1"><MapPin className="w-3 h-3"/> {exp.location}</span>
                  <span>• {exp.period}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Blog Preview Section */}
      <section className="animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="flex justify-between items-center mb-8">
          <h2 className={`text-3xl font-bold flex items-center gap-3 ${isMatrix ? 'text-white' : 'text-slate-900'}`}>
            <FileText className={`w-8 h-8 ${isMatrix ? 'text-green-500' : 'text-blue-600'}`} />
            Blog
          </h2>
          <Link
            to="/blog"
            className={`flex items-center gap-2 transition-colors group ${isMatrix ? 'text-green-500 hover:text-green-400' : 'text-blue-600 hover:text-blue-500'}`}
          >
            See all <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid gap-6">
          {BLOG_POSTS.slice(0, 2).map((post) => (
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
      </section>

      {/* Contact CTA */}
      <section className="text-center py-12">
        <h2 className={`text-3xl font-bold mb-4 ${isMatrix ? 'text-white' : 'text-slate-900'}`}>Let's Connect</h2>
        <p className={`mb-8 max-w-md mx-auto ${isMatrix ? 'text-slate-400' : 'text-slate-600'}`}>
          I am open to collaborations on Time Series, LLMs, and Reasoning.
        </p>
        <Link
          to="/contact"
          className={`inline-flex items-center gap-2 px-8 py-3 text-white rounded-full font-medium transition-colors shadow-lg hover:shadow-xl ${isMatrix ? 'bg-green-700 hover:bg-green-600' : 'bg-blue-600 hover:bg-blue-700'}`}
        >
          <Calendar className="w-5 h-5" />
          Get in Touch
        </Link>
      </section>
    </div>
  );
};

export default Homepage;
