// script.js - Concept 3: The Soundboard

document.addEventListener('DOMContentLoaded', () => {
    const mainGrid = document.getElementById('main-grid');
    const glitchBg = document.getElementById('glitch-background');
    const secretMenu = document.getElementById('secret-menu');
    const closeMenuButton = document.querySelector('.close-menu');

    const phrases = [
        '‘NEVER DONE THIS TO ME BEFORE!’', "'LIKE A RAT UP A DRAINPIPE!'",
        "'DAMN DIESEL!'", "'SANJAY'S SELECTIONS'"
    ];
    const images = [ 'images/face-illustration-black.png', 'images/dj-text-black.png' ];
    const audioFiles = [
        'audio/Bounce 19-radio korrupt fm apoc [2025-07-04 112119]-2.mp3', 'audio/Bro is that roti chanai.mp3',
        'audio/BROSKi [2025-07-01 183328].mp3', 'audio/BROTHER MANGFO [2025-07-01 183318].mp3',
        'audio/Diesel (Bounce) (Bounce) [2025-07-01 183937].mp3', 'audio/DIESEL [2025-07-01 183754].mp3',
        'audio/Jamaican Horn Siren.mp3', 'audio/Jeeeers.mp3', 'audio/Oi who the fak.mp3',
        'audio/peopledonothing-successvocals.mp3', 'audio/radio korrupt fm apoc (Bounce) [2025-07-04 112341].mp3',
        'audio/RAT (Bounce) [2025-07-01 183940].mp3', 'audio/SCI FI (Bounce) [2025-07-01 183936].mp3'
    ];

    // Create the soundboard grid
    for (let i = 0; i < 20; i++) {
        const button = document.createElement('div');
        button.className = 'grid-button';
        
        const phrase = phrases[i % phrases.length];
        button.textContent = phrase;

        button.addEventListener('click', () => {
            // Play random sound
            const randomAudio = audioFiles[Math.floor(Math.random() * audioFiles.length)];
            new Audio(randomAudio).play();

            // Show glitch effect
            const randomImage = images[Math.floor(Math.random() * images.length)];
            glitchBg.style.backgroundImage = `url(${randomImage})`;
            glitchBg.classList.add('active');
            setTimeout(() => glitchBg.classList.remove('active'), 200);
        });
        mainGrid.appendChild(button);
    }

    // Secret menu logic
    function toggleSecretMenu() {
        secretMenu.classList.toggle('hidden');
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            toggleSecretMenu();
        }
    });
    closeMenuButton.addEventListener('click', toggleSecretMenu);
});
