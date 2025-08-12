document.addEventListener('DOMContentLoaded', () => {
    const desktop = document.getElementById('desktop');
    const windows = document.querySelectorAll('.window');
    const icons = document.querySelectorAll('.desktop-icon[data-window]');
    const timeEl = document.getElementById('time');
    const startButton = document.getElementById('start-button');
    const phraseTicker = document.getElementById('phrase-ticker');

    let activeWindow = null;
    let highestZ = 10;
    let currentAudio = null;

    const phrases = [
        '‘NEVER DONE THIS TO ME BEFORE!’', "'LIKE A RAT UP A DRAINPIPE!'",
        "'DAMN DIESEL!'", "'SANJAY'S SELECTIONS - THE OFFICIAL SPONSOR OF DIESEL JENNY'"
    ];
    const audioFiles = [
        'assets/AudioStings/Jamaican Horn Siren.mp3', 'assets/AudioStings/Jeeeers.mp3',
        'assets/AudioStings/Oi who the fak.mp3', 'assets/AudioStings/Bro is that roti chanai.mp3'
    ];

    function playSound(src, choke = true) {
        if (choke && currentAudio) {
            currentAudio.pause();
            currentAudio.currentTime = 0;
        }
        currentAudio = new Audio(src);
        currentAudio.play();
    }

    function updateTime() {
        timeEl.textContent = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }

    function makeDraggable(windowEl) {
        const titleBar = windowEl.querySelector('.title-bar');
        let offsetX, offsetY;

        const onMouseDown = (e) => {
            e.preventDefault();
            offsetX = e.clientX - windowEl.offsetLeft;
            offsetY = e.clientY - windowEl.offsetTop;
            highestZ++;
            windows.forEach(w => w.classList.remove('active'));
            windowEl.classList.add('active');
            windowEl.style.zIndex = highestZ;
            activeWindow = windowEl;
            document.addEventListener('mousemove', onMouseMove);
            document.addEventListener('mouseup', onMouseUp);
        };

        const onMouseMove = (e) => {
            if (!activeWindow) return;
            activeWindow.style.left = `${e.clientX - offsetX}px`;
            activeWindow.style.top = `${e.clientY - offsetY}px`;
        };

        const onMouseUp = () => {
            activeWindow = null;
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
        };

        titleBar.addEventListener('mousedown', onMouseDown);
    }

    windows.forEach(makeDraggable);

    icons.forEach(icon => {
        icon.addEventListener('click', (e) => {
            if (icon.dataset.window) {
                e.preventDefault();
                const windowEl = document.getElementById(icon.dataset.window);
                if (windowEl) {
                    windowEl.classList.remove('hidden');
                    highestZ++;
                    windowEl.style.zIndex = highestZ;
                    playSound(audioFiles[0]);
                }
            }
        });
    });

    document.querySelectorAll('.close-btn').forEach(button => {
        button.addEventListener('click', () => {
            document.getElementById(button.dataset.window).classList.add('hidden');
            playSound(audioFiles[1]);
        });
    });
    
    startButton.addEventListener('click', () => {
        const randomIndex = Math.floor(Math.random() * phrases.length);
        phraseTicker.textContent = phrases[randomIndex];
        playSound(audioFiles[2]);
    });

    updateTime();
    setInterval(updateTime, 1000);
});
