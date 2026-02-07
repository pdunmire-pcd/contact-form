// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    
    // Get form element
    const form = document.querySelector('form');
    
    // Get all input elements we need to validate
    const fname = document.getElementById('fname');
    const lname = document.getElementById('lname');
    const email = document.getElementById('email');
    const linkedinUrl = document.getElementById('linkedinUrl');
    const howDidWeMeet = document.getElementById('howDidWeMeet');
    const mailingList = document.getElementById('mailingList');
    
    // Helper function to show error message
    function showError(inputElement, message) {
        const errorElement = document.getElementById(inputElement.id + '-error');
        errorElement.textContent = message;
        inputElement.classList.add('invalid');
        inputElement.classList.remove('valid');
    }
    
    // Helper function to clear error message
    function clearError(inputElement) {
        const errorElement = document.getElementById(inputElement.id + '-error');
        errorElement.textContent = '';
        inputElement.classList.remove('invalid');
        inputElement.classList.add('valid');
    }
    
    // Helper function to clear validation styling (for fields that pass)
    function clearValidation(inputElement) {
        inputElement.classList.remove('invalid', 'valid');
        const errorElement = document.getElementById(inputElement.id + '-error');
        errorElement.textContent = '';
    }
    
    // Form submit event listener (we'll add validation here)
    form.addEventListener('submit', function(e) {
        e.preventDefault();         
        let isValid = true; 

        if(fname.value.trim() === ''){
            showError(fname, 'First name is required');
            isValid =false;
        } else {
        clearError(fname);
        }

        // Validate Last Name
        if (lname.value.trim() === '') {
            showError(lname, 'Last name is required');
            isValid = false;
        } else {
        clearError(lname);
        }
        
        // Validate Email
        const emailValue = email.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        // Check if mailing list is checked (makes email required)
        if (mailingList.checked && emailValue === '') {
            showError(email, 'Email is required when subscribing to mailing list');
            isValid = false;
        } else if (emailValue !== '' && !emailRegex.test(emailValue)) {
            showError(email, 'Please enter a valid email address (must contain @ and a dot)');
            isValid = false;
        } else {
            clearError(email);
        }

        // Validate LinkedIn URL
        const linkedinValue = linkedinUrl.value.trim();

        if (linkedinValue !== '' && !linkedinValue.startsWith('https://linkedin.com/in/')) {
            showError(linkedinUrl, 'LinkedIn URL must start with "https://linkedin.com/in/"');
            isValid = false;
        } else {
            clearError(linkedinUrl);
        }

        // Validate How Did We Meet
        if (howDidWeMeet.value === '') {
            showError(howDidWeMeet, 'Please select how we met');
            isValid = false;
        } else {
            clearError(howDidWeMeet);
        }
            });

        // If all validations passed, submit the form
        if (isValid) {
            alert('Form is valid! (In a real app, this would submit to the server)');
            // form.submit(); // Uncomment this in production
        } else {
            // Scroll to first error
            const firstError = document.querySelector('.invalid');
            if (firstError) {
                firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
                firstError.focus();
            }
        }
    // Real-time validation on blur (when user leaves a field)

    fname.addEventListener('blur', function() {
        if (fname.value.trim() === '') {
            showError(fname, 'First name is required');
        } else {
            clearError(fname);
        }
    });

    lname.addEventListener('blur', function() {
        if (lname.value.trim() === '') {
            showError(lname, 'Last name is required');
        } else {
            clearError(lname);
        }
    });

    email.addEventListener('blur', function() {
        const emailValue = email.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (mailingList.checked && emailValue === '') {
            showError(email, 'Email is required when subscribing to mailing list');
        } else if (emailValue !== '' && !emailRegex.test(emailValue)) {
            showError(email, 'Please enter a valid email address (must contain @ and a dot)');
        } else {
            clearError(email);
        }
    });

    linkedinUrl.addEventListener('blur', function() {
        const linkedinValue = linkedinUrl.value.trim();
        
        if (linkedinValue !== '' && !linkedinValue.startsWith('https://linkedin.com/in/')) {
            showError(linkedinUrl, 'LinkedIn URL must start with "https://linkedin.com/in/"');
        } else {
            clearError(linkedinUrl);
        }
    });

    howDidWeMeet.addEventListener('change', function() {
        if (howDidWeMeet.value === '') {
            showError(howDidWeMeet, 'Please select how we met');
        } else {
            clearError(howDidWeMeet);
        }
    });
});
    
