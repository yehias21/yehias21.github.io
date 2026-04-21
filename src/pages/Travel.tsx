import React, { useMemo, useState } from 'react';
import { geoEqualEarth, geoPath } from 'd3-geo';
import { feature } from 'topojson-client';
import type { FeatureCollection, Feature, Geometry } from 'geojson';
import { MapPin, Plane } from 'lucide-react';
import { ThemeMode, VisitedCountry } from '../types';
import { VISITED_COUNTRIES } from '../data/content';
import worldTopo from '../assets/data/countries-110m.json';

interface TravelProps {
  theme: ThemeMode;
}

const MAP_W = 960;
const MAP_H = 500;

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

const Travel: React.FC<TravelProps> = ({ theme }) => {
  const isMatrix = theme === ThemeMode.MATRIX;
  // Split tooltip state so crossing country boundaries (mouseenter B while
  // mousemove for A is still scheduled) can't overwrite new content with stale.
  const [tipPos, setTipPos] = useState<{ x: number; y: number } | null>(null);
  const [tipContent, setTipContent] = useState<React.ReactNode>(null);
  const now = useMemo(() => new Date(), []);

  const visitedById = useMemo(() => {
    const map = new Map<string, VisitedCountry>();
    VISITED_COUNTRIES.forEach(c => {
      // Accept both "070" and "70" keys so lookup is robust regardless of
      // how the topojson stores ids (some builds strip leading zeros).
      map.set(c.id, c);
      map.set(String(parseInt(c.id, 10)), c);
    });
    return map;
  }, []);

  // Parse topojson once into a GeoJSON FeatureCollection + svg paths.
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

  // Color theme for visited countries. Faded end -> fresh end.
  const fillFaded = isMatrix ? '#0b2540' : '#dbeafe';  // pale blue
  const fillFresh = isMatrix ? '#3b82f6' : '#1d4ed8';  // deep blue
  const fillUnvisited = isMatrix ? '#1f2937' : '#e2e8f0';
  const strokeColor = isMatrix ? '#0f172a' : '#ffffff';
  const cityColor = isMatrix ? '#f87171' : '#dc2626';

  const posFromEvent = (e: React.MouseEvent) => {
    const rect = (e.currentTarget as SVGElement).ownerSVGElement!.getBoundingClientRect();
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  };

  const showTip = (e: React.MouseEvent, content: React.ReactNode) => {
    setTipContent(content);
    setTipPos(posFromEvent(e));
  };

  const moveTip = (e: React.MouseEvent) => {
    setTipPos(posFromEvent(e));
  };

  const hideTip = () => {
    setTipContent(null);
    setTipPos(null);
  };

  return (
    <div className="py-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h2 className={`text-3xl font-bold mb-2 flex items-center gap-3 ${isMatrix ? 'text-white' : 'text-slate-900'}`}>
        <Plane className={`w-8 h-8 ${isMatrix ? 'text-green-500' : 'text-blue-600'}`} />
        Places I've Been
      </h2>
      <p className={`mb-6 text-sm ${isMatrix ? 'text-slate-400' : 'text-slate-600'}`}>
        Countries fade from deep blue (recent visit) toward pale blue as time passes,
        following exponential decay with a {HALFLIFE_MONTHS} month half life.
        Red points mark specific cities. Hover a country for details.
      </p>

      <div className={`relative rounded-lg border overflow-hidden ${isMatrix ? 'bg-slate-900 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
        <svg
          viewBox={`0 0 ${MAP_W} ${MAP_H}`}
          className="w-full h-auto block"
          onMouseLeave={hideTip}
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
                  style={{ cursor: 'pointer', transition: 'fill 200ms' }}
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
                  onMouseMove={moveTip}
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
                  <g key={`${country.id}-${city.name}`}>
                    <circle
                      cx={p[0]}
                      cy={p[1]}
                      r={3.5}
                      fill={cityColor}
                      stroke={isMatrix ? '#fef2f2' : '#ffffff'}
                      strokeWidth={1}
                      style={{ cursor: 'pointer' }}
                      onMouseEnter={(e) => showTip(e, (
                        <div className="text-xs">
                          <div className="font-semibold">{city.name}</div>
                          <div className="opacity-70">{country.name}</div>
                        </div>
                      ))}
                      onMouseMove={moveTip}
                    />
                  </g>
                );
              })
            )}
          </g>
        </svg>

        {tipPos && tipContent && (
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
