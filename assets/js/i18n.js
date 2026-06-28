/* ──────────────────────────────────────────────
   i18n.js
   Vanilla replacement for i18next. window.TRANSLATIONS
   is injected by _layouts/default.html from
   _data/translations.yml, so the dictionary itself
   lives in plain YAML — no JS edits needed to add copy.
   ────────────────────────────────────────────── */

function applyLanguage(lang) {
  var dict = window.TRANSLATIONS[lang] || window.TRANSLATIONS[window.DEFAULT_LANG];
  if (!dict) return;

  document.querySelectorAll('[data-i18n]').forEach(function (el) {
    var key = el.getAttribute('data-i18n');
    if (dict[key] !== undefined) {
      el.innerHTML = dict[key];
    }
  });

  document.documentElement.setAttribute('lang', lang);
  localStorage.setItem('lang', lang);

  document.querySelectorAll('.lang-btn').forEach(function (btn) {
    btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
  });
}

function getCurrentLang() {
  return localStorage.getItem('lang') || window.DEFAULT_LANG;
}
