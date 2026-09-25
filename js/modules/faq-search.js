/* Recherche dans la FAQ (#23) : filtre les <details class="faq-item"> en
 * fonction du texte saisi, et surligne les correspondances trouvées. */
(function () {
  function stripMarks(el) {
    el.querySelectorAll('mark.faq-mark').forEach(function (m) {
      m.replaceWith(document.createTextNode(m.textContent));
    });
  }

  function highlight(el, query) {
    stripMarks(el);
    if (!query) return;
    var walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, null);
    var nodes = [];
    var node;
    while ((node = walker.nextNode())) nodes.push(node);
    var re = new RegExp('(' + query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')', 'ig');
    nodes.forEach(function (textNode) {
      if (!re.test(textNode.textContent)) return;
      re.lastIndex = 0;
      var span = document.createElement('span');
      span.innerHTML = textNode.textContent.replace(re, '<mark class="faq-mark">$1</mark>');
      textNode.replaceWith(span);
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    var input = document.getElementById('faqSearchInput');
    var items = document.querySelectorAll('.faq-item');
    var noResults = document.getElementById('faqNoResults');
    if (!input || !items.length) return;

    input.addEventListener('input', function () {
      var query = input.value.trim();
      var visibleCount = 0;
      items.forEach(function (item) {
        var text = item.textContent.toLowerCase();
        var matches = !query || text.indexOf(query.toLowerCase()) !== -1;
        item.classList.toggle('faq-hidden', !matches);
        if (matches) {
          visibleCount++;
          if (query) item.open = true;
          highlight(item.querySelector('.faq-answer') || item, query);
          highlight(item.querySelector('summary'), query);
        } else {
          stripMarks(item);
        }
      });
      if (noResults) noResults.classList.toggle('show', visibleCount === 0);
    });
  });
})();
