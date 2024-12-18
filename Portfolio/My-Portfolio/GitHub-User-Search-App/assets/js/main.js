async function fetchGitHubUser(event) {

    event.preventDefault();
    const username = document.getElementById('github-username').value;
    const url = `https://api.github.com/users/${username}`;

    const resultsElement = document.getElementById('search-results');
    resultsElement.textContent = ''; // Clear previous message
    resultsElement.style.display = 'none'; // Hide no results message initially

    try {
        const response = await fetch(url);
        if (!response.ok) {
            displayNoResults();
            return;
        }

        const data = await response.json();
        document.getElementById('profile-image').src = data.avatar_url || 'blank-profile.png';
        document.getElementById('user-name').textContent = data.name || 'No Name';
        document.getElementById('user-handle').textContent = `@${data.login}`;
        document.getElementById('user-bio').textContent = data.bio || 'This profile has no bio';
        
        function formatJoinDate(dateString) {
            const date = new Date(dateString);
            const options = { day: '2-digit', month: 'short', year: 'numeric' };
            return date.toLocaleDateString('en-GB', options);
        }
        document.getElementById('join-date').textContent = `Joined ${formatJoinDate(data.created_at)}`;

        // Handle availability of information
        const locationElement = document.getElementById('location');
        locationElement.textContent = data.location || 'Not Available';
        locationElement.classList.toggle('dimmed', !data.location);

        const websiteElement = document.getElementById('website');
        websiteElement.textContent = data.blog || 'Not Available';
        websiteElement.href = data.blog || '#';
        websiteElement.classList.toggle('dimmed', !data.blog);

        const twitterElement = document.getElementById('twitter-handle');
        twitterElement.textContent = data.twitter_username ? `@${data.twitter_username}` : 'Not Available';
        twitterElement.classList.toggle('dimmed', !data.twitter_username);

        document.getElementById('repos').textContent = data.public_repos;
        document.getElementById('followers').textContent = data.followers;
        document.getElementById('following').textContent = data.following;

        const githubLinkElement = document.getElementById('github-link');
        githubLinkElement.textContent = `@${data.login}`;
        githubLinkElement.href = data.html_url;
    } catch (error) {
        displayNoResults();
        console.error(error.message);
    }
}

function displayNoResults() {
    const resultsElement = document.getElementById('search-results');
    resultsElement.textContent = 'No results';
    resultsElement.style.color = 'red';
    resultsElement.style.fontWeight = 'bold';
    resultsElement.style.display = 'block'; // Ensure message is visible
}




const themeSwitchBtn = document.getElementById('theme-switch');
const bodyElement = document.body;
const sunIcon = themeSwitchBtn.querySelector('.sun-icon');
const moonIcon = themeSwitchBtn.querySelector('.moon-icon');
const locationLogo = document.getElementById("location-logo");
const linkLogo = document.getElementById("link-logo");
const twitterLogo = document.getElementById("twitter-logo");
const githubLogo = document.getElementById("github-logo");

// Initialize the theme based on the current class of body
if (bodyElement.classList.contains('darkmode')) {
    sunIcon.style.display = 'none';
    moonIcon.style.display = 'inline';
} else {
    sunIcon.style.display = 'inline';
    moonIcon.style.display = 'none';
}

// Toggle theme on button click
themeSwitchBtn.addEventListener('click', () => {
    bodyElement.classList.toggle('darkmode');

    if (bodyElement.classList.contains('darkmode')) {
        sunIcon.style.display = 'none';
        moonIcon.style.display = 'inline';
        bodyElement.classList.remove('lightmode');
        locationLogo.src = locationLogo.getAttribute("data-light");
        linkLogo.src = linkLogo.getAttribute("data-light");
        twitterLogo.src = twitterLogo.getAttribute("data-light");
        githubLogo.src = githubLogo.getAttribute("data-light");
        themeImages.forEach(image => {
            image.src = image.getAttribute('data-light');
        });
    } else {
        sunIcon.style.display = 'inline';
        moonIcon.style.display = 'none';
        bodyElement.classList.add('lightmode');
        themeImages.forEach(image => {
            image.src = image.getAttribute('src');
        });
    }
});
