import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { ThemeMode } from './types';
import { PROFILE, PUBLICATIONS, PROJECTS, BLOG_POSTS, EXPERIENCE, EDUCATION, GALLERY, FACTS } from './data/content';
import MatrixRain from './components/MatrixRain';
import ChatWidget from './components/ChatWidget';
import { BookOpen, User, Briefcase, FileText, Calendar, Menu, X, Github, Linkedin, Twitter, ExternalLink, Download, Monitor, Brain, ChevronDown, ChevronUp, Trophy, GraduationCap, MapPin, Lightbulb, Moon } from 'lucide-react';

// --- Sub-components for Pages ---

const Hero: React.FC<{ theme: ThemeMode; setTheme: (t: ThemeMode) => void }> = ({ theme, setTheme }) => {
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [factIndex, setFactIndex] = useState(0);

  // Auto-rotate fact
  useEffect(() => {
    const interval = setInterval(() => {
      setFactIndex((prev) => (prev + 1) % FACTS.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

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
    <div className="min-h-[85vh] flex flex-col md:flex-row items-center justify-center gap-10 pt-10 px-4">
      {/* Left: Text Info */}
      <div className="flex-1 flex flex-col justify-center items-start z-10">
        <div className="mb-4 inline-block px-3 py-1 rounded-full text-xs font-mono bg-blue-100 text-blue-800 dark:bg-green-900 dark:text-green-300">
           {theme === ThemeMode.MATRIX ? "System: ONLINE" : "Academic Portfolio"}
        </div>
        
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight dark:text-white leading-tight">
          Hello, I'm <br />
          <span className={`${theme === ThemeMode.MATRIX ? 'text-green-500 glitch-text' : 'text-blue-600'}`}>
            {PROFILE.name.split(' ')[0]}
          </span>
        </h1>
        
        <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-xl mb-8 leading-relaxed">
          {PROFILE.bio.split('.')[0]}.
        </p>

        {/* Quote Section (Press Q) */}
        <div className="h-24 w-full max-w-lg mb-4 relative group cursor-pointer" onClick={() => setQuoteIndex((prev) => (prev + 1) % PROFILE.quotes.length)}>
          <p className="text-md md:text-lg font-mono text-slate-500 dark:text-green-400 border-l-4 border-slate-300 dark:border-green-500 pl-4 italic transition-all duration-500 ease-in-out">
            {PROFILE.quotes[quoteIndex]}
          </p>
          <span className="absolute -bottom-2 left-4 text-xs text-slate-400 dark:text-green-700 opacity-0 group-hover:opacity-100 transition-opacity">
            Press 'Q' to change
          </span>
        </div>

        {/* The Choice: Red Pill / Blue Pill */}
        <div className="flex flex-col sm:flex-row gap-6 mt-4 items-center">
          <div className="flex gap-4">
            <button 
              onClick={() => setTheme(ThemeMode.LIGHT)}
              className={`relative group px-6 py-3 rounded-full border-2 transition-all duration-300 flex items-center gap-2 font-bold
                ${theme === ThemeMode.LIGHT 
                  ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-500/30' 
                  : 'border-blue-500 text-blue-500 hover:bg-blue-50'}`}
            >
              <div className="w-3 h-3 rounded-full bg-white/90 shadow-inner"></div>
              Blue Pill
              <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                The Story
              </span>
            </button>

            <button 
              onClick={() => setTheme(ThemeMode.MATRIX)}
              className={`relative group px-6 py-3 rounded-full border-2 transition-all duration-300 flex items-center gap-2 font-bold font-mono
                ${theme === ThemeMode.MATRIX 
                  ? 'bg-red-600 border-red-600 text-white shadow-lg shadow-red-500/30' 
                  : 'border-red-500 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20'}`}
            >
              <div className="w-3 h-3 rounded-full bg-white/90 shadow-inner"></div>
              Red Pill
              <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black border border-green-500 text-green-500 text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                The Truth
              </span>
            </button>
          </div>
        </div>

        {/* Learn Something New Card */}
        <div className="mt-12 p-4 bg-white/80 dark:bg-black/40 backdrop-blur rounded-xl border-l-4 border-yellow-400 shadow-sm max-w-md animate-in slide-in-from-bottom-5 fade-in duration-700">
           <div className="flex items-center gap-2 mb-2 text-yellow-600 dark:text-yellow-400 font-bold text-sm uppercase tracking-wide">
             <Lightbulb className="w-4 h-4" /> Learn Something New
           </div>
           <p className="text-sm text-slate-700 dark:text-slate-300">
             {FACTS[factIndex]}
           </p>
        </div>
      </div>

      {/* Right: Profile Image */}
      <div className="flex-1 flex justify-center z-10 md:justify-end">
        <div className="relative w-64 h-64 md:w-80 md:h-80">
          <div className={`absolute inset-0 rounded-2xl transform rotate-6 transition-colors duration-500 ${theme === ThemeMode.MATRIX ? 'bg-green-600' : 'bg-blue-200'}`}></div>
          <div className={`absolute inset-0 rounded-2xl transform -rotate-6 transition-colors duration-500 ${theme === ThemeMode.MATRIX ? 'bg-black border border-green-500' : 'bg-slate-200'}`}></div>
          <img 
            src={PROFILE.image} 
            alt="Profile" 
            className="absolute inset-0 w-full h-full object-cover rounded-2xl shadow-xl hover:scale-[1.02] transition-transform duration-500 z-10 border-4 border-white dark:border-slate-800"
          />
        </div>
      </div>
    </div>
  );
};

const About: React.FC = () => {
  return (
    <div className="py-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h2 className="text-3xl font-bold mb-8 dark:text-white flex items-center gap-3">
        <User className="w-8 h-8 text-blue-600 dark:text-green-500" />
        About Me
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Education & Experience Column */}
        <div className="md:col-span-2 space-y-10">
          
          {/* Education */}
          <section>
             <h3 className="text-xl font-bold mb-4 flex items-center gap-2 dark:text-slate-200">
               <GraduationCap className="w-5 h-5 text-blue-500 dark:text-green-500" /> Education
             </h3>
             <div className="space-y-6">
                {EDUCATION.map(edu => (
                  <div key={edu.id} className="border-l-2 border-slate-200 dark:border-slate-700 pl-4">
                    <h4 className="font-bold text-lg dark:text-white">{edu.institution}</h4>
                    <div className="flex justify-between items-center text-sm text-slate-500 dark:text-slate-400 mb-1">
                       <span>{edu.degree}</span>
                       <span>{edu.period}</span>
                    </div>
                    {edu.details && (
                      <ul className="list-disc list-inside text-sm text-slate-600 dark:text-slate-400 mt-2">
                        {edu.details.map((d, i) => <li key={i}>{d}</li>)}
                      </ul>
                    )}
                  </div>
                ))}
             </div>
          </section>

          {/* Experience Timeline */}
          <section>
             <h3 className="text-xl font-bold mb-4 flex items-center gap-2 dark:text-slate-200">
               <Briefcase className="w-5 h-5 text-blue-500 dark:text-green-500" /> Experience
             </h3>
             <div className="space-y-6">
                {EXPERIENCE.map(exp => (
                  <div key={exp.id} className="relative pl-6 border-l-2 border-slate-200 dark:border-slate-700">
                    <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-slate-200 dark:bg-slate-800 border-2 border-white dark:border-green-600"></div>
                    <h4 className="font-bold text-lg dark:text-white">{exp.role}</h4>
                    <div className="flex flex-col sm:flex-row sm:justify-between text-sm text-slate-500 dark:text-slate-400 mb-2">
                       <span className="font-semibold text-slate-700 dark:text-green-400">{exp.company}</span>
                       <div className="flex items-center gap-2">
                         <span className="flex items-center gap-1"><MapPin className="w-3 h-3"/> {exp.location}</span>
                         <span>• {exp.period}</span>
                       </div>
                    </div>
                    <ul className="list-disc list-inside text-sm text-slate-600 dark:text-slate-400 space-y-1">
                      {exp.description.map((d, i) => <li key={i}>{d}</li>)}
                    </ul>
                  </div>
                ))}
             </div>
          </section>
        </div>

        {/* Gallery & Skills Column */}
        <div className="space-y-8">
           <section>
             <h3 className="text-xl font-bold mb-4 flex items-center gap-2 dark:text-slate-200">
               <Trophy className="w-5 h-5 text-blue-500 dark:text-green-500" /> Activities & Awards
             </h3>
             <div className="grid grid-cols-2 gap-2">
               {GALLERY.map((item) => (
                 <div key={item.id} className="relative group overflow-hidden rounded-lg aspect-square">
                   <img src={item.src} alt={item.caption} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                   <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2">
                     <span className="text-white text-xs font-bold">{item.caption}</span>
                   </div>
                 </div>
               ))}
             </div>
             <div className="mt-4 p-4 bg-slate-100 dark:bg-slate-900 rounded-lg">
                <h4 className="font-bold text-sm mb-2 dark:text-white">Achievements</h4>
                <ul className="text-xs space-y-2 text-slate-600 dark:text-slate-400">
                  <li>🏆 1st Place NeurIPS 2024 Watermark Challenge</li>
                  <li>🏆 Top 10% Graduate, Alexandria University</li>
                  <li>🏊‍♂️ National Pro Swimmer (Egypt)</li>
                  <li>🤖 M.I.A Robotics Machine Learning Lead</li>
                </ul>
             </div>
           </section>
        </div>

      </div>
    </div>
  );
};

const Publications: React.FC = () => {
  const [showAll, setShowAll] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const displayedPubs = showAll ? PUBLICATIONS : PUBLICATIONS.slice(0, 3);

  return (
    <div className="py-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold dark:text-white flex items-center gap-3">
          <BookOpen className="w-8 h-8 text-blue-600 dark:text-green-500" />
          Publications
        </h2>
        <div className="text-sm font-mono text-slate-400">
          {displayedPubs.length} / {PUBLICATIONS.length}
        </div>
      </div>

      <div className="space-y-6">
        {displayedPubs.map((pub) => (
          <div key={pub.id} className="group relative bg-white dark:bg-slate-900/50 p-6 rounded-xl border border-slate-100 dark:border-slate-800 hover:shadow-lg dark:hover:shadow-green-900/10 transition-all duration-300">
            <div className="flex flex-col md:flex-row justify-between md:items-start gap-2">
               <div>
                  <span className="text-xs font-mono px-2 py-1 bg-slate-100 dark:bg-slate-800 text-slate-500 rounded mb-2 inline-block">{pub.venue} • {pub.year}</span>
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-green-400 transition-colors">
                    {pub.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 mt-1 text-sm">{pub.authors.join(", ")}</p>
               </div>
               <div className="flex gap-2 shrink-0 mt-2 md:mt-0">
                  <button 
                    onClick={() => setExpandedId(expandedId === pub.id ? null : pub.id)}
                    className="p-2 text-slate-400 hover:text-blue-600 dark:hover:text-green-400 transition-colors"
                    title="Read Abstract"
                  >
                    {expandedId === pub.id ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </button>
               </div>
            </div>

            {/* Abstract Dropdown */}
            {expandedId === pub.id && (
              <div className="mt-4 p-4 bg-slate-50 dark:bg-black/50 rounded-lg text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-l-2 border-blue-500 dark:border-green-500 animate-in slide-in-from-top-2 fade-in">
                <span className="font-bold block mb-1">Abstract:</span>
                {pub.abstract}
              </div>
            )}

            <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-slate-100 dark:border-slate-800">
               {pub.tags.map(tag => (
                 <span key={tag} className="text-xs px-2 py-0.5 rounded-full bg-blue-50 dark:bg-green-900/20 text-blue-600 dark:text-green-400 border border-blue-100 dark:border-green-800/50">
                   {tag}
                 </span>
               ))}
            </div>
          </div>
        ))}
      </div>

      {PUBLICATIONS.length > 3 && (
        <div className="text-center mt-8">
          <button 
            onClick={() => setShowAll(!showAll)}
            className="px-6 py-2 bg-slate-900 dark:bg-slate-800 text-white rounded-full text-sm font-medium hover:scale-105 transition-transform"
          >
            {showAll ? "Show Top Papers" : "Show All Publications"}
          </button>
        </div>
      )}
    </div>
  );
};

const Projects: React.FC = () => {
  const [showAll, setShowAll] = useState(false);
  const displayedProjects = showAll ? PROJECTS : PROJECTS.slice(0, 3);

  return (
    <div className="py-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold dark:text-white flex items-center gap-3">
          <Briefcase className="w-8 h-8 text-blue-600 dark:text-green-500" />
          Projects
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayedProjects.map((proj) => (
          <div key={proj.id} className="bg-white dark:bg-slate-900 rounded-xl overflow-hidden border border-slate-100 dark:border-slate-800 hover:shadow-2xl dark:hover:shadow-green-900/20 hover:scale-[1.03] hover:z-10 transition-all duration-300 group flex flex-col h-full">
            <div className="h-48 overflow-hidden bg-gray-200 relative">
              <img src={proj.image} alt={proj.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
            <div className="p-6 flex flex-col flex-grow">
              <h3 className="text-lg font-bold mb-2 dark:text-white group-hover:text-blue-600 dark:group-hover:text-green-400 transition-colors">{proj.title}</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm mb-4 line-clamp-3 flex-grow">
                {proj.description}
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {proj.techStack.map((tech) => (
                  <span key={tech} className="px-2 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs rounded-md font-mono border border-slate-200 dark:border-slate-700">
                    {tech}
                  </span>
                ))}
              </div>
              <div className="flex gap-4 pt-4 border-t border-slate-50 dark:border-slate-800">
                {proj.github && <a href={proj.github} className="text-slate-500 hover:text-black dark:text-slate-400 dark:hover:text-white flex items-center gap-1 text-sm"><Github className="w-4 h-4"/> Code</a>}
              </div>
            </div>
          </div>
        ))}
      </div>

      {PROJECTS.length > 3 && (
        <div className="text-center mt-12">
          <button 
            onClick={() => setShowAll(!showAll)}
            className="px-6 py-2 border border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-300 rounded-full text-sm font-medium hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            {showAll ? "Show Less" : "View All Projects"}
          </button>
        </div>
      )}
    </div>
  );
};

const Blog: React.FC = () => {
  return (
    <div className="py-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h2 className="text-3xl font-bold mb-8 dark:text-white flex items-center gap-3">
        <FileText className="w-8 h-8 text-blue-600 dark:text-green-500" />
        Blog
      </h2>
      <div className="grid gap-8">
        {BLOG_POSTS.map((post) => (
          <article key={post.id} className="flex flex-col md:flex-row gap-6 md:gap-12 items-start group cursor-pointer bg-white dark:bg-transparent p-4 md:p-0 rounded-xl md:rounded-none shadow-sm md:shadow-none border border-slate-100 md:border-none">
            <div className="md:w-32 shrink-0 pt-1">
              <span className="text-sm font-mono text-slate-400 dark:text-slate-500 block">{post.date}</span>
              <span className="text-xs text-slate-300 dark:text-slate-600 block">{post.readTime}</span>
            </div>
            <div className="flex-1 border-b border-slate-100 dark:border-slate-800 pb-8 group-last:border-0">
              <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-2 group-hover:text-blue-600 dark:group-hover:text-green-400 transition-colors">
                {post.title}
              </h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-3">
                {post.excerpt}
              </p>
              <div className="flex gap-2">
                {post.tags.map(tag => (
                   <span key={tag} className="text-xs font-semibold text-blue-600 dark:text-green-600 uppercase tracking-wider">#{tag}</span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

const Contact: React.FC = () => {
  return (
    <div className="py-12 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-2xl mx-auto text-center">
      <h2 className="text-3xl font-bold mb-6 dark:text-white">Let's Connect</h2>
      <p className="text-slate-600 dark:text-slate-400 mb-8">
        I am open to collaborations on Time Series, LLMs, and Reasoning.
      </p>
      
      <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 mb-8">
        <Calendar className="w-12 h-12 text-blue-600 dark:text-green-500 mx-auto mb-4" />
        <h3 className="text-xl font-semibold dark:text-white mb-2">Book a 30-min Call</h3>
        <p className="text-sm text-slate-500 mb-6">Directly schedule time on my calendar.</p>
        <a href={PROFILE.meetingLink} target="_blank" rel="noreferrer" className="inline-block px-8 py-3 bg-blue-600 dark:bg-green-700 text-white rounded-full font-medium hover:bg-blue-700 dark:hover:bg-green-600 transition-colors shadow-lg hover:shadow-xl">
          View Calendar
        </a>
      </div>

      <p className="text-slate-500 text-sm">
        Or email me at <a href={`mailto:${PROFILE.email}`} className="text-blue-600 dark:text-green-500 underline font-mono">{PROFILE.email}</a>
      </p>
    </div>
  );
};

// --- Layout & Navigation ---

const Layout: React.FC<{ children: React.ReactNode; toggleTheme: () => void; theme: ThemeMode }> = ({ children, toggleTheme, theme }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/', icon: <User className="w-4 h-4" /> },
    { name: 'About', path: '/about', icon: <User className="w-4 h-4" /> },
    { name: 'Publications', path: '/publications', icon: <BookOpen className="w-4 h-4" /> },
    { name: 'Projects', path: '/projects', icon: <Briefcase className="w-4 h-4" /> },
    { name: 'Blog', path: '/blog', icon: <FileText className="w-4 h-4" /> },
    { name: 'Contact', path: '/contact', icon: <Calendar className="w-4 h-4" /> },
  ];

  return (
    <div className={`min-h-screen relative flex flex-col ${theme === ThemeMode.MATRIX ? 'dark font-mono' : ''}`}>
      {theme === ThemeMode.MATRIX && <MatrixRain />}
      
      {/* Navbar */}
      <nav className="sticky top-0 z-40 w-full backdrop-blur-md bg-white/70 dark:bg-black/70 border-b border-slate-200 dark:border-slate-800 transition-colors duration-300">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <Link to="/" className="text-lg font-bold dark:text-white flex items-center gap-2">
              <span className={`w-8 h-8 ${theme === ThemeMode.MATRIX ? 'bg-green-600 text-black' : 'bg-slate-900 text-white'} rounded-lg flex items-center justify-center font-serif italic shadow-md`}>
                {PROFILE.name.charAt(0)}
              </span>
              <span className="hidden sm:inline tracking-tight">{PROFILE.name}</span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center space-x-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-all flex items-center gap-2 ${
                    location.pathname === link.path
                      ? 'bg-slate-100 text-blue-600 dark:bg-green-900/30 dark:text-green-400'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-400 dark:hover:text-green-300'
                  }`}
                >
                  {link.icon}
                  {link.name}
                </Link>
              ))}
              <div className="h-6 w-px bg-slate-200 dark:bg-slate-700 mx-2"></div>
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full text-slate-500 hover:bg-slate-100 dark:text-green-500 dark:hover:bg-green-900/20 transition-colors"
                title="Toggle Matrix Mode"
              >
                {theme === ThemeMode.MATRIX ? <Monitor className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center gap-4">
              <button onClick={toggleTheme} className="text-slate-600 dark:text-green-500">
                 {theme === ThemeMode.MATRIX ? <Monitor className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 animate-in slide-in-from-top-2">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block px-3 py-2 rounded-md text-base font-medium flex items-center gap-2 ${
                    location.pathname === link.path
                       ? 'bg-slate-100 text-blue-600 dark:bg-green-900/30 dark:text-green-400'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-400 dark:hover:text-green-300'
                  }`}
                >
                  {link.icon}
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="flex-grow z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="z-10 py-8 text-center text-sm text-slate-400 dark:text-slate-600 border-t border-slate-100 dark:border-transparent mt-12">
        <div className="flex justify-center gap-6 mb-4">
           {PROFILE.socials.github && <a href={PROFILE.socials.github} target="_blank" rel="noreferrer" className="hover:text-black dark:hover:text-white transition-colors"><Github className="w-5 h-5"/></a>}
           {PROFILE.socials.linkedin && <a href={PROFILE.socials.linkedin} target="_blank" rel="noreferrer" className="hover:text-blue-700 dark:hover:text-blue-400 transition-colors"><Linkedin className="w-5 h-5"/></a>}
           {PROFILE.socials.scholar && <a href={PROFILE.socials.scholar} target="_blank" rel="noreferrer" className="hover:text-blue-600 dark:hover:text-green-400 transition-colors"><GraduationCap className="w-5 h-5"/></a>}
        </div>
        <p>&copy; {new Date().getFullYear()} {PROFILE.name}. <span className="hidden sm:inline">Crafted with React, Tailwind & Gemini.</span></p>
      </footer>

      {/* Chat Widget */}
      <ChatWidget />
    </div>
  );
};

const App: React.FC = () => {
  const [theme, setTheme] = useState<ThemeMode>(ThemeMode.LIGHT);

  const toggleTheme = () => {
    setTheme((prev) => (prev === ThemeMode.LIGHT ? ThemeMode.MATRIX : ThemeMode.LIGHT));
  };

  return (
    <Router>
      <Layout toggleTheme={toggleTheme} theme={theme}>
        <Routes>
          <Route path="/" element={<Hero theme={theme} setTheme={setTheme} />} />
          <Route path="/about" element={<About />} />
          <Route path="/publications" element={<Publications />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;