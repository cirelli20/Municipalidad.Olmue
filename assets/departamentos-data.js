/**
 * INFORMACIÓN PROVISORIA Y EDITABLE.
 * Las funciones, descripciones y temas de estos departamentos son textos de ejemplo
 * para probar la interfaz. Verificar los contenidos oficiales antes de publicar.
 * Para cambiar un departamento, edita el objeto correspondiente de este archivo.
 */
window.OLMUE_DEPARTAMENTOS = [
  {
    id: 'secretaria-municipal', titulo: 'Secretaría Municipal', icono: 'stamp',
    temas: ['actas','concejo','correspondencia','decretos','certificaciones','secretaría'],
    resumen: 'Apoya el funcionamiento administrativo del municipio y mantiene los registros institucionales.',
    intro: 'Las funciones del secretario municipal son las de dirigir las actividades de la Secretaría Administrativa del alcalde y del concejo.',
    subtitulo: 'Entre sus funciones se encuentran:',
    funciones: [
      'Desempeñarse como ministro de fe en todas las actuaciones municipales.',
      'Recibir, mantener y tramitar, cuando corresponda, la declaración de interés establecida por la ley 18.575.',
      'Orientar sobre certificados, registros y solicitudes dirigidas a la municipalidad.',
    ],
  },
  {
    id: 'planificacion', titulo: 'Secretaría de Planificación Comunal', icono: 'map',
    temas: ['planificación','proyectos','presupuesto','inversión','pladeco','desarrollo'],
    resumen: 'Colabora en la planificación territorial y el desarrollo de iniciativas comunales.',
    intro: 'Asesorar al alcalde y al concejo municipal en la definición de políticas y en la planificación, coordinación y evaluación de planes, programas y proyectos para el desarrollo de la comuna.',
    subtitulo: 'Ámbitos de trabajo referenciales:',
    funciones: [
      'Apoyar al alcalde en la formulación de proyectos de inversión del Plan Comunal de Desarrollo y en la planificación del presupuesto municipal.',
      'Formular, gestionar y postular proyectos y programas municipales a fondos estatales y otras fuentes de financiamiento externo.',
      'Evaluar la factibilidad técnica, económica y social de los proyectos de inversión.',
      'Proponer estudios, programas y proyectos en distintas áreas de desarrollo.',
      'Emitir informes periódicos sobre las actividades del departamento.',
    ],
  },
  {
    id: 'relaciones-publicas', titulo: 'Departamento de Relaciones Públicas', icono: 'messages',
    temas: ['comunicaciones','difusión','prensa','noticias','eventos','actividades'],
    resumen: 'Apoya las comunicaciones institucionales, actividades públicas y difusión de iniciativas municipales.',
    intro: 'La tarea prioritaria del Departamento de Relaciones Públicas, es proyectar la imagen corporativa del municipio, dando a conocer, los logros de la administración comunal, así como también las actividades de los diversos departamentos municipales.',
    subtitulo: 'Funciones orientativas:',
    funciones: [
      'Se encarga de organizar y/o apoyar la coordinación de los eventos más importantes de la comuna.',
      'Coordinar la logística de las ceremonias oficiales, que requieren de confección de invitaciones, su envío oportuno, así como la correcta aplicación ceremonial y de protocolo.',
      'La labor comunicacional, lo que se realiza a través de comunicados de prensa a los diversos medios de comunicación, tanto regionales como nacionales.',
      'La difusión de programas, proyectos, y de las actividades municipales, a través de programas y frases radiales, y la elaboración de material gráfico como afiches, volantes, lienzos, pendones, vía pública, entre otros.',
    ]
  },
  {
    id: 'dideco', titulo: 'Dirección de Desarrollo Comunitario', icono: 'community',
    temas: ['comunidad','vecinos','organizaciones','participación','social','cultura','deportes','reciclaje'],
    resumen: 'Promueve la participación ciudadana y el apoyo a las organizaciones comunitarias.',
    intro: 'La Dirección de Desarrollo Comunitario orienta iniciativas para fortalecer la participación y el desarrollo de las personas y organizaciones de la comuna.',
    subtitulo: 'Áreas de atención de ejemplo:',
    funciones: [
      'Asesorar al alcalde y el concejo en la promoción del desarrollo comunitario.',
      'Proponer y ejecutar cuando corresponda, medidas tendientes a materializar acciones relacionadas con la promoción y educación medio ambiental, el programa de desarrollo local, turismo y cultura, deporte y recreación, promoción del empleo, programa jefas de hogar, veterinaria municipal y oficina de la mujer.',
      'Se organiza a través de oficinas comunales y la cordinación para la ejecución de programas específicos como lo son el Programa de Desarrollo de Local(PRODESAL).',
      'Relacionar y coordinar con distintas instituciones u organismos públicos y privados entre los que destacan SENCE, PRODEMU, FOSIS, INDAP, CHILE DEPORTES, otros municipios, a fin de lograr recursos, asesorías y todo aquello que fuese necesario para la materialización de soluciones a las necesidades de distintos grupos a nivel comunitarios e individual.',
    ],
    cierre: 'La disponibilidad, requisitos y fechas de los programas deben confirmarse con DIDECO.'
  },
  {
    id: 'obras', titulo: 'Dirección de Obras Municipales', icono: 'building',
    temas: ['obras','edificación','vivienda','planos','urbanismo','permisos','construcción'],
    resumen: 'Orienta respecto de materias de construcción, edificación y normativa urbana.',
    intro: 'Esta dirección busca velar por el fiel cumplimiento de las disposiciones del Plan Regulador Comunal, la Ley general del urbanismo y construcción en su ordenanza general.',
    subtitulo: 'Consultas habituales:',
    funciones: [
      'La revisión y otorgamiento de permiso de obra.',
      'Subdivisión de loteo de carácter privado.',
      'Dirección y supervisión de obras ejecutadas por el municipio.',
      'Confección de informes urbanísticos y de obras tanto solicitados por organizaciones comunitarias, por el señor alcalde y el concejo municipal.',
    ],
    cierre: 'Las exigencias técnicas y los trámites concretos se deben consultar con la Dirección de Obras Municipales.'
  },
  {
    id: 'finanzas', titulo: 'Departamento de Administración y Finanzas', icono: 'finance',
    temas: ['administración','finanzas','pagos','presupuesto','contabilidad','patentes','tesorería'],
    resumen: 'Coordina procesos administrativos y financieros relacionados con la gestión municipal.',
    intro: 'El departamento administra y optimiza los recursos financieros municipales, tanto propios como externos, cumpliendo las normas contables y presupuestarias establecidas por la Contraloría General de la República.',
    subtitulo: 'Funciones referenciales:',
    funciones: [
      'Asesorar en forma directa al alcalde, en cualquier materia financiera.',
      'Llevar la contabilidad municipal, en conformidad a las normas establecidas por Contraloría General de la República.',
      'Controlar la gestión financiera de los servicios traspasados (Deptos. Salud y Educación).',
      'Otorgar autorizaciones a solicitudes de permisos y patentes municipales.',
      'Custodiar las especies o valores fiscales municipales.',
      'Otorgar patentes comerciales, industriales, profesionales y de alcohol, en conformidad a la Ley 3.063 y 19.925.'
    ],
    cierre: 'Otros trámites o servicios que usted puede solicitar en el Departamento de Finanzas: Venta de bonos FONASA, autorizacion de sepultaciones en cementerio municipal, pago de aseo domiciliario, entre otros.'
  },
  {
    id: 'social', titulo: 'Departamento Social', icono: 'heart',
    temas: ['social','beneficios','ayudas','familia','registro social de hogares','asistencia','adulto mayor','subsidios'],
    resumen: 'Brinda orientación sobre apoyos y programas sociales para habitantes de la comuna.',
    intro: 'El Departamento Social contribuye a resolver los problemas socioeconómicos de los habitantes de la comuna, promoviendo su acceso a mejores condiciones de vida mediante la evaluación de su situación social (CAS-2).',
    subtitulo: 'Los programas atendidos por este departamento son:',
    funciones: [
      'Subsidios en donde se atienden trámites como agua potable rural, pensiones asistenciales, beca presidente de la republica y beca indígena.',
      'Programas cómo vivienda, discapacidad, adulto mayor, asistencia social, navidad comunal, entre otros.',
      'Atención y derivación a programas municipales o de otros servicios públicos.',
      'Ficha de protección social.',
    ],
    cierre: 'La postulación y elegibilidad de cada beneficio están sujetas a requisitos específicos.'
  },
  {
    id: 'transito', titulo: 'Departamento de tránsito', icono: 'traffic',
    temas: ['tránsito','licencia','conducir','vehículos','permiso de circulación','señalética','calles'],
    resumen: 'Informa sobre licencias de conducir, permisos y otras materias relacionadas con el tránsito.',
    intro: 'El departamento atiende consultas sobre procedimientos de tránsito comunal y documentación necesaria para realizarlos.',
    subtitulo: 'Trámites y servicios orientativos:',
    funciones: [
      'Información sobre obtención y renovación de licencias de conducir.',
      'Orientación respecto del permiso de circulación.',
      'Consultas relacionadas con señalización y circulación comunal.',
      'Información sobre documentación y requisitos de atención.',
      'Derivación de solicitudes dentro de sus competencias.'
    ],
    cierre: 'Confirma horarios, disponibilidad de citas, documentación y cobros antes de acudir.'
  },
  {
    id: 'salud', titulo: 'Departamento de Salud Municipal', icono: 'hospital',
    temas: ['salud','consultorio','cesfam','atención primaria','vacunas','centros de salud'],
    resumen: 'Orienta respecto de los servicios, programas y centros de atención de salud municipal.',
    intro: 'Este departamento facilita información sobre atención primaria de salud, programas preventivos y los canales de acceso a servicios municipales.',
    subtitulo: 'Materias generales:',
    funciones: [
      'Información sobre establecimientos y puntos de atención primaria.',
      'Orientación sobre servicios y programas de salud disponibles.',
      'Derivación de consultas relacionadas con atención y prevención.',
      'Difusión de campañas informativas de salud.',
      'Orientación para contactar a los equipos correspondientes.'
    ],
    cierre: 'Para emergencias médicas, utiliza los servicios de urgencia; este directorio es informativo.'
  },
  {
    id: 'educacion', titulo: 'Departamento de Educación', icono: 'book',
    temas: ['educación','escuelas','colegios','matrícula','establecimientos','estudiantes'],
    resumen: 'Proporciona orientación general sobre establecimientos y asuntos de educación pública.',
    intro: 'Este espacio reúne información introductoria para orientar consultas relativas al sistema educativo público y a los establecimientos de la comuna.',
    subtitulo: 'Temas que puedes consultar:',
    funciones: [
      'Información general sobre establecimientos educacionales.',
      'Orientación respecto de canales para consultas escolares y administrativas.',
      'Información referencial sobre programas y actividades educativas.',
      'Derivación a la institución responsable de cada procedimiento.',
      'Orientación acerca de solicitudes y antecedentes educacionales.'
    ],
    cierre: 'Verifica qué institución administra actualmente cada establecimiento y cuáles son sus canales oficiales de atención.'
  }
];
