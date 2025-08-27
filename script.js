document.addEventListener('DOMContentLoaded', function () {
    const profileWarpper = document.querySelector('.profile-wrapper');
    const particleCount = 30;

    // Create particles
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');

        // Random position within the profile wrapper
        const size = Math.random() * 8 + 2; // Random size between
        const posX = Math.random() * 100; // Percentage}
        const posY = Math.random() * 100; // Percentage
        const duration = Math.random() * 6 + 4; // Random delay for animation
        const delay = Math.random() * 5; // Random delay for animation
        const opacity = Math.random() * 0.5 + 0.1; // Random opacity between 0.5 and 1

        // Set styles
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${posX}%`;
        particle.style.top = `${posY}%`;
        particle.style.animationDuration = `${duration}s`;
        particle.style.animationDelay = `${delay}s`;
        particle.style.opacity = opacity;
        particle.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 70%)`; // Random color
        particle.style.animation = `floatUp ${Math.random() * 10 + 5}s infinite ease-in-out`;

        profileWarpper.appendChild(particle);
    }

    //floating animation for particles
    document.querySelectorAll('.particle').forEach(particle => {
        const keyframes = `
            @keyframes float-${Math.floor(Math.random().toString(36).substring(2, 5))} {
                0% { transform: translate(0,0); }
                50% { transform: translate( ${Math.random() * 40 - 20}px, ${Math.random() * 40 - 20}px); }
                100% { transform: translate(0,0); }
            }
        `;

        const styleSheet = document.createElement("style");
        styleSheet.textContent = keyframes;
        document.head.appendChild(styleSheet);

        particle.style.animation = `float-${styleSheet.sheet.cssRules[0].name.Math(/-(\w+)$/)[1]} ${Math.random() * 10 + 5}s infinite ease-in-out`;
    });
});