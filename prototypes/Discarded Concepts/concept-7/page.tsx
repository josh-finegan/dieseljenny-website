'use client';

import { useState, useEffect } from 'react';
import { Instagram, Youtube, Facebook, Mail } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { bio, latestUpdates, contactEmail, socialLinks } from '../../../lib/config';

const COLORS = ['#FF4000', '#0057FF', '#FF00C1', '#22E4AC'];

const BandcampIcon = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M0 18.75l7.437-13.5H24l-7.438 13.5H0z"/>
  </svg>
);

export default function Concept7() {
  const [bgColor, setBgColor] = useState(COLORS[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setBgColor((prev) => COLORS[(COLORS.indexOf(prev) + 1) % COLORS.length]);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen w-full p-8 transition-colors duration-[2000ms]" style={{ backgroundColor: bgColor }}>
      <header className="w-full flex justify-between items-center mb-12 border-b-2 border-black pb-4">
        <Link href="/" className="font-brand text-3xl uppercase text-white tracking-tighter" style={{ textShadow: '2px 2px 0px black' }}>
          DIESEL JENNY
        </Link>
        <nav className="flex gap-6 font-bebas text-lg text-white">
          <Link href="/" className="hover:underline uppercase">Splash</Link>
          <a href={socialLinks.instagram} target="_blank" className="hover:underline uppercase">Insta</a>
          <a href={socialLinks.bandcamp} target="_blank" className="hover:underline uppercase">BC</a>
        </nav>
      </header>

      <main className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto items-start">
        {/* Bio */}
        <section className="bg-white/10 p-8 border-2 border-white backdrop-blur-sm">
          <h2 className="font-brand text-2xl mb-6 uppercase text-white border-l-4 border-white pl-4">Bio</h2>
          <p className="font-bebas text-xl leading-relaxed text-white">{bio}</p>
        </section>

        {/* Center: Image + Contact */}
        <section className="flex flex-col gap-8 items-center text-center">
          <div className="relative w-full aspect-square max-w-[400px] border-4 border-black overflow-hidden shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] hover:scale-[1.02] transition-transform">
             <Image src="/assets/Press images/Diesel Jenny, Credit - Logan Byrne.jpg" alt="Diesel Jenny by Logan Byrne" fill className="object-cover" />
          </div>
          <div className="bg-black text-white p-6 w-full border-2 border-white">
            <h3 className="font-brand text-xl mb-4 uppercase">Contact</h3>
            <p className="font-bebas text-lg">{contactEmail}</p>
            <div className="flex justify-center gap-4 mt-4">
              <a href={socialLinks.instagram} target="_blank" className="hover:scale-125 transition-transform"><Instagram /></a>
              <a href={socialLinks.youtube} target="_blank" className="hover:scale-125 transition-transform"><Youtube /></a>
              <a href={socialLinks.facebook} target="_blank" className="hover:scale-125 transition-transform"><Facebook /></a>
            </div>
          </div>
        </section>

        {/* Updates */}
        <section className="bg-black p-8 border-2 border-white shadow-[0px_0px_20px_rgba(0,0,0,0.3)]">
          <h2 className="font-brand text-2xl mb-6 uppercase text-white underline underline-offset-8 decoration-2">Updates</h2>
          <p className="font-bebas text-xl text-white tracking-widest">{latestUpdates}</p>
          <div className="mt-12">
            <a 
              href={socialLinks.bandcamp} 
              target="_blank" 
              className="font-brand text-2xl bg-white text-black px-6 py-2 block text-center hover:bg-transparent hover:text-white border-2 border-white transition-all uppercase"
            >
              Get Releases
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}
