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