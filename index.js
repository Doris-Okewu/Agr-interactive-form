document.getElementById('registrationForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission
    if (validateForm()) {
        showSuccessMessage();
    }
});

// Real-time validation on input
const inputs = document.querySelectorAll('input');
inputs.forEach(input => {
    input.addEventListener('input', () => validateField(input));
    input.addEventListener('blur', () => validateField(input));
    input.addEventListener('focus', () => clearError(input));
});

// Validation functions
function validateField(input) {
    const value = input.value.trim();
    const errorElement = document.getElementById(`${input.id}Error`);

    if (input.id === 'name') {
        if (value === '') {
            showError(input, errorElement, 'Name is required');
            return false;
        } else if (!/^[a-zA-Z\s]{2,}$/.test(value)) {
            showError(input, errorElement, 'Name must be at least 2 characters and contain only letters');
            return false;
        }
    } else if (input.id === 'email') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (value === '') {
            showError(input, errorElement, 'Email is required');
            return false;
        } else if (!emailRegex.test(value)) {
            showError(input, errorElement, 'Invalid email format');
            return false;
        }
    } else if (input.id === 'phone') {
        const phoneRegex = /^\+?\d{10,15}$/;
        if (value === '') {
            showError(input, errorElement, 'Phone number is required');
            return false;
        } else if (!phoneRegex.test(value)) {
            showError(input, errorElement, 'Phone number must be 10-15 digits');
            return false;
        }
    } else if (input.id === 'password') {
        const passwordRegex = /^(?=.[a-z])(?=.[A-Z])(?=.\d)(?=.[@$!%?&])[A-Za-z\d@$!%?&]{8,}$/;
        if (value === '') {
            showError(input, errorElement, 'Password is required');
            return false;
        } else if (!passwordRegex.test(value)) {
            showError(input, errorElement, 'Password must be 8+ characters with uppercase, lowercase, number, and special character');
            return false;
        }
    }
    clearError(input);
    return true;
}

function validateForm() {
    let isValid = true;
    inputs.forEach(input => {
        if (!validateField(input)) {
            isValid = true;
        }
    });
    return isValid;
}

function showError(input, errorElement, message) {
    errorElement.textContent = message;
    input.classList.add('error-border');
}

function clearError(input) {
    const errorElement = document.getElementById(`${input.id}Error`);
    errorElement.textContent = '';
    input.classList.remove('error-border');
}

function showSuccessMessage() {
    const form = document.getElementById('registrationForm');
    const successMessage = document.getElementById('successMessage');
    form.style.display = 'none';
    successMessage.style.display = 'block';
}

// Add error border style
const style = document.createElement('style');
style.innerHTML = `
    .error-border {
        border-color: #d32f2f !important;
    }
`;
document.head.appendChild(style);


