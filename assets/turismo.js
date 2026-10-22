(() => {
  'use strict';
  const toggle = document.querySelector('#tour-more');
  const panel = document.querySelector('#tour-places-reveal');
  if (!toggle || !panel) return;
  toggle.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') !== 'true';
    toggle.setAttribute('aria-expanded', String(open));
    toggle.querySelector('span').textContent = open ? 'Ver menos' : 'Ver más';
    panel.classList.toggle('is-open', open);
    panel.setAttribute('aria-hidden', String(!open));
  });
})();
