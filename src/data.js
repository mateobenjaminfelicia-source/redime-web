// ─── REDIME — Contenido editable ────────────────────────────────────────────
//
// Este archivo contiene TODO el contenido de texto del sitio.
// Para actualizar el sitio, solo necesitás editar este archivo.
// No hace falta tocar ningún otro archivo de código.
//
// ─────────────────────────────────────────────────────────────────────────────

// ── Información general ───────────────────────────────────────────────────────
export const INFO = {
    nombre: "REDIME — Comunidad de la Gracia",
    direccion: "Hotel ACA, Cesar Carman",
    ciudad: "Córdoba, Argentina",
    horario: "Domingos · 11:00 hs",
    instagram: "https://www.instagram.com/redimecomunidaddelagracia",
    youtube: "https://www.youtube.com/@iglesiaredime",
    whatsapp: "",  // ej: "https://wa.me/5493510000000"
    mapsUrl: "https://maps.google.com/?q=Hotel+ACA+Cesar+Carman+Córdoba+Argentina",
    email: "",  // email para recibir pedidos de oración (FormSubmit)
};

// ── Versículo del mes ─────────────────────────────────────────────────────────
// Actualizalo cada mes desde acá.
export const VERSICULO = {
    texto: "Porque de tal manera amó Dios al mundo, que ha dado a su Hijo unigénito, para que todo aquel que en él cree no se pierda, mas tenga vida eterna.",
    ref: "Juan 3:16",
};

// ── Novedades ─────────────────────────────────────────────────────────────────
// Tags disponibles: "Evento" | "Anuncio" | "Serie" | "Retiro" | "Comunidad"
export const NEWS = [
    {
        tag: "Retiro",
        date: "14 y 15 de noviembre",
        title: "Retiro de la iglesia",
        desc: "Nos vamos juntos a Posada La Campiña. Dos días para descansar, compartir y crecer en comunidad. ¡Anotate y no te lo perdas!",
        link: "#",
    },
    {
        tag: "Serie",
        date: "Domingos · 11:00 hs",
        title: "La misión de la iglesia",
        desc: "Estamos explorando juntos qué significa ser iglesia en el mundo. Una serie para entender el llamado que tenemos como comunidad.",
        link: "https://www.youtube.com/@iglesiaredime",
    },
    {
        tag: "Anuncio",
        date: "",
        title: "[Próximo anuncio]",
        desc: "Actualizá este espacio desde el archivo data.js cuando haya un nuevo anuncio.",
        link: "#",
    },
];

// ── Calendario de eventos ──────────────────────────────────────────────────────
// Formato de fecha recomendado: "DD Mes" (ej: "31 Mayo")
export const EVENTOS = [
    { fecha: "31 Mayo", dia: "Sábado", titulo: "Cena de jóvenes", lugar: "Por confirmar" },
    { fecha: "7 Junio", dia: "Domingo", titulo: "Bautismos", lugar: "Hotel ACA · 11:00 hs" },
    { fecha: "14 Junio", dia: "Sábado", titulo: "Reunión de líderes", lugar: "Por confirmar" },
    { fecha: "14 Nov", dia: "Viernes", titulo: "Retiro — ida", lugar: "Posada La Campiña" },
    { fecha: "15 Nov", dia: "Sábado", titulo: "Retiro — vuelta", lugar: "Posada La Campiña" },
];

// ── Ministerios ───────────────────────────────────────────────────────────────
export const MINS = [
    { icon: "🔥", title: "Jóvenes", desc: "Espacio de comunidad, enseñanza y crecimiento para jóvenes que buscan a Cristo." },
    { icon: "🌸", title: "Mujeres", desc: "Un lugar de encuentro, discipulado y apoyo mutuo para las mujeres de la iglesia." },
    { icon: "⚓", title: "Hombres", desc: "Comunidad masculina centrada en el carácter, el servicio y la Palabra de Dios." },
    { icon: "⭐", title: "Niños", desc: "Educación bíblica creativa y segura para los más pequeños de la familia." },
    { icon: "📖", title: "Escuela Bíblica", desc: "Estudio profundo y sistemático de las Escrituras para toda la iglesia." },
    { icon: "🏠", title: "Grupos Pequeños", desc: "Comunidades por zonas donde la fe se vive y comparte en lo cotidiano." },
    { icon: "🕊️", title: "Ministerio de Rahab", desc: "Un espacio de gracia, restauración y esperanza para mujeres en situación de vulnerabilidad." },
];

// ── Grupos pequeños ───────────────────────────────────────────────────────────
export const GROUPS = [
    { day: "Martes", tipo: "Mujeres", leader: "Marcela Messa Kardahi", barrio: "Bº Palmas de Claret", address: "Cruz Chica 4685", time: "8:30 hs", contact: "351-3664230" },
    { day: "Miércoles", tipo: "Mixto", leader: "Cristian Gansslen", barrio: "Bº Altos de Manantiales", address: "Lote 4 Mna 29", time: "19:00 a 20:30 hs", contact: "351-6171229" },
    { day: "Jueves", tipo: "Mixto", leader: "Ezequiel Grimi", barrio: "Bº San Vicente", address: "Entre Ríos 2116", time: "20:00 hs", contact: "11-78997206" },
    { day: "Jueves", tipo: "Mixto", leader: "Sebastián Cabral", barrio: "Bº Centro América", address: "Sofía Bozan 2833", time: "20:15 hs", contact: "351-2089981" },
    { day: "Jueves", tipo: "Jóvenes", leader: "Marcelo y Verónica Michell", barrio: "Bº San Fernando", address: "Pje. Carlos del Signo 360", time: "19:00 hs", contact: "351-8170687" },
    { day: "Viernes", tipo: "Mixto", leader: "Manuel Carbonell", barrio: "Bº Urca", address: "Gines García 3884", time: "20:00 hs", contact: "351-3571689" },
];

// Colores por día (para las tarjetas de grupos)
export const DAY_COLORS = {
    "Martes": "#4ab8ca",
    "Miércoles": "#e06a36",
    "Jueves": "#7ec8a0",
    "Viernes": "#c4a85a",
};

// ── Predicaciones ─────────────────────────────────────────────────────────────
// Para actualizar: cambiar videoId (el código de YouTube), title, speaker y date.
// El thumbnail se carga automáticamente desde YouTube.
// Tags disponibles: "Destacada" | "Serie en curso" | "Culto especial"
export const SERMONS = [
    {
        tag: "Destacada",
        videoId: "FjZefjyjKqI",
        title: "[Título de la predicación]",
        speaker: "[Pastor]",
        date: "[Fecha]",
        desc: "Ingresá al canal para acceder a la prédica más reciente de la iglesia.",
    },
    {
        tag: "Serie en curso",
        videoId: "frPh7FerSpM",
        title: "[Título de la serie]",
        speaker: "[Pastor]",
        date: "[Fecha]",
        desc: "Enseñanza bíblica fiel y accesible para toda la familia.",
    },
    {
        tag: "Culto especial",
        videoId: "LK88sH6KBcs",
        title: "[Culto especial]",
        speaker: "[Invitado / Pastor]",
        date: "[Fecha]",
        desc: "Momentos especiales guardados para la edificación de la comunidad.",
    },
];

// ── Equipo pastoral ───────────────────────────────────────────────────────────
// Reemplazá los img: por rutas locales cuando tengan fotos reales.
// Ej: img: "/equipo/manuel.jpg"  (el archivo va en /public/equipo/)
export const TEAM = [
    { name: "Manuel Carbonell", role: "Anciano", desc: "Comprometido con la fidelidad a las Escrituras y el amor a la congregación.", img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80" },
    { name: "Cristian Gansslen", role: "Anciano", desc: "Comprometido con la fidelidad a las Escrituras y el amor a la congregación.", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80" },
    { name: "Eduardo Kardahi", role: "Anciano", desc: "Comprometido con la fidelidad a las Escrituras y el amor a la congregación.", img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80" },
    { name: "Marcelo Michell", role: "Anciano", desc: "Comprometido con la fidelidad a las Escrituras y el amor a la congregación.", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80" },
];

// ── Testimonios ───────────────────────────────────────────────────────────────
// Reemplazá por testimonios reales de miembros (con su permiso).
export const TESTIMONIOS = [
    { quote: "Encontré comunidad cuando estaba completamente solo. Esta iglesia se convirtió en mi familia.", name: "Rodrigo M.", role: "Miembro desde 2022" },
    { quote: "Lo que más me sorprendió fue la calidez. Vine una vez y no pude dejar de volver.", name: "Valentina G.", role: "Primera visita en 2023" },
    { quote: "La enseñanza bíblica acá es seria y accesible al mismo tiempo. Crecí mucho en mi fe.", name: "Sebastián R.", role: "Grupo pequeño Zona Norte" },
];

// ── Lo que esperás si visitás por primera vez ──────────────────────────────────
export const CHECKS = [
    "No hace falta vestimenta especial — venís como sos.",
    "Duración aproximada: 2 horas.",
    "Hay espacio para niños durante el culto.",
    "Café y charla antes del culto.",
    "Comunidad despues del culto — quedate a conocernos.",
    "Podés venir solo/a, te vamos a recibir con alegría.",
    "No se pide dinero ni datos personales.",
    "Hay estacionamiento disponible en el lugar.",
];

// ── Declaración de fe ─────────────────────────────────────────────────────────
export const CREENCIAS = [
    {
        icon: "📜",
        title: "Las Escrituras",
        desc: "La Biblia es la Palabra de Dios, inspirada verbalmente y sin error en sus manuscritos originales. Es completamente suficiente y la autoridad final en toda fe y práctica cristiana.",
        ref: "2 Tim. 3:16-17",
    },
    {
        icon: "✝️",
        title: "Dios Trino",
        desc: "Existe un solo Dios eterno que se revela en tres personas: Padre, Hijo y Espíritu Santo. Iguales en esencia, dignidad y gloria, distintos en personas y funciones.",
        ref: "Mat. 28:19 · 2 Cor. 13:14",
    },
    {
        icon: "👑",
        title: "Jesucristo",
        desc: "Jesucristo es completamente Dios y completamente hombre. Nació de una virgen, vivió sin pecado, murió en la cruz como sustituto nuestro, resucitó corporalmente y ascendió al cielo.",
        ref: "Juan 1:1,14 · 1 Cor. 15:3-4",
    },
    {
        icon: "🕊️",
        title: "El Espíritu Santo",
        desc: "El Espíritu Santo convence de pecado, regenera al creyente, lo sella para el día de la redención, mora en él y lo equipa con dones para el servicio de la iglesia.",
        ref: "Juan 16:8 · Ef. 1:13-14",
    },
    {
        icon: "🙏",
        title: "La Salvación",
        desc: "La salvación es solo por gracia, solo por fe, solo en Cristo. Dios elige soberanamente a los suyos, Cristo los redime con Su sangre, y el Espíritu los transforma. El creyente no puede perder su salvación.",
        ref: "Ef. 2:8-9 · Rom. 8:29-30",
    },
    {
        icon: "⛪",
        title: "La Iglesia",
        desc: "La iglesia local es una comunidad de creyentes bautizados, reunidos bajo la autoridad de la Escritura, para adorar a Dios, edificarse mutuamente, discipular y proclamar el evangelio.",
        ref: "Heb. 10:24-25 · Mat. 28:19-20",
    },
    {
        icon: "💧",
        title: "El Bautismo",
        desc: "El bautismo de creyentes por inmersión es la ordenanza para quienes confiesan fe en Jesucristo. Es un testimonio público de muerte al pecado y resurrección a nueva vida en Cristo.",
        ref: "Rom. 6:3-4 · Mat. 28:19",
    },
    {
        icon: "🌅",
        title: "El Retorno de Cristo",
        desc: "Jesucristo volverá personal y corporalmente. Habrá resurrección de todos y juicio final. Los creyentes heredarán vida eterna en presencia de Dios; los que rechazan el evangelio, separación eterna de Él.",
        ref: "1 Tes. 4:16-17 · Apoc. 20:11-15",
    },
];