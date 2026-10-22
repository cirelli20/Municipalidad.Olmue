(function () {
  'use strict';
  const data = window.OLMUE_TRAMITES || [];
  const qInput = document.getElementById('tramites-query');
  const searchForm = document.getElementById('tramites-search-form');
  const list = document.getElementById('tramites-list');
  const count = document.getElementById('tramites-results-count');
  const filters = document.getElementById('tramites-filters');
  const empty = document.getElementById('tramites-empty');
  const title = document.getElementById('tramites-results-title');
  const allButtonLabel = 'Todos los trámites';
  const categoryIcon = {
    'Todos los trámites': 'stamp.svg',
    'Tránsito y vehículos': 'traffic.svg',
    'Comercio y emprendimiento': 'tienda.svg',
    'Apoyo social': 'community.svg',
    'Vivienda y obras': 'building.svg',
    'Atención ciudadana': 'documento.svg'
  };
  const categories = [allButtonLabel, ...new Set(data.map(item => item.categoria))];
  const openCards = new Set();
  let activeCategory = allButtonLabel;
  let query = '';
  const escapeHTML = s => String(s ?? '').replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));

  function iconPath(name) {
    const departmentSet = new Set(['traffic.svg', 'community.svg', 'building.svg', 'stamp.svg']);
    return `assets/icons/${departmentSet.has(name) ? 'departamentos/' + name : name}`;
  }

  function filteredData() {
    return data.filter(item => {
      const matchesCategory = activeCategory === allButtonLabel || item.categoria === activeCategory;
      const haystack = [item.titulo, item.categoria, item.descripcion, item.resumen, ...(item.temas || []), ...(item.documentos || [])].join(' ').toLocaleLowerCase('es');
      return matchesCategory && (!query || haystack.includes(query));
    });
  }

  function makeFilters() {
    filters.innerHTML = categories.map(cat => {
      const total = cat === allButtonLabel ? data.length : data.filter(item => item.categoria === cat).length;
      const icon = iconPath(categoryIcon[cat] || 'documento.svg');
      return `<button type="button" class="tramites-filter${cat===activeCategory ? ' is-active' : ''}" data-category="${escapeHTML(cat)}" aria-pressed="${cat===activeCategory}">
        <span class="tramites-filter-left"><img src="${icon}" alt="" aria-hidden="true"><span>${escapeHTML(cat)}</span></span>
        <span class="tramites-filter-count">${total}</span>
      </button>`;
    }).join('');
    filters.querySelectorAll('[data-category]').forEach(button => {
      button.addEventListener('click', () => {
        activeCategory = button.dataset.category;
        render();
      });
    });
  }

  function downloadList(item) {
    const files = item.descargas || [
      { titulo: 'Ficha de información', subtitulo: 'Documento provisorio', archivo:'ficha-informativa-PROVISORIA.pdf' },
      { titulo: 'Antecedentes para solicitar', subtitulo: 'Documento provisorio', archivo:'requisitos-generales-PROVISORIOS.pdf' }
    ];
    return files.map(file => `<a class="tramite-download" href="${file.url || 'descargas/tramites/' + encodeURIComponent(file.archivo)}" ${file.url ? 'target="_blank" rel="noopener noreferrer"' : 'download title="Archivo provisorio: reemplazar por el documento oficial"'}>
      <span><strong>${escapeHTML(file.titulo)}</strong><small>${escapeHTML(file.subtitulo || '')}</small></span>
      <img src="assets/icons/ambiente/descargar.svg" alt="" aria-hidden="true">
    </a>`).join('');
  }

  function detailsMarkup(item) {
    const official = !!item.directora;
    const informacion = item.informacion || `Área de orientación: ${item.atencion || item.categoria} (información provisoria)`;
    const email = item.email || 'oficinadepartes@olmue.cl';
    const fono = item.fono || '+56443579530';
    const preparacion = item.preparacion || 'Consulta aquí los antecedentes y documentos de orientación antes de realizar tu trámite.';
    const prepareMarkup = official ? 'Prepare <a class="tramite-text-link" href="#recursos-licencia-conducir">aquí</a> los nuevos exámenes teóricos para su licencia de conducir B y C.' : escapeHTML(preparacion);
    return `<div class="tramite-expanded-content">
      <div class="tramite-information">
        <p class="tramite-info-heading">Información</p>
        <p>${escapeHTML(informacion)}</p>
        <p>e-mail: <a class="tramite-text-link" href="mailto:${escapeHTML(email)}">${escapeHTML(email)}</a></p>
        <p>Fono: <a href="tel:${escapeHTML(fono.replace(/[^+0-9]/g, ''))}">${escapeHTML(fono)}</a></p>
      </div>
      <p class="tramite-prepare">${prepareMarkup}</p>
      <div class="tramite-downloads" id="recursos-${escapeHTML(item.id)}">${downloadList(item)}</div>
      ${official ? '' : '<p class="tramite-provisional">Datos y documentos provisorios, pendientes de validación municipal.</p>'}
    </div>`;
  }

  function cardTemplate(item) {
    const isOpen = openCards.has(item.id);
    const detailId = `tramite-detail-${item.id}`;
    const icon = iconPath(item.icono || 'documento.svg');
    return `<article class="tramite-card${isOpen ? ' is-open' : ''}" data-item-id="${escapeHTML(item.id)}">
      <div class="tramite-card-heading">
        <span class="tramite-icon"><img src="${icon}" alt="" aria-hidden="true"></span>
        <h4>${escapeHTML(item.titulo)}</h4>
        <span class="tramite-tag">${escapeHTML(item.categoria)}</span>
      </div>
      <div class="tramite-closed"><div class="tramite-closed-inner">
        <p class="tramite-description">${escapeHTML(item.descripcion)}</p>
        <p class="tramite-resumen">${escapeHTML(item.resumen)}</p>
      </div></div>
      <div class="tramite-expanded" id="${detailId}" aria-hidden="${!isOpen}" ${isOpen ? '' : 'inert'}><div class="tramite-expanded-inner">${detailsMarkup(item)}</div></div>
      <button class="tramite-toggle" type="button" aria-expanded="${isOpen}" aria-controls="${detailId}">
        <span>${isOpen ? 'Ver menos' : 'Consultar trámite'}</span>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" aria-hidden="true">
          <path d="M12 4v16m0 0-7-7m7 7 7-7" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
    </article>`;
  }

  function bindToggles() {
    list.querySelectorAll('.tramite-toggle').forEach(button => {
      button.addEventListener('click', () => {
        const card = button.closest('.tramite-card');
        const id = card.dataset.itemId;
        const nextOpen = !openCards.has(id);
        if (nextOpen) openCards.add(id); else openCards.delete(id);
        card.classList.toggle('is-open', nextOpen);
        const detail = card.querySelector('.tramite-expanded');
        detail.setAttribute('aria-hidden', String(!nextOpen));
        detail.inert = !nextOpen;
        button.setAttribute('aria-expanded', String(nextOpen));
        button.querySelector('span').textContent = nextOpen ? 'Ver menos' : 'Consultar trámite';
      });
    });
  }

  function render() {
    makeFilters();
    const filtered = filteredData();
    count.textContent = `${filtered.length} ${filtered.length === 1 ? 'resultado' : 'resultados'}`;
    title.textContent = activeCategory === allButtonLabel ? 'Todos los trámites y servicios' : activeCategory;
    empty.hidden = filtered.length !== 0;
    list.innerHTML = filtered.map(cardTemplate).join('');
    bindToggles();
  }

  const params = new URLSearchParams(window.location.search);
  const initialQuery = params.get('q');
  if (initialQuery && qInput) { qInput.value = initialQuery; query = initialQuery.trim().toLocaleLowerCase('es'); }
  const selectedTramite = params.get('tramite');
  if (selectedTramite) {
    const match = data.find(item => item.id === selectedTramite);
    if (match) {
      openCards.add(match.id);
      query = match.titulo.toLocaleLowerCase('es');
      if (qInput) qInput.value = match.titulo;
    }
  }
  qInput?.addEventListener('input', e => { query = e.target.value.trim().toLocaleLowerCase('es'); render(); });
  searchForm?.addEventListener('submit', e => { e.preventDefault(); query = (qInput?.value || '').trim().toLocaleLowerCase('es'); render(); });
  render();
})();
