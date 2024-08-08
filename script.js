const prevBtns = document.querySelectorAll(".back-button");
const nextBtns = document.querySelectorAll(".btn-form");
const progress = document.querySelector(".progressbar");
const formSteps = document.querySelectorAll(".slide");
const progressStaps = document.querySelectorAll(".progressbar li")

let formStepNum = 0;

nextBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        formStepNum++;
        updateFormSteps();
        updateProgressbar();
        console.log(formStepNum);
    });
});
prevBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        formStepNum--;
        updateFormSteps();
        updateProgressbar();
        console.log(formStepNum);
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
   
   progressStaps.forEach((progressStaps, index) => {
    if(index < formStepNum + 1) {
        progressStaps.classList.add("active");
       
    } else {
        progressStaps.classList.remove("active");
       
    }
   });
}


