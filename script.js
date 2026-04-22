// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Price Calculation Function
function updatePriceCalculation() {
    const planSelect = document.getElementById('plan');
    const addonCheckboxes = document.querySelectorAll('input[name="addons"]:checked');
    const basePriceElement = document.getElementById('base-price');
    const addonsPriceElement = document.getElementById('addons-price');
    const totalPriceElement = document.getElementById('total-price');
    
    if (!planSelect || !basePriceElement || !addonsPriceElement || !totalPriceElement) return;
    
    // Calculate base price
    let basePrice = 0;
    if (planSelect.value) {
        const priceMatch = planSelect.value.match(/\$(\d+)/);
        if (priceMatch) {
            basePrice = parseInt(priceMatch[1]);
        }
    }
    
    // Calculate add-ons price
    let addonsPrice = 0;
    addonCheckboxes.forEach(checkbox => {
        const priceMatch = checkbox.value.match(/\$(\d+)/);
        if (priceMatch) {
            addonsPrice += parseInt(priceMatch[1]);
        }
    });
    
    // Update display
    basePriceElement.textContent = `$${basePrice}`;
    addonsPriceElement.textContent = `$${addonsPrice}`;
    totalPriceElement.textContent = `$${basePrice + addonsPrice}`;
}

// Enhanced Contact Form Handler for Formspree
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const business = document.getElementById('business').value;
    const projectType = document.getElementById('project-type').value;
    const message = document.getElementById('message').value;
    const plan = document.getElementById('plan').value;
    
    // Get selected add-ons
    const addonCheckboxes = document.querySelectorAll('input[name="addons"]:checked');
    const selectedAddons = Array.from(addonCheckboxes).map(cb => cb.value);
    
    // Get pricing information
    const basePrice = document.getElementById('base-price').textContent;
    const totalPrice = document.getElementById('total-price').textContent;
    
    // Create comprehensive project summary
    const projectSummary = `NEW WEBSITE PROJECT INQUIRY

=== CONTACT INFORMATION ===
Name: ${name}
Email: ${email}
Business Name: ${business || 'Not provided'}

=== PROJECT DETAILS ===
Project Type: ${projectType}
Project Description: ${message}

=== SELECTED PLAN ===
Plan: ${plan}
Base Price: ${basePrice}

=== ADD-ON FEATURES ===
${selectedAddons.length > 0 ? selectedAddons.join('\n') : 'No add-ons selected'}

=== PRICING SUMMARY ===
Base Plan: ${basePrice}
Add-ons: ${document.getElementById('addons-price').textContent}
Total Price: ${totalPrice}

=== NEXT STEPS ===
Please contact this client within 24 hours to discuss their project requirements.
Review their selected plan and add-ons, and confirm the project scope.

Sent from PointScale website booking form`;
    
    // Create hidden field for project summary
    const existingSummary = this.querySelector('input[name="project_summary"]');
    if (existingSummary) {
        existingSummary.remove();
    }
    
    const summaryField = document.createElement('input');
    summaryField.type = 'hidden';
    summaryField.name = 'project_summary';
    summaryField.value = projectSummary;
    this.appendChild(summaryField);
    
    // Disable submit button
    const submitBtn = document.getElementById('submit-btn');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';
    
    // Submit to Formspree
    fetch(this.action, {
        method: 'POST',
        body: new FormData(this),
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        }
        throw new Error('Network response was not ok.');
    })
    .then(data => {
        // Show success message
        document.getElementById('success-message').style.display = 'block';
        document.getElementById('error-message').style.display = 'none';
        
        // Reset form
        this.reset();
        updatePriceCalculation();
        
        // Hide success message after 5 seconds
        setTimeout(() => {
            document.getElementById('success-message').style.display = 'none';
        }, 5000);
    })
    .catch(error => {
        console.error('Error:', error);
        // Show error message
        document.getElementById('error-message').style.display = 'block';
        document.getElementById('success-message').style.display = 'none';
    })
    .finally(() => {
        // Re-enable submit button
        submitBtn.disabled = false;
        submitBtn.textContent = 'Send Booking Request';
    });
});

// Add event listeners for price calculation
document.addEventListener('DOMContentLoaded', function() {
    // Plan selection change
    const planSelect = document.getElementById('plan');
    if (planSelect) {
        planSelect.addEventListener('change', updatePriceCalculation);
    }
    
    // Add-on checkboxes change
    const addonCheckboxes = document.querySelectorAll('input[name="addons"]');
    addonCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', updatePriceCalculation);
    });
    
    // Initialize price calculation
    updatePriceCalculation();
});

// Add scroll effect to navbar
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.service-card, .portfolio-card, .pricing-card, .add-on-item');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Active navigation link highlighting
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 100)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});
