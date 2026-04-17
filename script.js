// Scroll Reveal Animation
document.addEventListener('DOMContentLoaded', () => {
  const reveals = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
  });

  reveals.forEach(reveal => {
    revealObserver.observe(reveal);
  });

  // Highlight active nav link based on current page
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link');
  
  navLinks.forEach(link => {
    if (link.getAttribute('href') === currentPath) {
      link.classList.add('active');
    }
  });

  // --- Mobile Hamburger Menu Injection ---
  const header = document.querySelector('.global-header');
  const nav = document.querySelector('.floating-nav');
  
  if (header && nav) {
    const hamburger = document.createElement('div');
    hamburger.innerHTML = '<span class="material-icons">menu</span>';
    hamburger.className = 'hamburger-btn';
    
    hamburger.addEventListener('click', () => {
      nav.classList.toggle('open');
      const icon = hamburger.querySelector('.material-icons');
      icon.textContent = nav.classList.contains('open') ? 'close' : 'menu';
    });
    
    header.appendChild(hamburger);
  }

  // --- Global Button Redirects ---
  // The user will replace this string inside script.js later!
  const GOOGLE_FORM_URL = 'https://forms.gle/YOUR_LINK_HERE'; // Replace with the actual link when ready
  
  document.querySelectorAll('button').forEach(btn => {
    const text = btn.textContent.toLowerCase().trim();
    if (text.includes('enroll now')) {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        window.open(GOOGLE_FORM_URL, '_blank');
      });
    } else if (text.includes('view all courses') || text.includes('explore courses')) {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        window.location.href = 'courses.html';
      });
    }
  });

  // --- Footer Social Icons Injection ---
  const faLink = document.createElement('link');
  faLink.rel = 'stylesheet';
  faLink.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css';
  document.head.appendChild(faLink);

  const socialContainers = document.querySelectorAll('.social-icons');
  socialContainers.forEach(container => {
    container.innerHTML = `
      <a href="https://www.instagram.com/aniyam_academy/?hl=en" target="_blank" class="social-icon" title="Instagram"><i class="fab fa-instagram"></i></a>
      <a href="https://www.facebook.com/p/Aniyam-Academy-61560764136309/" target="_blank" class="social-icon" title="Facebook"><i class="fab fa-facebook-f"></i></a>
      <a href="https://wa.me/917339692434" target="_blank" class="social-icon" title="WhatsApp"><i class="fab fa-whatsapp"></i></a>
    `;
  });

  // --- Logo Refresh Logic ---
  const logos = document.querySelectorAll('.logo-placeholder');
  logos.forEach(logo => {
    logo.style.cursor = 'pointer';
    logo.addEventListener('click', () => {
      window.location.reload();
    });
  });
  // --- Floating WhatsApp Icon ---
  // To disable this icon, simply comment out or remove this block
  const floatWa = document.createElement('a');
  floatWa.href = "https://wa.me/917339692434";
  floatWa.target = "_blank";
  floatWa.innerHTML = '<i class="fab fa-whatsapp"></i>';
  floatWa.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    background: linear-gradient(135deg, var(--accent-pink), var(--accent-purple));
    color: white;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 32px;
    box-shadow: 0 4px 15px rgba(0,0,0,0.4);
    z-index: 1000;
    transition: transform 0.3s ease;
    text-decoration: none;
  `;
  floatWa.onmouseover = () => floatWa.style.transform = 'scale(1.1)';
  floatWa.onmouseout = () => floatWa.style.transform = 'scale(1)';
  if (!window.location.pathname.includes('contact.html')) {
      document.body.appendChild(floatWa);
  }
});
