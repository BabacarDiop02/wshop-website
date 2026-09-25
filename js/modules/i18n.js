/* Sélecteur de langue FR/EN (#27).
 * Infrastructure extensible par attribut data-i18n="cle" (texte) et
 * data-i18n-placeholder="cle" (placeholder de champ). Seuls les éléments
 * structurants (nav, hero, en-têtes de section, footer...) sont traduits
 * pour l'instant ; le corps des textes reste en français. Pour traduire un
 * nouvel élément, ajoutez l'attribut data-i18n correspondant et la clé dans
 * js/i18n/fr.js + js/i18n/en.js. */
(function () {
  function getStoredLang() {
    try { return localStorage.getItem('wshop-lang'); } catch (e) { return null; }
  }
  function storeLang(lang) {
    try { localStorage.setItem('wshop-lang', lang); } catch (e) { /* indisponible */ }
  }
  function detectLang() {
    var stored = getStoredLang();
    if (stored === 'fr' || stored === 'en') return stored;
    return (navigator.language || 'fr').toLowerCase().indexOf('en') === 0 ? 'en' : 'fr';
  }

  function applyLang(lang) {
    var dict = (window.WSHOP_I18N && window.WSHOP_I18N[lang]) || {};
    document.documentElement.setAttribute('lang', lang === 'en' ? 'en' : 'fr');
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      if (dict[key]) el.textContent = dict[key];
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(function (el) {
      var key = el.getAttribute('data-i18n-placeholder');
      if (dict[key]) el.setAttribute('placeholder', dict[key]);
    });
    document.querySelectorAll('#langToggle button').forEach(function (btn) {
      btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
      btn.setAttribute('aria-pressed', String(btn.getAttribute('data-lang') === lang));
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    var lang = detectLang();
    applyLang(lang);

    var toggle = document.getElementById('langToggle');
    if (!toggle) return;
    toggle.addEventListener('click', function (e) {
      var btn = e.target.closest('button[data-lang]');
      if (!btn) return;
      var lang = btn.getAttribute('data-lang');
      storeLang(lang);
      applyLang(lang);
    });
  });
})();
