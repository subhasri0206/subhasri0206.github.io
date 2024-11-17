document.querySelector('.theme-toggle').addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    const themeText = document.querySelector('.theme-toggle span');
    themeText.textContent = document.body.classList.contains('light-mode') ? 'DARK' : 'LIGHT';
});



async function fetchGitHubUser(event) {
    event.preventDefault();
    const username = document.getElementById('github-username').value;
    const url = `https://api.github.com/users/${username}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('User not found');
        }

        const data = await response.json();
        document.getElementById('profile-image').src = data.avatar_url || '';
        document.getElementById('user-name').textContent = data.name || 'No Name';
        document.getElementById('user-handle').textContent = `@${data.login}`;
        document.getElementById('user-bio').textContent = data.bio || 'This profile has no bio';
        document.getElementById('join-date').textContent = `Joined ${new Date(data.created_at).toLocaleDateString()}`;
        document.getElementById('repos').textContent = data.public_repos;
        document.getElementById('followers').textContent = data.followers;
        document.getElementById('following').textContent = data.following;
        document.getElementById('location').textContent = data.location || 'Not Available';
        document.getElementById('website').textContent = data.blog || 'Not Available';
        document.getElementById('website').href = data.blog || '#';
        document.getElementById('twitter-handle').textContent = data.twitter_username ? `@${data.twitter_username}` : 'Not Available';
        document.getElementById('github-link').textContent = `@${data.login}`;
        document.getElementById('github-link').href = data.html_url;
    } catch (error) {
        alert(error.message);
    }
}




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