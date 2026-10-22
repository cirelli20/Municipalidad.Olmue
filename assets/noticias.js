/* Listado, filtros, paginación y detalle de noticias. La información es demostrativa. */
(() => {
  'use strict';
  const news=window.olmueNews || [];
  const path=location.pathname.split('/').pop();
  if(!news.length || (path!=='noticias.html' && path!=='noticia.html')) return;
  const $=(s,root=document)=>root.querySelector(s);
  const $$=(s,root=document)=>[...root.querySelectorAll(s)];
  const arrow='assets/icons/flecha-derecha.svg';
  const formatDate=iso=>new Intl.DateTimeFormat('es-CL',{day:'2-digit',month:'long',year:'numeric',timeZone:'UTC'}).format(new Date(iso+'T12:00:00Z'));
  const fold=s=>s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLocaleLowerCase('es-CL');
  // Resaltar la sección sin modificar la plantilla de navegación compartida.
  // Solo el enlace «Más información» es interactivo; nunca la tarjeta completa.
  function card(item,related=false){
    const metadata=related ? `<div class="news-card-date">${item.category} · ${formatDate(item.date)}</div>`:
      `<div class="news-card-topline"><span class="news-card-category">${item.category}</span></div><div class="news-card-date">${formatDate(item.date)}</div>`;
    return `<article class="news-list-card">
      <img class="news-card-cover" src="${item.image}" alt="Imagen ilustrativa de la noticia: ${item.title}" loading="${related?'lazy':item.id<3?'eager':'lazy'}">
      <div class="news-card-content">${metadata}<h3 class="news-card-title">${item.title}</h3>
      <a class="news-card-action" href="noticia.html?id=${item.id}" aria-label="Más información sobre: ${item.title}"><span>Más información</span><img loading="lazy" decoding="async" src="${arrow}" alt=""></a></div></article>`;
  }
  if(path==='noticias.html'){
    const PER_PAGE=9;
    const requestedPage=Number.parseInt(new URLSearchParams(location.search).get('pagina') || '1',10);
    const view={category:'Todas',query:'',sort:'recent',page:Number.isInteger(requestedPage) && requestedPage>0?requestedPage:1};
    const form=$('#news-search-form'),input=$('#news-query-input'),grid=$('#news-cards');
    const pagination=$('#news-pages-controls'),counter=$('#news-page-counter');
    const status=$('#news-results-count'),noResults=$('#news-no-results');
    const qs=new URLSearchParams(location.search).get('q');
    if(qs){ input.value=qs; view.query=qs; }
    const filtered=()=>{
      const q=fold(view.query.trim());
      return news.filter(n=>{
        const cat=view.category==='Todas'||n.category===view.category;
        const match=!q||fold(`${n.title} ${n.category} ${n.summary}`).includes(q);
        return cat && match;
      }).sort((a,b)=>view.sort==='recent'?b.date.localeCompare(a.date):a.date.localeCompare(b.date));
    };
    function changePage(page){
      const maximum=Math.max(1,Math.ceil(filtered().length/PER_PAGE));
      view.page=Math.min(maximum,Math.max(1,page));
      render();
      // Cada página tiene una URL recuperable y compatible con Atrás/Adelante.
      const url=new URL(location.href);
      if(view.page===1) url.searchParams.delete('pagina');
      else url.searchParams.set('pagina',String(view.page));
      history.pushState({pagina:view.page},'',url);
      const top=$('#noticias-resultados');
      if(top && !window.matchMedia('(prefers-reduced-motion: reduce)').matches)top.scrollIntoView({behavior:'smooth',block:'start'});
      else top?.scrollIntoView({block:'start'});
    }
    function render(){
      const matches=filtered(),pages=Math.max(1,Math.ceil(matches.length/PER_PAGE));
      view.page=Math.min(view.page,pages);
      const from=(view.page-1)*PER_PAGE,to=Math.min(from+PER_PAGE,matches.length);
      grid.innerHTML=matches.slice(from,to).map(n=>card(n)).join('');
      noResults.hidden=matches.length>0;
      status.textContent=matches.length?`Mostrando ${from+1}–${to} de ${matches.length} noticias`:'Mostrando 0 noticias';
      counter.textContent=`Página ${view.page} de ${pages}`;
      pagination.replaceChildren();
      if(!matches.length){pagination.parentElement.hidden=true;return;}
      pagination.parentElement.hidden=false;
      function btn(label,target,cl,disabled=false,icon=''){
        const button=document.createElement('button');button.type='button';button.className=cl;
        button.disabled=disabled;button.setAttribute('aria-label',label);
        button.innerHTML=icon==='previous'?`<img src="assets/icons/chevron-derecha.svg" alt="">Anterior`:
          icon==='next'?`Siguiente<img src="assets/icons/chevron-derecha.svg" alt="">`:String(target);
        if(!icon && target===view.page){button.classList.add('is-selected');button.setAttribute('aria-current','page');}
        button.addEventListener('click',()=>changePage(target));pagination.append(button);
      }
      btn('Página anterior',view.page-1,'page-prev',view.page===1,'previous');
      for(let p=1;p<=pages;p++)btn('Ir a la página '+p,p,'page-number');
      btn('Página siguiente',view.page+1,'page-next',view.page===pages,'next');
    }
    function resetPagination(){
      view.page=1;
      const url=new URL(location.href);
      url.searchParams.delete('pagina');
      history.replaceState({},'',url);
      render();
    }
    form.addEventListener('submit',e=>{e.preventDefault();view.query=input.value;resetPagination();});
    input.addEventListener('input',()=>{view.query=input.value;resetPagination();});
    $$('#news-category-chips button').forEach(button=>button.addEventListener('click',()=>{
      view.category=button.dataset.category;view.page=1;
      $$('#news-category-chips button').forEach(b=>{
        const selected=b===button;b.classList.toggle('is-selected',selected);b.setAttribute('aria-pressed',String(selected));
      });resetPagination();
    }));
    $('#news-sort-select').addEventListener('change',e=>{view.sort=e.target.value;resetPagination();});
    window.addEventListener('popstate',()=>{
      const p=Number.parseInt(new URLSearchParams(location.search).get('pagina') || '1',10);
      view.page=Number.isInteger(p)&&p>0?p:1;
      render();
    });
    render();
  }
  if(path==='noticia.html'){
    const params=new URLSearchParams(location.search),raw=Number(params.get('id'));
    const chosen=Number.isInteger(raw)&&raw>=0&&raw<news.length?raw:0;
    const item=news[chosen];
    document.title=item.title+' · Municipalidad de Olmué';
    // Utilizar los antecedentes propios de cada publicación sin inventar actividades,
    // fechas, lugares ni declaraciones que no estén en los datos recibidos.
    const escapeHTML = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
    const suppliedSummary = Boolean(item.summary && !item.summary.startsWith('Publicación ilustrativa para visualizar'));
    const copy = suppliedSummary
      ? `<p>${escapeHTML(item.summary)}</p>
         <h2>Información de la publicación</h2>
         <p>Para consultar más antecedentes sobre esta actividad o iniciativa, revisa los canales oficiales de la Municipalidad de Olmué.</p>`
      : `<p>La información completa de esta publicación está pendiente de incorporación.</p>
         <p>Consulta los canales oficiales de la Municipalidad de Olmué para acceder a los antecedentes disponibles.</p>`;
    const facebook='https://www.facebook.com/sharer/sharer.php?u='+encodeURIComponent(location.href);
    const whatsapp='https://api.whatsapp.com/send?text='+encodeURIComponent(item.title+' '+location.href);
    const mail='mailto:?subject='+encodeURIComponent(item.title)+'&body='+encodeURIComponent(location.href);
    $('#news-article').innerHTML=`
      <div class="news-article-meta"><span class="news-article-pill">${item.category==='Cultura'?'Cultura y comunidad':item.category}</span><span>${formatDate(item.date)}</span><span class="meta-bar">|</span><span>3 min de lectura</span></div>
      <h1 class="news-article-title">${item.title}</h1>
      <p class="news-article-lead">${suppliedSummary ? escapeHTML(item.summary) : 'Información completa pendiente de incorporación.'}</p>
      <figure class="news-article-photo"><img loading="lazy" decoding="async" src="${item.image}" alt="Fotografía ilustrativa asociada a ${item.title}"><figcaption>Imagen ilustrativa · Fotografía ilustrativa; pendiente de sustitución por imagen de la publicación.</figcaption></figure>
      <div class="news-article-content-grid"><div class="news-article-copy">${copy}
        <div class="news-article-callout"><strong>Sigue la vida cultural de nuestra comuna</strong><p>Encuentra novedades y actividades en los canales oficiales del municipio.</p><a href="noticias.html">Ir a Noticias <img loading="lazy" decoding="async" src="${arrow}" alt=""></a></div>
      </div><aside class="news-article-share" aria-label="Compartir noticia"><h2>Comparte esta noticia</h2>
        <a href="${facebook}" target="_blank" rel="noopener noreferrer"><svg aria-hidden="true" viewBox="0 0 24 24" fill="none"><path d="M14.5 20V12h2.7l.4-3h-3.1V7.1c0-.9.25-1.5 1.55-1.5H18V2.9c-.35-.05-1.55-.15-2.95-.15-2.9 0-4.9 1.75-4.9 4.95V9H7.5v3h2.65v8h4.35Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg>Facebook</a>
        <a href="${whatsapp}" target="_blank" rel="noopener noreferrer"><svg aria-hidden="true" viewBox="0 0 24 24" fill="none"><path d="M20 11.6a8 8 0 0 1-11.8 7L4 20l1.4-4.1A8 8 0 1 1 20 11.6Z" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/></svg>WhatsApp</a>
        <button id="news-copy-link" type="button"><svg aria-hidden="true" viewBox="0 0 24 24" fill="none"><path d="m10 14 4-4m-6.5 6H6a4 4 0 0 1 0-8h4m4 0h4a4 4 0 0 1 0 8h-4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg><span id="news-copy-label">Copiar enlace</span></button>
        <a class="share-email" href="${mail}">Enviar por correo</a>
        <div class="share-origin">Municipalidad de Olmué<br>Noticias y Festival</div>
      </aside></div>
      <div class="news-article-bottom"><a class="news-back-button" href="noticias.html">Volver a noticias</a></div>`;
    $('#related-cards').innerHTML=news.filter(n=>n.id!==chosen).slice(chosen===0?0:0,3).map(n=>card(n,true)).join('');
    const copyBtn=$('#news-copy-link'),label=$('#news-copy-label');
    copyBtn.addEventListener('click',async()=>{
      let success=false;
      try{if(navigator.clipboard && window.isSecureContext){await navigator.clipboard.writeText(location.href);success=true;}}
      catch(_e){}
      if(!success){
        const field=document.createElement('textarea');field.value=location.href;field.setAttribute('readonly','');field.style.position='fixed';field.style.left='-9999px';document.body.append(field);field.select();
        try{success=document.execCommand('copy');}catch(_e){}field.remove();
      }
      label.textContent=success?'¡Enlace copiado!':'Copia el enlace desde tu navegador';
    });
  }
})();
