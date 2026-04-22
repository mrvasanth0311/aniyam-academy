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
  const logos = document.querySelectorAll('header .logo-placeholder');
  logos.forEach(logo => {
    logo.style.cursor = 'pointer';
    logo.addEventListener('click', () => {
      window.location.reload();
    });
  });

  // --- Fullscreen Image Lightbox ---
  const imgPlaceholders = document.querySelectorAll('.img-placeholder, .gallery-item img, .contact-card img');
  if (imgPlaceholders.length > 0) {
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox-overlay';
    lightbox.style.cssText = `
      position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
      background: rgba(0,0,0,0.9); z-index: 9999; display: none;
      justify-content: center; align-items: center; cursor: zoom-out;
      padding: 40px;
    `;
    
    const lightboxImg = document.createElement('img');
    lightboxImg.style.cssText = `
      max-width: 100%; max-height: 100%;
      object-fit: contain; display: none;
      border-radius: 8px; box-shadow: 0 10px 30px rgba(0,0,0,0.5);
    `;
    
    const lightboxText = document.createElement('div');
    lightboxText.style.cssText = `
      width: 100%; height: 100%;
      max-width: 800px; max-height: 80vh;
      display: none; justify-content: center; align-items: center;
      color: white; font-size: 2rem; text-align: center;
      background: var(--bg-card); border: 1px dashed var(--glass-border);
      border-radius: 12px;
    `;
    
    lightbox.appendChild(lightboxImg);
    lightbox.appendChild(lightboxText);
    document.body.appendChild(lightbox);
    
    lightbox.addEventListener('click', () => {
      lightbox.style.display = 'none';
      lightboxImg.style.display = 'none';
      lightboxText.style.display = 'none';
      lightboxImg.src = '';
    });

    imgPlaceholders.forEach(img => {
      // Ignore items inside links (like video reels playing externally)
      if (img.closest('a')) return;
      
      img.style.cursor = 'zoom-in';
      img.addEventListener('click', () => {
        let srcUrl = '';
        
        if (img.tagName.toLowerCase() === 'img') {
          srcUrl = img.src;
        } else {
          const bgImg = img.style.backgroundImage;
          if (bgImg && bgImg !== 'none') {
            const match = bgImg.match(/url\([\"\']?(.*?)[\"\']?\)/);
            if (match && match[1]) {
               srcUrl = match[1];
            }
          }
        }

        if (srcUrl) {
           lightboxImg.src = srcUrl;
           lightboxImg.style.display = 'block';
           lightboxText.style.display = 'none';
        } else {
           lightboxText.innerText = img.innerText;
           lightboxText.style.display = 'flex';
           lightboxImg.style.display = 'none';
        }
        
        lightbox.style.display = 'flex';
      });
    });
  }
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
    width: 50px;
    height: 50px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 28px;
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
