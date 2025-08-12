document.addEventListener('DOMContentLoaded', () => {
    const desktop = document.getElementById('desktop');
    const windows = document.querySelectorAll('.window');
    const icons = document.querySelectorAll('.desktop-icon[data-window]');
    const timeEl = document.getElementById('time');
    const startButton = document.getElementById('start-button');
    const phraseTicker = document.getElementById('phrase-ticker');
    const taskbarPrograms = document.getElementById('taskbar-programs');

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

    function playSound(src) {
        if (currentAudio) {
            currentAudio.pause();
            currentAudio.currentTime = 0;
        }
        currentAudio = new Audio(src);
        currentAudio.play();
    }

    function updateTime() {
        timeEl.textContent = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }

    function setActive(windowEl) {
        windows.forEach(w => w.classList.remove('active'));
        if (windowEl) {
            highestZ++;
            windowEl.style.zIndex = highestZ;
            windowEl.classList.add('active');
        }
        updateTaskbar();
    }

    function makeDraggable(windowEl) {
        const titleBar = windowEl.querySelector('.title-bar');
        let offsetX, offsetY;

        titleBar.addEventListener('mousedown', (e) => {
            if (e.target.tagName === 'BUTTON') return;
            e.preventDefault();
            offsetX = e.clientX - windowEl.offsetLeft;
            offsetY = e.clientY - windowEl.offsetTop;
            setActive(windowEl);
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

    function updateTaskbar() {
        taskbarPrograms.innerHTML = '';
        windows.forEach(win => {
            if (!win.classList.contains('hidden')) {
                const tab = document.createElement('div');
                tab.className = 'taskbar-tab';
                if (win.classList.contains('active')) {
                    tab.classList.add('active');
                }
                tab.textContent = win.querySelector('.title').textContent;
                tab.onclick = () => setActive(win);
                taskbarPrograms.appendChild(tab);
            }
        });
    }

    windows.forEach(makeDraggable);

    icons.forEach(icon => {
        icon.addEventListener('click', (e) => {
            if (icon.dataset.window) {
                e.preventDefault();
                const windowEl = document.getElementById(icon.dataset.window);
                if (windowEl) {
                    windowEl.classList.remove('hidden');
                    setActive(windowEl);
                    playSound(audioFiles[0]);
                }
            }
        });
    });

    document.querySelectorAll('.close-btn').forEach(button => {
        button.addEventListener('click', () => {
            document.getElementById(button.dataset.window).classList.add('hidden');
            playSound(audioFiles[1]);
            updateTaskbar();
        });
    });

    document.querySelectorAll('.minimize-btn').forEach(button => {
        button.addEventListener('click', () => {
            const windowEl = document.getElementById(button.dataset.window);
            windowEl.classList.add('hidden');
            
            const tab = document.createElement('div');
            tab.className = 'taskbar-tab';
            tab.textContent = windowEl.querySelector('.title').textContent;
            tab.onclick = () => {
                windowEl.classList.remove('hidden');
                setActive(windowEl);
                taskbarPrograms.removeChild(tab);
            };
            taskbarPrograms.appendChild(tab);
            
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
    updateTaskbar();
});