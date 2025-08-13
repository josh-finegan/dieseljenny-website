// script.js - Concept C: Kinetic Typography

document.addEventListener('DOMContentLoaded', () => {
    // --- BG Color Changer ---
    const colors = ['#FF4000', '#0057FF', '#FF00C1', '#22E4AC'];
    let currentColorIndex = 0;
    setInterval(() => {
        currentColorIndex = (currentColorIndex + 1) % colors.length;
        document.body.style.setProperty('--bg-color', colors[currentColorIndex]);
    }, 5000);

    // --- Social Icon Orbit ---
    const socialOrbit = document.querySelector('.social-orbit');
    const socialLinks = [
        { href: 'https://www.instagram.com/diesel__jenny/', icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>' },
        { href: 'https://dieseljenny.bandcamp.com/', icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M0 18.1l3.9-1.9v-13l16.2 8.1-16.2 8.1z"/></svg>' },
        { href: 'https://www.facebook.com/DieselJenny/', icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>' }
    ];
    const radius = socialOrbit.offsetWidth / 2;
    socialLinks.forEach((link, index) => {
        const angle = (index / socialLinks.length) * 2 * Math.PI;
        const x = radius + radius * Math.cos(angle) - 20; // -20 to center icon
        const y = radius + radius * Math.sin(angle) - 20;
        const iconDiv = document.createElement('div');
        iconDiv.className = 'social-icon';
        iconDiv.style.left = `${x}px`;
        iconDiv.style.top = `${y}px`;
        iconDiv.innerHTML = `<a href="${link.href}" target="_blank" rel="noopener noreferrer">${link.icon}</a>`;
        socialOrbit.appendChild(iconDiv);
    });

    // --- Modal Logic ---
    const musicLink = document.getElementById('music-link');
    const videoLink = document.getElementById('video-link');
    const musicModal = document.getElementById('music-modal');
    const videoModal = document.getElementById('video-modal');
    const closeButtons = document.querySelectorAll('.close-modal');

    function openModal(modal) {
        modal.classList.add('visible');
    }

    function closeModal(modal) {
        modal.classList.remove('visible');
    }

    musicLink.addEventListener('click', (e) => {
        e.preventDefault();
        openModal(musicModal);
    });

    videoLink.addEventListener('click', (e) => {
        e.preventDefault();
        openModal(videoModal);
    });

    closeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            closeModal(btn.closest('.modal-container'));
        });
    });
    
    document.querySelectorAll('.modal-container').forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal(modal);
            }
        });
    });
});
