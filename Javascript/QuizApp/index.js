let shuffleButtonCreated = false;
let createQuizButtonCreated = false;
let searchButtonCreated = false;

const formInput = document.querySelector(".question-input-form");
const answersContainer = document.querySelector(".answers-container");
const buttonDiv = document.querySelector(".btn-wrapper");

//Colouring the Input Answers Green for Right and Red for Wrong
const radioButtons = document.querySelectorAll(
  'input[type="radio"][name="correct-answer"]'
);

let correctAnswerInput;
radioButtons.forEach((radioButton) => {
  radioButton.addEventListener("change", () => {
    correctAnswerInput = document.querySelector(
      'input[name="correct-answer"]:checked'
    )?.value;
    highligtAnswerInputs(correctAnswerInput);
  });
});

//Input Check Applied to check length of Question
const questionInputCheck = document.getElementById("question");
const maxLengthOfInput = questionInputCheck.maxLength;
question.addEventListener("input", (event) => {
  const currentLength = event.target.value.length;
  if (currentLength >= maxLengthOfInput) {
    errorOrNormalMessageContainer(
      `ERROR: Question cannot be more than ${maxLengthOfInput} characters!\nThis app saves only first ${maxLengthOfInput} characters of input question.`
    );
  }
});

// Submitt Input Form Event Handler
formInput.addEventListener("submit", submitForm);

//Add More Button Created
const addMoreButton = document.createElement("button");
addMoreButton.innerText = "Add More Questions";
addMoreButton.classList.add("control-buttons");
buttonDiv.appendChild(addMoreButton);
addMoreButton.addEventListener("click", addMoreQuestions);

//Shuffle Answers Button Created
const shuffleButton = document.createElement("button");
shuffleButton.innerText = "Shuffle Answers";
shuffleButton.classList.add("control-buttons");
shuffleButton.type = "button";
buttonDiv.appendChild(shuffleButton);
shuffleButton.addEventListener("click", shuffleAnswers);
shuffleButtonCreated = true;

// Create Button for Search Bar
const searchButton = document.createElement("button");
searchButton.innerText = "Search Questions";
searchButton.classList.add("control-buttons");
searchButton.type = "button";
buttonDiv.appendChild(searchButton);
searchButton.addEventListener("click", searchInQuestions);
searchButtonCreated = true;

// Create Quiz Button With Sorting Options . . .
const createQuizButton = document.createElement("button");
createQuizButton.innerText = "Create a Quiz";
createQuizButton.classList.add("control-buttons");
createQuizButton.type = "button";
buttonDiv.appendChild(createQuizButton);
createQuizButton.addEventListener("click", quizListDisplay);
createQuizButtonCreated = true;

// Create Competition Button

const competitionButton = document.createElement("button");
competitionButton.classList.add("control-buttons");
competitionButton.innerText = "Create Competation";
competitionButton.type = "button";
buttonDiv.appendChild(competitionButton);
competitionButton.addEventListener("click", competition);
