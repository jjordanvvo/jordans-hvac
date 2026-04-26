/* ============================================================
   Jordan's Heating and Cooling — script.js
   ============================================================ */

(function () {
  'use strict';

  /* ---- Seasonal badge ---- */
  function setSeasonBadge() {
    const badge = document.getElementById('seasonBadge');
    if (!badge) return;
    const month = new Date().getMonth(); // 0-11
    const isSummer = month >= 4 && month <= 8; // May–Sep
    badge.textContent = isSummer
      ? '— STAY COOL THIS SUMMER · LICENSED HVAC EXPERTS'
      : '— STAY WARM THIS WINTER · LICENSED HVAC EXPERTS';
  }

  /* ---- Navbar scroll shadow ---- */
  function initNavbar() {
    const header = document.getElementById('header');
    if (!header) return;
    const onScroll = () => {
      header.classList.toggle('scrolled', window.scrollY > 8);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ---- Mobile drawer ---- */
  function initMobileMenu() {
    const hamburger   = document.getElementById('hamburger');
    const drawer      = document.getElementById('drawer');
    const overlay     = document.getElementById('drawerOverlay');
    const closeBtn    = document.getElementById('drawerClose');
    const drawerLinks = drawer ? drawer.querySelectorAll('.drawer__link') : [];

    if (!hamburger || !drawer) return;

    function openDrawer() {
      drawer.classList.add('open');
      drawer.setAttribute('aria-hidden', 'false');
      hamburger.classList.add('open');
      hamburger.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
      closeBtn && closeBtn.focus();
    }
    function closeDrawer() {
      drawer.classList.remove('open');
      drawer.setAttribute('aria-hidden', 'true');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
      hamburger.focus();
    }

    hamburger.addEventListener('click', openDrawer);
    closeBtn && closeBtn.addEventListener('click', closeDrawer);
    overlay  && overlay.addEventListener('click', closeDrawer);
    drawerLinks.forEach(link => link.addEventListener('click', closeDrawer));

    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && drawer.classList.contains('open')) closeDrawer();
    });
  }

  /* ---- Smooth scroll with offset ---- */
  function initSmoothScroll() {
    document.addEventListener('click', e => {
      const anchor = e.target.closest('a[href^="#"]');
      if (!anchor) return;
      const id = anchor.getAttribute('href').slice(1);
      if (!id) return;
      const target = document.getElementById(id);
      if (!target) return;
      e.preventDefault();
      const barH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--bar-h')) || 40;
      const navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 68;
      const offset = barH + navH + 12;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  }

  /* ---- Scroll reveal (all directional classes) ---- */
  function initScrollReveal() {
    const els = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right, .reveal-scale');
    if (!els.length) return;

    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.10, rootMargin: '0px 0px -36px 0px' });

    els.forEach(el => io.observe(el));
  }

  /* ---- Stat counters ---- */
  function initStatCounters() {
    const counters = document.querySelectorAll('.stat__num[data-target]');
    if (!counters.length) return;

    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        io.unobserve(entry.target);
        const el     = entry.target;
        const target = parseInt(el.dataset.target, 10);
        const suffix = el.dataset.suffix || '';
        const duration = 1600;
        const start = performance.now();

        function tick(now) {
          const elapsed  = now - start;
          const progress = Math.min(elapsed / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          const current = Math.floor(eased * target);
          el.textContent = current + suffix;
          if (progress < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
      });
    }, { threshold: 0.6 });

    counters.forEach(c => io.observe(c));
  }

  /* ---- FAQ accordion ---- */
  function initFAQ() {
    const items = document.querySelectorAll('.faq__item');
    if (!items.length) return;

    items.forEach(item => {
      const btn = item.querySelector('.faq__q');
      if (!btn) return;

      btn.addEventListener('click', () => {
        const isOpen = item.classList.contains('open');
        items.forEach(i => {
          i.classList.remove('open');
          const b = i.querySelector('.faq__q');
          if (b) b.setAttribute('aria-expanded', 'false');
        });
        if (!isOpen) {
          item.classList.add('open');
          btn.setAttribute('aria-expanded', 'true');
        }
      });
    });
  }

  /* ---- Back to top ---- */
  function initBackToTop() {
    const btn = document.getElementById('backToTop');
    if (!btn) return;

    const onScroll = () => {
      const show = window.scrollY > 500;
      btn.hidden = !show;
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    onScroll();
  }

  /* ---- Emergency float badge ---- */
  function initEmergFloat() {
    const trigger = document.getElementById('emergTrigger');
    const popup   = document.getElementById('emergPopup');
    const close   = document.getElementById('emergClose');
    if (!trigger || !popup) return;

    function openPopup() {
      popup.hidden = false;
      trigger.setAttribute('aria-expanded', 'true');
      close && close.focus();
    }
    function closePopup() {
      popup.hidden = true;
      trigger.setAttribute('aria-expanded', 'false');
      trigger.focus();
    }

    trigger.addEventListener('click', () => {
      popup.hidden ? openPopup() : closePopup();
    });
    close && close.addEventListener('click', closePopup);
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && !popup.hidden) closePopup();
    });
    document.addEventListener('click', e => {
      const float = document.getElementById('emergFloat');
      if (float && !float.contains(e.target) && !popup.hidden) closePopup();
    });
  }

  /* ---- Contact form validation ---- */
  function initContactForm() {
    const form      = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    const success   = document.getElementById('formSuccess');
    if (!form) return;

    function isValidEmail(v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); }
    function isValidPhone(v) { return /[\d\s\(\)\-\.]{7,}/.test(v); }

    function setFieldState(groupId, valid, msg) {
      const group = document.getElementById(groupId);
      if (!group) return;
      group.classList.toggle('valid',   valid);
      group.classList.toggle('invalid', !valid);
      const err = group.querySelector('.form-err');
      if (err) err.textContent = valid ? '' : msg;
    }

    const nameEl    = form.querySelector('#name');
    const phoneEl   = form.querySelector('#phone');
    const emailEl   = form.querySelector('#email');
    const serviceEl = form.querySelector('#service');

    nameEl && nameEl.addEventListener('blur', () => {
      const v = nameEl.value.trim();
      setFieldState('fg-name', v.length >= 2, 'Please enter your full name.');
    });
    phoneEl && phoneEl.addEventListener('blur', () => {
      const v = phoneEl.value.trim();
      setFieldState('fg-phone', isValidPhone(v), 'Please enter a valid phone number.');
    });
    emailEl && emailEl.addEventListener('blur', () => {
      const v = emailEl.value.trim();
      setFieldState('fg-email', isValidEmail(v), 'Please enter a valid email address.');
    });
    serviceEl && serviceEl.addEventListener('change', () => {
      setFieldState('fg-service', !!serviceEl.value, 'Please select a service.');
    });

    form.addEventListener('submit', e => {
      e.preventDefault();
      let valid = true;

      const nameVal  = nameEl  ? nameEl.value.trim()  : '';
      const phoneVal = phoneEl ? phoneEl.value.trim()  : '';
      const emailVal = emailEl ? emailEl.value.trim()  : '';
      const svcVal   = serviceEl ? serviceEl.value     : '';

      if (nameVal.length < 2) {
        setFieldState('fg-name', false, 'Please enter your full name.');
        valid = false;
      } else { setFieldState('fg-name', true, ''); }

      if (!isValidPhone(phoneVal)) {
        setFieldState('fg-phone', false, 'Please enter a valid phone number.');
        valid = false;
      } else { setFieldState('fg-phone', true, ''); }

      if (!isValidEmail(emailVal)) {
        setFieldState('fg-email', false, 'Please enter a valid email address.');
        valid = false;
      } else { setFieldState('fg-email', true, ''); }

      if (!svcVal) {
        setFieldState('fg-service', false, 'Please select a service.');
        valid = false;
      } else { setFieldState('fg-service', true, ''); }

      if (!valid) {
        const firstInvalid = form.querySelector('.invalid input, .invalid select');
        firstInvalid && firstInvalid.focus();
        return;
      }

      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending…';

      const data = new FormData(form);
      fetch('/', { method: 'POST', body: data })
        .then(() => {
          form.style.display = 'none';
          success.hidden = false;
        })
        .catch(() => {
          form.style.display = 'none';
          success.hidden = false;
        });
    });
  }

  /* ---- Scroll progress bar ---- */
  function initScrollProgress() {
    const bar = document.getElementById('scrollProgress');
    if (!bar) return;

    const onScroll = () => {
      const scrolled = window.scrollY;
      const total    = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.width = total > 0 ? (scrolled / total * 100) + '%' : '0%';
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ---- Parallax (RAF-throttled) ---- */
  function initParallax() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const heroImg = document.querySelector('.hero__img');
    const ctaImg  = document.querySelector('.cta-banner__media img');
    if (!heroImg && !ctaImg) return;

    let ctaSectionTop = null;
    let ticking = false;

    function updateParallax() {
      const sy = window.scrollY;

      if (heroImg) {
        heroImg.style.transform = `translateY(${sy * 0.32}px)`;
      }

      if (ctaImg) {
        if (ctaSectionTop === null) {
          ctaSectionTop = ctaImg.closest('.cta-banner').offsetTop;
        }
        const offset = sy - ctaSectionTop + window.innerHeight * 0.5;
        ctaImg.style.transform = `translateY(${offset * 0.18}px)`;
      }

      ticking = false;
    }

    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(updateParallax);
        ticking = true;
      }
    }, { passive: true });

    updateParallax();
  }

  /* ---- Cursor glow (desktop, RAF-animated) ---- */
  function initCursorGlow() {
    const el = document.getElementById('cursorGlow');
    if (!el) return;
    if (window.matchMedia('(max-width: 900px)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let mx = window.innerWidth  / 2;
    let my = window.innerHeight / 2;
    let cx = mx;
    let cy = my;

    document.addEventListener('mousemove', e => {
      mx = e.clientX;
      my = e.clientY;
    });

    function animate() {
      cx += (mx - cx) * 0.10;
      cy += (my - cy) * 0.10;
      el.style.transform = `translate(${cx - 160}px, ${cy - 160}px)`;
      requestAnimationFrame(animate);
    }

    animate();
  }

  /* ---- Init all ---- */
  function init() {
    setSeasonBadge();
    initNavbar();
    initMobileMenu();
    initSmoothScroll();
    initScrollReveal();
    initStatCounters();
    initFAQ();
    initBackToTop();
    initEmergFloat();
    initContactForm();
    initScrollProgress();
    initParallax();
    initCursorGlow();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
