// Custom Cursor
const cursor = document.querySelector('.custom-cursor');

document.addEventListener('mousemove', (e) => {
  cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
});


/**
 * DVD Screensaver Animation
 * Only run DVD screensaver animation above the large breakpoint (992px)
 */
function isLargeScreen() {
    return window.innerWidth >= 992;
}

function dvdBounce(el, zIndexBase = 10) {
    if (!el) return;

    el.style.position = 'absolute';

    // Calculate animation area
    function getArea() {
        const areaWidth = Math.min(window.innerWidth, 1400);
        const areaLeft = (window.innerWidth - areaWidth) / 2;
        const areaHeight = window.innerHeight;
        return { areaWidth, areaLeft, areaHeight };
    }

    let { areaWidth, areaLeft, areaHeight } = getArea();

    let x = areaLeft + Math.random() * (areaWidth - el.offsetWidth);
    let y = Math.random() * (areaHeight - el.offsetHeight);
    let dx = (0.7 + Math.random() * 2); // Slower speed
    let dy = (0.7 + Math.random() * 2); // Slower speed
    let animationFrameId = null;
    let paused = false;

    function move() {
        // Update area on each frame in case of resize
        ({ areaWidth, areaLeft, areaHeight } = getArea());

        if (!isLargeScreen()) {
            el.style.position = '';
            el.style.left = '';
            el.style.top = '';
            el.style.zIndex = '';
            return;
        }
        if (paused) return;

        x += dx;
        y += dy;

        if (x <= areaLeft) {
            x = areaLeft;
            dx *= -1;
        }
        if (x + el.offsetWidth >= areaLeft + areaWidth) {
            x = areaLeft + areaWidth - el.offsetWidth;
            dx *= -1;
        }
        if (y <= 0) {
            y = 0;
            dy *= -1;
        }
        if (y + el.offsetHeight >= areaHeight) {
            y = areaHeight - el.offsetHeight;
            dy *= -1;
        }

        el.style.left = x + 'px';
        el.style.top = y + 'px';

        animationFrameId = requestAnimationFrame(move);
    }

    function start() {
        if (!paused) return;
        paused = false;
        move();
    }

    function stop() {
        paused = true;
        if (animationFrameId) {
            cancelAnimationFrame(animationFrameId);
            animationFrameId = null;
        }
    }

    // Set initial z-index
    el.style.zIndex = zIndexBase;

    // Only show info when hovering the image
    const img = el.querySelector('img');
    const name = el.querySelector('.who__name');
    const desc = el.querySelector('.who__description');

    if (img) {
        img.addEventListener('mouseenter', () => {
            if (name) name.style.opacity = '1';
            if (desc) desc.style.opacity = '1';
            // Bring this element to front
            // Find the highest z-index among all .who__person-* elements
            const allPersons = document.querySelectorAll('[class^="who__person"]');
            let maxZ = zIndexBase;
            allPersons.forEach(person => {
                const z = parseInt(window.getComputedStyle(person).zIndex) || zIndexBase;
                if (z > maxZ) maxZ = z;
            });
            el.style.zIndex = maxZ + 1;
            stop(); // Pause animation when hovering image
        });
        img.addEventListener('mouseleave', (e) => {
            // Do not hide name/desc here
            // Do not start animation here; wait for container mouseleave
        });
    }

    // Resume animation and hide info only when mouse leaves the container
    el.addEventListener('mouseleave', () => {
        start();
        // Reset z-index to base (lowest among all)
        el.style.zIndex = zIndexBase;
        if (name) name.style.opacity = '';
        if (desc) desc.style.opacity = '';
    });

    move();
}

function startDVDAnimations() {
    // Select all elements with class starting with 'who__person-'
    const persons = document.querySelectorAll('[class^="who__person"]');
    persons.forEach((el, idx) => {
        dvdBounce(el, 10 + idx);
    });
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