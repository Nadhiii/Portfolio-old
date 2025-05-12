// intro-animation.js

document.addEventListener('DOMContentLoaded', function() {
  // Add loading class to body
  document.body.classList.add('loading');
  
  // Create intro overlay
  const overlay = document.createElement('div');
  overlay.classList.add('intro-overlay');
  
  // Create name container
  const nameContainer = document.createElement('div');
  nameContainer.classList.add('intro-name-container');
  
  // Create the name element with typewriter effect
  const nameElement = document.createElement('h1');
  nameElement.classList.add('intro-name', 'typewriter');
  nameElement.textContent = 'Mahanadi Parisara'; // Your name
  
  // Add name to container, container to overlay, overlay to body
  nameContainer.appendChild(nameElement);
  overlay.appendChild(nameContainer);
  document.body.appendChild(overlay);
  
  // Set a timer for the typewriter effect to complete
  setTimeout(function() {
    // Remove the typewriter specific styling but keep the name visible
    nameElement.classList.remove('typewriter');
    nameElement.style.borderRight = 'none';
    
    // Add a small delay before transitioning
    setTimeout(function() {
      // Fade out the overlay
      overlay.style.opacity = '0';
      
      // After animation completes, reveal the site
      setTimeout(function() {
        document.body.classList.remove('loading');
        document.body.classList.add('loaded');
        
        // Remove the overlay after fade out
        setTimeout(function() {
          overlay.remove();
        }, 500);
      }, 1000);
    }, 800);
  }, 3500);
});