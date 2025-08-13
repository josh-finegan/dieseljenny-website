'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './zine-page.module.css';
import { bio, phrases, socialLinks, embeds, audioStings } from '../../lib/config';

export default function ZinePage() {
    const [isLightTheme, setIsLightTheme] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    const toggleTheme = () => setIsLightTheme(!isLightTheme);

    const playSound = () => {
        if (audioRef.current) {
            audioRef.current.pause();
        }
        const randomSting = audioStings[Math.floor(Math.random() * audioStings.length)];
        audioRef.current = new Audio(randomSting);
        audioRef.current.play();
    };

    return (
        <div className={`${styles.zineBody} ${isLightTheme ? styles.themeLight : styles.themeDark}`}>
            <div className={styles.gridContainer}>
                <header className={`${styles.gridItem} ${styles.logo}`}>
                    <Link href="/">
                        <Image src="/assets/dj-text-white.png" alt="Diesel Jenny Logo" width={300} height={50} className={styles.headerLogoImg} />
                    </Link>
                    <button className={styles.themeToggle} onClick={toggleTheme}>Invert</button>
                </header>

                <section className={`${styles.gridItem} ${styles.bio}`}>
                    <h2>About</h2>
                    <p>{bio}</p>
                </section>

                <section className={`${styles.gridItem} ${styles.bandcamp}`}>
                    <h2>Music</h2>
                    <div className={styles.embedContainer}>
                        <iframe style={{ border: 0, width: '100%', height: '100%' }} src={embeds.bandcamp} seamless></iframe>
                    </div>
                </section>

                <section className={`${styles.gridItem} ${styles.youtube}`}>
                    <h2>Video</h2>
                    <div className={styles.embedContainer}>
                        <iframe src={embeds.youtube} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                    </div>
                </section>

                <footer className={`${styles.gridItem} ${styles.social}`}>
                    <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer" title="Instagram" onMouseEnter={playSound}>
                        <Image src="/assets/face-illustration-white.png" alt="Instagram" width={48} height={48} />
                    </a>
                    <a href={socialLinks.bandcamp} target="_blank" rel="noopener noreferrer" title="Bandcamp" onMouseEnter={playSound}>
                        <Image src="/assets/face-illustration-white.png" alt="Bandcamp" width={48} height={48} />
                    </a>
                    <a href={socialLinks.facebook} target="_blank" rel="noopener noreferrer" title="Facebook" onMouseEnter={playSound}>
                        <Image src="/assets/face-illustration-white.png" alt="Facebook" width={48} height={48} />
                    </a>
                </footer>
            </div>
            <div className={styles.tickerWrap}>
                <div className={styles.ticker}>
                    {phrases.map(p => <span key={p}>{p}</span>)}
                </div>
            </div>
        </div>
    );
}