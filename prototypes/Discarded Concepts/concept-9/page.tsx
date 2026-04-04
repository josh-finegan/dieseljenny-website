'use client';

import { useState, useEffect } from 'react';
import { Instagram, Youtube, Facebook, Mail } from 'lucide-react';
import Link from 'next/link';
import { bio, latestUpdates, contactEmail, socialLinks } from '../../../lib/config';

const COLORS = ['#FF4000', '#0057FF', '#FF00C1', '#22E4AC'];

export default function Concept9() {
  const [bgColor, setBgColor] = useState(COLORS[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setBgColor((prev) => COLORS[(COLORS.indexOf(prev) + 1) % COLORS.length]);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row bg-black">
      {/* Left Sidebar: Fixed Brand */}
      <aside className="w-full md:w-[40%] flex flex-col justify-between p-12 bg-black border-r border-white/20 h-full md:sticky md:top-0">
        <header>
          <Link href="/" className="font-brand text-[12vw] md:text-[6vw] uppercase text-white leading-none tracking-tighter hover:scale-[1.02] transition-transform block" style={{ textShadow: '4px 4px 0px red' }}>
            DIESEL JENNY
          </Link>
          <div className="font-bebas text-2xl text-white/50 italic mt-4">'Like a rat up a drainpipe!'</div>
        </header>

        <section className="flex flex-col gap-12 mt-12">
          <div>
            <h3 className="font-brand text-2xl mb-6 uppercase text-red-500">Links</h3>
            <nav className="flex flex-col gap-4 font-bebas text-2xl text-white">
              <a href={socialLinks.instagram} target="_blank" className="hover:text-red-500 transition-colors">Instagram</a>
              <a href={socialLinks.bandcamp} target="_blank" className="hover:text-red-500 transition-colors">Bandcamp</a>
              <a href={socialLinks.youtube} target="_blank" className="hover:text-red-500 transition-colors">YouTube</a>
            </nav>
          </div>
          <div>
            <h3 className="font-brand text-2xl mb-4 uppercase text-red-500">Contact</h3>
            <p className="font-bebas text-xl text-white underline decoration-red-500 underline-offset-4">{contactEmail}</p>
          </div>
        </section>
      </aside>

      {/* Right Main: Fading Info */}
      <main className="w-full md:w-[60%] p-12 transition-colors duration-[2000ms] min-h-screen" style={{ backgroundColor: bgColor }}>
        <div className="max-w-3xl mx-auto flex flex-col gap-24">
          <section className="bg-black/80 text-white p-12 border-2 border-white backdrop-blur-sm">
            <h2 className="font-brand text-4xl mb-12 uppercase text-white">Bio</h2>
            <p className="font-bebas text-3xl leading-relaxed tracking-wide text-white/90 italic">{bio}</p>
          </section>

          <section className="bg-white p-12 border-4 border-black shadow-[20px_20px_0px_rgba(0,0,0,1)]">
            <h2 className="font-brand text-3xl mb-8 uppercase text-black">Latest Activity</h2>
            <p className="font-bebas text-3xl text-black font-bold uppercase tracking-widest">{latestUpdates}</p>
            <Link href="/" className="mt-12 block font-bebas text-xl text-black underline underline-offset-4 hover:no-underline">Return to splash</Link>
          </section>
        </div>
      </main>
    </div>
  );
}
