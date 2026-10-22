/* Accesos externos aún sin URL oficial, presentados sin navegación falsa. */
(() => {
  'use strict';
  const toast = document.querySelector('#festival-toast');
  document.querySelectorAll('[data-pending]').forEach(button => {
    button.addEventListener('click', () => {
      toast.textContent = button.dataset.pending;
      toast.hidden = false;
    });
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') toast.hidden = true;
  });
  document.addEventListener('click', event => {
    if (!event.target.closest('[data-pending]')) toast.hidden = true;
  });
})();
