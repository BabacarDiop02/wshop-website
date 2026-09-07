
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
    mobileMenu.classList.toggle('hidden');
    const icon = mobileMenuBtn.querySelector('i');
    if (mobileMenu.classList.contains('hidden')) {
      icon.classList.remove('ri-close-line');
      icon.classList.add('ri-menu-line');
    } else {
      icon.classList.remove('ri-menu-line');
      icon.classList.add('ri-close-line');
    }
  });
  const mobileLinks = mobileMenu.querySelectorAll('a');
  mobileLinks.forEach(link => {
    link.addEventListener('click', function() {
      mobileMenu.classList.add('hidden');
      const icon = mobileMenuBtn.querySelector('i');
      icon.classList.remove('ri-close-line');
      icon.classList.add('ri-menu-line');
    });
  });
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
    const duration = 1500;
    const startTime = performance.now();
    const step = function(now) {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(eased * target);
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

// Form validation
document.addEventListener('DOMContentLoaded', function() {
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const nameInput = document.getElementById('name');
      const emailInput = document.getElementById('email');
      const phoneInput = document.getElementById('phone');
      const messageInput = document.getElementById('message');
      const privacyInput = document.querySelector('input[name="privacy"]');
      const fields = [nameInput, emailInput, phoneInput, messageInput];
      fields.forEach(f => f.classList.remove('field-error'));

      let isValid = true;
      let errorMessage = '';
      if (!nameInput.value.trim()) { errorMessage += 'Veuillez saisir votre nom.\n'; isValid = false; nameInput.classList.add('field-error'); }
      if (!emailInput.value.trim()) { errorMessage += 'Veuillez saisir votre email.\n'; isValid = false; emailInput.classList.add('field-error'); }
      else if (!isValidEmail(emailInput.value)) { errorMessage += 'Veuillez saisir un email valide.\n'; isValid = false; emailInput.classList.add('field-error'); }
      if (!phoneInput.value.trim()) { errorMessage += 'Veuillez saisir votre numéro de téléphone.\n'; isValid = false; phoneInput.classList.add('field-error'); }
      if (!messageInput.value.trim()) { errorMessage += 'Veuillez décrire votre projet.\n'; isValid = false; messageInput.classList.add('field-error'); }
      if (!privacyInput.checked) { errorMessage += 'Veuillez accepter la politique de confidentialité.\n'; isValid = false; }

      if (isValid) {
        alert('Merci pour votre message ! Nous vous contacterons très prochainement.');
        contactForm.reset();
      } else {
        alert(errorMessage);
      }
    });
  }

  function isValidEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
});

// Smooth scroll + active nav link
document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
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
