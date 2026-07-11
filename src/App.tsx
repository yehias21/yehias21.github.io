import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link, useLocation } from 'react-router-dom';
import { ThemeMode } from './types';
import { PROFILE } from './data/content';
import brainIcon from './assets/figures/brain-icon.png';
import starryNightBg from './assets/figures/starry-night.jpg';
import Homepage from './pages/Homepage';
import About from './pages/About';
import Publications from './pages/Publications';
import Projects from './pages/Projects';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Contact from './pages/Contact';
import Travel from './pages/Travel';
import Gallery from './pages/Gallery';
import { User, BookOpen, Briefcase, FileText, Calendar, Menu, X, Github, Linkedin, GraduationCap, Sun, Moon, Home, Plane, Camera } from 'lucide-react';

const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [pathname]);
  return null;
};

// Content-copy deterrent. Disables the context menu, blocks copy/cut, and
// prevents image dragging — everywhere EXCEPT nodes marked [data-allow-copy]
// (e.g. the citation block, so people can still cite the work) and form
// fields. This is a polite deterrent, not access control: the page source is
// still readable and a determined visitor can disable JS. Flip PROTECT to
// false to turn it all off.
const PROTECT = true;
const useContentProtection = () => {
  useEffect(() => {
    if (!PROTECT) return;
    const root = document.documentElement;
    root.classList.add('protect');

    // Is the event target inside an opt-in-copy region (or a form field)?
    const allowed = (t: EventTarget | null): boolean => {
      let el = t as HTMLElement | null;
      while (el) {
        if (el.dataset && el.dataset.allowCopy !== undefined) return true;
        const tag = el.tagName;
        if (tag === 'INPUT' || tag === 'TEXTAREA') return true;
        el = el.parentElement;
      }
      return false;
    };

    const onContextMenu = (e: MouseEvent) => { if (!allowed(e.target)) e.preventDefault(); };
    const onCopyCut = (e: ClipboardEvent) => {
      if (allowed(e.target)) return;
      e.preventDefault();
      e.clipboardData?.setData(
        'text/plain',
        '© Yahia Salaheldin Shaaban — yehias21.github.io. Content is not licensed for copying or AI training; please cite and get in touch.'
      );
    };
    const onDragStart = (e: DragEvent) => {
      if ((e.target as HTMLElement)?.tagName === 'IMG') e.preventDefault();
    };

    document.addEventListener('contextmenu', onContextMenu);
    document.addEventListener('copy', onCopyCut as EventListener);
    document.addEventListener('cut', onCopyCut as EventListener);
    document.addEventListener('dragstart', onDragStart);

    // Quiet notice for anyone poking at the console.
    try {
      console.log(
        '%c© Yahia Salaheldin Shaaban',
        'font-weight:bold',
        '\nContent on this site is not licensed for copying or AI/LLM training. Please cite and get in touch: /contact'
      );
    } catch { /* ignore */ }

    return () => {
      root.classList.remove('protect');
      document.removeEventListener('contextmenu', onContextMenu);
      document.removeEventListener('copy', onCopyCut as EventListener);
      document.removeEventListener('cut', onCopyCut as EventListener);
      document.removeEventListener('dragstart', onDragStart);
    };
  }, []);
};

// --- Layout & Navigation ---

const Layout: React.FC<{ children: React.ReactNode; theme: ThemeMode; toggleTheme: () => void }> = ({ children, theme, toggleTheme }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isMatrix = theme === ThemeMode.MATRIX;

  // Sync the html/body background to the current theme. Without this, iOS
  // Safari's fast-scroll repaints (and rubber-band overscroll) flash the
  // body's static stone-50 through in dark mode, which reads as a brief
  // white box.
  useEffect(() => {
    const bg = isMatrix ? '#020617' : '#fafaf9';
    const fg = isMatrix ? '#f1f5f9' : '#0f172a';
    document.documentElement.style.backgroundColor = bg;
    document.body.style.backgroundColor = bg;
    document.body.style.color = fg;
    // Disable iOS rubber-band so even if a flash slipped through, it doesn't
    // expose anything below.
    document.documentElement.style.overscrollBehavior = 'none';
    document.body.style.overscrollBehavior = 'none';
  }, [isMatrix]);

  const navLinks = [
    { name: 'Home', path: '/home', icon: <Home className="w-4 h-4" /> },
    { name: 'About', path: '/about', icon: <User className="w-4 h-4" /> },
    { name: 'Publications', path: '/publications', icon: <BookOpen className="w-4 h-4" /> },
    { name: 'Projects', path: '/projects', icon: <Briefcase className="w-4 h-4" /> },
    { name: 'Blog', path: '/blog', icon: <FileText className="w-4 h-4" /> },
    { name: 'Travel', path: '/travel', icon: <Plane className="w-4 h-4" /> },
    { name: 'Gallery', path: '/gallery', icon: <Camera className="w-4 h-4" /> },
    { name: 'Contact', path: '/contact', icon: <Calendar className="w-4 h-4" /> },
  ];

  // Light/dark base colors as RGBA so we can stack a translucent veil
  // on top of the starry-night image (image as bg-image of the wrapper).
  const veil = isMatrix
    ? 'rgba(2,6,23,0.86)'        // slate-950 cool veil for dark mode
    : 'rgba(250,250,249,0.82)';  // stone-50 tinted veil for light mode

  return (
    <div
      className={`min-h-screen relative flex flex-col transition-colors duration-300 ${isMatrix ? 'dark font-mono text-slate-100' : 'text-slate-900'}`}
      style={{
        backgroundImage: `linear-gradient(${veil}, ${veil}), url(${starryNightBg})`,
        // Per-layer sizing: the veil gradient still covers the whole page,
        // while the starry-night image is zoomed out to 60% width. Lower the
        // percentage to zoom out further, raise it to zoom back in.
        backgroundSize: 'cover, 60%',
        backgroundPosition: 'center center',
        // 'fixed' is broken on iOS Safari and was the source of the white
        // flash on fast scroll. 'scroll' (the default) renders reliably and
        // the image just scrolls with the page — acceptable trade-off.
        backgroundAttachment: 'scroll',
        // Veil never repeats; the zoomed-out image tiles to fill the page
        // (the heavy veil opacity hides the seams).
        backgroundRepeat: 'no-repeat, repeat',
      }}
    >
      {/* Navbar */}
      <nav className={`sticky top-0 z-40 w-full backdrop-blur-md border-b transition-colors duration-300 ${isMatrix ? 'bg-slate-950/70 border-slate-800' : 'bg-white/70 border-slate-200'}`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <Link to="/home" className={`text-lg font-bold flex items-center gap-2 ${isMatrix ? 'text-slate-100' : 'text-slate-900'}`}>
              <span className={`w-8 h-8 rounded-lg overflow-hidden flex items-center justify-center shadow-md ${isMatrix ? 'bg-black ring-1 ring-accent-600/40' : 'bg-black ring-1 ring-blue-600/30'}`}>
                <img src={brainIcon} alt={PROFILE.name} className="w-full h-full object-cover" />
              </span>
              <span className="hidden sm:inline tracking-tight">{PROFILE.name}</span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center space-x-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  aria-current={location.pathname === link.path ? 'page' : undefined}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-all flex items-center gap-2 ${
                    location.pathname === link.path
                      ? isMatrix ? 'bg-accent-900/30 text-accent-400' : 'bg-blue-100 text-blue-600'
                      : isMatrix ? 'text-slate-400 hover:text-accent-300' : 'text-slate-600 hover:text-blue-600'
                  }`}
                >
                  {link.icon}
                  {link.name}
                </Link>
              ))}
              <div className={`h-6 w-px mx-2 ${isMatrix ? 'bg-slate-700' : 'bg-slate-200'}`}></div>
              <button
                onClick={toggleTheme}
                className={`p-2 rounded-full transition-colors ${isMatrix ? 'text-accent-500 hover:bg-accent-900/20' : 'text-slate-600 hover:bg-slate-100'}`}
                title={isMatrix ? 'Switch to Day Mode' : 'Switch to Night Mode'}
              >
                {isMatrix ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center gap-4">
              <button
                onClick={toggleTheme}
                className={`p-2 rounded-full transition-colors ${isMatrix ? 'text-accent-500' : 'text-slate-600'}`}
              >
                {isMatrix ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`${isMatrix ? 'text-slate-300 hover:text-slate-100' : 'text-slate-600 hover:text-slate-900'}`}
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
                  aria-current={location.pathname === link.path ? 'page' : undefined}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block px-3 py-2 rounded-md text-base font-medium flex items-center gap-2 ${
                    location.pathname === link.path
                      ? isMatrix ? 'bg-accent-900/30 text-accent-400' : 'bg-blue-100 text-blue-600'
                      : isMatrix ? 'text-slate-400 hover:text-accent-300' : 'text-slate-600 hover:text-blue-600'
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
      <footer className={`z-10 py-8 text-center text-sm border-t mt-12 ${isMatrix ? 'text-slate-600 border-slate-800' : 'text-slate-500 border-slate-200'}`}>
        <div className="flex justify-center gap-6 mb-4">
          {PROFILE.socials.github && <a aria-label="GitHub" href={PROFILE.socials.github} target="_blank" rel="noreferrer" className={`transition-colors ${isMatrix ? 'hover:text-accent-400' : 'hover:text-blue-600'}`}><Github className="w-5 h-5"/></a>}
          {PROFILE.socials.linkedin && <a aria-label="LinkedIn" href={PROFILE.socials.linkedin} target="_blank" rel="noreferrer" className={`transition-colors ${isMatrix ? 'hover:text-accent-400' : 'hover:text-blue-600'}`}><Linkedin className="w-5 h-5"/></a>}
          {PROFILE.socials.scholar && <a aria-label="Google Scholar" href={PROFILE.socials.scholar} target="_blank" rel="noreferrer" className={`transition-colors ${isMatrix ? 'hover:text-accent-400' : 'hover:text-blue-600'}`}><GraduationCap className="w-5 h-5"/></a>}
        </div>
        <p>&copy; {new Date().getFullYear()} {PROFILE.name}</p>
      </footer>
    </div>
  );
};

// Initial theme: saved choice → OS preference → light.
const getInitialTheme = (): ThemeMode => {
  try {
    const saved = localStorage.getItem('theme');
    if (saved === ThemeMode.MATRIX || saved === ThemeMode.LIGHT) return saved as ThemeMode;
    if (window.matchMedia?.('(prefers-color-scheme: dark)').matches) return ThemeMode.MATRIX;
  } catch { /* SSR / privacy mode */ }
  return ThemeMode.LIGHT;
};

const App: React.FC = () => {
  const [theme, setTheme] = useState<ThemeMode>(getInitialTheme);
  useContentProtection();

  // Persist the theme so a visitor's choice survives refresh/navigation.
  useEffect(() => {
    try { localStorage.setItem('theme', theme); } catch { /* ignore */ }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === ThemeMode.LIGHT ? ThemeMode.MATRIX : ThemeMode.LIGHT));
  };

  return (
    <Router>
      <ScrollToTop />
      <Layout theme={theme} toggleTheme={toggleTheme}>
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<Homepage theme={theme} />} />
          <Route path="/about" element={<About theme={theme} />} />
          <Route path="/publications" element={<Publications theme={theme} />} />
          <Route path="/projects" element={<Projects theme={theme} />} />
          <Route path="/blog" element={<Blog theme={theme} />} />
          <Route path="/blog/:id" element={<BlogPost theme={theme} />} />
          <Route path="/travel" element={<Travel theme={theme} />} />
          <Route path="/gallery" element={<Gallery theme={theme} />} />
          <Route path="/contact" element={<Contact theme={theme} />} />
          <Route path="*" element={<Navigate to="/home" replace />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
