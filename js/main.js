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
                color: { value: '#ff3131' },
                shape: { 
                    type: 'circle',
                    stroke: { 
                        width: 0, 
                        color: '#000000' 
                    }
                },
                opacity: { 
                    value: 0.5, 
                    random: true
                },
                size: { 
                    value: 3, 
                    random: true
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: '#4285f4',
                    opacity: 0.4,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 2,
                    direction: 'none',
                    random: true,
                    straight: false,
                    out_mode: 'out',
                    bounce: false
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

    // Mobile Navigation Toggle
    function createMobileNavigation() {
        const nav = document.querySelector('.spider-nav');
        
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
    
    // Update on resize
    window.addEventListener('resize', handleMobileNavigation);

    // Spider-Verse Animation Effects
    function initSpiderVerseEffects() {
        // Parallax effect
        document.addEventListener('mousemove', (e) => {
            const moveX = (e.clientX - window.innerWidth / 2) / 50;
            const moveY = (e.clientY - window.innerHeight / 2) / 50;
            
            const elements = document.querySelectorAll('.comic-panel, .quick-link, .client-card, .skill-card, .project-details, .finance-section');
            elements.forEach(element => {
                // Each element moves at slightly different rates
                const speedX = Math.random() * 0.3 + 0.1;
                const speedY = Math.random() * 0.3 + 0.1;
                element.style.transform = `translate3d(${moveX * speedX}px, ${moveY * speedY}px, 0)`;
            });
        });
        
        // Apply animations when elements enter viewport
        const animateOnScroll = () => {
            const elements = document.querySelectorAll('.comic-panel, .quick-link, .client-card, .skill-card, .project-details, .finance-section, .hero-title, .hero-subtitle, .profile-image-wrapper');
            
            elements.forEach(element => {
                const elementTop = element.getBoundingClientRect().top;
                const elementBottom = element.getBoundingClientRect().bottom;
                
                // Check if element is in viewport
                if (elementTop < window.innerHeight - 50 && elementBottom > 0) {
                    element.classList.add('animate__visible');
                    
                    // Add chromatic aberration effect to certain elements
                    if (element.classList.contains('hero-title') || element.classList.contains('section-title')) {
                        element.style.textShadow = '3px 3px 0 #ff3131, -3px -3px 0 #4285f4';
                    }
                    
                    // Add progress bar animation to skill cards
                    if (element.classList.contains('skill-card')) {
                        const progressBar = element.querySelector('.progress-bar');
                        if (progressBar) {
                            const width = progressBar.style.width;
                            progressBar.style.setProperty('--progress-width', width);
                        }
                    }
                }
            });
        };
        
        // Run on scroll
        window.addEventListener('scroll', animateOnScroll);
        // Run on initial load
        animateOnScroll();
        
        // Comic-style entrance animations
        const entranceElements = document.querySelectorAll('.hero-title, .hero-subtitle, .hero-description, .profile-image-wrapper');
        entranceElements.forEach((element, index) => {
            // Set initial state
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            
            // Animate in with delay based on index
            setTimeout(() => {
                element.style.transition = 'all 0.5s cubic-bezier(0.19, 1, 0.22, 1)';
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, 300 * index);
        });
        
        // Add web effect to links on hover
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('mouseenter', () => {
                // Create web strand effect
                const webStrand = document.createElement('div');
                webStrand.classList.add('web-strand');
                webStrand.style.position = 'absolute';
                webStrand.style.bottom = '-15px';
                webStrand.style.left = '0';
                webStrand.style.width = '100%';
                webStrand.style.height = '10px';
                webStrand.style.backgroundImage = "url('data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ff3131' fill-opacity='0.3' fill-rule='evenodd'%3E%3Cpath d=\"M0 40L40 0H20L0 20M40 40V20L20 40\"%3E%3C/path%3E%3C/g%3E%3C/svg%3E')";
                webStrand.style.opacity = '0';
                webStrand.style.transition = 'all 0.3s ease';
                
                link.appendChild(webStrand);
                
                // Animate web strand
                setTimeout(() => {
                    webStrand.style.opacity = '1';
                }, 10);
            });
            
            link.addEventListener('mouseleave', () => {
                const webStrand = link.querySelector('.web-strand');
                if (webStrand) {
                    webStrand.style.opacity = '0';
                    setTimeout(() => {
                        webStrand.remove();
                    }, 300);
                }
            });
        });
        
        // Apply progress bar animations
        const skillCards = document.querySelectorAll('.skill-card');
        skillCards.forEach(card => {
            const progressBar = card.querySelector('.progress-bar');
            if (progressBar) {
                const width = progressBar.style.width;
                progressBar.style.width = '0';
                progressBar.style.setProperty('--progress-width', width);
                
                card.addEventListener('mouseenter', () => {
                    progressBar.style.width = progressBar.style.getPropertyValue('--progress-width');
                });
                
                card.addEventListener('mouseleave', () => {
                    progressBar.style.width = '0';
                });
            }
        });
        
        // Comic style text effects for headings
        const headings = document.querySelectorAll('.hero-title, .section-title, .project-name, .client-name');
        headings.forEach(heading => {
            // Add chromatic aberration effect on hover
            heading.addEventListener('mouseenter', () => {
                heading.style.textShadow = '5px 5px 0 #ff3131, -5px -5px 0 #4285f4';
                heading.style.transform = 'scale(1.05)';
            });
            
            heading.addEventListener('mouseleave', () => {
                heading.style.textShadow = '3px 3px 0 #ff3131, -3px -3px 0 #4285f4';
                heading.style.transform = 'scale(1)';
            });
        });
    }
    
    // Initialize Spider-Verse effects
    initSpiderVerseEffects();

    // Add this to your main.js file 

// Accessibility Toggle
function setupAccessibility() {
    // Create accessibility toggle button
    const accessibilityToggle = document.createElement('button');
    accessibilityToggle.className = 'accessibility-toggle';
    accessibilityToggle.setAttribute('aria-label', 'Toggle high contrast mode');
    accessibilityToggle.innerHTML = '<span aria-hidden="true">Aa</span>';
    document.body.appendChild(accessibilityToggle);
    
    // Create skip to content link
    const skipLink = document.createElement('a');
    skipLink.className = 'skip-to-content';
    skipLink.href = '#main-content';
    skipLink.textContent = 'Skip to content';
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    // Add id to main content for skip link
    const mainContent = document.querySelector('main');
    if (mainContent) {
      mainContent.id = 'main-content';
      mainContent.setAttribute('tabindex', '-1');
    }
    
    // High contrast mode toggle
    accessibilityToggle.addEventListener('click', function() {
      document.body.classList.toggle('high-contrast');
      
      // Save preference
      if (document.body.classList.contains('high-contrast')) {
        localStorage.setItem('high-contrast', 'true');
        accessibilityToggle.setAttribute('aria-pressed', 'true');
      } else {
        localStorage.setItem('high-contrast', 'false');
        accessibilityToggle.setAttribute('aria-pressed', 'false');
      }
      
      // Announce change to screen readers
      const announcement = document.createElement('div');
      announcement.setAttribute('aria-live', 'polite');
      announcement.className = 'sr-only';
      announcement.textContent = document.body.classList.contains('high-contrast') 
        ? 'High contrast mode enabled' 
        : 'High contrast mode disabled';
      document.body.appendChild(announcement);
      
      // Remove announcement after it's read
      setTimeout(() => {
        announcement.remove();
      }, 3000);
    });
    
    // Check saved preference
    if (localStorage.getItem('high-contrast') === 'true') {
      document.body.classList.add('high-contrast');
      accessibilityToggle.setAttribute('aria-pressed', 'true');
    } else {
      accessibilityToggle.setAttribute('aria-pressed', 'false');
    }
  }
  
  // Make form labels visible for screen readers but visually hidden
  function enhanceFormAccessibility() {
    const form = document.querySelector('.contact-form');
    if (form) {
      const inputs = form.querySelectorAll('input, textarea');
      inputs.forEach(input => {
        // Create label
        const label = document.createElement('label');
        label.htmlFor = input.name;
        label.className = 'sr-only';
        label.textContent = input.placeholder;
        
        // Insert before input
        input.parentNode.insertBefore(label, input);
        
        // Set aria-labelledby
        input.id = input.name;
        input.setAttribute('aria-labelledby', input.name + '-label');
      });
      
      // Make sure form status is announced to screen readers
      const formStatus = document.getElementById('form-status');
      if (formStatus) {
        formStatus.setAttribute('aria-live', 'polite');
        formStatus.setAttribute('role', 'status');
      }
    }
  }
  
  // Initialize accessibility features
  document.addEventListener('DOMContentLoaded', function() {
    setupAccessibility();
    enhanceFormAccessibility();
  });