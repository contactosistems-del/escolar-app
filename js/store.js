/* Edu Work · capa de datos del prototipo.
   Guarda todo en localStorage del navegador (no requiere servidor).
   Para producción se reemplaza por una API + base de datos. */
(function () {
  const DB_KEY = 'eduwork_db_v1';
  const SESSION_KEY = 'eduwork_session_v1';

  const uid = (p = '') => p + Math.random().toString(36).slice(2, 9) + Date.now().toString(36).slice(-4);

  async function hash(text) {
    const data = new TextEncoder().encode('eduwork::' + text);
    if (window.crypto && crypto.subtle) {
      const buf = await crypto.subtle.digest('SHA-256', data);
      return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('');
    }
    let h = 0; for (const c of data) h = (h * 31 + c) | 0; return 'x' + h;
  }

  function seedCourses() {
    return [
      {
        id: 'c-excel', title: 'Excel para el trabajo', category: 'Herramientas digitales', level: 'Básico', hours: 4,
        color: '#0E8A6A', glyph: 'grid', published: true,
        summary: 'Fórmulas, formato y tablas para organizar datos como lo piden en una oficina.',
        description: 'Aprende lo que más se usa de Excel en un empleo real: capturar y dar formato a datos, usar fórmulas básicas, filtrar información y armar una tabla dinámica sencilla para responder preguntas de tu jefe.',
        lessons: [
          { id: 'l1', title: 'Conoce la hoja de cálculo', type: 'text', minutes: 8, content:
`<p>Una hoja de Excel está formada por <strong>celdas</strong>, que se identifican por columna (letra) y fila (número). Por ejemplo, <strong>B4</strong> es la celda de la columna B, fila 4.</p>
<h3>Lo esencial</h3>
<ul><li><strong>Libro:</strong> el archivo completo (.xlsx).</li><li><strong>Hoja:</strong> cada pestaña dentro del libro.</li><li><strong>Rango:</strong> un grupo de celdas, por ejemplo A1:A10.</li></ul>
<h3>Buenas prácticas</h3>
<ul><li>Una fila de encabezados clara (Fecha, Producto, Cantidad, Precio).</li><li>Un dato por celda; nada de mezclar texto y números.</li><li>Sin filas vacías en medio de la información.</li></ul>` },
          { id: 'l2', title: 'Fórmulas que usarás todos los días', type: 'video', minutes: 12, url: '', content:
`<p>Toda fórmula empieza con <strong>=</strong>. Las más usadas en oficina:</p>
<ul><li><code>=SUMA(B2:B20)</code> suma un rango.</li><li><code>=PROMEDIO(B2:B20)</code> saca el promedio.</li><li><code>=CONTAR.SI(C2:C20,"Pagado")</code> cuenta cuántas celdas cumplen una condición.</li><li><code>=SI(D2>1000,"Alto","Normal")</code> decide según una condición.</li><li><code>=BUSCARX(A2,Clientes!A:A,Clientes!B:B)</code> trae un dato de otra tabla.</li></ul>` },
          { id: 'l3', title: 'Formato, filtros y orden', type: 'text', minutes: 10, content:
`<p>Convierte tus datos en <strong>tabla</strong> con <em>Ctrl + T</em>: obtienes filtros, colores alternos y fórmulas que se copian solas.</p>
<ul><li><strong>Formato de número:</strong> moneda, porcentaje y fecha, siempre consistentes.</li><li><strong>Filtros:</strong> muestra solo lo que necesitas sin borrar nada.</li><li><strong>Formato condicional:</strong> resalta en rojo lo vencido o lo que pasa de un límite.</li></ul>` },
          { id: 'l4', title: 'Tu primera tabla dinámica', type: 'doc', minutes: 15, url: '', content:
`<p>Una tabla dinámica resume miles de filas en segundos: ventas por mes, por vendedor o por producto.</p>
<ol><li>Selecciona tu tabla.</li><li>Insertar → Tabla dinámica.</li><li>Arrastra el campo de categoría a <strong>Filas</strong> y el de importe a <strong>Valores</strong>.</li></ol>
<p>Descarga el archivo de práctica para hacerlo paso a paso.</p>` }
        ],
        quiz: { passing: 70, questions: [
          { q: '¿Con qué símbolo empieza toda fórmula en Excel?', options: ['#', '=', '@', '$'], answer: 1 },
          { q: '¿Qué función cuenta las celdas que cumplen una condición?', options: ['SUMA', 'PROMEDIO', 'CONTAR.SI', 'BUSCARX'], answer: 2 },
          { q: '¿Qué atajo convierte un rango en tabla?', options: ['Ctrl + T', 'Ctrl + P', 'Ctrl + B', 'Alt + F4'], answer: 0 },
          { q: 'Para resumir ventas por vendedor, lo más rápido es…', options: ['Sumar a mano', 'Una tabla dinámica', 'Copiar y pegar', 'Un gráfico de pastel'], answer: 1 },
          { q: '¿Cuál es una buena práctica al capturar datos?', options: ['Dejar filas vacías para separar', 'Mezclar texto y números', 'Un dato por celda con encabezados claros', 'Usar colores en vez de datos'], answer: 2 }
        ] }
      },
      {
        id: 'c-equipo', title: 'Trabajo en equipo', category: 'Habilidades blandas', level: 'Básico', hours: 3,
        color: '#2F5FD0', glyph: 'people', published: true,
        summary: 'Roles, acuerdos y manejo de conflictos para que tu equipo sí entregue.',
        description: 'Las empresas buscan personas que colaboren. En este curso aprenderás a definir roles, organizar tareas, dar seguimiento y resolver desacuerdos sin romper el equipo.',
        lessons: [
          { id: 'l1', title: 'Qué hace funcionar a un equipo', type: 'text', minutes: 8, content:
`<p>Un equipo funciona cuando hay <strong>objetivo claro</strong>, <strong>roles definidos</strong> y <strong>confianza</strong> para decir lo que no está saliendo.</p>
<ul><li>Objetivo: qué vamos a entregar y para cuándo.</li><li>Roles: quién decide, quién ejecuta, a quién se consulta.</li><li>Acuerdos: horarios, canal de comunicación y forma de avisar retrasos.</li></ul>` },
          { id: 'l2', title: 'Organiza tareas y da seguimiento', type: 'video', minutes: 10, url: '', content:
`<p>Divide el trabajo en tareas pequeñas con <strong>responsable</strong> y <strong>fecha</strong>. Un tablero sencillo (Por hacer · En proceso · Listo) evita el "yo pensé que tú lo hacías".</p>` },
          { id: 'l3', title: 'Conflictos sin drama', type: 'text', minutes: 10, content:
`<p>El desacuerdo es normal; lo que daña es no hablarlo. Usa este orden:</p>
<ol><li>Describe el hecho, no a la persona.</li><li>Explica el impacto en el trabajo.</li><li>Propón una solución concreta.</li><li>Acuerden y anoten quién hace qué.</li></ol>` }
        ],
        quiz: { passing: 70, questions: [
          { q: '¿Qué tres elementos sostienen a un equipo?', options: ['Objetivo, roles y confianza', 'Jefe, horario y sueldo', 'Oficina, internet y café', 'Reuniones largas'], answer: 0 },
          { q: 'Una tarea bien definida tiene…', options: ['Solo título', 'Responsable y fecha', 'Muchos responsables', 'Ninguna fecha'], answer: 1 },
          { q: 'Al dar retroalimentación conviene describir…', options: ['La personalidad del otro', 'El hecho y su impacto', 'Lo que dicen otros', 'Nada, mejor callar'], answer: 1 },
          { q: 'Un tablero "Por hacer · En proceso · Listo" sirve para…', options: ['Decorar', 'Ver el avance del equipo', 'Evitar reuniones siempre', 'Calificar a cada uno'], answer: 1 }
        ] }
      },
      {
        id: 'c-reportes', title: 'Elaboración de reportes', category: 'Comunicación escrita', level: 'Intermedio', hours: 3,
        color: '#B4532A', glyph: 'doc', published: true,
        summary: 'Estructura, datos y conclusiones: reportes que tu jefe sí lee.',
        description: 'Aprende a convertir información en un reporte claro: resumen al inicio, datos que respaldan, gráficas útiles y recomendaciones accionables.',
        lessons: [
          { id: 'l1', title: 'La estructura que funciona', type: 'text', minutes: 9, content:
`<p>Un reporte profesional responde primero lo importante:</p>
<ol><li><strong>Resumen ejecutivo</strong> (3–5 líneas): qué pasó y qué recomiendas.</li><li><strong>Contexto</strong>: periodo, alcance y fuente de datos.</li><li><strong>Hallazgos</strong>: datos con gráficas o tablas.</li><li><strong>Recomendaciones</strong>: acciones con responsable y fecha.</li></ol>` },
          { id: 'l2', title: 'Datos y gráficas que se entienden', type: 'video', minutes: 11, url: '', content:
`<p>Elige la gráfica según la pregunta: <strong>líneas</strong> para tendencias en el tiempo, <strong>barras</strong> para comparar categorías y <strong>tabla</strong> cuando hay que consultar valores exactos.</p>` },
          { id: 'l3', title: 'Plantilla de reporte', type: 'doc', minutes: 6, url: '', content:
`<p>Descarga la plantilla y úsala en tu próximo trabajo o práctica profesional.</p>` }
        ],
        quiz: { passing: 70, questions: [
          { q: '¿Qué va al inicio de un reporte?', options: ['Bibliografía', 'Resumen ejecutivo', 'Anexos', 'Índice de gráficas'], answer: 1 },
          { q: 'Para mostrar una tendencia mensual conviene una gráfica de…', options: ['Pastel', 'Líneas', 'Dispersión 3D', 'Ninguna'], answer: 1 },
          { q: 'Una buena recomendación incluye…', options: ['Responsable y fecha', 'Solo una opinión', 'Muchos adjetivos', 'Nada concreto'], answer: 0 }
        ] }
      },
      {
        id: 'c-comunicacion', title: 'Comunicación profesional', category: 'Habilidades blandas', level: 'Básico', hours: 3,
        color: '#7A3FB8', glyph: 'chat', published: true,
        summary: 'Correos, juntas y presentaciones con un tono claro y profesional.',
        description: 'Escribe correos que obtienen respuesta, participa en reuniones con seguridad y presenta ideas de forma breve y ordenada.',
        lessons: [
          { id: 'l1', title: 'Correos que obtienen respuesta', type: 'text', minutes: 8, content:
`<ul><li><strong>Asunto</strong> concreto: "Reporte de ventas octubre – revisión antes del viernes".</li><li><strong>Primera línea</strong> con lo que necesitas.</li><li>Párrafos cortos y un cierre con la siguiente acción.</li></ul>` },
          { id: 'l2', title: 'Participar en reuniones', type: 'video', minutes: 9, url: '', content:
`<p>Llega con tu punto preparado en una frase, escucha antes de responder y cierra con acuerdos: qué, quién y cuándo.</p>` },
          { id: 'l3', title: 'Presenta en 3 minutos', type: 'text', minutes: 10, content:
`<p>Usa la fórmula <strong>Problema → Propuesta → Beneficio → Siguiente paso</strong>. Una idea por diapositiva y practica en voz alta.</p>` }
        ],
        quiz: { passing: 70, questions: [
          { q: 'Un buen asunto de correo es…', options: ['"Hola"', '"Urgente!!!"', 'Concreto y con fecha si aplica', 'Vacío'], answer: 2 },
          { q: '¿Cómo se cierra una reunión productiva?', options: ['Con acuerdos: qué, quién y cuándo', 'Sin conclusiones', 'Con otra reunión', 'Con chismes'], answer: 0 },
          { q: 'La fórmula para presentar en 3 minutos es…', options: ['Saludo largo y anécdotas', 'Problema, propuesta, beneficio y siguiente paso', 'Leer todas las diapositivas', 'Improvisar'], answer: 1 }
        ] }
      }
    ];
  }

  async function seed() {
    const now = new Date().toISOString();
    const admin = { id: 'u-admin', name: 'Administrador Edu Work', email: 'admin@eduwork.mx', pass: await hash('admin123'), role: 'admin', school: '', career: '', bio: '', createdAt: now };
    const demo = { id: 'u-demo', name: 'Ana López', email: 'estudiante@eduwork.mx', pass: await hash('demo123'), role: 'student', school: 'Universidad Demo', career: 'Administración', bio: 'Estudiante de 6.º semestre.', createdAt: now };
    const db = {
      version: 1,
      users: [admin, demo],
      courses: seedCourses(),
      enrollments: [
        { id: uid('e-'), userId: 'u-demo', courseId: 'c-excel', enrolledAt: now, completed: ['l1', 'l2'], quiz: null, certificate: null },
        { id: uid('e-'), userId: 'u-demo', courseId: 'c-comunicacion', enrolledAt: now, completed: ['l1', 'l2', 'l3'], quiz: { best: 100, attempts: 1, passedAt: now }, certificate: { folio: 'EW-2026-' + Math.random().toString(36).slice(2, 7).toUpperCase(), issuedAt: now } }
      ]
    };
    return db;
  }

  const Store = {
    db: null,
    hash, uid,
    async init() {
      try { this.db = JSON.parse(localStorage.getItem(DB_KEY)); } catch (e) { this.db = null; }
      if (!this.db || !this.db.users) { this.db = await seed(); this.save(); }
    },
    save() { try { localStorage.setItem(DB_KEY, JSON.stringify(this.db)); } catch (e) {} },
    async reset() { this.db = await seed(); this.save(); this.logout(); },

    // Sesión
    currentUser() {
      let id = null; try { id = localStorage.getItem(SESSION_KEY); } catch (e) {}
      return this.db.users.find(u => u.id === id) || null;
    },
    async login(email, password) {
      const u = this.db.users.find(u => u.email.toLowerCase() === email.trim().toLowerCase());
      if (!u || u.pass !== await hash(password)) throw new Error('Correo o contraseña incorrectos.');
      try { localStorage.setItem(SESSION_KEY, u.id); } catch (e) {}
      return u;
    },
    logout() { try { localStorage.removeItem(SESSION_KEY); } catch (e) {} },
    async register({ name, email, password, school, career }) {
      email = email.trim().toLowerCase();
      if (!name.trim()) throw new Error('Escribe tu nombre completo.');
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new Error('Escribe un correo válido.');
      if (password.length < 6) throw new Error('La contraseña debe tener al menos 6 caracteres.');
      if (this.db.users.some(u => u.email === email)) throw new Error('Ese correo ya está registrado.');
      const u = { id: uid('u-'), name: name.trim(), email, pass: await hash(password), role: 'student', school: school.trim(), career: career.trim(), bio: '', createdAt: new Date().toISOString() };
      this.db.users.push(u); this.save();
      try { localStorage.setItem(SESSION_KEY, u.id); } catch (e) {}
      return u;
    },
    updateUser(id, patch) { const u = this.db.users.find(x => x.id === id); Object.assign(u, patch); this.save(); return u; },

    // Cursos
    courses(all = false) { return this.db.courses.filter(c => all || c.published); },
    course(id) { return this.db.courses.find(c => c.id === id); },
    saveCourse(course) {
      const i = this.db.courses.findIndex(c => c.id === course.id);
      if (i >= 0) this.db.courses[i] = course; else this.db.courses.push(course);
      this.save(); return course;
    },
    deleteCourse(id) {
      this.db.courses = this.db.courses.filter(c => c.id !== id);
      this.db.enrollments = this.db.enrollments.filter(e => e.courseId !== id);
      this.save();
    },

    // Inscripciones y progreso
    enrollment(userId, courseId) { return this.db.enrollments.find(e => e.userId === userId && e.courseId === courseId); },
    enrollmentsOf(userId) { return this.db.enrollments.filter(e => e.userId === userId); },
    enroll(userId, courseId) {
      let e = this.enrollment(userId, courseId);
      if (!e) { e = { id: uid('e-'), userId, courseId, enrolledAt: new Date().toISOString(), completed: [], quiz: null, certificate: null }; this.db.enrollments.push(e); this.save(); }
      return e;
    },
    completeLesson(userId, courseId, lessonId) {
      const e = this.enroll(userId, courseId);
      if (!e.completed.includes(lessonId)) { e.completed.push(lessonId); this.save(); }
      return e;
    },
    progress(e) {
      const c = this.course(e.courseId); if (!c) return 0;
      const total = c.lessons.length + 1; // +1 por la evaluación
      const valid = e.completed.filter(id => c.lessons.some(l => l.id === id)).length;
      return Math.round(((valid + (e.quiz && e.quiz.passedAt ? 1 : 0)) / total) * 100);
    },
    lessonsDone(e) { const c = this.course(e.courseId); return c ? c.lessons.every(l => e.completed.includes(l.id)) : false; },
    submitQuiz(userId, courseId, answers) {
      const c = this.course(courseId); const e = this.enroll(userId, courseId);
      const qs = c.quiz.questions; let ok = 0;
      qs.forEach((q, i) => { if (Number(answers[i]) === q.answer) ok++; });
      const score = qs.length ? Math.round(ok / qs.length * 100) : 0;
      const passed = score >= c.quiz.passing;
      e.quiz = e.quiz || { best: 0, attempts: 0, passedAt: null };
      e.quiz.attempts++; e.quiz.best = Math.max(e.quiz.best, score);
      if (passed && !e.quiz.passedAt) e.quiz.passedAt = new Date().toISOString();
      if (passed && !e.certificate) e.certificate = { folio: 'EW-' + new Date().getFullYear() + '-' + Math.random().toString(36).slice(2, 7).toUpperCase(), issuedAt: new Date().toISOString() };
      this.save();
      return { score, passed, ok, total: qs.length };
    },
    findCertificate(folio) {
      const e = this.db.enrollments.find(x => x.certificate && x.certificate.folio.toUpperCase() === String(folio).toUpperCase());
      if (!e) return null;
      return { e, user: this.db.users.find(u => u.id === e.userId), course: this.course(e.courseId) };
    }
  };

  window.Store = Store;
})();
