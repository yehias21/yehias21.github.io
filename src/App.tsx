import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { ThemeMode } from './types';
import { PROFILE } from './data/content';
import MatrixRain from './components/MatrixRain';
import ChatWidget from './components/ChatWidget';
import Homepage from './pages/Homepage';
import About from './pages/About';
import Publications from './pages/Publications';
import Projects from './pages/Projects';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Contact from './pages/Contact';
import { User, BookOpen, Briefcase, FileText, Calendar, Menu, X, Github, Linkedin, GraduationCap, Sun, Moon } from 'lucide-react';

// --- Layout & Navigation ---

const Layout: React.FC<{ children: React.ReactNode; theme: ThemeMode; toggleTheme: () => void }> = ({ children, theme, toggleTheme }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isMatrix = theme === ThemeMode.MATRIX;

  const navLinks = [
    { name: 'Home', path: '/', icon: <User className="w-4 h-4" /> },
    { name: 'About', path: '/about', icon: <User className="w-4 h-4" /> },
    { name: 'Publications', path: '/publications', icon: <BookOpen className="w-4 h-4" /> },
    { name: 'Projects', path: '/projects', icon: <Briefcase className="w-4 h-4" /> },
    { name: 'Blog', path: '/blog', icon: <FileText className="w-4 h-4" /> },
    { name: 'Contact', path: '/contact', icon: <Calendar className="w-4 h-4" /> },
  ];

  return (
    <div className={`min-h-screen relative flex flex-col transition-colors duration-300 ${isMatrix ? 'dark font-mono bg-black text-white' : 'bg-gray-50 text-slate-900'}`}>
      {/* Matrix Rain - Only visible in matrix/night mode */}
      {isMatrix && <MatrixRain />}

      {/* Navbar */}
      <nav className={`sticky top-0 z-40 w-full backdrop-blur-md border-b transition-colors duration-300 ${isMatrix ? 'bg-black/70 border-slate-800' : 'bg-white/70 border-slate-200'}`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <Link to="/" className={`text-lg font-bold flex items-center gap-2 ${isMatrix ? 'text-white' : 'text-slate-900'}`}>
              <span className={`w-8 h-8 rounded-lg flex items-center justify-center font-serif italic shadow-md ${isMatrix ? 'bg-green-600 text-black' : 'bg-blue-600 text-white'}`}>
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
                      ? isMatrix ? 'bg-green-900/30 text-green-400' : 'bg-blue-100 text-blue-600'
                      : isMatrix ? 'text-slate-400 hover:text-green-300' : 'text-slate-600 hover:text-blue-600'
                  }`}
                >
                  {link.icon}
                  {link.name}
                </Link>
              ))}
              <div className={`h-6 w-px mx-2 ${isMatrix ? 'bg-slate-700' : 'bg-slate-200'}`}></div>
              <button
                onClick={toggleTheme}
                className={`p-2 rounded-full transition-colors ${isMatrix ? 'text-green-500 hover:bg-green-900/20' : 'text-slate-600 hover:bg-slate-100'}`}
                title={isMatrix ? 'Switch to Day Mode' : 'Switch to Night Mode'}
              >
                {isMatrix ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center gap-4">
              <button
                onClick={toggleTheme}
                className={`p-2 rounded-full transition-colors ${isMatrix ? 'text-green-500' : 'text-slate-600'}`}
              >
                {isMatrix ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`${isMatrix ? 'text-slate-300 hover:text-white' : 'text-slate-600 hover:text-slate-900'}`}
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav */}
        {isMobileMenuOpen && (
          <div className={`md:hidden border-b animate-in slide-in-from-top-2 ${isMatrix ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block px-3 py-2 rounded-md text-base font-medium flex items-center gap-2 ${
                    location.pathname === link.path
                      ? isMatrix ? 'bg-green-900/30 text-green-400' : 'bg-blue-100 text-blue-600'
                      : isMatrix ? 'text-slate-400 hover:text-green-300' : 'text-slate-600 hover:text-blue-600'
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
      <footer className={`z-10 py-8 text-center text-sm border-t mt-12 ${isMatrix ? 'text-slate-600 border-slate-800' : 'text-slate-400 border-slate-200'}`}>
        <div className="flex justify-center gap-6 mb-4">
          {PROFILE.socials.github && <a href={PROFILE.socials.github} target="_blank" rel="noreferrer" className={`transition-colors ${isMatrix ? 'hover:text-green-400' : 'hover:text-blue-600'}`}><Github className="w-5 h-5"/></a>}
          {PROFILE.socials.linkedin && <a href={PROFILE.socials.linkedin} target="_blank" rel="noreferrer" className={`transition-colors ${isMatrix ? 'hover:text-green-400' : 'hover:text-blue-600'}`}><Linkedin className="w-5 h-5"/></a>}
          {PROFILE.socials.scholar && <a href={PROFILE.socials.scholar} target="_blank" rel="noreferrer" className={`transition-colors ${isMatrix ? 'hover:text-green-400' : 'hover:text-blue-600'}`}><GraduationCap className="w-5 h-5"/></a>}
        </div>
        <p>&copy; {new Date().getFullYear()} {PROFILE.name}</p>
      </footer>

      {/* Chat Widget */}
      <ChatWidget theme={theme} />
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
      <Layout theme={theme} toggleTheme={toggleTheme}>
        <Routes>
          <Route path="/" element={<Homepage theme={theme} />} />
          <Route path="/about" element={<About theme={theme} />} />
          <Route path="/publications" element={<Publications theme={theme} />} />
          <Route path="/projects" element={<Projects theme={theme} />} />
          <Route path="/blog" element={<Blog theme={theme} />} />
          <Route path="/blog/:id" element={<BlogPost theme={theme} />} />
          <Route path="/contact" element={<Contact theme={theme} />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
