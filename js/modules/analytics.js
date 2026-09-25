/* Analytics respectueux de la vie privée (#33), désactivé par défaut.
 * Renseignez WSHOP_CONFIG.plausibleDomain (js/data/site-config.js) avec
 * votre domaine Plausible pour activer le suivi — sans cookies, conforme
 * RGPD, sans bannière de consentement nécessaire. */
(function () {
  var domain = window.WSHOP_CONFIG && window.WSHOP_CONFIG.plausibleDomain;
  if (!domain) return;
  var script = document.createElement('script');
  script.defer = true;
  script.setAttribute('data-domain', domain);
  script.src = 'https://plausible.io/js/script.js';
  document.head.appendChild(script);
})();
