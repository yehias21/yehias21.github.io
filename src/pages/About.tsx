import React from 'react';
import { ThemeMode } from '../types';
import { EDUCATION, EXPERIENCE } from '../data/content';
import { User, GraduationCap, Briefcase, MapPin, Target } from 'lucide-react';

interface AboutProps {
  theme: ThemeMode;
}

const About: React.FC<AboutProps> = ({ theme }) => {
  const isMatrix = theme === ThemeMode.MATRIX;

  return (
    <div className="py-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h2 className={`text-3xl font-bold mb-8 flex items-center gap-3 ${isMatrix ? 'text-white' : 'text-slate-900'}`}>
        <User className={`w-8 h-8 ${isMatrix ? 'text-green-500' : 'text-blue-600'}`} />
        About Me
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Education & Experience Column */}
        <div className="md:col-span-2 space-y-10">

          {/* Education */}
          <section>
            <h3 className={`text-xl font-bold mb-4 flex items-center gap-2 ${isMatrix ? 'text-slate-200' : 'text-slate-800'}`}>
              <GraduationCap className={`w-5 h-5 ${isMatrix ? 'text-green-500' : 'text-blue-500'}`} /> Education
            </h3>
            <div className="space-y-6">
              {EDUCATION.map(edu => (
                <div key={edu.id} className={`border-l-2 pl-4 ${isMatrix ? 'border-slate-700' : 'border-slate-200'}`}>
                  <h4 className={`font-bold text-lg ${isMatrix ? 'text-white' : 'text-slate-900'}`}>{edu.institution}</h4>
                  <div className={`flex justify-between items-center text-sm mb-1 ${isMatrix ? 'text-slate-400' : 'text-slate-500'}`}>
                    <span>{edu.degree}</span>
                    <span>{edu.period}</span>
                  </div>
                  {edu.details && (
                    <ul className={`list-disc list-inside text-sm mt-2 ${isMatrix ? 'text-slate-400' : 'text-slate-600'}`}>
                      {edu.details.map((d, i) => <li key={i}>{d}</li>)}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Experience Timeline */}
          <section>
            <h3 className={`text-xl font-bold mb-4 flex items-center gap-2 ${isMatrix ? 'text-slate-200' : 'text-slate-800'}`}>
              <Briefcase className={`w-5 h-5 ${isMatrix ? 'text-green-500' : 'text-blue-500'}`} /> Experience
            </h3>
            <div className="space-y-6">
              {EXPERIENCE.map(exp => (
                <div key={exp.id} className={`relative pl-6 border-l-2 ${isMatrix ? 'border-slate-700' : 'border-slate-200'}`}>
                  <div className={`absolute -left-[9px] top-0 w-4 h-4 rounded-full border-2 ${isMatrix ? 'bg-slate-800 border-green-600' : 'bg-white border-blue-500'}`}></div>
                  <h4 className={`font-bold text-lg ${isMatrix ? 'text-white' : 'text-slate-900'}`}>{exp.role}</h4>
                  <div className={`flex flex-col sm:flex-row sm:justify-between text-sm mb-2 ${isMatrix ? 'text-slate-400' : 'text-slate-500'}`}>
                    <span className={`font-semibold ${isMatrix ? 'text-green-400' : 'text-blue-600'}`}>{exp.company}</span>
                    <div className="flex items-center gap-2">
                      <span className="flex items-center gap-1"><MapPin className="w-3 h-3"/> {exp.location}</span>
                      <span>• {exp.period}</span>
                    </div>
                  </div>
                  <ul className={`list-disc list-inside text-sm space-y-1 ${isMatrix ? 'text-slate-400' : 'text-slate-600'}`}>
                    {exp.description.map((d, i) => <li key={i}>{d}</li>)}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* My Vision Column */}
        <div className="space-y-8">
          <section>
            <h3 className={`text-xl font-bold mb-4 flex items-center gap-2 ${isMatrix ? 'text-slate-200' : 'text-slate-800'}`}>
              <Target className={`w-5 h-5 ${isMatrix ? 'text-green-500' : 'text-blue-500'}`} /> My Vision
            </h3>
            <div className={`p-6 rounded-lg border ${isMatrix ? 'bg-slate-900 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
              <p className={`text-sm leading-relaxed mb-4 ${isMatrix ? 'text-slate-300' : 'text-slate-700'}`}>
                At my core, I am a curious scientist and a dedicated family man. I believe that everything becomes fascinating when you dig deep enough.
              </p>
              <p className={`text-sm leading-relaxed mb-4 ${isMatrix ? 'text-slate-300' : 'text-slate-700'}`}>
                My mission for this accelerated journey on earth is to leave a lasting positive imprint, starting from my daily interactions to building a legacy. I view research not just as a pursuit of pride, but as a path to provide security, goodness, and inspiration for my future family and community.
              </p>
              <p className={`text-xs italic mt-4 ${isMatrix ? 'text-slate-500' : 'text-slate-500'}`}>
                <small>(Inspired by Veritasium's philosophy on purpose and sustainability <a href="https://www.youtube.com/watch?v=piHGnG4LsmQ" target="_blank" rel="noopener noreferrer" className={`underline hover:no-underline ${isMatrix ? 'text-green-400' : 'text-blue-600'}`}>here</a>)</small>
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default About;
