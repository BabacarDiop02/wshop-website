/* Page de détail projet (#1, #2, #6, #7, #12) : lit ?slug=... et rend le
 * projet correspondant à partir de js/data/projects.js. */
(function () {
  function qs(name) {
    return new URLSearchParams(window.location.search).get(name);
  }

  function statusBadge(project) {
    var meta = (window.WSHOP_PROJECT_STATUS_LABELS || {})[project.status];
    if (!meta) return '';
    return '<span class="project-status-badge ' + meta.className + '"><i class="' + meta.icon + '" aria-hidden="true"></i> ' + meta.label + '</span>';
  }

  function galleryImages(project) {
    return (project.images && project.images.length) ? project.images : null;
  }

  function renderGallery(project) {
    var images = galleryImages(project);
    if (!images) {
      return '<div class="project-gallery-main h-72 md:h-96 flex items-center justify-center">' +
        '<i class="' + project.icon + ' text-7xl text-primary/40" aria-hidden="true"></i></div>';
    }
    var main = '<div class="project-gallery-main h-72 md:h-96" data-gallery-main>' +
      '<img src="' + images[0] + '" alt="Capture du projet ' + project.title + '" data-gallery-current>' +
      '</div>';
    if (images.length > 1) {
      main += '<div class="project-gallery-thumbs">' + images.map(function (src, i) {
        return '<button type="button" class="' + (i === 0 ? 'active' : '') + '" data-gallery-thumb="' + src + '"><img src="' + src + '" alt=""></button>';
      }).join('') + '</div>';
    }
    return main;
  }

  function renderResults(project) {
    if (!project.results || !project.results.length) return '';
    return '<div class="grid grid-cols-1 sm:grid-cols-2 gap-4 my-8">' +
      project.results.map(function (r) {
        return '<div class="project-result-item"><p class="text-xs uppercase tracking-wide text-gray-500 mb-1">' + r.label + '</p><p class="font-semibold text-gray-900">' + r.value + '</p></div>';
      }).join('') + '</div>';
  }

  function renderRelated(project, all) {
    var related = all.filter(function (p) { return p.slug !== project.slug && p.category === project.category; }).slice(0, 3);
    if (!related.length) return '';
    return (
      '<div class="mt-16 pt-12 border-t border-gray-200">' +
        '<h2 class="text-2xl font-bold text-gray-900 mb-6">Projets similaires</h2>' +
        '<div class="grid grid-cols-1 sm:grid-cols-3 gap-6">' +
        related.map(function (p) {
          return '<a href="projet.html?slug=' + p.slug + '" class="block bg-white rounded-lg shadow-md p-5 hover:shadow-lg transition-shadow">' +
            '<span class="inline-block bg-primary/10 text-primary text-xs font-semibold px-3 py-1 rounded-full mb-3">' + p.badgeLabel + '</span>' +
            '<h3 class="font-semibold text-gray-900">' + p.title + '</h3></a>';
        }).join('') +
        '</div>' +
      '</div>'
    );
  }

  function shareUrl(project) {
    return window.location.origin + window.location.pathname + '?slug=' + project.slug;
  }

  function renderShare(project) {
    var url = encodeURIComponent(shareUrl(project));
    var text = encodeURIComponent('Découvrez « ' + project.title + ' », un projet réalisé par Wshop :');
    return (
      '<div class="flex items-center gap-3 mt-8">' +
        '<span class="text-sm text-gray-500">Partager :</span>' +
        '<a class="share-btn" href="https://wa.me/?text=' + text + '%20' + url + '" target="_blank" rel="noopener" aria-label="Partager sur WhatsApp"><i class="ri-whatsapp-line" aria-hidden="true"></i></a>' +
        '<a class="share-btn" href="https://www.linkedin.com/sharing/share-offsite/?url=' + url + '" target="_blank" rel="noopener" aria-label="Partager sur LinkedIn"><i class="ri-linkedin-fill" aria-hidden="true"></i></a>' +
        '<a class="share-btn" href="https://twitter.com/intent/tweet?text=' + text + '&url=' + url + '" target="_blank" rel="noopener" aria-label="Partager sur X"><i class="ri-twitter-x-fill" aria-hidden="true"></i></a>' +
        '<button class="share-btn" type="button" data-copy-link="' + shareUrl(project) + '" aria-label="Copier le lien"><i class="ri-link" aria-hidden="true"></i></button>' +
      '</div>'
    );
  }

  function render(project, all) {
    document.title = project.title + ' — Réalisations Wshop';
    var descMeta = document.querySelector('[data-page-description]');
    if (descMeta) descMeta.setAttribute('content', project.short);
    var breadcrumb = document.getElementById('breadcrumbCurrent');
    if (breadcrumb) breadcrumb.textContent = project.title;

    var demoLink = project.demoUrl
      ? '<a href="' + project.demoUrl + '" target="_blank" rel="noopener" class="bg-primary text-white px-6 py-3 !rounded-button font-medium inline-flex items-center gap-2"><i class="ri-external-link-line" aria-hidden="true"></i> Voir la démo</a>'
      : '';
    var codeLink = project.githubUrl
      ? '<a href="' + project.githubUrl + '" target="_blank" rel="noopener" class="bg-secondary text-white px-6 py-3 !rounded-button font-medium inline-flex items-center gap-2"><i class="ri-github-fill" aria-hidden="true"></i> Voir le code</a>'
      : '';

    document.getElementById('projectDetail').innerHTML =
      '<div class="flex items-center gap-3 mb-4 flex-wrap">' +
        '<span class="inline-block bg-primary/10 text-primary text-xs font-semibold px-3 py-1 rounded-full">' + project.badgeLabel + '</span>' +
        statusBadge(project) +
      '</div>' +
      '<h1 class="text-3xl md:text-4xl font-bold text-gray-900 mb-6">' + project.title + '</h1>' +
      renderGallery(project) +
      '<div class="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-10">' +
        '<div class="lg:col-span-2">' +
          '<h2 class="text-xl font-semibold text-gray-900 mb-3">Le projet</h2>' +
          '<p class="text-gray-700 leading-relaxed">' + project.long + '</p>' +
          renderResults(project) +
          renderShare(project) +
          '<div class="project-interest-cta">' +
            '<p class="text-gray-800 font-medium">Un projet similaire en tête ?</p>' +
            '<a href="index.html#contact" class="bg-primary text-white px-5 py-2 !rounded-button font-medium whitespace-nowrap">Demander un devis pour un projet comme celui-ci</a>' +
          '</div>' +
        '</div>' +
        '<div>' +
          '<div class="bg-gray-50 rounded-xl p-6 sticky top-28">' +
            '<h3 class="font-semibold text-gray-900 mb-4">Technologies</h3>' +
            '<div class="flex flex-wrap gap-2 mb-6">' + project.tech.map(function (t) { return '<span class="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">' + t + '</span>'; }).join('') + '</div>' +
            '<h3 class="font-semibold text-gray-900 mb-4">Secteur</h3>' +
            '<p class="text-gray-700 mb-6">' + project.sector + '</p>' +
            '<div class="flex flex-col gap-3">' + demoLink + codeLink + '</div>' +
          '</div>' +
        '</div>' +
      '</div>' +
      renderRelated(project, all);

    // Galerie / lightbox
    var main = document.querySelector('[data-gallery-main]');
    var current = document.querySelector('[data-gallery-current]');
    var lightbox = document.getElementById('projectLightbox');
    var lightboxImg = lightbox ? lightbox.querySelector('[data-lightbox-img]') : null;

    document.querySelectorAll('[data-gallery-thumb]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var src = btn.getAttribute('data-gallery-thumb');
        if (current) current.src = src;
        document.querySelectorAll('[data-gallery-thumb]').forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');
      });
    });

    if (main && lightbox && lightboxImg) {
      main.addEventListener('click', function () {
        lightboxImg.src = current.src;
        lightboxImg.alt = current.alt;
        lightbox.classList.add('open');
      });
    }
    if (lightbox) {
      lightbox.querySelectorAll('[data-lightbox-close]').forEach(function (btn) {
        btn.addEventListener('click', function () { lightbox.classList.remove('open'); });
      });
      lightbox.addEventListener('click', function (e) { if (e.target === lightbox) lightbox.classList.remove('open'); });
      document.addEventListener('keydown', function (e) { if (e.key === 'Escape') lightbox.classList.remove('open'); });
    }

    document.querySelectorAll('[data-copy-link]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var url = btn.getAttribute('data-copy-link');
        if (navigator.clipboard) {
          navigator.clipboard.writeText(url).then(function () {
            btn.innerHTML = '<i class="ri-check-line" aria-hidden="true"></i>';
            setTimeout(function () { btn.innerHTML = '<i class="ri-link" aria-hidden="true"></i>'; }, 1500);
          });
        }
      });
    });

    // Open Graph dynamique minimal pour le partage
    var ogTitle = document.createElement('meta');
    ogTitle.setAttribute('property', 'og:title');
    ogTitle.setAttribute('content', project.title + ' — Wshop');
    document.head.appendChild(ogTitle);
  }

  document.addEventListener('DOMContentLoaded', function () {
    var all = window.WSHOP_PROJECTS || [];
    var slug = qs('slug');
    var project = all.filter(function (p) { return p.slug === slug; })[0];
    if (!project) {
      var err = document.getElementById('projectLoadError');
      if (err) err.classList.remove('hidden');
      return;
    }
    render(project, all);
  });
})();
