import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const ROMAN = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'];
export const roman = (n: number) => ROMAN[n - 1] ?? String(n);

/** A gallery room sign: small "Room N" label, display title, optional subtitle and link. */
export const Room: React.FC<{
  n?: number;
  label?: string;
  title: string;
  sub?: string;
  to?: string;
  toLabel?: string;
  as?: 'h1' | 'h2';
}> = ({ n, label, title, sub, to, toLabel = 'See all', as = 'h2' }) => {
  const Tag = as;
  return (
    <header className="g-room">
      <div>
        {(n || label) && <p className="g-label mb-2">{label ?? `Room ${roman(n!)}`}</p>}
        <Tag className="g-room-title">{title}</Tag>
        {sub && <p className="g-room-sub">{sub}</p>}
      </div>
      {to && (
        <Link to={to} className="g-arrow-link mb-2">
          {toLabel} <ArrowRight className="w-4 h-4" />
        </Link>
      )}
    </header>
  );
};

/** A framed work: gilded or wood frame, mat, and the content inside. */
export const Frame: React.FC<{
  kind?: 'gold' | 'wood';
  className?: string;
  matClassName?: string;
  children: React.ReactNode;
}> = ({ kind = 'wood', className = '', matClassName = '', children }) => (
  <div className={`${kind === 'gold' ? 'g-frame-gold' : 'g-frame-wood'} ${className}`}>
    <div className={`g-mat h-full ${matClassName}`}>{children}</div>
  </div>
);

/** Bold the site owner's name in an author list. */
export const Authors: React.FC<{ authors: string[] }> = ({ authors }) => (
  <>
    {authors.map((a, i) => {
      const me = a.replace('*', '') === 'Yahia Salaheldin Shaaban';
      return (
        <span key={i}>
          {me ? <strong className="g-ink font-semibold">{a}</strong> : a}
          {i < authors.length - 1 ? ', ' : ''}
        </span>
      );
    })}
  </>
);
