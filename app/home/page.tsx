'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Draggable from 'react-draggable';
import styles from './desktop-page.module.css';

const phrases = [
    '‘NEVER DONE THIS TO ME BEFORE!’', "'LIKE A RAT UP A DRAINPIPE!'",
    "'DAMN DIESEL!'", "'SANJAY'S SELECTIONS - THE OFFICIAL SPONSOR OF DIESEL JENNY'"
];
const audioFiles = [
    '/assets/AudioStings/Jamaican Horn Siren.mp3', '/assets/AudioStings/Jeeeers.mp3',
    '/assets/AudioStings/Oi who the fak.mp3', '/assets/AudioStings/Bro is that roti chanai.mp3'
];

const initialWindows = {
    bio: { title: 'README.TXT', isOpen: true, isMinimized: false, zIndex: 2, position: { x: 50, y: 50 } },
    music: { title: 'MUSIC.EXE', isOpen: true, isMinimized: false, zIndex: 1, position: { x: 250, y: 100 } },
    video: { title: 'VIDEO.AVI', isOpen: false, isMinimized: false, zIndex: 1, position: { x: 150, y: 150 } },
};

export default function HomePage() {
    const [windows, setWindows] = useState(initialWindows);
    const [time, setTime] = useState('');
    const [phrase, setPhrase] = useState(phrases[0]);
    const audioRef = useRef(null);
    const [highestZ, setHighestZ] = useState(2);

    useEffect(() => {
        const timer = setInterval(() => {
            setTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const playSound = (src) => {
        if (audioRef.current) {
            audioRef.current.pause();
        }
        audioRef.current = new Audio(src);
        audioRef.current.play();
    };

    const bringToFront = (windowId) => {
        const newZ = highestZ + 1;
        setHighestZ(newZ);
        setWindows(prev => ({
            ...prev,
            [windowId]: { ...prev[windowId], zIndex: newZ }
        }));
    };

    const handleIconClick = (windowId) => {
        setWindows(prev => ({
            ...prev,
            [windowId]: { ...prev[windowId], isOpen: true, isMinimized: false }
        }));
        bringToFront(windowId);
        playSound(audioFiles[0]);
    };

    const handleCloseWindow = (windowId) => {
        setWindows(prev => ({ ...prev, [windowId]: { ...prev[windowId], isOpen: false } }));
        playSound(audioFiles[1]);
    };

    const handleMinimizeWindow = (windowId) => {
        setWindows(prev => ({ ...prev, [windowId]: { ...prev[windowId], isMinimized: true } }));
        playSound(audioFiles[1]);
    };
    
    const handleTaskbarClick = (windowId) => {
        setWindows(prev => ({
            ...prev,
            [windowId]: { ...prev[windowId], isMinimized: false }
        }));
        bringToFront(windowId);
    }

    const handleStartClick = () => {
        const randomIndex = Math.floor(Math.random() * phrases.length);
        setPhrase(phrases[randomIndex]);
        playSound(audioFiles[2]);
    };

    return (
        <div className={styles.desktopPage}>
            <div className={styles.desktop}>
                {/* Icons */}
                <DesktopIcon icon="icon-readme.svg" name="README.TXT" onClick={() => handleIconClick('bio')} position={{top: 20, left: 20}} />
                <DesktopIcon icon="icon-music.svg" name="MUSIC.EXE" onClick={() => handleIconClick('music')} position={{top: 120, left: 25}} />
                <DesktopIcon icon="icon-video.svg" name="VIDEO.AVI" onClick={() => handleIconClick('video')} position={{top: 220, left: 20}} />
                <DesktopIcon icon="icon-instagram.svg" name="INSTGRM.URL" href="https://www.instagram.com/diesel__jenny/" position={{top: 320, left: 22}} />
                <DesktopIcon icon="icon-bandcamp.svg" name="BNDCMP.URL" href="https://dieseljenny.bandcamp.com/" position={{top: 20, left: 120}} />
                <DesktopIcon icon="icon-facebook.svg" name="FCBOOK.URL" href="https://www.facebook.com/DieselJenny/" position={{top: 120, left: 125}} />

                {/* Windows */}
                {Object.entries(windows).map(([id, win]) => (
                    win.isOpen && !win.isMinimized && (
                        <Window key={id} id={id} {...win}
                            onClose={handleCloseWindow}
                            onMinimize={handleMinimizeWindow}
                            onMouseDown={() => bringToFront(id)}
                        />
                    )
                ))}
            </div>
            <div className={styles.taskbar}>
                <div className={styles.startButton} onClick={handleStartClick}>
                    <Image src="/assets/logo-black.png" alt="Start" width={20} height={20} />
                    <span>Start</span>
                </div>
                <div className={styles.taskbarPrograms}>
                    {Object.entries(windows).map(([id, win]) => (
                        win.isOpen && win.isMinimized && (
                            <div key={id} className={styles.taskbarTab} onClick={() => handleTaskbarClick(id)}>
                                {win.title}
                            </div>
                        )
                    ))}
                </div>
                <div className={styles.phraseTicker}>{phrase}</div>
                <div className={styles.time}>{time}</div>
            </div>
        </div>
    );
}

const DesktopIcon = ({ icon, name, onClick, href, position }) => {
    const content = (
        <>
            <Image src={`/assets/${icon}`} alt={name} width={48} height={48} />
            <span>{name}</span>
        </>
    );
    if (href) {
        return <a href={href} target="_blank" rel="noopener noreferrer" className={styles.desktopIcon} style={position}>{content}</a>;
    }
    return <div className={styles.desktopIcon} style={position} onClick={onClick}>{content}</div>;
};

const Window = ({ id, title, children, onClose, onMinimize, onMouseDown }) => {
    const content = {
        bio: <>
            <p><strong>DIESEL JENNY</strong></p>
            <p>Diesel Jenny launches their debut release, a double A-side as part of their new white label series. The ferociously rungle two-tracker is the first trip out under a new moniker from veteran Pōneke-based producer Josh Finegan (fka ABG).</p>
        </>,
        music: <iframe style={{ border: 0, width: '100%', height: '470px' }} src="https://bandcamp.com/EmbeddedPlayer/album=3807677691/size=large/bgcol=ffffff/linkcol=0687f5/tracklist=false/transparent=true/" seamless></iframe>,
        video: <iframe width="560" height="315" src="https://www.youtube.com/embed/6I3w-xRergs?si=iUfbDbHhb789Lh5Q" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
    };

    return (
        <Draggable handle={`.${styles.titleBar}`} onMouseDown={onMouseDown}>
            <div className={styles.window} style={{ zIndex: 10 }}>
                <div className={styles.titleBar}>
                    <Image src="/assets/dj-text-white.png" alt="" width={16} height={16} className={styles.titleIcon} />
                    <span className={styles.title}>{title}</span>
                    <div className={styles.buttons}>
                        <button className={styles.minimizeBtn} onClick={() => onMinimize(id)}>_</button>
                        <button className={styles.closeBtn} onClick={() => onClose(id)}>X</button>
                    </div>
                </div>
                <div className={`${styles.content} ${id === 'video' ? styles.videoContent : ''}`}>
                    {content[id]}
                </div>
            </div>
        </Draggable>
    );
};