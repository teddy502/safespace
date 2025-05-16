
class FormHandler {
    constructor() {
        this.initializeModals();
        this.initializeAuthForms();
    }

    initializeModals() {
        const modals = document.querySelectorAll('.modal');
        modals.forEach(modal => {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) modal.style.display = 'none';
            });
        });
    }

    initializeAuthForms() {
        document.getElementById('loginForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleLogin();
        });
    }

    handleLogin() {
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        
        if (!this.validateEmail(email)) {
            this.showError('Please enter a valid email address');
            return;
        }

        // API integration would go here
    }

    validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    showError(message) {
        const errorEl = document.createElement('div');
        errorEl.className = 'error-message';
        errorEl.textContent = message;
        document.querySelector('.auth-form').prepend(errorEl);
        
        setTimeout(() => {
            errorEl.remove();
        }, 3000);
    }
}

class UIHelper {
    static toggleMobileMenu() {
        document.querySelector('.nav-links').classList.toggle('active');
        document.querySelector('.hamburger').classList.toggle('active');
    }

    static smoothScroll(target) {
        document.querySelector(target).scrollIntoView({
            behavior: 'smooth'
        });
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    new FormHandler();
    
    document.querySelector('.hamburger').addEventListener('click', UIHelper.toggleMobileMenu);
    
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            UIHelper.smoothScroll(link.getAttribute('href'));
        });
    });
});