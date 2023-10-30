// Enable tooltips
const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))

// ? Check internet connection status
function checkInternetConnection() {
    const lostConnectionToast = new bootstrap.Toast(document.getElementById('lostConnectionToast'));
    const restoredConnectionToast = new bootstrap.Toast(document.getElementById('restoredConnectionToast'));

    // Initial state
    let isConnected = window.navigator.onLine;

    if (!isConnected) {
        lostConnectionToast.show();
    }

    // Event listener for online/offline events
    window.addEventListener('online', () => {
        isConnected = true;
        restoredConnectionToast.show();
    });

    window.addEventListener('offline', () => {
        isConnected = false;
        lostConnectionToast.show();
    });
}

// Call the function to check internet connection status
checkInternetConnection();


// ? Toggle Password
const toggleButtons = document.querySelectorAll(".toggle-pw");
const toggleIcons = document.querySelectorAll(".toggle-icon");
const passwordInputs = document.querySelectorAll(".toggle-password");

toggleButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
        togglePasswordVisibility(passwordInputs[index], toggleIcons[index]);
    });
});

function togglePasswordVisibility(inputField, toggleIcon) {
    if (inputField.type === "password") {
        inputField.type = "text";
        toggleIcon.classList.remove("bi-eye");
        toggleIcon.classList.add("bi-eye-slash");
    } else {
        inputField.type = "password";
        toggleIcon.classList.remove("bi-eye-slash");
        toggleIcon.classList.add("bi-eye");
    }
}

// ? Digit Group
const digitGroups = document.querySelectorAll('.digit-group input');

    digitGroups.forEach(function(input) {
        input.setAttribute('maxlength', '1');

        input.addEventListener('keyup', function(e) {
            const parent = this.parentElement;

            if (e.keyCode === 8 || e.keyCode === 37) {
                const prev = parent.querySelector('input[data-next="' + this.id + '"]');
                if (prev) {
                    prev.select();
                }
            } else if ((e.keyCode >= 48 && e.keyCode <= 57) || (e.keyCode >= 65 && e.keyCode <= 90) || (e.keyCode >= 96 && e.keyCode <= 105) || e.keyCode === 39) {
                const next = parent.querySelector('input[data-previous="' + this.id + '"]');
                if (next) {
                    next.select();
                } else if (parent.dataset.autosubmit) {
                    parent.submit();
                }
            }
        });
});

// async function processFile() {
//     const fileInput = document.getElementById('upFile');
//     const fileLabel = document.getElementById('fileLabel');
//     const upError = document.querySelector('.upError');

//     if (fileInput.files.length > 0) {
//         const fileName = fileInput.files[0].name;
//         fileLabel.innerText = fileName;
//         upError.style.display = 'none';
//         let file = new FormData();
//         file.append('image', fileInput.files[0]);

//         try {
//             const response = await fetch("/disease-detection", {
//                 method: "POST",
//                 body: file
//             });

//             if (response.ok) {
//                 const data = await response.json();
//                 console.log(data);
//             } else {
//                 throw new Error('Network response was not ok');
//             }
//         } catch (error) {
//             console.error(error);
//         }
//     } else {
//         fileLabel.innerText = 'Choose a file';
//         upError.style.display = 'none';
//     }
// }


// async function processFile() {
//     const fileInput = document.getElementById('upFile');
//     const fileLabel = document.getElementById('fileLabel');
//     const upError = document.querySelector('.upError');

//     if (fileInput.files.length > 0) {
//         const fileName = fileInput.files[0].name;
//         fileLabel.innerText = fileName;
//         upError.style.display = 'none';
//         let file = new FormData();
//         file.append('image', fileInput.files[0]);

//         try {
//             const response = await fetch("/disease-detection", {
//                 method: "POST",
//                 body: file
//             });

//             if (response.ok) {
//                 const data = await response.json();
//                 console.log(data);

//                 // Access the disease and image_path properties
//                 const diseaseInfo = data.disease;
//                 const imagePath = data.image_path;

//                 // Do something with the data, for example, display it on the page
//                 // For demonstration, let's display the disease name and image path
//                 alert(`Disease: ${diseaseInfo.name}\nImage Path: ${imagePath}`);
//             } else {
//                 throw new Error('Network response was not ok');
//             }
//         } catch (error) {
//             console.error(error);
//         }
//     } else {
//         fileLabel.innerText = 'Choose a file';
//         upError.style.display = 'none';
//     }
// }


async function processFile() {
    const fileInput = document.getElementById('upFile');
    const fileLabel = document.getElementById('fileLabel');
    const upError = document.querySelector('.upError');
    const resultDiv = document.getElementById('result');
    const diseaseNameSpan = document.getElementById('diseaseName');
    const imagePathSpan = document.getElementById('imagePath');

    if (fileInput.files.length > 0) {
        const fileName = fileInput.files[0].name;
        fileLabel.innerText = fileName;
        upError.style.display = 'none';
        let file = new FormData();
        file.append('image', fileInput.files[0]);

        try {
            const response = await fetch("/disease-detection", {
                method: "POST",
                body: file
            });

            if (response.ok) {
                const data = await response.json();
                console.log(data);

                const diseaseInfo = data.disease;
                const imagePath = data.image_path;

                // Display the results on the page
                diseaseNameSpan.innerText = diseaseInfo.name;
                imagePathSpan.innerText = imagePath;
                resultDiv.style.display = 'block';
            } else {
                throw new Error('Network response was not ok');
            }
        } catch (error) {
            console.error(error);
        }
    } else {
        fileLabel.innerText = 'Choose a file';
        upError.style.display = 'none';
        resultDiv.style.display = 'none';
    }
}

// Textarea auto expand
const textarea = document.getElementById("chatPrompt");

textarea.addEventListener("input", function () {
  this.style.height = "auto";
  this.style.height = this.scrollHeight + "px";

  // Limit the maximum number of rows to 5
  const maxRows = 5;
  const lineHeight = parseInt(getComputedStyle(this).lineHeight);
  if (this.scrollHeight > maxRows * lineHeight) {
    this.style.overflowY = "scroll";
    this.style.height = maxRows * lineHeight + "px";
  } else {
    this.style.overflowY = "hidden";
  }
});

// ? Type Writer effect
const text = "Welcome back to your workspace, we missed You!";
const textContainer = document.getElementById("typewriter-text");

let speed = 50; // Typing speed in milliseconds
let index = 0;

function typeWriter() {
    if (index < text.length) {
        textContainer.innerHTML += text.charAt(index);
        index++;
        setTimeout(typeWriter, speed);
    }
}

typeWriter();



// ? Reset PW
// Get references to the divs and the button
var resetEmail = document.getElementById("resetEmail");
var otpCode = document.getElementById("otpCode");
var tglRpw = document.getElementById("tglRpw");

// Add a click event listener to the button
tglRpw.addEventListener("click", function () {
    // Check if resetEmail is currently visible
    if (resetEmail.style.transform !== "translateX(-170%)") {
        // Hide resetEmail and show otpCode
        resetEmail.style.transform = "translateX(-170%)";
        resetEmail.style.opacity = "0";
        otpCode.style.transform = "translateX(0%)";
        otpCode.style.opacity = "1";
        otpCode.style.transition = "1s";
    } else {
        // Show resetEmail and hide otpCode
        otpCode.style.transform = "translateX(100%)";
    }
});

// Get a reference to the input element and the button
const digit1 = document.getElementById('digit-1');
// Add an event listener to the button to trigger the focus
tglRpw.addEventListener('click', function () {
  digit1.focus();
});

// Optionally, you can also set focus on the input when the page loads
window.addEventListener('load', function () {
  digit1.focus();
});
