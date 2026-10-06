/* Maria & Jakub — interakcje. Czysty JS; GSAP/ScrollTrigger tylko do animacji wejścia. */
(function () {
  'use strict';
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Cuenta atrás (sábado 15 de mayo de 2027, 14:00, czas polski = CEST) ---------- */
  var target = new Date('2027-05-15T14:00:00+02:00').getTime();
  var cd = { d: $('[data-cd="d"]'), h: $('[data-cd="h"]'), m: $('[data-cd="m"]'), s: $('[data-cd="s"]') };
  function pad(n, l) { n = String(n); while (n.length < l) n = '0' + n; return n; }
  function tick() {
    var diff = Math.max(0, target - Date.now());
    var s = Math.floor(diff / 1000);
    cd.d.textContent = pad(Math.floor(s / 86400), 3);
    cd.h.textContent = pad(Math.floor(s % 86400 / 3600), 2);
    cd.m.textContent = pad(Math.floor(s % 3600 / 60), 2);
    cd.s.textContent = pad(s % 60, 2);
    if (diff === 0) { $('#cd-done').hidden = false; }
  }
  tick(); setInterval(tick, 1000);
  /* Un único barrido plateado al cargar (en táctil no hay hover) */
  var frame = $('#countdown');
  if (!reduce) setTimeout(function () { frame.classList.add('sweep'); }, 900);

  /* ---------- Luces titilantes del hero (solo opacity/transform, en pausa fuera de pantalla) ---------- */
  var sp = $('#sparks');
  if (sp && !reduce) {
    var N = window.innerWidth < 768 ? 22 : 40, seed = 7, rnd = function () { seed = (seed * 16807) % 2147483647; return seed / 2147483647; };
    for (var i = 0; i < N; i++) {
      var s = document.createElement('i'); s.className = 'spark';
      var size = 2 + rnd() * 3.5;
      s.style.cssText = 'left:' + (rnd() * 100).toFixed(1) + '%;top:' + (4 + rnd() * 62).toFixed(1) + '%;--s:' + size.toFixed(1) + 'px;--d:' + (1.8 + rnd() * 3.2).toFixed(2) + 's;--l:-' + (rnd() * 5).toFixed(2) + 's';
      sp.appendChild(s);
    }
    if ('IntersectionObserver' in window) new IntersectionObserver(function (en) { sp.classList.toggle('paused', !en[0].isIntersecting); }).observe($('#inicio'));
  } else if (sp) { for (var k = 0; k < 18; k++) { var d = document.createElement('i'); d.className = 'spark'; d.style.cssText = 'left:' + (k * 5.7 % 100) + '%;top:' + (10 + k * 11 % 55) + '%;--s:3px;--d:1s;--l:0s'; sp.appendChild(d); } }

  /* ---------- Scroll más lento y suave (Lenis): rueda al 55%, táctil nativo ---------- */
  var lenis = null;
  if (!reduce && window.Lenis) {
    lenis = new Lenis({ lerp: 0.07, wheelMultiplier: 0.55, smoothWheel: true });
    (function raf(t) { lenis.raf(t); requestAnimationFrame(raf); })(performance.now());
    document.addEventListener('click', function (e) {
      var a = e.target.closest && e.target.closest('a[href^="#"]');
      if (!a || a.getAttribute('href').length < 2) return;
      var el = document.querySelector(a.getAttribute('href'));
      if (!el) return;
      e.preventDefault();
      var hh = document.getElementById('site-header').getBoundingClientRect().height;
      lenis.scrollTo(el, { offset: -hh, duration: 1.8, easing: function (x) { return 1 - Math.pow(1 - x, 3); } });
      history.pushState(null, '', a.getAttribute('href'));
    });
  }
  function lockScroll(on) { document.documentElement.style.overflow = on ? 'hidden' : ''; if (lenis) { on ? lenis.stop() : lenis.start(); } }

  /* ---------- Header y menú ---------- */
  var header = $('#site-header'), menu = $('#menu'), btn = $('#menu-btn');
  function onScroll() { header.classList.toggle('scrolled', window.scrollY > 24); }
  window.addEventListener('scroll', onScroll, { passive: true }); onScroll();

  function setMenu(open) {
    menu.classList.toggle('open', open);
    menu.setAttribute('aria-hidden', String(!open));
    header.classList.toggle('menu-open', open);
    btn.setAttribute('aria-expanded', String(open));
    btn.setAttribute('aria-label', open ? 'Zamknij menu' : 'Otwórz menu');
    lockScroll(open);
    if (open) { var f = $('a', menu); if (f) f.focus({ preventScroll: true }); }
  }
  btn.addEventListener('click', function () { setMenu(!menu.classList.contains('open')); });
  $$('a', menu).forEach(function (a) { a.addEventListener('click', function () { setMenu(false); }); });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && menu.classList.contains('open')) { setMenu(false); btn.focus(); }
  });
  window.matchMedia('(min-width: 1200px)').addEventListener('change', function (m) { if (m.matches) setMenu(false); });

  /* Enlace activo en la navegación */
  var navLinks = $$('.nav a.navlink');
  if ('IntersectionObserver' in window) {
    var secs = $$('main > section[id]');
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        navLinks.forEach(function (a) { a.setAttribute('aria-current', String(a.getAttribute('href') === '#' + en.target.id)); });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    secs.forEach(function (s) { io.observe(s); });
  }

  /* ---------- Reveals con GSAP (contenidos: fade + slide-up 400ms) ---------- */
  function initReveal() {
    if (reduce || !window.gsap || !window.ScrollTrigger) return;
    gsap.registerPlugin(ScrollTrigger);
    document.documentElement.classList.add('js-reveal');
    ScrollTrigger.batch('[data-reveal]', {
      start: 'top 92%', once: true,
      onEnter: function (els) {
        gsap.to(els, { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out', stagger: 0.08, overwrite: true });
      }
    });
    /* Nuestra historia: entrada propia, más elaborada (el único pasaje que la lleva) */
    $$('.hito').forEach(function (h) {
      var img = $('.hito-img', h), pic = $('img', h), txt = $$('.hito-txt > *', h);
      var tl = gsap.timeline({ scrollTrigger: { trigger: h, start: 'top 72%', once: true }, defaults: { ease: 'power3.out' } });
      tl.to(img, { clipPath: 'inset(0 0 0% 0)', duration: 0.9 }, 0)
        .to(pic, { scale: 1, duration: 1.1 }, 0)
        .to(txt, { opacity: 1, y: 0, duration: 0.5, stagger: 0.09 }, 0.35);
      h.classList.add('hito-armed');
      ScrollTrigger.create({ trigger: h, start: 'top 72%', once: true, onEnter: function () { h.classList.add('hito-in'); } });
    });
    window.addEventListener('load', function () { ScrollTrigger.refresh(); });
  }
  if (document.readyState === 'complete' || document.readyState === 'interactive') initReveal();
  else document.addEventListener('DOMContentLoaded', initReveal);

  /* Mapas: el iframe no captura el scroll hasta que se pulsa */
  $$('.map').forEach(function (m) {
    m.addEventListener('click', function () { m.classList.add('active'); });
    m.addEventListener('mouseleave', function () { m.classList.remove('active'); });
  });
  document.addEventListener('touchstart', function (e) { $$('.map.active').forEach(function (m) { if (!m.contains(e.target)) m.classList.remove('active'); }); }, { passive: true });

  /* ---------- FAQ ---------- */
  $$('.faq-q').forEach(function (q) {
    q.addEventListener('click', function () {
      var open = q.getAttribute('aria-expanded') === 'true';
      q.setAttribute('aria-expanded', String(!open));
      $('#' + q.getAttribute('aria-controls')).classList.toggle('open', !open);
    });
  });

  /* ---------- Galería + lightbox ---------- */
  var gal = $('#gallery'), shots = $$('button', gal), lb = $('#lb'), lbImg = $('#lb-img'), lbCap = $('#lb-cap');
  var cur = 0, lastFocus = null;
  function show(i) {
    cur = (i + shots.length) % shots.length;
    var im = $('img', shots[cur]);
    lbImg.src = im.currentSrc || im.src; lbImg.alt = im.alt; lbCap.textContent = im.alt + ' · ' + (cur + 1) + ' / ' + shots.length;
  }
  function openLb(i) {
    lastFocus = document.activeElement; show(i);
    lb.classList.add('open'); lb.setAttribute('aria-hidden', 'false');
    lockScroll(true);
    $('.lb-close', lb).focus();
  }
  function closeLb() {
    lb.classList.remove('open'); lb.setAttribute('aria-hidden', 'true');
    lockScroll(false);
    if (lastFocus) lastFocus.focus();
  }
  shots.forEach(function (b, i) { b.addEventListener('click', function () { openLb(i); }); b.setAttribute('aria-label', 'Powiększ zdjęcie ' + (i + 1) + ' z ' + shots.length); });
  $('.lb-close', lb).addEventListener('click', closeLb);
  $('.lb-prev', lb).addEventListener('click', function () { show(cur - 1); });
  $('.lb-next', lb).addEventListener('click', function () { show(cur + 1); });
  lb.addEventListener('click', function (e) { if (e.target === lb) closeLb(); });
  document.addEventListener('keydown', function (e) {
    if (!lb.classList.contains('open')) return;
    if (e.key === 'Escape') closeLb();
    else if (e.key === 'ArrowLeft') show(cur - 1);
    else if (e.key === 'ArrowRight') show(cur + 1);
    else if (e.key === 'Tab') {
      var f = $$('button', lb), first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });
  var sx = null;
  lb.addEventListener('touchstart', function (e) { sx = e.touches[0].clientX; }, { passive: true });
  lb.addEventListener('touchend', function (e) {
    if (sx === null) return;
    var dx = e.changedTouches[0].clientX - sx; sx = null;
    if (Math.abs(dx) > 50) show(cur + (dx < 0 ? 1 : -1));
  });
  /* Contador del carrusel móvil */
  var gc = $('#gal-count');
  gal.addEventListener('scroll', function () {
    var w = shots[0].offsetWidth + 12;
    gc.textContent = (Math.min(shots.length, Math.round(gal.scrollLeft / w) + 1)) + ' / ' + shots.length + ' · przesuń';
  }, { passive: true });

  /* ---------- IBAN: copiar ---------- */
  var copyBtn = $('#copy-iban');
  copyBtn.addEventListener('click', function () {
    var txt = $('#iban').textContent, lab = $('#copy-lab');
    function done() { lab.textContent = 'Skopiowano'; setTimeout(function () { lab.textContent = 'Kopiuj'; }, 1800); }
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(txt).then(done, done); else done();
  });

  /* ---------- RSVP ---------- */
  var form = $('#rsvp-form'), ok = $('#rsvp-ok');
  var out = $('#acomp-out'), hid = $('#osoby'), minus = $('#acomp-minus'), plus = $('#acomp-plus'), stepper = $('#stepper');
  var n = 0;
  function setN(v) {
    n = Math.max(0, Math.min(4, v)); out.textContent = n; hid.value = n;
    minus.disabled = n === 0 || stepper.classList.contains('is-off'); plus.disabled = n === 4 || stepper.classList.contains('is-off');
  }
  minus.addEventListener('click', function () { setN(n - 1); });
  plus.addEventListener('click', function () { setN(n + 1); });
  setN(0);
  $$('input[name="obecnosc"]').forEach(function (r) {
    r.addEventListener('change', function () {
      var no = r.value.indexOf('Nie') === 0 && r.checked;
      stepper.classList.toggle('is-off', no);
      if (no) { n = 0; }
      setN(n); $('#e-asiste').classList.remove('show');
    });
  });
  function setErr(id, field, on) {
    $('#' + id).classList.toggle('show', on);
    if (field) field.setAttribute('aria-invalid', on ? 'true' : 'false');
  }
  function validate() {
    var bad = [], nombre = $('#imie');
    var okName = nombre.value.trim().split(/\s+/).filter(Boolean).length >= 2;
    setErr('e-imie', nombre, !okName); if (!okName) bad.push(nombre);
    var chosen = $('input[name="obecnosc"]:checked');
    setErr('e-asiste', null, !chosen); if (!chosen) bad.push($('input[name="obecnosc"]'));
    return { bad: bad, chosen: chosen, nombre: nombre.value.trim() };
  }
  $('#imie').addEventListener('input', function () { if (this.getAttribute('aria-invalid') === 'true' && this.value.trim().split(/\s+/).length >= 2) setErr('e-imie', this, false); });

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    $('#e-send').classList.remove('show');
    var v = validate();
    if (v.bad.length) { v.bad[0].focus(); return; }
    if ($('input[name="_honey"]', form).value) return;
    var submit = $('#rsvp-submit'); submit.disabled = true; submit.style.opacity = '.6';
    var data = new FormData(form);
    /* Envío real sin backend: FormSubmit en modo AJAX con el mismo email del action */
    var endpoint = form.action.replace('formsubmit.co/', 'formsubmit.co/ajax/');
    /* El email de ejemplo usa el TLD reservado .example: FormSubmit no puede entregar ahí.
       En la demo se simula el envío; con un email real (sin .example) el fetch es real. */
    if (/\.example$/.test(form.action)) { setTimeout(function () { success(v); }, 600); return; }
    fetch(endpoint, { method: 'POST', body: data, headers: { 'Accept': 'application/json' } })
      .then(function (r) { if (!r.ok) throw new Error('http ' + r.status); return r.json(); })
      .then(function (j) { if (j && String(j.success) === 'false') throw new Error(j.message || 'rechazado'); success(v); })
      .catch(function () { submit.disabled = false; submit.style.opacity = ''; $('#e-send').classList.add('show'); });
  });
  function success(v) {
    var first = v.nombre.split(/\s+/)[0], yes = v.chosen.value.indexOf('Tak') === 0;
    $('#ok-title').textContent = yes ? 'Dziękujemy, ' + first : 'Dziękujemy za odpowiedź, ' + first;
    $('#ok-text').textContent = yes
      ? 'Otrzymaliśmy Twoje potwierdzenie. Czekamy na Ciebie w sobotę 15 maja 2027: ceremonia o 14:00 w Ogrodzie Botanicznym, przyjęcie o 16:00 w Pałacyku Dobrzańskich.'
      : 'Przykro nam, że nie możesz być z nami. Zapisaliśmy Twoją odpowiedź i będziemy o Tobie myśleć tego dnia. Jeśli coś się zmieni, napisz do nas.';
    form.style.display = 'none'; ok.classList.add('show'); ok.focus({ preventScroll: true });
    ok.scrollIntoView({ block: 'center', behavior: reduce ? 'auto' : 'smooth' });
  }
  $('#rsvp-again').addEventListener('click', function () {
    form.reset(); setN(0); stepper.classList.remove('is-off'); setN(0);
    var s = $('#rsvp-submit'); s.disabled = false; s.style.opacity = '';
    ok.classList.remove('show'); form.style.display = ''; $('#imie').focus();
  });
})();
