// Form submission handler
document.getElementById('signinForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const remember = document.getElementById('remember').checked;
    
    // Add loading state to button
    const submitBtn = document.querySelector('.btn-signin');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Signing in...';
    submitBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        console.log('Sign in attempt:', { email, password, remember });
        alert(`Sign in successful!\n\nEmail: ${email}\nRemember me: ${remember}`);
        
        // Reset button
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }, 1500);
});

// Forgot password handler
document.querySelector('.forgot-link').addEventListener('click', function(e) {
    e.preventDefault();
    console.log('Forgot password clicked');
    alert('Password reset link would be sent to your email.');
});

// Sign up handler
document.querySelector('.signup-link').addEventListener('click', function(e) {
    e.preventDefault();
    console.log('Sign up clicked');
    alert('Redirecting to sign up page...');
});

// Add input focus effects
const inputs = document.querySelectorAll('input[type="email"], input[type="password"]');

inputs.forEach(input => {
    input.addEventListener('focus', function() {
        this.parentElement.classList.add('focused');
    });
    
    input.addEventListener('blur', function() {
        this.parentElement.classList.remove('focused');
    });
});

// Add ripple effect to buttons
function createRipple(event) {
    const button = event.currentTarget;
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');
    
    button.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

const buttons = document.querySelectorAll('.btn-signin, .btn-google');
buttons.forEach(button => {
    button.addEventListener('click', createRipple);
});

// Add CSS for ripple effect dynamically
const style = document.createElement('style');
style.textContent = `
    .btn-signin, .btn-google {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Animate background elements on scroll (for responsive view)
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const icons = document.querySelectorAll('.icon');
    
    icons.forEach((icon, index) => {
        const speed = 0.5 + (index * 0.1);
        icon.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Add keyboard navigation
document.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' && document.activeElement.tagName !== 'BUTTON') {
        const form = document.getElementById('signinForm');
        const submitBtn = document.querySelector('.btn-signin');
        
        if (form.checkValidity()) {
            submitBtn.click();
        }
    }
});

// Password visibility toggle (if needed in future)
function togglePasswordVisibility() {
    const passwordInput = document.getElementById('password');
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
}

// Form validation feedback
inputs.forEach(input => {
    input.addEventListener('invalid', function(e) {
        e.preventDefault();
        this.classList.add('error');
    });
    
    input.addEventListener('input', function() {
        this.classList.remove('error');
    });
});

// Add error state CSS
const errorStyle = document.createElement('style');
errorStyle.textContent = `
    input.error {
        border-color: #f56565;
        animation: shake 0.3s ease-in-out;
    }
    
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-5px); }
        75% { transform: translateX(5px); }
    }
`;
document.head.appendChild(errorStyle);

// Console welcome message
console.log('%cTheCubeFactory Sign In', 'color: #1976d2; font-size: 20px; font-weight: bold;');
console.log('%cWelcome! 👋', 'color: #718096; font-size: 14px;');
