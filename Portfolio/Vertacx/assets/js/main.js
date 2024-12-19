let currentIndex = 0;
function activateControl(controlElement) {
    const cardsContainer = document.querySelector('.program-cards');
    const controls = document.querySelectorAll('.control');
    const cards = document.querySelectorAll('.program-cards .card');
    const totalCards = cards.length;
    const cardsPerSlide = window.innerWidth <= 1024 ? 1 : 3;

    // Determine the index of the clicked control
    const index = [...controls].indexOf(controlElement);

    // Ensure index is within bounds
    if (index < 0 || index > totalCards - cardsPerSlide + 1) return;

    // Update the transform to show the correct cards
    const offset = -(index * (100 / cardsPerSlide)); // Shift by one card at a time
    cardsContainer.style.transform = `translateX(${offset}%)`;

    // Update active control
    controls.forEach((control, idx) => {
        control.classList.toggle('active', idx === index);
    });
    // Update current index
    currentIndex = index;
}

// Initialize first control as active and set up event listeners
window.addEventListener('DOMContentLoaded', () => {
    const controls = document.querySelectorAll('.control');
    activateControl(controls[0]); // Activate the first control by default

    // Add click event listeners to controls
    controls.forEach(control => {
        control.addEventListener('click', () => activateControl(control));
    });

    // Adjust controls dynamically for responsive view
    window.addEventListener('resize', () => activateControl(controls[currentIndex]));
});











window.onscroll = function () {
    scrollFunction();
};

function scrollFunction() {
    if (window.scrollY > 40) {
        document.getElementById("navbar").style.padding = "20px 5px";
        document.getElementById("logo").style.fontSize = "25px";
    } else {
        document.getElementById("navbar").style.padding = "90px 120px";
        document.getElementById("logo").style.fontSize = "35px";
    }
}




const hamburger = document.querySelector('.hamburger');
const navList = document.querySelector('.nav-list');
const toggleContainer = document.querySelector('.toggle-container');


hamburger.addEventListener('click', () => {
    navList.classList.toggle('active');
});

hamburger.addEventListener('click', () => {
    toggleContainer.classList.toggle('active');
});

const navItems = navList.querySelectorAll('a'); 
navItems.forEach(item => {
    item.addEventListener('click', () => {
        navList.classList.remove('active');
        toggleContainer.classList.remove('active');
    });
});

document.addEventListener('click', (event) => {
    if (
        !navList.contains(event.target) &&
        !hamburger.contains(event.target) &&
        !toggleContainer.contains(event.target)
    ) {
        navList.classList.remove('active');
        toggleContainer.classList.remove('active');
    }
});

const toggleButtons = toggleContainer.querySelectorAll('button, label');
toggleButtons.forEach(button => {
    button.addEventListener('click', () => {
        toggleContainer.classList.remove('active');
    });
});





document.querySelectorAll('.accordion-header').forEach(header => {
    header.addEventListener('click', () => {
        const accordionContent = header.nextElementSibling;
        const arrow = header.querySelector('.arrow');
        const isOpen = header.classList.contains('active');

        // Close all other accordion items
        document.querySelectorAll('.accordion-header').forEach(otherHeader => {
            if (otherHeader !== header) {
                otherHeader.classList.remove('active');
                otherHeader.nextElementSibling.style.display = 'none'; // Hide other contents
                const otherArrow = otherHeader.querySelector('.arrow');
                if (otherArrow) {
                    otherArrow.style.transform = 'rotate(0deg)'; // Reset other arrows
                }
            }
        });

        // Toggle the clicked accordion item
        header.classList.toggle('active');
        accordionContent.style.display = isOpen ? 'none' : 'block'; // Show/Hide the content
        arrow.style.transform = isOpen ? 'rotate(0deg)' : 'rotate(90deg)'; // Rotate arrow
    });
});
