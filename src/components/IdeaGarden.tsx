import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';
import '../styles/markdown.css';
import {
  Briefcase, ShieldCheck, History, ChevronDown, ChevronRight,
  ExternalLink, Lock, Sprout,
} from 'lucide-react';
import { ThemeMode, Idea, IdeaCategory, IdeaStatus } from '../types';
import { IDEAS } from '../data/content';

// GitHub commit history for the data file — the tamper-evident record behind
// each idea's inline revision log.
const HISTORY_URL =
  'https://github.com/yehias21/yehias21.github.io/commits/main/src/data/content.ts';

const STATUS_META: Record<IdeaStatus, { label: string; light: string; dark: string }> = {
  seedling:  { label: 'Seedling',  light: 'bg-emerald-50 text-emerald-700 border-emerald-200', dark: 'bg-emerald-900/25 text-emerald-300 border-emerald-800/60' },
  exploring: { label: 'Exploring', light: 'bg-sky-50 text-sky-700 border-sky-200',             dark: 'bg-sky-900/25 text-sky-300 border-sky-800/60' },
  growing:   { label: 'Growing',   light: 'bg-violet-50 text-violet-700 border-violet-200',    dark: 'bg-violet-900/25 text-violet-300 border-violet-800/60' },
  parked:    { label: 'Parked',    light: 'bg-slate-100 text-slate-600 border-slate-200',       dark: 'bg-slate-800/60 text-slate-400 border-slate-700' },
  shipped:   { label: 'Shipped',   light: 'bg-amber-50 text-amber-700 border-amber-200',        dark: 'bg-amber-900/25 text-amber-300 border-amber-800/60' },
};

interface IdeaGardenProps {
  theme: ThemeMode;
  category: IdeaCategory;   // 'research' | 'business'
}

// Renders the filtered idea list (used as a tab inside the Blog page).
const IdeaGarden: React.FC<IdeaGardenProps> = ({ theme, category }) => {
  const isMatrix = theme === ThemeMode.MATRIX;
  const [open, setOpen] = useState<Record<string, boolean>>({});
  const [histOpen, setHistOpen] = useState<Record<string, boolean>>({});

  const ideas = useMemo(
    () =>
      IDEAS.filter(i => i.category === category).sort((a, b) => (a.created < b.created ? 1 : -1)),
    [category]
  );

  const heading = isMatrix ? 'text-slate-100' : 'text-[#2b2b2b]';
  const muted = isMatrix ? 'text-slate-400' : 'text-[#808080]';
  const body = isMatrix ? 'text-slate-300' : 'text-[#5a5a5a]';
  const rule = isMatrix ? 'border-slate-800' : 'border-[#ededed]';
  const accent = isMatrix ? 'text-accent-400' : 'text-[#0085a1]';

  return (
    <div className="max-w-3xl">
      {/* Intro line explaining the preregistration idea. */}
      <p className={`blog-meta text-base mb-3 ${muted}`}>
        {category === 'business'
          ? 'Ventures and product ideas I am chewing on. Dated, authored, and protected — see the notice below.'
          : 'Half-formed research ideas — things I want to build, prove, or disprove. Each is preregistered with the date I first wrote it down.'}
      </p>
      <p className={`text-sm mb-6 ${muted}`}>
        <History className="inline w-3.5 h-3.5 mr-1 -mt-0.5" />
        The inline edit log on each idea is a summary; the tamper-evident full history is the{' '}
        <a href={HISTORY_URL} target="_blank" rel="noreferrer" className={`${accent} underline`}>
          dated git history of this site
        </a>.
      </p>

      {/* IP / licensing notice for business ideas. */}
      {category === 'business' && (
        <div className={`mb-8 rounded-lg border p-4 text-sm leading-relaxed ${
          isMatrix ? 'bg-amber-950/20 border-amber-900/50 text-amber-200/90' : 'bg-amber-50 border-amber-200 text-amber-900'
        }`}>
          <div className="flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 mt-0.5 shrink-0" />
            <div>
              <p className="font-semibold mb-1">Ideas here are dated, authored, and protected.</p>
              <p>
                © {new Date().getFullYear()} Yahia Salaheldin Shaaban. These concepts are published with
                version-controlled, dated records that establish authorship and priority. Items marked{' '}
                <span className="inline-flex items-center gap-1 font-medium"><Lock className="w-3 h-3" />patent-pending</span>{' '}
                are the subject of filings. You are welcome to read and discuss them, but any use, adaptation,
                or commercialization requires <strong>attribution and citation</strong>, and — for the
                business concepts — a <strong>license</strong>. If you cite or want to build on an idea, please{' '}
                <Link to="/contact" className={`underline ${isMatrix ? 'text-amber-200' : 'text-amber-900'}`}>get in touch</Link> first.
              </p>
            </div>
          </div>
        </div>
      )}

      {ideas.map((idea, idx) => (
        <IdeaRow
          key={idea.id}
          idea={idea}
          first={idx === 0}
          isMatrix={isMatrix}
          expanded={!!open[idea.id]}
          onToggle={() => setOpen(o => ({ ...o, [idea.id]: !o[idea.id] }))}
          histExpanded={!!histOpen[idea.id]}
          onToggleHist={() => setHistOpen(h => ({ ...h, [idea.id]: !h[idea.id] }))}
          classes={{ heading, muted, body, rule, accent }}
        />
      ))}
      {ideas.length === 0 && <p className={`${muted} italic`}>Nothing here yet.</p>}
    </div>
  );
};

// --- Single idea row --------------------------------------------------------

interface IdeaRowProps {
  idea: Idea;
  first: boolean;
  isMatrix: boolean;
  expanded: boolean;
  onToggle: () => void;
  histExpanded: boolean;
  onToggleHist: () => void;
  classes: { heading: string; muted: string; body: string; rule: string; accent: string };
}

const IdeaRow: React.FC<IdeaRowProps> = ({
  idea, first, isMatrix, expanded, onToggle, histExpanded, onToggleHist, classes,
}) => {
  const { heading, muted, body, rule, accent } = classes;
  const status = idea.status ? STATUS_META[idea.status] : null;
  const lastEdit = idea.revisions?.[0]?.date;

  return (
    <article className={first ? '' : `pt-8 mt-8 border-t ${rule}`}>
      {/* Header row — click to expand */}
      <button onClick={onToggle} aria-expanded={expanded} className="group block w-full text-left">
        <div className="flex items-start gap-3">
          <span className={`mt-1 shrink-0 transition-transform ${accent}`}>
            {expanded ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
          </span>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              {idea.category === 'business'
                ? <Briefcase className={`w-4 h-4 ${muted}`} />
                : <Sprout className={`w-4 h-4 ${muted}`} />}
              <h2 className={`text-[1.35rem] md:text-[1.55rem] font-semibold leading-snug transition-colors ${heading} ${isMatrix ? 'group-hover:text-accent-400' : 'group-hover:text-[#0085a1]'}`}>
                {idea.title}
              </h2>
              {status && (
                <span className={`text-[0.7rem] font-semibold uppercase tracking-wide px-2 py-0.5 rounded-full border ${isMatrix ? status.dark : status.light}`}>
                  {status.label}
                </span>
              )}
              {idea.patentPending && (
                <span className={`inline-flex items-center gap-1 text-[0.7rem] font-semibold uppercase tracking-wide px-2 py-0.5 rounded-full border ${isMatrix ? 'bg-slate-800 text-slate-300 border-slate-700' : 'bg-slate-100 text-slate-600 border-slate-300'}`}>
                  <Lock className="w-3 h-3" /> Patent-pending
                </span>
              )}
            </div>
            <p className={`font-light leading-relaxed ${body}`}>{idea.pitch}</p>
          </div>
        </div>
      </button>

      {/* Preregistration + edit meta */}
      <div className={`flex flex-wrap items-center gap-x-4 gap-y-1 mt-3 ml-8 text-sm ${muted}`}>
        <span className="inline-flex items-center gap-1.5" title="The date this idea was first written down.">
          <ShieldCheck className="w-4 h-4" />
          <span className="blog-meta">Preregistered {idea.created}</span>
        </span>
        {lastEdit && (
          <button
            onClick={onToggleHist}
            className={`inline-flex items-center gap-1.5 transition-colors ${isMatrix ? 'hover:text-slate-200' : 'hover:text-[#0085a1]'}`}
          >
            <History className="w-4 h-4" />
            {idea.revisions!.length} revision{idea.revisions!.length > 1 ? 's' : ''} · last {lastEdit}
            {histExpanded ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
          </button>
        )}
      </div>

      {/* Edit-history timeline */}
      {histExpanded && idea.revisions && idea.revisions.length > 0 && (
        <ol className={`ml-8 mt-3 border-l pl-4 space-y-2 text-sm ${rule} ${muted}`}>
          {idea.revisions.map((r, i) => (
            <li key={i} className="relative">
              <span className={`absolute -left-[21px] top-1.5 w-2 h-2 rounded-full ${isMatrix ? 'bg-slate-600' : 'bg-slate-300'}`} />
              <span className="blog-meta">{r.date}</span> — {r.note}
            </li>
          ))}
          <li className="relative">
            <span className={`absolute -left-[21px] top-1.5 w-2 h-2 rounded-full ${isMatrix ? 'bg-accent-600' : 'bg-[#0085a1]'}`} />
            <span className="blog-meta">{idea.created}</span> — Preregistered.
          </li>
        </ol>
      )}

      {/* Expanded body */}
      {expanded && (
        <div className="ml-8 mt-5">
          {idea.body && (
            <div className={`prose max-w-none ${isMatrix ? 'prose-invert prose-slate' : 'prose-slate'}`}>
              <ReactMarkdown remarkPlugins={[remarkGfm, remarkMath]} rehypePlugins={[rehypeKatex]}>
                {idea.body}
              </ReactMarkdown>
            </div>
          )}
          {(idea.tags?.length || idea.links?.length) && (
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-4">
              {idea.links?.map(l => (
                <a
                  key={l.url}
                  href={l.url}
                  target="_blank"
                  rel="noreferrer"
                  className={`inline-flex items-center gap-1 text-sm font-medium ${accent} hover:underline`}
                >
                  <ExternalLink className="w-3.5 h-3.5" /> {l.label}
                </a>
              ))}
              {idea.tags && idea.tags.length > 0 && (
                <span className={`text-xs font-semibold uppercase tracking-wider ${isMatrix ? 'text-slate-600' : 'text-[#999999]'}`}>
                  {idea.tags.map(t => `#${t}`).join('  ')}
                </span>
              )}
            </div>
          )}
        </div>
      )}
    </article>
  );
};

export default IdeaGarden;
