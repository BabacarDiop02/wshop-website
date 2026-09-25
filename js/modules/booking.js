/* Prise de rendez-vous (#20). Si WSHOP_CONFIG.calendlyUrl est renseigné, on
 * embarque l'agenda en iframe ; sinon on affiche un bouton WhatsApp de
 * repli pour proposer un appel de cadrage. */
(function () {
  document.addEventListener('DOMContentLoaded', function () {
    var wrap = document.getElementById('bookingFrameWrap');
    var fallback = document.getElementById('bookingFallback');
    if (!wrap || !fallback) return;

    var config = window.WSHOP_CONFIG || {};
    if (config.calendlyUrl) {
      var iframe = document.createElement('iframe');
      iframe.src = config.calendlyUrl;
      iframe.title = 'Prise de rendez-vous Wshop';
      iframe.loading = 'lazy';
      wrap.appendChild(iframe);
      wrap.classList.remove('hidden');
      fallback.classList.add('hidden');
    } else {
      wrap.classList.add('hidden');
      fallback.classList.remove('hidden');
      var link = fallback.querySelector('a');
      if (link) {
        link.href = 'https://wa.me/' + (config.whatsappNumber || '221776947150') +
          '?text=' + encodeURIComponent("Bonjour Wshop, je souhaite prendre rendez-vous pour un appel de cadrage sur mon projet.");
      }
    }
  });
})();
