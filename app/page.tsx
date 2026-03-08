'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Instagram, Facebook, Music } from 'lucide-react';
import Link from 'next/link';

const COLORS = ['#FF4000', '#0057FF', '#FF00C1', '#22E4AC'];

export default function LandingPage() {
  const [bgColor, setBgColor] = useState(COLORS[0]);
  const [activeModal, setActiveModal] = useState<'bandcamp' | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setBgColor((prev) => {
        const currentIndex = COLORS.indexOf(prev);
        return COLORS[(currentIndex + 1) % COLORS.length];
      });
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    document.documentElement.style.setProperty('--bg-color', bgColor);
  }, [bgColor]);

  const socialLinks = [
    { href: 'https://www.instagram.com/diesel__jenny/', icon: Instagram },
    { href: 'https://dieseljenny.bandcamp.com/', icon: Music },
    { href: 'https://www.facebook.com/DieselJenny/', icon: Facebook },
  ];

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden transition-colors duration-[2000ms]">
      {/* Social Orbit */}
      <motion.div 
        className="absolute w-[85vw] h-[85vw] max-w-[700px] max-h-[700px] pointer-events-none"
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      >
        {socialLinks.map((link, index) => {
          const angle = (index / socialLinks.length) * 2 * Math.PI;
          return (
            <motion.div
              key={link.href}
              className="absolute pointer-events-auto"
              style={{
                left: `calc(50% + ${Math.cos(angle) * 50}% - 20px)`,
                top: `calc(50% + ${Math.sin(angle) * 50}% - 20px)`,
              }}
              animate={{ rotate: -360 }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            >
              <a 
                href={link.href} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white hover:text-black transition-colors"
              >
                <link.icon size={40} strokeWidth={1.5} />
              </a>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Main Content */}
      <div className="relative z-10 text-center flex flex-col items-center">
        <motion.h1 
          className="font-brand text-[15vw] leading-none uppercase select-none"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          style={{ textShadow: '4px 4px 0px black' }}
        >
          DIESEL JENNY
        </motion.h1>

        <motion.h2
          className="font-bebas italic text-[6vw] sm:text-[4vw] mt-2 select-none"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          style={{ textShadow: '2px 2px 0px black' }}
        >
          'Like a rat up a drainpipe!'
        </motion.h2>

        <nav className="mt-16 flex flex-wrap justify-center gap-x-12 gap-y-6 text-[5vw] sm:text-[3vw] uppercase font-bebas tracking-widest">
          <button 
            onClick={() => setActiveModal('bandcamp')}
            className="hover:scale-110 hover:text-black transition-all"
          >
            Bandcamp
          </button>
          
          <Link 
            href="/home"
            className="hover:scale-110 hover:text-black transition-all"
          >
            Home
          </Link>

          <a 
            href="https://www.instagram.com/diesel__jenny/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:scale-110 hover:text-black transition-all"
          >
            Instagram
          </a>
        </nav>
      </div>

      {/* Modals */}
      <AnimatePresence>
        {activeModal && (
          <motion.div 
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveModal(null)}
          >
            <motion.div 
              className="relative bg-black p-4 rounded-lg shadow-2xl"
              initial={{ scale: 0.8, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                className="absolute -top-10 -right-2 text-white text-3xl hover:text-red-500 transition-colors"
                onClick={() => setActiveModal(null)}
              >
                &times;
              </button>
              
              <iframe 
                className="w-[300px] h-[450px] sm:w-[350px] sm:h-[470px] border-0"
                src="https://bandcamp.com/EmbeddedPlayer/album=3807677691/size=large/bgcol=333333/linkcol=00ffff/tracklist=false/transparent=true/" 
                seamless
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
