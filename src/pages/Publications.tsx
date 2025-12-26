import React, { useState } from 'react';
import { ThemeMode } from '../types';
import { PUBLICATIONS } from '../data/content';
import { BookOpen, ChevronDown, ChevronUp, FileText, FileCode, BookText } from 'lucide-react';

interface PublicationsProps {
  theme: ThemeMode;
}

const Publications: React.FC<PublicationsProps> = ({ theme }) => {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const isMatrix = theme === ThemeMode.MATRIX;

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
    <div className="py-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-center mb-8">
        <h2 className={`text-3xl font-bold flex items-center gap-3 ${isMatrix ? 'text-white' : 'text-slate-900'}`}>
          <BookOpen className={`w-8 h-8 ${isMatrix ? 'text-green-500' : 'text-blue-600'}`} />
          Publications
        </h2>
        <div className={`text-sm font-mono ${isMatrix ? 'text-slate-400' : 'text-slate-500'}`}>
          {PUBLICATIONS.length} papers
        </div>
      </div>

      <div className="space-y-6">
        {PUBLICATIONS.map((pub) => (
          <div key={pub.id} className={`group relative p-6 rounded-xl border transition-all duration-300 ${isMatrix ? 'bg-slate-900/50 border-slate-800 hover:border-green-800 hover:shadow-lg hover:shadow-green-900/10' : 'bg-white border-slate-200 hover:border-blue-300 hover:shadow-lg'}`}>
            <div className="flex flex-col md:flex-row justify-between md:items-start gap-2">
              <div className="flex-1 cursor-pointer" onClick={() => setExpandedId(expandedId === pub.id ? null : pub.id)}>
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className={`text-xs font-mono px-2 py-1 rounded inline-block ${isMatrix ? 'bg-slate-800 text-slate-500' : 'bg-slate-100 text-slate-500'}`}>{pub.venue} • {pub.year}</span>
                  {pub.comment && (
                    <span className={`text-xs font-semibold px-2 py-1 rounded inline-block ${isMatrix ? 'bg-green-900/30 text-green-400 border border-green-700' : 'bg-blue-100 text-blue-700 border border-blue-300'}`}>
                      {pub.comment}
                    </span>
                  )}
                </div>
                <h3 className={`text-xl font-semibold transition-colors ${isMatrix ? 'text-slate-100 group-hover:text-green-400' : 'text-slate-900 group-hover:text-blue-600'}`}>
                  {pub.title}
                </h3>
                <p className={`mt-1 text-sm ${isMatrix ? 'text-slate-400' : 'text-slate-600'}`}>
                  {pub.authors.map((author, idx) =>
                    author === "Yahia Salaheldin Shaaban" || author === "Yahia Salaheldin Shaaban*" ?
                      <span key={idx}><strong>{author}</strong>{idx < pub.authors.length - 1 ? ', ' : ''}</span> :
                      <span key={idx}>{author}{idx < pub.authors.length - 1 ? ', ' : ''}</span>
                  )}
                </p>
              </div>
              <div className="flex gap-2 shrink-0 mt-2 md:mt-0">
                <button
                  onClick={() => setExpandedId(expandedId === pub.id ? null : pub.id)}
                  className={`p-2 transition-colors ${isMatrix ? 'text-slate-400 hover:text-green-400' : 'text-slate-400 hover:text-blue-600'}`}
                  title="Read Abstract"
                >
                  {expandedId === pub.id ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Abstract Dropdown */}
            {expandedId === pub.id && (
              <div className={`mt-4 p-4 rounded-lg text-sm leading-relaxed border-l-2 animate-in slide-in-from-top-2 fade-in ${isMatrix ? 'bg-black/50 text-slate-300 border-green-500' : 'bg-slate-50 text-slate-600 border-blue-500'}`}>
                <span className="font-bold block mb-1">Abstract:</span>
                {pub.abstract}
              </div>
            )}

            <div className={`flex flex-wrap gap-2 mt-4 pt-4 border-t ${isMatrix ? 'border-slate-800' : 'border-slate-100'}`}>
              {pub.tags.map(tag => (
                <span key={tag} className={`text-xs px-2 py-0.5 rounded-full border ${isMatrix ? 'bg-green-900/20 text-green-400 border-green-800/50' : 'bg-blue-50 text-blue-600 border-blue-200'}`}>
                  {tag}
                </span>
              ))}
            </div>

            {/* Paper, Code, and BibTeX Buttons */}
            <div className="flex flex-wrap gap-3 mt-4">
              {pub.pdf && pub.pdf !== "#" && (
                <a
                  href={pub.pdf}
                  target="_blank"
                  rel="noreferrer"
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${isMatrix ? 'bg-slate-800 hover:bg-green-900/50 text-slate-300 hover:text-green-400 border border-slate-700 hover:border-green-700' : 'bg-slate-100 hover:bg-blue-100 text-slate-700 hover:text-blue-600 border border-slate-200 hover:border-blue-300'}`}
                >
                  <FileText className="w-4 h-4" />
                  Paper
                </a>
              )}
              {pub.link && pub.link !== "#" && (
                <a
                  href={pub.link}
                  target="_blank"
                  rel="noreferrer"
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${isMatrix ? 'bg-slate-800 hover:bg-green-900/50 text-slate-300 hover:text-green-400 border border-slate-700 hover:border-green-700' : 'bg-slate-100 hover:bg-blue-100 text-slate-700 hover:text-blue-600 border border-slate-200 hover:border-blue-300'}`}
                >
                  <FileCode className="w-4 h-4" />
                  Code
                </a>
              )}
              {pub.bibtex && pub.bibtex !== "#" && (
                <button
                  onClick={() => copyBibtex(pub.bibtex!, pub.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${isMatrix ? 'bg-slate-800 hover:bg-green-900/50 text-slate-300 hover:text-green-400 border border-slate-700 hover:border-green-700' : 'bg-slate-100 hover:bg-blue-100 text-slate-700 hover:text-blue-600 border border-slate-200 hover:border-blue-300'}`}
                >
                  <BookText className="w-4 h-4" />
                  {copiedId === pub.id ? 'Copied!' : 'BibTeX'}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Publications;
