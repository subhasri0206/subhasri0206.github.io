document.getElementById("theme-switch").addEventListener("click", function() {
    const logo = document.getElementById("logo");
    const skillsImage  = document.getElementById("skills-image");
    const membershipImage = document.getElementById("membership-image");
    const sessionImage = document.getElementById("session-image");
    const ideaIcon1 = document.getElementById("idea-icon1");
    const ideaIcon2 = document.getElementById("idea-icon2");
    const ideaIcon3 = document.getElementById("idea-icon3");
    const serviceS = document.getElementById("services");
    const logoBottom = document.getElementById("logo-bottom");
    const ytIcon = document.getElementById("yt-icon");
    const instaIcon = document.getElementById("insta-icon");
    const linkedinIcon = document.getElementById("linkedin-icon");
    // Check if the body has the 'darkmode' class
    if (document.body.classList.contains("darkmode")) {
        // If it's in dark mode, remove 'darkmode' and add 'lightmode'
        document.body.classList.remove("darkmode");
        document.body.classList.add("lightmode");
        logo.src = logo.getAttribute("data-light");
        skillsImage.src = skillsImage.getAttribute("data-light");
        membershipImage.src = membershipImage.getAttribute("data-light");
        sessionImage.src = sessionImage.getAttribute("data-light");
        ideaIcon1.src = ideaIcon1.getAttribute("data-light");
        ideaIcon2.src = ideaIcon2.getAttribute("data-light");
        ideaIcon3.src = ideaIcon3.getAttribute("data-light");
        serviceS.src = serviceS.getAttribute("data-light");
        logoBottom.src = logoBottom.getAttribute("data-light");
        ytIcon.src = ytIcon.getAttribute("data-light");
        instaIcon.src = instaIcon.getAttribute("data-light");
        linkedinIcon.src = linkedinIcon.getAttribute("data-light");
        // Change all images for light mode
        themeImages.forEach(image => {
            image.src = image.getAttribute('data-light');
        });
    } else {
        // If it's in light mode, switch back to dark mode
        document.body.classList.remove("lightmode");
        document.body.classList.add("darkmode");
        // Change all images back to dark mode
        themeImages.forEach(image => {
            image.src = image.getAttribute('src');
        });
    }
});