(()=>{
 'use strict';
 const slides=[['assets/images/galeria-turismo.webp','Imagen conmemorativa de Olmué'],['assets/images/galeria-municipio.webp','Edificio municipal de Olmué'],['assets/images/galeria-festival.webp','Imagen del Festival del Huaso de Olmué']];
 let current=0;
 const img=document.querySelector('#muni-slide-img');
 const status=document.querySelector('#muni-slide-status');
 document.querySelectorAll('.muni-slider-arrow').forEach(button=>button.addEventListener('click',()=>{
   current=(current+(button.classList.contains('next')?1:-1)+slides.length)%slides.length;
   img.src=slides[current][0]; img.alt=slides[current][1];
   status.textContent=`Imagen ${current+1} de ${slides.length}`;
 }));
 const more=document.querySelector('#muni-more-council');
 const extra=document.querySelector('#muni-council-extra');
 more.addEventListener('click',()=>{
   const expanded=more.getAttribute('aria-expanded')==='true';
   more.setAttribute('aria-expanded',String(!expanded));extra.hidden=expanded;
   more.firstChild.textContent=expanded?'Ver más ':'Ver menos ';
 });
 const notice=document.querySelector('#muni-notice');
 const closeNotice=()=>{notice.hidden=true};
 notice.querySelector('button').addEventListener('click',closeNotice);
 document.querySelectorAll('[data-notice]').forEach(b=>b.addEventListener('click',()=>{
   notice.querySelector('span').textContent=b.dataset.notice;
   notice.hidden=false;
 }));
})();