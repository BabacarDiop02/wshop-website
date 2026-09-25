/* Envoi direct du formulaire par email + accusé de réception (#31).
 * Désactivé tant que js/data/site-config.js -> emailjs n'est pas renseigné :
 * dans ce cas le comportement actuel (ouverture WhatsApp / mailto, géré
 * dans script.js) reste inchangé. Une fois les 3 identifiants EmailJS
 * renseignés, le SDK est chargé à la volée et l'email est envoyé en plus,
 * sans rien retirer du parcours WhatsApp existant. */
(function () {
  var config = (window.WSHOP_CONFIG && window.WSHOP_CONFIG.emailjs) || {};
  if (!config.publicKey || !config.serviceId || !config.templateId) return;

  var sdkPromise = null;
  function loadSdk() {
    if (sdkPromise) return sdkPromise;
    sdkPromise = new Promise(function (resolve, reject) {
      var script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js';
      script.onload = function () {
        window.emailjs.init({ publicKey: config.publicKey });
        resolve(window.emailjs);
      };
      script.onerror = reject;
      document.head.appendChild(script);
    });
    return sdkPromise;
  }

  document.addEventListener('DOMContentLoaded', function () {
    var form = document.getElementById('contactForm');
    if (!form) return;
    form.addEventListener('submit', function () {
      loadSdk().then(function (emailjs) {
        emailjs.sendForm(config.serviceId, config.templateId, form).catch(function () {
          /* échec silencieux : WhatsApp/mailto reste le canal principal */
        });
      }).catch(function () { /* SDK indisponible, on ignore */ });
    });
  });
})();
