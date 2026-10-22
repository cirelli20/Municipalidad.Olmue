(() => {
  'use strict';
  const departments = window.OLMUE_DEPARTAMENTOS || [];
  const root = document.querySelector('#dept-card-rows');
  const input = document.querySelector('#dept-search-input');
  const form = document.querySelector('#dept-search-form');
  const count = document.querySelector('#dept-count');
  const empty = document.querySelector('#dept-empty');
  const reset = document.querySelector('#dept-reset');
  if (!root || !input || !form) return;

  // Pictogramas lineales, acordes con el sistema visual del proyecto.
  const escapeHTML = v => String(v ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const iconSVG = name => `<img class="dept-original-pictogram" src="assets/icons/departamentos/${escapeHTML(name)}.svg" alt="">`;
  const arrow = '<img src="assets/icons/flecha-derecha.svg" alt="">';
  let openID = null;
  let query = '';

  const fold = str => String(str).normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLocaleLowerCase('es');
  function matches(dept) {
    const text = [dept.titulo, dept.resumen, dept.intro, dept.cierre, ...(dept.temas || []), ...(dept.funciones || [])].join(' ');
    return fold(text).includes(fold(query.trim()));
  }
  function detailsMarkup(dept) {
    return `<div class="dept-details" id="detalle-${dept.id}" aria-hidden="true"><div class="dept-details-inner">
       <p>${escapeHTML(dept.intro)}</p>
       <h4>${escapeHTML(dept.subtitulo)}</h4>
       <ul>${dept.funciones.map(item => `<li>${escapeHTML(item)}</li>`).join('')}</ul>
       <p>${escapeHTML(dept.cierre)}</p>
       
     </div></div>`;
  }
  function cardMarkup(dept) {
    const open = dept.id === openID;
    return `<article class="dept-card${open ? ' is-open' : ''}" data-dept="${escapeHTML(dept.id)}" id="area-${escapeHTML(dept.id)}">
      <div class="dept-card-head"><span class="dept-icon" aria-hidden="true">${iconSVG(dept.icono)}</span><h3 class="dept-title">${escapeHTML(dept.titulo)}</h3></div>
      ${detailsMarkup(dept)}
      <button class="dept-action" type="button" data-toggle="${escapeHTML(dept.id)}" aria-expanded="${open}" aria-controls="detalle-${escapeHTML(dept.id)}">
        <span>${open ? 'Ver menos' : 'Ver información del área'}</span>${arrow}
      </button>
    </article>`;
  }
  function draw() {
    const visible = departments.filter(matches);
    if (openID && !visible.some(d => d.id === openID)) openID = null;
    let rows = '';
    for (let i=0; i<visible.length; i+=3) {
      const slice = visible.slice(i,i+3);
      rows += `<div class="dept-row${slice.some(d => d.id===openID) ? ' has-open' : ''}" style="--dept-siblings:${slice.length - 1}">${slice.map(cardMarkup).join('')}</div>`;
    }
    root.innerHTML = rows;
    empty.hidden = visible.length !== 0;
    const text = query.trim() ? `${visible.length} ${visible.length === 1 ? 'área encontrada' : 'áreas encontradas'}` : `Todas las áreas · ${departments.length} propuestas`;
    count.textContent = text;
  }
  // Mantener los nodos al abrir/cerrar permite animar de verdad el ancho
  // de las tarjetas y la altura de la información en ambos sentidos.
  function setOpen(id) {
    openID = id;
    root.querySelectorAll('.dept-row').forEach(row => {
      const active = id && row.querySelector(`[data-dept="${id}"]`);
      row.classList.toggle('has-open', Boolean(active));
      row.querySelectorAll('.dept-card').forEach(card => {
        const isOpen = card.dataset.dept === id;
        card.classList.toggle('is-open', isOpen);
        const button = card.querySelector('[data-toggle]');
        const details = card.querySelector('.dept-details');
        if (button) {
          button.setAttribute('aria-expanded', String(isOpen));
          button.querySelector('span').textContent = isOpen ? 'Ver menos' : 'Ver información del área';
        }
        if (details) details.setAttribute('aria-hidden', String(!isOpen));
      });
    });
  }
  root.addEventListener('click', event => {
    const button = event.target.closest('[data-toggle]');
    if (!button) return;
    const id = button.dataset.toggle;
    setOpen(openID === id ? null : id);
  });
  input.addEventListener('input', () => {
    query = input.value;
    draw();
  });
  form.addEventListener('submit', event => {
    event.preventDefault();
    query = input.value;
    draw();
    input.focus({preventScroll:true});
  });
  reset.addEventListener('click', () => {
    input.value = '';
    query = '';
    openID = null;
    draw();
    input.focus();
  });
  draw();
})();
