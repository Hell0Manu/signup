const prevBtns = document.querySelectorAll(".back-button");
const nextBtns = document.querySelectorAll(".btn-form");
const progress = document.querySelector(".progress-bar");
const formSteps = document.querySelectorAll(".slide");
const progressSteps = document.querySelectorAll(".steps .step");

let formStepNum = 0;

function updateFormSteps() {
    formSteps.forEach((formStep, index) => {
        formStep.classList.toggle("active", index === formStepNum);
    });
}

function updateProgressbar() {
    const stepWidth = 100 / (progressSteps.length - 1);
    const progressPercentage = stepWidth * formStepNum + "%";
    progress.style.width = progressPercentage;

    progressSteps.forEach((step, index) => {
        step.classList.toggle("active", index <= formStepNum);
    });
}

function validateForm() {
    let isValid = true;
    clearErrors();

    const name = document.querySelector("#name").value;
    const company = document.querySelector("#company").value;
    const email = document.querySelector("#email").value;
    const phone = document.querySelector("#phone").value;

    if (formStepNum === 0 && name === "") {
        showError("error-name", "Nome: Preenchimento obrigatório");
        isValid = false;
    } 
    if (formStepNum === 1 && company === "") {
        showError("error-company", "Empresa: Preenchimento obrigatório");
        isValid = false;
    }

    if (formStepNum === 2 && email === "") {
        showError("error-email", "E-mail: Preenchimento obrigatório");
        isValid = false;
    } else if (formStepNum === 2 && !validateEmailFormat(email)) {
        showError("error-email", "O e-mail informado não é válido");
        isValid = false;
    } 

    if (formStepNum === 3 && phone === "") {
        showError("error-phone", "Telefone: Preenchimento obrigatório");
        isValid = false;
    } else if (formStepNum === 3 && !validatePhoneFormat(phone)) {
        showError("error-phone", "O telefone informado não é válido");
        isValid = false;
    } 
    return isValid;
}


function showError(fieldId, message) {
    const errorDiv = document.getElementById(fieldId);
    const circle = document.querySelector(".error-circle");
    if (errorDiv) {
        errorDiv.textContent = message;
        errorDiv.style.display = "block";
        circle.style.display = "flex";
    }
}

function hideError(fieldId) {
    const errorDiv = document.getElementById(fieldId);
    const circle = document.querySelector(".error-circle");
    if (errorDiv) {
        errorDiv.textContent = "";
        errorDiv.style.display = "none";
        circle.style.display = "flex";
    }
}

function clearErrors() {
    hideError("error-name");
    hideError("error-company");
    hideError("error-email");
    hideError("error-phone");
}

function validateEmailFormat(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

function validatePhoneFormat(phone) {
    const regex = /^\(\d{2}\)\s?\d{4,5}-\d{4}$/;
    return regex.test(phone);
}

// Event listeners for navigation buttons
nextBtns.forEach((btn) => {
    btn.addEventListener("click", (event) => {
        event.preventDefault();
        if (validateForm()) {
            formStepNum++;
            if (formStepNum >= formSteps.length) formStepNum = formSteps.length - 1;
            updateFormSteps();
            updateProgressbar();
        }
    });
});

prevBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
        formStepNum--;
        if (formStepNum < 0) formStepNum = 0;
        updateFormSteps();
        updateProgressbar();
    });
});