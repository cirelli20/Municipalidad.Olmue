/* Contenido provisorio: ejemplos basados en las maquetas recibidas, no noticias verificadas. */
(() => {
  'use strict';
  const items = [
    ['Cultura','2026-10-03','¡Invitamos a toda nuestra comunidad a ser parte del Primer Festival de Talentos para la Juventud 2026!' ,'Una jornada para compartir en comunidad, acercar la música a nuevas generaciones y poner en valor el talento de niños, niñas y jóvenes.'],
    ['Cultura','2026-10-10','Concierto "ENSAMBLE TEMPORÍA" por orquesta infantil juvenil de La Cruz','Ven a disfrutar del talento de niños y jóvenes músicos en una tarde llena de melodías de América. ¡Un panorama familiar y gratuito!'],
    ['Medio ambiente','2026-10-17','¡LLEGA LA TERCERA EXPO ECOFERIA RESERVA DE LA BIÓSFERA OLMUÉ 2026!','Este sábado 17 de octubre, te invitamos a ser parte del 3.er Festival de la Biósfera Olmué 2026, una jornada para disfrutar, conocer y apoyar el emprendimiento local, la sustentabilidad y el cuidado de nuestro entorno.'],
    ['Comunidad','2026-10-02','Se dan a conocer las bases del LVI FESTIVAL DEL HUASO DE OLMUÉ 2027','Ya se encuentran disponibles las bases oficiales de la Competencia Folclórica del LVI Festival del Huaso de Olmué 2027, dando inicio al proceso de postulación para autores, compositores, solistas y agrupaciones que quieran ser parte de este tradicional encuentro de la música y el folclore nacional.'],
    ['Deportes','2026-09-30','Actividad física al aire libre para todas las edades','Los espacios públicos invitan a encontrarse a través de la actividad física.'],
    ['Medio ambiente','2026-09-28','INICIA CONSTRUCCIÓN DE HUERTA COMUNITARIA ','Con el compromiso de fortalecer el bienestar, la participación y el trabajo colaborativo, cuidadoras y cuidadores del Programa Red Local de Apoyos y Cuidados y del Centro Comunitario de Cuidados dieron inicio a la construcción de una Huerta Comunitaria, un espacio pensado para fomentar el autocuidado y la vida saludable.'],
    ['Cultura','2026-09-25','¡La lectura y la escritura se viven en Olmué!','Se invita a la comunidad a participar en dos espacios culturales pensados especialmente para personas adultas.'],
    ['Servicios municipales','2026-09-23','Orientación ciudadana para acceder a trámites y servicios','Información de ejemplo para representar la atención a vecinos y vecinas.'],
    ['Comunidad','2026-10-17','¡Operativo de belleza en Olmué!','Te invitamos a regalonearte y disfrutar de una jornada dedicada a tu cuidado personal.'],
    ['Cultura','2026-09-18','Arte y comunidad: un espacio para compartir talentos'],
    ['Comunidad','2026-09-16','Encuentros vecinales y participación ciudadana'],
    ['Deportes','2026-09-14','Rutas para caminar y disfrutar de la naturaleza'],
    ['Medio ambiente','2026-09-12','Consejos para cuidar nuestras áreas verdes'],
    ['Servicios municipales','2026-09-10','Canales de atención para consultas ciudadanas'],
    ['Cultura','2026-09-08','Historias y tradiciones que nos reúnen'],
    ['Comunidad','2026-09-06','Actividades comunitarias para compartir en familia'],
    ['Medio ambiente','2026-09-04','Pequeñas acciones para un entorno más sostenible'],
    ['Deportes','2026-09-02','Bienestar y movimiento en los espacios públicos'],
    ['Cultura','2026-08-30','Aprender música y descubrir nuevos talentos'],
    ['Servicios municipales','2026-08-28','Cómo encontrar orientación para tus solicitudes'],
    ['Comunidad','2026-08-26','Participación y diálogo entre generaciones'],
    ['Medio ambiente','2026-08-24','Cuidemos juntos los senderos y espacios naturales'],
    ['Deportes','2026-08-22','Disfrutar la actividad física con amigos y vecinos'],
    ['Cultura','2026-08-20','La creatividad como forma de encuentro'],
    ['Servicios municipales','2026-08-18','Información útil para la atención municipal'],
    ['Comunidad','2026-08-16','Conociendo las iniciativas de nuestra comunidad'],
    ['Medio ambiente','2026-08-14','Jardines y huertos para compartir aprendizajes'],
    ['Cultura','2026-08-12','Oficios creativos y memoria local'],
    ['Deportes','2026-08-10','Recreación y vida activa para todas las edades'],
    ['Comunidad','2026-08-08','Espacios de convivencia y vida comunitaria'],
    ['Cultura','2026-08-06','Cuentos, música y encuentros culturales'],
    ['Servicios municipales','2026-08-04','Guía de ejemplo para trámites municipales'],
    ['Medio ambiente','2026-08-02','Aprendamos a proteger los espacios naturales'],
    ['Comunidad','2026-07-30','Ideas para construir una comuna participativa'],
    ['Deportes','2026-07-28','Actividades de movimiento al aire libre'],
    ['Cultura','2026-07-26','Celebrando el encuentro a través del arte']
  ];
  window.olmueNews = items.map(([category,date,title,summary], id) => ({
    id,category,date,title,
    summary: summary || 'Publicación ilustrativa para visualizar el diseño de la sección de Noticias de la Municipalidad de Olmué.',
    image:`assets/images/news/noticia-${String((id%9)+1).padStart(2,'0')}.jpg`,
    example:true
  }));
})();
