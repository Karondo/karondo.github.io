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
    if (!details.value || details.value.trim().length < 30) { // was 10
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


// Add this function to update the success message with the user's phone number
function updateSuccessMessage() {
    const phoneInput = document.getElementById('phone');
    const successPhoneElement = document.querySelector('.clickable-phone');
    
    if (phoneInput && successPhoneElement) {
        // Format the phone number for display (adds parentheses and hyphen)
        const rawNumber = phoneInput.value.replace(/\D/g, '');
        let formattedNumber = rawNumber;
        
        if (rawNumber.length === 10) {
            formattedNumber = `(${rawNumber.substring(0, 3)}) ${rawNumber.substring(3, 6)}-${rawNumber.substring(6)}`;
        }
        
        // Update the success message
        successPhoneElement.textContent = formattedNumber;
        

    }
}




// Track submission state
let isSubmitting = false;

// New function to send data to Cloudflare Worker with timeout handling
async function sendFormDataToCloudflare(formData) {
    try {
        // Add timeout to the fetch request (5 seconds)
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000);

        const response = await fetch('https://spotlessrugsproxywork.spotlessrugs-services.workers.dev/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
            signal: controller.signal
        });

        clearTimeout(timeoutId);
        
        const result = await response.json();
        
        if (!result.success) {
            console.error('Failed to send data:', result.error);
            return false;
        }
        
        return true;
    } catch (error) {
        console.error('Error sending data:', error);
        return false;
    } finally {
        isSubmitting = false;
    }
}

// Modified validateAndSubmit function to show success immediately
async function validateAndSubmit() {
    // If already submitting, ignore additional clicks
    if (isSubmitting) {
        return;
    } 
    
    // Lock the form
    isSubmitting = true;
    
    // Disable the submit button to prevent multiple clicks
    const submitButton = document.querySelector('button[type="submit"]');
    if (submitButton) {
        submitButton.disabled = true;
        submitButton.textContent = 'Submitting...';
    }

    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const phone = document.getElementById('phone');
    const zip = document.getElementById('zip');
    const service = document.getElementById('service');
    const details = document.getElementById('details');
    const street = document.getElementById('street');
    const city = document.getElementById('city');
    const state = document.getElementById('state');
    
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
        // Prepare form data
        const formData = {
            name: name.value,
            email: email.value,
            phone: phone.value,
            zip: zip.value,
            service: service.options[service.selectedIndex].text,
            details: details.value,
            street: street.value,
            city: city.value,
            state: state.value
        };
        
        // Immediately show success step without waiting for API response
        updateSuccessMessage();
        showStep(4);
        
        // Scroll to the very top of the page smoothly
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        
        // Send data to Cloudflare Worker in the background
        try {
            await sendFormDataToCloudflare(formData);
        } catch (error) {
            console.error('Background submission error:', error);
            // Don't show error to user since we've already shown success
        } finally {
            // Re-enable the button after submission is complete
            if (submitButton) {
                submitButton.disabled = false;
                submitButton.textContent = 'Get Estimate';
            }
            isSubmitting = false;
        }
    } else {
        // If validation failed, release the submission lock
        isSubmitting = false;
        if (submitButton) {
            submitButton.disabled = false;
            submitButton.textContent = 'Get Estimate';
        }
    }
      // Add event listener to the form to prevent multiple submissions
document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            validateAndSubmit();
        });
    }
});
}



        // Testimonial Slider Functionality - Manual Only
        document.addEventListener('DOMContentLoaded', function() {
            const testimonials = document.querySelectorAll('.testimonial');
            const dots = document.querySelectorAll('.slider-dot');
            
            function showTestimonial(index) {
                // Hide all testimonials
                testimonials.forEach(testimonial => {
                    testimonial.classList.remove('active');
                });
                
                // Update dots
                dots.forEach(dot => {
                    dot.classList.remove('active');
                });
                
                // Show the selected testimonial
                testimonials[index].classList.add('active');
                dots[index].classList.add('active');
            }

            // Add click event to dots
            dots.forEach((dot, index) => {
                dot.addEventListener('click', () => {
                    showTestimonial(index);
                });
            });
        });
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



// Click animation for nav linkssss
document.querySelectorAll('nav a:not(.estimate-btn)').forEach(link => {
    link.addEventListener('click', function(e) {
        // Trigger animation
        this.classList.add('clicked');
        
        // Remove class after animation completes
        setTimeout(() => {
            this.classList.remove('clicked');
        }, 1000); // Matches CSS animation duration
        
        // Close mobile menu if open
        if (window.innerWidth <= 992) {
            document.getElementById('mainNav').classList.remove('active');
        }
    });
});




const callBar = document.querySelector('.call-top-bar');
const TOP_THRESHOLD = 5; // pixels from top (used to be 5)

function checkPosition() {
  if (window.scrollY <= TOP_THRESHOLD) {
    callBar.classList.add('visible');
  } else {
    callBar.classList.remove('visible');
  }
}

// Use IntersectionObserver for perfect top detection
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      callBar.classList.add('visible');
    } else {
      callBar.classList.remove('visible');
    }
  });
}, {
  root: null,
  rootMargin: '0px',
  threshold: 1.0
});

// Observe a small element at the very top of the page
const topSentinel = document.createElement('div');
topSentinel.style.position = 'absolute';
topSentinel.style.top = '0';
topSentinel.style.height = '1px';
document.body.prepend(topSentinel);
observer.observe(topSentinel);

// Fallback for older browsers
window.addEventListener('scroll', checkPosition);
checkPosition(); // Initialize














// Remove any duplicate declarations first
(() => {
  const callBar = document.querySelector('.call-top-bar');
  const TOP_THRESHOLD = 1;
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mainNav = document.getElementById('mainNav');
  
  let isMenuOpen = false;

  function checkPosition() {
    if (!isMenuOpen && window.scrollY <= TOP_THRESHOLD) {
      callBar.classList.add('visible');
    } else {
      callBar.classList.remove('visible');
    }
  }

  function handleMenuToggle() {
    isMenuOpen = mainNav.classList.contains('active');
    checkPosition();
  }

  // Menu observer
  const menuObserver = new MutationObserver(handleMenuToggle);
  menuObserver.observe(mainNav, { 
    attributes: true, 
    attributeFilter: ['class'] 
  });

  // Top detection
  const observer = new IntersectionObserver((entries) => {
    if (!isMenuOpen) {
      entries.forEach(entry => {
        entry.isIntersecting 
          ? callBar.classList.add('visible') 
          : callBar.classList.remove('visible');
      });
    }
  }, { 
    threshold: 1.0 
  });

  const topSentinel = document.createElement('div');
  topSentinel.style.position = 'absolute';
  topSentinel.style.top = '0';
  topSentinel.style.height = '1px';
  document.body.prepend(topSentinel);
  observer.observe(topSentinel);

  // Event listeners
  window.addEventListener('scroll', checkPosition);
  mobileMenuBtn.addEventListener('click', handleMenuToggle);
  checkPosition();
})();









document.addEventListener('DOMContentLoaded', function() {
  const floatingCTA = document.getElementById('floatingCallCTA');
  const section1 = document.getElementById('quote'); // Your first section
  
  window.addEventListener('scroll', function() {
    const section1Height = section1.offsetHeight;
    const scrollPosition = window.scrollY;
    
    // Activate only when Section 1 is COMPLETELY out of view
    if (scrollPosition > section1Height) {
      floatingCTA.classList.add('active');
    } else {
      floatingCTA.classList.remove('active');
    }
  });
});






document.querySelector('.call-top-bar a').href = 'tel:2677773717';
