/* Rendu des témoignages (#13) et logos clients (#14) à partir de
 * js/data/testimonials.js. Tant que ces tableaux sont vides, on garde le
 * message "à venir" déjà présent dans le HTML — jamais de faux avis. */
(function () {
  function starRow(rating) {
    var full = Math.round(rating || 5);
    var stars = '';
    for (var i = 0; i < 5; i++) {
      stars += '<i class="' + (i < full ? 'ri-star-fill' : 'ri-star-line') + '" aria-hidden="true"></i>';
    }
    return stars;
  }

  document.addEventListener('DOMContentLoaded', function () {
    var slot = document.querySelector('[data-testimonials-slot]');
    var grid = document.getElementById('testimonialsGrid');
    var testimonials = window.WSHOP_TESTIMONIALS || [];

    if (grid && testimonials.length) {
      grid.innerHTML = testimonials.map(function (t) {
        return (
          '<div class="testimonial-card reveal in-view">' +
            '<div class="testimonial-stars">' + starRow(t.rating) + '</div>' +
            '<p class="text-gray-700 mb-6">“' + t.quote + '”</p>' +
            '<div class="flex items-center gap-3">' +
              '<span class="testimonial-avatar">' + (t.avatarInitials || '') + '</span>' +
              '<div><p class="font-semibold text-gray-900">' + t.name + '</p><p class="text-sm text-gray-500">' + t.role + '</p></div>' +
            '</div>' +
          '</div>'
        );
      }).join('');
      grid.classList.remove('hidden');
      if (slot) slot.classList.add('hidden');
    }

    var logosStrip = document.getElementById('clientLogosStrip');
    var logos = window.WSHOP_CLIENT_LOGOS || [];
    if (logosStrip && logos.length) {
      logosStrip.innerHTML = logos.map(function (l) {
        var img = '<img src="' + l.logo + '" alt="' + l.name + '" loading="lazy">';
        return l.url ? '<a href="' + l.url + '" target="_blank" rel="noopener">' + img + '</a>' : img;
      }).join('');
      var logosSection = logosStrip.closest('[data-client-logos-section]');
      if (logosSection) logosSection.classList.remove('hidden');
    }
  });
})();
