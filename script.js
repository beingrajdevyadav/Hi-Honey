// --------------------------------------------
//           Globle Variables
// --------------------------------------------

let isGetStarted = false;
let userName = '';
let partnerName = '';
let loveReports = [];
let currentReport = {};
// --------------------------------------------

// --------------------------------------------
// # Function To Fetch Data From data.json file
// --------------------------------------------

async function fetchData() {
    const response = await fetch('./data.json');
    const data = await response.json();
    return data;
}


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
    // console.log('form submitted');


    // check if name and partner name are not empty
    if (this.name.value === '') {
        // console.log('Please, enter your name');

        let toastTxt = `
         <i class="fa-solid fa-heart-circle-plus"></i> 
         <span>Please, Enter Your Name!!</span>`;

        showToast(toastTxt);
        return;
    } else if (this.partner.value === '') {
        // console.log('Please, enter your partner name');

        let toastTxt = `
            <i class="fa-solid fa-heart-circle-plus"></i> 
            <span>Please, Enter Your Partner Name!!</span>`;

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
             <i class="fa-solid fa-circle-check done"></i> 
             <span>Details Submitted!</span>`;

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
        setTimeout(showNextStep, 2000); // Adjust the time gap (2 seconds) as needed


    } else {
        const stepElement = document.getElementById('step');
        const processingIcon = document.getElementById("processingIcon");
        const processingButton = document.getElementById("openReportButton");

        stepElement.innerHTML = `Dear ${userName}, <br> Here is your love report with ${partnerName}!`;
        processingIcon.innerHTML = ` <i class="fa-solid fa-heart-circle-check done"></i>`;
        processingButton.style.display = "flex";

        // to create love report
        let loveScore = Math.floor(Math.random() * 100 + 1);
        createLoveReport(loveReports[loveScore]);
        currentReport = { ...loveReports[loveScore], name: userName, partner: partnerName };
        let toastTxt = `
        <i class="fa-solid fa-circle-check done"></i>
        <span>Love Report Ready!</span>
        `;
        showToast(toastTxt);
    }
}


// --------------------------------------------
//        # Create Report Function 
// --------------------------------------------

function createLoveReport(report) {

    const { lovePercent, advice, example, description, title, quote } = report;

    const loveReportContainer = document.getElementById("loveReport");
    // console.log(report);

    let loveReport = `
    <div class="report-header">
                <h2 class="names">  ${userName} And ${partnerName} </h2>
                <hr>
                <div class="love-percent">
                    <b>Love Score : </b>
                    <span class="score">${lovePercent}</span>
                    <span>%</span>
                </div>
                <hr>
            </div>

            <div class="report-body">
                <div class="report-item">
                    <h3 class="cntr">${title}</h3>
                    <hr>
                </div>
                <div class="report-item ">
                     <p class="cntr bg-drk"><b>Advice </b></p>
                    <p class="txt-jstf"> ${advice}</p>
                </div>
                <div class="report-item txt-jstf">
                    <p class="cntr bg-drk"><b>In Details </b> </p>
                    <p class="txt-jstf"> ${description}</p>
                </div>
                <div class="report-item ">
                    <p class="cntr bg-drk"> <b>Quote </b></p>
                    <p class="txt-jstf"> ${quote}</p>
                </div>
            </div>

            <div class="report-footer">
                <hr>

                <div class="report-item">
                    <p class="txt-jstf tips"> <b>Tips :</b> ${example}</p>
                </div>
               

            </div>

    `;

    loveReportContainer.innerHTML = loveReport;
}


// --------------------------------------------
// # Open Love Report Functionality Function 
// --------------------------------------------
const openReportButton = document.getElementById('openReportButton');

function openReport() {
    // Hide the processing steps section
    const processingSteps = document.getElementById('processingSection');
    processingSteps.style.display = 'none';

    // Display the love report section
    const loveReport = document.getElementById('loveReportSection');
    loveReport.style.display = 'flex';

    let toastTxt = `
    <i class="fa-solid fa-gift done"></i>
    <span>${userName} Congratulations!</span>
    `;
    showToast(toastTxt);
}

openReportButton.addEventListener('click', openReport);

// --------------------------------------------
// # Try Again Functionality Function 
// --------------------------------------------
const tryAgainButton = document.getElementById("tryAgain");

function handleTryAgain() {

    window.location.reload();

    // show toast 
    let toastTxt = `
    <i class="fa-solid fa-circle-check done"></i>
    <span>Data Retrieved!</span>
    `;
}

tryAgainButton.addEventListener("click", handleTryAgain);



// --------------------------------------------
// # Share On WhatsApp  Functionality Function 
// --------------------------------------------
const shareOnWhatsAppButton = document.getElementById("shareOnWhatsApp");
function handleShareOnWhatsApp() {
    const { name, partner, lovePercent, advice, quote, description, example, title } = currentReport;
    console.log(currentReport);

    let reportMessage = `
    
Dear **${name}**, your love report with **${partner}** is truly extraordinary! 🌟💖

Dive deep into this report and let it guide you towards a relationship that is more loving, caring, understanding, and supportive. Embrace each word and find the beauty in every piece of advice and insight. 💞✨

**Love Score**: ${lovePercent}% ❤️💕

A high love score indicates the depth and strength of your connection with **${partner}**. Cherish this bond and nurture it with all your heart. Every moment shared is a step towards a beautiful journey together. 🌹

**Remedies**: ${title} 💡

These remedies are designed to bring you closer and enhance the harmony in your relationship. Follow them diligently and watch your love blossom into something even more wonderful. 🌸

**Advice**: ${advice} 📜

Consider this advice as a treasure trove of wisdom. It holds the keys to a successful relationship. Remember, love is not just a feeling, it's a commitment to understanding, patience, and constant growth. 🌟

**Description**: ${description} 📖

Read through this detailed description to get a deeper insight into your unique relationship dynamics. Every bit of information is crafted to help you navigate the beautiful journey you and **${partner}** are on. 🚀

**Quotes**: ${quote} 🗨️

These quotes are not just words; they are pearls of wisdom to inspire and motivate you. Let them remind you of the beauty of love and the endless possibilities it holds. 🌈

**Tips**: ${example} 🌹

These tips are practical steps to foster a stronger and more fulfilling relationship. Implement them and witness the magic unfold in your love story. 💖


Thank you for choosing https://tryhoney.netlify.app 🌐. We wish you boundless love and happiness! May your days be filled with joy, laughter, and endless adventures together! 🌟💞✨

*"Two hearts, one beat. May your love continue to grow stronger with each passing day, filling your lives with endless joy, laughter, and adventure. Wishing you a forever filled with bliss and togetherness!"* 🌈✨💖

- Rajdev Yadav 📝

    
    `;

    

    const shareMessage = encodeURIComponent(reportMessage);
    window.open(`https://api.whatsapp.com/send?text=${shareMessage}`, '_blank');
}

shareOnWhatsAppButton.addEventListener("click", handleShareOnWhatsApp);



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
    currentReport = {};
    hanldeGetStarted();
    fetchData().then(data => {
        loveReports = data;
        // console.log(data);
        // console.log(loveReports);
    });
}