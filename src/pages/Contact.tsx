import React from 'react';
import { ThemeMode } from '../types';
import { PROFILE } from '../data/content';
import { Calendar } from 'lucide-react';

interface ContactProps {
  theme: ThemeMode;
}

const Contact: React.FC<ContactProps> = ({ theme }) => {
  const isMatrix = theme === ThemeMode.MATRIX;

  return (
    <div className="py-12 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-2xl mx-auto text-center">
      <h2 className={`text-3xl font-bold mb-6 ${isMatrix ? 'text-white' : 'text-slate-900'}`}>Let's Connect</h2>
      <p className={`mb-8 ${isMatrix ? 'text-slate-400' : 'text-slate-600'}`}>
        I am open to collaborations on Time Series, LLMs, and Reasoning.
      </p>

      <div className={`p-8 rounded-2xl shadow-sm border mb-8 ${isMatrix ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
        <Calendar className={`w-12 h-12 mx-auto mb-4 ${isMatrix ? 'text-green-500' : 'text-blue-600'}`} />
        <h3 className={`text-xl font-semibold mb-2 ${isMatrix ? 'text-white' : 'text-slate-900'}`}>Book a 30-min Call</h3>
        <p className={`text-sm mb-6 ${isMatrix ? 'text-slate-500' : 'text-slate-500'}`}>Directly schedule time on my calendar.</p>
        <a href={PROFILE.meetingLink} target="_blank" rel="noreferrer" className={`inline-block px-8 py-3 text-white rounded-full font-medium transition-colors shadow-lg hover:shadow-xl ${isMatrix ? 'bg-green-700 hover:bg-green-600' : 'bg-blue-600 hover:bg-blue-700'}`}>
          View Calendar
        </a>
      </div>

      <p className={`text-sm ${isMatrix ? 'text-slate-500' : 'text-slate-500'}`}>
        Or email me at <a href={`mailto:${PROFILE.email}`} className={`underline font-mono ${isMatrix ? 'text-green-500' : 'text-blue-600'}`}>{PROFILE.email}</a>
      </p>
    </div>
  );
};

export default Contact;
