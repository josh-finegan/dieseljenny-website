// script.js - Concept 4: The Analog Desk

document.addEventListener('DOMContentLoaded', () => {
    const coffeeMug = document.getElementById('coffee-mug');
    const audioFiles = [
        'audio/Bounce 19-radio korrupt fm apoc [2025-07-04 112119]-2.mp3',
        'audio/Bro is that roti chanai.mp3',
        'audio/BROSKi [2025-07-01 183328].mp3'
    ];

    coffeeMug.addEventListener('click', () => {
        const randomAudio = audioFiles[Math.floor(Math.random() * audioFiles.length)];
        new Audio(randomAudio).play();
    });

    // Make items draggable (simplified version)
    const deskItems = document.querySelectorAll('.desk-item');
    deskItems.forEach(item => {
        let isDragging = false;
        let offsetX, offsetY;

        item.addEventListener('mousedown', (e) => {
            isDragging = true;
            offsetX = e.clientX - item.offsetLeft;
            offsetY = e.clientY - item.offsetTop;
            item.style.zIndex = 20; // Bring to front
        });

        document.addEventListener('mousemove', (e) => {
            if (isDragging) {
                item.style.left = `${e.clientX - offsetX}px`;
                item.style.top = `${e.clientY - offsetY}px`;
            }
        });

        document.addEventListener('mouseup', () => {
            isDragging = false;
            item.style.zIndex = 1;
        });
    });
});
