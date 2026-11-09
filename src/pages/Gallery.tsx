import React, { useState, useEffect } from 'react';
import { ThemeMode } from '../types';
import { GALLERY as GALLERY_ITEMS, ROOM_ENCOUNTERS } from '../data/content';

// Newest photos first (stable, so photos from the same event keep their order).
const GALLERY = [...GALLERY_ITEMS].sort((a, b) => (b.date ?? '').localeCompare(a.date ?? ''));

// "2026-04" -> "Apr 2026"
const monthYear = (d?: string) => {
  if (!d) return '';
  const [y, m] = d.split('-').map(Number);
  return new Date(y, (m || 1) - 1, 1).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
};
import { Camera, X, ChevronLeft, ChevronRight, EyeOff } from 'lucide-react';
import { Room } from '../components/GalleryUI';

interface GalleryProps {
  theme: ThemeMode;
}

const Gallery: React.FC<GalleryProps> = ({ theme }) => {
  // Natural aspect ratio of each photo, so every frame fits its picture
  // exactly (no cropping of faces). Falls back to 4:5 until measured.
  const [ratios, setRatios] = useState<Record<string, number>>({});
  useEffect(() => {
    let alive = true;
    GALLERY.forEach(item => {
      const img = new Image();
      img.onload = () => {
        if (alive && img.naturalWidth && img.naturalHeight) {
          setRatios(r => ({ ...r, [item.id]: img.naturalWidth / img.naturalHeight }));
        }
      };
      img.src = item.src;
    });
    return () => { alive = false; };
  }, []);

  // Index of the photo open in the lightbox, or null when closed.
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  const showPrev = () =>
    setActiveIdx(i => (i === null ? i : (i - 1 + GALLERY.length) % GALLERY.length));
  const showNext = () =>
    setActiveIdx(i => (i === null ? i : (i + 1) % GALLERY.length));

  const activeItem = activeIdx === null ? null : GALLERY[activeIdx];

  // Keyboard control for the lightbox: Escape closes, arrows navigate.
  useEffect(() => {
    if (activeIdx === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveIdx(null);
      else if (e.key === 'ArrowLeft') showPrev();
      else if (e.key === 'ArrowRight') showNext();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [activeIdx]);

  // Block right-click / long-press so the photos can't be casually saved.
  // Note: this is a deterrent only — images are still fetched over the network
  // and cannot be made truly undownloadable in a browser.
  const blockSave = (e: React.MouseEvent) => e.preventDefault();

  // Screenshot deterrent: blur every photo whenever the page loses focus
  // (screenshot utilities and OS capture overlays trip a window blur /
  // visibility change) or PrintScreen is pressed. A browser cannot truly
  // prevent an OS-level screenshot — this only raises the effort.
  const [shielded, setShielded] = useState(false);

  useEffect(() => {
    const shield = () => setShielded(true);
    const unshield = () => setShielded(false);
    const onVisibility = () => (document.hidden ? shield() : unshield());
    const onPrintScreen = (e: KeyboardEvent) => {
      if (e.key !== 'PrintScreen') return;
      // Briefly blur the photos on PrintScreen. We deliberately do NOT touch
      // the visitor's clipboard — wiping it destroys data they copied elsewhere.
      shield();
      window.setTimeout(unshield, 1500);
    };
    window.addEventListener('blur', shield);
    window.addEventListener('focus', unshield);
    document.addEventListener('visibilitychange', onVisibility);
    window.addEventListener('keydown', onPrintScreen);
    window.addEventListener('keyup', onPrintScreen);
    return () => {
      window.removeEventListener('blur', shield);
      window.removeEventListener('focus', unshield);
      document.removeEventListener('visibilitychange', onVisibility);
      window.removeEventListener('keydown', onPrintScreen);
      window.removeEventListener('keyup', onPrintScreen);
    };
  }, []);

  return (
    <div className="py-12 select-none" onContextMenu={blockSave}>
      <Room as="h1" label="The portrait hall" title="Photographic odyssey" sub="Photos with researchers and academics I've had the chance to meet." />

      {GALLERY.length === 0 ? (
        <div className="g-placard p-12 text-center">
          <Camera className="w-10 h-10 mx-auto mb-4 g-muted" />
          <p className="g-serif g-soft">No photos yet: add entries to the <span className="g-mono">GALLERY</span> array in <span className="g-mono">src/data/content.ts</span>.</p>
        </div>
      ) : (
        <div className="relative">
          <div className={`flex flex-wrap gap-x-6 gap-y-8 sm:gap-x-8 transition-[filter] duration-150 ${shielded ? 'blur-2xl pointer-events-none' : ''}`}>
            {GALLERY.map((item, idx) => {
              const r = item.ratio ?? ratios[item.id] ?? 1;
              return (
                <figure
                  key={item.id}
                  className="flex flex-col"
                  style={{ flexGrow: r, flexBasis: `${r * 15}rem`, maxWidth: `${r * 24}rem` }}
                >
                  <button
                    type="button"
                    aria-label={item.caption}
                    onClick={() => setActiveIdx(idx)}
                    className={`block w-full g-hang ${idx % 4 === 0 ? 'g-frame-gold' : 'g-frame-wood'}`}
                  >
                    <span className="g-mat g-mat-tight block">
                      {/* Photo as a CSS background (no <img>), so there is no "Save image as". */}
                      <span
                        className="block w-full bg-center bg-cover"
                        style={{ backgroundImage: `url(${item.src})`, aspectRatio: String(r) }}
                      />
                    </span>
                  </button>
                  <figcaption className="mt-3 text-center px-1">
                    <span className="block g-serif italic g-soft text-sm leading-snug">{item.caption}</span>
                    {item.date && <span className="block g-label mt-1 !text-[0.62rem]">{monthYear(item.date)}</span>}
                  </figcaption>
                </figure>
              );
            })}
            {/* Keeps the last row from stretching its photos to full width. */}
            <span aria-hidden="true" style={{ flexGrow: 10, flexBasis: 0 }} />
          </div>
          {shielded && (
            <div className="absolute inset-0 flex items-start justify-center pt-24">
              <div className="g-placard flex items-center gap-2 px-4 py-2 text-sm g-soft">
                <EyeOff className="w-4 h-4" /> Photos hidden while the window is inactive
              </div>
            </div>
          )}
        </div>
      )}

      {ROOM_ENCOUNTERS.length > 0 && (
        <section className="mt-24">
          <Room label="Wall text" title="In the same room" sub="Heads of state and notable figures I've shared a room with. No photo, just the story." />
          <div className="grid sm:grid-cols-2 gap-5">
            {ROOM_ENCOUNTERS.map(enc => (
              <article key={enc.id} className="g-placard p-6">
                <h3 className="g-display text-[1.6rem] g-ink leading-tight">{enc.name}</h3>
                {enc.title && <p className="g-label mt-1">{enc.title}</p>}
                <p className="g-serif g-soft text-[0.95rem] leading-relaxed mt-3">{enc.note}</p>
              </article>
            ))}
          </div>
        </section>
      )}

      {/* Lightbox */}
      {activeItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm p-4 animate-in fade-in duration-200"
          onClick={() => setActiveIdx(null)}
          onContextMenu={blockSave}
        >
          <button
            type="button"
            aria-label="Close"
            onClick={() => setActiveIdx(null)}
            className="absolute top-4 right-4 p-2 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          {GALLERY.length > 1 && (
            <>
              <button
                type="button"
                aria-label="Previous photo"
                onClick={(e) => { e.stopPropagation(); showPrev(); }}
                className="absolute left-2 sm:left-6 p-2 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-colors"
              >
                <ChevronLeft className="w-8 h-8" />
              </button>
              <button
                type="button"
                aria-label="Next photo"
                onClick={(e) => { e.stopPropagation(); showNext(); }}
                className="absolute right-2 sm:right-6 p-2 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-colors"
              >
                <ChevronRight className="w-8 h-8" />
              </button>
            </>
          )}

          <figure className="flex flex-col items-center" onClick={(e) => e.stopPropagation()}>
            {/* Same CSS-background approach as the grid — no saveable <img>. */}
            <div
              className={`w-[90vw] max-w-4xl h-[78vh] bg-center bg-contain bg-no-repeat rounded-lg shadow-2xl transition-[filter] duration-150 ${shielded ? 'blur-2xl' : ''}`}
              style={{ backgroundImage: `url(${activeItem.src})` }}
              role="img"
              aria-label={activeItem.caption}
            />
            <figcaption className="mt-3 text-sm text-white/90 text-center">{activeItem.caption}</figcaption>
          </figure>
        </div>
      )}
    </div>
  );
};

export default Gallery;
