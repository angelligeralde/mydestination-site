// Hero slideshow — only runs on pages that have slides
const slides = document.querySelectorAll('.hero__slide');
const dots = document.querySelectorAll('.hero__dot');
let currentSlide = 0;
let slideshowTimer;

if (slides.length > 0) {
  function goToSlide(index) {
    slides[currentSlide].classList.remove('active');
    dots[currentSlide].classList.remove('active');
    currentSlide = index;
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
  }

  function nextSlide() {
    goToSlide((currentSlide + 1) % slides.length);
  }

  function startSlideshow() {
    slideshowTimer = setInterval(nextSlide, 5000);
  }

  function resetSlideshow() {
    clearInterval(slideshowTimer);
    startSlideshow();
  }

  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      goToSlide(parseInt(dot.dataset.index));
      resetSlideshow();
    });
  });

  startSlideshow();
}

// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });

  // Close mobile nav when a non-dropdown link is clicked
  navLinks.querySelectorAll('li:not(.has-dropdown) a').forEach(link => {
    link.addEventListener('click', () => navLinks.classList.remove('open'));
  });

  // Mobile: toggle dropdowns on click (desktop uses CSS hover)
  document.querySelectorAll('.has-dropdown > a').forEach(toggle => {
    toggle.addEventListener('click', (e) => {
      const isMobile = window.innerWidth <= 768;
      if (isMobile) {
        e.preventDefault();
        e.stopPropagation();
        const parent = toggle.parentElement;
        const isOpen = parent.classList.contains('open');

        // Close all sibling dropdowns
        const parentList = parent.parentElement;
        parentList.querySelectorAll('.has-dropdown.open').forEach(openDropdown => {
          if (openDropdown !== parent) {
            openDropdown.classList.remove('open');
          }
        });

        // Toggle current dropdown
        parent.classList.toggle('open');
      }
    });
  });
}

// Animate sections into view
const animObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }, i * 80);
      animObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.service-card, .dest-card, .whyus__card, .accred-badge')
  .forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    animObserver.observe(el);
  });

// Package / blog filter tabs
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const section = btn.closest('section') || document;
    section.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    section.querySelectorAll('.pkg-card, .blog-card').forEach(card => {
      const match = filter === 'all' || card.dataset.category === filter;
      card.style.display = match ? '' : 'none';
    });
  });
});

// Form submit feedback
const form = document.querySelector('.contact__form');
if (form) {
  form.addEventListener('submit', () => {
    const btn = form.querySelector('button[type="submit"]');
    btn.textContent = 'Sending...';
    btn.disabled = true;
  });
}
