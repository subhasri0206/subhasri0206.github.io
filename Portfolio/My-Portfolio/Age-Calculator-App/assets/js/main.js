document.getElementById("calculate-btn").addEventListener("click", function() {
    // Clear previous error messages
    clearErrors();
  
    // Get input values
    const day = document.getElementById("day").value;
    const month = document.getElementById("month").value;
    const year = document.getElementById("year").value;
  
    let hasError = false;  // To track if there are any errors
  
    // Check if fields are empty
    if (!day) {
      showError("day-error", "This field is required");
      hasError = true;
    } else if (isNaN(day) || day < 1 || day > 31) {
      showError("day-error", "Must be a valid day");
      hasError = true;
    }
  
    if (!month) {
      showError("month-error", "This field is required");
      hasError = true;
    } else if (isNaN(month) || month < 1 || month > 12) {
      showError("month-error", "Must be a valid month");
      hasError = true;
    }
  
    if (!year) {
      showError("year-error", "This field is required");
      hasError = true;
    } else if (isNaN(year) || year > new Date().getFullYear() || year < 1900) {
      showError("year-error", "Must be in the past");
      hasError = true;
    }
  
    if (hasError) return;  // Stop if any error occurred
  
    // Create a birthDate object with the user input
    const birthDate = new Date(year, month - 1, day); // JS months are 0-based (January is 0)
  
    // Check if the created birthDate is valid
    if (
      birthDate.getFullYear() !== parseInt(year) || 
      birthDate.getMonth() !== (month - 1) || 
      birthDate.getDate() !== parseInt(day)
    ) {
      showError("day-error", "Please enter a valid date");
      return;
    }
  
    const currentDate = new Date();
  
    // Check if the birthDate is in the future
    if (birthDate > currentDate) {
      showError("year-error", "The birth date cannot be in the future");
      return;
    }
  
    // Calculate age
    let ageYears = currentDate.getFullYear() - birthDate.getFullYear();
    let ageMonths = currentDate.getMonth() - birthDate.getMonth();
    let ageDays = currentDate.getDate() - birthDate.getDate();
  
    if (ageDays < 0) {
      ageMonths--;
      const daysInLastMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0).getDate();
      ageDays += daysInLastMonth;
    }
  
    if (ageMonths < 0) {
      ageYears--;
      ageMonths += 12;
    }
  
    // Display the result
    document.getElementById("years").textContent = ageYears;
    document.getElementById("months").textContent = ageMonths;
    document.getElementById("days").textContent = ageDays;
  });
  
  // Function to show error messages
  function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    errorElement.textContent = message;
    errorElement.style.display = "block";
  }
  
  // Function to clear previous errors
  function clearErrors() {
    const errorMessages = document.querySelectorAll(".error-message");
    errorMessages.forEach((error) => {
      error.style.display = "none";
      error.textContent = "";
    });
  }