'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Instagram, Youtube, Facebook, Mail } from 'lucide-react';
import Link from 'next/link';
import { bio, latestUpdates, contactEmail, socialLinks } from '../../../lib/config';

const COLORS = ['#FF4000', '#0057FF', '#FF00C1', '#22E4AC'];

export default function Concept8() {
  const [bgColor, setBgColor] = useState(COLORS[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setBgColor((prev) => COLORS[(COLORS.indexOf(prev) + 1) % COLORS.length]);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen w-full flex flex-col transition-colors duration-[2000ms] overflow-x-hidden" style={{ backgroundColor: bgColor }}>
      {/* Ticker Section */}
      <div className="bg-black text-white py-4 overflow-hidden border-b-4 border-black whitespace-nowrap">
        <motion.div 
          className="inline-block font-brand text-4xl uppercase tracking-[0.2em]"
          animate={{ x: [0, -1000] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        >
          {latestUpdates} • {latestUpdates} • {latestUpdates} • {latestUpdates}
        </motion.div>
      </div>

      <div className="flex-1 flex flex-col md:flex-row p-8 max-w-7xl mx-auto w-full gap-16 mt-12">
        {/* Left: Bio */}
        <main className="flex-[3] flex flex-col gap-12">
          <header>
            <Link href="/" className="font-brand text-[8vw] md:text-[6vw] uppercase text-white leading-none" style={{ textShadow: '4px 4px 0px black' }}>
              DIESEL JENNY
            </Link>
          </header>
          
          <section className="bg-black text-white p-12 border-4 border-black">
            <h2 className="font-brand text-3xl mb-8 uppercase border-b border-white/30 pb-4">Background</h2>
            <p className="font-bebas text-3xl leading-relaxed tracking-wide">{bio}</p>
          </section>
        </main>

        {/* Right: Info Sidebar */}
        <aside className="flex-1 flex flex-col gap-12 bg-white/20 p-8 border-4 border-white backdrop-blur-md h-fit md:sticky md:top-8">
          <section>
            <h3 className="font-brand text-2xl mb-6 uppercase text-black">Contact</h3>
            <p className="font-bebas text-xl text-black select-all underline decoration-2">{contactEmail}</p>
          </section>

          <section>
            <h3 className="font-brand text-2xl mb-6 uppercase text-black">Socials</h3>
            <nav className="flex flex-col gap-4 font-bebas text-2xl">
              <a href={socialLinks.instagram} target="_blank" className="flex items-center gap-3 hover:text-black transition-colors">
                <Instagram /> Instagram
              </a>
              <a href={socialLinks.bandcamp} target="_blank" className="flex items-center gap-3 hover:text-black transition-colors">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M0 18.75l7.437-13.5H24l-7.438 13.5H0z"/></svg> Bandcamp
              </a>
              <a href={socialLinks.youtube} target="_blank" className="flex items-center gap-3 hover:text-black transition-colors">
                <Youtube /> YouTube
              </a>
              <a href={socialLinks.facebook} target="_blank" className="flex items-center gap-3 hover:text-black transition-colors">
                <Facebook /> Facebook
              </a>
            </nav>
          </section>
        </aside>
      </div>
    </div>
  );
}
