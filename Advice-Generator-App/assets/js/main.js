const adviceText = document.getElementById("advice-text");
const adviceId = document.getElementById("advice-id");
const newAdviceBtn = document.getElementById("new-advice-btn");

async function fetchAdvice() {
    try {
        const response = await fetch("https://api.adviceslip.com/advice");
        if (!response.ok) throw new Error("Failed to fetch advice");

        const data = await response.json();
        adviceId.textContent = data.slip.id;
        adviceText.textContent = `"${data.slip.advice}"`;
    } catch (error) {
        adviceText.textContent = "An error occurred. Please try again.";
        console.error("Error fetching advice:", error);
    }
}

newAdviceBtn.addEventListener("click", fetchAdvice);

// Fetch initial advice on page load
fetchAdvice();
