import React from 'react';
import { ThemeMode } from '../types';
import { PROFILE } from '../data/content';
import { Calendar, Mail } from 'lucide-react';
import { Room } from '../components/GalleryUI';

interface ContactProps {
  theme: ThemeMode;
}

const Contact: React.FC<ContactProps> = () => (
  <div className="py-12 max-w-3xl mx-auto">
    <Room as="h1" label="The guestbook" title="Let's connect" sub="Open to collaborate. Just ping me." />

    <div className="grid sm:grid-cols-2 gap-6">
      <div className="g-placard p-8 flex flex-col">
        <Calendar className="w-7 h-7 g-gold" />
        <h2 className="g-display text-[2rem] g-ink mt-4 leading-tight">Book a 30 minute call</h2>
        <p className="g-serif g-soft mt-2">Pick a time directly on my calendar.</p>
        <a href={PROFILE.meetingLink} target="_blank" rel="noreferrer" className="g-btn g-btn-solid mt-auto pt-2.5 self-start !mt-8">
          View calendar
        </a>
      </div>
      <div className="g-placard p-8 flex flex-col">
        <Mail className="w-7 h-7 g-gold" />
        <h2 className="g-display text-[2rem] g-ink mt-4 leading-tight">Write to me</h2>
        <p className="g-serif g-soft mt-2">Questions, ideas, or a paper you think I should read.</p>
        <a href={`mailto:${PROFILE.email}`} className="g-link g-mono text-sm mt-8 break-all">{PROFILE.email}</a>
      </div>
    </div>
  </div>
);

export default Contact;
