/* Enregistrement du service worker + bannière d'installation PWA (#30). */
(function () {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
      navigator.serviceWorker.register('sw.js').catch(function () { /* pas grave si indisponible (ex: file://) */ });
    });
  }

  var deferredPrompt = null;
  window.addEventListener('beforeinstallprompt', function (e) {
    e.preventDefault();
    deferredPrompt = e;
    var banner = document.getElementById('pwaInstallBanner');
    if (banner) banner.classList.add('show');
  });

  document.addEventListener('DOMContentLoaded', function () {
    var banner = document.getElementById('pwaInstallBanner');
    if (!banner) return;
    var installBtn = banner.querySelector('[data-pwa-install]');
    var dismissBtn = banner.querySelector('[data-pwa-dismiss]');

    if (installBtn) {
      installBtn.addEventListener('click', function () {
        if (!deferredPrompt) return;
        deferredPrompt.prompt();
        deferredPrompt.userChoice.finally(function () {
          deferredPrompt = null;
          banner.classList.remove('show');
        });
      });
    }
    if (dismissBtn) {
      dismissBtn.addEventListener('click', function () {
        banner.classList.remove('show');
        try { sessionStorage.setItem('wshop-pwa-dismissed', '1'); } catch (e) { /* indisponible */ }
      });
    }
  });
})();
