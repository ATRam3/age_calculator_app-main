const formAge = document.querySelector('.age-form');
const dayInput = document.getElementById('dayInput')
const monthInput = document.getElementById('monthInput')
const yearInput = document.getElementById('yearInput')
const submitBtn = document.getElementById('submitBtn');
const yearsOutput = document.getElementById('years'); // Renamed for clarity
const monthsOutput = document.getElementById('months'); // Renamed for clarity
const daysOutput = document.getElementById('days'); // Renamed for clarity

// Moved input event listeners OUTSIDE the submit handler
dayInput.addEventListener('input', () => resetErrorInput(dayInput));
monthInput.addEventListener('input', () => resetErrorInput(monthInput));
yearInput.addEventListener('input', () => resetErrorInput(yearInput));

formAge.addEventListener('submit', function(event) {
    event.preventDefault();
    resetErrors(); // Clear all previous errors
    
    const dayValue = dayInput.value.trim();
    const monthValue = monthInput.value.trim();
    const yearValue = yearInput.value.trim();
    
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    
    // Validate required fields
    let isValid = true;
    
    if (!dayValue) {
        showMessage(dayInput, 'This field is required');
        isValid = false;
    }
    
    if (!monthValue) {
        showMessage(monthInput, 'This field is required');
        isValid = false;
    }
    
    if (!yearValue) {
        showMessage(yearInput, 'This field is required');
        isValid = false;
    }
    
    // Only proceed if basic requirements are met
    if (!isValid) return;
    
    // Convert to numbers for validation
    const day = parseInt(dayValue);
    const month = parseInt(monthValue);
    const year = parseInt(yearValue);
    
    // Advanced validation
    if (isNaN(day) || day < 1 || day > 31) {
        showMessage(dayInput, 'Must be a valid day');
        isValid = false;
    }
    
    if (isNaN(month) || month < 1 || month > 12) {
        showMessage(monthInput, 'Must be a valid month');
        isValid = false;
    }
    
    if (isNaN(year) || year > currentYear || year < 1880) {
        showMessage(yearInput, 'Must be a valid year');
        isValid = false;
    }
    
    // Validate date existence (e.g., not Feb 31)
    if (isValid) {
        const daysInMonth = new Date(year, month, 0).getDate();
        if (day > daysInMonth) {
            showMessage(dayInput, 'Invalid date for month');
            isValid = false;
        }
    }
    
    // Validate not in future
    if (isValid) {
        const birthDate = new Date(year, month - 1, day);
        if (birthDate > currentDate) {
            showMessage(yearInput, 'Must be in the past');
            isValid = false;
        }
    }
    
    if (isValid) {
        calculateAge(day, month, year);
    }
});

function showMessage(inputElement, msg) {
    const inputGroup = inputElement.closest('.input-group');
    let errorElement = inputGroup.querySelector('.error-msg');
    const label = inputGroup.querySelector('.input-label');
    
    if (!errorElement) {
        errorElement = document.createElement('p');
        errorElement.className = 'error-msg';
        inputGroup.appendChild(errorElement);
    }
    
    errorElement.textContent = msg;
    errorElement.style.color = 'var(--red-400)';
    errorElement.style.fontStyle = 'italic';
    errorElement.style.fontSize = '8px';
    
    inputElement.style.border = '1px solid var(--red-400)';
    label.style.color = 'var(--red-400)';
}

function resetErrorInput(inputElement) {
    const inputGroup = inputElement.closest('.input-group');
    const errorElement = inputGroup.querySelector('.error-msg');
    
    if (errorElement) {
        errorElement.remove();
    }  
    
    const label = inputGroup.querySelector('.input-label');
    label.style.color = '';
    inputElement.style.borderColor = '';
}

// NEW: Reset all errors
function resetErrors() {
    document.querySelectorAll('.error-msg').forEach(el => el.remove());
    document.querySelectorAll('.input-label').forEach(label => {
        label.style.color = '';
    });
    document.querySelectorAll('.date-input').forEach(input => {
        input.style.borderColor = '';
    });
}

// FIXED: Correct age calculation
function calculateAge(dayIn, monthIn, yearIn) {
    const birthDate = new Date(yearIn, monthIn - 1, dayIn);
    const today = new Date();
    
    let years = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth() - birthDate.getMonth();
    let days = today.getDate() - birthDate.getDate();
    
    // Handle negative days
    if (days < 0) {
        months--;
        // Get days in previous month
        const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
        days += prevMonth.getDate();
    }
    
    // Handle negative months
    if (months < 0) {
        years--;
        months += 12;
    }
    
    // Update outputs
    yearsOutput.textContent = years;
    monthsOutput.textContent = months;
    daysOutput.textContent = days;
}