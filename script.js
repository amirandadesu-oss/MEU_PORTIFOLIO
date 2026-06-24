// ========================================
// SCRIPT.JS - PORTFÓLIO ANILANDER CARVALHO
// ========================================

// ========================================
// 1. MENU MOBILE - TOGGLE HAMBURGUER
// ========================================

const hamburgerMenu = document.querySelector('.hamburger-menu');
const header = document.querySelector('.header');
const navLinks = document.querySelectorAll('.nav-link');

// Abrir/fechar menu ao clicar no hamburguer
hamburgerMenu.addEventListener('click', () => {
    header.classList.toggle('menu-open');
});

// Fechar menu ao clicar num link de navegação
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        header.classList.remove('menu-open');
    });
});

// ========================================
// 2. SCROLL SUAVE PARA LINKS INTERNOS
// ========================================

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        
        // Se for um link interno (#)
        if (href.startsWith('#')) {
            e.preventDefault();
            
            const targetId = href.substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                // Calcular offset para compensar header fixo (aprox 60px)
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                // Scroll suave
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// Também para botões que usam href com #
const heroBtns = document.querySelectorAll('.hero-buttons a[href^="#"]');
heroBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        const href = btn.getAttribute('href');
        if (href.startsWith('#')) {
            e.preventDefault();
            
            const targetId = href.substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// ========================================
// 3. HEADER COM EFEITO DE SCROLL
// ========================================

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// ========================================
// 4. ANO AUTOMÁTICO NO FOOTER
// ========================================

const yearSpan = document.getElementById('year');
const currentYear = new Date().getFullYear();
yearSpan.textContent = currentYear;

// ========================================
// 5. VALIDAÇÃO DO FORMULÁRIO DE CONTACTO
// ========================================

const contactForm = document.getElementById('contactForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');
const formSuccess = document.getElementById('formSuccess');
const submitButton = contactForm.querySelector('button[type="submit"]');

// Função para validar email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Função para limpar erros
function clearErrors() {
    document.getElementById('nameError').textContent = '';
    document.getElementById('emailError').textContent = '';
    document.getElementById('messageError').textContent = '';
    formSuccess.textContent = '';
}

// Função para mostrar erros
function showError(fieldId, message) {
    document.getElementById(fieldId + 'Error').textContent = message;
}

document.getElementById('contactForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const form = e.target;
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const messageError = document.getElementById('messageError');
    const formSuccess = document.getElementById('formSuccess');
    const submitBtn = form.querySelector('button[type="submit"]');

    // Limpar erros anteriores
    nameError.textContent = '';
    emailError.textContent = '';
    messageError.textContent = '';
    formSuccess.textContent = '';

    // Validação
    let valido = true;
    if (!nameInput.value.trim()) {
        nameError.textContent = 'Por favor, indica o teu nome.';
        valido = false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailInput.value.trim())) {
        emailError.textContent = 'Indica um email válido.';
        valido = false;
    }
    if (!messageInput.value.trim()) {
        messageError.textContent = 'Escreve uma mensagem.';
        valido = false;
    }
    if (!valido) return;

    // Envio real via Formspree
    submitBtn.disabled = true;
    const textoOriginal = submitBtn.textContent;
    submitBtn.textContent = 'A enviar...';

    try {
        const response = await fetch(form.action, {
            method: 'POST',
            headers: { 'Accept': 'application/json' },
            body: new FormData(form)
        });

        if (response.ok) {
            formSuccess.textContent = 'Mensagem enviada! Vou responder em breve.';
            formSuccess.style.color = 'var(--accent-mint)';
            form.reset();
        } else {
            throw new Error('Resposta não OK');
        }
    } catch (erro) {
        formSuccess.textContent = 'Não foi possível enviar. Contacta-me diretamente: anilanderm@gmail.com';
        formSuccess.style.color = '#d9534f';
    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = textoOriginal;
    }
});

// ========================================
// 6. REVEAL AO FAZER SCROLL (IntersectionObserver)
// ========================================

const revealElements = document.querySelectorAll(
    '.project-card, .timeline-item'
);

const revealOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
};

const revealOnScroll = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Adicionar classe 'visible' para trigger da animação CSS
            entry.target.classList.add('visible');
            
            // Opcional: parar de observar depois de visível (performance)
            revealOnScroll.unobserve(entry.target);
        }
    });
}, revealOptions);

// Observar todos os elementos
revealElements.forEach(element => {
    revealOnScroll.observe(element);
});

// ========================================
// OBSERVAÇÕES:
// ========================================
// - O menu mobile abre/fecha com toggle de classe
// - O scroll suave compensa a altura do header fixo
// - O header muda de estilo após 50px de scroll (classe 'scrolled')
// - O formulário valida com regex simples e mensagens em português
// - O IntersectionObserver detecta elementos entrando no viewport
// - As animações CSS (fade-in + translateY) estão no style.css
