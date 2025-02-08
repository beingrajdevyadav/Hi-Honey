const steps = [
    "Submitting Form",
    "Validating Responses",
    "Processing Data",
    "Fetching Results",
    "Analyzing Compatibility",
    "Generating Report",
    "Finalizing Results"
];

let currentStep = 0;

function showNextStep() {
    if (currentStep < steps.length) {
        const stepElement = document.getElementById('step');
        stepElement.innerText = steps[currentStep];
        currentStep++;
        setTimeout(showNextStep, 3000); // Adjust the time gap (2 seconds) as needed
    } else {
        const stepElement = document.getElementById('step');
        stepElement.innerText = "Here are your compatibility results!";
    }
}

window.onload = showNextStep;