// ── SCROLL ANIMATIONS ──
const animObserver = new IntersectionObserver((entries) => {
  entries.forEach(el => {
    if (el.isIntersecting) {
      el.target.classList.add('visible');
      animObserver.unobserve(el.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('[data-animate], [data-stagger]').forEach(el => animObserver.observe(el));

// ── URL FILTER PARAM (e.g. menu.html?filter=pizza) ──
const params = new URLSearchParams(location.search);
const preFilter = params.get('filter');
if (preFilter) {
  const target = document.querySelector(`.filter-btn[data-filter="${preFilter}"]`);
  if (target) target.click();
}

// ── NEWSLETTER FORM ──
const newsletterForm = document.getElementById('newsletterForm');
newsletterForm?.addEventListener('submit', e => {
  e.preventDefault();
  const btn = newsletterForm.querySelector('button');
  btn.textContent = '✓ Subscribed!';
  btn.style.background = '#28a745';
  btn.style.borderColor = '#28a745';
  newsletterForm.querySelector('input').value = '';
  setTimeout(() => {
    btn.textContent = 'Subscribe';
    btn.style.background = '';
    btn.style.borderColor = '';
  }, 3000);
});

// ── NAV TOGGLE ──
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger?.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

// ── DROPDOWN (click toggle) ──
document.querySelectorAll('.dropdown-toggle').forEach(toggle => {
  toggle.addEventListener('click', e => {
    e.preventDefault();
    toggle.closest('.dropdown').classList.toggle('open');
  });
});

// Close dropdown when clicking outside
document.addEventListener('click', e => {
  if (!e.target.closest('.dropdown')) {
    document.querySelectorAll('.dropdown').forEach(d => d.classList.remove('open'));
  }
});

// Close dropdown when a dropdown item is clicked
document.querySelectorAll('.dropdown-menu a').forEach(link => {
  link.addEventListener('click', () => {
    document.querySelectorAll('.dropdown').forEach(d => d.classList.remove('open'));
  });
});

// ── SMOOTH SCROLL for anchor links ──
document.querySelectorAll('a[href*="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const url = new URL(link.href);
    if (url.pathname.replace(/^\//, '') === location.pathname.replace(/^\//, '') || url.pathname.endsWith(location.pathname.split('/').pop())) {
      const target = document.querySelector(url.hash);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        navLinks.classList.remove('open');
      }
    }
  });
});

// Mark active nav link
document.querySelectorAll('.nav-links a').forEach(link => {
  if (link.href === location.href) link.classList.add('active');
});

// ── MENU FILTER ──
const filterBtns = document.querySelectorAll('.filter-btn');
const menuCards = document.querySelectorAll('.menu-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const cat = btn.dataset.filter;
    menuCards.forEach(card => {
      const show = cat === 'all' || card.dataset.cat === cat;
      card.style.display = show ? 'block' : 'none';
    });
  });
});

// ── CONTACT FORM ──
const form = document.getElementById('contactForm');
form?.addEventListener('submit', e => {
  e.preventDefault();
  document.getElementById('successMsg').style.display = 'block';
  form.reset();
  setTimeout(() => {
    document.getElementById('successMsg').style.display = 'none';
  }, 4000);
});

// ── ADD TO CART TOAST ──
document.querySelectorAll('.add-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    btn.textContent = '✓ Added';
    btn.style.background = '#28a745';
    setTimeout(() => {
      btn.textContent = 'Add';
      btn.style.background = '';
    }, 1500);
  });
});

// ── COUNTER ANIMATION (stats) ──
const counters = document.querySelectorAll('.stat h2[data-target]');
const animateCounters = () => {
  counters.forEach(counter => {
    const target = +counter.dataset.target;
    const step = target / 60;
    let current = 0;
    const update = () => {
      current += step;
      if (current < target) {
        counter.textContent = Math.ceil(current) + (counter.dataset.suffix || '');
        requestAnimationFrame(update);
      } else {
        counter.textContent = target + (counter.dataset.suffix || '');
      }
    };
    update();
  });
};

const statsSection = document.querySelector('.stats');
if (statsSection) {
  const observer = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) { animateCounters(); observer.disconnect(); }
  }, { threshold: 0.4 });
  observer.observe(statsSection);
}
