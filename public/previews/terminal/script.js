// script.js - Concept 4: The Terminal

document.addEventListener('DOMContentLoaded', () => {
    const output = document.getElementById('output');
    const cursor = document.getElementById('cursor');
    const lines = [
        { text: 'Booting Diesel Jenny OS...', delay: 100 },
        { text: 'Kernel loaded. Welcome.', delay: 200 },
        { text: 'Running command: ./list-links', delay: 150 },
        { text: ' ', delay: 100 },
        { text: '┌───────── LINKS ─────────┐', isHtml: true, delay: 50 },
        { text: '│                         │', isHtml: true, delay: 50 },
        { text: '│   <a href="#">MUSIC</a>               │', isHtml: true, delay: 50 },
        { text: '│   <a href="#">VIDEOS</a>              │', isHtml: true, delay: 50 },
        { text: '│   <a href="#">SOCIALS</a>             │', isHtml: true, delay: 50 },
        { text: '│                         │', isHtml: true, delay: 50 },
        { text: '└─────────────────────────┘', isHtml: true, delay: 50 },
        { text: ' ', delay: 100 },
        { text: 'System ready. Awaiting input.', delay: 100 },
    ];

    let lineIndex = 0;

    function typeLine() {
        if (lineIndex < lines.length) {
            const line = lines[lineIndex];
            const p = document.createElement('p');
            
            if (line.isHtml) {
                p.innerHTML = line.text;
            } else {
                p.textContent = line.text;
            }
            
            output.appendChild(p);
            
            // Scroll to bottom
            const terminalBody = document.querySelector('.terminal-body');
            terminalBody.scrollTop = terminalBody.scrollHeight;

            lineIndex++;
            setTimeout(typeLine, line.delay);
        } else {
            cursor.style.display = 'inline'; // Show cursor when done
        }
    }

    cursor.style.display = 'none'; // Hide cursor while typing
    setTimeout(typeLine, 500);
});
