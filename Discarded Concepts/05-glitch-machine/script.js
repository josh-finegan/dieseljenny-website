// script.js - Concept 5: The Glitch Machine

document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('machine-container');
    const contentWindow = document.getElementById('content-window');
    const contentInner = document.getElementById('content-inner');
    const closeButton = document.getElementById('close-content');
    const phraseDisplay = document.getElementById('phrase-display');
    const instruction = document.getElementById('instruction');

    const phrases = [ /* ... phrases from file ... */ ];
    const audioFiles = [ /* ... audio files from folder ... */ ];
    const content = {
        'Bio': '<p>Diesel Jenny launches their debut release...</p>',
        'Music': '<iframe style="border: 0; width: 100%; height: 470px;" src="https://bandcamp.com/EmbeddedPlayer/album=3807677691/size=large/bgcol=ffffff/linkcol=0687f5/tracklist=false/transparent=true/" seamless></iframe>',
        'Video': '<iframe width="100%" height="315" src="https://www.youtube.com/embed/6I3w-xRergs?si=iUfbDbHhb789Lh5Q" frameborder="0" allowfullscreen></iframe>'
    };
    const contentKeys = Object.keys(content);

    let chaosInterval;
    let soundInterval;

    function startChaos() {
        instruction.classList.add('hidden');
        chaosInterval = setInterval(() => {
            const randomKey = contentKeys[Math.floor(Math.random() * contentKeys.length)];
            phraseDisplay.textContent = randomKey;
        }, 200);

        soundInterval = setInterval(() => {
            const randomAudio = audioFiles[Math.floor(Math.random() * audioFiles.length)];
            new Audio(randomAudio).play();
        }, 500);
    }

    function stopChaos() {
        instruction.classList.remove('hidden');
        clearInterval(chaosInterval);
        clearInterval(soundInterval);
        
        const selectedContentKey = phraseDisplay.textContent;
        contentInner.innerHTML = `<h2>${selectedContentKey}</h2>${content[selectedContentKey]}`;
        contentWindow.classList.remove('hidden');
    }

    container.addEventListener('mousedown', startChaos);
    container.addEventListener('mouseup', stopChaos);
    closeButton.addEventListener('click', () => contentWindow.classList.add('hidden'));

    // Load phrases and audio files dynamically (simplified for concept)
    // In a real app, you'd fetch these.
    phrases.push('‘NEVER DONE THIS TO ME BEFORE!’', "'LIKE A RAT UP A DRAINPIPE!'");
    audioFiles.push('audio/Jamaican Horn Siren.mp3', 'audio/Jeeeers.mp3');
});
