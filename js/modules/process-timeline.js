/* Timeline enrichie de la section Process (#22) : chaque étape peut être
 * dépliée pour afficher un détail complémentaire (data-step-detail dans le
 * HTML). */
(function () {
  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.process-step').forEach(function (step) {
      var toggle = step.querySelector('.step-toggle');
      if (!toggle) return;
      toggle.setAttribute('role', 'button');
      toggle.setAttribute('tabindex', '0');
      toggle.setAttribute('aria-expanded', 'false');
      function toggleStep() {
        var open = step.classList.toggle('step-open');
        toggle.setAttribute('aria-expanded', String(open));
      }
      toggle.addEventListener('click', toggleStep);
      toggle.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleStep(); }
      });
    });
  });
})();
