document.getElementById("theme-switch").addEventListener("click", function() {
    const logo = document.getElementById("logo");
    const skillsImage  = document.getElementById("skills-image");
    const membershipImage = document.getElementById("membership-image");
    const sessionImage = document.getElementById("session-image");
    const ideaIcon1 = document.getElementById("idea-icon1");
    const ideaIcon2 = document.getElementById("idea-icon2");
    const ideaIcon3 = document.getElementById("idea-icon3");
    const ideaIcon4 = document.getElementById("idea-icon4");
    const serviceS = document.getElementById("services");
    const serviceM = document.getElementById("services-mobile");
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
        ideaIcon4.src = ideaIcon4.getAttribute("data-light");
        serviceS.src = serviceS.getAttribute("data-light");
        logoBottom.src = logoBottom.getAttribute("data-light");
        ytIcon.src = ytIcon.getAttribute("data-light");
        instaIcon.src = instaIcon.getAttribute("data-light");
        linkedinIcon.src = linkedinIcon.getAttribute("data-light");
        serviceM.src = serviceM.getAttribute("data-light-mobile");
    } else {
        // If it's in light mode, switch back to dark mode
        document.body.classList.remove("lightmode");
        document.body.classList.add("darkmode");
        logo.src = logo.getAttribute("src");
        skillsImage.src = skillsImage.getAttribute("src");
        membershipImage.src = membershipImage.getAttribute("src");
        sessionImage.src = sessionImage.getAttribute("src");
        ideaIcon1.src = ideaIcon1.getAttribute("src");
        ideaIcon2.src = ideaIcon2.getAttribute("src");
        ideaIcon3.src = ideaIcon3.getAttribute("src");
        ideaIcon4.src = ideaIcon4.getAttribute("src");
        serviceS.src = serviceS.getAttribute("src");
        logoBottom.src = logoBottom.getAttribute("src");
        ytIcon.src = ytIcon.getAttribute("src");
        instaIcon.src = instaIcon.getAttribute("src");
        linkedinIcon.src = linkedinIcon.getAttribute("src");
        serviceM.src = serviceM.getAttribute("src");
    }
});