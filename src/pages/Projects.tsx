import React from 'react';
import { ThemeMode } from '../types';
import { PROJECTS } from '../data/content';
import { Briefcase, Github, ExternalLink } from 'lucide-react';

interface ProjectsProps {
  theme: ThemeMode;
}

const Projects: React.FC<ProjectsProps> = ({ theme }) => {
  const isMatrix = theme === ThemeMode.MATRIX;

  return (
    <div className="py-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-center mb-8">
        <h2 className={`text-3xl font-bold flex items-center gap-3 ${isMatrix ? 'text-slate-100' : 'text-slate-900'}`}>
          <Briefcase className={`w-8 h-8 ${isMatrix ? 'text-green-500' : 'text-blue-600'}`} />
          Projects
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {PROJECTS.map((proj) => {
          const isInteractive = Boolean(proj.github || proj.link);
          const hoverCls = isInteractive
            ? (isMatrix ? 'hover:shadow-2xl hover:border-green-800 hover:shadow-green-900/20' : 'hover:shadow-2xl hover:border-blue-300')
            : '';
          return (
          <div key={proj.id} className={`rounded-xl overflow-hidden border transition-all duration-300 group flex flex-col h-full ${isMatrix ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'} ${hoverCls}`}>
            <div className={`h-48 overflow-hidden relative flex items-center justify-center ${isMatrix ? 'bg-slate-950' : 'bg-slate-50'}`} style={proj.gradient ? { background: proj.gradient } : undefined}>
              {proj.image && (
                <img src={proj.image} alt={proj.title} className={`max-w-full max-h-full object-contain p-3 transition-transform duration-500 ${isInteractive ? 'group-hover:scale-[1.03]' : ''} ${isMatrix ? 'opacity-90' : ''}`} />
              )}
              {!proj.image && proj.placeholderLabel && (
                <span className="font-mono text-white/90 text-sm tracking-widest uppercase drop-shadow-md">
                  {proj.placeholderLabel}
                </span>
              )}
            </div>
            <div className="p-6 flex flex-col flex-grow">
              <div className="flex items-start justify-between mb-2">
                <h3 className={`text-lg font-bold transition-colors flex-1 ${isMatrix ? 'text-slate-100' : 'text-slate-900'}`}>{proj.title}</h3>
                {proj.github && (
                  <a
                    href={proj.github}
                    target="_blank"
                    rel="noreferrer"
                    className={`ml-2 p-2 rounded-lg transition-all ${isMatrix ? 'text-slate-400 hover:text-green-400 hover:bg-green-900/20' : 'text-slate-500 hover:text-blue-600 hover:bg-blue-100'}`}
                  >
                    <Github className="w-5 h-5" />
                  </a>
                )}
              </div>
              <p className={`text-sm mb-4 flex-grow overflow-y-auto max-h-24 pr-1 scroll-on-hover ${isMatrix ? 'text-slate-400' : 'text-slate-600'}`}>
                {proj.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {proj.techStack.map((tech) => (
                  <span key={tech} className={`px-2 py-1 text-xs rounded-md font-mono border ${isMatrix ? 'bg-slate-800 text-slate-300 border-slate-700' : 'bg-slate-100 text-slate-600 border-slate-200'}`}>
                    {tech}
                  </span>
                ))}
              </div>
              {proj.link && (
                <div className={`flex gap-4 pt-4 mt-4 border-t ${isMatrix ? 'border-slate-800' : 'border-slate-100'}`}>
                  <a
                    href={proj.link}
                    target="_blank"
                    rel="noreferrer"
                    className={`flex items-center gap-1 text-sm transition-colors ${isMatrix ? 'text-slate-400 hover:text-green-400' : 'text-slate-500 hover:text-blue-600'}`}
                  >
                    <ExternalLink className="w-4 h-4"/> {proj.linkLabel || 'Demo'}
                  </a>
                </div>
              )}
            </div>
          </div>
          );
        })}
      </div>
    </div>
  );
};

export default Projects;
