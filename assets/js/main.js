const hamburger = document.querySelector('.hamburger');
const navList = document.querySelector('.nav-list');

// Toggle the active class for the hamburger menu
hamburger.addEventListener('click', () => {
    navList.classList.toggle('active');
});

// Add click event listeners to navigation items
const navItems = navList.querySelectorAll('li'); // Assuming each item is in an <li>
navItems.forEach(item => {
    item.addEventListener('click', (event) => {
        // Get the href attribute of the clicked item (assuming <a> tags are used)
        const link = item.querySelector('a').getAttribute('href');
        navList.classList.remove('active');
        window.location.href = link; // or window.location.assign(link);
    });
});

// Close the menu when clicking outside of it
document.addEventListener('click', (event) => {
    if (!navList.contains(event.target) && !hamburger.contains(event.target)) {
        navList.classList.remove('active');
    }
});





// Slideshow logic
let slideIndex = 1;
let maxVisibleDots = 3; // Keep 3 dots visible

showSlides(slideIndex);

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    let dots = document.getElementsByClassName("dot");
    // Ensure the slide index is within bounds
    if (n > slides.length) { n = slides.length; }
    if (n < 1) { n = 1; }
    // Set the global slideIndex to the selected slide number
    slideIndex = n;
    // Hide all slides
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";  
    }
    // Remove the active class from all dots
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    // Show the current slide
    slides[slideIndex - 1].style.display = "block";
    // Update dots to represent slides 1, 2, 3... then 4, 5, 6, etc.
    for (let i = 0; i < dots.length; i++) {
        // Calculate the slide number for each dot
        let dotSlideNumber = Math.max(1, slideIndex - Math.floor((maxVisibleDots - 1) / 2)) + i;
        // Show or hide the dot based on whether it corresponds to a valid slide number
        if (dotSlideNumber <= slides.length) {
            dots[i].style.display = "inline-block"; // Show the dot
            dots[i].textContent = dotSlideNumber; // Show correct slide number
            // Add event listener to jump to the clicked slide
            dots[i].onclick = function () {
                showSlides(parseInt(this.textContent)); // Navigate to the slide represented by the dot
            };
        } else {
            dots[i].style.display = "none"; // Hide the dot if no corresponding slide
        }
        // Highlight the correct dot as active
        dots[i].classList.toggle("active", dotSlideNumber === slideIndex);
    }
}
