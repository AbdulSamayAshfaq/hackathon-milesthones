// Get references to the form and display area
const form = document.getElementById('resume-form') as HTMLFormElement;
const resumeDisplayElement = document.getElementById('resume-display') as HTMLDivElement;
const shareableLinkContainer = document.getElementById('shareable-link-container') as HTMLDivElement;
const shareableLinkElement = document.getElementById('shareable-link') as HTMLAnchorElement;
const downloadPdfButton = document.getElementById('download-pdf') as HTMLButtonElement;

// Handle form submission
form.addEventListener('submit', (event: Event) => {
    event.preventDefault(); // Prevent page reload

    // Collect input values
    const username = (document.getElementById('username') as HTMLInputElement).value;
    const name = (document.getElementById('name') as HTMLInputElement).value;
    const email = (document.getElementById('email') as HTMLInputElement).value;
    const phone = (document.getElementById('phone') as HTMLInputElement).value;
    const education = (document.getElementById('education') as HTMLTextAreaElement).value;
    const experience = (document.getElementById('experience') as HTMLTextAreaElement).value;
    const skills = (document.getElementById('skills') as HTMLTextAreaElement).value;

    // Save form data in localStorage with the username as the key

    const resumeHTML = `
        <h2>Editable Resume</h2>
        <h3>Personal Information</h3>
        <p><b>Name:</b> <span contenteditable="true">${name}</span></p>
        <p><b>Email:</b> <span contenteditable="true">${email}</span></p>
        <p><b>Phone:</b> <span contenteditable="true">${phone}</span></p>
        <h3>Education</h3>
        <p contenteditable="true">${education}</p>
        <h3>Experience</h3>
        <p contenteditable="true">${experience}</p>
        <h3>Skills</h3>
        <p contenteditable="true">${skills}</p>
        <button onclick="captureToCanvas()"contenteditable="false">Capture to Canvas</button>
        <canvas id="resultCanvas" style="display: none;"></canvas>

    `;

    // Display the generated resume
    resumeDisplayElement.innerHTML = resumeHTML;
});

function captureToCanvas() {
    const captureArea = document.getElementById("capture-area");
    const resultCanvas = document.getElementById("resultCanvas");

    html2canvas(captureArea).then(canvas => {
        // Display the captured image in a canvas element
        resultCanvas.style.display = "block";
        resultCanvas.width = canvas.width;
        resultCanvas.height = canvas.height;
        const context = resultCanvas.getContext("2d");
        context.drawImage(canvas, 0, 0);
    }).catch(error => {
        console.error("Error capturing canvas:", error);
    });
}
