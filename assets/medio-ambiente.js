/* Medio Ambiente — desplegables y accesos de la maqueta de escritorio */
(() => {
  'use strict';
  const expanders = [...document.querySelectorAll('.amb-expand-button')];
  expanders.forEach(button => {
    const panel = document.getElementById(button.getAttribute('aria-controls'));
    if (!panel) return;
    button.addEventListener('click', () => {
      const expanded = button.getAttribute('aria-expanded') === 'true';
      const next = !expanded;
      button.setAttribute('aria-expanded', String(next));
      const label = button.querySelector('[data-open-label]');
      if (label) label.textContent = next ? label.dataset.closeLabel : label.dataset.openLabel;
    });
  });
  const modalOverlay = document.getElementById('amb-modal-overlay');
  const modal = modalOverlay?.querySelector('.amb-modal');
  const title = document.getElementById('amb-modal-title');
  const text = document.getElementById('amb-modal-text');
  const close = modalOverlay?.querySelector('.amb-modal-close');
  const content = {
    agua: {
      title: 'Análisis del Agua',
      text: 'Espacio reservado para consultar información y resultados de análisis del agua de la comuna. Los documentos y enlaces oficiales de este servicio están pendientes de incorporación.'
    }
  };
  let lastTrigger = null;
  function openDialog(key, trigger) {
    if (!modalOverlay || !content[key]) return;
    lastTrigger = trigger;
    title.textContent = content[key].title;
    text.textContent = content[key].text;
    modalOverlay.hidden = false;
    document.body.classList.add('amb-modal-open');
    close.focus();
  }
  function closeDialog() {
    if (!modalOverlay || modalOverlay.hidden) return;
    modalOverlay.hidden = true;
    document.body.classList.remove('amb-modal-open');
    lastTrigger?.focus();
  }
  document.querySelectorAll('[data-amb-dialog]').forEach(button => {
    button.addEventListener('click', () => openDialog(button.dataset.ambDialog, button));
  });
  close?.addEventListener('click', closeDialog);
  modalOverlay?.addEventListener('click', e => { if (e.target === modalOverlay) closeDialog(); });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeDialog();
    if (e.key === 'Tab' && modalOverlay && !modalOverlay.hidden) {
      const focusables = [...modal.querySelectorAll('button,a[href]')];
      const idx = focusables.indexOf(document.activeElement);
      if (e.shiftKey && idx <= 0) { e.preventDefault(); focusables[focusables.length - 1].focus(); }
      else if (!e.shiftKey && idx === focusables.length - 1) { e.preventDefault(); focusables[0].focus(); }
    }
  });
})();
