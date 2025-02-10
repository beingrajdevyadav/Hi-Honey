// --------------------------------------------
// # Get Started Button Functionality Function 
// --------------------------------------------

// This function is responsible for displaying the form on the screen when the user clicks the Get Started button.
function getStarted() {

    // Save the user's action to local storage
    localStorage.setItem('isGetStarted', true);

    // Hide the Get Started section and display the form section
    const getStartedSection = document.getElementById('heroSection');
    getStartedSection.style.display = 'none';

    // Display the form section
    const formSection = document.getElementById('formSection');
    formSection.style.display = 'flex';
}

// Get the Get Started button and add an event listener to it
const getStartedButton = document.getElementById('getStarted');
getStartedButton.addEventListener('click', getStarted);



// --------------------------------------------
// # Processing Steps Functionality Function 
// --------------------------------------------

// This function is responsible for displaying the processing steps on the screen.
const steps = [
    "Submitting Details...",
    "Validating Responses...",
    "Processing Data...",
    "Fetching Results...",
    "Analyzing Compatibility...",
    "Generating Report...",
    "Finalizing Results..."
];

let currentStep = 0;

// Function to show the next step
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


// --------------------------------------------
// # Handle Get Started Functionality Function 
// --------------------------------------------

// This function is responsible for checking if the user has already clicked the Get Started button and displaying the form if they have.
function hanldeGetStarted(){
    const isGetStarted = localStorage.getItem('isGetStarted');
    if(isGetStarted){
        document.getElementById('heroSection').style.display = 'none';
        document.getElementById('formSection').style.display = 'flex';
    }
    return;
}


// --------------------------------------------
// # On Window Load Functionality Function 
// --------------------------------------------

// This function is responsible for running the Get Started function when the window loads.
window.onload = function() {    
    hanldeGetStarted();
}