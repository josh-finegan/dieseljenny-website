'use client';

import { useState, useEffect } from 'react';
import { Instagram, Youtube, Facebook, Mail } from 'lucide-react';
import Link from 'next/link';
import { bio, latestUpdates, contactEmail, socialLinks } from '../../../lib/config';

const COLORS = ['#FF4000', '#0057FF', '#FF00C1', '#22E4AC'];

export default function Concept10() {
  const [bgColor, setBgColor] = useState(COLORS[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setBgColor((prev) => COLORS[(COLORS.indexOf(prev) + 1) % COLORS.length]);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen w-full flex flex-col items-center py-20 px-8 transition-colors duration-[2000ms]" style={{ backgroundColor: bgColor }}>
      <header className="mb-24 text-center">
        <Link href="/" className="font-brand text-[15vw] md:text-[10vw] uppercase text-white leading-none hover:scale-105 transition-transform inline-block" style={{ textShadow: '4px 4px 0px black' }}>
          DIESEL JENNY
        </Link>
        <div className="font-bebas text-3xl text-white italic mt-2 opacity-80 select-none">'Like a rat up a drainpipe!'</div>
      </header>

      <main className="w-full max-w-2xl flex flex-col items-center text-center gap-20">
        <section className="border-y-2 border-white/30 py-12">
          <p className="font-bebas text-3xl leading-relaxed text-white tracking-wide font-light">{bio}</p>
        </section>

        <section className="w-full bg-black/40 backdrop-blur-sm border-2 border-white p-12 hover:bg-black/60 transition-colors cursor-default">
          <h2 className="font-brand text-2xl mb-6 uppercase text-white tracking-[0.3em]">Latest Releases</h2>
          <p className="font-bebas text-2xl text-white italic">{latestUpdates}</p>
        </section>

        <section className="flex flex-col items-center gap-8 pt-8">
          <nav className="flex gap-12">
            <a href={socialLinks.instagram} target="_blank" className="text-white hover:text-black transition-colors transform hover:scale-125"><Instagram size={40} /></a>
            <a href={socialLinks.bandcamp} target="_blank" className="text-white hover:text-black transition-colors transform hover:scale-125">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor"><path d="M0 18.75l7.437-13.5H24l-7.438 13.5H0z"/></svg>
            </a>
            <a href={socialLinks.youtube} target="_blank" className="text-white hover:text-black transition-colors transform hover:scale-125"><Youtube size={40} /></a>
          </nav>
          
          <div className="font-bebas text-2xl text-white flex items-center gap-3">
            <Mail className="opacity-60" />
            <span className="underline underline-offset-8 decoration-white/30">{contactEmail}</span>
          </div>
        </section>
        
        <Link href="/" className="mt-12 font-bebas text-xl text-white/50 hover:text-white uppercase tracking-widest transition-colors border border-white/20 px-6 py-2">
          Return to entrance
        </Link>
      </main>
    </div>
  );
}
