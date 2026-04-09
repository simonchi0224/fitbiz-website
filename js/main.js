// Hamburger menu
const hamburger = document.querySelector('.hamburger');
const nav = document.querySelector('.navbar-nav');
if (hamburger) {
  hamburger.addEventListener('click', () => nav.classList.toggle('open'));
}

// Navbar scroll effect
window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  if (navbar) navbar.classList.toggle('scrolled', window.scrollY > 20);
});

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); }
  });
});
