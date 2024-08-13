const prevBtns = document.querySelectorAll(".back-button");
const nextBtns = document.querySelectorAll(".btn-form");
const progress = document.querySelector(".progress-bar");
const formSteps = document.querySelectorAll(".slide");
const progressSteps = document.querySelectorAll(".steps.mobile .step");
const steps = document.querySelectorAll(".stepper .steps .step");

let formStepNum = 0;

function updateFormSteps() {
    formSteps.forEach((formStep, index) => {
        formStep.classList.toggle("active", index === formStepNum);
        updateLogoVisibility();
    });

}

function updateLogoVisibility() {
    const headerLogo = document.querySelector(".header-logo");
    const stepper = document.querySelector(".stepper");
    const isMobile = window.innerWidth <= 575;

    if (isMobile) {
        if (formStepNum != 0) {
            headerLogo.style.visibility = "hidden";
        } else {
            headerLogo.style.visibility = "visible";
        }
    } else {
        if (formStepNum > 0) {
            stepper.style.display = "block";
        }

        headerLogo.style.visibility = "visible";
    }
}


function updateProgressbar() {
    const stepWidth = 100 / (progressSteps.length - 1);
    const progressPercentage = stepWidth * formStepNum + "%";
    progress.style.width = progressPercentage;

    const isMobile = window.innerWidth <= 575;
    if (isMobile) {
        progressSteps.forEach((step, index) => {
            if (index === formStepNum) {
                step.classList.add("active");
            } else {
                step.classList.remove("active");
            }
        });
    } else {
        steps.forEach((step, index) => {
            if (index === formStepNum) {
                step.classList.add("active");
            } else {
                step.classList.remove("active");
            }
        });
    }
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
    const input = document.querySelector(`#${fieldId.replace('error-', '')}`);
    const circle = input.parentElement.querySelector(".error-circle");

    if (errorDiv) {
        errorDiv.textContent = message;
        errorDiv.style.display = "block";
        input.style.border = '3px solid #a8200f';
        if (circle) {
            circle.style.display = "flex";
        }
    }
}

function hideError(fieldId) {
    const errorDiv = document.getElementById(fieldId);
    const inputElement = document.querySelector(`#${fieldId.replace('error-', '')}`);
    const circle = inputElement.parentElement.querySelector(".error-circle");
    if (errorDiv) {
        inputElement.style.border = '2px solid #c9cbce';
        errorDiv.textContent = "";
        errorDiv.style.display = "none";
        if (circle) {
            circle.style.display = "none";
        }
    }

}

function clearErrors() {
    hideError("error-name");
    hideError("error-company");
    hideError("error-email");
    hideError("error-phone");
}

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


function validateEmailFormat(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

function validatePhoneFormat(phone) {
    const regex = /^\(\d{2}\)\s?\d{4,5}-\d{4}$/;
    return regex.test(phone);
}

function applyPhoneMask(element) {
    let value = element.value;
    if (value.length <= 10) {
        value = value.replace(/\D/g, "");
        value = value.replace(/^(\d{2})(\d)/g, "($1) $2");
        value = value.replace(/(\d{4})(\d)/, "$1-$2");
    } else {
        value = value.replace(/^(\d{2})(\d)/g, "($1) $2");
        value = value.replace(/(\d{5})(\d)/, "$1-$2");
    }
    element.value = value;
}