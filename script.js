const prevBtns = document.querySelectorAll(".back-button");
const nextBtns = document.querySelectorAll(".btn-form");
const progress = document.querySelector(".progress-bar");
const formSteps = document.querySelectorAll(".slide");
const progressStaps = document.querySelectorAll(".steps .step")

let formStepNum = 0;

nextBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        formStepNum++;
        updateFormSteps();
        updateProgressbar();
        validateForm( email, phone);
    });
});


prevBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        formStepNum--;
        updateFormSteps();
        updateProgressbar();
    });
});

function updateFormSteps() {
    formSteps.forEach(formStep => {
        formStep.classList.contains("active") &&
        formStep.classList.remove("active");
    });
    formSteps[formStepNum].classList.add("active");
}

function updateProgressbar() {
    const stepWidth = 100 / (progressStaps.length - 1);
    const progressPercentage = stepWidth * formStepNum + "%";
    progress.style.width = progressPercentage

    progressStaps.forEach((progressStaps, index) => {
        if (index < formStepNum + 1) {
            progressStaps.classList.add("active");
        } else {
            progressStaps.classList.remove("active");
        }
    });
}




//Recebe os dados do formulario e chama e recebe o resultado da validção 
function RegisterFormSubmit(event) {
    event.preventDefault();


    let email = document.querySelector("#email").value, 
    phone = document.querySelector("#phone").value;


    console.log("Email:", email); // Adicionado para depuração

    //se retornar falso a validação falhou e isso inpedira do cosigo abaixo ser executado 
    if(!validateForm(email, phone))
        return;

    //Carregamento
    document.querySelector(".spinner").style.display = "inline-block";
   
    //envia os dados 
    sendAsgard( email, phone);
    console.log("phone:" + phone);
}

//Apos validação dos dados faz a criação da conta e manda um negocio para o funil 
function sendAsgard(email) 
{
    let a = new XMLHttpRequest();
    (a.withCredentials = !1), 
    a.open("POST",   "https://3sksqeptx3.esxecute-api.us-east-1.amazonaws.com/prod/site/request-demo"),
    a.setRequestHeader("Content-Type", "application/json"),(a.onload = function()
    {
        if(a.status === 200) 
        {
            document.querySelector(".spinner").style.display = "none";
            document.querySelector(".conta-success-container").style.display = "flex";
            document.querySelector(".conta-register-container").style.display = "none";
            document.querySelector("#nameRegister").textContent = name.split(' ')[0] + ", verifique sua caixa de entrada no e-mail";
            document.querySelector("#emailRegister").textContent = email;
            unami.track('Signup: Criação de conta');
        } else 
        {
            document.getElementById("errorModal").style.display = "block";
            unami.track('Erro ' + a.status + ': Criação de conta', 
            {
                Event: new Date().toLocaleString('pt-BR', 
                {
                    timeZone: 'America/Sao_Paulo'
                })
            });
        }
    });

    let r = {
        tituloNegocio: company + " - " + name,
        nome: name,
        email: email,
        celular: phone,
        empresa: company,
        responsavelId: 979,
        campanhaId: null,
        origemId: 1,
        etapaId: 17,
    };
    a.send(JSON.stringify(r));
}

//Faz a validação dos campos do formulario
function validateForm( email, phone) {
    let isValid = true;
    // clearErrors(); 

    if(email === "") {
        showError("error-email", "Email: Preenchimento obrigatório");
        document.querySelector("#email").style.border = '3px solid #a8200d';
        document.querySelector(".login-error-message").style.display = "flex";
        isValid = false; 
    } else {
        if(!validateEmail(email)) {
            showError("error-email", "O e-mail informado não é valido");
            document.querySelector("#email").style.border = '3px solid #a8200d';
            document.querySelector(".login-error-message").style.display = "flex";
            isValid = false;
        }
    }

    if(phone === "") {
        showError("error-phone", "Telefone: Preenchimento obrigatório");
         document.querySelector("#phone").style.border = '3px solid #a8200d';
            document.querySelector(".login-error-message").style.display = "flex"
        isValid = false;
    } else {
        if(!validatePhone(phone)) {
            showError("error-phone", "O telefone informado não é valido");
             document.querySelector("#phone").style.border = '3px solid #a8200d';
            document.querySelector(".login-error-message").style.display = "flex"
            isValid = false;
        }
    }
    return isValid;
}

//Validação do e-mail seguindo o regex fornecido 
function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

//Validação do phone seguindo o regex fornecido 
function validatePhone(phone) {
    const regex = /^\(\d{2}\)\s?\d{4,5}-\d{4}$/;
    return regex.test(phone);
}

// Aplica a máscara no número de telefone
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


//Mostra os erros
function showError(fieldId, message) {
    const errorDiv = document.getElementById(fieldId);
    errorDiv.textContent = message;
    errorDiv.style.display = "block";
}

//Limpa os erros 
function clearErrors() {
    document.querySelectorAll(".login-error-message").forEach
    (
        function(error) 
        {
            error.textContent = "";
            error.style.display = "none";
        }
    )
}

document.getElementById("closeModalError").onclick = function() {
    document.getElementById("errorModal").style.display = "none";
}

document.querySelector("form").addEventListener("submit", RegisterFormSubmit);