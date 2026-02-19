// ===== המבורגר =====
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    hamburger.classList.toggle('active');
  });

  // סגור תפריט בלחיצה על קישור
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      hamburger.classList.remove('active');
    });
  });
}

// ===== Smooth scroll לנאב-בר =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const navHeight = document.querySelector('.navbar').offsetHeight;
      const top = target.getBoundingClientRect().top + window.scrollY - navHeight;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ===== טופס יצירת קשר =====
const form = document.getElementById('contactForm');
const formMsg = document.getElementById('formMsg');

if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();

    // ולידציה בסיסית
    if (!name || !email || !message) {
      formMsg.textContent = '⚠️ אנא מלא את כל השדות';
      formMsg.className = 'form-msg error';
      return;
    }

    if (!email.includes('@')) {
      formMsg.textContent = '⚠️ אימייל לא תקין';
      formMsg.className = 'form-msg error';
      return;
    }

    // פתח חלון מייל (mailto)
    const subject = encodeURIComponent(`הודעה מ-${name} דרך mishmish`);
    const body = encodeURIComponent(`שם: ${name}\nאימייל: ${email}\n\n${message}`);
    window.location.href = `mailto:levmishmish14@gmail.com?subject=${subject}&body=${body}`;

    formMsg.textContent = '✅ מעולה! פותח את תוכנת המייל...';
    formMsg.className = 'form-msg success';
    form.reset();
  });
}

// ===== Navbar scroll effect =====
const navbar = document.getElementById('navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  });
}

// ===== אנימציית כניסה בגלילה =====
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.skill-card, .project-card, .about-text, .contact-info').forEach(el => {
  el.classList.add('fade-in');
  observer.observe(el);
});
