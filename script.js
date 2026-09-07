
// Header scroll state
document.addEventListener('DOMContentLoaded', function() {
  const header = document.getElementById('mainHeader');
  const onScroll = function() {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };
  onScroll();
  window.addEventListener('scroll', onScroll);
});

// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  mobileMenuBtn.addEventListener('click', function() {
    const isHidden = mobileMenu.classList.toggle('hidden');
    mobileMenuBtn.setAttribute('aria-expanded', String(!isHidden));
    const icon = mobileMenuBtn.querySelector('i');
    if (isHidden) {
      icon.classList.remove('ri-close-line');
      icon.classList.add('ri-menu-line');
      mobileMenuBtn.setAttribute('aria-label', 'Ouvrir le menu');
    } else {
      icon.classList.remove('ri-menu-line');
      icon.classList.add('ri-close-line');
      mobileMenuBtn.setAttribute('aria-label', 'Fermer le menu');
    }
  });
  const mobileLinks = mobileMenu.querySelectorAll('a');
  mobileLinks.forEach(link => {
    link.addEventListener('click', function() {
      mobileMenu.classList.add('hidden');
      mobileMenuBtn.setAttribute('aria-expanded', 'false');
      mobileMenuBtn.setAttribute('aria-label', 'Ouvrir le menu');
      const icon = mobileMenuBtn.querySelector('i');
      icon.classList.remove('ri-close-line');
      icon.classList.add('ri-menu-line');
    });
  });
});

// Hero carousel (défilement automatique en fondu)
document.addEventListener('DOMContentLoaded', function() {
  const carousel = document.querySelector('.hero-carousel');
  if (!carousel) return;
  const slides = carousel.querySelectorAll('.hero-slide');
  const dots = carousel.querySelectorAll('.hero-dot');
  if (!slides.length) return;

  let current = 0;
  let timer = null;
  const intervalMs = 4500;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function goTo(index) {
    slides[current].classList.remove('active');
    dots[current].classList.remove('active');
    dots[current].setAttribute('aria-selected', 'false');
    current = (index + slides.length) % slides.length;
    slides[current].classList.add('active');
    dots[current].classList.add('active');
    dots[current].setAttribute('aria-selected', 'true');
  }

  function next() { goTo(current + 1); }

  function start() {
    if (reduceMotion) return;
    stop();
    timer = setInterval(next, intervalMs);
  }
  function stop() {
    if (timer) clearInterval(timer);
    timer = null;
  }

  dots.forEach((dot, i) => {
    dot.addEventListener('click', function() {
      goTo(i);
      start();
    });
  });

  carousel.addEventListener('mouseenter', stop);
  carousel.addEventListener('mouseleave', start);
  carousel.addEventListener('focusin', stop);
  carousel.addEventListener('focusout', start);

  start();
});

// Reveal on scroll
document.addEventListener('DOMContentLoaded', function() {
  const revealEls = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) {
    revealEls.forEach(el => el.classList.add('in-view'));
    return;
  }
  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  revealEls.forEach(el => observer.observe(el));
});

// Animated stat counters
document.addEventListener('DOMContentLoaded', function() {
  const counters = document.querySelectorAll('.stat-number');
  if (!counters.length) return;
  const animateCounter = function(el) {
    const target = parseInt(el.getAttribute('data-target'), 10) || 0;
    const suffix = el.getAttribute('data-suffix') || '';
    const duration = 1500;
    const startTime = performance.now();
    const step = function(now) {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(eased * target) + suffix;
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  if (!('IntersectionObserver' in window)) {
    counters.forEach(animateCounter);
    return;
  }
  const statObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        statObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(el => statObserver.observe(el));
});

// Project filter
document.addEventListener('DOMContentLoaded', function() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      filterBtns.forEach(b => {
        b.classList.remove('active', 'bg-primary', 'text-white');
        b.classList.add('bg-white', 'text-gray-700');
      });
      this.classList.add('active', 'bg-primary', 'text-white');
      this.classList.remove('bg-white', 'text-gray-700');
      const filter = this.getAttribute('data-filter');
      projectCards.forEach(card => {
        if (filter === 'all' || card.getAttribute('data-category') === filter) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
});

// Contact form: validation + envoi via WhatsApp pré-rempli (avec secours email)
// GitHub Pages n'a pas de backend : aucune donnée n'est stockée, tout part vers WhatsApp/email.
document.addEventListener('DOMContentLoaded', function() {
  const contactForm = document.getElementById('contactForm');
  if (!contactForm) return;

  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const phoneInput = document.getElementById('phone');
  const serviceInput = document.getElementById('service');
  const messageInput = document.getElementById('message');
  const privacyInput = document.getElementById('privacy');
  const mailFallback = document.getElementById('mailFallback');
  const feedback = document.getElementById('formFeedback');

  function isValidEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  function setFieldError(input, hasError) {
    input.classList.toggle('field-error', hasError);
    const msg = contactForm.querySelector('[data-error-for="' + input.name + '"]');
    if (msg) msg.classList.toggle('hidden', !hasError);
  }

  function buildWhatsappMessage() {
    const lines = [
      'Bonjour Wshop, je vous contacte depuis le site :',
      'Nom : ' + nameInput.value.trim(),
      'Email : ' + emailInput.value.trim(),
      'Téléphone : ' + phoneInput.value.trim(),
      'Service souhaité : ' + (serviceInput.value || 'Non précisé'),
      'Message : ' + messageInput.value.trim()
    ];
    return lines.join('\n');
  }

  function updateMailFallback() {
    const subject = encodeURIComponent('Demande de devis — ' + (serviceInput.value || 'Site Wshop'));
    const body = encodeURIComponent(buildWhatsappMessage());
    mailFallback.href = 'mailto:babacardiop1998@gmail.com?subject=' + subject + '&body=' + body;
  }
  [nameInput, emailInput, phoneInput, serviceInput, messageInput].forEach(el => {
    el.addEventListener('input', updateMailFallback);
    el.addEventListener('change', updateMailFallback);
  });
  updateMailFallback();

  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    feedback.classList.remove('show');

    let isValid = true;
    if (!nameInput.value.trim()) { setFieldError(nameInput, true); isValid = false; } else setFieldError(nameInput, false);
    if (!emailInput.value.trim() || !isValidEmail(emailInput.value)) { setFieldError(emailInput, true); isValid = false; } else setFieldError(emailInput, false);
    if (!phoneInput.value.trim()) { setFieldError(phoneInput, true); isValid = false; } else setFieldError(phoneInput, false);
    if (!messageInput.value.trim()) { setFieldError(messageInput, true); isValid = false; } else setFieldError(messageInput, false);
    const privacyMsg = contactForm.querySelector('[data-error-for="privacy"]');
    if (!privacyInput.checked) { if (privacyMsg) privacyMsg.classList.remove('hidden'); isValid = false; } else if (privacyMsg) privacyMsg.classList.add('hidden');

    if (!isValid) {
      const firstError = contactForm.querySelector('.field-error');
      if (firstError) firstError.focus();
      return;
    }

    updateMailFallback();
    const text = encodeURIComponent(buildWhatsappMessage());
    window.open('https://wa.me/221776947150?text=' + text, '_blank', 'noopener');

    feedback.classList.add('show');
    contactForm.reset();
  });
});

// Smooth scroll + active nav link
document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || targetId.length < 2) return;
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const headerOffset = 80;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
      }
    });
  });

  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  if (sections.length && navLinks.length && 'IntersectionObserver' in window) {
    const navObserver = new IntersectionObserver(function(entries) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          navLinks.forEach(link => {
            link.classList.toggle('active-link', link.getAttribute('href') === '#' + entry.target.id);
          });
        }
      });
    }, { rootMargin: '-40% 0px -55% 0px' });
    sections.forEach(section => navObserver.observe(section));
  }
});

// Back to top button
document.addEventListener('DOMContentLoaded', function() {
  const backToTop = document.getElementById('backToTop');
  if (!backToTop) return;
  window.addEventListener('scroll', function() {
    backToTop.classList.toggle('visible', window.scrollY > 400);
  });
  backToTop.addEventListener('click', function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
});
