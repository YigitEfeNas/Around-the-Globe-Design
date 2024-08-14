const container = document.querySelector('.particle-container');
const rows = 15;
const cols = 30;
const particles = [];

for (let i = 0; i < rows * cols; i++) {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    
    // Calculate grid position
    const row = Math.floor(i / cols);
    const col = i % cols;
    
    // Position particles within the grid
    particle.style.top = `${row * (100 / rows)}%`;
    particle.style.left = `${col * (100 / cols)}%`;
    
    // Randomize movement parameters
    const moveAmount = Math.random() * 10 + 5; // Randomize movement distance
    const duration = Math.random() * 5 + 2; // Randomize animation duration
    
    // Apply random movement animation
    particle.style.animation = `particle-move ${duration}s ease-in-out infinite`;
    particle.style.animationDelay = `${Math.random() * 5}s`; // Stagger animations
    
    particle.style.transform = `translateY(${Math.random() * 10 - 5}px) translateX(${Math.random() * 10 - 5}px)`;
    
    container.appendChild(particle);
    particles.push(particle);
}

const style = document.createElement('style');
style.textContent = `
@keyframes particle-move {
    0% {
        transform: translateY(0) translateX(0);
        opacity: 0.8;
    }
    50% {
        transform: translateY(calc(10px - 5%)) translateX(calc(10px - 5%));
        opacity: 0.6;
    }
    100% {
        transform: translateY(0) translateX(0);
        opacity: 0.8;
    }
}
`;
document.head.appendChild(style);

// Function to handle particle movement on hover
function handleMouseMove(event) {
    const rect = container.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
    
    particles.forEach(particle => {
        const particleRect = particle.getBoundingClientRect();
        const particleX = (particleRect.left - rect.left) + (particleRect.width / 2);
        const particleY = (particleRect.top - rect.top) + (particleRect.height / 2);
        const distance = Math.sqrt(Math.pow(mouseX - particleX, 2) + Math.pow(mouseY - particleY, 2));
        
        // Move particles based on distance from the cursor
        if (distance < 100) { // 100px radius for effect
            const angle = Math.atan2(particleY - mouseY, particleX - mouseX);
            const offsetX = Math.cos(angle) * (100 - distance);
            const offsetY = Math.sin(angle) * (100 - distance);
            particle.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
        } else {
            particle.style.transform = `translateY(${Math.random() * 10 - 5}px) translateX(${Math.random() * 10 - 5}px)`;
        }
    });
}

// Reset particle position when the mouse leaves the container
function handleMouseLeave() {
    particles.forEach(particle => {
        particle.style.transform = `translateY(${Math.random() * 10 - 5}px) translateX(${Math.random() * 10 - 5}px)`;
    });
}

container.addEventListener('mousemove', handleMouseMove);
container.addEventListener('mouseleave', handleMouseLeave);