// Getting email element
let emailInput = document.getElementById('email');
// Getting name element
let nameInput = document.getElementById('login');
// Getting password element
let passInput = document.getElementById('pass');
// Getting password 2 element
let pass2Input = document.getElementById('pass2');
// Getting newsletter element
let newLetterInput = document.getElementById('newsletter');
// Getting terms element
let termInput = document.getElementById('terms');

// Create paragraph for displaying email warning
let emailError = document.createElement('span');

// Create paragraph for displaying name warning
let nameError = document.createElement('span');

// Create paragraph for displaying password 1 warning
let passwordError = document.createElement('span');

// Create paragraph for displaying password 2 warning
let password2Error = document.createElement('span');

// Create paragraph for displaying terms warning
let termsError = document.createElement('span');

// Creating an array to store all new input elements and apply a loop on them
// to set a warning class attribute and append the created element to the parent of email div
let errorElm = [emailError, nameError, passwordError, password2Error];
errorElm.map((item,index)=>{
    item.setAttribute('class', 'warning');
    document.querySelectorAll('.textfield')[index].appendChild(item);
    // document.querySelectorAll('.textfield')[index].classList.add('boxWarning');
})

// set a warning class attribute on terms and condition paragraph
termsError.setAttribute('class', 'warning');
//append the created element to the parent of email div
document.querySelectorAll('.checkbox')[1].appendChild(termsError);

// Define global variables
const defaultMsg = "";


// add event listner to the checkbox news letter to pop up an alert whenever it is checked
newLetterInput.addEventListener("change", ()=>{
    if(this.checked){
        alert("Warning: Subscribing to newsletters may result in receiving spam emails.")
    }
})

// Event handler for submit event
function validate() {
    let valid = true; // Global validation

    let emailValidation = validateEmail();
    if (emailValidation !== defaultMsg) {
        emailInput.classList.add('boxWarning');
        emailError.textContent = emailValidation;
        valid = false;
    }

    let nameValidation = validateName();
    if (nameValidation !== defaultMsg) {
        nameInput.classList.add('boxWarning');
        nameError.textContent = nameValidation;
        valid = false;
    }

    let pass1Validation = validatePassword();
    if (pass1Validation !== defaultMsg) {
        passInput.classList.add('boxWarning');
        passwordError.textContent = pass1Validation;
        valid = false;
    }

    let pass2Validation = checkPassword();
    if (pass2Validation !== defaultMsg) {
        pass2Input.classList.add('boxWarning');
        password2Error.textContent = pass2Validation;
        valid = false;
    }

    let termsValidation = validateTerms();
    if (termsValidation !== defaultMsg) {
        
        termsError.textContent = termsValidation;
        valid = false;
    }
    
    return valid;
}


// Validating email value
function validateEmail() {
    let email = emailInput.value;
    let regexp = /\S+@\S+\.\S+/;

    if (regexp.test(email) && email.trim().length > 0) {
        error = defaultMsg;
    } else {
        error = "Email address should be non-empty with the format (xyx@xyz.xyz).";
    }
    return error;
} 

// Validating name value
function validateName() {
    let name = nameInput.value.toLowerCase();
    let regexp = /^[a-z ,.'-]+$/i;

    if (regexp.test(name) && 0 < name.trim().length < 30) {
        error = defaultMsg;
    } else {
        error = "User name should be non-empty and within 30 characters long";
    }
    return error;
}


// Method to validate the password
function validatePassword() {
    let password = passInput.value;
    let regexp = /^(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

    if (regexp.test(password) && password.trim().length >= 8) {
        error = defaultMsg;
    } else {
        error = "Your password should be at least 8 characters: 1 uppercase, 1 lowercase.";
    }
    return error;
}


// Method to check if both passwords are the same
function checkPassword() {
    let pass1 = passInput.value;
    let pass2 = pass2Input.value;

    if (pass1 === pass2 && pass2.length > 0) {
        error = defaultMsg;
    } else {
        error = "Passwords don't match.";
    }
    return error;
}

// Method to validate the terms
function validateTerms() {
    if (termInput.checked) {
        return defaultMsg;
    } else {
        return "Please accept the terms and conditions";
    }
}



// Event listener to reset the form error messages when the form is reset
function resetFormError(event) {

    // Storing all inputs into an array
    allInputs = [emailInput, nameInput, passInput, pass2Input];
    allInputs.map((input)=>{
        input.classList.remove('boxWarning');
    })

    // reseting terms checkbox error message to null
    termsError.textContent = defaultMsg;

    // reseting inputs error messages to null
    errorElm.map((elm)=>{
        elm.textContent = defaultMsg;
    })

    event.target.reset();
}
document.querySelector('form').addEventListener("reset", resetFormError);


// add event listner to the email if you entered correct email,the error paragraph with be empty
///******* */
emailInput.addEventListener("blur", ()=>{ // arrow function
    let x=validateEmail();  

    if(x == defaultMsg){
       emailInput.style.border = "1px solid blue";
        emailError.textContent = defaultMsg;
    }
});

// add event listner to the user name if you entered correct user name,the error paragraph with be empty

nameInput.addEventListener("blur", ()=>{ // arrow function
    let x=validateName();

    if(x == defaultMsg){
        nameInput.classList.remove('boxWarning');
        nameError.textContent = defaultMsg;
    }
});

// add event listner to the password if you entered correct password,the error paragraph with be empty

passInput.addEventListener("blur", ()=>{ // arrow function
    let x=validatePassword();

    if(x == defaultMsg){
        passInput.classList.remove('boxWarning');
        passwordError.textContent = defaultMsg;
    }
});


// add event listner to the check password if you entered the same password,the error paragraph with be empty

pass2Input.addEventListener("blur", ()=>{ // arrow function
    let x=checkPassword();

    if(x == defaultMsg){
        pass2Input.classList.remove('boxWarning');
        password2Error.textContent = defaultMsg;
    }
});

// add event listner to the checkbox if you check the terms box,the error paragraph with be empty 

termInput.addEventListener("change", function(){
    if(this.checked){
        termsError.textContent= defaultMsg;
    }
});


// Alert the user about possible spam if the user check the newsletter checkbox

newLetterInput.addEventListener("change", function(){
    if(this.checked){
        alert("Selecting to receive our newsletter may result in occasional emails being flagged as spam.");
    }
});
