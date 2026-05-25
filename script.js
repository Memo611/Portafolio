document.addEventListener('DOMContentLoaded', function () {

    // ============================================
    // PARTICLES (bug corregido)
    // ============================================
    const profileWrapper = document.querySelector('.profile-wrapper');
    if (profileWrapper) {
        for (let i = 0; i < 25; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');

            const size = Math.random() * 6 + 2;
            const posX = Math.random() * 100;
            const posY = Math.random() * 100;
            const duration = Math.random() * 8 + 5;
            const delay = Math.random() * 5;

            particle.style.cssText = `
                width: ${size}px;
                height: ${size}px;
                left: ${posX}%;
                top: ${posY}%;
                opacity: ${Math.random() * 0.4 + 0.1};
                background: hsl(${Math.random() > 0.5 ? 345 : Math.random() * 40 + 320}, 100%, 65%);
                animation: particleFloat ${duration}s ${delay}s infinite ease-in-out;
                transform: translate(${Math.random() * 20 - 10}px, ${Math.random() * 20 - 10}px);
            `;
            profileWrapper.appendChild(particle);
        }

        // Inject particle keyframes once
        const style = document.createElement('style');
        style.textContent = `
            @keyframes particleFloat {
                0%, 100% { transform: translate(0px, 0px) scale(1); opacity: 0.3; }
                25% { transform: translate(${Math.random() * 30 - 15}px, ${Math.random() * 30 - 15}px) scale(1.2); opacity: 0.6; }
                50% { transform: translate(${Math.random() * 30 - 15}px, ${Math.random() * 30 - 15}px) scale(0.8); opacity: 0.2; }
                75% { transform: translate(${Math.random() * 30 - 15}px, ${Math.random() * 30 - 15}px) scale(1.1); opacity: 0.5; }
            }
        `;
        document.head.appendChild(style);
    }

    // ============================================
    // MOBILE NAV TOGGLE
    // ============================================
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navLinks.classList.toggle('open');
        });
    }

    // Close nav when a link is clicked
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('open');
        });
    });

    // ============================================
    // ACTIVE NAV LINK ON SCROLL
    // ============================================
    const sections = document.querySelectorAll('section[id]');

    function updateActiveNav() {
        const scrollY = window.scrollY;
        sections.forEach(section => {
            const top = section.offsetTop - 100;
            const bottom = top + section.offsetHeight;
            const id = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href="#${id}"]`);
            if (navLink) {
                navLink.classList.toggle('active', scrollY >= top && scrollY < bottom);
            }
        });
    }

    window.addEventListener('scroll', updateActiveNav, { passive: true });
    updateActiveNav();

    // ============================================
    // SCROLL FADE-IN ANIMATIONS
    // ============================================
    const fadeEls = document.querySelectorAll(
        '.about-content, .skills-category, .project-card, .contact-content, .section-header'
    );

    fadeEls.forEach(el => el.classList.add('fade-in'));

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });

    fadeEls.forEach(el => observer.observe(el));

    // ============================================
    // SKILL BARS ANIMATION
    // ============================================
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.querySelectorAll('.skill-fill').forEach(fill => {
                    setTimeout(() => fill.classList.add('animated'), 200);
                });
                skillObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    document.querySelectorAll('.skills-category').forEach(cat => skillObserver.observe(cat));

    // ============================================
    // PROJECT FILTER
    // ============================================
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.dataset.filter;

            projectCards.forEach(card => {
                const category = card.dataset.category;
                const show = filter === 'all' || category === filter;
                card.classList.toggle('hidden', !show);
                card.style.animation = show ? 'fadeInUp 0.5s ease both' : '';
            });
        });
    });

    // ============================================
    // EMAILJS CONTACT FORM
    // ============================================
    // 1. Crea una cuenta en https://www.emailjs.com
    // 2. Crea un servicio de email (Gmail, Outlook, etc.)
    // 3. Crea un template con variables: {{name}}, {{email}}, {{subject}}, {{message}}
    // 4. Reemplaza los valores de abajo con tus IDs reales

    const EMAILJS_PUBLIC_KEY = 'hTO247X_TlSIzbjlv';   // Settings > API Keys
    const EMAILJS_SERVICE_ID = 'service_zsembqj';   // Email Services
    const EMAILJS_TEMPLATE_ID = 'template_yt5h9sl';  // Email Templates

    if (typeof emailjs !== 'undefined') {
        emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });
    }

    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const btnText = contactForm.querySelector('.btn-text');
            const btnLoading = contactForm.querySelector('.btn-loading');
            const submitBtn = contactForm.querySelector('.submit-btn');

            // Show loading
            btnText.style.display = 'none';
            btnLoading.style.display = 'inline-flex';
            submitBtn.disabled = true;
            formStatus.textContent = '';
            formStatus.className = 'form-status';

            const templateParams = {
                name: contactForm.name.value,
                email: contactForm.email.value,
                subject: contactForm.subject.value,
                message: contactForm.message.value,
            };

            try {
                if (typeof emailjs === 'undefined') {
                    throw new Error('EmailJS not loaded. Please configure your API keys.');
                }

                await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams, {
                    publicKey: EMAILJS_PUBLIC_KEY
                });

                formStatus.textContent = '✅ Message sent! I\'ll get back to you soon.';
                formStatus.classList.add('success');
                contactForm.reset();

            } catch (error) {
                console.error('EmailJS error:', error);
                formStatus.textContent = '❌ Something went wrong. Please try again or email me directly.';
                formStatus.classList.add('error');
            } finally {
                btnText.style.display = 'inline-flex';
                btnLoading.style.display = 'none';
                submitBtn.disabled = false;
            }
        });
    }

    // ============================================
    // SMOOTH SCROLL FOR ANCHOR LINKS
    // ============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

});