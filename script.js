/* ============================================================
   script.js — Muhammad Hadi Portfolio
   Handles: particles, typing, navbar, scroll reveal,
            counters, skill bars, tilt, form, cursor glow
   ============================================================ */

'use strict';

/* ─── Cursor Glow ──────────────────────────────────────────── */
const cursorGlow = document.getElementById('cursorGlow');
document.addEventListener('mousemove', (e) => {
  cursorGlow.style.left = e.clientX + 'px';
  cursorGlow.style.top  = e.clientY + 'px';
});

/* ─── Particle Canvas ──────────────────────────────────────── */
(function initParticles() {
  const canvas = document.getElementById('particleCanvas');
  const ctx    = canvas.getContext('2d');
  let W, H, particles = [], mouse = { x: null, y: null };

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  class Particle {
    constructor() { this.reset(); }
    reset() {
      this.x  = Math.random() * W;
      this.y  = Math.random() * H;
      this.vx = (Math.random() - 0.5) * 0.35;
      this.vy = (Math.random() - 0.5) * 0.35;
      this.r  = Math.random() * 1.5 + 0.5;
      this.alpha = Math.random() * 0.4 + 0.1;
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      if (this.x < 0 || this.x > W || this.y < 0 || this.y > H) this.reset();
      // Subtle mouse repel
      if (mouse.x != null) {
        const dx = this.x - mouse.x, dy = this.y - mouse.y;
        const dist = Math.sqrt(dx*dx + dy*dy);
        if (dist < 120) {
          this.x += (dx / dist) * 0.5;
          this.y += (dy / dist) * 0.5;
        }
      }
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI*2);
      ctx.fillStyle = `rgba(132,169,140,${this.alpha})`;
      ctx.fill();
    }
  }

  // Create particles
  for (let i = 0; i < 90; i++) particles.push(new Particle());

  // Draw connecting lines
  function drawLines() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const d  = Math.sqrt(dx*dx + dy*dy);
        if (d < 110) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(132,169,140,${0.07 * (1 - d/110)})`;
          ctx.lineWidth   = 0.8;
          ctx.stroke();
        }
      }
    }
  }

  function loop() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => { p.update(); p.draw(); });
    drawLines();
    requestAnimationFrame(loop);
  }
  loop();
})();

/* ─── Typing Effect ────────────────────────────────────────── */
(function initTyping() {
  const phrases = [
    'software systems.',
    'game engines.',
    'data pipelines.',
    'smart algorithms.',
    'low-level magic.',
    'elegant solutions.',
  ];
  const el  = document.getElementById('heroTyped');
  let pi = 0, ci = 0, deleting = false;

  function tick() {
    const phrase = phrases[pi];
    if (!deleting) {
      el.textContent = phrase.slice(0, ++ci);
      if (ci === phrase.length) {
        deleting = true;
        setTimeout(tick, 2200);
        return;
      }
      setTimeout(tick, 70);
    } else {
      el.textContent = phrase.slice(0, --ci);
      if (ci === 0) {
        deleting = false;
        pi = (pi + 1) % phrases.length;
        setTimeout(tick, 400);
        return;
      }
      setTimeout(tick, 38);
    }
  }
  tick();
})();

/* ─── Navbar ───────────────────────────────────────────────── */
(function initNavbar() {
  const navbar  = document.getElementById('navbar');
  const toggle  = document.getElementById('navToggle');
  const links   = document.getElementById('navLinks');
  const navLinkEls = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  });

  toggle.addEventListener('click', () => {
    links.classList.toggle('open');
    // Animate hamburger to X
    const spans = toggle.querySelectorAll('span');
    const isOpen = links.classList.contains('open');
    spans[0].style.transform = isOpen ? 'rotate(45deg) translate(5px,5px)' : '';
    spans[1].style.opacity   = isOpen ? '0' : '1';
    spans[2].style.transform = isOpen ? 'rotate(-45deg) translate(5px,-5px)' : '';
  });

  // Close on nav link click (mobile)
  navLinkEls.forEach(link => {
    link.addEventListener('click', () => {
      links.classList.remove('open');
      const spans = toggle.querySelectorAll('span');
      spans.forEach(s => { s.style.transform = ''; s.style.opacity = '1'; });
    });
  });

  // Active link on scroll
  const sections = document.querySelectorAll('section[id]');
  function updateActive() {
    const scrollY = window.scrollY + 100;
    sections.forEach(sec => {
      const top = sec.offsetTop, h = sec.offsetHeight;
      const id  = sec.getAttribute('id');
      const link = document.querySelector(`.nav-link[href="#${id}"]`);
      if (link) link.classList.toggle('active', scrollY >= top && scrollY < top + h);
    });
  }
  window.addEventListener('scroll', updateActive, { passive: true });
  updateActive();
})();

/* ─── Scroll Reveal (Intersection Observer) ───────────────── */
(function initReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Trigger skill bars when the section enters view
        entry.target.querySelectorAll('.pill-fill').forEach(bar => {
          bar.style.width = bar.dataset.pct + '%';
        });
        // Trigger counters
        entry.target.querySelectorAll('.counter-num, .stat-num').forEach(el => {
          animateCounter(el);
        });
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
})();

/* ─── Counter Animation ────────────────────────────────────── */
function animateCounter(el) {
  if (el.dataset.animated) return;
  el.dataset.animated = 'true';
  const target = parseInt(el.dataset.target, 10);
  const duration = 1400;
  const start = performance.now();
  function step(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(eased * target);
    if (progress < 1) requestAnimationFrame(step);
    else el.textContent = target;
  }
  requestAnimationFrame(step);
}

/* Trigger counters in about section separately (they're inside .reveal) */
(function initCountersTrigger() {
  const aboutSection = document.querySelector('.about-counters');
  const statsSection = document.querySelector('.stats-section');
  if (!aboutSection && !statsSection) return;

  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.counter-num, .stat-num').forEach(animateCounter);
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  [aboutSection, statsSection].forEach(el => { if (el) obs.observe(el); });
})();

/* ─── Skill Bar Trigger (standalone sections) ─────────────── */
(function initSkillBars() {
  const skillSection = document.getElementById('skills');
  if (!skillSection) return;
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        skillSection.querySelectorAll('.pill-fill').forEach(bar => {
          setTimeout(() => { bar.style.width = bar.dataset.pct + '%'; }, 200);
        });
        obs.unobserve(skillSection);
      }
    });
  }, { threshold: 0.1 });
  obs.observe(skillSection);
})();

/* ─── Project Card Tilt ────────────────────────────────────── */
(function initTilt() {
  document.querySelectorAll('[data-tilt]').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const cx = rect.left + rect.width  / 2;
      const cy = rect.top  + rect.height / 2;
      const rx = ((e.clientY - cy) / (rect.height / 2)) * 6;
      const ry = ((e.clientX - cx) / (rect.width  / 2)) * -6;
      card.style.transform = `perspective(600px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-6px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
})();

/* ─── Hero Parallax ────────────────────────────────────────── */
(function initParallax() {
  const hero = document.querySelector('.hero-content');
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    if (hero && y < window.innerHeight) {
      hero.style.transform = `translateY(${y * 0.22}px)`;
      hero.style.opacity   = `${1 - y / (window.innerHeight * 0.8)}`;
    }
  }, { passive: true });
})();

/* ─── Contact Form ─────────────────────────────────────────── */
(function initForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name    = document.getElementById('name').value.trim();
    const email   = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    if (!name || !email || !message) {
      showToast('Please fill in all fields.', 'error');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      showToast('Please enter a valid email address.', 'error');
      return;
    }
    // In production, replace with an actual API call or mailto link
    showToast(`Thanks ${name}! Message sent. I'll get back to you soon.`, 'success');
    form.reset();
  });
})();

/* ─── Toast Notification ───────────────────────────────────── */
function showToast(msg, type = 'success') {
  const existing = document.querySelector('.toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = msg;
  toast.style.cssText = `
    position:fixed; bottom:28px; right:28px; z-index:9999;
    background:${type === 'success' ? '#84A98C' : '#ef4444'};
    color:${type === 'success' ? '#0F172A' : '#fff'};
    padding:14px 22px; border-radius:10px;
    font-family:'Inter',sans-serif; font-size:0.875rem; font-weight:500;
    box-shadow:0 8px 30px rgba(0,0,0,0.4);
    transform:translateY(20px); opacity:0;
    transition:all 0.35s cubic-bezier(0.34,1.56,0.64,1);
    max-width:340px;
  `;
  document.body.appendChild(toast);
  requestAnimationFrame(() => {
    toast.style.transform = 'translateY(0)';
    toast.style.opacity   = '1';
  });
  setTimeout(() => {
    toast.style.transform = 'translateY(20px)';
    toast.style.opacity   = '0';
    setTimeout(() => toast.remove(), 400);
  }, 4000);
}

/* ─── Smooth stagger for reveal items ─────────────────────── */
(function initStagger() {
  document.querySelectorAll('.projects-grid, .skills-grid, .cert-grid, .edu-grid').forEach(grid => {
    const children = grid.querySelectorAll('.reveal');
    children.forEach((child, i) => {
      child.style.transitionDelay = `${i * 0.07}s`;
    });
  });
})();