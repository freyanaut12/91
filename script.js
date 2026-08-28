(() => {
  'use strict';

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- year ---------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- nav scroll state ---------- */
  const nav = document.getElementById('nav');
  const onScroll = () => {
    if (window.scrollY > 12) nav.classList.add('is-scrolled');
    else nav.classList.remove('is-scrolled');
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---------- mobile nav toggle ---------- */
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });
  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      navLinks.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });

  /* ---------- live timecode (fake, cosmetic) ---------- */
  const heroTc = document.getElementById('heroTimecode');
  const footerTc = document.getElementById('footerTimecode');
  const startTime = Date.now();

  const pad = (n) => String(n).padStart(2, '0');

  const tick = () => {
    const elapsedMs = Date.now() - startTime;
    const totalSeconds = Math.floor(elapsedMs / 1000);
    const hh = Math.floor(totalSeconds / 3600);
    const mm = Math.floor((totalSeconds % 3600) / 60);
    const ss = totalSeconds % 60;
    const ff = Math.floor((elapsedMs % 1000) / 40); // ~25fps counter
    const str = `${pad(hh)}:${pad(mm)}:${pad(ss)}:${pad(ff)}`;
    if (heroTc) heroTc.textContent = str;
    if (footerTc) footerTc.textContent = str;
  };

  if (!prefersReducedMotion) {
    tick();
    setInterval(tick, 40);
  } else if (heroTc) {
    heroTc.textContent = '00:00:00:00';
  }

  /* ---------- track accordions ---------- */
  const tracks = document.querySelectorAll('[data-track]');
  tracks.forEach((track, i) => {
    const head = track.querySelector('.track__head');
    head.addEventListener('click', () => {
      const isOpen = track.hasAttribute('data-open');
      // close others for a clean single-focus feel
      tracks.forEach(t => {
        t.removeAttribute('data-open');
        t.querySelector('.track__head').setAttribute('aria-expanded', 'false');
      });
      if (!isOpen) {
        track.setAttribute('data-open', '');
        head.setAttribute('aria-expanded', 'true');
      }
    });
    if (i === 0) {
      track.setAttribute('data-open', '');
      head.setAttribute('aria-expanded', 'true');
    }
  });

  /* ---------- scroll reveal ---------- */
  const revealEls = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window && !prefersReducedMotion) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('is-visible'));
  }

  /* ---------- process scrubber fill on scroll ---------- */
  const scrubberFill = document.getElementById('scrubberFill');
  const scrubber = document.querySelector('.scrubber');
  if (scrubberFill && scrubber && 'IntersectionObserver' in window) {
    const io2 = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          scrubberFill.style.width = '100%';
          io2.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });
    io2.observe(scrubber);
  } else if (scrubberFill) {
    scrubberFill.style.width = '100%';
  }

})();
