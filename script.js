document.addEventListener("DOMContentLoaded", function() {
  const elements = document.querySelectorAll(".fade-in");
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, { threshold: 0.2 });

  elements.forEach((element) => observer.observe(element));
});

document.addEventListener("DOMContentLoaded", function () {
  ScrollReveal().reveal('.fade-in', {
      delay: 300,
      distance: '50px',
      opacity: 0,
      reset: true // Ensures the effect runs again on scroll
  });
});
