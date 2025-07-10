const formAge = document.querySelector('.age-form');
const inputs = document.querySelectorAll('.date-input');
const dayInput = document.getElementById('dayInput')
const monthInput = document.getElementById('monthInput')
const yearInput = document.getElementById('yearInput')
const submitBtn = document.getElementById('submitBtn');
const years = document.getElementById('years');
const months = document.getElementById('months');
const days = document.getElementById('days');

formAge.noValidate = true;


formAge.addEventListener('submit', function(event){
    event.preventDefault();

    let isValid = true;

    const dayValue = dayInput.value.trim();
    const monthValue = monthInput.value.trim();
    const yearValue = yearInput.value.trim();

    if(!dayValue){
        showMessage(dayInput, 'This field is required');
        isValid = false;
    } if(!monthValue){
        showMessage(monthInput, 'This field is required');
        isValid = false;
    } if(!yearValue){
        showMessage(yearInput, 'This field is required');
        isValid = false;
    } if(dayValue > 30){
        showMessage(dayInput, 'Must be a valid day');
        isValid = false;
    } if(monthValue > 12){
        showMessage(monthInput, 'Must be a valid month');
        isValid = false;
    } if(yearValue > 2025){
        showMessage(yearInput, 'Must be a valid month');
        isValid = false;
    }
})

function showMessage(inputElement, msg){
    const inputGroup = inputElement.closest('.input-group');
    const errorMsg = inputGroup.querySelector('.error-msg');
    const label = inputGroup.querySelector('.input-label');

    errorMsg.textContent = msg;
    errorMsg.style.color = 'var(--red-400)';
    errorMsg.style.fontStyle = 'italic';
    errorMsg.style.fontSize = '8px';


    inputElement.style.border = '1px solid var(--red-400)';
    label.style.color = 'var(--red-400)';

}