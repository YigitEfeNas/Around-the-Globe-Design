const container = document.querySelector('.particle-container');
const rows = 84;
const cols = 95;
const particles = [];

for (let i = 0; i < rows * cols; i++) {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    
    const row = Math.floor(i / cols);
    const col = i % cols;
    
    particle.style.top = ${row * (100 / rows)}%;
    particle.style.left = ${col * (100 / cols)}%;

    const duration = Math.random() * 5 + 2;
    
    particle.style.animation = move ${duration}s ease-in-out infinite alternate;
    
    container.appendChild(particle);
    particles.push(particle);
}

function handleMouseMove(event) {
    const rect = container.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
    
    particles.forEach(particle => {
        const particleRect = particle.getBoundingClientRect();
        const particleX = (particleRect.left - rect.left) + (particleRect.width / 2);
        const particleY = (particleRect.top - rect.top) + (particleRect.height / 2);
        const distance = Math.sqrt(Math.pow(mouseX - particleX, 2) + Math.pow(mouseY - particleY, 2));
        
        if (distance < 55) {
            particle.style.opacity = '0';
        } else {
            particle.style.opacity = '0.8';
        }
    });
}

// Reset particle opacity when the mouse leaves the container
function handleMouseLeave() {
    particles.forEach(particle => {
        // Reset opacity
        particle.style.opacity = '0.8';
    });
}

container.addEventListener('mousemove', handleMouseMove);
container.addEventListener('mouseleave', handleMouseLeave);
