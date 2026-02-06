/* ============================================================
   MetaFinOps – Particle Network Animations
   ============================================================ */

class ParticleNetwork {
  constructor(canvas, options = {}) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.particles = [];
    this.animationId = null;
    this.isVisible = false;

    this.options = {
      particleCount: options.particleCount || 80,
      particleColor: options.particleColor || 'rgba(150, 170, 200, 0.6)',
      lineColor: options.lineColor || 'rgba(150, 170, 200, 0.12)',
      particleRadius: options.particleRadius || 2,
      lineDistance: options.lineDistance || 150,
      speed: options.speed || 0.3,
      interactive: options.interactive !== undefined ? options.interactive : true,
      ...options
    };

    this.mouse = { x: null, y: null };
    this.init();
  }

  init() {
    this.resize();
    this.createParticles();

    window.addEventListener('resize', () => this.resize());

    if (this.options.interactive) {
      this.canvas.addEventListener('mousemove', (e) => {
        const rect = this.canvas.getBoundingClientRect();
        this.mouse.x = e.clientX - rect.left;
        this.mouse.y = e.clientY - rect.top;
      });

      this.canvas.addEventListener('mouseleave', () => {
        this.mouse.x = null;
        this.mouse.y = null;
      });
    }

    // Intersection observer for performance
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.isVisible = true;
          this.animate();
        } else {
          this.isVisible = false;
          if (this.animationId) {
            cancelAnimationFrame(this.animationId);
            this.animationId = null;
          }
        }
      });
    }, { threshold: 0.1 });

    observer.observe(this.canvas);
  }

  resize() {
    const parent = this.canvas.parentElement;
    this.canvas.width = parent.offsetWidth;
    this.canvas.height = parent.offsetHeight;
  }

  createParticles() {
    this.particles = [];
    for (let i = 0; i < this.options.particleCount; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        vx: (Math.random() - 0.5) * this.options.speed,
        vy: (Math.random() - 0.5) * this.options.speed,
        radius: Math.random() * this.options.particleRadius + 0.5
      });
    }
  }

  animate() {
    if (!this.isVisible) return;

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Update and draw particles
    this.particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;

      // Wrap around edges
      if (p.x < 0) p.x = this.canvas.width;
      if (p.x > this.canvas.width) p.x = 0;
      if (p.y < 0) p.y = this.canvas.height;
      if (p.y > this.canvas.height) p.y = 0;

      // Draw particle
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      this.ctx.fillStyle = this.options.particleColor;
      this.ctx.fill();
    });

    // Draw connections
    for (let i = 0; i < this.particles.length; i++) {
      for (let j = i + 1; j < this.particles.length; j++) {
        const dx = this.particles[i].x - this.particles[j].x;
        const dy = this.particles[i].y - this.particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < this.options.lineDistance) {
          const opacity = 1 - (dist / this.options.lineDistance);
          this.ctx.beginPath();
          this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
          this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
          this.ctx.strokeStyle = this.options.lineColor.replace(/[\d.]+\)$/, (opacity * 0.3) + ')');
          this.ctx.lineWidth = 0.6;
          this.ctx.stroke();
        }
      }
    }

    // Mouse interaction
    if (this.mouse.x !== null && this.mouse.y !== null) {
      this.particles.forEach(p => {
        const dx = this.mouse.x - p.x;
        const dy = this.mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 200) {
          this.ctx.beginPath();
          this.ctx.moveTo(p.x, p.y);
          this.ctx.lineTo(this.mouse.x, this.mouse.y);
          const opacity = 1 - (dist / 200);
          this.ctx.strokeStyle = this.options.lineColor.replace(/[\d.]+\)$/, (opacity * 0.4) + ')');
          this.ctx.lineWidth = 0.5;
          this.ctx.stroke();
        }
      });
    }

    this.animationId = requestAnimationFrame(() => this.animate());
  }
}


/* Spiral / orbital particle effect (red theme) */
class SpiralParticles {
  constructor(canvas, options = {}) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.particles = [];
    this.time = 0;
    this.animationId = null;
    this.isVisible = false;

    this.options = {
      particleCount: options.particleCount || 200,
      color: options.color || '#ff6b6b',
      speed: options.speed || 0.005,
      ...options
    };

    this.init();
  }

  init() {
    this.resize();
    this.createParticles();

    window.addEventListener('resize', () => this.resize());

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.isVisible = true;
          this.animate();
        } else {
          this.isVisible = false;
          if (this.animationId) {
            cancelAnimationFrame(this.animationId);
            this.animationId = null;
          }
        }
      });
    }, { threshold: 0.1 });

    observer.observe(this.canvas);
  }

  resize() {
    const parent = this.canvas.parentElement;
    this.canvas.width = parent.offsetWidth;
    this.canvas.height = parent.offsetHeight;
  }

  createParticles() {
    this.particles = [];
    const cx = this.canvas.width * 0.4;
    const cy = this.canvas.height * 0.5;

    for (let i = 0; i < this.options.particleCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 30 + Math.random() * 200;
      const speed = 0.001 + Math.random() * 0.008;

      this.particles.push({
        angle,
        radius,
        speed,
        size: 1 + Math.random() * 2,
        opacity: 0.3 + Math.random() * 0.7,
        cx, cy
      });
    }
  }

  animate() {
    if (!this.isVisible) return;

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.time += this.options.speed;

    const cx = this.canvas.width * 0.4;
    const cy = this.canvas.height * 0.5;

    this.particles.forEach(p => {
      p.angle += p.speed;

      const wobble = Math.sin(this.time * 2 + p.angle * 3) * 15;
      const x = cx + (p.radius + wobble) * Math.cos(p.angle);
      const y = cy + (p.radius + wobble) * Math.sin(p.angle) * 0.7;

      this.ctx.beginPath();
      this.ctx.arc(x, y, p.size, 0, Math.PI * 2);
      this.ctx.fillStyle = `rgba(255, 107, 107, ${p.opacity * 0.6})`;
      this.ctx.fill();
    });

    // Draw orbital rings
    for (let r = 60; r < 220; r += 50) {
      this.ctx.beginPath();
      this.ctx.ellipse(cx, cy, r, r * 0.7, 0, 0, Math.PI * 2);
      this.ctx.strokeStyle = `rgba(255, 107, 107, ${0.08 + (r % 100 === 0 ? 0.06 : 0)})`;
      this.ctx.lineWidth = 1;
      this.ctx.stroke();
    }

    // Center glow
    const gradient = this.ctx.createRadialGradient(cx, cy, 0, cx, cy, 40);
    gradient.addColorStop(0, 'rgba(255, 107, 107, 0.15)');
    gradient.addColorStop(1, 'rgba(255, 107, 107, 0)');
    this.ctx.fillStyle = gradient;
    this.ctx.beginPath();
    this.ctx.arc(cx, cy, 40, 0, Math.PI * 2);
    this.ctx.fill();

    this.animationId = requestAnimationFrame(() => this.animate());
  }
}


/* Vertical bars / columns effect */
class VerticalBars {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.bars = [];
    this.time = 0;
    this.animationId = null;
    this.isVisible = false;
    this.init();
  }

  init() {
    this.resize();
    this.createBars();

    window.addEventListener('resize', () => {
      this.resize();
      this.createBars();
    });

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.isVisible = true;
          this.animate();
        } else {
          this.isVisible = false;
          if (this.animationId) {
            cancelAnimationFrame(this.animationId);
            this.animationId = null;
          }
        }
      });
    }, { threshold: 0.1 });

    observer.observe(this.canvas);
  }

  resize() {
    const parent = this.canvas.parentElement;
    this.canvas.width = parent.offsetWidth;
    this.canvas.height = parent.offsetHeight;
  }

  createBars() {
    this.bars = [];
    const count = Math.floor(this.canvas.width / 4);
    for (let i = 0; i < count; i++) {
      this.bars.push({
        x: i * 4,
        height: 20 + Math.random() * 60,
        speed: 0.5 + Math.random() * 2,
        phase: Math.random() * Math.PI * 2
      });
    }
  }

  animate() {
    if (!this.isVisible) return;

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.time += 0.02;

    this.bars.forEach(bar => {
      const h = bar.height * (0.5 + 0.5 * Math.sin(this.time * bar.speed + bar.phase));
      const gradient = this.ctx.createLinearGradient(0, this.canvas.height - h, 0, this.canvas.height);
      gradient.addColorStop(0, 'rgba(120, 140, 180, 0.3)');
      gradient.addColorStop(1, 'rgba(120, 140, 180, 0.02)');

      this.ctx.fillStyle = gradient;
      this.ctx.fillRect(bar.x, this.canvas.height - h, 2, h);
    });

    this.animationId = requestAnimationFrame(() => this.animate());
  }
}

// Export classes to window for use in main.js
window.ParticleNetwork = ParticleNetwork;
window.SpiralParticles = SpiralParticles;
window.VerticalBars = VerticalBars;
