import React from 'react';
import { ThemeMode } from '../types';
import { PROJECTS } from '../data/content';
import { Github, ExternalLink } from 'lucide-react';
import { Room, Frame } from '../components/GalleryUI';

interface ProjectsProps {
  theme: ThemeMode;
}

// Projects hang salon style: framed image, museum caption underneath.
const Projects: React.FC<ProjectsProps> = () => (
  <div className="py-12">
    <Room as="h1" label="The studio" title="Projects" sub="Things I have built, newest first." />

    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-16">
      {PROJECTS.map((proj, i) => (
        <figure key={proj.id} className={i % 3 === 1 ? 'lg:mt-10' : ''}>
          <Frame className="g-hang aspect-[4/3]">
            <div className="w-full h-full flex items-center justify-center" style={proj.gradient ? { background: proj.gradient } : undefined}>
              {proj.image
                ? <img src={proj.image} alt={proj.title} loading="lazy" className="g-art" />
                : <span className="g-display italic text-white text-2xl px-4 text-center">{proj.placeholderLabel}</span>}
            </div>
          </Frame>
          <figcaption className="g-placard p-5 mt-6">
            <div className="flex items-start justify-between gap-3">
              <h2 className="g-display text-[1.75rem] g-ink leading-tight">{proj.title}</h2>
              {proj.github && (
                <a href={proj.github} target="_blank" rel="noreferrer" aria-label={`${proj.title} on GitHub`} className="g-icon-btn !w-8 !h-8 shrink-0"><Github className="w-3.5 h-3.5" /></a>
              )}
            </div>
            <p className="g-label mt-1">{proj.techStack.join(' · ')}</p>
            <p className="g-serif g-soft text-[0.95rem] leading-relaxed mt-3">{proj.description}</p>
            {proj.link && (
              <a href={proj.link} target="_blank" rel="noreferrer" className="g-arrow-link mt-3">
                <ExternalLink className="w-3.5 h-3.5" /> {proj.linkLabel || 'Demo'}
              </a>
            )}
          </figcaption>
        </figure>
      ))}
    </div>
  </div>
);

export default Projects;
