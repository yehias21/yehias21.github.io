import React from 'react';
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ArrowLeft, Download } from 'lucide-react';
import { ThemeMode } from '../types';
import { Room } from '../components/GalleryUI';
import { CV_PDF } from '../data/content';
import storyMd from '../data/research-story.md?raw';
import '../styles/markdown.css';

interface ResearchStoryProps {
  theme: ThemeMode;
}

// The research story used to live only in the GitHub README. It is kept in
// src/data/research-story.md so the README and this page can share one text.
const ResearchStory: React.FC<ResearchStoryProps> = ({ theme }) => (
  <div className="py-12">
    <Room
      as="h1"
      label="The artist's notebook"
      title="My research story"
      sub="A year by year walk through how I got here, what I built, and what I learned."
    />

    <div className="g-placard p-6 sm:p-10 max-w-3xl">
      <div className={`prose ${theme === ThemeMode.MATRIX ? 'prose-invert' : ''}`}>
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{storyMd}</ReactMarkdown>
      </div>
    </div>

    <div className="flex flex-wrap gap-3 mt-8">
      <Link to="/home" className="g-btn">
        <ArrowLeft className="w-4 h-4" /> Back home
      </Link>
      <a href={CV_PDF} target="_blank" rel="noreferrer" className="g-btn g-btn-solid">
        <Download className="w-4 h-4" /> Download CV (PDF)
      </a>
    </div>
  </div>
);

export default ResearchStory;
