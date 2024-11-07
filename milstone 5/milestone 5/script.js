// Get references to the form and display area
var form = document.getElementById('resume-form');
var resumeDisplayElement = document.getElementById('resume-display');
var shareableLinkContainer = document.getElementById('shareable-link-container');
var shareableLinkElement = document.getElementById('shareable-link');
var downloadPdfButton = document.getElementById('download-pdf');

// Handle form submission
form.addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent page reload

    // Collect input values
    var username = document.getElementById('username').value;
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var phone = document.getElementById('phone').value;
    var education = document.getElementById('education').value;
    var experience = document.getElementById('experience').value;
    var skills = document.getElementById('skills').value;

    // Generate the resume content dynamically
    var resumeHTML = `
        <div id="capture-area" class="border">
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

            <canvas id="resultCanvas" style="display: none;" class="border"></canvas>
            </div>
            <button onclick="downloadCanvas()" contenteditable="false">Download Screenshot</button>
    `;

    // Display the generated resume
    resumeDisplayElement.innerHTML = resumeHTML;
});


// Function to download the canvas as an image
function downloadCanvas() {
    var captureArea = document.getElementById("capture-area");
    var resultCanvas = document.getElementById("resultCanvas");

    html2canvas(captureArea).then(function (canvas) {
      
        var context = resultCanvas.getContext("2d");
        context.drawImage(canvas, 0, 0);

        // Create a global variable to store the captured canvas
        window.capturedCanvas = canvas;
    }).catch(function (error) {
        console.error("Error capturing canvas:", error);
    });




    if (!window.capturedCanvas) {
        alert("Please capture the canvas first.");
        return;
    }

    // Convert canvas to an image data URL
    var imageData = window.capturedCanvas.toDataURL("image/png");

    // Create a temporary link to trigger the download
    var downloadLink = document.createElement("a");
    downloadLink.href = imageData;
    downloadLink.download = "resume_screenshot.png"; // File name for download
    downloadLink.click();
}
