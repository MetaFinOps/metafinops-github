/* ============================================================
   MetaFinOps – Main JavaScript (Multi-page)
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ── Scroll animations ──────────────────────────────────────
  const animatedElements = document.querySelectorAll('.animate-on-scroll');

  const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        scrollObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  animatedElements.forEach(el => scrollObserver.observe(el));


  // ── Mobile navigation toggle ───────────────────────────────
  const mobileToggle = document.getElementById('mobileToggle');
  const mainNav = document.getElementById('mainNav');

  if (mobileToggle && mainNav) {
    mobileToggle.addEventListener('click', () => {
      mainNav.classList.toggle('active');
    });

    // Close nav on link click (but not dropdown toggle)
    mainNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mainNav.classList.remove('active');
      });
    });
  }


  // ── Active nav state ───────────────────────────────────────
  const currentPath = window.location.pathname;
  document.querySelectorAll('.nav > a, .nav-dropdown-menu a').forEach(link => {
    const href = link.getAttribute('href');
    if (!href || href === '#') return;
    // Normalize: strip trailing slash and index.html
    const linkPath = href.replace(/\/index\.html$/, '/').replace(/\.html$/, '');
    const pagePath = currentPath.replace(/\/index\.html$/, '/').replace(/\.html$/, '');
    if (linkPath === pagePath || (pagePath.includes(linkPath) && linkPath !== '/')) {
      link.classList.add('active');
      // Also mark parent dropdown toggle as active
      const dropdown = link.closest('.nav-dropdown');
      if (dropdown) {
        const toggle = dropdown.querySelector('.nav-dropdown-toggle');
        if (toggle) toggle.classList.add('active');
      }
    }
  });


  // ── Dropdown keyboard accessibility ────────────────────────
  const dropdownToggles = document.querySelectorAll('.nav-dropdown-toggle');
  dropdownToggles.forEach(toggle => {
    toggle.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const menu = toggle.nextElementSibling;
        if (menu) {
          const isOpen = menu.style.display === 'block';
          menu.style.display = isOpen ? '' : 'block';
        }
      }
      if (e.key === 'Escape') {
        const menu = toggle.nextElementSibling;
        if (menu) menu.style.display = '';
        toggle.blur();
      }
    });
  });

  // Close dropdown on outside click
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav-dropdown')) {
      document.querySelectorAll('.nav-dropdown-menu').forEach(menu => {
        menu.style.display = '';
      });
    }
  });


  // ── Counter animation ──────────────────────────────────────
  const metricValues = document.querySelectorAll('.metric-value[data-target]');

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.target);
        const suffix = el.dataset.suffix || '';
        const duration = 2000;
        const startTime = performance.now();

        function updateCounter(currentTime) {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);

          // Ease-out curve
          const eased = 1 - Math.pow(1 - progress, 3);
          const current = Math.round(eased * target);

          el.textContent = current + suffix;

          if (progress < 1) {
            requestAnimationFrame(updateCounter);
          }
        }

        requestAnimationFrame(updateCounter);
        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  metricValues.forEach(el => counterObserver.observe(el));


  // ── Newsletter form ────────────────────────────────────────
  const newsletterForm = document.getElementById('newsletterForm');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('emailInput').value;
      alert('Thank you for subscribing! We\'ll send updates to ' + email);
      newsletterForm.reset();
    });
  }


  // ── Contact form ───────────────────────────────────────────
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Thank you for reaching out! We\'ll get back to you within 24 hours.');
      contactForm.reset();
    });
  }


  // ── FAQ accordion ──────────────────────────────────────────
  const faqQuestions = document.querySelectorAll('.faq-question');
  faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
      const item = question.parentElement;
      const isActive = item.classList.contains('active');
      // Close all
      document.querySelectorAll('.faq-item').forEach(faq => faq.classList.remove('active'));
      // Toggle current
      if (!isActive) item.classList.add('active');
    });
  });


  // ── Header scroll effect ───────────────────────────────────
  const header = document.querySelector('.site-header');
  if (header) {
    window.addEventListener('scroll', () => {
      const currentScroll = window.pageYOffset;
      if (currentScroll > 100) {
        header.style.borderBottomColor = 'rgba(26, 28, 40, 0.9)';
      } else {
        header.style.borderBottomColor = 'rgba(26, 28, 40, 0.6)';
      }
    });
  }


  // ── Initialize particle animations ─────────────────────────

  // Page hero canvas (used on inner pages)
  const pageHeroCanvas = document.getElementById('pageHeroCanvas');
  if (pageHeroCanvas && typeof ParticleNetwork !== 'undefined') {
    new ParticleNetwork(pageHeroCanvas, {
      particleCount: 70,
      particleColor: 'rgba(120, 150, 200, 0.4)',
      lineColor: 'rgba(120, 150, 200, 0.1)',
      particleRadius: 1.5,
      lineDistance: 140,
      speed: 0.2,
      interactive: false
    });
  }

  // Hero: network particle effect
  const heroCanvas = document.getElementById('heroCanvas');
  if (heroCanvas && typeof ParticleNetwork !== 'undefined') {
    new ParticleNetwork(heroCanvas, {
      particleCount: 100,
      particleColor: 'rgba(140, 160, 200, 0.5)',
      lineColor: 'rgba(140, 160, 200, 0.15)',
      particleRadius: 2,
      lineDistance: 160,
      speed: 0.25
    });
  }

  // Governance: subtle network
  const governanceCanvas = document.getElementById('governanceCanvas');
  if (governanceCanvas && typeof ParticleNetwork !== 'undefined') {
    new ParticleNetwork(governanceCanvas, {
      particleCount: 50,
      particleColor: 'rgba(100, 130, 180, 0.3)',
      lineColor: 'rgba(100, 130, 180, 0.08)',
      particleRadius: 1.5,
      lineDistance: 130,
      speed: 0.15,
      interactive: false
    });
  }

  // Empowering section: red spiral particles
  const empowerCanvas = document.getElementById('empowerCanvas');
  if (empowerCanvas && typeof SpiralParticles !== 'undefined') {
    new SpiralParticles(empowerCanvas, {
      particleCount: 250,
      color: '#ff6b6b',
      speed: 0.004
    });
  }

  // Metrics section: vertical bars
  const metricsCanvas = document.getElementById('metricsCanvas');
  if (metricsCanvas && typeof VerticalBars !== 'undefined') {
    new VerticalBars(metricsCanvas);
  }

  // CTA section: red-tinted network particles
  const ctaCanvas = document.getElementById('ctaCanvas');
  if (ctaCanvas && typeof ParticleNetwork !== 'undefined') {
    new ParticleNetwork(ctaCanvas, {
      particleCount: 60,
      particleColor: 'rgba(255, 107, 107, 0.25)',
      lineColor: 'rgba(255, 107, 107, 0.08)',
      particleRadius: 1.5,
      lineDistance: 140,
      speed: 0.2,
      interactive: false
    });
  }


  // ── Smooth scroll for anchor links (only same-page) ────────
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target && header) {
        e.preventDefault();
        const headerHeight = header.offsetHeight;
        const targetPos = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
        window.scrollTo({ top: targetPos, behavior: 'smooth' });
      }
    });
  });

});
