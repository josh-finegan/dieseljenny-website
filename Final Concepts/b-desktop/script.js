// script.js - Concept B: Web 1.0 Desktop

document.addEventListener('DOMContentLoaded', () => {
    const desktop = document.getElementById('desktop');
    const windows = document.querySelectorAll('.window');
    const icons = document.querySelectorAll('.desktop-icon[data-window]');

    let activeWindow = null;
    let highestZ = 20;

    // --- Window Dragging Logic ---
    function makeDraggable(windowEl) {
        const titleBar = windowEl.querySelector('.title-bar');
        let offsetX, offsetY;

        function onMouseDown(e) {
            e.preventDefault();
            offsetX = e.clientX - windowEl.offsetLeft;
            offsetY = e.clientY - windowEl.offsetTop;

            // Bring window to front
            highestZ++;
            windowEl.style.zIndex = highestZ;
            windows.forEach(w => w.classList.remove('active'));
            windowEl.classList.add('active');
            activeWindow = windowEl;

            document.addEventListener('mousemove', onMouseMove);
            document.addEventListener('mouseup', onMouseUp);
        }

        function onMouseMove(e) {
            if (!activeWindow) return;
            let newX = e.clientX - offsetX;
            let newY = e.clientY - offsetY;
            
            // Constrain to desktop area
            const maxX = desktop.clientWidth - activeWindow.clientWidth;
            const maxY = desktop.clientHeight - activeWindow.clientHeight;

            activeWindow.style.left = `${Math.max(0, Math.min(newX, maxX))}px`;
            activeWindow.style.top = `${Math.max(0, Math.min(newY, maxY))}px`;
        }

        function onMouseUp() {
            activeWindow = null;
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
        }

        titleBar.addEventListener('mousedown', onMouseDown);
    }

    windows.forEach(makeDraggable);

    // --- Window & Icon Interaction Logic ---
    icons.forEach(icon => {
        icon.addEventListener('click', () => {
            const windowId = icon.dataset.window;
            const windowEl = document.getElementById(windowId);
            if (windowEl) {
                windowEl.classList.remove('hidden');
                // Bring to front
                highestZ++;
                windowEl.style.zIndex = highestZ;
            }
        });
    });

    windows.forEach(windowEl => {
        const closeButton = windowEl.querySelector('.close');
        if (closeButton) {
            closeButton.addEventListener('click', () => {
                windowEl.classList.add('hidden');
            });
        }
    });
});
