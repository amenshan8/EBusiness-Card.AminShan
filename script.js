// Remove cinematic effects and add viewfinder functionality
document.addEventListener('DOMContentLoaded', function() {
    // Add timecode animation (optional - can be removed since no viewfinder)
    const timecodeElement = document.querySelector('.timecode');
    if (timecodeElement) {
        let frames = 0;
        setInterval(() => {
            frames++;
            const seconds = Math.floor(frames / 24);
            const minutes = Math.floor(seconds / 60);
            const hours = Math.floor(minutes / 60);
            
            const displayFrames = frames % 24;
            const displaySeconds = seconds % 60;
            const displayMinutes = minutes % 60;
            const displayHours = hours;
            
            timecodeElement.textContent = 
                `${String(displayHours).padStart(2, '0')}:${String(displayMinutes).padStart(2, '0')}:${String(displaySeconds).padStart(2, '0')}:${String(displayFrames).padStart(2, '0')}`;
        }, 1000/24);
    }
    
    // Battery animation (optional - can be removed since no viewfinder)
    const batteryIcon = document.querySelector('.battery-icon i');
    if (batteryIcon) {
        setInterval(() => {
            const levels = ['fas fa-battery-full', 'fas fa-battery-three-quarters', 'fas fa-battery-half', 'fas fa-battery-quarter'];
            const currentLevel = batteryIcon.className;
            const currentIndex = levels.indexOf(currentLevel);
            const nextIndex = (currentIndex + 1) % levels.length;
            batteryIcon.className = levels[nextIndex];
        }, 5000);
    }
    
    // Enhanced mobile/touch optimization
    // Detect touch devices
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    
    if (isTouch) {
        // Reduce matrix animation intensity on touch devices
        const canvas = document.querySelector('.matrix-canvas');
        if (canvas) {
            canvas.style.opacity = '0.08';
        }
        
        // Remove hover effects on touch devices
        document.querySelectorAll('.contact-btn').forEach(btn => {
            btn.style.transition = 'transform 0.1s ease';
        });
    }
    
    // Optimize matrix animation for performance
    let matrixAnimation = null;
    const fps = window.matchMedia('(max-width: 768px)').matches ? 15 : 30;
    
    // Use Intersection Observer for animation pause
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                startMatrixAnimation();
            } else {
                stopMatrixAnimation();
            }
        });
    });
    
    observer.observe(document.querySelector('.container'));
});

// Matrix background animation - Optimized for performance
const canvas = document.querySelector('.matrix-canvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

resizeCanvas();

const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
let drops = [];
const fontSize = 15;

function initDrops() {
    drops = [];
    const columns = Math.floor(canvas.width / fontSize);
    for (let i = 0; i < columns; i++) {
        drops[i] = 1;
    }
}

initDrops();

let animationId;
let lastTime = 0;
const fpsInterval = 1000 / 30; // 30 FPS for better performance

function drawMatrix(currentTime) {
    if (currentTime - lastTime < fpsInterval) {
        animationId = requestAnimationFrame(drawMatrix);
        return;
    }
    
    lastTime = currentTime;
    
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#00ff88';
    ctx.font = `${fontSize}px monospace`;

    const columns = Math.floor(canvas.width / fontSize);
    
    for (let i = 0; i < columns; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;
        
        ctx.fillText(char, x, y);

        if (y > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }
        drops[i]++;
    }
    
    animationId = requestAnimationFrame(drawMatrix);
}

// Enhanced matrix animation with performance monitoring
let matrixFrame = null;
let matrixLastTime = 0;

function startMatrixAnimation() {
    const canvas = document.querySelector('.matrix-canvas');
    if (!canvas || matrixFrame) return;
    
    const ctx = canvas.getContext('2d');
    const fps = window.matchMedia('(max-width: 768px)').matches ? 15 : 30;
    const fpsInterval = 1000 / fps;
    
    function draw(currentTime) {
        if (currentTime - matrixLastTime < fpsInterval) {
            matrixFrame = requestAnimationFrame(draw);
            return;
        }
        
        matrixLastTime = currentTime;
        
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = '#00ff88';
        ctx.font = `${fontSize}px monospace`;

        const columns = Math.floor(canvas.width / fontSize);
        
        for (let i = 0; i < columns; i++) {
            const char = chars[Math.floor(Math.random() * chars.length)];
            const x = i * fontSize;
            const y = drops[i] * fontSize;
            
            ctx.fillText(char, x, y);

            if (y > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
        
        matrixFrame = requestAnimationFrame(draw);
    }
    
    matrixFrame = requestAnimationFrame(draw);
}

function stopMatrixAnimation() {
    if (matrixFrame) {
        cancelAnimationFrame(matrixFrame);
        matrixFrame = null;
    }
}

// Start animation
animationId = requestAnimationFrame(drawMatrix);

// Handle resize efficiently
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        resizeCanvas();
        initDrops();
    }, 250);
});

// Handle dynamic viewport changes
window.addEventListener('resize', () => {
    clearTimeout(window.resizeTimer);
    window.resizeTimer = setTimeout(() => {
        resizeCanvas();
        initDrops();
    }, 250);
});

// Pause animation when tab is not visible
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        cancelAnimationFrame(animationId);
    } else {
        animationId = requestAnimationFrame(drawMatrix);
    }
});

// Optimize for mobile devices
if (window.matchMedia && window.matchMedia('(max-width: 768px)').matches) {
    // Reduce matrix density on mobile
    const reducedFontSize = 12;
    ctx.font = `${reducedFontSize}px monospace`;
}

// Reduce motion for accessibility
if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    cancelAnimationFrame(animationId);
    canvas.style.display = 'none';
}

// Smooth scroll for better UX
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Add subtle parallax effect on scroll - Throttled for performance
let ticking = false;
function updateParallax() {
    const scrolled = window.pageYOffset;
    const profileSection = document.querySelector('.profile-section');
    const rate = scrolled * -0.5;
    
    if (profileSection) {
        profileSection.style.transform = `translateY(${rate}px)`;
    }
    ticking = false;
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        requestAnimationFrame(updateParallax);
        ticking = true;
    }
});

// Generate vCard file dynamically
function generateVCard() {
    const vcard = `BEGIN:VCARD
VERSION:3.0
FN:Amin Shan
TITLE:Software Developer | Web Designer | Game Creator | E/Business Card Maker | Logo Designer
ORG:Amin Shan Development
TEL:0618316269
EMAIL:amenshan8@gmail.com
URL:https://github.com/amenshan8
NOTE:Building experiences. Coding with creativity.
END:VCARD`;

    // Create blob for download
    const blob = new Blob([vcard], { type: 'text/vcard' });
    const url = URL.createObjectURL(blob);
    
    // Update download link
    const vcardBtn = document.querySelector('.vcard-btn');
    if (vcardBtn) {
        vcardBtn.href = url;
    }
}

// Initialize vCard generation
generateVCard();

// Clean up on page unload
window.addEventListener('beforeunload', () => {
    URL.revokeObjectURL(document.querySelector('.vcard-btn').href);
});

// Ensure proper scaling on orientation change
window.addEventListener('orientationchange', () => {
    setTimeout(() => {
        resizeCanvas();
        initDrops();
    }, 100);
});

// Prevent zoom on double-tap
let lastTouchEnd = 0;
document.addEventListener('touchend', function(event) {
    const now = (new Date()).getTime();
    if (now - lastTouchEnd <= 300) {
        event.preventDefault();
    }
    lastTouchEnd = now;
}, false);
