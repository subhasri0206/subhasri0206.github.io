// Wait for the DOM to fully load
document.addEventListener('DOMContentLoaded', function() {
    const popupCheckbox = document.getElementById('popup-form');
    const closePopupButton = document.querySelector('.close-popup-button');
    const formContainer = document.querySelector('.form-container');

   // Close popup when the close button is clicked
   closeButtons.forEach(button => {
    button.addEventListener("click", function () {
        const popup = this.closest(".popup");
        popup.style.display = "none";
    });
});

    // Listen for clicks on the close button to close the pop-up
    closePopupButton.addEventListener('click', closePopup);

    // Optional: Close pop-up when clicking outside of the form
    window.addEventListener('click', function(event) {
        if (!formContainer.contains(event.target) && popupCheckbox.checked) {
            closePopup();
        }
    });
});


// Form submission validation
document.getElementById('popup-form-content').addEventListener('submit', function(event) {
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
    if (name.value.trim().length < 3 || name.value.trim().length > 30) {
        showError('nameError', 'Name must be between 3 and 30 characters');
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
        // Form is valid, simulate a successful submission
        alert('Form submitted successfully!');

        // Reset the form fields after successful submission
        document.getElementById('popup-form-content').reset();

        // Optionally, hide error messages after submission
        clearErrors();
    }
});

function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    errorElement.textContent = message;
    errorElement.style.display = 'block';
}

function clearErrors() {
    const errors = document.querySelectorAll('.error-message');
    errors.forEach(error => {
        error.textContent = '';
        error.style.display = 'none';
    });
}

function validateEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}

function validatePhone(phone) {
    const phonePattern = /^\+?[0-9]{10,13}$/;
    return phonePattern.test(phone);
}

