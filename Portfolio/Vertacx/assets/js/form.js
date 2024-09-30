// Wait for the DOM to fully load
document.addEventListener('DOMContentLoaded', function() {
    const popupCheckbox = document.getElementById('popup-form');
    const closePopupButton = document.querySelector('.close-popup-button');
    const formContainer = document.querySelector('.form-container');

   // Close popup when the close button is clicked
   closeButtons.forEach(button => {
    button.addEventListener("click", function () {
        const popup = this.closest(".popup");
        popup.style.display = "none";
    });
});

    // Listen for clicks on the close button to close the pop-up
    closePopupButton.addEventListener('click', closePopup);

    // Optional: Close pop-up when clicking outside of the form
    window.addEventListener('click', function(event) {
        if (!formContainer.contains(event.target) && popupCheckbox.checked) {
            closePopup();
        }
    });
});
