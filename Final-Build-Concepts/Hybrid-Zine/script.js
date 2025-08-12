document.addEventListener('DOMContentLoaded', () => {
    const socialIcons = document.querySelectorAll('.social-icon');
    const audioFiles = [
        'assets/AudioStings/Jamaican Horn Siren.mp3',
        'assets/AudioStings/Jeeeers.mp3',
        'assets/AudioStings/Oi who the fak.mp3'
    ];
    let currentAudio = null;

    function playSound(src) {
        // Choke the previous audio
        if (currentAudio) {
            currentAudio.pause();
            currentAudio.currentTime = 0;
        }
        
        currentAudio = new Audio(src);
        currentAudio.play();
    }

    socialIcons.forEach(icon => {
        icon.addEventListener('mouseenter', () => {
            const randomAudio = audioFiles[Math.floor(Math.random() * audioFiles.length)];
            playSound(randomAudio);
        });
    });
});
