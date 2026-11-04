'use strict';

// Subtle scroll reveal; content remains visible without JavaScript.
if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  document.body.classList.add('js-ready');
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {threshold: 0.08, rootMargin: '0px 0px 20px 0px'});
  document.querySelectorAll('.reveal').forEach(node => revealObserver.observe(node));
}

const menuButton = document.getElementById('menu-button');
const mobileNav = document.getElementById('mobile-nav');
if (menuButton && mobileNav) {
  const setMenu = open => {
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', open ? '關閉選單' : '開啟選單');
    mobileNav.hidden = !open;
  };
  setMenu(false);
  menuButton.addEventListener('click', () => setMenu(menuButton.getAttribute('aria-expanded') !== 'true'));
  mobileNav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setMenu(false)));
  document.addEventListener('keydown', event => { if (event.key === 'Escape') setMenu(false); });
  window.addEventListener('resize', () => { if (innerWidth > 800) setMenu(false); });
}

const toTop = document.getElementById('back-to-top');
const progress = document.getElementById('scroll-progress');
const onScroll = () => {
  if (toTop) toTop.classList.toggle('visible', window.scrollY > 430);
  if (progress) {
    const full = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.width = (full > 0 ? (window.scrollY / full) * 100 : 0) + '%';
  }
};
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();
if (toTop) toTop.addEventListener('click', () => window.scrollTo({top: 0, behavior: 'smooth'}));

// Preserve the original click-to-scatter squares effect.
const explosionContainer = document.querySelector('.explosion-container');
if (explosionContainer) {
  const createExplosion = (x, y) => {
    for (let i = 0; i < 12; i++) {
      const box = document.createElement('span');
      box.className = 'explosion-box';
      const size = 5 + Math.random() * 12;
      const angle = Math.random() * 2 * Math.PI;
      const distance = 20 + Math.random() * 82;
      box.style.width = `${size}px`;
      box.style.height = `${size}px`;
      box.style.left = `${x - size / 2}px`;
      box.style.top = `${y - size / 2}px`;
      box.style.setProperty('--dx', `${Math.cos(angle) * distance}px`);
      box.style.setProperty('--dy', `${Math.sin(angle) * distance}px`);
      box.style.setProperty('--dr', `${Math.random() * 720 - 360}deg`);
      explosionContainer.appendChild(box);
      box.addEventListener('animationend', () => box.remove(), {once:true});
    }
  };
  // A click produces one burst on both touch and mouse, without duplicate touchstart events.
  window.addEventListener('pointerdown', e => {
    if (e.isPrimary && e.button !== 2) createExplosion(e.clientX, e.clientY);
  });
}

// Search/filter on the notes page only.
const searchInput = document.getElementById('search-input');
const chips = Array.from(document.querySelectorAll('.chip[data-filter]'));
const resultLabel = document.getElementById('results-label');
const emptyMessage = document.getElementById('no-results');
const entryCards = Array.from(document.querySelectorAll('#notes-grid .entry-card'));
if (searchInput && entryCards.length) {
  let currentFilter = 'all';
  const update = () => {
    const query = searchInput.value.trim().toLowerCase();
    let count = 0;
    entryCards.forEach(card => {
      const matchCategory = currentFilter === 'all' || card.dataset.category === currentFilter;
      const matchText = !query || (card.dataset.search || '').includes(query);
      const show = matchCategory && matchText;
      card.hidden = !show;
      if (show) count++;
    });
    if (resultLabel) resultLabel.textContent = `Showing ${count} note${count === 1 ? '' : 's'}`;
    if (emptyMessage) emptyMessage.hidden = count > 0;
  };
  searchInput.addEventListener('input', update);
  chips.forEach(chip => chip.addEventListener('click', () => {
    currentFilter = chip.dataset.filter;
    chips.forEach(item => {
      const active = item === chip;
      item.classList.toggle('active', active);
      item.setAttribute('aria-pressed', String(active));
    });
    update();
  }));
}
