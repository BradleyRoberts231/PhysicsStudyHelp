// script.js — Handles navigation highlighting and page behavior

document.addEventListener('DOMContentLoaded', () => {
  highlightActiveLink();
});

function highlightActiveLink() {
  const currentPath = window.location.pathname.split('/').pop();
  const links = document.querySelectorAll('.sidebar a');
  links.forEach(link => {
    const linkPath = link.getAttribute('href');
    if (linkPath === currentPath) {
      link.classList.add('active');
    }
  });
}
