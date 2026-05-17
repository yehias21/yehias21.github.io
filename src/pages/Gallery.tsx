import React, { useState } from 'react';
import { ThemeMode } from '../types';
import { GALLERY, ROOM_ENCOUNTERS } from '../data/content';
import { Camera, X, ChevronLeft, ChevronRight, Landmark } from 'lucide-react';

interface GalleryProps {
  theme: ThemeMode;
}

const Gallery: React.FC<GalleryProps> = ({ theme }) => {
  const isMatrix = theme === ThemeMode.MATRIX;

  // Index of the photo open in the lightbox, or null when closed.
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  const showPrev = () =>
    setActiveIdx(i => (i === null ? i : (i - 1 + GALLERY.length) % GALLERY.length));
  const showNext = () =>
    setActiveIdx(i => (i === null ? i : (i + 1) % GALLERY.length));

  const activeItem = activeIdx === null ? null : GALLERY[activeIdx];

  // Block right-click / long-press so the photos can't be casually saved.
  // Note: this is a deterrent only — images are still fetched over the network
  // and cannot be made truly undownloadable in a browser.
  const blockSave = (e: React.MouseEvent) => e.preventDefault();

  return (
    <div className="py-12 animate-in fade-in slide-in-from-bottom-4 duration-500 select-none" onContextMenu={blockSave}>
      <h2 className={`text-3xl font-bold mb-3 flex items-center gap-3 ${isMatrix ? 'text-slate-100' : 'text-slate-900'}`}>
        <Camera className={`w-8 h-8 ${isMatrix ? 'text-accent-500' : 'text-blue-600'}`} />
        Top Academics Gallery
      </h2>
      <p className={`mb-8 text-sm ${isMatrix ? 'text-slate-400' : 'text-slate-600'}`}>
        Photos with researchers and academics I've had the chance to meet.
      </p>

      {GALLERY.length === 0 ? (
        // Empty state — shown until the GALLERY array in src/data/content.ts is filled.
        <div className={`rounded-xl border border-dashed p-12 text-center ${isMatrix ? 'bg-slate-900 border-slate-700 text-slate-400' : 'bg-slate-50 border-slate-300 text-slate-500'}`}>
          <Camera className={`w-10 h-10 mx-auto mb-4 ${isMatrix ? 'text-slate-600' : 'text-slate-400'}`} />
          <p className="text-sm">
            No photos yet — add entries to the <span className="font-mono">GALLERY</span> array
            in <span className="font-mono">src/data/content.ts</span>.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {GALLERY.map((item, idx) => (
            <button
              key={item.id}
              type="button"
              aria-label={item.caption}
              onClick={() => setActiveIdx(idx)}
              className={`group relative rounded-xl overflow-hidden border transition-all duration-300 aspect-square ${
                isMatrix
                  ? 'bg-slate-900 border-slate-800 hover:border-accent-800 hover:shadow-2xl hover:shadow-accent-900/20'
                  : 'bg-white border-slate-200 hover:border-blue-300 hover:shadow-2xl'
              }`}
            >
              {/* Photo rendered as a CSS background — no <img> element, so the
                  browser's "Save image as…" affordance never appears. */}
              <div
                className={`w-full h-full bg-center bg-cover transition-transform duration-500 group-hover:scale-105 ${isMatrix ? 'opacity-90' : ''}`}
                style={{ backgroundImage: `url(${item.src})` }}
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 to-transparent p-3 pt-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="text-xs text-white text-left leading-snug">{item.caption}</p>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Heads of state & notable figures shared a room with — no photo, just the story. */}
      {ROOM_ENCOUNTERS.length > 0 && (
        <section className="mt-16">
          <h3 className={`text-2xl font-bold mb-2 flex items-center gap-3 ${isMatrix ? 'text-slate-100' : 'text-slate-900'}`}>
            <Landmark className={`w-7 h-7 ${isMatrix ? 'text-accent-500' : 'text-blue-600'}`} />
            In the Same Room
          </h3>
          <p className={`mb-6 text-sm ${isMatrix ? 'text-slate-400' : 'text-slate-600'}`}>
            Heads of state and notable figures I've shared a room with — no photo, just the story.
          </p>
          <div className="space-y-5">
            {ROOM_ENCOUNTERS.map(enc => (
              <div key={enc.id} className={`border-l-2 pl-4 ${isMatrix ? 'border-slate-700' : 'border-slate-200'}`}>
                <h4 className={`font-bold text-lg ${isMatrix ? 'text-slate-100' : 'text-slate-900'}`}>{enc.name}</h4>
                {enc.title && (
                  <div className={`text-sm font-semibold ${isMatrix ? 'text-accent-400' : 'text-blue-600'}`}>{enc.title}</div>
                )}
                <p className={`text-sm mt-1 ${isMatrix ? 'text-slate-400' : 'text-slate-600'}`}>{enc.note}</p>
              </div>
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
              className="w-[90vw] max-w-4xl h-[78vh] bg-center bg-contain bg-no-repeat rounded-lg shadow-2xl"
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
