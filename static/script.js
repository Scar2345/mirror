async function initializeCamera() {
    const video = document.getElementById('mirror-video');

    // Check if the user has granted camera permissions
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        video.srcObject = stream;
    } catch (error) {
        console.error('Error accessing the camera: ', error);
    }
}

async function askMirror() {
    const input = document.getElementById('user-input');
    const question = input.value;
    if (!question) return;

    const response = await fetch('/ask-mirror', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question }),
    });
    const data = await response.json();
    displayResponse(data.response);
}

function displayResponse(text) {
    const mirrorText = document.getElementById('mirror-text');
    mirrorText.innerHTML = '';
    let index = 0;
    function typeText() {
        if (index < text.length) {
            mirrorText.innerHTML += text[index++];
            setTimeout(typeText, 50);  // Typewriter effect
        }
    }
    typeText();
}

// Initialize the camera when the window loads
window.onload = initializeCamera;
