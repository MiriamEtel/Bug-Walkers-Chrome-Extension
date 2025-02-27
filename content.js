const numberOfBugs = 10;

// Prevents bugs from overflowing outside the screen
// Ensures scrolling remains enabled
document.body.style.overflow = "auto";

// Retrieves the bug image from the extension's resources
const bugImage = chrome.runtime.getURL("bug.png");

/**
 * Creates a bug element and adds it to the page.
 * Ensures the image is valid before appending.
 */
function createBug() {
    if (!bugImage.startsWith("chrome-extension://")) return;

    const bug = document.createElement("img");
    bug.src = bugImage;
    bug.classList.add("bug");

    bug.onload = () => {
        document.body.appendChild(bug);
        bug.style.position = "fixed";
        bug.style.left = `${window.innerWidth / 2}px`;
        bug.style.top = `${window.innerHeight / 2}px`;
        moveBug(bug);
    };
}

/**
 * Moves a bug randomly across the screen at intervals.
 * Ensures bugs stay within screen boundaries.
 * @param {HTMLElement} bug - The bug element to move.
 */
function moveBug(bug) {
    setInterval(() => {
        const maxX = window.innerWidth - 50;
        const maxY = window.innerHeight - 100;
        let x = Math.max(10, Math.random() * maxX);
        let y = Math.max(10, Math.random() * maxY);
        bug.style.transform = `translate(${x}px, ${y}px) rotate(${Math.random() * 360}deg)`;
    }, Math.random() * 2000 + 1000);
}

// Initializes and creates multiple bugs on the screen
for (let i = 0; i < numberOfBugs; i++) {
    createBug();
}
