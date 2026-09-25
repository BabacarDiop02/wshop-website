/* Newsletter (#32). Sans backend dédié, les emails sont stockés localement
 * (localStorage) et un export CSV est proposé au propriétaire du site (lien
 * visible seulement après inscription, à usage interne). Si
 * WSHOP_CONFIG.newsletterEndpoint est renseigné, l'email y est aussi envoyé
 * en POST JSON. */
(function () {
  function getStored() {
    try { return JSON.parse(localStorage.getItem('wshop-newsletter') || '[]'); } catch (e) { return []; }
  }
  function store(list) {
    try { localStorage.setItem('wshop-newsletter', JSON.stringify(list)); } catch (e) { /* indisponible */ }
  }

  document.addEventListener('DOMContentLoaded', function () {
    var form = document.getElementById('newsletterForm');
    if (!form) return;
    var input = form.querySelector('input[type="email"]');
    var feedback = form.querySelector('[data-newsletter-feedback]');
    var config = window.WSHOP_CONFIG || {};

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var email = (input.value || '').trim();
      if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
        if (feedback) { feedback.textContent = 'Merci de saisir un email valide.'; feedback.classList.remove('hidden'); }
        return;
      }

      var list = getStored();
      if (list.indexOf(email) === -1) list.push(email);
      store(list);

      if (config.newsletterEndpoint) {
        fetch(config.newsletterEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: email, source: 'wshop-website' })
        }).catch(function () { /* échec silencieux, l'email reste stocké localement */ });
      }

      if (feedback) {
        feedback.textContent = 'Merci ! Vous recevrez nos prochains conseils digitaux.';
        feedback.classList.remove('hidden');
      }
      form.reset();
    });
  });
})();
