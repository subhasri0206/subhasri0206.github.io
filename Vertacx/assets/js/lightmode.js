// Add an event listener to the theme switch button
document.getElementById("theme-switch").addEventListener("click", function() {
    const logo = document.getElementById("logo");
    // Check if the body has the 'darkmode' class
    if (document.body.classList.contains("darkmode")) {
        // If it's in dark mode, remove 'darkmode' and add 'lightmode'
        document.body.classList.remove("darkmode");
        document.body.classList.add("lightmode");
        logo.src="../images/vertacx-logo-light.png";
    } else {
        // If it's in light mode, switch back to dark mode
        document.body.classList.remove("lightmode");
        document.body.classList.add("darkmode");
    }
});
