export interface Publication {
  id: string;
  title: string;
  authors: string[];
  venue: string;
  year: number;
  abstract: string;
  tags: string[];
  link?: string;
  pdf?: string;
  bibtex?: string;
  comment?: string; // e.g., "Spotlight", "Oral Presentation"
}

export interface Project {
  id: string;
  title: string;
  description: string;
  image?: string;
  techStack: string[];
  link?: string;
  github?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  date: string;
  readTime: string;
  excerpt: string;
  content: string;
  tags: string[];
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  location: string;
  description: string[];
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  period: string;
  location: string;
  details?: string[];
}

export interface GalleryItem {
  id: string;
  src: string;
  caption: string;
}

export interface Profile {
  name: string;
  role: string;
  institution: string;
  email: string;
  bio: string;
  image: string;
  quotes: string[];
  socials: {
    twitter?: string;
    github?: string;
    scholar?: string;
    linkedin?: string;
  };
  meetingLink: string;
}

export enum ThemeMode {
  LIGHT = 'LIGHT',
  MATRIX = 'MATRIX'
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}
