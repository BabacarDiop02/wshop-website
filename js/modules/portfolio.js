/* Portfolio dynamique (#1 à #9, #12) : rendu de la grille de réalisations à
 * partir de js/data/projects.js, avec filtres combinés (catégorie + recherche
 * texte), tri, compteurs sur les boutons de filtre, pagination "Charger
 * plus", et lien vers la page de détail projet.html?slug=... */
(function () {
  var PAGE_SIZE = 6;
  var state = { filter: 'all', query: '', sort: 'recent', visible: PAGE_SIZE };

  function statusBadge(project) {
    var meta = (window.WSHOP_PROJECT_STATUS_LABELS || {})[project.status];
    if (!meta) return '';
    return '<span class="project-status-badge ' + meta.className + '">' +
      '<i class="' + meta.icon + '" aria-hidden="true"></i> ' + meta.label + '</span>';
  }

  function cardTemplate(project, delayClass) {
    var thumb = project.images && project.images.length
      ? '<div class="h-44 overflow-hidden"><img src="' + project.images[0] + '" alt="Aperçu du projet ' + project.title + '" class="w-full h-full object-cover" loading="lazy" width="900" height="506"></div>'
      : '<div class="project-thumb h-44 flex items-center justify-center"><i class="' + project.icon + ' text-5xl text-primary/50" aria-hidden="true"></i></div>';

    var techBadges = project.tech.map(function (t) {
      return '<span class="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">' + t + '</span>';
    }).join('');

    return (
      '<div class="project-card reveal in-view ' + (delayClass || '') + ' bg-white rounded-lg shadow-md overflow-hidden" data-category="' + project.category + '">' +
        thumb +
        '<div class="p-6">' +
          '<div class="flex items-center justify-between gap-2 mb-3">' +
            '<span class="inline-block bg-primary/10 text-primary text-xs font-semibold px-3 py-1 rounded-full">' + project.badgeLabel + '</span>' +
            statusBadge(project) +
          '</div>' +
          '<h3 class="text-lg font-semibold text-gray-900 mb-2">' + project.title + '</h3>' +
          '<p class="text-gray-600 text-sm mb-4">' + project.short + '</p>' +
          '<div class="flex flex-wrap gap-2 mb-4">' + techBadges + '</div>' +
          '<a href="projet.html?slug=' + project.slug + '" class="text-primary font-medium inline-flex items-center hover:underline text-sm" data-i18n="projects.viewProject">' +
            '<i class="ri-eye-line mr-1" aria-hidden="true"></i> Voir le détail' +
          '</a>' +
        '</div>' +
      '</div>'
    );
  }

  function skeletonTemplate() {
    return (
      '<div class="project-skeleton">' +
        '<div class="sk-thumb sk-shimmer"></div>' +
        '<div class="sk-line w-60 sk-shimmer"></div>' +
        '<div class="sk-line w-90 sk-shimmer"></div>' +
        '<div class="sk-line w-40 sk-shimmer"></div>' +
      '</div>'
    );
  }

  function matchesQuery(project, query) {
    if (!query) return true;
    var haystack = [project.title, project.short, project.sector].concat(project.tech).join(' ').toLowerCase();
    return haystack.indexOf(query.toLowerCase()) !== -1;
  }

  function getFiltered() {
    var all = window.WSHOP_PROJECTS || [];
    var list = all.filter(function (p) {
      var matchCategory = state.filter === 'all' || p.category === state.filter;
      return matchCategory && matchesQuery(p, state.query);
    });
    if (state.sort === 'alpha') {
      list = list.slice().sort(function (a, b) { return a.title.localeCompare(b.title); });
    } else {
      list = list.slice().sort(function (a, b) { return (b.date || '').localeCompare(a.date || ''); });
    }
    return list;
  }

  function updateCounts() {
    var all = window.WSHOP_PROJECTS || [];
    document.querySelectorAll('.filter-btn').forEach(function (btn) {
      var filter = btn.getAttribute('data-filter');
      var count = filter === 'all' ? all.length : all.filter(function (p) { return p.category === filter; }).length;
      var countEl = btn.querySelector('.filter-count');
      if (!countEl) {
        countEl = document.createElement('span');
        countEl.className = 'filter-count';
        btn.appendChild(countEl);
      }
      countEl.textContent = '(' + count + ')';
    });
  }

  function render(grid, emptyEl, loadMoreBtn) {
    var filtered = getFiltered();
    var toShow = filtered.slice(0, state.visible);

    grid.innerHTML = toShow.map(function (p, i) {
      return cardTemplate(p, i < 3 ? 'reveal-delay-' + (i + 1) : '');
    }).join('');

    emptyEl.classList.toggle('show', filtered.length === 0);
    if (loadMoreBtn) {
      loadMoreBtn.classList.toggle('hidden', filtered.length <= state.visible);
    }
  }

  document.addEventListener('DOMContentLoaded', function () {
    var grid = document.getElementById('projectsGrid');
    if (!grid) return;

    var emptyEl = document.getElementById('projectsEmpty');
    var loadMoreBtn = document.getElementById('loadMoreProjects');
    var searchInput = document.getElementById('projectsSearch');
    var sortSelect = document.getElementById('projectsSort');
    var filterBtns = document.querySelectorAll('.filter-btn');

    // Petit effet de chargement (#28) pour un ressenti plus premium au
    // premier affichage, avant le rendu réel des cartes.
    grid.innerHTML = Array.from({ length: 3 }).map(skeletonTemplate).join('');

    setTimeout(function () {
      updateCounts();
      render(grid, emptyEl, loadMoreBtn);
    }, 250);

    filterBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        filterBtns.forEach(function (b) {
          b.classList.remove('active', 'bg-primary', 'text-white');
          b.classList.add('bg-white', 'text-gray-700');
        });
        btn.classList.add('active', 'bg-primary', 'text-white');
        btn.classList.remove('bg-white', 'text-gray-700');
        state.filter = btn.getAttribute('data-filter');
        state.visible = PAGE_SIZE;
        render(grid, emptyEl, loadMoreBtn);
      });
    });

    if (searchInput) {
      searchInput.addEventListener('input', function () {
        state.query = searchInput.value.trim();
        state.visible = PAGE_SIZE;
        render(grid, emptyEl, loadMoreBtn);
      });
    }

    if (sortSelect) {
      sortSelect.addEventListener('change', function () {
        state.sort = sortSelect.value;
        render(grid, emptyEl, loadMoreBtn);
      });
    }

    if (loadMoreBtn) {
      loadMoreBtn.addEventListener('click', function () {
        state.visible += PAGE_SIZE;
        render(grid, emptyEl, loadMoreBtn);
      });
    }
  });
})();
