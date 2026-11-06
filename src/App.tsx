import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link, useLocation } from 'react-router-dom';
import { ThemeMode } from './types';
import { PROFILE } from './data/content';
import brainIcon from './assets/figures/brain-icon.png';
import Homepage from './pages/Homepage';
import About from './pages/About';
import Publications from './pages/Publications';
import Projects from './pages/Projects';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Contact from './pages/Contact';
import Travel from './pages/Travel';
import Gallery from './pages/Gallery';
import { Menu, X, Github, Linkedin, GraduationCap, Sun, Moon } from 'lucide-react';
import './styles/gallery.css';
import { PAINTINGS, pickPainting } from './data/paintings';
import { titleFor } from './data/seo';

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

// "Yahia Salaheldin Shaaban" -> "Yahia Shaaban" for narrower navbars.
const nameParts = PROFILE.name.split(' ');
const shortName = nameParts.length > 2 ? `${nameParts[0]} ${nameParts[nameParts.length - 1]}` : PROFILE.name;

const Layout: React.FC<{ children: React.ReactNode; theme: ThemeMode; toggleTheme: () => void }> = ({ children, theme, toggleTheme }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  // GitHub Pages serves pre-rendered pages at "/about/"; treat it as "/about".
  const pathname = location.pathname.replace(/\/+$/, '') || '/';
  // A different Van Gogh on every visit; the footer button shuffles it.
  const [paintingIdx, setPaintingIdx] = useState(pickPainting);
  const painting = PAINTINGS[paintingIdx];
  const shufflePainting = () => setPaintingIdx(i => (i + 1 + Math.floor(Math.random() * (PAINTINGS.length - 1))) % PAINTINGS.length);
  const isMatrix = theme === ThemeMode.MATRIX;
  const isBlog = pathname === '/blog' || pathname.startsWith('/blog/');
  const wall = isMatrix ? '#0d1220' : '#f5f3ee';

  // Sync the html/body background to the current wall color so iOS overscroll
  // and fast-scroll repaints never flash a different color.
  useEffect(() => {
    document.documentElement.style.backgroundColor = wall;
    document.body.style.backgroundColor = wall;
    document.body.style.color = isMatrix ? '#eef0f6' : '#141823';
    document.documentElement.style.overscrollBehavior = 'none';
    document.body.style.overscrollBehavior = 'none';
  }, [isMatrix, wall]);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    const t = titleFor(pathname);
    if (t) document.title = t;
  }, [pathname]);

  const navLinks = [
    { name: 'Home', path: '/home' },
    { name: 'About', path: '/about' },
    { name: 'Publications', path: '/publications' },
    { name: 'Projects', path: '/projects' },
    { name: 'Blog', path: '/blog' },
    { name: 'Travel', path: '/travel' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Contact', path: '/contact' },
  ];
  const isActive = (path: string) => pathname === path || (path === '/blog' && isBlog);

  return (
    <div
      className={`g-wall min-h-screen relative flex flex-col ${isMatrix ? 'dark' : ''}`}
      style={{ ['--painting' as any]: `url(${painting.src})` }}
    >
      <div className="g-painting" style={{ backgroundImage: `url(${painting.src})` }} aria-hidden="true" />
      <div className="g-veil" aria-hidden="true" />

      {/* Navbar */}
      <nav
        className="sticky top-0 z-40 w-full border-b g-rule backdrop-blur-md"
        style={{ background: isMatrix ? 'rgba(13,18,32,.86)' : 'rgba(245,243,238,.86)' }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between gap-6 h-16 items-center">
            <Link to="/home" className="flex items-center gap-3 g-ink">
              <span className="w-9 h-9 rounded-full overflow-hidden flex items-center justify-center bg-black ring-2 ring-[var(--gold)] ring-offset-2 ring-offset-[var(--wall)]">
                <img src={brainIcon} alt="" className="w-full h-full object-cover" />
              </span>
              <span className="hidden 2xl:inline whitespace-nowrap g-display text-[1.45rem]">{PROFILE.name}</span>
              <span className="hidden sm:inline 2xl:hidden whitespace-nowrap g-display text-[1.45rem]">{shortName}</span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  aria-current={isActive(link.path) ? 'page' : undefined}
                  className={`g-nav-link transition-colors ${isActive(link.path) ? 'g-ink' : 'g-muted hover:text-[var(--ink)]'}`}
                >
                  {link.name}
                </Link>
              ))}
              <span className="h-6 w-px mx-3 bg-[var(--rule)]" />
              <button
                onClick={toggleTheme}
                className="g-icon-btn !w-9 !h-9"
                title={isMatrix ? 'Switch to day gallery' : 'Switch to night gallery'}
                aria-label={isMatrix ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                {isMatrix ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>
            </div>

            {/* Mobile controls */}
            <div className="lg:hidden flex items-center gap-3">
              <button
                onClick={toggleTheme}
                className="g-icon-btn !w-9 !h-9"
                aria-label={isMatrix ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                {isMatrix ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="g-icon-btn !w-9 !h-9"
                aria-label="Menu"
                aria-expanded={isMobileMenuOpen}
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t g-rule" style={{ background: 'var(--wall)' }}>
            <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 grid grid-cols-2 gap-x-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  aria-current={isActive(link.path) ? 'page' : undefined}
                  className={`g-display text-2xl py-2 border-b g-rule ${isActive(link.path) ? 'g-blue' : 'g-ink'}`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="relative flex-grow z-10 w-full mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        {children}
      </main>

      {/* Footer */}
      <footer className="relative z-10 pt-10 pb-10 mt-16 border-t g-rule" style={{ background: isMatrix ? 'rgba(13,18,32,.9)' : 'rgba(245,243,238,.9)' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="g-display text-xl g-ink">{PROFILE.name}</p>
          <div className="flex gap-3">
            {PROFILE.socials.github && <a aria-label="GitHub" href={PROFILE.socials.github} target="_blank" rel="noreferrer" className="g-icon-btn"><Github className="w-4 h-4"/></a>}
            {PROFILE.socials.linkedin && <a aria-label="LinkedIn" href={PROFILE.socials.linkedin} target="_blank" rel="noreferrer" className="g-icon-btn"><Linkedin className="w-4 h-4"/></a>}
            {PROFILE.socials.scholar && <a aria-label="Google Scholar" href={PROFILE.socials.scholar} target="_blank" rel="noreferrer" className="g-icon-btn"><GraduationCap className="w-4 h-4"/></a>}
          </div>
          <p className="g-label">&copy; {new Date().getFullYear()}</p>
        </div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 flex flex-wrap items-center justify-center sm:justify-start gap-x-3 gap-y-1">
          <span className="g-serif italic g-soft text-sm">
            On the wall: Vincent van Gogh, <span className="g-ink">{painting.title}</span> ({painting.year})
          </span>
          <button onClick={shufflePainting} className="g-btn g-btn-sm">Next painting</button>
        </div>
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

// The whole app minus the router, so the same tree can be rendered in the
// browser (BrowserRouter) and at build time for pre-rendering (StaticRouter).
export const AppRoutes: React.FC = () => {
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
    <>
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
    </>
  );
};

const App: React.FC = () => (
  <Router>
    <AppRoutes />
  </Router>
);

export default App;
