/* Formulaire de contact multi-étapes (#17). La validation finale et l'envoi
 * restent gérés par script.js (WhatsApp / mailto) ; ce module se contente
 * d'afficher les champs par étapes avec une barre de progression, sans
 * changer la logique de soumission existante. */
(function () {
  function isStepValid(stepEl) {
    var required = stepEl.querySelectorAll('[required]');
    for (var i = 0; i < required.length; i++) {
      var el = required[i];
      if (el.type === 'checkbox' && !el.checked) return false;
      if (el.type !== 'checkbox' && !el.value.trim()) return false;
    }
    return true;
  }

  document.addEventListener('DOMContentLoaded', function () {
    var form = document.getElementById('contactForm');
    if (!form) return;
    var steps = Array.from(form.querySelectorAll('[data-step]'));
    if (steps.length < 2) return; // formulaire non segmenté, rien à faire

    var current = 0;
    var progressBar = document.getElementById('contactProgressBar');
    var progressLabel = document.getElementById('contactProgressLabel');

    function update() {
      steps.forEach(function (step, i) {
        step.classList.toggle('hidden', i !== current);
      });
      if (progressBar) progressBar.style.width = Math.round(((current + 1) / steps.length) * 100) + '%';
      if (progressLabel) progressLabel.textContent = 'Étape ' + (current + 1) + ' sur ' + steps.length;

      form.querySelectorAll('[data-step-recap]').forEach(function (el) {
        var fieldId = el.getAttribute('data-step-recap');
        var input = document.getElementById(fieldId);
        if (input) el.textContent = input.value || '—';
      });
    }

    form.querySelectorAll('[data-step-next]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var activeStep = steps[current];
        if (!isStepValid(activeStep)) {
          activeStep.querySelectorAll('[required]').forEach(function (el) {
            if ((el.type === 'checkbox' && !el.checked) || (el.type !== 'checkbox' && !el.value.trim())) {
              el.classList.add('field-error');
            }
          });
          return;
        }
        if (current < steps.length - 1) { current++; update(); }
      });
    });

    form.querySelectorAll('[data-step-prev]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        if (current > 0) { current--; update(); }
      });
    });

    form.addEventListener('input', function (e) {
      if (e.target.classList) e.target.classList.remove('field-error');
    });

    update();
  });
})();
