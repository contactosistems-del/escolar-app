/* EduWork · interfaz (SPA con rutas por hash) */
(function () {
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => Array.from(el.querySelectorAll(s));
  const app = $('#app');
  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const fmtDate = iso => iso ? new Date(iso).toLocaleDateString('es-MX', { day: 'numeric', month: 'long', year: 'numeric' }) : '';
  const initials = n => (n || '?').split(/\s+/).filter(Boolean).slice(0, 2).map(w => w[0].toUpperCase()).join('');
  const go = h => { location.hash = h; };

  function toast(msg) {
    const t = $('#toast'); t.textContent = msg; t.classList.add('show');
    clearTimeout(toast._t); toast._t = setTimeout(() => t.classList.remove('show'), 2600);
  }

  /* ---------- Íconos ---------- */
  const I = {
    clock: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
    layers: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m12 3 9 5-9 5-9-5 9-5Z"/><path d="m3 13 9 5 9-5"/></svg>',
    level: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 20v-5M10 20V10M16 20V4"/></svg>',
    check: '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="3.5"><path d="m5 12 5 5 9-10"/></svg>',
    play: '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>',
    file: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><path d="M14 3v6h6M8 13h8M8 17h5"/></svg>',
    text: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 6h16M4 12h16M4 18h10"/></svg>',
    award: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="9" r="6"/><path d="m8.5 14-1.5 7 5-3 5 3-1.5-7"/></svg>',
    chart: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 3v18h18"/><path d="m7 15 4-4 3 3 5-6"/></svg>',
    quiz: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="3" width="16" height="18" rx="2"/><path d="m8 12 2 2 4-4M8 7h8"/></svg>',
    book: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V3H6.5A2.5 2.5 0 0 0 4 5.5z"/><path d="M4 19.5A2.5 2.5 0 0 0 6.5 22H20v-5"/></svg>',
    menu: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 7h16M4 12h16M4 17h16"/></svg>',
    up: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="m6 15 6-6 6 6"/></svg>',
    down: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="m6 9 6 6 6-6"/></svg>'
  };
  const glyphs = {
    grid: '<svg width="64" height="64" viewBox="0 0 64 64" fill="none" stroke="rgba(255,255,255,.85)" stroke-width="3"><rect x="8" y="10" width="48" height="44" rx="6"/><path d="M8 24h48M8 38h48M24 10v44M40 10v44"/></svg>',
    people: '<svg width="64" height="64" viewBox="0 0 64 64" fill="none" stroke="rgba(255,255,255,.85)" stroke-width="3"><circle cx="22" cy="22" r="8"/><circle cx="44" cy="24" r="6"/><path d="M8 50c0-8 6-14 14-14s14 6 14 14M38 48c0-6 4-10 9-10s9 4 9 10"/></svg>',
    doc: '<svg width="64" height="64" viewBox="0 0 64 64" fill="none" stroke="rgba(255,255,255,.85)" stroke-width="3"><path d="M16 8h22l12 12v36H16z"/><path d="M38 8v12h12M24 34h8v12h-8zM36 40h6v6h-6zM36 30h6"/></svg>',
    chat: '<svg width="64" height="64" viewBox="0 0 64 64" fill="none" stroke="rgba(255,255,255,.85)" stroke-width="3"><path d="M10 14h32v22H24l-8 7v-7h-6z"/><path d="M46 24h8v20h-5v6l-7-6H30v-4"/></svg>',
    clock: '<svg width="64" height="64" viewBox="0 0 64 64" fill="none" stroke="rgba(255,255,255,.85)" stroke-width="3"><circle cx="32" cy="34" r="22"/><path d="M32 22v12l8 6M26 8h12"/></svg>',
    star: '<svg width="64" height="64" viewBox="0 0 64 64" fill="none" stroke="rgba(255,255,255,.85)" stroke-width="3"><path d="m32 8 7 15 16 2-12 11 3 16-14-8-14 8 3-16L9 25l16-2z"/></svg>'
  };
  const typeLabel = { video: 'Video', doc: 'Documento', text: 'Lección' };
  const typeIcon = { video: I.play, doc: I.file, text: I.text };

  /* ---------- Componentes ---------- */
  function cover(c, h) {
    return `<div class="cover" style="background:linear-gradient(135deg,${esc(c.color)},${shade(c.color, -28)});${h ? 'height:' + h + 'px' : ''}">
      <span class="cat">${esc(c.category)}</span><span class="glyph">${glyphs[c.glyph] || glyphs.star}</span></div>`;
  }
  function shade(hex, pct) {
    const n = parseInt(String(hex).replace('#', ''), 16); if (isNaN(n)) return hex;
    let r = n >> 16, g = (n >> 8) & 255, b = n & 255; const f = 1 + pct / 100;
    r = Math.max(0, Math.min(255, Math.round(r * f))); g = Math.max(0, Math.min(255, Math.round(g * f))); b = Math.max(0, Math.min(255, Math.round(b * f)));
    return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  }
  function courseCard(c, user) {
    const e = user && Store.enrollment(user.id, c.id);
    const p = e ? Store.progress(e) : null;
    return `<a class="card course-card" href="#/curso/${c.id}">
      ${cover(c)}
      <div class="course-body">
        ${user ? stTag(e) : ''}
        <h3>${esc(c.title)}</h3>
        <p>${esc(c.summary)}</p>
        <div class="meta"><span>${I.layers}${c.lessons.length} lecciones</span><span>${I.clock}${c.hours} h</span><span>${I.level}${esc(c.level)}</span></div>
        ${e ? `<div class="row between small"><span class="muted">Tu avance</span><b>${p}%</b></div><div class="bar"><i style="width:${p}%"></i></div>` : ''}
      </div></a>`;
  }
  const stLabel = { none: 'No iniciado', prog: 'En progreso', done: 'Completado' };
  function stTag(e) { const k = Store.status(e); return `<span class="st ${k}">${stLabel[k]}</span>`; }
  function ring(p) { return `<div class="ring" style="--p:${p}"><span>${p}%</span></div>`; }
  function embedUrl(url) {
    if (!url) return '';
    let m = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/shorts\/)([\w-]{6,})/);
    if (m) return 'https://www.youtube-nocookie.com/embed/' + m[1];
    m = url.match(/vimeo\.com\/(\d+)/); if (m) return 'https://player.vimeo.com/video/' + m[1];
    if (/\/embed|\/preview/.test(url)) return url;
    return '';
  }
  function richText(s) {
    if (!s) return '';
    if (/<[a-z][\s\S]*>/i.test(s)) return s; // contenido HTML del administrador
    return s.split(/\n{2,}/).map(p => '<p>' + esc(p).replace(/\n/g, '<br>') + '</p>').join('');
  }

  /* ---------- Barra superior ---------- */
  function renderTopbar(route) {
    const u = Store.currentUser();
    const a = (href, label) => `<a href="${href}" class="${route.startsWith(href.slice(1)) && href !== '#/' ? 'active' : ''}">${label}</a>`;
    let links = a('#/cursos', 'Cursos') + a('#/verificar', 'Verificar constancia') + a('#/ayuda', 'Ayuda');
    if (u) {
      links += a('#/panel', 'Mi progreso');
      if (u.role === 'admin') links += a('#/admin', 'Administración');
      links += `<a href="#/perfil" class="row" style="gap:.5rem" aria-label="Mi perfil"><span class="avatar" style="width:30px;height:30px;font-size:.75rem">${esc(initials(u.name))}</span><span class="hide-lg">Perfil</span></a>`;
    } else {
      links += a('#/entrar', 'Iniciar sesión') + `<a class="btn sm" href="#/registro" style="color:#fff">Crear cuenta</a>`;
    }
    $('#topbar').innerHTML = `<div class="wrap topbar-in">
      <a class="brand" href="#/"><img src="assets/logo.svg" alt=""><span>EduWork</span></a>
      <button class="menu-btn" aria-label="Menú" id="menuBtn">${I.menu}</button>
      <nav class="nav" id="nav">${links}</nav></div>`;
    $('#menuBtn').onclick = () => $('#nav').classList.toggle('open');
  }

  /* ---------- Vistas ---------- */
  const views = {};

  views.home = () => {
    const u = Store.currentUser();
    const cs = Store.courses();
    return `
    <section class="hero"><div class="wrap hero-grid">
      <div>
        <span class="eyebrow">Capacitación que conecta</span>
        <h1>Las habilidades que piden las empresas, <em>en cursos cortos</em>.</h1>
        <p class="lead"><span class="slogan">Aprende hoy, prepárate para el trabajo de mañana.</span> Excel, trabajo en equipo, reportes, comunicación profesional y organización del tiempo: aprende a tu ritmo, comprueba lo que sabes y obtén tu constancia digital.</p>
        <div class="hero-cta">
          ${u ? `<a class="btn" href="#/panel">Continuar aprendiendo</a>` : `<a class="btn" href="#/registro">Crear cuenta gratis</a>`}
          <a class="btn ghost" href="#/cursos">Ver cursos</a>
        </div>
        <div class="hero-stats">
          <div><b>${cs.length}</b><span>cursos disponibles</span></div>
          <div><b>${cs.reduce((a, c) => a + c.hours, 0)} h</b><span>de contenido</span></div>
          <div><b>100%</b><span>en línea y en tu celular</span></div>
        </div>
      </div>
      <div class="hero-card" aria-hidden="true">
        <div class="hc-top"><div class="row"><span class="avatar" style="background:var(--mint);color:var(--ink)">AL</span><div><b>Ana López</b><br><small style="color:#9FB6C3">Administración · 6.º semestre</small></div></div><span class="hc-chip">Esta semana</span></div>
        ${cs.slice(0, 3).map((c, i) => `<div class="hc-course"><div class="row"><b>${esc(c.title)}</b><small>${[75, 40, 100][i]}%</small></div><div class="hc-bar"><i style="width:${[75, 40, 100][i]}%"></i></div></div>`).join('')}
        <div class="hc-badge">🎓 Constancia obtenida</div>
      </div>
    </div></section>

    <section class="section" style="padding-top:1rem"><div class="wrap">
      <div class="features">
        <div class="feature"><div class="ic">${I.book}</div><h3>Cursos prácticos</h3><p>Videos, documentos y lecciones pensados para el trabajo real.</p></div>
        <div class="feature"><div class="ic">${I.quiz}</div><h3>Evaluaciones</h3><p>Comprueba lo aprendido al final de cada curso.</p></div>
        <div class="feature"><div class="ic">${I.chart}</div><h3>Tu progreso</h3><p>Ve cuánto llevas en cada curso y retómalo donde te quedaste.</p></div>
        <div class="feature"><div class="ic">${I.award}</div><h3>Constancias</h3><p>Al aprobar, descarga tu constancia con folio verificable.</p></div>
      </div>
    </div></section>

    <section class="section" style="padding-top:0"><div class="wrap">
      <div class="row between" style="margin-bottom:1.25rem"><h2 style="margin:0">Cursos destacados</h2><a href="#/cursos">Ver todos →</a></div>
      <div class="grid">${cs.slice(0, 4).map(c => courseCard(c, u)).join('')}</div>
    </div></section>

    <section class="section" style="padding-top:0"><div class="wrap">
      <h2>Cómo funciona</h2>
      <div class="steps mt">
        <div class="step"><h3>Regístrate</h3><p>Crea tu cuenta con tu correo en menos de un minuto.</p></div>
        <div class="step"><h3>Inscríbete</h3><p>Elige un curso del catálogo y empieza cuando quieras.</p></div>
        <div class="step"><h3>Aprende y evalúate</h3><p>Avanza por las lecciones y presenta la evaluación final.</p></div>
        <div class="step"><h3>Obtén tu constancia</h3><p>Descárgala y compártela en tu CV o LinkedIn.</p></div>
      </div>
    </div></section>

    <section class="section" style="padding-top:0"><div class="wrap">
      <div class="cta-band"><div><h2 style="margin:0 0 .3rem">Prepárate para tu primer empleo</h2><p>Empieza hoy con el curso que más necesites.</p></div>
      <a class="btn amber" href="${u ? '#/cursos' : '#/registro'}">${u ? 'Explorar cursos' : 'Crear mi cuenta'}</a></div>
    </div></section>`;
  };

  views.catalog = (q) => {
    const u = Store.currentUser();
    const cats = [...new Set(Store.courses().map(c => c.category))];
    const cat = q.get('cat') || ''; const s = (q.get('q') || '').toLowerCase(); const lvl = q.get('nivel') || '';
    const list = Store.courses().filter(c => (!cat || c.category === cat) && (!lvl || c.level === lvl) && (!s || (c.title + ' ' + c.summary).toLowerCase().includes(s)));
    return `<div class="wrap">
      <div class="page-head"><h1>Catálogo de cursos</h1><p>Elige un curso, inscríbete y avanza a tu ritmo. Al aprobar la evaluación obtienes tu constancia digital.</p></div>
      <div class="filters">
        <button class="chip ${!cat ? 'on' : ''}" data-cat="">Todos</button>
        ${cats.map(c => `<button class="chip ${cat === c ? 'on' : ''}" data-cat="${esc(c)}">${esc(c)}</button>`).join('')}
        <select id="lvl" aria-label="Nivel"><option value="">Todos los niveles</option>${['Básico', 'Intermedio', 'Avanzado'].map(l => `<option ${lvl === l ? 'selected' : ''}>${l}</option>`).join('')}</select>
        <input class="search" type="search" placeholder="Buscar curso…" value="${esc(q.get('q') || '')}" id="search">
      </div>
      ${list.length ? `<div class="grid">${list.map(c => courseCard(c, u)).join('')}</div>` : `<div class="card empty">No encontramos cursos con ese filtro.</div>`}
      <p class="small muted center mt">¿No encuentras el curso que necesitas? <a href="#/ayuda?sugerir=1">Sugiere un tema</a>.</p>
      <div style="height:3rem"></div></div>`;
  };
  views.catalog.mount = (q) => {
    $$('[data-cat]').forEach(b => b.onclick = () => { const p = new URLSearchParams(q); b.dataset.cat ? p.set('cat', b.dataset.cat) : p.delete('cat'); go('#/cursos?' + p); });
    $('#lvl').onchange = ev => { const p = new URLSearchParams(q); ev.target.value ? p.set('nivel', ev.target.value) : p.delete('nivel'); go('#/cursos?' + p); };
    const s = $('#search'); let t;
    s.oninput = () => { clearTimeout(t); t = setTimeout(() => { const p = new URLSearchParams(q); s.value ? p.set('q', s.value) : p.delete('q'); history.replaceState(null, '', '#/cursos?' + p); render(true); }, 250); };
    if (q.get('q')) { s.focus(); s.setSelectionRange(s.value.length, s.value.length); }
  };

  views.course = (q, id) => {
    const c = Store.course(id); if (!c || (!c.published && Store.currentUser()?.role !== 'admin')) return notFound();
    const u = Store.currentUser(); const e = u && Store.enrollment(u.id, c.id); const p = e ? Store.progress(e) : 0;
    const next = e ? (c.lessons.find(l => !e.completed.includes(l.id)) || c.lessons[0]) : null;
    const done = e && Store.lessonsDone(e);
    return `
    <section class="detail-hero" style="background:linear-gradient(135deg,${esc(c.color)},${shade(c.color, -40)})"><div class="wrap">
      <div>
        <a href="#/cursos" style="color:#fff;opacity:.85" class="small">← Catálogo</a>
        <h1 style="margin-top:.6rem">${esc(c.title)}</h1>
        <p style="font-size:1.08rem;max-width:60ch">${esc(c.description)}</p>
        <div class="meta"><span>${I.layers}${c.lessons.length} lecciones + evaluación</span><span>${I.clock}${c.hours} horas</span><span>${I.level}${esc(c.level)}</span></div>
      </div>
      <div class="enroll-box">
        ${!u ? `<h3>Inscríbete gratis</h3><p class="small">Crea tu cuenta para guardar tu avance y obtener tu constancia.</p><a class="btn block" href="#/registro?next=${encodeURIComponent('/curso/' + c.id)}">Crear cuenta e inscribirme</a><p class="small center mt" style="margin-bottom:0">¿Ya tienes cuenta? <a href="#/entrar?next=${encodeURIComponent('/curso/' + c.id)}">Inicia sesión</a></p>`
        : !e ? `<h3>Listo para empezar</h3><p class="small">Al inscribirte podrás ver todas las lecciones y presentar la evaluación.</p><button class="btn block" id="enroll">Inscribirme al curso</button>`
        : `<div class="row" style="gap:1rem;margin-bottom:1rem">${ring(p)}<div><b>${p === 100 ? '¡Curso completado!' : 'Tu avance'}</b><br><span class="small muted">${e.completed.length} de ${c.lessons.length} lecciones</span></div></div>
           ${e.certificate ? `<a class="btn amber block" href="#/constancia/${c.id}">Ver mi constancia</a>` : done ? `<a class="btn block" href="#/evaluacion/${c.id}">Presentar evaluación</a>` : `<a class="btn block" href="#/aprender/${c.id}/${next.id}">${e.completed.length ? 'Continuar' : 'Empezar curso'}</a>`}`}
      </div>
    </div></section>
    <section class="section"><div class="wrap two-col">
      <div>
        ${c.objective ? `<div class="objective"><span style="color:#7A5A0C">${I.award}</span><div><b>Objetivo de aprendizaje</b>${esc(c.objective)}</div></div>` : ''}
        <h2>Contenido del curso</h2>
        <div class="card"><ul class="syllabus">
          ${c.lessons.map((l, i) => { const d = e && e.completed.includes(l.id); const inner = `<span class="n ${d ? 'done' : ''}">${d ? I.check : i + 1}</span><span class="t">${esc(l.title)}<br><span class="small muted">${typeLabel[l.type]} · ${l.minutes} min</span></span>`;
            return `<li>${e ? `<a class="t row" style="gap:.9rem;flex:1" href="#/aprender/${c.id}/${l.id}">${inner}</a>` : inner}</li>`; }).join('')}
          <li><span class="n ${e && e.quiz && e.quiz.passedAt ? 'done' : ''}">${e && e.quiz && e.quiz.passedAt ? I.check : '✓'}</span><span class="t"><b>Evaluación final</b><br><span class="small muted">${c.quiz.questions.length} preguntas · aprobatoria ${c.quiz.passing}%</span></span></li>
        </ul></div>
      </div>
      <div class="card pad">
        <h3>Lo que obtienes</h3>
        <ul class="small" style="padding-left:1.1rem;margin:0">
          <li>Acceso a todas las lecciones desde computadora o celular.</li>
          <li>Evaluación para comprobar lo aprendido.</li>
          <li>Seguimiento de tu progreso.</li>
          <li>Constancia digital con folio verificable.</li>
        </ul>
      </div>
    </div></section>`;
  };
  views.course.mount = (q, id) => {
    const b = $('#enroll'); if (b) b.onclick = () => { const u = Store.currentUser(); Store.enroll(u.id, id); toast('¡Inscripción lista! Ya puedes empezar.'); render(); };
  };

  views.lesson = (q, cid, lid) => {
    const u = needLogin(); if (!u) return '';
    const c = Store.course(cid); if (!c) return notFound();
    const e = Store.enroll(u.id, c.id);
    const idx = Math.max(0, c.lessons.findIndex(l => l.id === lid)); const l = c.lessons[idx];
    const prev = c.lessons[idx - 1], next = c.lessons[idx + 1];
    const done = e.completed.includes(l.id);
    const listHtml = c.lessons.map(x => `<li><a href="#/aprender/${c.id}/${x.id}" class="${x.id === l.id ? 'cur' : ''}"><span class="ck ${e.completed.includes(x.id) ? 'done' : ''}">${e.completed.includes(x.id) ? I.check : ''}</span><span>${esc(x.title)}<br><span class="small muted">${typeLabel[x.type]} · ${x.minutes} min</span></span></a></li>`).join('')
      + `<li><a href="#/evaluacion/${c.id}"><span class="ck ${e.quiz && e.quiz.passedAt ? 'done' : ''}">${e.quiz && e.quiz.passedAt ? I.check : ''}</span><span><b>Evaluación final</b></span></a></li>`;
    let media = '';
    if (l.type === 'video') {
      const src = embedUrl(l.url);
      if (src) media = `<div class="video"><iframe src="${esc(src)}" title="${esc(l.title)}" allow="accelerometer; encrypted-media; gyroscope; picture-in-picture; fullscreen" allowfullscreen loading="lazy"></iframe></div>`;
      else if (l.slides && l.slides.length) media = `<div class="deck" id="deck" style="--c:${esc(c.color)}">
          <div class="deck-stage">${l.slides.map((sl, i) => `<div class="slide ${i === 0 ? 'on cover-slide' : ''}" data-i="${i}"><div class="slide-in"><span class="slide-n">${i === 0 ? esc(c.category) : i + ' / ' + (l.slides.length - 1)}</span><h2>${esc(sl[0])}</h2><p>${esc(sl[1])}</p></div></div>`).join('')}
            <button class="deck-big" id="deckPlay" aria-label="Reproducir">${I.play.replace(/18/g, '34')}</button></div>
          <div class="deck-bar"><button id="deckPrev" aria-label="Anterior">‹</button><button id="deckToggle" aria-label="Reproducir">${I.play}</button><button id="deckNext" aria-label="Siguiente">›</button>
            <div class="deck-track">${l.slides.map((_, i) => `<i data-i="${i}"><b></b></i>`).join('')}</div><span class="deck-t" id="deckT">1 / ${l.slides.length}</span></div></div>`;
      else media = `<div class="video"><div class="video-ph"><div>${I.play.replace(/18/g, '42')}<p style="margin:.5rem 0 0">Video de la lección</p><small>El administrador puede agregar el enlace de YouTube o Vimeo desde el panel.</small></div></div></div>`;
    } else if (l.type === 'doc') {
      const fname = l.url ? decodeURIComponent(l.url.split('/').pop()) : '';
      media = `<div class="doc-box"><span style="color:var(--primary-d)">${I.file}</span><div style="flex:1"><b>${esc(l.file || 'Material descargable')}</b><br><span class="small muted">${l.url ? 'Descárgalo y úsalo para practicar.' : 'El administrador puede agregar el enlace del documento desde el panel.'}</span></div>${l.url ? `<a class="btn sm" href="${esc(l.url)}" ${/^https?:/.test(l.url) ? 'target="_blank" rel="noopener"' : `download="${esc(fname)}"`}>Descargar</a>` : ''}</div>`;
    }
    const p = Store.progress(e);
    return `<div class="player">
      <aside>
        <a href="#/curso/${c.id}" class="small">← ${esc(c.title)}</a>
        <div class="row mt" style="gap:.75rem">${ring(p)}<div class="small"><b>Tu avance</b><br><span class="muted">${e.completed.length}/${c.lessons.length} lecciones</span></div></div>
        <ul class="lesson-list">${listHtml}</ul>
      </aside>
      <div class="player-main">
        <div class="mobile-lessons">
          <a href="#/curso/${c.id}" class="small">← ${esc(c.title)}</a>
          <div class="row mt" style="gap:.6rem"><div class="bar" style="flex:1"><i style="width:${p}%"></i></div><span class="small"><b>${p}%</b></span></div>
          <select id="lessonPick" class="mt">${c.lessons.map((x, i) => `<option value="${x.id}" ${x.id === l.id ? 'selected' : ''}>${i + 1}. ${esc(x.title)}${e.completed.includes(x.id) ? ' ✓' : ''}</option>`).join('')}<option value="__quiz">Evaluación final</option></select>
        </div>
        <span class="tag">${typeLabel[l.type]} · Lección ${idx + 1} de ${c.lessons.length}</span>
        <h1 style="margin-top:.6rem">${esc(l.title)}</h1>
        ${media ? `<div style="margin:1.25rem 0 1.5rem">${media}</div>` : ''}
        <div class="lesson-text">${richText(l.content)}</div>
        <div class="lesson-nav">
          ${prev ? `<a class="btn ghost" href="#/aprender/${c.id}/${prev.id}">← Anterior</a>` : '<span></span>'}
          <button class="btn" id="doneBtn">${done ? (next ? 'Siguiente lección →' : 'Ir a la evaluación →') : (next ? 'Marcar como completada y seguir →' : 'Completar e ir a la evaluación →')}</button>
        </div>
      </div></div>`;
  };
  views.lesson.mount = (q, cid, lid) => {
    const u = Store.currentUser(); if (!u) return; const c = Store.course(cid); if (!c) return;
    const idx = Math.max(0, c.lessons.findIndex(l => l.id === lid)); const l = c.lessons[idx]; const next = c.lessons[idx + 1];
    $('#doneBtn').onclick = () => {
      Store.completeLesson(u.id, cid, l.id);
      go(next ? `#/aprender/${cid}/${next.id}` : `#/evaluacion/${cid}`);
    };
    const deck = $('#deck');
    if (deck) {
      const slides = $$('.slide', deck), bars = $$('.deck-track i', deck), N = slides.length, DUR = 6000;
      let i = 0, playing = false, t0 = 0, raf = 0, elapsed = 0;
      const show = k => { i = Math.max(0, Math.min(N - 1, k)); slides.forEach((s, j) => s.classList.toggle('on', j === i)); bars.forEach((b, j) => { b.firstChild.style.width = j < i ? '100%' : '0%'; }); $('#deckT').textContent = (i + 1) + ' / ' + N; elapsed = 0; t0 = performance.now(); };
      const icon = () => { $('#deckToggle').innerHTML = playing ? '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M7 5h4v14H7zM13 5h4v14h-4z"/></svg>' : I.play; deck.classList.toggle('playing', playing); };
      const tick = now => { if (!playing || !document.body.contains(deck)) return; elapsed = now - t0; bars[i].firstChild.style.width = Math.min(100, elapsed / DUR * 100) + '%'; if (elapsed >= DUR) { if (i < N - 1) show(i + 1); else { playing = false; icon(); bars[i].firstChild.style.width = '100%'; return; } } raf = requestAnimationFrame(tick); };
      const play = () => { if (i === N - 1 && !playing) show(0); playing = true; t0 = performance.now() - elapsed; icon(); cancelAnimationFrame(raf); raf = requestAnimationFrame(tick); };
      const pause = () => { playing = false; icon(); cancelAnimationFrame(raf); };
      $('#deckPlay').onclick = play; $('#deckToggle').onclick = () => playing ? pause() : play();
      $('#deckPrev').onclick = () => { show(i - 1); if (playing) t0 = performance.now(); };
      $('#deckNext').onclick = () => { show(i + 1); if (playing) t0 = performance.now(); };
      bars.forEach((b, j) => b.onclick = () => { show(j); if (playing) t0 = performance.now(); });
    }
    const pick = $('#lessonPick'); if (pick) pick.onchange = () => go(pick.value === '__quiz' ? `#/evaluacion/${cid}` : `#/aprender/${cid}/${pick.value}`);
  };

  views.quiz = (q, cid) => {
    const u = needLogin(); if (!u) return '';
    const c = Store.course(cid); if (!c) return notFound();
    const e = Store.enroll(u.id, c.id);
    const head = `<a href="#/curso/${c.id}" class="small">← ${esc(c.title)}</a><h1 style="margin-top:.6rem">Evaluación final</h1>`;
    if (!Store.lessonsDone(e)) {
      const pending = c.lessons.filter(l => !e.completed.includes(l.id));
      return `<div class="narrow section">${head}<div class="card pad"><p>Para presentar la evaluación primero completa todas las lecciones. Te faltan <b>${pending.length}</b>:</p>
        <ul>${pending.map(l => `<li><a href="#/aprender/${c.id}/${l.id}">${esc(l.title)}</a></li>`).join('')}</ul></div></div>`;
    }
    const r = views.quiz.lastResult && views.quiz.lastResult.cid === cid ? views.quiz.lastResult : null;
    views.quiz.lastResult = null;
    return `<div class="narrow section">${head}
      <p class="muted">${c.quiz.questions.length} preguntas · Calificación aprobatoria: ${c.quiz.passing}%${e.quiz ? ` · Intentos: ${e.quiz.attempts} · Mejor calificación: ${e.quiz.best}%` : ''}</p>
      ${r ? `<div class="result ${r.passed ? 'pass' : 'fail'}"><div class="score">${r.score}%</div><div><b>${r.passed ? '¡Aprobaste!' : 'Aún no alcanzas la calificación aprobatoria'}</b><br><span class="small">${r.ok} de ${r.total} respuestas correctas. ${r.passed ? 'Tu constancia ya está disponible.' : 'Repasa las lecciones y vuelve a intentarlo.'}</span>
        ${r.passed ? `<div class="mt"><a class="btn amber" href="#/constancia/${c.id}">Ver mi constancia</a></div>` : ''}</div></div>` : ''}
      ${e.certificate && !r ? `<div class="result pass"><div class="score">${I.award}</div><div><b>Ya aprobaste este curso.</b><br><span class="small">Puedes volver a presentarla para practicar.</span><div class="mt"><a class="btn amber sm" href="#/constancia/${c.id}">Ver constancia</a></div></div></div>` : ''}
      <form class="card pad" id="quizForm">
        ${c.quiz.questions.map((qq, i) => `<div class="q"><h4>${i + 1}. ${esc(qq.q)}</h4>
          ${qq.options.map((o, j) => { const cls = r ? (j === qq.answer ? 'right' : (Number(r.answers[i]) === j ? 'wrong' : '')) : '';
            return `<label class="opt ${cls}"><input type="radio" name="q${i}" value="${j}" ${r && Number(r.answers[i]) === j ? 'checked' : ''} required> ${esc(o)}</label>`; }).join('')}</div>`).join('')}
        <button class="btn mt" type="submit">${r ? 'Volver a intentarlo' : 'Enviar respuestas'}</button>
      </form></div>`;
  };
  views.quiz.mount = (q, cid) => {
    const f = $('#quizForm'); if (!f) return;
    if ($('.result')) f.querySelectorAll('input').forEach(i => { i.addEventListener('change', () => $$('.opt', f).forEach(o => o.classList.remove('right', 'wrong')), { once: true }); });
    f.onsubmit = ev => {
      ev.preventDefault();
      const u = Store.currentUser(); const c = Store.course(cid);
      const answers = c.quiz.questions.map((_, i) => { const x = f.querySelector(`input[name=q${i}]:checked`); return x ? x.value : -1; });
      const res = Store.submitQuiz(u.id, cid, answers);
      views.quiz.lastResult = { ...res, answers, cid };
      render(); window.scrollTo({ top: 0, behavior: 'smooth' });
    };
  };

  views.certificate = (q, cid) => {
    const u = needLogin(); if (!u) return '';
    const c = Store.course(cid); const e = c && Store.enrollment(u.id, cid);
    if (!c || !e || !e.certificate) return `<div class="narrow section"><div class="card pad center"><h2>Aún no tienes esta constancia</h2><p class="muted">Completa el curso y aprueba la evaluación para obtenerla.</p><a class="btn" href="#/curso/${cid}">Ir al curso</a></div></div>`;
    return certHtml(u, c, e, true);
  };
  function certHtml(u, c, e, own) {
    const url = location.origin + location.pathname + '#/verificar/' + e.certificate.folio;
    return `<div class="cert-wrap"><div class="wrap" style="max-width:960px">
      ${own ? `<div class="row between no-print" style="margin-bottom:1rem"><a href="#/panel" class="small">← Mi progreso</a><div class="row"><button class="btn ghost sm" id="copyLink">Copiar enlace</button><button class="btn sm" onclick="window.print()">Descargar / imprimir PDF</button></div></div>` : ''}
      <div class="cert">
        <div class="cert-top"><div class="brand"><img src="assets/logo.svg" alt=""><span>EduWork</span></div><span class="small muted">Folio: <b>${esc(e.certificate.folio)}</b></span></div>
        <div class="cert-body">
          <div class="k">Constancia de acreditación</div>
          <h2>Se otorga la presente a</h2>
          <div class="name">${esc(u.name)}</div>
          <p>por haber completado y aprobado el curso</p>
          <p style="font-weight:800;font-size:clamp(.95rem,2.4vw,1.4rem);color:var(--ink)">${esc(c.title)}</p>
          <p class="muted">con una duración de ${c.hours} horas y una calificación de ${e.quiz ? e.quiz.best : 100}%.</p>
        </div>
        <div class="cert-foot">
          <div><b>Fecha de emisión</b><br>${fmtDate(e.certificate.issuedAt)}</div>
          <div class="seal">EDU WORK<br>VERIFICADA</div>
          <div class="sig"><b>Coordinación académica</b><br>EduWork</div>
        </div>
      </div>
      ${own ? `<p class="small muted center mt no-print">Cualquier persona puede verificar esta constancia en <a href="${esc(url)}">${esc(url.replace(/^https?:\/\//, ''))}</a></p>` : ''}
    </div></div>`;
  }
  views.certificate.mount = () => {
    const b = $('#copyLink'); if (!b) return;
    b.onclick = () => { const a = $('.cert-wrap p a'); navigator.clipboard?.writeText(a.href).then(() => toast('Enlace copiado'), () => toast(a.href)); };
  };

  views.verify = (q, folio) => {
    let result = '';
    if (folio) {
      const f = Store.findCertificate(decodeURIComponent(folio));
      result = f ? `<div class="result pass mt"><div class="score" style="font-size:1.6rem">${I.award}</div><div><b>Constancia válida</b><br><span class="small">${esc(f.user.name)} acreditó <b>${esc(f.course.title)}</b> el ${fmtDate(f.e.certificate.issuedAt)}.</span></div></div>${certHtml(f.user, f.course, f.e, false)}`
        : `<div class="result fail mt"><div><b>No encontramos ese folio.</b><br><span class="small">Revisa que esté escrito correctamente (ejemplo: EW-2026-AB12C).</span></div></div>`;
    }
    return `<div class="narrow section"><h1>Verificar constancia</h1><p class="muted">Escribe el folio que aparece en la constancia para confirmar que es auténtica.</p>
      <form class="row" id="verForm"><input type="text" id="folio" placeholder="EW-2026-XXXXX" value="${esc(decodeURIComponent(folio || ''))}" style="flex:1;min-width:200px;text-transform:uppercase" required><button class="btn">Verificar</button></form>
      ${result}</div>`;
  };
  views.verify.mount = () => { $('#verForm').onsubmit = ev => { ev.preventDefault(); go('#/verificar/' + encodeURIComponent($('#folio').value.trim().toUpperCase())); }; };

  views.login = (q) => authPage('login', q);
  views.register = (q) => authPage('register', q);
  function authPage(mode, q) {
    if (Store.currentUser()) { setTimeout(() => go('#/panel')); return ''; }
    const next = q.get('next') || '';
    const isLogin = mode === 'login';
    return `<div class="auth">
      <div class="auth-side"><div style="max-width:420px"><img src="assets/logo.svg" alt="" width="56" height="56" style="margin-bottom:1.5rem"><p style="font-family:var(--serif);font-size:clamp(1.8rem,4vw,2.6rem);font-weight:700;line-height:1.2;color:#fff">Tu primer empleo empieza con lo que sabes hacer.</p><p>Aprende hoy, prepárate para el trabajo de mañana. Cursos cortos, evaluaciones y constancias para demostrarlo.</p></div></div>
      <div class="auth-main"><div class="card pad">
        <h1 style="font-size:1.6rem">${isLogin ? 'Inicia sesión' : 'Crea tu cuenta'}</h1>
        <p class="muted small">${isLogin ? '¿No tienes cuenta?' : '¿Ya tienes cuenta?'} <a href="#/${isLogin ? 'registro' : 'entrar'}${next ? '?next=' + encodeURIComponent(next) : ''}">${isLogin ? 'Regístrate' : 'Inicia sesión'}</a></p>
        <form class="form" id="authForm" novalidate>
          ${isLogin ? '' : `<div class="field"><label for="name">Nombre completo</label><input id="name" type="text" autocomplete="name" required></div>`}
          <div class="field"><label for="email">Correo</label><input id="email" type="email" autocomplete="email" required></div>
          <div class="field"><label for="pass">Contraseña</label><input id="pass" type="password" autocomplete="${isLogin ? 'current-password' : 'new-password'}" required>${isLogin ? '' : '<small>Mínimo 6 caracteres.</small>'}</div>
          ${isLogin ? '' : `<div class="grid-2"><div class="field"><label for="school">Escuela</label><input id="school" type="text"></div><div class="field"><label for="career">Carrera</label><input id="career" type="text"></div></div>`}
          <div class="error" id="authErr" role="alert"></div>
          <button class="btn block" type="submit">${isLogin ? 'Entrar' : 'Crear cuenta'}</button>
        </form>
        ${isLogin ? `<div class="demo-box mt"><b>Cuentas de demostración</b><br>Estudiante: <code>estudiante@eduwork.mx</code> / <code>demo123</code><br>Administrador: <code>admin@eduwork.mx</code> / <code>admin123</code></div>` : ''}
      </div></div></div>`;
  }
  const authMount = (q) => {
    const f = $('#authForm'); if (!f) return;
    f.onsubmit = async ev => {
      ev.preventDefault(); $('#authErr').textContent = '';
      try {
        let u;
        if ($('#name')) u = await Store.register({ name: $('#name').value, email: $('#email').value, password: $('#pass').value, school: $('#school').value, career: $('#career').value });
        else u = await Store.login($('#email').value, $('#pass').value);
        toast(`¡Hola, ${u.name.split(' ')[0]}!`);
        go('#' + (q.get('next') || (u.role === 'admin' ? '/admin' : '/panel')));
      } catch (err) { $('#authErr').textContent = err.message; }
    };
  };
  views.login.mount = authMount; views.register.mount = authMount;

  views.dashboard = () => {
    const u = needLogin(); if (!u) return '';
    const es = Store.enrollmentsOf(u.id).filter(e => Store.course(e.courseId));
    const certs = es.filter(e => e.certificate);
    const inProg = es.filter(e => !e.certificate);
    const avg = es.length ? Math.round(es.reduce((a, e) => a + Store.progress(e), 0) / es.length) : 0;
    const lessons = es.reduce((a, e) => a + e.completed.length, 0);
    const item = e => { const c = Store.course(e.courseId); const p = Store.progress(e); const next = c.lessons.find(l => !e.completed.includes(l.id));
      return `<div class="progress-item">${ring(p)}<div class="info"><div class="row" style="gap:.5rem;margin-bottom:.25rem"><h4 style="margin:0">${esc(c.title)}</h4>${stTag(e)}</div><div class="small muted">${e.completed.length}/${c.lessons.length} lecciones · ${e.quiz ? 'Evaluación: ' + e.quiz.best + '%' : 'Evaluación pendiente'}</div></div>
        <div class="acts">${e.certificate ? `<a class="btn amber sm" href="#/constancia/${c.id}">Constancia</a>` : next ? `<a class="btn sm" href="#/aprender/${c.id}/${next.id}">Continuar</a>` : `<a class="btn sm" href="#/evaluacion/${c.id}">Presentar evaluación</a>`}</div></div>`; };
    return `<div class="wrap">
      <div class="page-head row between"><div><h1>Hola, ${esc(u.name.split(' ')[0])}</h1><p style="margin:0">Este es tu avance en EduWork.</p></div><a class="btn ghost" href="#/cursos">Explorar cursos</a></div>
      <div class="stats">
        <div class="stat"><b>${es.length}</b><span>cursos inscritos</span></div>
        <div class="stat"><b>${lessons}</b><span>lecciones completadas</span></div>
        <div class="stat"><b>${avg}%</b><span>avance promedio</span></div>
        <div class="stat"><b>${certs.length}</b><span>constancias obtenidas</span></div>
      </div>
      <h2>En curso</h2>
      <div class="card">${inProg.length ? inProg.map(item).join('') : `<div class="empty">No tienes cursos en progreso. <a href="#/cursos">Inscríbete a uno</a>.</div>`}</div>
      <h2 class="mt">Constancias</h2>
      <div class="card">${certs.length ? certs.map(item).join('') : `<div class="empty">Al aprobar un curso tu constancia aparecerá aquí.</div>`}</div>
      <div style="height:3rem"></div></div>`;
  };

  views.profile = () => {
    const u = needLogin(); if (!u) return '';
    const es = Store.enrollmentsOf(u.id);
    return `<div class="narrow section">
      <div class="profile-head"><span class="avatar lg">${esc(initials(u.name))}</span><div><h1 style="margin:0">${esc(u.name)}</h1><span class="muted">${esc(u.email)}</span> ${u.role === 'admin' ? '<span class="tag ok">Administrador</span>' : ''}<br><span class="small muted">Miembro desde ${fmtDate(u.createdAt)} · ${es.length} cursos · ${es.filter(e => e.certificate).length} constancias</span></div></div>
      <form class="card pad form" id="profForm">
        <h3>Mis datos</h3>
        <div class="field"><label for="pName">Nombre completo <small>(así aparecerá en tus constancias)</small></label><input id="pName" type="text" value="${esc(u.name)}" required></div>
        <div class="grid-2"><div class="field"><label for="pSchool">Escuela</label><input id="pSchool" type="text" value="${esc(u.school)}"></div><div class="field"><label for="pCareer">Carrera</label><input id="pCareer" type="text" value="${esc(u.career)}"></div></div>
        <div class="field"><label for="pBio">Sobre mí</label><textarea id="pBio" placeholder="Semestre, intereses, metas…">${esc(u.bio)}</textarea></div>
        <div class="row"><button class="btn" type="submit">Guardar cambios</button></div>
      </form>
      <form class="card pad form mt" id="passForm">
        <h3>Cambiar contraseña</h3>
        <div class="grid-2"><div class="field"><label for="p1">Nueva contraseña</label><input id="p1" type="password" minlength="6" required></div><div class="field"><label for="p2">Confirmar</label><input id="p2" type="password" minlength="6" required></div></div>
        <div class="error" id="passErr"></div>
        <div class="row"><button class="btn ghost" type="submit">Actualizar contraseña</button></div>
      </form>
      <div class="row mt"><button class="btn danger" id="logout">Cerrar sesión</button></div>
    </div>`;
  };
  views.profile.mount = () => {
    const u = Store.currentUser(); if (!u) return;
    $('#profForm').onsubmit = ev => { ev.preventDefault(); if (!$('#pName').value.trim()) return toast('Escribe tu nombre'); Store.updateUser(u.id, { name: $('#pName').value.trim(), school: $('#pSchool').value.trim(), career: $('#pCareer').value.trim(), bio: $('#pBio').value.trim() }); toast('Perfil actualizado'); render(); };
    $('#passForm').onsubmit = async ev => { ev.preventDefault(); const a = $('#p1').value, b = $('#p2').value; if (a.length < 6) return $('#passErr').textContent = 'Mínimo 6 caracteres.'; if (a !== b) return $('#passErr').textContent = 'Las contraseñas no coinciden.'; Store.updateUser(u.id, { pass: await Store.hash(a) }); ev.target.reset(); $('#passErr').textContent = ''; toast('Contraseña actualizada'); };
    $('#logout').onclick = () => { Store.logout(); toast('Sesión cerrada'); go('#/'); };
  };

  views.help = () => {
    const u = Store.currentUser();
    const faq = [
      ['¿Cómo creo mi cuenta?', 'Da clic en "Crear cuenta", escribe tu nombre, correo y una contraseña de al menos 6 caracteres. Tu escuela y carrera son opcionales.'],
      ['¿Cómo me inscribo a un curso?', 'Entra a "Cursos", elige uno, revisa su objetivo y temario, y da clic en "Inscribirme al curso".'],
      ['¿Cómo avanzo en un curso?', 'Abre cada lección y, al terminarla, da clic en "Marcar como completada y seguir". Tu avance se guarda y puedes retomarlo cuando quieras.'],
      ['¿Qué significan los estados?', '<b>No iniciado:</b> aún no comienzas. <b>En progreso:</b> ya completaste al menos una lección. <b>Completado:</b> aprobaste la evaluación final.'],
      ['¿Cómo obtengo mi constancia?', 'Completa todas las lecciones y aprueba la evaluación final con la calificación mínima. La constancia aparece en "Mi progreso" y puedes descargarla en PDF.'],
      ['¿Cómo verifico una constancia?', 'En "Verificar constancia" escribe el folio que aparece en el documento (por ejemplo EW-2026-AB12C).']
    ];
    return `<div class="narrow section">
      <h1>Ayuda</h1><p class="muted">Respuestas rápidas para usar EduWork.</p>
      <div class="card faq">${faq.map(([q, a]) => `<details><summary>${q}</summary><p>${a}</p></details>`).join('')}</div>
      <h2 class="mt" id="sugerir">Sugiere un curso</h2>
      <p class="muted">¿Qué habilidad te gustaría fortalecer? Tu sugerencia ayuda a ampliar el catálogo.</p>
      <form class="card pad form" id="sugForm">
        <div class="field"><label for="sTopic">Tema del curso</label><input id="sTopic" type="text" placeholder="Ej. Excel intermedio, entrevistas de trabajo…" required></div>
        <div class="field"><label for="sNote">¿Para qué lo necesitas? <small>(opcional)</small></label><textarea id="sNote" style="min-height:80px"></textarea></div>
        <div class="row"><button class="btn" type="submit">Enviar sugerencia</button>${u ? '' : '<span class="small muted">Puedes enviarla sin iniciar sesión.</span>'}</div>
      </form><div style="height:2rem"></div></div>`;
  };
  views.help.mount = (q) => {
    if (q.get('sugerir')) setTimeout(() => $('#sugerir')?.scrollIntoView({ behavior: 'smooth' }), 50);
    $('#sugForm').onsubmit = ev => { ev.preventDefault(); const t = $('#sTopic').value.trim(); if (!t) return toast('Escribe el tema'); Store.addSuggestion(Store.currentUser(), t, $('#sNote').value); ev.target.reset(); toast('¡Gracias! Recibimos tu sugerencia'); };
  };

  /* ---------- Administración ---------- */
  function needAdmin() { const u = needLogin(); if (!u) return null; if (u.role !== 'admin') { app.innerHTML = `<div class="narrow section"><div class="card pad center"><h2>Acceso restringido</h2><p class="muted">Esta sección es solo para administradores.</p><a class="btn" href="#/panel">Ir a mi progreso</a></div></div>`; return null; } return u; }
  const adminTabs = t => `<div class="admin-tabs"><a href="#/admin" class="${t === 'cursos' ? 'on' : ''}">Cursos</a><a href="#/admin/estudiantes" class="${t === 'est' ? 'on' : ''}">Estudiantes</a><a href="#/admin/constancias" class="${t === 'cons' ? 'on' : ''}">Constancias</a><a href="#/admin/sugerencias" class="${t === 'sug' ? 'on' : ''}">Sugerencias${(Store.db.suggestions || []).length ? ' (' + Store.db.suggestions.length + ')' : ''}</a></div>`;

  views.admin = () => {
    if (!needAdmin()) return null;
    const cs = Store.courses(true); const db = Store.db;
    const students = db.users.filter(u => u.role === 'student');
    return `<div class="wrap">
      <div class="page-head row between"><div><h1>Administración</h1><p style="margin:0">Gestiona cursos, estudiantes y constancias.</p></div><a class="btn" href="#/admin/curso/nuevo">+ Nuevo curso</a></div>
      <div class="stats">
        <div class="stat"><b>${cs.length}</b><span>cursos (${cs.filter(c => c.published).length} publicados)</span></div>
        <div class="stat"><b>${students.length}</b><span>estudiantes</span></div>
        <div class="stat"><b>${db.enrollments.length}</b><span>inscripciones</span></div>
        <div class="stat"><b>${db.enrollments.filter(e => e.certificate).length}</b><span>constancias emitidas</span></div>
      </div>
      ${(() => { const started = db.enrollments.filter(e => Store.status(e) !== 'none'); const done = db.enrollments.filter(e => e.certificate); const qz = db.enrollments.filter(e => e.quiz);
        const rate = started.length ? Math.round(done.length / started.length * 100) : 0; const avgQ = qz.length ? Math.round(qz.reduce((a, e) => a + e.quiz.best, 0) / qz.length) : 0;
        const lessonsDone = db.enrollments.reduce((a, e) => a + e.completed.length, 0);
        return `<h3>Indicadores del prototipo</h3><div class="stats">
          <div class="stat"><b>${rate}%</b><span>tasa de finalización (completados ÷ iniciados)</span></div>
          <div class="stat"><b>${started.length}</b><span>cursos iniciados</span></div>
          <div class="stat"><b>${lessonsDone}</b><span>lecciones completadas (participación)</span></div>
          <div class="stat"><b>${avgQ}%</b><span>calificación promedio en evaluaciones</span></div></div>`; })()}
      ${adminTabs('cursos')}
      <div class="card table-wrap"><table>
        <thead><tr><th>Curso</th><th>Categoría</th><th>Lecciones</th><th>Inscritos</th><th>Estado</th><th></th></tr></thead>
        <tbody>${cs.map(c => `<tr><td><div class="row" style="gap:.6rem;flex-wrap:nowrap"><span style="width:12px;height:12px;border-radius:4px;background:${esc(c.color)};flex:none"></span><b>${esc(c.title)}</b></div></td><td>${esc(c.category)}</td><td>${c.lessons.length}</td><td>${db.enrollments.filter(e => e.courseId === c.id).length}</td>
          <td>${c.published ? '<span class="tag ok">Publicado</span>' : '<span class="tag warn">Borrador</span>'}</td>
          <td style="white-space:nowrap"><a class="btn ghost sm" href="#/admin/curso/${c.id}">Editar</a> <a class="btn ghost sm" href="#/curso/${c.id}">Ver</a></td></tr>`).join('')}</tbody></table></div>
      <div class="row mt between"><span class="small muted">Prototipo: los datos se guardan en este navegador.</span><button class="btn ghost sm" id="resetDb">Restablecer datos de demostración</button></div>
      <div style="height:3rem"></div></div>`;
  };
  views.admin.mount = () => { const b = $('#resetDb'); if (b) b.onclick = async () => { if (confirm('¿Restablecer todos los datos de demostración? Se borrarán cuentas y cambios.')) { await Store.reset(); toast('Datos restablecidos'); go('#/'); } }; };

  views.adminStudents = () => {
    if (!needAdmin()) return null;
    const db = Store.db; const students = db.users.filter(u => u.role === 'student');
    return `<div class="wrap"><div class="page-head"><h1>Administración</h1></div>${adminTabs('est')}
      <div class="card table-wrap"><table><thead><tr><th>Estudiante</th><th>Escuela / carrera</th><th>Cursos</th><th>Avance promedio</th><th>Constancias</th><th>Registro</th></tr></thead>
      <tbody>${students.map(u => { const es = Store.enrollmentsOf(u.id).filter(e => Store.course(e.courseId)); const avg = es.length ? Math.round(es.reduce((a, e) => a + Store.progress(e), 0) / es.length) : 0;
        return `<tr><td><div class="row" style="gap:.6rem;flex-wrap:nowrap"><span class="avatar" style="width:32px;height:32px;font-size:.75rem">${esc(initials(u.name))}</span><div><b>${esc(u.name)}</b><br><span class="small muted">${esc(u.email)}</span></div></div></td>
        <td class="small">${esc(u.school || '—')}<br><span class="muted">${esc(u.career || '')}</span></td><td>${es.length}</td>
        <td style="min-width:140px"><div class="row" style="gap:.5rem;flex-wrap:nowrap"><div class="bar" style="flex:1"><i style="width:${avg}%"></i></div><span class="small">${avg}%</span></div></td>
        <td>${es.filter(e => e.certificate).length}</td><td class="small">${fmtDate(u.createdAt)}</td></tr>`; }).join('') || '<tr><td colspan="6" class="empty">Aún no hay estudiantes registrados.</td></tr>'}</tbody></table></div>
      <div style="height:3rem"></div></div>`;
  };

  views.adminCerts = () => {
    if (!needAdmin()) return null;
    const db = Store.db; const list = db.enrollments.filter(e => e.certificate).sort((a, b) => b.certificate.issuedAt.localeCompare(a.certificate.issuedAt));
    return `<div class="wrap"><div class="page-head"><h1>Administración</h1></div>${adminTabs('cons')}
      <div class="card table-wrap"><table><thead><tr><th>Folio</th><th>Estudiante</th><th>Curso</th><th>Calificación</th><th>Emitida</th><th></th></tr></thead>
      <tbody>${list.map(e => { const u = db.users.find(x => x.id === e.userId); const c = Store.course(e.courseId); if (!u || !c) return '';
        return `<tr><td><b>${esc(e.certificate.folio)}</b></td><td>${esc(u.name)}</td><td>${esc(c.title)}</td><td>${e.quiz ? e.quiz.best + '%' : '—'}</td><td class="small">${fmtDate(e.certificate.issuedAt)}</td><td><a class="btn ghost sm" href="#/verificar/${e.certificate.folio}">Ver</a></td></tr>`; }).join('') || '<tr><td colspan="6" class="empty">Aún no se han emitido constancias.</td></tr>'}</tbody></table></div>
      <div style="height:3rem"></div></div>`;
  };

  views.adminSug = () => {
    if (!needAdmin()) return null;
    const list = Store.db.suggestions || [];
    return `<div class="wrap"><div class="page-head"><h1>Administración</h1></div>${adminTabs('sug')}
      <div class="card table-wrap"><table><thead><tr><th>Tema sugerido</th><th>Comentario</th><th>Estudiante</th><th>Fecha</th><th></th></tr></thead>
      <tbody>${list.map(x => `<tr><td><b>${esc(x.topic)}</b></td><td class="small">${esc(x.note || '—')}</td><td class="small">${esc(x.name)}</td><td class="small">${fmtDate(x.createdAt)}</td><td><button class="btn ghost sm" data-del="${x.id}">Archivar</button></td></tr>`).join('') || '<tr><td colspan="5" class="empty">Aún no hay sugerencias.</td></tr>'}</tbody></table></div>
      <div style="height:3rem"></div></div>`;
  };
  views.adminSug.mount = () => { $$('[data-del]').forEach(b => b.onclick = () => { Store.deleteSuggestion(b.dataset.del); toast('Sugerencia archivada'); render(true); }); };

  // Editor de cursos
  const COLORS = ['#0E8A6A', '#2F5FD0', '#B4532A', '#7A3FB8', '#0B2A3C', '#C23B6B', '#1F8FB3', '#8A6D1D'];
  let draft = null;
  views.adminCourse = (q, id) => {
    if (!needAdmin()) return null;
    if (!draft || draft._for !== id) {
      const base = id === 'nuevo' ? { id: Store.uid('c-'), title: '', category: 'Habilidades blandas', level: 'Básico', hours: 2, color: COLORS[0], glyph: 'star', published: false, objective: '', summary: '', description: '', lessons: [{ id: Store.uid('l'), title: '', type: 'text', minutes: 10, url: '', content: '' }], quiz: { passing: 70, questions: [{ q: '', options: ['', '', '', ''], answer: 0 }] } } : Store.course(id);
      if (!base) return notFound();
      draft = JSON.parse(JSON.stringify(base)); draft._for = id; draft._new = id === 'nuevo';
    }
    const d = draft;
    return `<div class="wrap" style="max-width:900px">
      <div class="page-head row between"><div><a href="#/admin" class="small">← Cursos</a><h1 style="margin-top:.4rem">${d._new ? 'Nuevo curso' : 'Editar curso'}</h1></div>
        <div class="row">${d._new ? '' : `<button class="btn danger sm" id="delCourse">Eliminar</button>`}<button class="btn" id="saveCourse">Guardar curso</button></div></div>
      <form id="courseForm" class="stack" onsubmit="return false">
        <div class="card pad form">
          <h3>Información general</h3>
          <div class="field"><label>Título del curso</label><input type="text" data-k="title" value="${esc(d.title)}" placeholder="Ej. Excel para el trabajo"></div>
          <div class="grid-2">
            <div class="field"><label>Categoría</label><input type="text" data-k="category" value="${esc(d.category)}" list="cats"><datalist id="cats">${[...new Set(Store.courses(true).map(c => c.category))].map(c => `<option value="${esc(c)}">`).join('')}</datalist></div>
            <div class="grid-2"><div class="field"><label>Nivel</label><select data-k="level">${['Básico', 'Intermedio', 'Avanzado'].map(l => `<option ${d.level === l ? 'selected' : ''}>${l}</option>`).join('')}</select></div>
            <div class="field"><label>Horas</label><input type="number" min="1" data-k="hours" value="${d.hours}"></div></div>
          </div>
          <div class="field"><label>Objetivo de aprendizaje</label><input type="text" data-k="objective" value="${esc(d.objective || '')}" placeholder="Qué será capaz de hacer el estudiante al terminar"></div>
          <div class="field"><label>Resumen (tarjeta del catálogo)</label><input type="text" data-k="summary" value="${esc(d.summary)}" maxlength="140"></div>
          <div class="field"><label>Descripción</label><textarea data-k="description">${esc(d.description)}</textarea></div>
          <div class="grid-2">
            <div class="field"><label>Color</label><div class="color-pick">${COLORS.map((c, i) => `<input type="radio" name="color" id="col${i}" value="${c}" ${d.color === c ? 'checked' : ''}><label for="col${i}" style="background:${c}" title="${c}"></label>`).join('')}</div></div>
            <div class="field"><label>Ícono</label><select data-k="glyph">${Object.keys(glyphs).map(g => `<option value="${g}" ${d.glyph === g ? 'selected' : ''}>${{ grid: 'Hoja de cálculo', people: 'Equipo', doc: 'Documento', chat: 'Conversación', clock: 'Reloj', star: 'Estrella' }[g]}</option>`).join('')}</select></div>
          </div>
          <label class="row" style="gap:.5rem;font-weight:600"><input type="checkbox" data-k="published" ${d.published ? 'checked' : ''} style="width:18px;height:18px;accent-color:var(--primary)"> Publicado (visible en el catálogo)</label>
        </div>

        <div class="card pad">
          <div class="row between" style="margin-bottom:1rem"><h3 style="margin:0">Lecciones</h3><button class="btn ghost sm" data-act="addLesson">+ Agregar lección</button></div>
          ${d.lessons.map((l, i) => `<div class="editor-block" data-lesson="${i}">
            <div class="row between"><b>Lección ${i + 1}</b><div class="row" style="gap:.3rem"><button class="btn ghost sm" data-act="up" data-i="${i}" title="Subir">${I.up}</button><button class="btn ghost sm" data-act="down" data-i="${i}" title="Bajar">${I.down}</button><button class="btn danger sm" data-act="delLesson" data-i="${i}">Quitar</button></div></div>
            <div class="form">
              <div class="field"><label>Título</label><input type="text" data-l="title" value="${esc(l.title)}"></div>
              <div class="grid-2"><div class="field"><label>Tipo</label><select data-l="type">${Object.keys(typeLabel).map(t => `<option value="${t}" ${l.type === t ? 'selected' : ''}>${typeLabel[t]}</option>`).join('')}</select></div>
                <div class="field"><label>Duración (min)</label><input type="number" min="1" data-l="minutes" value="${l.minutes}"></div></div>
              <div class="field"><label>Enlace del video o documento</label><input type="url" data-l="url" value="${esc(l.url || '')}" placeholder="https://www.youtube.com/watch?v=… o enlace a PDF / Google Drive"><small>Para videos: YouTube o Vimeo. Para documentos: enlace a PDF, Drive, etc.</small></div>
              <div class="field"><label>Contenido de la lección</label><textarea data-l="content" placeholder="Texto de la lección. Deja una línea en blanco entre párrafos.">${esc(l.content)}</textarea></div>
            </div></div>`).join('')}
        </div>

        <div class="card pad">
          <div class="row between" style="margin-bottom:1rem"><h3 style="margin:0">Evaluación final</h3><button class="btn ghost sm" data-act="addQ">+ Agregar pregunta</button></div>
          <div class="field" style="max-width:240px;margin-bottom:1rem"><label>Calificación aprobatoria (%)</label><input type="number" min="1" max="100" id="passing" value="${d.quiz.passing}"></div>
          ${d.quiz.questions.map((qq, i) => `<div class="editor-block" data-q="${i}">
            <div class="row between"><b>Pregunta ${i + 1}</b><button class="btn danger sm" data-act="delQ" data-i="${i}">Quitar</button></div>
            <div class="form"><div class="field"><input type="text" data-qq="q" value="${esc(qq.q)}" placeholder="Escribe la pregunta"></div>
            ${qq.options.map((o, j) => `<div class="row" style="flex-wrap:nowrap"><input type="radio" name="ans${i}" value="${j}" ${qq.answer === j ? 'checked' : ''} title="Respuesta correcta" style="width:18px;height:18px;accent-color:var(--primary);flex:none"><input type="text" data-opt="${j}" value="${esc(o)}" placeholder="Opción ${j + 1}"></div>`).join('')}
            <small class="muted">Marca el círculo de la respuesta correcta.</small></div></div>`).join('')}
        </div>
        <div class="row" style="justify-content:flex-end;padding-bottom:3rem"><button class="btn" id="saveCourse2">Guardar curso</button></div>
      </form></div>`;
  };
  function syncDraft() {
    const d = draft; const f = $('#courseForm'); if (!f) return;
    $$('[data-k]', f).forEach(el => { const k = el.dataset.k; d[k] = el.type === 'checkbox' ? el.checked : el.type === 'number' ? Number(el.value) || 1 : el.value; });
    const col = f.querySelector('input[name=color]:checked'); if (col) d.color = col.value;
    $$('[data-lesson]', f).forEach(b => { const l = d.lessons[b.dataset.lesson]; $$('[data-l]', b).forEach(el => { l[el.dataset.l] = el.type === 'number' ? Number(el.value) || 1 : el.value; }); });
    d.quiz.passing = Math.min(100, Math.max(1, Number($('#passing').value) || 70));
    $$('[data-q]', f).forEach(b => { const i = b.dataset.q; const qq = d.quiz.questions[i]; qq.q = $('[data-qq=q]', b).value; $$('[data-opt]', b).forEach(el => qq.options[el.dataset.opt] = el.value); const a = b.querySelector(`input[name=ans${i}]:checked`); qq.answer = a ? Number(a.value) : 0; });
  }
  views.adminCourse.mount = (q, id) => {
    const f = $('#courseForm'); if (!f) return;
    f.addEventListener('click', ev => {
      const b = ev.target.closest('[data-act]'); if (!b) return; ev.preventDefault(); syncDraft();
      const i = Number(b.dataset.i), L = draft.lessons, Q = draft.quiz.questions;
      ({
        addLesson: () => L.push({ id: Store.uid('l'), title: '', type: 'text', minutes: 10, url: '', content: '' }),
        delLesson: () => { if (L.length > 1) L.splice(i, 1); else toast('El curso necesita al menos una lección'); },
        up: () => { if (i > 0) [L[i - 1], L[i]] = [L[i], L[i - 1]]; },
        down: () => { if (i < L.length - 1) [L[i + 1], L[i]] = [L[i], L[i + 1]]; },
        addQ: () => Q.push({ q: '', options: ['', '', '', ''], answer: 0 }),
        delQ: () => { if (Q.length > 1) Q.splice(i, 1); else toast('La evaluación necesita al menos una pregunta'); }
      })[b.dataset.act]();
      const y = window.scrollY; render(true); window.scrollTo(0, y);
    });
    const save = () => {
      syncDraft(); const d = draft;
      if (!d.title.trim()) { toast('Escribe el título del curso'); return; }
      if (d.lessons.some(l => !l.title.trim())) { toast('Cada lección necesita un título'); return; }
      if (d.quiz.questions.some(x => !x.q.trim() || x.options.some(o => !o.trim()))) { toast('Completa todas las preguntas y opciones'); return; }
      const clean = JSON.parse(JSON.stringify(d)); delete clean._for; delete clean._new;
      Store.saveCourse(clean); draft = null; toast('Curso guardado'); go('#/admin');
    };
    $('#saveCourse').onclick = save; $('#saveCourse2').onclick = save;
    const del = $('#delCourse'); if (del) del.onclick = () => { if (confirm('¿Eliminar este curso y sus inscripciones?')) { Store.deleteCourse(id); draft = null; toast('Curso eliminado'); go('#/admin'); } };
  };

  /* ---------- Utilidades de ruta ---------- */
  function needLogin() {
    const u = Store.currentUser();
    if (!u) { const next = location.hash.slice(1); setTimeout(() => go('#/entrar?next=' + encodeURIComponent(next))); return null; }
    return u;
  }
  function notFound() { return `<div class="narrow section center"><h1>Página no encontrada</h1><p class="muted">Lo que buscas no existe o fue movido.</p><a class="btn" href="#/">Ir al inicio</a></div>`; }

  const routes = [
    [/^\/?$/, 'home'], [/^\/cursos$/, 'catalog'], [/^\/curso\/([\w-]+)$/, 'course'],
    [/^\/aprender\/([\w-]+)\/([\w-]+)$/, 'lesson'], [/^\/evaluacion\/([\w-]+)$/, 'quiz'],
    [/^\/constancia\/([\w-]+)$/, 'certificate'], [/^\/verificar(?:\/(.+))?$/, 'verify'],
    [/^\/entrar$/, 'login'], [/^\/registro$/, 'register'], [/^\/panel$/, 'dashboard'], [/^\/perfil$/, 'profile'],
    [/^\/admin$/, 'admin'], [/^\/admin\/estudiantes$/, 'adminStudents'], [/^\/admin\/constancias$/, 'adminCerts'], [/^\/admin\/sugerencias$/, 'adminSug'], [/^\/ayuda$/, 'help'], [/^\/admin\/curso\/([\w-]+)$/, 'adminCourse']
  ];
  let lastPath = null;
  function render(keepScroll) {
    const raw = location.hash.slice(1) || '/';
    const [path, qs] = raw.split('?');
    const q = new URLSearchParams(qs || '');
    renderTopbar(path);
    if (!path.startsWith('/admin/curso')) draft = null;
    for (const [re, name] of routes) {
      const m = path.match(re);
      if (m) {
        const html = views[name](q, ...m.slice(1));
        if (html !== null) app.innerHTML = html;
        views[name].mount && views[name].mount(q, ...m.slice(1));
        if (!keepScroll && path !== lastPath) window.scrollTo(0, 0);
        lastPath = path;
        const h = $('h1', app); document.title = (h && path !== '/' ? h.textContent + ' · ' : '') + 'EduWork · Capacitación para estudiantes';
        return;
      }
    }
    app.innerHTML = notFound();
  }

  window.addEventListener('hashchange', () => render());
  Store.init().then(() => render());
})();
