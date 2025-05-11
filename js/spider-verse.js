// spider-verse.js
document.addEventListener('DOMContentLoaded', () => {
    // Add comic dots background
    createComicDotsBackground();
    
    // Add glitch effect to headings
    addGlitchEffectToHeadings();
    
    // Add Spider-Verse 3D effect to cards
    addSpiderVerse3DEffect();
    
    // Add portal effects
    addPortalEffects();
    
    // Setup page transitions
    setupPageTransitions();
    
    // Particle effect configuration
    setupSpiderVerseParticles();
    
    // Parallax background effect
    setupParallaxEffect();
    
    // Add web corner decorations
    addWebCorners();
    
    // Add comic style onomatopoeia on click
    addOnomatopoeiaEffect();
    
    // Scroll animations with Spider-Verse style
    setupScrollAnimations();
    
    // Miles Morales electricity effect on hover
    addElectricityEffect();
    
    // Add noise overlay
    addNoiseOverlay();
});

// Create comic dots background
function createComicDotsBackground() {
    const dotsBackground = document.createElement('div');
    dotsBackground.classList.add('comic-dots-bg');
    document.body.appendChild(dotsBackground);
}

// Add glitch effect to headings
function addGlitchEffectToHeadings() {
    const headings = document.querySelectorAll('h1, h2.section-title');
    headings.forEach(heading => {
        if (!heading.classList.contains('glitch-text')) {
            heading.classList.add('glitch-text');
        }
    });
}

// Add Spider-Verse 3D effect to cards
function addSpiderVerse3DEffect() {
    const cards = document.querySelectorAll('.skill-card, .project-details, .quick-link, .client-card, .contact-info, .contact-form-wrapper');
    
    cards.forEach(card => {
        card.classList.add('tilt-card');
        
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const tiltX = (y - centerY) / 15;
            const tiltY = (centerX - x) / 15;
            
            card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(1.02)`;
            
            // Add subtle glow
            card.style.boxShadow = `
                0 10px 30px rgba(0, 0, 0, 0.3),
                0 0 15px rgba(0, 255, 212, 0.2),
                0 0 30px rgba(255, 43, 142, 0.1)
            `;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
            card.style.boxShadow = '';
        });
    });
}

// Add portal effects
function addPortalEffects() {
    const elements = document.querySelectorAll('.profile-image, .link-icon, .skill-icon, .client-logo-wrapper');
    
    elements.forEach(element => {
        element.classList.add('dimensional-portal');
    });
}

// Setup page transitions
function setupPageTransitions() {
    // Create transition overlay if it doesn't exist
    if (!document.querySelector('.page-transition')) {
        const overlay = document.createElement('div');
        overlay.classList.add('page-transition');
        overlay.style.position = 'fixed';
        overlay.style.top = '0';
        overlay.style.left = '0';
        overlay.style.width = '100%';
        overlay.style.height = '100%';
        overlay.style.backgroundColor = '#0F1115';
        overlay.style.zIndex = '9999';
        overlay.style.opacity = '0';
        overlay.style.visibility = 'hidden';
        overlay.style.transition = 'opacity 0.5s ease, visibility 0.5s ease';
        document.body.appendChild(overlay);
    }
    
    // Create spider-web overlay for transitions
    if (!document.querySelector('.web-transition')) {
        const webOverlay = document.createElement('div');
        webOverlay.classList.add('web-transition');
        webOverlay.style.position = 'fixed';
        webOverlay.style.top = '0';
        webOverlay.style.left = '0';
        webOverlay.style.width = '100%';
        webOverlay.style.height = '100%';
        webOverlay.style.backgroundImage = `
            radial-gradient(circle at center, transparent 0%, #0F1115 70%),
            url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000"><path d="M0,0 L1000,1000 M200,0 L1000,800 M400,0 L1000,600 M600,0 L1000,400 M800,0 L1000,200 M0,200 L800,1000 M0,400 L600,1000 M0,600 L400,1000 M0,800 L200,1000" stroke="rgba(255,255,255,0.1)" stroke-width="1" fill="none"/></svg>')
        `;
        webOverlay.style.backgroundSize = 'cover';
        webOverlay.style.zIndex = '10000';
        webOverlay.style.opacity = '0';
        webOverlay.style.visibility = 'hidden';
        webOverlay.style.transition = 'opacity 0.5s ease, visibility 0.5s ease';
        document.body.appendChild(webOverlay);
    }
    
    // Add click event listeners to navigation links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            // Only apply transitions for internal links
            if (href && !href.startsWith('#') && !href.startsWith('http')) {
                e.preventDefault();
                const transition = document.querySelector('.page-transition');
                const webTransition = document.querySelector('.web-transition');
                
                webTransition.style.opacity = '1';
                webTransition.style.visibility = 'visible';
                
                setTimeout(() => {
                    transition.style.opacity = '1';
                    transition.style.visibility = 'visible';
                    
                    setTimeout(() => {
                        window.location.href = href;
                    }, 300);
                }, 200);
            }
        });
    });
    
    // Hide transition overlay when page loads
    window.addEventListener('pageshow', () => {
        const transition = document.querySelector('.page-transition');
        const webTransition = document.querySelector('.web-transition');
        
        if (transition && webTransition) {
            transition.style.opacity = '0';
            transition.style.visibility = 'hidden';
            
            setTimeout(() => {
                webTransition.style.opacity = '0';
                webTransition.style.visibility = 'hidden';
            }, 300);
        }
    });
}

// Setup Spider-Verse particle effect
function setupSpiderVerseParticles() {
    if (window.particlesJS) {
        particlesJS('particles-js', {
            particles: {
                number: {
                    value: 80,
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },
                color: {
                    value: ["#00FFD4", "#FF2B8E", "#9347FF", "#3498DB"]
                },
                shape: {
                    type: "circle",
                    stroke: {
                        width: 0,
                        color: "#000000"
                    },
                },
                opacity: {
                    value: 0.5,
                    random: true,
                    anim: {
                        enable: true,
                        speed: 1,
                        opacity_min: 0.1,
                        sync: false
                    }
                },
                size: {
                    value: 3,
                    random: true,
                    anim: {
                        enable: true,
                        speed: 2,
                        size_min: 0.1,
                        sync: false
                    }
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: "#00FFD4",
                    opacity: 0.4,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 2,
                    direction: "none",
                    random: true,
                    straight: false,
                    out_mode: "out",
                    bounce: false,
                    attract: {
                        enable: true,
                        rotateX: 600,
                        rotateY: 1200
                    }
                }
            },
            interactivity: {
                detect_on: "canvas",
                events: {
                    onhover: {
                        enable: true,
                        mode: "repulse"
                    },
                    onclick: {
                        enable: true,
                        mode: "push"
                    },
                    resize: true
                },
                modes: {
                    repulse: {
                        distance: 100,
                        duration: 0.4
                    },
                    push: {
                        particles_nb: 4
                    }
                }
            },
            retina_detect: true
        });
    }
}

// Setup parallax effect
function setupParallaxEffect() {
    const background = document.getElementById('background-layer');
    
    if (background) {
        window.addEventListener('mousemove', (e) => {
            const moveX = (e.clientX - window.innerWidth / 2) * 0.02;
            const moveY = (e.clientY - window.innerHeight / 2) * 0.02;
            
            background.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });
    }
}

// Add web corner decorations
function addWebCorners() {
    const containers = document.querySelectorAll('.cyber-container');
    
    containers.forEach(container => {
        const corners = document.createElement('div');
        corners.classList.add('web-corner');
        corners.style.position = 'absolute';
        corners.style.top = '0';
        corners.style.left = '0';
        corners.style.width = '100%';
        corners.style.height = '100%';
        corners.style.pointerEvents = 'none';
        corners.style.zIndex = '-1';
        
        container.style.position = 'relative';
        container.appendChild(corners);
    });
}

// Add comic style onomatopoeia on click
function addOnomatopoeiaEffect() {
    const buttons = document.querySelectorAll('button, .quick-link, .project-learn-more-link, .nav-link');
    const sounds = ['BAM!', 'POW!', 'THWIP!', 'BOOM!', 'SNAP!', 'ZAP!'];
    
    buttons.forEach(button => {
        button.classList.add('onomatopoeia');
        
        button.addEventListener('click', (e) => {
            // Create pop-up text
            const sound = sounds[Math.floor(Math.random() * sounds.length)];
            const popup = document.createElement('div');
            popup.textContent = sound;
            popup.style.position = 'absolute';
            popup.style.top = `${e.clientY - 30}px`;
            popup.style.left = `${e.clientX}px`;
            popup.style.backgroundColor = '#FFD60A';
            popup.style.color = 'black';
            popup.style.padding = '5px 10px';
            popup.style.borderRadius = '5px';
            popup.style.fontWeight = 'bold';
            popup.style.fontSize = '14px';
            popup.style.zIndex = '9999';
            popup.style.pointerEvents = 'none';
            popup.style.transform = 'translate(-50%, -50%) scale(0)';
            popup.style.transition = 'transform 0.2s ease, opacity 0.3s ease';
            popup.style.opacity = '0';
            
            document.body.appendChild(popup);
            
            // Animate
            setTimeout(() => {
                popup.style.transform = 'translate(-50%, -50%) scale(1.2)';
                popup.style.opacity = '1';
                
                setTimeout(() => {
                    popup.style.transform = 'translate(-50%, -50%) scale(1) translateY(-20px)';
                    popup.style.opacity = '0';
                    
                    setTimeout(() => {
                        document.body.removeChild(popup);
                    }, 300);
                }, 500);
            }, 10);
        });
    });
}

// Setup scroll animations with Spider-Verse style
function setupScrollAnimations() {
    const animatedElements = document.querySelectorAll('.animate-on-scroll, .animate-on-scroll-staggered');
    
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.85 &&
            rect.bottom >= 0
        );
    }
    
    function handleScroll() {
        animatedElements.forEach((el, index) => {
            if (isInViewport(el)) {
                // Add Spider-Verse glitch entrance effect
                el.style.animation = 'none';
                
                setTimeout(() => {
                    if (el.classList.contains('animate-on-scroll-staggered')) {
                        el.style.animation = `fade-in-up 0.5s ${index * 0.1}s ease-out forwards, 
                                              glitch-text 0.2s ${index * 0.1 + 0.3}s ease-out`;
                    } else {
                        el.style.animation = `fade-in-up 0.5s ease-out forwards, 
                                             glitch-text 0.2s 0.3s ease-out`;
                    }
                    
                    el.classList.add('visible');
                    
                    // Animate progress bars if present
                    const progressBar = el.querySelector('.progress-bar');
                    if (progressBar) {
                        const progress = parseInt(el.querySelector('.skill-progress')?.getAttribute('data-progress') || '0');
                        setTimeout(() => {
                            progressBar.style.width = `${progress}%`;
                        }, 300);
                    }
                }, 10);
            }
        });
    }
    
    // Initial check
    window.addEventListener('load', handleScroll);
    
    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);
}

// Add Miles Morales electricity effect on hover
function addElectricityEffect() {
    const elements = document.querySelectorAll('.quick-link, .skill-card, .project-learn-more-link, .download-button');
    
    elements.forEach(element => {
        element.classList.add('miles-electricity');
    });
}

// Add noise overlay for film grain effect
function addNoiseOverlay() {
    if (!document.querySelector('.noise-overlay')) {
        const noiseOverlay = document.createElement('div');
        noiseOverlay.classList.add('noise-overlay');
        document.body.appendChild(noiseOverlay);
    }
}