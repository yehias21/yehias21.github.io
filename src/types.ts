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
  gradient?: string;
  placeholderLabel?: string;
  techStack: string[];
  link?: string;
  linkLabel?: string;
  github?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  date: string;
  updated?: string;      // "Updated on ..." dateline, Lilian-Weng style
  readTime: string;
  excerpt: string;
  content: string;
  tags: string[];
}

// --- Idea garden -----------------------------------------------------------
// Half-formed research and business ideas, each with a preregistration date
// and an inline, human-readable edit history. The tamper-evident full history
// lives in git (see `historyUrl` on the section notice).
export type IdeaCategory = 'research' | 'business';

// Lifecycle of an idea, roughly seedling → shipped.
export type IdeaStatus =
  | 'seedling'    // just written down, unexplored
  | 'exploring'   // actively reading / prototyping
  | 'growing'     // has legs, being expanded
  | 'parked'      // shelved for now
  | 'shipped';    // turned into a paper / project / venture

export interface IdeaRevision {
  date: string;   // YYYY-MM-DD
  note: string;   // what changed in this edit
}

export interface Idea {
  id: string;
  category: IdeaCategory;
  title: string;
  pitch: string;                 // one-liner shown when collapsed
  body?: string;                 // markdown, shown when expanded
  created: string;               // YYYY-MM-DD — the preregistration date
  revisions?: IdeaRevision[];    // newest-first edit log
  status?: IdeaStatus;
  tags?: string[];
  links?: { label: string; url: string }[];
  patentPending?: boolean;       // business ideas: show a "patent-pending" mark
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

// A notable figure shared a room/event with — no photo, just the story.
export interface RoomEncounter {
  id: string;
  name: string;
  title?: string;
  note: string;
}

export interface Award {
  id: string;
  title: string;
  description: string;
  link?: string;
  // When set, the title is rendered as these named links joined by a separator
  // (used for awards that span two events, e.g. M2L and EEML).
  links?: { label: string; url: string }[];
}

export interface VisitedCity {
  name: string;
  lon: number;
  lat: number;
  note?: string;   // e.g. "MLSS 2026 at Columbia University"
}

export interface VisitedCountry {
  id: string;            // numeric ISO 3166-1 code used by world-atlas topojson
  name: string;
  cities: VisitedCity[];
  lastVisit: string;     // YYYY-MM (or YYYY-MM-DD); ignored if permanent
  note?: string;         // e.g. "Home country"
  permanent?: boolean;   // home/residence, always full intensity
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

export interface ServiceItem {
  id: string;
  role: string;            // e.g., "Reviewer"
  venue: string;           // e.g., "ICML 2026 Workshop on ..."
  year: number;
  note?: string;
}

export interface NewsItem {
  id: string;
  date: string;            // YYYY-MM-DD (sorts well)
  title: string;
  body?: string;
  link?: string;
  linkLabel?: string;
  tag?: string;            // e.g., "Paper", "Service", "Talk"
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
