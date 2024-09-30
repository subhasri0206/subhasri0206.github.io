const hamburger = document.querySelector('.hamburger');
const navList = document.querySelector('.nav-list');

hamburger.addEventListener('click', () => {
    navList.classList.toggle('active');
});


    
document.querySelectorAll('.accordion-header').forEach(header => {
    header.addEventListener('click', () => {
        const accordionContent = header.nextElementSibling;
        const arrow = header.querySelector('.arrow');
        const isOpen = header.classList.contains('active');

        // Toggle the accordion content visibility
        header.classList.toggle('active');
        
        if (isOpen) {
            accordionContent.style.display = 'none';  // Hide the content
        } else {
            accordionContent.style.display = 'block'; // Show the content
        }
    });
});




document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Clear previous error messages
    clearErrors();

    let isValid = true;

    // Validate "We are interested in"
    const interest = document.getElementById('interest');
    if (interest.value === '') {
        showError('interestError', 'Please select an option');
        isValid = false;
    }

    // Validate "We are"
    const weAre = document.getElementById('weAre');
    if (weAre.value === '') {
        showError('weAreError', 'Please select an option');
        isValid = false;
    }

    // Validate "What stage are you at"
    const stage = document.getElementById('stage');
    if (stage.value === '') {
        showError('stageError', 'Please select an option');
        isValid = false;
    }

    // Validate name
    const name = document.getElementById('name');
    if (name.value.trim() === '') {
        showError('nameError', 'Please enter your name');
        isValid = false;
    }

    // Validate email
    const email = document.getElementById('email');
    if (!validateEmail(email.value)) {
        showError('emailError', 'Please enter a valid email');
        isValid = false;
    }

    // Validate phone
    const phone = document.getElementById('phone');
    if (!validatePhone(phone.value)) {
        showError('phoneError', 'Please enter a valid phone number');
        isValid = false;
    }

    if (isValid) {
        // Form is valid, you can submit or perform further actions
        alert('Form submitted successfully!');
    }
});

function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    errorElement.textContent = message;
    errorElement.style.display = 'block';
}

function clearErrors() {
    const errors = document.querySelectorAll('.error-message');
    errors.forEach(error => error.style.display = 'none');
}

function validateEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}

function validatePhone(phone) {
    const phonePattern = /^\+?[0-9]{10,13}$/;
    return phonePattern.test(phone);
}