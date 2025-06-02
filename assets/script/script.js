
// Custom Cursor
const cursor = document.querySelector('.custom-cursor');

document.addEventListener('mousemove', (e) => {
  cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
});


//DVD Screensaver Animation
// Only run DVD screensaver animation above the large breakpoint (992px)
function isLargeScreen() {
return window.innerWidth >= 992;
}

function dvdBounce(selector) {
    const el = document.querySelector(selector);
    if (!el) return;

    el.style.position = 'absolute';
    let x = Math.random() * (window.innerWidth - el.offsetWidth);
    let y = Math.random() * (window.innerHeight - el.offsetHeight);
    let dx = (0.7 + Math.random() * 0.7); // Slower speed
    let dy = (0.7 + Math.random() * 0.7); // Slower speed

    function move() {
        if (!isLargeScreen()) {
        // Stop animation and reset position if screen is too small
        el.style.position = '';
        el.style.left = '';
        el.style.top = '';
        return;
        }

        x += dx;
        y += dy;

        if (x <= 0 || x + el.offsetWidth >= window.innerWidth) dx *= -1;
        if (y <= 0 || y + el.offsetHeight >= window.innerHeight) dy *= -1;

        el.style.left = x + 'px';
        el.style.top = y + 'px';

        requestAnimationFrame(move);
    }
    move();
}

function startDVDAnimations() {
    dvdBounce('.who__person-1');
    dvdBounce('.who__person-2');
}

// Run on load and on resize
window.addEventListener('load', startDVDAnimations);
window.addEventListener('resize', startDVDAnimations);




//Pop-up for Project Images
function initializeImagePopup() {
    const galleryImages = document.querySelectorAll('.project__gallery img');
    const popup = document.querySelector('.image-popup');
    if (!popup) return; // Exit if popup element is not found

    const popupImage = popup.querySelector('.image-popup__image');
    const popupOverlay = popup.querySelector('.image-popup__overlay');
    const popupClose = popup.querySelector('.image-popup__close');

    if (!popupImage || !popupOverlay || !popupClose) return; // Exit if any child is missing

    // Open popup on image click
    galleryImages.forEach(image => {
        image.addEventListener('click', () => {
            popup.style.display = 'flex'; // Show the popup
            popupImage.src = image.src; // Set the image source
        });
    });

    // Close popup on overlay or close button click
    popupOverlay.addEventListener('click', () => {
        popup.style.display = 'none'; // Hide the popup
    });

    popupClose.addEventListener('click', () => {
        popup.style.display = 'none'; // Hide the popup
    });
}

// Call the function to set up the pop-ups after DOM is loaded
document.addEventListener('DOMContentLoaded', initializeImagePopup);