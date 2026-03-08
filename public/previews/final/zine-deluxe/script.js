// No script needed for this concept yet, but creating the file for consistency.
document.addEventListener('DOMContentLoaded', () => {
    const socialIcons = document.querySelectorAll('.social-icon');
    const audioFiles = [
        'audio/Bounce 19-radio korrupt fm apoc [2025-07-04 112119]-2.mp3',
        'audio/Bro is that roti chanai.mp3',
        'audio/BROSKi [2025-07-01 183328].mp3'
    ];

    let audioContext = new (window.AudioContext || window.webkitAudioContext)();
    
    socialIcons.forEach(icon => {
        icon.addEventListener('mouseenter', () => {
            const randomAudio = audioFiles[Math.floor(Math.random() * audioFiles.length)];
            const audio = new Audio(randomAudio);
            audio.play();
        });
    });
});
