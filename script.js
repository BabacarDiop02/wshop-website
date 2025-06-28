
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
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const phone = document.getElementById('phone').value;
      const message = document.getElementById('message').value;
      const privacy = document.querySelector('input[name="privacy"]').checked;
      let isValid = true;
      let errorMessage = '';
      if (!name) errorMessage += 'Veuillez saisir votre nom.\n', isValid = false;
      if (!email) errorMessage += 'Veuillez saisir votre email.\n', isValid = false;
      else if (!isValidEmail(email)) errorMessage += 'Veuillez saisir un email valide.\n', isValid = false;
      if (!phone) errorMessage += 'Veuillez saisir votre numéro de téléphone.\n', isValid = false;
      if (!message) errorMessage += 'Veuillez décrire votre projet.\n', isValid = false;
      if (!privacy) errorMessage += 'Veuillez accepter la politique de confidentialité.\n', isValid = false;
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

// Smooth scroll
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
});
