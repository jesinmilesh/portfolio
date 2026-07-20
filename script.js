/* ============================================================
   PORTFOLIO — Vanilla JS (no jQuery)
   ============================================================ */

// ── Navbar scroll sticky ──
const navbar = document.getElementById('navbar');
const scrollUpBtn = document.getElementById('scrollUpBtn');

window.addEventListener('scroll', () => {
  if (window.scrollY > 20) navbar.classList.add('sticky');
  else navbar.classList.remove('sticky');

  if (window.scrollY > 500) scrollUpBtn.classList.add('show');
  else scrollUpBtn.classList.remove('show');

  updateActiveLink();
});

scrollUpBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ── Mobile menu toggle ──
const menuBtn = document.getElementById('menuBtn');
const navMenu = document.getElementById('navMenu');
const menuIcon = document.getElementById('menuIcon');

menuBtn.addEventListener('click', () => {
  navMenu.classList.toggle('open');
  menuIcon.classList.toggle('fa-bars');
  menuIcon.classList.toggle('fa-xmark');
});

// Close menu when a link is clicked
document.querySelectorAll('.menu-link').forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('open');
    menuIcon.classList.add('fa-bars');
    menuIcon.classList.remove('fa-xmark');
  });
});

// ── Active nav link on scroll ──
function updateActiveLink() {
  const sections = document.querySelectorAll('section[id]');
  const scrollPos = window.scrollY + 120;
  sections.forEach(sec => {
    const top = sec.offsetTop;
    const height = sec.offsetHeight;
    const id = sec.getAttribute('id');
    const link = document.querySelector(`.menu-link[href="#${id}"]`);
    if (link) {
      if (scrollPos >= top && scrollPos < top + height) link.classList.add('active-link');
      else link.classList.remove('active-link');
    }
  });
}

// ── Typed.js ──
document.addEventListener('DOMContentLoaded', () => {
  if (typeof Typed !== 'undefined') {
    new Typed('.typing', {
      strings: ['Cybersecurity Student', 'Python Developer', 'SOC Analyst', 'Ethical Hacking Enthusiast'],
      typeSpeed: 80, backSpeed: 50, loop: true
    });
    new Typed('.typing-2', {
      strings: ['Cybersecurity Student', 'Python Developer', 'SOC Analyst'],
      typeSpeed: 80, backSpeed: 50, loop: true
    });
  }
});

// ── Intersection Observer — reveal ──
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ── Skill category filter ──
document.querySelectorAll('.cat-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const cat = btn.getAttribute('data-cat');
    document.querySelectorAll('.skill-bar').forEach(bar => {
      if (cat === 'all' || bar.getAttribute('data-cat') === cat) {
        bar.style.display = 'flex';
      } else {
        bar.style.display = 'none';
      }
    });
  });
});

// ── Project filter tabs ──
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.getAttribute('data-filter');
    document.querySelectorAll('.proj-card').forEach(card => {
      const cats = card.getAttribute('data-cat') || '';
      if (filter === 'all' || cats.includes(filter)) {
        card.classList.remove('hidden');
      } else {
        card.classList.add('hidden');
      }
    });
  });
});

// ── Toast notification ──
function showToast(message, type = 'success') {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.className = `toast ${type} show`;
  setTimeout(() => { toast.classList.remove('show'); }, 4000);
}

// ── Send contact message (EmailJS + Web3Forms) ──
function sendMessage() {
  const name    = document.getElementById('c-name').value.trim();
  const email   = document.getElementById('c-email').value.trim();
  const subject = document.getElementById('c-subject').value.trim();
  const message = document.getElementById('c-message').value.trim();

  if (!name || !email || !subject || !message) {
    showToast('Please fill in all fields.', 'error');
    return;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    showToast('Please enter a valid email address.', 'error');
    return;
  }

  const btn = document.getElementById('sendBtn');
  btn.classList.add('loading');
  btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

  // Send via EmailJS
  emailjs.send('service_ly1z5dg', 'template_banowuo', { name, email, subject, message })
    .then(() => {
      showToast('✅ Message sent! I\'ll reply soon.', 'success');
      document.getElementById('contact-form').reset();
    })
    .catch(() => {
      showToast('⚠️ Failed to send. Please email me directly.', 'error');
    })
    .finally(() => {
      btn.classList.remove('loading');
      btn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
    });

  // Also send via Web3Forms
  const formData = { access_key: 'b0d05aee-e867-4b2e-b436-474d50b5f7b4', Name: name, Email: email, Subject: subject, Message: message };
  fetch('https://api.web3forms.com/submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData)
  }).catch(() => {});
}

// ── PRELOADER HIDING ──
window.addEventListener('load', () => {
  const preloader = document.getElementById('preloader');
  if (preloader) {
    preloader.classList.add('fade-out');
    setTimeout(() => {
      preloader.remove();
    }, 600);
  }
});

// ── INTERACTIVE BACKGROUND DOTS & CUSTOM GLOWING CURSOR WITH PARTICLES ──
class InteractiveCursorAndBg {
  constructor() {
    this.mouse = { x: null, y: null, targetX: null, targetY: null, active: false };
    this.particles = [];
    this.dotSpacing = 38;
    this.dots = [];
    
    // Only run on desktop/hover-capable devices
    this.isHoverCapable = window.matchMedia('(hover: hover)').matches;

    // 1. Setup Background Canvas (dots)
    this.bgCanvas = document.createElement('canvas');
    this.bgCtx = this.bgCanvas.getContext('2d');
    this.bgCanvas.className = 'interactive-bg';
    document.body.appendChild(this.bgCanvas);

    // 2. Setup Foreground Canvas (cursor trail & glowing dot)
    if (this.isHoverCapable) {
      this.cursorCanvas = document.createElement('canvas');
      this.cursorCtx = this.cursorCanvas.getContext('2d');
      this.cursorCanvas.className = 'cursor-trail';
      document.body.appendChild(this.cursorCanvas);
    }

    this.resize();
    this.initDots();
    this.bindEvents();
    this.animate();
  }

  resize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;

    this.bgCanvas.width = this.width;
    this.bgCanvas.height = this.height;

    if (this.isHoverCapable && this.cursorCanvas) {
      this.cursorCanvas.width = this.width;
      this.cursorCanvas.height = this.height;
    }

    this.initDots();
  }

  initDots() {
    this.dots = [];
    const cols = Math.ceil(this.width / this.dotSpacing);
    const rows = Math.ceil(this.height / this.dotSpacing);
    
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        const x = i * this.dotSpacing + this.dotSpacing / 2;
        const y = j * this.dotSpacing + this.dotSpacing / 2;
        this.dots.push({
          x: x,
          y: y,
          baseX: x,
          baseY: y
        });
      }
    }
  }

  bindEvents() {
    window.addEventListener('resize', () => this.resize());
    
    const handleMove = (clientX, clientY) => {
      this.mouse.active = true;
      this.mouse.targetX = clientX;
      this.mouse.targetY = clientY;
      
      // Spawn particles if hover-capable and mouse moved
      if (this.isHoverCapable && this.mouse.x !== null) {
        const dx = clientX - this.mouse.x;
        const dy = clientY - this.mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        const count = Math.min(Math.floor(dist / 6) + 1, 3);
        for (let i = 0; i < count; i++) {
          this.particles.push({
            x: clientX,
            y: clientY,
            vx: (Math.random() - 0.5) * 1.6,
            vy: (Math.random() - 0.5) * 1.6,
            size: Math.random() * 3 + 1.5,
            color: Math.random() > 0.4 ? '#7C3AED' : '#06B6D4',
            life: 1.0,
            decay: Math.random() * 0.04 + 0.02
          });
        }
      }
      
      this.mouse.x = clientX;
      this.mouse.y = clientY;
    };

    window.addEventListener('mousemove', (e) => {
      handleMove(e.clientX, e.clientY);
    });

    window.addEventListener('mouseleave', () => {
      this.mouse.active = false;
      this.mouse.targetX = null;
      this.mouse.targetY = null;
    });

    // Touch support (only updates background grid hover effect)
    window.addEventListener('touchmove', (e) => {
      if (e.touches.length > 0) {
        handleMove(e.touches[0].clientX, e.touches[0].clientY);
      }
    }, { passive: true });

    window.addEventListener('touchend', () => {
      this.mouse.active = false;
      this.mouse.targetX = null;
      this.mouse.targetY = null;
    });
  }

  animate() {
    // 1. Draw Background Dots
    this.bgCtx.clearRect(0, 0, this.width, this.height);
    
    // Smooth target mouse interpolation
    if (this.mouse.targetX !== null && this.mouse.x !== null) {
      this.mouse.x += (this.mouse.targetX - this.mouse.x) * 0.18;
      this.mouse.y += (this.mouse.targetY - this.mouse.y) * 0.18;
    }

    this.dots.forEach(dot => {
      let alpha = 0.06;
      
      if (this.mouse.x !== null && this.mouse.active) {
        const dx = this.mouse.x - dot.baseX;
        const dy = this.mouse.y - dot.baseY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < 140) {
          const force = (140 - dist) / 140;
          alpha = 0.06 + force * 0.28;
          
          // Push dots away slightly (cyber grid effect)
          const angle = Math.atan2(dy, dx);
          dot.x = dot.baseX - Math.cos(angle) * force * 10;
          dot.y = dot.baseY - Math.sin(angle) * force * 10;
        } else {
          dot.x += (dot.baseX - dot.x) * 0.08;
          dot.y += (dot.baseY - dot.y) * 0.08;
        }
      } else {
        dot.x += (dot.baseX - dot.x) * 0.08;
        dot.y += (dot.baseY - dot.y) * 0.08;
      }
      
      this.bgCtx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
      this.bgCtx.beginPath();
      this.bgCtx.arc(dot.x, dot.y, 1.0, 0, Math.PI * 2);
      this.bgCtx.fill();
    });

    // 2. Draw Foreground cursor & particles (Only if hover capable)
    if (this.isHoverCapable && this.cursorCanvas && this.cursorCtx) {
      this.cursorCtx.clearRect(0, 0, this.width, this.height);

      // Draw & Update Particles
      for (let i = this.particles.length - 1; i >= 0; i--) {
        const p = this.particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life -= p.decay;
        
        if (p.life <= 0) {
          this.particles.splice(i, 1);
          continue;
        }
        
        this.cursorCtx.save();
        this.cursorCtx.globalAlpha = p.life;
        this.cursorCtx.fillStyle = p.color;
        this.cursorCtx.beginPath();
        this.cursorCtx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
        this.cursorCtx.fill();
        this.cursorCtx.restore();
      }

      // Draw Custom Cursor dot & glowing ring
      if (this.mouse.x !== null && this.mouse.active) {
        this.cursorCtx.save();
        
        // Outer cyan ring
        this.cursorCtx.strokeStyle = 'rgba(6, 182, 212, 0.45)';
        this.cursorCtx.lineWidth = 1.5;
        this.cursorCtx.beginPath();
        this.cursorCtx.arc(this.mouse.x, this.mouse.y, 8, 0, Math.PI * 2);
        this.cursorCtx.stroke();

        // Inner glowing core dot
        this.cursorCtx.fillStyle = '#7C3AED';
        this.cursorCtx.shadowBlur = 10;
        this.cursorCtx.shadowColor = '#7C3AED';
        this.cursorCtx.beginPath();
        this.cursorCtx.arc(this.mouse.x, this.mouse.y, 3, 0, Math.PI * 2);
        this.cursorCtx.fill();
        
        this.cursorCtx.restore();
      }
    }

    requestAnimationFrame(() => this.animate());
  }
}

// ── Scroll-linked Profile Image Transition ──
class ProfileImageScrollTransition {
  constructor() {
    this.image = document.getElementById('transitioningProfileImage');
    this.homePlaceholder = document.getElementById('homeImagePlaceholder');
    this.aboutPlaceholder = document.getElementById('aboutImagePlaceholder');
    this.ticking = false;

    if (!this.image || !this.homePlaceholder || !this.aboutPlaceholder) return;

    // Run immediately to position
    this.init();

    // Run again when layout is fully settled
    window.addEventListener('load', () => this.init());
    window.addEventListener('resize', () => this.requestUpdate());
    window.addEventListener('scroll', () => this.requestUpdate());
  }

  init() {
    this.updatePosition();
    this.image.classList.add('ready');
  }

  requestUpdate() {
    if (!this.ticking) {
      requestAnimationFrame(() => {
        this.updatePosition();
        this.ticking = false;
      });
      this.ticking = true;
    }
  }

  updatePosition() {
    const scrollY = window.scrollY;

    const homeRect = this.homePlaceholder.getBoundingClientRect();
    const aboutRect = this.aboutPlaceholder.getBoundingClientRect();

    const homeTop = homeRect.top + scrollY;
    const homeLeft = homeRect.left + window.scrollX;
    const aboutTop = aboutRect.top + scrollY;
    const aboutLeft = aboutRect.left + window.scrollX;

    const startScroll = 0;
    const endScroll = Math.max(100, aboutTop - window.innerHeight * 0.25);

    let progress = (scrollY - startScroll) / (endScroll - startScroll);
    progress = Math.max(0, Math.min(1, progress));

    const top = homeTop + (aboutTop - homeTop) * progress;
    const left = homeLeft + (aboutLeft - homeLeft) * progress;
    const width = homeRect.width + (aboutRect.width - homeRect.width) * progress;
    const height = homeRect.height + (aboutRect.height - homeRect.height) * progress;

    this.image.style.left = `${left}px`;
    this.image.style.top = `${top}px`;
    this.image.style.width = `${width}px`;
    this.image.style.height = `${height}px`;
  }
}

// Instantiate once the page elements are loaded
document.addEventListener('DOMContentLoaded', () => {
  new InteractiveCursorAndBg();
  new ProfileImageScrollTransition();
});
