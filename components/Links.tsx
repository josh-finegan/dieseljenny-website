// components/Links.tsx
import { navLinks } from '@/lib/config';

export function Links() {
  return (
    <nav className="mt-8 flex justify-center gap-x-6">
      {navLinks.map((link) => (
        <a
          key={link.href}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xl uppercase tracking-wider hover:text-gray-400 transition-colors"
        >
          {link.label}
        </a>
      ))}
    </nav>
  );
}
