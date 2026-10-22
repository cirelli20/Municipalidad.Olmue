/* Navegación y pie de página compartidos: una única fuente para todas las páginas. */
(() => {
  'use strict';
  const HEADER = "<header class=\"site-header\" id=\"site-header\">\n<div class=\"utility-bar\">\n<div class=\"container utility-inner\">\n<strong>Sitio oficial · Región de Valparaíso, Chile</strong>\n<div class=\"utility-right\">\n<a href=\"tel:+56443579530\">+56 44 357 9530</a>\n<a href=\"mailto:oficinadepartes@olmue.cl\">oficinadepartes@olmue.cl</a>\n<button aria-label=\"Ir al buscador de trámites\" class=\"utility-search\" id=\"top-search\" type=\"button\"><img alt=\"\" src=\"assets/icons/buscar.svg\"/></button>\n</div>\n</div>\n</div>\n<div class=\"main-nav\">\n<div class=\"container nav-inner\">\n<a aria-label=\"Municipalidad de Olmué, ir al inicio\" class=\"brand\" href=\"index.html\"><span>MUNICIPALIDAD DE</span><strong>Olmué</strong></a>\n<button aria-controls=\"nav-links\" aria-expanded=\"false\" aria-label=\"Abrir menú de navegación\" class=\"menu-toggle\" id=\"menu-toggle\" type=\"button\"><span></span><span></span><span></span></button>\n<nav aria-label=\"Navegación principal\" class=\"nav-links\" id=\"nav-links\">\n<a class=\"nav-link\" href=\"tramites.html\">Trámites y servicios</a>\n<div class=\"nav-group\" data-menu=\"municipalidad\">\n<button aria-controls=\"submenu-municipalidad\" aria-expanded=\"false\" class=\"nav-trigger\" type=\"button\">La Municipalidad <img alt=\"\" class=\"nav-chevron\" src=\"assets/icons/chevron-abajo.svg\"/></button>\n<div aria-label=\"Secciones de La Municipalidad\" class=\"nav-dropdown\" id=\"submenu-municipalidad\">\n<a href=\"municipalidad.html\">Municipalidad</a>\n<a href=\"departamentos.html\">Departamentos</a>\n<a href=\"documentos.html\">Documentos</a>\n<a href=\"medio-ambiente.html\">Medio ambiente</a>\n</div>\n</div>\n<div class=\"nav-group\" data-menu=\"noticias\">\n<button aria-controls=\"submenu-noticias\" aria-expanded=\"false\" class=\"nav-trigger\" type=\"button\">Noticias y Festival <img alt=\"\" class=\"nav-chevron\" src=\"assets/icons/chevron-abajo.svg\"/></button>\n<div aria-label=\"Secciones de noticias y festival\" class=\"nav-dropdown\" id=\"submenu-noticias\">\n<a href=\"noticias.html\">Noticias</a>\n<a href=\"festival.html\">Festival</a>\n<a href=\"turismo.html\">Turismo</a>\n</div>\n</div>\n<a class=\"nav-link\" href=\"contacto.html\">Contacto</a>\n</nav>\n</div>\n</div>\n</header>";
  const FOOTER = "<footer class=\"footer\">\n<div class=\"container\">\n<div class=\"footer-grid\">\n<div class=\"footer-brand\"><a class=\"brand\" href=\"index.html\"><span>MUNICIPALIDAD DE</span><strong>Olmué</strong></a><p>Capital folclórica de Chile</p></div>\n<div class=\"footer-column\"><h2>Servicios ciudadanos</h2><a href=\"tramites.html\">Trámites y servicios</a><a href=\"documentos.html\">Documentos y formularios</a><a href=\"contacto.html#emergencias\">Servicios de emergencia</a></div>\n<div class=\"footer-column\"><h2>Contáctanos</h2><p>Prat #12, Olmué, 5ta Región</p><a href=\"tel:+56443579530\">+56 44 357 9530</a><p>Lunes a Jueves de 08:30 a 17:30 y<br/>Viernes de 08:30 a 16:30</p></div>\n<div class=\"footer-column footer-mayor\"><div class=\"mayor-row\"><div><h2>Alcalde</h2><p>Jorge Jil Herrera</p></div><img alt=\"Fotografía provisoria para la sección de Alcalde\" src=\"assets/images/alcalde-provisorio.jpg\"/></div><h2>RRSS</h2><a href=\"https://www.instagram.com/municipalidad_de_olmue/\" rel=\"noopener noreferrer\" target=\"_blank\">Instagram</a><a href=\"https://www.facebook.com/municipalidaddeolmue.vregiondevalparaiso\" rel=\"noopener noreferrer\" target=\"_blank\">Facebook</a><a href=\"https://x.com/OlmueComunica\" rel=\"noopener noreferrer\" target=\"_blank\">X</a></div>\n</div>\n<div class=\"footer-bottom\"><span>Municipalidad de Olmué · www.muniolmue.cl</span><a href=\"#inicio\">Volver al inicio <img alt=\"\" src=\"assets/icons/flecha-arriba.svg\"/></a></div>\n</div>\n</footer>";
  const headerMount = document.querySelector('#site-shell-header');
  const footerMount = document.querySelector('#site-shell-footer');
  if (!headerMount || !footerMount) return;
  headerMount.outerHTML = HEADER + "<button type=\"button\" id=\"menu-backdrop\" class=\"menu-backdrop\" aria-label=\"Cerrar menú\" tabindex=\"-1\" hidden></button>";
  footerMount.outerHTML = FOOTER;

  const $ = (selector, root=document) => root.querySelector(selector);
  const $$ = (selector, root=document) => [...root.querySelectorAll(selector)];
  const header = $('#site-header');
  const backdrop = $('#menu-backdrop');
  const nav = $('#nav-links');
  const toggle = $('#menu-toggle');
  const groups = $$('.nav-group', header);
  const compact = () => window.matchMedia('(max-width:760px)').matches;
  let active = null;

  const page = location.pathname.split('/').pop() || 'index.html';
  const activeLink = [...$$('.nav-link, .nav-dropdown a', header)].find(a => a.getAttribute('href') === page);
  if (activeLink) activeLink.setAttribute('aria-current','page');

  function backdropVisibility() {
    backdrop.hidden = !active && !(compact() && nav.classList.contains('mobile-open'));
  }
  function closeSubmenus() {
    groups.forEach(group => {
      group.classList.remove('open');
      $('.nav-trigger',group).setAttribute('aria-expanded','false');
    });
    active = null;
    backdropVisibility();
  }
  function openSubmenu(group) {
    groups.forEach(item => {
      const isActive = item === group;
      item.classList.toggle('open',isActive);
      $('.nav-trigger',item).setAttribute('aria-expanded',String(isActive));
    });
    active = group;
    backdropVisibility();
  }
  function closeAll() {
    closeSubmenus();
    nav.classList.remove('mobile-open');
    toggle.setAttribute('aria-expanded','false');
    toggle.setAttribute('aria-label','Abrir menú de navegación');
    backdropVisibility();
  }
  groups.forEach(group => {
    const trigger = $('.nav-trigger',group);
    trigger.addEventListener('click', () => {
      if (compact() && group.classList.contains('open')) closeSubmenus();
      else openSubmenu(group);
    });
    group.addEventListener('pointerenter', e => { if (e.pointerType !== 'touch' && !compact()) openSubmenu(group); });
    group.addEventListener('pointerleave', () => { if (!compact()) closeSubmenus(); });
    group.addEventListener('focusin', () => { if (!compact()) openSubmenu(group); });
    group.addEventListener('focusout', e => { if (!group.contains(e.relatedTarget) && !compact()) closeSubmenus(); });
  });
  toggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('mobile-open');
    toggle.setAttribute('aria-expanded',String(isOpen));
    toggle.setAttribute('aria-label',isOpen ? 'Cerrar menú de navegación' : 'Abrir menú de navegación');
    closeSubmenus();
    backdropVisibility();
  });
  backdrop.addEventListener('click',closeAll);
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeAll(); });
  document.addEventListener('click',e => {
    if (!header.contains(e.target) && !backdrop.contains(e.target)) closeSubmenus();
  });
  window.addEventListener('resize', () => {
    if (!compact()) {
      nav.classList.remove('mobile-open');
      toggle.setAttribute('aria-expanded','false');
    }
    closeSubmenus();
  });
  $('#top-search').addEventListener('click', () => {
    closeAll();
    if (page === 'index.html') {
      const portal = $('#portal');
      const search = $('#portal-search');
      if (portal) portal.scrollIntoView({behavior:'smooth',block:'center'});
      if (search) search.focus({preventScroll:true});
    } else {
      location.assign('index.html#portal');
    }
  });
  window.olmueNav = {closeAll};
})();
