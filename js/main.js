document.addEventListener('DOMContentLoaded', () => {
    // Particle.js Configuration (if particles-js element exists)
    if (document.getElementById('particles-js')) {
        particlesJS('particles-js', {
            particles: {
                number: { 
                    value: 80, 
                    density: { 
                        enable: true, 
                        value_area: 800 
                    } 
                },
                color: { value: '#00FFD4' },
                shape: { 
                    type: 'circle',
                    stroke: { 
                        width: 0, 
                        color: '#000000' 
                    }
                },
                opacity: { 
                    value: 0.5, 
                    random: false
                },
                size: { 
                    value: 3, 
                    random: true
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: '#00FFD4',
                    opacity: 0.4,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 2,
                    direction: 'none',
                    random: false,
                    straight: false,
                    out_mode: 'out'
                }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: { 
                        enable: true, 
                        mode: 'repulse' 
                    },
                    onclick: { 
                        enable: true, 
                        mode: 'push' 
                    },
                    resize: true
                }
            },
            retina_detect: true
        });
    }

    // Mobile Navigation Toggle
    function createMobileNavigation() {
        const nav = document.querySelector('.cyber-nav');
        
        // Only create if not already exists
        if (!document.querySelector('.mobile-menu-toggle')) {
            // Create mobile menu toggle
            const mobileMenuToggle = document.createElement('div');
            mobileMenuToggle.classList.add('mobile-menu-toggle');
            mobileMenuToggle.innerHTML = `
                <span></span>
                <span></span>
                <span></span>
            `;
            
            // Create mobile menu
            const mobileMenu = document.createElement('div');
            mobileMenu.classList.add('mobile-menu');
            
            // Copy navigation links
            const navMenu = document.querySelector('.nav-menu');
            mobileMenu.innerHTML = navMenu.innerHTML;
            
            // Add to DOM
            nav.appendChild(mobileMenuToggle);
            nav.appendChild(mobileMenu);
            
            // Toggle functionality
            mobileMenuToggle.addEventListener('click', () => {
                mobileMenu.classList.toggle('active');
                mobileMenuToggle.classList.toggle('active');
            });
            
            // Close menu when a link is clicked
            mobileMenu.querySelectorAll('.nav-link').forEach(link => {
                link.addEventListener('click', () => {
                    mobileMenu.classList.remove('active');
                    mobileMenuToggle.classList.remove('active');
                });
            });
        }
    }

    // Add mobile navigation for smaller screens
    function handleMobileNavigation() {
        if (window.innerWidth <= 1024) {
            createMobileNavigation();
        }
    }

    // Initial check
    handleMobileNavigation();