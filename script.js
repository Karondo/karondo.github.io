// Mobile Navigation
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mainNav = document.getElementById('mainNav');

mobileMenuBtn.addEventListener('click', () => {
    mainNav.classList.toggle('active');
});

// Form Navigation
const steps = document.querySelectorAll('.form-step');
const progressBar = document.getElementById('progressBar');
const progressSteps = document.querySelectorAll('.progress-step');
let currentStep = 0;

function showStep(stepIndex) {
    steps.forEach((step, index) => {
        if (index === stepIndex) {
            step.classList.add('active');
        } else {
            step.classList.remove('active');
        }
    });
    
    // Update progress bar and steps
    if (stepIndex < 4) {
        // For form steps (0-3)
        const progressPercent = (stepIndex / 3) * 100;
        progressBar.style.width = `${progressPercent}%`;
        
        progressSteps.forEach((step, index) => {
            if (index <= stepIndex) {
                step.classList.add('active');
                step.classList.remove('completed');
            } else {
                step.classList.remove('active');
                step.classList.remove('completed');
            }
        });
    } else {
        // For success step (step 4)
        progressBar.style.width = '100%';
        progressSteps.forEach(step => {
            step.classList.remove('active');
            step.classList.add('completed');
        });
    }
    
    currentStep = stepIndex;
}

function nextStep() {
    if (currentStep < steps.length - 1) {
        showStep(currentStep + 1);
    }
}

function prevStep() {
    if (currentStep > 0) {
        showStep(currentStep - 1);
    }
}

// Form Validation
function validateStep1() {
    const zip = document.getElementById('zip');
    const service = document.getElementById('service');
    let isValid = true;
    
    // Reset errors
    document.getElementById('zip-error').style.display = 'none';
    document.getElementById('service-error').style.display = 'none';
    zip.classList.remove('error-highlight');
    service.classList.remove('error-highlight');
    
    // Validate zip code
    if (!zip.value || zip.value.length < 5) {
        document.getElementById('zip-error').style.display = 'block';
        zip.classList.add('error-highlight');
        isValid = false;
    }
    
    // Validate service
    if (!service.value) {
        document.getElementById('service-error').style.display = 'block';
        service.classList.add('error-highlight');
        isValid = false;
    }
    
    if (isValid) {
        nextStep();
    }
}

function validateStep2() {
    const details = document.getElementById('details');
    let isValid = true;
    
    // Reset errors
    document.getElementById('details-error').style.display = 'none';
    details.classList.remove('error-highlight');
    
    // Validate details
    if (!details.value || details.value.trim().length < 10) {
        document.getElementById('details-error').style.display = 'block';
        details.classList.add('error-highlight');
        isValid = false;
    }
    
    if (isValid) {
        nextStep();
    }
}

function validateStep3() {
    const street = document.getElementById('street');
    const city = document.getElementById('city');
    const state = document.getElementById('state');
    let isValid = true;
    
    // Reset errors
    document.getElementById('street-error').style.display = 'none';
    document.getElementById('city-error').style.display = 'none';
    document.getElementById('state-error').style.display = 'none';
    street.classList.remove('error-highlight');
    city.classList.remove('error-highlight');
    state.classList.remove('error-highlight');
    
    // Validate street
    if (!street.value) {
        document.getElementById('street-error').style.display = 'block';
        street.classList.add('error-highlight');
        isValid = false;
    }
    
    // Validate city
    if (!city.value) {
        document.getElementById('city-error').style.display = 'block';
        city.classList.add('error-highlight');
        isValid = false;
    }
    
    // Validate state
    if (!state.value) {
        document.getElementById('state-error').style.display = 'block';
        state.classList.add('error-highlight');
        isValid = false;
    }
    
    if (isValid) {
        nextStep();
    }
}

function validateAndSubmit() {
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const phone = document.getElementById('phone');
    let isValid = true;
    
    // Reset errors
    document.getElementById('name-error').style.display = 'none';
    document.getElementById('email-error').style.display = 'none';
    document.getElementById('phone-error').style.display = 'none';
    name.classList.remove('error-highlight');
    email.classList.remove('error-highlight');
    phone.classList.remove('error-highlight');
    
    // Validate name
    if (!name.value) {
        document.getElementById('name-error').style.display = 'block';
        name.classList.add('error-highlight');
        isValid = false;
    }
    
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.value || !emailRegex.test(email.value)) {
        document.getElementById('email-error').style.display = 'block';
        email.classList.add('error-highlight');
        isValid = false;
    }
    
    // Validate phone
    const phoneRegex = /^\d{10}$/;
    if (!phone.value || !phoneRegex.test(phone.value.replace(/\D/g, ''))) {
        document.getElementById('phone-error').style.display = 'block';
        phone.classList.add('error-highlight');
        isValid = false;
    }
    
    if (isValid) {
        // Set success message details
        const service = document.getElementById('service');
        const serviceText = service.options[service.selectedIndex].text;
        const zip = document.getElementById('zip').value;
        
        document.getElementById('summary-service').textContent = serviceText;
        document.getElementById('summary-zip').textContent = zip;
        document.getElementById('summary-email').textContent = email.value;
        
        // Show success step
        showStep(4);
    }
}

// Reset form to initial state
function resetForm() {
    // Clear all form fields
    document.getElementById('zip').value = '';
    document.getElementById('service').selectedIndex = 0;
    document.getElementById('details').value = '';
    document.getElementById('street').value = '';
    document.getElementById('city').value = '';
    document.getElementById('state').value = '';
    document.getElementById('name').value = '';
    document.getElementById('email').value = '';
    document.getElementById('phone').value = '';
    
    // Reset error states
    document.querySelectorAll('.error-message').forEach(el => {
        el.style.display = 'none';
    });
    document.querySelectorAll('.form-control').forEach(el => {
        el.classList.remove('error-highlight');
    });
    
    // Reset progress bar
    progressBar.style.width = '0%';
    progressSteps.forEach((step, index) => {
        step.classList.remove('active');
        step.classList.remove('completed');
        if (index === 0) {
            step.classList.add('active');
        }
    });
    
    // Go back to first step
    showStep(0);
}

// Testimonial Slider
const testimonials = document.querySelectorAll('.testimonial');
const dots = document.querySelectorAll('.slider-dot');
let currentTestimonial = 0;

function showTestimonial(index) {
    testimonials.forEach(testimonial => testimonial.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    testimonials[index].classList.add('active');
    dots[index].classList.add('active');
    
    currentTestimonial = index;
}

dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        showTestimonial(index);
    });
});

// Auto rotate testimonials
setInterval(() => {
    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    showTestimonial(currentTestimonial);
}, 5000);

// FAQ Accordion
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', () => {
        item.classList.toggle('active');
    });
});


// Smooth scrolling for navigation links (without active class)
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#quote') {
            document.querySelector(targetId).scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        } else {
            document.querySelector(targetId).scrollIntoView({
                behavior: 'smooth'
            });
        }
        
        // Close mobile menu if open
        if (window.innerWidth <= 992) {
            mainNav.classList.remove('active');
        }
    });
});



// Chrome-compatible click handler
document.querySelectorAll('nav a:not(.estimate-btn)').forEach(link => {
    link.addEventListener('click', function(e) {
        // Prevent Edge double-trigger bug
        e.stopImmediatePropagation();
        
        // Force reflow for Chrome animation
        void this.offsetWidth;
        
        // Trigger animation
        this.classList.add('clicked');
        
        // Cleanup after animation
        setTimeout(() => {
            this.classList.remove('clicked');
        }, 1000);
        
        // Mobile menu handling
        if (window.innerWidth <= 992) {
            document.getElementById('mainNav').classList.remove('active');
        }
    });
});
