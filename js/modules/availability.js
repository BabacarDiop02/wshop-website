/* Badge de disponibilité (#19). Lit js/data/site-config.js — modifiez
 * WSHOP_CONFIG.availability ('disponible' | 'limitee' | 'complet') et
 * availabilityNote pour mettre à jour le badge sur tout le site. */
(function () {
  var LABELS = {
    disponible: 'Disponible pour un nouveau projet',
    limitee: 'Disponibilité limitée',
    complet: 'Complet actuellement'
  };

  document.addEventListener('DOMContentLoaded', function () {
    var badges = document.querySelectorAll('[data-availability-badge]');
    if (!badges.length) return;
    var config = window.WSHOP_CONFIG || {};
    var status = config.availability || 'disponible';
    var label = LABELS[status] || LABELS.disponible;

    badges.forEach(function (badge) {
      badge.innerHTML =
        '<span class="availability-dot ' + status + '"></span>' +
        '<span data-i18n="availability.label">' + label + '</span>';
      if (config.availabilityNote) {
        badge.setAttribute('title', config.availabilityNote);
      }
    });
  });
})();
