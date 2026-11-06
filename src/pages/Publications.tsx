import React, { useMemo, useState } from 'react';
import { ThemeMode } from '../types';
import { PUBLICATIONS } from '../data/content';
import { ChevronDown, ChevronUp, FileText, FileCode, BookText, X as XIcon } from 'lucide-react';
import { Room, Authors } from '../components/GalleryUI';

interface PublicationsProps {
  theme: ThemeMode;
}

const Publications: React.FC<PublicationsProps> = ({ theme }) => {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const copyBibtex = async (bibtex: string, pubId: string) => {
    try {
      await navigator.clipboard.writeText(bibtex);
      setCopiedId(pubId);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  // Build tag universe once.
  const allTags = useMemo(() => {
    const set = new Set<string>();
    PUBLICATIONS.forEach(p => p.tags.forEach(t => set.add(t)));
    return Array.from(set).sort();
  }, []);

  // Filter by tag, then group by year (descending).
  const grouped = useMemo(() => {
    const filtered = activeTag ? PUBLICATIONS.filter(p => p.tags.includes(activeTag)) : PUBLICATIONS;
    const byYear: Record<number, typeof PUBLICATIONS> = {};
    filtered.forEach(p => {
      (byYear[p.year] ||= [] as any).push(p);
    });
    return Object.entries(byYear)
      .map(([y, list]) => ({ year: Number(y), list }))
      .sort((a, b) => b.year - a.year);
  }, [activeTag]);

  return (
    <div className="py-12">
      <Room as="h1" label="The collection" title="Publications" sub={`${PUBLICATIONS.length} papers, newest first. Filter by theme below.`} />

      {/* Theme filter */}
      <div className="flex flex-wrap items-center gap-2 mb-12">
        <span className="g-label mr-1">Theme</span>
        {allTags.map(tag => {
          const active = activeTag === tag;
          return (
            <button
              key={tag}
              onClick={() => setActiveTag(active ? null : tag)}
              aria-pressed={active}
              className={`g-chip ${active ? 'g-chip-active' : 'g-chip-outline'}`}
            >
              {tag}
            </button>
          );
        })}
        {activeTag && (
          <button onClick={() => setActiveTag(null)} className="g-chip g-chip-outline inline-flex items-center gap-1">
            <XIcon className="w-3 h-3" /> clear
          </button>
        )}
      </div>

      {grouped.length === 0 && (
        <p className="g-serif italic g-muted text-center py-8">No publications match this theme.</p>
      )}

      {grouped.map(({ year, list }) => (
        <section key={year} className="mb-14">
          <div className="flex items-baseline gap-4 mb-6">
            <h2 className="g-display text-[2.6rem] g-ink leading-none">{year}</h2>
            <span className="flex-1 h-px bg-[var(--rule)]" />
            <span className="g-label">{list.length} work{list.length === 1 ? '' : 's'}</span>
          </div>
          <div className="space-y-6">
            {list.map((pub) => {
              const open = expandedId === pub.id;
              return (
                <article key={pub.id} className="g-placard p-6 md:p-8 grid md:grid-cols-[1fr_auto] gap-x-8 gap-y-4">
                  <div>
                    <p className="g-label">{pub.venue}</p>
                    <h3 className="g-placard-title text-[1.25rem] md:text-[1.35rem] mt-2">{pub.title}</h3>
                    {pub.comment && <span className="g-chip mt-2">{pub.comment}</span>}
                    <p className="g-muted text-sm leading-relaxed mt-2"><Authors authors={pub.authors} /></p>
                    {open && (
                      <p className="g-serif g-soft leading-relaxed mt-4 border-l-2 pl-4 border-[var(--gold)]">{pub.abstract}</p>
                    )}
                    <div className="flex flex-wrap gap-2 mt-4">
                      {pub.tags.map(tag => (
                        <button key={tag} onClick={() => setActiveTag(tag)} className="g-chip">{tag}</button>
                      ))}
                    </div>
                  </div>
                  <div className="flex md:flex-col flex-wrap gap-2 md:items-stretch md:min-w-[9rem]">
                    <button onClick={() => setExpandedId(open ? null : pub.id)} aria-expanded={open} className="g-btn g-btn-sm justify-center">
                      {open ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />} Abstract
                    </button>
                    {pub.pdf && pub.pdf !== '#' && (
                      <a href={pub.pdf} target="_blank" rel="noreferrer" className="g-btn g-btn-sm justify-center"><FileText className="w-3.5 h-3.5" /> Paper</a>
                    )}
                    {pub.link && pub.link !== '#' && (
                      <a href={pub.link} target="_blank" rel="noreferrer" className="g-btn g-btn-sm justify-center"><FileCode className="w-3.5 h-3.5" /> Code</a>
                    )}
                    {pub.bibtex && pub.bibtex !== '#' && (
                      <button onClick={() => copyBibtex(pub.bibtex!, pub.id)} className="g-btn g-btn-sm justify-center">
                        <BookText className="w-3.5 h-3.5" /> {copiedId === pub.id ? 'Copied' : 'BibTeX'}
                      </button>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
};

export default Publications;
