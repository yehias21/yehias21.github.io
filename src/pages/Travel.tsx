import React, { useEffect, useMemo, useRef, useState } from 'react';
import { geoEqualEarth, geoPath } from 'd3-geo';
import { feature } from 'topojson-client';
import type { FeatureCollection, Feature, Geometry } from 'geojson';
import { MapPin, Plane, ZoomIn, ZoomOut, Maximize2 } from 'lucide-react';
import { ThemeMode, VisitedCountry } from '../types';
import { VISITED_COUNTRIES } from '../data/content';
import worldTopo from '../assets/data/countries-110m.json';

interface TravelProps {
  theme: ThemeMode;
}

const MAP_W = 960;
const MAP_H = 500;
const MIN_ZOOM_W = MAP_W / 12; // 12x max
const ZOOM_STEP = 1.6;

// Half-life controls how fast the blue fades after a visit.
// 24 months = 2 years for intensity to halve. Tweak to taste.
const HALFLIFE_MONTHS = 24;

// Convert "YYYY-MM" (or YYYY-MM-DD) and current date to elapsed months (>= 0).
const monthsSince = (lastVisit: string, now: Date): number => {
  const [yStr, mStr] = lastVisit.split('-');
  const y = parseInt(yStr, 10);
  const m = parseInt(mStr, 10) - 1; // 0-indexed
  const last = new Date(y, m, 1);
  const diff =
    (now.getFullYear() - last.getFullYear()) * 12 +
    (now.getMonth() - last.getMonth());
  return Math.max(0, diff);
};

// Exponential decay: intensity in (0, 1], 1.0 at visit time, half at HALFLIFE_MONTHS.
const visitIntensity = (country: VisitedCountry, now: Date): number => {
  if (country.permanent) return 1;
  const months = monthsSince(country.lastVisit, now);
  return Math.exp((-Math.LN2 * months) / HALFLIFE_MONTHS);
};

// Interpolate between two RGB hex colors by t in [0, 1].
const lerpHex = (a: string, b: string, t: number): string => {
  const ah = parseInt(a.slice(1), 16);
  const bh = parseInt(b.slice(1), 16);
  const ar = (ah >> 16) & 0xff, ag = (ah >> 8) & 0xff, ab = ah & 0xff;
  const br = (bh >> 16) & 0xff, bg = (bh >> 8) & 0xff, bb = bh & 0xff;
  const r = Math.round(ar + (br - ar) * t);
  const g = Math.round(ag + (bg - ag) * t);
  const bl = Math.round(ab + (bb - ab) * t);
  return `#${((r << 16) | (g << 8) | bl).toString(16).padStart(6, '0')}`;
};

interface CountryFeature extends Feature<Geometry, { name: string }> {
  id?: string | number;
}

interface ViewBox { x: number; y: number; w: number; h: number; }
const INITIAL_VB: ViewBox = { x: 0, y: 0, w: MAP_W, h: MAP_H };

const clampVb = (vb: ViewBox): ViewBox => ({
  x: Math.max(0, Math.min(MAP_W - vb.w, vb.x)),
  y: Math.max(0, Math.min(MAP_H - vb.h, vb.y)),
  w: vb.w,
  h: vb.h,
});

const Travel: React.FC<TravelProps> = ({ theme }) => {
  const isMatrix = theme === ThemeMode.MATRIX;
  // Split tooltip state so crossing country boundaries (mouseenter B while
  // mousemove for A is still scheduled) can't overwrite new content with stale.
  const [tipPos, setTipPos] = useState<{ x: number; y: number } | null>(null);
  const [tipContent, setTipContent] = useState<React.ReactNode>(null);
  const now = useMemo(() => new Date(), []);

  // Zoom / pan state. Driving the svg viewBox lets stroke widths scale
  // naturally (thicker when zoomed in) and keeps all geometry math simple.
  const [vb, setVb] = useState<ViewBox>(INITIAL_VB);
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef<{ mx: number; my: number; vx: number; vy: number } | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);
  const isZoomed = vb.w < MAP_W - 0.5;

  const visitedById = useMemo(() => {
    const map = new Map<string, VisitedCountry>();
    VISITED_COUNTRIES.forEach(c => {
      map.set(c.id, c);
      map.set(String(parseInt(c.id, 10)), c);
    });
    return map;
  }, []);

  const { features, pathFor, projectPoint } = useMemo(() => {
    const topo = worldTopo as any;
    const fc = feature(topo, topo.objects.countries) as unknown as FeatureCollection<Geometry, { name: string }>;
    const projection = geoEqualEarth().fitSize([MAP_W, MAP_H], fc);
    const gp = geoPath(projection);
    return {
      features: fc.features as CountryFeature[],
      pathFor: (f: CountryFeature) => gp(f) || '',
      projectPoint: (lon: number, lat: number) => projection([lon, lat]) as [number, number] | null,
    };
  }, []);

  const fillFaded = isMatrix ? '#0b2540' : '#dbeafe';
  const fillFresh = isMatrix ? '#3b82f6' : '#1d4ed8';
  const fillUnvisited = isMatrix ? '#1f2937' : '#e2e8f0';
  const strokeColor = isMatrix ? '#0f172a' : '#ffffff';
  const cityColor = isMatrix ? '#f87171' : '#dc2626';

  const posFromEvent = (e: React.MouseEvent) => {
    const rect = (e.currentTarget as Element).ownerSVGElement?.getBoundingClientRect()
      ?? (e.currentTarget as Element).getBoundingClientRect();
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  };

  const showTip = (e: React.MouseEvent, content: React.ReactNode) => {
    if (isDragging) return;
    setTipContent(content);
    setTipPos(posFromEvent(e));
  };

  const hideTip = () => {
    setTipContent(null);
    setTipPos(null);
  };

  // --- pan ---
  const onSvgMouseDown = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!isZoomed) return; // no need to pan when fully zoomed out
    setIsDragging(true);
    dragStart.current = { mx: e.clientX, my: e.clientY, vx: vb.x, vy: vb.y };
    hideTip();
  };

  const onSvgMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    if (isDragging && dragStart.current) {
      const rect = e.currentTarget.getBoundingClientRect();
      const dx = e.clientX - dragStart.current.mx;
      const dy = e.clientY - dragStart.current.my;
      const sx = vb.w / rect.width;
      const sy = vb.h / rect.height;
      setVb(prev => clampVb({
        ...prev,
        x: dragStart.current!.vx - dx * sx,
        y: dragStart.current!.vy - dy * sy,
      }));
      return;
    }
    if (tipContent) setTipPos(posFromEvent(e));
  };

  const endDrag = () => {
    setIsDragging(false);
    dragStart.current = null;
  };

  // --- zoom ---
  const zoomAroundPoint = (factor: number, cx?: number, cy?: number) => {
    setVb(prev => {
      const newW = Math.min(MAP_W, Math.max(MIN_ZOOM_W, prev.w * factor));
      const newH = newW * (MAP_H / MAP_W);
      // Default to center of current view.
      const px = cx ?? prev.x + prev.w / 2;
      const py = cy ?? prev.y + prev.h / 2;
      const tx = px - (px - prev.x) * (newW / prev.w);
      const ty = py - (py - prev.y) * (newH / prev.h);
      return clampVb({ x: tx, y: ty, w: newW, h: newH });
    });
  };

  const zoomIn = () => zoomAroundPoint(1 / ZOOM_STEP);
  const zoomOut = () => zoomAroundPoint(ZOOM_STEP);
  const resetView = () => setVb(INITIAL_VB);

  // Wheel zoom centered on cursor. Attached via ref so we can set passive:false
  // and preventDefault() to stop the page from scrolling while over the map.
  useEffect(() => {
    const el = svgRef.current;
    if (!el) return;
    const handler = (e: WheelEvent) => {
      e.preventDefault();
      const rect = el.getBoundingClientRect();
      const ux = (e.clientX - rect.left) / rect.width;
      const uy = (e.clientY - rect.top) / rect.height;
      setVb(prev => {
        const factor = e.deltaY < 0 ? 1 / ZOOM_STEP : ZOOM_STEP;
        const newW = Math.min(MAP_W, Math.max(MIN_ZOOM_W, prev.w * factor));
        const newH = newW * (MAP_H / MAP_W);
        const px = prev.x + ux * prev.w;
        const py = prev.y + uy * prev.h;
        const tx = px - ux * newW;
        const ty = py - uy * newH;
        return clampVb({ x: tx, y: ty, w: newW, h: newH });
      });
    };
    el.addEventListener('wheel', handler, { passive: false });
    return () => el.removeEventListener('wheel', handler);
  }, []);

  const btnBase = `p-2 rounded-md border shadow-sm transition-colors disabled:opacity-40 disabled:cursor-not-allowed`;
  const btnStyle = isMatrix
    ? `bg-slate-900/90 border-slate-700 text-slate-200 hover:bg-slate-800`
    : `bg-white/90 border-slate-200 text-slate-700 hover:bg-slate-50`;

  return (
    <div className="py-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h2 className={`text-3xl font-bold mb-6 flex items-center gap-3 ${isMatrix ? 'text-slate-100' : 'text-slate-900'}`}>
        <Plane className={`w-8 h-8 ${isMatrix ? 'text-green-500' : 'text-blue-600'}`} />
        Places I've Been
      </h2>

      <div className={`relative rounded-lg border overflow-hidden ${isMatrix ? 'bg-slate-900 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
        {/* Zoom controls */}
        <div className="absolute top-3 right-3 z-20 flex flex-col gap-1.5">
          <button
            type="button"
            aria-label="Zoom in"
            title="Zoom in"
            onClick={zoomIn}
            disabled={vb.w <= MIN_ZOOM_W + 0.5}
            className={`${btnBase} ${btnStyle}`}
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button
            type="button"
            aria-label="Zoom out"
            title="Zoom out"
            onClick={zoomOut}
            disabled={!isZoomed}
            className={`${btnBase} ${btnStyle}`}
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <button
            type="button"
            aria-label="Reset view"
            title="Reset view"
            onClick={resetView}
            disabled={!isZoomed && vb.x === 0 && vb.y === 0}
            className={`${btnBase} ${btnStyle}`}
          >
            <Maximize2 className="w-4 h-4" />
          </button>
        </div>

        <svg
          ref={svgRef}
          viewBox={`${vb.x} ${vb.y} ${vb.w} ${vb.h}`}
          className="w-full h-auto block select-none"
          style={{ cursor: isDragging ? 'grabbing' : isZoomed ? 'grab' : 'default' }}
          onMouseDown={onSvgMouseDown}
          onMouseMove={onSvgMouseMove}
          onMouseUp={endDrag}
          onMouseLeave={() => { endDrag(); hideTip(); }}
        >
          <g>
            {features.map((f) => {
              const idKey = f.id != null ? String(parseInt(String(f.id), 10)) : '';
              const visited = visitedById.get(idKey);
              const intensity = visited ? visitIntensity(visited, now) : 0;
              const fill = visited ? lerpHex(fillFaded, fillFresh, intensity) : fillUnvisited;
              const name = f.properties?.name || 'Unknown';
              return (
                <path
                  key={String(f.id)}
                  d={pathFor(f)}
                  fill={fill}
                  stroke={strokeColor}
                  strokeWidth={0.5}
                  vectorEffect="non-scaling-stroke"
                  style={{ cursor: isZoomed ? (isDragging ? 'grabbing' : 'grab') : 'pointer', transition: 'fill 200ms' }}
                  onMouseEnter={(e) => {
                    const months = visited && !visited.permanent ? monthsSince(visited.lastVisit, now) : 0;
                    showTip(e, (
                      <div className="text-xs">
                        <div className="font-semibold">{visited ? visited.name : name}</div>
                        {visited ? (
                          <>
                            <div className="opacity-80">
                              {visited.permanent
                                ? visited.note
                                : `Last visit: ${visited.lastVisit} (${months} mo ago)`}
                            </div>
                            <div className="opacity-80 mt-0.5">
                              Cities: {visited.cities.map(c => c.name).join(', ')}
                            </div>
                          </>
                        ) : (
                          <div className="opacity-70">Not visited yet</div>
                        )}
                      </div>
                    ));
                  }}
                />
              );
            })}
          </g>

          {/* Visited city markers */}
          <g>
            {VISITED_COUNTRIES.flatMap(country =>
              country.cities.map(city => {
                const p = projectPoint(city.lon, city.lat);
                if (!p) return null;
                return (
                  <circle
                    key={`${country.id}-${city.name}`}
                    cx={p[0]}
                    cy={p[1]}
                    r={3.5}
                    fill={cityColor}
                    stroke={isMatrix ? '#fef2f2' : '#ffffff'}
                    strokeWidth={1}
                    vectorEffect="non-scaling-stroke"
                    style={{ cursor: 'pointer' }}
                    onMouseEnter={(e) => showTip(e, (
                      <div className="text-xs">
                        <div className="font-semibold">{city.name}</div>
                        <div className="opacity-70">{country.name}</div>
                      </div>
                    ))}
                  />
                );
              })
            )}
          </g>
        </svg>

        {tipPos && tipContent && !isDragging && (
          <div
            className={`pointer-events-none absolute px-2 py-1.5 rounded shadow-lg border ${isMatrix ? 'bg-slate-800 text-slate-100 border-slate-700' : 'bg-white text-slate-800 border-slate-200'}`}
            style={{
              left: tipPos.x + 12,
              top: tipPos.y + 12,
              maxWidth: 220,
            }}
          >
            {tipContent}
          </div>
        )}
      </div>

      {/* Legend */}
      <div className={`mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs ${isMatrix ? 'text-slate-400' : 'text-slate-600'}`}>
        <div className="flex items-center gap-2">
          <span>Fade scale:</span>
          <div className="flex h-3 w-32 rounded overflow-hidden border border-slate-300 dark:border-slate-700">
            {Array.from({ length: 20 }).map((_, i) => (
              <span key={i} style={{ flex: 1, background: lerpHex(fillFaded, fillFresh, i / 19) }} />
            ))}
          </div>
          <span>old → recent</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-block w-3 h-3 rounded-sm" style={{ background: fillUnvisited }} />
          <span>Not visited</span>
        </div>
        <div className="flex items-center gap-2">
          <MapPin className="w-3.5 h-3.5" style={{ color: cityColor }} />
          <span>City visited</span>
        </div>
      </div>
    </div>
  );
};

export default Travel;
