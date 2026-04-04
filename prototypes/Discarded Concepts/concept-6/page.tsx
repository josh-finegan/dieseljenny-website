'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Instagram, Youtube, Facebook, Mail } from 'lucide-react';
import Link from 'next/link';
import { bio, latestUpdates, contactEmail, socialLinks } from '../../../lib/config';

const COLORS = ['#FF4000', '#0057FF', '#FF00C1', '#22E4AC'];

const BandcampIcon = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M0 18.75l7.437-13.5H24l-7.438 13.5H0z"/>
  </svg>
);

export default function Concept6() {
  const [bgColor, setBgColor] = useState(COLORS[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setBgColor((prev) => COLORS[(COLORS.indexOf(prev) + 1) % COLORS.length]);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen w-full flex flex-col items-center p-8 transition-colors duration-[2000ms]" style={{ backgroundColor: bgColor }}>
      <header className="w-full max-w-4xl flex justify-between items-center mb-16">
        <Link href="/" className="font-brand text-4xl uppercase text-white hover:scale-105 transition-transform" style={{ textShadow: '2px 2px 0px black' }}>
          DIESEL JENNY
        </Link>
        <Link href="/" className="font-bebas text-xl text-white hover:underline">Back</Link>
      </header>

      <main className="w-full max-w-2xl flex flex-col gap-12 bg-black/10 p-12 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        <section>
          <h2 className="font-brand text-3xl mb-4 uppercase text-white">Bio</h2>
          <p className="font-bebas text-2xl leading-relaxed text-white">{bio}</p>
        </section>

        <section className="bg-white p-6 border-4 border-black">
          <h2 className="font-brand text-2xl mb-2 uppercase text-black">Latest Updates</h2>
          <p className="font-bebas text-xl text-black tracking-widest">{latestUpdates}</p>
        </section>

        <section className="flex flex-col gap-4">
          <div className="flex gap-6">
            <a href={socialLinks.instagram} target="_blank" className="text-white hover:text-black transition-colors"><Instagram size={32} /></a>
            <a href={socialLinks.bandcamp} target="_blank" className="text-white hover:text-black transition-colors"><BandcampIcon size={32} /></a>
            <a href={socialLinks.youtube} target="_blank" className="text-white hover:text-black transition-colors"><Youtube size={32} /></a>
            <a href={socialLinks.facebook} target="_blank" className="text-white hover:text-black transition-colors"><Facebook size={32} /></a>
          </div>
          <div className="flex items-center gap-2 text-white font-bebas text-xl">
            <Mail size={20} />
            <span>Contact: {contactEmail}</span>
          </div>
        </section>
      </main>
    </div>
  );
}
