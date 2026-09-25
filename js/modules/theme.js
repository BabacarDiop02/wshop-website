/* Mode sombre (#26) : appliqué le plus tôt possible (voir script inline dans
 * <head>) pour éviter un flash, puis ce module branche le bouton et persiste
 * le choix de l'utilisateur. */
(function () {
  function applyTheme(theme) {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', theme === 'dark' ? '#0b1220' : '#1E5AF5');
  }

  function getStoredTheme() {
    try { return localStorage.getItem('wshop-theme'); } catch (e) { return null; }
  }

  function storeTheme(theme) {
    try { localStorage.setItem('wshop-theme', theme); } catch (e) { /* stockage indisponible */ }
  }

  document.addEventListener('DOMContentLoaded', function () {
    var toggle = document.getElementById('themeToggle');
    if (!toggle) return;

    toggle.addEventListener('click', function () {
      var isDark = document.documentElement.classList.contains('dark');
      var next = isDark ? 'light' : 'dark';
      applyTheme(next);
      storeTheme(next);
      toggle.setAttribute('aria-pressed', String(next === 'dark'));
    });

    toggle.setAttribute('aria-pressed', String(document.documentElement.classList.contains('dark')));

    // Retire le blocage anti-flash une fois le module chargé.
    requestAnimationFrame(function () {
      document.documentElement.classList.remove('theme-init');
    });
  });
})();
