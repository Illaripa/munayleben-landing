// Nav scroll
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => nav.classList.toggle('scrolled', window.scrollY > 50));

// Mobile menu
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
menuToggle.addEventListener('click', () => navLinks.classList.toggle('open'));
navLinks.querySelectorAll('a').forEach(link =>
    link.addEventListener('click', () => navLinks.classList.remove('open'))
);

// FAQ accordion
document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
        const item = btn.parentElement;
        const wasActive = item.classList.contains('active');
        document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));
        if (!wasActive) item.classList.add('active');
    });
});

// Scroll reveal
const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (!prefersReduced) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
} else {
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            const navHeight = nav.offsetHeight;
            const targetPos = target.getBoundingClientRect().top + window.pageYOffset - navHeight - 20;
            window.scrollTo({ top: targetPos, behavior: 'smooth' });
        }
    });
});

// Cookie consent
function acceptCookies() {
    localStorage.setItem('cookieConsent', 'accepted');
    document.getElementById('cookieConsent').style.display = 'none';
}

function rejectCookies() {
    localStorage.setItem('cookieConsent', 'rejected');
    document.getElementById('cookieConsent').style.display = 'none';
}

if (!localStorage.getItem('cookieConsent')) {
    const banner = document.getElementById('cookieConsent');
    if (banner) banner.style.display = 'block';
}

// Lead capture modal
const modalOverlay = document.getElementById('leadModal');
const modalCloseBtn = document.getElementById('modalClose');

function openModal() {
    if (modalOverlay) {
        modalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeModal() {
    if (modalOverlay) {
        modalOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }
}

if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) closeModal();
    });
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
});

// Lead form submit
function handleLeadSubmit(e) {
    e.preventDefault();
    const btn = e.target.querySelector('.btn-submit');
    const original = btn.textContent;
    btn.textContent = 'Angemeldet! Wir melden uns bei dir.';
    btn.style.background = '#2D4A3E';
    btn.disabled = true;
    setTimeout(() => {
        btn.textContent = original;
        btn.style.background = '';
        btn.disabled = false;
        e.target.reset();
        closeModal();
    }, 3000);
}
