/* ──────────────────────────────────────────────
   main.js
   ────────────────────────────────────────────── */

/*
 * EMAILJS CONFIG
 * 1. Create a free account at https://www.emailjs.com
 * 2. Add an email service + template, then paste your
 *    own IDs below.
 * 3. Until you do, the form still works — it just shows
 *    a "demo mode" message instead of actually sending.
 */
var EMAILJS_CONFIG = {
  serviceId: "",   // e.g. "service_abc123"
  templateId: "",  // e.g. "template_xyz789"
  publicKey: ""    // e.g. "AbCdEfGhIjKlMnOp"
};

document.addEventListener('DOMContentLoaded', function () {
  initTheme();
  initLanguage();
  initMobileNav();
  initScrollSpy();
  initAOS();
  initScrollyPhotos();
  initContactForm();
});

/* ---------- theme ---------- */
function initTheme() {
  var toggle = document.getElementById('theme-toggle');
  if (!toggle) return;

  toggle.addEventListener('click', function () {
    var current = document.documentElement.getAttribute('data-theme');
    var next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
  });
}

/* ---------- language ---------- */
function initLanguage() {
  applyLanguage(getCurrentLang());

  document.querySelectorAll('.lang-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      applyLanguage(btn.getAttribute('data-lang'));
    });
  });
}

/* ---------- mobile nav ---------- */
function initMobileNav() {
  var toggle = document.getElementById('nav-toggle');
  var menu = document.getElementById('nav-menu');
  if (!toggle || !menu) return;

  toggle.addEventListener('click', function () {
    var isOpen = menu.classList.toggle('open');
    toggle.setAttribute('aria-expanded', isOpen);
  });

  // close menu after picking a link, helps on mobile
  menu.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      menu.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
}

/* ---------- scrollspy: highlight nav link for visible section ---------- */
function initScrollSpy() {
  var sections = document.querySelectorAll('main section[id], .hero[id]');
  var links = document.querySelectorAll('.nav-links a');
  if (!sections.length || !links.length) return;

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      links.forEach(function (link) {
        var match = link.getAttribute('href').indexOf('#' + entry.target.id) !== -1;
        link.classList.toggle('active', match);
      });
    });
  }, { rootMargin: '-40% 0px -50% 0px' });

  sections.forEach(function (section) { observer.observe(section); });
}

/* ---------- AOS scroll animations ---------- */
function initAOS() {
  if (typeof AOS === 'undefined') return;
  AOS.init({ duration: 600, once: true, offset: 40 });
}

/* ---------- Scrolly Photos ---------- */
function initScrollyPhotos() {
  var photos = document.querySelectorAll('.scrolly-slide');
  var sections = document.querySelectorAll('.scrolly-content > section[id]');
  if (!photos.length || !sections.length) return;

  // iOS Safari fix — ensure body/html aren't blocking scroll events
  document.documentElement.style.webkitOverflowScrolling = 'touch';

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      var id = entry.target.id;
      photos.forEach(function (photo) {
        photo.classList.toggle('active', photo.getAttribute('data-section') === id);
      });
    });
  }, { rootMargin: '-40% 0px -50% 0px' });

  sections.forEach(function (section) { observer.observe(section); });
}

/* ---------- contact form ---------- */
function initContactForm() {
  var form = document.getElementById('contact-form');
  if (!form) return;

  var status = document.getElementById('form-status');
  var submitBtn = form.querySelector('.terminal-submit');
  var sendLabel = submitBtn.querySelector('[data-i18n="contact_send"]');
  var originalLabel = sendLabel ? sendLabel.textContent : null;

  var emailjsReady = EMAILJS_CONFIG.serviceId && EMAILJS_CONFIG.templateId && EMAILJS_CONFIG.publicKey;
  if (emailjsReady && typeof emailjs !== 'undefined') {
    emailjs.init({ publicKey: EMAILJS_CONFIG.publicKey });
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    var dict = window.TRANSLATIONS[getCurrentLang()] || {};

    if (!emailjsReady) {
      // Demo mode — no EmailJS keys configured yet.
      showToast(
        'EmailJS isn\u2019t configured yet — add your IDs at the top of main.js. ' +
        'For now you can email ' + (document.querySelector('.footer-links a[href^="mailto:"]') || {}).textContent + ' directly.',
        'error'
      );
      console.info('EmailJS not configured — see EMAILJS_CONFIG in assets/js/main.js');
      return;
    }

    if (sendLabel) sendLabel.textContent = dict.contact_sending || 'sending...';
    submitBtn.disabled = true;

    emailjs.send(EMAILJS_CONFIG.serviceId, EMAILJS_CONFIG.templateId, {
      from_name: form.name.value,
      from_email: form.email.value,
      message: form.message.value
    }).then(function () {
      setStatus(dict.contact_success || 'Message sent.', 'success');
      form.reset();
    }).catch(function () {
      setStatus(dict.contact_error || 'Something went wrong.', 'error');
    }).finally(function () {
      if (sendLabel) sendLabel.textContent = originalLabel;
      submitBtn.disabled = false;
    });
  });

  function setStatus(message, kind) {
    if (!status) return;
    status.textContent = message;
    status.className = 'terminal-status ' + kind;
  }
}

/* ---------- lightweight toast (vanilla equivalent of Notiflix) ---------- */
function showToast(message, kind) {
  var existing = document.querySelector('.toast');
  if (existing) existing.remove();

  var toast = document.createElement('div');
  toast.className = 'toast' + (kind === 'error' ? ' error' : '');
  toast.textContent = message;
  document.body.appendChild(toast);

  requestAnimationFrame(function () { toast.classList.add('visible'); });

  setTimeout(function () {
    toast.classList.remove('visible');
    setTimeout(function () { toast.remove(); }, 250);
  }, 5000);
}
