document.addEventListener("DOMContentLoaded", function () {
    const popups = document.querySelectorAll(".popup");
    const closeButtons = document.querySelectorAll(".close-popup-button");

    // Close popup when the close button is clicked
    closeButtons.forEach(button => {
        button.addEventListener("click", function () {
            const popup = this.closest(".popup");
            popup.style.display = "none";
        });
    });

    // Close popup when clicking outside the content area
    popups.forEach(popup => {
        popup.addEventListener("click", function (event) {
            if (event.target === popup) {
                popup.style.display = "none";
            }
        });
    });

    // Display the popup when the view details button is clicked
    document.querySelectorAll(".view-details-button").forEach(button => {
        button.addEventListener("click", function () {
            const popupId = this.getAttribute("for").replace("popup-", "popup-");
            document.getElementById(popupId).style.display = "flex";
        });
    });
});
