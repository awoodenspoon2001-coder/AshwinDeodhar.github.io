/*
  js/main.js

  Extracted from index.html. This file contains the interactive bits:
  - Custom cursor movement and hover states
  - Scroll reveal via IntersectionObserver

  Tips:
  - Keep presentation-only behavior (cursor, tiny UI flourishes) separate
    from application logic (data fetching, routing).
  - Consider converting to an ES module and importing feature modules
    when the project grows.
*/

// Custom cursor
const cursor = document.getElementById('cursor');
const ring = document.getElementById('cursorRing');
let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  if (cursor) {
    cursor.style.left = mx - 6 + 'px';
    cursor.style.top = my - 6 + 'px';
  }
});

function animateRing() {
  rx += (mx - rx - 18) * 0.12;
  ry += (my - ry - 18) * 0.12;
  if (ring) {
    ring.style.left = rx + 'px';
    ring.style.top = ry + 'px';
  }
  requestAnimationFrame(animateRing);
}
animateRing();

// Hover interactions: enlarge cursor and change ring color on hover
document.querySelectorAll('a, .card, .book-item, .story-card, .channel-card').forEach(el => {
  el.addEventListener('mouseenter', () => {
    if (cursor) cursor.style.transform = 'scale(2)';
    if (ring) {
      ring.style.transform = 'translate(-12px,-12px) scale(1.5)';
      ring.style.borderColor = 'var(--teal)';
    }
  });
  el.addEventListener('mouseleave', () => {
    if (cursor) cursor.style.transform = 'scale(1)';
    if (ring) {
      ring.style.transform = 'translate(-12px,-12px) scale(1)';
      ring.style.borderColor = 'var(--pink)';
    }
  });
});

/*
  Scroll reveal

  - Uses IntersectionObserver to add `.visible` to elements with the
    `.reveal` class when they enter the viewport.
  - This keeps animations performant and avoids running them on
    offscreen elements.
*/
const reveals = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 80);
      }
    });
  }, { threshold: 0.1 });
  reveals.forEach(el => observer.observe(el));
} else {
  // Fallback: reveal all immediately if IntersectionObserver unsupported
  reveals.forEach(el => el.classList.add('visible'));
}

// Exporting nothing for now — file is a simple script. Consider
// wrapping in an init() function when adding tests or modules.

/* End of js/main.js */
