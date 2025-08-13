'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './zine-page.module.css';

export default function ZinePage() {
    const [isLightTheme, setIsLightTheme] = useState(false);

    const toggleTheme = () => {
        setIsLightTheme(!isLightTheme);
    };

    return (
        <div className={`${styles.zineBody} ${isLightTheme ? styles.themeLight : styles.themeDark}`}>
            <div className={styles.gridContainer}>
                <header className={`${styles.gridItem} ${styles.logo}`}>
                    <Link href="/">
                        <Image src="/assets/dj-text-white.png" alt="Diesel Jenny Logo" width={300} height={50} className={styles.headerLogoImg} />
                    </Link>
                    <button id={styles.themeToggle} onClick={toggleTheme}>Invert</button>
                </header>

                <section className={`${styles.gridItem} ${styles.bio}`}>
                    <h2>About</h2>
                    <p>Diesel Jenny launches their debut release, a double A-side as part of their new white label series. The ferociously rungle two-tracker is the first trip out under a new moniker from veteran Pōneke-based producer Josh Finegan (fka ABG).</p>
                </section>

                <section className={`${styles.gridItem} ${styles.bandcamp}`}>
                    <h2>Music</h2>
                    <div className={styles.embedContainer}>
                        <iframe style={{ border: 0, width: '100%', height: '100%' }} src="https://bandcamp.com/EmbeddedPlayer/album=3807677691/size=large/bgcol=333333/linkcol=ffffff/tracklist=false/transparent=true/" seamless><a href="https://dieseljenny.bandcamp.com/album/dexy-heartbeat-gerbil">Dexy Heartbeat/Gerbil by Diesel Jenny</a></iframe>
                    </div>
                </section>

                <section className={`${styles.gridItem} ${styles.youtube}`}>
                    <h2>Video</h2>
                    <div className={styles.embedContainer}>
                        <iframe src="https://www.youtube.com/embed/6I3w-xRergs?si=iUfbDbHhb789Lh5Q&modestbranding=1&controls=0" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                    </div>
                </section>

                <footer className={`${styles.gridItem} ${styles.social}`}>
                    <a href="https://www.instagram.com/diesel__jenny/" target="_blank" rel="noopener noreferrer" title="Instagram">
                        <Image src="/assets/icon-instagram.svg" alt="Instagram" width={32} height={32} />
                    </a>
                    <a href="https://dieseljenny.bandcamp.com/" target="_blank" rel="noopener noreferrer" title="Bandcamp">
                        <Image src="/assets/icon-bandcamp.svg" alt="Bandcamp" width={32} height={32} />
                    </a>
                    <a href="https://www.facebook.com/DieselJenny/" target="_blank" rel="noopener noreferrer" title="Facebook">
                        <Image src="/assets/icon-facebook.svg" alt="Facebook" width={32} height={32} />
                    </a>
                </footer>
            </div>
        </div>
    );
}
