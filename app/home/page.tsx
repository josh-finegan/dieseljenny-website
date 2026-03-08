'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

const COLORS = ['#FF4000', '#0057FF', '#FF00C1', '#22E4AC'];

export default function HomeIndex() {
  const [bgColor, setBgColor] = useState(COLORS[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setBgColor((prev) => COLORS[(COLORS.indexOf(prev) + 1) % COLORS.length]);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const concepts = [
    { id: 6, name: 'Concept 6: Brutalist Column', description: 'Grounded, industrial, and centered.' },
    { id: 7, name: 'Concept 7: Modular Grid', description: 'Editorial layout with a small press photo.' },
    { id: 8, name: 'Concept 8: Ticker Lead', description: 'Horizontal scrolling updates with static sidebar.' },
    { id: 9, name: 'Concept 9: Two-Tone Split', description: 'High-contrast sidebar with fading content area.' },
    { id: 10, name: 'Concept 10: Centered Stack', description: 'Clean, zen-like vertical stack with whitespace.' },
  ];

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-8 transition-colors duration-[2000ms]" style={{ backgroundColor: bgColor }}>
      <h1 className="font-brand text-6xl md:text-8xl text-white mb-12 uppercase" style={{ textShadow: '4px 4px 0px black' }}>
        Home Concepts
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl w-full">
        {concepts.map((c) => (
          <Link 
            key={c.id} 
            href={`/home/concept-${c.id}`}
            className="group bg-black/80 p-8 border-4 border-black hover:bg-white transition-all shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
          >
            <h2 className="font-brand text-3xl text-white group-hover:text-black uppercase mb-4">{c.name}</h2>
            <p className="font-bebas text-xl text-white/70 group-hover:text-black/70 italic">{c.description}</p>
          </Link>
        ))}
      </div>
      <Link href="/" className="mt-16 font-bebas text-2xl text-white hover:underline underline-offset-8 decoration-white uppercase tracking-widest">
        Back to Splash
      </Link>
    </div>
  );
}
