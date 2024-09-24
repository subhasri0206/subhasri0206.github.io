const hamburger = document.querySelector('.hamburger');
const navList = document.querySelector('.nav-list');

hamburger.addEventListener('click', () => {
    navList.classList.toggle('active');
});


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

  if (n > slides.length) { slideIndex = slides.length } // Stay at the last slide
  if (n < 1) { slideIndex = 1 } // Stay at the first slide

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
  for (i = 0; i < dots.length; i++) {
    let dotSlideNumber = slideIndex - (maxVisibleDots - (i + 1));

    if (dotSlideNumber > 0 && dotSlideNumber <= slides.length) {
      dots[i].style.display = "inline-block"; // Show the dot
      dots[i].textContent = dotSlideNumber; // Show correct slide number
    } else {
      dots[i].style.display = "none"; // Hide the dot when no corresponding slide
    }

    // Highlight the correct dot as active
    if (dotSlideNumber === slideIndex) {
      dots[i].className += " active";
    }
  }
}