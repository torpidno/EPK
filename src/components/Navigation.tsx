import React, { useState } from 'react';
import { useScrollSpy } from '../hooks/useScrollSpy';

const SECTIONS = ['bio', 'musik', 'foton', 'press', 'kontakt'];

export const TopNavBar: React.FC = () => {
  const activeSection = useScrollSpy(SECTIONS, 120);
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'The Empty Yards - EPK',
          text: 'Check out the official Press Kit for The Empty Yards!',
          url: window.location.href,
        });
      } catch (err) {
        console.warn('Share failed:', err);
      }
    } else {
      try {
        await navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error('Clipboard copy failed:', err);
      }
    }
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-background/90 backdrop-blur-md border-b border-primary/20 flex justify-between items-center px-margin-mobile md:px-margin-desktop h-20">
      <div
        onClick={() => scrollToSection('hero')}
        className="font-headline-md text-headline-md text-primary tracking-tighter hover:skew-x-[-12deg] transition-transform cursor-pointer"
      >
        <span>THE EMPTY YARDS</span>
      </div>

      <div className="hidden md:flex gap-8 items-center font-label-caps text-label-caps">
        {SECTIONS.map((sec) => {
          const isActive = activeSection === sec;
          return (
            <button
              key={sec}
              onClick={() => scrollToSection(sec)}
              className={`transition-all px-3 py-2 uppercase font-bold tracking-widest text-xs focus:outline-none ${
                isActive
                  ? 'text-primary border-b-2 border-primary pb-1 bg-surface-container-highest/50'
                  : 'text-on-surface-variant hover:text-primary hover:bg-surface-container-highest/30'
              }`}
            >
              {sec}
            </button>
          );
        })}
      </div>

      <div className="flex gap-4 items-center relative">
        <button
          onClick={() => scrollToSection('musik')}
          className="text-on-surface-variant hover:text-primary transition-colors p-2 hover:bg-surface-container-highest focus:outline-none"
          title="Gå till musiken"
        >
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0" }}>
            audiotrack
          </span>
        </button>

        <button
          onClick={handleShare}
          className="text-on-surface-variant hover:text-primary transition-colors p-2 hover:bg-surface-container-highest focus:outline-none"
          title="Dela EPK"
        >
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0" }}>
            share
          </span>
        </button>

        {copied && (
          <div className="absolute right-0 top-12 bg-primary-container text-background font-label-caps text-[10px] px-2 py-1 shadow-lg border border-primary animate-bounce">
            LÄNK KOPIERAD!
          </div>
        )}
      </div>
    </nav>
  );
};

export const SideNavBar: React.FC = () => {
  return (
    <aside className="fixed left-0 top-1/2 -translate-y-1/2 w-16 hidden lg:flex flex-col bg-surface-container-lowest border-r border-primary/10 shadow-[4px_0_0_0_#00f2ff] py-gutter gap-unit items-center z-40">
      <a
        aria-label="SPOTIFY"
        className="p-3 text-on-surface-variant hover:scale-125 hover:text-primary transition-all duration-300"
        href="https://spotify.com"
        target="_blank"
        rel="noopener noreferrer"
      >
        <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0" }}>
          play_circle
        </span>
      </a>

      <a
        aria-label="INSTAGRAM"
        className="p-3 text-on-surface-variant hover:scale-125 hover:text-primary transition-all duration-300"
        href="https://www.instagram.com/theemptyyards/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0" }}>
          photo_camera
        </span>
      </a>

    </aside>
  );
};
