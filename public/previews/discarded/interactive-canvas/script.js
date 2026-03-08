// script.js - Concept 5: The Interactive Canvas

const canvas = document.getElementById('interactive-canvas');
const ctx = canvas.getContext('2d');

let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;

let mouse = {
    x: width / 2,
    y: height / 2
};

window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
});

canvas.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
});

class Particle {
    constructor(x, y, size, color, weight) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.color = color;
        this.weight = weight;
        this.baseX = this.x;
        this.baseY = this.y;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
    }

    update() {
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        let forceDirectionX = dx / distance;
        let forceDirectionY = dy / distance;
        let maxDistance = 100;
        let force = (maxDistance - distance) / maxDistance;

        if (distance < maxDistance) {
            this.x -= forceDirectionX * force * this.weight;
            this.y -= forceDirectionY * force * this.weight;
        } else {
            if (this.x !== this.baseX) {
                let dx = this.x - this.baseX;
                this.x -= dx / 10;
            }
            if (this.y !== this.baseY) {
                let dy = this.y - this.baseY;
                this.y -= dy / 10;
            }
        }
    }
}

let particles = [];
const particleCount = 100;

function init() {
    particles = [];
    for (let i = 0; i < particleCount; i++) {
        let size = Math.random() * 2 + 1;
        let x = Math.random() * width;
        let y = Math.random() * height;
        let color = 'rgba(255, 255, 255, 0.5)';
        let weight = Math.random() * 1.5 + 1;
        particles.push(new Particle(x, y, size, color, weight));
    }
}

function animate() {
    ctx.clearRect(0, 0, width, height);
    for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
    }
    requestAnimationFrame(animate);
}

init();
animate();
