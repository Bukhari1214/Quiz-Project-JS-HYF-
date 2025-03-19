let shuffleButtonCreated = false;
let createQuizButtonCreated = false;
let searchButtonCreated = false;

const messageContainer = document.createElement("div");
messageContainer.setAttribute("class", "message-container");
document.body.appendChild(messageContainer);

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

//Input Check Applied to check length of Question
const questionInputCheck = document.getElementById("question");
const maxLengthOfInput = questionInputCheck.maxLength;
question.addEventListener("input", (event) => {
  const currentLength = event.target.value.length;
  if (currentLength >= maxLengthOfInput) {
    messageContainer.innerText =
      "ERROR: Question cannot be more than 140 characters!\nThis app saves only first 140 characters of input question.";
  }
});

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

// New Button for Search Bar
const searchButton = document.createElement("button");
searchButton.innerText = "Search Questions";
searchButton.classList.add("control-buttons");
searchButton.type = "button";
buttonDiv.appendChild(searchButton);
searchButton.addEventListener("click", searchInQuestions);
searchButtonCreated = true;

// Submitt Input Form Event Handler

formInput.addEventListener("submit", (event) => {
  const existingQuizContainer = document.querySelector(".questionContainer");
  if (existingQuizContainer) {
    existingQuizContainer.remove();
  }

  const existingSearchContainer = document.querySelector(".searchContainerDiv");
  if (existingSearchContainer) {
    existingSearchContainer.remove();
  }

  const existingCompetitionContainer =
    document.querySelector(".competition-div");
  if (existingCompetitionContainer) {
    existingCompetitionContainer.remove();
  }

  event.preventDefault();

  const questionInput = document.getElementById("question").value;
  const option1Input = document.getElementById("option1").value;
  const option2Input = document.getElementById("option2").value;
  const option3Input = document.getElementById("option3").value;
  const option4Input = document.getElementById("option4").value;
  const questionExists = quizQuestionArray.some(
    (item) => item.question.toLowerCase() === questionInput.toLowerCase()
  );

  const optionsDuplicationCheck = [
    option1Input,
    option2Input,
    option3Input,
    option4Input,
  ];

  const duplicateOption =
    optionsDuplicationCheck.length !== new Set(optionsDuplicationCheck).size;

  if (duplicateOption) {
    messageContainer.innerText = "ERROR: Duplicate Answers Found!";
  } else {
    if (questionExists) {
      messageContainer.innerText = "Repetition ERROR: Question Already Exists";
    } else {
      const options = [
        { text: option1Input, isCorrect: correctAnswerInput === "option1" },
        { text: option2Input, isCorrect: correctAnswerInput === "option2" },
        { text: option3Input, isCorrect: correctAnswerInput === "option3" },
        { text: option4Input, isCorrect: correctAnswerInput === "option4" },
      ];

      const correctAnswerText = options.find(
        (option) => option.isCorrect
      )?.text;

      const quizQuestion = {
        id: quizQuestionArray.length + 1,
        question: questionInput,
        options: options,
        explanation: `The correct answer is ${correctAnswerText}.`,
      };

      quizQuestionArray.push(quizQuestion);

      messageContainer.innerText = `New question with possible options and correct option INSERTED with ID: ${
        quizQuestionArray[quizQuestionArray.length - 1].id
      }`;
    }
  }

  // Create Quiz Button appears after a check

  if (quizQuestionArray.length > 16 && !createQuizButtonCreated) {
    const createQuizButton = document.createElement("button");
    createQuizButton.innerText = "Create a Quiz";
    createQuizButton.classList.add("control-buttons");
    createQuizButton.type = "button";
    buttonDiv.appendChild(createQuizButton);

    createQuizButton.addEventListener("click", quizListDisplay);
    createQuizButtonCreated = true;
  }
  removeHighLightners();
});

// Create Competition Button

const competitionButton = document.createElement("button");
competitionButton.classList.add("control-buttons");
competitionButton.innerText = "Create Competation";
competitionButton.type = "button";
buttonDiv.appendChild(competitionButton);
competitionButton.addEventListener("click", competition);
