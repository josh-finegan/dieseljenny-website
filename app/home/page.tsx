'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Instagram, Youtube, Facebook, Mail } from 'lucide-react';
import Link from 'next/link';
import { bio, latestUpdates, contactEmail, socialLinks, phrases, embeds } from '../../lib/config';

const COLORS = ['#FF4000', '#0057FF', '#FF00C1', '#22E4AC'];

const BandcampIcon = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M0 18.75l7.437-13.5H24l-7.438 13.5H0z"/>
  </svg>
);

const TikTokIcon = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.17-2.86-.6-4.12-1.31a6.38 6.38 0 0 1-1.87-1.48v7.24c0 1.27-.13 2.56-.63 3.73-.69 1.67-1.95 3.09-3.59 3.86-1.58.74-3.39.98-5.11.74-1.72-.24-3.34-.99-4.63-2.17C1.19 19.3.43 17.58.19 15.79c-.21-1.61.05-3.26.75-4.71.69-1.44 1.83-2.67 3.23-3.43 1.4-.76 3.03-1.07 4.62-.93v4.14c-1.11-.14-2.29.13-3.2.78-1.05.74-1.58 2.02-1.42 3.29.13 1.05.7 2.05 1.59 2.61.94.59 2.11.72 3.16.37 1.14-.37 2.03-1.29 2.4-2.4.15-.45.21-.92.21-1.39V.02z"/>
  </svg>
);

export default function HomePage() {
  const [bgColor, setBgColor] = useState(COLORS[0]);
  const audioRefs = useRef<Record<string, HTMLAudioElement>>({});
  const currentlyPlaying = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setBgColor((prev) => COLORS[(COLORS.indexOf(prev) + 1) % COLORS.length]);
    }, 5000);

    // Preload audio stings (same as splash)
    const stings = {
      diesel: '/assets/AudioStings/dieseljenny2.mp3',
      rat: '/assets/AudioStings/ratupadrainpipe.mp3',
      home: '/assets/AudioStings/supbroski.mp3',
      instagram: '/assets/AudioStings/brothermango.mp3',
      bandcamp: '/assets/AudioStings/horn.mp3'
    };
    Object.entries(stings).forEach(([key, src]) => {
      const audio = new Audio(src);
      audio.preload = 'auto';
      audioRefs.current[key] = audio;
    });

    return () => clearInterval(interval);
  }, []);

  const playSting = useCallback((key: string) => {
    if (currentlyPlaying.current) {
      currentlyPlaying.current.pause();
      currentlyPlaying.current.currentTime = 0;
    }
    const audio = audioRefs.current[key];
    if (audio) {
      audio.currentTime = 0;
      audio.play().catch(e => console.log('Audio error:', e));
      currentlyPlaying.current = audio;
    }
  }, []);

  const tickerText = phrases.join(' • ') + ' • ';

  return (
    <div className="min-h-screen w-full flex flex-col items-center py-20 px-6 transition-colors duration-[2000ms] pb-32" style={{ backgroundColor: bgColor }}>
      
      {/* Header Stack (Concept 10 style) */}
      <header className="mb-20 text-center">
        <Link 
          href="/" 
          onMouseEnter={() => playSting('diesel')}
          className="font-brand text-[14vw] md:text-[9vw] uppercase text-white leading-none hover:scale-105 transition-transform inline-block select-none" 
          style={{ textShadow: '4px 4px 0px black' }}
        >
          DIESEL JENNY
        </Link>
        <div className="font-bebas text-2xl md:text-3xl text-white italic mt-2 opacity-90 select-none">'Like a rat up a drainpipe!'</div>
      </header>

      <main className="w-full max-w-2xl flex flex-col gap-16">
        
        {/* Bio Box (Concept 6 style) */}
        <section className="bg-black/10 backdrop-blur-sm p-8 md:p-12 border-4 border-black shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] hover:bg-black/20 transition-colors">
          <h2 className="font-brand text-3xl mb-6 uppercase text-white border-b-2 border-white/20 pb-2">Bio</h2>
          <p className="font-bebas text-2xl md:text-3xl leading-relaxed text-white tracking-wide">{bio}</p>
        </section>

        {/* Music Section (Bandcamp Embeds) */}
        <div className="flex flex-col gap-10">
          <h2 className="font-brand text-3xl uppercase text-white text-center" style={{ textShadow: '2px 2px 0px black' }}>Music</h2>
          {embeds.bandcamp.map((item, idx) => (
            <section key={idx} className="w-full border-4 border-black shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] bg-white overflow-hidden leading-[0]">
              <iframe 
                style={{ border: 0, width: '100%', height: '120px' }} 
                src={item.src} 
                seamless
                title={item.title}
              >
                <a href={item.link}>{item.title}</a>
              </iframe>
            </section>
          ))}
        </div>

        {/* Latest Updates Box (Concept 6 style) */}
        <section className="bg-white p-8 md:p-12 border-4 border-black shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] hover:scale-[1.01] transition-transform">
          <h2 className="font-brand text-2xl mb-4 uppercase text-black tracking-widest border-b-2 border-black/10 pb-2">Latest Activity</h2>
          <p className="font-bebas text-xl md:text-2xl text-black font-bold uppercase tracking-widest leading-snug">{latestUpdates}</p>
        </section>

        {/* Videos Section (YouTube Embeds) */}
        <div className="flex flex-col gap-10">
          <h2 className="font-brand text-3xl uppercase text-white text-center" style={{ textShadow: '2px 2px 0px black' }}>Videos</h2>
          {embeds.youtube.map((item, idx) => (
            <section key={idx} className="w-full aspect-video border-4 border-black shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] bg-black overflow-hidden leading-[0]">
              <iframe 
                width="100%" 
                height="100%" 
                src={item.src} 
                title={item.title} 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                referrerPolicy="strict-origin-when-cross-origin" 
                allowFullScreen
              ></iframe>
            </section>
          ))}
        </div>

        {/* Socials & Contact (Concept 10 style) */}
        <section className="flex flex-col items-center gap-10 pt-10">
          <nav className="flex flex-wrap justify-center gap-x-12 gap-y-6">
            <a 
              href={socialLinks.bandcamp} 
              target="_blank" 
              onMouseEnter={() => playSting('bandcamp')}
              className="text-white hover:text-black transition-all transform hover:scale-125"
            >
              <BandcampIcon size={44} />
            </a>
            <a 
              href={socialLinks.instagram} 
              target="_blank" 
              onMouseEnter={() => playSting('instagram')}
              className="text-white hover:text-black transition-all transform hover:scale-125"
            >
              <Instagram size={44} />
            </a>
            <a 
              href={socialLinks.youtube} 
              target="_blank" 
              className="text-white hover:text-black transition-all transform hover:scale-125"
            >
              <Youtube size={44} />
            </a>
            <a 
              href={socialLinks.tiktok} 
              target="_blank" 
              className="text-white hover:text-black transition-all transform hover:scale-125"
            >
              <TikTokIcon size={44} />
            </a>
            <a 
              href={socialLinks.facebook} 
              target="_blank" 
              className="text-white hover:text-black transition-all transform hover:scale-125"
            >
              <Facebook size={44} />
            </a>
          </nav>
          
          <div className="flex flex-col items-center gap-2 text-white font-bebas text-2xl md:text-3xl">
            <div className="flex items-center gap-3 bg-black/40 px-6 py-2 border-2 border-white/20 select-all">
              <Mail className="opacity-70" />
              <span>{contactEmail}</span>
            </div>
          </div>
        </section>

        <div className="text-center mt-8">
           <Link href="/" className="font-bebas text-xl text-white/50 hover:text-white uppercase tracking-[0.3em] transition-colors border border-white/10 px-8 py-3 hover:bg-white/10">
            Return to Entrance
          </Link>
        </div>
      </main>

      {/* Sticky Footer Ticker (Concept 8 style) */}
      <footer className="fixed bottom-0 left-0 w-full bg-black text-white py-3 border-t-4 border-black overflow-hidden whitespace-nowrap z-50">
        <motion.div 
          className="inline-block font-brand text-2xl md:text-3xl uppercase tracking-[0.2em] select-none"
          animate={{ x: [0, -2000] }}
          transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
        >
          {tickerText}{tickerText}{tickerText}{tickerText}
        </motion.div>
      </footer>
    </div>
  );
}
