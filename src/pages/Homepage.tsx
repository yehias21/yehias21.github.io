import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ThemeMode } from '../types';
import { PROFILE, PUBLICATIONS, PROJECTS, BLOG_POSTS, EXPERIENCE, NEWS } from '../data/content';
import { FileText, Calendar, Github, Linkedin, GraduationCap, MapPin, ArrowRight, Mail, FileCode, BookText } from 'lucide-react';
import { Room, Frame, Authors } from '../components/GalleryUI';

// "2026-07-07" -> "Jul 7, 2026"; "2026-06" -> "Jun 2026"
const formatDate = (iso: string) => {
  const monthOnly = /^\d{4}-\d{2}$/.test(iso);
  const d = new Date(iso + (monthOnly ? '-01' : '') + 'T00:00:00');
  if (isNaN(d.getTime())) return iso;
  return d.toLocaleDateString('en-US', monthOnly ? { month: 'short', year: 'numeric' } : { month: 'short', day: 'numeric', year: 'numeric' });
};

interface HomepageProps {
  theme: ThemeMode;
}

const Homepage: React.FC<HomepageProps> = ({ theme }) => {
  // Initialize with random quote
  const [quoteIndex, setQuoteIndex] = useState(() =>
    Math.floor(Math.random() * PROFILE.quotes.length)
  );
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [expandedPubId, setExpandedPubId] = useState<string | null>(null);
  const [newsCount, setNewsCount] = useState(3);

  // Honor reduced-motion: skip the auto-rotating name/quote timers (they also
  // re-render the page on a loop), leaving the content static for those users.
  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    !!window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

  // Hero first name alternates between the full name and the nickname,
  // swapping in sync with the glitch ("vibration") animation cycle.
  const FIRST_NAMES = [PROFILE.name.split(' ')[0], 'Yaya'];
  const [nameIndex, setNameIndex] = useState(0);

  // Auto-rotate quotes every 8 seconds
  useEffect(() => {
    if (prefersReducedMotion) return;
    const interval = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % PROFILE.quotes.length);
    }, 8000); // 8 seconds for optimal readability

    return () => clearInterval(interval);
  }, [prefersReducedMotion]);

  // Swap the hero first name every 2s — matches the .glitch-text animation
  // period, so the name changes right after each vibration.
  useEffect(() => {
    if (prefersReducedMotion) return;
    const interval = setInterval(() => {
      setNameIndex((prev) => (prev + 1) % FIRST_NAMES.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [prefersReducedMotion]);

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

  const copyBibtex = async (bibtex: string, pubId: string) => {
    try {
      await navigator.clipboard.writeText(bibtex);
      setCopiedId(pubId);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="relative isolate py-10 space-y-28">
      {/* ---------- Hero: the exhibition entrance ---------- */}
      <section className="relative grid md:grid-cols-[1.05fr_1fr] gap-12 md:gap-10 items-center pt-6 md:min-h-[78vh]">
        {/* Text */}
        <div className="order-2 md:order-1 relative z-10">
          <p className="g-label mb-5">Machine learning · Time series · Dynamical systems</p>
          <h1 className="g-display g-ink text-[3.4rem] sm:text-[4.6rem] lg:text-[5.6rem] leading-[0.95]">
            Hello, I'm<br />
            <span className="italic g-blue">{FIRST_NAMES[nameIndex]}</span>
          </h1>

          <p className="g-serif g-soft text-lg md:text-[1.2rem] leading-relaxed mt-7 max-w-xl">
            {PROFILE.bio}
          </p>

          {/* Quote as a wall inscription (click or press Q) */}
          <button
            type="button"
            onClick={() => setQuoteIndex((prev) => (prev + 1) % PROFILE.quotes.length)}
            className="group block text-left mt-8 max-w-lg"
            title="Press Q for another"
          >
            <span className="g-divider text-xs mb-3 w-40"><span>✦</span></span>
            <span className="block g-display italic text-[1.45rem] leading-snug g-ink min-h-[4.2rem] transition-opacity">
              {PROFILE.quotes[quoteIndex]}
            </span>
            <span className="g-label opacity-0 group-hover:opacity-100 transition-opacity">Press Q for another</span>
          </button>

          <div className="flex flex-wrap items-center gap-3 mt-8">
            <a
              href="https://github.com/yehias21/yehias21.github.io#-research-background"
              target="_blank"
              rel="noreferrer"
              className="g-btn g-btn-solid"
            >
              <BookText className="w-4 h-4" /> My research story
            </a>
            <Link to="/contact" className="g-btn">
              <Calendar className="w-4 h-4" /> Get in touch
            </Link>
          </div>

          <div className="flex gap-3 mt-6">
            {PROFILE.socials.github && (
              <a aria-label="GitHub" title="GitHub" href={PROFILE.socials.github} target="_blank" rel="noreferrer" className="g-icon-btn"><Github className="w-4 h-4" /></a>
            )}
            {PROFILE.socials.linkedin && (
              <a aria-label="LinkedIn" title="LinkedIn" href={PROFILE.socials.linkedin} target="_blank" rel="noreferrer" className="g-icon-btn"><Linkedin className="w-4 h-4" /></a>
            )}
            {PROFILE.socials.scholar && (
              <a aria-label="Google Scholar" title="Google Scholar" href={PROFILE.socials.scholar} target="_blank" rel="noreferrer" className="g-icon-btn"><GraduationCap className="w-4 h-4" /></a>
            )}
            <a aria-label="Email" title="Email" href={`mailto:${PROFILE.email}`} className="g-icon-btn"><Mail className="w-4 h-4" /></a>
          </div>
        </div>

        {/* Portrait: a gilded frame hung over a brushed swatch of The Starry Night */}
        <div className="order-1 md:order-2 relative flex justify-center md:justify-end">
          <div
            className="g-swatch absolute -inset-x-1 -inset-y-8 sm:-inset-x-6 md:-inset-x-10 md:-inset-y-14"
            aria-hidden="true"
          />
          <figure className="relative w-[18.5rem] sm:w-[22rem] md:w-[26rem]">
            <div className="g-frame-gold g-hang">
              <div className="g-mat">
                <img
                  src={PROFILE.image}
                  alt="Yahia Salaheldin Shaaban"
                  className="block w-full aspect-[1110/746] object-cover"
                />
              </div>
            </div>
            <figcaption className="g-placard mx-auto mt-5 w-fit px-4 py-2.5 text-center">
              <span className="g-placard-title italic text-[0.95rem] inline-flex items-center gap-1.5">
                Happy me in
                <svg viewBox="0 0 14 10" aria-label="Brazil" role="img" style={{ width: '1.3em', height: '0.95em', borderRadius: 2, display: 'inline-block' }}>
                  <rect width="14" height="10" fill="#009C3B" />
                  <polygon points="7,0.8 13.2,5 7,9.2 0.8,5" fill="#FFDF00" />
                  <circle cx="7" cy="5" r="2.2" fill="#002776" />
                </svg>
              </span>
              <span className="block g-label mt-1 !text-[0.62rem]">Photograph · Rio de Janeiro</span>
            </figcaption>
          </figure>
        </div>
      </section>

      {/* ---------- Room I: News ---------- */}
      <section>
        <Room n={1} title="News" sub="Recent additions to the collection." />
        <ol className="g-timeline space-y-8 max-w-3xl">
          {NEWS.slice(0, newsCount).map((item) => (
            <li key={item.id} className="relative">
              <span className="g-dot" />
              <div className="flex flex-wrap items-center gap-3 mb-1.5">
                <time className="g-label">{formatDate(item.date)}</time>
                {item.tag && <span className="g-chip">{item.tag}</span>}
              </div>
              <h3 className="g-serif g-ink text-lg font-semibold leading-snug">{item.title}</h3>
              {item.body && <p className="g-serif g-soft leading-relaxed mt-1">{item.body}</p>}
              {item.link && (
                <a href={item.link} target="_blank" rel="noreferrer" className="g-arrow-link mt-2">
                  {item.linkLabel || 'Link'} <ArrowRight className="w-3.5 h-3.5" />
                </a>
              )}
            </li>
          ))}
        </ol>
        {(newsCount < NEWS.length || newsCount > 3) && (
          <div className="mt-8 flex gap-3">
            {newsCount < NEWS.length && (
              <button onClick={() => setNewsCount((c) => Math.min(c + 5, NEWS.length))} className="g-btn g-btn-sm">
                Show more ({NEWS.length - newsCount})
              </button>
            )}
            {newsCount > 3 && (
              <button onClick={() => setNewsCount(3)} className="g-btn g-btn-sm">Show less</button>
            )}
          </div>
        )}
      </section>

      {/* ---------- Room II: Publications ---------- */}
      <section>
        <Room n={2} title="Publications" sub="Selected papers, each with its museum label." to="/publications" />
        <div className="grid md:grid-cols-3 gap-6">
          {PUBLICATIONS.slice(0, 3).map((pub, i) => {
            const isExpanded = expandedPubId === pub.id;
            return (
              <article key={pub.id} className="g-placard p-6 flex flex-col">
                <p className="g-label">No. {String(i + 1).padStart(2, '0')} · {pub.year}</p>
                <h3 className="g-placard-title text-[1.12rem] mt-3">{pub.title}</h3>
                <p className="g-serif italic g-soft text-sm mt-2">{pub.venue}</p>
                <p className="g-muted text-xs leading-relaxed mt-3"><Authors authors={pub.authors} /></p>
                {isExpanded && <p className="g-serif g-soft text-sm leading-relaxed mt-4 border-l-2 pl-3 border-[var(--gold)]">{pub.abstract}</p>}
                <div className="flex flex-wrap gap-2 mt-auto pt-5">
                  <button onClick={() => setExpandedPubId(isExpanded ? null : pub.id)} className="g-btn g-btn-sm">
                    {isExpanded ? 'Hide abstract' : 'Abstract'}
                  </button>
                  {pub.pdf && pub.pdf !== '#' && (
                    <a href={pub.pdf} target="_blank" rel="noreferrer" className="g-btn g-btn-sm"><FileText className="w-3.5 h-3.5" /> Paper</a>
                  )}
                  {pub.link && pub.link !== '#' && (
                    <a href={pub.link} target="_blank" rel="noreferrer" className="g-btn g-btn-sm"><FileCode className="w-3.5 h-3.5" /> Code</a>
                  )}
                  {pub.bibtex && (
                    <button onClick={() => copyBibtex(pub.bibtex!, pub.id)} className="g-btn g-btn-sm">
                      {copiedId === pub.id ? 'Copied' : 'BibTeX'}
                    </button>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* ---------- Room III: Projects ---------- */}
      <section>
        <Room n={3} title="Projects" sub="Works in progress and finished pieces." to="/projects" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {PROJECTS.slice(0, 3).map((proj) => (
            <figure key={proj.id} className="group">
              <Frame className="g-hang aspect-[4/3]">
                <div className="w-full h-full flex items-center justify-center" style={proj.gradient ? { background: proj.gradient } : undefined}>
                  {proj.image
                    ? <img src={proj.image} alt={proj.title} loading="lazy" className="g-art" />
                    : <span className="g-display italic text-white text-2xl px-4 text-center">{proj.placeholderLabel}</span>}
                </div>
              </Frame>
              <figcaption className="mt-5">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="g-display text-[1.7rem] g-ink leading-tight">{proj.title}</h3>
                  {proj.github && (
                    <a href={proj.github} target="_blank" rel="noreferrer" aria-label={`${proj.title} on GitHub`} className="g-icon-btn !w-8 !h-8 shrink-0"><Github className="w-3.5 h-3.5" /></a>
                  )}
                </div>
                <p className="g-label mt-1">{proj.techStack.slice(0, 3).join(' · ')}</p>
                <p className="g-serif g-soft text-[0.95rem] leading-relaxed mt-2 line-clamp-4">{proj.description}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* ---------- Room IV: Experience ---------- */}
      <section>
        <Room n={4} title="Experience" sub="Studios I have worked in." to="/about" toLabel="Full CV" />
        <ol className="grid md:grid-cols-3 gap-6">
          {EXPERIENCE.slice(0, 3).map(exp => (
            <li key={exp.id} className="g-placard p-5">
              <p className="g-label">{exp.period}</p>
              <h3 className="g-placard-title text-lg mt-2">{exp.role}</h3>
              <p className="g-serif italic g-blue mt-0.5">{exp.company}</p>
              <p className="g-muted text-xs mt-2 inline-flex items-center gap-1"><MapPin className="w-3 h-3" /> {exp.location}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* ---------- Room V: Writing ---------- */}
      <section>
        <Room n={5} title="Writing" sub="Long form notes from the blog." to="/blog" />
        <div className="grid md:grid-cols-2 gap-10">
          {BLOG_POSTS.slice(0, 2).map((post) => (
            <Link key={post.id} to={`/blog/${post.id}`} className="group block">
              <Frame kind="wood" className="g-hang aspect-[2/1]" matClassName="!p-0">
                {post.cover
                  ? <img src={post.cover} alt="" loading="lazy" className="g-art g-art-cover" style={{ background: post.coverTint }} />
                  : <div className="w-full h-full" style={{ background: post.coverTint ?? 'var(--wall-2)' }} />}
              </Frame>
              <p className="g-label mt-5">{post.date} · {post.readTime}</p>
              <h3 className="g-display text-[1.9rem] g-ink leading-tight mt-1 group-hover:text-[var(--blue)] transition-colors">{post.title}</h3>
              <p className="g-serif g-soft leading-relaxed mt-2 line-clamp-3">{post.excerpt}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* ---------- Exit: guestbook ---------- */}
      <section className="text-center py-6">
        <p className="g-divider max-w-md mx-auto mb-8"><span>✦</span></p>
        <h2 className="g-display text-[2.6rem] sm:text-[3.2rem] g-ink">Sign the guestbook</h2>
        <p className="g-serif g-soft text-lg mt-3 max-w-md mx-auto">Open to collaborate. Just ping me.</p>
        <Link to="/contact" className="g-btn g-btn-solid mt-8">
          <Calendar className="w-4 h-4" /> Get in touch
        </Link>
      </section>
    </div>
  );
};

export default Homepage;
