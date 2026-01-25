document.querySelector(".search-course").addEventListener("click", function () {
  let userInput = document.querySelector(".course-id-input").value;
  let courseDetails = document.querySelector("#course-details");

  // Vulnerable to XSS: Using innerHTML
  courseDetails.innerHTML = `You searched for: ${userInput}`;
});