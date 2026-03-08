'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Instagram, Youtube, Facebook } from 'lucide-react';
import Link from 'next/link';

const COLORS = ['#FF4000', '#0057FF', '#FF00C1', '#22E4AC'];
const PHRASES = [
  '‘NEVER DONE THIS TO ME BEFORE!’',
  '\'LIKE A RAT UP A DRAINPIPE!\'',
  '\'DAMN DIESEL!\'',
  '\'SANJAY\'S SELECTIONS - THE OFFICIAL SPONSOR OF DIESEL JENNY\''
];

const BandcampIcon = ({ size = 24, className = "" }: { size?: number, className?: string }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M0 18.75l7.437-13.5H24l-7.438 13.5H0z"/>
  </svg>
);

const TikTokIcon = ({ size = 24, className = "" }: { size?: number, className?: string }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.17-2.86-.6-4.12-1.31a6.38 6.38 0 0 1-1.87-1.48v7.24c0 1.27-.13 2.56-.63 3.73-.69 1.67-1.95 3.09-3.59 3.86-1.58.74-3.39.98-5.11.74-1.72-.24-3.34-.99-4.63-2.17C1.19 19.3.43 17.58.19 15.79c-.21-1.61.05-3.26.75-4.71.69-1.44 1.83-2.67 3.23-3.43 1.4-.76 3.03-1.07 4.62-.93v4.14c-1.11-.14-2.29.13-3.2.78-1.05.74-1.58 2.02-1.42 3.29.13 1.05.7 2.05 1.59 2.61.94.59 2.11.72 3.16.37 1.14-.37 2.03-1.29 2.4-2.4.15-.45.21-.92.21-1.39V.02z"/>
  </svg>
);

export default function LandingPage() {
  const [bgColor, setBgColor] = useState(COLORS[0]);
  const [selectedPhrase, setSelectedPhrase] = useState('');
  const audioRefs = useRef<Record<string, HTMLAudioElement>>({});

  useEffect(() => {
    // Pick random phrase on mount
    setSelectedPhrase(PHRASES[Math.floor(Math.random() * PHRASES.length)]);

    // Preload audio stings
    const stings = {
      diesel: '/assets/AudioStings/dieseljenny2.mp3',
      rat: '/assets/AudioStings/ratupadrainpipe.mp3',
      home: '/assets/AudioStings/supbroski.mp3',
      instagram: '/assets/AudioStings/brothermango.mp3',
      bandcamp: '/assets/AudioStings/horn.mp3'
    };

    Object.entries(stings).forEach(([key, src]) => {
      audioRefs.current[key] = new Audio(src);
    });

    const interval = setInterval(() => {
      setBgColor((prev) => {
        const currentIndex = COLORS.indexOf(prev);
        return COLORS[(currentIndex + 1) % COLORS.length];
      });
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const playSting = useCallback((key: string) => {
    const audio = audioRefs.current[key];
    if (audio) {
      audio.currentTime = 0;
      audio.play().catch(e => console.log('Audio error:', e));
    }
  }, []);

  useEffect(() => {
    document.documentElement.style.setProperty('--bg-color', bgColor);
  }, [bgColor]);

  const socialLinks = [
    { href: 'https://dieseljenny.bandcamp.com/', icon: BandcampIcon },
    { href: 'https://www.instagram.com/diesel__jenny/', icon: Instagram },
    { href: 'https://www.youtube.com/@DieselJenny', icon: Youtube },
    { href: 'https://www.tiktok.com/@dieseljenny', icon: TikTokIcon },
    { href: 'https://www.facebook.com/DieselJenny/', icon: Facebook },
  ];

  // Dynamic font size logic for phrase
  // 'LIKE A RAT UP A DRAINPIPE!' is ~26 chars. We use text-[4.2vw] / text-[2.8vw] (sm)
  // If phrase is longer, scale down.
  const getPhraseStyle = (phrase: string) => {
    const defaultChars = 26;
    const charLen = phrase.length;
    if (charLen <= defaultChars) return {};
    
    // Scale down proportionally to fit the same visual width
    const scale = defaultChars / charLen;
    return {
      fontSize: `clamp(1rem, ${scale * 4.2}vw, ${scale * 2.8}vw)`
    };
  };

  // Improved phrase styling approach using tailwind classes and a custom override
  const phraseBaseSize = "text-[4.2vw] sm:text-[2.8vw]";
  const isLongPhrase = selectedPhrase.length > 30;

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden transition-colors duration-[2000ms]">
      {/* Social Orbit */}
      <motion.div 
        className="absolute w-[85vw] h-[85vw] max-w-[750px] max-h-[750px] pointer-events-none"
        animate={{ rotate: 360 }}
        transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
      >
        {socialLinks.map((link, index) => {
          const angle = (index / socialLinks.length) * 2 * Math.PI;
          return (
            <motion.div
              key={link.href}
              className="absolute pointer-events-auto"
              style={{
                left: `calc(50% + ${Math.cos(angle) * 50}% - 22px)`,
                top: `calc(50% + ${Math.sin(angle) * 50}% - 22px)`,
              }}
              animate={{ rotate: -360 }}
              transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
            >
              <a 
                href={link.href} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white hover:text-black transition-colors"
              >
                <link.icon size={44} className="transition-all" />
              </a>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Main Content */}
      <div className="relative z-10 text-center flex flex-col items-center">
        <motion.h1 
          onMouseEnter={() => playSting('diesel')}
          whileHover={{ scale: 1.05 }}
          className="font-brand text-[10.5vw] leading-none uppercase select-none cursor-default"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          style={{ textShadow: '4px 4px 0px black' }}
        >
          DIESEL JENNY
        </motion.h1>

        <motion.h2
          onMouseEnter={() => playSting('rat')}
          whileHover={{ scale: 1.05 }}
          className={`font-bebas italic mt-2 select-none cursor-default whitespace-nowrap px-4 ${isLongPhrase ? 'text-[2.5vw] sm:text-[1.8vw]' : phraseBaseSize}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          style={{ textShadow: '2px 2px 0px black' }}
        >
          {selectedPhrase}
        </motion.h2>

        <nav className="mt-28 flex flex-wrap justify-center gap-x-12 gap-y-6 text-[5vw] sm:text-[3vw] uppercase font-bebas tracking-widest">
          <a 
            onMouseEnter={() => playSting('bandcamp')}
            href="https://dieseljenny.bandcamp.com/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:scale-110 hover:text-black transition-all"
          >
            Bandcamp
          </a>
          
          <Link 
            onMouseEnter={() => playSting('home')}
            href="/home"
            className="hover:scale-110 hover:text-black transition-all"
          >
            Home
          </Link>

          <a 
            onMouseEnter={() => playSting('instagram')}
            href="https://www.instagram.com/diesel__jenny/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:scale-110 hover:text-black transition-all"
          >
            Instagram
          </a>
        </nav>
      </div>
    </div>
  );
}
