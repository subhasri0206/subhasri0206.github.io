// Update styles and layout dynamically when accessibility is clicked
document.getElementById('accessibility-btn').addEventListener('click', function () {
  // Move accessibility card to the top-left
  const accessibilityCard = document.querySelector('.card');
  accessibilityCard.style.position = 'absolute';
  accessibilityCard.style.top = '83px';
  accessibilityCard.style.left = '140px';
  accessibilityCard.style.backgroundColor = 'transparent';
  accessibilityCard.style.boxShadow = 'none';
  accessibilityCard.style.padding = '0px';
  accessibilityCard.style.marginBottom = '0';  

  // Move theme toggle to the top-right
  const themeSwitch = document.querySelector('.header-switch');
  themeSwitch.style.position = 'absolute';
  themeSwitch.style.top = '10px';
  themeSwitch.style.right = '10px';

  // Hide the header containing "Frontend Quiz App"
  const header = document.querySelector('.header');
  header.style.display = 'none';

  // Ensure questions and answers are visible
  const quizContainer = document.querySelector('.quiz');
  quizContainer.classList.remove('hide');
  quizContainer.style.marginTop = '60px';

  const questionContainer = document.querySelector('.question-container');
  questionContainer.style.display = 'flex';
  questionContainer.style.flexDirection = 'row';
  questionContainer.style.alignItems = 'flex-start';

  const questionContent = document.querySelector('.question-content');
  questionContent.style.flex = '1';

  const answerOptions = document.getElementById('answer-options');
  answerOptions.style.flex = '1';
  answerOptions.style.marginLeft = '20px';

  // Update alignment for progress bar
  const progressBar = document.querySelector('.progress-bar');
  progressBar.style.width = '100%';
  progressBar.style.marginBottom = '0px';

  const startGameButton = document.querySelector('.start-game');
  if (startGameButton) {
    startGameButton.style.display = 'none';
  }
});

// Ensure "Next Question" button is only visible after submitting the answer
// and "Submit Answer" button is hidden after submission
document.addEventListener('DOMContentLoaded', function () {
  const nextButton = document.getElementById('next-button');
  const submitButton = document.querySelector('.submit-button');

  nextButton.style.display = 'none';

  submitButton.addEventListener('click', function () {
    nextButton.disabled = false;
    nextButton.style.display = 'inline-block';
    submitButton.style.display = 'none';
  });

  nextButton.addEventListener('click', function () {
    this.style.display = 'none';
    submitButton.style.display = 'inline-block';
  });
});

document.addEventListener("DOMContentLoaded", function () {
    // Hide the final score screen and quiz container initially
    const endScreen = document.querySelector(".end-screen");
    const quizContainer = document.querySelector(".quiz");

    endScreen.classList.add("hide");
    quizContainer.classList.add("hide");

    // Show only the start screen (if applicable)
    const startScreen = document.querySelector(".start-screen");
    if (startScreen) {
        startScreen.classList.remove("hide");
    }
});

// Questions data
const questions = [
  {
      question: "What is the purpose of the `alt` attribute in an `<img>` tag?",
      options: ["To add a tooltip", "To specify the image source", "To provide alternative text", "To style the image"],
      correctAnswer: "To provide alternative text",
  },
  {
      question: "Which CSS property is used to change text color?",
      options: ["font-color", "text-color", "color", "text-style"],
      correctAnswer: "color",
  },
  {
      question: "What does the `<head>` element contain?",
      options: ["Main content", "Meta information", "Scripts only", "User inputs"],
      correctAnswer: "Meta information",
  },
  {
      question: "What does Flexbox primarily help with?",
      options: ["Grid layout", "Responsive design", "Vertical and horizontal alignment", "Defining containers"],
      correctAnswer: "Vertical and horizontal alignment",
  },
  {
      question: "Which tag is used to create a hyperlink in HTML?",
      options: ["<link>", "<a>", "<href>", "<hyper>"],
      correctAnswer: "<a>",
  },
];

// Selectors
// Selectors
const questionContainer = document.querySelector(".question-container");
const questionNumber = document.getElementById("question-number");
const questionTitle = document.getElementById("question-title");
const progressIndicator = document.getElementById("progress-indicator");
const answerOptions = document.getElementById("answer-options");
const feedback = document.getElementById("feedback");
const submitButton = document.querySelector(".submit-button");
const nextButton = document.getElementById("next-button");
const finalScore = document.querySelector(".final-score");
const totalScore = document.querySelector(".total-score");
const endScreen = document.querySelector(".end-screen");
const restartButton = document.querySelector(".restart");

// State variables
let currentQuestionIndex = 0;
let score = 0;

// Function to load a question
function loadQuestion() {
    const question = questions[currentQuestionIndex];
    questionNumber.textContent = `Question ${currentQuestionIndex + 1} of ${questions.length}`;
    questionTitle.textContent = question.question;

    // Update progress bar
    updateProgressBar();

    // Render options
    answerOptions.innerHTML = ""; // Clear previous options
    question.options.forEach((option, index) => {
        const optionDiv = document.createElement("div");
        optionDiv.className = "answer-option";
        optionDiv.dataset.value = option;

        const optionIndicator = document.createElement("span");
        optionIndicator.className = "option-indicator";
        optionIndicator.textContent = String.fromCharCode(65 + index); // A, B, C, D
        optionIndicator.style.backgroundColor = "#F4F6FA";
        optionIndicator.style.color = "#626C7F";

        const optionText = document.createElement("span");
        optionText.className = "option-text";
        optionText.textContent = option;

        const feedbackIcon = document.createElement("img");
        feedbackIcon.className = "feedback-icon hide";

        optionDiv.append(optionIndicator, optionText, feedbackIcon);
        answerOptions.appendChild(optionDiv);

        // Add click event for selection
        optionDiv.addEventListener("click", () => handleOptionSelect(optionDiv, question.correctAnswer));
    });

    feedback.textContent = ""; // Clear feedback
    submitButton.disabled = true;
    nextButton.disabled = true;
}

// Update progress bar
function updateProgressBar() {
  const progressPercentage = (currentQuestionIndex / questions.length) * 100;
  progressIndicator.style.width = `${progressPercentage}%`;
  progressIndicator.setAttribute("aria-valuenow", progressPercentage);
}

// Handle option selection
function handleOptionSelect(selectedOption, correctAnswer) {
    resetSelectionStyles();

    const optionIndicator = selectedOption.querySelector(".option-indicator");
    selectedOption.classList.add("selected");
    selectedOption.style.borderColor = "#A729F5";
    optionIndicator.style.backgroundColor = "#A729F5";
    optionIndicator.style.color = "#FFFFFF"; 

    submitButton.disabled = false;
}

// Reset selection styles
function resetSelectionStyles() {
    const options = document.querySelectorAll(".answer-option");
    options.forEach(option => {
        option.classList.remove("selected");
        option.style.borderColor = "transparent";
        option.querySelector(".option-indicator").style.backgroundColor = "#F4F6FA";
        option.querySelector(".option-indicator").style.color = "#626C7F"; // Reset font color
        option.style.color = ""; // Reset font color
    });
}

// Submit answer
submitButton.addEventListener("click", () => {
    const selectedOption = document.querySelector(".answer-option.selected");
    if (!selectedOption) return;

    const selectedValue = selectedOption.dataset.value;
    const correctAnswer = questions[currentQuestionIndex].correctAnswer;

    if (selectedValue === correctAnswer) {
        score++;
        selectedOption.style.borderColor = "green";
        selectedOption.querySelector(".option-indicator").style.backgroundColor = "green";
        selectedOption.querySelector(".feedback-icon").src = "assets/images/correct-icon.png";
    } else {
        selectedOption.style.borderColor = "red";
        selectedOption.querySelector(".option-indicator").style.backgroundColor = "red";
        selectedOption.querySelector(".feedback-icon").src = "assets/images/wrong-icon.png";

        // Highlight correct answer without green background
        const options = document.querySelectorAll(".answer-option");
        options.forEach(option => {
            if (option.dataset.value === correctAnswer) {
                const correctIcon = option.querySelector(".feedback-icon");
                correctIcon.src = "assets/images/correct-icon.png";
                correctIcon.classList.remove("hide");
            }
        });
    }

    selectedOption.querySelector(".feedback-icon").classList.remove("hide");
    submitButton.disabled = true;
    nextButton.disabled = false;
    
     // Update progress bar to reflect the completed question
     const progressPercentage = ((currentQuestionIndex + 1) / questions.length) * 100;
     progressIndicator.style.width = `${progressPercentage}%`;
     progressIndicator.setAttribute("aria-valuenow", progressPercentage);
     
    // Update feedback
    feedback.textContent = selectedValue === correctAnswer ? "Correct!" : "Wrong!";
    feedback.style.color = selectedValue === correctAnswer ? "green" : "red";
});

// Next question
nextButton.addEventListener("click", () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        loadQuestion();
    } else {
        showFinalScore();
    }
});


// Show final score
function showFinalScore() {
  // Hide the question container
  questionContainer.classList.add("hide");
  // If there's a parent container for the quiz, hide it as well
  const quizContainer = document.querySelector(".quiz");
  if (quizContainer) {
      quizContainer.classList.add("hide");
  }
  // Show the end screen
  endScreen.classList.remove("hide");
  // Update the final score display
  finalScore.textContent = score;
  totalScore.textContent = `out of ${questions.length}`;
}


// Restart quiz
restartButton.addEventListener("click", restartQuiz);

function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;

    endScreen.classList.add("hide");
    questionContainer.classList.remove("hide");

    loadQuestion();
}

// Restart quiz
restartButton.addEventListener("click", function () {
  currentQuestionIndex = 0;
  score = 0;

  // Hide the end screen
  endScreen.classList.add("hide");

  // Show the quiz container
  const quizContainer = document.querySelector(".quiz");
  if (quizContainer) {
      quizContainer.classList.remove("hide");
  }

  // Reset the progress bar and feedback
  progressIndicator.style.width = "0%";
  progressIndicator.setAttribute("aria-valuenow", "0");
  feedback.textContent = "";

  // Load the first question
  loadQuestion();
});


// Initial load
loadQuestion();
