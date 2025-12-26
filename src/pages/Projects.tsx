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
        <h2 className={`text-3xl font-bold flex items-center gap-3 ${isMatrix ? 'text-white' : 'text-slate-900'}`}>
          <Briefcase className={`w-8 h-8 ${isMatrix ? 'text-green-500' : 'text-blue-600'}`} />
          Projects
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {PROJECTS.map((proj) => (
          <div key={proj.id} className={`rounded-xl overflow-hidden border hover:shadow-2xl hover:scale-[1.03] hover:z-10 transition-all duration-300 group flex flex-col h-full ${isMatrix ? 'bg-slate-900 border-slate-800 hover:border-green-800 hover:shadow-green-900/20' : 'bg-white border-slate-200 hover:border-blue-300'}`}>
            <div className="h-48 overflow-hidden bg-gray-200 relative">
              <img src={proj.image} alt={proj.title} className={`w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ${isMatrix ? 'opacity-80 group-hover:opacity-100' : ''}`} />
              <div className={`absolute inset-0 bg-gradient-to-t to-transparent ${isMatrix ? 'from-slate-900' : 'from-white/50'}`}></div>
            </div>
            <div className="p-6 flex flex-col flex-grow">
              <h3 className={`text-lg font-bold mb-2 transition-colors ${isMatrix ? 'text-white group-hover:text-green-400' : 'text-slate-900 group-hover:text-blue-600'}`}>{proj.title}</h3>
              <p className={`text-sm mb-4 line-clamp-3 flex-grow ${isMatrix ? 'text-slate-400' : 'text-slate-600'}`}>
                {proj.description}
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {proj.techStack.map((tech) => (
                  <span key={tech} className={`px-2 py-1 text-xs rounded-md font-mono border ${isMatrix ? 'bg-slate-800 text-slate-300 border-slate-700' : 'bg-slate-100 text-slate-600 border-slate-200'}`}>
                    {tech}
                  </span>
                ))}
              </div>
              <div className={`flex gap-4 pt-4 border-t ${isMatrix ? 'border-slate-800' : 'border-slate-100'}`}>
                {proj.github && (
                  <a
                    href={proj.github}
                    target="_blank"
                    rel="noreferrer"
                    className={`flex items-center gap-1 text-sm transition-colors ${isMatrix ? 'text-slate-400 hover:text-green-400' : 'text-slate-500 hover:text-blue-600'}`}
                  >
                    <Github className="w-4 h-4"/> Code
                  </a>
                )}
                {proj.link && (
                  <a
                    href={proj.link}
                    target="_blank"
                    rel="noreferrer"
                    className={`flex items-center gap-1 text-sm transition-colors ${isMatrix ? 'text-slate-400 hover:text-green-400' : 'text-slate-500 hover:text-blue-600'}`}
                  >
                    <ExternalLink className="w-4 h-4"/> Demo
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
