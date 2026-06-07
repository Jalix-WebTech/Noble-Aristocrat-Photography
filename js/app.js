/* ================================================================
   APP.JS — Core interactions for Noble Aristocrat Photography
   Handles: config, splash screen, sticky header + mobile menu,
   scroll-spy, hero slider, parallax, scroll reveal, counters,
   portfolio render + filtering, lightbox, testimonials, WhatsApp
   button, and footer year.
   Developed by: Jalixon — https://jalixon.vercel.app/
================================================================ */
(function () {
  'use strict';

  /* ---- GLOBAL CONFIG ----
     Exposed on window so chatbot.js and booking.js can reuse it.
     Update this single number to change the WhatsApp target. */
  const WHATSAPP_NUMBER = '15550142090'; // international format, no '+' or spaces
  window.NOBLE = { WHATSAPP_NUMBER: WHATSAPP_NUMBER };

  /* ============ 1. SPLASH SCREEN ============
     Hide once all assets load; fallback timer guarantees it never sticks. */
  const splash = document.getElementById('splash');
  function hideSplash() {
    splash.classList.add('hidden');
    document.body.classList.remove('no-scroll');
  }
  // Splash stays visible for a minimum of 8 seconds for a premium, deliberate entrance.
  // We combine the page 'load' event with an 8s minimum so it never vanishes too early.
  const SPLASH_MIN_MS = 8000;
  const splashStart = Date.now();
  function hideSplashAfterMin() {
    const elapsed = Date.now() - splashStart;
    const remaining = Math.max(0, SPLASH_MIN_MS - elapsed);
    setTimeout(hideSplash, remaining);
  }
  window.addEventListener('load', hideSplashAfterMin);
  setTimeout(hideSplash, SPLASH_MIN_MS + 2000); // safety fallback in case 'load' never fires

  /* ============ 2. STICKY HEADER + MOBILE MENU ============ */
  const header = document.getElementById('header');
  const burger = document.getElementById('burger');
  const navLinks = document.getElementById('navLinks');

  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 40);
  });
  function toggleMenu() {
    const opening = !navLinks.classList.contains('open');
    burger.classList.toggle('open', opening);
    navLinks.classList.toggle('open', opening);
    // 'menu-open' disables the header glass blur so the menu stays fully opaque,
    // and locks body scroll so background content can't move behind the menu.
    document.body.classList.toggle('menu-open', opening);
    document.body.classList.toggle('no-scroll', opening);
  }
  function closeMenu() {
    burger.classList.remove('open');
    navLinks.classList.remove('open');
    document.body.classList.remove('menu-open');
    document.body.classList.remove('no-scroll');
  }
  burger.addEventListener('click', toggleMenu);
  burger.addEventListener('keypress', e => { if (e.key === 'Enter') toggleMenu(); });
  // Close menu after clicking a link (mobile UX)
  navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));

  /* ============ 3. ACTIVE NAV HIGHLIGHT (scroll spy) ============ */
  const sections = document.querySelectorAll('section[id]');
  const linkMap = {};
  navLinks.querySelectorAll('a').forEach(a => linkMap[a.getAttribute('href').slice(1)] = a);
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(s => { if (window.scrollY >= s.offsetTop - 200) current = s.id; });
    Object.values(linkMap).forEach(a => a.classList.remove('active'));
    if (linkMap[current]) linkMap[current].classList.add('active');
  });

  /* ============ 4. HERO BACKGROUND SLIDER ============ */
  const slides = document.querySelectorAll('.hero-slide');
  const dotsWrap = document.getElementById('heroDots');
  let heroIdx = 0;
  slides.forEach((_, i) => {
    const b = document.createElement('button');
    if (i === 0) b.classList.add('active');
    b.addEventListener('click', () => goToSlide(i));
    dotsWrap.appendChild(b);
  });
  const dots = dotsWrap.querySelectorAll('button');
  function goToSlide(i) {
    slides[heroIdx].classList.remove('active');
    dots[heroIdx].classList.remove('active');
    heroIdx = i;
    slides[heroIdx].classList.add('active');
    dots[heroIdx].classList.add('active');
  }
  setInterval(() => goToSlide((heroIdx + 1) % slides.length), 6000);

  /* ============ 5. PARALLAX on hero (subtle, performance-friendly) ============ */
  const heroSlides = document.getElementById('heroSlides');
  window.addEventListener('scroll', () => {
    const offset = window.scrollY;
    if (offset < window.innerHeight) heroSlides.style.transform = `translateY(${offset * 0.3}px)`;
  });

  /* ============ 6. SCROLL REVEAL (IntersectionObserver) ============ */
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add('visible'); revealObserver.unobserve(en.target); } });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  /* ============ 7. COUNTER ANIMATION ============ */
  const counters = document.querySelectorAll('[data-count]');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(en => {
      if (!en.isIntersecting) return;
      const el = en.target, target = +el.dataset.count;
      let n = 0; const step = Math.max(1, Math.floor(target / 60));
      const tick = () => { n += step; if (n >= target) { el.textContent = target; } else { el.textContent = n; requestAnimationFrame(tick); } };
      tick();
      counterObserver.unobserve(el);
    });
  }, { threshold: 0.5 });
  counters.forEach(c => counterObserver.observe(c));

  /* ============ 8. PORTFOLIO DATA + RENDER ============
     Stored as data so the gallery is easy to extend or wire to a CMS. */
  const portfolio = [
    { src:'https://images.pexels.com/photos/3775262/pexels-photo-3775262.jpeg',  cat:'weddings',  title:'The Vow' },
    { src:'https://images.pexels.com/photos/32632274/pexels-photo-32632274.jpeg', cat:'weddings',  title:'Vintage Romance' },
    { src:'https://images.pexels.com/photos/17935621/pexels-photo-17935621.jpeg', cat:'weddings',  title:'Golden Hour' },
    { src:'https://images.pexels.com/photos/16120239/pexels-photo-16120239.jpeg', cat:'events',    title:'The Reception' },
    { src:'https://images.pexels.com/photos/16935999/pexels-photo-16935999.jpeg', cat:'events',    title:'Grand Banquet' },
    { src:'https://images.pexels.com/photos/33151443/pexels-photo-33151443.jpeg', cat:'events',    title:'Evening Toast' },
    { src:'https://images.pexels.com/photos/28446973/pexels-photo-28446973.jpeg', cat:'corporate', title:'The Executive' },
    { src:'https://images.pexels.com/photos/15126949/pexels-photo-15126949.jpeg', cat:'corporate', title:'Boardroom' },
    { src:'https://images.pexels.com/photos/37148345/pexels-photo-37148345.jpeg', cat:'portraits', title:'Presence' },
    { src:'https://images.pexels.com/photos/33290980/pexels-photo-33290980.jpeg', cat:'portraits', title:'The Gentleman' },
    { src:'https://images.pexels.com/photos/7095762/pexels-photo-7095762.jpeg',   cat:'products',  title:'Timepiece' },
    { src:'https://images.pexels.com/photos/16440585/pexels-photo-16440585.jpeg', cat:'products',  title:'Craftsmanship' }
  ];
  const grid = document.getElementById('portfolioGrid');
  function img(url, w) { return `${url}?auto=compress&cs=tinysrgb&fit=crop&w=${w}`; }
  portfolio.forEach((p, i) => {
    const d = document.createElement('div');
    d.className = 'pf-item';
    d.dataset.cat = p.cat;
    d.dataset.index = i;
    d.innerHTML = `<img src="${img(p.src,700)}" alt="${p.title}" loading="lazy">
      <div class="pf-overlay"><span class="cat">${p.cat}</span><span class="ttl">${p.title}</span><span class="plus">+</span></div>`;
    d.addEventListener('click', () => openLightbox(i));
    grid.appendChild(d);
  });

  /* ============ 9. PORTFOLIO FILTERING ============ */
  document.getElementById('filters').addEventListener('click', (e) => {
    const btn = e.target.closest('.filter-btn'); if (!btn) return;
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const f = btn.dataset.filter;
    document.querySelectorAll('.pf-item').forEach(item => {
      item.classList.toggle('hide', !(f === 'all' || item.dataset.cat === f));
    });
  });

  /* ============ 10. LIGHTBOX with prev/next ============ */
  const lb = document.getElementById('lightbox');
  const lbImg = document.getElementById('lbImg');
  const lbCap = document.getElementById('lbCaption');
  let lbIndex = 0;
  function openLightbox(i) {
    lbIndex = i;
    const p = portfolio[i];
    lbImg.src = img(p.src, 1400);
    lbCap.textContent = `${p.title} — ${p.cat}`;
    lb.classList.add('open');
    document.body.classList.add('no-scroll');
  }
  function closeLightbox() { lb.classList.remove('open'); document.body.classList.remove('no-scroll'); }
  function navLightbox(dir) {
    // Cycle only through currently visible (filtered) items
    const visible = [...document.querySelectorAll('.pf-item:not(.hide)')].map(el => +el.dataset.index);
    let pos = visible.indexOf(lbIndex);
    pos = (pos + dir + visible.length) % visible.length;
    openLightbox(visible[pos]);
  }
  document.getElementById('lbClose').addEventListener('click', closeLightbox);
  document.getElementById('lbPrev').addEventListener('click', () => navLightbox(-1));
  document.getElementById('lbNext').addEventListener('click', () => navLightbox(1));
  lb.addEventListener('click', e => { if (e.target === lb) closeLightbox(); });
  document.addEventListener('keydown', e => {
    if (!lb.classList.contains('open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') navLightbox(-1);
    if (e.key === 'ArrowRight') navLightbox(1);
  });

  /* ============ 11. TESTIMONIALS CAROUSEL ============ */
  const testimonials = [
    { stars:5, quote:'Noble Aristocrat didn\'t just photograph our wedding — they preserved the very feeling of the day. Every frame is a masterpiece.', name:'Isabella & James Hart', role:'Wedding · Lake Como', img:'https://images.pexels.com/photos/3775262/pexels-photo-3775262.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=120&h=120' },
    { stars:5, quote:'The most professional creative team we have ever commissioned. The imagery elevated our entire brand campaign.', name:'Marcus Reeves', role:'Creative Director · LUXE Group', img:'https://images.pexels.com/photos/28446973/pexels-photo-28446973.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=120&h=120' },
    { stars:5, quote:'Discreet, refined and astonishingly talented. They captured our gala with an artistry that left every guest speechless.', name:'Sophia Laurent', role:'Events Patron · Paris', img:'https://images.pexels.com/photos/37148345/pexels-photo-37148345.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=120&h=120' }
  ];
  const tcar = document.getElementById('tcarousel');
  tcar.innerHTML = testimonials.map((t, i) => `
    <div class="tslide ${i===0?'active':''}">
      <div class="tstars">${'★'.repeat(t.stars)}</div>
      <p class="tquote">"${t.quote}"</p>
      <div class="tauthor"><img src="${t.img}" alt="${t.name}"><div style="text-align:left"><b>${t.name}</b><span>${t.role}</span></div></div>
    </div>`).join('');
  const tslides = tcar.querySelectorAll('.tslide');
  let tIdx = 0;
  function showT(i) { tslides[tIdx].classList.remove('active'); tIdx = (i + tslides.length) % tslides.length; tslides[tIdx].classList.add('active'); }
  document.getElementById('tNext').addEventListener('click', () => showT(tIdx + 1));
  document.getElementById('tPrev').addEventListener('click', () => showT(tIdx - 1));
  setInterval(() => showT(tIdx + 1), 7000);

  /* ============ 12. WHATSAPP FLOATING BUTTON ============ */
  document.getElementById('waBtn').addEventListener('click', () => {
    const msg = encodeURIComponent('Hello Noble Aristocrat Photography! I would love to learn more about your luxury photography services.');
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, '_blank');
  });

  /* ============ 13. FOOTER YEAR ============ */
  document.getElementById('year').textContent = new Date().getFullYear();

})();
