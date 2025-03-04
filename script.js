// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
    }
    
    // Add active class to navigation links based on scroll position
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    
    function updateActiveNavLink() {
        const scrollPosition = window.scrollY;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionBottom = sectionTop + section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                navLinks.forEach(link => {
                    link.classList.remove('nav-active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('nav-active');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveNavLink);
    
    // Add animation to elements when they come into view
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    
    function checkIfInView() {
        const windowHeight = window.innerHeight;
        const windowTopPosition = window.scrollY;
        const windowBottomPosition = windowTopPosition + windowHeight;
        
        animateElements.forEach(element => {
            const elementHeight = element.offsetHeight;
            const elementTopPosition = element.offsetTop;
            const elementBottomPosition = elementTopPosition + elementHeight;
            
            if (
                (elementBottomPosition >= windowTopPosition) &&
                (elementTopPosition <= windowBottomPosition)
            ) {
                element.classList.add('animate-fadeIn');
            }
        });
    }
    
    window.addEventListener('scroll', checkIfInView);
    window.addEventListener('resize', checkIfInView);
    window.addEventListener('load', checkIfInView);
    
    // Add resource-item class to resource list items for hover effects
    const resourceItems = document.querySelectorAll('#resources li');
    resourceItems.forEach(item => {
        item.classList.add('resource-item', 'transition-all', 'duration-300');
    });
    
    // Contact form validation and submission
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // Get form fields
            const nameField = document.getElementById('name');
            const emailField = document.getElementById('email');
            const subjectField = document.getElementById('subject');
            const messageField = document.getElementById('message');
            
            // Simple validation
            let isValid = true;
            
            if (!nameField.value.trim()) {
                highlightInvalidField(nameField);
                isValid = false;
            } else {
                resetField(nameField);
            }
            
            if (!emailField.value.trim() || !isValidEmail(emailField.value)) {
                highlightInvalidField(emailField);
                isValid = false;
            } else {
                resetField(emailField);
            }
            
            if (!subjectField.value.trim()) {
                highlightInvalidField(subjectField);
                isValid = false;
            } else {
                resetField(subjectField);
            }
            
            if (!messageField.value.trim()) {
                highlightInvalidField(messageField);
                isValid = false;
            } else {
                resetField(messageField);
            }
            
            if (isValid) {
                // In a real application, you would send the form data to a server
                // For this demo, we'll just show a success message
                showFormSuccess();
            }
        });
    }
    
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    function highlightInvalidField(field) {
        field.classList.add('ring-2', 'ring-red-500');
        
        // Add error message if it doesn't exist
        const fieldParent = field.parentElement;
        if (!fieldParent.querySelector('.error-message')) {
            const errorMessage = document.createElement('p');
            errorMessage.className = 'error-message text-red-300 text-sm mt-1';
            errorMessage.textContent = field.id === 'email' && field.value.trim() 
                ? 'Please enter a valid email address' 
                : 'This field is required';
            fieldParent.appendChild(errorMessage);
        }
    }
    
    function resetField(field) {
        field.classList.remove('ring-2', 'ring-red-500');
        
        // Remove error message if it exists
        const fieldParent = field.parentElement;
        const errorMessage = fieldParent.querySelector('.error-message');
        if (errorMessage) {
            fieldParent.removeChild(errorMessage);
        }
    }
    
    function showFormSuccess() {
        // Hide the form
        contactForm.classList.add('hidden');
        
        // Create and show success message
        const successMessage = document.createElement('div');
        successMessage.className = 'text-center py-8 animate-fadeIn';
        successMessage.innerHTML = `
            <div class="text-5xl text-green-300 mb-4">
                <i class="fas fa-check-circle"></i>
            </div>
            <h3 class="text-2xl font-bold mb-2">Message Sent!</h3>
            <p class="mb-6">Thank you for your message. I'll get back to you soon.</p>
            <button id="reset-form" class="bg-white text-indigo-800 px-6 py-2 rounded-lg font-semibold hover:bg-indigo-100 transition">
                Send Another Message
            </button>
        `;
        
        contactForm.parentElement.appendChild(successMessage);
        
        // Add event listener to the reset button
        document.getElementById('reset-form').addEventListener('click', function() {
            // Clear form fields
            contactForm.reset();
            
            // Hide success message and show form
            successMessage.remove();
            contactForm.classList.remove('hidden');
        });
    }
    
    // Add physics-themed interactive elements
    const physicsSection = document.getElementById('teaching');
    if (physicsSection) {
        // Create a simple physics animation
        const physicsAnimation = document.createElement('div');
        physicsAnimation.className = 'physics-atom mx-auto my-8';
        
        // Add it before the grid in the teaching section
        const teachingGrid = physicsSection.querySelector('.grid');
        if (teachingGrid) {
            teachingGrid.parentElement.insertBefore(physicsAnimation, teachingGrid);
        }
    }
});
