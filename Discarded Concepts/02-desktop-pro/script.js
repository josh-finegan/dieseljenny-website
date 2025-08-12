// script.js - Concept 2: Desktop Pro

document.addEventListener('DOMContentLoaded', () => {
    const desktop = document.getElementById('desktop');
    const windows = document.querySelectorAll('.window');
    const icons = document.querySelectorAll('.desktop-icon[data-window]');
    const timeEl = document.getElementById('time');
    const startButton = document.getElementById('start-button');
    const screensaver = document.getElementById('screensaver');
    const screensaverText = document.getElementById('screensaver-text');

    let activeWindow = null;
    let highestZ = 20;
    let inactivityTimer;

    const phrases = [
        '‘NEVER DONE THIS TO ME BEFORE!’',
        "'LIKE A RAT UP A DRAINPIPE!'",
        "'DAMN DIESEL!'",
        "'SANJAY'S SELECTIONS - THE OFFICIAL SPONSOR OF DIESEL JENNY'"
    ];
    const audioFiles = [ 'audio/Jamaican Horn Siren.mp3', 'audio/Jeeeers.mp3' ];

    // --- Core Functions ---
    function playSound(src) { new Audio(src).play(); }
    function updateTime() {
        timeEl.textContent = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }

    // --- Window Dragging ---
    function makeDraggable(windowEl) {
        const titleBar = windowEl.querySelector('.title-bar');
        let offsetX, offsetY;

        titleBar.addEventListener('mousedown', (e) => {
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
        });

        function onMouseMove(e) {
            if (!activeWindow) return;
            activeWindow.style.left = `${e.clientX - offsetX}px`;
            activeWindow.style.top = `${e.clientY - offsetY}px`;
        }
        function onMouseUp() { activeWindow = null; }
    }

    // --- Screensaver ---
    function resetInactivityTimer() {
        clearTimeout(inactivityTimer);
        screensaver.classList.remove('active');
        inactivityTimer = setTimeout(() => {
            screensaverText.textContent = phrases[Math.floor(Math.random() * phrases.length)];
            screensaver.classList.add('active');
        }, 15000); // 15 seconds
    }

    // --- Event Listeners ---
    windows.forEach(makeDraggable);
    icons.forEach(icon => {
        icon.addEventListener('click', () => {
            const windowEl = document.getElementById(icon.dataset.window);
            if (windowEl) {
                windowEl.classList.remove('hidden');
                highestZ++;
                windowEl.style.zIndex = highestZ;
                playSound(audioFiles[0]);
            }
        });
    });
    windows.forEach(win => {
        const closeButton = win.querySelector('.close');
        closeButton.addEventListener('click', () => {
            win.classList.add('hidden');
            playSound(audioFiles[1]);
        });
    });
    startButton.addEventListener('click', () => playSound(audioFiles[0]));

    // --- Init ---
    updateTime();
    setInterval(updateTime, 1000);
    document.addEventListener('mousemove', resetInactivityTimer);
    document.addEventListener('keypress', resetInactivityTimer);
    resetInactivityTimer();
    document.getElementById('video-window').classList.add('hidden');
});
