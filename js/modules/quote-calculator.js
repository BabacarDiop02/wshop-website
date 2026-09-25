/* Calculateur de devis interactif (#16). Purement indicatif : donne une
 * fourchette de prix en FCFA à partir des tarifs publics de la section
 * #tarifs, puis prépare un message WhatsApp pré-rempli vers le formulaire
 * de contact réel. */
(function () {
  var PROJECT_TYPES = [
    { id: 'vitrine', label: 'Site vitrine', base: 50000, icon: 'ri-window-line' },
    { id: 'ecommerce', label: 'Boutique e-commerce', base: 100000, icon: 'ri-store-2-line' },
    { id: 'mobile', label: 'Application mobile', base: 250000, icon: 'ri-smartphone-line' },
    { id: 'logo', label: 'Identité visuelle / logo', base: 25000, icon: 'ri-palette-line' }
  ];
  var OPTIONS = [
    { id: 'pages', label: 'Plusieurs pages supplémentaires (+5 pages)', add: 15000 },
    { id: 'admin', label: 'Panneau d\'administration sur mesure', add: 40000 },
    { id: 'payment', label: 'Paiement en ligne (Wave / Orange Money)', add: 25000 },
    { id: 'urgent', label: 'Livraison express (< 1 semaine)', add: 20000 }
  ];

  var state = { type: 'vitrine', options: [] };

  function formatFcfa(n) {
    return n.toLocaleString('fr-FR') + ' FCFA';
  }

  function computeRange() {
    var base = PROJECT_TYPES.filter(function (t) { return t.id === state.type; })[0].base;
    var addOns = state.options.reduce(function (sum, id) {
      var opt = OPTIONS.filter(function (o) { return o.id === id; })[0];
      return sum + (opt ? opt.add : 0);
    }, 0);
    var low = base + addOns;
    var high = Math.round(low * 1.35);
    return { low: low, high: high };
  }

  function renderTypes(container) {
    container.innerHTML = PROJECT_TYPES.map(function (t) {
      return (
        '<div class="quote-calc-option ' + (state.type === t.id ? 'selected' : '') + '" data-type="' + t.id + '" role="button" tabindex="0">' +
          '<span class="flex items-center gap-3"><i class="' + t.icon + ' text-primary" aria-hidden="true"></i>' + t.label + '</span>' +
          '<i class="ri-checkbox-circle-fill text-primary ' + (state.type === t.id ? '' : 'opacity-0') + '" aria-hidden="true"></i>' +
        '</div>'
      );
    }).join('');
  }

  function renderOptions(container) {
    container.innerHTML = OPTIONS.map(function (o) {
      var checked = state.options.indexOf(o.id) !== -1;
      return (
        '<div class="quote-calc-option ' + (checked ? 'selected' : '') + '" data-option="' + o.id + '" role="button" tabindex="0">' +
          '<span>' + o.label + '</span>' +
          '<i class="ri-checkbox-circle-fill text-primary ' + (checked ? '' : 'opacity-0') + '" aria-hidden="true"></i>' +
        '</div>'
      );
    }).join('');
  }

  function renderTotal(container) {
    var range = computeRange();
    container.innerHTML =
      '<p class="text-sm opacity-90 mb-1">Estimation indicative</p>' +
      '<p class="text-2xl font-bold">' + formatFcfa(range.low) + ' — ' + formatFcfa(range.high) + '</p>' +
      '<p class="text-xs opacity-80 mt-2">Le prix final dépend du contenu exact de votre projet. Ceci reste une estimation, pas un devis contractuel.</p>';
  }

  function buildWhatsappUrl(config) {
    var type = PROJECT_TYPES.filter(function (t) { return t.id === state.type; })[0];
    var range = computeRange();
    var optionLabels = state.options.map(function (id) {
      var o = OPTIONS.filter(function (opt) { return opt.id === id; })[0];
      return o ? o.label : id;
    });
    var lines = [
      'Bonjour Wshop, j\'ai utilisé le calculateur de devis du site :',
      'Type de projet : ' + type.label,
      'Options : ' + (optionLabels.length ? optionLabels.join(', ') : 'aucune'),
      'Estimation obtenue : ' + formatFcfa(range.low) + ' - ' + formatFcfa(range.high),
      'Je souhaite un devis précis.'
    ];
    var number = (config && config.whatsappNumber) || '221776947150';
    return 'https://wa.me/' + number + '?text=' + encodeURIComponent(lines.join('\n'));
  }

  document.addEventListener('DOMContentLoaded', function () {
    var modal = document.getElementById('quoteCalcModal');
    var openBtns = document.querySelectorAll('[data-open-quote-calc]');
    if (!modal || !openBtns.length) return;

    var typesEl = modal.querySelector('[data-calc-types]');
    var optionsEl = modal.querySelector('[data-calc-options]');
    var totalEl = modal.querySelector('[data-calc-total]');
    var ctaEl = modal.querySelector('[data-calc-cta]');
    var closeBtn = modal.querySelector('.quote-calc-close');

    function renderAll() {
      renderTypes(typesEl);
      renderOptions(optionsEl);
      renderTotal(totalEl);
      if (ctaEl) ctaEl.href = buildWhatsappUrl(window.WSHOP_CONFIG);
    }

    openBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        modal.classList.add('open');
        document.body.style.overflow = 'hidden';
        renderAll();
      });
    });

    function closeModal() {
      modal.classList.remove('open');
      document.body.style.overflow = '';
    }
    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', function (e) {
      if (e.target === modal) closeModal();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && modal.classList.contains('open')) closeModal();
    });

    typesEl.addEventListener('click', function (e) {
      var opt = e.target.closest('[data-type]');
      if (!opt) return;
      state.type = opt.getAttribute('data-type');
      renderAll();
    });

    optionsEl.addEventListener('click', function (e) {
      var opt = e.target.closest('[data-option]');
      if (!opt) return;
      var id = opt.getAttribute('data-option');
      var idx = state.options.indexOf(id);
      if (idx === -1) state.options.push(id); else state.options.splice(idx, 1);
      renderAll();
    });
  });
})();
