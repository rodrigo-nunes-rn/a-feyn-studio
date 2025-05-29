
// Custom Cursor
const cursor = document.querySelector('.custom-cursor');

document.addEventListener('mousemove', (e) => {
  cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
});





const projectDetails = document.querySelectorAll(".project");
const footer = document.querySelector("footer"); // The footer section

projectDetails.forEach((project, index) => {
    const details = project.querySelector(`#project__details-element-${index + 1}`);
    const summary = project.querySelector(`#project__summary-element-${index + 1}`);
    const expandedContent = project.querySelector(`#project__expanded-content-${index + 1}`);
    const nextProject = projectDetails[index + 1]; // Get the next project
    const svgElement = summary.querySelector("svg");

    // Ensure nextProject and footer are valid before calling getComputedStyle
    let initialMarginTop = nextProject instanceof Element ? parseInt(window.getComputedStyle(nextProject).marginTop) : 50; // Default to 50 if nextProject is invalid
    let initialFooterMarginTop = footer instanceof Element ? parseInt(window.getComputedStyle(footer).marginTop) : 0; // Default to 0 if footer is invalid

    // Function to calculate margin adjustments based on viewport width
    function getAdjustments() {
        const width = window.innerWidth;

        if (width >= 1200) {
            return { nextProject: -200, whoSection: -200 }; // For large screens
        } else if (width >= 992) {
            return { nextProject: -500, whoSection: -700 }; // For 992px screens
        } else if (width >= 768) {
            return { nextProject: -300, whoSection: -500 }; // For 768px screens
        } else if (width >= 400) {
            return { nextProject: -500, whoSection: -700 }; // For 400px screens
        } else {
            return { nextProject: -700, whoSection: -900 }; // Default for smaller screens
        }
    }

    details.addEventListener("toggle", () => {
        // Force a reflow to ensure contentHeight is accurate
        expandedContent.style.maxHeight = "none"; // Temporarily remove max-height to get the full height
        const contentHeight = expandedContent.scrollHeight; // Recalculate the content height
        expandedContent.style.maxHeight = ""; // Reset max-height to its original state

        const { nextProject: nextProjectAdjustment, whoSection: footerAdjustment } = getAdjustments(); // Get the adjustments for the current viewport width

        if (details.open) {
            // Change text and rotate the SVG
            summary.querySelector('.project__summary-text').textContent = 'Show less';
            svgElement.style.transform = "rotate(180deg)";

            // Move the summary (text and SVG) smoothly below the expanded content
            summary.style.transition = "transform 0.6s ease"; // Ensure consistent transition
            summary.style.transform = `translateY(${contentHeight + 120}px)`; // Ensure summary moves further

            // Set initial state for the content and prevent flickering
            expandedContent.style.transition = "none"; // Temporarily disable transition
            expandedContent.style.maxHeight = `${contentHeight}px`;
            expandedContent.style.opacity = '0'; // Start with opacity 0

            // Allow layout to update before starting the transition
            setTimeout(() => {
                // Now enable the transition and smoothly animate
                expandedContent.style.transition = "max-height 0.8s ease, opacity 0.6s ease"; // Smooth transition for max-height and opacity
                expandedContent.style.opacity = '1'; // Fade in content
            }, 10); // Delay just enough for layout to settle (10ms)

            // Adjust margin-top for the next section/project (if it exists)
            if (nextProject) {
                nextProject.style.transition = "margin-top 0.6s ease";
                nextProject.style.marginTop = `${contentHeight + nextProjectAdjustment}px`; // Adjusted margin based on contentHeight
            }

            // Animate the footer section
            if (footer) {
                footer.style.transition = "margin-top 0.6s ease";
                footer.style.marginTop = `${initialFooterMarginTop + contentHeight + footerAdjustment}px`; // Adjusted margin based on contentHeight
            }
        } else {
            // Scroll to the beginning of the project to show the title with a top margin offset
            const projectTitle = project.querySelector("h2");
            const scrollOffset = 96; // Adjust this value to control the top margin offset
            const scrollPosition = projectTitle
                ? projectTitle.getBoundingClientRect().top + window.scrollY - scrollOffset
                : project.getBoundingClientRect().top + window.scrollY - scrollOffset;

            window.scrollTo({ top: scrollPosition, behavior: "smooth" });

            // Reset the summary position and text when closed
            summary.style.transform = "translateY(0)";
            summary.querySelector('.project__summary-text').textContent = 'See More';
            svgElement.style.transform = "rotate(0deg)";

            // Collapse the content smoothly
            expandedContent.style.maxHeight = '0';
            expandedContent.style.opacity = '0';

            // Synchronize the movement of the sections below with the button animation
            const transitionDuration = "0.6s"; // Match the button's transition duration
            const easing = "ease"; // Match the button's easing

            // Reset margin-top for the next section/project (if it exists)
            if (nextProject) {
                nextProject.style.transition = `margin-top ${transitionDuration} ${easing}`;
                nextProject.style.marginTop = `${initialMarginTop}px`; // Reset to initial margin position
            }

            // Synchronize the footer's movement with the button animation
            if (footer) {
                footer.style.transition = `margin-top ${transitionDuration} ${easing}`;
                footer.style.marginTop = `${initialFooterMarginTop}px`; // Reset to initial margin position
            }

            // Apply the same transition to the summary to ensure synchronization
            summary.style.transition = `transform ${transitionDuration} ${easing}`;

            // Delay the footer's movement slightly to match the button animation
            setTimeout(() => {
                if (footer) {
                    footer.style.transition = `margin-top ${transitionDuration} ${easing}`;
                    footer.style.marginTop = `${initialFooterMarginTop}px`; // Reset to initial margin position
                }
            }, 10); // Add a slight delay to synchronize with the button
        }
    });
});

function initializeImagePopup() {
    const galleryImages = document.querySelectorAll('.project__gallery img');
    const popup = document.querySelector('.image-popup');
    const popupImage = popup.querySelector('.popup-image');
    const popupOverlay = popup.querySelector('.popup-overlay');
    const popupClose = popup.querySelector('.popup-close');

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

// Call the function to set up the pop-ups
initializeImagePopup();