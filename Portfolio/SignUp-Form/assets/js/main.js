
const checkbox = document.getElementById('terms-checkbox');
const registerButton = document.querySelector('.register-button');

// Change button color when checkbox is checked
checkbox.addEventListener('change', () => {
    if (checkbox.checked) {
        registerButton.style.backgroundColor = '#7C6A59';
    } else {
        registerButton.style.backgroundColor = '';
    }
});

document.getElementById('signupForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent form submission for validation

    const fullName = document.getElementById('fullname').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    const confirmPassword = document.getElementById('confirm-password').value.trim();
    const phoneNumber = document.getElementById('phone-number').value.trim();

    const fullNameError = document.getElementById('fullname-error');
    const emailError = document.getElementById('email-error');
    const passwordError = document.getElementById('password-error');
    const confirmPasswordError = document.getElementById('confirm-password-error');
    const phoneError = document.getElementById('phone-error');
    const formError = document.getElementById('form-error');

    // Clear all error messages
    fullNameError.textContent = '';
    emailError.textContent = '';
    passwordError.textContent = '';
    confirmPasswordError.textContent = '';
    phoneError.textContent = '';
    formError.textContent = '';

    let valid = true;

    // Full Name Validation
    if (!/^[a-zA-Z\s]{3,30}$/.test(fullName)) {
        fullNameError.textContent = 'Full name must be between 3 to 30 characters and only contain letters.';
        valid = false;
    }

    // Email Validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        emailError.textContent = 'Please enter a valid email address.';
        valid = false;
    }

    // Password Validation (at least one symbol, one number, one letter, and minimum 6 characters)
    const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[\W_]).{6,}$/;
    if (!passwordPattern.test(password)) {
        passwordError.textContent = 'Password must be at least 6 characters long and include at least one number, one symbol, and one letter.';
        valid = false;
    }

    // Confirm Password Validation
    if (password !== confirmPassword) {
        confirmPasswordError.textContent = 'Passwords do not match.';
        valid = false;
    }

    // Phone Number Validation
    if (!/^\d{10}$/.test(phoneNumber)) {
        phoneError.textContent = 'Phone number must be exactly 10 digits.';
        valid = false;
    }

    // Only allow submission if checkbox is checked and button color is brown
    if (!checkbox.checked || registerButton.style.backgroundColor !== 'rgb(124, 106, 89)') {
        formError.textContent = 'Please fix the errors above and agree to the terms to proceed.';
        return false;
    }

    // If all validations pass, proceed with form submission
    formError.textContent = '';
    alert('Form successfully submitted!');

    // Change button color to "old grey" after submission
    registerButton.classList.add('#C2C2C2');

    // Reset the form
    this.reset();
});