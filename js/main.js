/* ============================================================
   MetaFinOps – Main JavaScript
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

    // Close nav on link click
    mainNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mainNav.classList.remove('active');
      });
    });
  }


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


  // ── Header scroll effect ───────────────────────────────────
  const header = document.querySelector('.site-header');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
      header.style.borderBottomColor = 'rgba(26, 28, 40, 0.9)';
    } else {
      header.style.borderBottomColor = 'rgba(26, 28, 40, 0.6)';
    }

    lastScroll = currentScroll;
  });


  // ── Initialize particle animations ─────────────────────────

  // Hero: network particle effect
  const heroCanvas = document.getElementById('heroCanvas');
  if (heroCanvas) {
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
  if (governanceCanvas) {
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
  if (empowerCanvas) {
    new SpiralParticles(empowerCanvas, {
      particleCount: 250,
      color: '#ff6b6b',
      speed: 0.004
    });
  }

  // Metrics section: vertical bars
  const metricsCanvas = document.getElementById('metricsCanvas');
  if (metricsCanvas) {
    new VerticalBars(metricsCanvas);
  }

  // CTA section: red-tinted network particles
  const ctaCanvas = document.getElementById('ctaCanvas');
  if (ctaCanvas) {
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


  // ── Smooth scroll for anchor links ─────────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const headerHeight = header.offsetHeight;
        const targetPos = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
        window.scrollTo({ top: targetPos, behavior: 'smooth' });
      }
    });
  });

});
