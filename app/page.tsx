import Image from 'next/image';
import Link from 'next/link';
import styles from './landing-page.module.css';

export default function LandingPage() {
  return (
    <div className={styles.landingBody}>
      <main className={styles.monolithContainer}>
        <header className={styles.logo}>
          <Image 
            src="/assets/dj-text-white.png" 
            alt="Diesel Jenny" 
            width={500} 
            height={100} 
            priority 
          />
        </header>
        <nav className={styles.links}>
          <Link href="/home">Home</Link>
          <a href="https://www.instagram.com/diesel__jenny/" target="_blank" rel="noopener noreferrer">Instagram</a>
          <a href="https://dieseljenny.bandcamp.com/" target="_blank" rel="noopener noreferrer">Bandcamp</a>
        </nav>
      </main>
    </div>
  );
}
