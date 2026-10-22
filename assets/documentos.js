/* Buscador y filtros para Documentos. No interviene en el header/footer compartidos. */
(() => {
  'use strict';
  const groups = window.olmueDocumentos || [];
  const categories = document.querySelector('#docs-categories');
  const results = document.querySelector('#docs-groups');
  const query = document.querySelector('#docs-query');
  const form = document.querySelector('#docs-form');
  const count = document.querySelector('#docs-count');
  const title = document.querySelector('#docs-results-title');
  const footnote = document.querySelector('#docs-footnote');
  const empty = document.querySelector('#docs-empty');
  const reset = document.querySelector('#docs-reset');
  if (!groups.length || !categories || !results) return;

  const total = groups.reduce((n,g)=>n+g.files.length,0);
  const norm = v => (v||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLocaleLowerCase('es').trim();
  const icon = (type) => {
    const paths = {
      form:'<rect x="5" y="3" width="14" height="18" rx="2"/><path d="M9 3.5h6M8.5 8h7M8.5 12h7M8.5 16h4"/>',
      office:'<path d="M4 20V5l8-3 8 3v15M2 20h20M9 7v2m6-2v2m-6 4v2m6-2v2M10 20v-3h4v3"/>',
      map:'<path d="M3 5 9 3l6 2 6-2v16l-6 2-6-2-6 2V5Zm6-2v16m6-14v16"/>'
    };
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[type]||paths.form}</svg>`;
  };
  const fileIcon = `<img src="assets/icons/documento.svg" alt="" aria-hidden="true">`;
  const state = { category:'all', search:'' };
  const allButton = {id:'all',title:'Todos los documentos',files:Array(total).fill(null)};

  function makeCategories() {
    categories.replaceChildren(...[allButton,...groups].map(g => {
      const btn = document.createElement('button');
      btn.type='button'; btn.className='docs-cat';btn.dataset.category=g.id;
      btn.setAttribute('aria-pressed',String(g.id===state.category));
      const label=document.createElement('span');label.textContent=g.title;
      const n=document.createElement('span');n.className='docs-cat-number';n.textContent=g.files.length;
      btn.append(label,n);
      btn.addEventListener('click',()=>{state.category=g.id;render();});
      return btn;
    }));
  }
  function makeRow(doc) {
    const row=document.createElement('div');row.className='docs-file-row';
    const pic=document.createElement('div');pic.className='docs-file-icon';pic.innerHTML=fileIcon;
    const detail=document.createElement('div');detail.className='docs-file-info';
    const t=document.createElement('h4');t.textContent=doc.title;
    const d=document.createElement('p');d.textContent=doc.description;
    detail.append(t,d);
    const fmt=document.createElement('span');fmt.className='docs-file-format';fmt.textContent=doc.format;
    const dl=document.createElement('a');dl.className='docs-download-button';dl.href=doc.file;dl.download='';dl.textContent='Descargar';
    dl.setAttribute('aria-label',`Descargar ${doc.title} (${doc.format})`);
    row.append(pic,detail,fmt,dl);
    return row;
  }
  function makeGroup(g, filteredFiles) {
    const section=document.createElement('section');section.className='docs-file-section';
    const heading=document.createElement('div');heading.className='docs-group-heading';
    const mark=document.createElement('span');mark.className='docs-group-icon';mark.innerHTML=icon(g.icon);
    const main=document.createElement('div');main.className='docs-group-main';
    const h3=document.createElement('h3');h3.textContent=g.title;
    const p=document.createElement('p');p.textContent=g.description;
    main.append(h3,p);
    const count=document.createElement('span');count.className='docs-group-count';count.textContent=`${filteredFiles.length} ${filteredFiles.length===1?'archivo':'archivos'}`;
    heading.append(mark,main,count);
    const list=document.createElement('div');list.className='docs-file-list';
    list.append(...filteredFiles.map(makeRow));
    section.append(heading,list);
    return section;
  }
  function render() {
    const terms=norm(state.search).split(/\s+/).filter(Boolean);
    const visible=groups.filter(g=>state.category==='all'||g.id===state.category).map(g=>({g, files:g.files.filter(d=>{
      const haystack=norm(`${g.title} ${g.description} ${d.title} ${d.description} ${d.format}`);
      return terms.every(t=>haystack.includes(t));
    })})).filter(item=>item.files.length);
    const n=visible.reduce((acc,item)=>acc+item.files.length,0);
    const group=groups.find(g=>g.id===state.category);
    title.textContent=group ? group.title : 'Todos los documentos';
    count.textContent=`${n} ${n===1?'archivo':'archivos'} de ejemplo`;
    results.replaceChildren(...visible.map(item=>makeGroup(item.g,item.files)));
    empty.hidden=n!==0;
    footnote.hidden=n===0;
    footnote.textContent=(state.category==='all' && !state.search) ? 'Se muestran todos los archivos del catálogo de ejemplo.' : `Se muestran ${n} ${n===1?'archivo':'archivos'} del catálogo de ejemplo.`;
    categories.querySelectorAll('button').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.category===state.category)));
  }
  form.addEventListener('submit',e=>{e.preventDefault();state.search=query.value;render();});
  query.addEventListener('input',()=>{state.search=query.value;render();});
  reset.addEventListener('click',()=>{state.category='all';state.search='';query.value='';render();query.focus();});
  makeCategories();render();
})();
