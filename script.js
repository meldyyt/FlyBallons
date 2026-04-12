/* =============================================
   FlyBalloons — Main JavaScript
   ============================================= */

// ===== BURGER MENU =====
const burger = document.getElementById('burger');
const mobileMenu = document.getElementById('mobileMenu');

if (burger && mobileMenu) {
  burger.addEventListener('click', () => {
    burger.classList.toggle('open');
    mobileMenu.classList.toggle('open');
    document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
  });

  // Close on link click
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      burger.classList.remove('open');
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

// ===== SCROLL TO TOP =====
const scrollTopBtn = document.getElementById('scrollTop');
if (scrollTopBtn) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      scrollTopBtn.classList.add('visible');
    } else {
      scrollTopBtn.classList.remove('visible');
    }
  });
  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ===== FADE IN ON SCROLL =====
const fadeEls = document.querySelectorAll('.fade-in');
if (fadeEls.length > 0) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, entry.target.dataset.delay || 0);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  fadeEls.forEach((el, i) => {
    if (!el.dataset.delay) el.dataset.delay = i * 60;
    observer.observe(el);
  });
}

// ===== TABS =====
const tabBtns = document.querySelectorAll('.tab-btn');
tabBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const target = btn.dataset.tab;
    // Deactivate all
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
    // Activate selected
    btn.classList.add('active');
    const contentEl = document.getElementById('tab-' + target);
    if (contentEl) contentEl.classList.add('active');
  });
});

// ===== MODAL =====
const modal = document.getElementById('modal');
const modalImg = document.getElementById('modalImg');
const modalTitle = document.getElementById('modalTitle');
const modalPrice = document.getElementById('modalPrice');
const modalWA = document.getElementById('modalWA');
const modalClose = document.getElementById('modalClose');

function openModal(card) {
  const img = card.dataset.img;
  const name = card.dataset.name;
  const price = card.dataset.price;
  const id = card.dataset.id;

  // Build unique product URL
  const productUrl = window.location.origin + window.location.pathname + '#' + id;

  // Set modal content
  if (modalImg) {
    if (img) {
      modalImg.src = img;
      modalImg.style.display = 'block';
    } else {
      modalImg.style.display = 'none';
    }
  }
  if (modalTitle) modalTitle.textContent = name || '';
  if (modalPrice) modalPrice.textContent = price || '';

  // WhatsApp link with product URL
  if (modalWA) {
    const waText = encodeURIComponent(`Здравствуйте, хочу купить композицию из шаров: ${productUrl}`);
    modalWA.href = `https://wa.me/87066179128?text=${waText}`;
  }

  if (modal) {
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
}

function closeModal() {
  if (modal) {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }
}

// Product card click
document.querySelectorAll('.product-card').forEach(card => {
  card.addEventListener('click', () => openModal(card));
});

// Close button
if (modalClose) modalClose.addEventListener('click', closeModal);

// Click outside
if (modal) {
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
}

// Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();
});

// ===== STAGGER CARDS =====
document.querySelectorAll('.product-card').forEach((card, i) => {
  card.style.transitionDelay = `${i * 50}ms`;
});
