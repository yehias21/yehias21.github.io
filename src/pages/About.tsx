import React from 'react';
import { ThemeMode } from '../types';
import { EDUCATION, EXPERIENCE, SERVICE, AWARDS, CERTIFICATES } from '../data/content';
import { MapPin, ExternalLink } from 'lucide-react';
import { Room } from '../components/GalleryUI';

interface AboutProps {
  theme: ThemeMode;
}

// A sub-room heading inside the About page.
const Wing: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <section>
    <div className="flex items-baseline gap-4 mb-6">
      <h2 className="g-display text-[2.2rem] g-ink leading-none">{title}</h2>
      <span className="flex-1 h-px bg-[var(--rule)]" />
    </div>
    {children}
  </section>
);

const TitleLink: React.FC<{ title: string; href?: string }> = ({ title, href }) =>
  href ? (
    <a href={href} target="_blank" rel="noreferrer" className="g-placard-title g-link inline-flex items-center gap-1">
      {title} <ExternalLink className="w-3 h-3" />
    </a>
  ) : (
    <span className="g-placard-title">{title}</span>
  );

const About: React.FC<AboutProps> = () => (
  <div className="py-12">
    <Room as="h1" label="The artist" title="About me" sub="Education, studios, and the honors along the way." />

    <div className="grid lg:grid-cols-[1fr_20rem] gap-12">
      <div className="space-y-16">
        <Wing title="Education">
          <div className="space-y-5">
            {EDUCATION.map(edu => (
              <article key={edu.id} className="g-placard p-6">
                <p className="g-label">{edu.period} · {edu.location}</p>
                <h3 className="g-placard-title text-xl mt-2">{edu.institution}</h3>
                <p className="g-serif italic g-blue mt-1">{edu.degree}</p>
                {edu.details && (
                  <ul className="g-serif g-soft text-[0.95rem] leading-relaxed mt-3 space-y-1.5 list-disc pl-5 marker:text-[var(--gold)]">
                    {edu.details.map((d, i) => <li key={i}>{d}</li>)}
                  </ul>
                )}
              </article>
            ))}
          </div>
        </Wing>

        <Wing title="Experience">
          <ol className="g-timeline space-y-10">
            {EXPERIENCE.map(exp => (
              <li key={exp.id} className="relative">
                <span className="g-dot" />
                <p className="g-label">{exp.period}</p>
                <h3 className="g-placard-title text-xl mt-1.5">{exp.role}</h3>
                <p className="g-serif italic g-blue">
                  {exp.company}
                  <span className="g-muted not-italic text-xs ml-2 inline-flex items-center gap-1 g-sans"><MapPin className="w-3 h-3" /> {exp.location}</span>
                </p>
                <ul className="g-serif g-soft text-[0.95rem] leading-relaxed mt-2 space-y-1.5 list-disc pl-5 marker:text-[var(--gold)]">
                  {exp.description.map((d, i) => <li key={i}>{d}</li>)}
                </ul>
              </li>
            ))}
          </ol>
        </Wing>

        <Wing title="Awards & honors">
          <div className="grid sm:grid-cols-2 gap-4">
            {AWARDS.map(a => (
              <article key={a.id} className="g-placard p-5">
                {a.links ? (
                  <span className="inline-flex flex-wrap gap-x-3">
                    {a.links.map(lk => <TitleLink key={lk.url} title={lk.label} href={lk.url} />)}
                  </span>
                ) : (
                  <TitleLink title={a.title} href={a.link} />
                )}
                <p className="g-serif g-soft text-sm leading-relaxed mt-1.5">{a.description}</p>
              </article>
            ))}
          </div>
        </Wing>

        <Wing title="Service">
          <ul className="space-y-3">
            {SERVICE.map(s => (
              <li key={s.id} className="g-serif g-soft">
                <span className="g-ink font-semibold">{s.role}</span>, {s.venue} <span className="g-muted">({s.year})</span>
                {s.note && <span className="block text-sm g-muted">{s.note}</span>}
              </li>
            ))}
          </ul>
        </Wing>

        <Wing title="Certificates & training">
          <div className="space-y-4">
            {CERTIFICATES.map(c => (
              <article key={c.id}>
                <TitleLink title={c.title} href={c.link} />
                <p className="g-serif g-soft text-sm leading-relaxed mt-1">{c.description}</p>
              </article>
            ))}
          </div>
        </Wing>
      </div>

      {/* Artist statement, hung in its own frame */}
      <aside className="lg:sticky lg:top-24 self-start">
        <div className="g-frame-gold">
          <div className="g-mat" style={{ background: 'var(--placard)' }}>
            <p className="g-label">Artist statement</p>
            <p className="g-display italic text-[1.55rem] leading-snug g-ink mt-3">
              Almost anything becomes fascinating once you dig deep enough.
            </p>
            <p className="g-serif g-soft text-[0.95rem] leading-relaxed mt-4">
              I am a curious scientist. Research, for me, is that deep dig: a disciplined way to turn curiosity into something useful.
            </p>
            <p className="g-serif g-soft text-[0.95rem] leading-relaxed mt-3">
              I want to leave a lasting positive imprint on the communities I am part of: work that outlasts me, creates opportunity for people who would otherwise not have it, and turns hard problems into tools others can build on.
            </p>
            <p className="g-muted text-xs italic mt-4">
              Inspired by Veritasium's take on purpose,{' '}
              <a href="https://www.youtube.com/watch?v=piHGnG4LsmQ" target="_blank" rel="noopener noreferrer" className="g-link">watch here</a>.
            </p>
          </div>
        </div>
      </aside>
    </div>
  </div>
);

export default About;
