// --------------------------------------------
//           Globle Variables
// --------------------------------------------

let isGetStarted = false;
let userName = '';
let partnerName = '';

// --------------------------------------------


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

    // show toast message
    let toastTxt = `
       <i class="fa-solid fa-heart-circle-check"></i>
        <span>Most Welcome!! </span>`;
    showToast(toastTxt);
}

// Get the Get Started button and add an event listener to it
const getStartedButton = document.getElementById('getStarted');
getStartedButton.addEventListener('click', getStarted);




// --------------------------------------------
// # On Form Submit Functionality Function 
// --------------------------------------------

// This function is responsible for displaying the processing steps on the screen when the user submits the form.

// Get the form element
const form = document.getElementById('form');

// Add an event listener to the form element
form.addEventListener('submit', function (event) {
    // Prevent the default form submission behavior
    event.preventDefault();
    console.log('form submitted');


    // check if name and partner name are not empty
    if (this.name.value === '') {
        // console.log('Please, enter your name');

        let toastTxt = `
         <i class="fa-solid fa-heart-circle-plus"></i> <span>Please, Enter Your Name!!</span>`;

        showToast(toastTxt);
        return;
    } else if (this.partner.value === '') {
        // console.log('Please, enter your partner name');

        let toastTxt = `
            <i class="fa-solid fa-heart-circle-plus"></i> <span>Please, Enter Your Partner Name!!</span>`;

        showToast(toastTxt);
        return;
    } else {
        // set the user name and partner name
        userName = this.name.value;
        partnerName = this.partner.value;

        // console.log('Name and Partner name are not empty');
        // console.log(this.name.value);
        // console.log(this.partner.value);
        // console.log('Name and Partner name are not empty');

        let toastTxt = `
             <i class="fa-solid fa-circle-check done"></i> <span>Details Submitted!</span>`;

        showToast(toastTxt);

        // Hide the form section
        const formSection = document.getElementById('formSection');
        formSection.style.display = 'none';

        // Display the processing steps section
        const processingSteps = document.getElementById('processingSection');
        processingSteps.style.display = 'flex';

        // Show the next step
        showNextStep();
        return;
    }

});






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
        const processingIcon = document.getElementById("processingIcon");
        const processingButton = document.getElementById("processingButton");

        stepElement.innerHTML = `Dear ${userName}, <br> Here are your love report with ${partnerName}!`;
        processingIcon.innerHTML = ` <i class="fa-solid fa-heart-circle-check done"></i>`;
        processingButton.style.display = "flex";


        let toastTxt = `
        <i class="fa-solid fa-circle-check done"></i>
        <span>Love Report Prepared!</span>
        `;
        showToast(toastTxt);
    }
}


// --------------------------------------------
// # Handle Get Started Functionality Function 
// --------------------------------------------

// This function is responsible for checking if the user has already clicked the Get Started button and displaying the form if they have.
function hanldeGetStarted() {
    const isGetStarted = localStorage.getItem('isGetStarted');
    if (isGetStarted) {
        document.getElementById('heroSection').style.display = 'none';
        document.getElementById('formSection').style.display = 'flex';
    }
    return;
}

// --------------------------------------------
// # Show Toast Functionality Function 
// --------------------------------------------

// This function is responsible for displaying a toast message on the screen.
function showToast(message) {

    const ring = new Audio('./media/toast.mp3');
    ring.play();

    const toast = document.getElementById('toastItem');
    toast.innerHTML = message;

    toast.style.display = 'flex';

    setTimeout(function () {
        toast.style.display = 'none';
    }, 3000); // Adjust the time gap (3 seconds) as needed
}


// --------------------------------------------
// # On Window Load Functionality Function 
// --------------------------------------------

// This function is responsible for running the Get Started function when the window loads.
window.onload = function () {
    hanldeGetStarted();
}