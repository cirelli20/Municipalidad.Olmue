/* Home Olmué · carrusel y buscador de contenido. Navegación compartida en shared-layout.js. */
(() => {
  'use strict';
  const $ = (s,root=document) => root.querySelector(s);
  const $$ = (s,root=document) => [...root.querySelectorAll(s)];
  // Galería informativa: solo las flechas cambian de imagen.
  // La imagen y el texto no funcionan como enlaces.
  const slides = [
    { image: 'assets/images/galeria-festival.jpg', alt: 'Imagen provisoria del aniversario de Olmué y el Festival del Huaso', label: '' },
    { image: 'assets/images/galeria-municipio.jpg', alt: 'Imagen provisoria de la municipalidad', label: 'Conoce tu Municipalidad' },
    { image: 'assets/images/galeria-turismo.jpg', alt: 'Imagen provisoria de un paisaje de Olmué', label: 'Descubre Olmué' }
  ];
  let current = 0;
  const slideImg = $('#slide-image');
  const slideCaption = $('#slide-caption');
  function showSlide(i) {
    current = (i + slides.length) % slides.length;
    const s = slides[current];
    slideImg.src = s.image;
    slideImg.alt = s.alt;
    slideCaption.textContent = s.label;
    slideCaption.hidden = !s.label;
  }
  $('#slide-prev').addEventListener('click', () => showSlide(current - 1));
  $('#slide-next').addEventListener('click', () => showSlide(current + 1));
  showSlide(0);

  // Buscador local inicial: resultados de trámites, documentos y secciones existentes.
  // Los datos definitivos se reemplazarán durante el desarrollo de las páginas internas.
  const entries = [
    ['Licencia de conducir', 'Trámite', 'tramites.html?tramite=licencia-conducir', 'conducir renovar licencia'],
    ['Permiso de circulación', 'Trámite', 'tramites.html?tramite=permiso-circulacion', 'permiso vehiculo auto'],
    ['Patentes comerciales', 'Trámite', 'tramites.html?tramite=patentes-comerciales', 'comercio patente'],
    ['Registro Social de Hogares', 'Trámite', 'tramites.html?tramite=registro-social-hogares', 'apoyo social'],
    ['Permisos de edificación', 'Trámite', 'tramites.html?tramite=permisos-edificacion', 'obras permiso'],
    ['Certificado de informaciones previas', 'Trámite', 'tramites.html?tramite=certificado-informaciones-previas', 'certificado'],
    ['Formulario de solicitud general', 'Documento', 'documentos.html', 'formulario'],
    ['Documentos y formularios', 'Sección', 'documentos.html', 'descargas archivos'],
    ['Departamentos municipales', 'Sección', 'departamentos.html', 'direcciones'],
    ['Trámites y servicios', 'Sección', 'tramites.html', 'tramite servicio'],
    ['Noticias', 'Sección', 'noticias.html', 'noticia cultura comunidad'],
    ['Festival del Huaso', 'Sección', 'festival.html', 'festival evento'],
    ['Turismo', 'Sección', 'turismo.html', 'olmué visitar'],
    ['Medio ambiente', 'Sección', 'medio-ambiente.html', 'reciclaje'],
    ['La Municipalidad', 'Sección', 'municipalidad.html', 'alcalde concejo'],
    ['Contacto municipal', 'Sección', 'contacto.html', 'telefono dirección correo']
  ];
  const normalize = str => str.toLocaleLowerCase('es').normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim();
  const searchInput = $('#portal-search');
  const resultBox = $('#search-results');
  function hideResults() {
    resultBox.hidden = true;
    searchInput.setAttribute('aria-expanded', 'false');
  }
  function search(q) {
    const term = normalize(q);
    if (!term) {
      hideResults();
      searchInput.focus();
      return;
    }
    const found = entries.filter(row => normalize(`${row[0]} ${row[1]} ${row[3]}`).includes(term)).slice(0, 8);
    resultBox.replaceChildren();
    const head = document.createElement('div');
    head.className = 'results-head';
    const heading = document.createElement('strong');
    heading.textContent = `${found.length} resultado${found.length === 1 ? '' : 's'} para «${q}»`;
    const close = document.createElement('button');
    close.type = 'button';
    close.setAttribute('aria-label', 'Cerrar resultados');
    close.textContent = '×';
    close.addEventListener('click', hideResults);
    head.append(heading, close);
    resultBox.append(head);
    if (found.length) {
      found.forEach(([label, category, href]) => {
        const a = document.createElement('a');
        a.href = href;
        const title = document.createElement('span');
        title.textContent = label;
        const kind = document.createElement('small');
        kind.textContent = category + ' →';
        a.append(title, kind);
        resultBox.append(a);
      });
    } else {
      const p = document.createElement('p');
      p.textContent = 'No encontramos coincidencias en el contenido disponible. Prueba otra palabra o visita Trámites y servicios.';
      resultBox.append(p);
      const a = document.createElement('a');
      a.href = 'tramites.html';
      a.textContent = 'Ver todos los trámites →';
      resultBox.append(a);
    }
    resultBox.hidden = false;
    searchInput.setAttribute('aria-expanded', 'true');
  }
  $('#search-form').addEventListener('submit', event => {
    event.preventDefault();
    search(searchInput.value);
  });
  $$('.keywords button').forEach(button => button.addEventListener('click', () => {
    searchInput.value = button.dataset.search;
    search(searchInput.value);
  }));
  searchInput.addEventListener('input', () => { if (!searchInput.value.trim()) hideResults(); });
  searchInput.addEventListener('keydown', event => { if (event.key === 'Escape') hideResults(); });
  document.addEventListener('click', event => {
    if (!$('#portal').contains(event.target)) hideResults();
  });
})();
